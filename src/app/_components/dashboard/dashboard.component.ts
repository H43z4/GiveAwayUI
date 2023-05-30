import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../_services/account.service';
import { Weather } from '../../_models/weather.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dropDownList } from 'src/app/_models';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PostManagementService } from 'src/app/_services/postManagement/post-management.service';
import { first } from 'rxjs';
import {
  PostManagement,
  PostManagementDashboard,
} from 'src/app/_models/postMgt/postManagement.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  Weather_LIST?: Weather[];
  returnUrl: string = '';
  role: string | null | undefined;
  constructor(
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private postManagementService: PostManagementService,
    private router: Router
  ) {}
  ddCategory: dropDownList[] = [];
  postsList: PostManagementDashboard[] = [];
  selectedItemType: string = '';

  ngOnInit(): void {
    this.getallDropdowns();
    this.GetPosts();
  }
  form = new FormGroup({
    itemName: new FormControl(''),
    itemType: new FormControl(''),
  });
  get f() {
    return this.form.controls;
  }
  getallDropdowns() {
    this.spinner.show();
    this.postManagementService
      .getCategoryDropDown()
      .pipe(first())
      .subscribe(
        (result) => {
          debugger;
          console.log(result);
          if (result?.status == '0') {
            if (result?.data) {
              if (result.data) {
                this.ddCategory = result.data;
              }
            }

            this.spinner.hide();
          } else {
            this.spinner.hide();
            this.toastrService.error(
              result?.message || 'Bad request',
              'Error!'
            );
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
  GetPosts() {
    this.spinner.show();
    this.postManagementService
      .GetPosts()
      .pipe(first())
      .subscribe(
        (result) => {
          debugger;
          console.log(result);
          if (result?.status == '0') {
            if (result?.data) {
              if (result.data) {
                this.postsList = result.data;
              }
            }

            this.spinner.hide();
          } else {
            this.spinner.hide();
            this.toastrService.error(
              result?.message || 'Bad request',
              'Error!'
            );
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
  GetPostsByTitle() {
    this.spinner.show();
    debugger
    let search = this.form.controls['itemName'].value;
    let lov = this.form.controls['itemType'].value;
    if (lov.trim()=='') {
      lov=0;
    }
    if (search.trim() != '' || lov.trim != '') {
      this.postManagementService
        .GetPostsByTitle(search,lov)
        .pipe(first())
        .subscribe(
          (result) => {
            debugger;
            console.log(result);
            if (result?.status == '0') {
              if (result?.data) {
                if (result.data) {
                  // this.postsList = [];
                  this.postsList = result.data;
                }
              }

              this.spinner.hide();
            } else {
              this.spinner.hide();
              this.toastrService.error(
                result?.message || 'Bad request',
                'Error!'
              );
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
    }else{
      this.GetPosts();
    }
  }
  AssignPostID(postid:number=0){
    sessionStorage.setItem('postId',postid.toString());
    this.router.navigateByUrl('/master/itemDetails');
  }
}
