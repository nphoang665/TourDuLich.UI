export interface ThanhToan{
    idThanhToan:string,
    idDatTour:string,
    idKhachHang:string,
    idNhanVien:string,
    tongTienTour:string,
    tongTienDichVu:string,
    tongTien:string,
    tinhTrang:string,
    ngayThanhToan:string,
    phuongThucThanhToan:string,
}

export interface ThanhToanDto{
    idThanhToan:string,
    idDatTour:string,
    idKhachHang:string,
    idNhanVien:string,
    tongTienTour:string,
    tongTienDichVu:string,
    tongTien:string,
    tinhTrang:string,
    ngayThanhToan:string,
    phuongThucThanhToan:string,
    khachHang:any,
    nhanVien:any
}
