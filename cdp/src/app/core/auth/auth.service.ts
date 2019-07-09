import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlLoginPath = '/login';
  private urlRegisterPath = '/register';
  private accessToken: string;
  private isLoggedIn = new BehaviorSubject(false);
  private storageAccessTokenKey = 'accessToken';
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
    this.accessToken = this.storage.getItem(this.storageAccessTokenKey);
    if (this.accessToken) {
      this.isLoggedIn.next(true);
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
        this.setLoginVariables(response.accessToken);
        this.redirect();
        return response;
      })
    );
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public getLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  public logout(): void {
    this.isLoggedIn.next(false);
    this.accessToken = undefined;
    this.storage.removeItem(this.storageAccessTokenKey);
    this.router.navigate(['/']);
  }

  public goToLoginPage(url) {
    this.setRedirectUrl(url);
    this.router.navigate(['/login']);
  }

  private setRedirectUrl(url) {
    if (url && this.authUrls.indexOf(url) === -1) {
      this.redirectUrl = url;
    }
  }

  private setLoginVariables(accessToken: string): void {
    this.accessToken = accessToken;
    this.storage.setItem(this.storageAccessTokenKey, this.accessToken);
    this.isLoggedIn.next(true);
  }

  private redirect() {
    this.router.navigate([this.redirectUrl]);
  }

}
