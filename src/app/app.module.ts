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

import { FormsModule } from '@angular/forms';
import {AutosizeModule} from 'ngx-autosize';
import { RepliesOptionsComponent } from './pages/home/feed/make-tweet/replies-options/replies-options.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { ResultsSearchComponent } from './shared/search-bar/results-search/results-search.component';
import { FollowSuggestComponent } from './pages/home/follow-suggest/follow-suggest.component';
import { FollowItemComponent } from './pages/home/follow-suggest/follow-item/follow-item.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { TrendsComponent } from './pages/explore/tabs/trends/trends.component';
import { Covid19Component } from './pages/explore/tabs/covid19/covid19.component';
import { NewsComponent } from './pages/explore/tabs/news/news.component';
import { SportsComponent } from './pages/explore/tabs/sports/sports.component';
import { EntertainmentComponent } from './pages/explore/tabs/entertainment/entertainment.component';
import { TabsComponent } from './pages/explore/tabs/tabs.component';
import { ForYouComponent } from './pages/explore/tabs/for-you/for-you.component';
import { AllComponent } from './pages/notifications/all/all.component';
import { MentionsComponent } from './pages/notifications/mentions/mentions.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { TabsNComponent } from './pages/notifications/tabs/tabs.component';
import { ItemNotificationComponent } from './pages/notifications/all/item-notification/item-notification.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CarouselComponent } from './pages/profile/carousel/carousel.component';
import { HeaderComponent } from './pages/profile/header/header.component';
import { FeedProfileComponent } from './pages/profile/feed-profile/feed-profile.component';
import { TabsProfileComponent } from './pages/profile/feed-profile/tabs-profile/tabs-profile.component';
import { WithRepliesComponent } from './pages/profile/feed-profile/with-replies/with-replies.component';
import { MediaProfileComponent } from './pages/profile/feed-profile/media-profile/media-profile.component';
import { LikesProfileComponent } from './pages/profile/feed-profile/likes-profile/likes-profile.component';
import { FollowSuggestExpandedComponent } from './shared/follow-suggest-expanded/follow-suggest-expanded.component';
import { TopicsToFollowComponent } from './shared/topics-to-follow/topics-to-follow.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FeedComponent,
    LatestComponent,
    TweetComponent,
    MakeTweetComponent,
    LatestItemComponent,
    RepliesOptionsComponent,
    SearchBarComponent,
    ResultsSearchComponent,
    FollowSuggestComponent,
    FollowItemComponent,
    ExploreComponent,
    TrendsComponent,
    Covid19Component,
    NewsComponent,
    SportsComponent,
    EntertainmentComponent,
    TabsComponent,
    ForYouComponent,
    AllComponent,
    MentionsComponent,
    NotificationsComponent,
    TabsNComponent,
    ItemNotificationComponent,
    ProfileComponent,
    CarouselComponent,
    HeaderComponent,
    FeedProfileComponent,
    TabsProfileComponent,
    WithRepliesComponent,
    MediaProfileComponent,
    LikesProfileComponent,
    FollowSuggestExpandedComponent,
    TopicsToFollowComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutosizeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
