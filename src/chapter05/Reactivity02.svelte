<script>
    let count = 0;

    $: double = count * 2;
    $: square = count * count;

    const handleClick = () => count++
</script>

<button on:click={handleClick}>
    클릭 수: {count} {count > 1 ? 'times' : 'time' }
</button>

<h3>두 배 구하기</h3>
<p>{count} x 2 = {double}</p>
<h3>제곱 구하기</h3>
<p>{count} x {count} = {square}</p>
