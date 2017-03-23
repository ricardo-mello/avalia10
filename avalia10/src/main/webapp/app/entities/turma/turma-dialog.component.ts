import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Turma } from './turma.model';
import { TurmaPopupService } from './turma-popup.service';
import { TurmaService } from './turma.service';
import { Modulo, ModuloService } from '../modulo';
import { Aluno, AlunoService } from '../aluno';
@Component({
    selector: 'jhi-turma-dialog',
    templateUrl: './turma-dialog.component.html'
})
export class TurmaDialogComponent implements OnInit {

    turma: Turma;
    authorities: any[];
    isSaving: boolean;

    modulos: Modulo[];

    alunos: Aluno[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private turmaService: TurmaService,
        private moduloService: ModuloService,
        private alunoService: AlunoService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['turma']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.moduloService.query().subscribe(
            (res: Response) => { this.modulos = res.json(); }, (res: Response) => this.onError(res.json()));
        this.alunoService.query().subscribe(
            (res: Response) => { this.alunos = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.turma.id !== undefined) {
            this.turmaService.update(this.turma)
                .subscribe((res: Turma) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.turmaService.create(this.turma)
                .subscribe((res: Turma) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Turma) {
        this.eventManager.broadcast({ name: 'turmaListModification', content: 'OK'});
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

    trackModuloById(index: number, item: Modulo) {
        return item.id;
    }

    trackAlunoById(index: number, item: Aluno) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-turma-popup',
    template: ''
})
export class TurmaPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private turmaPopupService: TurmaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.turmaPopupService
                    .open(TurmaDialogComponent, params['id']);
            } else {
                this.modalRef = this.turmaPopupService
                    .open(TurmaDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
