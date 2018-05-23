<template>
	<div>
		<div>这是商家</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				seller :{}
			}
		},
		created(){
			this.seller = this.$route.query.name;
			console.log(this.seller);
		}
	}	
</script>

<style>
</style>