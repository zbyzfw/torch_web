<template>
  <div style="margin:20px 50px 50px 50px">

    <!--        点击的城市id为: {{ $store.state.city.city_id }}-->
    <!--    点击的站点类别为: {{ $store.state.city.site_classify }}-->
    <!--    数组长度为: {{ $store.state.city.totalCount }}-->

    <el-card class="box-card">
      大河网智慧普查数据中心
    </el-card>
    <vxe-toolbar style="margin-top: 0; margin-bottom: 0px; display: inline-block; width: 100%">
      <template #buttons>
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
          <vxe-select
            v-model="statusValue"
            style="width: 175px; margin-right: 30px; margin-top: 5px;margin-bottom: 5px"
            placeholder="请选择是否采集"
            :options="status"
            clearable
            transfer
            @focus="changePage"
          />
          <vxe-button
            style="margin-right: 30px;margin-top: 5px; margin-bottom: 5px"
            status="primary"
            @click="getFilterSiteData(siteName, web_bsm, siteClassifyValue, statusValue, $store.state.city.city_id)"
            @focus="changePage"
          >网站查询
          </vxe-button>
          <vxe-button
            v-show="$store.state.city.city_id !== 10000 && $store.state.city.city_id !== 1 && $store.state.city.site_classify !== -1"
            style="margin: 5px 30px 5px 0;"
            icon="fa fa-plus"
            status="primary"
            @click="insertEvent()"
          >
            添加站点
          </vxe-button>
        </span>
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
      <!--      <vxe-column field="id" title="ID" width="5%"></vxe-column>-->
      <vxe-column field="id" title="ID" min-width="80" />

      <vxe-column field="site_name" title="名称" type="html" width="230">
        <template #default="{ row }">
          <a :href="row.home_url" target="_black">{{ row.site_name }}</a>
        </template>
      </vxe-column>
      <vxe-column field="web_bsm" title="网站标识码" min-width="120" />

      <!--      <vxe-column field="site_url" title="站点域名" width="15%" type="html"></vxe-column>-->
      <!--      <vxe-column field="home_url" title="首页链接" width="15%" type="html"></vxe-column>-->
      <!--      <vxe-column field="status" title="状态" :formatter="formatterWebStatus"></vxe-column>-->

      <vxe-column field="site_classify" title="类型" :formatter="formatterSiteClassify" min-width="100" />
      <vxe-column field="web_level" title="网站级别" :formatter="formatterweb_level" min-width="100" />
      <vxe-column field="city_name" title="城市名称" min-width="100" />
      <!--      <vxe-column field="site_bsm" title="站点标识码" type="html"></vxe-column>-->
      <!--      <vxe-column field="web_bsm" title="网站标识码" type="html"></vxe-column>-->
      <vxe-column field="update_time" title="更新时间" min-width="150" />

      <vxe-column title="是否采集" min-width="100">
        <template #default="{ row }">
          <vxe-switch v-model="row.status===1" open-label="是" close-label="否" @change="changeStatus(row)" />
        </template>
      </vxe-column>

      <!--      该字段与站点类型重复, 该字段删除 -->
      <!--      <vxe-column field="is_home_page" title="是否是门户" :formatter="formatterHomePage"></vxe-column>-->
      <vxe-column field="rate" title="操作" fixed="right" width="220px">
        <template #default="{ row }">
          <vxe-button type="text" icon="" status="primary" @click="columnDetail(row)">查看栏目</vxe-button>
          <!--          <vxe-button type="text" icon="fa fa-calculator" @click="scoreDetail(row)" status="success"></vxe-button>-->
          <!--          <vxe-button type="text" icon="el-icon-star-off" @click="pointDetail(row)" status="warning"></vxe-button>-->
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
      :title="selectRow
        // ? '编辑站点 - ' +  + ' - ' + $store.state.city.classifyInfo.label
        // ? '编辑站点 - ' + JSON.stringify(selectRow)
        ? '编辑站点 - ' + selectRow.site_name
        : '添加站点  - '+ $store.state.city.siteInfos.label + ' - ' + $store.state.city.classifyInfo.label"
      width="600"
      min-width="400"
      min-height="300"
      :loading="submitLoading"
      resize
      destroy-on-close
    >
      <template #default>

        <vxe-form ref="formData" :data="formData" :rules="formRules" title-align="right" title-width="100">
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

          <vxe-form-item field="" title="是否采集: " :item-render="{}" :span="20">
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

          <vxe-form-item field="web_level" title="站点级别: " :item-render="{}" :span="20">
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

          <vxe-form-item field="need_serve" title="是否建设政务服务: " :item-render="{}" :span="20">
            <template #default="{ data }">
              <vxe-select v-model="data.need_serve" transfer>
                <vxe-option
                  v-for="needServ in needServe"
                  :key="needServ.value"
                  :value="needServ.value"
                  :label="needServ.label"
                />
              </vxe-select>
            </template>
          </vxe-form-item>

          <!--          <vxe-form-item field="" title="创建时间: " :item-render="{}" :span="20">-->
          <!--            <template #default="{ data }">-->
          <!--              <vxe-input v-model="data.create_time" disabled></vxe-input>-->
          <!--            </template>-->
          <!--          </vxe-form-item>-->

          <vxe-form-item field="pucha_status" title="普查状态: " :item-render="{}" :span="20">
            <template #default="{ data }">
              <vxe-select v-model="data.pucha_status" transfer>
                <vxe-option
                  v-for="puchaStatus in pucha_status"
                  :key="puchaStatus.value"
                  :value="puchaStatus.value"
                  :label="puchaStatus.label"
                />
              </vxe-select>
            </template>
          </vxe-form-item>

          <!--          是否是门户字段, 该字段与站点类型重复, 该字段删除-->
          <vxe-form-item field="is_site_nav" title="首页是否仅为导航入口: " :item-render="{}" :span="20">
            <template #default="{ data }">
              <vxe-select v-model="data.is_site_nav" transfer>
                <vxe-option
                  v-for="siteNav in is_site_nav"
                  :key="siteNav.value"
                  :value="siteNav.value"
                  :label="siteNav.label"
                />
              </vxe-select>
            </template>
          </vxe-form-item>

          <vxe-form-item field="is_right_domain" title="网站域名是否规范: " :item-render="{}" :span="20">
            <template #default="{ data }">
              <vxe-select v-model="data.is_right_domain" transfer>
                <vxe-option
                  v-for="rightDomain in is_right_domain"
                  :key="rightDomain.value"
                  :value="rightDomain.value"
                  :label="rightDomain.label"
                />
              </vxe-select>
            </template>
          </vxe-form-item>

          <vxe-form-item field="is_right_webname" title="网站名称是否规范: " :item-render="{}" :span="20">
            <template #default="{ data }">
              <vxe-select v-model="data.is_right_webname" transfer>
                <vxe-option
                  v-for="rightWebName in is_right_webname"
                  :key="rightWebName.value"
                  :value="rightWebName.value"
                  :label="rightWebName.label"
                />
              </vxe-select>
            </template>
          </vxe-form-item>

          <vxe-form-item align="center" title-align="left" :span="24">
            <template #default>
              <!--              <vxe-button type="submit" status="primary">提交</vxe-button>-->
              <vxe-button status="primary" @click="submitEvent('formData')">提交</vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>
    </vxe-modal>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import {
  deleteData, getFilterSiteDataBySiteNameWebBsmSiteClassifyStatus,
  insertData,
  query,
  queryAll,
  queryByCityId,
  queryByCityIdAndSiteClassify,
  searchByCityIdAndKeyword, searchByCityIdAndSiteClassifyAndKeyword, searchByKeyword,
  updateData
} from '@/api/t_site'

