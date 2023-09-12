import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-pricing-grid',
  templateUrl: './pricing-grid.component.html',
  styleUrls: ['./pricing-grid.component.scss']
})
export class PricingGridComponent implements OnInit{
  constructor(private service: CommonServiceService) {}
  tableData : any;
  showTable : boolean = false;
  ngOnInit(){
    this.service.getJSON().subscribe(data => {
        this.tableData = data;
        this.showTable = true;
    });
    this.callToggle();
  }

  callToggle() {
    fetch("https://api.track.toggl.com/api/v9/workspaces/538676/projects", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
"Authorization": "Basic Z2F5YXRocmlAd2VhcmV0ZWxlc2NvcGljLmNvLnVrOlZpdmVrMTIz"
  },
})
.then((resp) => resp.json())
.then((json) => {
  console.log(json);
})
.catch(err => console.error(err));
  }
}
