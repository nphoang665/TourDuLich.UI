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

const routes: Routes = [
  { path: 'trangchu', component: TrangChuComponent },
  { path: 'lienhe', component: LienHeComponent },
  { path: 'dattour', component: DatTourComponent },
  { path: 'diemden', component: DiemDenComponent },
  { path: 'chitiettour/:id', component: ChiTietTourComponent },
  { path: 'quanlytour', component: QuanLyTourComponent },
  { path: 'themtour', component: ThemTourComponent },
  { path: 'suatour/:id', component: SuaTourComponent },
  {path:'trangChuAdmin',component:TrangChuAdminComponent},
  {path:'quanLyDatTour',component:QuanlydattourComponent},



  { path: '**', redirectTo: '/trangchu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
