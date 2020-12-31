import React, { useContext } from 'react';
import styled from 'styled-components';
import { SearchContext } from './SearchProvider';
import { FcSearch } from 'react-icons/fc';

const SearchContainer = styled.div`
    width: 100%;
    background: lightgrey;
    padding: 8px;
    position: relative;
`;

const Input = styled.input`
    width: 100%;
    border-radius: 50px 50px;
    padding: 0 21px;
`;
const IconPositioner = styled.div`
    position: absolute;
    top: 6.5px;
    left: 16px;
`;

export function Search() {
    const [searchText, setSearchText] = useContext(SearchContext);
    return (
        <SearchContainer>
            <Input
                width="100%"
                id="search"
                value={searchText || ''}
                onChange={e => setSearchText(e.target.value)}
                placeholder="Search..."
            />
            <IconPositioner>{<FcSearch size={'0.8em'} />}</IconPositioner>
        </SearchContainer>
    );
}
