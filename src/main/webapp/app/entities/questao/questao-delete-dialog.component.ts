import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Questao } from './questao.model';
import { QuestaoPopupService } from './questao-popup.service';
import { QuestaoService } from './questao.service';

@Component({
    selector: 'jhi-questao-delete-dialog',
    templateUrl: './questao-delete-dialog.component.html'
})
export class QuestaoDeleteDialogComponent {

    questao: Questao;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private questaoService: QuestaoService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['questao']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.questaoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'questaoListModification',
                content: 'Deleted an questao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-questao-delete-popup',
    template: ''
})
export class QuestaoDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private questaoPopupService: QuestaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.questaoPopupService
                .open(QuestaoDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
