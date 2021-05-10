# DesafioBry

### Questão 2: Responder os questionamentos abaixo:

2.1 - Um cliente solicitou um serviço de geração de QRCode. O cliente quer acessar um endpoint e gerar o QRCode a partir da aplicação dele, uma integração direta via REST.
Você não possui o serviço ainda, mas possui dois SDKs que geram QRCode um em JAVA e outro em C++. O confeccionado em C++ não está finalizado. O confeccionado em JAVA está totalmente funcional.
A equipe precisa, de forma segura e confiável, fornecer o serviço para o cliente!
Descreva como você faria o serviço e como disponibilizaria para o cliente. Qual SDK você utilizaria? Apresente um exemplo textual dos parâmetros de entrada e saída do novo serviço.

> Utilizaria o SDK Java totalmente funcional para garantia de segurança.
> Exemplo de parâmetros:
Entrada: {
    "QRcode_text": "Minha mensagem",
    "image_format": "PNG"
}
Saida: $imagem

2.2 Considerando o cenário acima: Foi necessário confeccionar uma nova versão do serviço QRCode para incluir novas funcionalidades. Inevitavelmente essa melhoria resulta numa total quebra de compatibilidade com a versão anterior.
Qual o impacto dessa nova funcionalidade no serviço para o cliente? Qual sua proposta para que o cliente tenha o menor impacto ao serem lançadas novas funcionalidades?

> O cliente terá de refatorar sua aplicação para atender às novas especificações da nova API.
> Para mitigar o impacto sobre os clientes, uma técnica para versionamento da API é colocanr a versão na URL (http://dominio/versao/recurso), disponibilizando ambas as versões para que a transição dos clientes seja  mais suave.

