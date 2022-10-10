import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './pages/event/event.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { Covid19Component } from './pages/explore/tabs/covid19/covid19.component';
import { EntertainmentComponent } from './pages/explore/tabs/entertainment/entertainment.component';
import { NewsComponent } from './pages/explore/tabs/news/news.component';
import { SportsComponent } from './pages/explore/tabs/sports/sports.component';
import { TrendsComponent } from './pages/explore/tabs/trends/trends.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeListComponent } from './pages/lists/home/home.component';
import { ListsComponent } from './pages/lists/lists.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { AllComponent } from './pages/notifications/all/all.component';
import { MentionsComponent } from './pages/notifications/mentions/mentions.component';
import { LikesProfileComponent } from './pages/profile/feed-profile/likes-profile/likes-profile.component';
import { MediaProfileComponent } from './pages/profile/feed-profile/media-profile/media-profile.component';
import { WithRepliesComponent } from './pages/profile/feed-profile/with-replies/with-replies.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SavedComponent } from './pages/saved/saved.component';
import { SearchComponent } from './pages/search/search/search.component';
import { TweetStatusComponent } from './pages/tweet-status/tweet-status.component';
import { HashtagSearchComponent } from './shared/hashtag-search/hashtag-search.component';
import { ImageCropperComponent } from './shared/image-cropper/image-cropper.component';
import { ProfilePreviewCardComponent } from './shared/profile-preview-card/profile-preview-card.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "explore/for-you", component: ExploreComponent },
  { path: "explore/tabs/trends", component: TrendsComponent },
  { path: "explore/tabs/covid-19", component: Covid19Component },
  { path: "explore/tabs/news", component: NewsComponent },
  { path: "explore/tabs/sports", component: SportsComponent },
  { path: "explore/tabs/entertainment", component: EntertainmentComponent },
  { path: "notifications", component: AllComponent },
  { path: "notifications/mentions", component: MentionsComponent },
  { path: "profile", component: ProfileComponent },
  { path: "search", component: SearchComponent },
  { path: "messages", component: MessagesComponent },
  { path: "i/bookmarks", component: SavedComponent },
  {
    path: ':user/lists',
    component: ListsComponent,
  },
  {
    path: ':user/status/:idTweet',
    component: TweetStatusComponent,
  },
  {
    path: ':user/status/:idTweet/photo/:number',
    redirectTo:":user/status/:idTweet",
    pathMatch:'full'
  },
  {
    path: ':i/events/:idEvent',
    component: EventComponent,
  },
  {
    path: ':i/lists/:idList',
    component: HomeListComponent,
  },

  { path: ":user/with_replies", component: WithRepliesComponent },
  { path: ":user/media", component: MediaProfileComponent },
  { path: ":user/likes", component: LikesProfileComponent },
  { path: "cropper", component: HashtagSearchComponent },

  { path: ":user", component: ProfileComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
