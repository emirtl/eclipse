import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { NewsComponent } from './news/news.component';
import { AuthorsComponent } from './authors/authors.component';

export const adminRoutes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'news', component: NewsComponent },
];
