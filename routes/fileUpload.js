const express = require('express');
const router = express.Router();
const { uploadMedicalRecord, uploadPrescription } = require('../middleware/uploadMiddleware');

// Medical Record Upload Endpoint
/**
 * @swagger
 * /api/upload/medical-record:
 *   post:
 *     summary: Upload a medical record file
 *     tags: [File Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Medical record file (PDF, JPG, PNG)
 *     responses:
 *       200:
 *         description: Medical record uploaded successfully
 *       400:
 *         description: No file uploaded or invalid file type
 */

router.post('/upload/medical-record', uploadMedicalRecord.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or invalid file type.' });
  }
  res.status(200).json({
    message: 'Medical record uploaded successfully',
    file: req.file
  });
});

// Prescription Upload Endpoint
/**
 * @swagger
 * /api/upload/prescription:
 *   post:
 *     summary: Upload a prescription file
 *     tags: [File Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Prescription file (PDF, JPG, PNG)
 *     responses:
 *       200:
 *         description: Prescription uploaded successfully
 *       400:
 *         description: No file uploaded or invalid file type
 */

router.post('/upload/prescription', uploadPrescription.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or invalid file type.' });
  }
  res.status(200).json({
    message: 'Prescription uploaded successfully',
    file: req.file
  });
});

module.exports = router;