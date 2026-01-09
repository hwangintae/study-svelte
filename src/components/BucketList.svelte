<script>
    import {buckets} from '../store';
    import BucketItem from './BucketItem.svelte';
    import {fade, slide} from "svelte/transition";
    import {flip} from "svelte/animate";
</script>

<div class="bucketlist">
    {#each $buckets.buckets as bucket, index(bucket)}
        <div in:fade out:slide animate:flip>
            <BucketItem {bucket} />
        </div>
    {/each}
</div>