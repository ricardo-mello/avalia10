import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Bloco } from './bloco.model';
import { BlocoPopupService } from './bloco-popup.service';
import { BlocoService } from './bloco.service';
import { Curso, CursoService } from '../curso';
import { Modulo, ModuloService } from '../modulo';
@Component({
    selector: 'jhi-bloco-dialog',
    templateUrl: './bloco-dialog.component.html'
})
export class BlocoDialogComponent implements OnInit {

    bloco: Bloco;
    authorities: any[];
    isSaving: boolean;

    cursos: Curso[];

    modulos: Modulo[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private blocoService: BlocoService,
        private cursoService: CursoService,
        private moduloService: ModuloService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['bloco']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.cursoService.query().subscribe(
            (res: Response) => { this.cursos = res.json(); }, (res: Response) => this.onError(res.json()));
        this.moduloService.query().subscribe(
            (res: Response) => { this.modulos = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.bloco.id !== undefined) {
            this.blocoService.update(this.bloco)
                .subscribe((res: Bloco) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.blocoService.create(this.bloco)
                .subscribe((res: Bloco) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Bloco) {
        this.eventManager.broadcast({ name: 'blocoListModification', content: 'OK'});
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

    trackCursoById(index: number, item: Curso) {
        return item.id;
    }

    trackModuloById(index: number, item: Modulo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bloco-popup',
    template: ''
})
export class BlocoPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private blocoPopupService: BlocoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.blocoPopupService
                    .open(BlocoDialogComponent, params['id']);
            } else {
                this.modalRef = this.blocoPopupService
                    .open(BlocoDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
