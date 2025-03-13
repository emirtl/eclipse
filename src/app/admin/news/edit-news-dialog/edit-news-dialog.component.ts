import { Component, inject, OnDestroy, signal } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

import { INewsDialogData } from '../../../shared/interfaces/news.dialog.data';
import { AuthorsService } from '../../services/author.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { IftaLabel } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { CategoriesService } from '../../services/category.service';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { IAuthor } from '../../../shared/interfaces/author.interface';
import { Image } from 'primeng/image';
import { NewsService } from '../../services/news.service';
import { Textarea } from 'primeng/textarea';

@Component({
  selector: 'app-edit-news-dialog',
  imports: [
    Button,
    ReactiveFormsModule,
    IftaLabel,
    InputText,
    Select,
    Image,
    Textarea,
  ],
  templateUrl: './edit-news-dialog.component.html',
  styleUrl: './edit-news-dialog.component.css',
  providers: [],
})
export class EditNewsDialogComponent implements OnDestroy {
  dialogServiceData = inject(DynamicDialogConfig);
  newsService = inject(NewsService);

  ref = inject(DynamicDialogRef);
  fb = inject(FormBuilder);
  form: FormGroup;
  state = this.dialogServiceData.data.data.state;
  title = this.dialogServiceData.data.data.title;
  isSubmitting = false;
  categoriesService = inject(CategoriesService);
  authorsService = inject(AuthorsService);
  categories = signal<ICategory[]>([]);
  authors = signal<IAuthor[]>([]);
  imagePreview: string | ArrayBuffer = '';

  constructor() {
    if (this.state === 'create') {
      this.form = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        richDescription: ['', Validators.required],
        coverImage: [Validators.required],
        author: ['', Validators.required],
        category: ['', Validators.required],
      });
    }

    this.loadCategories();

    this.loadAuthors();
  }

  async loadCategories() {
    try {
      const categories = await this.categoriesService.getAll();
      if (!categories) {
        console.log('No categories found.');
      }
      this.categories.set(categories);
    } catch (e) {
      console.log(e);
    }
  }
  async loadAuthors() {
    try {
      const authors = await this.authorsService.getAll();
      if (!authors) {
        console.log('No authors found.');
      }
      this.authors.set(authors);
    } catch (e) {
      console.log(e);
    }
  }

  async onSubmitBtn() {
    this.isSubmitting = true;
    if (this.state === 'create') {
      try {
        const formData = new FormData();
        Object.keys(this.form.controls).map((key) => {
          formData.append(key, this.form.controls[key].value);
        });
        const news = await this.newsService.insert(formData);
        this.ref.close(news);
        if (news) {
          this.isSubmitting = false;
        } else {
          this.isSubmitting = false;
          console.log('No new news!');
          this.form.reset();
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  onImagePicked($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.form.patchValue({ coverImage: file });
    this.form.updateValueAndValidity();
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.destroy();
    }
  }
}
export function openNewsDialog(
  dialogService: DialogService,
  data: INewsDialogData,
) {
  return dialogService.open(EditNewsDialogComponent, {
    width: '40vw',
    height: '100%',
    modal: true,
    contentStyle: { overflow: 'auto' },
    closable: true,
    breakpoints: {
      '960px': '75vw',
      '640px': '90vw',
    },
    data: { data },
  });
}
