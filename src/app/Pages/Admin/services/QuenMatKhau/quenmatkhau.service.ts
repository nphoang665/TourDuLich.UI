import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuenmatkhauService {

  constructor(private http: HttpClient) { }
  LayLaiMatKhau(data: RequestData): Observable<any> {
    return this.http.post<RequestData>(`${environment.apiBaseUrl}/api/Auth/QuenMatKhau?addAuth=true`, data);
  }
}
export interface RequestData {
  optionOtp: string,
  thongTin: string,
  matKhauMoi: string,
}
