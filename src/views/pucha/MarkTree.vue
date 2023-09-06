<template>
  <div class="mark">
    <el-tree
      :data="markTree"
      node-key="id"
      :props="defaultProps"

      default-expand-all
      @node-click="changeMarkId($event)"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <el-badge v-if="data.have_data==true" is-dot class="item">
          {{ node.label }}
        </el-badge>
        <el-badge v-else class="item">
          {{ node.label }}
        </el-badge>
      </span>
    </el-tree>
  </div>
</template>
<script>
import request from '@/utils/request'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      markTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    ...mapMutations('city', { changePointId: 'changePointId' }),
    markList(site_id) {
      request({
        url: '/mon/monitor/tree?site_id=' + site_id + '',
        method: 'get'
      }).then((response) => {
        this.markTree = response
        // console.log("markTree", this.markTree);
      })
    },
    changeMarkId(point_id) {
      // console.log('point_id', point_id.id)
      // this.$store.state.city.point_id = point_id
      this.changePointId(point_id)
    }
  },
  created() {
    // console.log(
    //   "this.$store.state.city.mark_id",
    //   this.$store.state.city.mark_id
    // );
    this.markList(JSON.parse(sessionStorage.getItem('setDetail')).id)
  }
}
</script>
<style scoped>
.mark {
  margin: 50px 10px;
}
</style>
