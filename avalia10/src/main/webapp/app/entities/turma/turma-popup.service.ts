import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Turma } from './turma.model';
import { TurmaService } from './turma.service';
@Injectable()
export class TurmaPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private turmaService: TurmaService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.turmaService.find(id).subscribe(turma => {
                if (turma.dataInicio) {
                    turma.dataInicio = {
                        year: turma.dataInicio.getFullYear(),
                        month: turma.dataInicio.getMonth() + 1,
                        day: turma.dataInicio.getDate()
                    };
                }
                if (turma.dataFim) {
                    turma.dataFim = {
                        year: turma.dataFim.getFullYear(),
                        month: turma.dataFim.getMonth() + 1,
                        day: turma.dataFim.getDate()
                    };
                }
                this.turmaModalRef(component, turma);
            });
        } else {
            return this.turmaModalRef(component, new Turma());
        }
    }

    turmaModalRef(component: Component, turma: Turma): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.turma = turma;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
