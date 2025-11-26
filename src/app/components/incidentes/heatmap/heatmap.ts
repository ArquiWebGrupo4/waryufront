import { Component, AfterViewInit, Inject } from '@angular/core';
import { IncidentesService } from '../../../services/incidentes-service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
declare const L: any;

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.html',
  styleUrls: ['./heatmap.css']
})
export class HeatmapComponent implements AfterViewInit {
  private map!: any;

  constructor(
    private iS: IncidentesService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {

      this.map = L.map('map').setView([-12.0464, -77.0428], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.iS.getlatlon().subscribe((coords: [number, number][]) => {
        const parsedCoords = coords.map(
          c => [Number(c[0]), Number(c[1]), 1] as [number, number, number]
        );
        console.log(L.heatLayer)
        L.heatLayer(parsedCoords, {
          radius: 25,
          blur: 15,
          maxZoom: 17,
          minOpacity: 0.5
        }).addTo(this.map);

        const bounds = L.latLngBounds(parsedCoords.map(c => L.latLng(c[0], c[1])));
        this.map.fitBounds(bounds);
      });
    }
  }
}