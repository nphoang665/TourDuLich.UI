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
import { ThanhToan } from '../../models/thanh-toan.model';

@Injectable({
  providedIn: 'root'
})
export class DattourService {

  constructor(private http: HttpClient, private toastr: ToastrService, private tourDuLichServices: QuanLyTourService) { }

  themDatTour(data: ThemDatTour): Observable<ThemDatTour> {
    return this.http.post<ThemDatTour>(`${environment.apiBaseUrl}/api/datTour?addAuth=true`, data);
  }
  getDatTourById(id: string): Observable<DatTour> {
    return this.http.get<DatTour>(`${environment.apiBaseUrl}/timkiemdattourtheoidtour/${id}?_=${Date.now()}`);
  }

  getDatTourByIdDatTour(id: string): Observable<DatTour> {
    return this.http.get<DatTour>(`${environment.apiBaseUrl}/api/datTour/${id}`);
  }
  DatTourChoKhachHang(data: DatTourChoKhachHang): any {
    return this.http.post<DatTourChoKhachHang>(`${environment.apiBaseUrl}/DatTourChoKhachHang`, data);
  }

  getAllDatTour(): Observable<DatTour[]> {
    const url = `${environment.apiBaseUrl}/api/datTour?_=${Date.now()}`;
    return this.http.get<DatTour[]>(url);
  }

  putDatTour(data: SuaDatTour, id: string): Observable<SuaDatTour> {
    return this.http.put<SuaDatTour>(`${environment.apiBaseUrl}/api/datTour/${id}?addAuth=true`, data);
  }
  guiMailHoaDon(idThanhToan: string) {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/Auth/GuiEmailChoKhachHang/${idThanhToan}`);
  }


  tinhSoLuongNguoiConNhan(idTour: string): Observable<any> {
    let TongSoLuongNguoiLonDaDatTrongTour = 0;
    let TongSoLuongTreEmDaDatTrongTour = 0;
    let SoChoConNhanTrongTour = 0;

    return this.getDatTourById(idTour).pipe(
      switchMap((response: any) => {
        response.forEach((element: any) => {
          if (element.tinhTrang != 'Đã hủy') {
            TongSoLuongNguoiLonDaDatTrongTour += element.soLuongNguoiLon;
            TongSoLuongTreEmDaDatTrongTour += element.soLuongTreEm;
          }
        });
        return this.tourDuLichServices.getTourDuLichById(idTour).pipe(
          map((resTour: TourDuLich) => {



            TongSoLuongNguoiLonDaDatTrongTour = Number(resTour.soLuongNguoiLon) - TongSoLuongNguoiLonDaDatTrongTour;
            TongSoLuongTreEmDaDatTrongTour = Number(resTour.soLuongTreEm) - TongSoLuongTreEmDaDatTrongTour;
            SoChoConNhanTrongTour = TongSoLuongNguoiLonDaDatTrongTour + TongSoLuongTreEmDaDatTrongTour;
            // console.log(resTour, TongSoLuongNguoiLonDaDatTrongTour, TongSoLuongNguoiLonDaDatTrongTour);


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

  //hàm này không trừ hết số chỗ còn nhận của một tour, loại ra những đặt tour đang target là không lấy
  LaySoChoConNhanTruIdDatTourDangTarget(idTour: string, idDatTour: string): Observable<any> {
    let TongSoLuongNguoiLonDaDatTrongTour = 0;
    let TongSoLuongTreEmDaDatTrongTour = 0;
    let SoChoConNhanTrongTour = 0;

    return this.getDatTourById(idTour).pipe(
      switchMap((response: any) => {
        response.forEach((element: any) => {

          if (element.tinhTrang != 'Đã hủy' && element.idDatTour != idDatTour) {
            console.log(1);

            TongSoLuongNguoiLonDaDatTrongTour += element.soLuongNguoiLon;
            TongSoLuongTreEmDaDatTrongTour += element.soLuongTreEm;
          }
        });
        // Biến đổi dữ liệu trả về tại đây nếu cần
        return this.tourDuLichServices.getTourDuLichById(idTour).pipe(
          map((resTour: TourDuLich) => {

            TongSoLuongNguoiLonDaDatTrongTour = Number(resTour.soLuongNguoiLon) - TongSoLuongNguoiLonDaDatTrongTour;
            TongSoLuongTreEmDaDatTrongTour = Number(resTour.soLuongTreEm) - TongSoLuongTreEmDaDatTrongTour;
            SoChoConNhanTrongTour = TongSoLuongNguoiLonDaDatTrongTour + TongSoLuongTreEmDaDatTrongTour;
            // console.log(SoChoConNhanTrongTour);
            console.log(TongSoLuongNguoiLonDaDatTrongTour, TongSoLuongTreEmDaDatTrongTour);

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


  kiemTraKhachHangDatTour(idKhachHang: string, idTour: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.getAllDatTour().subscribe((resTour: any) => {
        for (let tour of resTour) {
          if (tour.idKhachHang === idKhachHang && tour.idTour === idTour && tour.tinhTrang !== 'Đã hủy') {
            observer.next(true);
            return;
          }
        }
        observer.next(false);
      });
    });
  }

}
