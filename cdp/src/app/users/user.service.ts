import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserInterface } from '../core/auth/user.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + '/users';
  private users: UserInterface[];

  constructor(private http: HttpClient) { }

  get(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.apiUrl).pipe(
      map((users: UserInterface[]) => {
        const userData = users.map((user: UserInterface) => {
          delete user.password;
          return user;
        });

        this.users = userData;

        return userData;
      })
    );
  }

  getById(id): Observable<UserInterface> {
    return this.get().pipe(
      map((users: UserInterface[]) => {
        const userData = users.filter((user: UserInterface) => {
          return user.id === Number(id);
        });

        return userData[0];
      })
    );
  }
}
