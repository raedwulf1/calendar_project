import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainCalendarComponent } from './components/main-calendar/main-calendar.component';


const routes: Routes = [
  {
    path: '',
    component: MainCalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
