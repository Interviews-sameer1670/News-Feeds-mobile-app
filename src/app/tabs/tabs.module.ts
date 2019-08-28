import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { NewsPageModule } from '../news/news.module';
import { NewsDetailPageModule } from '../news-detail/news-detail.module';
import { AboutPageModule } from '../about/about.module';
import { FeaturedNewsPageModule } from '../featured-news/featured-news.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    NewsPageModule,
    NewsDetailPageModule,
    FeaturedNewsPageModule,
    AboutPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
