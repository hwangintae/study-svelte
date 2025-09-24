<script>
    import {elasticOut} from "svelte/easing";
    import { fade } from "svelte/transition";

    let visible = false;

    function spin(node, {duration}) {
        return {
            duration,
            css: (t) => {
                const eased = elasticOut(t);

                return `
                    transform: scale(${eased}) rotate(${eased * 1080}deg);
                `;
            }
        }
    }
</script>

<label>
    <input type="checkbox" bind:checked={visible} /> 보임
</label>

{#if visible}
    <div class="centered" in:spin={{duration: 8000}} out:fade>
        <span>transitions!</span>
    </div>
{/if}

<style>
    .centered {
        position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
    }

    span {
        position: absolute; font-size: 4em;
        transform: translate(-50%, -50%);
    }
</style>