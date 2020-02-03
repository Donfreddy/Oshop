import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/switchMap';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
      .map((appUser: any) => appUser.isAdmin);
  }
}
 