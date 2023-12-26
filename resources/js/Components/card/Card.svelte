<script>
    import cn from '@/cn';
    import { Close, Cog } from '@/components/icons';
    import { getContext } from 'svelte';

    const { removeCard } = getContext('pages');

    export let card;

    console.log({ ...card.sections });

    let activeSection = Object.keys(card.sections)[0];

    let size = [ 'small', 'medium', 'large', 'extralarge' ][card.id % 4]; // prettier-ignore
</script>

<div
    data-id={card.id}
    class={cn(
        'flex w-80 flex-col rounded border border-black bg-base-600',
        size
    )}>
    <div class="flex-0 flex justify-between p-1">
        <div class="flex gap-2">
            <img
                src="https://placehold.co/42"
                alt={card.name}
                class="rounded-md" />
            <div>
                <h3
                    class="text-cyan-300 h-5 text-lg shadow-base-bg text-shadow">
                    {card.name}
                </h3>
                <small class="shadow-black text-shadow"
                    >{card?.subtitle || ''}</small>
            </div>
        </div>
        <div class="flex gap-1">
            <button on:click={() => console.log('cog')} class="h-4">
                <Cog class="h-4 w-4 cursor-pointer" />
            </button>
            <button on:click={() => removeCard(card)} class="h-4">
                <Close class="h-4 w-4 cursor-pointer" />
            </button>
        </div>
    </div>
    <nav class="flex-0 flex text-sm">
        {#each Object.keys(card.sections) as section, idx}
            <button
                class={cn(
                    'flex-1 rounded-t-lg bg-base-800 p-1 shadow-black text-shadow',
                    idx !== 0 && 'bg-base-700'
                )}>{section}</button>
        {/each}
    </nav>
    <div class="h-full flex-1 rounded-b bg-base-800 p-2">
        <!-- {card.sections[activeSection].body} -->

    </div>
</div>

<style>
    .small {
        height: 171px;
    }
    .medium {
        height: 423px;
    }
    .large {
        height: 675px;
    }
</style>
