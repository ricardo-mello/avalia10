import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Resposta } from './resposta.model';
import { RespostaPopupService } from './resposta-popup.service';
import { RespostaService } from './resposta.service';

@Component({
    selector: 'jhi-resposta-delete-dialog',
    templateUrl: './resposta-delete-dialog.component.html'
})
export class RespostaDeleteDialogComponent {

    resposta: Resposta;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private respostaService: RespostaService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['resposta', 'respostaEnum']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.respostaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'respostaListModification',
                content: 'Deleted an resposta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resposta-delete-popup',
    template: ''
})
export class RespostaDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private respostaPopupService: RespostaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.respostaPopupService
                .open(RespostaDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
