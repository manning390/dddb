<script>
    import cn from '@/cn';
    import { getContext } from 'svelte';
    import Button from '@/components/Button.svelte';
    import Input from '@/components/Input.svelte';

    export let heading = '';
    export let message = '';
    export let placeholder;
    export let onCancel = () => {};
    export let onConfirm = (_) => {};

    export let cancelText = 'Cancel';
    export let confirmText = 'Confirm';
    export let cancelClass;
    export let confirmClass;

    const { close } = getContext('simple-modal');

    function _onCancel() {
        onCancel();
        close();
    }
    function _onConfirm() {
        onConfirm(input);
        close();
    }

    let input = '';
</script>

<!-- <div class="bg-stone-800 border-stone-800"> -->
<h2 class="text-center text-2xl">{heading}</h2>
<hr />
<p class="mb-4 text-center">{message}</p>
<form id="modal-form" on:submit|preventDefault={_onConfirm} class="mb-8">
    <Input
        bind:value={input}
        {placeholder}
        required
        class="mx-auto block w-60" />
</form>
<div class="flex justify-between">
    <Button class={cn('w-5/12 font-bold', cancelClass)} on:click={_onCancel}
        >{cancelText}</Button>
    <Button
        type="submit"
        form="modal-form"
        class={cn('w-5/12 font-bold', confirmClass)}>{confirmText}</Button>
</div>
