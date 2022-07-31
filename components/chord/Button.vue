<template>
	<input
		type="radio"
		name="chord-select"
		:id="id"
		:value="chord"
		:checked="selected"
		@change="select"
	/>
	<label :for="id">
		{{ nameChord(chord, scale) }}<sup>{{ inversionToText(chord.inversion) }}</sup>
	</label>
</template>

<script setup lang="ts">
	import { Chord, nameChord, inversionToText, Scale } from '@/scripts/music-theory'

	defineProps<{
		chord: Chord,
		scale: Scale,
		selected: boolean,
		id: string,
		select: () => void
	}>()
</script>

<style scoped>
	input
	{
		display: inline-block;
		margin: 0;
		padding: 0;
		border: none;
		width: 0;
		height: 0;
		opacity: 0;
		-moz-appearance: none;
	}

	@supports (-moz-appearance: none) 
	{
		input { display: none; } 
	}

	label
	{
		cursor: pointer;
		display: inline-block;
		background: var(--white-70);
		margin: 4px 8px 4px 0;
		padding-bottom: 3px;
		width: 120px;
		border-radius: 6px;
		line-height: 2;
		text-align: center;
	}

	input:checked + label
	{
		color: var(--background);
		background: var(--foreground);
	}
</style>