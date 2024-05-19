import i18next from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'


let lang = localStorage.getItem("i18nextLng")

if (lang === null) {
    lang = "ru"
}
i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: lang,
        debug: false,
        detection:{
            order: ['queryString','cookie'],
            cache: ['cookie']
    },
    interpolation:{
        escapeValue: false
    }

})
export default i18next;