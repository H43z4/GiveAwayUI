import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MetismenuAngularModule } from "@metismenu/angular";
import { DataTablesModule } from 'angular-datatables';
import { CreateUserComponent, DashboardComponent, DynamicSetupsComponent, HomeComponent, LoginComponent, MaterComponent, UserListComponent } from './_components';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { HeaderComponent } from './_components/header/header.component';
import { RegistrationComponent } from './_components/account/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    MaterComponent,
    DynamicSetupsComponent,
    CreateUserComponent,
    UserListComponent,
    SidebarComponent,
    HeaderComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgSelectModule ,
    NgbModule,
    MetismenuAngularModule,
    NgxTrimDirectiveModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot({
    // timeOut: 5000, // 5 seconds
    // closeButton: true,
    // progressBar: true,
  }),
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }