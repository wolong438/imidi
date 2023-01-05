import Mock from 'mockjs2'
import { builder, getQueryParameters, getBody } from '../util'

const scoreImgs = [
    '/file/所念皆星河/score-1.jpg',
    '/file/所念皆星河/score-2.jpg',
    '/file/所念皆星河/score-3.jpg',
    '/file/所念皆星河/score-4.jpg',
    '/file/所念皆星河/score-5.jpg',
    '/file/所念皆星河/score-6.jpg',
    '/file/所念皆星河/score-7.jpg'
]

const tags = [
    { name: 'AI跟弹', href: 'www.baidu.com', color: 'green' },
    { name: '琴友视频', href: 'www.baidu.com', color: 'blue' },
    { name: '五线谱', href: 'www.baidu.com', color: 'orange' },
    { name: '简谱', href: 'www.baidu.com', color: 'cyan' }
]

const description = '钢琴谱，五线谱及双手简谱，共4张PNG格式图片谱。这首歌由xxx作曲，xxx作词，歌手xxx演唱，这首歌旋律非常好听，在某音上很火，喜欢xxx的这首歌的琴友可以试弹 。'

const midiDetails = [
    {
        id: 1,
        avatar: '/avatar/avatar.jpg',
        name: '素颜',
        compose: '许嵩',
        genre: 'popular',
        publisher: '李四',
        pubdate: Mock.mock('@datetime'),
        tone: 'C',
        count: {
            play: Mock.mock('@integer(1, 999999)'),
            comment: Mock.mock('@integer(1, 999)'),
            view: Mock.mock('@integer(1, 999999)'),
            like: Mock.mock('@integer(1, 999999)'),
            dislike: Mock.mock('@integer(1, 99)'),
            star: Mock.mock('@integer(1, 9999)'),
            share: Mock.mock('@integer(1, 9999)'),
            download: Mock.mock('@integer(1, 999999)')
        },
        description: description,
        cover: '/file/素颜.png',
        mp3: '/file/素颜.mp3',
        scoreImgs: scoreImgs,
        tags: tags
    },
    {
        id: 2,
        avatar: '/avatar/avatar2.jpg',
        name: '所念皆星河',
        compose: 'CMJ',
        genre: 'classical',
        publisher: '李四',
        pubdate: Mock.mock('@datetime'),
        tone: 'C',
        count: {
            play: Mock.mock('@integer(1, 999999)'),
            comment: Mock.mock('@integer(1, 999)'),
            view: Mock.mock('@integer(1, 999999)'),
            like: Mock.mock('@integer(1, 999999)'),
            dislike: Mock.mock('@integer(1, 99)'),
            star: Mock.mock('@integer(1, 9999)'),
            share: Mock.mock('@integer(1, 9999)'),
            download: Mock.mock('@integer(1, 999999)')
        },
        description: description,
        cover: '/file/所念皆星河.png',
        mp3: '/file/所念皆星河.m4a',
        scoreImgs: scoreImgs,
        tags: tags
    },
    {
        id: 3,
        avatar: '/avatar/avatar3.jpg',
        name: '夜的钢琴曲五',
        compose: '高进',
        genre: 'classical',
        publisher: '李四',
        pubdate: Mock.mock('@datetime'),
        tone: 'F',
        count: {
            play: Mock.mock('@integer(1, 999999)'),
            comment: Mock.mock('@integer(1, 999)'),
            view: Mock.mock('@integer(1, 999999)'),
            like: Mock.mock('@integer(1, 999999)'),
            dislike: Mock.mock('@integer(1, 99)'),
            star: Mock.mock('@integer(1, 9999)'),
            share: Mock.mock('@integer(1, 9999)'),
            download: Mock.mock('@integer(1, 999999)')
        },
        description: description,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
        mp3: '/file/所念皆星河.m4a',
        scoreImgs: scoreImgs,
        tags: tags
    },
    {
        id: 4,
        avatar: '/avatar/avatar4.jpg',
        name: '夜的钢琴曲六',
        compose: '高进',
        genre: 'begin',
        publisher: '李四',
        pubdate: Mock.mock('@datetime'),
        tone: 'G',
        count: {
            play: Mock.mock('@integer(1, 999999)'),
            comment: Mock.mock('@integer(1, 999)'),
            view: Mock.mock('@integer(1, 999999)'),
            like: Mock.mock('@integer(1, 999999)'),
            dislike: Mock.mock('@integer(1, 99)'),
            star: Mock.mock('@integer(1, 9999)'),
            share: Mock.mock('@integer(1, 9999)'),
            download: Mock.mock('@integer(1, 999999)')
        },
        description: description,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
        mp3: '/file/所念皆星河.m4a',
        scoreImgs: scoreImgs,
        tags: tags
    },
    {
        id: 5,
        avatar: '/avatar/avatar4.jpg',
        name: '菊次郎的夏天',
        compose: '佚名',
        genre: 'test',
        publisher: '张三',
        pubdate: Mock.mock('@datetime'),
        tone: 'G',
        count: {
            play: Mock.mock('@integer(1, 999999)'),
            comment: Mock.mock('@integer(1, 999)'),
            view: Mock.mock('@integer(1, 999999)'),
            like: Mock.mock('@integer(1, 999999)'),
            dislike: Mock.mock('@integer(1, 99)'),
            star: Mock.mock('@integer(1, 9999)'),
            share: Mock.mock('@integer(1, 9999)'),
            download: Mock.mock('@integer(1, 999999)')
        },
        description: description,
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
        mp3: '/file/所念皆星河.m4a',
        scoreImgs: scoreImgs,
        tags: tags
    }
]

const midi = (options) => {
  const queryParameters = getQueryParameters(options)
  console.log('queryParameters', queryParameters)
  if (queryParameters && !queryParameters.count) {
    queryParameters.count = 5
  }
  const data = []
  for (let i = 0; i < queryParameters.count; i++) {
    const tmpKey = i + 1
    const num = i % midiDetails.length
    // const num = parseInt(Math.random() * (4 + 1), 10)
    data.push({
        id: tmpKey,
        avatar: midiDetails[num].avatar,
        name: midiDetails[num].name,
        publisher: midiDetails[num].publisher,
        pubdate: midiDetails[num].pubdate,
        view: midiDetails[num].count.view,
        comment: midiDetails[num].count.comment,
        description: midiDetails[num].description,
        cover: midiDetails[num].cover
    })
  }
  return builder(data)
}

const midiDetail = (options) => {
    const params = getBody(options)
    console.log('params', params)
    if (params && !params.id) {
        params.id = 1
    }
    return builder(midiDetails[params.id % midiDetails.length])
  }

Mock.mock(/\/list\/midi/, 'get', midi)
Mock.mock(/\/list\/midi-detail/, 'post', midiDetail)
