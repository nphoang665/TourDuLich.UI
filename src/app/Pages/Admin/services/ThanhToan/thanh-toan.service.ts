import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ThanhToan } from '../../models/thanh-toan.model';
import { environment } from '../../../../../environments/environment';

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

  getThanhToanById(id:string):Observable<ThanhToan>{
    return this.http.get<ThanhToan>(`${environment.apiBaseUrl}/api/ThanhToan/${id}`);
  }
  
}
