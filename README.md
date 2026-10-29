# PKBoat Pontoons

Site institucional (landing page) da **PKBoat Pontoons**, estaleiro de pontoons de Santa Bárbara d'Oeste, SP.
A página apresenta os modelos PKClassic 26, os diferenciais da embarcação, uma galeria de fotos e vídeos e leva o visitante ao contato direto por WhatsApp.

🌐 Instagram: [@pkboat_oficial](https://www.instagram.com/pkboat_oficial/)

## Seções da página

- Cabeçalho com logo, redes sociais e botão de contato (WhatsApp)
- Banner principal e vídeo institucional (YouTube)
- Modelos PKClassic 26 (preto e vermelho), cada um com link para o WhatsApp
- Seções de destaque: prioridade na entrega, espaço interno, descanso e motores
- Galeria interativa de fotos e vídeos
- Rodapé com endereço e créditos

## Tecnologias

- **HTML5**, **CSS3** e **JavaScript** puro, sem frameworks nem etapa de build
- Fontes Google Fonts: Libre Caslon Text e Karla
- Imagens em **AVIF**; vídeos da galeria em **MP4 (H.264)**
- `IntersectionObserver` para as animações de entrada ao rolar (scroll reveal)
- Google Analytics (gtag.js) e Meta Pixel para métricas
- Layout responsivo (testado de 320 px a 1440 px)

## Estrutura

```
index.html   página única
style.css    estilos
app.js       galeria e animações de rolagem
images/      imagens em AVIF (evento-XX = fotos do evento; evento-video-XX = capas dos vídeos)
videos/      vídeos da galeria
```

## Galeria

A lista de itens fica no começo do `app.js`, na ordem de exibição (mais recentes primeiro).
Para adicionar mídia, coloque o arquivo em `images/` (AVIF) ou `videos/` (MP4) e inclua na lista.
Recursos: fundo desfocado com a imagem atual, contador, avanço automático a cada 8 s, miniaturas,
setas, deslizar no celular e reprodução de vídeo na própria moldura.

## Executar localmente

Basta abrir o `index.html` no navegador, ou servir a pasta:

```bash
python3 -m http.server 8000
```

## Histórico de versões

| Versão | Data | Alterações |
| ------ | ---- | ---------- |
| 1.2 | 29/10/2026 | Galeria passa a exibir as mídias mais recentes primeiro |
| 1.1 | 29/10/2026 | Novas fotos e vídeos do evento padronizados (AVIF/MP4, duplicata removida); galeria redesenhada com fundo desfocado, contador, barra de progresso, suporte a vídeo e gesto de deslizar, mantendo as miniaturas |
| 1.0.2 | 02/10/2026 | Tags de Google Analytics e Meta Pixel |
| 1.0.1 | 29/07/2026 | Links e nomes dos modelos atualizados; instruções de idioma para commits |
| 1.0 | 24/07/2026 | Animações de entrada ao rolar e contatos atualizados |
| 0.1 | 23/07/2026 | Primeira versão do site PKBoat Pontoons |
