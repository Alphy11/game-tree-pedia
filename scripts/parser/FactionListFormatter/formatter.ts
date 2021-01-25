import { isFactionHeader, isSectionHeader, isLeaderEntry } from './matchers';
import { createFormatter } from '../formatter';
import { FactionListAF } from './formatTypes';

function joinContent(content: string[]): string[] {
    return content.join(' ').replace(/•/g, '#%#•').split(/#%#/);
}

export const formatter = createFormatter<FactionListAF>({
    faction: ({ content }) => {
        const { faction } = isFactionHeader(content[0])!;
        return {
            content: [],
            id: faction,
            type: 'faction',
            additional: {
                title: faction,
            },
        };
    },
    'faction section': ({ content }) => {
        const [header, ...rest] = content;
        const { sectionName } = isSectionHeader(header)!;
        return {
            content: joinContent(rest),
            id: sectionName,
            type: 'faction section',
            additional: {
                title: sectionName,
            },
        };
    },
    leader: ({ content, id }) => {
        const [header, ...rest] = content;
        const { leaderName, leaderType, leaderNickname } = isLeaderEntry(
            header,
        )!;
        return {
            content: joinContent(rest),
            id: leaderName,
            type: 'leader',
            additional: {
                title: `${leaderType}: ${leaderName}${
                    leaderNickname ? ` :: ${leaderNickname}` : ''
                }`,
            },
        };
    },
    root: node => node,
});
