import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {
  addCaregorySubsription?: Subscription;
  categoryForm = new FormGroup({
    categoryName: new FormControl<string>('', {
      validators: [ Validators.required ]
    }),
    categoryUrlHandle: new FormControl<string>('', {
      validators: [ Validators.required ]
    })
  });

  constructor(private categoryService: CategoryService, private router: Router) {}
  
  onSubmit() {    
    if (this.categoryForm.invalid) {
      return;
    }
    const categoryName = this.categoryForm?.value?.categoryName!;
    const categoryUrlHandle = this.categoryForm?.value?.categoryUrlHandle!;

    console.log(categoryName, categoryUrlHandle);
    this.addCaregorySubsription = this.categoryService.addCategory(categoryName, categoryUrlHandle).subscribe({
      next: (resData) => {
        this.router.navigate(['/admin/categories']);
      }
    })
    this.categoryForm.reset();
  }

  ngOnDestroy(): void {
    this.addCaregorySubsription?.unsubscribe();
  }
}
