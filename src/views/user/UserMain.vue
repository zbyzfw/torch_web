<template>
  <div style="margin:20px 50px 50px 0px">
    <el-container>
      <el-aside width="280px" style="background-color: rgb(255, 255, 255)">
        <el-tree
          highlight-current="true"
          :data="userTree"
          default-expand-all
          accordion
          :default-expanded-keys="department"
          node-key="id"
          :props="defaultProps"
          @node-click="ChickDepartment"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>
              <el-button
                id="isActive"
                type="text"
                size="medium"
                :class="data.children ? 'vxe-icon-flow-branch' : 'el-icon-s-custom'"
              />
            </span>
            <span>{{ node.label }}</span>
          </span>

        </el-tree>
      </el-aside>
      <el-main>

        <vxe-toolbar>
          <template #buttons>
            <!--        <vxe-input v-model="filterName1" type="search" placeholder="请输入要查询的用户名称" @keyup="search"></vxe-input>-->
            <vxe-button icon="fa fa-plus" status="primary" @click="insertEvent()">添加用户</vxe-button>
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
          :loading="loading"
          :data="tableData"
        >
          <vxe-column field="id" title="ID" min-width="80" />

          <vxe-column field="realname" min-width="150" title="真实姓名" />
          <vxe-column field="date_joined" title="创建时间" min-width="150" />
          <vxe-column field="last_login" title="最后一次登录时间" min-width="150" />

          <vxe-column title="状态" min-width="100">
            <template #default="{ row }">
              <vxe-switch v-model="row.status===0" :disabled="row.id===1" open-label="启用" close-label="禁用" @change="changeStatus(row)" />
            </template>
          </vxe-column>
          <vxe-column field="rate" title="操作" fixed="right" width="260px">
            <template #default="{ row }">
              <vxe-button type="text" icon="fa fa-edit" :disabled="row.id===1" status="primary" @click="editEvent(row)" />
            </template>
          </vxe-column>
        </vxe-table>

        <!--    分页-->
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

        <!--  添加站点,编辑站点-->
        <vxe-modal
          v-model="showEdit"
          :title="selectRow ? '编辑用户' : '添加用户'"
          width="600"
          min-width="400"
          min-height="300"
          :loading="submitLoading"
          resize
          destroy-on-close
        >
          <template #default>

            <vxe-form ref="formData" :data="formData" :rules="formRules" title-align="right" title-width="100">
              <vxe-form-item field="username" title="手机号: " :item-render="{}" :span="20">
                <template #default="{ data }">
                  <!--              <vxe-input v-model.trim="data.username" placeholder="请输入名字拼音"></vxe-input>-->
                  <vxe-input v-model.trim="data.username" placeholder="请输入手机号" />
                </template>
              </vxe-form-item>

              <vxe-form-item field="realname" title="真实姓名: " :item-render="{}" :span="20">
                <template #default="{ data }">
                  <vxe-input v-model.trim="data.realname" placeholder="请输入真实姓名" />
                </template>
              </vxe-form-item>

              <vxe-form-item field="email" title="邮箱: " :item-render="{}" :span="20">
                <template #default="{ data }">
                  <vxe-input v-model="data.email" placeholder="请输入邮箱" />
                </template>
              </vxe-form-item>

              <vxe-form-item field="department" title="部门: " :item-render="{}" :span="20">
                <template #default="{ data }">
                  <!--              <vxe-input v-model="data.department" placeholder="请输入部门"></vxe-input>-->
                  <vxe-select v-model="data.department" placeholder="请选择部门" :options="department" transfer clearable />
                </template>
              </vxe-form-item>

              <vxe-form-item field="roles" title="角色: " :item-render="{}" :span="20">
                <template #default="{ data }">
                  <!--              <vxe-input v-model="data.roles" placeholder="请输入角色"></vxe-input>-->
                  <vxe-select v-model="data.roles" placeholder="请选择角色" :options="roles" multiple transfer clearable />
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
      </el-main>
    </el-container>

  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import {
  deleteData,
  insertData,
  query,
  queryAll,
  updateData
} from '@/api/t_user'

import {
  queryColumnByCityIdAndSiteClassify
} from '@/api/t_site_column'
import { getPointListTree } from '@/api/point'

