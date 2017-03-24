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
import { BlocoDetailComponent } from '../../../../../../main/webapp/app/entities/bloco/bloco-detail.component';
import { BlocoService } from '../../../../../../main/webapp/app/entities/bloco/bloco.service';
import { Bloco } from '../../../../../../main/webapp/app/entities/bloco/bloco.model';

describe('Component Tests', () => {

    describe('Bloco Management Detail Component', () => {
        let comp: BlocoDetailComponent;
        let fixture: ComponentFixture<BlocoDetailComponent>;
        let service: BlocoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [BlocoDetailComponent],
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
                    BlocoService
                ]
            }).overrideComponent(BlocoDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlocoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlocoService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Bloco(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.bloco).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
