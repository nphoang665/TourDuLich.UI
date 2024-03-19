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
import { SidebarNavComponent } from './Pages/GiaoDienAdmin/LayoutChung/sidebar-nav/sidebar-nav.component';
import { HeaderAdminComponent } from './Pages/GiaoDienAdmin/header-admin/header-admin.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { FormGroupName, FormsModule } from '@angular/forms';

import { FormGroup, ReactiveFormsModule, FormControl, Validator, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuanlydattourComponent } from './Pages/GiaoDienAdmin/quanlydattour/quanlydattour.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DragScrollDirective } from './Pages/GiaoDienKhachHang/ChiTietTour/chi-tiet-tour/drag-scroll.directive';
import { DragScrollMobileDirective } from './Pages/GiaoDienKhachHang/ChiTietTour/chi-tiet-tour/drag-scroll-mobile.directive';
import { MaterialModule } from './material.module';
import { DemoQlTourComponent } from './Pages/GiaoDienAdmin/demo-ql-tour/demo-ql-tour.component';
import { TrangChuAdminComponent } from './Pages/Admin/trang-chu-admin/trang-chu-admin.component';
import { QuanLyTourComponent } from './Pages/Admin/quan-ly-tour/quan-ly-tour.component';
import { MainSidebarComponent } from './Pages/Admin/Main/main-sidebar/main-sidebar.component';
import { MainNavbarComponent } from './Pages/Admin/Main/main-navbar/main-navbar.component';
import { FooterMainAdminComponent } from './Pages/Admin/Main/footer-main-admin/footer-main-admin.component';
import { ThemTourComponent } from './Pages/Admin/quan-ly-tour/them-tour/them-tour.component';
import { SuaTourComponent } from './Pages/Admin/quan-ly-tour/sua-tour/sua-tour.component';
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
    SidebarNavComponent,
    HeaderAdminComponent,
    ThemTourComponent,
    SuaTourComponent,
    QuanlydattourComponent,
    DragScrollDirective,
    DragScrollMobileDirective,
    DemoQlTourComponent,
    TrangChuAdminComponent,
    QuanLyTourComponent,
    MainSidebarComponent,
    MainNavbarComponent,
    FooterMainAdminComponent,
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
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
