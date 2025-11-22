<script>
    import BucketItem from './BucketItem.svelte';

    export let buckets;
    export let onToggle;
    export let onRemove;
</script>

<div class="bucketlist">
    {#each buckets as bucket, index(bucket)}
        <BucketItem {bucket} {onToggle} {onRemove}/>
    {/each}
</div>