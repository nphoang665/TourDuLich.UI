import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThemDatTour } from '../../models/them-datTour.model';
import { Observable } from 'rxjs';
import { DatTour } from '../../models/dat-tour.model';
import { environment } from '../../../../../environments/environment';

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

}
