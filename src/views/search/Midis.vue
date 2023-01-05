<template>
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form :form="form" layout="inline">
        <standard-form-row title="分类筛选" block style="padding-bottom: 11px;">
          <a-form-item>
            <tag-select>
              <tag-select-option v-for="item in filterTypes" :key="item.value" :value="item.value">
                {{ item.label }}
              </tag-select-option>
            </tag-select>
          </a-form-item>
        </standard-form-row>
        <standard-form-row title="资源类型" block style="padding-bottom: 11px;">
          <a-form-item>
            <tag-select>
              <tag-select-option v-for="item in resourceTypes" :key="item.value" :value="item.value">
                {{ item.label }}
              </tag-select-option>
            </tag-select>
          </a-form-item>
        </standard-form-row>
        <standard-form-row title="排序方式" block style="padding-bottom: 11px;">
          <a-form-item>
            <a-space>
              <a-select
                ref="select"
                v-model="sortType"
                style="width: 120px"
                :options="sortTypes"
                placeholder="排序方式"
                @change="handleChange"
              >
              </a-select>
            </a-space>
          </a-form-item>
        </standard-form-row>
      </a-form>
    </a-card>

    <div class="ant-pro-pages-list-applications-filterCardList">
      <a-list
        :loading="loading"
        :data-source="data"
        :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
        style="margin-top: 24px;"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card :body-style="{ paddingBottom: 20 }" hoverable @click="showDetail">
            <img slot="cover" :alt="item.name" :src="item.cover" />
            <a-card-meta :title="item.name"></a-card-meta>
            <div>
              <ul class="list-inline">
                <li><a-icon type="clock-circle"/> {{ item.pubdate | fromNow }}</li>
                <li><a-icon type="eye"/> {{ item.view }}</li>
                <li><a-icon type="message"/> {{ item.comment }}</li>
              </ul>
            </div>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
import CardInfo from './components/CardInfo'
const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.Item

export default {
  components: {
    AvatarList,
    AvatarListItem,
    Ellipsis,
    TagSelect,
    TagSelectOption,
    StandardFormRow,
    CardInfo
  },
  data () {
    return {
      data: [],
      form: this.$form.createForm(this),
      loading: true,
      resourceTypes: [
        { value: 'score', label: '五线谱' },
        { value: 'numbered', label: '简谱' },
        { value: 'video', label: '视频' },
        { value: 'follow', label: 'AI跟弹' }
      ],
      filterTypes: [
        { value: 'begin', 'label': '初学' },
        { value: 'popular', 'label': '流行' },
        { value: 'test', 'label': '考级' },
        { value: 'textbook', 'label': '教材' },
        { value: 'classical', 'label': '古典' },
        { value: 'acg', 'label': 'ACG' },
        { value: 'duet', 'label': '联弹' },
        { value: 'original', 'label': '原创' }
      ],
      sortType: '1',
      sortTypes: [
        { value: '1', label: '综合热度' },
        { value: '2', label: '播放次数' },
        { value: '3', label: '评论次数' },
        { value: '4', label: '收藏次数' },
        { value: '5', label: '下载次数' },
        { value: '6', label: '发布时间' }
      ],
      viewType: '',
      viewTypes: [
        { value: '1', label: '列表' },
        { value: '2', label: '卡片' },
        { value: '3', label: '详情' }
      ]
    }
  },
  filters: {
    fromNow (date) {
      return moment(date).fromNow()
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    getList () {
      this.$http.get('/list/midi', { params: { count: 8 } }).then(res => {
        console.log('res', res)
        this.data = res.result
        this.loading = false
      })
    },
    showDetail () {
      console.log(this.data)
      const id = this.data.id
      this.$router.push({ name: 'SearchMidiScore', params: { id: id } })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-components-tag-select {
  :deep(.ant-pro-tag-select .ant-tag) {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}
.ant-pro-pages-list-projects-cardList {
  margin-top: 24px;

  :deep(.ant-card-meta-title) {
    margin-bottom: 4px;
  }

  :deep(.ant-card-meta-description) {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
    }

    :deep(.ant-pro-avatar-list) {
      flex: 0 1 auto;
    }
  }
}
.list-inline {
  padding-inline-start: 0px;
  color: #8c8c8c;

  li {
    float:left;
  }

  li:not(:first-child) {
    float:right;
    margin-left: 15px;
  }

}
</style>
