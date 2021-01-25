import {
    AdditionalTypes,
    IntermediateContentShape,
    RuleNode,
} from './taskTypes';

export type NodeGetter<T extends keyof AdditionalTypes> = (
    node: IntermediateContentShape<T>,
    ids: string[],
) => Omit<RuleNode<T>, 'subtree'>;

export function createFormatter(
    formatConfig: { [K in keyof AdditionalTypes]: NodeGetter<K> },
) {
    return function formatter<NodeType extends keyof AdditionalTypes>(
        node: IntermediateContentShape<NodeType>,
        ids: string[],
    ): RuleNode<NodeType> {
        const formattedNode = globalFormatter<NodeType>(
            ((formatConfig[node.type] as unknown) as NodeGetter<NodeType>)(
                node,
                ids,
            ),
            ids,
        );

        return {
            ...formattedNode,
            ...(node.subtree && {
                subtree: Object.values(node.subtree).map(nextNode =>
                    formatter(nextNode, [...ids, formattedNode.id]),
                ),
            }),
        };
    };
}

function globalFormatter<T extends keyof AdditionalTypes>(
    node: Omit<RuleNode<T>, 'subtree'>,
    ids,
) {
    const formattedId = node.id.replace(/[.\s]/g, '-');
    return {
        ...node,
        id: formattedId,
        globalId: [...ids, formattedId].join('_'),
    };
}
