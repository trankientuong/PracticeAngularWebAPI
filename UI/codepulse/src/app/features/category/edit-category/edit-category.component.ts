import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  deleteCategorySubscription?: Subscription;
  category?: Category;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.categoryService.getCategoryById(this.id).subscribe({
            next: (category) => {
              this.category = category;
            }
          });
        }
      }
    });
  }

  onFormSubmit(): void {
    const updateCategoryRequest: {name: string; urlHandle: string;} = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    };
    if (this.id) {
      this.editCategorySubscription = this.categoryService.updateCategory(this.id, updateCategoryRequest.name, updateCategoryRequest.urlHandle).subscribe({
        next: (category) => {
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.deleteCategorySubscription = this.categoryService.deleteCategory(this.id).subscribe({
        next: (category) => this.router.navigateByUrl('/admin/categories')
      });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
    this.deleteCategorySubscription?.unsubscribe();
  }
}
