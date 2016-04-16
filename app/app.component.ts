import {Component} from 'angular2/core';
import {CreateHoldingComponent} from './create-holding.component';
import {SquoteService} from './squote-serivce';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';

@Component({
    directives: [CreateHoldingComponent, ROUTER_DIRECTIVES],
    providers: [SquoteService, ROUTER_PROVIDERS, HTTP_PROVIDERS],
    selector: 'my-app',
    template: `
      <create-holding></create-holding>
    `,
})
@RouteConfig([
  {
    component: CreateHoldingComponent,
    name: 'Create',
    path: '/create',
  },
])

export class AppComponent { }
