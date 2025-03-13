import { Component, inject } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { IAuthorDialogData } from '../../../shared/interfaces/author.dialog.data';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { IftaLabel } from 'primeng/iftalabel';
import { TextareaModule } from 'primeng/textarea';
import { Button } from 'primeng/button';
import { AuthorsService } from '../../services/author.service';
import { IAuthor } from '../../../shared/interfaces/author.interface';

@Component({
  selector: 'app-author-edit-dialog',
  imports: [ReactiveFormsModule, InputText, IftaLabel, TextareaModule, Button],
  templateUrl: './author-edit-dialog.component.html',
  styleUrl: './author-edit-dialog.component.css',
  providers: [],
})
export class AuthorEditDialogComponent {
  dialogServiceData = inject(DynamicDialogConfig);
  authorsService = inject(AuthorsService);
  ref = inject(DynamicDialogRef);
  fb = inject(FormBuilder);
  form: FormGroup;
  state = this.dialogServiceData.data.data.state;
  title = this.dialogServiceData.data.data.title;
  isSubmitting = false;
  constructor() {
    if (this.state === 'create') {
      this.form = this.fb.group({
        name: ['', Validators.required],
        position: ['', Validators.required],
        description: ['', Validators.required],
      });
    } else {
    }
  }

  async onSubmitBtn() {
    if (this.state === 'create') {
      this.isSubmitting = true;
      try {
        const author: Partial<IAuthor> = this.form.value;
        const result = await this.authorsService.insert(author);
        if (result) {
          this.ref.close(result);
          this.form.reset();
          this.isSubmitting = false;
        } else {
          console.log('creating author failed');
          this.isSubmitting = false;
        }
      } catch (e) {
        console.log('failed to create author', e);
      }
    } else {
    }
  }
}

export function openAuthorDialog(
  dialogService: DialogService,
  data: IAuthorDialogData,
) {
  return dialogService.open(AuthorEditDialogComponent, {
    width: '40vw',
    modal: true,
    closable: true,

    breakpoints: {
      '960px': '75vw',
      '640px': '90vw',
    },
    data: { data },
  });
}
