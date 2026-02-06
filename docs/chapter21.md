## BEST TOUR 컴포넌트 개발

```sveltehtml
<script>
    import Title from "./components/Title.svelte";
    import BestList from "./components/BestList.svelte";
    import BestCreate from "./components/BestCreate.svelte";
</script>

<div class="bestbox">
    <Title name="BEST TOUR" />
    <BestList />
    <BestCreate />
</div>
```

```sveltehtml
<script>
    export let name;
</script>

<h2>{name}</h2>
```

```sveltehtml
<script>
    import {bests} from "../store";
    import BestItem from "../components/BestItem.svelte";
</script>

<ul>
    {#each $bests as best, index(best)}
        <BestItem {best} />
    {/each}
</ul>
```

```sveltehtml
<script>
    import Icon from "@iconify/svelte";

    export let best;

    const {id, name, price, descript, image, like} = best;
</script>

<li>
    <a href="#!">
        <img src={image} alt={name}/>
        <button class="likebox">
            {#if like}
                <Icon icon="tdesign:heart-filled"/>
            {:else}
                <Icon icon="tdesign:heart"/>
            {/if}
        </button>
        <div class="box">
            <h4>{name}</h4>
            <h5>\ {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h5>
            <p>{descript}</p>
            <button><Icon icon="gridicons:trash" /></button>
        </div>
    </a>
</li>
```

```sveltehtml
<script>
    import Icon from '@iconify/svelte';
    import {v4 as uuidv4} from 'uuid';

    const id01 = uuidv4();
    const id02 = uuidv4();
    const id03 = uuidv4();
    const id04 = uuidv4();
</script>

<div>
    <form class="createform active">
        <fieldset>
            <legend>여행 추가하기</legend>
            <label for={id01}>여행명 : </label>
            <input type="text" id={id01} name="name" required />
            <label for={id02}>가격 : </label>
            <input type="text" id={id02} placeholder="숫자로만 입력하세요" name="price" required />
            <label for={id03}>이미지 경로 : </label>
            <input type="text" id={id03} name="image" required />
            <br />
            <label for={id04} class="dlabel">설명 : </label>
            <textarea row="5" id={id04} name="descript" required />
            <br />
            <button type="submit">여행 추가하기</button>
        </fieldset>
    </form>
    <button class="circlebox"><Icon icon="ic:round-add" /></button>
</div>
```

```sveltehtml
import {writable} from "svelte/store";
import {initialBests} from "../source/bestData.js";
import {v4 as uuidv4} from "uuid";


const setBestData = () => {
    const {subscribe, update} = writable(initialBests);

    return {
        subscribe
    }
}

export const bests = setBestData();
```


## 21.6 BestItem 이벤트 관리

```diff
import {writable} from "svelte/store";
import {initialBests} from "../source/bestData.js";
import {v4 as uuidv4} from "uuid";


const setBestData = () => {
    const {subscribe, update} = writable(initialBests);

+    const onToggle = (id) => {
+        update(datas => {
+            const setDatas = datas.map((best) => {
+                return best.id === id ? {...best, like: !best.like } : best;
+            });
+
+            datas = setDatas;
+
+            return datas;
+        });
+    }
+
+    const onRemove = (id) => {
+        update(datas => {
+            const setDatas = datas.filter((best) => best.id !== id);
+            datas = setDatas;
+
+            return datas;
+        })
+    }

-    return {
-        subscribe
-    }
    
+    return {
+        subscribe,
+        onToggle,
+        onRemove
+    }
}

export const bests = setBestData();
```









```diff
<script>
+    import {bests} from "../store.js";
    import Icon from "@iconify/svelte";

    export let best;

    const {id, name, price, descript, image, like} = best;
+    const {onToggle, onRemove} = bests;

</script>

<li>
    <a href="#!">
        <img src={image} alt={name}/>
-        <button class="likebox">
+        <button class="likebox" on:click={() => onToggle(id)}>
            {#if like}
                <Icon icon="tdesign:heart-filled"/>
            {:else}
                <Icon icon="tdesign:heart"/>
            {/if}
        </button>
        <div class="box">
            <h4>{name}</h4>
            <h5>\ {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h5>
            <p>{descript}</p>
-            <button>
+            <button on:click={() => onRemove(id)}>
                <Icon icon="gridicons:trash" />
            </button>
        </div>
    </a>
</li>
```

## 21.7 데이터 추가

```diff
// store.js
+ const setFormBest = () => {
+     let formText = {
+         name: '',
+         price: '',
+         image: '',
+         descript: '',
+     };
+ 
+     const {subscribe, update, set} = writable(formText);
+ 
+     const resetForm = () => {
+         set('');
+     }
+ 
+     return {
+         subscribe,
+         set,
+         resetForm,
+     }
+ }

export const bests = setBestData();
+ export const bestTexts = setFormBest();
```

```diff
<script>
    import Icon from '@iconify/svelte';
    import {v4 as uuidv4} from 'uuid';
+    import {bests, bestTexts} from '../store';

    const id01 = uuidv4();
    const id02 = uuidv4();
    const id03 = uuidv4();
    const id04 = uuidv4();

+    let open = false;
+
+    const onToggle = () => {
+        open = !open;
+
+        if (!open) {
+            bestTexts.resetForm();
+        }
+    }
+
+    const onClose = () => open = false;
+
+    const onDataChange = (e) => {
+        const {name, value} = e.target;
+
+        $bestTexts = {
+            ...$bestTexts,
+            [name]: value
+        }
+    }
+
+    const onSubmit = (e) => {
+        e.preventDefault();
+
+        bests.onSubmit($bestTexts);
+        bestTexts.resetForm();
+    }
</script>

<div>
-    <form class="createform active">
+    <form class={open ? "createform active" : "createform"}
+          on:submit={(e) => {onSubmit(e); onClose();}}
+    >
        <fieldset>
            <legend>여행 추가하기</legend>
            <label for={id01}>여행명 : </label>
-            <input type="text" id={id01} name="name" required />
+            <input type="text" id={id01} name="name"
+                   bind:value={$bestTexts.name} on:change={(e) => onDataChange(e)} required />
            <label for={id02}>가격 : </label>
-            <input type="text" id={id02} placeholder="숫자로만 입력하세요" name="price" required />
+            <input type="text" id={id02} placeholder="숫자로만 입력하세요" name="price"
+                   bind:value={$bestTexts.price} on:change={(e) => onDataChange(e)} required />
            <label for={id03}>이미지 경로 : </label>
-            <input type="text" id={id03} name="image" required />
+            <input type="text" id={id03} name="image" bind:value={$bestTexts.image}
+                   on:change={(e) => onDataChange(e)} required />
            <br />
            <label for={id04} class="dlabel">설명 : </label>
-            <textarea row="5" id={id04} name="descript" required />
+            <textarea row="5" id={id04} name="descript" bind:value={$bestTexts.descript}
+                      on:change={(e) => onDataChange(e)} required />
            <br />
            <button type="submit">여행 추가하기</button>
        </fieldset>
    </form>
-    <button class="circlebox"><Icon icon="ic:round-add" /></button>
+    <button class="circlebox" on:click={onToggle}><Icon icon="ic:round-add" /></button>
</div>
```