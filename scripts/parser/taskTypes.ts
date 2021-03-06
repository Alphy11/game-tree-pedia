export type EndSectionDefinition<
    Type extends string,
    Additional extends Record<string, string>
> = {
    type: Type;
    id: string;
    additional?: Additional;
    inclusive?: boolean;
    matchEnd: (parsedLogLine: string) => boolean;
};

export type SectionDefinition<
    Type extends string,
    Additional extends Record<string, string> = {}
> = {
    (parsedLogLine: string): EndSectionDefinition<Type, Additional> | null;
};

export type RuleNode<
    AdditionalTypes extends Record<string, any>,
    Type extends keyof AdditionalTypes
> = {
    content: string[];
    type: Type;
    subtree?: RuleNode<AdditionalTypes, keyof AdditionalTypes>[];
    id: string;
    additional?: AdditionalTypes[Type];
};

export type IntermediateNodeShape<
    AdditionalTypes extends Record<string, any>,
    Type extends keyof AdditionalTypes
> = {
    type: Type;
    id: string;
    content: string[];
    subtree?: ContentSet<AdditionalTypes>;
};

export type ContentSet<AdditionalTypes extends Record<string, any>> = Record<
    string,
    IntermediateNodeShape<AdditionalTypes, keyof AdditionalTypes>
>;
