import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TourDuLich } from '../models/tour-du-lich.model';
import { BehaviorSubject, Observable, map, pipe } from 'rxjs';
import { themTour } from '../models/them-tour.model';
import { SuaTour } from '../models/sua-tour.model';

@Injectable({
  providedIn: 'root'
})
export class QuanLyTourService {

  constructor(private http: HttpClient) { }
  themTourDuLich(data: themTour): Observable<TourDuLich> {
    return this.http.post<TourDuLich>(`${environment.apiBaseUrl}/api/TourDuLich?addAuth=true`, data);
  }

  getAllTourDuLich(): Observable<TourDuLich[]> {
    return this.http.get<TourDuLich[]>(`${environment.apiBaseUrl}/api/TourDuLich`);
  }

  suaTourDuLich(id: string, suaTuor: SuaTour): Observable<TourDuLich> {
    return this.http.put<TourDuLich>(`${environment.apiBaseUrl}/api/TourDuLich/${id}?addAuth=true`, suaTuor);
  }

  getTourDuLichById(id: string): Observable<TourDuLich> {
    return this.http.get<TourDuLich>(`${environment.apiBaseUrl}/api/TourDuLich/${id}`);
  }

  xoaTourDuLich(id: string): Observable<TourDuLich> {
    return this.http.delete<TourDuLich>(`${environment.apiBaseUrl}/api/TourDuLich/${id}?addAuth=true`);
  }
  getUniqueTypeOfTour() {
    return this.getAllTourDuLich().pipe(map((data: TourDuLich[]) => {

      let uniQueLoaiTour = new Set();
      data.forEach(element => {
        uniQueLoaiTour.add(element.loaiTour);
      });
      let loaiTourKhongTrung = Array.from(uniQueLoaiTour);
      return loaiTourKhongTrung;

    }))
  }
}
