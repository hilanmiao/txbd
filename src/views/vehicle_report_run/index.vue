<template>
  <div class="app-container">
    <div id="main" style="width: 600px;height:400px;"></div>
    <div id="mapDiv" style="position:absolute;width:500px; height:400px"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import echarts from 'echarts'
  import T from 'T'

  export default {
    data() {
      return {}
    },
    mounted() {
      this.drawLine()
      this.drawMap()
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('main'))
        // 绘制图表
        myChart.setOption({
          title: {text: '在Vue中使用echarts'},
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        })
      },
      drawMap() {
        const map = new T.Map('mapDiv')
        map.centerAndZoom(new T.LngLat(116.40769, 39.89945), 12)
      }
    }
  }
</script>

<style scoped>


</style>
