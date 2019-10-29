import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Mensaje} from '../models/mensaje.interface';
import {map} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any =
   {nombre: '',
    usuarioId: '',
    foto: '',
    proveedor: ''
  };
  constructor(private afs: AngularFirestore, public firebase: AngularFireAuth) {

  }
  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));
    return this.itemsCollection.valueChanges()
             .pipe(map((mensajes: Mensaje[]) => {
                console.log(mensajes);
                this.chats = [];
                for (let mensaje of mensajes) {
                  this.chats.unshift(mensaje);
                }
                return this.chats;
             }));

  }
  agregarMensaje(texto: string) {
    let mensaje: Mensaje = {
      nombre: '',
      mensaje: texto,
      fecha: new Date().getTime()
    };
    return this.itemsCollection.add(mensaje);
  }
  conectarFacebook() {
    const provider = new auth.FacebookAuthProvider();
    return this.firebase.auth.signInWithPopup(provider).then(result => {
      console.log(result);
    });
  }
  conectarGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return this.firebase.auth.signInWithPopup(provider).then(result => {
    this.usuario = {
    nombre: result.additionalUserInfo.profile['name'],
    usuarioId: result.additionalUserInfo.profile['id'],
    foto: result.additionalUserInfo.profile['picture'],
    proveedor: 'google'
  };
    return this.usuario;
      });
  }
}
