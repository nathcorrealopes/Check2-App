import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ChatService } from './services/chat-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'app-chat';
  public novaMensagem: string = "";
  public mensagens: string[] = []; // Declaração da propriedade mensagens

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.mensagemRecebida.subscribe((mensagem: string) => {
      this.mensagens.push(mensagem);
    });
  }

  enviarMensagem() {
    this.chatService.enviarMensagem(this.novaMensagem);
    this.novaMensagem = ""; // Limpa a caixa de texto após enviar a mensagem
  }
}