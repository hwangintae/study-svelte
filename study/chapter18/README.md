# 18. svelte action
- svelte에서 DOM을 직접적으로 제어할 수 있다.
  - input 요소에 자동으로 초점을 맞추고 싶을 때
  - HTML 요소에 특별한 동작을 추가하고 싶을 때
- 이럴 때 svelte의 action 기능을 사용하면 만들 수 있다.

## 18.1 action의 기본 사용 방법
- action은 DOM 요소가 DOM에 추가될 때 실행하는 함수
- DOM 요소에 use: 지시문을 이용하여 함수 명령을 받는다.

```sveltehtml
<script>
    const colorChange = (node) => {
        node.style.color = 'red';
    }
</script>

<h1 use:colorChange>제목 테그1</h1>
<h1 use:colorChange>제목 테그2</h1>
<h1>제목 테그3</h1>
```

```sveltehtml
<script>
    let isInput01 = false;
    let isInput02 = false;

    const handleClick01 = () => {
        isInput01 = true;
    }

    const handleClick02 = () => {
        isInput02 = true;
    }

    const inputFocus = (node) => {
        node.focus();
    }
</script>

<button on:click={handleClick01}>첫 번째 입력 요소 활성</button>
{#if isInput01}
    <input type="text" placeholder="첫 번째" use:inputFocus />
{/if}
<hr />
<button on:click={handleClick02}>두 번째 입력 요소 활성</button>
{#if isInput02}
    <input type="text" placeholder="두 번째" use:inputFocus />
{/if}
```

## 18.2 action에 매개변수 전달
```sveltehtml
<script>
    let isInput01 = false;
    let isInput02 = false;

    const handleClick01 = () => {
        isInput01 = true;
    }

    const handleClick02 = () => {
        isInput02 = true;
    }

    const inputFocus = (node, inputValue) => {
        node.focus();
        node.value = inputValue;
    }
</script>

<button on:click={handleClick01}>첫 번째 입력 요소 활성</button>
{#if isInput01}
    <input type="text" placeholder="첫 번째" use:inputFocus={'값처리01'} />
{/if}
<hr/>
<button on:click={handleClick02}>첫 번째 입력 요소 활성</button>
{#if isInput02}
    <input type="text" placeholder="두 번째" use:inputFocus={'값처리02'} />
{/if}
```

## 18.3 update와 destroy
- update와 destroy는 action 함수의 lifecycle과 관련됨
- update는 해당 action이 사용하는 곳에서 값이 변경될 때
- destroy는 해당 DOM 요소가 사라질 때 호출됨

```sveltehtml
<script>
    let isInput = false;
    let inputValue = '아직 없음';

    const handleClick = (param) => {
        isInput = param;
    }

    const inputFocus = (node, value) => {
        node.focus();
        node.value = value;
    }
</script>

<button on:click={() => handleClick(true)}>활성</button>
<button on:click={() => handleClick(false)}>비활성</button>
<hr />
{#if isInput}
    <input type="text" bind:value={inputValue} use:inputFocus={inputValue} />
{/if}
<h3>입력값 : {inputValue}</h3>
```

```sveltehtml
<script>
    let isInput = false;
    let inputValue = '아직 없음';

    const handleClick = (param) => {
        isInput = param;
    }

    const inputFocus = (node, value) => {
        node.focus();
        node.value = value;

        return {
            update: (newVal) => {
                node.value = newVal;
            },
            destroy: () => {
                inputValue = '없음';
            }
        }
    }
</script>
<button on:click={() => handleClick(true)}>활성</button>
<button on:click={() => handleClick(false)}>비활성</button>
<hr />
{#if isInput}
    <input type="text" bind:value={inputValue} use:inputFocus={inputValue} />
{/if}
<h3>입력값: {inputValue}</h3>
```

## 18.4 외부 라이브러리를 이용핸 액션

패키지 설치
```terminaloutput
npm i svelte-dnd-action
```

```sveltehtml
<script>
    import {flip} from "svelte/animate"
    import {dndzone} from "svelte-dnd-action";

    let items = [
        {id: 1, name: "item1"},
        {id: 2, name: "item2"},
        {id: 3, name: "item3"},
        {id: 4, name: "item4"},
    ];

    const flipDurationMs = 300;

    function handleDndConsider(e) {
        items = e.detail.items;
    }

    function handleDndFinalize(e) {
        items = e.detail.items;
    }
</script>

<section
        use:dndzone="{{items, flipDurationMs}}"
        on:consider="{handleDndConsider}"
        on:finalize="{handleDndFinalize}">
    {#each items as item(item.id)}
        <div animate:flip="{{duration: flipDurationMs}}">{item.name}</div>
    {/each}
</section>

<style>
    section {
        width: 50%; padding: 0.3em;
        border: 1px solid black;
        overflow: scroll; height: 200px;
    }
    div {
        width: 50%; padding: 0.2em; margin: 0.15em 0;
        background-color: blue; color: white;
    }
</style>
```
- dndzone을 svelte-dnd-action로 부터 불러옴
- items 배열에 드래그 앤 드롭할 요소를 담아 each 블록을 통해 반복 처리
- flipDurationMs은 드래그 앤 드롭이 일어날 시간
- on:consider, on:finalize는 svelte-dnd-action 이 제적한 커스텀 이벤트