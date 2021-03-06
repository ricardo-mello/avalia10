import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TurmaComponent } from './turma.component';
import { TurmaDetailComponent } from './turma-detail.component';
import { TurmaPopupComponent } from './turma-dialog.component';
import { TurmaDeletePopupComponent } from './turma-delete-dialog.component';

import { Principal } from '../../shared';


export const turmaRoute: Routes = [
  {
    path: 'turma',
    component: TurmaComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.turma.home.title'
    }
  }, {
    path: 'turma/:id',
    component: TurmaDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.turma.home.title'
    }
  }
];

export const turmaPopupRoute: Routes = [
  {
    path: 'turma-new',
    component: TurmaPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.turma.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'turma/:id/edit',
    component: TurmaPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.turma.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'turma/:id/delete',
    component: TurmaDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.turma.home.title'
    },
    outlet: 'popup'
  }
];
