<script setup lang="ts">
/** Props: label (string), value (number), unit (optional string) */
defineProps<{
  label: string;
  value: number;
  unit?: string;
  delta?: number | null;
}>();
</script>

<template>
  <div class="flex flex-col gap-1 rounded-xl bg-white shadow p-3 sm:p-4 w-full">
    <span class="text-xs text-gray-500">{{ label }}</span>

    <div class="flex items-baseline gap-1">
      <span class="text-2xl font-semibold">
        {{ value.toLocaleString() }} {{ unit }}
      </span>

      <span
        v-if="delta !== null"
        :class="delta >= 0 ? 'text-emerald-600' : 'text-rose-600'"
        class="text-sm font-medium"
      >
        {{ delta >= 0 ? "▲" : "▼" }}
        {{ Math.abs(delta).toLocaleString() }}
      </span>
    </div>
  </div>
</template>
