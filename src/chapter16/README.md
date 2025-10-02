# 16.  svelte transition

svelte는 transition: 지시문을 이요해 콘텐츠 요소의 화면전환 효과를 만든다.

## 16.1 transition: 지시문
| transition 명 | 설명                           |
| ------------ | ---------------------------- |
| fade         | 요소의 투명도를 이용해 애니메이션화          |
| blur         | 요소의 불투명도와 함께 흐림필터를 애니메이션에 적용 |
| slide        | 요소의 상단 혹은 좌측 기준으로 나타나거나 사라짐  |
| scale        | 요소의 불투명도와 크기에 애니메이션을 전환      |
| fly          | 요소의 x, y 위치와 불투명도에 애니메이션을 전환 |
| draw         | SVG 요소에 애니메이션을 적용            |
| crossfade    | 두 개의 요소 간 화면전환 효과를 만듬        |

## 16.2 fade 효과
in: 과 out: 지시문을 이용하여 다양한 효과를 적용할 수 있다.

#### 16.2.1 간단한 fade 효과

```sveltehtml
<script>  
    import {fade} from 'svelte/transition'  
    let visible = false;  
</script>  
  
<label>  
    <input type="checkbox" bind:checked={visible} /> 보임  
</label>  
  
{#if visible}  
    <p transition:fade>Svelte Fade Effect</p>  
{/if}
```

#### 16.2.2 fade 의 파라미터
파라미터는 객체로 처리되므로 중괄호를 두 번 작성해야 한다.

| 파라미터 명   | 설명                                                                     |
| -------- | ---------------------------------------------------------------------- |
| delay    | 효과를 지연시키는 속성, 기본값은 0, 숫자로 작성, 단위는 밀리초                                  |
| duration | 변화가 일어나는 시간, 기본값은 400, 숫자로 작성, 단위는 밀리초                                 |
| easing   | 변화에 속도감을 주는 속성,easing 함수명을 작성, 기본값은 linear, 사용하려면 easing 플러그인을 붙여 줘야 함 |

```sveltehtml
<script>
    import {fade} from "svelte/transition";
    import {elasticInOut} from "svelte/easing";
    let visible = false;
</script>

<label>
    <input type="checkbox" bind:checked={visible} /> 보임
</label>

{#if visible}
    <p transition:fade={{
        delay: 500, duration: 1000, easing: elasticInOut
    }}>Svelte Fade Effect</p>
{/if}

<style>
    p { height: 100px; background-color: orange; }
</style>
```

#### 16.2.3 in:과 out: 지시문을 사용
나타날 때와 사라질 때의 세부적인 파라미터를 다르게 설정

```sveltehtml
<script>
    import {fade} from 'svelte/transition';

    let visible = false;
</script>

<label>
    <input type="checkbox" bind:checked={visible}/> 보임
</label>

{#if visible}
    <p
            in:fade={{ duration: 400 }}
            out:fade={{ duration: 0 }}
    >Svelte Fade Effect</p>
{/if}

<style>
    p {
        height: 100px;
        background-color: orange;
    }
</style>
```

## 16.3 blur 효과
blur는 요소의 불투명도와 함께 흐림 필터를 애니메이션에 적용하는 기능

#### 16.3.1 간단한 blur 효과
```sveltehtml
<script>
    import {blur} from 'svelte/transition';

    let visible = false;
</script>

<label>
    <input type="checkbox" bind:checked={visible}/>보임
</label>

{#if visible}
    <p transition:blur>Svelte Blur Effect</p>
{/if}

<style>
    p {
        height: 100px;
        background-color: orange;
    }
</style>
```

#### 16.3.2 blur의 파라미터
| 파라미터명 | 설명                                          |
| ---------- |---------------------------------------------|
| delay | 효과를 지연시키는 속성. 기본값은 0이고, 숮사로 작성하면 된다. 단위는 ms |
| duration | 변화가 일어나는 시간. 기본값은 400, 숫자로 작성. 단위 ms |
| easing | 변화에 속도감을 주는 속성. easing 함수명을 작성. 기본값은 cubicInOut. 사용하려면 easing 플러그인을 붙여야 한다. |
| opacity | 애니메이션의 투명도 값을 지정. 기본값은 0 |
| amount | blur의 번짐 크기를 지정. 기본값은 5. 일반적으로는 숯피로 지정하지만 css의 단위를 사용하면 문자열이라 따옴표 내부에 사용 |

```sveltehtml
{#if visible}
    <p transition:blur={{amount: 5}}>Svelte Blur Effect</p>
{/if}
```

