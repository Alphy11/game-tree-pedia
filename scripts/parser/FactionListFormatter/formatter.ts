import { isFactionHeader, isSectionHeader, isLeaderEntry } from './matchers';
import { createFormatter, NodeGetter } from '../formatter';

const noop: NodeGetter<any> = node => {
    console.error(node);
    throw new Error('eeeeeeeeeeeeeeeeek');
};

function joinContent(content: string[]): string[] {
    return content.join(' ').replace(/•/g, '#%#•').split(/#%#/);
}

export const formatter = createFormatter({
    'glossary header': noop,
    subheader: noop,
    'errata qa': noop,
    'glossary entry': noop,
    'rule type': noop,
    'related topics': noop,
    faction: ({ content, id }) => {
        const { faction } = isFactionHeader(content[0])!;
        return {
            content: [],
            id: id,
            type: 'faction',
            additional: {
                title: faction,
            },
        };
    },
    'faction section': ({ content, id }) => {
        const [header, ...rest] = content;
        const { sectionName } = isSectionHeader(header)!;
        return {
            content: joinContent(rest),
            id: id,
            type: 'faction section',
            additional: {
                title: sectionName,
            },
        };
    },
    leader: ({ content, id }) => {
        const [header, ...rest] = content;
        const { leaderName, leaderType } = isLeaderEntry(header)!;
        return {
            content: joinContent(rest),
            id: id,
            type: 'leader',
            additional: {
                title: `${leaderType}: ${leaderName}`,
            },
        };
    },
    root: node => node,
});
