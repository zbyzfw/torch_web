<template>
  <div style="margin:20px 50px 50px 50px">

    <!--    点击的城市id为: {{ $store.state.city.city_id }}-->
    <!--    点击的站点类别为: {{ $store.state.city.site_classify }}-->
    <!--    数组长度为: {{ $store.state.city.totalCount }}-->

    <el-card class="box-card">
      大河网智慧普查数据中心
    </el-card>

    <vxe-toolbar style="margin-top: 0; margin-bottom: 0; display: inline-block; width: 100%">
      <template #buttons>
        <!--        <vxe-input v-model="filterName1" type="search" placeholder="请输入要查询的站点名称" @focus="changePage"-->
        <!--                   @keyup="search"></vxe-input>-->
        <span>
          <vxe-input
            v-model="siteName"
            style="width: 175px;margin-right: 30px; margin-top: 5px; margin-bottom: 5px"
            placeholder="请输入名称"
            clearable
            @focus="changePage"
          />
          <!--                   @keyup="search"></vxe-input>-->
          <vxe-input
            v-model="web_bsm"
            style="width: 175px; margin-right: 30px;margin-bottom: 5px"
            clearable
            placeholder="请输入网站标识码"
            @focus="changePage"
          />
          <vxe-select
            v-show="$store.state.city.city_id === 10000 || $store.state.city.city_id === 1"
            v-model="siteClassifyValue"
            style="width: 175px; margin-right: 30px;margin-top: 5px;margin-bottom: 5px"
            placeholder="请选择网站站点类型"
            :options="siteClassify"
            clearable
            transfer
            @focus="changePage"
          />
          <vxe-button
            style="margin-right: 30px;margin-top: 5px; margin-bottom: 5px"
            status="primary"
            @click="getFilterSiteData(siteName, web_bsm, siteClassifyValue, $store.state.city.city_id)"
            @focus="changePage"
          >网站查询
          </vxe-button>
        </span>

      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      :export-config="{}"
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

      <!--      <vxe-column type="seq" title="序号" width="60"></vxe-column>-->
      <!--      <vxe-column field="id" title="ID" width="5%"></vxe-column>-->
      <vxe-column field="id" title="ID" min-width="80" />

      <vxe-column field="site_name" title="名称" type="html" min-width="230">
        <template #default="{ row }">
          <a :href="row.home_url" target="_black">{{ row.site_name }}</a>
        </template>
      </vxe-column>
      <vxe-column field="web_bsm" title="网站标识码" min-width="120" />

      <!--      <vxe-column field="site_url" title="站点域名" width="15%" type="html"></vxe-column>-->
      <!--      <vxe-column field="home_url" title="首页链接" width="15%" type="html"></vxe-column>-->

      <!--      <vxe-column title="是否参与普查" >-->
      <!--        <template #default="{ row }">-->
      <!--          <vxe-switch v-model="row.status===1" open-label="是" close-label="否" @change="changeStatus(row)"></vxe-switch>-->
      <!--        </template>-->
      <!--      </vxe-column>-->

      <vxe-column field="site_classify" title="类型" :formatter="formatterSiteClassify" min-width="100" />
      <vxe-column field="qualified" title="结果" min-width="100" />
      <vxe-column field="score" title="分数" min-width="100" />
      <vxe-column field="web_level" title="网站级别" :formatter="formatterweb_level" min-width="100" />
      <vxe-column field="city_name" title="城市名称" min-width="100" />
      <!--      <vxe-column field="site_bsm" title="站点标识码" type="html"></vxe-column>-->
      <!--      <vxe-column field="web_bsm" title="网站标识码" type="html"></vxe-column>-->
      <!-- <vxe-column field="create_time" title="创建时间"></vxe-column> -->
      <!--      该字段与站点类型重复, 该字段删除 -->
      <!--      <vxe-column field="is_home_page" title="是否是门户" :formatter="formatterHomePage"></vxe-column>-->

      <vxe-column field="rate" title="操作" fixed="right" width="260px">
        <template #default="{ row }">
          <!--          <vxe-button type="text" icon="" @click="columnDetail(row)" status="primary">查看栏目</vxe-button>-->
          <vxe-button
            type="text"
            icon="el-icon-star-off"
            status="warning"
            title="普查"
            @click="pointDetail(row)"
          />
          <vxe-button
            type="text"
            icon="fa fa-calculator"
            status="success"
            title="普查结果"
            @click="scoreDetail(row)"
          />
          <!--          <vxe-button type="text" icon="fa fa-edit" @click="editEvent(row)" status="primary"></vxe-button>-->
          <!--          <vxe-button type="text" icon="fa fa-trash-o" @click="removeEvent(row)" status="danger"></vxe-button>-->
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
      :title="selectRow
        ? '编辑站点 - ' + $store.state.city.siteInfos.label + ' - ' + $store.state.city.classifyInfo.label
        : '添加站点  - '+ $store.state.city.siteInfos.label + ' - ' + $store.state.city.classifyInfo.label"
      width="600"
      min-width="400"
      min-height="300"
      :loading="submitLoading"
      resize
      destroy-on-close
    >
      <template #default>

        <vxe-form :data="formData" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent">

          <vxe-form-item field="site_name" title="站点名称: " :item-render="{}" :span="20">
            <template #default="{ data }">
              <vxe-input v-model.trim="data.site_name" placeholder="请输入站点名称" />
            </template>
          </vxe-form-item>

          <vxe-form-item field="site_url" title="站点域名: " :item-render="{}" :span="20">
            <template #default="{ data }">
              <vxe-input v-model="data.site_url" placeholder="请输入站点域名" />
            </template>
          </vxe-form-item>

          <vxe-form-item field="home_url" title="首页链接: " :item-render="{}" :span="20">
            <template #default="{ data }">
              <vxe-input v-model="data.home_url" placeholder="请输入首页链接" />
            </template>
          </vxe-form-item>

          <vxe-form-item field="status" title="是否参与普查: " :item-render="{}" :span="20">
            <template #default="{ data}">
              <vxe-select v-model="data.status" transfer>
                <vxe-option
                  v-for="w_status in status"
                  :key="w_status.value"
                  :value="w_status.value"
                  :label="w_status.label"
                />
              </vxe-select>
            </template>
          </vxe-form-item>

          <!--          <vxe-form-item field="" title="站点类型: " :item-render="{}" :span="20">-->
          <!--            <template #default="{ data }">-->
          <!--              <vxe-select v-model.number="data.site_classify" transfer>-->
          <!--                <vxe-option v-for="classify in site_classify" :key="classify.value" :value="classify.value"-->
          <!--                            :label="classify.label"></vxe-option>-->
          <!--              </vxe-select>-->
          <!--            </template>-->
          <!--          </vxe-form-item>-->

          <!--          设置站点类型, 不显示, 提交数据时, 将数据提交到数据库-->
          <vxe-form-item field="" title="站点类型: " :item-render="{}" :span="20" :visible="false">
            <template #default="{ data }">
              <vxe-input v-model="$store.state.city.classifyInfo.site_classify" placeholder="请输入站点所属类型" />
            </template>
          </vxe-form-item>

          <vxe-form-item field="" title="站点级别: " :item-render="{}" :span="20">
            <template #default="{ data }">
              <vxe-select v-model="data.web_level" transfer>
                <vxe-option
                  v-for="level in web_level"
                  :key="level.value"
                  :value="level.value"
                  :label="level.label"
                />
              </vxe-select>
            </template>
          </vxe-form-item>

          <!--          设置城市id, 不显示, 提交数据时, 将数据提交到数据库-->
          <vxe-form-item field="" title="城市id: " :item-render="{}" :span="20" :visible="false">
            <template #default="{ data }">
              <vxe-input v-model="$store.state.city.siteInfos.id" placeholder="请输入站点所属城市id" />
            </template>
          </vxe-form-item>

          <vxe-form-item field="" title="站点标识码: " :item-render="{}" :span="20">
            <template #default="{ data }">
              <vxe-input v-model="data.site_bsm" placeholder="请输入站点标识码" />
            </template>
          </vxe-form-item>

          <vxe-form-item field="" title="网站标识码: " :item-render="{}" :span="20">
            <template #default="{ data }">
              <vxe-input v-model="data.web_bsm" placeholder="请输入网站标识码" />
            </template>
          </vxe-form-item>

          <!--          <vxe-form-item field="" title="创建时间: " :item-render="{}" :span="20">-->
          <!--            <template #default="{ data }">-->
          <!--              <vxe-input v-model="data.create_time" disabled></vxe-input>-->
          <!--            </template>-->
          <!--          </vxe-form-item>-->

          <!--          是否是门户字段, 该字段与站点类型重复, 该字段删除-->
          <!--          <vxe-form-item field="is_home_page" title="是否是门户: " :item-render="{}" :span="20">-->
          <!--            <template #default="{ data }">-->
          <!--              <vxe-select v-model="data.is_home_page" transfer>-->
          <!--                <vxe-option v-for="homePage in is_home_page" :key="homePage.value" :value="homePage.value"-->
          <!--                            :label="homePage.label"></vxe-option>-->
          <!--              </vxe-select>-->
          <!--            </template>-->
          <!--          </vxe-form-item>-->

          <vxe-form-item align="center" title-align="left" :span="24">
            <template #default>
              <vxe-button type="submit">提交</vxe-button>
              <vxe-button type="reset">重置</vxe-button>
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
//   queryAllByStatus,
//   queryByCityIdAndStatus,
//   searchByKeywordAndStatus,
//   searchByCityIdAndKeywordAndStatus,
//   searchByCityIdAndSiteClassifyAndKeywordAndStatus,
//   queryByCityIdAndSiteClassifyAndStatus,
//   queryByCityId,
//   queryByCityIdAndSiteClassify, searchByCityIdAndKeyword, searchByCityIdAndSiteClassifyAndKeyword, searchByKeyword,
//   updateData
// } from "@/api/t_site"

