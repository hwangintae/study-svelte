# 7. props


props는 부모 component가 자손 component에 전달하는 읽기 전용 데이터

## 7.1 props 기본 문법
props 기본 문법
```svelte
<자손 component명 props명={전달값} />
<자손 component명 props명="전달값" />
```

```svelte
// Child01.svelte
<script>  
    export let name;  
    export let age;  
    export let hobby;  
</script>  
  
<h3>이름: {name}</h3>  
<h3>나이: {age}</h3>  
<h3>취미: {hobby}</h3>  
<hr>
```

```svelte
// Parent01.svelte
<script>  
    import Child01 from "./Child01.svelte";  
</script>  
  
<Child01 name={'황인태'} age={31} hobby={'잠자기'} />  
<Child01 name="박수현" age="30" hobby="눕기" />
```

## 7.2 props 기본값 설정
```svelte
<script>  
    export let name = "우직이";  
    export let age = 1;  
    export let hobby = "깨물기";  
</script>  
  
<h3>이름: {name}</h3>  
<h3>나이: {age}</h3>  
<h3>취미: {hobby}</h3>  
<hr>
```

## 7.3 props 데이터 변경
```svelte
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
```

## 7.4 스프레드 props
스프레드 props는 스프레드 오퍼레이터(spread operator)를 props 앞에 사용하는 것

스프레드 오퍼레이터는 객체나 배열 값을 복제하여 새로운 변수에 담는 역할을 한다.

보통 JS의 비구조화 할당과 많이 사용됨
```svelte
const 객체명 = {
	자손변수: 값 // 자손 component에서 내보낸 변수를 속성으로 값을 할당
}
<자손 component명 {... 객체명} />
```

```svelte
<script>  
    import Child01 from "./Child01.svelte";  
  
    const data01 = {  
        name : "행복이",  
        age: 6,  
        hobby: "밥먹기"  
    }  
  
    const data02 = {  
        name: "우직이",  
        age: 1,  
        hobby: "깨물기"  
    }  
</script>  
  
<Child01 {...data01} />  
<Child01 {...data02} />
```
