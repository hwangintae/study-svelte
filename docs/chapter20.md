## 20.1 프로젝트 생성 및 라이브러리 설치
```shell
npx degit sveltejs/template ch20_bucketlist

chd ch20_bucketlist
npm install
npx svelte-migrate@latest svelte-4
```

사용할 라이브러리
```shell
npm i @iconify/svelte
npm i uuid
```

#### 20.1.1 Iconify
- 무료 아이콘 제공하는 사이트

```sveltehtml
<script>
    import Icon from '@iconify/svelte';
</script>
<Icon icon="파일주제선정" /> // 사이트에 복사해오기
```

#### 20.1.2 uuid
- id 값 중복 방지 처리
```sveltehtml
<script>
    import { v4 as uuidv4 } from 'uuid';
    uuidv4();
</script>
```

## 20.2 component 생성
- BucketHeader.svelte : 제목과 날짜, 할 일 개수를 표시할 컴포넌트
- BucketList.svelte : 버킷 리스트를 하나로 모아 표시할 컴포넌트
- BucketItem.svelte : 버킷 리스트 한 개를 표시할 컴포넌트
- BucketCreate.svelte : 데이터 추가할 입력 폼과 버튼을 제겅화는 컴포넌트

```sveltehtml
<script>
    import BucketHeader from "./components/BucketHeader.svelte";
    import BucketList from "./components/BucketList.svelte";
    import BucketCreate from "./components/BucketCreate.svelte";
</script>

<svelte:head>
    <title>My Bucket List</title>
</svelte:head>
<div class="bucketbox">
    <BucketHeader />
    <BucketList />
    <BucketCreate />
</div>
```

```sveltehtml
<script>
    import Icon from '@iconify/svelte';
</script>

<div class="bucketcreate">
    <div class="createform">
        <form>
            <input
                    type="text"
                    placeholder="추가할 버킷 리스트를 입력 후, Enter를 누르세요."
            />
        </form>
    </div>
    <button class="circlebox">
        <Icon icon="ic:round-add" />
    </button>
</div>
```

```sveltehtml
<script>
    const today = new Date();
    const week = ["일", "월", "화", "수", "목", "금", "토"];

    const dateString = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
        day: today.getDay()
    };

    const { year, month, date, day } = dateString;
</script>

<div class="bucketheader">
    <h1>My Bucket List</h1>
    <h2>현재: {year}년 {month}월 {date}일 {week[day]}요일</h2>
    <p>할 일 3개 남음</p>
</div>
```

```sveltehtml
<script>
    import Icon from '@iconify/svelte';
</script>

<div class="bucketitem">
    <input type="checkbox" id="chk" />
    <label for="chk" class="checkcircle">
        <Icon icon="ic:round-check" />
    </label>
    <p>버킷 리스트 적기</p>
    <button class="remove">
        <Icon icon="gridicons:trash" />
    </button>
</div>
```

```sveltehtml
<script>
    import BucketItem from './BucketItem.svelte';
</script>

<div class="bucketlist">
    <BucketItem />
</div>
```

## 버킷데이터와 체크박스 연동
```sveltehtml
<script>
    import Icon from '@iconify/svelte';

    export let bucket;
</script>

<div class="bucketitem">
    <input type="checkbox" id={bucket.id}
           bind:checked={bucket.chk}/>
    <label for={bucket.id} class="checkcircle">
        <Icon icon="ic:round-check" />
    </label>
    <p>{bucket.text}</p>
    <button class="remove">
        <Icon icon="gridicons:trash" />
    </button>
</div>
```

```sveltehtml
<script>
    import BucketItem from './BucketItem.svelte';

    export let buckets;
</script>

<div class="bucketlist">
    {#each buckets as bucket, index(bucket)}
        <BucketItem {bucket}/>
    {/each}
</div>
```

