import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KhachHang, SuaKhachHang, ThemKhachHang } from '../../models/khach-hang.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KhachhangService {
  constructor(private http: HttpClient) { }
  getAllTourKhachHang(): Observable<KhachHang[]> {
    return this.http.get<KhachHang[]>(`${environment.apiBaseUrl}/api/KhachHang`);
  }

  themKhachHang(data:ThemKhachHang):Observable<ThemKhachHang>{
    return this.http.post<ThemKhachHang>(`${environment.apiBaseUrl}/api/KhachHang`,data);
  }
  suaKhachHang(id:string,suaKhachHang:SuaKhachHang):Observable<KhachHang>{
    return this.http.put<KhachHang>(`${environment.apiBaseUrl}/api/KhachHang/${id}`,suaKhachHang);
  }

  getKhachHangById(id:string):Observable<KhachHang>{
    return this.http.get<KhachHang>(`${environment.apiBaseUrl}/api/KhachHang/${id}`);
  }
  xoaKhachHang(id:string):Observable<KhachHang>{
    return this.http.delete<KhachHang>(`${environment.apiBaseUrl}/api/KhachHang/${id}`);
  }
}
