# 9.  폼 관련 요소 바인딩


바인딩은 상탯값과 그 값을 제어하는 요소를 결합하는 것을 의미

svelte에서는 양방향 바인딩을 통해 값이 동시에 변경되도록 처리할 수 있다.

폼 데이터 (input, select, textarea 등)와의 바인딩 방법을 살펴보겠다.

8장에서 keyup 이벤트를 통해 값을 강제로 발생시켰지만, 사실 바인딩을 활용하면 더 간단하게 처리할 수 있다.

## 9.1 바인딩이란?
폼은 대부분 상탯값과 함께 작동한다. 이때 상탯값과 그 값을 제어하는 요소 간의 결합을 바인딩이라고 부른다.

**단방향 바인딩**
요소가 상탯값을 직접 변화시키지 못한다.
예 props

부모 component가 자식 component에게 내려주는 값

**양방향 바인딩**
입력 상자에 값을 입력하면 그와 연결된 값들도 자동으로 업데이트
```svelte
<태그 요소 bind:태그속셩={상탯값}>
```

## 9.2 입력 요소 관련 바인딩
#### 9.2.1 input text value 바인딩
```svelte
<script>
	let name = "";
</script>

<input type="text" bind:value={name} placeholder="이름을 입력하세요.">
<p>안녕! {name || '낯선 사람'}!</p>
```

#### 9.2.2 input number/range value 바인딩
```svelte
<script>
	let a = 1;
	let b = 2;
</script>

<label>
	<input type="number" bind:value={a} min="0" max="10">
	<input type="range" bind:value={a} min="0" max="10">
</label>

<label>
	<input type="number" bind:value={b} min="0" max="10">
	<input type="range" bind:value={b} min="0" max="10">
</label

<p> {a} + {b} = {a + b} </p>
```

코드를 실행하면 number 타입에서 숫자를 바꾸거나, range 타입에서 슬라이더를 드래그할 때 양방향 바인딩을 통해 값들이 변경되는 것을 확인할 수 있다.

#### 9.2.3 input checkbox checked 바인딩
체크박스를 선택하면 구독 버튼을 클릭할 수 있고, 선택되지 않으면 버튼을 비활성화하도록 설정

```svelte
<script>
	let chk = false;
</script>

<label>
	<input type="checkbox" bind:checked={chk}/>약관 동의
</label>

{#if chk}
	<p>당신은 약관에 동의했습니다. <br>이제 구독이 가능합니다.</p>
{:else}
	<p>당신은 약관에 동의하지 않았습니다. <br>아직 구독이 불가능합니다.</p>
{/if}
<button disbaled={!chk}>구독</button>
```

#### 9.2.4 input checkbox/radio 그룹 바인딩
```svelte
<script>
	let choiceSize = 0;
	let sizes = ['Tall', 'Grande', 'Venti'];
</script>

<h3>사이즈 선택</h3>
{#each sizes as size, i}
	<label>
		<input type="radio" bind:group={choiceSize} value={i}>
		{size}
	</label>
{/each}
<p>고객님은 {sizes[choiceSize]}를 선택하셨습니다.</p>
```

#### 9.2.5 textarea 바인딩
textarea를 사용할 때 원래 HTML에서 입력되는 값을 태그 사이에 텍스트로 작성하지만,
svelte에서는 input 태그 요소의 text 타입처럼 value 속성을 통해 값을 바인딩한다.
```svelte
<script>  
    let text = "내용을 입력하세요.";  
  
    const handleInitText = () => text = "";  
</script>  
  
<textarea on:click={handleInitText} bind:value={text} rows="5"/>  
<p>{text}</p>
```

## 9.3 선택 상자 관련 바인딩
HTML5에서 select 태그 요소를 동시에 선택할 수 있는 muliple이라는 속성이 추가되었다.

#### 9.3.1 select value 바인딩 - 하나만 선택
1. select 태그 요소에서 option 중 하나만 선택하는 방식
    - select 태그 요소에 bind:value를 사용하여 양방향 바인딩을 설정
```svelte
<script>
	let portals = [
		{name: '사이트선택', url: null},
		{name: '네이버', url: 'https://naver.com'},
		{name: '다음', url: 'https://daum.net'},
		{name: '구글', url: 'https://google.com'}
	];

	let seleted;

	const selectChane = () => {
		if (selecte != null) {
			window.open(selected);
		}
	}
</script>

<h3>포털 사이트 바로가기</h3>
<select bind:value={selected} on:change={selectChange}>
	{#each portals as portal}
		<option value={portal.url}>{portal.name}</option>
	{/each}
</select>
```

#### 9.3.2 select value 바인딩 - 여러 개 선택
PC 웹에서는 다소 낯설지만, 모바일 웹에서는 여러 옵션이 팝업으로 나타나면서 사용자가 체크할 수 있게 구성된다.
```svelte
<script>
	let foods = ['떡볶이', '순대', '오뎅', '튀김'];
	let selected = '';
</script>

<h3>INTAE 분식</h3>
<select multiple bind:value={selected}>
	{#each foods as food}
		<option value={food}>{food}</option>
	{/each}
</select>
{#if selected.length === 0}
	<p>주문하실 메뉴를 선택해주세요.</p>
{:else}
	<p>선택 메뉴: {selected}</p>
{/if}
```

하지만 모바일에서도 디자인적 한계가 있기 때문에, 여러 개의 옵션을 선택할 필요가 있는 경우에는 input 태그의 checkbox 타입을 사용하는 것이 더 효과적
```svelte
<script>
	let foods = ['떡볶이', '순대', '오뎅', '튀김'];
	let selected = '';
</script>

<h3>INTAE 분식</h3>
{#each foods as food}
	<label>
		<input type="checkbox" bind:group={selected} value={food}>
		{food}
	</label>
{/each}
{#if selected.length === 0}
	<p>주문하실 메뉴를 선택해 주세요.</p>
{:else}
	<p>선택 메뉴 : {seleted}</p>
{/if}
```

checkbox 타입은 bind:group을 통해 input 태그 요소들을 그룹화시켜야 한다.