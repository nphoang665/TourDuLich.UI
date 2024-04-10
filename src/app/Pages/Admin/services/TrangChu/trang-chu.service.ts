import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoanhThuThang } from '../../models/getDoanhThu';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DichVuDaDat } from '../../models/dich-vu-da-dat';
import { TourDaDat } from '../../models/tour-da-dat';
import { TiLeDatTour } from '../../models/ti-le-dat-tour';

@Injectable({
  providedIn: 'root'
})
export class TrangChuService {
constructor(private http:HttpClient){}
// getDoanhThu : Observable<DoanhThuThang> {
//   return this.http.get<DoanhThuThang>(`${environment.apiBaseUrl}/api/TrangChu/DoanhThuTheoThang`, data);
// }
// getDichVuDaDat(data: any): Observable<DichVuDaDat> {
//   return this.http.get<DichVuDaDat>(`${environment.apiBaseUrl}/api/TrangChu/DichVuDaDat`, data);
// }

getDoanhThu(): Observable<DoanhThuThang[]> {
  return this.http.get<DoanhThuThang[]>(`${environment.apiBaseUrl}/api/TrangChu/DoanhThuTheoThang`);
}
getDichVuDaDat(): Observable<DichVuDaDat[]> {
  return this.http.get<DichVuDaDat[]>(`${environment.apiBaseUrl}/api/TrangChu/DichVuDaDat`);
}
getTourDaDat(): Observable<TourDaDat[]> {
  return this.http.get<TourDaDat[]>(`${environment.apiBaseUrl}/api/TrangChu/TourDaDat`);
}
getTiLe(): Observable<TiLeDatTour[]> {
  return this.http.get<TiLeDatTour[]>(`${environment.apiBaseUrl}/api/TrangChu/TiLeDatHuy`);
}
}
