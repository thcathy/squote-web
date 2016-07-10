import {HoldingStock} from "./holding-stock";

export class Fund {
  constructor(
    public name: string,
    public date: Date,
    public profit: number,
    
    public holdings: HoldingStock
  ) { }
}
