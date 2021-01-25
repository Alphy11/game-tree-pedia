import {
    isGlossaryEntry,
    isGlossaryHeader,
    isSubHeader,
    isRuleType,
} from './matchers';

import { createFormatter, NodeGetter } from '../formatter';

const noop: NodeGetter<any> = node => {
    console.error(node);
    throw new Error('eeeeeeeeeeeeeeeeek');
};

function joinContent(content: string[]): string[] {
    return content.join(' ').replace(/•/g, '#%#•').split(/#%#/);
}

export const formatter = createFormatter({
    'glossary header': ({ content, id }) => ({
        content: joinContent(content.slice(1)),
        id: id,
        type: 'glossary header',
        additional: isGlossaryHeader(content[0])!,
    }),
    'rule type': ({ content, id }) => ({
        content: joinContent(content.slice(1)),
        id: id,
        type: 'rule type',
        additional: isRuleType(content[0])!,
    }),
    'errata qa': ({ content, id, type }) => {
        const answerIndex = content.findIndex(line => line.startsWith('A: '));
        const [question, answer] = [
            content.slice(0, answerIndex),
            content.slice(answerIndex),
        ].map(set => joinContent(set));
        return {
            content: answer,
            id: id,
            type: type,
            additional: {
                title: question.join(' '),
            },
        };
    },
    'glossary entry': ({ content, id, type }) => {
        const [titleLine, ...rest] = content;
        const { indexer } = isGlossaryEntry(titleLine)!;
        return {
            content: joinContent(rest),
            id: id,
            type: type,
            additional: {
                indexer,
            },
        };
    },
    subheader: ({ content, id, type }) => {
        const [titleLine, ...rest] = content;
        const { indexer, title } = isSubHeader(titleLine)!;
        return {
            content: joinContent(rest),
            id: id,
            type: type,
            additional: {
                indexer,
                title,
            },
        };
    },
    root: node => node,
    'related topics': ({ content, id, type }) => ({
        content: joinContent(content),
        id: id,
        type: type,
    }),
    leader: noop,
    'faction section': noop,
    faction: noop,
});
