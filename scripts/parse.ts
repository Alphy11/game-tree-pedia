import { promises } from 'fs';
import {
    EndSectionDefinition,
    SectionDefinition,
    CoreRulesHeaderMatcher,
    CoreRulesSubsectionMatcher,
    CoreRulesRelatedTopicsMatcher,
} from './taskDefinitions';

const { readFile, writeFile } = promises;

function analyze(
    linesRaw: string[],
    matchDefinitions: SectionDefinition<string>[],
    endDefinitions: EndSectionDefinition<string, any>[] = [],
    firstLine = '',
): [remainingLines: string[], content: Record<any, any>] {
    let lines = [...linesRaw];
    let subtree: Record<string, any> | undefined;
    const currentMatch = endDefinitions[0] || {
        type: 'root',
        name: 'root',
        matchEnd: () => false,
    };
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
            const [newLines, child] = analyze(
                lines,
                matchDefinitions,
                [start, ...endDefinitions],
                line,
            );
            subtree = {
                ...subtree,
                [start.name]: child,
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
            name: currentMatch.name,
            additional: currentMatch.additional,
            content: [firstLine, ...content],
            ...(subtree ? { subtree } : {}),
        },
    ];
}

function transformForConsumption(rawRecord: Record<string, any>) {
    const transform = (subtree: Record<string, any>) => {
        return Object.values(subtree).reduce(
            (asList, { subtree, name, content, ...value }) => {
                let contentOut = content
                    .join(' ')
                    .replace(new RegExp(`^${name} `, 'i'), '')
                    .replace(new RegExp(`^${value.additional?.title}`, 'i'), '')
                    .replace(/•/g, ';;ab;;•')
                    .split(';;ab;;');
                return [
                    ...asList,
                    {
                        ...value,
                        id: name,
                        content: contentOut,
                        ...(subtree && { subtree: transform(subtree) }),
                    },
                ];
            },
            [],
        );
    };
    return transform({
        root: rawRecord,
    });
}

async function run() {
    const file = (await readFile('./scripts/stuff')).toString();
    const lines = file.split('\n').filter(Boolean);
    const results = analyze(lines, [
        CoreRulesHeaderMatcher,
        CoreRulesSubsectionMatcher,
        CoreRulesRelatedTopicsMatcher,
    ]);
    writeFile(
        './src/app/content.json',
        JSON.stringify(transformForConsumption(results[1]), null, 4),
    );
}
run();

export {};
