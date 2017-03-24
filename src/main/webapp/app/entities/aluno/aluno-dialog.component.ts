import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Aluno } from './aluno.model';
import { AlunoPopupService } from './aluno-popup.service';
import { AlunoService } from './aluno.service';
import { Turma, TurmaService } from '../turma';
@Component({
    selector: 'jhi-aluno-dialog',
    templateUrl: './aluno-dialog.component.html'
})
export class AlunoDialogComponent implements OnInit {

    aluno: Aluno;
    authorities: any[];
    isSaving: boolean;

    turmas: Turma[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private alunoService: AlunoService,
        private turmaService: TurmaService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['aluno']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.turmaService.query().subscribe(
            (res: Response) => { this.turmas = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.aluno.id !== undefined) {
            this.alunoService.update(this.aluno)
                .subscribe((res: Aluno) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.alunoService.create(this.aluno)
                .subscribe((res: Aluno) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Aluno) {
        this.eventManager.broadcast({ name: 'alunoListModification', content: 'OK'});
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

    trackTurmaById(index: number, item: Turma) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-aluno-popup',
    template: ''
})
export class AlunoPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private alunoPopupService: AlunoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.alunoPopupService
                    .open(AlunoDialogComponent, params['id']);
            } else {
                this.modalRef = this.alunoPopupService
                    .open(AlunoDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
