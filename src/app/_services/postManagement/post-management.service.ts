import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { generalResponse } from 'src/app/_models';
import { PostManagement } from 'src/app/_models/postMgt/postManagement.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostManagementService {
  constructor(private http: HttpClient) {}
  getCategoryDropDown() {
    return this.http.get<generalResponse>(
      `${environment.apiUrl}/DropDown/GetCategoryLOV`
    );
  }

  createPost(formData: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<generalResponse>(`${environment.apiUrl}/Post/CreatePost`, formData, {
      headers,
    });
  }
  changeApprovalState(formData: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<generalResponse>(`${environment.apiUrl}/Post/ChnagePostApprovalStatus`, formData, {
      headers,
    });
  }
  GetPosts() {
    return this.http.get<generalResponse>(`${environment.apiUrl}/Post/GetPosts`);
  }
  GetNewPosts() {
    return this.http.get<generalResponse>(`${environment.apiUrl}/Post/GetAllInActivePosts`);
  }
  GetPostsByTitle(str:string, lov:number=0) {
    return this.http.get<generalResponse>(`${environment.apiUrl}/Post/SearchPostsbyTitle?searchstr=${str}&catogaryid=${lov}`);
  }
  GetPostsById(id:number=0) {
    return this.http.get<generalResponse>(`${environment.apiUrl}/Post/GetPostById?id=${id}`);
  }
  GetDashboardTaxCounts() {
    return this.http.get<generalResponse>(`${environment.apiUrl}/Post/GetCountsByUserType`);
  }
  getDashboardCounts() {
    return this.http.get<generalResponse>(`${environment.apiUrl}/Post/GetCountByCategory`);
  }
  GetUserById() {
    return this.http.get<generalResponse>(`${environment.apiUrl}/Post/GetUserByIdWithPosts`);
  }
  GetUserApprovals() {
    return this.http.get<generalResponse>(`${environment.apiUrl}/Review/GetUserReviwToApprove`);
  }
  GetUserRequests() {
    return this.http.get<generalResponse>(`${environment.apiUrl}/Review/GetUserReviwRequested`);
  }
}
