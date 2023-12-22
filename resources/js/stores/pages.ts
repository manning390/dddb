import * as devalue from 'devalue';
import { get } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';

export enum CardType {
    // Objects
    Armor,
    Item,
    MagicItem,
    Weapon,
    // Jobs
    Class,
    Archetype,
    Ability,
    Feat,
    Spell,
    // Form
    Monster,
    Character,
    // Meta
    Table,
    Note,
}
export interface Card {
    id: number;
    name: string;
    type: CardType;
    sections: Record<string, unknown>;
}
export interface Page {
    name: string;
    cards: Card[];
}
export type StoreType = {
    activePage: number;
    pages: Page[];
};
const defaultPage: Page = {
    name: 'Default',
    cards: [],
};
export const createPagesStore = (
    initial: StoreType = {
        activePage: 0,
        pages: [defaultPage],
    }
) => {
    const store = persisted('pages', initial, {
        serializer: devalue,
        syncTabs: true,
    });

    return {
        ...store,
        addPage: (name: String): void =>
            store.update((prev: StoreType) => ({
                ...prev,
                activePage: prev.pages.length,
                pages: [
                    ...prev.pages,
                    {
                        name,
                        cards: [],
                    },
                ] as Page[],
            })),
        removePage: (): void => {
            if (get(store).pages.length <= 1) {
                store.set({ activePage: 0, pages: [defaultPage] });
                return;
            }
            store.update((prev) => {
                const newPage = prev.activePage - 1;
                return {
                    ...prev,
                    activePage: newPage < 0 ? 0 : newPage,
                    pages: prev.pages.filter(
                        (_, idx) => prev.activePage !== idx
                    ),
                };
            });
        },
        addCard: (card: Card): void =>
            store.update((prev) => {
                prev.pages[prev.activePage]?.cards.push(card);
                return prev;
            }),
        removeCard: (card: Card): void =>
            store.update((prev) => {
                const idx = prev.pages[prev.activePage].cards.indexOf(card);
                if (idx < 0) return;
                prev.pages[prev.activePage].cards.splice(idx, 1);
                return prev;
            }),
        setActivePage: (idx: number) => {
            if (idx < 0 || idx >= get(store).pages.length) return;
            store.update((prev) => ({ ...prev, activePage: idx }));
        },
    };
};
