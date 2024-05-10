using Microsoft.AspNetCore.SignalR;
using System.Runtime.InteropServices;

namespace webchat
{
    public class MyHUB : Hub 

    {
        public async Task EnviarMensagem(String mensagem)
        {
            var teste = new { nome = "" };
            await Clients.All.SendAsync("ReceberMensagem", mensagem);

        }
    }
}
