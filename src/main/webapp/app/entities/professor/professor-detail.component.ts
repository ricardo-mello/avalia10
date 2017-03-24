import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Professor } from './professor.model';
import { ProfessorService } from './professor.service';

@Component({
    selector: 'jhi-professor-detail',
    templateUrl: './professor-detail.component.html'
})
export class ProfessorDetailComponent implements OnInit, OnDestroy {

    professor: Professor;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private professorService: ProfessorService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['professor']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.professorService.find(id).subscribe(professor => {
            this.professor = professor;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