```sveltehtml
const initialBuckets = [
    {
        id: 1,
        text: "웹 프론트엔드 개발자되기",
        chk: true
    },
    {
        id: 2,
        text: "유럽 여행하기",
        chk: true
    },
    {
        id: 3,
        text: "서울에 집 사기",
        chk: false
    },
    {
        id: 4,
        text: "영국가서 손흥민 축구 경기 보기",
        chk: false
    },
    {
        id: 5,
        text: "스위스 가서 시계 사기",
        chk: false
    },
];

export { initialBuckets };
```

## 남은 버킷데이터 개수 동적 변환 적용
```sveltehtml
<script>
    const today = new Date();
    const week = ["일", "월", "화", "수", "목", "금", "토"];

    const dateString = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
        day: today.getDay()
    };

    const { year, month, date, day } = dateString;

    export let chkCount;
</script>

<div class="bucketheader">
    <h1>My Bucket List</h1>
    <h2>현재: {year}년 {month}월 {date}일 {week[day]}요일</h2>
    <p>할 일 {chkCount}개 남음</p>
</div>
```

```sveltehtml
<script>
    import Icon from '@iconify/svelte';

    export let bucket;
    export let onToggle;
</script>

<div class="bucketitem">
    <input type="checkbox" id={bucket.id}
           bind:checked={bucket.chk}/>
    <label for={bucket.id} class="checkcircle"
           on:click={() => onToggle(bucket.id)}
           on:keydown={() => onToggle(bucket.id)}
           role="presentation"
    >
        <Icon icon="ic:round-check"/>
    </label>
    <p>{bucket.text}</p>
    <button class="remove">
        <Icon icon="gridicons:trash"/>
    </button>
</div>
```

```sveltehtml
<script>
    import BucketItem from './BucketItem.svelte';

    export let buckets;
    export let onToggle;
</script>

<div class="bucketlist">
    {#each buckets as bucket, index(bucket)}
        <BucketItem {bucket} {onToggle}/>
    {/each}
</div>
```

```sveltehtml
<script>
    import BucketHeader from "./components/BucketHeader.svelte";
    import BucketList from "./components/BucketList.svelte";
    import BucketCreate from "./components/BucketCreate.svelte";
    import {initialBuckets} from "./bucketData.js";

    let buckets = initialBuckets;

    $: chkCount = buckets.filter((bucket) => !bucket.chk).length;

    const onToggle = (id) => {
        buckets = buckets.map((bucket) => {
            return bucket.id === id ? {...bucket, chk: !bucket.chk } : bucket;
        })
    }
</script>

<svelte:head>
    <title>My Bucket List</title>
</svelte:head>
<div class="bucketbox">
    <BucketHeader {chkCount}/>
    <BucketList {buckets} {onToggle}/>
    <BucketCreate/>
</div>
```

## 버킷리스트 삭제 추가
```sveltehtml
<script>
    import Icon from '@iconify/svelte';

    export let bucket;
    export let onToggle;
    export let onRemove;
</script>

<div class="bucketitem">
    <input type="checkbox" id={bucket.id}
           bind:checked={bucket.chk}/>
    <label for={bucket.id} class="checkcircle"
           on:click={() => onToggle(bucket.id)}
           on:keydown={() => onToggle(bucket.id)}
           role="presentation"
    >
        <Icon icon="ic:round-check"/>
    </label>
    <p>{bucket.text}</p>
    <button class="remove" on:click={() => onRemove(bucket.id)}>
        <Icon icon="gridicons:trash"/>
    </button>
</div>
```

```sveltehtml
<script>
    import BucketItem from './BucketItem.svelte';

    export let buckets;
    export let onToggle;
    export let onRemove;
</script>

<div class="bucketlist">
    {#each buckets as bucket, index(bucket)}
        <BucketItem {bucket} {onToggle} {onRemove}/>
    {/each}
</div>
```

