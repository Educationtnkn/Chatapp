import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { IntialcoatingComponent } from './intialcoating/intialcoating.component';
import { FinalcoatingComponent } from './finalcoating/finalcoating.component';

const routes: Routes = [
  { path: 'Report', component: ReportComponent },
  { path: '', component: ReportComponent },
  { path: 'InitialCoating', component: IntialcoatingComponent },
  { path: 'FinalCoating', component: FinalcoatingComponent }
  // { path: 'User', component: UserComponent }
];


// const routes: Routes =[
//   {
//     path: '',
//     redirectTo: 'Dashboard',
//     pathMatch: 'full',
//     component:DashboardComponent
//   }, {
//     path: '',
//     component: AppComponent,
//     children: [{
//       path: '',
//       loadChildren: () => import('./app.module').then(m => m.AppModule)
//     }]
//   }
// ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
