import {Component} from '@angular/core';

import {SquoteService} from './squote.service'

import '../../public/css/style.css';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [SquoteService],
})
export class AppComponent { }
