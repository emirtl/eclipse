import { Component, inject, signal } from '@angular/core';
import { INews } from '../shared/interfaces/news.interface';
import { NewsService } from '../admin/services/news.service';
import { Card } from 'primeng/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-news',
  imports: [Card, RouterLink],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent {
  newsService = inject(NewsService);

  news = signal<INews[]>([]);

  constructor() {
    this.loadNews();
  }

  async loadNews() {
    const news = await this.newsService.getAll(0);
    this.news.set(news);
  }
}
