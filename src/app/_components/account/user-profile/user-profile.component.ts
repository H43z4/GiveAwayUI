import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { PostManagementService } from 'src/app/_services/postManagement/post-management.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userName: string;
  userEmail: string;
  userLocation: string;
  userPictureUrl: string;
  userAds: any[]=[]; // Replace with your actual ad type
  userReqs: any[]=[]; // Replace with your actual ad type

  constructor(private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private postManagementService: PostManagementService,
    private router: Router) {
    // Initialize user data
    this.userName = 'John Doe';
    this.userEmail = 'johndoe@example.com';
    this.userLocation = 'New York';
    this.userPictureUrl = '/assets/img/staf/1.png';
    // this.userReqs = [
    //   { id: 1, title: 'Ad 1', description: 'Description 1' },
    //   { id: 2, title: 'Ad 2', description: 'Description 2' },
    //   // Add more ad objects as needed
    // ];
  }

  editProfile() {
    // Implement edit profile logic
  }

  editAd(adId: number) {
    // Implement edit ad logic for the specified ad ID
  }

  activateAd(adId: number) {
    // Implement activate ad logic for the specified ad ID
  }

  GetUserApprovals() {
    this.spinner.show();
    debugger;
    this.postManagementService
      .GetUserApprovals()
      .pipe(first())
      .subscribe(
        (result) => {
          debugger;
          console.log(result);
          if (result?.status == '0') {
            if (result?.data) {
              if (result.data) {
                // this.postsList = [];
                this.userAds = result.data;
                // this.userReqs = result.data.reqPosts;
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
  GetUserRequests() {
    this.spinner.show();
    debugger;
    this.postManagementService
      .GetUserRequests()
      .pipe(first())
      .subscribe(
        (result) => {
          debugger;
          console.log(result);
          if (result?.status == '0') {
            if (result?.data) {
              if (result.data) {
                // this.postsList = [];
                // this.userAds = result.data.posts;
                this.userReqs = result.data;
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
  GetUserDetails() {
    this.spinner.show();
    debugger;
    this.postManagementService
      .GetUserById()
      .pipe(first())
      .subscribe(
        (result) => {
          debugger;
          console.log(result);
          if (result?.status == '0') {
            if (result?.data) {
              if (result.data) {
                // this.postsList = [];
                this.userName = result.data.fullName;
                this.userEmail = result.data.email;
                this.userLocation = result.data.address;
                // this.userAds = result.data.posts;
                // this.userReqs = result.data.reqPosts;
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

  ngOnInit(): void {
    this.GetUserDetails();
    this.GetUserApprovals();
    this.GetUserRequests();
  }

}
