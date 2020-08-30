import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LatestSchoolComponent } from './latest-school/latest-school.component';
import { LatestSalonComponent } from './latest-salon/latest-salon.component';
import { MatDividerModule } from '@angular/material/divider';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { TagListComponent } from './tag-list/tag-list.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    HomeComponent,
    ArticleListComponent,
    LatestSchoolComponent,
    LatestSalonComponent,
    TagListComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    SwiperModule,
    MatChipsModule,
    MatCardModule,
  ],
})
export class HomeModule {}
