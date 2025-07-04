<script>
    import {onDestroy, onMount} from "svelte";

    onMount(() => {
        console.log('onMount() 실행');
    });

    onDestroy(() => {
        console.log('onDestroy() 실행');
    })
</script>

<div>
    <h3>자식 component</h3>
</div>