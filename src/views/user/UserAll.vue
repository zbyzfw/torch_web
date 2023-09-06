<template>
  <div>
    <el-container>
      <el-aside width="280px">
        <UserAside />
      </el-aside>
      <el-main>
        <UserMain />
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
import UserAside from '@/views/user/UserAside'
import UserMain from '@/views/user/UserMain'

export default {
  name: 'SiteDetail',
  components: {
    UserAside,
    UserMain
  },
  data() {
    return {
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style scoped>

</style>
