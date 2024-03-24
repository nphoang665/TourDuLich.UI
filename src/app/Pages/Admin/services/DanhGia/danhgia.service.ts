import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DanhGia } from '../../models/danh-gia.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DanhgiaService {

  constructor(private http: HttpClient) { }
  layTatCaDanhGia(): Observable<DanhGia[]> {
    return this.http.get<DanhGia[]>(`${environment.apiBaseUrl}/api/DanhGia`);
  }
}
