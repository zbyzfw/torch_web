<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <markTree />
      </el-aside>
      <el-main>
        <MarkDetial />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import MarkTree from '@/views/pucha/MarkTree'
import MarkDetial from '@/views/pucha/MarkDetial'
export default {
  components: { MarkTree, MarkDetial },
  data() {
    return {}
  }
}
</script>
