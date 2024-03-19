import { Injectable } from '@angular/core';
interface DichVu {
  IdDichVu: string;
  TenDichVu: string;
  DonViTinh: string;
  GiaTien: number;
  TinhTrang: string;
  GioBatDau: Date;
  GioKetThuc: Date;
  NgayThem: Date;
}
@Injectable({
  providedIn: 'root'
})

export class DichVuTestDataService {

  data: any[] = [
    { IdDichVu: '1', TenDichVu: 'Dịch vụ 1', DonViTinh: 'Đơn vị 1', GiaTien: 1000, TinhTrang: 'Hoạt động', GioBatDau: '2024-03-19T01:00:00', GioKetThuc: '2024-03-19T02:00:00', NgayThem: '2024-03-19' },
    { IdDichVu: '2', TenDichVu: 'Dịch vụ 2', DonViTinh: 'Đơn vị 2', GiaTien: 2000, TinhTrang: 'Hoạt động', GioBatDau: '2024-03-19T02:00:00', GioKetThuc: '2024-03-19T03:00:00', NgayThem: '2024-03-19' },
    { IdDichVu: '3', TenDichVu: 'Dịch vụ 3', DonViTinh: 'Đơn vị 3', GiaTien: 3000, TinhTrang: 'Hoạt động', GioBatDau: '2024-03-19T03:00:00', GioKetThuc: '2024-03-19T04:00:00', NgayThem: '2024-03-19' },
    { IdDichVu: '4', TenDichVu: 'Dịch vụ 4', DonViTinh: 'Đơn vị 4', GiaTien: 4000, TinhTrang: 'Hoạt động', GioBatDau: '2024-03-19T04:00:00', GioKetThuc: '2024-03-19T05:00:00', NgayThem: '2024-03-19' },
    { IdDichVu: '5', TenDichVu: 'Dịch vụ 5', DonViTinh: 'Đơn vị 5', GiaTien: 5000, TinhTrang: 'Hoạt động', GioBatDau: '2024-03-19T05:00:00', GioKetThuc: '2024-03-19T06:00:00', NgayThem: '2024-03-19' },
    { IdDichVu: '6', TenDichVu: 'Dịch vụ 6', DonViTinh: 'Đơn vị 6', GiaTien: 6000, TinhTrang: 'Hoạt động', GioBatDau: '2024-03-19T06:00:00', GioKetThuc: '2024-03-19T07:00:00', NgayThem: '2024-03-19' },
    { IdDichVu: '7', TenDichVu: 'Dịch vụ 7', DonViTinh: 'Đơn vị 7', GiaTien: 7000, TinhTrang: 'Hoạt động', GioBatDau: '2024-03-19T07:00:00', GioKetThuc: '2024-03-19T08:00:00', NgayThem: '2024-03-19' },
    { IdDichVu: '8', TenDichVu: 'Dịch vụ 8', DonViTinh: 'Đơn vị 8', GiaTien: 8000, TinhTrang: 'Hoạt động', GioBatDau: '2024-03-19T08:00:00', GioKetThuc: '2024-03-19T09:00:00', NgayThem: '2024-03-19' },
    { IdDichVu: '9', TenDichVu: 'Dịch vụ 9', DonViTinh: 'Đơn vị 9', GiaTien: 9000, TinhTrang: 'Hoạt động', GioBatDau: '2024-03-19T09:00:00', GioKetThuc: '2024-03-19T10:00:00', NgayThem: '2024-03-19' },
    { IdDichVu: '10', TenDichVu: 'Dịch vụ 10', DonViTinh: 'Đơn vị 10', GiaTien: 10000, TinhTrang: 'Hoạt động', GioBatDau: '2024-03-19T10:00:00', GioKetThuc: '2024-03-19T11:00:00', NgayThem: '2024-03-19' }
  ];
  LayDichVuMau(): DichVu[] {
    return this.data;
  }
}
