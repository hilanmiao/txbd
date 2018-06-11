<template>
  <div :class="className" :style="{height:height,width:width,}"></div>
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
      this.chart = echarts.init(this.$el, 'macarons')
      this.initChart()
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)

      this.chart.on('click', function (event) {
        console.log(event)
        var dimension = event.dataIndex + 1
        if (dimension) {
          // var dimension = xAxisInfo.value + 1;
          // console.log(dimension)
          if (event.seriesType !== 'pie') {
            this.setOption({
              series: {
                id: 'pie',
                label: {
                  formatter: event.name + '{b}: {@[' + dimension + ']} ({d}%)'
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            })
          }
        }
      })
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
        this.setOptions(this.dataArr)
      },

      setOptions({cityName, online, offline} = {}) {
        this.chart.setOption({
          legend: {},
          tooltip: {
            trigger: 'axis'
          },
          dataset: {
            source: [
              cityName,
              offline,
              online
            ]
          },
          xAxis: {type: 'category'},
          yAxis: {gridIndex: 0},
          grid: {top: '55%'},
          series: [
            {
              type: 'bar',
              smooth: true,
              seriesLayoutBy: 'row'
            },
            {
              type: 'bar',
              smooth: true,
              seriesLayoutBy: 'row'
            },
            {
              type: 'pie',
              id: 'pie',
              radius: '30%',
              center: ['50%', '25%'],
              label: {
                formatter: '潍坊市{b}: {@潍坊市} ({d}%)'
              },
              encode: {
                itemName: '城市',
                value: '潍坊市',
                tooltip: '潍坊市'
              }
            }
          ]
        })
      }
    }
  }
</script>
