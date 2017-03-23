import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Curso } from './curso.model';
import { CursoPopupService } from './curso-popup.service';
import { CursoService } from './curso.service';
import { Bloco, BlocoService } from '../bloco';
@Component({
    selector: 'jhi-curso-dialog',
    templateUrl: './curso-dialog.component.html'
})
export class CursoDialogComponent implements OnInit {

    curso: Curso;
    authorities: any[];
    isSaving: boolean;

    blocos: Bloco[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private cursoService: CursoService,
        private blocoService: BlocoService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['curso']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.blocoService.query().subscribe(
            (res: Response) => { this.blocos = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.curso.id !== undefined) {
            this.cursoService.update(this.curso)
                .subscribe((res: Curso) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.cursoService.create(this.curso)
                .subscribe((res: Curso) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Curso) {
        this.eventManager.broadcast({ name: 'cursoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackBlocoById(index: number, item: Bloco) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-curso-popup',
    template: ''
})
export class CursoPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private cursoPopupService: CursoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.cursoPopupService
                    .open(CursoDialogComponent, params['id']);
            } else {
                this.modalRef = this.cursoPopupService
                    .open(CursoDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
