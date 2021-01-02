export function isGlossaryHeader(
    logLine: string,
): { id: string; title: string } | null {
    const match = logLine.match(/^(?<id>\d+) (?<title>[a-z\s]+)$/i);
    if (match) {
        return match.groups as { id: string; title: string };
    }
    return null;
}

export function isGlossaryEntry(
    logLine: string,
): { indexer: string; title?: string } | null {
    const match = logLine.match(/^(?<indexer>\d+\.\d+)\s*(?<title>.*)?/i);
    if (match) {
        return match.groups as { indexer: string; title?: string };
    }
    return null;
}

export function isRelatedTopics(logLine: string): boolean {
    return !!logLine.match(/^RELATED TOPICS:/);
}

export function isErrataHeader(logLine: string): boolean {
    return !!logLine.match(/^[A-Z\s]+$/);
}

export function isRuleType(logLine: string): boolean {
    return !!logLine.match(/(GLOSSARY)|(ERRATA)|(FAQ)/);
}

export function isErrataQA(logLine: string): boolean {
    return !!logLine.match(/Q: /);
}