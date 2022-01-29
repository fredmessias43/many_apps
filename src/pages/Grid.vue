<template>
	<div class="grid-areas">
		<div class="double-area area" :style="`width:${leftArea.width}%`">
			<div class="inside-area"></div>
		</div>

		<div
			class="vertical-divider"
			@draggable="true"
			@dragstart="startMove"
			@drag="moving"
			@dragend="finishMove"
		></div>

		<div class="double-area area" :style="`width:${rigthArea.width}%`">
			<div class="inside-area"></div>
		</div>
		<!-- <div class="area"></div>
      <div class="area"></div> -->
	</div>
</template>

<script setup lang="ts" >
import { reactive, ref } from "vue";

const leftArea = reactive({ width: 49.5 });
const rigthArea = reactive({ width: 49.5 });

function startMove(e: DragEvent) {
	console.log("startMove" /* {x: e.clientX, y: e.clientY}, e */);
}
function moving(e: DragEvent) {
	e.preventDefault();
	console.log("moving" /* {x: e.clientX, y: e.clientY}, e */);
	move(e);
}
function finishMove(e: DragEvent) {
	console.log("finishMove" /* {x: e.clientX, y: e.clientY}, e */);
	move(e);
}

function move(e: DragEvent) {
	if (e.clientX === 0) {
    return;
	}
  const value = (e.clientX / window.innerWidth) * 100 ;
  console.log(value);
  

	const less50 = value < 50 ? value : 100 - value;
	const bigger50 = value > 50 ? value : 100 - value;

	// moving left
	if (e.clientX <= window.innerWidth / 2) {
		leftArea.width = less50;
		rigthArea.width = bigger50;
	}
	// moving rigth
	if (e.clientX >= window.innerWidth / 2) {
		leftArea.width = bigger50;
		rigthArea.width = less50;
	}
}
</script>

<style>
.grid-areas {
	display: flex;
	height: 100vh;
	position: relative;
}

.area {
	padding: 0.05rem;
}

.double-area {
	height: 100%;
	width: 49.75%;
}

.inside-area {
	width: 100%;
	height: 100%;
	border-radius: 8px;
	background: rgba(0, 255, 255, 0.2);
}

.vertical-divider {
	height: 100%;
	width: 1%;
	cursor: col-resize;
}
.vertical-divider:hover {
	background: cadetblue;
}
</style>