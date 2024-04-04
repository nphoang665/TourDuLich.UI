import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NhanVien, SuaNhanVien, ThemNhanVien } from '../../models/nhan-vien.model';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NhanVienService {

  constructor(private http: HttpClient) { }

  themNhanVien(data: ThemNhanVien): Observable<ThemNhanVien> {
    return this.http.post<ThemNhanVien>(`${environment.apiBaseUrl}/api/NhanVien?addAuth=true`, data);
  }

  getAllNhanVien(): Observable<NhanVien[]> {
    return this.http.get<NhanVien[]>(`${environment.apiBaseUrl}/api/NhanVien?addAuth=true`);
  }

  suaNhanVien(id: string, suaNhanVien: SuaNhanVien): Observable<NhanVien> {
    return this.http.put<NhanVien>(`${environment.apiBaseUrl}/api/NhanVien/${id}?addAuth=true`, suaNhanVien);
  }

  getNhanVienById(id: string): Observable<NhanVien> {
    return this.http.get<NhanVien>(`${environment.apiBaseUrl}/api/NhanVien/${id}`);
  }

  xoaNhanVien(id: string): Observable<NhanVien> {
    return this.http.delete<NhanVien>(`${environment.apiBaseUrl}/api/NhanVien/${id}?addAuth=true`);
  }
  checkCCCDCuaNhanVien(cccd:string): Observable<boolean> {
    return this.getAllNhanVien().pipe(
        map((data: NhanVien[]) => {
            let existsCCCD = data.filter(s => s.cccd == cccd);
            console.log(existsCCCD);
            return existsCCCD.length > 0;
        })
    );
  }
  checkSDTCuaNhanVien(soDienThoai:string): Observable<boolean> {
  return this.getAllNhanVien().pipe(
      map((data: NhanVien[]) => {
          let existssoDienThoai = data.filter(s => s.soDienThoai == soDienThoai);
          console.log(existssoDienThoai);
          return existssoDienThoai.length > 0;
      })
  );
  }
  checkEmailCuaNhanVien(email:string): Observable<boolean> {
  return this.getAllNhanVien().pipe(
      map((data: NhanVien[]) => {
          let existsemail = data.filter(s => s.email == email);
          console.log(existsemail);
          return existsemail.length > 0;
      })
  );
  }
}
