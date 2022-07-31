<template>
	<Head>
		<Title>Left Center Random | Sound Utility</Title>
	</Head>
	<p id="wordmark">
		<Wordmark/>
	</p>
	<main>
		<section id=info>
			<h1>LCR-[andom]</h1>
			<p>
				Generates a random arrangment of chords, melody, bass, and percussion for
				insporation. Each instrument is chosen to be either organic or synthisized,
				and placed in the left, right, or center of the mix. You can hover over the
				symbols to get a tooltip of what it repersents.
			</p>
			<p>
				The randomness is seeded to the time-since-epoch (in minutes), so quckly
				refreshing the page will not change the result. The result you are seeing
				is the result of this minute, and will not change until the next minute.
			</p>
		</section>
		<div id="arrangment">
			<p>L</p><p>C</p><p>R</p>
			<section id="melody" :class="panMelody">
				<svg v-if="synthMelody"
					xmlns="http://www.w3.org/2000/svg" width="81" height="43" viewBox="0 0 163 87"
					:aria-label="'synth melody, panned ' + panMelody" 
					role="figure"
				>
					<title>Synth melody</title>
					<path fill="none" stroke-linecap="round" stroke-width="4" d="M2 2h53v31h52v31h53"/>
				</svg>
				<svg v-else 
					xmlns="http://www.w3.org/2000/svg" width="81.7" height="43.7" viewBox="0 0 163 87"
					:aria-label="'guitar melody, panned ' + panMelody" 
					role="figure"
				>
					<title>Organic melody</title>
					<path fill="none" stroke-linecap="round" stroke-width="4" d="M3 3l158 82"/>
				</svg>
			</section>
			<section id="chords" :class="panChords">
				<svg v-if="synthChords"
					xmlns="http://www.w3.org/2000/svg" width="81.35" height="22.1" viewBox="0 0 163 44"
					:aria-label="'synth chords, panned ' + panChords" 
					role="figure"
				>
					<title>Synth chords</title>
					<g fill="none" stroke-linecap="round" stroke-width="4">
						<path d="M2 2h159M2 22h159M2 42h159"/>
					</g>
				</svg>
				<svg v-else
					xmlns="http://www.w3.org/2000/svg" width="81.35" height="46.15" viewBox="0 0 163 92"
					:aria-label="'guitar chords, panned ' + panChords" 
					role="figure"
				>
					<title>Organic chords</title>
					<g fill="none" stroke-linecap="round" stroke-width="4">
						<path d="M2 26c26-26 42-38 80 0s44 33 79 0"/>
						<path d="M2 46c30-31 42-38 80 0s49 31 79 0"/>
						<path d="M2 66c34-35 43-38 80 0 35 38 55 26 79 0"/>
					</g>
				</svg>
			</section>
			<section id="bassline" :class="panBass">
				<svg v-if="synthBass"
					xmlns="http://www.w3.org/2000/svg" width="85.35" height="6" viewBox="0 0 171 12"
					:aria-label="'synth bass, panned ' + panBass" 
					role="figure"
				>
					<title>Synth bass</title>
					<path fill="none" stroke-linecap="round" stroke-width="12" d="M6 6h159"/>
				</svg>
				<svg v-else
					xmlns="http://www.w3.org/2000/svg" width="85.35" height="31.8" viewBox="0 0 171 64"
					:aria-label="'bass guitar, panned ' + panBass" 
					role="figure"
				>
					<title>Bass guitar</title>
					<path fill="none" stroke-linecap="round" stroke-width="12" d="M6 32C36 1 48-6 86 32s49 30 79 0"/>
				</svg>
			</section>
			<section id="percussion" :class="panDrums">
				<svg v-if="synthDrums"
					xmlns="http://www.w3.org/2000/svg" width="81" height="12.95" viewBox="0 0 128 22"
					:aria-label="'synth drums, panned ' + panDrums" 
					role="figure">
					<title>Synth drums</title>
					<g transform="translate(-37 -39)">
						<rect width="21.9" height="21.9" rx="4" transform="translate(37 39)"/>
						<rect width="21.9" height="21.9" rx="4" transform="translate(143 39)"/>
						<rect width="21.9" height="21.9" rx="4" transform="translate(70 39)"/>
					</g>
				</svg>
				<svg v-else
					xmlns="http://www.w3.org/2000/svg" width="81" height="12.95" viewBox="0 0 128 22"
					:aria-label="'real drums, panned ' + panDrums" 
					role="figure"
				>
					<title>Organic drums</title>
					<g transform="translate(-37 -39)">
						<rect width="21.9" height="21.9" rx="40" transform="translate(37 39)"/>
						<rect width="21.9" height="21.9" rx="40" transform="translate(143 39)"/>
						<rect width="21.9" height="21.9" rx="40" transform="translate(70 39)"/>
					</g>
				</svg>
			</section>
		</div>
	</main>
</template>

<script setup lang="ts">
	import seedrandom from 'seedrandom'


	/* Seed random number genorator so that results don't change until a minute
	 * passes (reduces habit of reloading until you get what you want).
	 */
	const epoch = Date.now()
	const epochMinute = Math.floor(epoch / 60000)
	let rand = seedrandom(`${epochMinute}`)

	/* "Flip a coin" to pick between real & synth versions.
	 */
	const synthMelody = (rand() < 0.5)
	const synthChords = (rand() < 0.5)
	const synthBass = (rand() < 0.5)
	const synthDrums = (rand() < 0.5)

	/* Choose panning arrangement. Note: intentionally biased towards placing
	 * bassline and drums in center.
	 */
	const arrangment = ['center', 'center', 'left', 'right'].sort(() => 0.5 - rand())
	
	const panDrums = arrangment[0]
	const panBass = arrangment[1]
	const panMelody = arrangment[2]
	const panChords = arrangment[3]

</script>

<style scoped>
	#wordmark
	{
		font-size: 3.5rem;
		margin: 0 20px;
		--background: var(--red);
		--accent: var(--white);
	}

	main
	{
		display: flex;
		flex-direction: column-reverse;
	}

	#info
	{
		max-width: 65ch;
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
		margin: 15vh auto 0;
	}

	p
	{
		margin: 0.5rem auto;
		text-align: justify;
	}

	#arrangment > p
	{
		color: var(--accent);
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

	section.left::after,
	section.right::after
	{
		content: "";
		display: block;
		position: absolute;
		z-index: 999;
		width: 100%;
		height: 150px;
		border-left: 1px solid var(--accent);
		border-right: 1px solid var(--accent);
	}
</style>