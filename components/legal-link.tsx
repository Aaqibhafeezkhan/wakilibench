"use client";

const CONSTITUTION_URL =
  "https://new.kenyalaw.org/akn/ke/act/2010/constitution/eng@2010-09-03/source";

const LAW_OF_CONTRACT_URL =
  "https://new.kenyalaw.org/akn/ke/act/1960/43/eng@2022-12-31/source";

interface CitationPattern {
  regex: RegExp;
  url: string;
}

interface CitationMatch {
  start: number;
  end: number;
  text: string;
  url: string;
}

interface Props {
  text: string;
}

const CITATION_PATTERNS: CitationPattern[] = [
  {
    regex:
      /\bArticle\s+\d+(?:\s*\(\d+\))?\s*,?\s*(?:of\s+)?(?:the\s+)?Constitution(?:\s+of\s+Kenya)?(?:,?\s+2010)?/gi,
    url: CONSTITUTION_URL,
  },
  {
    regex:
      /\b(?:Sections?\s+\d+(?:\(\d+\))?\s+(?:of\s+)?(?:the\s+)?)?Law of Contract Act(?:\s*,?\s*\(?\s*Cap\.?\s*23\s*\)?)?/gi,
    url: LAW_OF_CONTRACT_URL,
  },
  {
    regex:
      /Kenya Revenue Authority v Export Trading Company Limited\s+\[2020\]\s+KECA\s+251\s+\(KLR\)/gi,
    url: "https://new.kenyalaw.org/akn/ke/judgment/keca/2020/251",
  },
  {
    regex: /Onsongo v Republic\s+\[2022\]\s+KECA\s+1181\s+\(KLR\)/gi,
    url: "https://new.kenyalaw.org/akn/ke/judgment/keca/2022/1181",
  },
  {
    regex:
      /Kenya National Commission for Unesco\s+&\s+another v Cabinet Secretary for Education\s+&\s+2 others;\s+Lentoijoni\s+&\s+2 others\s+\(Interested Parties\)\s+\[2024\]\s+KECA\s+67\s+\(KLR\)/gi,
    url: "https://new.kenyalaw.org/akn/ke/judgment/keca/2024/67",
  },
];

export function LegalLinkedText({ text }: Props) {
  const matches: CitationMatch[] = [];

  for (const pattern of CITATION_PATTERNS) {
    pattern.regex.lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.regex.exec(text)) !== null) {
      if (match.index !== undefined) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          text: match[0],
          url: pattern.url,
        });
      }

      if (match[0].length === 0) {
        pattern.regex.lastIndex += 1;
      }
    }
  }

  if (matches.length === 0) {
    return <span className="whitespace-pre-wrap">{text}</span>;
  }

  matches.sort((a, b) => a.start - b.start || b.end - a.end);

  const nonOverlapping: CitationMatch[] = [];
  let lastEnd = 0;

  for (const match of matches) {
    if (match.start < lastEnd) continue;
    nonOverlapping.push(match);
    lastEnd = match.end;
  }

  const parts = [];
  let cursor = 0;

  for (const [index, match] of nonOverlapping.entries()) {
    if (cursor < match.start) {
      parts.push(text.slice(cursor, match.start));
    }

    parts.push(
      <a
        key={"legal-link-" + index}
        href={match.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--wb-yellow)] hover:underline"
        title="View source on Kenya Law"
      >
        {match.text}
      </a>
    );
    cursor = match.end;
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return <span className="whitespace-pre-wrap">{parts}</span>;
}
