export type EndSectionDefinition<
    T extends string,
    Additional extends Record<string, string>
> = {
    type: T;
    name: string;
    additional?: Additional;
    inclusive?: boolean;
    matchEnd: (parsedLogLine: string) => boolean;
};

export type SectionDefinition<
    T extends string,
    Additional extends Record<string, string> = {}
> = {
    (parsedLogLine: string): EndSectionDefinition<T, Additional> | null;
};
