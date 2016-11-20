import {ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';
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
let squoteService: SquoteService;
let clearButton;
let textarea;
let hscei;

describe('Test create holding component', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, HttpModule ],
            declarations: [CreateHoldingComponent, SelectFundComponent],
            providers:    [SquoteService]
        })

        fixture = TestBed.createComponent(CreateHoldingComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();

        squoteService = fixture.debugElement.injector.get(SquoteService);

//        let spy = spyOn(squoteService, 'getQuote').and.returnValue(Promise.resolve(''));

        clearButton = fixture.debugElement.query(By.css('.clearButton')).nativeElement;
        textarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        hscei = fixture.debugElement.query(By.css('.hscei')).nativeElement;
    })

    it('result message should be empty after init', () => {
        expect(fixture.componentInstance.message).toBe('');
    });

    it('click clear button will clear all content', () => {
        textarea.value = 'some text';
        hscei.value = '12345';
        comp.errorMessage = 'some error';

        clearButton.click();

        expect(textarea.textContent).toBe('');
        expect(hscei.textContent).toBe('');
        expect(comp.errorMessage).toBe('');
    });
});