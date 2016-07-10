import {Component, OnChanges, SimpleChange} from '@angular/core';
import {HoldingStock} from './holding-stock';
import {SquoteService} from './squote-serivce';
import {Fund} from './fund';

@Component({
  selector: 'select-fund',
  template: `
    <div *ngIf="holding">
      <p>Created: {{holding | json}}</p>
      <ul *ngFor="#f of funds">
        <li>Add to: <a (click)="onSelectFund(f)">{{f.name}}:
          <span *ngIf="f.holdings[holding.code]">{{f.holdings[holding.code] | json}}</span></a>
        </li>
      </ul>
      <div *ngIf="updatedFund">Updated Fund ({{updatedFund.name}}): {{updatedFund.holdings[holding.code] | json}}</div>
    </div>
    <div>{{errorMessage}}</div>
  `,
  inputs: ['holding']
})

export class SelectFundComponent implements OnChanges {
  holding: HoldingStock;
  errorMessage: string;
  funds: Fund[];
  updatedFund: Fund;

  constructor(
    private squoteService: SquoteService
  ) { }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    this.funds = [];
    this.squoteService.getAllFund()
      .subscribe(
        fund => this.funds.push(fund),
        error =>  this.errorMessage = <any>error
      );
  }

  onSelectFund(fund: Fund) {
    console.log('Add holding to :' + fund.name);
    this.squoteService.updateFundByHolding(fund.name, this.holding.id)
        .subscribe(fund => {
          this.updatedFund = fund;
          this.funds = [];
        },
        error =>  this.errorMessage = <any>error);
  }
}
