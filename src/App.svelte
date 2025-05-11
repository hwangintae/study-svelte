<script>
	let num = 0;
	$: square = num * num;
	const incrementCount = () => num = num + 1;
</script>

<button on:click={incrementCount}>
	클릭횟수 : {num}
</button>
<p>제곱 값: {square}</p>