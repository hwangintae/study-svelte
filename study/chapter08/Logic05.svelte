<script>
    let langs = [
        {
            id: 1,
            name: "스벨트",
            release: 2016
        }, {
            id: 2,
            name: "리액트",
            release: 2013
        }, {
            id: 3,
            name: "뷰",
            release: 2013
        }]
</script>

<h3>웹 프론트엔드 언어</h3>
{#each langs as lang (lang.id)}
    <div style="border: 2px solid black; width: 200px; padding: 10px;">
        <h4>이름 : {lang.name}</h4>
        <p>배포 연 : {lang.release}년</p>
    </div>
{/each}
