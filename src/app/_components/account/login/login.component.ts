import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AccountService } from '../../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  userFullName: string = '';
  errmsg = '';
  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private toastrService: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    // email: new FormControl('', [Validators.required, Validators.email]),
    // body: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    this.spinner.show();
    //console.log(this.form.value.name);
    // stop here if form is invalid
    this.submitted = true;
    this.errmsg = '';
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    this.accountService
      .login(this.form.value.name, this.form.value.password)
      .subscribe(
        (result) => {
          if (result?.status == '0') {
            this.spinner.hide();
            //  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/master/home';
            debugger;
            this.userFullName = localStorage.getItem('userFullName')!.replace(/"/g, '');
            // localStorage.setItem('role', result?.data?.roles);

            // var role = result?.data?.roles;

            // ETI
            // let returnUrl="";

            // localStorage.setItem('role', result?.data?.roles);

            //  returnUrl = ;
            if (this.userFullName !=='Administrator') {
              this.router.navigateByUrl('/master/dashboard');
            }else{
              this.router.navigateByUrl('/master/dashboardAdmin');
            }
          } else if (result?.status == '1') {
            this.spinner.hide();
            this.toastrService.error('Invalid Username or Password', 'Error!');
          } else {
            this.spinner.hide();
            this.toastrService.error(result.message, 'Error!');
          }
        },
        (error) => {
          this.spinner.hide();
          this.toastrService.error(error, 'Error!');
        },
        () => {
          this.spinner.hide();
        }
      );
  }
}
