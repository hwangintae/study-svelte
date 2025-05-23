<script>
    let m = {x: 0, y: 0}

    const handleMouseMove = (e) => {
        m.x = e.clientX;
        m.y = e.clientY;
    }
</script>

<div on:mousemove={handleMouseMove} role="presentation">
    x 좌표: {m.x} <br>
    y 좌표: {m.y}
</div>

<style>
    div {
        width: 100%;
        height: 100%;
    }
</style>