```sveltehtml
<script>
    import BucketHeader from "./components/BucketHeader.svelte";
    import BucketList from "./components/BucketList.svelte";
    import BucketCreate from "./components/BucketCreate.svelte";
    import {initialBuckets} from "./bucketData.js";

    let buckets = initialBuckets;

    $: chkCount = buckets.filter((bucket) => !bucket.chk).length;

    const onToggle = (id) => {
        buckets = buckets.map((bucket) => {
            return bucket.id === id ? {...bucket, chk: !bucket.chk } : bucket;
        })
    }

    const onRemove = (id) => {
        buckets = buckets.filter((bucket) => bucket.id !== id);
    }
</script>

<svelte:head>
    <title>My Bucket List</title>
</svelte:head>
<div class="bucketbox">
    <BucketHeader {chkCount}/>
    <BucketList {buckets} {onToggle} {onRemove}/>
    <BucketCreate/>
</div>
```

#### 20.6.3 onEditMode를 이용한 데이터 수정
```diff
<script>
    import BucketHeader from "./components/BucketHeader.svelte";
    import BucketList from "./components/BucketList.svelte";
    import BucketCreate from "./components/BucketCreate.svelte";
    import {initialBuckets} from "./bucketData.js";

    let buckets = initialBuckets;
+    let editMode = '';

    $: chkCount = buckets.filter((bucket) => !bucket.chk).length;

    const onToggle = (id) => {
        buckets = buckets.map((bucket) => {
            return bucket.id === id ? {...bucket, chk: !bucket.chk } : bucket;
        })
    }

    const onRemove = (id) => {
        buckets = buckets.filter((bucket) => bucket.id !== id);
    }

+    const onEditMode = (id) => {
+        editMode = id;
+    }
+
+    const offEditMode = () => {
+        editMode = '';
+    }
+
+    const onEditItem = (editBucket) => {
+        buckets = buckets.map(bucket => {
+            if (bucket.id === editBucket.id) {
+                bucket = editBucket;
+            }
+            return bucket;
+        });
+        offEditMode();
+    }
+
+    const onEditKeyup = (e, editBucket) => {
+        if (e.keyCode === 13) {
+            onEditItem(editBucket);
+        }
+    }

</script>

<svelte:head>
    <title>My Bucket List</title>
</svelte:head>
<div class="bucketbox">
    <BucketHeader {chkCount}/>
-    <BucketList {buckets} {onToggle} {onRemove}/>
+    <BucketList {buckets} {onToggle} {onRemove} {editMode} {onEditMode} {onEditKeyup}/>
    <BucketCreate/>
</div>
```

```diff
<script>
    import BucketItem from './BucketItem.svelte';

    export let buckets;
    export let onToggle;
    export let onRemove;
+    export let editMode;
+    export let onEditMode;
+    export let onEditKeyup;

</script>

<div class="bucketlist">
    {#each buckets as bucket, index(bucket)}
-        <BucketItem {bucket} {onToggle} {onRemove}/>
+        <BucketItem {bucket} {onToggle} {onRemove} {editMode} {onEditMode} {onEditKeyup}/>
    {/each}
</div>
```

```diff
<script>
    import Icon from '@iconify/svelte';

    export let bucket;
    export let onToggle;
    export let onRemove;
+    export let editMode;
+    export let onEditMode;
+    export let onEditKeyup;

</script>

<div class="bucketitem">
    <input type="checkbox" id={bucket.id}
           bind:checked={bucket.chk}/>
    <label for={bucket.id} class="checkcircle"
           on:click={() => onToggle(bucket.id)}
           on:keydown={() => onToggle(bucket.id)}
           role="presentation"
    >
        <Icon icon="ic:round-check"/>
    </label>
-    <p>{bucket.text}</p>
+    {#if editMode === bucket.id}
+        <input
+                type="text"
+                bind:value={bucket.text}
+                on:keyup={(e) => onEditKeyup(e, bucket)}
+        />
+    {:else}
+        <p on:dblclick={() => onEditMode(bucket.id)}>{bucket.text}</p>
+    {/if}
    <button class="remove" on:click={() => onRemove(bucket.id)}>
        <Icon icon="gridicons:trash"/>
    </button>
</div>
```

