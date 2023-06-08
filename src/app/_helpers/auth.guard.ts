import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../_services/account.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        debugger;
      //  if (user && user.Routes?.find(o => o.routesadd === route.url[0]['path'])) {
    if (user?.data?.fullName === 'Administrator' && state.url.includes('Admin')) {
            // authorised so return true
            //console.log("Log from auth service");
           // console.log(user);
            return true;
        }
        else if (user?.data?.fullName !== 'Administrator' && !state.url.includes('Admin')) {
          return true;
        }

        // not logged in so redirect to login page with the return url
        // this.router.navigate([''], { queryParams: { returnUrl: state.url }});
        this.router.navigateByUrl('');

        return false;
    }
}
