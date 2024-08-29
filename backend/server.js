const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock license key validation
// In a real-world scenario, this would involve checking against a database or external service
const validateLicenseKey = (key) => {
  // For demo purposes, let's consider keys starting with 'VALID' as valid
  if (key.startsWith('VALID')) {
    return {
      isValid: true,
      issuedOn: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
      validUntil: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 335 days from now
    };
  }
  return { isValid: false };
};

app.post('/api/validate-license', (req, res) => {
  const { licenseKey } = req.body;
  
  if (!licenseKey) {
    return res.status(400).json({ valid: false, message: 'License key is required' });
  }

  const result = validateLicenseKey(licenseKey);

  if (result.isValid) {
    res.json({
      valid: true,
      message: 'License key is valid',
      issuedOn: result.issuedOn,
      validUntil: result.validUntil
    });
  } else {
    res.json({ valid: false, message: 'Invalid license key' });
  }
});

app.get('/api/validate-license', (req, res) => {
  const { licenseKey } = req.query;
  
  if (!licenseKey) {
    return res.status(400).json({ valid: false, message: 'License key is required' });
  }

  const result = validateLicenseKey(licenseKey);

  if (result.isValid) {
    res.json({
      valid: true,
      message: 'License key is valid',
      issuedOn: result.issuedOn,
      validUntil: result.validUntil
    });
  } else {
    res.json({ valid: false, message: 'Invalid license key' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});