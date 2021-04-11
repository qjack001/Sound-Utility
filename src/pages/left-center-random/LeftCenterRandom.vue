<template>
	<site-header/>
	<main>
		<div id="arrangment">
			<section id="melody" :class="panMelody">
				<svg xmlns="http://www.w3.org/2000/svg" width="81.7" height="43.7" viewBox="0 0 163 87"
					v-if="melody" 
					:aria-label="'guitar melody, panned ' + panMelody" 
					role="figure">
					<title>Organic melody</title>
					<path fill="none" stroke-linecap="round" stroke-width="4" d="M3 3l158 82"/>
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" width="81" height="43" viewBox="0 0 163 87"
					v-else 
					:aria-label="'synth melody, panned ' + panMelody" 
					role="figure">
					<title>Synth melody</title>
					<path fill="none" stroke-linecap="round" stroke-width="4" d="M2 2h53v31h52v31h53"/>
				</svg>
			</section>
			<section id="chords" :class="panChords">
				<svg xmlns="http://www.w3.org/2000/svg" width="81.35" height="46.15" viewBox="0 0 163 92"
					v-if="chords" 
					:aria-label="'guitar chords, panned ' + panChords" 
					role="figure">
					<title>Organic chords</title>
					<g fill="none" stroke-linecap="round" stroke-width="4"><path d="M2 26c26-26 42-38 80 0s44 33 79 0"/><path d="M2 46c30-31 42-38 80 0s49 31 79 0"/><path d="M2 66c34-35 43-38 80 0 35 38 55 26 79 0"/></g>
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" width="81.35" height="22.1" viewBox="0 0 163 44"
					v-else 
					:aria-label="'synth chords, panned ' + panChords" 
					role="figure">
					<title>Synth chords</title>
					<g fill="none" stroke-linecap="round" stroke-width="4"><path d="M2 2h159M2 22h159M2 42h159"/></g>
				</svg>
			</section>
			<section id="bassline" :class="panBass">
				<svg xmlns="http://www.w3.org/2000/svg" width="85.35" height="31.8" viewBox="0 0 171 64"
					v-if="bass"
					:aria-label="'bass guitar, panned ' + panBass" 
					role="figure">
					<title>Bass guitar</title>
					<path fill="none" stroke-linecap="round" stroke-width="12" d="M6 32C36 1 48-6 86 32s49 30 79 0"/>
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" width="85.35" height="6" viewBox="0 0 171 12"
					v-else 
					:aria-label="'synth bass, panned ' + panBass" 
					role="figure">
					<title>Synth bass</title>
					<path fill="none" stroke-linecap="round" stroke-width="12" d="M6 6h159"/>
				</svg>
			</section>
			<section id="percussion" :class="panDrums">
				<svg xmlns="http://www.w3.org/2000/svg" width="81" height="12.95" viewBox="0 0 128 22"
					v-if="drums"
					:aria-label="'real drums, panned ' + panDrums" 
					role="figure">
					<title>Organic drums</title>
					<g transform="translate(-37 -39)"><rect width="21.9" height="21.9" rx="40" transform="translate(37 39)"/><rect width="21.9" height="21.9" rx="40" transform="translate(143 39)"/><rect width="21.9" height="21.9" rx="40" transform="translate(70 39)"/></g>
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" width="81" height="12.95" viewBox="0 0 128 22"
					v-else
					:aria-label="'synth drums, panned ' + panDrums" 
					role="figure">
					<title>Synth drums</title>
					<g transform="translate(-37 -39)"><rect width="21.9" height="21.9" rx="4" transform="translate(37 39)"/><rect width="21.9" height="21.9" rx="4" transform="translate(143 39)"/><rect width="21.9" height="21.9" rx="4" transform="translate(70 39)"/></g>
				</svg>
			</section>
		</div>
		<section id=info>
			<h1>LCR-[andom]</h1>
			<p>
				Generates a random arrangment of chords, melody, bass, and percussion for insporation. Each instrument is chosen to be either
				organic or synthisized, and placed in the left, right, or center of the mix. The randomness is seeded to the time-since-epoch
				(in minutes), so quckly refreshing the page will not change the result. The result you are seeing is the result of this minute,
				and will not change until the next minute.
			</p>
		</section>
	</main>
</template>

<script>
	import seedrandom from 'seedrandom'
	import SiteHeader from '../../SiteHeader.vue';

	export default 
	{
		name: 'LeftCenterRandom',
		components: { SiteHeader },
		setup()
		{
			// seed random number genorator so that results don't change until a minute passes
			// (reduces habit of reloading until you get what you want)

			let rand = seedrandom( Math.floor( new Date() / 60000 )); // minutes since epoch

			console.log(rand())

			// pick between real & synth versions
			// "flip a coin"

			const melody = (rand() < 0.5)
			const chords = (rand() < 0.5)
			const bass = (rand() < 0.5)
			const drums = (rand() < 0.5)

			// choose panning arrangement
			// note: intentionally biased towards placing bassline and drums in center

			let randArrangment = ["center","center","left","right"].sort(() => 0.5 - rand())
			
			const panDrums = randArrangment[0]
			const panBass = randArrangment[1]
			const panMelody = randArrangment[2]
			const panChords = randArrangment[3]

			return { melody, chords, bass, drums, panDrums, panBass, panMelody, panChords }
		}
	}
</script>

<style scoped>


	#info
	{
		max-width: 75ch;
		height: auto;
		padding: 80px 20px;
		margin: auto;
	}

	#arrangment
	{
		display: grid;
		grid-template-columns: 100px 100px 100px;
		grid-template-rows: 100px auto;

		max-width: 300px;
		margin: 20vh auto 0;
	}

	svg
	{
		stroke: var(--foreground);
		fill: var(--foreground);

		transform: scale(0.8);
	}

	section
	{
		max-width: 100px;
		height: 50px;

		display: grid;
		place-items: center;
		text-align: center;

		background: var(--background);
	}

	section.left
	{
		grid-column: 1;
		grid-row: 1;
		transform: translateY(25px);
	}

	section.center
	{
		grid-column: 2;
		grid-row: 1;
	}

	section.center ~ section.center
	{
		transform: translateY(50px);
	}

	section.right
	{
		grid-column: 3;
		grid-row: 1;
		transform: translateY(25px);
	}
</style>