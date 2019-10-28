import { Component, OnInit} from '@angular/core';
import {ChatService} from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {
  mensaje: string;
  elemento: any;
  constructor(public chatservice: ChatService) {
    this.chatservice.cargarMensajes().subscribe(() => {
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });
  }
  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
    console.log(this.elemento);
  }
  enviar_mensaje() {
if (this.mensaje.length === 0) {
return;
}
this.chatservice.agregarMensaje(this.mensaje);
this.mensaje = '';
}
}