#### 16.3.3 in: 과 out: 지시문을 사용
```sveltehtml
{#if visible}
    <p
            in:blur={{amount: 5}}
            out:blur={{amount: 20}}
    >Svelte Blur Effect</p>
{/if}
```

## 16.4 슬라이드 효과
슬라이드 효과는 요소를 상단 혹은 좌측 기준으로 나타나거나 사라지게 한다.

#### 16.4.1 간단한 슬라이드 효과
```sveltehtml
<script>
    import {slide} from "svelte/transition";
    let visible = false;
</script>

<label>
    <input type="checkbox" bind:checked={visible}/> 보임
</label>

{#if visible}
    <p transition:slide>Svelte Slide Effect</p>
{/if}

<style>
    p {height: 100px; background-color: orange;}
</style>
```

#### 16.4.2 slide의 파라미터
axis는 전환이 발생되는 축. 기본값은 y로 상단에서부터 나타난다.

값은 x or y로 줄 수 있고 문자열이므로 따옴표 안에 작성해야 한다.

```sveltehtml
{#if visible}
    <p transition:slide={{axis: 'x'}}>Svelte Slide Effect</p>
{/if}
```

## 16.5 스케일 효과
scale 효과는 요소의 불투명도와 크기에 애니메이션을 적용한다.
이때 크기 변형의 중심점은 중앙 이다.

#### 16.5.1 간단한 스케일 효과
```sveltehtml
<script>
    import {scale} from "svelte/transition";
    let visible = false;
</script>

<label>
    <input type="checkbox" bind:checked={visible} /> 보임
</label>

{#if visible}
    <p transition:scale>Svelte Scale Effect</p>
{/if}

<style>
    p {height: 100px; background-color: orange;}
</style>
```

#### 16.5.2 scale의 파라미터
start는 최소로 작아지는 크기를 지정한다. 기본값은 0이고, 0 ~ 1 사이의 값을 입력하면 된다.

```sveltehtml
{#if visible}
    <p transition:scale={{start: 0.5}}>Svelte Scale Effect</p>
{/if}
```

#### 16.5.3 in:과 out: 지시문을 사용
```sveltehtml
{#if visible}
    <p
            in:scale={{start: 0}}
            out:scale={{start: 0.5}}
    >Svelte Scale Effect</p>
{/if}
```

나타날 때는 0% ~ 100%로 커지고, 사라질 때는 100% ~ 50%으로 사라지게 된다.
그러다 보니 실제 시간은 같으나 나타날 때 더 빨리 나타나는 것 같이 보인다.

## 16.6 플라이 효과
fly 효과는 요소의 x, y 위치와 불투명도를 조정하는 애니메이션 전환 효과. 움직임을 부여할 수 있다.
페이드 효과처럼 간단하게 fly로만 호출할 수도 있고, 파라미터를 통해 세부적으로 설정할 수 있다.

#### 16.6.1 간단한 플라이 효과
```sveltehtml
<script>
    import { fly } from 'svelte/transition';

    let visible = false;
</script>

<label>
    <input type="checkbox" bind:checked={visible} />보임
</label>

{#if visible}
    <p transition:fly>Svelte Fly Effect</p>
{/if}

<style>
    p { height: 100px; background-color: orange; }
</style>
```

#### 16.6.2 fly의 파라미터
x는 요소의 x offset 값 이다. 기본값은 0 이어서 속성값을 변환하지 않으면 움직이지 않는다.
y는 요소의 y offset 값 이다. 기본값은 0 이어서 속성값을 변환하지 않으면 움직이지 않는다.

```sveltehtml
{#if visible}
    <p transition:fly={{ x: 200, y: 200}}>Svelte Fly Effect</p>
{/if}
```

#### 16.6.3 in:과 out: 지시문을 사용
```sveltehtml
{#if visible}
    <p
            in:fly={{y: 200}}
            out:fly={{y: 0}}
    >Svelte Fly Effect</p>
{/if}
```

## 16.7 그리기 효과
그리기 효과는 svg 요소에 애니메이션을 적용하여 마치 그림을 그리는 것과 같은 효과를 나타내는 기능

speed는 그려지는 속도를 의미하며, 기본값은 없다. 전체 애니메이션 시간은 duration에 의해 결정되므로,
초반에 속도가 빠르면 후반에는 느려질 수 있다.

