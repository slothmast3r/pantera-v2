import type { GlobalConfig } from 'payload'

export const AnalyticsSettings: GlobalConfig = {
  slug: 'analytics-settings',
  label: 'Google Analytics',
  admin: {
    group: 'Ustawienia',
    description:
      'Konfiguracja integracji z Google Analytics 4. Dane wyświetlają się na dashboardzie panelu admina.',
  },
  fields: [
    {
      name: 'propertyId',
      label: 'Property ID',
      type: 'text',
      admin: {
        description:
          'Numeryczne ID właściwości GA4, np. 123456789. Znajdziesz je w GA4: Admin → Właściwość → ID właściwości.',
        placeholder: '123456789',
      },
    },
    {
      name: 'serviceAccountEmail',
      label: 'Service Account Email',
      type: 'text',
      admin: {
        description:
          'Adres email service account z Google Cloud, np. my-account@project.iam.gserviceaccount.com. Service account musi mieć dostęp Viewer do właściwości GA4.',
        placeholder: 'my-account@my-project.iam.gserviceaccount.com',
      },
    },
    {
      name: 'privateKey',
      label: 'Klucz prywatny (Private Key)',
      type: 'textarea',
      admin: {
        description:
          'Klucz prywatny z pliku JSON service account (pole "private_key"). Zaczyna się od -----BEGIN PRIVATE KEY-----.',
      },
    },
  ],
}
