import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Avaliacao } from './avaliacao.model';
import { AvaliacaoPopupService } from './avaliacao-popup.service';
import { AvaliacaoService } from './avaliacao.service';
import { Aluno, AlunoService } from '../aluno';
import { Modulo, ModuloService } from '../modulo';
import { Turma, TurmaService } from '../turma';
import { Professor, ProfessorService } from '../professor';
import { Questao, QuestaoService } from '../questao';
@Component({
    selector: 'jhi-avaliacao-dialog',
    templateUrl: './avaliacao-dialog.component.html'
})
export class AvaliacaoDialogComponent implements OnInit {

    avaliacao: Avaliacao;
    authorities: any[];
    isSaving: boolean;

    alunos: Aluno[];

    modulos: Modulo[];

    turmas: Turma[];

    professors: Professor[];

    questaos: Questao[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private avaliacaoService: AvaliacaoService,
        private alunoService: AlunoService,
        private moduloService: ModuloService,
        private turmaService: TurmaService,
        private professorService: ProfessorService,
        private questaoService: QuestaoService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['avaliacao']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.alunoService.query({filter: 'avaliacao-is-null'}).subscribe((res: Response) => {
            if (!this.avaliacao.aluno || !this.avaliacao.aluno.id) {
                this.alunos = res.json();
            } else {
                this.alunoService.find(this.avaliacao.aluno.id).subscribe((subRes: Aluno) => {
                    this.alunos = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.moduloService.query({filter: 'avaliacao-is-null'}).subscribe((res: Response) => {
            if (!this.avaliacao.modulo || !this.avaliacao.modulo.id) {
                this.modulos = res.json();
            } else {
                this.moduloService.find(this.avaliacao.modulo.id).subscribe((subRes: Modulo) => {
                    this.modulos = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.turmaService.query({filter: 'avaliacao-is-null'}).subscribe((res: Response) => {
            if (!this.avaliacao.turma || !this.avaliacao.turma.id) {
                this.turmas = res.json();
            } else {
                this.turmaService.find(this.avaliacao.turma.id).subscribe((subRes: Turma) => {
                    this.turmas = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.professorService.query({filter: 'avaliacao-is-null'}).subscribe((res: Response) => {
            if (!this.avaliacao.professor || !this.avaliacao.professor.id) {
                this.professors = res.json();
            } else {
                this.professorService.find(this.avaliacao.professor.id).subscribe((subRes: Professor) => {
                    this.professors = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.questaoService.query().subscribe(
            (res: Response) => { this.questaos = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.avaliacao.id !== undefined) {
            this.avaliacaoService.update(this.avaliacao)
                .subscribe((res: Avaliacao) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.avaliacaoService.create(this.avaliacao)
                .subscribe((res: Avaliacao) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Avaliacao) {
        this.eventManager.broadcast({ name: 'avaliacaoListModification', content: 'OK'});
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

    trackAlunoById(index: number, item: Aluno) {
        return item.id;
    }

    trackModuloById(index: number, item: Modulo) {
        return item.id;
    }

    trackTurmaById(index: number, item: Turma) {
        return item.id;
    }

    trackProfessorById(index: number, item: Professor) {
        return item.id;
    }

    trackQuestaoById(index: number, item: Questao) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-avaliacao-popup',
    template: ''
})
export class AvaliacaoPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private avaliacaoPopupService: AvaliacaoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.avaliacaoPopupService
                    .open(AvaliacaoDialogComponent, params['id']);
            } else {
                this.modalRef = this.avaliacaoPopupService
                    .open(AvaliacaoDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
