import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NhanVien, SuaNhanVien, ThemNhanVien } from '../../models/nhan-vien.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NhanVienService {

  constructor(private http: HttpClient) { }

  themNhanVien(data: ThemNhanVien): Observable<ThemNhanVien> {
    return this.http.post<ThemNhanVien>(`${environment.apiBaseUrl}/api/NhanVien`, data);
  }

  getAllNhanVien(): Observable<NhanVien[]> {
    return this.http.get<NhanVien[]>(`${environment.apiBaseUrl}/api/NhanVien`);
  }

  suaNhanVien(id: string, suaNhanVien: SuaNhanVien): Observable<NhanVien> {
    return this.http.put<NhanVien>(`${environment.apiBaseUrl}/api/NhanVien/${id}`, suaNhanVien);
  }

  getNhanVienById(id: string): Observable<NhanVien> {
    return this.http.get<NhanVien>(`${environment.apiBaseUrl}/api/NhanVien/${id}`);
  }

  xoaNhanVien(id:string):Observable<NhanVien>{
    return this.http.delete<NhanVien>(`${environment.apiBaseUrl}/api/NhanVien/${id}`);
  }
}