```sveltehtml
<script>
    import {draw} from "svelte/transition";
    import {quintOut} from "svelte/easing";

    let visible = false;
</script>

<label>
    <input type="checkbox" bind:checked={visible}/> 보임
</label>

<svg viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
    {#if visible}
        <path
                transition:draw={{ duration: 5000, delay: 500, easing: quintOut }}
                d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z"
                fill="none"
                stroke="cornflowerblue"
                stroke-width="0.1px"
                stroke-linejoin="round"
        />
    {/if}
</svg>
```

## 16.8 크로스페이드 효과
크로스페이드는 두 개의 요소 간의 화면전환 효과를 만든다.

A와 B라는 두 영역이 있다고 가정할 때, 크로스페이드는 A에서 B로 해당 요소를 전송한다.
전송과 수신이라는 두 단계를 거쳐 요소의 위치가 변경될 때 화면전환효과를 나타내는 기능

```sveltehtml
// crossfade 기본 문법
<script>
    import {crossfade} from "svelte/transition";
    
    const [send, receive] = crossfade({ 파라미터처리 });
</script>

<A구역 요소 out:send={{key}}></A구역 요소>
<B구역 요소 in:receive={{key}}></B구역 요소>
```

```sveltehtml
<script>
    let bid = 1;
    let buckets = [
        {id: bid++, chk: false, text: '웹 프론트엔드 개발자되기'},
        {id: bid++, chk: false, text: '유럽 여행하기'},
        {id: bid++, chk: false, text: '영국 가서 손흥민 축구 경기 보기'}
    ];

    $: remainingBuckets = buckets.filter(bucket => !bucket.chk).length;

    $: finished = buckets.filter(bucket => bucket.chk);
    $: finishedBuckets = finished.filter(bucket => bucket.chk).length;

    const onAdd = () => {
        buckets = buckets.concat({id: bid++, chk: false, text: ''});
    }
</script>

<h1>Bucket List</h1>
<div class="bucketBlock">
    <div class="unfinished">
        <h2>Unfinished Buckets</h2>
        {#each buckets as bucket (bucket.id)}
            <div>
                <input type="checkbox" bind:checked={bucket.chk}/>
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
            <div>
                <input type="checkbox" bind:checked={bucket.chk}/>
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

현재 버킷 리스트는 화면의 왼쪽인 A구역에만 구현된 것을 확인할 수 있다.
체크박스를 클릭하여 선택하면 화면의오른쪽인 B구역으로 이동하고, 체크를 해제하면 A구역으로 다시 이동하게 처리해보겠다.

```sveltehtml
<script>
    import {crossfade} from "svelte/transition";
    import {quintOut} from "svelte/easing";

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
            <div in:receive={{key: bucket.id}} out:send={{key: bucket.id}}>
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
            <div in:receive={{key: bucket.id}} out:send={{key: bucket.id}}>
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

우선 crossfade를 호출해야 사용할 수 있다. const [send, receive] = crossfade({});를 통해 crossfade()함수에서 반환하는 값을
send와 receive에 각각 담아주는 비구조화 할당 문법을 사용

crossfade() 함수 내부에는 파라미터로 이동 시간을 조정하는 duration과 easing 함수를 설정할 수 있다.

## 16.9 커스텀 transition 만들기

#### 16.9.1 transition 함수
svelte에서 제공하는 transition 외 다른 형태의 transition이 필요할 때, 만들 수 있다.
```js
function 트랜지션함수명(요소, {트랜지션파라미터} ) {
    return {
        트랜지션파라미터,
        css: () => {},
        tick: () => {},
    }
} 
```

첫 번째 매개변수는 보통 node라고 명명한다. 두 번째 매개변수는 트랜지션에 사용될 파라미터들로 주로
delay, duration, easing 등이 포함된다.

반환되는 객체에는 css와 tick이라는 속성이 있다. css는 transition을 정의할 때 사용되며, transition의 각 단계마다 호출되어
애니메이션을 적용한다.

tick은 js transition을 정의할 때 사용되며, 각 tick마다 호출되어 원하는 로직을 처리할 수 있다.

#### 16.9.2 css로 transition
```js
css: (t, u) => {
    // css 코드 리턴
}
```
t는 0 ~ 1 값을 가지며 요소가 추가될 때 0에서 1로 증가하고, 요소가 사라질 때는 1에서 0으로 감소한다.

u는 u === 1 - t로 계산되며, 반대의 방향성을 가진다.

