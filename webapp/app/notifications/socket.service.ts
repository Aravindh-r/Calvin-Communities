import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as socketIo from 'socket.io-client';

@Injectable()
/*export class SocketService {
    public wsObservable:any;
    public socket;

    //constructor() {}

    constructor() {
        this.initSocket();
    }

    private initSocket(): void {
        //No URL is being passed, as it default connects with current host itself
        this.socket = socketIo();
    }

    public send(message: any): void {
        this.socket.emit('message', {message:"hai"});
    }
    
    public initializeWebSocket(){
        this.wsObservable = Observable.create((observer) => {
            //this.socket = socketIo('communityEvent');
            this.socket.on('communityEvent',(data) => {
      observer.next(JSON.parse(data));
    });
            return () => {
                this.socket.disconnect();
};
        }).share();

    }
}*/
export class SocketService {
    private socket;

    constructor() {
        this.initSocket();
    }

    private initSocket(): void {
        //No URL is being passed, as it default connects with current host itself
        this.socket = socketIo();
    }

    public send(message: any): void {
        this.socket.emit('message', {message:"hai"});
    }

    public get() {
        let observable = new Observable(observer => {
            this.socket.on('communityEvent', (data) => {
                //console.log("----->",JSON.parse(data));
                observer.next(JSON.parse(data));
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

}
// export class SocketService {
//     wsObservable;
//     private ws;
// initializeWebSocket(url) {

//   this.wsObservable = Observable.create((observer) => {
//     this.ws = new WebSocket(url);

//     // this.ws.onopen = (e) => {
//     //   console.log('websocket open');
//     // };

//     // this.ws.onclose = (e) => {
//     //   if (e.wasClean) {
//     //     observer.complete();
//     //   } else {
//     //     observer.error(e);
//     //   }
//     // };

//     // this.ws.onerror = (e) => {
//     //   observer.error(e);
//     // }

//     this.ws.onmessage = (e) => {
//       observer.next(JSON.parse(e.data));
//     }

//     return () => {
//       this.ws.close();
//     };
//   }).share();
// }
// }