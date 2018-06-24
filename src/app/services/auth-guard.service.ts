import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService {

  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  public canActivate(): boolean {
    if (!this.auth.getToken()) {
      this.router.navigateByUrl('/log-in');
      return false;
    }
    return true;
  }

}
