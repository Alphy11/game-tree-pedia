import React from 'react';
import styled from 'styled-components';

export const Text = styled.div`
    /* min-height: 1.5em; */
`;

type ContentBodyProps = {
    content: NonNullable<React.ReactNode>[];
};

export function ContentBody({ content }: ContentBodyProps) {
    return (
        <>
            {content.map((line, i) => (
                // we cna use index here since it is static data
                <Text key={i}>{line}</Text>
            ))}
        </>
    );
}

export const TitleBody = styled(Text)`
    font-weight: bold;
`;
