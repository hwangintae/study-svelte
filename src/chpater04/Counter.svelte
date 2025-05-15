<script>
    let num = 0;

    const increaseNumber = () => num++;
    const decreaseNumber = () => num--;
</script>

<button on:click={increaseNumber}>+</button>
<button on:click={decreaseNumber}>-</button>
<hr/>
<h1> 클릭횟수 : {num} </h1>