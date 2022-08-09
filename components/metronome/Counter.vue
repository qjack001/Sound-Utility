<template>
	<div class="grid" :style="`--beats: ${beats}`">
		<div
			v-for="beat in beats"
			:key="beat"
			:class="[ 'beat', (beat == current) ? 'selected' : '' ]"
		>
			{{ beat }}
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onBeforeUnmount, watch } from 'vue'
	import { Metronome } from '@/scripts/metronome'
	import { HighResolutionTimer } from '@/scripts/timing.js'

	const props = defineProps<{
		beats: number
		bpm: number
	}>()

	const current = ref<number>(1)

	const startClocks = () => {
		timer.stop()
		metronome.stop()

		timer.set((60 * 1000) / props.bpm)
		metronome.set(props.bpm, props.beats)

		current.value = 0
		timer.run()
		metronome.run()
	}
	
	const stepCounter = () => {
		current.value = (current.value % props.beats) + 1
	}

	const audioContext = new window.AudioContext()
	const metronome = new Metronome(audioContext, props.bpm, props.beats)
	const timer = new HighResolutionTimer((60 * 1000) / props.bpm, stepCounter)

	watch(props, startClocks)
	startClocks()
	onBeforeUnmount(() => {
		timer.stop()
		metronome.stop()
	})
</script>

<style scoped>
	.grid
	{
		display: grid;
		grid-template-columns: repeat(var(--beats), 1fr);
		margin: 20px 0;
	}

	.beat
	{
		width: 100%;
		aspect-ratio: 1 / 1;

		border: 2px solid var(--foreground);
		border-radius: 100%;
		box-sizing: border-box;

		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 8vw;
	}

	.beat.selected
	{
		background: var(--accent);
		color: var(--background);
	}
</style>