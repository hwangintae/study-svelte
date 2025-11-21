# 3. 컴포넌트 기본 사용법

웹은 재사용 가능한 UI를 컴포넌트 단위로 개발하며, 디자인 툴인 figma에서도 컴포넌트 개념을 활용하여 디자인 한다.

## 3.2 컴포넌트 제작
```svelte
// script 영역
<script>
</script>

// markup 영역
<태그명></태그명>

// style 영역
<style>
</style>
```

#### 3.2.1 하위 컴포넌트 불러오기
```svelte
<script>
	import 컴포넌트명 from 'Svelte파일경로';
</script>

// markup
<컴포넌트명 />
```

> [!note]
> 모듈화란 다른 파일의 JS 기능을 특정 파일에서 사용하는 것
> import 키워드를 통해 불러오고, export 키워드를 통해 내보낸다.

#### 3.2.2 기본 컴포넌트 제작하기
```svelte
// Header.svelte
<h1> 해더 구역 </h1>
```

```svelte
// Footer.svelte
<h1> 푸터 구역 </h1>
```

```svelte
// Main.svelte
<h1> 메인 구역 </h1>
```

```svelte
// Product.svelte
<h1> 제품 구역 </h1>
```

```svelte
// MainPage.svelte
<script>  
    import Header from "./Header.svelte";  
    import Main from "./Main.svelte";  
    import Footer from "./Footer.svelte";  
</script>  
  
<Header />  
<Main />  
<Footer />
```

```svelte
// ProductPage.svelte
<script>  
    import Header from "./Header.svelte";  
    import Product from "./Product.svelte";  
    import Footer from "./Footer.svelte";  
</script>  
  
<Header />  
<Product />  
<Product />  
<Product />  
<Footer />
```

```svelte
// App.svelte
<script>  
    import MainPage from "./chapter03/MainPage.svelte";  
    import ProductPage from "./chapter03/ProductPage.svelte";  
</script>  
  
<MainPage/>  
<hr />  
<ProductPage/>
```

![chapter03Result.png](chapter03Result.png)