```sveltehtml
<script>
    import {elasticOut} from "svelte/easing";
    import { fade } from "svelte/transition";

    let visible = false;

    function spin(node, {duration}) {
        return {
            duration,
            css: (t) => {
                const eased = elasticOut(t);

                return `
                    transform: scale(${eased}) rotate(${eased * 1080}deg);
                `;
            }
        }
    }
</script>

<label>
    <input type="checkbox" bind:checked={visible} /> 보임
</label>

{#if visible}
    <div class="centered" in:spin={{duration: 8000}} out:fade>
        <span>transitions!</span>
    </div>
{/if}

<style>
    .centered {
        position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
    }

    span {
        position: absolute; font-size: 4em;
        transform: translate(-50%, -50%);
    }
</style>
```

#### 16.9.3 tick을 통한 js transition 처리
```js
tick: (t, u) => {자바스크립트 코드리턴},
```
tick 속성에는 콜백 함수를 작성한다. t는 0 ~ 1 사이 값이고, u === 1 - t 다.

요소가 추가될 때 t는 0에서 1로 증가되는 형태고, 요소가 사라질 때는 1에서 0으로 감소한다.

```sveltehtml
<script>
    import { fade } from "svelte/transition";

    let visible = false;

    function typewriter(node, {speed = 1}) {
        const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

        if (!valid) {
            throw new Error(`이 전환은 자손으로 텍스트 노드가 혼자있는 요소에서만 작동합니다.`);
        }

        const text = node.textContent;
        const duration = text.length / (speed * 0.01);

        return {
            duration,
            tick: (t) => {
                const i = ~~(text.length * t);
                node.textContent = text.slice(0, i);
            }
        };
    }
</script>

<label>
    <input type="checkbox" bind:checked={visible} />보임
</label>

{#if visible}
    <p in:typewriter out:fade>안녕하세요!!! 오쌤의 니가스터디입니다.</p>
{/if}
```

~~는 틸트 연산자로 소수점은 버리고 정수로 반환하는 역할을 한다.

#### 16.9.4 crossfade에 fallback 처리
크로스페이드는 리스트가 구역 간에 이동될 때 전환 효과를 주지만,
리스트가 추가될 때는 효과가 적용되지 않는다. 이때 fallback을 사용하여
추가 시에도 custom transition을 적용할 수 있다.
따라서 이번에는 fallback을 이용하여 버킷 리스트가 추가될 때 custom transition을 적용하는 방법을 알아보자

```js
fallback(요소, {트랜지션파라미터}) {
    return {
        트랜지션파라미터,
        css: () => {},
        tick: () => {},
    }
}
```

```sveltehtml
<script>
// ...
const [send, receive] = crossfade({
    duration: 400,
    easing: quintOut,
    // fallback 추가
    fallback(node, params) {
        return {
            duration: 300,
            easing: quintOut,
            css: t => `
                transform: scale(${t});
                opacity: ${t};
            `
        }
    }
});
// ...
</script>
```

## 16.10 transition event
svelte는 js에 없는 transition event를 제공한다. transition event는 시작과 끝을 알려준다.

| 이벤트_명      | 설명  |
|------------|-----|
| introstart | 요소가 나타나는 transition 시작 event |
| introend | 요소나 나타나는 transition 종료 event |
| outrostart | 요소가 사라지는 transition 시작 event |
| outroend | 요소가 사라지는 transition 종료 event |

```sveltehtml
<script>
    import {fly} from 'svelte/transition'

    let visible = false;
    let status = '준비 중...';
</script>

<p>status: {status}</p>

<label>
    <input type="checkbox" bind:checked={visible} /> 보임
</label>

{#if visible}
    <p
            transition:fly = "{{y: 200, duration: 2000}}"
            on:introstart="{() => status = '요소가 나타나기 시작~~'}"
            on:outrostart="{() => status = '요소가 사라지기 시작~~'}"
            on:introend="{() => status = '요소가 다 나타남!'}"
            on:outroend="{() => status = '요소가 다 사라짐!'}"
    >Svelte Transition Event</p>
{/if}
```

## 16.11 transition 수식어
```js
<태그 transition:효과명|local></태그>
```

local 수식어는 상위 요소가 변할 때만 transition이 동작한다.

```sveltehtml
<script>
    import {slide} from 'svelte/transition'

    let showItems = true;
    let i = 5;
    let items = ['첫', '두', '세', '네', '다섯'];
</script>

<label>
    <input type="checkbox" bind:checked={showItems} /> 전부 보이게 처리
</label>

<label>
    <input type="range" bind:value={i} max=5>
</label>

{#if showItems}
    {#each items.slice(0, i) as item}
        <div transition:slide|local>{item}번째 리스트</div>
    {/each}
{/if}

<style>
    div{padding: 15px 0; border-top: 1px solid #ccc;}
    div:last-child{border-bottom: 1px solid #ccc;}
</style>
```