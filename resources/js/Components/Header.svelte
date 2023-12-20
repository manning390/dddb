<script>
    import cn from '@/cn';
    import {
        Alphabetize,
        Book,
        ChevronLeft,
        ChevronRight,
        Close,
        Share,
        Star,
    } from '@/Components/icons';
    import {boxes} from '@/stores/box';

    let sidebar = true;
    let pages = [{ id: 0, name: 'Default' }];
    let activePage = 0;
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
        {#each pages as page}
            <button
                class={cn(
                    'rounded-md border border-black bg-stone-600 px-2 py-1',
                    activePage === page.id && 'border-2 border-stone-300'
                )}>{page.name}</button>
        {/each}
        <button
            class="flex items-center gap-1 rounded-md border border-black bg-stone-600 px-2 py-1 active:border-stone-300 active:bg-stone-500"
            ><Star class="inline" />New List</button>
    </div>
    <div
        class="flex items-center justify-between border border-stone-500 bg-stone-900 p-2">
        <div class="flex gap-2">
            <Book class="h-8 w-8" />
            <h2 class="text-2xl">{pages[activePage].name || 'unknown'}</h2>
        </div>
        <div class="flex gap-1">
            <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-black">
                <span>{$boxes.length}</span>
            </div>
            <button >
                <Share />
            </button>
            <button >
                <Alphabetize />
            </button>
            <button >
                <Close />
            </button>
        </div>
    </div>
</div>
