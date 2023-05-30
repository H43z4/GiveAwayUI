import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { generalResponse } from 'src/app/_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatManagementService {

  constructor(private http: HttpClient) {}
  getUsersChatList() {
    return this.http.get<generalResponse>(
      `${environment.apiUrl}/Chat/ChatsWithUserIdOnAllPost`
    );
  }

  createChatbox(formData: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<generalResponse>(`${environment.apiUrl}/Chat/Chatbox`, formData, {
      headers,
    });
  }
  PostMassege(formData: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<generalResponse>(`${environment.apiUrl}/Chat/PostMassege`, formData, {
      headers,
    });
  }
}
