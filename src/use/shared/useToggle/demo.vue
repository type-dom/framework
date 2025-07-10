<script setup lang="ts">
// import { useToggle } from '@vueuse/core'
import { useToggle } from './index';

const [value, toggle] = useToggle()
</script>

<template>
  <div>
    <p>Value: {{ value.get() ? 'ON' : 'OFF' }}</p>
    <button @click="toggle()">
      Toggle
    </button>
    <button @click="value.set(true)">
      Set ON
    </button>
    <button @click="value.set(false)">
      Set OFF
    </button>
  </div>
</template>
