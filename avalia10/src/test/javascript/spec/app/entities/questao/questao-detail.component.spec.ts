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
import { QuestaoDetailComponent } from '../../../../../../main/webapp/app/entities/questao/questao-detail.component';
import { QuestaoService } from '../../../../../../main/webapp/app/entities/questao/questao.service';
import { Questao } from '../../../../../../main/webapp/app/entities/questao/questao.model';

describe('Component Tests', () => {

    describe('Questao Management Detail Component', () => {
        let comp: QuestaoDetailComponent;
        let fixture: ComponentFixture<QuestaoDetailComponent>;
        let service: QuestaoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [QuestaoDetailComponent],
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
                    QuestaoService
                ]
            }).overrideComponent(QuestaoDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuestaoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuestaoService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Questao(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.questao).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
