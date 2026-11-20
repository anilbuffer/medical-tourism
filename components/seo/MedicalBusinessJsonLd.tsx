// Server component — renders JSON-LD directly into <head> with zero client JS.
// @type MedicalOrganization: correct Schema.org type for a medical travel facilitator
// (not MedicalBusiness which is for a clinic/practice that directly provides treatment).
const schema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  '@id': 'https://www.yourmedicaretrip.com/#organization',
  name: 'Your Medicare Trip',
  url: 'https://www.yourmedicaretrip.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.yourmedicaretrip.com/favicon.svg',
  },
  image: 'https://www.yourmedicaretrip.com/images/hero/airport.jpg',
  description:
    'Medical travel facilitation service connecting international patients with JCI- and NABH-accredited hospital partners in Mohali, India. Services include surgery coordination, specialist consultations, private recovery suites, and 24/7 concierge care.',
  email: 'care@yourmedicaretrip.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mohali',
    addressRegion: 'Punjab',
    addressCountry: 'IN',
  },
  areaServed: [
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'Country', name: 'Saudi Arabia' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'India' },
  ],
  medicalSpecialty: [
    'Orthopedic',
    'Cardiovascular',
    'PlasticSurgery',
    'Dentistry',
    'Ophthalmology',
    'Obstetrics',
  ],
  sameAs: [
    'https://www.yourmedicaretrip.com',
  ],
};

export function MedicalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
