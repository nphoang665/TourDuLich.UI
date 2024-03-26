import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DichVu, SuaDichVu } from '../../models/Dich-Vu.model';
import { environment } from '../../../../../environments/environment';
import { SuaDatTour } from '../../models/suaDatTour.model';

@Injectable({
  providedIn: 'root'
})
export class QuanLyDichVuService {
  

  constructor(private http:HttpClient) { }
  getAllDichVu():Observable<DichVu[]>{
    return this.http.get<DichVu[]>(`${environment.apiBaseUrl}/api/DichVu`)
  }
  getDichVuById(id:string):Observable<DichVu>{
    return this.http.get<DichVu>(`${environment.apiBaseUrl}/api/DichVu/${id}`)
  }
  createDichVu(data:DichVu):Observable<DichVu>{
    return this.http.post<DichVu>(`${environment.apiBaseUrl}/api/DichVu`,data)
  }
  updateDichVu(id:string,data:SuaDichVu):Observable<DichVu>{
    return this.http.put<DichVu>(`${environment.apiBaseUrl}/api/DichVu/${id}`,data)
  }
  deleteDichVu(id:string):Observable<DichVu>{
    return this.http.delete<DichVu>(`${environment.apiBaseUrl}/api/DichVu/${id}`)
  }
}
