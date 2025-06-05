<script>
    let buckets = [
        {chk: false, text: '웹 프런트엔드 갭라자되기'},
        {chk: false, text: '유럽 여행하기'},
        {chk: false, text: '영국 가서 손흥민 축구 경기 보기'}
    ];
</script>

<h1>Bucket List</h1>

{#each buckets as bucket}
    <div>
        <input type="checkbox" bind:checked={bucket.chk}/>
        <input type="text" placeholder="당신의 버킷 리스트는 뭔가요?" bind:value={bucket.text} disabled={bucket.chk}>
    </div>
{/each}

<p>남은 버킷 리스트 : 1</p>
<button>새로운 버킷 추가</button>
<button>새로운 버킷 제거</button>