<script>
    import { current_component } from 'svelte/internal';
    import { forwardEventsBuilder } from '@/components/forwardEvents';
    const forwardEvents = forwardEventsBuilder(current_component);

    let className = '';
    export { className as class };
</script>

<button
    use:forwardEvents
    class={cn(
        'gap-1 rounded-md border border-black bg-stone-600 px-2 py-1 active:border-stone-300 active:bg-stone-500',
        className
    )}
    {...$$restProps}><slot /></button>
