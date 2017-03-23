import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Modulo } from './modulo.model';
import { ModuloPopupService } from './modulo-popup.service';
import { ModuloService } from './modulo.service';
import { Bloco, BlocoService } from '../bloco';
import { Professor, ProfessorService } from '../professor';
import { Turma, TurmaService } from '../turma';
@Component({
    selector: 'jhi-modulo-dialog',
    templateUrl: './modulo-dialog.component.html'
})
export class ModuloDialogComponent implements OnInit {

    modulo: Modulo;
    authorities: any[];
    isSaving: boolean;

    blocos: Bloco[];

    professors: Professor[];

    turmas: Turma[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private moduloService: ModuloService,
        private blocoService: BlocoService,
        private professorService: ProfessorService,
        private turmaService: TurmaService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['modulo']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.blocoService.query().subscribe(
            (res: Response) => { this.blocos = res.json(); }, (res: Response) => this.onError(res.json()));
        this.professorService.query({filter: 'modulo-is-null'}).subscribe((res: Response) => {
            if (!this.modulo.professor || !this.modulo.professor.id) {
                this.professors = res.json();
            } else {
                this.professorService.find(this.modulo.professor.id).subscribe((subRes: Professor) => {
                    this.professors = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.turmaService.query().subscribe(
            (res: Response) => { this.turmas = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.modulo.id !== undefined) {
            this.moduloService.update(this.modulo)
                .subscribe((res: Modulo) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.moduloService.create(this.modulo)
                .subscribe((res: Modulo) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Modulo) {
        this.eventManager.broadcast({ name: 'moduloListModification', content: 'OK'});
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

    trackProfessorById(index: number, item: Professor) {
        return item.id;
    }

    trackTurmaById(index: number, item: Turma) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-modulo-popup',
    template: ''
})
export class ModuloPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private moduloPopupService: ModuloPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.moduloPopupService
                    .open(ModuloDialogComponent, params['id']);
            } else {
                this.modalRef = this.moduloPopupService
                    .open(ModuloDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
