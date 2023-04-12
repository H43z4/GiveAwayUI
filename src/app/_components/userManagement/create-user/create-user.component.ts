import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlContainer, MinLengthValidator} from '@angular/forms';
import { dropDownList,dropDownListSiteOffice,dropDownListTehsil,dropDownListPostOffice } from '../../../_models';
import { UserManagementService } from '../../../_services';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { CreateUser } from 'src/app/_models/userManagement/createUser.model';



@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  Isdisabled:number=0;

  ddTehsil:dropDownListTehsil[]=[];
  ddPostOffice:dropDownListPostOffice[]=[];
  ddaddressArea:dropDownList[]=[];

  dddistricts:dropDownList[]= [];
  ddSiteOffices:dropDownListSiteOffice[]=[];
  ddSiteOfficeFiltered:dropDownListSiteOffice[]=[];
  ddRoles:dropDownList[]= [];
  ddLineManager:dropDownList[]= [];
  showLineManager:boolean=false;


  btnFetchVisibile=true;
  btnDeleteVisibile=false;

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastrService: ToastrService,
    private UserManagementService:UserManagementService) {
     }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getallDropdowns();
  }
  form = new FormGroup({
    cnic: new FormControl('',[Validators.required,Validators.minLength(13)]),
    personName: new FormControl('',Validators.required),
    fatherHusbandName: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    //oldCNIC: new FormControl(''),
    ntn: new FormControl(''),
    phoneNumber: new FormControl('',[Validators.required,Validators.minLength(11)]),
    phone2: new FormControl('',[Validators.required,Validators.minLength(11)]),

    UserName: new FormControl('',Validators.required),
    Password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    cnfPassword: new FormControl('',[Validators.required,Validators.minLength(8)]),
    RoleId: new FormControl('',Validators.required),
    DistrictId: new FormControl('',Validators.required),
    SiteOfficeId: new FormControl('',Validators.required),
    LineManagerId: new FormControl('')


  });
  get f(){
    return this.form.controls;
  }
  changeDistrict(){
    if(this.form.value?.DistrictId){
     this.ddSiteOfficeFiltered = this.ddSiteOffices.filter(o => o.districtId == this.form.value.DistrictId);
      if(this.ddSiteOfficeFiltered.length>0){
        this.form.patchValue({SiteOfficeId:this.ddSiteOfficeFiltered[0].value});
      }
    }else{
      this.ddSiteOfficeFiltered=this.ddSiteOffices;
    }
  }



getallDropdowns(){
    this.spinner.show();
    this.UserManagementService.getDropDownCreateUser().pipe(first()).subscribe(
      result => {
        console.log(result);
        if(result?.status=='0'){
          if(result?.data){
            if(result.data?.districts){
              this.dddistricts=result.data.districts;
            }

            if(result.data?.addressArea){
              // this.DataService.setDistricts(result.data.districts);
              this.ddaddressArea=result.data.addressArea;
            }
            
            if(result.data?.tehsils){
              this.ddTehsil = result.data.tehsils;
            }
          
            if(result.data?.postOffice){
              this.ddPostOffice = result.data?.postOffice;
            }

            if(result.data?.siteOffices){
              this.ddSiteOffices = result.data.siteOffices;
            }

            if(result.data?.roles){
              this.ddRoles = result.data.roles;
            }
          }
          
          this.spinner.hide();
        }else{
        this.spinner.hide();
        this.toastrService.error(result?.message || "Bad request", 'Error!');
        }},
      error => {
        this.spinner.hide();
        this.toastrService.error(error, 'Error!');
      },
      () => { 
        this.spinner.hide();  
      });
}

Save(){
  this.spinner.show();

  if (!this.form.valid) {
      this.spinner.hide();
      this.form.markAllAsTouched();
      return;
    }

    if(this.form.value.Password!==this.form.value.cnfPassword){
      this.spinner.hide();
      this.toastrService.error('Password and confirm password should be same', 'Error!');
      return;
    }



        let userObj = new CreateUser();

        userObj.UserName = this.form.value.UserName;
        userObj.Password = this.form.value.Password;
        userObj.DistrictId = this.form.value.DistrictId;
        userObj.RoleId = this.form.value.RoleId;
        userObj.SiteOfficeId = this.form.value.SiteOfficeId;
        if(this.form.value?.LineManagerId){
          userObj.LineManagerId = this.form.value?.LineManagerId;
        }else{
          userObj.LineManagerId = undefined;
        }
     
          console.log(userObj);
          this.UserManagementService.saveCreateUser(userObj).subscribe(
            result => {

              if(result?.status=='0'){
                this.spinner.hide();
                this.toastrService.success('User created successfully!', 'Success!');
                this.router.navigateByUrl('master/userlist');
                 
              }else{
              this.spinner.hide();
              this.toastrService.error(result.message, 'Error!');
              } },
            error => {
              this.spinner.hide();
              this.toastrService.error(error, 'Error!');
            },() => {
              this.spinner.hide();
            });
}

// Enable Disable customer and bussiness

restApplication(){
  this.form.reset();
  this.ClearCustomer();
  this.ClearUserDetail();
}

  ClearUserDetail() {
    this.form.patchValue({UserName:''});
    this.form.patchValue({Password:''});
    this.form.patchValue({cnfPassword:''});
    this.form.patchValue({RoleId:''});
   
    this.form.patchValue({DistrictId:''});
    this.form.patchValue({SiteOfficeId:''});
    this.form.patchValue({LineManagerId:''});
  }


ClearCustomer() {
  this.form.patchValue({cnic:''});
  this.form.patchValue({personName:''});
  this.form.patchValue({fatherHusbandName:''});
  this.form.patchValue({email:''});
 // this.form.patchValue({oldCNIC:''});
  this.form.patchValue({ntn:''});
  this.form.patchValue({phoneNumber:''});
  this.form.patchValue({phone2:''});
  this.btnFetchVisibile=true;
  this.btnDeleteVisibile=false;
  this.form.markAsUntouched();
  this.EnablePerson();
}
EnablePerson(){
  this.Isdisabled=0;
  this.form.controls['cnic'].enable();
  this.form.controls['personName'].enable();
  this.form.controls['fatherHusbandName'].enable();
  this.form.controls['email'].enable();
  //this.form.controls['oldCNIC'].enable();
  this.form.controls['ntn'].enable();
  this.form.controls['phoneNumber'].enable();
  this.form.controls['phone2'].enable();
}

DisablePerson(){
  this.Isdisabled=1;
  this.form.controls['cnic'].disable();
  this.form.controls['personName'].disable();
  this.form.controls['fatherHusbandName'].disable();
  this.form.controls['email'].disable();
 // this.form.controls['oldCNIC'].disable();
  this.form.controls['ntn'].disable();
  this.form.controls['phoneNumber'].disable();
  this.form.controls['phone2'].disable();
}





addValidatorLineManager(){ 
  this.form.controls['LineManagerId'].addValidators(Validators.required);  
}


removeValidatorsLineManager(){
  this.form.controls['LineManagerId'].clearValidators(); 
  this.form.patchValue({LineManagerId:''});
}

keyPressNumberOnly(event: KeyboardEvent) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (!pattern.test(inputChar)) {    
      // invalid character, prevent input
      event.preventDefault();
  }
}
keyPressCNIC(event: KeyboardEvent) {
const pattern = /[0-9-]/;
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
}}
}
