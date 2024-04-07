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
const routes: Routes = [
  { path: 'trangchu', component: TrangChuComponent },
  { path: 'lienhe', component: LienHeComponent },
  { path: 'lichsudattour', component: LichsudattourkhachhangComponent, canActivate: [customerGuard] },
  { path: 'dattour/:tentour', component: DatTourComponent },
  { path: 'dattour/:tentour/:ngaydi/:songuoilon/:sotreem', component: DatTourComponent },
  { path: 'diemden', component: DiemDenComponent },
  { path: 'chitiettour/:id', component: ChiTietTourComponent },
  { path: 'thanhtoankhachhang', component: ThanhtoankhachhangComponent, canActivate: [guestOrCustomerGuard] },
  { path: 'tiepNhanDatTour', component: TiepNhanDatTourComponent, canActivate: [adminOrEmployeeGuard] },
  { path: 'suaTiepNhanDatTour/:id', component: SuaTiepNhanDatTourComponent, canActivate: [adminOrEmployeeGuard] },
  { path: 'quanlytour', component: QuanLyTourComponent, canActivate: [adminOrEmployeeGuard] },
  { path: 'trangChuAdmin', component: TrangChuAdminComponent, canActivate: [adminGuard] },
  //
  { path: 'quanLyDatTour', component: QuanlydattourComponent, canActivate: [adminOrEmployeeGuard] },
  { path: 'quanLyKhachHang', component: QuanLyKhachHangComponent, canActivate: [adminOrEmployeeGuard] },
  { path: 'quanLyNhanVien', component: QuanLyNhanVienComponent, canActivate: [adminGuard] },
  { path: 'quanLyDichVu', component: QuanLyDichVuComponent, canActivate: [adminGuard] },
  { path: 'themNhanVien', component: ThemNhanVienComponent, canActivate: [adminGuard] },
  { path: 'suaNhanVien/:id', component: SuaNhanVienComponent, canActivate: [adminGuard] },
  { path: 'suaKhachHang/:id', component: SuaKhachHangComponent, canActivate: [adminOrEmployeeGuard] },
  { path: 'themKhachHang', component: ThemKhachHangComponent, canActivate: [adminOrEmployeeGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'themTour', component: ThemTourComponent, canActivate: [adminGuard] },
  { path: 'suaTour/:id', component: SuaTourComponent, canActivate: [adminGuard] },
  { path: 'thanhToan', component: ThanhToanComponent, canActivate: [adminOrEmployeeGuard] },


  { path: '**', redirectTo: '/trangchu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