## 20.7 데이터 추가
```diff
<script>
    import BucketHeader from "./components/BucketHeader.svelte";
    import BucketList from "./components/BucketList.svelte";
    import BucketCreate from "./components/BucketCreate.svelte";
    import {initialBuckets} from "./bucketData.js";
+    import { v4 as uuidv4 } from "uuid";

    let buckets = initialBuckets;
    let editMode = '';
+    let bucketText = '';

    $: chkCount = buckets.filter((bucket) => !bucket.chk).length;

    const onToggle = (id) => {
        buckets = buckets.map((bucket) => {
            return bucket.id === id ? {...bucket, chk: !bucket.chk } : bucket;
        })
    }

    const onRemove = (id) => {
        buckets = buckets.filter((bucket) => bucket.id !== id);
    }

    const onEditMode = (id) => {
        editMode = id;
    }

    const offEditMode = () => {
        editMode = '';
    }

    const onEditItem = (editBucket) => {
        buckets = buckets.map(bucket => {
            if (bucket.id === editBucket.id) {
                bucket = editBucket;
            }
            return bucket;
        });
        offEditMode();
    }

    const onEditKeyup = (e, editBucket) => {
        if (e.keyCode === 13) {
            onEditItem(editBucket);
        }
    }

+    const onDataChange = (e) => {
+        bucketText = e.target.value;
+    }
+
+    const onSubmit = (e) => {
+        e.preventDefault();
+
+        if (bucketText) {
+            const bucket = {
+                id: uuidv4(),
+                text: bucketText,
+                chk: false
+            };
+            buckets = [...buckets, bucket];
+        }
+        bucketText = '';
+    }

</script>

<svelte:head>
    <title>My Bucket List</title>
</svelte:head>
<div class="bucketbox">
    <BucketHeader {chkCount}/>
    <BucketList {buckets} {onToggle} {onRemove} {editMode} {onEditMode} {onEditKeyup}/>
-    <BucketCreate/>
+    <BucketCreate {bucketText} {onDataChange} {onSubmit}/>
</div>
```

```diff
<script>
    import Icon from '@iconify/svelte';

+    export let bucketText;
+    export let onDataChange;
+    export let onSubmit;
+
+    let open = false;
+
+    const onToggle = () => {
+        open = !open;
+        if (!open) {
+            bucketText = '';
+        }
+    };
+
+    const onClose = () => open = false;
</script>

<div class="bucketcreate">
-    <div class="createform">
+    <div class={open ? "createform active" : "createform"}>
-        <form>
+        <form on:submit={(e) => {onSubmit(e); onClose();}}>
            <input
                    type="text"
                    placeholder="추가할 버킷 리스트를 입력 후, Enter를 누르세요."
+                    bind:value={bucketText}
+                    on:change={(e) => onDataChange(e)}
            />
        </form>
    </div>
-    <button class="circlebox">
+    <button class="circlebox" on:click={onToggle}>
        <Icon icon="ic:round-add"/>
    </button>
</div>
```

## 20.8 화면전환 효과 추가하기
```diff
<script>
    import BucketItem from './BucketItem.svelte';
+    import {fade, slide} from "svelte/transition";
+    import {flip} from "svelte/animate";

    export let buckets;
    export let onToggle;
    export let onRemove;
    export let editMode;
    export let onEditMode;
    export let onEditKeyup;

</script>

<div class="bucketlist">
    {#each buckets as bucket, index(bucket)}
+        <div in:fade out:slide animate:flip>
            <BucketItem {bucket} {onToggle} {onRemove} {editMode} {onEditMode} {onEditKeyup}/>
+        </div>
    {/each}
</div>
```

