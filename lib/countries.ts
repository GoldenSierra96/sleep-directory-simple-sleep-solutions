export const SUPPORTED_COUNTRIES = {
  uk: {
    name: 'United Kingdom',
    currency: 'GBP',
    flag: '🇬🇧',
    domain: '.co.uk',
    language: 'en-GB',
    locale: 'en-GB',
    timezone: 'Europe/London',
    shippingNote: 'Free delivery across the UK',
    vatIncluded: true,
    marketplace: {
      amazon: 'amazon.co.uk',
      ebay: 'ebay.co.uk',
    }
  },
  us: {
    name: 'United States',
    currency: 'USD',
    flag: '🇺🇸',
    domain: '.com',
    language: 'en-US',
    locale: 'en-US',
    timezone: 'America/New_York',
    shippingNote: 'Free shipping within the US',
    vatIncluded: false,
    marketplace: {
      amazon: 'amazon.com',
      ebay: 'ebay.com',
    }
  },
  ca: {
    name: 'Canada',
    currency: 'CAD',
    flag: '🇨🇦',
    domain: '.ca',
    language: 'en-CA',
    locale: 'en-CA',
    timezone: 'America/Toronto',
    shippingNote: 'Free shipping across Canada',
    vatIncluded: true,
    marketplace: {
      amazon: 'amazon.ca',
      ebay: 'ebay.ca',
    }
  },
  au: {
    name: 'Australia',
    currency: 'AUD',
    flag: '🇦🇺',
    domain: '.com.au',
    language: 'en-AU',
    locale: 'en-AU',
    timezone: 'Australia/Sydney',
    shippingNote: 'Free delivery across Australia',
    vatIncluded: true,
    marketplace: {
      amazon: 'amazon.com.au',
      ebay: 'ebay.com.au',
    }
  }
} as const

export type CountryCode = keyof typeof SUPPORTED_COUNTRIES
export type CountryData = typeof SUPPORTED_COUNTRIES[CountryCode]

export function getCountryData(code: string): CountryData | null {
  return SUPPORTED_COUNTRIES[code as CountryCode] || null
}

export function isValidCountryCode(code: string): code is CountryCode {
  return code in SUPPORTED_COUNTRIES
}

export function getAllCountryCodes(): CountryCode[] {
  return Object.keys(SUPPORTED_COUNTRIES) as CountryCode[]
}

// SEO helpers for country-specific content
export function getCountrySpecificMeta(countryCode: CountryCode, title: string, description: string) {
  const country = SUPPORTED_COUNTRIES[countryCode]
  
  return {
    title: `${title} | ${country.name} ${country.flag}`,
    description: `${description} Available in ${country.name} with local shipping.`,
    openGraph: {
      title: `${title} - ${country.name}`,
      description: `${description} Shop in ${country.currency}.`,
      locale: country.locale,
    },
    alternates: {
      canonical: `https://sleepdirectory.com/${countryCode}`,
      languages: {
        [country.language]: `https://sleepdirectory.com/${countryCode}`,
      }
    }
  }
} 