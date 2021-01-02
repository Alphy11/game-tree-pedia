import {
    AdditionalTypes,
    EndSectionDefinition,
    SectionDefinition,
} from './taskTypes';

export function analyze(
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
