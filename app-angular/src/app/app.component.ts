import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private hubConnection : HubConnection;
  mensagens: string[] = []
  title = 'app-angular';
  novaMensagem: String = "";

  constructor(){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:7170/chat")
      .build();

    this.hubConnection.start()
    .then(()=> console.log('SignalR Connected'))
    .catch(err => console.error('erro ao conectar', err))
    this.hubConnection.on("ReceberMensagem", (mensagem:string) =>{
      console.log(`mensagem recebida : ${mensagem}`)
      this.mensagens.push(mensagem)
    })

  }
enviarMensagem(){
  this.hubConnection.invoke('EnviarMensagem',this.novaMensagem)
  .catch(err => console.error(err));
  this.novaMensagem= "";
}

}
