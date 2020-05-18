import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Autorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  formData: PaymentDetail;
  readonly rootURL = 'http://localhost:50055/api';
  list: PaymentDetail[];

  constructor(private http: HttpClient) { }

  postPaymentDetail(): Observable<PaymentDetail> {
    return this.http.post<PaymentDetail>(this.rootURL + '/PaymentDetail', this.formData, httpOptions);
  }

  putPaymentDetail(): Observable<PaymentDetail> {
    return this.http.put<PaymentDetail>(this.rootURL + '/PaymentDetail/' + this.formData.PMId, this.formData, httpOptions);
  }

  deletePaymentDetail(id: any): Observable<{}> {
    return this.http.delete(this.rootURL + '/PaymentDetail/' + id, httpOptions);
  }

  refreshList() {
    this.http.get(this.rootURL + '/PaymentDetail')
      .toPromise()
      .then(res => this.list = res as PaymentDetail[]);
  }

}
