<script setup lang="ts">
/** Props: label (string), value (number), unit (optional string) */
defineProps<{ label: string; value: number; unit?: string }>();
</script>

<template>
  <div
    class="rounded-xl bg-white shadow px-6 py-4 flex flex-col gap-1 hover:shadow-lg transition"
  >
    <span class="text-sm text-gray-500">{{ label }}</span>

    <span class="text-2xl font-semibold">
      {{ value.toLocaleString() }}
      <span v-if="unit">{{ unit }}</span>
    </span>
  </div>
</template>
