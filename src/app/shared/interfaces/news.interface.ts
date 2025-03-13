import { ICategory } from './category.interface';
import { IAuthor } from './author.interface';

export interface INews {
  id?: string;
  title?: string;
  description?: string;
  richDescription?: string;
  image?: string;
  coverImage?: string;
  author?: IAuthor;
  category?: ICategory;
  isFeatured?: string;
  isBreakingNews?: string;
  isCatchingUp?: string;
  numReviews?: string;
}
