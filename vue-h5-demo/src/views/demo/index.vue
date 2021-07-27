<template>
  <div class="demo">
    <div v-for="(item, index) in routes" :key="index" class="item">
      <div @click="toRouter(item)">{{ item.name }}</div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'demo',
  components: {
  },
  data() {
    return {
      routes: [
        {
          name: 'chart1',
          path: '/demo/chart1',
          query: {},
        },
        {
          name: 'chart2',
          path: '/demo/chart2',
          query: {},
        },
        {
          name: 'chart3',
          path: '/demo/chart3',
          query: {},
        },
        {
          name: 'chart4',
          path: '/demo/chart4',
          query: {},
        },

        {
          name: 'ajax',
          path: '/demo/ajax',
          query: {
						code: 'test'
					},
        },
        {
          name: 'plug',
          path: '/demo/plug',
          query: {
					},
        },	
        {
          name: 'store',
          path: '/demo/store',
          query: {
					},
        },
        {
          name: 'store2',
          path: '/demo/store2',
          query: {
					},
        },	
        {
          name: 'filter',
          path: '/demo/filter',
          query: {
					},
        },
        {
          name: 'component',
          path: '/demo/component',
          query: {
					},
        },
        {
          name: 'img',
          path: '/demo/img',
          query: {
					},
        }        
      ],
    }
  },
  created() {},
  mounted() {},
  methods: {
    toRouter(item) {
      this.$router.push({ path: item.path, query: item.query })
    },
  },
}
</script>
<style lang="less" scoped>
.demo {
  margin: 20px auto;
  width: 600px;
}
.item {
  font-size: 50px;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
}
.dot {
  margin: 0, 20px;
  height: 1px;
  width: 100%;
  background-color: #eee;
}
</style>

