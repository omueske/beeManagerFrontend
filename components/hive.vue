<template>
  <div>Anzahl Bienenvölker: {{ hiveStore.hiveList.length }}</div>
</template>

<script>
import { useHiveStore } from "~/store/hives";

export default defineComponent({
  setup() {
    const hiveStore = useHiveStore();
    hiveStore.fetchHives();
    // console.log(hiveStore);

    return { hiveStore };
  },
});
</script>
