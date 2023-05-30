import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  role: string | null | undefined;
  userFullName: string = '';
  constructor() {}

  ngOnInit(): void {
    this.getRole();
  }

  //test
  getRole() {
    this.role = localStorage.getItem('role');
    this.userFullName = localStorage.getItem('userFullName')!.replace(/"/g, '');
  }
}
