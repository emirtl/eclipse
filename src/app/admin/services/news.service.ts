import { inject, Injectable, Query } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { INews } from '../../shared/interfaces/news.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NewsService {
  http = inject(HttpClient);
  env = environment.API_USER_PROD;

  async getAll(limit?: number): Promise<INews[]> {
    const news$ = this.http.get(`${this.env}/news/getAll?limit=${limit}`);
    const result = await firstValueFrom(news$);
    return result['news'];
  }

  async get(id: string): Promise<INews> {
    const news$ = this.http.get(`${this.env}/news/get/${id}`);
    const result = await firstValueFrom(news$);
    return result['news'];
  }

  async insert(news: FormData): Promise<INews> {
    const INews$ = this.http.post(`${this.env}/news/insert`, news);
    const result = await firstValueFrom(INews$);
    return result['news'];
  }

  async delete(id: string): Promise<INews> {
    const news$ = this.http.delete(`${this.env}/news/delete/${id}`);
    const result = await firstValueFrom(news$);
    return result['deletedNews'];
  }
}
