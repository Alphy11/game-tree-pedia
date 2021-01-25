export function isFactionHeader(logLine: string): { faction: string } | null {
    const match = logLine.match(/^%FN%~(?<faction>.*)$/i);
    if (match) {
        return match.groups as { faction: string };
    }
    return null;
}
export function isSectionHeader(
    logLine: string,
): { sectionName: string } | null {
    const match = logLine.match(/%SH%~(?<sectionName>.*)/i);
    if (match) {
        return match.groups as { sectionName: string };
    }
    return null;
}
export function isLeaderEntry(
    logLine: string,
): {
    leaderType: 'agent' | 'commander' | 'hero';
    leaderName: string;
    leaderNickname?: string;
} | null {
    const match = logLine.match(
        /(?<leaderType>AGENT|COMMANDER|HERO): (?<leaderName>.*) -(?<leaderNickname>.*)/i,
    );
    if (match) {
        return match.groups as {
            leaderType: 'agent' | 'commander' | 'hero';
            leaderName: string;
            leaderNickname?: string;
        };
    }
    return null;
}
