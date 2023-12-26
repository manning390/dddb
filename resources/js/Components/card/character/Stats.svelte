<script>
    import { modifierDecorator as m } from '@/helpers';
    import { createEventDispatcher } from 'svelte';
    import Saves from './Saves.svelte';

    export let data;
    export let modifiers;
    export let bonus;

    const dispatch = createEventDispatcher();
</script>

<div>
    <button class="w-full rounded bg-base-700 px-1 text-left">
        <h3 class="inline">Stats</h3>
    </button>
    <div class="flex">
        <div
            class="box-border flex flex-1 items-center justify-between gap-4 p-2 px-8">
            {#each Object.entries(data.stats) as [key, stat]}
                <div
                    class="flex flex-col items-center justify-center text-center">
                    <div class="hex">&#x2B22;</div>
                    <div class="z-10">
                        <span>{key.toUpperCase()}</span>
                        <h4 class="text-xl">
                            {m(modifiers[key])}
                        </h4>
                        <h4 class="text-sm">{stat}</h4>
                    </div>
                </div>
            {/each}
        </div>

        <Saves saves={data.saves} {modifiers} {bonus} on:click />
    </div>
</div>
<style>
    .hex {
        @apply relative -left-11 top-2 h-0 w-0 text-[135px] text-base-700;
    }
</style>
