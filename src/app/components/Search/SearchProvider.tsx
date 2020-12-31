import React, { createContext, useState, PropsWithChildren } from 'react';
import { shouldNotHappen } from 'app/util/validation';

export type SearchContextShape = [
    searchText: string | null,
    setSearch: (searchText: string | null) => void,
];

export const SearchContext = createContext<SearchContextShape>([
    null,
    shouldNotHappen('setSearch'),
]);

export function SearchProvider({ children }: PropsWithChildren<{}>) {
    const [searchText, setSearchText] = useState<string | null>(null);

    return (
        <SearchContext.Provider value={[searchText, setSearchText]}>
            {children}
        </SearchContext.Provider>
    );
}
