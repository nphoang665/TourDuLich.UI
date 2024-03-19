import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KhachHang } from '../../models/khach-hang.model';
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

  addKhachHang(data:KhachHang):Observable<KhachHang>{
    return this.http.post<KhachHang>(`${environment.apiBaseUrl}/api/KhachHang`,data);
  }
}
