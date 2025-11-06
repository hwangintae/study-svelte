# 17. 애니메이션과 모션
- svelte는 animate: 지시문을 이용해 애니메이션 효과를 간편하게 사용할 수 있도록 한다.

## 17.1 animate: 지시문과 flip 효과
- 애니메이션은 flip 효과만 지원한다. (flip은 First, Last, Invert, Play의 약어)

| 파라미터명 | 설명                                              |
| --- |-------------------------------------------------|
| delay | 지연시키는 속성. 기본값 0. 단위 ms                          |
| duration | 발생이 일어나는 시간. 기본값 d => Math.sqrt(d) * 128. 단위 ms |
| easing | 변화에 속도감을 주는 속성. 기본값 linear. 사용시 easing 플러그인을 붙여야 함 |

```sveltehtml
<script>
    import { flip } from 'svelte/animate';

    let items = [1, 2, 3];

    const shuffle = () => {
        items = items.sort(() => Math.random() - 0.5);
    }
</script>

{#each items as item (item)}
    <div class="item" animate:flip>
        {item}
    </div>
{/each}
<hr />
<button on:click={shuffle}>순환</button>

<style>
    .item {
        padding: 10px; margin: 5px;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        display: inline-block;
    }
</style>
```

```sveltehtml
<script>
    import {crossfade} from "svelte/transition";
    import {quintOut} from "svelte/easing";
    import {flip} from "svelte/animate";

    const [send, receive] = crossfade({
        duration: 400,
        easing: quintOut
    });

    let bid = 1;
    let buckets = [
        {id: bid++, chk: false, text: '웹 프론트엔드 개발자되기'},
        {id: bid++, chk: false, text: '유럽 여행하기'},
        {id: bid++, chk: false, text: '영국 가서 손흥민 축구 경기 보기'}
    ];

    $: remainingBuckets = buckets.filter(bucket => !bucket.chk).length;

    let finished = [];
    $: finishedBuckets = finished.filter(bucket => bucket.chk).length;

    const onAdd = () => {
        buckets = buckets.concat({id: bid++, chk: false, text: ''});
    }

    const move = (item, from, to) => {
        to.push(item);

        return [from.filter(i => i !== item), to];
    }

    const moveLeft = item => {
        [finished, buckets] = move(item, finished, buckets);
    }

    const moveRight = item => {
        [buckets, finished] = move(item, buckets, finished);
    }
</script>

<h1>Bucket List</h1>
<div class="bucketBlock">
    <div class="unfinished">
        <h2>Unfinished Buckets</h2>
        {#each buckets as bucket (bucket.id)}
            <div in:receive={{key: bucket.id}} out:send={{key: bucket.id}} animate:flip>
                <input type="checkbox" bind:checked={bucket.chk} on:change={() => moveRight(bucket)}/>
                <input type="text" placeholder="당신의 버킷 리스트는 뭔가요?" style="width: 250px"
                       bind:value={bucket.text} disabled={bucket.chk}/>
            </div>
        {/each}
        <p>남은 버킷 리스트 : {remainingBuckets}</p>
        <button on:click={onAdd}>새로운 버킷 추가</button>
    </div>
    <div class="finished">
        <h2>Finished Buckets</h2>
        {#each finished as bucket (bucket.id)}
            <div in:receive={{key: bucket.id}} out:send={{key: bucket.id}} animate:flip>
                <input type="checkbox" bind:checked={bucket.chk} on:change={() => moveLeft(bucket)}/>
                <input type="text" placeholder="당신의 버킷 리스트는 뭔가요?" style="width: 250px"
                       bind:value={bucket.text} disabled={bucket.chk}/>
            </div>
        {/each}
        <p>완료된 버킷 리스트: {finishedBuckets}</p>
    </div>
</div>

<style>
    .bucketBlock {
        display: flex;
    }

    .unfinished {
        margin-right: 40px;
    }
</style>
```

