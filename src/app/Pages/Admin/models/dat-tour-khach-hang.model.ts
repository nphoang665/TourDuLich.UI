export interface DatTourChoKhachHang {
    // phần dành cho đặt tour
    IdDatTour: string;
    IdTour: string;
    SoLuongNguoiLon: number;
    SoLuongTreEm: number;
    ThoiGianDatTour: string;
    TinhTrangDatTour: string;
    // phần dành cho khách hàng
    IdKhachHang: string;
    TenKhachHang: string;
    SoDienThoai: string;
    DiaChi: string;
    CCCD: string;
    NgaySinh: string;
    GioiTinh: string;
    Email: string;
    TinhTrangKhachHang: string;
    NgayDangKy: string;
    // phần dành cho dịch vụ chi tiết
    DichVuChiTiet: DichVuChiTiet[];

}
export interface DichVuChiTiet {
    IdDichVuChiTiet: string;
    IdDichVu: string;
    ThoiGianDichVu: string;
    SoLuong: number;
}
