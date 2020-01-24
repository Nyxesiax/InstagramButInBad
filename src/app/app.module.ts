import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/firebase.app.module';
import { AngularFirestoreModule } from '@angular/fire/firestore/firestore.module';
import { environment } from '../environments/environment';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { LoginComponent } from './components/loginWindow/login.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const appRoutes: Routes = [
  { path: 'startScreen',
    component: StartScreenComponent},
  { path: 'dashboard',
    component: DashboardComponent},
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '',
    component: StartScreenComponent},//,
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
