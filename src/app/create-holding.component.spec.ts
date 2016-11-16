import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import './rxjs-operators'

import {CreateHoldingComponent} from "./create-holding.component";
import {SquoteService} from "./squote.service";
import {SelectFundComponent} from "./select-fund.component";

let fixture: ComponentFixture<CreateHoldingComponent>;
let comp:    CreateHoldingComponent;
let de:      DebugElement;
let el:      HTMLElement;
let squoteService: SquoteService;

describe('Test create holding component', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, HttpModule ],
            declarations: [CreateHoldingComponent, SelectFundComponent],
            providers:    [SquoteService]
        })

        fixture = TestBed.createComponent(CreateHoldingComponent);
        comp = fixture.componentInstance;

        squoteService = fixture.debugElement.injector.get(SquoteService);

//        let spy = spyOn(squoteService, 'getQuote').and.returnValue(Promise.resolve(''));

        de = fixture.debugElement.query(By.css('textarea'));
        el = de.nativeElement;
    })

    it('result message should be empty', () => {
        expect(fixture.componentInstance.message).toBe('');
    });
});