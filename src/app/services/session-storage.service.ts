import { Injectable } from '@angular/core';
import { IDummyJsonUser } from '../dummy-json-user.interface';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): IDummyJsonUser | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    const user = this.getUser();
    if (user) {
      return true;
    }

    return false;
  }
}
