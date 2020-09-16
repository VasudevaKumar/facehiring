import { Component } from '@angular/core';
import { ChatAdapter } from 'ng-chat';
import { DemoAdapter } from './demo-adapter';
import {IChatParticipant } from 'ng-chat';
@Component({
  selector: 'facehiring-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'profile';
  userId = 999;
  Theme = 'Dark';
 // public adapter: ChatAdapter = new DemoAdapter();
  
}
