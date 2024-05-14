import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, Subject } from '@microsoft/signalr';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: HubConnection;
  public mensagens: string[] = [];
  public mensagemRecebida: Observable<string>;

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:7170/chat') 
      .build();

    this.hubConnection.start()
      .then(() => console.log('Conectado ao hub'))
      .catch(err => console.error('Erro ao conectar ao hub', err));

    this.mensagemRecebida = new Observable<string>((observer) => {
      this.hubConnection.on('ReceberMensagem', (mensagem: string) => {
        console.log('Mensagem recebida do hub:', mensagem);
        this.mensagens.push(mensagem);
        observer.next(mensagem); 
      });
    });
  }

  enviarMensagem(mensagem: string) {
    this.hubConnection.invoke('EnviarMensagem', mensagem)
      .catch(err => console.error('Erro ao enviar mensagem', err));
  }
}
