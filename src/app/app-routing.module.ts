import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, MaterComponent, HomeComponent, DashboardComponent, CreateUserComponent, UserListComponent, DynamicSetupsComponent } from './_components';

import { AuthGuard } from './_helpers/auth.guard';
import { RegistrationComponent } from './_components/account/registration/registration.component';
import { AddItemsComponent } from './_components/add-items/add-items.component';
import { AboutUsComponent } from './_components/info/about-us/about-us.component';
import { ContactUsComponent } from './_components/info/contact-us/contact-us.component';
import { ItemDetailComponent } from './_components/item-detail/item-detail.component';
import { UserProfileComponent } from './_components/account/user-profile/user-profile.component';
import { ChatComponent } from './_components/chat/chat.component';
import { DashboardAdmComponent } from './_components/admin/dashboard-adm/dashboard-adm.component';
import { RequestsAdmComponent } from './_components/admin/RequestsAdmin/requests-adm/requests-adm.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  { path: 'master', component: MaterComponent,
  children: [
    // { path: '', component:  AComponent },
    { path: 'home', component:  HomeComponent, canActivate: [AuthGuard]  },
    { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
    { path: 'addItem', component: AddItemsComponent,canActivate: [AuthGuard] },
    { path: 'itemDetails', component: ItemDetailComponent,canActivate: [AuthGuard] },
    { path: 'aboutUs', component: AboutUsComponent },
    { path: 'contactUs', component: ContactUsComponent },
    { path: 'usrProfile', component: UserProfileComponent,canActivate: [AuthGuard] },
    { path: 'chats', component: ChatComponent,canActivate: [AuthGuard] },

    // User Management
    { path: 'addUser', component: CreateUserComponent ,canActivate: [AuthGuard]   },
    { path: 'userlist', component: UserListComponent ,canActivate: [AuthGuard]   },
    { path: 'dashboardAdmin', component: DashboardAdmComponent ,canActivate: [AuthGuard]   },
    { path: 'requestsAdmin', component: RequestsAdmComponent ,canActivate: [AuthGuard]   },
  ]
 },
  //{ path: 'master/home', component: HomeComponent, canActivate: [AuthGuard]  },

    // { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    // { path: 'account', loadChildren: accountModule },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
