<script>
    let teams = ['LG', 'KT', 'SSG', 'NC', '두산', 'KIA', '롯데', '삼성', '한화', '키움']
</script>

{#each teams as team, idx}
    <p>{idx + 1} 위, {team}</p>
{/each}