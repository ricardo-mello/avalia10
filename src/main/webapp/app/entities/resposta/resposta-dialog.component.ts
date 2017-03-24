import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Resposta } from './resposta.model';
import { RespostaPopupService } from './resposta-popup.service';
import { RespostaService } from './resposta.service';
@Component({
    selector: 'jhi-resposta-dialog',
    templateUrl: './resposta-dialog.component.html'
})
export class RespostaDialogComponent implements OnInit {

    resposta: Resposta;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private respostaService: RespostaService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['resposta', 'respostaEnum']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.resposta.id !== undefined) {
            this.respostaService.update(this.resposta)
                .subscribe((res: Resposta) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.respostaService.create(this.resposta)
                .subscribe((res: Resposta) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Resposta) {
        this.eventManager.broadcast({ name: 'respostaListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-resposta-popup',
    template: ''
})
export class RespostaPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private respostaPopupService: RespostaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.respostaPopupService
                    .open(RespostaDialogComponent, params['id']);
            } else {
                this.modalRef = this.respostaPopupService
                    .open(RespostaDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
