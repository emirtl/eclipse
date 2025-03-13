import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news-item/:id', component: NewsItemComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: 'game', component: GameComponent },

  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((x) => x.adminRoutes),
  },
];
