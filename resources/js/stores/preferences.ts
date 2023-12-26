import * as devalue from 'devalue';
import { get } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';

export interface StoreType {
    sidebarExtended: boolean;
    cardAlphaSort: boolean;
};
const defaults: StoreType = {
    sidebarExtended: true,
    cardAlphaSort: false,
};
export const createPreferencesStore = () => {
    const store = persisted('preferences', defaults, {
        // serializer: devalue,
        syncTabs: true,
    })
    return {
        ...store,
        toggleSidebar: () => store.update((prev) => ({
            ...prev,
            sidebarExtended: !prev.sidebarExtended
        })),
        toggleCardAlphaSort: () => store.update((prev) => ({
            ...prev,
            cardAlphaSort: !prev.cardAlphaSort,
        })),
    };
}
