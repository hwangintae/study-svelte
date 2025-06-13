# 8. svelte 로직


svelte는 조건문과 반복문을 마크업 영역에서 사용할 수 있는 로직을 제공한다.

## 8.1  논리 로직: if 블록
if 블록은 세 가지 유형으로 나눌 수 있다.
1. 조건이 true인 경우 마크업 영역을 표시
2. 조건이 true인 경우와 false인 경우를 나누어 각각에 다른 마크업 영역을 표시
3. 세 가지 이상의 조건을 순차적으로 검사하며, 첫 번째로 true인 조건에 해당하는 마크업 영역을 표시

#### 8.1.1 if 블록 기본 문법
```svelte
<script>  
    let user = { loggedState : false };  
    const toggle = () => user.loggedState = !user.loggedState  
</script>  
  
{#if user.loggedState}  
    <button on:click={toggle}>로그아웃</button>  
    <p>현재 로그인 상태</p>  
{/if}  
  
{#if !user.loggedState}  
    <button on:click={toggle}>로그인</button>  
    <p>현재 로그아웃 상태</p>  
{/if}
```

#### 8.1.2 else 블록
```svelte
<script>  
    let user = { loggedState : false };  
    const toggle = () => user.loggedState = !user.loggedState  
</script>  
  
{#if user.loggedState}  
    <button on:click={toggle}>로그아웃</button>  
    <p>현재 로그인 상태</p>  
{:else}  
    <button on:click={toggle}>로그인</button>  
    <p>현재 로그아웃 상태</p>  
{/if}
```

#### 8.1.3 else if 블록
```svelte
<script>  
    let x = null;  
    const numChange = (e) => x = e.target.value;  
</script>  
  
<label for="textBox">양수/음수 테스트</label>  
<input type="text" id="textBox" on:keyup={numChange} placeholder="정수를 입력하세요">  
{#if x > 0}  
    <p>양수 입니다.</p>  
{:else if x < 0}  
    <p>음수 입니다.</p>  
{:else}  
    <p>정수를 입력하세요</p>  
{/if}
```

## 8.2 반복 로직: each 블록
#### 8.2.1 each 블록 기본 문법
```svelte
<script>  
    let weekDays = ['일', '월', '화', '수', '목', '금', '']  
</script>  
<select>  
    {#each weekDays as weekDay}  
        <option>{weekDay}요일</option>  
    {/each}  
</select>
```

#### 8.2.2 each 블록 - 인덱스 제공
기존 each 블록 문법의 첫 번째 줄 단수형 단어 뒤에 쉼표를 붙이고 인덱스를 의미하는 단어를 작성

```svelte
<script>  
    let teams = ['LG', 'KT', 'SSG', 'NC', '두산', 'KIA', '롯데', '삼성', '한화', '키움']  
</script>  
  
{#each teams as team, idx}  
    <p>{idx + 1} 위, {team}</p>  
{/each}
```

#### 8.2.3 객체 데이터 방식을 반복 처리
each 블록 사용 시 객체에는 구분할 수 있는 PK를 만들어야 한다.

```svelte
<script>  
    let langs = [  
        {  
            id: 1,  
            name: "스벨트",  
            release: 2016  
        }, {  
            id: 2,  
            name: "리액트",  
            release: 2013  
        }, {  
            id: 3,  
            name: "뷰",  
            release: 2013  
        }]  
</script>  
  
<h3>웹 프론트엔드 언어</h3>  
{#each langs as lang (lang.id)}  
    <div style="border: 2px solid black; width: 200px; padding: 10px;">  
        <h4>이름 : {lang.name}</h4>  
        <p>배포 연 : {lang.release}년</p>  
    </div>
{/each}
```