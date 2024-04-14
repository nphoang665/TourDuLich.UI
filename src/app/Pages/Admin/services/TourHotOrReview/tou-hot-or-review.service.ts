import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { TourHot } from '../../models/tour-hot';
import { Observable } from 'rxjs';
import { TourDanhGiaNhieu } from '../../models/tour-danh-gia-nhieu';

@Injectable({
  providedIn: 'root'
})
export class TouHotOrReviewService {

  constructor( private http:HttpClient) { }
  getTourHot(): Observable<TourHot[]> {
    return this.http.get<TourHot[]>(`${environment.apiBaseUrl}/api/TrangChu/TourDatNhieu`);
  }
  getTourDanhGiaNhieu(): Observable<TourDanhGiaNhieu[]> {
    return this.http.get<TourDanhGiaNhieu[]>(`${environment.apiBaseUrl}/api/TrangChu/TourDanhGiaNhieuNhat`);
  }
}
