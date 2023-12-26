<script>
    import cn from '@/cn';

    let className;
    export { className as class };
    export let type = 'text';
    export let value;

    const setType = (node) => (node.type = type);
</script>

<input
    bind:value
    use:setType
    class={cn(
        'ring-red outline-white box-border rounded border border-base-900 bg-base-900 p-2 text-typo',
        className
    )}
    {...$$restProps} />
