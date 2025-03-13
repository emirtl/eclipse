import { Component, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { openAuthorDialog } from './author-edit-dialog/author-edit-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IAuthor } from '../../shared/interfaces/author.interface';
import { AuthorsService } from '../services/author.service';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-authors',
  imports: [
    Button,
    Card,
    ReactiveFormsModule,
    TableModule,
    FormsModule,
    ToggleButtonModule,
  ],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css',
  providers: [DialogService, DynamicDialogRef],
})
export class AuthorsComponent {
  dialogService = inject(DialogService);
  authorsService = inject(AuthorsService);
  authors = signal<IAuthor[]>([]);
  ref = inject(DynamicDialogRef);
  checked = false;

  constructor() {
    this.loadAllAuthors();
  }

  async loadAllAuthors() {
    try {
      const authors = await this.authorsService.getAll();
      this.authors.set(authors);
    } catch (e) {
      console.log(e);
    }
  }

  onCreateAuthor() {
    openAuthorDialog(this.dialogService, {
      state: 'create',
      title: 'Register',
    }).onClose.subscribe((value) => {
      const authors = this.authors();
      const newAuthorsList = [...authors, value];
      this.authors.set(newAuthorsList);
    });
  }

  onUpdateBtn() {}

  async onDeleteAuthor(id: string) {
    try {
      const deletedAuthor = await this.authorsService.delete(id);
      if (deletedAuthor) {
        const authors = this.authors();
        const filteredAuthors = authors.filter(
          (x) => x.id !== deletedAuthor.id,
        );
        this.authors.set(filteredAuthors);
      } else {
        console.log('deleting author failed');
      }
    } catch (e) {
      console.log(e);
    }
  }
}
