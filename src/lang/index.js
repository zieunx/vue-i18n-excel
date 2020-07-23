import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementKoLocale from 'element-ui/lib/locale/lang/ko'// element-ui lang
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementTwLocale from 'element-ui/lib/locale/lang/zh-TW' // element-ui lang
import koLocale from './ko'
import enLocale from './en'
import twLocale from './tw'

Vue.use(VueI18n)

const messages = {
  ko: {
    ...koLocale,
    ...elementKoLocale
  },
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  tw: {
    ...twLocale,
    ...elementTwLocale
  }
}

const i18n = new VueI18n({
  // 언어 설정을 합니다.
  // 뒤의 ko는 기본 언어를 세팅하며,
  // Cookie 에서 꺼내서 사용하는 값은 관리자 페이지의 다국어 설정할때 값을 Cookie에 저장하여
  // 다음번에 접속해도 해당 언어로 설정되어 있도록 하기 위함입니다.
  locale: Cookies.get('language') || 'ko',
  messages
})

export default i18n
