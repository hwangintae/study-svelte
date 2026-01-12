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