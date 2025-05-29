<script>
    import Child01 from "./Child01.svelte";

    let age01 = 30;
    let age02 = 31;

    const agePlus = () => {
        age01++;
        age02++;
    }

    const ageMinus = () => {
        age01--;
        age02--;
    }

</script>

<Child01 name="뚜직이" age={age01} hobby="눕기" />
<Child01 name="뿌직이" age={age02} hobby="잠자기" />

<button on:click={ageMinus}>나이 감소-</button>
<button on:click={agePlus}>나이 증가+</button>