import {Component, OnInit} from '@angular/core';
import {SquoteService} from './squote-serivce';
import {HoldingStock} from './holding-stock';
import {SelectFundComponent} from './select-fund.component';
import {Fund} from "./fund";

@Component({
  selector: 'create-holding',
  template: `
    <div>
      <form>
        <textarea rows='8' cols='50' [(ngModel)]='message'></textarea>
        <br /> hscei:<input type='text' style='width: 40px;' [(ngModel)]='hscei' /><br />
        <input type='submit' (click)='onSubmit()' />
      </form>
      <p>{{resultMessage}}</p>
      <div *ngIf='errorMessage'>{{errorMessage}}</div>

      <select-fund [holding]='createdHolding'></select-fund>
    </div>
  `,
  directives: [SelectFundComponent],
})

export class CreateHoldingComponent implements OnInit {
  message = '';
  hscei = '';
  errorMessage: string;
  createdHolding: HoldingStock;
  funds: Fund[];
  
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

}
