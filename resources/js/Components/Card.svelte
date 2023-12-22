<script>
    import cn from '@/cn';
    import { Close, Cog } from '@/components/icons';
    import { getContext } from 'svelte';

    const { removeCard } = getContext('pages');

    export let card;
</script>

<div
    data-id={card.id}
    class={cn('card border-black  w-80 rounded border bg-base-600', 'small')}>
    <div class="flex justify-between p-1">
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
    <nav class="flex text-sm">
        <button
            active={true}
            class="bg-stone-800 shadow-black flex-1 rounded-t-lg p-1 text-shadow"
            >Stats</button>
        <button
            class="bg-stone-700 shadow-black flex-1 rounded-t-lg p-1 text-shadow"
            >Sources</button>
    </nav>
    <div class="bg-stone-800 h-full">Hello there friends!</div>
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
