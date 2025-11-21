<script>
    let text = "내용을 입력하세요.";

    const handleInitText = () => text = "";
</script>

<textarea on:click={handleInitText} bind:value={text} rows="5"/>
<p>{text}</p>