import React from 'react';
import styled from 'styled-components';

type ContentBodyProps = {
    content: NonNullable<React.ReactNode>[];
};

export function ContentBody({ content }: ContentBodyProps) {
    return (
        <>
            {content.map((line, i) => (
                // we cna use index here since it is static data
                <div key={i}>{line}</div>
            ))}
        </>
    );
}

export const TitleBody = styled.div`
    font-weight: bold;
`;
