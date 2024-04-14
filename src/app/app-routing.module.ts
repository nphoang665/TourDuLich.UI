import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrangChuComponent } from './Pages/GiaoDienKhachHang/TrangChu/trang-chu/trang-chu.component';
import { LienHeComponent } from './Pages/GiaoDienKhachHang/LienHe/lien-he/lien-he.component';
import { DatTourComponent } from './Pages/GiaoDienKhachHang/DatTour/dat-tour/dat-tour.component';
import { DiemDenComponent } from './Pages/GiaoDienKhachHang/DiemDen/diem-den/diem-den.component';
import { ChiTietTourComponent } from './Pages/GiaoDienKhachHang/ChiTietTour/chi-tiet-tour/chi-tiet-tour.component';
import { TrangChuAdminComponent } from './Pages/Admin/trang-chu-admin/trang-chu-admin.component';
import { QuanLyTourComponent } from './Pages/Admin/quan-ly-tour/quan-ly-tour.component';
import { ThemTourComponent } from './Pages/Admin/quan-ly-tour/them-tour/them-tour.component';
import { SuaTourComponent } from './Pages/Admin/quan-ly-tour/sua-tour/sua-tour.component';
import { QuanlydattourComponent } from './Pages/Admin/quan-ly-dat-tour/quanlydattour/quanlydattour.component';
import { QuanLyKhachHangComponent } from './Pages/Admin/quan-ly-khach-hang/quan-ly-khach-hang.component';
import { QuanLyNhanVienComponent } from './Pages/Admin/quan-ly-nhan-vien/quan-ly-nhan-vien.component';
import { QuanLyDichVuComponent } from './Pages/Admin/quan-ly-dich-vu/quan-ly-dich-vu.component';
import { ThemNhanVienComponent } from './Pages/Admin/quan-ly-nhan-vien/them-nhan-vien/them-nhan-vien.component';
import { SuaNhanVienComponent } from './Pages/Admin/quan-ly-nhan-vien/sua-nhan-vien/sua-nhan-vien.component';
import { SuaKhachHangComponent } from './Pages/Admin/quan-ly-khach-hang/sua-khach-hang/sua-khach-hang.component';
import { ThemKhachHangComponent } from './Pages/Admin/quan-ly-khach-hang/them-khach-hang/them-khach-hang.component';
import { ThanhtoankhachhangComponent } from './Pages/GiaoDienKhachHang/ThanhToan/thanhtoankhachhang/thanhtoankhachhang.component';
import { TiepNhanDatTourComponent } from './Pages/Admin/tiep-nhan-dat-tour/tiep-nhan-dat-tour/tiep-nhan-dat-tour.component';
import { SuaTiepNhanDatTourComponent } from './Pages/Admin/tiep-nhan-dat-tour/suaTiepNhanDatTour/sua-tiep-nhan-dat-tour/sua-tiep-nhan-dat-tour.component';

import { LoginComponent } from './Pages/Auth/login/login.component';
import { GuestGuard, adminGuard, adminOrEmployeeGuard, customerGuard, employeeGuard, guestOrCustomerGuard } from './Pages/Auth/guards/auth.guard';
import { RegisterComponent } from './Pages/Auth/register/register.component';
import { ThanhToanComponent } from './Pages/Admin/thanh-toan/thanh-toan.component';
import { LichsudattourkhachhangComponent } from './Pages/Axiliary/History/lichsudattourkhachhang/lichsudattourkhachhang.component';
import { QuenMatKhauComponent } from './Pages/Auth/forgotPassword/quen-mat-khau/quen-mat-khau.component';

const routes: Routes = [
  { path: 'trangchu', component: TrangChuComponent, title: 'Trang chủ' },
  { path: 'lienhe', component: LienHeComponent, title: 'Liên hệ' },
  { path: 'lichsudattour', component: LichsudattourkhachhangComponent, canActivate: [customerGuard], title: 'Lịch sử đặt tour' },
  { path: 'dattour/:tentour', component: DatTourComponent, title: 'Xem đặt tour' },
  { path: 'dattour/:tentour/:ngaydi/:songuoilon/:sotreem', component: DatTourComponent, title: 'Xem đặt tour' },
  { path: 'diemden', component: DiemDenComponent, title: 'Điểm đến' },
  { path: 'chitiettour/:id', component: ChiTietTourComponent, title: 'Chi tiết tour' },
  { path: 'thanhtoankhachhang', component: ThanhtoankhachhangComponent, canActivate: [guestOrCustomerGuard], title: 'Đặt tour cho khách hàng' },
  { path: 'tiepNhanDatTour', component: TiepNhanDatTourComponent, canActivate: [adminOrEmployeeGuard], title: 'Tiếp nhận đặt tour' },
  { path: 'suaTiepNhanDatTour/:id', component: SuaTiepNhanDatTourComponent, canActivate: [adminOrEmployeeGuard], title: 'Sửa tiếp nhận đặt tour' },
  { path: 'quanlytour', component: QuanLyTourComponent, canActivate: [adminOrEmployeeGuard], title: 'Quản lý tour' },
  { path: 'trangChuAdmin', component: TrangChuAdminComponent, canActivate: [adminGuard], title: 'Trang chủ admin' },
  //
  { path: 'quanLyDatTour', component: QuanlydattourComponent, canActivate: [adminOrEmployeeGuard], title: 'Quản lý đặt tour' },
  { path: 'quanLyKhachHang', component: QuanLyKhachHangComponent, canActivate: [adminOrEmployeeGuard], title: 'Quản lý khách hàng' },
  { path: 'quanLyNhanVien', component: QuanLyNhanVienComponent, canActivate: [adminGuard], title: 'Quản lý nhân viên' },
  { path: 'quanLyDichVu', component: QuanLyDichVuComponent, canActivate: [adminGuard], title: 'Quản lý dịch vụ' },
  { path: 'themNhanVien', component: ThemNhanVienComponent, canActivate: [adminGuard], title: 'Thêm nhân viên' },
  { path: 'suaNhanVien/:id', component: SuaNhanVienComponent, canActivate: [adminGuard], title: 'Sửa nhân viên' },
  { path: 'suaKhachHang/:id', component: SuaKhachHangComponent, canActivate: [adminOrEmployeeGuard], title: 'Sửa khách hàng' },
  { path: 'themKhachHang', component: ThemKhachHangComponent, canActivate: [adminOrEmployeeGuard], title: 'Thêm khách hàng' },
  { path: 'login', component: LoginComponent, title: 'Đăng nhập' },
  { path: 'forgotpassword', component: QuenMatKhauComponent, title: 'Quên mật khẩu' },

  { path: 'register', component: RegisterComponent, title: 'Đăng ký' },
  { path: 'themTour', component: ThemTourComponent, canActivate: [adminGuard], title: 'Thêm tour' },
  { path: 'suaTour/:id', component: SuaTourComponent, canActivate: [adminGuard], title: 'Sửa tour' },
  { path: 'thanhToan', component: ThanhToanComponent, canActivate: [adminOrEmployeeGuard], title: 'Hóa đơn' },


  { path: '**', redirectTo: '/trangchu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
