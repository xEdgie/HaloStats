import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = 
[
  { path: '', component: HomeComponent },
  { path: 'stats', component: StatisticsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
