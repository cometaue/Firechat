import { Component} from '@angular/core';
import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent{

  constructor(private chatservice: ChatService) { }


  google() {
    this.chatservice.conectarGoogle().then(resp => {
      console.log(resp);
    });
  }
  facebook() {
  this.chatservice.conectarFacebook();
  }
}
