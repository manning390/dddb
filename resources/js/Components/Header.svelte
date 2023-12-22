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
    function renamePage() {
        openModal(InputDialog, {
            heading: 'Rename Page',
            placeholder: 'New Name',
            onConfirm: (val) => pageStore.renamePage(val),
            confirmClass: 'bg-success',
            closeOnOuterClick: false,
        });
    }
</script>

<div id="header" class="z-10 ml-sidebar pt-8">
    <div class="menu">
        <Button on:click={() => alert('wip')}>
            {#if sidebar}
                <ChevronLeft />
            {:else}
                <ChevronRight />
            {/if}
        </Button>
    </div>
    <div class="flex gap-1 py-2">
        {#each pages as page, idx}
            <Button
                on:click={() => pageStore.setActivePage(idx)}
                class={activePage === idx && 'border-stone-300 border-2'}
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
        class="border-stone-500 bg-stone-900 flex items-center justify-between border p-2">
        <div class="flex gap-2">
            <Book class="h-8 w-8" />
            <button on:click={renamePage}
                ><h2 class="text-2xl">{pages[activePage].name}</h2></button>
        </div>
        <div class="flex gap-2">
            <div
                class="bg-black flex h-8 w-8 select-none items-center justify-center rounded-full">
                <span>{cardsOnPage}</span>
            </div>
            <button on:click={() => alert('wip')}>
                <Share />
            </button>
            <button on:click={() => alert('wip')}>
                <Alphabetize />
            </button>
            <button on:click={removePage}>
                <Close />
            </button>
        </div>
    </div>
</div>
