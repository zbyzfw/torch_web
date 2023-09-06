<template>
  <div style="margin:20px 50px 50px 50px">

    <!--    点击的城市id为: {{ $store.state.city.city_id }}-->
    <!--    点击的站点类别为: {{ $store.state.city.site_classify }}-->
    <!--    数组长度为: {{ $store.state.city.totalCount }}-->

    <!--    <el-card class="box-card">-->
    <!--      大河网智慧普查数据中心-->
    <!--    </el-card>-->
    <vxe-toolbar>
      <template #buttons>
        <!--        <vxe-input v-model="filterName1" type="search" placeholder="请输入要查询的用户名称" @keyup="search"></vxe-input>-->
        <vxe-button icon="fa fa-plus" status="primary" @click="insertEvent()">添加部门</vxe-button>
      </template>
    </vxe-toolbar>

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
      <vxe-column field="id" title="ID" width="5%" />

      <vxe-column field="name" title="部门名称" />
      <!--      <vxe-column field="date_joined" title="创建时间"></vxe-column>-->
      <!--      <vxe-column field="last_login" title="最后一次登录时间"></vxe-column>-->

      <!--      <vxe-column field="site_url" title="站点域名" width="15%" type="html"></vxe-column>-->
      <!--      <vxe-column field="home_url" title="首页链接" width="15%" type="html"></vxe-column>-->
      <!--      <vxe-column field="status" title="状态" :formatter="formatterWebStatus"></vxe-column>-->

      <!--      <vxe-column field="site_classify" title="站点类型" :formatter="formatterSiteClassify"></vxe-column>-->
      <!--      <vxe-column field="web_level" title="网站级别" :formatter="formatterweb_level"></vxe-column>-->
      <!--      <vxe-column field="city_name" title="城市名称"></vxe-column>-->
      <!--      <vxe-column field="site_bsm" title="站点标识码" type="html"></vxe-column>-->
      <!--      <vxe-column field="web_bsm" title="网站标识码" type="html"></vxe-column>-->
      <!-- <vxe-column field="create_time" title="创建时间"></vxe-column> -->
      <!--      该字段与站点类型重复, 该字段删除 -->
      <!--      <vxe-column field="is_home_page" title="是否是门户" :formatter="formatterHomePage"></vxe-column>-->

      <vxe-column field="rate" title="操作" fixed="right" width="260px">
        <template #default="{ row }">
          <!--          <vxe-button type="text" icon=""  status="primary">分配权限</vxe-button>-->
          <vxe-button type="text" icon="fa fa-edit" status="primary" @click="editEvent(row)" />
          <vxe-button type="text" icon="fa fa-trash-o" status="danger" @click="removeEvent(row)" />
        </template>
      </vxe-column>
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

    <!--  添加站点,编辑站点-->
    <vxe-modal
      v-model="showEdit"
      :title="selectRow ? '编辑部门' : '添加部门'"
      width="600"
      min-width="400"
      min-height="300"
      :loading="submitLoading"
      resize
      destroy-on-close
    >
      <template #default>

        <vxe-form ref="formData" :data="formData" :rules="formRules" title-align="right" title-width="100">
          <vxe-form-item field="name" title="部门名称: " :item-render="{}" :span="20">
            <template #default="{ data }">
              <vxe-input v-model.trim="data.name" placeholder="请输入部门名称" />
            </template>
          </vxe-form-item>

          <vxe-form-item align="center" title-align="left" :span="24">
            <template #default>
              <vxe-button status="primary" @click="submitEvent('formData')">提交</vxe-button>
              <!--              <vxe-button type="reset">重置</vxe-button>-->
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>
    </vxe-modal>

  </div>
</template>

<script>
import XEUtils from 'xe-utils'
// import {
//   deleteData,
//   insertData,
//   query,
//   queryAll,
//   queryByCityId,
//   queryByCityIdAndSiteClassify,
//   searchByCityIdAndKeyword, searchByCityIdAndSiteClassifyAndKeyword, searchByKeyword,
//   updateData
// } from "@/api/t_user"

// import {
//   queryColumnByCityIdAndSiteClassify,
// } from "@/api/t_site_column"
import {
  getDepartment,
  deleteData,
  insertData,
  updateData } from '@/api/t_department'
import { searchByKeyword } from '@/api/t_permission'

