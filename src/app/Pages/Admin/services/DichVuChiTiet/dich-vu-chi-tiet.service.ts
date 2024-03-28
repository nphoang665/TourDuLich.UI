import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DichVuChiTiet } from '../../models/dat-tour-khach-hang.model';
import { environment } from '../../../../../environments/environment';
import { DichVuChiTietDto } from '../../models/dich-vu-chi-tiet.model';

@Injectable({
  providedIn: 'root'
})
export class DichVuChiTietService {
  constructor(private http: HttpClient) { }

  GetAllDichVuChiTiet(): Observable<DichVuChiTietDto[]> {
    return this.http.get<DichVuChiTietDto[]>(`${environment.apiBaseUrl}/api/DichVuChiTiet`);
  }
  GetDichVuChiTietById(idDatTour: string) {
    return this.GetAllDichVuChiTiet().pipe(map((data: DichVuChiTietDto[]) => {
      if (data) {
        let dichVuChiTietTrongDatTour: any[] = [];
        dichVuChiTietTrongDatTour = data.filter(s => s.idDatTour === idDatTour);
        return dichVuChiTietTrongDatTour;
      }
      else {
        return null;
      }
    }));
  }
  LuuDichVuChiTietVaoDb() {

  }
}
