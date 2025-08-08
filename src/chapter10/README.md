# 10. 기타 요소 바인딩


바인딩은 폼 데이터와 많이 사용되지만. 다른 요소들과도 사용할 수 있다.
1. each 블록
2. 멀티미디어 요소
3. 공간 방인딩
4. bind:this 바인딩
5. component 바인딩
   등이 있다.

## 10.1  each 블록 바인딩
#### 10.1.1 마크업 구조 확인하기
```html
<h1>Bucket List</h1>

<!-- 반복될 리스트 구역 -->
<div>
	<input type="checkbox" />
	<input type="text" placeholder="당신의 버킷 리스트는 뭔가요?" value="웹 프런트엔드 개발자되기" style="width: 250px">
</div>
<!-- 반복될 리스트 구역 -->

<p>남은 버킷 리스트 : 1</p>
<button>새로운 버킷 추가</button>
<button>새로운 버킷 제거</button>
```

#### 10.1.2 배열 데이터 추가하기
```diff
+ <script>
+	let buckets = [
+		{chk: false, text: '웹 프런트엔드 갭라자되기'},
+		{chk: false, text: '유럽 여행하기'},
+		{chk: false, text: '영국 가서 손흥민 축구 경기 보기'}
+	];
+ </script>

<h1>Bucket List</h1>

+ {#each buckets as bucket}  
	<div>
-	<input type="checkbox" />
-	<input type="text" placeholder="당신의 버킷 리스트는 뭔가요?" value="웹 프런트엔드 개발자되기" style="width: 250px">
+		<input type="checkbox" bind:checked={bucket.chk}/>  
+		<input type="text" placeholder="당신의 버킷 리스트는 뭔가요?"
+	        bind:value={bucket.text} disabled={bucket.chk}>  
	</div>
+ {/each}

<p>남은 버킷 리스트 : 1</p>
<button>새로운 버킷 추가</button>
<button>새로운 버킷 제거</button>
```

checkbox type에서는 bind:checked={bucket.chk}로 바인딩하여 chk 속성값이 true이면 체크, false이면 체크되지 않도록 처리

input 태그 요소 중 text type에는 bind:value={bucket.text}를 사용하여 value 값에 text 속성의 문자열이 들어가게 처리. 그리고 chk 속성값이 true 일 때는 disabled 속성을 사용하여 입력이 불가능하도록 처리

#### 10.1.3 남은 버킷 리스트 개수 구하기
```diff
+ <script>
+	let buckets = [
+		{chk: false, text: '웹 프런트엔드 갭라자되기'},
+		{chk: false, text: '유럽 여행하기'},
+		{chk: false, text: '영국 가서 손흥민 축구 경기 보기'}
+	];
+ </script>
+ $:remain = buckets.filter(bucket => !bucket.chk).length;

<h1>Bucket List</h1>

+ {#each buckets as bucket}  
	<div>
-	<input type="checkbox" />
-	<input type="text" placeholder="당신의 버킷 리스트는 뭔가요?" value="웹 프런트엔드 개발자되기" style="width: 250px">
+		<input type="checkbox" bind:checked={bucket.chk}/>  
+		<input type="text" placeholder="당신의 버킷 리스트는 뭔가요?"
+	        bind:value={bucket.text} disabled={bucket.chk}>  
	</div>
+ {/each}

- <p>남은 버킷 리스트 : 1</p>
+ <p>남은 버킷 리스트 : {remain}</p>
<button>새로운 버킷 추가</button>
<button>새로운 버킷 제거</button>
```

#### 10.1.4 event 함수 처리
첫 번째 버튼을 클릭하면 새로운 버킷 리스트를 추가하고,
두 번째 버튼을 클릭하면 체크된 버킷 리스트를 제거하는 기능

