<script>
    const handleClick = () => {
        let move = confirm('제이펍 사이트로 이동하시겠습니까?')
        move && location.assign('https://jpub.tistory.com/tag/Jpub')
    }
</script>

<h1>
    <a href="https://jpub.tistory.com/tag/Jpub" on:click|preventDefault={handleClick}>제이펍 출판사</a>
</h1>