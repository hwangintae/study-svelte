<script>
    let weekDays = ['일', '월', '화', '수', '목', '금', '']
</script>
<select>
    {#each weekDays as weekDay}
        <option>{weekDay}요일</option>
    {/each}
</select>