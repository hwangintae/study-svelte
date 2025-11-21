<script>
    let x = null;
    const numChange = (e) => x = e.target.value;
</script>

<label for="textBox">양수/음수 테스트</label>
<input type="text" id="textBox" on:keyup={numChange} placeholder="정수를 입력하세요">
{#if x > 0}
    <p>양수 입니다.</p>
{:else if x < 0}
    <p>음수 입니다.</p>
{:else}
    <p>정수를 입력하세요</p>
{/if}