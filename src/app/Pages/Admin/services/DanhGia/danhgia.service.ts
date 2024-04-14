import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DanhGia } from '../../models/danh-gia.model';
import { environment } from '../../../../../environments/environment';
import { ThemDanhGia } from '../../models/them-danh-gia.model';

@Injectable({
  providedIn: 'root'
})
export class DanhgiaService {

  constructor(private http: HttpClient) { }
  layTatCaDanhGia(): Observable<DanhGia[]> {
    return this.http.get<DanhGia[]>(`${environment.apiBaseUrl}/api/DanhGia?_=${Date.now()}`);
  }
  themDanhGia(data: ThemDanhGia): Observable<ThemDanhGia> {
    return this.http.post<ThemDanhGia>(`${environment.apiBaseUrl}/api/DanhGia?_=${Date.now()}`, data);
  }

  LayTrungBinhSaoMotTour(idTour: string) {
    return this.layTatCaDanhGia().pipe(map((data: DanhGia[]) => {
      let DanhGia = data.filter(s => s.idTour === idTour);
      if (DanhGia.length > 0) {
        let totalScore = DanhGia.reduce((sum, danhGia) => sum + danhGia.diemDanhGia, 0);
        let averageScore = totalScore / DanhGia.length;
        let TrungBinhDiemDanhGia = Number(averageScore.toFixed(1));
        // console.log(TrungBinhDiemDanhGia);
        const objDanhGia = {
          trungBinhDiemDanhGia: TrungBinhDiemDanhGia,
          soLuongDanhGia: DanhGia.length
        }
        return objDanhGia;
      } else {
        const objDanhGia = {
          trungBinhDiemDanhGia: "Chưa có đánh giá",
          soLuongDanhGia: 0
        }
        return objDanhGia;
      }
    }));
  }
}
