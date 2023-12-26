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

    const devCard = {
        id: Math.floor(Math.random() * 10000),
        name: 'Magic Missle',
        subtitle: '1st-level abjuration (ritual)',
        sections: {
            Info: { type: 'static', body: 'Hello there' },
            Sources: {},
        },
    };

    const pageStore = getContext('pages');
    $: cardsOnPage = $pageStore.pages[$pageStore.activePage].cards.length;
    $: pages = $pageStore.pages;
    $: activePage = $pageStore.activePage;

    const prefStore = getContext('preferences');

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

<div id="header" class="z-10 pt-8">
    <div class="menu">
        <Button on:click={() => prefStore.toggleSidebar() }>
            {#if $prefStore.sidebarExtended}
                <ChevronLeft />
            {:else}
                <ChevronRight />
            {/if}
        </Button>
    </div>
    <div class="flex items-center gap-2 py-2">
        <div class="flex-0 flex gap-2 overflow-auto">
            {#each pages as page, idx}
                <Button
                    on:click={() => pageStore.setActivePage(idx)}
                    class={activePage === idx && 'border-stone-300 border-2'}
                    >{page.name}</Button>
            {/each}
        </div>
        <div class="flex gap-2">
            <Button on:click={addPage} class="flex items-center"
                ><Star class="inline" />New Page</Button>
            <Button on:click={() => pageStore.addCard(devCard)}
                >Add Dev Card</Button>
        </div>
    </div>
    <div
        class="border-base-500 bg-base-900 flex items-center justify-between border p-2">
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
