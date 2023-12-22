<script>
    import {
        Alphabetize,
        Book,
        ChevronLeft,
        ChevronRight,
        Close,
        Share,
        Star,
    } from '@/components/icons';
    import Button from '@/components/Button.svelte';
    import InputDialog from '@/components/modals/InputDialog.svelte';
    import Dialog from '@/components/modals/Dialog.svelte';
    import { getContext } from 'svelte';

    const pageStore = getContext('pages');
    $: cardsOnPage = $pageStore.pages[$pageStore.activePage].cards.length;
    $: pages = $pageStore.pages;
    $: activePage = $pageStore.activePage;

    let sidebar = true;
    const { open: openModal } = getContext('simple-modal');
    function addPage() {
        openModal(InputDialog, {
            heading: 'Create New Page',
            message: 'testtesttest',
            placeholder: 'Page Name',
            onConfirm: (val) => pageStore.addPage(val),
            confirmClass: 'bg-success',
            closeOnOuterClick: false,
        });
    }
    function removePage() {
        openModal(Dialog, {
            heading: 'Delete Current Page',
            message: 'This action cannot be undone.',
            onConfirm: () => pageStore.removePage(),
        });
    }
</script>

<div id="header" class="z-10 ml-sidebar pt-8">
    <div class="menu">
        <button class="rounded bg-stone-500 p-1 hover:bg-stone-400">
            {#if sidebar}
                <ChevronLeft />
            {:else}
                <ChevronRight />
            {/if}
        </button>
    </div>
    <div class="flex gap-1 py-2">
        {#each pages as page, idx}
            <Button
                on:click={() => pageStore.setActivePage(idx)}
                class={activePage === idx && 'border-2 border-stone-300'}
                >{page.name}</Button>
        {/each}
        <Button on:click={addPage} class="flex items-center"
            ><Star class="inline" />New Page</Button>
        <Button
            on:click={() =>
                pageStore.addCard({
                    id: Math.floor(Math.random() * 10000),
                    name: 'Magic Missle',
                    subtitle: 'Spell Level 1',
                })}>Add Dev Card</Button>
    </div>
    <div
        class="flex items-center justify-between border border-stone-500 bg-stone-900 p-2">
        <div class="flex gap-2">
            <Book class="h-8 w-8" />
            <h2 class="text-2xl">{pages[activePage].name}</h2>
        </div>
        <div class="flex gap-2">
            <div
                class="flex h-8 w-8 select-none items-center justify-center rounded-full bg-black">
                <span>{cardsOnPage}</span>
            </div>
            <button>
                <Share />
            </button>
            <button>
                <Alphabetize />
            </button>
            <button on:click={removePage}>
                <Close />
            </button>
        </div>
    </div>
</div>
