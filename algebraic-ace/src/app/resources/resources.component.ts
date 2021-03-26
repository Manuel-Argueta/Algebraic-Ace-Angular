import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../../Shared/Services/api-data.service'
import { FormControl } from "@angular/forms";


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  filterChoice: FormControl = new FormControl()
  videos: any = [];
  webpages: any = [];

  constructor(public _apiDataService: ApiDataService,
    ) {}

  ngOnInit(): void {
  }

  getAllFilteredResources(){
    let postData = {
      keyword: this.filterChoice.value
    }
    this._apiDataService.getAllVideos(postData);
    this._apiDataService.videoSourcesObs
    .subscribe(data => {
      this.videos = data;
    });
    this._apiDataService.getAllPages(postData);
    this._apiDataService.webSourcesObs
    .subscribe(data => {
      this.webpages = data;
    });
  }
  
}
