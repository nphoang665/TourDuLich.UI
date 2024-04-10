import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ThanhToan, ThanhToanDto } from '../../models/thanh-toan.model';
import { environment } from '../../../../../environments/environment';
import { DatTour } from '../../models/dat-tour.model';
import { DichVu } from '../../models/Dich-Vu.model';

@Injectable({
  providedIn: 'root'
})
export class ThanhToanService {
  constructor(private http:HttpClient) { }

  thanhToan(data:ThanhToan):Observable<ThanhToan>{
    return this.http.post<ThanhToan>(`${environment.apiBaseUrl}/api/ThanhToan`, data);
  }

  getAllThanhToan():Observable<ThanhToan[]>{
    return this.http.get<ThanhToan[]>(`${environment.apiBaseUrl}/api/ThanhToan`);
  }

  getThanhToanById(id:string):Observable<ThanhToanDto>{
    return this.http.get<ThanhToanDto>(`${environment.apiBaseUrl}/api/ThanhToan/${id}`);
  }

  getDatTourById(id:string):Observable<DatTour>{
    return this.http.get<DatTour>(`${environment.apiBaseUrl}/api/dattour/${id}`);
  }
}
