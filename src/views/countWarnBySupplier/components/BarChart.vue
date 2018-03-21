<template>
  <div :class="className" :style="{height:height,width:width,marginLeft:marginLeft,}"></div>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import {debounce} from '@/utils'

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      marginLeft: {
        type: String,
        default: '10px'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '800px'
      },
      dataArr: {
        type: Object
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      dataArr: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    mounted() {
      this.initChart()
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder)
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.dataArr)
      },
      setOptions({cityName, count} = {}) {
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '5%',
            right: '6%',
            bottom: '3%',
            containLabel: true
          },
          yAxis: [{
            name: '供应商',
            type: 'category',
            data: cityName,
            axisTick: {
              alignWithLabel: false
            }
          }],
          xAxis: [{
            name: '数量',
            type: 'value'
          }],
          series: [{
            name: '报警数量',
            type: 'bar',
            data: count,
            animationDuration: 2800
          }]
        })
      }
    }
  }
</script>
