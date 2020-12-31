import styled, { css } from 'styled-components';

export const unit = 8;

export const FlexBox = styled.div<{ wrap?: boolean }>`
    display: flex;
    ${({ wrap }) =>
        wrap &&
        css`
            flex-wrap: wrap;
        `}
`;

type FlexItemProps = {
    flex?: number;
};

export const FlexItem = styled.div<FlexItemProps>`
    ${({ flex }) =>
        css`
            flex: ${flex || 1};
        `}
`;
type ExpandeableProps = {
    fillAll?: boolean;
    fillHoriz?: boolean;
    fillVert?: boolean;
};

export const Expandable = styled.div<ExpandeableProps>`
    ${({ fillVert, fillAll }) =>
        (fillVert || fillAll) &&
        css`
            height: 100%;
        `}
    ${({ fillHoriz, fillAll }) =>
        (fillHoriz || fillAll) &&
        css`
            width: 100%;
        `}
`;

export const CenteredContent = styled(Expandable)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

type DirectionProps = {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    horizontal?: number;
    vertical?: number;
    all?: number;
};

export const Margin = styled(Expandable)<DirectionProps>`
    ${({ top, vertical, all }) => {
        const value = top || vertical || all;
        return (
            value &&
            css`
                margin-top: ${value * unit}px;
            `
        );
    }}
    ${({ right, horizontal, all }) => {
        const value = right || horizontal || all;
        return (
            value &&
            css`
                margin-right: ${value * unit}px;
            `
        );
    }}
    ${({ bottom, vertical, all }) => {
        const value = bottom || vertical || all;
        return (
            value &&
            css`
                margin-bottom: ${value * unit}px;
            `
        );
    }}
    ${({ left, horizontal, all }) => {
        const value = left || horizontal || all;
        return (
            value &&
            css`
                margin-left: ${value * unit}px;
            `
        );
    }}
`;
export const Padding = styled(Expandable)<DirectionProps>`
    ${({ top, vertical, all }) => {
        const value = top || vertical || all;
        return (
            value &&
            css`
                padding-top: ${value * unit}px;
            `
        );
    }}
    ${({ right, horizontal, all }) => {
        const value = right || horizontal || all;
        return (
            value &&
            css`
                padding-right: ${value * unit}px;
            `
        );
    }}
${({ bottom, vertical, all }) => {
        const value = bottom || vertical || all;
        return (
            value &&
            css`
                padding-bottom: ${value * unit}px;
            `
        );
    }}
${({ left, horizontal, all }) => {
        const value = left || horizontal || all;
        return (
            value &&
            css`
                padding-left: ${value * unit}px;
            `
        );
    }}
`;
