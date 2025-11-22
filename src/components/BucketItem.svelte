<script>
    import Icon from '@iconify/svelte';

    export let bucket;
    export let onToggle;
</script>

<div class="bucketitem">
    <input type="checkbox" id={bucket.id}
           bind:checked={bucket.chk}/>
    <label for={bucket.id} class="checkcircle"
           on:click={() => onToggle(bucket.id)}
           on:keydown={() => onToggle(bucket.id)}
           role="presentation"
    >
        <Icon icon="ic:round-check"/>
    </label>
    <p>{bucket.text}</p>
    <button class="remove">
        <Icon icon="gridicons:trash"/>
    </button>
</div>