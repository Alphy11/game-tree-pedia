import { ContentSet, IntermediateNodeShape, RuleNode } from './taskTypes';

export type NodeGetter<
    AdditionalTypes extends Record<string, any>,
    T extends keyof AdditionalTypes
> = (
    node: IntermediateNodeShape<AdditionalTypes, T>,
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
    return function formatter(
        nodeSet: ContentSet<AdditionalTypes>,
        ids: string[],
    ): RuleNode<AdditionalTypes, keyof AdditionalTypes>[] {
        return Object.values(nodeSet).map(node => {
            const formattedNode = globalFormatter(
                formatConfig[node.type](node, ids),
                ids,
            );

            return {
                ...formattedNode,
                ...(node.subtree && {
                    subtree: formatter(node.subtree, [
                        ...ids,
                        formattedNode.id,
                    ]),
                }),
            };
        });
    };
}
