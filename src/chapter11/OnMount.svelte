<script>
    import {onMount} from "svelte";

    let comments = [];

    onMount(async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=21");
        comments = await res.json();
    });
</script>

<style>
    .comments {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 8px;
    }
</style>

<h3>회원 정보</h3>

<div class="comments">
    {#each comments as comment}
        <article>
            <h4>이름 : {comment.name}</h4>
            <h4>이메일 주소 : {comment.email}</h4>
        </article>
    {:else}
        <p>loading...</p>
    {/each}
</div>