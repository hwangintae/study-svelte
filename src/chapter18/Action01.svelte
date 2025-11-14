<script>
    const colorChange = (node) => {
        node.style.color = 'red';
    }
</script>

<h1 use:colorChange>제목 테그1</h1>
<h1 use:colorChange>제목 테그2</h1>
<h1>제목 테그3</h1>
