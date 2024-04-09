import { Component, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { TrangChuService } from '../services/TrangChu/trang-chu.service';
@Component({
  selector: 'app-trang-chu-admin',
  templateUrl: './trang-chu-admin.component.html',
  styleUrl: './trang-chu-admin.component.css'
})
export class TrangChuAdminComponent implements OnInit {
constructor(private trangChuService:TrangChuService){}
  ngOnInit(): void {
    this.getDatTourData();
    this.getDichVuDaDat();
    this.getTourDaDat();
    this.getTiLeDatTour();
    document.addEventListener("DOMContentLoaded", () => {
      const elements = document.querySelectorAll('.highcharts-credits');
      elements.forEach((element) => {
          (element as HTMLElement).style.display = 'none';
      });
  });
  
  
  }
   transformedData:any;
   //Chart Doanh thu
   getDatTourData() {
    this.trangChuService.getDoanhThu().subscribe(
      (data: any) => {
        // Tạo một mảng với độ dài 12, tất cả các phần tử đều là 0
        let transformedData = Array(12).fill(0);

        // Cập nhật doanh thu cho từng tháng
        data.forEach((item: { thang: string, doanhThuThang: number }) => {
          let monthIndex = parseInt(item.thang.split('/')[0]) - 1; // Chuyển đổi từ tháng 1-12 thành chỉ số 0-11
          transformedData[monthIndex] = item.doanhThuThang;
        });

        // Cập nhật dữ liệu cho biểu đồ
        this.DoanhThuchartsOptions = {
          title: {
            text: 'Doanh thu năm 2024'
          },
          xAxis: {
            categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
          },
          yAxis: {
            title: {
                text: 'Tổng tiền'
            }
        },
          series: [{
            data: transformedData,  
            type: 'line'
          }]
        };
      },
      (error) => {
        console.error(error);
      }
    )
}

  DoanhThucharts: typeof Highcharts = Highcharts;
  DoanhThuchartsOptions: Highcharts.Options = {
    title: {
      text: 'Doanh thu năm 2024'
    },
    xAxis: {
      categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
    },
    series: [{
      data: [100,200,4000,4040,40140,40140,410410,410041,401401,41041,414,1414],  
      type: 'line'
    }]
  };
  //chart tỉ lệ
  
  getTiLeDatTour() {
    this.trangChuService.getTiLe().subscribe(
      (data: any) => {
        // Biến đổi dữ liệu thành dạng phù hợp với biểu đồ
        let daThanhToan = data.daThanhToan;
        let daDuyet = data.daDuyet;
        let daTuChoi = data.daTuChoi;
        let dangDoiDuyet = data.dangDoiDuyet;

        // Cập nhật dữ liệu cho biểu đồ
        this.tiLeDatHuyCharttOptions = {
      // giữ nguyên các cài đặt biểu đồ hiện tại
          series: [{
            name: 'Tỉ lệ',
            data: [{
              name: 'Đã thanh toán',
              y: daThanhToan
            }, {
              name: 'Đã duyệt',
              y: daDuyet
            }, {
              name: 'Đã từ chối',
              y: daTuChoi
            }, {
              name: 'Đang đợi duyệt',
              y: dangDoiDuyet
            }],
            type: 'pie'
          }]
        };
      },
      (error) => {
        console.error(error);
      }
    )
}

  tiLeDatHuyChart: typeof Highcharts = Highcharts;
  tiLeDatHuyCharttOptions: Highcharts.Options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Tỉ lệ đặt và hủy'
    },
    series: [{
      name: 'Tỉ lệ',
      data: [{
        name: 'Đặt',
        y: 100
      }, {
        name: 'Hủy',
        y: 2
      }],
      type: 'pie'
    }]
  };
  //chart dịch vụ đã đặt
  getDichVuDaDat() {
    this.trangChuService.getDichVuDaDat().subscribe(
      (data: any) => {
        // Biến đổi dữ liệu thành dạng phù hợp với biểu đồ
        let tenDichVu = data.map((item: { tenDichVu: any }) => item.tenDichVu);
        let soLuong = data.map((item: { soLuong: number }) => item.soLuong);
        let tongTien = data.map((item: { tongTien: number }) => item.tongTien);
        console.log(tenDichVu);
        // Cập nhật dữ liệu cho biểu đồ
        this.dichVuDaDatOptions = {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Dịch vụ'
          },
          xAxis: {
            categories: tenDichVu
          },
          yAxis: {
            title: {
                text: 'Tổng tiền'
            }
        },
          
          series: [
            {
              name: 'Số lượng',
              data: soLuong,
              type: 'column'
            },
            {
              name: 'Doanh thu',
              data: tongTien,
              type: 'line'
            }
          ]
        };
      },
      (error) => {
        console.error(error);
      }
    )
}

  dichVuDaDat: typeof Highcharts = Highcharts;
  dichVuDaDatOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Dịch vụ'
    },
    xAxis: {
      categories: ['Dịch vụ 1', 'Dịch vụ 2', 'Dịch vụ 3', 'Dịch vụ 4', 'Dịch vụ 5']
    },
    series: [
      {
        name: 'Số lượng',
        data: [1,2,3,4,5],
        type: 'column'
      },
      {
        name: 'Doanh thu',
        data: [100,32,3123,313,122],
        type: 'line'
      }
    ]
  };
  //chart Tour đã đặt
  getTourDaDat() {
    this.trangChuService.getTourDaDat().subscribe(
      (data: any) => {
        // Biến đổi dữ liệu thành dạng phù hợp với biểu đồ
        let tenTour = data.map((item: { tenTour: any }) => item.tenTour);
        let tongTien = data.map((item: { tongTien: number }) => item.tongTien);
        let soLuong = data.map((item: { soLuong: number }) => item.soLuong);
        console.log(tenTour);
        // Cập nhật dữ liệu cho biểu đồ
        this.TourDaDatOptions = {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Tour'
          },
          xAxis: {
            categories: tenTour
          },
          yAxis: {
            title: {
                text: 'Tổng tiền'
            }
        },
          series: [
            {
              name: 'Số lượng',
              data: soLuong,
              type: 'column'
            },
            {
              name: 'Doanh thu',
              data: tongTien,
              type: 'line'
            }
          ]
        };
      },
      (error) => {
        console.error(error);
      }
    )
}

  TourDaDat:typeof Highcharts=Highcharts;
  TourDaDatOptions:Highcharts.Options={
    chart: {
      type: 'column'
    },
    title: {
      text: 'Tour du lịch'
    },
    xAxis: {
      categories: ['Tour du lịch 1', 'Tour du lịch 2', 'Tour du lịch 3', 'Tour du lịch 4', 'Tour du lịch 5']
    },
    series: [
      {
        name: 'Số lượng',
        data: [1,2,3,4,5],
        type: 'column'
      },
      {
        name: 'Doanh thu',
        data: [100,32,3123,313,122],
        type: 'line'
      }
    ]
  };
}
