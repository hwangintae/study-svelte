<script>
    import Icon from '@iconify/svelte';

    export let bucket;
    export let onToggle;
    export let onRemove;
    export let editMode;
    export let onEditMode;
    export let onEditKeyup;

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
    {#if editMode === bucket.id}
        <input
                type="text"
                bind:value={bucket.text}
                on:keyup={(e) => onEditKeyup(e, bucket)}
        />
    {:else}
        <p on:dblclick={() => onEditMode(bucket.id)}>{bucket.text}</p>
    {/if}
    <button class="remove" on:click={() => onRemove(bucket.id)}>
        <Icon icon="gridicons:trash"/>
    </button>
</div>