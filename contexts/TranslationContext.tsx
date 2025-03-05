// contexts/TranslationContext.tsx
import React, { createContext, useContext } from 'react';
import { useLanguageStore } from '@/store/languageStore';

// Define translations for each language
type Translations = {
  lt: { [key: string]: string };
  en: { [key: string]: string };
  de: { [key: string]: string };
  ru: { [key: string]: string };
};

const translations: Translations = {
  lt: {
    welcome: 'Sveiki atvykę į JUNG',
    tagline: 'Išmanu. Saugu. Lankstu',
    discoverSolution: 'Atraskite sprendimą',
    systemInfo: 'Sistemų informacija',
    info: 'Informacija',
    chooseLanguage: 'Pasirinkite kalbą',
    lithuanian: 'Lietuvių',
    english: 'Anglų',
    german: 'Vokiečių',
    russian: "Rusų",
    programInfo: 'Programėlės informacija',
    infoAbout: 'Ši programėlė yra klausimynas, kuris padeda pasirinkti išmaniųjų namų tiekėjus',
    about: 'Apie programėlę',
    appInfo:
      'Ši programėlė yra klausimynas, kuris padeda vartotojams pasirinkti išmaniųjų namų tiekėjus pagal jų norus ir poreikius. Atsakydami į klausimus, vartotojai gali gauti rekomendacijas, kurios geriausiai atitinka jų pageidavimus ir gyvenimo būdą. Programėlė taip pat suteikia galimybę palyginti skirtingus tiekėjus ir jų pasiūlymus, kad vartotojai galėtų priimti informuotus sprendimus.',
    scroll: 'Slinkite žemyn, kad pamatytumėte daugiau',
    moreInfo: 'Daugiau informacijos',
    eNetInfo:
      'eNet Smart Home tai išmani namų automatikos sistema, skirta patogiam ir efektyviam apšvietimo, žaliuzių, šildymo bei kitų elektrinių prietaisų valdymui. Sistema veikia belaidžiu ryšiu, todėl ją galima lengvai integruoti į esamus namus be sudėtingų instaliacijos darbų. eNet Smart Home leidžia valdyti įrenginius tiek vietoje, tiek nuotoliniu būdu per mobiliąją programėlę, suteikdama vartotojams daugiau komforto ir energijos taupymo galimybių. Dėl savo patikimumo ir lankstumo ši sistema yra puikus sprendimas moderniems bei funkcionaliems namams.',
    knxInfo:"KNX - tai pažangi išmaniųjų pastatų valdymo sistema, užtikrinanti efektyvų apšvietimo, šildymo, vėdinimo, žaliuzių ir kitų inžinerinių sistemų automatizavimą. KNX standartas leidžia skirtingiems įrenginiams sklandžiai komunikuoti tarpusavyje, suteikiant maksimalų lankstumą ir pritaikymo galimybes tiek gyvenamuosiuose, tiek komerciniuose pastatuose. KNX sprendimai išsiskiria aukšta kokybe, intuityviu valdymu bei galimybe integruoti nuotolinį valdymą per mobiliąsias programėles ar balsu valdomas sistemas. Tai puikus pasirinkimas siekiantiems didesnio komforto, saugumo ir energijos efektyvumo savo erdvėse.",
    jungInfo:"JUNG kompanija siūlo išmaniuosius namų sprendimus, kurie leidžia valdyti apšvietimą, šildymą, saugumą ir energiją. Šie sprendimai suteikia galimybę lengvai kontroliuoti įvairias namų sistemas per centrinius valdymo pultus arba mobiliąsias programas. JUNG technologijos apima išmanų apšvietimo valdymą, kuris gali būti pritaikytas pagal individualius poreikius, taip pat saugumo sistemas su judesio jutikliais, kameromis ir užraktais, užtikrinančiais namų apsaugą. Klimato valdymo funkcija leidžia automatiškai reguliuoti temperatūrą ir vėdinimą, kad būtų pasiektas optimalus komfortas. Be to, JUNG sprendimai padeda efektyviau valdyti energijos sunaudojimą, taip sumažinant išlaidas ir didinant energijos taupymą.",  
    lbManagementInfo:"LB-Management tai išmani pastatų valdymo sistema, skirta efektyviam apšvietimo, klimato kontrolės ir kitų inžinerinių sprendimų valdymui. Ši sistema leidžia centralizuotai stebėti ir reguliuoti įvairius pastato parametrus, užtikrinant didesnį energijos vartojimo efektyvumą bei komfortą. LB-Management yra pritaikyta tiek gyvenamiesiems, tiek komerciniams pastatams, suteikdama vartotojams intuityvią sąsają bei galimybę valdyti sistemas nuotoliniu būdu. Dėl lankstumo ir išmaniųjų funkcijų ši sistema tampa neatsiejama modernių pastatų dalimi.",
    eNetInfoHeader: 'eNET',
    abouteNet: 'Apie eNET',
    aboutKNX:"Apie KNX",
    aboutJung:"Apie JUNG",
    aboutLbManagement:"Apie LB-Management",
    sysInfoSub: 'Elektroniniai sprendimai naujiems pastatams ir modernizavimui',
    category: "Pasirinkite kategoriją",
    chooseCategory: "Pasirinkite kategorijas",
    next: "Toliau",
    choosenCategories: "Pasirinktos kategorijos",
    pdf:"Parsisiųsti rezultatus PDF",
    config:"Sistemos konfigūracija",
    contactInfo:"Paspaudę mygtuką žemiau, būsite nukreipti(-a) į puslapį su tiekėjo kontaktinėmis informacijomis.",
    contactSupplier:"Susisiekti su tiekėju",
    backToMain:"Grįžti atgal į pagrindinį puslapį",
    errOneCategory:"Pasirinkite bent vieną kategoriją.",
  },
  en: {
    welcome: 'Welcome to JUNG',
    tagline: 'Smart. Secure. Flexible',
    discoverSolution: 'Discover the solution',
    systemInfo: 'System Information',
    info: 'Information',
    chooseLanguage: 'Choose Language',
    lithuanian: 'Lithuanian',
    english: 'English',
    german: 'German',
    russian: "Russian",
    programInfo: 'App information',
    infoAbout: 'This app is a questionnaire that helps to choose smart home suppliers',
    about: 'About the app',
    appInfo:
      'This app is a questionnaire that helps users choose smart home suppliers according to their wishes and needs. By answering questions, users can get recommendations that best match their preferences and lifestyle. The app also allows you to compare different suppliers and their offers so that users can make informed decisions.',
    scroll: 'Scroll down to see more',
    moreInfo: 'More information',
    eNetInfo:
      'eNet Smart Home is a smart home automation system designed for convenient and efficient control of lighting, blinds, heating, and other electrical devices. The system operates wirelessly, so it can be easily integrated into existing homes without complex installation work. eNet Smart Home allows you to control devices both locally and remotely via the mobile app, providing users with more comfort and energy-saving opportunities. Due to its reliability and flexibility, this system is an excellent solution for modern and functional homes.',
    knxInfo:"KNX is an advanced smart building control system that ensures efficient automation of lighting, heating, ventilation, blinds, and other engineering systems. The KNX standard allows different devices to communicate smoothly with each other, providing maximum flexibility and customization options for both residential and commercial buildings. KNX solutions stand out for their high quality, intuitive control, and the ability to integrate remote control via mobile apps or voice-controlled systems. It is a great choice for those seeking greater comfort, security, and energy efficiency in their spaces.",
    jungInfo:"Jung company offers smart home solutions that allow you to control lighting, heating, security, and energy. These solutions make it easy to control various home systems through central control panels or mobile apps. Jung technologies include smart lighting control that can be tailored to individual needs, as well as security systems with motion sensors, cameras, and locks that ensure home security. Climate control function allows you to automatically adjust temperature and ventilation to achieve optimal comfort. In addition, Jung solutions help to manage energy consumption more efficiently, reducing costs and increasing energy savings.",  
    lbManagementInfo:"LB-Managment is a smart building management system designed for efficient lighting, climate control, and other engineering solutions. This system allows you to centrally monitor and regulate various building parameters, ensuring greater energy efficiency and comfort. LB-Management is suitable for both residential and commercial buildings, providing users with an intuitive interface and the ability to remotely control systems. Due to its flexibility and smart features, this system becomes an integral part of modern buildings.",
    eNetInfoHeader: 'eNET ',
    abouteNet: 'About eNET',
    aboutKNX:"About KNX",
    aboutJung:"About JUNG",
    aboutLbManagement:"About LB-Management",
    sysInfoSub: 'Electronic solutions for new buildings and modernization',
    category: "Choose a category",
    chooseCategory: "Choose categories",
    next: "Next",
    choosenCategories: "Choosen categories",
    pdf:"Download results PDF",
    config:"System configuration",
    contactInfo:"By pressing the button below, you will be redirected to the supplier's contact information page.",
    contactSupplier:"Contact supplier",
    backToMain:"Back to main page",
    errOneCategory:"Choose at least one category.",
  },
  de: {
    welcome: 'Willkommen bei JUNG',
    tagline: 'Intelligent. Sicher. Flexibel',
    discoverSolution: 'Entdecken Sie die Lösung',
    systemInfo: 'Systeminformationen',
    info: 'Informationen',
    chooseLanguage: 'Wähle Sprache',
    lithuanian: 'Litauisch',
    english: 'Englisch',
    german: 'Deutsch',
    russian: "Russisch",
    programInfo: 'App-Informationen',
    infoAbout: 'Bei dieser App handelt es sich um einen Fragebogen, der hilft, Smart-Home-Anbieter auszuwählen',
    about: 'Über die App',
    appInfo:
      'Diese App ist ein Fragebogen, der Benutzern hilft, Smart-Home-Anbieter entsprechend ihren Wünschen und Bedürfnissen auszuwählen. Durch Beantwortung von Fragen können Benutzer Empfehlungen erhalten, die am besten ihren Vorlieben und ihrem Lebensstil entsprechen. Die App ermöglicht es auch, verschiedene Anbieter und ihre Angebote zu vergleichen, damit Benutzer informierte Entscheidungen treffen können.',
    scroll: 'Scrollen Sie nach unten, um mehr zu sehen',
    moreInfo: 'Mehr Informationen',
    eNetInfo:
      'eNet Smart Home ist ein Smart-Home-Automatisierungssystem, das für die bequeme und effiziente Steuerung von Beleuchtung, Jalousien, Heizung und anderen elektrischen Geräten entwickelt wurde. Das System arbeitet drahtlos, so dass es leicht in bestehende Häuser integriert werden kann, ohne komplexe Installationsarbeiten durchzuführen. eNet Smart Home ermöglicht es Ihnen, Geräte sowohl lokal als auch remote über die mobile App zu steuern und bietet Benutzern mehr Komfort und Energiesparmöglichkeiten. Aufgrund seiner Zuverlässigkeit und Flexibilität ist dieses System eine hervorragende Lösung für moderne und funktionale Häuser.',
    knxInfo:"KNX ist ein fortschrittliches Smart-Building-Steuerungssystem, das eine effiziente Automatisierung von Beleuchtung, Heizung, Lüftung, Jalousien und anderen technischen Systemen gewährleist",
    jungInfo:"Jung bietet Smart-Home-Lösungen, mit denen Sie Beleuchtung, Heizung, Sicherheit und Energie steuern können. Diese Lösungen erleichtern die Steuerung verschiedener Haussysteme über zentrale Steuerungspanels oder mobile Apps. Jung-Technologien umfassen intelligente Lichtsteuerung, die an individuelle Bedürfnisse angepasst werden kann, sowie Sicherheitssysteme mit Bewegungssensoren, Kameras und Schlössern, die die Sicherheit des Hauses gewährleisten. Die Klimasteuerungsfunktion ermöglicht es, Temperatur und Belüftung automatisch anzupassen, um optimalen Komfort zu erreichen. Darüber hinaus helfen Jung-Lösungen, den Energieverbrauch effizienter zu steuern, Kosten zu senken und den Energieverbrauch zu erhöhen.",  
    lbManagementInfo:"LB-Management ist ein intelligentes Gebäudemanagementsystem, das für eine effiziente Beleuchtung, Klimasteuerung und andere technische Lösungen entwickelt wurde. Dieses System ermöglicht es, verschiedene Gebäudeparameter zentral zu überwachen und zu regulieren, um eine höhere Energieeffizienz und Komfort zu gewährleisten. LB-Management eignet sich sowohl für Wohn- als auch für Gewerbegebäude und bietet Benutzern eine intuitive Benutzeroberfläche und die Möglichkeit, Systeme remote zu steuern. Aufgrund seiner Flexibilität und intelligenter Funktionen wird dieses System zu einem integralen Bestandteil moderner Gebäude.",
    eNetInfoHeader: 'eNET',
    abouteNet: 'Über eNET',
    aboutKNX:"Über KNX",
    aboutJung:"Über JUNG",
    aboutLbManagement:"Über LB-Management",
    sysInfoSub: 'Elektronische Lösungen für Neubauten und Modernisierung',
    category: "Wählen Sie eine Kategorie",
    chooseCategory: "Wählen Sie Kategorien",
    next: "Weiter",
    choosenCategories: "Ausgewählte Kategorien",
    pdf:"Ergebnisse als PDF herunterladen",
    config:"Systemkonfiguration",
    contactInfo:"Durch Drücken der Schaltfläche unten werden Sie auf die Seite mit den Kontaktdaten des Lieferanten weitergeleitet.",
    contactSupplier:"Lieferant kontaktieren",
    backToMain:"Zurück zur Hauptseite",
    errOneCategory:"Wählen Sie mindestens eine Kategorie.",
  },
  ru: {
    welcome: 'Добро пожаловать в JUNG',
    tagline: 'Умный. Безопасный. Гибкий',
    discoverSolution: 'Откройте решение',
    systemInfo: 'Информация о системе',
    info: 'Информация',
    chooseLanguage: 'Выберите язык',
    lithuanian: 'Литовский',
    english: 'Английский',
    german: 'Немецкий',
    russian: "Русский",
    programInfo: 'Информация о программе',
    infoAbout: 'Это приложение - это опросник, который помогает выбирать поставщиков умного дома',
    about: 'О приложении',
    appInfo:
      'Это приложение - это опросник, который помогает пользователям выбирать поставщиков умного дома в соответствии с их желаниями и потребностями. Отвечая на вопросы, пользователи могут получить рекомендации, которые лучше всего соответствуют их предпочтениям и образу жизни. Приложение также позволяет сравнивать различных поставщиков и их предложения, чтобы пользователи могли принимать обоснованные решения.',
    scroll: 'Прокрутите вниз, чтобы увидеть больше',
    moreInfo: 'Больше информации',
    eNetInfo:
      'eNet Smart Home - это система умного дома, разработанная для удобного и эффективного управления освещением, жалюзи, отоплением и другими электрическими устройствами. Система работает беспроводно, поэтому ее можно легко интегрировать в существующие дома без сложных установочных работ. eNet Smart Home позволяет управлять устройствами как локально, так и удаленно через мобильное приложение, предоставляя пользователям больше комфорта и возможностей для экономии энергии. Благодаря своей надежности и гибкости эта система является отличным решением для современных и функциональных домов.',
    knxInfo:"KNX - это передовая система управления умными зданиями, обеспечивающая эффективную автоматизацию освещения, отопления, вентиляции, жалюзи и других инженерных систем. Стандарт KNX позволяет различным устройствам взаимодействовать между собой плавно, обеспечивая максимальную гибкость и возможности настройки как для жилых, так и для коммерческих зданий. Решения KNX выделяются высоким качеством, интуитивным управлением и возможностью интеграции удаленного управления через мобильные приложения или голосовые системы управления. Это отличный выбор для тех, кто ищет больший комфорт, безопасность и энергоэффективность в своих пространствах.",
    jungInfo:"Компания Jung предлагает умные домашние решения, которые позволяют управлять освещением, отоплением, безопасностью и энергией. Эти решения облегчают управление различными домашними системами через центральные панели управления или мобильные приложения. Технологии Jung включают в себя умное управление освещением, которое можно настроить под индивидуальные потребности, а также системы безопасности с датчиками движения, камерами и замками, обеспечивающими безопасность дома. Функция управления климатом позволяет автоматически регулировать температуру и вентиляцию для достижения оптимального комфорта. Кроме того, решения Jung помогают более эффективно управлять энергопотреблением, снижая расходы и увеличивая энергосбережение.",  
    lbManagementInfo:"LB-Management - это интеллектуальная система управления зданием, разработанная для эффективного управления освещением, климатом и другими инженерными решениями. Эта система позволяет централизованно контролировать и регулировать различные параметры здания, обеспечивая большую энергоэффективность и комфорт. LB-Management подходит как для жилых, так и для коммерческих зданий, предоставляя пользователям интуитивный интерфейс и возможность удаленного управления системами. Благодаря своей гибкости и умным функциям эта система становится неотъемлемой частью современных зданий.",
    eNetInfoHeader: 'eNET',
    abouteNet: 'Об eNET',
    aboutKNX:"Об KNX",
    aboutJung:"Об JUNG",
    aboutLbManagement:"Об LB-Management",
    sysInfoSub: 'Электронные решения для новых зданий и модернизации',
    category: "Выберите категорию",
    chooseCategory: "Выберите категории",
    next: "Далее",
    choosenCategories: "Выбранные категории",
    pdf:"Скачать результаты PDF",
    config:"Конфигурация системы",
    contactInfo:"Нажав на кнопку ниже, вы будете перенаправлены на страницу с контактной информацией поставщика.",
    contactSupplier:"Связаться с поставщиком",
    backToMain:"Вернуться на главную страницу",
    errOneCategory:"Выберите хотя бы одну категорию.",
  },
};

// Define the shape of the context
interface TranslationContextProps {
  translate: (key: string) => string;
}

// Create a context for translations
export const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

// Provider component
interface TranslationProviderProps {
  children: React.ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const { language } = useLanguageStore(); // Use Zustand store for language state

  const translate = (key: string) => translations[language][key] || key;

  return (
    <TranslationContext.Provider value={{ translate }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use the translation context
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};