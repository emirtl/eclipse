import { Component, inject, signal } from '@angular/core';
import { Card } from 'primeng/card';
import { NewsService } from '../admin/services/news.service';
import { INews } from '../shared/interfaces/news.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-item',
  imports: [Card],
  templateUrl: './news-item.component.html',
  styleUrl: './news-item.component.css',
})
export class NewsItemComponent {
  newsService = inject(NewsService);
  news = signal<INews>(null);
  activatedRoute = inject(ActivatedRoute);
  constructor() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (!id) {
      console.log('no id found');
    }
    this.loadSingleNews(id);
  }

  async loadSingleNews(id: string): Promise<void> {
    try {
      const news = await this.newsService.get(id);
      console.log(news);
      this.news.set(news);
    } catch (e) {
      console.log(e);
    }
  }
}
