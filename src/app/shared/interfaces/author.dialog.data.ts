import { IAuthor } from './author.interface';

export interface IAuthorDialogData {
  state?: 'create' | 'edit';
  title?: string;
  author?: IAuthor;
}
