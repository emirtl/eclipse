import { Component, inject, signal } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { Popover } from 'primeng/popover';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { CategoriesService } from '../services/category.service';
import { TableModule } from 'primeng/table';
import { ICategory } from '../../shared/interfaces/category.interface';

@Component({
  selector: 'app-categories',
  imports: [Card, Button, Popover, ReactiveFormsModule, InputText, TableModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categories = signal<ICategory[]>([]);
  isSubmitting = false;
  fb = inject(FormBuilder);
  categoriesService = inject(CategoriesService);
  form = this.fb.group({
    title: ['', Validators.required],
  });
  constructor() {
    this.loadCategories();
  }
  async loadCategories() {
    try {
      const categories = await this.categoriesService.getAll();
      if (!categories) {
        console.log('Categories not found');
      }
      this.categories.set(categories);
    } catch (e) {
      console.log(e);
    }
  }

  async onSubmitBtn() {
    this.isSubmitting = true;
    try {
      const category = await this.categoriesService.insert(
        this.form.value.title,
      );

      if (category) {
        this.isSubmitting = false;
        const categories = this.categories();
        const newCategoriesList = [...categories, category];
        this.categories.set(newCategoriesList);
      } else {
        console.log('category creation failed');
      }
      this.form.reset();
    } catch (e) {
      console.log(e);
    }
  }

  async onDeleteCategory(id: string) {
    const deletedCategory = await this.categoriesService.delete(id);
    if (!deletedCategory) {
      console.log('Category deletion failed');
    }
    const categories = this.categories();
    const newCategoriesList = categories.filter(
      (category) => category.id !== id,
    );
    this.categories.set(newCategoriesList);
  }
}
