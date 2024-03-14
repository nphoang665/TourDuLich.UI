import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThemDatTour } from '../../models/them-datTour.model';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DattourService {

  constructor(private http:HttpClient) { }

  themDatTour(data: ThemDatTour) : Observable<ThemDatTour> {
    return this.http.post<ThemDatTour>(`${environment.apiBaseUrl}/api/datTour`, data);
  }
}
