import { isFactionHeader, isSectionHeader, isLeaderEntry } from './matchers';
import {
    AdditionalTypes,
    IntermediateContentShape,
    RuleNode,
} from '../taskTypes';

function exhaustiveCheck(t: never) {
    return;
}

export function formatter<
    NodeType extends IntermediateContentShape<keyof AdditionalTypes>
>(
    node: NodeType,
    parent: IntermediateContentShape<keyof AdditionalTypes> | null = null,
): RuleNode<NodeType['type']> {
    return {
        ...getNodeItems(node, parent),
        ...(node.subtree && {
            subtree: Object.values(node.subtree).map(nextNode =>
                formatter(nextNode, node),
            ),
        }),
    };
}

export function getNodeItems<
    NodeType extends IntermediateContentShape<keyof AdditionalTypes>
>(
    node: NodeType,
    parent: IntermediateContentShape<keyof AdditionalTypes> | null = null,
): Omit<RuleNode<NodeType['type']>, 'subtree'> {
    switch (node.type) {
        case 'faction':
            return getFactionNode(
                node as IntermediateContentShape<'faction'>,
                parent,
            );
        case 'faction section':
            return getFactionSectionNode(
                node as IntermediateContentShape<'faction section'>,
                parent,
            );
        case 'leader':
            return getLeaderNode(
                node as IntermediateContentShape<'leader'>,
                parent,
            );
        case 'root':
            return {
                subtree: Object.values(node.subtree!).map(nextNode =>
                    formatter(nextNode, node),
                ),
            } as any;
        case 'glossary header':
        case 'glossary subheader':
        case 'errata qa':
        case 'glossary entry':
        case 'errata section':
        case 'rule type':
        case 'related topics':
            throw new Error(`Found ${node.type} in FactionListFormatter`);

        default:
            exhaustiveCheck(node.type);
    }
    throw new Error('hehehe I am in danger');
}

function joinContent(content: string[]): string[] {
    return content.join(' ').replace(/•/g, ';;ab;;•').split(';;ab;;');
}

type NodeGetter<T extends keyof AdditionalTypes> = (
    node: IntermediateContentShape<T>,
    parent: IntermediateContentShape<any> | null,
) => Omit<RuleNode<T>, 'subtree'>;

const getFactionNode: NodeGetter<'faction'> = ({ content, id }) => {
    const { faction } = isFactionHeader(content[0])!;
    return {
        content: [],
        id: id,
        type: 'faction',
        additional: {
            title: faction,
        },
    };
};

const getFactionSectionNode: NodeGetter<'faction section'> = ({
    content,
    id,
}) => {
    const [header, ...rest] = content;
    const { sectionName } = isSectionHeader(header)!;
    return {
        content: joinContent(rest),
        id: id,
        type: 'faction section',
        additional: {
            title: sectionName,
        },
    };
};

const getLeaderNode: NodeGetter<'leader'> = ({ content, id }) => {
    const [header, ...rest] = content;
    const { leaderName, leaderType } = isLeaderEntry(header)!;
    return {
        content: joinContent(rest),
        id: id,
        type: 'leader',
        additional: {
            title: `${leaderType}: ${leaderName}`,
        },
    };
};
