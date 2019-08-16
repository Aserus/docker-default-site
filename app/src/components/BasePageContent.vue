<template lang="pug">
v-container.page-content(:data-loading="isLoading" 	:class="{ 'fill-height': fill }" fluid)
	.page-content-loader(v-if="isLoading")
		//b-spinner(variant="primary")
		span loading
	slot
</template>



<script>
export default {
	props:{
		isLoading:Boolean,
		fill:Boolean
	}
}
</script>

<style lang="less">
.page-content{

	.page-content-loader{
		position:absolute;
		top:50%;
		left:0;
		right:0;
		text-align:center;
		z-index:31;

		margin-top:-3rem;

		.spinner-border{
			width: 6rem;
			height: 6rem;
		}
	}

	&[data-loading]{

		&:after{
			content:'';

			position:absolute;
			top:0;
			left:0;
			right:0;
			bottom:0;
			background-color:rgba(255,255,255,0.8);
			z-index:30;
		}
	}
}
</style>
