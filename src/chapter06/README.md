# 6. svelte event


svelte의 event는 JS와 매우 유사하다.

**event는 HTML 요소에 발생하는 '어떤 것'이다.**

'어떤 것'은..
1. 브라우저가 수행하는 것
2. 사용자가 직접 수행하는 것

JS를 사용하면 event가 감지도리 때 동적으로 코드가 실행된다.

svelte도 마찬가지로 event가 발생할 때 특정 코드를 실행할 수 있다.

## 6.1 event 문법
**event는 JS가 명령을 주는 시점**
1. 마우스를 클릭했을 때
2. 키보드를 눌럿을 때
3. 스크롤바를 움직일 때
   등 ~ 했을 때가 event다.

#### 6.1.1 event의 종류
| event 명    | 설명                    |
| ---------- | --------------------- |
| click      | 요소에서 마우스를 클릭했을 때      |
| mouseenter | 요소에 마우스가 들어갔을 때       |
| mouseleave | 요소에서 마우스가 떠났을 때       |
| mousemove  | 요소에서 마우스를 움직일 때       |
| keydown    | 키보드를 눌럿을 때            |
| keyup      | 눌렀던 키에서 뗄 때           |
| scroll     | 페이지 스크롤바의 이동이 발생되었을 때 |
| resize     | 브라우저의 창 크기가 변경되었을 때   |

#### 6.1.2 svelte event 사용
```svelte
<script>  
    let m = {x: 0, y: 0}  
  
    const handleMouseMove = (e) => {  
        m.x = e.clientX;  
        m.y = e.clientY;  
    }  
</script>  
  
<div on:mousemove={handleMouseMove} role="presentation">  
    x 좌표: {m.x} <br>  
    y 좌표: {m.y}  
</div>  
  
<style>  
    div {  
        width: 100%;  
        height: 100%;  
    }  
</style>
```

#### 6.1.3 inline event 사용
간단한 작업은 화살표 함수를 사용하여 마크업 영역에 inline 형태로 사용한다.

```svelte
<script>  
    let m = {x: 0, y: 0}  
  
</script>  
  
<div on:mousemove={(e) => {m.x = e.clientX; m.y = e.clientY}} role="presentation">  
    x 좌표: {m.x} <br>  
    y 좌표: {m.y}  
</div>  
  
<style>  
    div {  
        width: 100%;  
        height: 100%;  
    }  
</style>
```

#### 6.1.4 함수 매개변수 사용
이벤트에 함수를 사용할 때 매개변수가 있다면, 함수를 호출해야한다.

```svelte
<script>  
    const handleClick01 = (text) => alert(`${text} 클릭!`);  
    const handleClick02 = (text) => alert(`${text} 클릭!`);  
</script>  
  
<button on:click={() => handleClick01("1번")}>첫 번째 버튼</button>  
<button on:click={() => handleClick02("2번")}>두 번째 버튼</button>
```

## 6.2 이벤트 수식어
svelte는 event를 제어할 때 조건을 붙이는 modifier도 함께 사용할 수 있다.

event type명 뒤에 파이프 문자 | 를 통해 수식어를 붙일 수 있다.

#### 6.2.1 event 수식어의 종류
| 이벤트 수식어         | 설명                                                             |
| --------------- | -------------------------------------------------------------- |
| preventDefault  | event가 발생한 태그의 기본 event를 막는다.                                  |
| stopPropagation | 발생한 event가 겹쳐진 상위 요소로 전달되지 않게 막는다.                             |
| passive         | 터치 혹은 휠 event로 발생하는 스크롤 성능을 향상시킨다.                             |
| capture         | 버블링 단계가 아닌 캡처 단계에서 event handler를 실행한다.                        |
| once            | event handler를 단 한 번만 실행하도록 한다.                                |
| self            | e.target과 event handler를 정의한 요소가 같을 때 event handler를 실행하도록 한다. |

#### 6.2.2 once 수식어 사용
```svelte
<script>  
    const handleClick01 = () => alert("클릭은 한번만 제공합니다.")  
    const handleClick02 = () => alert("클릭이 계속 실행됩니다.")  
</script>  
<button on:click|once={handleClick01}>클릭01</button>  
<button on:click={handleClick02}>클릭02</button>
```

#### 6.2.3 preventDefault 수식어 사용
preventDefault 수식어는 기본 이벤트를 제거하는 수식어

a 태그는 페이지를 이동하는 이벤트를 갖고 있음

preventDefault를 사용하면 a 태그가 페이지 이동이 안 되도록 처리하고, form 태그가 폼 데이터 전송을 못 하도록 막을 수 있다.

```svelte
<script>  
    const handleClick = () => {  
        let move = confirm('제이펍 사이트로 이동하시겠습니까?')  
        move && location.assign('https://jpub.tistory.com/tag/Jpub')  
    }  
</script>  
  
<h1>  
    <a href="https://jpub.tistory.com/tag/Jpub" on:click|preventDefault={handleClick}>제이펍 출판사</a>  
</h1>
```
