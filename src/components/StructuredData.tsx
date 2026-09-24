import { getTranslations } from 'next-intl/server';

const SITE_URL = 'https://www.alcazabadealmeria.com';
const OG_IMAGE =
  '/gallery/conjunto-monumental-de-la-alcazaba-de-almeria%20(1).jpg';

export default async function StructuredData({ locale }: { locale: string }) {
  const tIntro = await getTranslations({ locale, namespace: 'intro' });
  const tFaq = await getTranslations({ locale, namespace: 'faq' });
  const tBasic = await getTranslations({ locale, namespace: 'basicInfo' });

  const faqItems = tFaq.raw('items') as {
    question: string;
    answer: string;
  }[];

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['TouristAttraction', 'LandmarksOrHistoricalBuildings', 'Place'],
        '@id': `${SITE_URL}/#attraction`,
        name: tBasic('officialNameValue'),
        description: tIntro('description'),
        url: `${SITE_URL}/${locale}`,
        image: `${SITE_URL}${OG_IMAGE}`,
        telephone: tBasic('phoneValue'),
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'C. Almanzor, s/n',
          addressLocality: 'Almería',
          postalCode: '04002',
          addressRegion: 'Andalusia',
          addressCountry: 'ES',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 36.8386,
          longitude: -2.4595,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.6',
          reviewCount: '16223',
        },
        sameAs: [
          'https://www.alcazabadealmeria.com/',
          'https://maps.app.goo.gl/MWYBp4WMmkk3NWgR7',
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
