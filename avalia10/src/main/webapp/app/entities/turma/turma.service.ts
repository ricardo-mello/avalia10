import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Turma } from './turma.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class TurmaService {

    private resourceUrl = 'api/turmas';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(turma: Turma): Observable<Turma> {
        let copy: Turma = Object.assign({}, turma);
        copy.dataInicio = this.dateUtils
            .convertLocalDateToServer(turma.dataInicio);
        copy.dataFim = this.dateUtils
            .convertLocalDateToServer(turma.dataFim);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(turma: Turma): Observable<Turma> {
        let copy: Turma = Object.assign({}, turma);
        copy.dataInicio = this.dateUtils
            .convertLocalDateToServer(turma.dataInicio);
        copy.dataFim = this.dateUtils
            .convertLocalDateToServer(turma.dataFim);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Turma> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.dataInicio = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.dataInicio);
            jsonResponse.dataFim = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.dataFim);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }


    private convertResponse(res: any): any {
        let jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].dataInicio = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].dataInicio);
            jsonResponse[i].dataFim = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].dataFim);
        }
        res._body = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
