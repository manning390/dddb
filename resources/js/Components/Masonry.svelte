<script>
    // Based / Inspired by janosh/svelte-bricks
    // Making own version to suit my own needs and
    // avoid package bloat
    import cn from '@/cn';
    import { flip } from 'svelte/animate';
    import { fade } from 'svelte/transition';

    let masonryId = '';
    export { masonryId as id };
    export let items;
    export let columnClass = '';
    export let duration = 200;
    export let gap = 2; // Tailwind spacing units
    export let idKey = 'id';
    export let getId = (item) => {
        if (typeof item === 'number') return item;
        if (typeof item === 'string') return item;
        return item[idKey];
    };
    export let masonryHeight = 0;
    export let masonryWidth = 0;
    export let maxColWidth = 320;
    export let minColWidth = 320;
    export let style = '';
    let className = '';
    export { className as class };

    export let calcCols = (masonryWidth, minColWidth, gap) =>
        Math.min(
            items.length,
            Math.floor((masonryWidth + gap * 4) / (minColWidth + gap * 4)) || 1
        );

    $: nCols = calcCols(masonryWidth, minColWidth, gap);
    $: itemsToCols = items.reduce(
        (cols, item, idx) => {
            if (!cols) return cols;
            cols[idx % cols.length].push([item, idx]);
            return cols;
        },
        Array(nCols).fill(null).map(() => []) // prettier-ignore
    );
</script>

<div
    id={masonryId}
    class={cn(
        'masonry',
        'box-border flex overflow-auto',
        'gap-' + gap,
        className
    )}
    bind:clientWidth={masonryWidth}
    bind:clientHeight={masonryHeight}
    {style}>
    {#each itemsToCols as col}
        <div
            class={cn('col', 'grid h-max w-full', 'gap-' + gap, columnClass)}
            style={`max-width: ${maxColWidth}px`}>
            {#each col as [item, idx] (getId(item))}
                <div
                    in:fade={{ delay: 100, duration }}
                    out:fade={{ delay: 0, duration }}
                    animate:flip={{ duration }}>
                    <slot {idx} {item}>
                        <span>{item}</span>
                    </slot>
                </div>
            {/each}
        </div>
    {/each}
</div>
