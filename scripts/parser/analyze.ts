import { EndSectionDefinition, SectionDefinition } from './taskTypes';

export function analyze<KeySet extends string>(
    lines: string[],
    matchDefinitions: SectionDefinition<KeySet>[],
): Record<string, Entry<KeySet>> {
    const [remaining, entry, result] = analyzeInternal(
        lines,
        matchDefinitions,
        [
            {
                type: 'root' as KeySet,
                id: 'root',
                matchEnd: () => false,
            },
        ],
        '',
    );

    if (remaining.length) {
        console.error(remaining);
        throw new Error('Remaining lines!');
    }

    // if (entry.content.length) {
    //     console.error(entry);
    //     throw new Error('Remaining content!');
    // }
    return result!;
}

type Entry<KeySet extends string> = {
    type: KeySet;
    id: string;
    additional: any;
    content: string[];
    subtree?: Record<KeySet, Entry<KeySet>>;
};

function analyzeInternal<KeySet extends string>(
    linesRaw: string[],
    matchDefinitions: SectionDefinition<KeySet>[],
    endDefinitions: EndSectionDefinition<KeySet, any>[],
    firstLine,
): [
    remainingLines: string[],
    content: Entry<KeySet>,
    subtree: Record<string, Entry<KeySet>> | null,
] {
    const [currentMatch] = endDefinitions;
    let lines = [...linesRaw];
    let subtree: Record<string, any> | undefined;
    let content: string[] = [];
    while (
        lines.length &&
        !endDefinitions
            .map(({ matchEnd }) => matchEnd)
            .find(matcher => matcher(lines[0]))
    ) {
        const line = lines.shift()!;

        const [start] = matchDefinitions
            .map(matcher => matcher(line))
            .filter(Boolean);
        if (start) {
            const [newLines, child, grandKids] = analyzeInternal(
                lines,
                matchDefinitions,
                [start, ...endDefinitions],
                line,
            );
            subtree = {
                ...subtree,
                [start.id]: {
                    ...child,
                    subtree: grandKids,
                },
            };
            lines = newLines;
        } else {
            content = [...content, line];
        }
    }

    if (currentMatch?.inclusive) {
        content = [...content, lines[0]];
    }

    return [
        lines,
        {
            type: currentMatch.type,
            id: currentMatch.id,
            additional: currentMatch.additional,
            content: [firstLine, ...content],
        },
        subtree || null,
    ];
}
