import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecruiterHomeComponent } from './recruiter/recruiter-home/recruiter-home.component';
import { HeaderComponent } from './recruiter/header/header.component';

import { ProfilePopupComponent } from './recruiter/profile-popup/profile-popup.component';
import { SeekerHomeComponent } from './seeker/seeker-home/seeker-home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SharedModule } from './shared/modules/shared.module';
import { SeekerNavigationComponent } from './seeker/navigation/navigation.component';
import { RecruiterNavigationComponent } from './recruiter/navigation/navigation.component';




@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    SignupComponent,
    MainHeaderComponent,
    FooterComponent,
  
/* Recruiter Section */
    RecruiterHomeComponent,
    HeaderComponent,
    RecruiterNavigationComponent,
    ProfilePopupComponent,
    SeekerHomeComponent,
    SeekerNavigationComponent,
  
    
 
    
/*Seeker Section */

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports:[],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
