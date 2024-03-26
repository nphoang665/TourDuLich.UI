import { HttpClient, HttpSentEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DichVu, SuaDichVu } from '../models/Dich-Vu.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DichVuService {

  constructor(private http:HttpClient) { }
  getalldichVu():Observable<DichVu[]>{
    return this.http.get<DichVu[]>(`${environment.apiBaseUrl}/api/DichVu`)
  }
  getDichVubyId(id: string):Observable<DichVu>{
    return this.http.get<DichVu>(`${environment.apiBaseUrl}/api/DichVu/${id}`);
  }
  themDichVu(data: DichVu):Observable<DichVu>{
    return this.http.post<DichVu>(`${environment.apiBaseUrl}/api/DichVu`, data);
  }
  suaDichVu(id: string, data: SuaDichVu):Observable<DichVu>{
    return this.http.put<DichVu>(`${environment.apiBaseUrl}/api/DichVu/${id}`, data);
  }
  xoaDichVu(id: string):Observable<DichVu>{
    return this.http.delete<DichVu>(`${environment.apiBaseUrl}/api/DichVu/${id}`);
  }
}
