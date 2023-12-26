<script>
    import { setContext } from 'svelte';
    import Modal from 'svelte-simple-modal';

    import cn from '@/cn';
    import Masonry from '@/components/Masonry.svelte';
    import Header from '@/components/Header.svelte';
    import Sidebar from '@/components/Sidebar.svelte';
    import Card from '@/components/card/Card.svelte';
    import Char from '@/components/card/character/Character.svelte';
    import { createPagesStore } from '@/stores/pages';
    import { createPreferencesStore } from '@/stores/preferences';

    setContext('simple-modal', { open: null, close: null });

    const pages = createPagesStore({
        activePage: 0,
        pages: [{ name: 'Default', cards: [] }], // prettier-ignore
    });
    setContext('pages', pages);
    const preferences = createPreferencesStore();
    setContext('preferences', preferences);

    $: cards = $pages.pages[$pages.activePage].cards;
</script>

<Modal
    unstyled={true}
    classBg="fixed z-50 top-0 left-0 flex flex-col justify-center w-screen h-screen bg-base-950/[.6]"
    classWindowWrap="relative m-8 max-h-full"
    classWindow="relative lg:w-1/3 md:w-3/5 sm:w-3/4 w-full max-w-full max-h-full my-8 mx-auto rounded-lg shadow-md bg-base-700 text-typo border border-base-500"
    classContent="relative overflow-auto p-4"
    closeButton={false}>
    <Sidebar />
    <main
        class={cn(
            $preferences.sidebarExtended && 'ml-sidebar',
            !($preferences.sidebarExtended) && 'ml-12'
        )}>
        <Header />
        <Masonry
            let:item
            items={cards}
            class="h-header-offset z-10 bg-base-950 p-2">
            <Char />
            <!-- <Card card={item} /> -->
        </Masonry>
    </main>
</Modal>
