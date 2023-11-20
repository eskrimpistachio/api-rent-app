const {
  initializeApp,
  applicationDefault,
  cert,
} = require('firebase-admin/app');
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require('firebase-admin/firestore');
const serviceAccount = require('../private_key.json');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const dataApp = db.collection('rentals').doc('rent');

  const data = await dataApp.get();

  res.status(200).send(data.data());
});

router.post('/submit', async (req, res) => {
  const formData = req.body;

  const response = await db
    .collection('rentals')
    .doc('rent')
    .set(formData, { merge: true });

  res.status(200).send('Data berhasil di simpan!');
});

module.exports = router;
