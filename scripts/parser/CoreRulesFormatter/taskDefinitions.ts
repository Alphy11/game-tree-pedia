import {
    isGlossaryEntry,
    isGlossaryHeader,
    isErrataHeader,
    isRelatedTopics,
    isErrataQA,
    isRuleType,
} from './matchers';
import { AdditionalTypes, SectionDefinition } from '../taskTypes';

export const GlossaryHeaderMatcher: SectionDefinition<'glossary header'> = logLine => {
    const match = isGlossaryHeader(logLine);
    if (match) {
        return {
            type: 'glossary header',
            id: match.id,
            matchEnd: line => !!isGlossaryHeader(line),
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
                Boolean(isGlossaryEntry(line) || isRelatedTopics(line)),
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
            matchEnd: line => !!isGlossaryHeader(line),
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
            matchEnd: line => !!isRuleType(line),
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
            matchEnd: line => isErrataHeader(line),
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
            matchEnd: line => !!(isErrataQA(line) || isErrataHeader(line)),
        };
    }
    return null;
};

function assert(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(message);
    }
}

function testDefinition(
    startLine: string,
    endLine: string,
    definition: SectionDefinition<
        keyof AdditionalTypes,
        Record<string, string>
    >,
    definitionName: string,
) {
    const match = definition(startLine);

    assert(!!match, `${definitionName} did not match provided line!`);

    assert(
        match!.matchEnd(endLine),
        `${definitionName} did not match end line`,
    );
}

testDefinition(
    '1 ABILITIES',
    '2 Other things',
    GlossaryHeaderMatcher,
    'GlossaryHeaderMatcher',
);
testDefinition(
    '1.1 Each ability describes when and how a player can resolve it.',
    '1.2 If a card has multiple abilities, each ability is presented as its',
    GlossaryEntryMatcher,
    'GlossaryEntryMatcher',
);
