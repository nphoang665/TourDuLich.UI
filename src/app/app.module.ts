import { NgModule } from '@angular/core';
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
    TimKiemTourComponent
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

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
