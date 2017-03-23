import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Avaliacao } from './avaliacao.model';
import { AvaliacaoPopupService } from './avaliacao-popup.service';
import { AvaliacaoService } from './avaliacao.service';

@Component({
    selector: 'jhi-avaliacao-delete-dialog',
    templateUrl: './avaliacao-delete-dialog.component.html'
})
export class AvaliacaoDeleteDialogComponent {

    avaliacao: Avaliacao;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private avaliacaoService: AvaliacaoService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['avaliacao']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.avaliacaoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'avaliacaoListModification',
                content: 'Deleted an avaliacao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-avaliacao-delete-popup',
    template: ''
})
export class AvaliacaoDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private avaliacaoPopupService: AvaliacaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.avaliacaoPopupService
                .open(AvaliacaoDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