import { getRole } from '@/api/t_role'
import { getDepartment } from '@/api/t_department'
import service from '@/utils/request'
import { getUserInfo, queryDepartmentTree } from '@/api/user'

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

      cooperation_type: [
        { label: '非合作', value: 0 },
        { label: '合作', value: 1 }
      ],
      cityOptions: [],
      submitLoading: false,
      selectRow: null,
      showEdit: false,
      filterName1: '',
      userTree: [
        {
          'label': ' 部门',
          'id': -1,
          'children': []
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // mock_data:{
      //   "count": 1,
      //   "next": null,
      //   "previous": null,
      //   "results": [
      //     {
      //       "id": 1,
      //       "username": "dahe",
      //       "create_time": "2022-02-17 20:04:11",
      //       "update_time": "2022-02-24 12:28:14",
      //     },
      //   ]
      // },
      roles: [],
      department: null,
      web_level: [
        { label: '省', value: 0 },
        { label: '市', value: 1 },
        { label: '县', value: 2 },
        { label: '省直', value: 3 }
      ],
      site_classify: [
        { label: '门户网站', value: 0 },
        { label: '非门户网站', value: 1 },
        { label: '微信', value: 2 },
        { label: '微博', value: 3 },
        { label: '其他', value: 4 }
      ],
      status: [
        { label: '否', value: 1 },
        { label: '是', value: 0 }
      ],
      pucha_status: [
        { label: '未普查', value: 0 },
        { label: '完成首次普查', value: 1 },
        { label: '完成二次普查', value: 2 }
      ],
      is_site_nav: [
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
        id: '',
        realname: '',
        username: '',
        mobile: '',
        email: '',
        status: '',
        department: '',
        roles: []
      },
      formRules: {
        // username: [
        //   {required: true, message: '请输入用户名称'},
        //   {min: 2, max: 50, message: '输入长度在 2 到 50 个字'}
        // ],
        realname: [
          { required: true, message: '请输入真实姓名' },
          { min: 2, max: 50, message: '输入长度在 2 到 50 个字' }
        ],
        username: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' },
          {
            pattern: '^1[3456789]\\d{9}$',
            message: '请输入正确的手机号'
          }
        ],
        department: [
          { required: true, message: '请选择部门' }
        ],
        roles: [
          { required: true, message: '请选择角色' }
        ],
        email: [
          // { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          // { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
        // site_classify: [
        //   {required: true, message: '请选择网站类型'}
        // ],
        // web_status: [
        //   {required: true, message: '请选择网站状态'}
        // ],
      }
    }
  },
  computed: {},
  created() {
    // this.getAllUser()
    // this.getRoleTreeData()
    // this.getDepartmentTreeData()
    this.handlePageChange(1, 10, -1)
    this.getDepartmentList()
    // this.cityList()
  },
  mounted() {
    // console.log(this.$store.state.city_id)
  },

  methods: {
    // 获取部门树
    getDepartmentList() {
      queryDepartmentTree().then(response => {
        console.log(response)
        this.userTree = [
          {
            'label': ' 部门',
            'id': -1,
            'children': response
          }
        ]
        this.department = null
      }).catch(err => {
        this.$XModal.message({ content: '获取部门树数据失败', status: 'error' })
      })
    },
    // 分页部分

    handlePageChange(currentPage, pageSize, deaprtment) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize

      this.getAllUser(currentPage, pageSize, deaprtment)
    },
    getSelectEvent() {
      const selectRecords = this.$refs.xTable4.getCheckboxRecords()
      VXETable.modal.alert(selectRecords.length)
    },
    getSelectReserveEvent() {
      const selectReserveRecords = this.$refs.xTable4.getCheckboxReserveRecords()
      VXETable.modal.alert(selectReserveRecords.length)
    },

    // 加载数据
    getAllUser(currentPage, pageSize, deaprtment) {
      console.log(currentPage, pageSize, '----------------------------dasf')
      if (deaprtment == -1) { deaprtment = null }
      queryAll(currentPage, pageSize, deaprtment).then(response => {
        this.tableData = response.results
      }).catch(err => {
        this.$XModal.message({ content: '获取数据失败', status: 'error' })
      })
    },

    ChickDepartment(row) {
      console.log(row)
      if (row.id != -1) { this.deaprtment = row.id } else { this.deaprtment = -1 }
      this.handlePageChange(1, 10, this.deaprtment)
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
        username: '',
        realname: '',
        mobile: '',
        email: '',
        department: '',
        roles: []
      }
      this.selectRow = null
      this.showEdit = true
    },
    editEvent(row) {
      this.formData = {
        id: row.id,
        username: row.username,
        realname: row.realname,
        site_url: row.site_url,
        mobile: row.mobile,
        email: row.email,
        department: row.hasOwnProperty('deaprtment') ? row.department.id : null,
        roles: row.roles.map(x => {
          return x.id
        })

      }
      this.selectRow = row
      this.showEdit = true
    },
    async removeEvent(row) {
      const type = await this.$XModal.confirm('您确定要删除 【' + row.username + '】 ?')
      const $table = this.$refs.xTable
      if (type === 'confirm') {
        deleteData(row.id).then(response => {
          // console.log(response.data)
          this.$XModal.message({ content: '删除成功', status: 'success' })
          this.$store.state.city.tablePage.currentPage = 1
          this.getTableData()
        }).catch(err => {
          this.$XModal.message({ content: '删除失败', status: 'error' })
          this.$store.state.city.tablePage.currentPage = 1
          this.getTableData()
        })
      }
    },

    // 添加数据, 修改数据
    submitEvent(formName) {
      this.$refs['formData'].validate((valid) => {
        if (!valid) {
          this.submitLoading = true
          setTimeout(() => {
            const $table = this.$refs.xTable
            this.submitLoading = false
            this.showEdit = false
            if (this.selectRow) {
              updateData(this.selectRow.id, this.formData).then(response => {
                // console.log(response.data)
                this.$XModal.message({ content: '修改成功', status: 'success' })
                this.getTableData()
              }).catch(err => {
                this.$XModal.message({ content: '修改失败', status: 'error' })
                this.getTableData()
              })
            } else {
              insertData(this.formData).then(response => {
                // console.log(response)
                this.$XModal.message({ content: '添加成功', status: 'success' })
                this.getTableData()
              }).catch(response => {
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

    // 添加用户时, 用户部门获取
    getDepartmentTreeData(currentPage, pageSize) {
      getDepartment(currentPage, pageSize).then(response => {
        // console.log(("获取角色列表为： ============>" + JSON.stringify(response.results)))
        const data = response.results
        this.department = data.map(x => {
          return { 'label': x.name, 'value': x.id }
        })
        // console.log("获取department的值为" + JSON.stringify(this.department))
      }).catch(err => {
        this.$XModal.message({ content: '获取数据失败', status: 'error' })

        // console.log("获取department列表为失败的原因：===========> " + err)
      })
    },

    // 添加用户时, 用户角色获取
    getRoleTreeData(currentPage, pageSize) {
      getRole(currentPage, pageSize).then(response => {
        // console.log(("获取角色列表为： ============>" + JSON.stringify(response.results)))
        const data = response.results
        this.roles = data.map(x => {
          return { 'label': x.name, 'value': x.id }
        })
        // console.log("获取role的值为" +   JSON.stringify( this.roles))
      }).catch(err => {
        // console.log("获取角色列表为失败的原因：===========> " + err)
      })
    },

    // 修改是用户状态
    changeStatus(row) {
      // row.status = !row.status
      if (row.status === 0) {
        row.status = 1
        this.formData.status = 1
      } else if (row.status === 1) {
        row.status = 0
        this.formData.status = 0
      } else {
        alert('不可修改')
      }

      // console.log("status的值为", row.status)
      // console.log("点击的是否参与普查的数据为: ", JSON.stringify(row))

      this.formData = {
        id: row.id,
        username: row.username,
        realname: row.realname,
        site_url: row.site_url,
        mobile: row.mobile,
        email: row.email,
        status: row.status,
        department: row.department.id,
        roles: row.roles.map(x => {
          return x.id
        })
      }

      updateData(this.formData.id, this.formData).then(response => {
        // console.log(response.data)
        this.$XModal.message({ content: '修改成功', status: 'success' })
        this.getTableData()
      }).catch(err => {
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
