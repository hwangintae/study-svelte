# 1. 스벨트 개요
## 1.3 스벨트 장점
#### 1.3.1 Write less code
리액트는 값을 useState를 통해 관리하고, Vue.js는 data를 통해 관리하기 때문에 무조건 JS 보다 코드가 길다.

스벨트는 JS 변수 선언과 같은 방식을 사용한다.

#### 1.3.2 No virtual DOM
가상 DOM은 리액트가 나오면서 많은 개발자에게 주목을 받은 개념

스벨트는 가상 DOM을 사용하지 않고 DOM을 제어한다.

- 번들링: 복잡한 DOM, CSS, 콘텐츠 요소들을 나눠서 Node.js로 처리한 후, 배포 시 하나의 파일로 합친다.

하지만 스벨트는 자신의 언어를 컴파일 하여 순수 JS로 변환한다.

#### 1.3.3 Truly reactive
메인 이벤트가 일어났을 때, 나머지 이벤트들이 자동으로 발생하게 할 수 있다면 개발이 훨씬 편해진다.

스벨트는 이 작업을 쉽게 하도록 설꼐되어 있다.

```svelte
<script>
	let num = 0;
	$: square = num * num;
	const incrementCount = () => num = num + 1;
</script>

<button on:click={incrementCount}>
	클릭횟수 : {num}
</button>
<p>제곱 값: {square}</p>
```


