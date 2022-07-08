<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default defineComponent({
  setup() {
    return { test: "test" };
  },
  props: {
    title: String
  }
});
</script>
