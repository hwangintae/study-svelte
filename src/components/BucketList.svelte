<script>
    import BucketItem from './BucketItem.svelte';

    export let buckets;
    export let onToggle;
    export let onRemove;
    export let editMode;
    export let onEditMode;
    export let onEditKeyup;

</script>

<div class="bucketlist">
    {#each buckets as bucket, index(bucket)}
        <BucketItem {bucket} {onToggle} {onRemove} {editMode} {onEditMode} {onEditKeyup}/>
    {/each}
</div>