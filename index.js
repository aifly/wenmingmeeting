import Vue from "vue";
import Index from './components/index/index';
import Choose from './components/choose/index';
import Form from './components/form/index';
import List from './components/list/index';
import Share from './components/share/index';
import Team from './components/team/index';
import Obserable from './components/lib/obserable';
import imgs from './components/lib/assets'
import zmitiUtil from './components/lib/util.js'
import $ from 'jquery';
import './components/lib/touch.js';


var obserable = new Obserable();


//Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
	data: {
		obserable,
		rotate: false,
		imgs,
		showMask: false,
		viewH: document.documentElement.clientHeight,
		isShare: false,
		show: false,
		username: '',
		wish: '',
		width: 0,
		loaded: false,
		playStyle: {

		}
	},
	el: '#app',
	/*<audio ref='audio' src='./assets/music/bg.mp3'  loop></audio>*/
	template: `<div>
		<Index v-if='!isShare && show'  :obserable='obserable'></Index>
		<Choose v-if='!isShare && show'  :obserable='obserable'></Choose>
		<Share v-if='!isShare && show'  :obserable='obserable'></Share>

		<div hidden @click='toggleMusic' class='zmiti-play' :class='{"rotate":rotate}' :style="playStyle">
			<img  :src='imgs.play'/>
		</div>
		<div v-if='!loaded' :style='{background:"#158ae4"}' class='zmiti-loading lt-full'>
			<div class='zmiti-loading-ui'>
				<div class='zmiti-loading-bar' >
					<img :src="imgs.loading" alt="" />
				</div>
				<div class='zmiti-progress'>{{width}}%</div>
			</div>
			<img style='position:absolute;z-index:10;' :src="imgs.loading1" alt="" />
		</div>
	</div>`,
	methods: {

		loading: function(arr, fn, fnEnd) {
			var len = arr.length;
			var count = 0;
			var i = 0;

			function loadimg() {
				if (i === len) {
					return;
				}
				var img = new Image();
				img.onload = img.onerror = function() {
					count++;
					if (i < len - 1) {
						i++;
						loadimg();
						fn && fn(i / (len - 1), img.src);
					} else {
						fnEnd && fnEnd(img.src);
					}
				};
				img.src = arr[i];
			}
			loadimg();
		},
		toggleMusic() {
			var music = this.$refs['audio'];
			music[music.paused ? 'play' : 'pause']()
		},
		updatePv() {
			$.ajax({
				url: window.protocol + '//api.zmiti.com/v2/custom/update_pvnum/',
				type: 'post',
				data: {
					isrand: window.israndPv ? 1 : 0,
					customid: 40
				}
			}).done(data => {
				console.log(data);
			});
		}
	},
	components: {
		Index,
		Choose,
		Form,
		List,
		Share,
		Team
	},
	mounted() {


		var src = (zmitiUtil.getQueryString('src'));

		this.isShare = src;

		this.show = true;

		this.src = src;


		this.loading(arr, (s) => {
			this.width = s * 100 | 0;

		}, () => {
			this.loaded = true;

			obserable.trigger({
				type: 'titleShow'
			})
		})

		obserable.on('showShare', () => {
			this.showMask = true;
		})


		obserable.on('setPlay', (data) => {

			this.playStyle = data;

		});
		/*
				$(this.$refs['audio']).on('play', () => {
					this.rotate = true;
				}).on('pause', () => {
					this.rotate = false;
				});




				this.$refs['audio'].volume = .3;
				this.$refs['audio'].play();
				var s = this;
				document.addEventListener("WeixinJSBridgeReady", function() {
					WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
						s.$refs['audio'].play();
					});
				}, false)

				obserable.on('toggleBgMusic', (data) => {
					this.$refs['audio'][data ? 'play' : 'pause']();
				});*/

		$.ajax({
			url: 'http://api.zmiti.com/v2/h5/count_hotword',
			type: 'post',
			data: {
				worksclassid: 3,
				hotwordid: 2
			}
		}).done((data) => {
			console.log(data);
		})

		$.ajax({
			url: 'http://api.zmiti.com/v2/h5/get_viewwxuserlist/',
			type: 'post',
			data: {
				worksid: window.customid
			}
		}).done((data) => {
			console.log(data);
		})

		this.updatePv();

		if (this.isShare) {

			obserable.trigger({
				type: 'showShareApp',
				data: {
					src
				}
			})
		} else {
			zmitiUtil.getOauthurl();

			//zmitiUtil.wxConfig(document.title, window.desc);
		}
	}
})