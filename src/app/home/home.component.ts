import { Component, inject, signal } from '@angular/core';
import { ImageCompareModule } from 'primeng/imagecompare';
import { Divider } from 'primeng/divider';
import { NewsService } from '../admin/services/news.service';
import { INews } from '../shared/interfaces/news.interface';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ImageCompareModule, Divider, TableModule, Card, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  newsService = inject(NewsService);
  news = signal<INews[]>([]);

  constructor() {
    this.loadNews();
  }

  async loadNews() {
    const news = await this.newsService.getAll(6);
    this.news.set(news);
  }
}
