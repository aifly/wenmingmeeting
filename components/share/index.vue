<template>
	<div :style="{background:'url('+imgs.bg+') no-repeat center bottom',backgroundSize:'cover'}"  :class="{'show':show}" class="zmiti-share-main-ui lt-full" ref='page'>
		
		<div class="zmiti-header">
			<div></div>
			<div>
				<img :src="imgs.he" alt="">
			</div>
			<div>
				
			</div>
			<div class="zmiti-yqi">
				<img :src="imgs.yqi" alt="">
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
	.loading{
            width: 5rem;
            left: 2.5rem;
            height: 15px;
            margin: 0 auto;
            margin-top:20px;
            text-align: center;
            position: absolute;
            top: 6rem;
            z-index: 0;
        }
        .loading span{
            display: inline-block;
            width: 15px;
            height: 100%;
            margin-right: 5px;
            background: #1a8cdc;
            -webkit-animation: load 1.04s ease infinite;
        }
        .loading label{
        	display: block;
        	color:#1a8cdc;
        }
        .loading span:last-child{
            margin-right: 0px; 
        }
        @-webkit-keyframes load{
            0%{
                opacity: 1;
            }
            100%{
                opacity: 0;
            }
        }
        .loading span:nth-child(1){
            -webkit-animation-delay:0.2s;
        }
        .loading span:nth-child(2){
            -webkit-animation-delay:0.4s;
        }
        .loading span:nth-child(3){
            -webkit-animation-delay:0.6s;
        }
        .loading span:nth-child(4){
            -webkit-animation-delay:0.8s;
        }
        .loading span:nth-child(5){
            -webkit-animation-delay:1s;
        }
</style>