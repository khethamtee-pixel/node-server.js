/**
 * WeMeet Private Safety Network - Master Backend Server
 * Architecture Blueprint Version: 1.3.0
 * Founder: Khetha Mthokozisi Ngubane
 */

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'wemeet_production_secure_jwt_secret_key_2026';
const USD_TO_ZAR = 16.57373;

const db = {
  users: [],
  unlinkingRequests: [],
  panicLogs: [],
  travelBookings: []
};

app.post('/api/v1/security/request-unlinking', (req, res) => {
  const { requesterEmail, targetUserId } = req.body;
  const pendingUntil = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  const unlinkingReq = {
    id: `unLink_${Date.now()}`,
    requesterEmail,
    targetUserId,
    otpCode,
    pendingUntil,
    status: 'PENDING_FULL_ACTIVE_REPORTING'
  };

  db.unlinkingRequests.push(unlinkingReq);
  console.log(`[SECURITY] OTP ${otpCode} sent strictly to ${requesterEmail}.`);

  return res.status(202).json({
    message: 'Unlinking request initiated. 24-hour verification window active.',
    pendingUntil,
    trackingStatus: 'FULL_ACTIVE_REPORTING'
  });
});

app.post('/api/v1/security/panic-broadcast', (req, res) => {
  const { userId, latitude, longitude, batteryLevel } = req.body;

  const panicPayload = {
    userId,
    latitude,
    longitude,
    batteryLevel,
    timestamp: new Date().toISOString(),
    event: 'FORCED_SHUTDOWN_INTERCEPTED'
  };

  db.panicLogs.push(panicPayload);
  return res.status(200).json({ status: 'PANIC_PAYLOAD_DISPATCHED' });
});

app.post('/api/v1/storage/check-upgrade', (req, res) => {
  const { userId, currentStorageGB } = req.body;
  const BASE_FREE_STORAGE_GB = 30;

  if (currentStorageGB >= BASE_FREE_STORAGE_GB) {
    return res.status(200).json({
      upgradeRequired: true,
      plan: {
        name: '60GB Encrypted Cloud Storage Tier',
        priceZAR: 70.00,
        usageType: 'PASSIVE_ENCRYPTED_CLOUD_STORAGE',
        netMarginPerUserZAR: 43.00
      },
      message: 'Base 30GB capacity reached. Upgrading to 60GB Passive Storage at R70/month.'
    });
  }

  return res.status(200).json({
    upgradeRequired: false,
    remainingGB: BASE_FREE_STORAGE_GB - currentStorageGB
  });
});

app.get('/api/v1/ads/onboarding-sequence', (req, res) => {
  const marqueeAds = [
    { id: 'ad_1', title: 'Nationwide Job Vacancies', sponsor: 'Verified Careers Portal' },
    { id: 'ad_2', title: 'National Health & Vaccinations', sponsor: 'Department of Health' },
    { id: 'ad_3', title: 'Exclusive Hotel Discounts', sponsor: 'Hospitality Partner' },
    { id: 'ad_4', title: 'Fly Nationwide - 20% Off', sponsor: 'Aero Travel' },
    { id: 'ad_5', title: 'Express Bus Tickets - 20% Off', sponsor: 'Intercity Transit' }
  ];

  return res.status(200).json({
    adsSequence: marqueeAds,
    animation: 'MARQUEE_RIGHT_TO_LEFT',
    mandatoryGate: {
      enabled: true,
      countdownSeconds: 10,
      userMessage: 'Please wait for this countdown to settle'
    }
  });
});

app.get('/api/v1/ads/post-call', (req, res) => {
  const postCallAds = [
    { id: 'pc_1', headline: 'Secure Family Cloud Backup', type: 'INTERSTITIAL' },
    { id: 'pc_2', headline: 'Verified Nationwide Job Listings', type: 'INTERSTITIAL' },
    { id: 'pc_3', headline: 'Book Discounted Travel Tickets', type: 'INTERSTITIAL' }
  ];

  return res.status(200).json({
    maxAdsLimit: 3,
    ads: postCallAds
  });
});

app.post('/api/v1/travel/book-ticket', (req, res) => {
  const { userId, type, fullPriceUSD } = req.body;

  if (!['FLIGHT', 'BUS'].includes(type)) {
    return res.status(400).json({ error: 'Invalid travel type. Must be FLIGHT or BUS.' });
  }

  const userDiscountRate = 0.20;
  const discountedPriceUSD = fullPriceUSD * (1 - userDiscountRate);
  const discountedPriceZAR = discountedPriceUSD * USD_TO_ZAR;

  const commissionRate = type === 'FLIGHT' ? 0.05 : 0.08;
  const wemeetCommissionZAR = discountedPriceZAR * commissionRate;

  const bookingRecord = {
    bookingId: `BK_${Date.now()}`,
    userId,
    type,
    fullPriceUSD,
    discountedPriceUSD,
    discountedPriceZAR,
    wemeetCommissionZAR,
    timestamp: new Date().toISOString()
  };

  db.travelBookings.push(bookingRecord);

  return res.status(201).json({
    message: 'Booking successful with 20% discount applied!',
    pricingSummary: {
      originalUSD: fullPriceUSD,
      discountedUSD: discountedPriceUSD,
      discountedZAR: discountedPriceZAR.toFixed(2),
      discountApplied: '20%'
    },
    bookingId: bookingRecord.bookingId
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`WeMeet Backend Engine running on port ${PORT}`);
});

