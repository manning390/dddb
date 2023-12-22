<script>
    import cn from '@/cn';
    import { Close, Cog } from '@/components/icons';
    import { getContext } from 'svelte';

    const { removeCard } = getContext('pages');

    export let card;

</script>

<div
    data-id={card.id}
    class={cn('card w-80  rounded border border-black bg-base-600', 'small')}>
    <div class="flex justify-between p-1">
        <div class="flex gap-2">
            <img src="https://placehold.co/42" alt={card.name} class="rounded-md"/>
            <div>
                <h3 class="text-lg text-cyan-300 shadow-base-bg text-shadow h-5">
                    {card.name}
                </h3>
                <small class="text-shadow shadow-black">{card?.subtitle || ''}</small>
            </div>
        </div>
        <div class="flex gap-1">
            <button on:click={() => console.log('cog')} class="h-4">
                <Cog class="w-4 h-4 cursor-pointer" />
            </button>
            <button on:click={() => removeCard(card)} class="h-4">
                <Close class="w-4 h-4 cursor-pointer" />
            </button>
        </div>
    </div>
    <nav class="text-sm flex ">
        <button active={true} class="bg-stone-800 rounded-t-lg p-1 flex-1 text-shadow shadow-black">Stats</button>
        <button class="bg-stone-700 rounded-t-lg p-1 flex-1 text-shadow shadow-black">Sources</button>
    </nav>
    <div class="h-full bg-stone-800">
        Hello there friends!
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
