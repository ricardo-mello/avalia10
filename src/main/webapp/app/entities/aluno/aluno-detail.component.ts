import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Aluno } from './aluno.model';
import { AlunoService } from './aluno.service';

@Component({
    selector: 'jhi-aluno-detail',
    templateUrl: './aluno-detail.component.html'
})
export class AlunoDetailComponent implements OnInit, OnDestroy {

    aluno: Aluno;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private alunoService: AlunoService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['aluno']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.alunoService.find(id).subscribe(aluno => {
            this.aluno = aluno;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
