<script>
    import { count } from './Store01'

    const reset = () => {
        count.set(0);
    }
</script>

<button on:click={reset}> reset </button>