## 20.9 스토어를 이용한 리팩터링
props drilling 반복 작업을 store를 이용한 개선

```js
import {writable, derived} from "svelte/store";
import {initialBuckets} from "./bucketData.js";
import {v4} from "uuid";

const setBucketData = () => {
    let initBucketData = {
        buckets: initialBuckets,
        editMode: ''
    }

    let bucketData = {...initBucketData};

    const {subscribe, update} = writable(bucketData);
}

const setFormBucket = () => {
    let formText = '';

    const {subscribe, update, set} = writable(formText);
    
    const resetFrom = () => {
        set('')
    }
    
    return {
        subscribe,
        set,
        resetFrom
    }
}

const setChkCount = () => {
    const count = derived(buckets, $buckets => {
        return $buckets.buckets.filter((bucket) => !bucket.chk).length;
    });

    return count;
}

export const bucketText = setBucketData();
export const buckets = setFormBucket();
export const chkCount = setChkCount();
```

#### 20.9.3 각각의 커스텀 스토어 수정
```diff
const setBucketData = () => {
    let initBucketData = {
        buckets: initialBuckets,
        editMode: ''
    }

    let bucketData = {...initBucketData};
    const {subscribe, update} = writable(bucketData);

+    const onToggle = (id) => {
+        update(datas => {
+            datas.buckets = datas.buckets.map((bucket) => {
+                return bucket.id === id ? {...bucket, chk: !bucket.chk} : bucket;
+            });
+            return datas;
+        });
+    }
+
+    const onRemove = (id) => {
+        update(datas => {
+            datas.buckets = datas.buckets.filter((bucket) => bucket.id !== id);
+            return datas;
+        });
+    }
+
+    const onEditMode = (id) => {
+        update(datas => {
+            datas.editMode = id;
+            return datas;
+        });
+    }
+
+    const offEditMode = () => {
+        update(datas => {
+            datas.editMode = '';
+            return datas;
+        });
+    }
+
+    const onEditItem = (editBucket) => {
+        update(datas => {
+            datas.buckets = datas.buckets.map(bucket => {
+                if (bucket.id === editBucket.id) {
+                    bucket = editBucket;
+                }
+                return bucket;
+            });
+            return datas;
+        })
+    }
+
+    const onSubmit = (bucketText) => {
+        if (bucketText) {
+            const bucket = {
+                id: uuidv4(),
+                text: bucketText,
+                chk: false
+            };
+            
+            update(datas => {
+                datas.buckets = [...datas.buckets, bucket];
+                
+                return datas;
+            });
+        }
+    }
+    
+    return {
+        subscribe, onToggle, onRemove, onEditMode,
+        offEditMode, onEditItem, onSubmit
+    }
}
```

```diff
<script>
    import BucketHeader from "./components/BucketHeader.svelte";
    import BucketList from "./components/BucketList.svelte";
    import BucketCreate from "./components/BucketCreate.svelte";
-    import {initialBuckets} from "./bucketData.js";
-    import { v4 as uuidv4 } from "uuid";
-
-    let buckets = initialBuckets;
-    let editMode = '';
-    let bucketText = '';
-
-    $: chkCount = buckets.filter((bucket) => !bucket.chk).length;
-    const onToggle = (id) => {
-        buckets = buckets.map((bucket) => {
-            return bucket.id === id ? {...bucket, chk: !bucket.chk } : bucket;
-        })
-    }
-
-    const onRemove = (id) => {
-        buckets = buckets.filter((bucket) => bucket.id !== id);
-    }
-
-    const onEditMode = (id) => {
-        editMode = id;
-    }
-
-    const offEditMode = () => {
-        editMode = '';
-    }
-
-    const onEditItem = (editBucket) => {
-        buckets = buckets.map(bucket => {
-            if (bucket.id === editBucket.id) {
-                bucket = editBucket;
-            }
-            return bucket;
-        });
-        offEditMode();
-    }
-
-    const onEditKeyup = (e, editBucket) => {
-        if (e.keyCode === 13) {
-            onEditItem(editBucket);
-        }
-    }
-
-    const onDataChange = (e) => {
-        bucketText = e.target.value;
-    }
-
-    const onSubmit = (e) => {
-        e.preventDefault();
-        if (bucketText) {
-            const bucket = {
-                id: uuidv4(),
-                text: bucketText,
-                chk: false
-            };
-            buckets = [...buckets, bucket];
-        }
-        bucketText = '';
-    }
</script>

<svelte:head>
    <title>My Bucket List</title>
</svelte:head>
<div class="bucketbox">
-    <BucketHeader {chkCount}/>
-    <BucketList {buckets} {onToggle} {onRemove} {editMode} {onEditMode} {onEditKeyup}/>
-    <BucketCreate {bucketText} {onDataChange} {onSubmit}/>

+    <BucketHeader />
+    <BucketList />
+    <BucketCreate />
</div>
```

