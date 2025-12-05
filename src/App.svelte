<script>
    import BucketHeader from "./components/BucketHeader.svelte";
    import BucketList from "./components/BucketList.svelte";
    import BucketCreate from "./components/BucketCreate.svelte";
    import {initialBuckets} from "./bucketData.js";
    import { v4 as uuidv4 } from "uuid";

    let buckets = initialBuckets;
    let editMode = '';
    let bucketText = '';

    $: chkCount = buckets.filter((bucket) => !bucket.chk).length;

    const onToggle = (id) => {
        buckets = buckets.map((bucket) => {
            return bucket.id === id ? {...bucket, chk: !bucket.chk } : bucket;
        })
    }

    const onRemove = (id) => {
        buckets = buckets.filter((bucket) => bucket.id !== id);
    }

    const onEditMode = (id) => {
        editMode = id;
    }

    const offEditMode = () => {
        editMode = '';
    }

    const onEditItem = (editBucket) => {
        buckets = buckets.map(bucket => {
            if (bucket.id === editBucket.id) {
                bucket = editBucket;
            }
            return bucket;
        });
        offEditMode();
    }

    const onEditKeyup = (e, editBucket) => {
        if (e.keyCode === 13) {
            onEditItem(editBucket);
        }
    }

    const onDataChange = (e) => {
        bucketText = e.target.value;
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (bucketText) {
            const bucket = {
                id: uuidv4(),
                text: bucketText,
                chk: false
            };
            buckets = [...buckets, bucket];
        }
        bucketText = '';
    }

</script>

<svelte:head>
    <title>My Bucket List</title>
</svelte:head>
<div class="bucketbox">
    <BucketHeader {chkCount}/>
    <BucketList {buckets} {onToggle} {onRemove} {editMode} {onEditMode} {onEditKeyup}/>
    <BucketCreate {bucketText} {onDataChange} {onSubmit}/>
</div>