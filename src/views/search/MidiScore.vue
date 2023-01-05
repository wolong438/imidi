<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="17">
        <a-card
          style="width:100%;min-height:600px"
          :title="midiInfo.name"
          :bordered="false"
        >
          <div>
            <a-descriptions :column="3">
              <a-descriptions-item label="曲名">{{ midiInfo.name }}</a-descriptions-item>
              <a-descriptions-item label="作曲">{{ midiInfo.compose }}</a-descriptions-item>
              <a-descriptions-item label="调性">{{ midiInfo.tone }}</a-descriptions-item>
              <a-descriptions-item label="流派">{{ midiInfo.genre }}</a-descriptions-item>
              <!-- <a-descriptions-item label="来源">转载</a-descriptions-item>
              <a-descriptions-item label="许可">仅供个人编曲学习</a-descriptions-item> -->
              <a-descriptions-item label="上传">{{ midiInfo.publisher }}</a-descriptions-item>
              <a-descriptions-item label="日期">{{ midiInfo.pubdate }}</a-descriptions-item>
            </a-descriptions>
            <a-descriptions :column="1">
              <a-descriptions-item>{{ midiInfo.description }}</a-descriptions-item>
              <a-descriptions-item>
                <a-tag v-for="(item, index) in midiInfo.tags" :key="index" :color="item.color">{{ item.name }}</a-tag>
              </a-descriptions-item>
            </a-descriptions>
          </div>
          <a-divider dashed />
          <audio ref="audio" @timeupdate="timeupdate" @loadedmetadata="loadedmetadata" style="display:none;">
            <source :src="midiInfo.mp3" type="audio/mpeg">
            您的浏览器不支持 audio 元素。
          </audio>
          <div style="display:inline-block;vertical-align: top;">
            <a-space align="baseline" size="middle">
              <span v-if="!audio.paused">
                <a-button type="link" shape="circle" @click="playAudio">
                  <a-progress type="circle" :percent="audio.percent" :width="36" :format="() => `${audio.text}`"/>
                </a-button>
                {{ midiInfo.count.play }}
              </span>
              <span v-else><a-button shape="circle" icon="caret-right" @click="playAudio"/> {{ midiInfo.count.play }}</span>
              <span><a-button type="dashed" shape="circle" icon="like" /> {{ midiInfo.count.like }}</span>
              <span><a-button type="dashed" shape="circle" icon="star" /> {{ midiInfo.count.star }}</span>
              <span><a-button type="dashed" shape="circle" icon="share-alt" /> {{ midiInfo.count.share }}</span>
              <span><a-button type="dashed" shape="circle" icon="download" /> {{ midiInfo.count.download }}</span>
            </a-space>
          </div>
          <a-divider dashed />
          <div v-for="(item, index) in midiInfo.scoreImgs.slice(0, 3)" :key="index">
            <img :src="item" style="max-width: 100%;"/>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="7">
        <a-card :bordered="false" size="small" :bodyStyle="{'margin-bottom':'12px'}" :headStyle="{'padding':'4px 12px'}">
          <a-space align="center" size="middle" slot="title">
            <a-avatar :src="avatar"/>
            <span>{{ publisherInfo.name }}</span>
            <a-button type="primary" size="small">关注</a-button>
          </a-space>
          <a-space align="center" size="middle" style="margin: 10px auto;" v-if="publisherInfo.fans.length <= fansMax">
            <a-avatar v-for="(item, index) in publisherInfo.fans" :key="index" :src="item.avatar" />
          </a-space>
          <a-space align="center" size="middle" style="margin: 10px auto;" v-else>
            <a-avatar v-for="(item, index) in publisherInfo.fans.slice(0, fansMax-1)" :key="index" :src="item.avatar" />
            <a-avatar>{{ publisherInfo.fanTotal-fansMax+1 }}+</a-avatar>
          </a-space>
        </a-card>
        <a-card :bordered="false" size="small" :bodyStyle="{'margin-bottom':'12px'}" title="最近上传">
          <a-list :data-source="publisherInfo.lastUploads" size="large">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta :description="item.time">
                <a slot="title" :href="item.href">{{ item.name }}</a>
                <a-avatar slot="avatar" shape="square" :size="64" :src="avatar" />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-card>
        <a-card :bordered="false" size="small" :bodyStyle="{'margin-bottom':'12px'}" title="相关曲谱">
          <a-list :data-source="relateMidis" size="large">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta :description="item.author">
                <a slot="title" :href="item.href">{{ item.name }}</a>
                <a-avatar slot="avatar" shape="square" :size="64" :src="avatar" />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { mapGetters } from 'vuex'
