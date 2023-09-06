<template>
  <div class="city">
    <el-tree
      :data="[{
        id: 10000,
        label: '城市',
        children: this.$store.state.city.henanCityList
      }]"
      accordion
      :default-expanded-keys="$store.state.city.cities"
      node-key="id"
      :props="defaultProps"
      @node-expand="changeCityId"
    >
      <!--      ref="tree"-->
      <!--      @node-click="handleNodeClick"-->

      <!--      default-expand-all-->

      <!--      <span class="custom-tree-node" slot-scope="{ node, data }" @click="filterData(data)">-->
      <!--      <span class="custom-tree-node" slot-scope="{ node, data }" @click="changeCityId(data)">-->

      <span slot-scope="{ node, data }" class="custom-tree-node" @click="changeCityId(data)">
        <span>
          <el-button
            id="isActive"
            type="text"
            size="medium"
            :class="data.children ? 'el-icon-location-outline' : 'el-icon-document'"
          />
        </span>
        <span>{{ node.label }}</span>
      </span>

    </el-tree>

  </div>
</template>

<script>
import common from '@/views/person/common'
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex'
import { queryCityList } from '@/api/t_city'

export default {
  name: 'CityAside',
  components: {
    common
  },
  data() {
    return {
      // data: [{
      //   id: 10000,
      //   label: '城市',
      //   children: this.$store.state.city.henanCityList
      // }],
      // henanCityList:[],
      isActive: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
      // treeArr: this.$store.state.city.cities
    }
  },
  created() {
    this.cityList()
  },
  methods: {

    handleNodeClick(data) {
      // alert("树形控件点击的数据为:===========>", JSON.stringify(data))
    },
    filterData(data) {
      // console.log("点击的城市为: " + JSON.stringify(data))
      // console.log("点击的城市id为: " + data.id)

      // console.log("查看当前都有哪些状态=====================" + this.$store.state.user)
      // console.log("查看当前都有哪些状态=====================store" + name)
    },
    cityList() {
      queryCityList().then(response => {
        // console.log("查询出的城市列表为： ======》 ", JSON.stringify(response))

        const data = response

        const classify = this.$store.state.city.classify

        const cities = data.filter(x => x.pid === 1).map(x => {
          return { id: x.id, label: x.name, children: classify }
        })

        const cityIdNames = data.filter(x => x.pid === 1).map(x => {
          return { id: x.id, label: x.name }
        })

        const province = data.filter(x => x.level === 0).map(x => {
          return { id: x.id, label: x.name, children: cities }
        })

        // 设置默认展开的节点的key的数组
        const cityIds = data.filter(x => x.level === 0).map(x => {
          return x.id
        })

        this.$store.state.city.cities = cityIds
        this.$store.state.city.cityIdNames = cityIdNames
        this.$store.state.city.henanCityList = province
      }).catch(err => {
        // console.log("站点 queryCityList(keyword)请求数据失败")
      })
    },

    // changeCityId(n){
    //   console.log('changeCityId被点击了' + n)
    // }

    ...mapMutations('city', { changeCityId: 'CHANGE' })
  },
  computed: {
    ...mapMutations('user', ['name'])
    // ...mapMutations('city', ['city_id']),
  },
  props: ['city_id', 'site_classify']
}
</script>

<style scoped>

.city {
  margin: 50px 10px;
}

</style>
