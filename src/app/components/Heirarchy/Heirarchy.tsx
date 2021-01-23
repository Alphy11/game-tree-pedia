import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Rule } from '../../content';
import { SearchContext } from '../Search';
import { SelectedItemContext } from '../Store';
import { HeriarchyComponent } from './HeirarchyComponent';

export type HeirarchyProps = {
    rules: Rule[];
    selectedRule?: Rule;
};
export function Heriarchy({ rules }: HeirarchyProps) {
    const [searchText] = useContext(SearchContext);

    return !searchText ? (
        <HeriarchyComponent rules={rules} />
    ) : (
        <SearchedHeirarchy rules={rules} />
    );
}

function SearchedHeirarchy({ rules: allRules }: HeirarchyProps) {
    const [searchText] = useContext(SearchContext);
    const { clearSelectedItem } = useContext(SelectedItemContext);
    const debouncedSearchText = useDebouncedValue(searchText?.trim(), {
        delayInMs: 500,
    });
    useEffect(() => {
        clearSelectedItem();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText]);

    const rules = useMemo<Rule[]>(() => {
        return debouncedSearchText
            ? searchForRules(new RegExp(debouncedSearchText, 'i'), allRules)
            : [];
    }, [debouncedSearchText, allRules]);

    return <HeriarchyComponent rules={rules} />;
}

function searchForRules(searchText: RegExp, rules: Rule[] = []): Rule[] {
    return rules.reduce((found, current) => {
        if (
            current.additional?.indexer?.match(searchText) ||
            current.additional?.title?.match(searchText) ||
            current.content.join('').match(searchText)
        ) {
            found.push(current);
        }

        found.push(...searchForRules(searchText, current.subtree));
        return found;
    }, [] as Rule[]);
}

export interface DebounceOptions {
    leadingEdge?: boolean;
    delayInMs: number;
}

export function useDebouncedValue<T>(
    value: T,
    { leadingEdge, delayInMs }: DebounceOptions,
) {
    const [debouncedValue, setDebouncedValue] = useState(
        leadingEdge ? value : null,
    );

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delayInMs);
        return () => clearTimeout(timeout);
    }, [value, delayInMs]);

    if (delayInMs === 0) {
        return value;
    }

    return debouncedValue;
}
