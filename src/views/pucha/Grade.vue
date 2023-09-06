<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <!--        <CityAside/>-->
        <PuchaCityAside />
      </el-aside>
      <el-main>
        <!--        <GradeDetail/>-->

        <vxe-button
          ref="mediaSearch"
          style="margin-right: 30px;margin-top: 5px;
        margin-bottom: 5px; margin-left: 50px;
        border-radius: 0"
          status="primary"
          @focus="changePage"
          @click="changeMediaModel"
        >切换至新媒体查询
        </vxe-button>

        <vxe-button
          ref="websiteSearch"
          style="margin-right: 30px;margin-top: 5px;
        margin-bottom: 5px; margin-left: 15px;
        border-radius: 0"
          status="primary"
          @focus="changePage"
          @click="changeWebsiteModel"
        >切换至网站查询
        </vxe-button>

        <!--        {{ this.$store.state.city.city_id}}-->
        <!--        media{{$store.state.city.showPuchaMediaModel}}-->
        <!--        website{{$store.state.city.showPuchaWebsiteModel}}-->

        <GradeDetail v-if="$store.state.city.showPuchaWebsiteModel" />
        <GradeNewMedia v-if="$store.state.city.showPuchaMediaModel" />
        <!--        <GradeNewMedia :key="new Date().getSeconds()" v-show="$store.state.city.showPuchaMediaModel"/>-->

        <!--        <GradeDetail-->
        <!--          v-show="$store.state.city.site_classify===0 || $store.state.city.site_classify===1 || $store.state.city.site_classify===-1"/>-->

        <!--        <GradeNewMedia-->
        <!--          v-show="$store.state.city.site_classify===2 || $store.state.city.site_classify===3 || $store.state.city.site_classify===4"/>-->

        <!--        <GradeWeixin v-show="$store.state.city.site_classify===2"/>-->
        <!--        <GradeWeibo v-show="$store.state.city.site_classify===3"/>-->
        <!--        <GradeQitaNewMedia v-show="$store.state.city.site_classify===4"/>-->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import GradeDetail from '@/views/pucha/GradeDetail'
import CityAside from '@/views/aside/CityAside'

import GradeWeixin from '@/views/pucha/GradeWeixin'
import GradeWeibo from '@/views/pucha/GradeWeibo'
import GradeQitaNewMedia from '@/views/pucha/GradeQitaNewMedia'

import { queryCityList } from '@/api/t_city'
import PuchaCityAside from '@/views/pucha/PuchaCityAside'
import GradeNewMedia from '@/views/pucha/GradeNewMedia'
import {
  queryAllByStatus, queryByCityIdAndSiteClassifyAndStatus,
  queryByCityIdAndStatus,
  queryNewMediaByCityIdSiteClassity,
  queryNewMediaByCityIdSiteClassityPucha, searchByCityIdAndKeyword, searchByCityIdAndSiteClassifyAndKeyword
} from '@/api/pucha'
import * as pucha from '@/api/pucha'

