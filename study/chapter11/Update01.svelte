<script>
    import {afterUpdate, beforeUpdate} from "svelte";

    let num = 0;

    beforeUpdate(() => {
        console.log('update가 실행되기 전...');
    });

    afterUpdate(() => {
        console.log('update 완료!');
    });

    const handleClick = () => {
        num++;
    }
</script>

<button on:click={handleClick}>숫자 증가</button>
<p>현재 숫자: {num}</p>