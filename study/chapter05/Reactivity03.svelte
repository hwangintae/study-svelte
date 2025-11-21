<script>
    let count = 1;

    $: double = count * 2;
    $: square = count * count;

    $: {
        console.log('두 배 값 : ' + double);
        console.log('제곱 값 : ' + square);
    }

    const handleClick = () => count++;
</script>

<button on:click={handleClick}>
    클릭 수 : {count}
</button>

<h3>두 배 구하기</h3>
<p>{count} x 2 = {double}</p>
<h3>제곱 구하기</h3>
<p>{count} x {count} = {square}</p>