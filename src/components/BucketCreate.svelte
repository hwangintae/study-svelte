<script>
    import {buckets, bucketText} from '../store';
    import Icon from '@iconify/svelte';

    let open = false;

    const onToggle = () => {
        open = !open;
        bucketText.resetFrom();
    };

    const onClose = () => open = false;

    const onDataChange = (e) => {
        $bucketText = e.target.value;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        buckets.onSubmit($bucketText);
    }
</script>

<div class="bucketcreate">
    <div class={open ? "createform active" : "createform"}>
        <form on:submit={(e) => {
            onSubmit(e);
            onClose();
        }}>
            <input
                    type="text"
                    placeholder="추가할 버킷 리스트를 입력 후, Enter를 누르세요."
                    bind:value={$bucketText}
                    on:change={(e) => onDataChange(e)}
            />
        </form>
    </div>
    <button class="circlebox" on:click={onToggle}>
        <Icon icon="ic:round-add"/>
    </button>
</div>