import {
    isGlossaryEntry,
    isGlossaryHeader,
    isErrataHeader,
    isRelatedTopics,
    isErrataQA,
    isRuleType,
    isGlobalEnd,
    isGlossarySubheader,
} from './matchers';
import { SectionDefinition } from '../taskTypes';

export const GlossaryHeaderMatcher: SectionDefinition<'glossary header'> = logLine => {
    const match = isGlossaryHeader(logLine);
    if (match) {
        return {
            type: 'glossary header',
            id: match.indexer,
            matchEnd: line =>
                Boolean(isGlobalEnd(line) || isGlossaryHeader(line)),
        };
    }
    return null;
};

export const GlossaryEntryMatcher: SectionDefinition<'glossary entry'> = logLine => {
    const match = isGlossaryEntry(logLine);
    if (match) {
        return {
            type: 'glossary entry',
            id: logLine,
            matchEnd: line =>
                Boolean(
                    isGlobalEnd(line) ||
                        isGlossarySubheader(line) ||
                        isGlossaryEntry(line) ||
                        isRelatedTopics(line),
                ),
        };
    }
    return null;
};

export const GlossarySubheaderMatcher: SectionDefinition<'glossary subheader'> = logLine => {
    const match = isGlossarySubheader(logLine);
    if (match) {
        return {
            type: 'glossary subheader',
            id: logLine,
            matchEnd: line =>
                Boolean(isGlossarySubheader(line) || isGlossaryHeader(line)),
        };
    }
    return null;
};

export const GlossaryRelatedTopicsMatcher: SectionDefinition<'related topics'> = logLine => {
    const match = isRelatedTopics(logLine);
    if (match) {
        return {
            type: 'related topics',
            id: `RELATED TOPICS`,
            matchEnd: line =>
                Boolean(isGlobalEnd(line) || isGlossaryHeader(line)),
        };
    }
    return null;
};

export const RuleTypeMatcher: SectionDefinition<'rule type'> = logLine => {
    const match = isRuleType(logLine);
    if (match) {
        return {
            type: 'rule type',
            id: logLine,
            matchEnd: line => Boolean(isGlobalEnd(line) || isRuleType(line)),
        };
    }
    return null;
};

export const ErrataSectionMatcher: SectionDefinition<'errata section'> = logLine => {
    const match = isErrataHeader(logLine);
    if (match) {
        return {
            type: 'errata section',
            id: logLine,
            matchEnd: line =>
                Boolean(isGlobalEnd(line) || isErrataHeader(line)),
        };
    }
    return null;
};
export const ErrataQAMAtcher: SectionDefinition<'errata qa'> = logLine => {
    const match = isErrataQA(logLine);
    if (match) {
        return {
            type: 'errata qa',
            id: logLine,
            matchEnd: line =>
                Boolean(
                    isGlobalEnd(line) ||
                        isErrataQA(line) ||
                        isErrataHeader(line),
                ),
        };
    }
    return null;
};
