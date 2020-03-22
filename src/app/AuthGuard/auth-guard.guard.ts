import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../Service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}
/*
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigateByUrl('/login');
    return false;
  } */

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      alert('This page can only be accessed by logged in users. Please log in!');
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
