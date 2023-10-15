import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import * as L from "leaflet";
import 'leaflet.markercluster';
import 'leaflet-control-geocoder';
import {ParkingService} from "./parking.service";

@Component({
  selector: 'app-search-parking',
  templateUrl: './search-parking.component.html',
  styleUrls: ['./search-parking.component.scss']
})
export class SearchParkingComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator,{ static: true }) paginator!: MatPaginator;
  dataSource: any;
  searchValue: string = '';
  private map: any;
  parkingData : any[] = []
  parking = [
    {
      name: 'Bãi đỗ xe 1',
      location: '235 Đ. Nguyễn Văn Cừ, Phường Nguyễn Cư Trinh, Quận 1, Thành phố Hồ Chí Minh, Việt Nam',
      status: '0',
      prices: '50000',
      lat:10.76,
      lng:106.68,
    },
    {
      name: 'Bãi đỗ xe 1',
      location: '833 Hưng Phú, Phường 9, 8, Thành phố Hồ Chí Minh, Việt Nam\n',
      status: '0',
      prices: '50000',
      lat:10.74,
      lng:106.66,
    },
    {
      name: 'Bãi đỗ xe 2',
      location: '179 Bình Thới, Phường 9, Quận 11, Thành phố Hồ Chí Minh, Việt Nam\n',
      status: '0',
      prices: '60000',
      lat:10.76,
      lng:106.64,
    },
    {
      name: 'Bãi đỗ xe 3',
      location: '2 Tống Văn Trân, Phường 5, Quận 11, Thành phố Hồ Chí Minh, Việt Nam\n',
      status: '0',
      prices: '50000',
      lat:10.77,
      lng:106.64,
    },

    {
      name: 'Bãi đỗ xe 4',
      location: '184 Đ.Lê Đại Hành, Phường 15, Quận 11, Thành phố Hồ Chí Minh',
      status: '0',
      prices: '50000',
      lat:10.75,
      lng:106.66,
    },



  ];
  displayedColumns: string[] = ['stt', 'name', 'location', 'status', 'prices','actions'];
  display: boolean = true;
  private geocoderControl: any

  constructor(
    private elementRef: ElementRef,
    private parkingService$: ParkingService
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.loadData();

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    setTimeout(() => {
      this.initMap();
      window.dispatchEvent(new Event('resize'));
    }, 1000)
    setTimeout(function () {

    }, 1000);

  }

  loadData(): void {

    this.parkingService$.get().subscribe((data:any)=> {
      this.dataSource.data = data.body
      console.log(data)
    })
  }

  onSearch(filterValue: any) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data:any, filter:any) => {
      return data.location.toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue;
    this.geocoderControl.markGeocode(filterValue);
  }

  initMap(): void {
    let htmlRefMap = this.elementRef.nativeElement.querySelector(`#map`);
    this.map = L.map( htmlRefMap).setView([10.769444, 106.681944], 10)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        L.marker([latitude, longitude]).addTo(this.map)
          .bindPopup("Vị trí hiện tại của bạn").openPopup();

        this.map.setView([latitude, longitude], 13);
      });
    } else {
      alert("Trình duyệt của bạn không hỗ trợ dịch vụ vị trí.");
    }

    var greenIcon = L.icon({
      iconUrl: '../../../../assets/images/sources/car.png',
      iconSize:     [95, 95],
      shadowSize:   [50, 64],
      iconAnchor:   [22, 94],
      shadowAnchor: [4, 62],
    });
    this.parking.forEach((item:any) => {
      L.marker([item.lat, item.lng], {icon: greenIcon}).addTo(this.map);
    })
  }


}
