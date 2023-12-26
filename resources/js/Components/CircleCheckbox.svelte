<script context="module">
    let counter = 0;
</script>
<script>
    export let label = '';
    let value;
    let uId = 'input_'+counter++;
</script>
<div>
    <label for={uId}>{label}</label>
    <input id={uId} bind:value />
</div>
