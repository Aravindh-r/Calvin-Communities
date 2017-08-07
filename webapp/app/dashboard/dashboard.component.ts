import { Component } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";


@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
	/*ngOnInit() {
	notification(checked:true){
        
    }
  }*/
  onVoted(agreed: boolean) {
  	console.log('event emitted');
  }
}
