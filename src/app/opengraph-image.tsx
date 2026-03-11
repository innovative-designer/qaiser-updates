import { ImageResponse } from 'next/og';

import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from '@/lib/constants';

export const alt = `${APP_NAME} — ${APP_TAGLINE}`;
export const contentType = 'image/png';
export const size = {
  width: 1200,
  height: 630,
};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'stretch',
          background:
            'linear-gradient(135deg, #f5ede0 0%, #ede0cb 52%, #d8c3a2 100%)',
          color: '#1f2937',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          padding: '56px',
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: '18px',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              background: '#1f4f4a',
              borderRadius: '28px',
              color: '#f8f6f2',
              display: 'flex',
              fontSize: 44,
              fontWeight: 800,
              height: 88,
              justifyContent: 'center',
              width: 88,
            }}
          >
            F
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em' }}>
              {APP_NAME}
            </div>
            <div
              style={{
                color: '#45615f',
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Mobile-first invoicing
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: 860,
          }}
        >
          <div
            style={{
              color: '#7b5d34',
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Free forever. No signup.
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 70,
              fontWeight: 800,
              letterSpacing: '-0.05em',
              lineHeight: 1.05,
            }}
          >
            Send a polished invoice before the chat goes cold.
          </div>
          <div
            style={{
              color: '#38504e',
              display: 'flex',
              fontSize: 28,
              lineHeight: 1.45,
              maxWidth: 820,
            }}
          >
            {APP_DESCRIPTION}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '18px',
          }}
        >
          {['Create PDF invoices', 'Share on WhatsApp', 'Works offline'].map((item) => (
            <div
              key={item}
              style={{
                alignItems: 'center',
                background: 'rgba(31, 79, 74, 0.08)',
                border: '2px solid rgba(31, 79, 74, 0.12)',
                borderRadius: '999px',
                color: '#1f4f4a',
                display: 'flex',
                fontSize: 22,
                fontWeight: 700,
                padding: '16px 24px',
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
