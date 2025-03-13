import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../shared/interfaces/category.interface';
import { firstValueFrom } from 'rxjs';
import { IAuthor } from '../../shared/interfaces/author.interface';

@Injectable({ providedIn: 'root' })
export class AuthorsService {
  http = inject(HttpClient);

  async getAll(): Promise<IAuthor[]> {
    const authors$ = this.http.get(
      'http://localhost:9000/api/v1/authors/getAll',
    );
    const result = await firstValueFrom(authors$);
    return result['authors'];
  }

  async insert(author: Partial<IAuthor>): Promise<IAuthor> {
    const author$ = this.http.post(
      'http://localhost:9000/api/v1/authors/insert',
      author,
    );
    const result = await firstValueFrom(author$);
    return result['author'];
  }

  async delete(id: string): Promise<IAuthor> {
    const author$ = this.http.delete(
      `http://localhost:9000/api/v1/authors/delete/${id}`,
    );
    const result = await firstValueFrom(author$);
    return result['deletedAuthor'];
  }
}
