<script>
    import cn from '@/cn';
    import { createEventDispatcher, onMount } from 'svelte';

    let className = '';
    export { className as class };
    let formClass = '';
    let inputClass = '';
    export let value,
        required = true;

    const dispatch = createEventDispatcher();
    let editing = false,
        original;

    onMount(() => (original = value));

    function edit() {
        editing = true;
    }
    function submit() {
        if (value != original) dispatch('submit', value);
        editing = false;
    }
    function keydown(event) {
        if (key.key == 'Escape') {
            event.preventDefault();
            value = original;
            editing = false;
        }
    }
    function focus(element) {
        element.focus();
    }
</script>

{#if editing}
    <form on:submit|preventDefault={submit} class={formClass}>
        <input
            class={cn('border-none bg-none shadow-none', inputClass)}
            bind:value
            on:keydown={keydown}
            on:blur={submit}
            use:focus
            {required} />
    </form>
{:else}
    <button on:click={edit} class={className}>{value}</button>
{/if}
