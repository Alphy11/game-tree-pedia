import { promises } from 'fs';
import { formatter } from './formatter';
import * as taskDefinitions from './taskDefinitions';
import {
    AdditionalTypes,
    EndSectionDefinition,
    SectionDefinition,
} from './taskTypes';

const { readFile, writeFile } = promises;

function analyze(
    linesRaw: string[],
    matchDefinitions: SectionDefinition<keyof AdditionalTypes>[],
    endDefinitions: EndSectionDefinition<keyof AdditionalTypes, any>[] = [],
    firstLine = '',
): [remainingLines: string[], content: Record<any, any>] {
    let lines = [...linesRaw];
    let subtree: Record<string, any> | undefined;
    const currentMatch = endDefinitions[0] || {
        type: 'root',
        id: 'root',
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
                [start.id]: child,
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
            ...(subtree ? { subtree } : {}),
        },
    ];
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function transformForConsumption(rawRecord: Record<string, any>) {
    console.log(rawRecord);
    return formatter(rawRecord as any).subtree;
}

async function run() {
    const file = (await readFile('./scripts/stuff')).toString();
    const lines = file.split('\n').filter(Boolean);
    const results = analyze(lines, Object.values(taskDefinitions));
    writeFile(
        './src/app/content.json',
        JSON.stringify(transformForConsumption(results[1]), null, 4),
    );
}
run();

export {};
