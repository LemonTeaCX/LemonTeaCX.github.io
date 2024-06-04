<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 公交
let integratedApi = 'https://restapi.amap.com/v5/direction/transit/integrated'

const request = (api, data) => {
  return new Promise((resolve, reject) => {
    let params = {
      key: 'dbfd92a3010e7859946be84618bed5f0',
      ...data
    }
    let urlParams = []

    for (const key in params) {
      urlParams.push(`${key}=${params[key]}`)
    }

    let url = `${api}?${urlParams.join('&')}`

    fetch(url).then(response => {
      resolve(response.json())
    }).catch(error => {
      reject(error)
    })
  })
}

const init = async () => {
  let res = await request(integratedApi)
  
  console.log(res);
}

// init()

AMapLoader.load({
  key: 'c1e0dda8b1c34bd5bf185b436dfd4b9b', //申请好的 Web 端开发 Key，首次调用 load 时必填
  version: "2.0", //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
  plugins: ["AMap.Scale", "AMap.PlaceSearch", "AMap.AutoComplete", "AMap.Transfer"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['AMap.Scale','...','...']
  AMapUI: {
    //是否加载 AMapUI，缺省不加载
    version: "1.1", //AMapUI 版本
    plugins: ["overlay/SimpleMarker"], //需要加载的 AMapUI ui 插件
  },
  Loca: {
    //是否加载 Loca， 缺省不加载
    version: "2.0", //Loca 版本
  },
}).then((AMap) => {
  const map = new AMap.Map("mapContainer");

  map.addControl(new AMap.Scale()); //添加比例尺组件到地图实例上

  placeSearch = new AMap.PlaceSearch({
    pageSize: 5, //单页显示结果条数
    pageIndex: 1, //页码
    // city: "深圳", //兴趣点城市
    // citylimit: true, //是否强制限制在设置的城市内搜索
    map: map, //展现结果的地图实例
    autoFitView: true, //是否自动调整地图视野使绘制的 Marker 点都处于视口的可见范围
  });

  autoComplete = new AMap.AutoComplete({
    map: map, //展现结果的地图实例
    autoFitView: true, //是否自动调整地图视野使绘制的 Marker 点都处于视口的可见范围
  })

  transfer = new AMap.Transfer({
    city: "深圳",
    map: map, //展现结果的地图实例
    autoFitView: true, //是否自动调整地图视野使绘制的 Marker 点都处于视口的可见范围
    policy: AMap.TransferPolicy.LEAST_TIME,
    extensions: 'all', // 返回结果控制 base/all

  });
}).catch((e) => {
  console.error(e); //加载错误提示
});

// 搜索
let placeSearch = null
let autoComplete = null
const searchVal = ref('')
const searchShow = ref(false)
const searchList = ref([])
const onInput = () => {
  // placeSearch
  autoComplete.search(searchVal.value, (status, result) => {
    console.log(1, status, result)
    if (status !== 'complete') return

    searchList.value = result.tips.slice(0, 5)
    // searchList.value = result.poiList.pois
  })
}

const onRentResClick = (item) => {
  item.text = item.name
  item.value = item.id
  rentList.value.push(item)
}
const onRentResDel = (item) => {
  rentList.value = rentList.value.filter(rent => rent.id !== item.id)
}
const onWorkResClick = (item) => {
  workList.value.push(item)
}
const onWorkResDel = (item) => {
  workList.value = workList.value.filter(work => work.id !== item.id)
}

const workList = ref([])
const rentList = ref([])

// 路线
let transfer = null
const rentVal = ref()
const compareSheetshow = ref(false)
const compareList = ref([])
const onCompare = () => {
  rentVal.value = rentList.value[0].value
  compareSheetshow.value = true

  getCompare()
}
const onRentChnage = () => {
  getCompare()
}
const getCompare = () => {
  let rentItem = rentList.value.find(item => item.id === rentVal.value) || {}
  let originLocation = rentItem.location
  let origin = new AMap.LngLat(originLocation.lng, originLocation.lat)

  compareList.value = []
  workList.value.forEach(work => {
    
    let destinationLocation = work.location
    let destination = new AMap.LngLat(destinationLocation.lng, destinationLocation.lat)

    transfer.search(origin, destination, (status, result) => {
      console.log(2, status, result)
      if (status !== 'complete') return

      let compareItem = {}

      console.log(3, result.plans);
      compareItem.id = work.id
      compareItem.workName = work.name
      compareItem.plans = []

      result.plans.forEach(plan => {
        compareItem.plans.push(JSON.parse(JSON.stringify(plan)))
      })

      compareList.value.push(compareItem)
    })
  })
}
</script>

<template>
  <div class="map-wrap">
    <div id="mapContainer"></div>
    <div class="search-box">
      <van-search
        class=""
        v-model="searchVal"
        show-action
        placeholder="请输入搜索关键词"
        shape="round"
        background="skyblue"
        @update:model-value="onInput"
        @click-input="searchShow = true"
        @cancel="searchShow = false"
      />
      <div class="search-list" v-show="searchShow">
        <van-notice-bar
          v-show="searchList[0]"
          left-icon="volume-o"
          text="左滑可设置公司点与租房点"
        />
        <van-swipe-cell v-for="item in searchList" :key="item.id">
          <van-cell :title="item.name" :label="item.address" size="large" icon="location-o"/>
          <template #right>
            <van-button square type="primary" text="公司点" @click="onWorkResClick(item)" />
            <van-button square type="success" text="租房点" @click="onRentResClick(item)" />
          </template>
        </van-swipe-cell>
      </div>
    </div>

    <div class="res-list">
      <div class="rent-list" v-show="rentList[0]">
        <van-swipe-cell v-for="item in rentList" :key="item.id">
          <van-cell :title="item.name" icon="wap-home-o"/>
          <template #right>
            <van-button square type="danger" text="删除" @click="onRentResDel(item)" />
          </template>
        </van-swipe-cell>
      </div>
      <van-cell v-show="rentList[0] && workList[0]" value="路线对比" is-link @click="onCompare"/>
      <div class="work-list" v-show="workList[0]">
        <van-swipe-cell v-for="item in workList" :key="item.id">
          <van-cell :title="item.name" icon="newspaper-o"/>
          <template #right>
            <van-button square type="danger" text="删除" @click="onWorkResDel(item)" />
          </template>
        </van-swipe-cell>
      </div>
    </div>

    <van-action-sheet v-model:show="compareSheetshow">
      <van-dropdown-menu>
        <van-dropdown-item v-model="rentVal" :options="rentList" @change="onRentChnage"/>
      </van-dropdown-menu>

      <div class="plan-work-list">
        <div class="plan-work-item" v-for="compareItem in compareList" :key="compareItem.id">
          <div class="item-name">{{ compareItem.workName }}</div>
          <div class="item-plans">
            <!-- {{ compareItem.plans }} -->
            <div class="item-plan" v-for="plan in compareItem.plans">
              <div>
                <span class="plan-time">{{ (plan.time/100).toFixed(2) }}分钟</span>
                <span class="plan-distance">{{ plan.walking_distance / 1000 }}km</span>
                <span class="plan-cost">{{ plan.cost }}元</span>
              </div>
              <div>
                {{ plan.segments.map(item => item.instruction).join(';') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<style scoped>
#mapContainer {
  width: 100vw;
  height: 100vh;
}
.map-wrap {
  position: relative;
}
.search-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  .van-button {
    height: 100%;
  }
}
.res-list {
  position: fixed;
  left: 0;
  bottom: 80px;
  width: 100vw;
}
.plan-work-list {
  display: flex;
  .plan-work-item {
    width: 50vw;
    font-size: 12px;
    .item-name {
      padding: 6px 10px;
      font-size: 14px;
      font-weight: bold;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .item-plan {
      padding: 0 10px;
      margin-top: 10px;
    }
    .plan-time {
      font-size: 14px;
      font-weight: bold;
    }
    .plan-distance {
      margin-left: 10px;
    }
    .plan-cost {
      margin-left: 10px;
    }
  }
}
</style>