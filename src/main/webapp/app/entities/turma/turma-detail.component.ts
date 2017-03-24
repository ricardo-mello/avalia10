import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Turma } from './turma.model';
import { TurmaService } from './turma.service';

@Component({
    selector: 'jhi-turma-detail',
    templateUrl: './turma-detail.component.html'
})
export class TurmaDetailComponent implements OnInit, OnDestroy {

    turma: Turma;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private turmaService: TurmaService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['turma']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.turmaService.find(id).subscribe(turma => {
            this.turma = turma;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
