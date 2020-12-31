function assert(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(message);
    }
}

export type EndSectionDefinition<
    T extends string,
    Additional extends Record<string, string>
> = {
    type: T;
    name: string;
    additional?: Additional;
    inclusive?: boolean;
    matchEnd: (parsedLogLine: string) => boolean;
};

export type SectionDefinition<
    T extends string,
    Additional extends Record<string, string> = {}
> = {
    (parsedLogLine: string): EndSectionDefinition<T, Additional> | null;
};

function testDefinition(
    startLine: string,
    endLine: string,
    definition: SectionDefinition<string, Record<string, string>>,
    definitionName: string,
) {
    const match = definition(startLine);

    assert(!!match, `${definitionName} did not match provided line!`);

    assert(
        match!.matchEnd(endLine),
        `${definitionName} did not match end line`,
    );
}

let currentSubSection: string;

const headerRegex = /^(?<id>\d+) (?<title>[a-z\s]+)$/i;
const subsectionRegex = /^(?<id>\d+\.\d+)/i;
const relatedTopicsRegex = /^RELATED TOPICS:/i;

let currentHeader: string;
export const CoreRulesHeaderMatcher: SectionDefinition<'core rules header'> = logLine => {
    const match = logLine.match(headerRegex);
    if (match) {
        currentHeader = match.groups!.id;
        return {
            type: 'core rules header',
            name: match.groups!.id,
            additional: {
                title: match.groups!.title,
            },
            matchEnd: line => !!line.match(headerRegex),
        };
    }
    return null;
};

export const CoreRulesSubsectionMatcher: SectionDefinition<'core rules body'> = logLine => {
    const match = logLine.match(subsectionRegex);
    if (match) {
        currentSubSection = match.groups!.id;
        return {
            type: 'core rules body',
            name: currentSubSection,
            matchEnd: line =>
                !!(
                    line.match(subsectionRegex) ||
                    line.match(relatedTopicsRegex)
                ),
        };
    }
    return null;
};
export const CoreRulesRelatedTopicsMatcher: SectionDefinition<'core rules related topics'> = logLine => {
    const match = logLine.match(relatedTopicsRegex);
    if (match) {
        return {
            type: 'core rules related topics',
            name: `${currentHeader} RELATED TOPICS`,
            matchEnd: line => !!line.match(headerRegex),
        };
    }
    return null;
};
// export const CoreRulesBulletMatcher: SectionDefinition<'core rules bullet'> = logLine => {
//     const startRegex = /^• /;
//     if (logLine.match(startRegex)) {
//         if (!currentSubSection) {
//             console.error(currentSubSection, currentBullet);
//             throw new Error('CoreRulesBulletMatcher parsing error');
//         }
//         return {
//             type: 'core rules bullet',
//             name: `${currentSubSection}.${++currentBullet}`,
//             matchEnd: line => !!line.match(startRegex),
//         };
//     }
//     return null;
// };

testDefinition(
    '1 ABILITIES',
    '2 Other things',
    CoreRulesHeaderMatcher,
    'CoreRulesHeaderMatcher',
);
testDefinition(
    '1.1 Each ability describes when and how a player can resolve it.',
    '1.2 If a card has multiple abilities, each ability is presented as its',
    CoreRulesSubsectionMatcher,
    'CoreRulesSubsectionMatcher',
);