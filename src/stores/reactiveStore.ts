import { ref } from 'vue'
import { defineStore } from 'pinia'

type KeyPropsPair = {[key:string]: any}
export const useReactiveStore = defineStore('reactiveStore', () => {
  const reactiveStore = ref<Record<string, any>>({})

  const setStore = (pair: KeyPropsPair) => {
    try {
      const props = Object.entries(pair)
      props.forEach(([key, value]) => {
        reactiveStore.value[key] = value
      })
    } catch (error) {
      console.log(error)
      // maybe show a error toast
    }
  }

  return { reactiveStore, setStore }
})
