import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import { Rule } from 'app/content';
import React, { useContext } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsChevronRight } from 'react-icons/bs';
import styled, { css } from 'styled-components';
import { FavoriteItemContext, SelectedItemContext } from '../Store';
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

function StandardRuleRow({ rule }: RuleRowProps) {
    const { id, additional = {}, content } = rule;
    const hasChildren = !!rule.subtree?.length;

    return (
        <FlexBox>
            <RuleFlexBox wrap>
                <IDBody>{id}</IDBody>
                <RuleBody>
                    {additional.title && (
                        <TitleBody>{additional.title}</TitleBody>
                    )}
                    {content && <ContentBody content={content} />}
                </RuleBody>
            </RuleFlexBox>
            {hasChildren && (
                <CenteredContent>
                    <Padding left={1}>
                        <BsChevronRight />
                    </Padding>
                </CenteredContent>
            )}
        </FlexBox>
    );
}
function RootRuleRow({ rule }: RuleRowProps) {
    const { id, additional = {}, content } = rule;
    const hasChildren = !!rule.subtree?.length;

    return (
        <FlexBox>
            <FlexItem>
                {<TitleBody>{additional.title || id}</TitleBody>}
                <ContentBody content={content} />
            </FlexItem>
            {hasChildren && (
                <CenteredContent>
                    <Padding left={1}>
                        <BsChevronRight />
                    </Padding>
                </CenteredContent>
            )}
        </FlexBox>
    );
}

export function RuleRow({ rule }: RuleRowProps) {
    const { id, type } = rule;
    const [favoriteItems, toggleFavorited] = useContext(FavoriteItemContext);
    const { pushSelectedItem } = useContext(SelectedItemContext);
    const hasChildren = !!rule.subtree?.length;

    return (
        <>
            <SwipeableListItem
                threshold={0.4}
                swipeRight={{
                    content: favoriteItems[id] ? (
                        <AiFillStar color="yellow" />
                    ) : (
                        <AiOutlineStar />
                    ),
                    action: () => toggleFavorited(id),
                }}
            >
                <RowBody
                    onClick={
                        hasChildren ? () => pushSelectedItem(rule) : undefined
                    }
                >
                    {type === 'root' ? (
                        <RootRuleRow rule={rule} />
                    ) : (
                        <StandardRuleRow rule={rule} />
                    )}
                </RowBody>
            </SwipeableListItem>
        </>
    );
}