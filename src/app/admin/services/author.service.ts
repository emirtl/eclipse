import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IAuthor } from '../../shared/interfaces/author.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthorsService {
  http = inject(HttpClient);
  env = environment.API_USER_PROD;
  async getAll(): Promise<IAuthor[]> {
    const authors$ = this.http.get(`${this.env}/authors/getAll`);
    const result = await firstValueFrom(authors$);
    return result['authors'];
  }

  async insert(author: Partial<IAuthor>): Promise<IAuthor> {
    const author$ = this.http.post(`${this.env}/authors/insert`, author);
    const result = await firstValueFrom(author$);
    return result['author'];
  }

  async delete(id: string): Promise<IAuthor> {
    const author$ = this.http.delete(`${this.env}/authors/delete/${id}`);
    const result = await firstValueFrom(author$);
    return result['deletedAuthor'];
  }
}
