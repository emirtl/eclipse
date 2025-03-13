import { Component } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { SplitButton } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { InputText } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [
    Toolbar,
    Button,
    IconField,
    InputIcon,
    SplitButton,
    InputText,
    RouterLink,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: 'Categories',
        icon: 'pi pi-list',
        routerLink: '/admin/categories',
      },
      {
        label: 'Authors',
        icon: 'pi pi-pen-to-square',
        routerLink: '/admin/authors',
      },
      {
        label: 'News',
        icon: 'pi pi-megaphone',
        routerLink: '/admin/news',
      },
    ];
  }
}
