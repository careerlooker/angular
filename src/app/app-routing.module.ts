import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { SignupComponent } from './signup/signup.component';
import { RecruiterHomeComponent } from './recruiter/recruiter-home/recruiter-home.component';
import { SeekerHomeComponent } from './seeker/seeker-home/seeker-home.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes:Routes=[
    {path:'',redirectTo:'/',pathMatch:'full'},
    {path:'',component:IndexComponent},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'reqem',component:RecruiterHomeComponent,loadChildren:'./recruiter/recruiter.module#RecruiterModule',canActivate:[AuthGuard]},
    {path:'reqem/my-account',component:RecruiterHomeComponent, loadChildren:'./recruiter/my-account/my-account.module#MyAccountModule',canActivate:[AuthGuard]},
    {path:'reqem/my-lising',component:RecruiterHomeComponent, loadChildren:'./recruiter/my-listing/my-listing.module#MyListingModule',canActivate:[AuthGuard]},
    {path:'seeqem',component:SeekerHomeComponent,loadChildren:'./seeker/seeker.module#SeekerModule',canActivate:[AuthGuard]},
    {path:'seeqem/my-profile',component:SeekerHomeComponent,loadChildren:'./seeker/my-profile/my-profile.module#MyProfileModule',canActivate:[AuthGuard]}
  
    
]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}