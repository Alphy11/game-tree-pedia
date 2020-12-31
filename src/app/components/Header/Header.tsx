import React, { useContext } from 'react';
import { SelectedItemContext } from '../Store';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import styled from 'styled-components';
import { FlexBox, FlexItem, Padding } from '../Utility';

const HeaderArea = styled(FlexBox)`
    padding: 8px 0;
    border-bottom: 1px solid black;
    background: grey;
    height: 24px;
`;

export function Header() {
    const { selectedItem, popSelectedItem } = useContext(SelectedItemContext);

    return (
        <HeaderArea>
            <Padding left={0.5}>
                <AiOutlineArrowLeft
                    visibility={selectedItem ? 'visible' : 'hidden'}
                    onClick={() => popSelectedItem()}
                    size={24}
                />
            </Padding>
            <FlexItem></FlexItem>
        </HeaderArea>
    );
}