import {
  queryColumnByCityIdAndSiteClassify
} from '@/api/t_site_column'
import { queryByCityIdTaskIDSiteClassify } from '@/api/t_report'

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
      // 条件查询的筛选条件 站点类型
      siteClassify: [
        { label: '门户网站', value: 0 },
        { label: '非门户网站', value: 1 }
      ],
      // 条件查询 站点类型的值
      siteClassifyValue: '',
      status: [
        { label: '否', value: 0 },
        { label: '是', value: 1 }
      ],
      // 条件查询的是否采集的值
      statusValue: '',
      pucha_status: [
        { label: '未普查', value: 0 },
        { label: '完成首次普查', value: 1 },
        { label: '完成二次普查', value: 2 }
      ],
      // 条件查询 网站标识码的值
      web_bsm: '',
      // 条件查询站点名称的值
      siteName: '',
      // 条件查询cityId的值
      cityId: '',
      is_site_nav: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ],
      // 是否建设政务服务
      needServe: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ],

      is_right_domain: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ],
      is_right_webname: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ],
      formData: {
        // id: '',
        site_name: '',
        site_url: '',
        home_url: '',
        status: '',
        site_classify: '',
        web_level: 0,
        city_id: '',
        site_bsm: '',
        web_bsm: '',
        create_time: '',
        pucha_status: '',
        is_site_nav: '',
        is_right_domain: '',
        is_right_webname: ''
      },
      formRules: {
        site_name: [
          { required: true, message: '请输入站点名称' },
          { min: 2, max: 100, message: '输入长度在 2 到 100 个字' }
        ],
        site_url: [
          { required: true, message: '请输入站点域名' }
        ],
        home_url: [
          { required: true, message: '请输入首页链接' }
        ],
        // site_classify: [
        //   {required: true, message: '请选择网站类型'}
        // ],
        status: [
          { required: true, message: '请选择是否参与普查' }
        ],
        web_level: [
          { required: true, message: '请选择网站级别' }
        ],
        need_serve: [
          { required: true, message: '请选择是否建设政务服务' }
        ],
        is_site_nav: [
          { required: true, message: '请选择首页是否仅为导航入口' }
        ],
        is_right_domain: [
          { required: true, message: '请选择网站域名是否规范' }
        ],
        is_right_webname: [
          { required: true, message: '请选择网站名称是否规范' }
        ],
        pucha_status: [
          { required: true, message: '请选择普查状态' }
        ]
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
    search(page) {
      // 数据的查询的内容
      const filterName = XEUtils.toValueString(this.filterName1).trim().toLowerCase()
      // const data = require("../../../tests/mock_data/site_data.json").data.records

      // 城市id
      const changeId = this.$store.state.city.city_id
      // 站点类别
      const siteClassify = this.$store.state.city.site_classify

      // this.$store.state.city.tablePage.currentPage

      if (filterName) {
        if (changeId === 1 || changeId === 10000) {
          // 没有选择城市和类别时， 默认搜索全局
          searchByKeyword(filterName, this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
            // console.log("检索出的结果是: ", JSON.stringify(response))

            this.searchDataFormatter(response, filterName)
          }).catch(err => {
            // console.log("common 站点 query(keyword)请求数据失败原因 ",err)
            // console.log("common 站点 query(keyword)请求数据失败")
          })
        } else if (siteClassify === -1) {
          // 只选择城市id时，搜素数据
          searchByCityIdAndKeyword(changeId, filterName, this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
            this.searchDataFormatter(response, filterName)
          }).catch(err => {
            // console.log("common query 站点 queryByCityId()请求数据失败")
          })
        } else {
          // 选择城市id和站点类别时搜索数据
          searchByCityIdAndSiteClassifyAndKeyword(changeId, siteClassify, filterName, this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
            this.searchDataFormatter(response, filterName)
          }).catch(err => {
            // console.log("站点 queryByCityId()请求数据失败")
          })
        }
      } else {
        this.getTableData()
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
        // this.search(this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize);
        this.getFilterSiteData(this.siteName, this.web_bsm, this.siteClassifyValue, this.statusValue, this.cityId)
      } else {
        // console.log("传递的currentPage为: " + currentPage, "传递的pageSize为: " + pageSize)
        // this.$store.state.city.tablePage.currentPage = currentPage;
        // this.$store.state.city.tablePage.pageSize = pageSize;
        this.getTableData(this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize)
      }
    },

    // 打开页面时加载数据
    getTableData(page, size) {
      this.$store.state.city.pageIsOrNot = false // 表明此时为加载全部数据
      this.$store.state.city.loading = true

      // 城市id
      const changeId = this.$store.state.city.city_id
      // 站点类别
      let siteClassify = this.$store.state.city.site_classify
      //  console.log("siteClassify的值为====================>" + this.$store.state.city.site_classify)
      // console.log("siteClassify的值为====================>" + changeId)

      // 默认展示全部数据
      if (changeId === 1 || changeId === 10000) {
        queryAll(this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
          // console.log("加载全部数据： " + JSON.stringify(response))
          // const data = response
          this.listTableDataFormatter(response)
        }).catch(err => {
          this.$XModal.message({ content: '获取数据失败', status: 'error' })
          // console.log("站点 queryAll()请求数据失败")
        })
      } else {
        // 选择城市id, 没有选择站点类别时展示
        if (siteClassify === -1) {
          // console.log("城市id分页查询的当前页为: ", this.$store.state.city.tablePage.currentPage)
          queryByCityId(changeId, this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
            // console.log("queryByCityId查询出的数据为", JSON.stringify(response))
            this.listTableDataFormatter(response)
          }).catch(err => {
            this.$XModal.message({ content: '获取数据失败', status: 'error' })

            // console.log("common 站点 queryByCityId()请求数据失败")
          })
        } else if (siteClassify === 2 || siteClassify === 3 || siteClassify === 4) {
          // 选择城市id和站点类别时展示
          // 当站点类别是微信时
          siteClassify = ''
          queryByCityIdAndSiteClassify(changeId, siteClassify, this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
            // console.log("查询出的微信信息是: ======================>", JSON.stringify(response))
            this.listTableDataFormatter(response)
          }).catch(err => {
            this.$XModal.message({ content: '获取数据失败', status: 'error' })
            // console.log("common 站点 queryByCityIdAndSiteClassify()请求数据失败")
          })
        } else {
          queryByCityIdAndSiteClassify(changeId, siteClassify, this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
            // console.log("查询出的微信信息是: ======================>", JSON.stringify(response))
            this.listTableDataFormatter(response)
          }).catch(err => {
            this.$XModal.message({ content: '获取数据失败', status: 'error' })
            // console.log("common 站点 queryByCityIdAndSiteClassify()请求数据失败")
          })
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
        status: 1,
        site_classify: this.$store.state.city.classifyInfo.site_classify,
        web_level: '',
        city: this.$store.state.city.siteInfos.id,
        site_bsm: '',
        web_bsm: '',
        need_serve: '',
        // create_time: '',
        // 该字段与站点字段重复, 该字段删除
        pucha_status: '',
        is_site_nav: '',
        is_right_domain: '',
        is_right_webname: ''
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
        city: row.city,
        site_bsm: row.site_bsm,
        web_bsm: row.web_bsm,
        need_serve: row.need_serve,
        // create_time: row.create_time,
        // 该字段与站点字段重复, 该字段删除
        pucha_status: row.pucha_status,
        is_site_nav: row.is_site_nav,
        is_right_domain: row.is_right_domain,
        is_right_webname: row.is_right_webname

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
                this.$XModal.message({ content: '修改数据失败', status: 'error' })
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
                this.$XModal.message({ content: '已存在，添加失败', status: 'error' })
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
      this.$store.state.city.tablePage.currentPage = 1
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
      if (response.count < this.$store.state.city.tablePage.pageSize) {
        this.$store.state.city.tablePage.currentPage = 1
      }
    },

    // 展示列表需要的步骤
    listTableDataFormatter(response) {
      // console.log("获取到的数据为: " + JSON.stringify(response))

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
        this.$XModal.message({ content: '修改失败', status: 'error' })
        this.getTableData()
      })
    },
    // 条件查询方法
    getFilterSiteData(siteName, web_bsm, siteClassifyValue, statusValue, cityId) {
      this.$store.state.city.loading = true
      // console.log('执行了common.vue 中的getFilterSiteData')

      if (this.$store.state.city.site_classify === 2 || this.$store.state.city.site_classify === 3 || this.$store.state.city.site_classify == 4) {
        this.$store.state.city.site_classify = -1
      }

      if (siteName == null) {
        siteName = ''
      }
      if (web_bsm == null) {
        web_bsm = ''
      }

      if (siteClassifyValue == null) {
        siteClassifyValue = ''
      }

      if (statusValue == null) {
        statusValue = ''
      }

      if (this.$store.state.city.city_id === 1 || this.$store.state.city.city_id === 10000) {
        cityId = ''
      }
      // alert("筛选条件为： siteName: " + siteName + ", web_bsm: " + web_bsm + ", siteClassifyValue: " + siteClassifyValue + ", statusValue: " + statusValue)

      // 当搜索的站点名称存在时
      if (siteName.length < 1 && web_bsm.length < 1 && siteClassifyValue.length < 1 && statusValue.length < 1) {
        this.getTableData()
      } else {
        // this.$store.state.city.tablePage.currentPage = 1
        // 按照筛选条件查询
        getFilterSiteDataBySiteNameWebBsmSiteClassifyStatus(siteName, web_bsm, siteClassifyValue, statusValue, cityId,
          this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize
        ).then(response => {
          // console.log("筛选出的结果是: " + JSON.stringify(response))
          this.$store.state.city.loading = false
          this.$store.state.city.siteList = response.results
          this.$store.state.city.totalCount = response.count
        }).catch(err => {
          // console.log("获取失败原因是： " + err)
          this.$store.state.city.loading = false
          this.$XModal.message({ content: '获取数据失败', status: 'error' })
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
