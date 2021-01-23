import {
    isGlossaryEntry,
    isGlossaryHeader,
    isRelatedTopics,
    isErrataQA,
    isRuleType,
    isGlobalEnd,
    isSubHeader,
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
                        isSubHeader(line) ||
                        isGlossaryEntry(line) ||
                        isRelatedTopics(line),
                ),
        };
    }
    return null;
};

export const SubHeaderMatcher: SectionDefinition<'subheader'> = logLine => {
    const match = isSubHeader(logLine);
    if (match) {
        return {
            type: 'subheader',
            id: logLine,
            matchEnd: line =>
                Boolean(isSubHeader(line) || isGlossaryHeader(line)),
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

export const ErrataQAMAtcher: SectionDefinition<'errata qa'> = logLine => {
    const match = isErrataQA(logLine);
    if (match) {
        return {
            type: 'errata qa',
            id: logLine,
            matchEnd: line => Boolean(isGlobalEnd(line) || isErrataQA(line)),
        };
    }
    return null;
};
