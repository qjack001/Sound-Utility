<template>
	<main>
		<Head>
			<Meta name="theme-color" content="#eb5f2c"/>
		</Head>
		<h1>
			<Wordmark/>
		</h1>
		<p>
			Sound Utility is a collection of tools for creating music, but that
			do not create music themselves.
		</p>
		<h2>Tools:</h2>
		<ul>
			<MenuOption to="/lcr">Left Center Random</MenuOption>
			<MenuOption to="/chords">Simple Chord Progression</MenuOption>
		</ul>
	</main>
</template>

<style scoped>
	main
	{
		background: var(--accent);
		position: fixed;
		overflow: scroll;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding-top: 20px;
	}

	::selection
	{
		background: var(--foreground);
		color: var(--background);
	}
	
	h1
	{
		text-align: center;
		font-size: 5rem;
		margin: 20px;
		position: relative;
		z-index: 999;
	}

	h2
	{
		font-size: 1.2rem;
		letter-spacing: -0.02em;
		line-height: 5ch;
		width: 10ch;
		border: solid 1px var(--foreground);
		border-radius: 100%;
		margin: 0 auto;
		transform: translateX(-20vw) translateY(35%);
		text-align: center;
		text-transform: uppercase;
	}

	p
	{
		max-width: 60ch;
		margin: 0 auto;
		padding: 0 40px;
		text-align: center;
	}

	ul
	{
		padding: 0;
		max-width: max-content;
		margin: auto;
		text-align: center;
	}
</style>