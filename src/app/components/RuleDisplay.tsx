import React from 'react';
import { Rule } from 'app/content';
import { ContentBody, TitleBody } from './Text';
import { Padding } from './Utility';

export type RuleDisplayProps = {
    rule: Rule;
};

export function RuleDisplay({ rule }: RuleDisplayProps) {
    const { additional, content } = rule;
    return (
        <Padding horizontal={1.5} bottom={4}>
            <TitleBody>
                {additional?.indexer || ''} {additional?.title || ''}
            </TitleBody>

            <ContentBody content={content} />
        </Padding>
    );
}
