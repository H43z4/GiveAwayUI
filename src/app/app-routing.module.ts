import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, MaterComponent, HomeComponent, DashboardComponent, CreateUserComponent, UserListComponent, DynamicSetupsComponent } from './_components';

import { AuthGuard } from './_helpers/auth.guard';
import { RegistrationComponent } from './_components/account/registration/registration.component';
import { AddItemsComponent } from './_components/add-items/add-items.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  { path: 'master', component: MaterComponent, 
  children: [
    // { path: '', component:  AComponent },
    { path: 'home', component:  HomeComponent, canActivate: [AuthGuard]  },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'addItem', component: AddItemsComponent },

    // User Management
    { path: 'addUser', component: CreateUserComponent ,canActivate: [AuthGuard]   },
    { path: 'userlist', component: UserListComponent ,canActivate: [AuthGuard]   },
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
