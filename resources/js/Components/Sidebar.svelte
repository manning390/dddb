<script>
    import { Search, Filter } from '@/Components/icons';
</script>

<div id="sidebar" class="b-0 fixed h-full w-sidebar overflow-y-auto">
    <div class="flex items-center justify-center gap-4 p-4 text-center">
        <img src="/img/fish.png" alt="Kobold Logo" class="h-[117px]"/>
        <div class="flex flex-col">
            <h1 class="text-3xl font-medium">D&amp;D DB</h1>
            <span class="text-sm">An unofficial D&amp;D database</span>
        </div>
    </div>
    <div class="flex items-center gap-4 border-y border-stone-500 bg-stone-700">
        <div class="flex w-12 justify-center bg-stone-500 p-2 text-white">
            <Search />
        </div>
        <div class="flex items-center">
            <input
                type="text"
                name="search"
                class="w-56 rounded bg-stone-900 p-1 text-xs"
                placeholder="Search" />
            <button class="ml-4">
                <Filter />
            </button>
        </div>
    </div>
</div>
