import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import {AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { LoginComponent } from './components/loginWindow/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PicturesService } from './Service/pictures.service';
import { DataserviceService } from './Service/dataservice.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { DetailWindowComponent } from './components/detailWindow/detail-window.component';
import { Users } from './models/users';

const appRoutes: Routes = [
  {
    path: 'startScreen',
    component: StartScreenComponent
  },
  {
    path: 'uploadImage',
    component: UploadImageComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detailWindow',
    component: DetailWindowComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: StartScreenComponent
  } // ,
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    UploadImageComponent,
    DetailWindowComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [PicturesService, DataserviceService, UploadImageComponent, Users],
  bootstrap: [AppComponent]
})
export class AppModule {
}
