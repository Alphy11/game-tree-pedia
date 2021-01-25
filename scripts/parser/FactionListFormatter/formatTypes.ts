export type FactionListAF = {
    faction: {
        title: string;
    };
    leader: {
        title: string;
    };
    'faction section': {
        title: string;
    };
    root: never;
};

export type SectionTypes = keyof FactionListAF;
