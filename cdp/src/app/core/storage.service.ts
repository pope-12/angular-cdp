import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(PLATFORM_ID) private platform) { }

  public getItem(key: string): string | null{
    if (isPlatformBrowser(this.platform)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  public setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platform)) {
      localStorage.setItem(key, value);
    }
  }

  public removeItem(key: string): void {
    if (isPlatformBrowser(this.platform)) {
      localStorage.removeItem(key);
    }
  }
}
