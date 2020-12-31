import React, { useContext } from 'react';
import { SelectedItemContext } from '../Store';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import styled from 'styled-components';
import { FlexBox, FlexItem, Padding } from '../Utility';
import { SearchContext } from '../Search';

const HeaderArea = styled(FlexBox)`
    padding: 8px 0;
    border-bottom: 1px solid black;
    background: grey;
`;

export function Header() {
    const { selectedItem, popSelectedItem } = useContext(SelectedItemContext);
    const [searchText, setSearchText] = useContext(SearchContext);
    const showArrow = selectedItem || searchText;

    return (
        <HeaderArea>
            <Padding left={0.5}>
                <AiOutlineArrowLeft
                    visibility={showArrow ? 'visible' : 'hidden'}
                    onClick={() => {
                        popSelectedItem();
                        setSearchText(null);
                    }}
                    size={24}
                />
            </Padding>
            <FlexItem></FlexItem>
        </HeaderArea>
    );
}
