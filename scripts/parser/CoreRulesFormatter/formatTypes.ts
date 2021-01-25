export type CoreRuleAF = {
    'glossary header': {
        title: string;
        indexer: string;
    };
    'errata qa': {
        title: string;
    };
    'rule type': { title: string };
    'glossary entry': {
        indexer: string;
    };
    subheader: {
        indexer: string;
        title: string;
    };
    'related topics': never;
    root: never;
};

export type SectionTypes = keyof CoreRuleAF;
