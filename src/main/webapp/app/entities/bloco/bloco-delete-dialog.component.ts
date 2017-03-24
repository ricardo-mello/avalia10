import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Bloco } from './bloco.model';
import { BlocoPopupService } from './bloco-popup.service';
import { BlocoService } from './bloco.service';

@Component({
    selector: 'jhi-bloco-delete-dialog',
    templateUrl: './bloco-delete-dialog.component.html'
})
export class BlocoDeleteDialogComponent {

    bloco: Bloco;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private blocoService: BlocoService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['bloco']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.blocoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'blocoListModification',
                content: 'Deleted an bloco'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bloco-delete-popup',
    template: ''
})
export class BlocoDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private blocoPopupService: BlocoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.blocoPopupService
                .open(BlocoDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
