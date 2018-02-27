<template>
  <div :class="className" :style="{height:height,width:width}"></div>
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
      width: {
        type: String,
        default: '700px'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
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
    watch: {
      dataArr: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    methods: {
      setOptions({t1, t2, t3, cars} = {}) {
        this.chart.setOption({
          color: ['#67E0E3', '#FFDB5C', '#FF9F7F'],
          xAxis: {
            data: cars,
            axisTick: {
              show: false
            }
          },
          calculable: true,
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            padding: [5, 10]
          },
          yAxis: {
            name: '温度分析\n 单位/摄氏度',
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['原温度', '前温度', '后温度']
          },
          series: [
            {
              name: '原温度',
              type: 'bar',
              barGap: 0,
              data: t1
            },
            {
              name: '前温度',
              type: 'bar',
              data: t2
            },
            {
              name: '后温度',
              type: 'bar',
              data: t3
            }
          ]
        })
      },
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.dataArr)
      }
    }
  }
</script>
