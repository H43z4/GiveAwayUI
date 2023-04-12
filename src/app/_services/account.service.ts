import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User, generalResponse, userRoutes } from '../_models';
import { Weather } from '../_models/weather.model';
import { RegisterUser } from '../_models/userManagement/createUser.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    public isCollapsed = false;
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')|| "null"));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

     //return this.http.post<User>(`${environment.apiUrl}/Auth/Login`, { username, password })
     //return this.http.post<User>(`http://10.50.126.65:5010/api/Auth/Login`, { username, password })
     
    login(username:string, password:string) {
        return this.http.post<User>(`${environment.apiUrl}/Auth/Login`, { username, password })
            .pipe(map(user => {
                debugger
                console.log(user);
                user.Routes=[
                    {icon:"User_Management.svg", routename: "User Management", routesadd: "addUser" ,subMenuList: [
                        { routename: "Create User", routesadd: "addUser" },
                       { routename: "User List", routesadd: "userlist" },
                       { routename: "User Rights", routesadd: "userrights" }
                   ]},                
                
                
                ];
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }
            )
            
            );
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        
        this.userSubject.next(undefined!);
        this.router.navigate(['/']);
    }

   

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }
    registerUser(user: RegisterUser) {
        return this.http.post<generalResponse>(`${environment.apiUrl}/setup/CreateUser`, user);
    }
    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getweathers() {
        return this.http.get<Weather[]>(`${environment.apiUrl}/weatherforecast`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    getPageTitle(url: string) {
        let pageTitle=[
            {Title: "NR / Owner Information", url: "/master/ownerdetail" },
            {Title: "NR / Keeper", url: "/master/Keeper" },
           
        
        
        ];

        let desiredObject = pageTitle.find(element => element.url === url);
        return desiredObject?.Title;
    }

    // update(id:string, params:any) {
    //     return this.http.put(`${environment.apiUrl}/users/${id}`, params)
    //         .pipe(map(x => {
    //             // update stored user if the logged in user updated their own record
    //             if (id == this.userValue.id) {
    //                 // update local storage
    //                 const user = { ...this.userValue, ...params };
    //                 localStorage.setItem('user', JSON.stringify(user));

    //                 // publish updated user to subscribers
    //                 this.userSubject.next(user);
    //             }
    //             return x;
    //         }));
    // }

    // delete(id: string) {
    //     return this.http.delete(`${environment.apiUrl}/users/${id}`)
    //         .pipe(map(x => {
    //             // auto logout if the logged in user deleted their own record
    //             if (id == this.userValue.id) {
    //                 this.logout();
    //             }
    //             return x;
    //         }));
    // }
}
