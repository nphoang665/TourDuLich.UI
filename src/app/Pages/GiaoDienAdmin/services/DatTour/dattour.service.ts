import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThemDatTour } from '../../models/them-datTour.model';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { DatTour } from '../../models/dat-tour.model';
import { DatTourChoKhachHang } from '../../models/dat-tour-khach-hang.model';

@Injectable({
  providedIn: 'root'
})
export class DattourService {

  constructor(private http: HttpClient) { }

  themDatTour(data: ThemDatTour): Observable<ThemDatTour> {
    return this.http.post<ThemDatTour>(`${environment.apiBaseUrl}/api/datTour`, data);
  }
  getDatTourById(id: string): Observable<DatTour> {
    return this.http.get<DatTour>(`${environment.apiBaseUrl}/timkiemdattourtheoidtour/${id}`);
  }
  DatTourChoKhachHang(data: DatTourChoKhachHang): any {
    return this.http.post<DatTourChoKhachHang>(`${environment.apiBaseUrl}/DatTourChoKhachHang`, data);
  }

}
