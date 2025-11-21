<script>
    import {crossfade} from "svelte/transition";
    import {quintOut} from "svelte/easing";
    import {flip} from "svelte/animate";

    const [send, receive] = crossfade({
        duration: 400,
        easing: quintOut
    });

    let bid = 1;
    let buckets = [
        {id: bid++, chk: false, text: '웹 프론트엔드 개발자되기'},
        {id: bid++, chk: false, text: '유럽 여행하기'},
        {id: bid++, chk: false, text: '영국 가서 손흥민 축구 경기 보기'}
    ];

    $: remainingBuckets = buckets.filter(bucket => !bucket.chk).length;

    let finished = [];
    $: finishedBuckets = finished.filter(bucket => bucket.chk).length;

    const onAdd = () => {
        buckets = buckets.concat({id: bid++, chk: false, text: ''});
    }

    const move = (item, from, to) => {
        to.push(item);

        return [from.filter(i => i !== item), to];
    }

    const moveLeft = item => {
        [finished, buckets] = move(item, finished, buckets);
    }

    const moveRight = item => {
        [buckets, finished] = move(item, buckets, finished);
    }
</script>

<h1>Bucket List</h1>
<div class="bucketBlock">
    <div class="unfinished">
        <h2>Unfinished Buckets</h2>
        {#each buckets as bucket (bucket.id)}
            <div in:receive={{key: bucket.id}} out:send={{key: bucket.id}} animate:flip>
                <input type="checkbox" bind:checked={bucket.chk} on:change={() => moveRight(bucket)}/>
                <input type="text" placeholder="당신의 버킷 리스트는 뭔가요?" style="width: 250px"
                       bind:value={bucket.text} disabled={bucket.chk}/>
            </div>
        {/each}
        <p>남은 버킷 리스트 : {remainingBuckets}</p>
        <button on:click={onAdd}>새로운 버킷 추가</button>
    </div>
    <div class="finished">
        <h2>Finished Buckets</h2>
        {#each finished as bucket (bucket.id)}
            <div in:receive={{key: bucket.id}} out:send={{key: bucket.id}} animate:flip>
                <input type="checkbox" bind:checked={bucket.chk} on:change={() => moveLeft(bucket)}/>
                <input type="text" placeholder="당신의 버킷 리스트는 뭔가요?" style="width: 250px"
                       bind:value={bucket.text} disabled={bucket.chk}/>
            </div>
        {/each}
        <p>완료된 버킷 리스트: {finishedBuckets}</p>
    </div>
</div>

<style>
    .bucketBlock {
        display: flex;
    }

    .unfinished {
        margin-right: 40px;
    }
</style>