import { LocationPrice } from '@/types';

export interface TreatmentCostData {
  slug: string;
  title: string;
  priceFrom: number;
  priceTo: number;
  priceRange: string;
  savingsPercent: number;
  locationPrices: LocationPrice[];
}

export const TREATMENT_COSTS: Record<string, TreatmentCostData> = {
  "knee-replacement": {
    "slug": "knee-replacement",
    "title": "Knee Replacement",
    "priceFrom": 3000,
    "priceTo": 6000,
    "priceRange": "$3,000 \u2013 $6,000",
    "savingsPercent": 68,
    "locationPrices": [
      {
        "amount": 3000,
        "maxAmount": 6000,
        "range": "$3,000 \u2013 $6,000",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 9500,
        "maxAmount": 21000,
        "range": "$9,500 \u2013 $21,000",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 12000,
        "maxAmount": 20000,
        "range": "$12,000 \u2013 $20,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 6000,
        "maxAmount": 10000,
        "range": "$6,000 \u2013 $10,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 8000,
        "maxAmount": 14000,
        "range": "$8,000 \u2013 $14,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 14000,
        "maxAmount": 26000,
        "range": "$14,000 \u2013 $26,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 7800,
        "maxAmount": 16500,
        "range": "$7,800 \u2013 $16,500",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 3000,
        "maxAmount": 6500,
        "range": "$3,000 \u2013 $6,500",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "hip-replacement": {
    "slug": "hip-replacement",
    "title": "Hip Replacement",
    "priceFrom": 6000,
    "priceTo": 9000,
    "priceRange": "$6,000 \u2013 $9,000",
    "savingsPercent": 40,
    "locationPrices": [
      {
        "amount": 6000,
        "maxAmount": 9000,
        "range": "$6,000 \u2013 $9,000",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 10000,
        "maxAmount": 22500,
        "range": "$10,000 \u2013 $22,500",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 13000,
        "maxAmount": 23000,
        "range": "$13,000 \u2013 $23,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 6500,
        "maxAmount": 11000,
        "range": "$6,500 \u2013 $11,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 8500,
        "maxAmount": 15000,
        "range": "$8,500 \u2013 $15,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 15000,
        "maxAmount": 28000,
        "range": "$15,000 \u2013 $28,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 8000,
        "maxAmount": 18000,
        "range": "$8,000 \u2013 $18,000",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 3500,
        "maxAmount": 7000,
        "range": "$3,500 \u2013 $7,000",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "acl-reconstruction": {
    "slug": "acl-reconstruction",
    "title": "ACL Reconstruction",
    "priceFrom": 1500,
    "priceTo": 7000,
    "priceRange": "$1,500 \u2013 $7,000",
    "savingsPercent": 69,
    "locationPrices": [
      {
        "amount": 1500,
        "maxAmount": 7000,
        "range": "$1,500 \u2013 $7,000",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 4800,
        "maxAmount": 11500,
        "range": "$4,800 \u2013 $11,500",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 5500,
        "maxAmount": 20000,
        "range": "$5,500 \u2013 $20,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 2500,
        "maxAmount": 10000,
        "range": "$2,500 \u2013 $10,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 3500,
        "maxAmount": 13000,
        "range": "$3,500 \u2013 $13,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 7000,
        "maxAmount": 25000,
        "range": "$7,000 \u2013 $25,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 3800,
        "maxAmount": 9200,
        "range": "$3,800 \u2013 $9,200",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 1300,
        "maxAmount": 6000,
        "range": "$1,300 \u2013 $6,000",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "acdf-surgery": {
    "slug": "acdf-surgery",
    "title": "Anterior Cervical Discectomy & Fusion (ACDF)",
    "priceFrom": 7000,
    "priceTo": 13500,
    "priceRange": "$7,000 \u2013 $13,500",
    "savingsPercent": 26,
    "locationPrices": [
      {
        "amount": 7000,
        "maxAmount": 13500,
        "range": "$7,000 \u2013 $13,500",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 9500,
        "maxAmount": 22500,
        "range": "$9,500 \u2013 $22,500",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 15000,
        "maxAmount": 28000,
        "range": "$15,000 \u2013 $28,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 8500,
        "maxAmount": 16000,
        "range": "$8,500 \u2013 $16,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 11000,
        "maxAmount": 21000,
        "range": "$11,000 \u2013 $21,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 18000,
        "maxAmount": 38000,
        "range": "$18,000 \u2013 $38,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 7800,
        "maxAmount": 18000,
        "range": "$7,800 \u2013 $18,000",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 6000,
        "maxAmount": 13000,
        "range": "$6,000 \u2013 $13,000",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "minimal-invasive-spine-surgery": {
    "slug": "minimal-invasive-spine-surgery",
    "title": "Minimally Invasive Spine Surgery",
    "priceFrom": 7000,
    "priceTo": 13500,
    "priceRange": "$7,000 \u2013 $13,500",
    "savingsPercent": 7,
    "locationPrices": [
      {
        "amount": 7000,
        "maxAmount": 13500,
        "range": "$7,000 \u2013 $13,500",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 7500,
        "maxAmount": 17500,
        "range": "$7,500 \u2013 $17,500",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 15000,
        "maxAmount": 28000,
        "range": "$15,000 \u2013 $28,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 8500,
        "maxAmount": 16000,
        "range": "$8,500 \u2013 $16,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 11000,
        "maxAmount": 21000,
        "range": "$11,000 \u2013 $21,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 18000,
        "maxAmount": 38000,
        "range": "$18,000 \u2013 $38,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 6000,
        "maxAmount": 14000,
        "range": "$6,000 \u2013 $14,000",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 6000,
        "maxAmount": 13000,
        "range": "$6,000 \u2013 $13,000",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "rhinoplasty": {
    "slug": "rhinoplasty",
    "title": "Rhinoplasty",
    "priceFrom": 500,
    "priceTo": 6000,
    "priceRange": "$500 \u2013 $6,000",
    "savingsPercent": 86,
    "locationPrices": [
      {
        "amount": 500,
        "maxAmount": 6000,
        "range": "$500 \u2013 $6,000",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 3500,
        "maxAmount": 10500,
        "range": "$3,500 \u2013 $10,500",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 2000,
        "maxAmount": 18000,
        "range": "$2,000 \u2013 $18,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 900,
        "maxAmount": 9000,
        "range": "$900 \u2013 $9,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 1200,
        "maxAmount": 12000,
        "range": "$1,200 \u2013 $12,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 2500,
        "maxAmount": 22000,
        "range": "$2,500 \u2013 $22,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 2600,
        "maxAmount": 7000,
        "range": "$2,600 \u2013 $7,000",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 450,
        "maxAmount": 5500,
        "range": "$450 \u2013 $5,500",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "breast-implants": {
    "slug": "breast-implants",
    "title": "Breast Implants",
    "priceFrom": 1500,
    "priceTo": 7000,
    "priceRange": "$1,500 \u2013 $7,000",
    "savingsPercent": 73,
    "locationPrices": [
      {
        "amount": 1500,
        "maxAmount": 7000,
        "range": "$1,500 \u2013 $7,000",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 5500,
        "maxAmount": 13000,
        "range": "$5,500 \u2013 $13,000",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 5500,
        "maxAmount": 20000,
        "range": "$5,500 \u2013 $20,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 2500,
        "maxAmount": 10000,
        "range": "$2,500 \u2013 $10,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 3500,
        "maxAmount": 13000,
        "range": "$3,500 \u2013 $13,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 7000,
        "maxAmount": 25000,
        "range": "$7,000 \u2013 $25,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 4500,
        "maxAmount": 10500,
        "range": "$4,500 \u2013 $10,500",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 1300,
        "maxAmount": 6000,
        "range": "$1,300 \u2013 $6,000",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "hair-transplant": {
    "slug": "hair-transplant",
    "title": "Hair Transplant",
    "priceFrom": 1200,
    "priceTo": 3500,
    "priceRange": "$1,200 \u2013 $3,500",
    "savingsPercent": 45,
    "locationPrices": [
      {
        "amount": 1200,
        "maxAmount": 3500,
        "range": "$1,200 \u2013 $3,500",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 2200,
        "maxAmount": 6500,
        "range": "$2,200 \u2013 $6,500",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 3500,
        "maxAmount": 8500,
        "range": "$3,500 \u2013 $8,500",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 2500,
        "maxAmount": 7500,
        "range": "$2,500 \u2013 $7,500",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 2500,
        "maxAmount": 6500,
        "range": "$2,500 \u2013 $6,500",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 4500,
        "maxAmount": 10000,
        "range": "$4,500 \u2013 $10,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 1800,
        "maxAmount": 4800,
        "range": "$1,800 \u2013 $4,800",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 1000,
        "maxAmount": 3000,
        "range": "$1,000 \u2013 $3,000",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "liposuction": {
    "slug": "liposuction",
    "title": "Liposuction",
    "priceFrom": 1500,
    "priceTo": 7000,
    "priceRange": "$1,500 \u2013 $7,000",
    "savingsPercent": 62,
    "locationPrices": [
      {
        "amount": 1500,
        "maxAmount": 7000,
        "range": "$1,500 \u2013 $7,000",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 4000,
        "maxAmount": 11000,
        "range": "$4,000 \u2013 $11,000",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 5500,
        "maxAmount": 20000,
        "range": "$5,500 \u2013 $20,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 2500,
        "maxAmount": 10000,
        "range": "$2,500 \u2013 $10,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 3500,
        "maxAmount": 13000,
        "range": "$3,500 \u2013 $13,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 7000,
        "maxAmount": 25000,
        "range": "$7,000 \u2013 $25,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 3200,
        "maxAmount": 8500,
        "range": "$3,200 \u2013 $8,500",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 1300,
        "maxAmount": 6000,
        "range": "$1,300 \u2013 $6,000",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "tummy-tuck": {
    "slug": "tummy-tuck",
    "title": "Tummy Tuck",
    "priceFrom": 500,
    "priceTo": 6000,
    "priceRange": "$500 \u2013 $6,000",
    "savingsPercent": 91,
    "locationPrices": [
      {
        "amount": 500,
        "maxAmount": 6000,
        "range": "$500 \u2013 $6,000",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 5500,
        "maxAmount": 13500,
        "range": "$5,500 \u2013 $13,500",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 2000,
        "maxAmount": 18000,
        "range": "$2,000 \u2013 $18,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 900,
        "maxAmount": 9000,
        "range": "$900 \u2013 $9,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 1200,
        "maxAmount": 12000,
        "range": "$1,200 \u2013 $12,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 2500,
        "maxAmount": 22000,
        "range": "$2,500 \u2013 $22,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 4500,
        "maxAmount": 10800,
        "range": "$4,500 \u2013 $10,800",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 450,
        "maxAmount": 5500,
        "range": "$450 \u2013 $5,500",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "cataract-surgery": {
    "slug": "cataract-surgery",
    "title": "Cataract Surgery",
    "priceFrom": 250,
    "priceTo": 1100,
    "priceRange": "$250 \u2013 $1,100",
    "savingsPercent": 84,
    "locationPrices": [
      {
        "amount": 250,
        "maxAmount": 1100,
        "range": "$250 \u2013 $1,100",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 1600,
        "maxAmount": 3400,
        "range": "$1,600 \u2013 $3,400",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 2000,
        "maxAmount": 6000,
        "range": "$2,000 \u2013 $6,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 1200,
        "maxAmount": 3500,
        "range": "$1,200 \u2013 $3,500",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 1200,
        "maxAmount": 4000,
        "range": "$1,200 \u2013 $4,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 2500,
        "maxAmount": 6500,
        "range": "$2,500 \u2013 $6,500",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 1300,
        "maxAmount": 2900,
        "range": "$1,300 \u2013 $2,900",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 900,
        "maxAmount": 2500,
        "range": "$900 \u2013 $2,500",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "lasik": {
    "slug": "lasik",
    "title": "LASIK & Refractive Surgery",
    "priceFrom": 1500,
    "priceTo": 7000,
    "priceRange": "$1,500 \u2013 $7,000",
    "savingsPercent": 6,
    "locationPrices": [
      {
        "amount": 1500,
        "maxAmount": 7000,
        "range": "$1,500 \u2013 $7,000",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 1600,
        "maxAmount": 3500,
        "range": "$1,600 \u2013 $3,500",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 5500,
        "maxAmount": 20000,
        "range": "$5,500 \u2013 $20,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 2500,
        "maxAmount": 10000,
        "range": "$2,500 \u2013 $10,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 3500,
        "maxAmount": 13000,
        "range": "$3,500 \u2013 $13,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 7000,
        "maxAmount": 25000,
        "range": "$7,000 \u2013 $25,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 1500,
        "maxAmount": 3200,
        "range": "$1,500 \u2013 $3,200",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 1300,
        "maxAmount": 6000,
        "range": "$1,300 \u2013 $6,000",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "vitrectomy": {
    "slug": "vitrectomy",
    "title": "Vitrectomy",
    "priceFrom": 500,
    "priceTo": 6000,
    "priceRange": "$500 \u2013 $6,000",
    "savingsPercent": 87,
    "locationPrices": [
      {
        "amount": 500,
        "maxAmount": 6000,
        "range": "$500 \u2013 $6,000",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 3800,
        "maxAmount": 9200,
        "range": "$3,800 \u2013 $9,200",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 2000,
        "maxAmount": 18000,
        "range": "$2,000 \u2013 $18,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 900,
        "maxAmount": 9000,
        "range": "$900 \u2013 $9,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 1200,
        "maxAmount": 12000,
        "range": "$1,200 \u2013 $12,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 2500,
        "maxAmount": 22000,
        "range": "$2,500 \u2013 $22,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 3000,
        "maxAmount": 7400,
        "range": "$3,000 \u2013 $7,400",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 450,
        "maxAmount": 5500,
        "range": "$450 \u2013 $5,500",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "cornea-transplant": {
    "slug": "cornea-transplant",
    "title": "Cornea Transplant",
    "priceFrom": 500,
    "priceTo": 6000,
    "priceRange": "$500 \u2013 $6,000",
    "savingsPercent": 91,
    "locationPrices": [
      {
        "amount": 500,
        "maxAmount": 6000,
        "range": "$500 \u2013 $6,000",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 5500,
        "maxAmount": 13500,
        "range": "$5,500 \u2013 $13,500",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 2000,
        "maxAmount": 18000,
        "range": "$2,000 \u2013 $18,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 900,
        "maxAmount": 9000,
        "range": "$900 \u2013 $9,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 1200,
        "maxAmount": 12000,
        "range": "$1,200 \u2013 $12,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 2500,
        "maxAmount": 22000,
        "range": "$2,500 \u2013 $22,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 4500,
        "maxAmount": 11000,
        "range": "$4,500 \u2013 $11,000",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 450,
        "maxAmount": 5500,
        "range": "$450 \u2013 $5,500",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "dental-implants": {
    "slug": "dental-implants",
    "title": "Dental Implants",
    "priceFrom": 500,
    "priceTo": 1200,
    "priceRange": "$500 \u2013 $1,200",
    "savingsPercent": 29,
    "locationPrices": [
      {
        "amount": 500,
        "maxAmount": 1200,
        "range": "$500 \u2013 $1,200",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 700,
        "maxAmount": 1800,
        "range": "$700 \u2013 $1,800",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 1500,
        "maxAmount": 4000,
        "range": "$1,500 \u2013 $4,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 700,
        "maxAmount": 1500,
        "range": "$700 \u2013 $1,500",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 1200,
        "maxAmount": 2500,
        "range": "$1,200 \u2013 $2,500",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 1800,
        "maxAmount": 4500,
        "range": "$1,800 \u2013 $4,500",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 850,
        "maxAmount": 2100,
        "range": "$850 \u2013 $2,100",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 300,
        "maxAmount": 900,
        "range": "$300 \u2013 $900",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "full-mouth-implants": {
    "slug": "full-mouth-implants",
    "title": "Full Mouth Implants",
    "priceFrom": 1500,
    "priceTo": 7000,
    "priceRange": "$1,500 \u2013 $7,000",
    "savingsPercent": 84,
    "locationPrices": [
      {
        "amount": 1500,
        "maxAmount": 7000,
        "range": "$1,500 \u2013 $7,000",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 9500,
        "maxAmount": 24000,
        "range": "$9,500 \u2013 $24,000",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 5500,
        "maxAmount": 20000,
        "range": "$5,500 \u2013 $20,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 2500,
        "maxAmount": 10000,
        "range": "$2,500 \u2013 $10,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 3500,
        "maxAmount": 13000,
        "range": "$3,500 \u2013 $13,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 7000,
        "maxAmount": 25000,
        "range": "$7,000 \u2013 $25,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 8200,
        "maxAmount": 21000,
        "range": "$8,200 \u2013 $21,000",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 1300,
        "maxAmount": 6000,
        "range": "$1,300 \u2013 $6,000",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "smile-design": {
    "slug": "smile-design",
    "title": "Smile Design",
    "priceFrom": 500,
    "priceTo": 6000,
    "priceRange": "$500 \u2013 $6,000",
    "savingsPercent": 91,
    "locationPrices": [
      {
        "amount": 500,
        "maxAmount": 6000,
        "range": "$500 \u2013 $6,000",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 5500,
        "maxAmount": 15000,
        "range": "$5,500 \u2013 $15,000",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 2000,
        "maxAmount": 18000,
        "range": "$2,000 \u2013 $18,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 900,
        "maxAmount": 9000,
        "range": "$900 \u2013 $9,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 1200,
        "maxAmount": 12000,
        "range": "$1,200 \u2013 $12,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 2500,
        "maxAmount": 22000,
        "range": "$2,500 \u2013 $22,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 4500,
        "maxAmount": 12000,
        "range": "$4,500 \u2013 $12,000",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 450,
        "maxAmount": 5500,
        "range": "$450 \u2013 $5,500",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "ivf": {
    "slug": "ivf",
    "title": "IVF",
    "priceFrom": 4200,
    "priceTo": 6500,
    "priceRange": "$4,200 \u2013 $6,500",
    "savingsPercent": 65,
    "locationPrices": [
      {
        "amount": 4200,
        "maxAmount": 6500,
        "range": "$4,200 \u2013 $6,500",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 4000,
        "maxAmount": 9500,
        "range": "$4,000 \u2013 $9,500",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 5500,
        "maxAmount": 9500,
        "range": "$5,500 \u2013 $9,500",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 3500,
        "maxAmount": 6000,
        "range": "$3,500 \u2013 $6,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 6000,
        "maxAmount": 10500,
        "range": "$6,000 \u2013 $10,500",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 4000,
        "maxAmount": 8500,
        "range": "$4,000 \u2013 $8,500",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 3400,
        "maxAmount": 7800,
        "range": "$3,400 \u2013 $7,800",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 2500,
        "maxAmount": 3500,
        "range": "$2,500 \u2013 $3,500",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "icsi": {
    "slug": "icsi",
    "title": "ICSI",
    "priceFrom": 1500,
    "priceTo": 3200,
    "priceRange": "$1,500 \u2013 $3,200",
    "savingsPercent": 65,
    "locationPrices": [
      {
        "amount": 1500,
        "maxAmount": 3200,
        "range": "$1,500 \u2013 $3,200",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 1200,
        "maxAmount": 2800,
        "range": "$1,200 \u2013 $2,800",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 5500,
        "maxAmount": 9500,
        "range": "$5,500 \u2013 $9,500",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 3500,
        "maxAmount": 6000,
        "range": "$3,500 \u2013 $6,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 6000,
        "maxAmount": 10500,
        "range": "$6,000 \u2013 $10,500",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 4000,
        "maxAmount": 8500,
        "range": "$4,000 \u2013 $8,500",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 1000,
        "maxAmount": 2400,
        "range": "$1,000 \u2013 $2,400",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 2500,
        "maxAmount": 3500,
        "range": "$2,500 \u2013 $3,500",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "coronary-angioplasty": {
    "slug": "coronary-angioplasty",
    "title": "Coronary Angioplasty & Stenting",
    "priceFrom": 4500,
    "priceTo": 5500,
    "priceRange": "$4,500 \u2013 $5,500",
    "savingsPercent": 44,
    "locationPrices": [
      {
        "amount": 4500,
        "maxAmount": 5500,
        "range": "$4,500 \u2013 $5,500",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 8000,
        "maxAmount": 16500,
        "range": "$8,000 \u2013 $16,500",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 4500,
        "maxAmount": 9000,
        "range": "$4,500 \u2013 $9,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 4500,
        "maxAmount": 5500,
        "range": "$4,500 \u2013 $5,500",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 2050,
        "maxAmount": 2800,
        "range": "$2,050 \u2013 $2,800",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 5000,
        "maxAmount": 11000,
        "range": "$5,000 \u2013 $11,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 6500,
        "maxAmount": 14000,
        "range": "$6,500 \u2013 $14,000",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 1200,
        "maxAmount": 2600,
        "range": "$1,200 \u2013 $2,600",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "coronary-artery-bypass-cabg": {
    "slug": "coronary-artery-bypass-cabg",
    "title": "Coronary Artery Bypass (CABG)",
    "priceFrom": 4000,
    "priceTo": 6000,
    "priceRange": "$4,000 \u2013 $6,000",
    "savingsPercent": 78,
    "locationPrices": [
      {
        "amount": 4000,
        "maxAmount": 6000,
        "range": "$4,000 \u2013 $6,000",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 18000,
        "maxAmount": 45000,
        "range": "$18,000 \u2013 $45,000",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 18000,
        "maxAmount": 35000,
        "range": "$18,000 \u2013 $35,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 27000,
        "maxAmount": 29000,
        "range": "$27,000 \u2013 $29,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 12000,
        "maxAmount": 25000,
        "range": "$12,000 \u2013 $25,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 20000,
        "maxAmount": 40000,
        "range": "$20,000 \u2013 $40,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 16000,
        "maxAmount": 34000,
        "range": "$16,000 \u2013 $34,000",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 3500,
        "maxAmount": 7000,
        "range": "$3,500 \u2013 $7,000",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "heart-valve-replacement": {
    "slug": "heart-valve-replacement",
    "title": "Heart Valve Replacement & Repair",
    "priceFrom": 8000,
    "priceTo": 11000,
    "priceRange": "$8,000 \u2013 $11,000",
    "savingsPercent": 60,
    "locationPrices": [
      {
        "amount": 8000,
        "maxAmount": 11000,
        "range": "$8,000 \u2013 $11,000",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 20000,
        "maxAmount": 48000,
        "range": "$20,000 \u2013 $48,000",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 18000,
        "maxAmount": 40000,
        "range": "$18,000 \u2013 $40,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 23000,
        "maxAmount": 26000,
        "range": "$23,000 \u2013 $26,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 14000,
        "maxAmount": 30000,
        "range": "$14,000 \u2013 $30,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 22000,
        "maxAmount": 45000,
        "range": "$22,000 \u2013 $45,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 17500,
        "maxAmount": 36000,
        "range": "$17,500 \u2013 $36,000",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 4500,
        "maxAmount": 9000,
        "range": "$4,500 \u2013 $9,000",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  },
  "pacemaker-aicd-implantation": {
    "slug": "pacemaker-aicd-implantation",
    "title": "Cardiac Pacemaker & AICD Implantation",
    "priceFrom": 8000,
    "priceTo": 18000,
    "priceRange": "$8,000 \u2013 $18,000",
    "savingsPercent": 56,
    "locationPrices": [
      {
        "amount": 8000,
        "maxAmount": 18000,
        "range": "$8,000 \u2013 $18,000",
        "isPrimary": true,
        "market": "India",
        "flagCode": "in",
        "currencyCode": "USD"
      },
      {
        "amount": 18000,
        "maxAmount": 36000,
        "range": "$18,000 \u2013 $36,000",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "USD"
      },
      {
        "amount": 16000,
        "maxAmount": 38000,
        "range": "$16,000 \u2013 $38,000",
        "isPrimary": false,
        "market": "UAE",
        "flagCode": "ae",
        "currencyCode": "USD"
      },
      {
        "amount": 10000,
        "maxAmount": 22000,
        "range": "$10,000 \u2013 $22,000",
        "isPrimary": false,
        "market": "Turkey",
        "flagCode": "tr",
        "currencyCode": "USD"
      },
      {
        "amount": 12000,
        "maxAmount": 28000,
        "range": "$12,000 \u2013 $28,000",
        "isPrimary": false,
        "market": "Thailand",
        "flagCode": "th",
        "currencyCode": "USD"
      },
      {
        "amount": 18000,
        "maxAmount": 42000,
        "range": "$18,000 \u2013 $42,000",
        "isPrimary": false,
        "market": "Germany",
        "flagCode": "de",
        "currencyCode": "USD"
      },
      {
        "amount": 15000,
        "maxAmount": 30000,
        "range": "$15,000 \u2013 $30,000",
        "isPrimary": false,
        "market": "Oman",
        "flagCode": "om",
        "currencyCode": "USD"
      },
      {
        "amount": 7000,
        "maxAmount": 16000,
        "range": "$7,000 \u2013 $16,000",
        "isPrimary": false,
        "market": "Egypt",
        "flagCode": "eg",
        "currencyCode": "USD"
      }
    ]
  }
};
