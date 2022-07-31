<template>
	<Head>
		<Meta charset="utf-8"/>
		<Meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
		<Meta content='text/html; charset=utf-8' http-equiv='Content-Type'/>
		<Meta name="theme-color" content="#d0cac4" media="(prefers-color-scheme: light)"/>
		<Meta name="theme-color" content="#2a282b" media="(prefers-color-scheme: dark)"/>
		<Meta name="author" content="Jack Guinane"/>
		<Title>Sound Utility</Title>
	</Head>
    <NuxtPage/>
</template>

<style>
	:root
	{
		--red:      rgb(235, 95, 44);
		--black:    rgb(42, 40, 43);
		--white:    rgb(208, 202, 196);
		--white-70: rgba(255, 255, 255, 0.7);

		--background: var(--white);
		--foreground: var(--black);
		--accent:     var(--red);
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
		src: url("~/assets/Light-Italic.otf");
		font-weight: normal;
	}

	@font-face
	{
		font-family: "webfont";
		src: url("~/assets/Bold-Italic.otf");
		font-weight: bold;
	}
</style>