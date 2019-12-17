<script lang="typescript">
	let name: string = 'abc'
</script>

<style lang="less">
	@text: ' World!';
	h1 {
		color: blue;

		&::after {
			content: @text;
		}
	}
</style>

<h1>Hello</h1>
