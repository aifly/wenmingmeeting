<template>
	<div :style="{background:'url('+imgs.bg+') no-repeat center bottom',backgroundSize:'cover'}"  :class="{'show':show}" class="zmiti-choose-main-ui lt-full" ref='page'>
		<div class="zmiti-text">
			点选1个要助力的<span>文明关键词</span>
		</div>
		
		<div class="zmiti-line">
			
		</div>

		<ul class="zmiti-all-words">
			<transition-group name='zmiti-word-animate'  >
				<li v-for='(word,i) in words' :class='{"active":word.hotwordid === id}' :key='word.hotword' @click='choose(i,word)' >
					{{word.hotword}}
					<img v-if='word.hotwordid === id' :src="imgs.checked" alt="" />
				</li>
			</transition-group>
		</ul>
		<div class="zmiti-choose-btn">
			提交
		</div>
		<div class="zmiti-pv">
			当前已有<span>10000</span>人参与
		</div>


		<audio src='./assets/music/2.mp3' ref='audio2'></audio>
	</div>
</template>
<script>
	import './index.css';
	import Vue from "vue";
	import imgs from '../lib/assets.js';

	//Vue.use(VueAnimatedList)
	export default {
		name:'zmitipage1',
		props:['obserable'],
		data(){
			return {
				imgs,
				play:false,
				show:false,
				words:[],
				chooseWords:[],
				id:-1
			}
		},
		methods:{
			choose(index,word){

				this.id = word.hotwordid;
				this.$refs['audio2'].currentTime = 0;
				this.$refs['audio2'].play();
				/*this.chooseWords.push({
					index,
					hotword:word.hotword,
					hotwordid:word.hotwordid

				});
				
				//console.log(JSON.stringify(this.chooseWords))

				this.words.splice(index,1);*/
			},
			unchoose(index,word){
				this.chooseWords.splice(index,1);
				this.words.splice(word.index,0,word);
				this.$refs['audio2'].play();
			},
			entryForm(){
				var {obserable} = this;
				obserable.trigger({
					type:'setShareWords',
					data:this.chooseWords.concat([])
				})
				obserable.trigger({
					type:'showFormApp'
				});


				var ids = '';
				this.chooseWords.forEach((word,i)=>{
					if(i<this.chooseWords.length-1){
						ids += word.hotwordid+','
					}
					else{
						ids += word.hotwordid;
					}
				});

				

				obserable.trigger({
					type:'setHotwordsid',
					data:ids
				})
				
			}
		},
		components:{
		},
		mounted(){
			
			var {obserable} = this;

		/*	obserable.trigger({
				type:'setPlay',
				data:{
					top:'.5rem !important'
				}
			});*/

			obserable.on('showChooseApp',(data)=>{
				this.words = data;
				
				this.show = true;

				setTimeout(()=>{
					obserable.trigger({
						type:'setPlay',
						data:{
							top:'.5rem !important'
						}
					});
				},300)
			})

			setTimeout(()=>{

				this.words = obserable.trigger({type:'getWords'})

			},400)
		}
	}
</script>