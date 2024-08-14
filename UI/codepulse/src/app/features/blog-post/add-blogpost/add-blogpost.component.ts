import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css',
})
export class AddBlogpostComponent {
  blogPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    urlHandle: new FormControl('', [Validators.required]),
    shortDescription: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    featuredImageUrl: new FormControl('', [Validators.required]),
    publishedDate: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    isVisible: new FormControl(true, {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    if (this.blogPostForm.invalid) {
      console.log('INVALID FORM');
      return;
    }
    console.log(this.blogPostForm.value);
  }
}
