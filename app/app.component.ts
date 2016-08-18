import {Component} from '@angular/core';
import {CreateHoldingComponent} from './create-holding.component';
import {SquoteService} from './squote-serivce';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {HTTP_PROVIDERS}    from '@angular/http';
import {Auth} from "./auth.service";
import 'rxjs/Rx';

//noinspection TypeScriptValidateTypes
@Component({
    directives: [CreateHoldingComponent, ROUTER_DIRECTIVES],
    providers: [SquoteService, Auth, HTTP_PROVIDERS],
    selector: 'my-app',
    template: `
      <create-holding></create-holding>
      <div class="navbar-header">
        <a class="navbar-brand" href="#">Auth0 - Angular 2</a>
        <button class="btn btn-primary btn-margin" (click)="auth.login()" *ngIf="!auth.authenticated()">Log In</button>
        <button class="btn btn-primary btn-margin" (click)="auth.logout()" *ngIf="auth.authenticated()">Log Out</button>
      </div>
    `,
})

export class AppComponent {
    constructor(private auth: Auth) {}
}

