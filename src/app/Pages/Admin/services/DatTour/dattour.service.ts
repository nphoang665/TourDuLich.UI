import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThemDatTour } from '../../models/them-datTour.model';
import { Observable } from 'rxjs';
import { DatTour } from '../../models/dat-tour.model';
import { environment } from '../../../../../environments/environment';
import { DatTourChoKhachHang } from '../../models/dat-tour-khach-hang.model';
import { SuaDatTour } from '../../models/suaDatTour.model';

@Injectable({
  providedIn: 'root'
})
export class DattourService {

  constructor(private http: HttpClient) { }

  themDatTour(data: ThemDatTour): Observable<ThemDatTour> {
    return this.http.post<ThemDatTour>(`${environment.apiBaseUrl}/api/datTour?addAuth=true`, data);
  }
  getDatTourById(id: string): Observable<DatTour> {
    return this.http.get<DatTour>(`${environment.apiBaseUrl}/timkiemdattourtheoidtour/${id}`);
  }

  getDatTourByIdDatTour(id: string): Observable<DatTour> {
    return this.http.get<DatTour>(`${environment.apiBaseUrl}/api/datTour/${id}`);
  }
  DatTourChoKhachHang(data: DatTourChoKhachHang): any {
    return this.http.post<DatTourChoKhachHang>(`${environment.apiBaseUrl}/DatTourChoKhachHang`, data);
  }
  
  getAllDatTour(): Observable<DatTour[]> {
    return this.http.get<DatTour[]>(`${environment.apiBaseUrl}/api/datTour`);
  }

  putDatTour(data :SuaDatTour,id:string): Observable<SuaDatTour> {
    return this.http.put<SuaDatTour>(`${environment.apiBaseUrl}/api/datTour/${id}?addAuth=true`,data);
  }
}
