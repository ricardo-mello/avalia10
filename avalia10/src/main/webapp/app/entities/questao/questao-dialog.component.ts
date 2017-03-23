import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Questao } from './questao.model';
import { QuestaoPopupService } from './questao-popup.service';
import { QuestaoService } from './questao.service';
import { Avaliacao, AvaliacaoService } from '../avaliacao';
import { Resposta, RespostaService } from '../resposta';
@Component({
    selector: 'jhi-questao-dialog',
    templateUrl: './questao-dialog.component.html'
})
export class QuestaoDialogComponent implements OnInit {

    questao: Questao;
    authorities: any[];
    isSaving: boolean;

    avaliacaos: Avaliacao[];

    respostas: Resposta[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private questaoService: QuestaoService,
        private avaliacaoService: AvaliacaoService,
        private respostaService: RespostaService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['questao']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.avaliacaoService.query().subscribe(
            (res: Response) => { this.avaliacaos = res.json(); }, (res: Response) => this.onError(res.json()));
        this.respostaService.query({filter: 'questao-is-null'}).subscribe((res: Response) => {
            if (!this.questao.resposta || !this.questao.resposta.id) {
                this.respostas = res.json();
            } else {
                this.respostaService.find(this.questao.resposta.id).subscribe((subRes: Resposta) => {
                    this.respostas = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.questao.id !== undefined) {
            this.questaoService.update(this.questao)
                .subscribe((res: Questao) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.questaoService.create(this.questao)
                .subscribe((res: Questao) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Questao) {
        this.eventManager.broadcast({ name: 'questaoListModification', content: 'OK'});
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

    trackAvaliacaoById(index: number, item: Avaliacao) {
        return item.id;
    }

    trackRespostaById(index: number, item: Resposta) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-questao-popup',
    template: ''
})
export class QuestaoPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private questaoPopupService: QuestaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.questaoPopupService
                    .open(QuestaoDialogComponent, params['id']);
            } else {
                this.modalRef = this.questaoPopupService
                    .open(QuestaoDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
