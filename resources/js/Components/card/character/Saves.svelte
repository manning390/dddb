<script>
    import cn from '@/cn';
    import { modifierDecorator as m } from '@/helpers';
    import { createEventDispatcher } from 'svelte';

    export let modifiers;
    export let saves;
    export let bonus;

    const dispatch = createEventDispatcher();
</script>

<div class="box-border text-right">
    <table class="w-full text-sm">
        <thead>
            <tr class="flex">
                <th class="w-full px-2">Saves</th>
            </tr>
        </thead>
        <tbody>
            {#each Object.keys(modifiers) as stat}
                <tr class="flex gap-2">
                    <td class="flex-1"
                        >{m(
                            modifiers[stat] +
                                (saves[stat] ? bonus: 0)
                        )}</td>
                    <td class="w-8 uppercase">{stat}</td>
                    <td class="flex-0 flex flex-col justify-center">
                        <button
                            class="flex"
                            on:click={() => dispatch('clicked', stat)}>
                            <div
                                class={cn(
                                    'h-4 w-4 rounded-full bg-base-700',
                                    saves[stat] && 'bg-base-400'
                                )} />
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
