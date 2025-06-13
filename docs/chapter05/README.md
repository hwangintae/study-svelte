# 5. 반응성 (reactivity)


reactivity란 값이 변할 때 별다른 호출 없이도 관련된 값이 자동으로 갱신되는 것

svelte는 reactivity를 위해 '$:' 를 제공한다.

## 5.1 삼항 연산자를 통한 마크업에서의 reactivity
```svelte
<script>  
    let count = 0;  
    const handleClick = () => count++  
</script>  
  
<button on:click={handleClick}>  
    클릭 수: {count} {count > 1 ? 'times' : 'time' }  
</button>
```

## 5.2 스크립트 reactivity 코드
스크립트 reactivity 코드는 변숫값이 변경되면 자동으로 감지하여 함께 변경됨

#### 5.2.1 변수 선언형
변수 선언형은 $: 뒤에 반응성 변수를 작성하고, 마크업 영역에서 변수처럼 사용

```svelte
<script>  
    let count = 0;  
  
    $: double = count * 2;  
    $: square = count * count;  
  
    const handleClick = () => count++  
</script>  
  
<button on:click={handleClick}>  
    클릭 수: {count} {count > 1 ? 'times' : 'time' }  
</button>  
  
<h3>두 배 구하기</h3>  
<p>{count} x 2 = {double}</p>  
<h3>제곱 구하기</h3>  
<p>{count} x {count} = {square}</p>
```

#### 5.2.2 $:의 그룹화
변수 선언형뿐만 아니라 $: 과 코드 블록({})을 통해 적용될 코드를 그룹화할 수 있다. 블록으로 감싼 부분도 상탯값이 변경되면 자동으로 호출됩니다.

```svelte
$: {

}
```

```svelte
<script>  
    let count = 1;  
  
    $: double = count * 2;  
    $: square = count * count;  
  
    $: {  
        console.log('두 배 값 : ' + double);  
        console.log('제곱 값 : ' + square);  
    }  
  
    const handleClick = () => count++;  
</script>  
  
<button on:click={handleClick}>  
    클릭 수 : {count}  
</button>  
  
<h3>두 배 구하기</h3>  
<p>{count} x 2 = {double}</p>  
<h3>제곱 구하기</h3>  
<p>{count} x {count} = {square}</p>
```

#### 5.2.3 $: 조건절
```svelte
$: if(조건식) {

}
```

```svelte
<script>  
    let count = 1;  
  
    $: if(count >= 10) {  
        alert("10개 이상 구매할 수 없습니다.")  
        count = 9;  
    }  
  
    $: if(count <= 0) {  
        alert("최소 구매 개수는 1개 입니다.")  
        count = 1;  
    }  
  
    const plusHandle = () => count++;  
    const minusHandle = () => count--;  
</script>  
  
<button on:click={minusHandle}>-</button>  
<input type="text" value={count} style="width: 25px;">  
<button on:click={plusHandle}>+</button>
```