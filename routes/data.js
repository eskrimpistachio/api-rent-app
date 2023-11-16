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
  const dataApp = db.collection('coba').doc('coba1');

  const data = await dataApp.get();

  //   fs.readFile('./formData.json', 'utf-8', (err, data) => {
  //     if (err) {
  //       res.status(500).send({ error: 'Error reading file' });
  //     } else {
  //       res.status(200).send(JSON.parse(data));
  //     }
  //   });

  res.status(200).send(data.data());
});

router.post('/submit', async (req, res) => {
  const formData = req.body;
  //   console.log(formData);
  const response = await db
    .collection('coba')
    .doc('coba1')
    .set(formData, { merge: true });

  //   fs.writeFile('./formData.json', JSON.stringify(formData), (err) => {
  //     if (err) throw err;
  //     console.log('Data written to file');
  //   });

  res.status(200).send('Data berhasil di simpan!');
});

module.exports = router;
