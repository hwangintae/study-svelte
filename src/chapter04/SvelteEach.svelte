<script>
    let langs = [
        {
            name: '스벨트',
            release: 2016,
            src: 'https://svelte.dev/favicon.png'
        }, {
            name: '리액트',
            release: 2013,
            src: 'https://ko.react.dev/favicon-32x32.png'
        }, {
            name: 'Vue.js',
            release: 2013,
            src: 'https://vuejs.org/logo.svg'
        },
    ]
</script>

{#each langs as lang}
    <h3>이름: {lang.name}</h3>
    <h3>배포 연도: {lang.release} 년</h3>
    <img src={lang.src} alt={lang.name} width="50"/>
{/each}