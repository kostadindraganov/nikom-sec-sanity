'use client'

import React, { useState, useEffect } from 'react'
import { Icons } from '@/app/components/nikom/icons'
import { StreamText } from '@/app/components/nikom/animations'
import { dataAttr } from '@/sanity/lib/utils'

type Props = {
  block: {
    _key?: string
    eyebrow?: string
    heading?: string
    lead?: string
    phone?: string
    phoneDisplay?: string
    email?: string
  }
  index: number
  pageId: string
  pageType: string
}

/* ── Animated ringing phone SVG ── */
function RingingPhone() {
  const [bubble, setBubble] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setBubble(b => (b + 1) % 7), 1300)
    return () => clearInterval(t)
  }, [])

  return (
    <svg viewBox="0 0 360 420" className="ring-phone-svg">
      <defs>
        <radialGradient id="phGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--accent)" stopOpacity=".5"/>
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="phBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#262C36"/>
          <stop offset="1" stopColor="#0E1116"/>
        </linearGradient>
        <linearGradient id="phScreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0B1018"/>
          <stop offset="1" stopColor="#13191F"/>
        </linearGradient>
      </defs>

      {/* faint backdrop grid */}
      <g stroke="color-mix(in oklab, var(--accent) 12%, transparent)" strokeWidth=".5" opacity=".6">
        {Array.from({length:10}).map((_,i)=>(<line key={"v"+i} x1={i*40} x2={i*40} y1="0" y2="420"/>))}
        {Array.from({length:11}).map((_,i)=>(<line key={"h"+i} y1={i*40} y2={i*40} x1="0" x2="360"/>))}
      </g>

      {/* glow halo */}
      <circle cx="180" cy="220" r="140" fill="url(#phGlow)">
        <animate attributeName="r" values="120;160;120" dur="2.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".55;.15;.55" dur="2.6s" repeatCount="indefinite"/>
      </circle>

      {/* scan rings */}
      <g fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity=".55">
        <ellipse cx="180" cy="220" rx="80" ry="120">
          <animate attributeName="rx" values="70;110;70" dur="2.4s" repeatCount="indefinite"/>
          <animate attributeName="ry" values="110;150;110" dur="2.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values=".55;0;.55" dur="2.4s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="180" cy="220" rx="80" ry="120">
          <animate attributeName="rx" values="70;110;70" dur="2.4s" begin="-1.2s" repeatCount="indefinite"/>
          <animate attributeName="ry" values="110;150;110" dur="2.4s" begin="-1.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values=".55;0;.55" dur="2.4s" begin="-1.2s" repeatCount="indefinite"/>
        </ellipse>
      </g>

      {/* Smartphone body */}
      <g transform="translate(112 92)">
        <animateTransform attributeName="transform" type="translate"
          values="112,92; 112,86; 112,92"
          dur="4s" repeatCount="indefinite"/>
        <ellipse cx="68" cy="260" rx="80" ry="8" fill="#000" opacity=".5"/>
        <rect x="0" y="0" width="136" height="256" rx="22" fill="url(#phBody)"
          stroke="rgba(247,215,36,.35)" strokeWidth="1.4"/>
        <rect x="6" y="6" width="124" height="244" rx="18" fill="url(#phScreen)"/>
        <rect x="48" y="12" width="40" height="10" rx="5" fill="#000"/>
        <text x="18" y="32" fontFamily="JetBrains Mono" fontSize="7.5" fill="rgba(255,255,255,.7)" fontWeight="600">9:41</text>
        <g transform="translate(106 26)">
          <rect x="0" y="0" width="14" height="6" rx="1.2" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth=".8"/>
          <rect x="1" y="1" width="10" height="4" rx=".6" fill="rgba(255,255,255,.7)"/>
        </g>
        <g transform="translate(14 44)">
          <rect x="0" y="0" width="108" height="22" rx="6" fill="var(--accent)" opacity=".15"/>
          <circle cx="11" cy="11" r="6" fill="var(--accent)"/>
          <text x="11" y="14" textAnchor="middle" fontFamily="Geologica" fontSize="7" fontWeight="700" fill="var(--accent-ink)">N</text>
          <text x="22" y="10" fontFamily="Geologica" fontSize="7.5" fontWeight="600" fill="#F5F2EB">NIKOM Security</text>
          <text x="22" y="18" fontFamily="JetBrains Mono" fontSize="5.5" fill="var(--accent)">● Online · отговаря веднага</text>
        </g>
        <g transform="translate(14 74)">
          <g className="ph-msg" style={{opacity: bubble >= 0 ? 1 : 0}}>
            <rect x="18" y="0" width="90" height="24" rx="6" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.06)"/>
            <text x="63" y="10" textAnchor="middle" fontFamily="Geologica" fontSize="5.5" fill="#F5F2EB">Здравейте! Искам</text>
            <text x="63" y="19" textAnchor="middle" fontFamily="Geologica" fontSize="5.5" fill="#F5F2EB">видеонаблюдение.</text>
          </g>
          <g transform="translate(0 30)" style={{opacity: bubble === 1 ? 1 : 0}}>
            <rect x="0" y="0" width="34" height="14" rx="6" fill="var(--accent)" opacity=".85"/>
            <circle cx="10" cy="7" r="1.5" fill="var(--accent-ink)"><animate attributeName="opacity" values=".3;1;.3" dur=".9s" repeatCount="indefinite"/></circle>
            <circle cx="17" cy="7" r="1.5" fill="var(--accent-ink)"><animate attributeName="opacity" values=".3;1;.3" dur=".9s" begin="-.3s" repeatCount="indefinite"/></circle>
            <circle cx="24" cy="7" r="1.5" fill="var(--accent-ink)"><animate attributeName="opacity" values=".3;1;.3" dur=".9s" begin="-.6s" repeatCount="indefinite"/></circle>
          </g>
          <g transform="translate(0 30)" style={{opacity: bubble >= 2 ? 1 : 0}}>
            <rect x="0" y="0" width="62" height="14" rx="6" fill="var(--accent)"/>
            <text x="31" y="9.5" textAnchor="middle" fontFamily="Geologica" fontSize="5.5" fill="var(--accent-ink)" fontWeight="600">Няма проблем.</text>
          </g>
          <g style={{opacity: bubble >= 3 ? 1 : 0}}>
            <rect x="44" y="50" width="64" height="14" rx="6" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.06)"/>
            <text x="76" y="59.5" textAnchor="middle" fontFamily="Geologica" fontSize="5.5" fill="#F5F2EB">И сигурност?</text>
          </g>
          <g transform="translate(0 70)" style={{opacity: bubble === 4 ? 1 : 0}}>
            <rect x="0" y="0" width="34" height="14" rx="6" fill="var(--accent)" opacity=".85"/>
            <circle cx="10" cy="7" r="1.5" fill="var(--accent-ink)"><animate attributeName="opacity" values=".3;1;.3" dur=".9s" repeatCount="indefinite"/></circle>
            <circle cx="17" cy="7" r="1.5" fill="var(--accent-ink)"><animate attributeName="opacity" values=".3;1;.3" dur=".9s" begin="-.3s" repeatCount="indefinite"/></circle>
            <circle cx="24" cy="7" r="1.5" fill="var(--accent-ink)"><animate attributeName="opacity" values=".3;1;.3" dur=".9s" begin="-.6s" repeatCount="indefinite"/></circle>
          </g>
          <g transform="translate(0 70)" style={{opacity: bubble >= 5 ? 1 : 0}}>
            <rect x="0" y="0" width="92" height="14" rx="6" fill="var(--accent)"/>
            <text x="46" y="9.5" textAnchor="middle" fontFamily="Geologica" fontSize="5.5" fill="var(--accent-ink)" fontWeight="600">Идваме веднага ✓</text>
          </g>
        </g>
        <g transform="translate(14 222)">
          <rect x="0" y="0" width="108" height="16" rx="8" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.08)"/>
          <text x="8" y="10.5" fontFamily="Geologica" fontSize="6" fill="rgba(255,255,255,.4)">Напишете съобщение…</text>
          <circle cx="100" cy="8" r="5" fill="var(--accent)"/>
          <path d="M 98 6 L 102 8 L 98 10 Z" fill="var(--accent-ink)"/>
        </g>
        <rect x="48" y="244" width="40" height="3" rx="1.5" fill="rgba(255,255,255,.4)"/>
        <rect x="-2" y="60" width="2" height="18" rx="1" fill="#1A1F28"/>
        <rect x="-2" y="86" width="2" height="32" rx="1" fill="#1A1F28"/>
        <rect x="136" y="74" width="2" height="40" rx="1" fill="#1A1F28"/>
      </g>

      {/* Floating chat bubbles */}
      <g>
        <g transform="translate(36 90)" style={{opacity: 0.95}}>
          <animateTransform attributeName="transform" type="translate"
            values="36,90; 36,80; 36,90" dur="3.2s" repeatCount="indefinite"/>
          <rect x="0" y="0" width="72" height="28" rx="14" fill="var(--accent)" stroke="rgba(26,19,0,.2)" strokeWidth="1"/>
          <circle cx="-2" cy="22" r="5" fill="var(--accent)"/>
          <text x="36" y="18" textAnchor="middle" fontFamily="Geologica" fontSize="10" fontWeight="600" fill="var(--accent-ink)">Здравейте!</text>
        </g>
        <g transform="translate(228 58)" style={{opacity: 0.95}}>
          <animateTransform attributeName="transform" type="translate"
            values="228,58; 228,50; 228,58" dur="3.6s" begin="-1.2s" repeatCount="indefinite"/>
          <rect x="0" y="0" width="108" height="28" rx="14" fill="#1A1F28" stroke="rgba(247,215,36,.55)" strokeWidth="1"/>
          <circle cx="110" cy="22" r="5" fill="#1A1F28" stroke="rgba(247,215,36,.55)" strokeWidth="1"/>
          <text x="54" y="18" textAnchor="middle" fontFamily="Geologica" fontSize="10" fontWeight="600" fill="#F5F2EB">Видеонаблюдение</text>
        </g>
        <g transform="translate(258 290)" style={{opacity: 0.95}}>
          <animateTransform attributeName="transform" type="translate"
            values="258,290; 258,282; 258,290" dur="3.8s" begin="-0.5s" repeatCount="indefinite"/>
          <rect x="0" y="0" width="72" height="28" rx="14" fill="var(--accent)" stroke="rgba(26,19,0,.2)" strokeWidth="1"/>
          <circle cx="74" cy="22" r="5" fill="var(--accent)"/>
          <text x="36" y="18" textAnchor="middle" fontFamily="Geologica" fontSize="10" fontWeight="600" fill="var(--accent-ink)">Сигурност</text>
        </g>
        <g transform="translate(28 280)" style={{opacity: 0.85}}>
          <animateTransform attributeName="transform" type="translate"
            values="28,280; 28,272; 28,280" dur="4.2s" begin="-1.8s" repeatCount="indefinite"/>
          <rect x="0" y="0" width="48" height="22" rx="11" fill="#1A1F28" stroke="rgba(247,215,36,.5)" strokeWidth="1"/>
          <circle cx="6" cy="9" r="1.5" fill="var(--accent)">
            <animate attributeName="opacity" values=".3;1;.3" dur=".8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="13" cy="9" r="1.5" fill="var(--accent)">
            <animate attributeName="opacity" values=".3;1;.3" dur=".8s" begin="-.27s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="9" r="1.5" fill="var(--accent)">
            <animate attributeName="opacity" values=".3;1;.3" dur=".8s" begin="-.54s" repeatCount="indefinite"/>
          </circle>
        </g>
      </g>

      {/* Corner brackets */}
      <g stroke="color-mix(in oklab, var(--accent) 65%, transparent)" strokeWidth="1.5" fill="none">
        <path d="M14 30 L14 14 L30 14"/>
        <path d="M330 14 L346 14 L346 30"/>
        <path d="M346 390 L346 406 L330 406"/>
        <path d="M30 406 L14 406 L14 390"/>
      </g>

      <text x="180" y="22" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="var(--accent)" letterSpacing="0.14em">● LIVE CHAT · NIKOM-API-01</text>
      <text x="180" y="416" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(247,215,36,.6)" letterSpacing="0.12em">RESPONSE TIME · &lt; 4H</text>
    </svg>
  )
}

