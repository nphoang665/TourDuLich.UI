import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { KhachHang } from '../../models/khach-hang.model';

@Injectable({
  providedIn: 'root'
})
export class KhachhangService {
  constructor(private http: HttpClient) { }
  getAllTourKhachHang(): Observable<KhachHang[]> {
    return this.http.get<KhachHang[]>(`${environment.apiBaseUrl}/api/KhachHang`);
  }
}
