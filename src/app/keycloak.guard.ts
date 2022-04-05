import { Injectable } from '@angular/core';
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class KeycloakGuard extends KeycloakAuthGuard {


  constructor(router: Router, private keycloak: KeycloakService) {
    super(router, keycloak);
  }

  public async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
    }

    // Get the roles required from the route.
    const requiredRoles = route.data['roles'];
    console.log('requiredRoles', requiredRoles);


    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    const allowed = requiredRoles.every((role) => this.roles.includes(role));
    console.log('user is allowed to enter route', allowed);
    return allowed;
  }


}
