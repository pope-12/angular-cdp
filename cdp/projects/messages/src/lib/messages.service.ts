import { Injectable } from '@angular/core';
import { MessageInterface } from './message.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messages: MessageInterface[] = [];
  private messagesSubject: BehaviorSubject<MessageInterface[]> = new BehaviorSubject([]);

  constructor() { }

  add(message: MessageInterface) {
    this.messages = [...this.messages, message];
    this.messagesSubject.next(this.messages);

    setTimeout(() => {
      message.hidden = true;
      this.messages = this.messages.filter((msg) => {
        return !msg.hidden;
      });
      this.messagesSubject.next(this.messages);
    }, message.duration ? message.duration : 5000);
  }

  public getMessages() {
    return this.messagesSubject.asObservable();
  }

  public removeMessage(message) {
    this.messages.splice(this.messages.indexOf(message), 1);
    this.messagesSubject.next(this.messages);
  }
}
