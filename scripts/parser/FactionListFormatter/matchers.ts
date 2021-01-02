export function isFactionHeader(logLine: string): { faction: string } | null {
    const match = logLine.match(/^~~(?<faction>.*)~~$/i);
    if (match) {
        return match.groups as { faction: string };
    }
    return null;
}
export function isSectionHeader(
    logLine: string,
): { sectionName: string } | null {
    const match = logLine.match(/;%;(?<sectionName>.*);%;/i);
    if (match) {
        return match.groups as { sectionName: string };
    }
    return null;
}
export function isLeaderEntry(
    logLine: string,
): { leaderType: 'agent' | 'commander' | 'hero'; leaderName: string } | null {
    const match = logLine.match(
        /(?<leaderType>AGENT|COMMANDER|HERO): (?<leaderName>.*)/i,
    );
    if (match) {
        return match.groups as {
            leaderType: 'agent' | 'commander' | 'hero';
            leaderName: string;
        };
    }
    return null;
}
