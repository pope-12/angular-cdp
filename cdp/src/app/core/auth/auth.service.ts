import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { UserInterface } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public storageUserKey = 'user';
  public user: UserInterface;

  private urlLoginPath = '/login';
  private urlRegisterPath = '/register';
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<UserInterface>(null);
  private redirectUrl = '';
  private authUrls: string[] = [
    '/login',
    '/register',
  ];

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router
  ) {
    const user = JSON.parse(this.storage.getItem(this.storageUserKey));

    if (user) {
      this.setLoginVariables(user);
    }
  }

  public login(user: UserInterface, createAccount = false): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('email', user.email);
    params = params.append('password', user.password);
    if (user.name) {
      params = params.append('name', user.name);
    }

    const url = environment.apiUrl + (createAccount ? this.urlRegisterPath : this.urlLoginPath);
    return this.http.post(url, params).pipe(
      catchError((error) => {
        return throwError((createAccount ? 'Registration' : 'Login') + ' failed');
      }),
      tap((response) => {
        this.setLoginVariables({
          accessToken: response.accessToken,
          email: user.email
        }, true);
        this.setUser();
        return response;
      })
    );
  }


  public getLoggedInUserFromApi() {
    const url = environment.apiUrl + '/users?email=' + this.user.email;

    return this.http.get<UserInterface[]>(url).pipe(
      map(this.formatUserFromApi)
    );
  }

  public getUserFromApiById(id) {
    const url = environment.apiUrl + '/users/' + id;

    return this.http.get<UserInterface[]>(url).pipe(
      map(this.formatUserFromApi)
    );
  }

  public getLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  public logout(): void {
    this.isLoggedIn.next(false);
    this.user = undefined;
    this.storage.removeItem(this.storageUserKey);
    this.goToLoginPage(this.router.url);
  }

  public goToLoginPage(url: string): void {
    this.setRedirectUrl(url);
    this.router.navigate(['/login']);
  }

  public getAccessToken(): string {
    if (!this.user) {
      return null;
    }

    return this.user.accessToken;
  }

  public getUser(): Observable<UserInterface> {
    return this.userSubject.asObservable();
  }

  public setLoginVariables(user: UserInterface, redirect = false): void {
    if (!user) {
      return;
    }

    this.isLoggedIn.next(true);
    this.user = user;
    this.userSubject.next(this.user);
    this.storage.setItem(this.storageUserKey, JSON.stringify(user));

    if (redirect) {
      this.redirect();
    }
  }

  public setUser() {
    this.getLoggedInUserFromApi().subscribe((userData) => {
      this.user.id = userData.id;
      this.userSubject.next(this.user);
      this.storage.setItem(this.storageUserKey, JSON.stringify(this.user));
    });
  }

  private setRedirectUrl(url: string): void {
    if (url && this.authUrls.indexOf(url) === -1) {
      this.redirectUrl = url;
    }
  }

  private redirect(): void {
    this.router.navigate([this.redirectUrl]);
  }

  private formatUserFromApi(user) {
    if (Array.isArray(user)) {
      user = user[0];
    }
    delete user.password;
    return user;
  }

}
