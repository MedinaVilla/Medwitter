import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './pages/explore/explore.component';
import { Covid19Component } from './pages/explore/tabs/covid19/covid19.component';
import { EntertainmentComponent } from './pages/explore/tabs/entertainment/entertainment.component';
import { NewsComponent } from './pages/explore/tabs/news/news.component';
import { SportsComponent } from './pages/explore/tabs/sports/sports.component';
import { TrendsComponent } from './pages/explore/tabs/trends/trends.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "explore/for-you", component: ExploreComponent },
  { path: "explore/tabs/trends", component: TrendsComponent },
  { path: "explore/tabs/covid-19", component: Covid19Component },
  { path: "explore/tabs/news", component: NewsComponent },
  { path: "explore/tabs/sports", component: SportsComponent },
  { path: "explore/tabs/entertainment", component: EntertainmentComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
