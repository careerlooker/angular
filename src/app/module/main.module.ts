import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

const mainRoutes:Routes=[
    {path:'login',component:LoginComponent},
    {path:'signup', component:SignupComponent}
]
@NgModule({
    imports:[],
    exports:[]
})
export class MainModule{}