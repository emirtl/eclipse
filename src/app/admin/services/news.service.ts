import { inject, Injectable, Query } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../shared/interfaces/category.interface';
import { firstValueFrom } from 'rxjs';
import { INews } from '../../shared/interfaces/news.interface';

@Injectable({ providedIn: 'root' })
export class NewsService {
  http = inject(HttpClient);

  async getAll(limit?: number): Promise<INews[]> {
    const news$ = this.http.get(
      `http://localhost:9000/api/v1/news/getAll?limit=${limit}`,
    );
    const result = await firstValueFrom(news$);
    return result['news'];
  }

  async get(id: string): Promise<INews> {
    const news$ = this.http.get(`http://localhost:9000/api/v1/news/get/${id}`);
    const result = await firstValueFrom(news$);
    return result['news'];
  }

  async insert(news: FormData): Promise<INews> {
    const INews$ = this.http.post(
      'http://localhost:9000/api/v1/news/insert',
      news,
    );
    const result = await firstValueFrom(INews$);
    return result['news'];
  }

  async delete(id: string): Promise<INews> {
    const news$ = this.http.delete(
      `http://localhost:9000/api/v1/news/delete/${id}`,
    );
    const result = await firstValueFrom(news$);
    return result['deletedNews'];
  }
}
