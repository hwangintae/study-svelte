<script>
    const today = new Date();
    const week = ["일", "월", "화", "수", "목", "금", "토"];

    const dateString = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
        day: today.getDay()
    };

    const { year, month, date, day } = dateString;

    export let chkCount;
</script>

<div class="bucketheader">
    <h1>My Bucket List</h1>
    <h2>현재: {year}년 {month}월 {date}일 {week[day]}요일</h2>
    <p>할 일 {chkCount}개 남음</p>
</div>