export default {
  data() {
    return {
      submitLoading: false,
      selectRow: null,
      showEdit: false,
      filterName1: '',
      userList: [],

      formData: {
        id: '',
        name: ''
        // mobile: '',
      },
      formRules: {
        name: [
          { required: true, message: '请输入部门名称' },
          { min: 2, max: 50, message: '输入长度在 2 到 50 个字' }
        ]
      }
    }
  },
  computed: {},
  created() {
    // 加载全部数据
    this.getTableData(this.$store.state.city.tablePage.currentPage)
  },
  mounted() {
    // console.log(this.$store.state.city_id)
  },

  methods: {
    // // 搜索功能
    search(page) {
      const filterName = XEUtils.toValueString(this.filterName1).trim().toLowerCase()
      // const data = require("../../../tests/mock_data/site_data.json").data.records
      const id = this.$store.state.city.siteInfo.id
      if (filterName) {
        searchByKeyword(filterName, this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
          // console.log("查询结果数据: " + JSON.stringify(response))
          this.$store.state.city.siteList = response.results
          this.$store.state.city.totalCount = response.count
        }).catch(err => {
          // console.log("站点 query(keyword)请求数据失败")
          // console.log(err)
          this.$XModal.message({ content: '搜索数据失败', status: 'error' })
        })
        // 将搜索确认参数设为true，表示在搜索状态下的分页
        this.$store.state.city.pageIsOrNot = true
      } else {
        this.getTableData()
      }
    },

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

      // // 城市id
      // const changeId = this.$store.state.city.city_id
      // // 站点类别
      // const siteClassify = this.$store.state.city.site_classify

      // 获取部门列表
      getDepartment(this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
        // console.log(("Department加载全部数据： " + JSON.stringify(response)))
        // const data = response

        // 前端分页
        this.$store.state.city.loading = false
        this.$store.state.city.siteList = response.results
        // console.log("this.$store.state.city.siteList: "+  JSON.stringify(this.$store.state.city.siteList))
        this.$store.state.city.totalCount = response.results.length
        this.$store.state.city.siteList = this.$store.state.city.siteList.slice((this.$store.state.city.tablePage.currentPage - 1) * this.$store.state.city.tablePage.pageSize, this.$store.state.city.tablePage.currentPage * this.$store.state.city.tablePage.pageSize)

        // this.listTableDataFormatter(response)
      }).catch(err => {
        this.$store.state.city.loading = false
        // console.log(("Department.vue 请求数据失败" + err))
        this.$XModal.message({ content: '获取数据失败', status: 'error' })
      })
      // 将搜索确认参数设为true，表示在搜索状态下的分页
      this.$store.state.city.pageIsOrNot = true
    },

    // 编辑 删除
    formatterweb_level({ cellValue }) {
      const item = this.web_level.find(item => item.value === cellValue)
      return item ? item.label : ''
    },
    formatterSiteClassify({ cellValue }) {
      const item = this.site_classify.find(item => item.value === cellValue)
      return item ? item.label : ''
    },
    formatterWebStatus({ cellValue }) {
      const item = this.status.find(item => item.value === cellValue)
      return item ? item.label : ''
    },
    formatterHomePage({ cellValue }) {
      const item = this.is_home_page.find(item => item.value === cellValue)
      return item ? item.label : ''
    },
    visibleMethod({ data }) {
      return data.flag1 === 'Y'
    },
    cellDBLClickEvent({ row }) {
      this.editEvent(row)
    },
    insertEvent() {
      this.formData = {
        name: ''
      }
      this.selectRow = null
      this.showEdit = true
    },
    editEvent(row) {
      this.formData = {
        id: row.id,
        name: row.name
      }
      this.selectRow = row
      this.showEdit = true
    },
    async removeEvent(row) {
      // alert("提示")

      // const type = await this.$confirm('您确定要删除 ' + row.site_name + ' ?')
      const type = await this.$XModal.confirm('您确定要删除 【' + row.name + '】 ?')
      const $table = this.$refs.xTable

      if (type === 'confirm') {
        // 删除, 模拟
        // $table.remove(row);
        // this.$XModal.message({content: '删除成功', status: 'success'})

        // 删除
        // console.log("要删除的id值为: ===========" + JSON.stringify(row.id))
        deleteData(row.id).then(response => {
          // console.log(response.data)
          this.$XModal.message({ content: '删除成功', status: 'success' })
          this.getTableData()
        }).catch(err => {
          // console.log("数据删除失败原因: " + err)
          // console.log("站点 deleteData(id) 删除数据失败")
          this.$XModal.message({ content: '删除失败', status: 'error' })
          this.getTableData()
        })
      }
    },

    // 添加数据, 修改数据
    submitEvent(formName) {
      this.$refs['formData'].validate((valid) => {
        if (!valid) {
          // alert("formName为" + valid)
          this.submitLoading = true
          setTimeout(() => {
            const $table = this.$refs.xTable
            this.submitLoading = false
            this.showEdit = false
            if (this.selectRow) {
              // 修改, 模拟
              // this.$XModal.message({content: '修改成功', status: 'success'})
              // Object.assign(this.selectRow, this.formData)

              // 修改
              // console.log(this.selectRow.id)
              // console.log("修改的数据为: ==============" + JSON.stringify(this.formData))
              updateData(this.selectRow.id, this.formData).then(response => {
                // console.log(response.data)
                this.$XModal.message({ content: '修改成功', status: 'success' })
                this.getTableData()
              }).catch(err => {
                // console.log("站点数据修改失败原因: " + err)
                // console.log("站点 updateData(data) 修改数据失败")
                this.$XModal.message({ content: '修改失败', status: 'error' })
                this.getTableData()
              })
            } else {
              // $table.insert(this.formData)
              // this.$XModal.message({content: '添加成功', status: 'success'})

              // console.log("添加的数据为: =============" + JSON.stringify(this.formData))

              // 添加数据
              insertData(this.formData).then(response => {
                // console.log(response)
                this.$XModal.message({ content: '添加成功', status: 'success' })
                this.getTableData()
              }).catch(err => {
                console.log('数据添加失败原因: ' + err)
                // console.log("站点 insertData(params) 添加数据失败")
                this.$XModal.message({ content: '添加失败', status: 'error' })
                this.getTableData()
              })
            }
          }, 500)
        } else {
          // alert('error submit!!');
          return false
        }
      })
    },
    pointDetail(row) {
      // console.log(row)
      // this.$router.push("/site/scoreDetail")
      this.$router.push({
        // path: '/site/scoreDetail1',
        name: 'ScoreDetail1',
        query: {
          ...row
        }
      })
    },
    // 查看网站测评合格不合格详情页面
    scoreDetail(row) {
      // console.log(row)
      // this.$router.push("/site/scoreDetail")
      this.$router.push({
        path: '/site/scoreDetail',
        name: 'ScoreDetail',
        params: {
          data: row
        }
      })
    },

    // 查看网站栏目
    columnDetail(row) {
      // console.log(row)
      // this.$router.push("/site/scoreDetail")
      // this.$router.push({
      //   // path: '/column/ColumnDetail',
      //   name: 'ColumnDetail',
      //   params: {
      //     data: row
      //   }
      // })

      // 显示网站栏目列表页面
      this.$store.state.city.columnValue = 1
      this.$store.state.city.siteInfo = row
      // console.log("点击的站点名称为: " + JSON.stringify(row))
    },

    // 搜索功能需要的搜索步骤
    searchDataFormatter(response, filterName) {
      // const data = response
      // console.log("查询结果数据: " + JSON.stringify(response))
      // const filterRE = new RegExp(filterName, 'gi')
      // const searchProps = ['site_name', 'site_url', 'site_bsm', 'web_bsm']
      // const rest = data.results.filter(item => searchProps.some(key => XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1))
      this.$store.state.city.siteList = response.results
      this.$store.state.city.totalCount = response.count
      // this.$store.state.city.siteList = rest.slice((this.$store.state.city.tablePage.currentPage - 1) * this.$store.state.city.tablePage.pageSize, this.$store.state.city.tablePage.currentPage * this.$store.state.city.tablePage.pageSize)
    },

    // 展示列表需要的步骤
    listTableDataFormatter(response) {
      this.$store.state.city.loading = false
      this.userList = response.results
      this.$store.state.city.totalCount = response.count
      // this.$store.state.city.siteList = this.$store.state.city.siteList.slice((this.$store.state.city.tablePage.currentPage - 1) * this.$store.state.city.tablePage.pageSize, this.$store.state.city.tablePage.currentPage * this.$store.state.city.tablePage.pageSize)
    },

    // 修改是否参与普查的状态
    changeStatus(row) {
      // row.status = !row.status
      if (row.status === 0) {
        row.status = 1
      } else if (row.status === 1) {
        row.status = 0
      } else {
        alert('不可修改')
      }

      // console.log("status的值为", row.status)
      // console.log("点击的是否参与普查的数据为: ", JSON.stringify(row))

      updateData(row.id, row).then(response => {
        // console.log(response.data)
        this.$XModal.message({ content: '修改成功', status: 'success' })
        this.getTableData()
      }).catch(err => {
        // console.log("GradeDetail 站点 是否参与普查 修改失败原因: " + err)
        // console.log("GradeDetail 站点 是否参与普查 changeStatus(row) 修改数据失败")
        this.$XModal.message({ content: '修改失败', status: 'error' })
        this.getTableData()
      })
    }
  }

}
</script>

<style scoped>

.box-card {
  color: #409EFF;
}
</style>
