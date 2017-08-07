  import { Component, OnInit, ViewEncapsulation } from '@angular/core';
  import { FlexLayoutModule } from "@angular/flex-layout";
  import { Params, RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
  import { MdCardModule } from '@angular/material';
  import { MdProgressSpinnerModule } from '@angular/material';
  import { DashboardGraphService } from './dashboard-graphs.service';
  import { SocketService } from '../notifications/socket.service';
  import { MdTableModule } from '@angular/material';
  /*import { GraphSocketService } from './dashboard-graph-socket.service';*/

  @Component({
    selector: 'calvin-dashboard-graphs',
    templateUrl: `./dashboard-graphs.component.html`,
    styleUrls: [
      '../../../node_modules/nvd3/build/nv.d3.css', './dashboard-graphs.component.css'
    ],
    providers : [SocketService],
    /*providers:[GraphSocketService,DashboardGraphService,],*/
    encapsulation: ViewEncapsulation.None

  })

  export class DashboardGraphsComponent implements OnInit {

    constructor(/*private GraphSocketService: GraphSocketService,*/ 
      private socketService:SocketService,
      private GraphService: DashboardGraphService,
      private router: Router, 
      private route: ActivatedRoute,
      ){
    }
    /*private ioConnection:any;
    private graghautoupdate: any;*/
    options;
    purposes;
    data;
    dataArray:any;
    domains;
    count = [];
    flager;
    private notifications: any[];
    private ioConnection: any;
    

    /*private initIoConnection() {
      console.log('hii');
            this.ioConnection = this.GraphSocketService.get().subscribe((value) => {
                this.graghautoupdate.unshift(value);
        });
    console.log(this.graghautoupdate.unshift(value),'hii show me'); 
        // });
    
        }*/

    /*  ngOnInit() {
        console.log('hi socket');
        if(this.initIoConnection() !== undefined){
            this.flag = 0;
        console.log('get data1');
        this.graghautoupdate;
            this.initIoConnection();
        console.log('got data');
        this.getGraphDetails();
      }else{
        this.flag = 0;
        console.log('get data');
        this.graghautoupdate;
            this.initIoConnection();
        console.log('got data');
        this.getGraphDetails();
      }
    }*/
    // updateGraphdetails(){
    //   console.log('welcome to notify update graph');
    //   this.getGraphDetails();
    //    this.getGraph(this.count);
    // }
    ngOnInit() {
      this.flager = 0;
      if(this.initIoConnection() === undefined){
        this.getGraphDetails();
      }else{
        this.initIoConnection();
      }
      //this.initIoConnection();
      // this.updateGraphDetails();
      
      //this.getGraphDetails();
    }
   private initIoConnection() {
        this.ioConnection = this.socketService.get().subscribe((newNotification) => {
           this.notifications;
           this.getGraphDetails();
     });
}
    /*updateGraphDetails(){
if(this.notifications === null){
  console.log('.................!!!!!!!!!!!!!!! HI CHECK FOR SOCKET SERVICE',this.ioConnection);
  this.getGraphDetails();
}else{
  console.log('.................!!!!!!!!!!!!!!! HI CHECK FOR SOCKET SERVICE when notification is not null',this.ioConnection); 
  this.getGraphDetails();

}
    }*/

     


// private initIoConnection() {
//         this.ioConnection = this.socketService.wsObservable.subscribe();
//         console.log('.................!!!!!!!!!!!!!!! HI CHECK FOR SOCKET SERVICE',this.ioConnection);
//         console.log('.................!!!!!!!!!!!!!!! HI CHECK FOR SOCKET SERVICE',this.notifications);
//     /*      (newNotification) => {
//             this.notifications.unshift(newNotification);
//      });*/
//       }
/*private initIoConnection(){
  if(this.socketService.get() === null ){
    console.log('socket service is undefined');
    this.getGraphDetails();
  }
  else{
    console.log('socket service is defined',this.socketService.get());
    this.getGraphDetails();
  }
}
*/
      getGraphDetails() {  
        // this.flag=0; 
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
                      console.log('hi found match... of pupose..',purpose,'...domainpurpose',domain.purpose);
                      ++counter;
                      flag = true;
                    }
                  });
                  let obj= {
                    type:purpose,
                    value:counter
                  };

                  this.count.push(obj);
                  console.log('hi pushed conetent is *****',obj);
                  counter = 0;
                });
                this.flager = 1; 
                console.log('......*** caaling getGraph method with count',this.count); 
                this.getGraph(this.count);            
                // if (flag) { this.getGraph(this.count); }
                // if (!flag) { this.getGraph([]); }
              })
          })
      }

      getGraph(datatext) {
        const tempArr=[];
      console.log('inside get graph method with data',datatext);

        datatext.forEach(function (d){
          console.log("purpose is : ",d.type," value is  ",d.value);
          tempArr.push(d.value);
          //console.log("this.dataArr",this.dataArray);
        });
        this.data=datatext;
        console.log('data is ',this.data);
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
      console.log('final value is : ',this.options);
      }
    }
