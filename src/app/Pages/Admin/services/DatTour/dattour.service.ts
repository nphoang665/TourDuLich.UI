import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThemDatTour } from '../../models/them-datTour.model';
import { Observable, catchError, map, switchMap } from 'rxjs';
import { DatTour } from '../../models/dat-tour.model';
import { environment } from '../../../../../environments/environment';
import { DatTourChoKhachHang } from '../../models/dat-tour-khach-hang.model';
import { SuaDatTour } from '../../models/suaDatTour.model';
import { Toast, ToastrService } from 'ngx-toastr';
import { TourDuLich } from '../../models/tour-du-lich.model';
import { QuanLyTourService } from '../quan-ly-tour.service';
import { KhachHang } from '../../models/khach-hang.model';

@Injectable({
  providedIn: 'root'
})
export class DattourService {

  constructor(private http: HttpClient, private toastr: ToastrService, private tourDuLichServices: QuanLyTourService) { }

  themDatTour(data: ThemDatTour): Observable<ThemDatTour> {
    return this.http.post<ThemDatTour>(`${environment.apiBaseUrl}/api/datTour?addAuth=true`, data);
  }
  getDatTourById(id: string): Observable<DatTour> {
    return this.http.get<DatTour>(`${environment.apiBaseUrl}/timkiemdattourtheoidtour/${id}`);
  }

  getDatTourByIdDatTour(id: string): Observable<DatTour> {
    return this.http.get<DatTour>(`${environment.apiBaseUrl}/api/datTour/${id}`);
  }
  DatTourChoKhachHang(data: DatTourChoKhachHang): any {
    return this.http.post<DatTourChoKhachHang>(`${environment.apiBaseUrl}/DatTourChoKhachHang`, data);
  }

  getAllDatTour(): Observable<DatTour[]> {
    return this.http.get<DatTour[]>(`${environment.apiBaseUrl}/api/datTour`);
  }

  putDatTour(data: SuaDatTour, id: string): Observable<SuaDatTour> {
    return this.http.put<SuaDatTour>(`${environment.apiBaseUrl}/api/datTour/${id}?addAuth=true`, data);
  }
  tinhSoLuongNguoiConNhan(idTour: string): Observable<any> {
    let TongSoLuongNguoiLonDaDatTrongTour = 0;
    let TongSoLuongTreEmDaDatTrongTour = 0;
    let SoChoConNhanTrongTour = 0;

    return this.getDatTourById(idTour).pipe(
      switchMap((response: any) => {
        response.forEach((element: any) => {
          TongSoLuongNguoiLonDaDatTrongTour += element.soLuongNguoiLon;
          TongSoLuongTreEmDaDatTrongTour += element.soLuongTreEm;
        });
        // Biến đổi dữ liệu trả về tại đây nếu cần
        return this.tourDuLichServices.getTourDuLichById(idTour).pipe(
          map((resTour: TourDuLich) => {
            TongSoLuongNguoiLonDaDatTrongTour = Number(resTour.soLuongNguoiLon) - TongSoLuongNguoiLonDaDatTrongTour;
            TongSoLuongTreEmDaDatTrongTour = Number(resTour.soLuongTreEm) - TongSoLuongTreEmDaDatTrongTour;
            SoChoConNhanTrongTour = TongSoLuongNguoiLonDaDatTrongTour + TongSoLuongTreEmDaDatTrongTour;

            return {
              TongSoLuongNguoiLonDaDatTrongTour: TongSoLuongNguoiLonDaDatTrongTour,
              TongSoLuongTreEmDaDatTrongTour: TongSoLuongTreEmDaDatTrongTour,
              SoChoConNhanTrongTour: SoChoConNhanTrongTour,
            };
          })
        );
      }),
      catchError((err: any) => {
        this.toastr.warning('Lấy tour theo idTour thất bại', 'Thông báo', {
          timeOut: 1000,
        });
        throw err;
      })
    );
  }
  
  


}
