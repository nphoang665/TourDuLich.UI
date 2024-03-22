import { Directive, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Pages/GiaoDienKhachHang/Header/header/header.component';
import { FooterComponent } from './Pages/GiaoDienKhachHang/Header/footer/footer.component';
import { ThumbnailHomeComponent } from './Pages/GiaoDienKhachHang/ThumbnailHome/thumbnail-home/thumbnail-home.component';
import { TrangChuComponent } from './Pages/GiaoDienKhachHang/TrangChu/trang-chu/trang-chu.component';
import { LienHeComponent } from './Pages/GiaoDienKhachHang/LienHe/lien-he/lien-he.component';
import { DatTourComponent } from './Pages/GiaoDienKhachHang/DatTour/dat-tour/dat-tour.component';
import { DiemDenComponent } from './Pages/GiaoDienKhachHang/DiemDen/diem-den/diem-den.component';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SecondHeaderComponent } from './Pages/GiaoDienKhachHang/Header/second-header/second-header.component';
import { TimKiemTourComponent } from './Pages/GiaoDienKhachHang/TrangChu/tim-kiem-tour/tim-kiem-tour.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SanPhamGiaoDienComponent } from './Pages/GiaoDienKhachHang/SanPhamGiaoDien/san-pham-giao-dien/san-pham-giao-dien.component';
import { ChiTietTourComponent } from './Pages/GiaoDienKhachHang/ChiTietTour/chi-tiet-tour/chi-tiet-tour.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { FormGroupName, FormsModule } from '@angular/forms';

import { FormGroup, ReactiveFormsModule, FormControl, Validator, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DragScrollDirective } from './Pages/GiaoDienKhachHang/ChiTietTour/chi-tiet-tour/drag-scroll.directive';
import { DragScrollMobileDirective } from './Pages/GiaoDienKhachHang/ChiTietTour/chi-tiet-tour/drag-scroll-mobile.directive';
import { MaterialModule } from './material.module';
import { TrangChuAdminComponent } from './Pages/Admin/trang-chu-admin/trang-chu-admin.component';
import { QuanLyTourComponent } from './Pages/Admin/quan-ly-tour/quan-ly-tour.component';
import { MainSidebarComponent } from './Pages/Admin/Main/main-sidebar/main-sidebar.component';
import { MainNavbarComponent } from './Pages/Admin/Main/main-navbar/main-navbar.component';
import { FooterMainAdminComponent } from './Pages/Admin/Main/footer-main-admin/footer-main-admin.component';
import { ThemTourComponent } from './Pages/Admin/quan-ly-tour/them-tour/them-tour.component';
import { SuaTourComponent } from './Pages/Admin/quan-ly-tour/sua-tour/sua-tour.component';
import { QuanlydattourComponent } from './Pages/Admin/quan-ly-dat-tour/quanlydattour/quanlydattour.component';
import { QuanLyKhachHangComponent } from './Pages/Admin/quan-ly-khach-hang/quan-ly-khach-hang.component';
import { QuanLyNhanVienComponent } from './Pages/Admin/quan-ly-nhan-vien/quan-ly-nhan-vien.component';
import { QuanLyDichVuComponent } from './Pages/Admin/quan-ly-dich-vu/quan-ly-dich-vu.component';
import { ThanhtoankhachhangComponent } from './Pages/GiaoDienKhachHang/ThanhToan/thanhtoankhachhang/thanhtoankhachhang.component';
import { LoadingGiaodienComponent } from './Pages/GiaoDienKhachHang/Header/Loading/loading-giaodien/loading-giaodien.component';
import { InterceptorService } from './Pages/Admin/services/Loading/interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ThumbnailHomeComponent,
    TrangChuComponent,
    LienHeComponent,
    DatTourComponent,
    DiemDenComponent,
    SecondHeaderComponent,
    TimKiemTourComponent,
    SanPhamGiaoDienComponent,
    ChiTietTourComponent,
    ThemTourComponent,
    SuaTourComponent,
    DragScrollDirective,
    DragScrollMobileDirective,
    TrangChuAdminComponent,
    QuanLyTourComponent,
    MainSidebarComponent,
    MainNavbarComponent,
    FooterMainAdminComponent,
    QuanlydattourComponent,
    QuanLyKhachHangComponent,
    QuanLyNhanVienComponent,
    QuanLyDichVuComponent,
    ThanhtoankhachhangComponent,
    LoadingGiaodienComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    MatIcon, MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    EditorModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ToastrModule.forRoot()



  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
