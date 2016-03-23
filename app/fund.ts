import {FundHolding} from './fund-holding';

export class Fund {
  constructor(
    public name: string,
    public date: Date,
    public profit: number,
    public holdings
  ) { }
}
