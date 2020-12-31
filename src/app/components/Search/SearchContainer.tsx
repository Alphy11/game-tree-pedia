import React, { useContext } from 'react';
import styled from 'styled-components';
import { SearchContext } from './SearchProvider';
import { Padding, CenteredContent } from '../Utility';

const SearchContainer = styled.div`
    width: 100%;
    background: lightgrey;
    height: 2em;
`;

const Input = styled.input`
    width: 100%;
`;

export function Search() {
    const [searchText, setSearchText] = useContext(SearchContext);
    return (
        <SearchContainer>
            <CenteredContent fillAll>
                <Padding horizontal={2} fillHoriz>
                    <Input
                        width="100%"
                        id="search"
                        value={searchText || ''}
                        onChange={e => setSearchText(e.target.value)}
                    />
                </Padding>
            </CenteredContent>
        </SearchContainer>
    );
}
