import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KhachHang, SuaKhachHang, ThemKhachHang } from '../../models/khach-hang.model';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KhachhangService {
  constructor(private http: HttpClient) { }
  getAllKhachHang(): Observable<KhachHang[]> {
    return this.http.get<KhachHang[]>(`${environment.apiBaseUrl}/api/KhachHang?_=${Date.now()}`);
  }

  themKhachHang(data: ThemKhachHang): Observable<ThemKhachHang> {
    return this.http.post<ThemKhachHang>(`${environment.apiBaseUrl}/api/KhachHang?addAuth=true`, data);
  }
  suaKhachHang(id: string, suaKhachHang: SuaKhachHang): Observable<KhachHang> {
    return this.http.put<KhachHang>(`${environment.apiBaseUrl}/api/KhachHang/${id}?addAuth=true`, suaKhachHang);
  }

  getKhachHangById(id: string): Observable<KhachHang> {
    return this.http.get<KhachHang>(`${environment.apiBaseUrl}/api/KhachHang/${id}`);
  }
  xoaKhachHang(id: string): Observable<KhachHang> {
    return this.http.delete<KhachHang>(`${environment.apiBaseUrl}/api/KhachHang/${id}?addAuth=true`);
  }
  checkCCCDCuaKhachHang(cccd: string): Observable<boolean> {
    return this.getAllKhachHang().pipe(
      map((data: KhachHang[]) => {
        let existsCCCD = data.filter(s => s.cccd == cccd);
        console.log(existsCCCD);
        return existsCCCD.length > 0;
      })
    );
  }
  checkSDTCuaKhachHang(soDienThoai: string): Observable<boolean> {
    return this.getAllKhachHang().pipe(
      map((data: KhachHang[]) => {
        let existssoDienThoai = data.filter(s => s.soDienThoai == soDienThoai);
        console.log(existssoDienThoai);
        return existssoDienThoai.length > 0;
      })
    );
  }
  checkEmailCuaKhachHang(email: string): Observable<boolean> {
    return this.getAllKhachHang().pipe(
      map((data: KhachHang[]) => {
        let existsemail = data.filter(s => s.email == email);
        console.log(existsemail);
        return existsemail.length > 0;
      })
    );
  }
}
