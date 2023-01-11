<template>
  <div class="map">
    <p style="margin: 5px">
      <el-input
        v-model="keyword"
        style="width: 200px; padding: 3px 4px"
        type="text"
        id="place"
      />
      <span>{{ position }}</span>
    </p>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      position: {},
    };
  },
  mounted() {
    //定义地图，标记数组
    var map = [];
    //设置地图中心点
    var center = new window.qq.maps.LatLng(39.916527, 116.397128);
    map = new window.qq.maps.Map(document.getElementById("container"), {
      center: center,
      zoom: 13,
    });

    //实例化自动完成
    var ap = new window.qq.maps.place.Autocomplete(
      document.getElementById("place")
    );
    //调用Poi检索类。用于进行本地检索、周边检索等服务。
    var searchService = new window.qq.maps.SearchService({
      complete: function (results) {
        if (results.type === "CITY_LIST") {
          searchService.setLocation(results.detail.cities[0].cityName);
          searchService.search(this.keyword);
          return;
        }
        var pois = results.detail.pois;
        var latlngBounds = new window.qq.maps.LatLngBounds();
        for (var i = 0, l = pois.length; i < l; i++) {
          var poi = pois[i];
          latlngBounds.extend(poi.latLng);
          var marker = new window.qq.maps.Marker({
            map: map,
          });
          marker.setTitle(poi.name);
        }
        map.fitBounds(latlngBounds);
      },
    });

    var marker;

    //添加监听事件
    window.qq.maps.event.addListener(ap, "confirm", (res) => {
      this.keyword = res.value;
      searchService.search(this.keyword);
    });
    //添加监听事件  获取鼠标点击事件
    window.qq.maps.event.addListener(map, "click", (event) => {
      if (!marker) {
        marker = new window.qq.maps.Marker({
          position: event.latLng,
          map: map,
        });
        this.position = marker.position;
        return;
      }
      marker.setPosition(event.latLng);
      this.position = marker.position;
    });
  },
};
</script>

<style scoped lang="scss">
.map {
  #container {
    width: 100%;
    height: 300px;
  }
}
</style>
