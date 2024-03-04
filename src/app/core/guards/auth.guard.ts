import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, pipe, finalize, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('user-token');
    if (localStorage.getItem('user-token')) {
      this.auth.validateAccessToken(token).pipe(map(data => {
        if (!data.error) {
          console.log(data);
          return true;
        } else {
          return this.router.parseUrl('/auth')
        }
      }))
    } else {
      return this.router.parseUrl('/auth')
    }
  }

}
