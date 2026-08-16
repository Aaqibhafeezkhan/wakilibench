"use client";

/**
 * Renders text with Kenya Law links for detected legal citations.
 * Detects patterns like "Section X, ... Act (Cap Y)" and "Article X, Constitution"
 * and wraps them in links to kenyalaw.org.
 */

const KENYA_LAW_BASE = "https://new.kenyalaw.org";

const CITATION_PATTERNS = [
  {
    // "Section 73, Law of Contract Act (Cap 23)"
    regex: /(Section\s+\d+(?:\(\d+\))?[^.]*?Cap\.?\s*(\d+)\))/gi,
    url: (match: string, cap: string) =>
      `${KENYA_LAW_BASE}/akn/ke/act/cap${cap}/eng@latest`,
  },
  {
    // "Article 47, Constitution of Kenya"
    regex: /(Article\s+(\d+)(?:\(\d+\))?[^.]*?Constitution[^.]*)/gi,
    url: () =>
      `${KENYA_LAW_BASE}/akn/ke/act/2010/constitution/eng@latest`,
  },
  {
    // "[2019] KECA 432 (KLR)" style citations
    regex: /(\[\d{4}\]\s+KE\w+\s+\d+\s*\(KLR\))/gi,
    url: () => `https://new.kenyalaw.org`,
  },
];

interface Props {
  text: string;
}

export function LegalLinkedText({ text }: Props) {
  let processed = text;

  // Replace citations with linked versions using markers
  const links: { marker: string; url: string; text: string }[] = [];

  for (const pattern of CITATION_PATTERNS) {
    processed = processed.replace(pattern.regex, (match, p1, p2) => {
      const marker = `__LINK_${links.length}__`;
      const url = pattern.url(match, p2 || p1);
      links.push({ marker, url, text: match });
      return marker;
    });
  }

  if (links.length === 0) {
    return <span className="whitespace-pre-wrap">{text}</span>;
  }

  // Split by markers and reconstruct with links
  const parts: (string | { url: string; text: string })[] = [];
  let remaining = processed;

  for (const link of links) {
    const idx = remaining.indexOf(link.marker);
    if (idx >= 0) {
      if (idx > 0) parts.push(remaining.slice(0, idx));
      parts.push({ url: link.url, text: link.text });
      remaining = remaining.slice(idx + link.marker.length);
    }
  }
  if (remaining) parts.push(remaining);

  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <span key={i}>{part}</span>
        ) : (
          <a
            key={i}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--wb-yellow)] hover:underline"
            title="View on Kenya Law"
          >
            {part.text}
          </a>
        )
      )}
    </span>
  );
}