```diff
+ <script>
+	let buckets = [
+		{chk: false, text: '웹 프런트엔드 갭라자되기'},
+		{chk: false, text: '유럽 여행하기'},
+		{chk: false, text: '영국 가서 손흥민 축구 경기 보기'}
+	];
+ </script>
+ $:remain = buckets.filter(bucket => !bucket.chk).length;

const onAdd = () => {
	buckets = buckets.concat({chk: false, text: ''});
}

const onRemove = () => {
	buckets = buckets.filter(bucket => !bucket.chk);
}

<h1>Bucket List</h1>

+ {#each buckets as bucket}  
	<div>
-	<input type="checkbox" />
-	<input type="text" placeholder="당신의 버킷 리스트는 뭔가요?" value="웹 프런트엔드 개발자되기" style="width: 250px">
+		<input type="checkbox" bind:checked={bucket.chk}/>  
+		<input type="text" placeholder="당신의 버킷 리스트는 뭔가요?"
+	        bind:value={bucket.text} disabled={bucket.chk}>  
	</div>
+ {/each}

- <p>남은 버킷 리스트 : 1</p>
+ <p>남은 버킷 리스트 : {remain}</p>
- <button>새로운 버킷 추가</button>
- <button>새로운 버킷 제거</button>
+ <button on:click={onAdd}>새로운 버킷 추가</button>
+ <button on:click={onRemove}>새로운 버킷 제거</button>
```

## 10.2 멀티미디어 요소 바인딩
svelte에서는 오디오, 비디오와 같은 멀티미디어 요소에 바인딩하는 기능이 있다.

audio 태그 요소와 video 태그 요소에 바인딩할 수 있는 몇 가지 속성이 있으며, 이는 읽기 전용 속성과 일고 쓰기가 가능한 속성으로 나뉩니다.

#### 10.2.1 읽기 전용 속성
| 속성          | 설명                                        |
| ----------- | ----------------------------------------- |
| iduration   | 총 재생 길이 (단위 초)                            |
| buffered    | {start, end} 객체들의 배열로, 버퍼 된 위치를 표시함       |
| seekable    | {start, end} 객체들의 배열로, 위치를 찾을 수 있는 범위를 표시 |
| played      | {start, end} 객체들의 배열로, 재생했던 위치들을 표시       |
| seeking     | 찾는 중인지를 true/false로 표시                    |
| ended       | 재생이 끝났는지를 true/false로 표시                  |
| videoWidth  | video 태그의 너비를 나타냄                         |
| videoHegiht | video 태그의 높이를 나타냄                         |

#### 10.2.2 읽고 쓰기 속성
읽는 것뿐만 아니라 쓰기도 가능하여 상탯값으로 사용할 수 있는 속성에 대해 알아보자

| 속성           | 설명                      |
| ------------ | ----------------------- |
| currentTime  | 현재 재생 위치를 나타냄 (단위 초)    |
| playbackRate | 재생 속도를 나타냄 (normal: 1)  |
| paused       | 일시 정지됐는지 true/false로 표시 |
| volume       | 음량의 크기를 나타냄 (0, 1 사잇값)  |

#### 10.2.3 멀티미디어 요소 바인딩 처리
```svelte
<script>
	let duration;
	let currentTime = 0;
	let paused = true;
	
	const onPlay = () => paused = false;
	const onpause = () => paused = true;
	const oninitial = () => {
		paused = true;
		cuttentTime = 0;
	}
</script>

<h1>Caminandes: llamigos</h1>
<p>From <a href="https://studio.blender.org/films">Blender Studio</a>. CC-BY</p>
<video
    poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg"
    src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"
    width="500"
    bind:duration={duration}
    bind:currentTime={currentTime}
    bind:paused={paused}
>
    <track kind="captions" />
</video>
<br />
<button on:click={onPlay}>재생</button>
<button on:click={onPause}>멈춤</button>
<button on:click={oninitial}>초기화</button>
<p>총 재생 시간 : {duration}초</p>
<p>현재 재생 위치 : {currentTime}초</p>
```

## 10.3 공간 바인딩
블록 레벨의 요소(div, h1 등)들은 clientWidth, clientHeight, offsetWidth, offsetHeight를 읽기 전용으로 바인딩할 수 있다. 이러한 값들을 변경해도 width와 height가 변경되지는 않는다.

반면, 인라인 레벨들의 요소(span, a 등)에는 바인딩할 수 없으므로, 이들을 블록 레벨 요소로 감싼 후 해당 블록 레벨 요소에 바인딩해야 한다.

