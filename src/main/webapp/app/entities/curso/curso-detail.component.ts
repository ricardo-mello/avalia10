import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Curso } from './curso.model';
import { CursoService } from './curso.service';

@Component({
    selector: 'jhi-curso-detail',
    templateUrl: './curso-detail.component.html'
})
export class CursoDetailComponent implements OnInit, OnDestroy {

    curso: Curso;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private cursoService: CursoService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['curso']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.cursoService.find(id).subscribe(curso => {
            this.curso = curso;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
