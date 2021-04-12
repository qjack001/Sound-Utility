<template>
	<site-header/>
	<main>
		<section id=info>
			<h1>Simple Progression</h1>
			<p>Build a simple progression of simple chords. The three rows repersesent the top three strings of the guitar (G-B-E).</p>
		</section>
		<section id="progression">
			<template v-for="chord in data['chords']" :key="chord.id">
				<input
					type="radio"
					name="chord-tabs" 
					:id="chord.id" 
					:value="chord.id" 
					:aria-labelledby="chord.id + '-label'" 
					class="chord-tab"
					:checked="chord.id == data['selected'].id"
					@change="selectChord(chord)"/> 
				<label :id="chord.id + '-label'" :for="chord.id" class="chord-tab">{{ chord.name }}</label>
			</template>
			<button id="add-chord" @click="addChord()">+</button>
		</section>
		<section id="fretboard">
			<div>
				<template v-for="index in 25" :key="index">
					<input
						type="radio"
						name="chord-top"
						:value="index"
						:id="'chord-top' + index"
						:aria-label="'top row, fret ' + index"
						class="fret"
						:checked="index == data['selected'].top"
						@change="setTop(index)"/>
					<label 
						:for="'chord-top' + index"
						:class="[ 'top', 'fret', {
							'in-key' : notesInKey.includes(index + 9),

							'fifth'  : (index == (data['selected'].root - 2)),
							'aug'    : (index == (data['selected'].root - 1)),
							'sixth'  : (index == (data['selected'].root)),
							'min7'   : (index == (data['selected'].root + 1)),
							'maj7'   : (index == (data['selected'].root + 2)),
							'oct'    : (index == (data['selected'].root + 3)),

							'below'  : (data['selected'].top == data['selected'].third)
						}]">
					</label>
				</template>
			</div>
			<div>
				<template v-for="index in 25" :key="index">
					<input
						type="radio"
						name="chord-third"
						:value="index"
						:id="'chord-third' + index"
						:aria-label="'middle row, fret ' + index" 
						class="fret"
						:checked="index == data['selected'].third"
						@change="setThird(index)"/>
					<label 
						:for="'chord-third' + index"
						:class="[ 'top', 'fret', {
							'in-key' : notesInKey.includes(index + 4),

							'major'  : (index == data['selected'].root),
							'minor'  : (index == (data['selected'].root - 1)),

							'above'  : (data['selected'].third == data['selected'].top),
							'below'  : (data['selected'].third == data['selected'].root)
						}]">
					</label>
				</template>
			</div>
			<div :class="[data['keyType']]">
				<template v-for="index in 25" :key="index">
					<input
						type="radio"
						name="chord-root"
						:value="index"
						:id="'chord-root' + index"
						:aria-label="'root row, fret ' + index" 
						class="fret"
						:checked="index == data['selected'].root"
						@change="setRoot(index)"/>
					<label 
						:for="'chord-root' + index"
						:class="[ 'root', 'fret', {
							'in-key' : notesInKey.includes(index),
							'octave' : ((index + 11) % 12 == 0),
							'change-case': [4,5,9,10,11,12,16,17,21,22,23,24].includes(index),
							'lower-case': [3, 15].includes(index),
							'above'  : (data['selected'].root == data['selected'].third),
						}]">
					</label>
				</template>
			</div>
		</section>
		<section id="controls">
			<input
				type="radio"
				name="key-type"
				value="maj"
				id="major-key-selector"
				aria-label="major"
				:checked="data['keyType'] == 'maj'"
				@change="setKey('maj')"/>
			<label for="major-key-selector">
				Major
			</label>
			<input
				type="radio"
				name="key-type"
				value="min"
				id="minor-key-selector"
				aria-label="minor"
				:checked="data['keyType'] == 'min'"
				@change="setKey('min')"/>
			<label for="minor-key-selector">
				Minor
			</label>
			<input
				type="radio"
				name="key-type"
				value="none"
				id="none-key-selector"
				aria-label="no key"
				:checked="data['keyType'] == 'none'"
				@change="setKey('none')"/>
			<label for="none-key-selector">
				None
			</label>

			<button id="delete-chord" @click="deleteCurrent()">Delete</button>
		</section>
	</main>
