import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MessagesService } from '../../../../../projects/messages/src/lib/messages.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {
  public isRegister: boolean;

  public user = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private auth: AuthService,
    private messageService: MessagesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe((url) => {
      this.isRegister = url[0].path === 'register';
    });
  }

  public submit() {
    this.auth.login(this.user.value.email, this.user.value.password, this.isRegister).subscribe((response) => {
      this.messageService.add({
        title: 'Success',
        body: (this.isRegister ? 'Registration' : 'Login') + ' Succeeded',
        class: 'success'
      });
    }, (error) => {
      this.messageService.add({
        title: 'Error',
        body: (this.isRegister ? 'Registration' : 'Login') + ' Failed',
        class: 'danger'
      });
    });
  }

}