## 17.2 커스텀 애니메이션 만들기
```sveltehtml
<script>
    import { elasticOut } from "svelte/easing";

    let items = [1, 2, 3];
    const shuffle = () => {
        items = items.sort(() => Math.random() - 0.5);
    }

    function spinFlip(node, {duration}) {
        return {
            duration: 500,
            css: (t) => {
                const eased = elasticOut(t);

                return `transform: scale(${eased} rotate(${eased * 1080}deg));`;
            }
        }
    }
</script>

{#each items as item (item)}
    <div class="item" animate:spinFlip>
        {item}
    </div>
{/each}
<hr />

<button on:click={shuffle}>순환</button>

<style>
    .item {
        padding: 10px; margin: 5px;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        display: inline-block;
    }
</style>
```

## 17.3 모션의 tweened 효과
- 스벨트의 변수는 상태값이기 때문에 DOM이 업데이트될 때 자동으로 변숫값이 업데이트된다.
- 변숫값이 변경될 때 애니메이션을 사용할 수 있는 motion 기능을 제공한다.
  - 모션은 store를 기반으로 작동한다.
- tweend
  - 두 개의 매개변수를 갖는다.
  - 첫 번째, 변경될 값으로 초기값을 지정
  - 두 번째, 옵션으로 각 파라미터를 설정
  - store.set(), store.update()를 통해 옵션을 전달하고 값을 업데이트

| 파라미터명 | 설명                                                                                   |
| --- |--------------------------------------------------------------------------------------|
| delay | 효과를 지연시키는 속성. 기본값은 0. 단위는 ms                                                         |
| duration | 변화가 일어나는 시간. 기본값은 400. 단위는 ms                                                        |
| easing | 변화에 속도감을 주는 속성. easing 함수명을 작성하면 됨.<br/> 기본값은 cubicInOut. 사용하려면 easing 플러그인을 붙여 줘야 함 |
| interpolate | 두 값 사이를 보간하여 좀 더 부드럽게 보여주기 위한 옵션                                                      |

```sveltehtml
<script>
    import {tweened} from "svelte/motion";
    import {cubicOut} from "svelte/easing";

    const progress = tweened(0, {
        duration: 400,
        easing: cubicOut,
    });
</script>

<progress value={$progress} />
<button on:click={() => progress.set(0)}> 0% </button>
<button on:click={() => progress.set(0.25)}> 25% </button>
<button on:click={() => progress.set(0.5)}> 50% </button>
<button on:click={() => progress.set(0.75)}> 75% </button>
<button on:click={() => progress.set(1)}> 100% </button>

<style>
    progress {display: block; width: 100%;}
</style>
```

## 17.4 모션의 spring 효과
- spring 함수는 값이 변경될 때 스프링처럼 관성을 이용하여 움직이는 모션

| 파라미터명     | 설명                                                       |
|-----------|----------------------------------------------------------|
| stiffness | 관성이라는 뜻으로 수치가 높을수록 뻣뻣함이 사라짐.<br/>기본값은 0.15이고, 0 ~ 1 사이 값 |
| damping   | 스프링처럼 튕기는 모션 범위. 값이 낮을 수록 범위가 넓어짐.<br/>기본값은 0.8          |
| precision | 스프링처럼 튕기는 동작이 정착된 것으로 간주. 값이 클수록 튕기는 횟수가 줄어듬. 기본값 0.01   |

```sveltehtml
<script>
    let x, y;
</script>

<svg on:mousemove={(e) => {x = e.clientX; y = e.clientY;}}>
    <circle cx={x} cy={y} r="10" />
</svg>

<style>
    svg{width: 100%; height: 100%; margin: -8px;}
    circle{fill: #ff3e00;}
</style>
```

- 현재는 spring 함수를 적용하지 않아서 마우스를 따라다기만 한다.

```sveltehtml
<script>
    import {spring} from 'svelte/motion';

    let coords = spring(
            {x: 50, y: 50},
            {
                stiffness: 0.1,
                damping: 0.25
            }
    );
</script>

<svg on:mousemove={(e) => coords.set({x: e.clientX, y: e.clientY})}>
    <circle cx={$coords.x} cy={$coords.y} r="10" />
</svg>

<style>
    svg{width: 100%; height: 100%; margin: -8px;}
    circle{fill: #ff3e00;}
</style>
```