function OfficeStatus() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(t)
  }, [])
  const day = now.getDay()
  const hour = now.getHours()
  const isWeekday = day >= 1 && day <= 5
  const isOpen = isWeekday && hour >= 9 && hour < 18
  return (
    <div className={"ctc-quick-v " + (isOpen ? "ctc-status-open" : "ctc-status-closed")}>
      {isOpen ? "Офисът е отворен" : "Сервиз 24/7"}
    </div>
  )
}

export default function ContactHero({ block, index, pageId, pageType }: Props) {
  const path = (field: string) =>
    dataAttr({ id: pageId, type: pageType, path: `pageBuilder[_key=="${block._key}"].${field}` }).toString()

  const phone = block?.phone ?? '+359894523970'
  const phoneDisplay = block?.phoneDisplay ?? '+359 89 45 23 970'
  const email = block?.email ?? 'office@nikom-security.com'

  return (
    <section className="contact-hero">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-glow" />
      </div>
      <div className="container">
        <div className="ctc-hero-inner">
          <div className="ctc-hero-text">
            <div className="eyebrow" data-sanity={path('eyebrow')}>
              {block?.eyebrow ?? 'Контакт · Инженер на линия'}
            </div>
            <h1 className="h1 ctc-h1" data-sanity={path('heading')}>
              <StreamText text={block?.heading ?? 'Свържете се с нас за нов или съществуващ проект.'} />
            </h1>
            <p className="ctc-hero-lead" data-sanity={path('lead')}>
              {block?.lead ?? 'Дискретността и конфиденциалността са гарантирани. Ще споделим нашия опит накратко или в обширна консултация — както Ви е удобно.'}
            </p>
          </div>
          <div className="ctc-hero-phone" aria-hidden="true">
            <RingingPhone />
          </div>
        </div>

        <div className="ctc-quick">
          <a href={`tel:${phone}`} className="ctc-quick-btn">
            <div className="ctc-quick-icon"><Icons.Phone /></div>
            <div>
              <div className="meta">Телефон</div>
              <div className="ctc-quick-v" data-sanity={path('phoneDisplay')}>{phoneDisplay}</div>
            </div>
          </a>
          <a href={`mailto:${email}`} className="ctc-quick-btn">
            <div className="ctc-quick-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <path d="M2 7l10 7L22 7"/>
              </svg>
            </div>
            <div>
              <div className="meta">Имейл</div>
              <div className="ctc-quick-v" data-sanity={path('email')}>{email}</div>
            </div>
          </a>
          <div className="ctc-quick-btn">
            <div className="ctc-quick-icon"><span className="status-dot"/></div>
            <div>
              <div className="meta">Статус</div>
              <OfficeStatus />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
