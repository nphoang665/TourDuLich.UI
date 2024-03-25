import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DanhGia } from '../../models/danh-gia.model';
import { environment } from '../../../../../environments/environment';
import { ThemDanhGia } from '../../models/them-danh-gia.model';

@Injectable({
  providedIn: 'root'
})
export class DanhgiaService {

  constructor(private http: HttpClient) { }
  layTatCaDanhGia(): Observable<DanhGia[]> {
    return this.http.get<DanhGia[]>(`${environment.apiBaseUrl}/api/DanhGia`);
  }
  themDanhGia(data: ThemDanhGia): Observable<ThemDanhGia> {
    return this.http.post<ThemDanhGia>(`${environment.apiBaseUrl}/api/DanhGia`, data);
  }
}
