<script>
    import Masonry from '@/Components/Masonry.svelte';
    import Header from '@/Components/Header.svelte';
    import Sidebar from '@/Components/Sidebar.svelte';
    import Box from '@/Components/Box.svelte';
    import { boxes } from '@/stores/box';

    boxes.set([
        {id: 0, name: 'test0'},
        {id: 1, name: 'test1'},
        {id: 2, name: 'test2'},
        {id: 3, name: 'test3'},
    ]);
</script>

<Sidebar />
<Header />
<Masonry id="main" items={$boxes} let:item
    class="relative h-header-offset ml-sidebar bg-black p-2"
>
    <Box box={item} />
</Masonry>

