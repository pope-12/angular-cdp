import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';
import { Subscription } from 'rxjs';
import { MessageInterface } from './message.interface';

@Component({
  selector: 'lib-messages',
  template: `
    <div role="status" aria-live="polite">
      <div *ngFor="let message of messages" (click)="removeMessage(message)">
        <div *ngIf="!message.hidden" class="message {{ message.class }}">
          <strong>{{message.title}}</strong>
          {{message.body}}
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  public messages: MessageInterface[];
  private subscription: Subscription;
  @Input() maxCount: number;

  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    this.subscription = this.messageService.getMessages().subscribe((messages: MessageInterface[]) => {
      this.messages = messages.slice(this.maxCount * -1);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  removeMessage(message) {
    this.messageService.removeMessage(message);
  }

}
