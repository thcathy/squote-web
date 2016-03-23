import {Component} from 'angular2/core';
import {HeroFormComponent} from './hero-form.component';
import {CreateHoldingComponent} from './create-holding.component';
import {SquoteService} from './squote-serivce';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';

@Component({
    selector: 'my-app',
//   template: '<hero-form></hero-form>',
    template: `
      <create-holding></create-holding>
    `,
    directives: [HeroFormComponent, CreateHoldingComponent, ROUTER_DIRECTIVES],
    providers: [SquoteService, ROUTER_PROVIDERS, HTTP_PROVIDERS]
})
@RouteConfig([
  {
    path: '/create',
    name: 'Create',
    component: CreateHoldingComponent
  },

])

export class AppComponent { }
