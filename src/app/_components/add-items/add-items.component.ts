import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { dropDownList } from 'src/app/_models';
import { PostManagement } from 'src/app/_models/postMgt/postManagement.model';
import { PostManagementService } from 'src/app/_services/postManagement/post-management.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css'],
})
export class AddItemsComponent implements OnInit {
  ddCategory: dropDownList[] = [];
  createPost: PostManagement = new PostManagement();
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastrService: ToastrService,
    private postManagementService: PostManagementService
  ) {}

  ngOnInit(): void {
    this.getallDropdowns();
  }
  selectedItemType: string = '';

  form = new FormGroup({
    itemName: new FormControl('', [Validators.required]),
    itemType: new FormControl('', Validators.required),
    itemSize: new FormControl(''),
    ItemQuantity: new FormControl('', [Validators.required]),
    ItemExpiry: new FormControl(''),
    ItemDescription: new FormControl('', [Validators.required]),
    ItemLoc: new FormControl('', [Validators.required]),
    imageUpload: new FormControl(''),
  });
  get f() {
    return this.form.controls;
  }
  uploadedFiles: File[] = [];
  canvases: HTMLCanvasElement[] = [];
  imagesCount = 0;
  // handleFileInput(event: any) {
  //   const files: FileList = event.target.files;
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       const img = new Image();
  //       img.src = e.target.result;
  //       img.width = 150;
  //       img.height = 150;
  //       img.onload = () => {
  //         const canvas = document.createElement('canvas');
  //         canvas.width = img.width;
  //         canvas.height = img.height;
  //         const ctx = canvas.getContext('2d');
  //         if (ctx != null) {
  //           ctx.drawImage(img, 0, 0);
  //         }
  //         this.canvases.push(canvas);
  //       };
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
  handleFileInput(event: any) {
    const files: FileList = event.target.files;
    const allowedExtensions = ['jpg', 'jpeg'];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const extension = file.name.split('.').pop()?.toLowerCase();

      // Check if the file has a valid extension
      if (extension && allowedExtensions.includes(extension)) {
        if (this.canvases.length >= 10 || this.imagesCount >= 10) {
          // Maximum limit of 10 image tags reached
          break;
        }

        const reader = new FileReader();
        reader.onload = (e: any) => {
          const dataURL = e.target.result;
          this.canvases.push(dataURL);
          this.imagesCount++;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  deleteImage(index: number) {
    this.uploadedFiles.splice(index, 1);
    this.canvases.splice(index, 1);
    this.imagesCount--;
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

  Save() {
    debugger;
    this.spinner.show();
    if (this.selectedItemType == '1') {
      this.form.controls['ItemExpiry'].addValidators(Validators.required);
    }
    if (!this.form.valid) {
      this.spinner.hide();
      this.form.markAllAsTouched();
      return;
    }
    const formData: FormData = new FormData();
    formData.append('UserId', String(1));
    formData.append('CategoryId', String(this.form.value.itemType));
    formData.append('PostTitle', this.form.value.itemName);
    formData.append('PostDiscription', this.form.value.ItemDescription);
    formData.append('Quantity', String(this.form.value.ItemQuantity));
    formData.append('ValidDate', this.form.value.ItemExpiry!.toString());
    formData.append('ItemSize', String(this.form.value.itemSize));
    formData.append('Location', this.form.value.ItemLoc);
    // for (let i = 0; i < createPost.imageUpload.length; i++) {
    //   formData.append('Images', createPost.imageUpload[i]);
    // }
    // const imageElements = document.querySelectorAll('.uploaded-image');
    // imageElements.forEach((element: Element) => {
    //   const imageElement = element as HTMLImageElement;
    //   const canvas = document.createElement('canvas');
    //   canvas.width = imageElement.naturalWidth;
    //   canvas.height = imageElement.naturalHeight;
    //   const ctx = canvas.getContext('2d');
    //   ctx?.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
    //   Promise.all(imagePromises).then((imageBlobs) => {
    //     for (const blob of imageBlobs) {
    //       if (blob) {
    //         formData.append('Images', blob, `image_${Date.now()}`);
    //       }
    //     }
    this.postManagementService.createPost(formData).subscribe(
      (result) => {
        if (result?.status == '0') {
          this.spinner.hide();
          this.toastrService.success('Date saved successfully!', 'Success!');
          this.router.navigateByUrl('master/dashboard');
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
