<template>
  <div style="margin:20px 50px 50px 50px">

    <div style="margin-bottom: 10px; width: 100%">

      <el-card shadow="hidden">

        <!-- <vxe-select v-model="cityValue" style="margin-right: 50px; width: 220px; "
                    placeholder="请选择城市"
                    :options="cityOptions"
                    clearable
                    transfer></vxe-select>

        <vxe-select v-model="task_id" style="width: 220px; margin-right: 50px;margin-top: 5px"
                    placeholder="请选择普查阶段"
                    :options="timeTree"
                    clearable
                    transfer></vxe-select>

        <vxe-select v-model="siteClassifyValue" style="width: 220px; margin-right: 50px;margin-top: 5px"
                    placeholder="请选择站点类型"
                    :options="siteClassify"
                    clearable
                    transfer></vxe-select> -->

        <vxe-input
          v-model="search"
          style="margin-right: 50px;width: 220px; margin-top: 0px "
          clearable
          placeholder="请输入媒体名称"
        />
        <vxe-button
          style="margin-left: -20px; margin-right: 100px;margin-top: 0px"
          status="primary"
          @click="getMediaProofList(1, tablePage.pageSize, search,val1,val2,val3)"
        >搜索
        </vxe-button>

        <vxe-select v-model="val1" placeholder="是否合作" clearable transfer style="margin-left: 0; margin-right: 50px;margin-top: 0px" :options="cooperation_type" @change="getMediaProofList(1, tablePage.pageSize, search,val1,val2,val3)" />
        <vxe-select v-model="val2" placeholder="平台类型" clearable transfer style="margin-left: 0; margin-right: 50px;margin-top: 0px" :options="mediaClassify" @change="getMediaProofList(1, tablePage.pageSize, search,val1,val2,val3)" />
        <vxe-select v-model="val3" placeholder="城市" clearable transfer style="margin-left: 0; margin-right: 50px;margin-top: 0px" :options="cityOptions" @change="getMediaProofList(1, tablePage.pageSize, search,val1,val2,val3)" />
        <!-- <br> -->

      </el-card>
      <br>

      <!-- <vxe-button content="预览" style="margin-left: 0; margin-right: 50px;margin-top: 5px" @click="getTransReport" status="primary"></vxe-button>
      <vxe-modal v-model="dialogTableVisible" title="报告预览" width="900" height="700" show-zoom resize>
        <template #default>
          <div v-html="html"></div>
        </template>
      </vxe-modal> -->
      <vxe-table
        border
        show-header-overflow
        show-overflow
        :row-config="{isHover: true}"
        :data="tableData"
      >
        <!-- :columns="tableColumns"> -->
        <vxe-column field="id" title="序号" width="60" />
        <vxe-column field="media_name" title="媒体名称" />
        <vxe-column field="url" title="链接" />
        <vxe-column field="media_classify" title="平台类型" />
        <vxe-column field="title" title="标题" />
        <vxe-column field="pub_time" title="发布时间" />
        <vxe-column field="error_words" title="错词" />
        <vxe-column field="correct_words" title="正词" />
        <vxe-column field="con_text" title="上下文" />
        <vxe-column field="classify_name" title="错误类型" />
        <vxe-column field="aid" title="零采id" />
        <!-- <vxe-column field="city_id" title="城市"></vxe-column> -->
        <vxe-column field="director" title="负责人" />
      </vxe-table>
      <!-- <br> -->

      <vxe-pager
        perfect

        :loading="loading"
        :current-page="tablePage.currentPage"
        :page-size="tablePage.pageSize"
        :page-sizes="tablePage.pageSizes"
        :total="tablePage.totalResult"
        :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
        @page-change="handlePageChange"
      />

    </div>

  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import { queryCityList } from '@/api/t_city'
import { transReport } from '@/api/download'
import { mediaProofList } from '@/api/media_proof'
import { queryHistoryTime } from '@/api/t_score'
import { searchColumnBySiteIdAndKeyword } from '@/api/t_site_column'
import { VXETable } from 'vxe-table'

export default {
  data() {
    return {
      loading: false,
      val1: '',
      val2: '',
      tableData: [],
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [5, 10, 15, 20],
        totalResult: 0
      },
      search: '',
      html: '',
      dialogTableVisible: false,

      mediaClassify: [
        { label: '微信', value: '微信' },
        { label: '微博', value: '微博' },
        { label: '其他新媒体', value: '其他' }
      ],
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: [5, 10, 15, 20],
        totalResult: 0
      },

      cooperation_type: [
        { label: '非合作', value: 0 },
        { label: '合作', value: 1 }
      ],
      cityOptions: []

    }
  },
  computed: {
    // this.html = this.getTransReport(1)
  },
  created() {
    this.handlePageChange(1, 10)
    this.cityList()
  },
  destroyed() {

  },
  methods: {

    // 自动生成表格列配置方法
    generateTableColumns() {
      // 从第一行数据中获取所有列名
      const columnNames = XEUtils.keys(this.tableData[0])
      // 生成表格列配置
      this.tableColumns = columnNames.map(columnName => {
        return {
          field: columnName, // 列名对应的字段名
          title: columnName // 列名
          // 更多列配置项，可以根据实际需要添加
        }
      })
    },

    cityList() {
      queryCityList().then(response => {
        const data = response
        const classify = this.$store.state.city.classify
        // 城市列表数据
        const cityIdNames = data.filter(x => x.pid === 1).map(x => {
          return { value: x.id, label: x.name }
        })

        this.cityOptions = cityIdNames
      }).catch(err => {
        this.$XModal.message({ content: '获取城市数据失败', status: 'error' })
      })
    },

    getMediaProofList(currentPage, pageSize, search, is_cooperation, media_classify, city_id) {
      mediaProofList(currentPage, pageSize, search, is_cooperation, media_classify, city_id).then(response => {
        // console.log(response.results)
        this.tableData = response.results
        this.tablePage.totalResult = response.count
      }).catch(err => {
        console.log('获取失败原因是： ' + err)
      })
    },

    handlePageChange({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize

      this.getMediaProofList(currentPage, pageSize, this.search, this.val1, this.val2, this.val3)
    },
    getSelectEvent() {
      const selectRecords = this.$refs.xTable4.getCheckboxRecords()
      VXETable.modal.alert(selectRecords.length)
    },
    getSelectReserveEvent() {
      const selectReserveRecords = this.$refs.xTable4.getCheckboxReserveRecords()
      VXETable.modal.alert(selectReserveRecords.length)
    }

  }
}
</script>
<style lang="less" scoped>

</style>
