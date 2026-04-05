import { getPayload } from 'payload'
import config from '@payload-config'
import { BetaAnalyticsDataClient } from '@google-analytics/data'

type TopPage = { path: string; views: string }

type AnalyticsData = {
  users: string
  sessions: string
  pageviews: string
  avgSession: string
  topPages: TopPage[]
  error?: string
}

function formatDuration(seconds: string): string {
  const s = Math.round(parseFloat(seconds) || 0)
  if (s < 60) return `${s}s`
  return `${Math.floor(s / 60)}m ${s % 60}s`
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })
}

function formatNumber(n: string): string {
  return parseInt(n || '0', 10).toLocaleString('pl-PL')
}

async function fetchAnalytics(
  propertyId: string,
  clientEmail: string,
  privateKey: string,
): Promise<AnalyticsData> {
  try {
    const client = new BetaAnalyticsDataClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
    })

    const [[metricsRes], [pagesRes]] = await Promise.all([
      client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'averageSessionDuration' },
        ],
      }),
      client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 5,
      }),
    ])

    const row = metricsRes?.rows?.[0]?.metricValues ?? []
    return {
      users: row[0]?.value ?? '0',
      sessions: row[1]?.value ?? '0',
      pageviews: row[2]?.value ?? '0',
      avgSession: row[3]?.value ?? '0',
      topPages: (pagesRes?.rows ?? []).map((r: { dimensionValues?: Array<{ value?: string | null }> | null; metricValues?: Array<{ value?: string | null }> | null }) => ({
        path: r.dimensionValues?.[0]?.value ?? '',
        views: r.metricValues?.[0]?.value ?? '0',
      })),
    }
  } catch (e: unknown) {
    return {
      users: '—', sessions: '—', pageviews: '—', avgSession: '—', topPages: [],
      error: e instanceof Error ? e.message : 'Nieznany błąd',
    }
  }
}

export default async function DashboardStats() {
  const payload = await getPayload({ config })

  const [settings, upcomingResult] = await Promise.all([
    payload.findGlobal({ slug: 'analytics-settings' }).catch(() => null),
    payload.find({
      collection: 'events',
      where: {
        and: [
          { startDate: { greater_than: new Date().toISOString() } },
          { status: { not_equals: 'cancelled' } },
        ],
      },
      sort: 'startDate',
      limit: 5,
      depth: 0,
    }).catch(() => ({ docs: [] })),
  ])

  const upcomingEvents = upcomingResult.docs

  const isConfigured =
    settings &&
    'propertyId' in settings && settings.propertyId &&
    'serviceAccountEmail' in settings && settings.serviceAccountEmail &&
    'privateKey' in settings && settings.privateKey

  const analytics: AnalyticsData | null = isConfigured
    ? await fetchAnalytics(
        settings.propertyId as string,
        settings.serviceAccountEmail as string,
        settings.privateKey as string,
      )
    : null

  const card: React.CSSProperties = {
    background: 'var(--theme-elevation-100)',
    border: '1px solid var(--theme-border-color)',
    borderRadius: '6px',
    padding: '20px',
  }

  const metricCard: React.CSSProperties = {
    ...card,
    flex: '1 1 0',
    minWidth: 0,
  }

  return (
    <div style={{ marginBottom: '32px', fontFamily: 'inherit' }}>

      {/* ── Analytics row ───────────────────────────────────── */}
      <h3 style={{ margin: '0 0 12px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '.06em', opacity: .6 }}>
        Google Analytics — ostatnie 7 dni
      </h3>

      {!isConfigured ? (
        <div style={{ ...card, marginBottom: '24px' }}>
          <p style={{ margin: '0 0 8px', opacity: .7 }}>
            Integracja z Google Analytics nie jest skonfigurowana.
          </p>
          <a href="/admin/globals/analytics-settings" style={{ color: 'var(--theme-text)', fontWeight: 600, textDecoration: 'underline' }}>
            → Skonfiguruj Google Analytics
          </a>
        </div>
      ) : analytics?.error ? (
        <div style={{ ...card, marginBottom: '24px', borderColor: 'var(--color-error-500)' }}>
          <p style={{ margin: 0, color: 'var(--color-error-500)' }}>
            Błąd pobierania danych GA4: {analytics.error}
          </p>
        </div>
      ) : analytics ? (
        <>
          {/* Metric tiles */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
            {[
              { label: 'Użytkownicy', value: formatNumber(analytics.users) },
              { label: 'Sesje', value: formatNumber(analytics.sessions) },
              { label: 'Odsłony', value: formatNumber(analytics.pageviews) },
              { label: 'Śr. czas sesji', value: formatDuration(analytics.avgSession) },
            ].map(({ label, value }) => (
              <div key={label} style={metricCard}>
                <div style={{ fontSize: '11px', opacity: .6, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '.05em' }}>{label}</div>
                <div style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1 }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Top pages */}
          {analytics.topPages.length > 0 && (
            <div style={{ ...card, marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', opacity: .6, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '.05em' }}>Top strony</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <tbody>
                  {analytics.topPages.map((p) => (
                    <tr key={p.path} style={{ borderBottom: '1px solid var(--theme-border-color)' }}>
                      <td style={{ padding: '6px 0', fontFamily: 'monospace', fontSize: '13px' }}>{p.path}</td>
                      <td style={{ padding: '6px 0', textAlign: 'right', opacity: .7 }}>{formatNumber(p.views)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : null}

      {/* ── Bottom row: Events ──────────────────────────────── */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>

        {/* Upcoming events */}
        <div style={{ ...card, flex: '2 1 300px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', opacity: .6, textTransform: 'uppercase', letterSpacing: '.05em' }}>Nadchodzące wydarzenia</div>
            <a href="/admin/collections/events" style={{ fontSize: '12px', color: 'var(--theme-text)', opacity: .6, textDecoration: 'none' }}>
              Wszystkie →
            </a>
          </div>

          {upcomingEvents.length === 0 ? (
            <p style={{ margin: 0, opacity: .5, fontSize: '14px' }}>Brak nadchodzących wydarzeń.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {upcomingEvents.map((event) => (
                <a
                  key={event.id}
                  href={`/admin/collections/events/${event.id}`}
                  style={{ display: 'flex', gap: '12px', alignItems: 'center', textDecoration: 'none', color: 'inherit', padding: '6px 0', borderBottom: '1px solid var(--theme-border-color)' }}
                >
                  <span style={{ fontSize: '12px', opacity: .6, whiteSpace: 'nowrap', minWidth: '50px' }}>
                    {formatDate(event.startDate as string)}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{event.title}</span>
                  {event.location && (
                    <span style={{ fontSize: '12px', opacity: .5, marginLeft: 'auto', whiteSpace: 'nowrap' }}>
                      {event.location as string}
                    </span>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div style={{ ...card, flex: '1 1 180px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '12px', opacity: .6, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '2px' }}>Skróty</div>
          {[
            { label: '+ Nowe wydarzenie', href: '/admin/collections/events/create' },
            { label: '+ Nowa oferta', href: '/admin/collections/offers/create' },
            { label: '+ Nowe zajęcia', href: '/admin/collections/classes/create' },
            { label: '+ Nowe opinie', href: '/admin/collections/testimonials/create' },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                display: 'block',
                padding: '8px 12px',
                background: 'var(--theme-elevation-200)',
                border: '1px solid var(--theme-border-color)',
                borderRadius: '4px',
                fontSize: '13px',
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 500,
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
