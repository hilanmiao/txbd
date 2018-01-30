<template>
  <div class="">
    <div id="mapDiv" class="map" style="width: 1552px;height: 739px;">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import T from 'T'

  export default {
    data() {
      return {
        bounds: JSON.parse(this.$route.query.bounds),
        zoom: this.$route.query.zoom
      }
    },
    mounted() {
      this.drawMap()
    },
    methods: {
      drawMap() {
        const map = new T.Map('mapDiv')
        map.centerAndZoom(new T.LngLat(116.40769, 39.89945), this.zoom)
        // 禁止缩放、拖拽、双击等
        map.disableDrag()
        map.disableScrollWheelZoom()
        map.disableDoubleClickZoom()
        map.disableKeyboard()
        // 设置地图显示范围
        map.setMaxBounds(new T.LngLatBounds(
          new T.LngLat(this.bounds.Lq.lng, this.bounds.Lq.lat),
          new T.LngLat(this.bounds.lq.lng, this.bounds.lq.lat)
        ))
        // 添加右键打印按钮
        const Menu = new T.ContextMenu({
          width: 150
        })
        const menuItemPrint = new T.MenuItem('打印当前地图', function () {
          window.print()
        })
        Menu.addItem(menuItemPrint)
        map.addContextMenu(Menu)
      }
    }

  }
</script>

<style scoped>

</style>
