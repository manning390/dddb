<script>
    import cn from '@/cn';
    import { current_component } from 'svelte/internal';
    import { forwardEventsBuilder } from '@/components/forwardEvents';

    const forwardEvents = forwardEventsBuilder(current_component);

    let className = '';
    export { className as class };
</script>

<button
    use:forwardEvents
    class={cn(
        'border-black gap-1 whitespace-nowrap rounded-md border bg-base-600 px-2 py-1 hover:bg-base-400 active:border-base-300 active:bg-base-500',
        className
    )}
    {...$$restProps}><slot /></button>
