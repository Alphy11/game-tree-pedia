import { isFactionHeader, isSectionHeader, isLeaderEntry } from './matchers';
import { createFormatter } from '../formatter';
import { FactionListAF } from './formatTypes';

function joinContent(content: string[]): string[] {
    return content.join(' ').replace(/•/g, '#%#•').split(/#%#/);
}

export const formatter = createFormatter<FactionListAF>({
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
