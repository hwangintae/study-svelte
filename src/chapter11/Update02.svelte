<script>
    import Eliza from 'elizabot';
    import { beforeUpdate, afterUpdate } from 'svelte';

    let div;
    let autoscroll;

    beforeUpdate(() => {
        autoscroll = div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
    });

    afterUpdate(() => {
        if (autoscroll) div.scrollTo(0, div.scrollHeight);
    });

    const eliza = new Eliza();

    let comments = [{ author: 'eliza', text: eliza.getInitial() }];

    const handleKeydown = e => {
        if (e.key === 'Enter') {
            const text = e.target.value;
            if (!text) return;

            comments = comments.concat({
                author: 'user',
                text
            });

            e.target.value = '';

            const reply = eliza.transform(text);

            setTimeout(() => {
                comments = comments.concat({
                    author: 'eliza',
                    text: '...',
                    placeholder: true
                });
                setTimeout(() => {
                    comments = comments
                        .filter((comment) => !comment.placeholder)
                        .concat({
                            author: 'eliza',
                            text: reply
                        });
                }, 500 + Math.random() * 500);
            }, 200 + Math.random() * 200);
        }
    }
</script>

<div class="chat">
    <h1>Eliza</h1>
    <div class="scrollable" bind:this={div}>
        {#each comments as comment}
            <article class={comment.author}>
                <span>{comment.text}</span>
            </article>
        {/each}
    </div>
    <input on:keydown={handleKeydown} />
</div>

<style>
    .chat {
        display: flex; flex-direction: column;
        height: 100%; max-width: 320px;
    }
    .scrollable {
        flex: 1 1 auto; border-top: 1px solid #ccc;
        margin: 0 0 0.5em 0; overflow-y: auto;
    }
    article { margin: 0.5em 0; }
    .user { text-align: right; }
    span {
        color: black; padding: 0.5em 1em;
        display: inline-block;
    }
    .eliza span {
        background-color: #eee;
        border-radius: 1em 1em 1em 0;
    }
    .user span {
        background-color: #0074d9;
        color: white;
        border-radius: 1em 1em 0 1em;
    }
</style>