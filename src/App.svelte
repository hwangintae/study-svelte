<script>
    import BucketHeader from "./components/BucketHeader.svelte";
    import BucketList from "./components/BucketList.svelte";
    import BucketCreate from "./components/BucketCreate.svelte";
    import {initialBuckets} from "./bucketData.js";

    let buckets = initialBuckets;

    $: chkCount = buckets.filter((bucket) => !bucket.chk).length;

    const onToggle = (id) => {
        buckets = buckets.map((bucket) => {
            return bucket.id === id ? {...bucket, chk: !bucket.chk } : bucket;
        })
    }

    const onRemove = (id) => {
        buckets = buckets.filter((bucket) => bucket.id !== id);
    }
</script>

<svelte:head>
    <title>My Bucket List</title>
</svelte:head>
<div class="bucketbox">
    <BucketHeader {chkCount}/>
    <BucketList {buckets} {onToggle} {onRemove}/>
    <BucketCreate/>
</div>