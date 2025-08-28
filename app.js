const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  // Datos de ejemplo - luego conectaremos con la base de datos
  const clients = [
    {
      _id: '1',
      name: 'Terpel',
      logo: 'terpel-logo.png',
      description: 'Empresa líder en combustibles y lubricantes'
    },
    {
      _id: '2', 
      name: 'Bahía Motor',
      logo: 'bahia-motor-logo.png',
      description: 'Concesionario automotriz de prestigio'
    },
    // Agrega más clientes aquí...
  ];
  
  res.render('index', { clients });
});

// Ruta para verificar códigos de acceso
app.post('/verify-code', (req, res) => {
  // Simulamos la verificación - luego conectaremos con la base de datos
  const { clientId, code } = req.body;
  
  // Códigos de ejemplo
  const validCodes = {
    '1': '1234',
    '2': '5678'
  };
  
  if (validCodes[clientId] === code) {
    res.json({ 
      success: true, 
      redirectUrl: '/catalogo-terpel.html' // URL example
    });
  } else {
    res.json({ 
      success: false, 
      message: 'Código incorrecto' 
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log('Presiona Ctrl+C para detener el servidor');
});