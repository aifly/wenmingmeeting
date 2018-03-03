<template>
	<div :style="{background:'url('+imgs.bg+') no-repeat center bottom',backgroundSize:'cover'}"  :class="{'show':show}" class="zmiti-share-main-ui lt-full" ref='page'>
		
		<div class="zmiti-header">
			<div class="zmiti-headimg">
				
			</div>
			<div>
				<img :src="imgs.he" alt="">
			</div>
			<div class="zmiti-headimg">
				
			</div>
			<div class="zmiti-yqi">
				<img :src="imgs.yqi" alt="">
			</div>
		</div>

		<div class="zmiti-wish-words">
			<div>助力<span>XXXX</span></div>
			<div>为文明加油!</div>
		</div>

		<div class="zmiti-share-bottom">
			<div>本词人气<span>999,999</span></div>
			<div class="zmiti-scroll">
				<div></div>
				<div></div>
			</div>
			<div class="zmiti-share-btn" v-tap='showMask'>
				分享传递
			</div>
		</div>


		<div v-if='showMasks' @touchstart='hideMask' class="zmiti-mask">
			<img :src="imgs.arrow" alt="">
		</div>
	</div>
</template>
<script>
	import './index.css';
	import imgs from '../lib/assets.js';
	import $ from 'jquery';
	import zmitiUtil from '../lib/util';
	export default {
		name:'zmitipage1',
		props:['obserable'],
		data(){
			return {
				imgs,
				play:false,
				show:true,
				showMasks:false,
				viewH:document.documentElement.clientHeight,
				createImg:'',
				showBtns:false,
				src:'',
				words:[]
			}
		},
		methods:{
			
			hideMask(){
				this.showMasks = false;
			},
			showMask(){
				this.showMasks = true;
			},
			
			
			
		
		},
		components:{
		},
		mounted(){

			var {obserable} = this;

			obserable.on('showShareApp',(data)=>{
				this.show = true;
				
			})
		}
	}
</script>


<style scoped="">
	
</style>