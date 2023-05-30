import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { ChatManagementService } from 'src/app/_services/chatMGT/chat-management.service';
interface Chat {
  postId: number;
  senderId: number;
  receiverId: number;
  receiverName: string;
  postTitle: string;
  conversations: Message[];
}
interface Message {
  senderUserName: string;
  msg:string;
  dateTime: Date; // Add the timestamp property
}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private chatService: ChatManagementService
  ) {}
  @ViewChild('messageInput') messageInput!: ElementRef;
  myId: string = '';
  CpostId: number = 0;
  CsenderId: number = 0;
  CreceiverId: number = 0;
  ngOnInit(): void {
    this.GetChatsList();
    this.myId = localStorage.getItem('userId')!;
    const myNewId = this.myId.replace(/"/g, '');
    this.myId = myNewId;
  }
  chatList: Chat[] = [
    {
      postId: 0,
      senderId: 0,
      receiverId: 0,
      receiverName: 'Jhon Mike',
      postTitle: 'Nike Shoes Donation',
      conversations: [
        { senderUserName: this.myId, msg: 'Hello', dateTime: new Date() },
        { senderUserName: 'Donor', msg: 'Hi', dateTime: new Date() },
        {
          senderUserName: this.myId,
          msg: 'I hope you are doing good, I am intrested in you Ad',
          dateTime: new Date(),
        },
        {
          senderUserName: 'Donor',
          msg: 'Thank you, You can take the item. It is available.',
          dateTime: new Date(),
        },
        {
          senderUserName: this.myId,
          msg: 'Please share your address, I will pick it up.',
          dateTime: new Date(),
        },
        {
          senderUserName: 'Donor',
          msg: 'Sending you in a while, Please wait.',
          dateTime: new Date(),
        },
      ],
    },
    {
      postId: 0,
      senderId: 0,
      receiverId: 0,
      receiverName: 'Alexa David',
      postTitle: 'Study Table Donation',
      conversations: [
        { senderUserName: 'Donor', msg: 'Hey', dateTime: new Date() },
        { senderUserName: this.myId, msg: 'How are you?', dateTime: new Date() },
      ],
    },
    // Add more chat objects as needed
  ];
  selectedChat: Chat | null = null;
  newMessage: string = '';

  selectChat(chat: Chat) {
    this.selectedChat = chat;
    this.CpostId = chat.postId;
    this.CreceiverId = chat.receiverId;
    this.CsenderId = chat.senderId;
    if (this.messageInput) {
      this.messageInput.nativeElement.focus();
    }
  }
  sendMessage() {
    if (this.selectedChat && this.newMessage.trim() !== '') {
      const newMessage: Message = {
        senderUserName: this.myId,
        msg: this.newMessage.trim(),
        dateTime: new Date(),
      };
      if (!this.selectedChat.conversations) {
        this.selectedChat.conversations = []; // Initialize messages as an empty array if it's undefined
      }
      this.selectedChat.conversations.push(newMessage);
      this.newMessage = '';
      if (this.messageInput) {
        this.messageInput.nativeElement.focus();
      }
    }
  }
  GetChatsList() {
    this.spinner.show();
    debugger;
    this.chatService
      .getUsersChatList()
      .pipe(first())
      .subscribe(
        (result) => {
          debugger;
          console.log(result);
          if (result?.status == '0') {
            if (result?.data) {
              if (result.data) {
                // this.postsList = [];
                this.chatList = result.data;
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
  PostMassege() {
    debugger;
    this.spinner.show();
    if (this.CpostId <= 0 && this.CsenderId <= 0 && this.CreceiverId <= 0) {
      this.spinner.hide();
      this.toastrService.error('No data found!', 'Error!');
      return;
    }
    const formData: FormData = new FormData();
    formData.append('PostId', String(this.CpostId));
    formData.append('SenderUserId', String(this.CsenderId));
    formData.append('Messege', String(this.newMessage));
    formData.append('ReceiverUserId', String(this.CreceiverId));
    this.chatService.PostMassege(formData).subscribe(
      (result) => {
        if (result?.status == '0') {
          this.spinner.hide();
          this.sendMessage();
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
