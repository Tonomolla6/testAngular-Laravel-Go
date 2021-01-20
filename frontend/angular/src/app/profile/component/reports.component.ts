import { Component, OnInit } from '@angular/core';
// import { CanvasJS} from 'node_modules/canvasjs/dist/CanvasJS';
import { Profile, ProfileService } from '../../core';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports!: [];
  
  constructor(    private profileService: ProfileService,
    ) { }

  ngOnInit(): void {
    // this.profileService.reports().subscribe(data => { 
    //   this.reports = data;
    //   console.log(data)
    // });
  }
}
