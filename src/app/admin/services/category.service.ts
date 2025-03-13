import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../shared/interfaces/category.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  http = inject(HttpClient);

  async getAll(): Promise<ICategory[]> {
    const categories$ = this.http.get(
      'http://localhost:9000/api/v1/categories/getAll',
    );
    const result = await firstValueFrom(categories$);
    return result['categories'];
  }

  async insert(title: string): Promise<ICategory> {
    const category$ = this.http.post(
      'http://localhost:9000/api/v1/categories/insert',
      { title },
    );
    const result = await firstValueFrom(category$);
    return result['category'];
  }

  async delete(id: string): Promise<ICategory> {
    const category$ = this.http.delete(
      `http://localhost:9000/api/v1/categories/delete/${id}`,
    );
    const result = await firstValueFrom(category$);
    return result['deletedCategory'];
  }
}
