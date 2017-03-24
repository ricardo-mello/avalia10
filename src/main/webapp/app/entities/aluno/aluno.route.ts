import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { AlunoComponent } from './aluno.component';
import { AlunoDetailComponent } from './aluno-detail.component';
import { AlunoPopupComponent } from './aluno-dialog.component';
import { AlunoDeletePopupComponent } from './aluno-delete-dialog.component';

import { Principal } from '../../shared';


export const alunoRoute: Routes = [
  {
    path: 'aluno',
    component: AlunoComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.aluno.home.title'
    }
  }, {
    path: 'aluno/:id',
    component: AlunoDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.aluno.home.title'
    }
  }
];

export const alunoPopupRoute: Routes = [
  {
    path: 'aluno-new',
    component: AlunoPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.aluno.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'aluno/:id/edit',
    component: AlunoPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.aluno.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'aluno/:id/delete',
    component: AlunoDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.aluno.home.title'
    },
    outlet: 'popup'
  }
];
