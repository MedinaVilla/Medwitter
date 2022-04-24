import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FeedComponent } from './pages/home/feed/feed.component';
import { LatestComponent } from './pages/home/latest/latest.component';
import { TweetComponent } from './pages/home/feed/tweet/tweet.component';
import { MakeTweetComponent } from './pages/home/feed/make-tweet/make-tweet.component';
import { LatestItemComponent } from './pages/home/latest/latest-item/latest-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FeedComponent,
    LatestComponent,
    TweetComponent,
    MakeTweetComponent,
    LatestItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
