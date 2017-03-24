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
import { CursoDetailComponent } from '../../../../../../main/webapp/app/entities/curso/curso-detail.component';
import { CursoService } from '../../../../../../main/webapp/app/entities/curso/curso.service';
import { Curso } from '../../../../../../main/webapp/app/entities/curso/curso.model';

describe('Component Tests', () => {

    describe('Curso Management Detail Component', () => {
        let comp: CursoDetailComponent;
        let fixture: ComponentFixture<CursoDetailComponent>;
        let service: CursoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [CursoDetailComponent],
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
                    CursoService
                ]
            }).overrideComponent(CursoDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CursoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CursoService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Curso(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.curso).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
