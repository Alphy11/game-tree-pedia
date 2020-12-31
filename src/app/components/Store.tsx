import { Rule } from 'app/content';
import { shouldNotHappen } from 'app/util/validation';
import React, { createContext, PropsWithChildren, useReducer } from 'react';

type SelectedItemStore = {
    selectedItem: Rule | null;
    pushSelectedItem(item: Rule);
    popSelectedItem();
};

type FavoriteItemStore = [
    favoriteItems: Record<string, boolean>,
    toggleFavoriteItem: (id: string) => void,
];

type SelectedItemsAction =
    | {
          type: 'push';
          item: Rule;
      }
    | {
          type: 'pop';
      };

export const SelectedItemContext = createContext<SelectedItemStore>({
    selectedItem: null,
    pushSelectedItem: shouldNotHappen('pushSelectedItem'),
    popSelectedItem: shouldNotHappen('popSelectedItem'),
});

export const FavoriteItemContext = createContext<FavoriteItemStore>([
    {},
    shouldNotHappen('toggleFavoriteItem'),
]);

export function StoreProvider({ children }: PropsWithChildren<{}>) {
    const [favoriteItems, toggleFavorited] = useReducer(
        (lastFavorites: Record<string, boolean>, changedItem: string) => {
            if (lastFavorites[changedItem]) {
                const nextFavorites = { ...lastFavorites };
                delete nextFavorites[changedItem];
                return nextFavorites;
            }
            return { ...lastFavorites, [changedItem]: true };
        },
        {},
    );

    const [selectedItems, updateSelectedItems] = useReducer(
        (lastItems: Rule[], action: SelectedItemsAction) => {
            switch (action.type) {
                case 'push':
                    return [action.item, ...lastItems];
                case 'pop':
                    return lastItems.slice(1);
            }
        },
        [],
    );

    return (
        <FavoriteItemContext.Provider value={[favoriteItems, toggleFavorited]}>
            <SelectedItemContext.Provider
                value={{
                    selectedItem: selectedItems.length
                        ? selectedItems[0]
                        : null,
                    popSelectedItem: () => updateSelectedItems({ type: 'pop' }),
                    pushSelectedItem: item =>
                        updateSelectedItems({ type: 'push', item }),
                }}
            >
                {children}
            </SelectedItemContext.Provider>
        </FavoriteItemContext.Provider>
    );
}
