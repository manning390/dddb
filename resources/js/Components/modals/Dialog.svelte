<script>
    import Button from '@/components/Button.svelte';
    import { getContext } from 'svelte';

    export let heading = '';
    export let message = '';
    export let onCancel = () => {};
    export let onConfirm = () => {};

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
        onConfirm();
        close();
    }
</script>

<h2 class="text-center text-2xl">{heading}</h2>
<hr />
<p class="my-4 p-4 text-center">{message}</p>
<div class="flex justify-between">
    <Button
        class={cn('w-5/12 bg-danger font-bold active:bg-red-900', cancelClass)}
        on:click={_onCancel}>{cancelText}</Button>
    <Button
        class={cn(
            'w-5/12 bg-success font-bold active:bg-lime-700',
            confirmClass
        )}
        on:click={_onConfirm}>{confirmText}</Button>
</div>