// import { duration } from 'moment'

export default {
  components: {
    RouteView,
    PageView
  },
  data () {
    return {
      midiInfo: {
        id: 0,
        avatar: '',
        name: '',
        compose: '',
        genre: '',
        publisher: '',
        pubdate: '',
        tone: '',
        count: {
            play: 0,
            comment: 0,
            view: 0,
            like: 0,
            dislike: 0,
            star: 0,
            share: 0,
            download: 0
        },
        description: '',
        cover: '',
        mp3: '',
        scoreImgs: [],
        tags: []
     },
     audio: {
       duration: 0,
       currentTime: 0,
       percent: 0,
       paused: true,
       text: '00:00'
     },
      publisherInfo: {
        name: '李四',
        fanTotal: 340,
        scoreTotal: 40,
        fans: [
          { name: '张三', avatar: '/avatar2.jpg' },
          { name: '李四', avatar: '/logo.png' },
          { name: '王五', avatar: '/avatar2.jpg' },
          { name: '李一', avatar: '/logo.png' },
          { name: '杜二', avatar: '/avatar2.jpg' },
          { name: '五七', avatar: '/logo.png' },
          { name: '杜一', avatar: '/avatar2.jpg' }
        ],
        lastUploads: [
          { name: '所念皆星河 C调版', desc: '', href: 'www.baidu.com', time: '1小时前', author: '李四' },
          { name: '所念皆星河 E调版', desc: '', href: 'www.baidu.com', time: '昨天', author: '李四' },
          { name: '所念皆星河 E#调版', desc: '', href: 'www.baidu.com', time: '上个月', author: '李四' },
          { name: '所念皆星河 F调版', desc: '', href: 'www.baidu.com', time: '去年', author: '李四' }
        ]
      },
      fansMax: 6,
      relateMidis: [
        { name: '所念皆星河 C调版', desc: '', href: 'www.baidu.com', time: '1小时前', author: '李四' },
        { name: '所念皆星河 简单版', desc: '', href: 'www.baidu.com', time: '昨天', author: '张三' },
        { name: '所念皆星河 完全版', desc: '', href: 'www.baidu.com', time: '上个月', author: '王五' },
        { name: '所念皆星河 F调版', desc: '', href: 'www.baidu.com', time: '去年', author: '李四' }
      ]
    }
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])
  },
  mounted () {
    this.getMidiDetail()
  },
  methods: {
    getMidiDetail () {
      const id = this.$route.params.id
      this.$http.post('/list/midi-detail', { id: id }).then(res => {
        console.log(res)
        this.midiInfo = res.result
      })
    },
    playAudio () {
      const audio = this.$refs.audio
      if (audio.paused) {
        audio.play()
      } else {
        audio.pause()
      }
      this.audio.paused = audio.paused
      console.log(audio.paused ? '暂停' : '播放', this.audio)
    },
    timeupdate () {
      this.audio.currentTime = this.$refs.audio.currentTime
      this.audio.percent = parseInt(this.audio.currentTime / this.audio.duration * 100)
    },
    loadedmetadata () {
      this.audio.duration = this.$refs.audio.duration
      if (this.audio.duration > 0) {
        this.audio.text = this.transTime(this.audio.duration)
      }
    },
    /**
     * 音频播放时间换算
     * @param {number} value - 音频当前播放时间，单位秒
     */
    transTime (time) {
      var duration = parseInt(time)
      var minute = parseInt(duration / 60)
      var sec = (duration % 60) + ''
      var isM0 = ':'
      if (minute === 0) {
        minute = '00'
      } else if (minute < 10) {
        minute = '0' + minute
      }
      if (sec.length === 1) {
        sec = '0' + sec
      }
      return minute + isM0 + sec
    }
  }
}
</script>

<style lang="less" scoped>

</style>
