import { isGlossaryHeader } from './matchers';
import {
    AdditionalTypes,
    IntermediateContentShape,
    RuleNode,
} from './taskTypes';

function exhaustiveCheck(t: never) {
    return;
}

export function formatter<
    NodeType extends IntermediateContentShape<keyof AdditionalTypes>
>(
    node: NodeType,
    parent: IntermediateContentShape<keyof AdditionalTypes> | null = null,
): RuleNode<NodeType['type']> {
    let parsedNode;
    switch (node.type) {
        case 'glossary header':
            parsedNode = getGlossaryHeaderNode(
                node as IntermediateContentShape<'glossary header'>,
                parent,
            );
            break;
        case 'errata qa':
            parsedNode = getErrataQA(
                node as IntermediateContentShape<'errata qa'>,
                parent,
            );
            break;
        case 'glossary entry':
            parsedNode = getGlossaryEntry(
                node as IntermediateContentShape<'glossary entry'>,
                parent,
            );
            break;
        case 'errata section':
        case 'rule type':
            parsedNode = getSimpleSectionWithTitle(node, parent);
            break;
        case 'related topics':
            parsedNode = getSimpleSection(node, parent);
            break;
        case 'root':
            console.log(node);
            return {
                subtree: Object.values(node.subtree!).map(nextNode =>
                    formatter(nextNode, node),
                ),
            } as any;
        default:
            exhaustiveCheck(node.type);
    }
    return {
        ...parsedNode,
        ...(node.subtree && {
            subtree: Object.values(node.subtree).map(nextNode =>
                formatter(nextNode, node),
            ),
        }),
    };
}

function joinContent(content: string[]): string[] {
    return content.join(' ').replace(/•/g, ';;ab;;•').split(';;ab;;');
}
type NodeGetter<T extends keyof AdditionalTypes> = (
    node: IntermediateContentShape<T>,
    parent: IntermediateContentShape<any> | null,
) => Omit<RuleNode<T>, 'subtree'>;

const getGlossaryHeaderNode: NodeGetter<'glossary header'> = ({
    content,
    id,
}) => {
    const { title } = isGlossaryHeader(content[0])!;
    return {
        content: joinContent(content.slice(1)),
        id: id,
        type: 'glossary header',
        additional: {
            title: title,
        },
    };
};

const getErrataQA: NodeGetter<'errata qa'> = ({ content, id, type }) => {
    const answerIndex = content.findIndex(line => line.startsWith('A: '));
    const [question, answer] = [
        content.slice(0, answerIndex),
        content.slice(answerIndex),
    ].map(set => joinContent(set));
    return {
        content: answer,
        // id: id,
        type: type,
        additional: {
            title: question.join(' '),
        },
    };
};
const getSimpleSection: NodeGetter<keyof AdditionalTypes> = ({
    content,
    id,
    type,
}) => {
    return {
        content: joinContent(content),
        id: id,
        type: type,
    };
};
const getSimpleSectionWithTitle: NodeGetter<keyof AdditionalTypes> = ({
    content,
    id,
    type,
}) => {
    return {
        content: joinContent(content.slice(1)),
        // id: id,
        type: type,
        additional: {
            title: content[0],
        },
    };
};
const getGlossaryEntry: NodeGetter<'glossary entry'> = ({
    content,
    id,
    type,
}) => {
    const firstLine = content[0].split(' ').slice(1).join(' ');
    return {
        content: joinContent([firstLine, ...content.slice(1)]),
        id: id,
        type: type,
    };
};
// const getX: NodeGetter<'x'> = ({ content, id, type }) => {
//     return {
//         content: joinContent(content.slice(1)),
//         id: id,
//         type: type,
//         additional: {
//             title: '',
//         },
//     };
// };
