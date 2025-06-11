import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../shared/interfaces/category.interface';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  http = inject(HttpClient);
  env = environment.API_USER_PROD;

  async getAll(): Promise<ICategory[]> {
    const categories$ = this.http.get(`${this.env}/categories/getAll`);
    const result = await firstValueFrom(categories$);
    return result['categories'];
  }

  async insert(title: string): Promise<ICategory> {
    const category$ = this.http.post(`${this.env}/categories/insert`, {
      title,
    });
    const result = await firstValueFrom(category$);
    return result['category'];
  }

  async delete(id: string): Promise<ICategory> {
    const category$ = this.http.delete(`${this.env}/categories/delete/${id}`);
    const result = await firstValueFrom(category$);
    return result['deletedCategory'];
  }
}
