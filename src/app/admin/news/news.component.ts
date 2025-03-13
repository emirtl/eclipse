import { Component, inject, OnDestroy, signal } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { openNewsDialog } from './edit-news-dialog/edit-news-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { INews } from '../../shared/interfaces/news.interface';
import { Image } from 'primeng/image';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news',
  imports: [ReactiveFormsModule, TableModule, Button, Card, Image],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
  providers: [DialogService, DynamicDialogRef],
})
export class NewsComponent implements OnDestroy {
  dialogService = inject(DialogService);
  ref = inject(DynamicDialogRef);
  news = signal<INews[]>([]);
  newsService = inject(NewsService);
  constructor() {
    this.loadNews();
  }

  async onDeleteNews(id) {
    const deletedNews = await this.newsService.delete(id);
    if (!deletedNews) {
      console.log('deletion failed');
    }
    const news = this.news();
    const newNewsList = news.filter((news) => news.id !== id);
    this.news.set(newNewsList);
  }

  async loadNews() {
    try {
      const news = await this.newsService.getAll(0);
      if (!news) {
        console.log('No news!');
      }
      this.news.set(news);
    } catch (e) {
      console.log(e);
    }
  }

  onCreateNews() {
    openNewsDialog(this.dialogService, {
      title: 'Create News',
      state: 'create',
    }).onClose.subscribe((value) => {
      console.log(value);
      const news = this.news();
      const newNewsList = [...news, value];
      this.news.set(newNewsList);
    });
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.destroy();
    }
  }
}
