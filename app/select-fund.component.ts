import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {HoldingStock} from './holding-stock';
import {SquoteService} from './squote-serivce';

@Component({
  selector: 'select-fund',
  template: `
    <div *ngIf="holding">
      <p>Created: {{holding | json}}</p>
      <ul *ngFor="#f of funds">
        <li>{{f.name}}: <span *ngIf="f.holdings[holding.code]">{{f.holdings[holding.code] | json}}</span></li>
      </ul>
    </div>
  `,
  inputs: ['holding']
})

export class SelectFundComponent implements OnChanges {
  holding: HoldingStock;
  funds = [];

  constructor(
    private squoteService: SquoteService
  ) { }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    this.funds = [];
    this.squoteService.getAllFund()
      .subscribe(
        fund => this.funds.push(fund),
        e =>  console.error(e)
      );
  }
}
