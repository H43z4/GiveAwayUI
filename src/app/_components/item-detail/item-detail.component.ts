import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { PostManagementDashboard } from 'src/app/_models/postMgt/postManagement.model';
import { ChatManagementService } from 'src/app/_services/chatMGT/chat-management.service';
import { PostManagementService } from 'src/app/_services/postManagement/post-management.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private postManagementService: PostManagementService,
    private router: Router,
    private chatService: ChatManagementService
  ) {}
  postsList: PostManagementDashboard = new PostManagementDashboard();
  ngOnInit(): void {
    this.GetPostsById();
  }
  adImages: string[] = [
    '/assets/img/products/01.png',
    '/assets/img/products/02.png',
    '/assets/img/products/img-1.png',
    '/assets/img/products/img-2.png',
  ];
  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;
  @ViewChildren(NgbSlide) slides!: QueryList<NgbSlide>;

  // Rest of your component code...
  postId: number = 0;
  slideTo(index: number) {
    const slidesArray = this.slides.toArray();
    const activeSlideId = slidesArray[index].id;
    this.carousel.activeId = activeSlideId;
  }
  adName: string = 'Item Name';
  donorName: string = 'Donor Name';
  adLocation: string = 'Location Name';
  adDate: string = '21/05/2023';
  adQuantity: number = 10;
  adExpiry: string = 'May 31, 2023';
  adDescription: string =
    "Donor Alert: Calling all Nike shoe owners! It's time to give your beloved kicks a chance to make a difference. Donate your gently used Nike shoes at our dedicated drop-off porta. Your generous contribution will empower someone in need with comfort, style, and a renewed sense of confidence. Take a step towards positive change today. Join us in transforming lives, one pair of Nike shoes at a time. Donate now and let your footwear make a lasting impact.";
  GetPostID() {
    this.postId = Number(sessionStorage.getItem('postId'));
  }
  GetPostsById() {
    this.spinner.show();
    debugger;
    this.GetPostID();
    if (this.postId == 0) {
      this.spinner.hide();
      this.toastrService.error('No data found!', 'Error!');
      return;
    }
    this.postManagementService
      .GetPostsById(this.postId)
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
  }
  AssignPostID() {
    sessionStorage.setItem('postId', this.postId.toString());
    this.router.navigateByUrl('/master/chats');
  }
  PickupRequest() {
    debugger;
    this.spinner.show();
    if (this.postsList.userId <= 0 && !this.postsList.id) {
      this.spinner.hide();
      this.toastrService.error('No data found!', 'Error!');
      return;
    }
    const formData: FormData = new FormData();
    formData.append('PostId', String(this.postsList.id));
    formData.append('ReceverUserId', String(this.postsList.userId));
    this.chatService.PickupRequest(formData).subscribe(
      (result) => {
        if (result?.status == '0') {
          this.spinner.hide();
          this.toastrService.success('Request sent successfully!', 'Success!');
          sessionStorage.setItem('postId', this.postId.toString());
          // this.router.navigateByUrl('/master/chats');
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
  ManageChatBox() {
    debugger;
    this.spinner.show();
    if (this.postsList.userId <= 0 && !this.postsList.id) {
      this.spinner.hide();
      this.toastrService.error('No data found!', 'Error!');
      return;
    }
    const formData: FormData = new FormData();
    formData.append('PostId', String(this.postsList.id));
    formData.append('ReceiverUserId', String(this.postsList.userId));
    this.chatService.createChatbox(formData).subscribe(
      (result) => {
        if (result?.status == '0') {
          this.spinner.hide();
          // this.toastrService.success('Date saved successfully!', 'Success!');
          sessionStorage.setItem('postId', this.postId.toString());
          this.router.navigateByUrl('/master/chats');
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
