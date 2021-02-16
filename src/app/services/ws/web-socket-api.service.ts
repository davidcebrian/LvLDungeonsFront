
import * as Stomp from '../../../../node_modules/stompjs';
import * as SockJS from '../../../../node_modules/sockjs-client';
import { Injectable } from '@angular/core';
import { Partida } from 'src/app/interfaces/userInterface';


@Injectable({
    providedIn: 'root'
})

export class WebSocketAPI {
    webSocketEndPoint: string = '/prueba-websocket';
    topic: string = '/topic/partida/'
    stompClient: any;
    partida: Partida;

    constructor( ){
        
    }
    _connect(tokenPartida: String) {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS('http://172.16.9.46:8080' + this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, (frame)  => {
            _this.stompClient.subscribe(this.topic /*tokenPartida*/, (sdkEvent) => {
                console.log(sdkEvent)
                _this.partida = JSON.parse(sdkEvent.body);
            });
            //_this.stompClient.reconnect_delay = 2000;
        });
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

	/**
	 * Send message to sever via web socket
	 * @param {*} message 
	 */
    _send(message) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/prueba", {}, JSON.stringify(message));
    }

}