import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }  from './app.component';
import {CreateHoldingComponent} from './create-holding.component';
import {SelectFundComponent} from './select-fund.component';

import './rxjs-operators';

@NgModule({
    imports:      [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        CreateHoldingComponent,
        SelectFundComponent
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }