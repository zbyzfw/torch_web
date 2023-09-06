<template>
  <div style="margin: 20px 50px 50px 50px">
    <el-card class="box-card"> 大河网智慧普查数据中心 </el-card>
    <vxe-table v-show="states==1" border align="center" :data="tableData">
      <vxe-column field="id" title="序号" width="100" />
      <vxe-column field="time" title="监测时间" />
      <vxe-column field="column" title="监测栏目" />
      <vxe-column field="url" title="问题链接" show-overflow />
      <vxe-column field="desc" title="问题描述" />
      <vxe-column field="snapshoot" title="快照" />
      <vxe-column field="standard" title="检查标准" show-overflow />
      <vxe-column field="operation" title="操作">
        <template #default="{ row }">
          <vxe-button type="text" status="primary">{{ row.modify==1?"已修改":"未修改" }}</vxe-button>
          <vxe-button v-if="permissions.includes('admin')==true" type="text" icon="fa fa-trash-o" status="danger" @click="removeEvent(row)" />
        </template>
      </vxe-column>
    </vxe-table>

    <!--    分页-->
    <vxe-pager
      v-show="states==1"
      perfect
      :loading="this.$store.state.city.loading"
      :current-page.sync="page1.currentPage"
      :page-size.sync="page1.pageSize"
      :total="page1.totalResult"
      :layouts="[
        'PrevPage',
        'JumpNumber',
        'NextPage',
        'FullJump',
        'Sizes',
        'Total',
      ]"
      @page-change="handleCurrentChange"
    />

    <vxe-table v-show="states!=1" align="center" border :data="tableData1">
      <vxe-column field="id" title="序号" width="60" />
      <vxe-column field="create_time" title="监测时间" show-overflow />
      <vxe-column field="column_name" title="监测栏目" />
      <vxe-column field="column_url" title="栏目链接" show-overflow />
      <vxe-column field="desc" title="问题描述" />
      <vxe-column field="snapshot" title="快照" show-overflow />
      <vxe-column field="contact_name" title="紧急联系人姓名" />
      <vxe-column field="contact_phone" title="紧急联系人手机号" />
      <vxe-column field="first_warning_time" title="首次预警时间" show-overflow />
      <vxe-column field="warning_number" title="预警次数" show-overflow />
      <vxe-column field="is_rectify" title="名称" type="html" min-width="30">
        <template #default="{ row }">
          <span v-if="row.is_rectify==0">未整改</span>
          <span v-if="row.is_rectify==1">已整改</span>
        </template>
      </vxe-column>

    </vxe-table>
    <!--    分页-->
    <vxe-pager
      v-show="states!=1"
      perfect
      :loading="this.$store.state.city.loading"
      :current-page.sync="page2.currentPage"
      :page-size.sync="page2.pageSize"
      :total="page2.totalResult"
      :layouts="[
        'PrevPage',
        'JumpNumber',
        'NextPage',
        'FullJump',
        'Sizes',
        'Total',
      ]"
      @page-change="handleCurrentChange1"
    />
  </div>
</template>
<script>
import request from '@/utils/request'
import { mapState } from 'vuex'
import { deleteScoreData } from '@/api/point'
export default {
  data() {
    return {
      point_id: this.$store.state.city.point_id,
      site_id: JSON.parse(sessionStorage.getItem('setDetail')).id,
      score_classify: this.$store.state.city.score_classify,
      tableData: [],
      tableData1: [],
      page1: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      page2: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      states: 1
    }
  },
  created() {
    // console.log('this.$store.state.city.score_classify',this.$store.state.city.score_classify)
    this.getData()
  },
  methods: {
    async removeEvent(row) {
      const type = await this.$XModal.confirm('您确定要删除监测栏目 【' + row.column + '】 ?')
      const $table = this.$refs.xTable

      if (type === 'confirm') {
        // 删除

        deleteScoreData(row.id).then(response => {
          this.$XModal.message({ content: '删除成功', status: 'success' })
          this.getData()
        }).catch(err => {
          this.$XModal.message({ content: '删除失败', status: 'error' })
          this.getData()
        })
      }
    },
    getData() {
      request({
        // url: "/mon/monitor/detail?site_id=422&score_classify=2&point_id=16",
        // url: "/mon/monitor/detail?site_id=422&score_classify=2&point_id=8&page="+ this.page1.currentPage+ "&size=10",
        url:
          '/mon/monitor/detail?site_id=' +
          this.site_id +
          '&score_classify=' +
          this.score_classify +
          '&point_id=' +
          this.point_id +
          '&page=' + this.page1.currentPage + '&size=10',
        method: 'get'
      }).then((response) => {
        this.tableData = response.results
        this.page1.totalResult = response.count
        // console.log(this.tableData);
      })
    },
    getOtherData() {
      request({
        url:
          '/api/earlywarning/?site_id=' +
          this.site_id +
          '&page=' + this.page2.currentPage + '&size=10',
        method: 'get'
      }).then((response) => {
        this.tableData1 = response.results
        this.page2.totalResult = response.count
        // console.log(this.tableData);
      })
    },
    handleCurrentChange({ currentPage }) {
      // console.log(currentPage)
      this.page1.currentPage = currentPage
      this.getData()
    },
    handleCurrentChange1({ currentPage }) {
      console.log(currentPage)
      this.page2.currentPage = currentPage
      this.getOtherData()
    }
  },
  computed: {
    ...mapState('user', ['permissions']),
    grtPointId() {
      return this.$store.state.city.point_id
    }
  },
  watch: {
    grtPointId(newVal, oldVal) {
      this.page1.currentPage = 1
      this.page2.currentPage = 1
      this.score_classify = this.$store.state.city.score_classify
      if (newVal == '1000' || newVal == '-4') {
        this.states = 2
        this.getOtherData()
      } else {
        this.states = '1'
        this.point_id = newVal
        this.getData()
      }
    }
  }
}
</script>