import {
  // deleteData,
  // insertData,
  query,
  queryAll,
  queryAllByStatus,
  queryByCityIdAndStatus,
  searchByKeywordAndStatus,
  searchByCityIdAndKeywordAndStatus,
  searchByCityIdAndSiteClassifyAndKeywordAndStatus,
  queryByCityIdAndSiteClassifyAndStatus,
  queryByCityId,
  queryByCityIdAndSiteClassify,
  searchByCityIdAndKeyword,
  searchByCityIdAndSiteClassifyAndKeyword,
  searchByKeyword,
  searchBySiteNameWebBsmSiteClassifyStatus, queryNewMediaByCityIdSiteClassity
  // updateData
} from '@/api/pucha'
import { queryLingCaiWeiboByCityIdAndSiteClassify, queryLingCaiWeixinByCityIdAndSiteClassify } from '@/api/t_site_column'
import * as pucha from '@/api/pucha'
import { getFilterSiteDataBySiteNameWebBsmSiteClassifyStatus } from '@/api/t_site'

export default {
  data() {
    return {
      submitLoading: false,
      selectRow: null,
      showEdit: false,
      filterName1: '',
      web_level: [
        { label: '省', value: 0 },
        { label: '市', value: 1 },
        { label: '县', value: 2 }
        // {label: '省直', value: 3}
      ],
      site_classify: [
        { label: '门户网站', value: 0 },
        { label: '非门户网站', value: 1 },
        { label: '微信', value: 2 },
        { label: '微博', value: 3 },
        { label: '其他', value: 4 }
      ],
      // status: [
      //   {label: '是', value: 1},
      //   {label: '否', value: 0},
      // ],
      status: 1,
      // is_home_page: [
      //   {label: '是', value: true},
      //   {label: '否', value: false}
      // ],

      // 条件查询的筛选条件 站点类型
      siteClassify: [
        { label: '门户网站', value: 0 },
        { label: '非门户网站', value: 1 }
      ],
      // 条件查询 站点类型的值
      siteClassifyValue: '',
      // 条件查询 网站标识码的值
      web_bsm: '',
      // 条件查询站点名称的值
      siteName: '',
      // 条件查询cityId的值
      cityId: '',
      formData: {
        id: '',
        site_name: '',
        site_url: '',
        home_url: '',
        status: '',
        site_classify: '',
        web_level: 0,
        city_id: '',
        site_bsm: '',
        web_bsm: '',
        create_time: ''
        // is_home_page: ''
      },
      formRules: {
        site_name: [
          { required: true, message: '请输入名称' },
          { min: 2, max: 50, message: '输入长度在 2 到 50 个字' }
        ],
        site_url: [
          { required: true, message: '请输入站点' }
        ],
        home_url: [
          { required: true, message: '请输入首页链接' }
        ],
        site_classify: [
          { required: true, message: '请选择网站类型' }
        ],
        web_status: [
          { required: true, message: '请选择网站状态' }
        ],
        level: [
          { required: true, message: '请选择网站级别' }
        ]
        // is_home_page: [
        //   {required: true, message: '请选择是否是门户'}
        // ]
      }
    }
  },
  computed: {},
  created() {
    // 加载全部数据
    this.getTableData(this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize)
  },
  mounted() {
    // console.log(this.$store.state.city_id)
  },

  methods: {
    // 搜索功能
    search(page, status) {
      // 数据的查询的内容
      const filterName = XEUtils.toValueString(this.filterName1).trim().toLowerCase()
      // const data = require("../../../tests/mock_data/site_data.json").data.records

      // console.log("执行了GradeDetail.vue 中的 search")

      // 城市id
      const changeId = this.$store.state.city.city_id
      // 站点类别
      const siteClassify = this.$store.state.city.site_classify

      if (filterName) {
        if (changeId === 1 || changeId === 10000) {
          // 没有选择城市和类别时， 默认搜索全局
          searchByKeywordAndStatus(filterName, this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
            // console.log("检索出的结果是: ", JSON.stringify(response))

            this.searchDataFormatter(response, filterName)
          }).catch(err => {
            this.$XModal.message({ content: '获取数据失败', status: 'error' })
          })
        } else if (siteClassify === -1) {
          // 只选择城市id时，搜素数据
          searchByCityIdAndKeywordAndStatus(changeId, filterName, this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
            this.searchDataFormatter(response, filterName)
          }).catch(err => {
            this.$XModal.message({ content: '获取数据失败', status: 'error' })
          })
        } else {
          // 选择城市id和站点类别时搜索数据
          searchByCityIdAndSiteClassifyAndKeywordAndStatus(changeId, siteClassify, filterName, this.$store.state.city.tablePage.currentPage, 1, this.$store.state.city.tablePage.pageSize).then(response => {
            this.searchDataFormatter(response, filterName)
          }).catch(err => {
            this.$XModal.message({ content: '获取数据失败', status: 'error' })
          })
        }
      } else {
        this.getTableData(this.$store.state.city.tablePage.currentPage, 1)
      }
    },

    // 点击搜索框, 回到列表初始状态
    changePage() {
      this.$store.state.city.tablePage.currentPage = 1
      // this.getTableData()
    },

    // 分页部分
    // 页数改变时触发
    handleCurrentChange({ currentPage, pageSize }) {
      // console.log("传递的currentPage为: " + currentPage, "传递的pageSize为: " + pageSize)
      this.$store.state.city.tablePage.currentPage = currentPage
      this.$store.state.city.tablePage.pageSize = pageSize
      if (this.$store.state.city.pageIsOrNot) {
        // console.log("GradeDetail.vue 走了搜索程序")
        // this.search(this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize);
        this.getFilterSiteData(this.siteName, this.web_bsm, this.siteClassifyValue, this.cityId)
      } else {
        // console.log("传递的currentPage为: " + currentPage, "传递的pageSize为: " + pageSize)
        // this.$store.state.city.tablePage.currentPage = currentPage;
        // this.$store.state.city.tablePage.pageSize = pageSize;
        this.getTableData(this.$store.state.city.tablePage.currentPage, 1, this.$store.state.city.tablePage.pageSize)
      }
    },

    // 打开页面时加载数据
    getTableData(page, status, size) {
      this.$store.state.city.pageIsOrNot = false // 表明此时为加载全部数据
      this.$store.state.city.loading = true

      // 城市id
      const changeId = this.$store.state.city.city_id
      // 站点类别
      const siteClassify = this.$store.state.city.site_classify

      // console.log("siteClassify" + this.$store.state.city.site_classify)

      // console.log("GradeDetail.vue 执行了网站查询")

      // console.log("siteClassify的值为====================>" + siteClassify)
      // console.log("siteClassify的值为====================>" + changeId)

      // 默认展示全部数据
      if (changeId === 1 || changeId === 10000) {
        queryAllByStatus(this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
          // console.log("加载全部数据： " + JSON.stringify(response))
          // const data = response

          // console.log("执行了GradeDetail.vue中的 getTableData()")
          this.listTableDataFormatter(response)
        }).catch(err => {
          this.$store.state.city.loading = false
          //  console.log("站点 queryAll()请求数据失败" + err)
          this.$XModal.message({ content: '获取数据失败', status: 'error' })
        })
      } else {
        // 选择城市id, 没有选择站点类别时展示
        if (siteClassify === -1) {
          // console.log("执行了GradeDetail.vue中的 siteClassify === -1")
          // console.log("城市id分页查询的当前页为: ", this.$store.state.city.tablePage.currentPage)
          queryByCityIdAndStatus(changeId, this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
            // console.log("执行了GradeDetail.vue 中的 queryByCityIdAndStatus")
            // console.log("queryByCityId查询出的数据为", JSON.stringify(response))
            this.listTableDataFormatter(response)
          }).catch(err => {
            this.$store.state.city.loading = false
            this.$XModal.message({ content: '获取数据失败', status: 'error' })
            // console.log("common 站点 queryByCityId()请求数据失败")
          })
        } else {
          if (siteClassify === 0 || siteClassify === 1) {
            // console.log("执行了GradeDetail.vue中的 siteClassify === 0 || siteClassify === 1")
            // 网站
            this.$store.state.city.loading = false
            pucha.queryByCityIdAndSiteClassifyAndStatus(this.$store.state.city.city_id, this.$store.state.city.site_classify,
              this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
              // console.log("网站数据为===> " + JSON.stringify(response))
              this.$store.state.city.loading = false
              this.$store.state.city.siteList = response.results
              this.$store.state.city.totalCount = response.count
            }).catch(err => {
              this.$store.state.city.loading = false
              this.$XModal.message({ content: '获取数据失败', status: 'error' })
              // console.log("city.js 站点 queryColumnByCityIdAndSiteClassify()请求数据失败")
            })
          }
        }
      }
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
        site_name: '',
        site_url: '',
        home_url: '',
        status: '',
        site_classify: this.$store.state.city.classifyInfo.site_classify,
        web_level: '',
        city_id: this.$store.state.city.siteInfos.id,
        site_bsm: '',
        web_bsm: ''
        // create_time: '',
        // 该字段与站点字段重复, 该字段删除
        // is_home_page: ''
      }
      this.selectRow = null
      this.showEdit = true
    },
    editEvent(row) {
      this.formData = {
        id: row.id,
        site_name: row.site_name,
        site_url: row.site_url,
        home_url: row.home_url,
        status: row.status,
        site_classify: row.site_classify,
        web_level: row.web_level,
        city_id: row.city_id,
        site_bsm: row.site_bsm,
        web_bsm: row.web_bsm
        // create_time: row.create_time,
        // 该字段与站点字段重复, 该字段删除
        // is_home_page: row.is_home_page
      }
      this.selectRow = row
      this.showEdit = true
    },
    async removeEvent(row) {
      // alert("提示")

      // const type = await this.$confirm('您确定要删除 ' + row.site_name + ' ?')
      const type = await this.$XModal.confirm('您确定要删除 【' + row.site_name + '】 ?')
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
          // console.log("站点数据删除失败原因: " + err)
          // console.log("站点 deleteData(id) 删除数据失败")
          this.$XModal.message({ content: '删除失败', status: 'error' })
          this.getTableData()
        })
      }
    },

    // 添加数据, 修改数据
    submitEvent() {
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
            // console.log("站点数据添加失败原因: " + err)
            // console.log("站点 insertData(params) 添加数据失败")
            this.$XModal.message({ content: '添加失败', status: 'error' })
            this.getTableData()
          })
        }
      }, 500)
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
      // this.$router.push("/site/scoreDetail")
      sessionStorage.setItem('setDetail', JSON.stringify(row))
      this.$router.push({
        path: '/grade/grade/scoreDetail',
        name: 'scoreDetail0',
        params: {
          data: row
        }
      })

      // this.$store.state.city.columnValue = 1
      // this.$store.state.city.siteInfo = row
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
      this.$store.state.city.siteList = response.results
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
        this.getTableData()
      })
    },
    // 条件查询方法
    getFilterSiteData(siteName, web_bsm, siteClassifyValue, cityId) {
      // console.log("执行了GradeDetail.vue 中getFilterSiteData")
      // console.log('this.$store.state.city.site_classify: ' + this.$store.state.city.site_classify)

      // console.log("执行了GradeDetail.vue中的搜索函数")

      if (this.$store.state.city.site_classify === 2 || this.$store.state.city.site_classify === 3 || this.$store.state.city.site_classify === 4) {
        this.$store.state.city.site_classify = -1
      }

      this.$store.state.city.loading = true

      if (siteName == null) {
        siteName = ''
      }
      if (web_bsm == null) {
        web_bsm = ''
      }

      if (siteClassifyValue == null) {
        siteClassifyValue = ''
      }

      if (cityId == null) {
        cityId = ''
      }

      if (this.$store.state.city.city_id === 1 || this.$store.state.city.city_id === 10000) {
        cityId = ''
      }

      // alert("筛选条件为： siteName: " + siteName + ", web_bsm: " + web_bsm + ", siteClassifyValue: " + siteClassifyValue + ", statusValue: " + statusValue)

      // console.log("cityId为： " + cityId)
      // console.log("$store.state.city.city_id为： " + this.$store.state.city.city_id)
      // console.log("this.$store.state.city.site_classify为： " + this.$store.state.city.site_classify)
      // 当搜索的站点名称存在时
      if (siteName.length < 1 && web_bsm.length < 1 && siteClassifyValue.length < 1 && cityId.length < 1) {
        this.getTableData()
      } else {
        // 按照筛选条件查询
        searchBySiteNameWebBsmSiteClassifyStatus(siteName, web_bsm, siteClassifyValue, 1, cityId,
          this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize
        ).then(response => {
          // console.log("筛选出的结果是: " + JSON.stringify(response))
          this.$store.state.city.loading = false
          this.$store.state.city.siteList = response.results
          this.$store.state.city.totalCount = response.count
        }).catch(err => {
          // console.log("获取失败原因是： " + err)
          this.$store.state.city.loading = false
          this.$XModal.message({ content: '获取数据失败失败', status: 'error' })
          // this.$store.state.city.loading = true;
        })
      }
    }

  }

}
</script>

<style scoped>

.box-card {
  color: #409EFF;
}
</style>
