import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

import {HoldingStock} from './holding-stock';
import {Fund} from './fund';
import {API_ENDPOINT} from './constants';

@Injectable()
export class SquoteService {
    constructor (private http: Http) {
        console.log('API ENDPOINT:' + API_ENDPOINT);
    }

    private createHoldingStockUrl = 'http://' + API_ENDPOINT + '/rest/createholding/create/?';  // URL to web api
    private allFundUrl = 'http://' + API_ENDPOINT + '/rest/fund/getall';
    private updateFundByHoldingUrl = 'http://' + API_ENDPOINT + '/rest/createholding/updatefund/?';

    createHoldingStock(message: string, hscei: string) {
        let queryString = 'message=' + encodeURIComponent(message) + '&hscei=' + hscei;
        return this.http.get(this.createHoldingStockUrl + queryString)
            .do(resp => console.info('createHoldingStock response: ' + resp.text()))
            .map(res => <HoldingStock> res.json())
            .catch(this.handleError);
    }

    getAllFund() {
        return this.http.get(this.allFundUrl)
            .flatMap(res => res.json())
            .map(r => <Fund> r)
            .catch(this.handleError);
    }

    updateFundByHolding(fundName: string, holdingId: string) {
        let queryString = 'fundName=' + fundName + '&holdingId=' + encodeURIComponent(holdingId);
        console.log(queryString);
        return this.http.get(this.updateFundByHoldingUrl + queryString)
            .do(resp => console.info('updateFundByHolding response: ' + resp.text()))
            .map(res => <Fund> res.json())
            .catch(this.handleError);
    }

    private handleError (error: any) {
        console.error(error);
        return Observable.throw(error._body);
    }
}