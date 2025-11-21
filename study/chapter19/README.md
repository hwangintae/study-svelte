# 19. svelte 특별 요소

## 19.1 `<svelte:self>` 요소
- 컴포넌트가 자기 자신을 재귀적으로 포함할 수 있다.
- 마크업 영역의 최상위 수준에는 사용할 수 없다.
- 무한 루프를 방지하려면 `if`, `each` 블록의 내부에 있거나 `slot`에 전달해야한다.
```sveltehtml
<script>
    export let count;
</script>

{#if count > 0}
    <p>카운트다운... {count}</p>
    <svelte:self count={count - 1} />
{:else}
    <p>발사!</p>
{/if}
```

## 19.2 `<svelte:component>` 요소
- 속성이 변경되면 구성 요소가 삭제되고 다시 생성된다.

```sveltehtml
<!-- Food01.svelte -->
<h3>햄버거를 선택했습니다.</h3>
```

```sveltehtml
<!-- Food02.svelte -->
<h3>피자를 선택했습니다.</h3>
```

```sveltehtml
<!-- Food03.svelte -->
<h3>치킨을 선택했습니다.</h3>
```

```sveltehtml
<script>
    import Food01 from "./Food01.svelte";
    import Food02 from "./Food02.svelte";
    import Food03 from "./Food03.svelte";

    const options = [
        {name: '햄버거', component: Food01},
        {name: '피자', component: Food02},
        {name: '치킨', component: Food03}
    ];

    let selected = options[0];
</script>

<h2>음식을 선택하세요.</h2>
<select bind:value={selected}>
    {#each options as option}
        <option value={option}>{option.name}</option>
    {/each}
</select>

<svelte:component this={selected.component} />
```

## 19.3 <svelte:element> 요소
- 동적으로 지정된 유형의 요소를 구현할 수 있다.

```sveltehtml
<script>
    const options = ['h1', 'h3', 'p']

    let selected = options[0];
</script>

<select bind:value={selected}>
    {#each options as option}
        <option value={option}>{option}</option>
    {/each}
</select>

<svelte:element this={selected}>현재 요소는 {selected} 태그 입니다.</svelte:element>
```

## <svelte:window> 요소
