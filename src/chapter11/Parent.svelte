<script>
    import Child05 from "./Child05.svelte";

    let isChildElementView = false;

    const handleClick = (bool) => {
        isChildElementView = bool;
    }
</script>

<h2> 부모 component </h2>

<button on:click={() => handleClick(true)}>Child component 활성화 </button>
<button on:click={() => handleClick(false)}>Child component 비활성화 </button>
<hr />

{#if isChildElementView}
    <Child05 />
{/if}