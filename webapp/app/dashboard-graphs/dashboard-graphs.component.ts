  import { Component, OnInit, ViewEncapsulation } from '@angular/core';
  import { FlexLayoutModule } from "@angular/flex-layout";
  import { Params, RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
  import { MdCardModule } from '@angular/material';
  import { MdProgressSpinnerModule } from '@angular/material';
  import { DashboardGraphService } from './dashboard-graphs.service';
  import { SocketService } from '../notifications/socket.service';
  import { MdTableModule } from '@angular/material';

  @Component({
    selector: 'calvin-dashboard-graphs',
    templateUrl: `./dashboard-graphs.component.html`,
    styleUrls: [
      '../../../node_modules/nvd3/build/nv.d3.css', './dashboard-graphs.component.css'
    ],
    providers : [SocketService],
    encapsulation: ViewEncapsulation.None

  })

  export class DashboardGraphsComponent implements OnInit {

    constructor(
      private socketService:SocketService,
      private GraphService: DashboardGraphService,
      private router: Router, 
      private route: ActivatedRoute,
      ){
    }
    clearData;
    options;
    purposes;
    data;
    dataArray:any;
    domains;
    count = [];
    flager;
    private notifications: any[];
    private ioConnection: any;

    ngOnInit() {
      this.flager = 0;
      if(this.initIoConnection() === undefined){
        console.log('initIoConnection is undefined');
        this.getGraphDetails();
      }else{
        console.log('hi initIoConnection is defined')
        this.initIoConnection();
      }
    }
   private initIoConnection() {
        this.ioConnection = this.socketService.get().subscribe((data) => {
           this.notifications;
           //console.log('Notification notify',data);
           if(data['event'] === 'newcommunityadded'){
             this.count =[];
              this.getGraphDetails();
           }
     });
}
      getGraphDetails() {   
        let flag = false;
        let counter = 0;
        this.GraphService.getPurposes()
          .subscribe(p => {
            this.purposes = p;
            this.GraphService.getAllCommunities()
              .subscribe(domains => {
                console.log('get community',domains);
                this.domains = domains;
                console.log('hi got puposes as********** ',this.purposes,'********* hi got communitieds as',this.domains);
                this.purposes.forEach((purpose) => {
                  console.log('*** iterating thriugh puposes.. current is :',purpose);
                  this.domains.forEach((domain) => {
                    if (domain.purpose.toLowerCase() === purpose.toLowerCase()) {
                      //console.log('hi found match... of pupose..',purpose,'...domainpurpose',domain.purpose);
                      //console.log('......*** caaling getGraph method with previous count',this.count);
                      counter++;
                      flag = true;
                    }
                  });
                  let obj= {
                    type:purpose,
                    value:counter
                  };

                  this.count.push(obj);
                  //console.log('hi pushed conetent is *****',obj);
                  counter = 0;
                });
                this.flager = 1; 
                //console.log('......*** caaling getGraph method with count',this.count); 
                // if(this.count['type'] === ){

                 this.getGraph(this.count);            
                //}
                // if (flag) { this.getGraph(this.count); }
                // if (!flag) { this.getGraph([]); }
              })
          })
      }

      getGraph(datatext) {

        this.options = {
          chart: {
            type: 'pieChart',
            height: 500,
            x: function (d) { return d.type; },
            y: function (d) { return d.value; },
            showLabels: true,
            duration: 500,
            labelThreshold: 0.02,
            labelSunbeamLayout: true,
            legend: {
              margin: {
                top: 5,
                right: 35,
                bottom: 5,
                left: 0
              }
            },
            pie: {
              dispatch: {
                elementClick: (e) => {
                  this.router.navigate(['/purpose/communities/' + e.data.type]);
                },
              }
            }
          }
        }
      //    const tempArr=[];
      // console.log('inside get graph method with data',datatext);

      //   datatext.forEach(function (d){
      //     console.log("purpose is : ",d.type," value is  ",d.value);
      //     tempArr.push(d.value);
      //     //console.log("this.dataArr",this.dataArray);
      //   });
           //d3.select('svg').html("");
        this.data=datatext;
        console.log('data is ',this.data);
      
         //this.clearData = function(){this.options = [];};
      //console.log('final value is : ',this.options);
      }
    }
