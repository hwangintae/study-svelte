<script>
    import BucketItem from './BucketItem.svelte';

    export let buckets;
    export let onToggle;
</script>

<div class="bucketlist">
    {#each buckets as bucket, index(bucket)}
        <BucketItem {bucket} {onToggle}/>
    {/each}
</div>