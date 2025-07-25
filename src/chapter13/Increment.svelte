<script>
    import { count } from './Store01'

    const increment = () => {
        count.update((n) => n + 1);
    }
</script>

<button on:click={increment}> + </button>