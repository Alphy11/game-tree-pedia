import { IntermediateContentShape, RuleNode } from './taskTypes';

export const noop: NodeGetter<any, any> = node => {
    console.error(node);
    throw new Error('eeeeeeeeeeeeeeeeek');
};

export type NodeGetter<
    AdditionalTypes extends Record<string, any>,
    T extends keyof AdditionalTypes
> = (
    node: IntermediateContentShape<AdditionalTypes, T>,
    ids: string[],
) => Omit<RuleNode<AdditionalTypes, T>, 'subtree'>;

export function createFormatter<
    AdditionalTypes extends Record<string, any> = never
>(
    formatConfig: {
        [K in keyof AdditionalTypes]: NodeGetter<AdditionalTypes, K>;
    },
) {
    function globalFormatter<T extends keyof AdditionalTypes>(
        node: Omit<RuleNode<AdditionalTypes, T>, 'subtree'>,
        ids,
    ) {
        const formattedId = node.id.replace(/[.\s]/g, '-');
        return {
            ...node,
            id: formattedId,
            globalId: [...ids, formattedId].join('_'),
        };
    }
    return function formatter<NodeType extends keyof AdditionalTypes>(
        node: IntermediateContentShape<AdditionalTypes, NodeType>,
        ids: string[],
    ): RuleNode<AdditionalTypes, NodeType> {
        const formattedNode = globalFormatter<NodeType>(
            ((formatConfig[node.type] as unknown) as NodeGetter<
                AdditionalTypes,
                NodeType
            >)(node, ids),
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
