<script>
    import BucketItem from './BucketItem.svelte';

    export let buckets;
</script>

<div class="bucketlist">
    {#each buckets as bucket, index(bucket)}
        <BucketItem {bucket}/>
    {/each}
</div>