```diff
<script>
+    import {buckets} from '../store';
    import BucketItem from './BucketItem.svelte';
    import {fade, slide} from "svelte/transition";
    import {flip} from "svelte/animate";
    
-    export let buckets;
-    export let onToggle;
-    export let onRemove;
-    export let editMode;
-    export let onEditMode;
-    export let onEditKeyup;
</script>

<div class="bucketlist">
    {#each $buckets.buckets as bucket, index(bucket)}
        <div in:fade out:slide animate:flip>
-            <BucketItem {bucket} {onToggle} {onRemove} {editMode} {onEditMode} {onEditKeyup}/>

+            <BucketItem {bucket} />
        </div>
    {/each}
</div>
```

```diff
<script>
+    import {buckets} from '../store';
    import Icon from '@iconify/svelte';
+    import {v4 as uuidv4} from 'uuid';

+    let chkId = uuidv4();
    
    export let bucket;
    
-    export let onToggle;
-    export let onRemove;
-    export let editMode;
-    export let onEditMode;
-    export let onEditKeyup;
    
+    const {onToggle, onRemove, onEditMode, offEditMode, onEditItem} = buckets;
+    
+    const onEditKeyup = (e) => {
+        if(e.keyCode === 13) {
+            onEditItem(bucket);
+            offEditMode();
+        }
+    }

</script>

<div class="bucketitem">
-    <input type="checkbox" id={bucket.id}
+    <input type="checkbox" id={chkId}
           bind:checked={bucket.chk}/>
-    <label for={bucket.id} class="checkcircle"
+    <label for={chkId} class="checkcircle"
           on:click={() => onToggle(bucket.id)}
           on:keydown={() => onToggle(bucket.id)}
           role="presentation"
    >
        <Icon icon="ic:round-check"/>
    </label>
-    {#if editMode === bucket.id}
+    {#if $buckets.editMode === bucket.id}
        <input
                type="text"
                bind:value={bucket.text}
                on:keyup={(e) => onEditKeyup(e, bucket)}
        />
    {:else}
        <p on:dblclick={() => onEditMode(bucket.id)}>{bucket.text}</p>
    {/if}
    <button class="remove" on:click={() => onRemove(bucket.id)}>
        <Icon icon="gridicons:trash"/>
    </button>
</div>
```

```diff
<script>
+    import {chkCount} from '../store';
    const today = new Date();
    const week = ["일", "월", "화", "수", "목", "금", "토"];

    const dateString = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
        day: today.getDay()
    };

    const { year, month, date, day } = dateString;
    
-    export let chkCount;
</script>

<div class="bucketheader">
    <h1>My Bucket List</h1>
    <h2>현재: {year}년 {month}월 {date}일 {week[day]}요일</h2>
-    <p>할 일 {chkCount}개 남음</p>
+    <p>할 일 {$chkCount}개 남음</p>
</div>
```