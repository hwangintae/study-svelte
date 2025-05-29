<script>
    import Child01 from "./Child01.svelte";

    const data01 = {
        name : "행복이",
        age: 6,
        hobby: "밥먹기"
    }

    const data02 = {
        name: "우직이",
        age: 1,
        hobby: "깨물기"
    }
</script>

<Child01 {...data01} />
<Child01 {...data02} />