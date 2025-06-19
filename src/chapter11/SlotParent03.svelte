<script>
    import Child03 from "./Child03.svelte";
</script>

<Child03 let:hovering={active}>
    <span class:active={active}>스벨트(Svelte)</span>
</Child03>

<Child03 let:hovering={active}>
    <span class:active={active}>리액트(React)</span>
</Child03>

<style>
    .active {
        background-color: #000;
        color: #fff;
        cursor: pointer;
    }
</style>