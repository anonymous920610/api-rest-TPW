const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();

// Configuración del puerto
app.set('port', process.env.PORT || 3443); 

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir la página HTML
app.get('/Agenda', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pagina.html'));
});

// Levantando el servidor HTTPS
const sslServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
    },
    app
);

sslServer.listen(app.get('port'), () =>
    console.log(`Servidor HTTPS iniciado en https://localhost:${app.get('port')}`)
);