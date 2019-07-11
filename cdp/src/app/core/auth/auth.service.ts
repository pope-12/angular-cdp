import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { UserInterface } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public storageUserKey = 'user';

  private urlLoginPath = '/login';
  private urlRegisterPath = '/register';
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<UserInterface>(null);
  private redirectUrl = '';
  private user: UserInterface;
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

  public login(email: string, password: string, createAccount = false): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password);

    const url = environment.apiUrl + (createAccount ? this.urlRegisterPath : this.urlLoginPath);
    return this.http.post(url, params).pipe(
      catchError((error) => {
        return throwError((createAccount ? 'Registration' : 'Login') + ' failed');
      }),
      tap((response) => {
        this.setLoginVariables({
          accessToken: response.accessToken,
          email
        }, true);
        this.setUser();
        return response;
      })
    );
  }


  public getLoggedInUserFromApi() {
    const url = environment.apiUrl + '/users';

    return this.http.get<UserInterface[]>(url).pipe(
      map((response: UserInterface[]) => {
        const userData = response.filter((user) => {
          return user.email === this.user.email;
        })[0];
        delete userData.password;
        return userData;
      })
    );
  }

  public getLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  public logout(): void {
    this.isLoggedIn.next(false);
    this.user = undefined;
    this.storage.removeItem(this.storageUserKey);
    this.router.navigate(['/']);
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

}
