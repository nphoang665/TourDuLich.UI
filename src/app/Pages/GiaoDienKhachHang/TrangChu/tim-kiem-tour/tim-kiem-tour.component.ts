import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TourDuLich } from '../../../Admin/models/tour-du-lich.model';
import { Observable, map, startWith } from 'rxjs';
import { QuanLyTourService } from '../../../Admin/services/quan-ly-tour.service';

@Component({
  selector: 'app-tim-kiem-tour',
  templateUrl: './tim-kiem-tour.component.html',
  styleUrl: './tim-kiem-tour.component.css'
})
export class TimKiemTourComponent implements OnInit {
  NoiDen = new FormControl();
  options: TourDuLich[] = []; // Danh sách các tùy chọn cho autocomplete
  filteredOptions!: Observable<TourDuLich[]>;

  constructor(private quanLyTourService: QuanLyTourService, private router: Router) { }

  ngOnInit() {
    this.quanLyTourService.getAllTourDuLich().subscribe(tours => {
      this.options = tours;
      this.filteredOptions = this.NoiDen.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.tenTour),
        map(name => name ? this._filter(name) : this.options.slice())
      );
    });
  }

  displayFn(tour: TourDuLich): string {
    return tour && tour.tenTour && tour.loaiTour ? `${tour.tenTour}` : '';
  }

  private _filter(value: string): TourDuLich[] {
    const filterValue = value.toLowerCase();

    // Lọc các tùy chọn dựa trên đoạn văn bản tìm kiếm
    let filteredOptions = this.options.filter(option => {
      // Kiểm tra xem người dùng đã nhập tên tour hay loại tour
      const isTenTour = option.tenTour.toLowerCase().includes(filterValue);
      const isLoaiTour = option.loaiTour.toLowerCase().includes(filterValue);

      // Nếu người dùng đã nhập tên tour, chỉ lọc dựa trên tên tour
      if (isTenTour && !isLoaiTour) {
        return option.tenTour.toLowerCase().includes(filterValue);
      }
      // Nếu người dùng đã nhập loại tour, chỉ lọc dựa trên loại tour
      else if (!isTenTour && isLoaiTour) {
        return option.loaiTour.toLowerCase().includes(filterValue);
      }
      // Nếu người dùng đã nhập cả tên tour và loại tour, lọc dựa trên cả hai
      else {
        return (option.tenTour.toLowerCase() + ' ' + option.loaiTour.toLowerCase()).includes(filterValue);
      }
    });

    // Sắp xếp các tùy chọn dựa trên mức độ phù hợp với đoạn văn bản tìm kiếm
    filteredOptions.sort((a, b) =>
      (b.tenTour.toLowerCase() + ' ' + b.loaiTour.toLowerCase()).indexOf(filterValue) -
      (a.tenTour.toLowerCase() + ' ' + a.loaiTour.toLowerCase()).indexOf(filterValue)
    );

    return filteredOptions;
  }



  TimKiemTour() {
    console.log(this.NoiDen.value);
    if (this.NoiDen.value.tenTour) {
      this.router.navigate(['/dattour/' + this.NoiDen.value.tenTour]);
    }
    else {
      this.router.navigate(['/dattour/' + this.NoiDen.value]);

    }

  }
}

