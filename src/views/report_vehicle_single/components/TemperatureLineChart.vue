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
        default: '100%'
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
      setOptions({t1,t2,t3,dcreatetime} = {}) {
        this.chart.setOption({
          xAxis: {
            data: dcreatetime,
            boundaryGap: false,
            axisTick: {
              show: false
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            name:'温度分析\n 单位/°C  ',
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['原温度', '前温度','后温度']
          },
          series: [
            {
              name: '原温度',
              itemStyle: {
                normal: {
                  color: '#FF005A',
                  lineStyle: {
                    color: '#FF005A',
                    width: 2
                  }
                }
              },
              smooth: true,
              type: 'line',
              data: t1,
              animationDuration: 2800,
              animationEasing: 'cubicInOut'
            },
            {
              name: '前温度',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#3888fa',
                  lineStyle: {
                    color: '#3888fa',
                    width: 2
                  }
                }
              },
              data: t2,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            },
            {
              name: '后温度',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#43f3fa',
                  lineStyle: {
                    color: '#43f3fa',
                    width: 2
                  }
                }
              },
              data: t3,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
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
