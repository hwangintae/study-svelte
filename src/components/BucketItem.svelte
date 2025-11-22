<script>
    import Icon from '@iconify/svelte';

    export let bucket;
</script>

<div class="bucketitem">
    <input type="checkbox" id={bucket.id}
    bind:checked={bucket.chk}/>
    <label for={bucket.id} class="checkcircle">
        <Icon icon="ic:round-check" />
    </label>
    <p>{bucket.text}</p>
    <button class="remove">
        <Icon icon="gridicons:trash" />
    </button>
</div>