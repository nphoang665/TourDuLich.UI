export interface DichVuChiTietDto {
    idDichVuChiTiet: string;
    idDichVu: string;
    idKhachHang: string;
    idDatTour: string;
    idNhanVien: string;
    thoiGianDichVu: Date;
    soLuong: number;
    khachHang: any; // You'll need to define the type for KhachHang
    nhanVien: any; // You'll need to define the type for NhanVien
    dichVu: any; // You'll need to define the type for DichVu
    datTour: any; // You'll need to define the type for DatTour
}

export interface ThemDichVuChiTietRequestDto {
    idDichVuChiTiet: string;
    idDichVu: string;
    idKhachHang: string;
    idDatTour: string;
    idNhanVien: string;
    thoiGianDichVu: string;
    soLuong: number;

}

