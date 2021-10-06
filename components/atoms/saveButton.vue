<template>
  <div>
    <v-btn
      class="ma-2"
      color="success"
      @click="$emit('click', $event.target.value)"
    >
      Speichern </v-btn
    ><span> {{ event.target }}</span>
  </div>
</template>
