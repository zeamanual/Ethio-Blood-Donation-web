import createCache from "@emotion/cache";

export let createEmotionCache = ()=> createCache({
    key: "css", 
    prepend: true
})