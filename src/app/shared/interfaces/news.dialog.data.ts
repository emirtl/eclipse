import { IAuthor } from './author.interface';
import { INews } from './news.interface';

export interface INewsDialogData {
  state?: 'create' | 'edit';
  title?: string;
  news?: INews;
}
