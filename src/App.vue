<template>
	<router-view/>
</template>

<script>
	export default {}
</script>

<style>
	:root
	{
		--background: rgb(208, 202, 196);
		--foreground: rgb(42, 40, 43);
		--accent:     rgb(235, 95, 44);
		--white-70: rgba(255, 255, 255, 0.7);
	}

	html, body
	{
		background: var(--background);
		color: var(--foreground);

		padding: 0;
		margin: 0;

		font-family: "webfont";
		font-size: 14px;
	}

	h1, h2, h3
	{
		letter-spacing: 0.05em;
	}

	p
	{
		line-height: 1.45;
	}

	a, input, label, button
	{
		-webkit-tap-highlight-color: rgba(0,0,0,0);
	}

	::selection
	{
		background: var(--accent);
		color: var(--foreground);
	}

	@font-face
	{
		font-family: "webfont";
		src: url("/assets/Light-Italic.otf");
		font-weight: normal;
	}

	@font-face
	{
		font-family: "webfont";
		src: url("/assets/Bold-Italic.otf");
		font-weight: bold;
	}
</style>