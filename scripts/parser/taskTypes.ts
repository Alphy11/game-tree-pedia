export type EndSectionDefinition<
    T extends keyof AdditionalTypes,
    Additional extends Record<string, string>
> = {
    type: T;
    id: string;
    additional?: Additional;
    inclusive?: boolean;
    matchEnd: (parsedLogLine: string) => boolean;
};

export type SectionDefinition<
    T extends keyof AdditionalTypes,
    Additional extends Record<string, string> = {}
> = {
    (parsedLogLine: string): EndSectionDefinition<T, Additional> | null;
};

export type RuleNode<Type extends keyof AdditionalTypes> = {
    content: string[];
    type: Type;
    subtree?: RuleNode<keyof AdditionalTypes>[];
    id?: string;
    additional?: AdditionalTypes[Type];
};

export type IntermediateContentShape<Type extends keyof AdditionalTypes> = {
    type: Type;
    id: string;
    content: string[];
    subtree?: Record<string, IntermediateContentShape<keyof AdditionalTypes>>;
};

export type AdditionalTypes = {
    'glossary header': {
        title: string;
        indexer: string;
    };
    'errata qa': {
        title: string;
    };
    'errata section': never;
    'rule type': { title: string };
    'glossary entry': {
        indexer: string;
    };
    'glossary subheader': {
        indexer: string;
        title?: string;
    };
    'related topics': never;
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

// 'glossary header'
// 'errata qa'
// 'errata section'
// 'rule type'
// 'glossary entry'
// 'related topics'

// case 'glossary header':
// case 'errata qa':
// case 'errata section':
// case 'rule type':
// case 'glossary entry':
// case 'related topics':
