import { SectionDefinition } from '../taskTypes';
import { isFactionHeader, isLeaderEntry, isSectionHeader } from './matchers';
// const sectionHeaders = [
//     'Starting Fleet',
//     'commoditieS',
//     'home SyStem',
//     'mech',
//     'FlagShiP',
//     'leaderS',
//     'Faction abilitieS',
//     'Starting technologieS',
//     'SPecial UnitS',
//     'Faction technologieS',
//     'PromiSSory note',
// ];

export const FactionMatcher: SectionDefinition<'faction'> = logLine => {
    const match = isFactionHeader(logLine);
    if (match) {
        return {
            type: 'faction',
            id: logLine,
            matchEnd: line => !!isFactionHeader(line),
        };
    }
    return null;
};

export const FactionSectionMatcher: SectionDefinition<'faction section'> = logLine => {
    const match = isSectionHeader(logLine);
    if (match) {
        return {
            type: 'faction section',
            id: logLine,
            matchEnd: line =>
                !!(isSectionHeader(line) || isFactionHeader(line)),
        };
    }
    return null;
};

export const FactionLeaderMatcher: SectionDefinition<'leader'> = logLine => {
    const match = isLeaderEntry(logLine);
    if (match) {
        return {
            type: 'leader',
            id: logLine,
            matchEnd: line =>
                !!(
                    isSectionHeader(line) ||
                    isFactionHeader(line) ||
                    isLeaderEntry(line)
                ),
        };
    }
    return null;
};
