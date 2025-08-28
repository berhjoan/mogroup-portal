const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para catálogos
app.get('/catalogo/:nombre', (req, res) => {
  const catalogo = req.params.nombre;
  res.sendFile(path.join(__dirname, 'public', 'catalogos', `${catalogo}.html`));
});

// Ruta para verificar códigos (simulada)
app.post('/verify-code', (req, res) => {
  // Simular verificación de código
  res.json({ 
    success: true, 
    redirectUrl: '/catalogos/insumos.html' 
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});