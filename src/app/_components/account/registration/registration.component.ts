import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RegisterUser } from 'src/app/_models/userManagement/createUser.model';
import { AccountService } from 'src/app/_services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  loading = false;
  submitted = false;
  errmsg = '';
  selectedItemType: string = '';
  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private toastrService: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}
  regForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    userType: new FormControl('', [Validators.required]),
    uniqueId: new FormControl(''),
    fullName: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.regForm.controls;
  }
  keyPressNumberOnly(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  keyPressAlfhabetsOnly(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  checkPassword() {
    debugger;
    if (this.regForm.value.password !== this.regForm.value.confirmPassword) {
      this.spinner.hide();
      this.toastrService.warning(
        'Password and confirm password should be same',
        'Warning!'
      );
      return false;
    }
    return true;
  }
  checkUIDValidator() {
    debugger;
    if (this.selectedItemType == '2') {
      this.regForm.controls['uniqueId'].addValidators(Validators.required);
    }else{
      this.regForm.controls['uniqueId'].removeValidators(Validators.required);
    }
  }
  submit() {
    this.spinner.show();
    //console.log(this.form.value.name);
    // stop here if form is invalid
    this.submitted = true;
    this.errmsg = '';
    if (!this.regForm.valid) {
      this.spinner.hide();
      this.regForm.markAllAsTouched();
      return;
    }
    if (!this.checkPassword()) {
      return;
    }
    if (this.regForm.value.password !== this.regForm.value.confirmPassword) {
      this.spinner.hide();
      this.toastrService.error(
        'Password and confirm password should be same',
        'Error!'
      );
      return;
    }
    this.loading = true;

    let userObj = new RegisterUser();

    userObj.userName = this.regForm.value.userName;
    userObj.password = this.regForm.value.password;
    userObj.fullName = this.regForm.value.fullName;
    userObj.address = this.regForm.value.address;
    userObj.email = this.regForm.value.email;
    userObj.phoneNumber = this.regForm.value.phoneNumber;
    userObj.UserTypeId = this.regForm.value.userType;
    debugger
    if (
      this.regForm.value.uniqueId.trim() == null ||
      this.regForm.value.uniqueId.trim() == ''
    ) {
      userObj.PersonId = 'NA';
    } else {
      userObj.PersonId = this.regForm.value.uniqueId;
    }

    this.accountService.registerUser(userObj).subscribe(
      (result) => {
        if (result?.status == '0') {
          debugger;
          this.spinner.hide();
          //  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/master/home';
          debugger;
          this.toastrService.success('Data saved successfully!', 'Success!');
          this.router.navigateByUrl('');
        } else if (result?.status != '1') {
          this.spinner.hide();
          this.toastrService.error(
            'Some error occured. Please Contact system administrator',
            'Error!'
          );
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
