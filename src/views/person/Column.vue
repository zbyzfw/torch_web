<template>
  <div style="margin:20px 50px 50px 50px">

    <!--            点击的城市id为: {{$store.state.city.city_id}}-->
    <!--    数组长度为: {{$store.state.city.totalCount}}-->

    <!--        {{$store.state.city.siteInfo}}-->

    <el-card class="box-card">
      大河网智慧普查数据中心 - {{ $store.state.city.siteInfo.site_name }}
    </el-card>

    <vxe-toolbar style="margin-top: 0; margin-bottom: 0; display: inline-block; width: 100%">
      <template #buttons>
        <span>
          <vxe-input v-model="filterName1" style="margin-right: 30px; margin-top: 5px; margin-bottom: 5px" type="search" placeholder="请输入要查询的栏目名称" @focus="changePage" @keyup="search" />
          <vxe-button style="margin-left: 0;margin-right: 30px;margin-bottom: 5px" icon="fa fa-plus" status="primary" @click="insertEvent()">添加栏目</vxe-button>
          <vxe-button style="margin-left: 0;margin-right: 30px;margin-bottom: 5px" icon="el-icon-back" status="primary" @click="backToSiteList()">返回</vxe-button>
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

      <vxe-column field="column_name" title="栏目名称" type="html" min-width="150">
        <template #default="{ row }">
          <a :href="row.column_url" target="_black">{{ row.column_name }}</a>
        </template>
      </vxe-column>
      <vxe-column field="point_name" title="栏目类别" min-width="100" />

      <vxe-column field="column_url" title="栏目链接" type="html" min-width="220">
        <template #default="{ row }">
          <a :href="row.column_url" target="_black">{{ row.column_url }}</a>
        </template>
      </vxe-column>

      <!--      <vxe-column field="status" title="状态" :formatter="formatterWebStatus"></vxe-column>-->
      <!--      <vxe-column field="site_classify" title="站点类型" width="6%" :formatter="formatterSiteClassify"></vxe-column>-->
      <!--      <vxe-column field="web_level" title="网站级别" width="6%" :formatter="formatterweb_level"></vxe-column>-->
      <!--      <vxe-column field="city_id" title="城市id"></vxe-column>-->
      <!--      <vxe-column field="site_bsm" title="站点标识码" width="7%" type="html"></vxe-column>-->
      <!--      <vxe-column field="web_bsm" title="网站标识码" width="7%" type="html"></vxe-column>-->
      <vxe-column field="update_time" title="更新时间" min-width="150" />

      <vxe-column title="是否采集" min-width="100">
        <template #default="{ row }">
          <vxe-switch v-model="row.status===1" open-label="是" close-label="否" @change="changeStatus(row)" />
        </template>
      </vxe-column>
      <!--            <vxe-column field="is_home_page" title="是否是门户" :formatter="formatterHomePage"></vxe-column>-->
      <vxe-column field="column_status" :formatter="formatterColumnStatus" title="栏目状态" min-width="100" />

      <vxe-column field="rate" title="操作" fixed="right" width="220px">
        <template #default="{ row }">
          <vxe-button
            v-show="row.point_column_classify !==0"
            type="text"

            status="success"
            @click="editRule(row)"
          >配置规则
          </vxe-button>
          <!--          <vxe-button type="text" icon="el-icon-tickets" @click="showNews(row)" status="primary"></vxe-button>-->
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

    <!--  添加栏目,编辑栏目-->
    <vxe-modal
      v-model="showEdit"
      :title="selectRow ? '编辑栏目 - '+$store.state.city.siteInfo.site_name : '添加栏目 - '+$store.state.city.siteInfo.site_name"
      width="600"
      min-width="400"
      min-height="300"
      :loading="submitLoading"
      resize
      destroy-on-close
    >
      <template #default>
        <vxe-form ref="formData" :data="formData" :rules="formRules" title-align="right" title-width="100">
          <vxe-form-item field="" title="站点id" :item-render="{}" :span="20" :visible="false">
            <template #default="{ data }">
              <vxe-input v-model.number="$store.state.city.siteInfo.id" placeholder="请输入栏目名称" />
            </template>
          </vxe-form-item>

          <vxe-form-item field="column_name" title="栏目名称: " :item-render="{}" :span="20">
            <template #default="{ data }">
              <vxe-input v-model.trim="data.column_name" placeholder="请输入栏目名称" />
            </template>
          </vxe-form-item>

          <!--          <vxe-form-item field="" title="栏目类别: " :item-render="{}" :span="20">-->
          <!--            <template #default="{ data }">-->
          <!--              <vxe-input v-model="data.point_name" placeholder="请输入栏目类别"></vxe-input>-->
          <!--            </template>-->
          <!--          </vxe-form-item>-->

          <vxe-form-item field="column_url" title="栏目链接: " :item-render="{}" :span="20">
            <template #default="{ data }">
              <vxe-input v-model="data.column_url" placeholder="请输入栏目链接" />
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

          <!--          <vxe-form-item field="" title="站点级别: " :item-render="{}" :span="20">-->
          <!--            <template #default="{ data }">-->
          <!--              <vxe-select v-model="data.web_level" transfer>-->
          <!--                <vxe-option v-for="level in web_level" :key="level.value" :value="level.value"-->
          <!--                            :label="level.label"></vxe-option>-->
          <!--              </vxe-select>-->
          <!--            </template>-->
          <!--          </vxe-form-item>-->

          <!--          <vxe-form-item field="" title="城市id: " :item-render="{}" :span="20">-->
          <!--            <template #default="{ data }">-->
          <!--              <vxe-input v-model="data.city_id" placeholder="请输入站点所属城市id"></vxe-input>-->
          <!--            </template>-->
          <!--          </vxe-form-item>-->

          <!--          <vxe-form-item field="" title="城市id: " :item-render="{}" :span="20" :visible="true">-->
          <vxe-form-item field="" title="城市id: " :item-render="{}" :span="20" :visible="false">
            <template #default="{ data }">
              <vxe-input v-model="$store.state.city.siteInfo.city" placeholder="请输入站点所属城市id" />

              <!--          <vxe-select v-model="data.city_id" transfer>-->
              <!--                <vxe-option v-for="c_id in city_id" :key="c_id.value" :value="c_id.value"-->
              <!--                            :label="c_id.label"></vxe-option>-->
              <!--              </vxe-select>-->
            </template>
          </vxe-form-item>

          <!--          <vxe-form-item field="" title="point_id: " :item-render="{}" :span="20">-->
          <!--            <template #default="{ data }">-->
          <!--              <vxe-input v-model="data.point_id" placeholder="栏目类别的id"></vxe-input>-->
          <!--            </template>-->
          <!--          </vxe-form-item>-->

          <vxe-form-item field="point_id" title="栏目类别: " :item-render="{}" :span="20">
            <template #default="{ data }">
              <!--              <vxe-select v-model="data.point_id" placeholder="栏目类别" :option-groups="pointTree" :disabled="selectRow" clearable transfer></vxe-select>-->
              <!--              <vxe-select v-model="data.point_id" placeholder="栏目类别" :option-groups="pointTree" :disabled="selectRow" clearable transfer></vxe-select>-->

              <!--              <span v-html="formatProgram(row.is_program)"></span>-->
              <!--              style="white-space:pre"-->

              <vxe-select
                v-model="data.point_id"
                placeholder="栏目类别"
                :options="pointTree"
                :disabled="selectRow"
                transfer
              />

            </template>
          </vxe-form-item>

          <!--          <vxe-form-item field="" title="栏目类别: " :item-render="{}" :span="20">-->
          <!--            <template #default="{ data }">-->
          <!--              <vxe-select v-model="data.point_id" transfer>-->
          <!--                <vxe-option v-for="pid in point_id" :key="pid.value" :value="pid.value"-->
          <!--                            :label="pid.label"></vxe-option>-->
          <!--              </vxe-select>-->
          <!--            </template>-->
          <!--          </vxe-form-item>-->

          <vxe-form-item field="" title="站点类型: " :item-render="{}" :span="20" :visible="false">
            <template #default="{ data }">
              <vxe-input v-model="data.type" placeholder="门户网站,非门户网站,微信,微博" />
            </template>
          </vxe-form-item>

          <!--                    <vxe-form-item field="" title="创建时间: " :item-render="{}" :span="20">-->
          <!--                      <template #default="{ data }">-->
          <!--                        <vxe-input v-model="data.create_time" disabled></vxe-input>-->
          <!--                      </template>-->
          <!--                    </vxe-form-item>-->

          <vxe-form-item field="is_home_nav" title="在首页是否有导航入口: " :item-render="{}" :span="20">
            <template #default="{ data }">
              <vxe-select v-model="data.is_home_nav" transfer>
                <vxe-option
                  v-for="homePage in is_home_nav"
                  :key="homePage.value"
                  :value="homePage.value"
                  :label="homePage.label"
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

    <!--    动态要闻类栏目规则配置-->
    <!-- <dong-tai-yao-wen :formData="formData" :show-dong-tai-yao-wen-rule="showDongTaiYaoWenRule" @closedongtaiyaowen="closedongtaiyaowen"/> -->
    <!--    <vxe-modal v-if="rules.rules" v-model="showDongTaiYaoWenRule" :title=" formData.column_name + ' - 设置栏目规则： ' "-->
    <!--               width="850" :height="Object.keys(rules.rules).length * 44 + 431"-->
    <!--               :loading="submitLoading"-->
    <!--               resize destroy-on-close>-->

    <vxe-modal
      v-if="rules.rules"
      v-model="showDongTaiYaoWenRule"
      :title=" formData.column_name + ' - 设置栏目规则： ' "
      width="850"
      :loading="submitLoading"
      resize
      destroy-on-close
    >

      <vxe-form
        ref="rules"
        :data="rules"
        :items="formItems4"
        :rules="Rules"
        title-align="right"
        title-width="200"
        :loading="rulesLoading"
      >
        <template #myregion="{ data }">
          <div v-for="(item,index) in data.rules" :key="index" field="rule" style="margin-left:10px; margin-top: 10px ">

            <span style="display: inline-block; width: 180px; text-align: right;" v-html="getStr(index)" />

            <vxe-input
              v-model="data.rules[index]"
              placeholder="请填写配置规则"
              style="width: 320px;margin-left:20px;margin-right:20px"
            />

            <vxe-radio-group :value="(index[0]=='x')?'0':'1'" @change="changeRules($event,item,index)">
              <vxe-radio label="0" content="xpath" />
              <vxe-radio label="1" content="正则" />
            </vxe-radio-group>
          </div>
        </template>

        <template #mybutton="{ data }">
          <div style="text-align: center;">
            <vxe-button type="submit" @click="submitForm(data)">提交</vxe-button>
            <vxe-button type="submit" status="primary" @click="testRules(data)">测试</vxe-button>
            <vxe-button @click="closeRule">取消</vxe-button>
          </div>
        </template>
      </vxe-form>
    </vxe-modal>

    <!--    测试栏目规则抓取数据显示-->
    <vxe-modal
      v-model="showScrapyData"
      :title=" formData.column_name + ' - 测试抓取数据展示： ' "
      width="850"
      min-width="400"
      min-height="300"
      :loading="submitLoading"
      destroy-on-close
      resize
    >

      <!--                  {{ testRuleData }}-->
      <!--      {{ rules }}-->
      <!--      {{formItems5}}-->
      <!--      测试-->

      <template #default>
        <vxe-form v-model="testRuleData">
          <vxe-form-item align="left" title-align="left" :span="24">
            <div v-for="(item,index) in testRuleData" :key="index" style="margin-top:10px;margin-left: 5%">
              <span style="display: inline-block; width: 120px; text-align: right">{{ getStrTest(index) + ' ' }}</span>
              <!--                        {{index}}-->
              <!--              {{item.split(',').map(x=> {'\n+x'})}}-->
              <vxe-textarea
                :value="item"
                placeholder="无数据"
                :autosize="{ minRows: 2, maxRows: 3 }"
                style="width: 320px;margin-left:20px;margin-right:20px"
              />

              <!--              {{item.toString().length === 0}}-->
              <!--              {{// Object.keys(item).length}}-->
              <!--              共 {{ item.toString().length !== 0 ? item.toString().split(",").length : 0 }} 条数据-->
              共 {{ item.toString().length !== 0 ? Object.keys(item).length : 0 }} 条数据
            </div>
          </vxe-form-item>

          <vxe-form-item align="center" title-align="left" :span="24">
            <template #default>
              <vxe-button type="submit" @click="closeShowScrapyData()">关闭</vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>

    </vxe-modal>

  </div>
</template>

<script>
import XEUtils from 'xe-utils'
// import {deleteData, insertData, query, queryAll, queryByCityId, updateData} from "@/api/t_site"
import { getPointListTree } from '@/api/point'
import {
  queryColumnBySiteId,
  insertData,
  updateData,
  deleteData,
  query,
  queryByCityIdAndColumnName,
  searchColumnBySiteIdAndKeyword
} from '@/api/t_site_column'
import {
  queryColumn,
  queryColumnConfig,
  updateColumnConfig,
  insertColumnConfig,
  testColumnRule
} from '@/api/t_site_column_config'
import DongTaiYaoWen from '@/views/rule/DongTaiYaoWen'
import { getColumnClassifyByIsProgram } from '@/api/point'

export default {

  components: {
    DongTaiYaoWen
  },

  data() {
    return {
      rules: {
        id: null,
        url: null,
        point_id: null,
        is_async: 0,
        is_dtl_rule_diff: 0,
        is_have_dtl_list: 0,
        is_indtl: 0,
        is_web_buffer: 0,
        buffer_time: 0,
        status: 0
      },
      ruleData: {
        'xpath_title': '标题',
        're_title': '标题',
        'xpath_url': '链接',
        'xpath_pub_time': '发布时间',
        'xpath_content': '正文',
        're_url': '链接',
        're_pub_time': '发布时间',
        're_content': '正文',
        're_govwebzc': '我为政府网站找错',
        'xpath_govwebzc': '我为政府网站找错',
        're_partygov_bs': '党政机关标识',
        're_web_bsm': '网站标识码',
        're_icp': 'ICP备案号',
        're_public_security_babs': '公安机关备案标识',
        're_sponsor': '网站主办单位',
        'xpath_contact': '联系方式',
        'xpath_partygov_bs': '党政机关标识',
        'xpath_web_bsm': '网站标识码',
        'xpath_icp': 'ICP备案号',
        'xpath_public_security_babs': '公安机关备案标识',
        'xpath_sponsor': '网站主办单位',
        're_contact': '联系方式',
        'xpath_leader_name': '领导姓名',
        'xpath_leader_resume': '领导简历',
        'xpath_leader_work': '领导主管或分管工作',
        're_leader_name': '领导姓名',
        're_leader_resume': '领导简历',
        're_leader_work': '领导主管或分管工作',
        'xpath_question': '留言内容',
        'xpath_question_time': '留言时间',
        'xpath_answer_unit': '回复单位',
        'xpath_answer_time': '回复时间',
        'xpath_answer': '回复内容',
        're_question': '留言内容',
        're_question_time': '留言时间',
        're_answer_unit': '回复单位',
        're_answer_time': '回复时间',
        're_answer': '回复内容',
        'xpath_organ_name': '机构名称',
        're_organ_name': '机构名称'
      },
      ruleData1: {
        'title': '标题',
        'url': '链接',
        'date': '发布时间',
        'pub_time': '发布时间',
        'content': '正文',
        'govwebzc': '我为政府网站找错',
        'partygov_bs': '党政机关标识',
        'web_bsm': '网站标识码',
        'icp': 'ICP备案号',
        'public_security_babs': '公安机关备案标识',
        'sponsor': '网站主办单位',
        'contact': '联系方式',
        'leader_name': '领导姓名',
        'leader_resume': '领导简历',
        'leader_work': '领导主管或分管工作',
        'question': '留言内容',
        'question_time': '留言时间',
        'answer_unit': '回复单位',
        'answer_time': '回复时间',
        'answer': '回复内容',
        'organ_name': '机构名称'
      },
      // 添加栏目时用到的指标树
      pointTree: '',
      testRuleData: '',
      formItems4: [
        {
          align: 'center',
          span: 24,
          children: [
            {
              field: 'is_async',
              align: 'left',
              title: '是否异步',
              span: 24,
              itemRender: { name: '$radio', options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] }
            },
            // {
            //   field: 'is_dtl_rule_diff',
            //   align: 'left',
            //   title: '详情页规则不一致',
            //   span: 24,
            //   itemRender: {name: '$radio', options: [{label: '是', value: 1}, {label: '否', value: 0}]}
            // },
            // {
            //   field: 'is_have_dtl_list',
            //   align: 'left',
            //   title: '详情页列表获取还是单个获取',
            //   span: 24,
            //   itemRender: {name: '$radio', options: [{label: '是', value: 1}, {label: '否', value: 0}]}
            // },
            {
              field: 'is_indtl',
              align: 'left',
              title: '是否进入详情页',
              span: 24,
              itemRender: { name: '$radio', options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] }
            },
            {
              field: 'is_web_buffer',
              align: 'left',
              title: '打开网页有浏览器检查中',
              span: 10,
              itemRender: { name: '$radio', options: [{ label: '是', value: 1 }, { label: '否', value: 0 }] }
            },
            {
              field: 'buffer_time',
              align: 'left',
              title: '检查时间',
              span: 10,
              itemRender: { name: '$input', props: { type: 'number', placeholder: '单位为秒' }}
            },
            { field: 'rules', span: 24, slots: { default: 'myregion' }},
            {
              field: 'status',
              align: 'left',
              title: '栏目状态',
              span: 24,
              itemRender: {
                name: '$radio',
                options: [{ label: '正常', value: 0 }, { label: '维护中', value: 1 }, { label: '空白栏目', value: 2 }, {
                  label: '死链',
                  value: 3
                }]
              }
            }

          ]
        },
        { align: 'left', span: 24, slots: { default: 'mybutton' }}
      ],
      // formItems5: [
      //   {
      //     align: 'center',
      //     span: 24,
      //     children: [
      //       {field: 'rules', span: 24, slots: {default: 'myregion'}},
      //     ]
      //   },
      //   {align: 'center', span: 24, slots: {default: 'mybutton'}}
      // ],

      formItems6: [
        {
          align: 'center',
          span: 24,
          children: [
            { field: 'testRuleData', span: 24, slots: { default: 'myregion' }}
          ]
        }
        // {align: 'center', span: 24, slots: {default: 'mybutton'}}
      ],
      rulesLoading: false,
      submitLoading: false,
      selectRow: null,
      showEdit: false,
      showDongTaiYaoWenRule: false,
      showWangZhanBiaoShiRule: false,
      showJiGouZhiNengRule: false,
      showLingDaoXinXiRule: false,
      showLiuYanGongKaiRule: false,
      showScrapyData: false,
      filterName1: '',
      status: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ],
      point_id: [],
      is_home_nav: [
        { label: '没有导航入口', value: 0 },
        { label: '有导航入口没有列表', value: 1 },
        { label: '有导航入口有列表', value: 2 }
      ],
      column_status: [
        { label: '正常', value: 0 },
        { label: '维护中', value: 1 },
        { label: '空白栏目', value: 2 },
        { label: '死链', value: 3 }
      ],
      formData: {
        id: '',
        site_id: '',
        column_name: '',
        point_name: '',
        column_url: '',
        status: '',
        // site_classify: '',
        // web_level: 0,
        city_id: '',
        type: '',
        // web_bsm: '',
        update_time: '',
        is_home_nav: '',
        point_id: ''
      },

      formRules: {
        // 先展示site_column_classify_id 字段, 占个位置
        column_name: [
          { required: true, message: '请输入栏目名称' },
          { min: 2, max: 100, message: '输入长度在 2 到 100 个字' }
        ],
        column_url: [
          { required: true, message: '请输入栏目链接' }
        ],
        // site_classify: [
        //   {required: true, message: '请选择网站类型'}
        // ],
        status: [
          { required: true, message: '请选择是否采集' }
        ],
        point_id: [
          { required: true, message: '请选择栏目类别' }
        ],
        is_home_nav: [
          { required: true, message: '请选择首页是否有导航入口' }
        ]
      },
      Rules: {
        name: [
          { required: true, message: '请输入配置规则' }
        ]
      }
    }
  },
  computed: {
    column_url_rule_value(items) {
      return (items) => {
        if (items[0] == 'x') {
          return '0'
        } else if (items[0] == 'r') {
          return '1'
        }
      }
    }
  },
  created() {
    // 加载全部数据
    this.getTableData()
    this.getColumnClassify()
    this.getTreeData(this.$store.state.city.siteInfo.site_classify)
  },
  mounted() {
    // console.log(this.$store.state.city_id)

  },
  methods: {

    // 站点下栏目搜索功能(栏目名称或栏目url)
    search(page) {
      const filterName = XEUtils.toValueString(this.filterName1).trim().toLowerCase()
      // const data = require("../../../tests/mock_data/site_data.json").data.records
      const id = this.$store.state.city.siteInfo.id
      if (filterName) {
        searchColumnBySiteIdAndKeyword(id, filterName, this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
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

    // 点击搜索框, 回到列表初始状态
    changePage() {
      this.$store.state.city.tablePage.currentPage = 1
      this.getTableData()
    },

    // 分页部分
    // 页数改变时触发
    handleCurrentChange({ currentPage, pageSize }) {
      // console.log("传递的currentPage为: " + currentPage, "传递的pageSize为: " + pageSize)
      this.$store.state.city.tablePage.currentPage = currentPage
      this.$store.state.city.tablePage.pageSize = pageSize
      if (this.$store.state.city.pageIsOrNot) {
        this.search(this.$store.state.city.tablePage.currentPage)
      } else {
        this.$store.state.city.tablePage.currentPage = currentPage
        this.getTableData(this.$store.state.city.tablePage.currentPage)
      }
    },

    // 打开页面时加载数据
    getTableData(page) {
      this.$store.state.city.pageIsOrNot = false // 表明此时为加载全部数据
      this.$store.state.city.loading = true

      const changeId = this.$store.state.city.city_id
      const id = this.$store.state.city.siteInfo.id

      queryColumnBySiteId(id, this.$store.state.city.tablePage.currentPage, this.$store.state.city.tablePage.pageSize).then(response => {
        // console.log("queryColumnBySiteId(id)查询出的数据为: =======================>", JSON.stringify(response))
        this.$store.state.city.loading = false
        this.$store.state.city.siteList = response.results
        this.$store.state.city.totalCount = response.count
        // this.$store.state.city.siteList = this.$store.state.city.siteList.slice((this.$store.state.city.tablePage.currentPage - 1) * this.$store.state.city.tablePage.pageSize, this.$store.state.city.tablePage.currentPage * this.$store.state.city.tablePage.pageSize)
      }).catch(err => {
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
    formatterColumnStatus({ cellValue }) {
      const item = this.column_status.find(item => item.value === cellValue)
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
        site_id: this.$store.state.city.siteInfo.id,
        column_name: '',
        // 栏目类别  先展示site_column_classify_id 字段, 占个位置
        point_name: '',
        column_url: '',
        status: 1,
        // site_classify: '',
        // web_level: '',
        city_id: this.$store.state.city.siteInfo.city,
        type: this.$store.state.city.siteInfo.site_classify,
        // web_bsm: '',
        update_time: '',
        is_home_nav: '',
        point_id: ''
      }
      this.selectRow = null
      this.showEdit = true

      this.getTreeData()
    },
    editEvent(row) {
      this.formData = {
        id: row.id,
        site_id: row.site_id,
        column_name: row.column_name,
        // 先展示site_column_classify_id 字段, 占个位置
        point_name: row.point_name,
        site_url: row.site_url,
        column_url: row.column_url,
        status: row.status,
        // site_classify: row.site_classify,
        // web_level: row.web_level,
        city_id: row.city_id,
        type: row.type,
        // web_bsm: row.web_bsm,
        update_time: row.update_time,
        is_home_nav: row.is_home_nav,
        point_id: row.point_id
      }
      this.selectRow = row
      this.showEdit = true
    },
    async removeEvent(row) {
      // alert("提示")

      // const type = await this.$confirm('您确定要删除 ' + row.site_name + ' ?')
      const type = await this.$XModal.confirm('您确定要删除 【' + row.column_name + '】 ?')
      const $table = this.$refs.xTable

      if (type === 'confirm') {
        // 删除, 模拟
        // $table.remove(row);
        // this.$XModal.message({content: '删除成功', status: 'success'})

        // 删除
        // console.log("要删除的id值为: ===========" + JSON.stringify(row.column_name))
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
                // console.log("栏目数据添加失败原因: " + err)
                // console.log("栏目 insertData(params) 添加数据失败")
                this.$XModal.message({ content: '已存在, 添加失败', status: 'error' })
                this.getTableData()
              })
            }
          }, 500)
        } else {
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
        params: {
          data: row
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

    // 返回站点列表
    backToSiteList() {
      this.$store.state.city.columnValue = 0
      this.$store.state.city.tablePage.currentPage = 1
      // console.log("返回站点列表页的站点信息为======================> ", this.$store.state.city.siteInfo)

      // console.log("返回站点列表页的此时的city_id为: " , this.$store.state.city.siteInfo.city_id)
    },

    // 修改是否参与采集的状态
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
      // console.log("点击的是否参与采集的数据为: ", JSON.stringify(row))
      // 修改数据库中的值
      updateData(row.id, row).then(response => {
        // console.log(response.data)
        this.$XModal.message({ content: '修改成功', status: 'success' })
        this.getTableData()
      }).catch(err => {
        // console.log("GradeDetail 站点 是否参与采集 修改失败原因: " + err)
        // console.log("GradeDetail 站点 是否参与采集 changeStatus(row) 修改数据失败")
        this.getTableData()
      })
    },
    // 设置栏目规则
    editRule(row) {
      // console.log(row)
      this.rulesLoading = false
      queryColumn(row.site_id, row.column_url, row.column_name).then(response => {
        this.formData = response[0]
        queryColumnConfig(response[0].id).then(response => {
          this.rules = response[0]
          this.rules.url = row.column_url
          this.rules.point_id = row.point_id
          // const rules =
          var arr = this.rules.rules.replace(/"/g, `'`)
          arr = arr.replace(/!!}|{!!/g, `"`)
          var arr1 = arr.split('##')
          window.eval('formrules = {}')
          for (let i = 0; i < arr1.length; i++) {
            window.eval('formrules.' + arr1[i])
          }
          this.rules.rules = formrules
          this.showDongTaiYaoWenRule = true
        })
      }).catch(err => {
        this.$XModal.message({ content: '操作失败', status: 'error' })
      })
    },
    submitForm(row) {
      // console.log("提交的规则是========》", JSON.stringify(row))
      var rule = ``
      // 响应式数据转换为非响应
      const rules = JSON.parse(JSON.stringify(row))
      for (var index in row.rules) {
        rule = rule + index + '={!!' + row.rules[index] + '!!}##'
      }
      rules.rules = rule.slice(0, -2)
      updateColumnConfig(row.id, rules).then(response => {
        this.$XModal.message({ content: '操作成功', status: 'success' })
      }).catch(err => {
        this.$XModal.message({ content: '操作失败', status: 'error' })
      })

      this.showDongTaiYaoWenRule = false
      this.search()
      // this.getTableData()
    },

    // 获取栏目类别
    getColumnClassify() {
      getColumnClassifyByIsProgram().then(response => {
        this.point_id = response.filter(x => x.pid !== null).map(x => {
          return { label: x.point_name, value: x.id }
        })
        // console.log("获取的栏目类别为: ===========>", JSON.stringify(response))
      })
    },

    changeRules(label, item, index) {
      // console.log(label, item, index)
      const rules = {}
      if (label.label == '0') {
        const newkey = index.replace('re_', 'xpath_')
        for (var key in this.rules.rules) {
          if (key == index) {
            rules[newkey] = this.rules.rules[key]
          } else {
            rules[key] = this.rules.rules[key]
          }
        }
      } else if (label.label == '1') {
        const newkey = index.replace('xpath_', 're_')
        for (var key in this.rules.rules) {
          if (key == index) {
            rules[newkey] = this.rules.rules[key]
          } else {
            rules[key] = this.rules.rules[key]
          }
        }
      }
      this.rules.rules = rules
    },

    // 测试栏目抓取规则
    testRules(row) {
      // console.log(row)
      this.rulesLoading = true
      testColumnRule(row).then(response => {
        // console.log("testRuleData=========>" + JSON.stringify(response))

        this.testRuleData = response
        // console.log("this.testRuleData============>", JSON.stringify(this.testRuleData))
        this.rulesLoading = false
        this.showScrapyData = true
        this.$XModal.message({ content: '测试抓取数据成功', status: 'success' })
      }).catch(err => {
        this.rulesLoading = false
        this.$XModal.message({ content: '测试抓取数据失败', status: 'error' })
        // console.log(err)
      })
    },
    // 关闭 测试栏目抓取规则数据展示 页面
    closeShowScrapyData() {
      this.showScrapyData = false
    },
    closedongtaiyaowen() {
      this.showDongTaiYaoWenRule = false
    },
    // 关闭配置栏目规则页面
    closeRule() {
      this.testRuleData = ''
      this.showDongTaiYaoWenRule = false
    },
    // 中文转换
    getStr(index) {
      if (index in this.ruleData) {
        return this.ruleData[index]
      }
    },
    // 中文转换
    getStrTest(index) {
      if (index in this.ruleData1) {
        return this.ruleData1[index]
      }
    },
    // 添加栏目时, 栏目类别用到的指标树的获取
    getTreeData() {
      getPointListTree(this.$store.state.city.siteInfo.site_classify).then(response => {
        // alert("获取到的指标内容是=============> " + JSON.stringify(response))

        // this.pointTree = response
        // const data = JSON.stringify(response)
        //
        // const data = response.map(x => {
        //   const label = x.label.replaceAll('-', ' ')
        //   return {"label": label,"value":x.value,"disabled":x.disabled}
        // })
        //
        // console.log("修改后的值为 ======================> " + JSON.stringify(data))
        //
        // //

        this.pointTree = response
      }).catch(err => {
        // console.log("getPointListTree 获取数据失败")
        // console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.keyword-lighten {
  color: red;
  background-color: yellow;
}

.box-card {
  color: #409EFF;
}

</style>
