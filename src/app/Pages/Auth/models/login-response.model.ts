export interface LoginResponse {
    token: string;
    email: string;
    roles: string[];
    nhanVien: any;
    khachHang: any;
}