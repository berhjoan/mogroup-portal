const express = require('express');
const Client = require('../models/Client');
const router = express.Router();

// Página principal
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find();
    res.render('index', { clients });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error del servidor');
  }
});

// Verificar código de acceso
router.post('/verify-code', async (req, res) => {
  try {
    const { clientId, code } = req.body;
    const client = await Client.findById(clientId);
    
    if (client && client.accessCode === code) {
      res.json({ success: true, redirectUrl: client.catalogUrl });
    } else {
      res.json({ success: false, message: 'Código incorrecto' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
});

module.exports = router;