</template>

<script>
	import SiteHeader from '../../SiteHeader.vue';
	import { reactive } from 'vue';

	export default 
	{
		name: 'SimpleProgression',
		components: { SiteHeader },
		setup()
		{
			const data = reactive({
				chords: [],
				selected: '',
				keyType: 'maj'
			})
			return { data }
		},
		created ()
		{
			document.title = "Simple Progression Sound Utility";
		},
		methods:
		{
			addChord()
			{
				let chord = {
					name: '...',
					id: ('chord-' + Math.random().toString(36).substr(2, 10))
				}

				this.data['chords'].push(chord)
				this.selectChord(chord)
			},
			selectChord(chord)
			{
				this.data['selected'] = chord
			},
			setRoot(index)
			{
				this.data['selected'].root = index
				this.nameChord(this.data['selected'])
			},
			setThird(index)
			{
				this.data['selected'].third = index
				this.nameChord(this.data['selected'])
			},
			setTop(index)
			{
				this.data['selected'].top = index
				this.nameChord(this.data['selected'])
			},
			setKey(newKey)
			{
				this.data['keyType'] = newKey
				this.data['chords'].forEach(this.nameChord)
			},
			deleteCurrent()
			{
				let index = this.data['chords'].indexOf(this.data['selected'])

				if (index == -1 || this.data['chords'].length <= 1)
				{
					// no-op; don't delete last chord, just reset
					this.data['chords'][0] = { name: '...', id: ('chord-' + Math.random().toString(36).substr(2, 10)) }
					this.selectChord(this.data['chords'][0])
					return;
				}

				this.data['chords'].splice(index, 1)

				if (index == 0)
				{
					this.selectChord(this.data['chords'][0])
				}
				else
				{
					this.selectChord(this.data['chords'][index - 1])
				}
			},
			nameChord(chord)
			{
				let rootNote = chord.root
				let thirdNote = chord.third
				let topNote = chord.top

				// no (full) chord selected = "..."
				if (!rootNote || !thirdNote || !topNote)
				{
					chord.name = '...'
					return;
				}

				let scaleDegree = this.notesInKey.indexOf(rootNote)
				let prefix = '' // prefix for flat chords

				// if not in key, check if chord is flat
				if (scaleDegree == -1)
				{
					scaleDegree = this.notesInKey.indexOf(rootNote + 1)
					prefix = 'b' // flat
				}

				let rootName = ['VII', 'I', 'II', 'III', 'IV', 'V', 'VI'][((scaleDegree + 1) % 7)]
				let major = true

				// not using a key
				if (this.data['keyType'] == 'none')
				{
					rootName = 'm'
					prefix = ''
				}

				// check if major or minor
				if (thirdNote == rootNote)
				{
					rootName = rootName.toUpperCase();
				}
				else if (thirdNote + 1 == rootNote)
				{
					rootName = rootName.toLowerCase();
					major = false
				}
				else
				{
					// third note out of known chord range
					chord.name = 'unknown'
					return;
				}

				let topDistance = (topNote - rootNote)
				let topName = ''

				// find top note name
				if (topDistance == -2 || topDistance == 3)
				{
					// add nothing, standard fifth or octave
				}
				else if (topDistance == -1)
				{
					topName = '+'
				}
				else if (topDistance == 0)
				{
					topName = '6'
				}
				else if (topDistance == 1)
				{
					topName = '7'
				}
				else if (topDistance == 2)
				{
					topName = 'maj7'
				}
				else
				{
					// top note out of known chord range
					chord.name = 'unknown'
					return;
				}

				// set chord name
				chord.name = prefix + rootName + topName
			}
		},
		computed:
		{
			notesInKey()
			{
				if (this.data['keyType'] == 'maj')
				{
					// major intervals
					return [1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18, 20, 22, 24, 25, 27, 29, 30, 32, 34, 35]
				}
				else if (this.data['keyType'] == 'min')
				{
					// minor intervals
					return [1, 3, 4, 6, 8, 9, 11, 13, 15, 16, 18, 20, 21, 23, 25, 27, 28, 30, 32, 33, 35]
				}
				else
				{
					return []
				}
			}
		}
	}
</script>

