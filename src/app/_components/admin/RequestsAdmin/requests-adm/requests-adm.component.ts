import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { PostManagementService } from 'src/app/_services/postManagement/post-management.service';

@Component({
  selector: 'app-requests-adm',
  templateUrl: './requests-adm.component.html',
  styleUrls: ['./requests-adm.component.css']
})
export class RequestsAdmComponent implements OnInit {
  userName: string;
  userEmail: string;
  userLocation: string;
  userPictureUrl: string;
  userAds: any[]=[]; // Replace with your actual ad type
  constructor(    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private postManagementService: PostManagementService,
    private router: Router) {
    // Initialize user data
    this.userName = 'John Doe';
    this.userEmail = 'johndoe@example.com';
    this.userLocation = 'New York';
    this.userPictureUrl = '/assets/img/staf/1.png';

  }
  ngOnInit(): void {
    this.GetNewPosts();
  }
  GetNewPosts() {
    this.spinner.show();
    this.postManagementService
      .GetNewPosts()
      .pipe(first())
      .subscribe(
        (result) => {
          debugger;
          console.log(result);
          if (result?.status == '0') {
            if (result?.data) {
              if (result.data) {
                this.userAds = result.data;
              }
            }

            this.spinner.hide();
          } else {
            this.spinner.hide();
            this.userAds = [];
            this.toastrService.error(
              result?.message || 'Bad request',
              'Error!'
            );
          }
        },
        (error) => {
          this.spinner.hide();
          this.userAds = [];
          this.toastrService.error(error, 'Error!');
        },
        () => {
          this.spinner.hide();
        }
      );
  }

  changeApprovalState(adId: number,status:boolean) {
    debugger;
    this.spinner.show();
    if (adId < 1) {
      this.spinner.hide();
      this.toastrService.error('Some error occured!', 'Error!');
      return;
    }
    const formData: FormData = new FormData();
    formData.append('Id', String(adId));
    formData.append('Status', String(status));
    this.postManagementService.changeApprovalState(formData).subscribe(
      (result) => {
        if (result?.status == '0') {
          this.spinner.hide();
          this.toastrService.success('Date saved successfully!', 'Success!');
          this.GetNewPosts();
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
