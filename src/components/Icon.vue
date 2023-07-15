<template>
  <!-- <SvgIcon type="mdi" :path="path" /> -->
  <svg :width="size" :height="size" :viewBox="viewbox" :style="styles" >
    <path :d="path" />
  </svg>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
// import SvgIcon from "@jamescoyle/vue-icon";
import { pascalCase } from "change-case";

const props = defineProps({
  icon: String,

  //
  size: { 
    type: [String, Number], 
    default: 24 
  },
  viewbox: {
    type: String, 
    default: "0 0 24 24" 
  },
  flip: {
    type: String,
    validator: (value) => ["horizontal", "vertical", "both", "none"].includes(value),
  },
  rotate: { 
    type: Number, 
    default: 0
  },
});
const emit = defineEmits([]);

const path = ref("");

const styles = computed(() => {
  return {
    "--sx": ["both", "horizontal"].includes(props.flip) ? "-1" : "1",
    "--sy": ["both", "vertical"].includes(props.flip) ? "-1" : "1",
    "--r": isNaN(props.rotate) ? props.rotate : props.rotate + "deg",
  }
});

onMounted(async () => {
  const icons = await import('@mdi/js')
  path.value = icons['mdi' + pascalCase(props.icon)];
});

</script>

<style scoped>
svg {
  transform: rotate(var(--r, 0deg)) scale(var(--sx, 1), var(--sy, 1));
}

path {
  fill: currentColor;
}
</style>