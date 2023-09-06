<template>
  <div class="city">
    <!--    :data="[{-->
    <!--    id: 10000,-->
    <!--    label: '城市',-->
    <!--    children: this.$store.state.city.henanCityList-->
    <!--    }]"-->
    <!--      :default-expanded-keys="$store.state.city.cities"-->
    <el-tree
      :data="userTree"
      accordion
      :default-expanded-keys="$store.state.department.departments"
      node-key="id"
      :props="defaultProps"
      @node-expand="changeCityId"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node" @click="changeCityId(data)">
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

  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex'
import { queryDepartmentTree } from '@/api/user'

export default {
  name: 'UserAside',
  components: {
  },
  data() {
    return {
      // data: [{
      //   id: 10000,
      //   label: '城市',
      //   children: this.$store.state.city.henanCityList
      // }],
      // henanCityList:[],
      departments: [-1],
      isActive: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      userTree: []
      // treeArr: this.$store.state.city.cities
    }
  },

  created() {
    this.departmentList()
  },
  methods: {

    handleNodeClick(data) {
      // alert("树形控件点击的数据为:===========>", JSON.stringify(data))
    },
    filterData(data) {

    },
    departmentList() {
      queryDepartmentTree().then(response => {
        this.userTree = [
          {
            'label': ' 部门',
            'id': -1,
            'children': response
          }
        ]
        // this.cityTree = response
        // console.log("部门树的数据为： " + JSON.stringify(response))
        // const departments = response
        this.departments = [-1]
      }).catch(err => {
        console.log('获取城市树失败原因： ' + err)
        this.$XModal.message({ content: '获取部门树数据失败', status: 'error' })
      })
    },

    ...mapMutations('department', { changeCityId: 'CHANGE' })
  },
  computed: {
    ...mapMutations('user', ['name'])
    // ...mapMutations('city', ['city_id']),
  },
  props: ['id']
}
</script>

<style scoped>

  .city {
    margin: 50px 10px;
  }

</style>
