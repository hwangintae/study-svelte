<script>
    import {bests} from "../store";
    import BestItem from "../components/BestItem.svelte";
</script>

<ul>
    {#each $bests as best, index(best)}
        <BestItem {best} />
    {/each}
</ul>