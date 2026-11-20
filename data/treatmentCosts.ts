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
    "savingsPercent": 72,
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
        "amount": 10667,
        "maxAmount": 10667,
        "range": "40,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 3580,
        "maxAmount": 3580,
        "range": "435,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 17920,
        "maxAmount": 17920,
        "range": "\u00a314,000",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 16250,
        "maxAmount": 16250,
        "range": "A$25,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 5000,
        "maxAmount": 5000,
        "range": "$5,000 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 46,
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
        "amount": 11200,
        "maxAmount": 11200,
        "range": "42,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 4115,
        "maxAmount": 4115,
        "range": "500,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 17280,
        "maxAmount": 17280,
        "range": "\u00a313,500",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 16250,
        "maxAmount": 16250,
        "range": "A$25,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 5500,
        "maxAmount": 5500,
        "range": "$5,500 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
        "maxAmount": 4000,
        "range": "15,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 1852,
        "maxAmount": 1852,
        "range": "225,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 8960,
        "maxAmount": 8960,
        "range": "\u00a37,000",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 6500,
        "maxAmount": 6500,
        "range": "A$10,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 2500,
        "maxAmount": 2500,
        "range": "$2,500 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 61,
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
        "amount": 17867,
        "maxAmount": 17867,
        "range": "67,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 3580,
        "maxAmount": 3580,
        "range": "435,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 20480,
        "maxAmount": 20480,
        "range": "\u00a316,000",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 18200,
        "maxAmount": 18200,
        "range": "A$28,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 5000,
        "maxAmount": 5000,
        "range": "$5,000 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 46,
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
        "amount": 13067,
        "maxAmount": 13067,
        "range": "49,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 3086,
        "maxAmount": 3086,
        "range": "375,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 12800,
        "maxAmount": 12800,
        "range": "\u00a310,000",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 9750,
        "maxAmount": 9750,
        "range": "A$15,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 4500,
        "maxAmount": 4500,
        "range": "$4,500 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 88,
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
        "amount": 4000,
        "maxAmount": 4000,
        "range": "15,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 1852,
        "maxAmount": 1852,
        "range": "225,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 7680,
        "maxAmount": 7680,
        "range": "\u00a36,000",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 7800,
        "maxAmount": 7800,
        "range": "A$12,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 2000,
        "maxAmount": 2000,
        "range": "$2,000 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 72,
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
        "amount": 5333,
        "maxAmount": 5333,
        "range": "20,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 2881,
        "maxAmount": 2881,
        "range": "350,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 7040,
        "maxAmount": 7040,
        "range": "\u00a35,500",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 7150,
        "maxAmount": 7150,
        "range": "A$11,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 3000,
        "maxAmount": 3000,
        "range": "$3,000 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 62,
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
        "amount": 3200,
        "maxAmount": 3200,
        "range": "12,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 1235,
        "maxAmount": 1235,
        "range": "150,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 5760,
        "maxAmount": 5760,
        "range": "\u00a34,500",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 6500,
        "maxAmount": 6500,
        "range": "A$10,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 1500,
        "maxAmount": 1500,
        "range": "$1,500 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
        "maxAmount": 4000,
        "range": "15,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 1646,
        "maxAmount": 1646,
        "range": "200,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 5760,
        "maxAmount": 5760,
        "range": "\u00a34,500",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 4550,
        "maxAmount": 4550,
        "range": "A$7,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 2000,
        "maxAmount": 2000,
        "range": "$2,000 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 93,
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
        "amount": 6667,
        "maxAmount": 6667,
        "range": "25,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 2469,
        "maxAmount": 2469,
        "range": "300,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 8320,
        "maxAmount": 8320,
        "range": "\u00a36,500",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 9750,
        "maxAmount": 9750,
        "range": "A$15,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 3000,
        "maxAmount": 3000,
        "range": "$3,000 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 88,
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
        "amount": 2133,
        "maxAmount": 2133,
        "range": "8,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 412,
        "maxAmount": 412,
        "range": "50,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 3200,
        "maxAmount": 3200,
        "range": "\u00a32,500",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 2275,
        "maxAmount": 2275,
        "range": "A$3,500",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 700,
        "maxAmount": 700,
        "range": "$700 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 65,
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
        "amount": 1067,
        "maxAmount": 1067,
        "range": "4,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 412,
        "maxAmount": 412,
        "range": "50,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 1920,
        "maxAmount": 1920,
        "range": "\u00a31,500",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 1950,
        "maxAmount": 1950,
        "range": "A$3,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 600,
        "maxAmount": 600,
        "range": "$600 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
        "amount": 5333,
        "maxAmount": 5333,
        "range": "20,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 1029,
        "maxAmount": 1029,
        "range": "125,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 7616,
        "maxAmount": 7616,
        "range": "\u00a35,950",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 5200,
        "maxAmount": 5200,
        "range": "A$8,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 1800,
        "maxAmount": 1800,
        "range": "$1,800 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 93,
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
        "amount": 6667,
        "maxAmount": 6667,
        "range": "25,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 1029,
        "maxAmount": 1029,
        "range": "125,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 8960,
        "maxAmount": 8960,
        "range": "\u00a37,000",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 7800,
        "maxAmount": 7800,
        "range": "A$12,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 3000,
        "maxAmount": 3000,
        "range": "$3,000 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 69,
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
        "amount": 1600,
        "maxAmount": 1600,
        "range": "6,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 576,
        "maxAmount": 576,
        "range": "70,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 3200,
        "maxAmount": 3200,
        "range": "\u00a32,500",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 2925,
        "maxAmount": 2925,
        "range": "A$4,500",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 600,
        "maxAmount": 600,
        "range": "$600 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 94,
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
        "amount": 25067,
        "maxAmount": 25067,
        "range": "94,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 6584,
        "maxAmount": 6584,
        "range": "800,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 30720,
        "maxAmount": 30720,
        "range": "\u00a324,000",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 32500,
        "maxAmount": 32500,
        "range": "A$50,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 8000,
        "maxAmount": 8000,
        "range": "$8,000 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 90,
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
        "amount": 4800,
        "maxAmount": 4800,
        "range": "18,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 1646,
        "maxAmount": 1646,
        "range": "200,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 8960,
        "maxAmount": 8960,
        "range": "\u00a37,000",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 8450,
        "maxAmount": 8450,
        "range": "A$13,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 2500,
        "maxAmount": 2500,
        "range": "$2,500 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 12,
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
        "amount": 4800,
        "maxAmount": 4800,
        "range": "18,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 2469,
        "maxAmount": 2469,
        "range": "300,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 6400,
        "maxAmount": 6400,
        "range": "\u00a35,000",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 4550,
        "maxAmount": 4550,
        "range": "A$7,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 3000,
        "maxAmount": 3000,
        "range": "$3,000 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 72,
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
        "amount": 5333,
        "maxAmount": 5333,
        "range": "20,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 2881,
        "maxAmount": 2881,
        "range": "350,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 7680,
        "maxAmount": 7680,
        "range": "\u00a36,000",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 4875,
        "maxAmount": 4875,
        "range": "A$7,500",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 3500,
        "maxAmount": 3500,
        "range": "$3,500 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 33,
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
        "amount": 6667,
        "maxAmount": 6667,
        "range": "25,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 1646,
        "maxAmount": 1646,
        "range": "200,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 12800,
        "maxAmount": 12800,
        "range": "\u00a310,000",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 10400,
        "maxAmount": 10400,
        "range": "A$16,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 3000,
        "maxAmount": 3000,
        "range": "$3,000 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 75,
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
        "amount": 16000,
        "maxAmount": 16000,
        "range": "60,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 4115,
        "maxAmount": 4115,
        "range": "500,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 28160,
        "maxAmount": 28160,
        "range": "\u00a322,000",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 28600,
        "maxAmount": 28600,
        "range": "A$44,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 6000,
        "maxAmount": 6000,
        "range": "$6,000 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 54,
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
        "amount": 17333,
        "maxAmount": 17333,
        "range": "65,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 4938,
        "maxAmount": 4938,
        "range": "600,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 35840,
        "maxAmount": 35840,
        "range": "\u00a328,000",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 33800,
        "maxAmount": 33800,
        "range": "A$52,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 7000,
        "maxAmount": 7000,
        "range": "$7,000 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
    "savingsPercent": 14,
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
        "amount": 9333,
        "maxAmount": 9333,
        "range": "35,000 SAR",
        "isPrimary": false,
        "market": "Saudi Arabia",
        "flagCode": "sa",
        "currencyCode": "SAR"
      },
      {
        "amount": 1811,
        "maxAmount": 1811,
        "range": "220,000 BDT",
        "isPrimary": false,
        "market": "Bangladesh",
        "flagCode": "bd",
        "currencyCode": "BDT"
      },
      {
        "amount": 9600,
        "maxAmount": 9600,
        "range": "\u00a37,500",
        "isPrimary": false,
        "market": "UK",
        "flagCode": "gb",
        "currencyCode": "GBP"
      },
      {
        "amount": 10400,
        "maxAmount": 10400,
        "range": "A$16,000",
        "isPrimary": false,
        "market": "Australia",
        "flagCode": "au",
        "currencyCode": "AUD"
      },
      {
        "amount": 3500,
        "maxAmount": 3500,
        "range": "$3,500 USD",
        "isPrimary": false,
        "market": "Iraq",
        "flagCode": "iq",
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
