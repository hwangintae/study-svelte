# 15. svelte css control

svelte는 css를 작성하는 전통적인 방법 외에도, component의 상태와 연동하여 style을 동적으로 제어할 수 있는 class: 지시문을 제공한다.

## 15.1 svelte css 기본 사용법
component는 script, mark-up, style의 3가지 영역으로 나눈다.

```svelte
<script>
	let color01 = 'pink';
</script>

<h1>제목 태크1</h1>
<h2 class='title02'>제목 태크2</h2>
<h3 style='color: {color01}'>{color01}</h3>

<style>
	h1{ background-color: black; color: pink; }
	.title02{ background-color: black; color: yellow; }
</style>
```

## 15.2 class: 지시문
svelte에서 class: 지시문을 통해 상탯값과 연동하여 context를 제어할 수 있다.

svelte에서 지시문은 원래 HTML이 갖고 잇는 것이 아닌 특정 기능을 위해 svelte가 tag에 제공한다.

```svelte
<script>
	let current = 'first';
</script>

<button class:active={current === 'first'} on:click={() => current = 'first']}> 첫 번째 버튼</button>
<button class:active={current === 'second'} on:click={() => current = 'first']}> 두 번째 버튼</button>
<button class:active={current === 'third'} on:click={() => current = 'first']}> 세 번째 버튼</button>

<style>
	button{
		border: none; border-radius: 5px; background-color: #ededed;
		padding: 5px 20px; curcor: pointer;
	}
	button::after{ content: ' - 비활성'; }
	.active{ background-color: cornflowerblue; color: white; }
	.active::after{ content: ' - 활성'; }
</style>
```

체크박스의 바인딩을 통해 클래스를 연결. 체크박스를 선택하면 버튼에 실선이 들어가고, 선택하지 않으면 실선이 들어가지 않도록 설정

```svelte
<script>
	let border;
</script>

<h3>테두리 선택</h3>
<label>
	<input type="checkbox" bind:checked={border}> 실선
</label>
<hr />
<button class:border>버튼</button>

<style>
	button {
		border: none; border-radius: 5px; background-color: #ededed;
		padding: 5px 20px; cursor: pointer;
	}
	.border { border: 3px solid green; }
</style>
```

더 세부적인 선택을 위해 radio button을 이용하여 실선, 점선, 두줄로 표시하는 기능 구현

```svelte
<script>
	let choice = 0;
	let borders = ['실선', '점선', '두줄'];
</script>

<h3>테두리 선택</h3>
{#each borders as border, i}
	<label>
		<input type="radio" bind:group={choice} value={i}>
		{ border }
	</label>
{/each}
<hr />
{#if choice === 0}
	<button class:borderSolid={true}>버튼</button>
{:else if choice === 1}
	<button class:borderDashed={true}>버튼</button>
{:else if choice === 2}
	<button class:borderDouble={true}>버튼</button>
{/if}

<style>
	button {
		border: none; border-radius: 5px; background-color: #ededed;
		padding: 5px 20px; cursor: pointer;
	}
	.borderSolid { border: 3px solid green; }
	.borderDashed { border: 3px dashed green; }
	.borderDouble { border: 3px double green; }
</style>
```

## 15.3 rollup을 통한 Sass 플러그인 설치
rollup은 webpack과 같은 bundler다.

CSS와 class: 지시문을 통해 style 을 설정하는 방법보단 CSS 전처리기인 Syntactically awesomw stylesheets를
훨씬 더 많이 사용한다.

#### 15.3.1 svelte-preprocess-sass plug-in
`npm install --save-dev svelte-preprocess-sass sass`

```diff
plugins: [
    svelte({
	    compilerOptions: {
		    // enable run-time checks when not in production
			dev: !production
-		}
+		},
+		preprocess: {
+			style: sass(),
+		}
	}),
	...
]
```

#### 15.3.2 Sass 적용하기

```sveltehtml
<button>Click me</button>

<style type="text/scss">
    $primary: red;

    button {
      color: $primary
    }
</style>
```