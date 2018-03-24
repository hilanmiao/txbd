<template>
  <div :class="className" :style="{height:height,width:width}" :resize="resize"></div>
</template>

<script>
  import echarts from 'echarts'

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
        default: '200px'
      },
      resize: {
        type: Boolean
      }
    },
    watch: {
      'resize': {
        handler: function (val, oldVal) {
          if (val) {
            this.chart.resize()
          }
        },
        deep: true
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
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          backgroundColor: '#fff',
          tooltip: {
            formatter: '{a} <br/>{c} {b}'
          },
          toolbox: {
            show: false,
            feature: {
              mark: {show: true},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          series: [
            {
              name: '速度',
              type: 'gauge',
              min: 0,
              max: 500,
              splitNumber: 5,
              radius: '95%',
              axisLine: {
                lineStyle: {
                  color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
                  width: 3,
                  shadowColor: '#fff',
                  shadowBlur: 10
                }
              },
              axisLabel: {
                textStyle: {
                  fontWeight: 'bolder',
                  color: '#fff',
                  shadowColor: '#fff',
                  shadowBlur: 0,
                  distance: 0
                }
              },
              axisTick: {
                length: 15,
                lineStyle: {
                  color: 'auto',
                  shadowColor: '#fff',
                  shadowBlur: 10
                }
              },
              splitLine: {
                length: 50,
                lineStyle: {
                  width: 3,
                  color: '#fff',
                  shadowColor: '#fff',
                  shadowBlur: 10
                }
              },
              pointer: {
                shadowColor: '#fff',
                shadowBlur: 5
              },
              title: {
                textStyle: {
                  fontWeight: 'bolder',
                  fontSize: 20,
                  fontStyle: 'italic',
                  color: '#fff',
                  shadowColor: '#fff',
                  shadowBlur: 10
                }
              },
              detail: {
                borderWidth: 1,
                borderColor: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 5,
                offsetCenter: [0, '50%'],
                textStyle: {
                  fontWeight: 'bolder',
                  color: '#fff'
                }
              },
              data: [{value: 40, name: '℃'}]
            }
          ]
        })
      }
    }
  }
</script>
