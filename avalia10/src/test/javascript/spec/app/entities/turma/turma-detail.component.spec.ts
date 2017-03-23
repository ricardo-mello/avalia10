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
import { TurmaDetailComponent } from '../../../../../../main/webapp/app/entities/turma/turma-detail.component';
import { TurmaService } from '../../../../../../main/webapp/app/entities/turma/turma.service';
import { Turma } from '../../../../../../main/webapp/app/entities/turma/turma.model';

describe('Component Tests', () => {

    describe('Turma Management Detail Component', () => {
        let comp: TurmaDetailComponent;
        let fixture: ComponentFixture<TurmaDetailComponent>;
        let service: TurmaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TurmaDetailComponent],
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
                    TurmaService
                ]
            }).overrideComponent(TurmaDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TurmaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TurmaService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Turma(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.turma).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
