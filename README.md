# Conecta Pro

Aplicação web 1-a-1 para câmera, microfone, compartilhamento de tela e chat.

## Rodar
Node.js 18+
npm install
npm start

Abra http://localhost:3000

## Publicar
Use uma hospedagem Node.js que forneça HTTPS. O navegador exige contexto seguro para câmera/microfone/tela (localhost é exceção).

Para maior compatibilidade entre redes, configure TURN além de STUN. O código usa STUN público como ponto de partida.

## Produção
Recomendado adicionar:
- TURN próprio;
- autenticação opcional;
- expiração de salas;
- rate limiting;
- logs e monitoramento;
- CSP e headers de segurança;
- política de privacidade;
- armazenamento mínimo de dados.
