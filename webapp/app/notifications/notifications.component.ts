import { Component ,Input,Output,EventEmitter } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { Params, RouterModule, Routes, Router, ActivatedRoute } from '@angular/router'
import { MdTableModule } from '@angular/material';
import { SocketService } from './socket.service';
/*import {DashboardGraphsComponent} from '../dashboard-graphs/dashboard-graphs.component';
*/
@Component({
  selector: 'calvin-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [SocketService/*,DashboardGraphsComponent*/]
})
export class NotificationsComponent {
  @Input()  name: string;
  @Output() onVoted = new EventEmitter<boolean>();
  voted = false;

  vote(agreed: boolean){
    console.log('inside vote function');
    this.onVoted.emit(agreed);
    this.voted = true;
  }
  private notifications: any[];
  private ioConnection: any;
constructor(private socketService: SocketService, private router: Router) {}

    ngOnInit() {
        this.notifications = [];
        this.initIoConnection();
    }

    private redirect(domain) {
            this.router.navigate(['/communities/'+ domain]);
        }
    private initIoConnection() {
        this.ioConnection = this.socketService.get().subscribe((newNotification) => {
           this.notifications.unshift(newNotification);
     });
}
  // constructor(/*private dashboardGraphsComponent:DashboardGraphsComponent,*/private socketService: SocketService, private router: Router) {
    
  // }
  // ngOnInit() {
  //   this.notifications = [];
  //   this.initIoConnection();
  // }
  // private redirect(domain) {
  //   this.router.navigate(['/communities/'+ domain]);
  // }
  // private initIoConnection() {
  //   this.ioConnection = this.socketService.wsObservable.subscribe((newNotification) => {
  //     this.notifications.unshift(newNotification);
  //   });
  // }

}

// constructor(private socketService: SocketService, private router: Router) {}

//     ngOnInit() {
//         this.notifications = [];
//         this.initIoConnection();
//     }

//     private redirect(domain) {
//             this.router.navigate(['/communities/'+ domain]);
//         }
//     private initIoConnection() {
//         this.ioConnection = this.socketService.get().subscribe((newNotification) => {
//            this.notifications.unshift(newNotification);
//      });

//   }


// export class NotificationsComponent {
//   @Input()  name: string;
//   @Output() onVoted = new EventEmitter<boolean>();
//   voted = false;
 
//   vote(agreed: boolean) {
//     console.log('inside vote function');
//     this.onVoted.emit(agreed);
//     this.voted = true;
//   }
//     private notifications: any[];
//     private ioConnection: any;

//     //private count = 0;

//     constructor(/*private dashboardGraphsComponent:DashboardGraphsComponent,*/private socketService: SocketService, private router: Router) {}

//     ngOnInit() {
//         this.notifications = [];
//         this.initIoConnection();
//     }

//     private redirect(domain) {
//             this.router.navigate(['/communities/'+ domain]);
//         }
//     private initIoConnection() {
//         this.socketService.wsObservable.subscribe((data) => {
//             this.notifications.unshift(data);
//             /*if(newNotification['event'] === "newcommunityadded"){
//             this.dashboardGraphsComponent.getGraphDetails();
//             }*/

//      });



//     // this.notifications.forEach((data) => {
//     // if(data.event === 'memberadded')
//     // {
//     //     console.log(this.count,"his")
//     //     this.count++;
//     // }
//     // });
//     }
// }
