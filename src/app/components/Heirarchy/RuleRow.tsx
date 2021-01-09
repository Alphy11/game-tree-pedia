import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import { Rule } from 'app/content';
import React, { useContext } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import styled, { css } from 'styled-components';
import { SelectedItemContext } from '../Store';
import { ContentBody, TitleBody } from '../Text';
import { FlexBox, FlexItem, CenteredContent, Padding } from '../Utility';

type RuleRowProps = {
    rule: Rule;
};

const RowBody = styled.div`
    padding: 16px 16px;
    border-bottom: 1px solid black;
    width: 100%;
`;
const IDBody = styled(TitleBody)`
    padding-right: 8px;
    ${({ children }) => {
        if (
            children &&
            typeof children === 'string' &&
            children.match(/[a-z]/i)
        ) {
            return css`
                margin-right: 20%;
            `;
        }
    }}
`;
const RuleBody = styled(FlexItem)`
    min-width: 85%;
`;

const RuleFlexBox = styled(FlexBox)`
    flex: 1;
`;

export function RuleRow({ rule }: RuleRowProps) {
    const { additional = {}, content, subtree } = rule;

    const { pushSelectedItem } = useContext(SelectedItemContext);
    const hasChildren = !!rule.subtree?.length;

    return (
        <>
            <SwipeableListItem threshold={0.4}>
                <RowBody
                    onClick={
                        hasChildren ? () => pushSelectedItem(rule) : undefined
                    }
                >
                    <FlexBox>
                        <RuleFlexBox wrap>
                            {additional.indexer && (
                                <IDBody> {additional.indexer}</IDBody>
                            )}
                            <RuleBody>
                                {additional.title && (
                                    <TitleBody>{additional.title}</TitleBody>
                                )}
                                {!!content?.length && (
                                    <ContentBody content={content} />
                                )}
                            </RuleBody>
                        </RuleFlexBox>
                        {!!subtree && (
                            <CenteredContent>
                                <Padding left={1}>
                                    <BsChevronRight />
                                </Padding>
                            </CenteredContent>
                        )}
                    </FlexBox>
                </RowBody>
            </SwipeableListItem>
        </>
    );
}
