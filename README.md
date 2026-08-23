# Conecta + LiveKit

Versão que usa LiveKit Cloud como infraestrutura WebRTC. O site continua sendo hospedado no Render, mas áudio/vídeo/tela passam pela infraestrutura LiveKit, evitando a necessidade de configurar TURN manualmente.

## Variáveis no Render
- LIVEKIT_URL = URL WebSocket do projeto LiveKit (ex.: wss://seu-projeto.livekit.cloud)
- LIVEKIT_API_KEY = API key do LiveKit
- LIVEKIT_API_SECRET = API secret do LiveKit

Nunca coloque API_SECRET no frontend, GitHub ou envie no chat.

## Deploy
npm install
npm start

O frontend usa o SDK JavaScript do LiveKit via CDN. LiveKit fornece câmera, microfone, screen share, reconexão e transporte WebRTC gerenciado.
