import React, { useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './LicenseKeyValidation.css';

const LicenseKeyValidation = () => {
  const [licenseKey, setLicenseKey] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [issuedOn, setIssuedOn] = useState(null);
  const [validUntil, setValidUntil] = useState(null);

  const handleInputChange = (e) => {
    setLicenseKey(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/api/validate-license', { licenseKey });
      setValidationResult(response.data);
      if (response.data.valid) {
        setIssuedOn(response.data.issuedOn);
        setValidUntil(response.data.validUntil);
      } else {
        setIssuedOn(null);
        setValidUntil(null);
      }
    } catch (error) {
      console.error('Error validating license key:', error);
      setValidationResult({ valid: false, message: 'Error validating license key' });
      setIssuedOn(null);
      setValidUntil(null);
    }
    setIsLoading(false);
  };

  return (
    <div className="license-key-validation">
      <h2>License Key Validation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={licenseKey}
          onChange={handleInputChange}
          placeholder="Enter your license key"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Validating...' : 'Validate'}
        </button>
      </form>
      {validationResult && (
        <div className={`validation-result ${validationResult.valid ? 'valid' : 'invalid'}`}>
          <div className="status-icon">
            {validationResult.valid ? (
              <FaCheckCircle className="valid-icon" />
            ) : (
              <FaTimesCircle className="invalid-icon" />
            )}
          </div>
          <p>{validationResult.message}</p>
          {validationResult.valid && (
            <div className="license-details">
              <p>Issued On: {issuedOn}</p>
              <p>Valid Until: {validUntil}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LicenseKeyValidation;

// LicenseKeyValidation.css
`
.license-key-validation {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.validation-result {
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.validation-result.valid {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}

.validation-result.invalid {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}

.status-icon {
  font-size: 48px;
  text-align: center;
  margin-bottom: 10px;
}

.valid-icon {
  color: #28a745;
}

.invalid-icon {
  color: #dc3545;
}

.license-details {
  margin-top: 10px;
  font-size: 14px;
}
`