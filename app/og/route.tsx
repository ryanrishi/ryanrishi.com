import { ImageResponse } from 'next/og'

import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/metadata'

const clamp = (value: string, max: number) => value.length > max ? `${value.slice(0, max - 1)}…` : value

export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = clamp(searchParams.get('title') ?? SITE_NAME, 100)
  const subtitle = clamp(searchParams.get('subtitle') ?? SITE_DESCRIPTION, 200)

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0f172a',
          padding: '90px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              backgroundColor: '#D33A2C',
              marginRight: 24,
            }}
          />
          <div
            style={{
              fontSize: 30,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#D33A2C',
            }}
          >
            ryanrishi.com
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#f8fafc',
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ display: 'flex', fontSize: 34, color: '#94a3b8', marginTop: 28 }}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
