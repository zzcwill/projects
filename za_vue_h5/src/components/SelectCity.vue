<template>
  <div class="city-select fs14 c-333">
    <x-header :left-options="{backText: ''}">城市选择</x-header>

		<div class="current-city plr-10 bg-white h47 flex align-items-c ">
			<p>定位城市：{{city}}</p>
			<img src="../assets/images/wap/shuaxin_n.png" alt="" class="w13 h16">
		</div>

		<div class="grey-title">最近访问城市</div>
		<div class="last-city ptb15 plr10 bg-white flex">
			<div class="city-item border w111 h44 text-center" v-for="item in localCity" :key="item.areacod" @click="changeCity(item)">
				{{item.areaname}}
			</div>
		</div>

		<div class="grey-title">热门城市</div>
		<div class="last-city ptb15 plr10 bg-white flex ">
			<div class="city-item border w111 h44 text-center" v-for="item in hotCity" :key="item.areacode" @click="changeCity(item)">
				{{item.areaname}}
			</div>
		</div>

		<div class="index-list">
			<div class="block" v-for="item in cityList" :key="item.name">
				<div class="grey-title">{{item.name}}</div>
				<div class="index-item plr10 border-b h47 bg-white" v-for="i in item.city" :key="i.areacode" @click="changeCity(i)">
					{{i.areaname}}
				</div>
			</div>
		</div>

		<div class="right-slide fixed c-red fs13 ">
			<div class="slide text-center" v-for="item in right" @click="setFirstChar(item)">{{item}}</div>
		</div>

  </div>
</template>

<script>
import { XHeader } from "vux";

export default {
  name: "home",
  props: {
    city: {
      type: String,
      default: "北京市"
    }
  },
  data() {
    return {
      localCity: [],
      hotCity: [],
      cityList: [],
      right: [
        "热",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ]
    };
  },
  metaInfo: {
    title: "home",
    meta: [
      {
        name: "home",
        content: "home"
      }
    ]
  },
  components: {
    XHeader
  },
  methods: {
    // 首字母选取
    setFirstChar(i) {
      let titles = document.querySelectorAll(".grey-title");
      titles.forEach(e => {
        // e.innerText.includes(i) ? document.documentElement.scrollTop = e.offsetTop : ''  //页面调用形式
        e.innerText.includes(i)
          ? (document.querySelector(".popup").scrollTop = e.offsetTop)
          : ""; //组件调用形式
      });
      this.$vux.toast.text(`<p class='city-toast'>${i}</p>`, "middle");
    },
    changeCity(city) {
      this.$emit("changeCity", city);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="less">
.city-select {
  overflow-x: hidden;
  .plr-10 {
    padding: 0 10px;
  }
  .vux-header {
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
    .vux-header-title {
      color: #333;
    }
    .vux-header-left .left-arrow:before {
      border: 1px solid #f00;
      border-width: 1px 0 0 1px;
    }
  }
  .current-city {
    justify-content: space-between;
  }
  .grey-title {
    .plr-10;
    height: 30px;
    font-size: 12px;
    color: #999;
    line-height: 30px;
  }
  .last-city {
    flex-wrap: wrap;
    justify-content: space-between;
    .city-item {
      line-height: 44px;
      border-radius: 4px;
    }
    .city-item:nth-of-type(n + 4) {
      margin-top: 10px;
    }
  }
  .index-list {
    .index-item {
      line-height: 47px;
    }
    .index-item:nth-last-of-type(1) {
      border: none;
    }
  }
  .right-slide {
    right: 2px;
    top: 50%;
    margin-top: -215px;
    .slide {
      line-height: 130%;
    }
  }
}
.city-toast {
  height: 60px;
  width: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 40px;
}
</style>
