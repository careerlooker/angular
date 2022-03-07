import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { AboutCompanyComponent } from './about-company/about-company.component';
import { SocialNetworksComponent } from './social-networks/social-networks.component';
import { NotificationComponent } from './notification/notification.component';
import { MyAccountComponent } from './my-account.component';

const childRoutes:Routes=[
    {path:'',component:MyAccountComponent,children:[
    {path:'',redirectTo:'profile',pathMatch:'full'},
    {path:'profile',component:ProfileComponent},
    {path:'account',component:AccountComponent},
    {path:'about-company',component:AboutCompanyComponent},
    {path:'notification',component:NotificationComponent},
    {path:'social-networks',component:SocialNetworksComponent}
    ]},

   
        // {path:'',redirectTo:'profile',pathMatch:'full'},
        // {path:'profile',component:ProfileComponent},
        // {path:'account',component:AccountComponent},
        // {path:'emails',component:EmailsComponent},
        // {path:'notification',component:NotificationComponent},
        // {path:'social-networks',component:SocialNetworksComponent},
]
@NgModule({
    imports:[RouterModule.forChild(childRoutes)],
    exports:[RouterModule]
})
export class MyAccountRoutingModule{}