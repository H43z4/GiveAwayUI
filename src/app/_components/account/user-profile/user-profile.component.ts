import { Component, OnInit } from '@angular/core';

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
  userAds: any[]; // Replace with your actual ad type

  constructor() {
    // Initialize user data
    this.userName = 'John Doe';
    this.userEmail = 'johndoe@example.com';
    this.userLocation = 'New York';
    this.userPictureUrl = '/assets/img/staf/1.png';
    this.userAds = [
      { id: 1, title: 'Ad 1', description: 'Description 1' },
      { id: 2, title: 'Ad 2', description: 'Description 2' },
      // Add more ad objects as needed
    ];
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

  ngOnInit(): void {
  }

}
