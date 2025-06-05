<script>
    let buckets = [
        {chk: false, text: '웹 프런트엔드 갭라자되기'},
        {chk: false, text: '유럽 여행하기'},
        {chk: false, text: '영국 가서 손흥민 축구 경기 보기'}
    ];

    $:remain = buckets.filter(bucket => !bucket.chk).length;

    const onAdd = () => {
        buckets = buckets.concat({chk: false, text: ''});
    }

    const onRemove = () => {
        buckets = buckets.filter(bucket => !bucket.chk);
    }

</script>

<h1>Bucket List</h1>

{#each buckets as bucket}
    <div>
        <input type="checkbox" bind:checked={bucket.chk}/>
        <input type="text" placeholder="당신의 버킷 리스트는 뭔가요?" bind:value={bucket.text} disabled={bucket.chk}>
    </div>
{/each}

<p>남은 버킷 리스트 : {remain}</p>
<button on:click={onAdd}>새로운 버킷 추가</button>
<button on:click={onRemove}>새로운 버킷 제거</button>