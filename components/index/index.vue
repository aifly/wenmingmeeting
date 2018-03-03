<template>
	<div v-swipe='entryChoose' v-tap='entryChoose' :style="{background:'url('+imgs.bg+') no-repeat center bottom',backgroundSize:'cover'}" class="zmiti-index-main-ui lt-full"  :class="{'show':show}">
	
		<div class="zmiti-logo">
			<img :src="imgs.logo" alt="">
		</div>

		<div class="zmiti-title" >
			<img :src="imgs.title" alt="">
			<div class="zmiti-light1">
				<img :src="imgs.light1" alt="">
			</div>

			<div class="zmiti-light2">
				<img :src="imgs.light1" alt="">
			</div>

			<div @touchstart='tap=true' @touchend='tap=false' class="zmiti-index-btn" :class='{"active":tap}'>
				去参加
			</div>
		</div>
		
	</div>
</template>

<script>
	import './index.css';
	import imgs from '../lib/assets.js';
	import zmitiUtil from '../lib/util';
	import $ from 'jquery';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				show:true,
				showTitle:false,
				viewW:window.innerWidth,
				viewH:window.innerHeight,
				words:[],
				tap:false,
				start:true,

			}
		},
		methods:{
			entryChoose(){
				var {obserable} = this;
				setTimeout(()=>{
					obserable.trigger({
						type:'showChooseApp',
						data:this.words.concat([])
					});
				},100)
				this.start = false;
				setTimeout(()=>{
					this.words.length = 0;
				},1000)
			},
			r(m, n) {
				return (m + Math.random() * (n - m));
			},
			
			getHotwords(){
				$.ajax({
					url:window.protocol+'//api.zmiti.com/v2/h5/get_hotwordlist',
					type:'post',
					data:{
						worksclassid:3
					}
				}).done((data)=>{
						console.log(data)
					if(data.getret === 0){
						this.words = data.list;
						var {obserable} = this;
						obserable.on('getWords',()=>{
							return this.words;
						})
					}
				})
			}
		},
		mounted(){

			var {obserable} = this;

			this.getHotwords();

		}
	}
</script>