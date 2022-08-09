<template>
	<div class="options">
		<template v-for="(bpmOption, index) in ALL_BPM_OPTIONS" :key="bpmOption">
			<input
				:id="`bpm-option-${bpmOption}`"
				type="radio"
				name="bpm"
				:value="bpm"
				:checked="bpmOption == bpm"
				:class="{ 'alternate': (index % 2 != 0) }"

				@change="emit('update:bpm', bpmOption)"
			>
			<label
				:for="`bpm-option-${bpmOption}`"
				:class="{ 'alternate': (index % 2 == 0) }"
			>
				{{ bpmOption }}
			</label>
		</template>
		<p id="largo" class="tempo-name">
			Largo
		</p>
		<p id="larghetto" class="tempo-name">
			Larghetto
		</p>
		<p id="adagio" class="tempo-name">
			Adagio
		</p>
		<p id="andante" class="tempo-name">
			Andante
		</p>
		<p id="moderato" class="tempo-name">
			Moderato
		</p>
		<p id="allegro" class="tempo-name">
			Allegro
		</p>
		<p id="vivace" class="tempo-name">
			Vivace
		</p>
		<p id="presto" class="tempo-name">
			Presto
		</p>
	</div>
</template>

<script setup lang="ts">
	defineProps<{ bpm: number }>()
	const emit = defineEmits([ 'update:bpm' ])

	const ALL_BPM_OPTIONS = [
		40, 42, 44, 46, 48, 50, 52, 54, 56, 58, // Largo
		60, 63, 66,                             // Larghetto
		69, 72, 76,                             // Adagio
		80, 84, 88, 92, 96, 100, 104,           // Andante
		108, 112, 116, 120,                     // Moderato
		126, 132, 138, 144, 152,                // Allegro
		160, 168, 176,                          // Vivace
		184, 192, 200, 208,                      // Presto
	]
</script>

<style scoped>
	input
	{
		opacity: 0;
		display: block;
		width: 100%;
		height: 1.8em;
		padding: 0;
		margin: 0;
		cursor: pointer;
	}

	label
	{
		color: var(--background);
		background: var(--foreground);

		display: block;
		margin: 0;
		padding: 0;
		cursor: pointer;
		user-select: none;

		font-size: 1em;
		line-height: 1.8em;
		text-align: center;
	}

	.alternate
	{
		grid-row: 3;
	}

	input:checked + label
	{
		background: var(--accent);
	}

	.options
	{
		display: grid;
		grid-template-columns: repeat(78, 6ch);
		font-size: 10px;

		margin: 0 auto;
		max-width: 1380px;
		width: 100%;
		overflow-x: scroll;
	}

	.tempo-name
	{
		grid-row: 2;
		border: 2px solid var(--foreground);
		border-inline-end: none;
		margin: 0;
		padding: 0;

		font-size: 1em;
		font-weight: bold;
		line-height: 1.1em;
		text-align: center;
		text-transform: uppercase;
	}

	.tempo-name:last-child
	{
		border-inline-end: 2px solid var(--foreground);
	}

	#largo { grid-column: 1 / 11 }
	#larghetto { grid-column: 11 / 14 }
	#adagio { grid-column: 14 / 17 }
	#andante { grid-column: 17 / 24 }
	#moderato { grid-column: 24 / 28 }
	#allegro { grid-column: 28 / 33 }
	#vivace { grid-column: 33 / 36 }
	#presto { grid-column: 36 / 40 }
</style>