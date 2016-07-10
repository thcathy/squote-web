import { provideRouter, RouterConfig } from '@angular/router';
import {CreateHoldingComponent} from "./create-holding.component";

//noinspection TypeScriptValidateTypes
export const routes: RouterConfig = [
    { path: 'create', component: CreateHoldingComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];