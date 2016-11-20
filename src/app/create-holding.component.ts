import {Component, OnInit} from '@angular/core';
import {SquoteService} from './squote.service';
import {HoldingStock} from './holding-stock';

@Component({
    selector: 'create-holding',
    templateUrl: './create-holding.component.html',
})

export class CreateHoldingComponent implements OnInit {
    message = '';
    hscei = '';
    errorMessage: string;
    createdHolding: HoldingStock;

    constructor(
        private squoteService: SquoteService
    ) { }

    ngOnInit() {
    }

    onSubmit() {
        console.log('Submit: ', this.message, this.hscei);
        this.squoteService.createHoldingStock(this.message, this.hscei)
            .subscribe(
                holding => this.createdHolding = holding,
                error =>  this.errorMessage = error as any);
    }

    onClear() {
        this.message = '';
        this.hscei = '';
        this.errorMessage = '';
    }

}