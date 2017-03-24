import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RespostaDetailComponent } from '../../../../../../main/webapp/app/entities/resposta/resposta-detail.component';
import { RespostaService } from '../../../../../../main/webapp/app/entities/resposta/resposta.service';
import { Resposta } from '../../../../../../main/webapp/app/entities/resposta/resposta.model';

describe('Component Tests', () => {

    describe('Resposta Management Detail Component', () => {
        let comp: RespostaDetailComponent;
        let fixture: ComponentFixture<RespostaDetailComponent>;
        let service: RespostaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [RespostaDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    RespostaService
                ]
            }).overrideComponent(RespostaDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RespostaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RespostaService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Resposta(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.resposta).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
