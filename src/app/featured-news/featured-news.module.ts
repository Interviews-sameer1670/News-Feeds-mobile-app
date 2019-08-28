import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeaturedNewsPage } from './featured-news.page';

const routes: Routes = [
  {
    path: '',
    component: FeaturedNewsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FeaturedNewsPage]
})
export class FeaturedNewsPageModule {}
