/**
 * WeMeet Private Safety Network - Master Backend Server
 */

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Root Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    message: 'WeMeet Engine Active',
    version: '1.3.0'
  });
});

// Onboarding Ads Route
app.get('/api/v1/ads/onboarding-sequence', (req, res) => {
  res.status(200).json({
    adsSequence: [
      { id: 'ad_1', title: 'Nationwide Job Vacancies', sponsor: 'Verified Careers Portal' },
      { id: 'ad_2', title: 'National Health & Vaccinations', sponsor: 'Department of Health' },
      { id: 'ad_3', title: 'Exclusive Hotel Discounts', sponsor: 'Hospitality Partner' }
    ],
    animation: 'MARQUEE_RIGHT_TO_LEFT',
    mandatoryGate: { enabled: true, countdownSeconds: 10 }
  });
});

// Post Call Ads Route
app.get('/api/v1/ads/post-call', (req, res) => {
  res.status(200).json({
    maxAdsLimit: 3,
    ads: [
      { id: 'pc_1', headline: 'Secure Family Cloud Backup', type: 'INTERSTITIAL' },
      { id: 'pc_2', headline: 'Verified Job Listings', type: 'INTERSTITIAL' }
    ]
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
/**
 * WeMeet Private Safety Network - Master Backend Server
 */

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Root Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    message: 'WeMeet Engine Active',
    version: '1.3.0'
  });
});

// Onboarding Ads Route
app.get('/api/v1/ads/onboarding-sequence', (req, res) => {
  res.status(200).json({
    adsSequence: [
      { id: 'ad_1', title: 'Nationwide Job Vacancies', sponsor: 'Verified Careers Portal' },
      { id: 'ad_2', title: 'National Health & Vaccinations', sponsor: 'Department of Health' },
      { id: 'ad_3', title: 'Exclusive Hotel Discounts', sponsor: 'Hospitality Partner' }
    ],
    animation: 'MARQUEE_RIGHT_TO_LEFT',
    mandatoryGate: { enabled: true, countdownSeconds: 10 }
  });
});

// Post Call Ads Route
app.get('/api/v1/ads/post-call', (req, res) => {
  res.status(200).json({
    maxAdsLimit: 3,
    ads: [
      { id: 'pc_1', headline: 'Secure Family Cloud Backup', type: 'INTERSTITIAL' },
      { id: 'pc_2', headline: 'Verified Job Listings', type: 'INTERSTITIAL' }
    ]
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
