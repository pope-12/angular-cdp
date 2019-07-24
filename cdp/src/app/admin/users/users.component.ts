import { Component, OnInit } from '@angular/core';
import { UserService } from '../../users/user.service';
import { UserInterface } from '../../core/auth/user.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: UserInterface[];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.users = data.users;
    });
  }

}
