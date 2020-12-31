import React, { useContext } from 'react';
import { SwipeableList } from '@sandstreamdev/react-swipeable-list';
import { Rule } from '../../content';
import { RuleDisplay } from '../RuleDisplay';
import { SelectedItemContext } from '../Store';
import { RuleRow } from './RuleRow';
import styled from 'styled-components';
import { FlexBox } from '../Utility';

export type HeriarchyComponentProps = {
    rules: Rule[];
    selectedRule?: Rule;
};

const RuleArea = styled(FlexBox)`
    padding-top: 24px;
    border-bottom: 1px solid black;
`;

export function HeriarchyComponent({ rules }: HeriarchyComponentProps) {
    const { selectedItem } = useContext(SelectedItemContext);
    return (
        <>
            {selectedItem && (
                <>
                    <RuleArea>
                        <RuleDisplay rule={selectedItem} />
                    </RuleArea>
                </>
            )}
            <SwipeableList>
                {(selectedItem === null ? rules : selectedItem.subtree)
                    ?.filter(rule => rule.type !== 'related topics')
                    .map(rule => (
                        <RuleRow key={rule.id} rule={rule} />
                    ))}
            </SwipeableList>
        </>
    );
}
