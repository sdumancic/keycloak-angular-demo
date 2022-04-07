import {Component, OnInit} from '@angular/core';
import {KeycloakEventType, KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn = false;
  public token: string = '';
  public seconds: number = 60;
  public userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService) {
  }

  public async ngOnInit() {


    this.isLoggedIn = await this.keycloak.isLoggedIn();
    this.keycloak.keycloakEvents$.subscribe(val => {
      if (val.type === KeycloakEventType.OnTokenExpired){
        console.log('token expired');
        //this.keycloak.updateToken();
        //this.keycloak.getToken().then(token => this.token = token);
        this.seconds = 60;
      }

    })

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.token = await this.keycloak.getToken();
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout("http://localhost:4200");
  }
}
