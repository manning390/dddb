<script>
    import Masonry from '@/Components/Masonry.svelte';
    import Header from '@/Components/Header.svelte';
    import Sidebar from '@/Components/Sidebar.svelte';
    import Box from '@/Components/Box.svelte';
    import { createBoxesStore } from '@/stores/box';

    const boxes = createBoxesStore([ ]);
</script>

<Sidebar />
<Header />
<Masonry id="main" items={$boxes} let:item
    class="relative h-header-offset ml-sidebar bg-black p-2"
>
    <Box box={item} />
</Masonry>

