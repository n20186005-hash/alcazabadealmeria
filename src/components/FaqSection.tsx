'use client';

import { useTranslations } from 'next-intl';

export default function FaqSection() {
  const t = useTranslations('faq');
  const items = t.raw('items') as { question: string; answer: string }[];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="flex flex-col gap-4">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl p-5"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <summary
                className="cursor-pointer flex items-center justify-between gap-4 font-medium text-lg"
                style={{ color: 'var(--text-primary)', listStyle: 'none' }}
              >
                <span>{item.question}</span>
                <span
                  className="text-2xl leading-none transition-transform group-open:rotate-45"
                  style={{ color: 'var(--accent)' }}
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
