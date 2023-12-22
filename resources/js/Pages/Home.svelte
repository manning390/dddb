<script>
    import { setContext } from 'svelte';
    import Modal from 'svelte-simple-modal';

    import Masonry from '@/components/Masonry.svelte';
    import Header from '@/components/Header.svelte';
    import Sidebar from '@/components/Sidebar.svelte';
    import Card from '@/components/Card.svelte';
    import { createPagesStore } from '@/stores/pages';

    setContext('simple-modal', { open: null, close: null });

    const pages = createPagesStore({
        activePage: 0,
        pages: [{ name: 'Default', cards: [] }], // prettier-ignore
    });
    setContext('pages', pages);

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
    <Header />
    <Masonry
        let:item
        items={cards}
        class="h-header-offset bg-black z-10 ml-sidebar p-2">
        <Card card={item} />
    </Masonry>
</Modal>
