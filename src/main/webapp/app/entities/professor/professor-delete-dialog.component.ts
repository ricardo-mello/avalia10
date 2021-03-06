import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Professor } from './professor.model';
import { ProfessorPopupService } from './professor-popup.service';
import { ProfessorService } from './professor.service';

@Component({
    selector: 'jhi-professor-delete-dialog',
    templateUrl: './professor-delete-dialog.component.html'
})
export class ProfessorDeleteDialogComponent {

    professor: Professor;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private professorService: ProfessorService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['professor']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.professorService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'professorListModification',
                content: 'Deleted an professor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-professor-delete-popup',
    template: ''
})
export class ProfessorDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private professorPopupService: ProfessorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.professorPopupService
                .open(ProfessorDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
