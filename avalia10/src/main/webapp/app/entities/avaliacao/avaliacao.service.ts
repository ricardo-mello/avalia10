import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Avaliacao } from './avaliacao.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class AvaliacaoService {

    private resourceUrl = 'api/avaliacaos';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(avaliacao: Avaliacao): Observable<Avaliacao> {
        let copy: Avaliacao = Object.assign({}, avaliacao);
        copy.dataInicio = this.dateUtils
            .convertLocalDateToServer(avaliacao.dataInicio);
        copy.dataTermino = this.dateUtils
            .convertLocalDateToServer(avaliacao.dataTermino);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(avaliacao: Avaliacao): Observable<Avaliacao> {
        let copy: Avaliacao = Object.assign({}, avaliacao);
        copy.dataInicio = this.dateUtils
            .convertLocalDateToServer(avaliacao.dataInicio);
        copy.dataTermino = this.dateUtils
            .convertLocalDateToServer(avaliacao.dataTermino);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Avaliacao> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.dataInicio = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.dataInicio);
            jsonResponse.dataTermino = this.dateUtils
                .convertLocalDateFromServer(jsonResponse.dataTermino);
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
            jsonResponse[i].dataTermino = this.dateUtils
                .convertLocalDateFromServer(jsonResponse[i].dataTermino);
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
