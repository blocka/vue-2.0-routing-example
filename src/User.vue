<script>
export default {
	name: 'user',
	props: ['id'],
	render (h) {
		return (
			<div>
			{this.id}
			</div>
		);
	}
}
</script>
