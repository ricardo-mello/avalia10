import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ProfessorComponent } from './professor.component';
import { ProfessorDetailComponent } from './professor-detail.component';
import { ProfessorPopupComponent } from './professor-dialog.component';
import { ProfessorDeletePopupComponent } from './professor-delete-dialog.component';

import { Principal } from '../../shared';


export const professorRoute: Routes = [
  {
    path: 'professor',
    component: ProfessorComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.professor.home.title'
    }
  }, {
    path: 'professor/:id',
    component: ProfessorDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.professor.home.title'
    }
  }
];

export const professorPopupRoute: Routes = [
  {
    path: 'professor-new',
    component: ProfessorPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.professor.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'professor/:id/edit',
    component: ProfessorPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.professor.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'professor/:id/delete',
    component: ProfessorDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'avalia10App.professor.home.title'
    },
    outlet: 'popup'
  }
];
