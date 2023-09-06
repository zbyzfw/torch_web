<template>
  <div style="margin:20px 50px 50px 50px">

    <!--    点击的城市id为: {{ $store.state.city.city_id }}-->
    <!--    点击的站点类别为: {{ $store.state.city.site_classify }}-->
    <!--    数组长度为: {{ $store.state.city.totalCount }}-->

    <!--    <el-card class="box-card">-->
    <!--      大河网智慧普查数据中心-->
    <!--    </el-card>-->

    <vxe-table
      ref="xTable"
      border
      show-overflow
      show-header-overflow
      highlight-hover-row
      align="center"
      row-id="id"
      :column-config="{resizable: true}"
      :row-config="{isHover: true}"
      :loading="$store.state.city.loading"
      :seq-config="{startIndex: (this.$store.state.city.tablePage.currentPage - 1) * this.$store.state.city.tablePage.pageSize}"
      :data="this.$store.state.city.siteList"
    >
      <!--      :data="list1">-->

      <!--      <vxe-column type="checkbox" width="60"></vxe-column>-->
      <!--      <vxe-column type="seq" title="序号" width="60"></vxe-column>-->
      <!--      <vxe-column field="id" title="ID" width="5%"></vxe-column>-->
      <vxe-column field="id" title="ID" min-width="80" />
      <vxe-column field="realname" title="真实姓名" min-width="100" />
      <vxe-column field="method_name" title="操作方法" min-width="100" />
      <vxe-column field="action_time" title="操作时间" min-width="120" />
      <vxe-column field="object_id" title="操作对象id" min-width="100" />
      <vxe-column field="object_repr" title="操作内容" min-width="150" />
      <!--      <vxe-column field="change_message" title="操作描述" min-width="200"></vxe-column>-->
    </vxe-table>

    <!--    分页-->
    <vxe-pager
      perfect
      :loading="this.$store.state.city.loading"
      :current-page="this.$store.state.city.tablePage.currentPage"
      :page-size="this.$store.state.city.tablePage.pageSize"
      :page-sizes="this.$store.state.city.tablePage.pageSizes"
      :total="this.$store.state.city.totalCount"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handleCurrentChange"
    />

  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import { userOperationLog } from '@/api/t_user'

export default {
  data() {
    return {
      submitLoading: false,
      userList: []
    }
  },
  created() {
    // 加载全部数据
    this.getTableData(this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize)
  },
  methods: {
    // 分页部分
    // 页数改变时触发
    handleCurrentChange({ currentPage, pageSize }) {
      // console.log("传递的currentPage为: " + currentPage, "传递的pageSize为: " + pageSize)
      this.$store.state.city.tablePage.currentPage = currentPage
      this.$store.state.city.tablePage.pageSize = pageSize
      this.getTableData(this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize)
    },

    // 打开页面时加载数据
    getTableData(page) {
      this.$store.state.city.pageIsOrNot = false // 表明此时为加载全部数据
      this.$store.state.city.loading = true

      userOperationLog(this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
        // console.log(("用户操作日志 加载全部数据： " + JSON.stringify(response)))
        // console.log(JSON.stringify(response))

        this.listTableDataFormatter(response)
        // this.$store.state.city.loading = false;
        // this.userList = response
        // // console.log("this.$store.state.city.siteList: "+  JSON.stringify(this.$store.state.city.siteList))
        // this.$store.state.city.totalCount = response.length
        // this.userList = this.userList.slice((this.$store.state.city.tablePage.currentPage - 1) * this.$store.state.city.tablePage.pageSize, this.$store.state.city.tablePage.currentPage * this.$store.state.city.tablePage.pageSize)
      }).catch(err => {
        this.$store.state.city.loading = false
        this.$XModal.message({ content: '获取数据失败', status: 'error' })
        // console.log(("站点 User请求数据失败" + err))
      })

      // 将搜索确认参数设为true，表示在搜索状态下的分页
      this.$store.state.city.pageIsOrNot = true
    },

    // 展示列表需要的步骤
    listTableDataFormatter(response) {
      this.$store.state.city.loading = false
      this.$store.state.city.siteList = response.results
      this.$store.state.city.totalCount = response.count
      // this.$store.state.city.siteList = this.$store.state.city.siteList.slice((this.$store.state.city.tablePage.currentPage - 1) * this.$store.state.city.tablePage.pageSize, this.$store.state.city.tablePage.currentPage * this.$store.state.city.tablePage.pageSize)
    }

  }

}

</script>

<style scoped>

.box-card {
  color: #409EFF;
}
</style>