export default {
  name: 'SiteDetail',
  components: {
    PuchaCityAside,
    CityAside,
    GradeDetail,

    GradeNewMedia

    // GradeWeixin,
    // GradeWeibo,
    // GradeQitaNewMedia
  },
  data() {
    return {
      showMediaModel: false,
      showWebsiteModel: true,
      websiteSearchStyle: 'primary',
      mediaSearchStyle: 'none'
    }
  },
  watch: {
    $route() {
      this.showModel()
    }
  },
  created() {
    queryCityList()
    this.showModel()
    // this.getWebsiteTableData()
  },
  methods: {
    showModel() {
      // console.log("Grade.vue 中 this.$store.state.city.site_classify的值为=====> " + this.$store.state.city.site_classify)
      // console.log("Grade.vue 执行了显示模板判断")
      if (this.$store.state.city.site_classify === -1 || this.$store.state.city.site_classify === 0 || this.$store.state.city.site_classify === 1) {
        this.$store.state.city.showPuchaWebsiteModel = true
        this.$store.state.city.showPuchaMediaModel = false
        this.getWebsiteTableData()
      } else if (this.$store.state.city.site_classify === 2 || this.$store.state.city.site_classify === 3 || this.$store.state.city.site_classify === 4) {
        this.$store.state.city.showPuchaMediaModel = true
        this.$store.state.city.showPuchaWebsiteModel = false
        this.getMediaTableData()
      }
    },
    changeMediaModel() {
      this.$store.state.city.showPuchaMediaModel = true
      this.$store.state.city.showPuchaWebsiteModel = false
      // this.mediaSearchStyle='primary'
      // this.websiteSearchStyle='none'
      this.getMediaTableData()
    },
    changeWebsiteModel() {
      this.$store.state.city.showPuchaWebsiteModel = true
      this.$store.state.city.showPuchaMediaModel = false
      // this.mediaSearchStyle='none'
      // this.websiteSearchStyle='primary'
      this.getWebsiteTableData()
    },
    // 打开城市下的微博类别时加载微博数据
    getMediaTableData() {
      this.$store.state.city.pageIsOrNot = false // 表明此时为加载全部数据
      this.$store.state.city.loading = true

      // console.log("Grade.vue 执行了新媒体查询")

      this.siteClassify = this.$store.state.city.site_classify
      this.city_id = this.$store.state.city.city_id

      if (this.$store.state.city.site_classify == -1 || this.$store.state.city.site_classify == 0 || this.$store.state.city.site_classify == 1) {
        this.siteClassify = ''
      }

      if (this.$store.state.city.city_id == 1 || this.$store.state.city.city_id == 10000) {
        this.city_id = ''
      }

      queryNewMediaByCityIdSiteClassityPucha(this.city_id, this.siteClassify,
        this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
        // console.log("执行了Grade.vue中的 getTableData()")

        // console.log("执行了pucha/GradeWeibo.vue中的queryLingCaiWeiboByCityIdAndSiteClassify")
        this.listTableDataFormatter(response)
        // this.$store.state.city.siteList = this.$store.state.city.siteList.slice((this.$store.state.city.tablePage.currentPage - 1) * this.$store.state.city.tablePage.pageSize, this.$store.state.city.tablePage.currentPage * this.$store.state.city.tablePage.pageSize)
      }).catch(err => {
        // console.log("common 站点 queryByCityIdAndSiteClassify()请求数据失败")
        this.$store.state.city.loading = false
        this.$XModal.message({ content: '获取数据失败', status: 'error' })
      })
      // 将搜索确认参数设为true，表示在搜索状态下的分页
      this.$store.state.city.pageIsOrNot = true
    },

    getWebsiteTableData(page, status, size) {
      this.$store.state.city.pageIsOrNot = false // 表明此时为加载全部数据
      this.$store.state.city.loading = true

      this.siteClassify = this.$store.state.city.site_classify

      this.city_id = this.$store.state.city.city_id

      // console.log("Grade.vue 执行了网站查询")

      if (this.$store.state.city.site_classify == -1) {
        this.siteClassify = ''
      }

      if (this.$store.state.city.city_id == 1 || this.$store.state.city.city_id == 10000) {
        this.city_id = ''
      }

      // 默认展示全部数据
      queryByCityIdAndSiteClassifyAndStatus(this.city_id, this.siteClassify, this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
        // console.log("执行了Grade.vue 中的 getWebsiteTableData")
        // console.log("加载全部数据： " + JSON.stringify(response))
        // console.log("执行了Grade.vue中的 queryAllByStatus()")
        this.listTableDataFormatter(response)
      }).catch(err => {
        this.$store.state.city.loading = false
        this.$XModal.message({ content: '获取数据失败', status: 'error' })
      })
      // 将搜索确认参数设为true，表示在搜索状态下的分页
      this.$store.state.city.pageIsOrNot = true
    },

    // 点击切换搜索
    changePage() {
      this.$store.state.city.tablePage.currentPage = 1
    },

    // 展示列表需要的步骤
    listTableDataFormatter(response) {
      this.$store.state.city.loading = false
      this.$store.state.city.siteList = response.results
      this.$store.state.city.totalCount = response.count
    }

  }
}
</script>

<style scoped>

</style>
