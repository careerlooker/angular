import { NgModule ,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { AboutCompanyComponent } from './about-company/about-company.component';
import { SocialNetworksComponent } from './social-networks/social-networks.component';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { MyAccountComponent } from './my-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RichTextEditorAllModule, RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor'; 
import { SharedModule } from 'src/app/shared/modules/shared.module';



@NgModule({
    declarations:[
        MyAccountComponent,
        AccountComponent,
        AboutCompanyComponent,
        NotificationComponent,
        ProfileComponent,
        SocialNetworksComponent,
    
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RichTextEditorModule,
        RichTextEditorAllModule,
        SharedModule,
        MyAccountRoutingModule,  
    ],
    exports:[],
    schemas:[
        CUSTOM_ELEMENTS_SCHEMA,
         NO_ERRORS_SCHEMA 
    ]
})

export class MyAccountModule{}