import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import {HoldingStock} from './holding-stock';
import {Fund} from './fund';

@Injectable()
export class SquoteService {
  constructor (private http: Http) {}

  private host = 'http://localhost:8190/'
  private createHoldingStockUrl = this.host + 'rest/createholding/create/?';  // URL to web api
  private allFundUrl = this.host + 'rest/fund/getall'

  createHoldingStock(message: string, hscei: string) {
    let queryString = 'message=' + encodeURIComponent(message) + '&hscei=' + hscei;
    return this.http.get(this.createHoldingStockUrl + queryString)
            .do(resp => console.info(resp.text()))
            .map(res => <HoldingStock> res.json())
            .catch(this.handleError);
  }

  getAllFund() {
    return this.http.get(this.allFundUrl)
            .flatMap(res => res.json())
            .map(r => <Fund> r)
            .catch(this.handleError);
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.text());
  }

}
