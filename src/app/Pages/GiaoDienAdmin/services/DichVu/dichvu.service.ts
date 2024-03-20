import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DichVu } from '../../models/Dich-Vu.model';
import { DatTourChoKhachHang } from '../../models/dat-tour-khach-hang.model';



@Injectable({
  providedIn: 'root'
})
export class DichvuService {

  constructor(private http: HttpClient) {

  }
  LayDichVuMau(): Observable<DichVu[]> {
    return this.http.get<DichVu[]>(`${environment.apiBaseUrl}/api/DichVu`);
  }



}