<style scoped>
	#info
	{
		max-width: 65ch;
		margin: 60px 40px 20px;
	}

	#progression
	{
		min-height: 32px;
		margin: 40px 32px 0;
	}

	input.chord-tab
	{
		opacity: 0;
		width: 0px;
		height: 0px;
		box-sizing: border-box;
		display: inline-block;
	}

	label.chord-tab
	{
		cursor: pointer;
		display: inline-block;
		background: var(--white-70);
		width: 80px;
		border-radius: 6px;

		line-height: 2;
		text-align: center;
	}

	input:checked + label.chord-tab
	{
		color: var(--background);
		background: var(--foreground);
	}

	#add-chord
	{
		cursor: pointer;
		margin-left: 10px;
		font-size: 20px;
		line-height: 20px;
		text-align: center;

		width: 28px;
		height: 28px;
		border-radius: 100%;

		color: var(--foreground);
		background: transparent;
		border: solid 2px var(--foreground);

		transform: translateY(1.5px) scale(0.9);
	}

	#fretboard
	{
		border: 1px solid var(--foreground);
		margin: 20px 40px;

		width: 1302px;
		max-width: calc(100% - 80px);
		box-sizing: border-box;

		overflow: scroll;
	}

	#fretboard div
	{
		height: 52px;
		width: 1300px;
	}

	input.fret, #controls input
	{
		display: inline-block;
		margin: 0;
		padding: 0;
		border: none;
		width: 0;
		height: 0;
	}

	label.fret
	{
		width: 50px;
		height: 50px;
		display: inline-block;
		position: relative;
		margin: 0;
		padding: 0;

		border: 1px solid var(--foreground);
		cursor: pointer;
	}

	label.fret::before
	{
		display: block;
		position: absolute;
		pointer-events: none;

		color: var(--foreground);
		font-size: 2rem;
		width: 50px;
		line-height: 50px;
		text-align: center;
	}
	
	label.in-key::before
	{
		color: var(--accent);
	}

	label.octave
	{
		background: var(--accent);
		counter-reset: scale-degree;
	}

	label.in-key
	{
		counter-increment: scale-degree;
	}

	label.root.in-key::before
	{
		content: counter(scale-degree, upper-roman);
		transform: scale(0.9) translateX(-3px);
		letter-spacing: -0.2em;
	}

	.min label.root::before,
	.maj label.root.change-case::before,
	label.root.lower-case::before
	{
		text-transform: lowercase;
	}

	.min label.root.change-case::before
	{
		text-transform: uppercase;
	}

	label.minor::before { content: "m"; }
	label.major::before { content: "M"; }
	label.fifth::before { content: "5"; }
	label.aug::before   { content: "+"; }
	label.sixth::before { content: "6"; }
	label.min7::before  { content: "m7";}
	label.maj7::before  { content: "7"; }
	label.oct::before   { content: "8"; }

	input:checked + label.fret
	{
		background: var(--foreground);
	}

	input:checked + label.fret::before, label.octave::before
	{
		color: var(--background);
	}

	input:checked + label.fret.above
	{
		border-top: 1px solid var(--background);
	}

	input:checked + label.fret.below
	{
		border-bottom: 1px solid var(--background);
	}

	#controls
	{
		margin: 40px;
		width: calc(100% - 80px);
		max-width: 1302px;
	}

	#controls label
	{
		display: inline-block;
		border-top: 2px solid var(--foreground);
		border-bottom: 2px solid var(--foreground);
		
		width: 60px;
		text-align: center;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		line-height: 2;
	}

	#controls label:first-of-type
	{
		border-radius: 6px 0 0 6px;
		border: 2px solid var(--foreground);
	}

	#controls label:last-of-type
	{
		border-radius: 0 6px 6px 0;
		border: 2px solid var(--foreground);
	}

	#controls input:checked + label
	{
		background: var(--foreground);
		color: var(--background);
	}

	#delete-chord
	{
		display: inline-block;
		float: right;
		cursor: pointer;
		border: 2px solid var(--accent);
		
		width: 10ch;
		text-align: center;

		color: var(--accent);
		background: var(--background);

		font-family: "webfont";
		font-weight: bold;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		line-height: 2;
	}

	#delete-chord:hover
	{
		color: var(--background);
		background: var(--accent);
	}
</style>