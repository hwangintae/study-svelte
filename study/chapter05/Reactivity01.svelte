<script>
    let count = 0;
    const handleClick = () => count++
</script>

<button on:click={handleClick}>
    클릭 수: {count} {count > 1 ? 'times' : 'time' }
</button>