client 관련 속성은 테두리를 포함하지 않고, offset 관련 속성은 테두리를 포함한다고 이해하면 된다.
```svelte
<script>
	let w;
	let h;
	let size = 20;
</script>

<p>슬라이더로 글자 크기를 변경하세요.</p>
<input type="range" bind:value={size} min="10" max="100">
<p>글자 크기 : {size}px</p>
<div bind:clientWidth={w} bind:clientHeight={h}>
	<span style="font-size: {size}px">글자</span>
</div>
<ul>
	<li>가로 폭: {w}</li>
	<li>세로 높이: {h}</li>
</ul>

<style>
	div{display: inline-block; border: 3px solid black;}
</style>
```

## 10.4 bind:this 바인딩
svelt의 bind:this는 리액트의 ref와 유사. 특정 DOM을 선택할 때 사용한다. component는 재사용 가능한 UI다. 그래서 수많은 인스턴스로 복제될 수 있다. 즉, 특정 DOM이 여러 개 생길 수 있다.

bind:this를 사용하면 모든 인스턴스에서 작동하지 않고, 명령이 발생하는 인스턴스 내부에서만 작동하게 하여 전역에서 처리되는 문제가 발생하지 않는다.

#### 10.4.1 기본 마크업 구조 짜기
```svelte
<script>
	let text = '';
</script>

<form>
	<input type="password" bind:value={text} />
	<button type="submit">검증하기</button>
</form>

<style>
	.ssuccess{background-color: lightgreen;}
	.failure{background-color: lightcoral;}
</style>
```

#### 10.4.2 버튼에 click event 처리
```diff
<script>
	let text = '';
+	let clicked = false;
+	let validated = false;

+	const onValidatedClick = () => {
+		clicked = true;
+		validated = text === '1234';
+	}
</script>

<form>
-	<input type="password" bind:value={text} />
+	<input type="password" bind:value={text}
+		class={clicked && (validated ? 'success' : 'failure')}/>
-	<button type="submit">검증하기</button>
+	<button type="submit"
+		on:click|preventDefault={onValidatedClick}>검증하기</button>
</form>

<style>
	.ssuccess{background-color: lightgreen;}
	.failure{background-color: lightcoral;}
</style>
```

#### 10.4.3 bind:this를 통한 특정 DOM 선택
component가 여러 개 존재하는 경우에는 id로 선택하면 중복으로인한 error가 발생할 수 있다. 따라서 특정 DOM을 선택할 때는 bind:this를 사용하는 것이 유용하다.
```diff
<script>
	let text = '';
	let clicked = false;
	let validated = false;
+	let inputRef;

	const onValidatedClick = () => {
		clicked = true;
		validated = text === '1234';
		if (!validate) {
			inputRef.focus();
		}
	}
</script>

<form>
	<input type="password" bind:value={text}
		class={clicked && (validated ? 'success' : 'failure')}
+		bind:this={inputRef} />
	<button type="submit"
		on:click|preventDefault={onValidatedClick}>검증하기</button>
</form>

<style>
	.ssuccess{background-color: lightgreen;}
	.failure{background-color: lightcoral;}
</style>
```

(사진 첨부)

## 10.5 component binding
DOM 속성을 binding할 수 있는 것처럼 component의 props도 binding할 수 있다.

자손 component는 부모로 데이터를 직접 전달하지 못한다. 그러나 bind를 사용하여 부모 component의 상태변수와 자손 component의 상태변수를 연결 할 수 있다.

**이는 Vue.js에서 props에 .sync 수식어를 선언하는 것과 유사한 개념**

#### 10.5.1 기본적인 props 전달의 문제점
예제 코드를 통해 지금까지 배운 기본적인 props 전달의 문제점을 확인

```svelte
<scrip>
	export let childValue;
	const double = () => childValue *= 2;
</scrip>

<button on:click={double}>두 배 구하기</button>
<p>자손 값: {childValue}</p>
```

```svelte
<scrip>
	import Child from "./Child.svelte";
	let parentValue = 1;
</scrip>

<Child childValue={parantValue} />
<p>부모 값: {parentValue}</p>
```

**자손 값은 변경되지만 부모 값은 변경되지 않음**

bind를 통해 자손 component에서 부모 component의 상탯값도 변경하게 수정
```diff
<scrip>
	import Child from "./Child.svelte";
	let parentValue = 1;
</scrip>

- <Child childValue={parantValue} />
+ <Child bind:childValue={parantValue} />
<p>부모 값: {parentValue}</p>
```