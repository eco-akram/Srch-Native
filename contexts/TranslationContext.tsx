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
      'Ši sistema yra idealus sprendimas, norint suteikti daugiau komforto ir saugumo privačiuose namuose ar nedideliuose biuruose. Sistema labai lengva įdiegti ne tik naujuose, bet ir renovuojamuose pastatuose. „eNet“ radijo bangomis valdoma sistema užpildo nišą tarp standartinės instaliacijos sistemų, kur visi prietaisai prijungti maitinimo kabeliu, ir išmaniųjų pastatų sistemų. Imtuvai yra valdomi ant sienos sumontuotais siųstuvais ar išmaniąja programėle. Naudojant „eNet SMART HOME“ programėlę galima įjungti ir valdyti prietaisus išmaniuoju telefonu ne tik esant patalpoje, bet ar per nuotolį. „eNet“ – tai patikima ir moderni šiuolaikinio dizaino sistema, diegiama profesionalų. Įvairių gamintojų prietaisai gali būti sujungiami į vientisą tinklą, vartotojas gali lengvai konfigūruoti sistemą. Galimas valdymas balsu su „Amazon Alexa“ ir „Goggle Assistant“. Kadangi sieniniai siųstuvai gali būti priklijuojami, todėl jungiklius galima sumontuoti bet kurioje norimoje vietoje',
    knxInfo:'KNX – atviras pasaulinis namų ir pastatų valdymo ir automatizavimo standartas. JUNG KNX sistema suteikia privalumų privačių namų ir kitokių objektų statyboje: patogumą, saugumą ir ekonomiškumą. Visas namo ir daugybę multimedijų funkcijų galima sujungti į vieningą tinklą su protinga KNX pastato sistema ir valdyti centralizuotai. KNX sistemoje visi valdymo elementai sujungiami į vieną bendrą sistemą KNX kabeliu. Su KNX technika galima lengvai įgyvendinti energijos vartotojų vizualizavimą ir duomenų apdorojimą – "Smart-Metering". Konkrečių komponentų funkcijos priklauso nuo jų užprogramavimo, kurį bet kada galima keisti. Naudotojui tai yra patogi ir lanksti pastato technika, kuri atliepia jo individualius poreikius. Protingai sujungiant patalpų funkcijas į vieningą tinklą, pasiekiamas didesnis energetinis efektyvumas, nes automatinis reguliavimas pagal temperatūros, klimato, apšvietimo ir užtamsinimo poreikį padės Jums sumažinti kaštus elektrai ir šildymui, o Jūs galėsite mėgautis maksimaliu komfortu. Pastovi elektros, dujų, vandens ir kitų resursų sunaudojimo apskaita, analizė ir vizualizacija parodys Jums taupymo potencialą, optimizuos energijos naudojimą ir sumažins pastato eksploatacinius kaštus. Statistiniai duomenys, procesai ir funkcijos bus rodomi spalvotuose, lietimui jautriuose ekranuose. Pasinaudojant KNX galimybėmis galima HiFi garso aparatūrą, televizorių, namų kino sistemą, internetą ir kitus prietaisus nesunkiai sujungti su išmaniąja būsto valdymo sistema. Tuomet bus galima visą daugialypės terpės įrangą valdyti vienoje sistemoje kartu su kita būsto inžinerinės paskirties įranga. Išmanieji liečiami ekranai suteikia galimybę į KNX sistemą integruoti įvairias multimedijos sistemas ir tai atveria daug papildomų galimybių ir išplečia funkcijų spektrą. Naujoji vartotojo sąsaja liečiamuose ekranuose dar niekada nebuvo tokia intuityvi, todėl įvairių sistemų valdymas tampa ypač patogus.',
    jungInfo:"JUNG HOME – paprasta ir nebrangi sistema, kuri padės jums paversti savo namus išmaniais. Jos pagrindas – įprastinė 230 voltų elektros instaliacija. JUNG HOME prietaisai sujungiami į tinklą naudojant „Bluetooth® SIG Mesh“. Ši technologija leidžia sukurti decentralizuotą belaidį tinklą, kuriame duomenų perdavimas, dėl naudojamo automatinio šifravimo, yra ypač saugus. JUNG HOME prietaisai, pvz., mygtukai ir kištukiniai lizdai, vienu metu gali veikti kaip siųstuvai ir imtuvai. Perduodamos komandos tinkle keliauja iš prietaiso į prietaisą, kol pasiekia tikslą. Tai leidžia palaikyti ryšį už tiesioginės belaidžio ryšio aprėpties ribų. „Bluetooth Mesh“ veikia be interneto ir serverio prieigos, todėl duomenys lieka tinklo viduje. JUNG HOME yra lanksti pastato valdymo sistema. Tai reiškia, kad sistemą galima lengvai išplėsti prijungiant naujas patalpas ar pastato aukštus bei papildomas funkcijas. Todėl šią sistemą galima įdiegti tiek mažesniuose, tiek ir didesniuose pastatuose. Sistemos konfigūravimui nereikia interneto prieigos, prietaisai tarpusavyje susiejami naudodami išmanųjį telefoną ir programėlę JUNG HOME. JUNG HOME integravimas į gamintojų tinklą „WORKS WITH mediola®“ atveria naudotojams daugybę papildomų galimybių prisijungti prie daiktų interneto pasaulio – daugelį buities prietaisų galima valdyti JUNG HOME mygtukais. JUNG HOME sistemą sujungus su „Amazon Alexa“ arba „Google Assistant“, atsiranda galimybė visus JUNG HOME prietaisus ir prie sistemos prijungtus kitų prekių ženklų gamintojų išmaniuosius sprendimus valdyti balsu. Be to, naudojantis programėlėmis „Amazon Alexa“ arba „Google Assistant“, JUNG HOME sistemą galima valdyti ir internetu.",  
    lbManagementInfo:"LB-Management – naujoji apšvietimo ir žaliuzių valdymo, patalpų temperatūros kontrolės sistema. Gyvenamuose manuose ši sistema užtikrina didesnį komfortą ir energijos vartojimo efektyvumą. Valdoma jungikliais arba išmaniaisiais įrenginiais „Clever Config“ programėle. Ryšys tarp programėlės ir LB-Management įrangos užmezgamas per „Bluetooth Low Energy“. Po sėkmingo nuskaitymo aptikti prietaisai yra parodomi sąraše ir perkėlus į programėlę yra konfiguruojami. Šia programėle universalus „Bluetooth“ laikmatis, universalus sieninis judesio jutiklis ir lubinis būvio jutiklis programuojami ir valdomi išmaniuoju telefonu: patogus funkcijų valdymas, rodmenų ir būsenos rodymas, laikmačio ir tokių parametrų, kaip išjungimo vėlinimas ar šviesos srauto, nustatymas. Susieti prietaisai gali būti priskirti patalpoms, jiems gali būti suteiktas vardas, kuris valdymą padaro aiškesnį.",
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
    config:"Pakartoti klausimyną",
    contactInfo:"Paspaudę mygtuką žemiau, būsite nukreipti(-a) į puslapį su tiekėjo kontaktinėmis informacijomis.",
    contactSupplier:"Susisiekti su tiekėju",
    backToMain:"Grįžti atgal į pagrindinį puslapį",
    errOneCategory:"Pasirinkite bent vieną kategoriją.",
    myHistory:"Mano istorija",
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
      'eNet Smart Home is a smart home automation system designed for convenient and efficient control of lighting, blinds, heating, and other electrical devices. The system operates wirelessly, so it can be easily integrated into existing homes without complex installation work. eNet Smart Home allows you to control devices both locally and remotely via the mobile app, providing users with more comfort and energy-saving options. Due to its reliability and flexibility, this system is an excellent solution for modern and functional homes.',
    knxInfo:'KNX is an open global standard for home and building control and automation. The JUNG KNX system offers advantages in the construction of private homes and other buildings: convenience, safety, and cost-effectiveness. All house and numerous multimedia functions can be integrated into a unified network with the intelligent KNX building system and controlled centrally. In the KNX system, all control elements are connected into a single system via the KNX cable. With KNX technology, it is easy to implement energy consumption visualization and data processing – "Smart-Metering". The specific functions of the components depend on their programming, which can be changed at any time. For the user, this is a convenient and flexible building technology that meets individual needs. By intelligently integrating room functions into a unified network, greater energy efficiency is achieved, as automatic regulation according to temperature, climate, lighting, and shading needs will help you reduce electricity and heating costs, while you can enjoy maximum comfort. Continuous monitoring, analysis, and visualization of electricity, gas, water, and other resource consumption will show you the potential for savings, optimize energy use, and reduce building operating costs. Statistical data, processes, and functions will be displayed on colorful, touch-sensitive screens. Using KNX capabilities, HiFi audio equipment, televisions, home cinema systems, the internet, and other devices can be easily integrated with the smart home control system. Then, all multimedia equipment can be controlled in one system along with other building engineering equipment. Smart touch screens allow various multimedia systems to be integrated into the KNX system, opening up many additional possibilities and expanding the range of functions. The new user interface on touch screens has never been so intuitive, making the control of various systems especially convenient.',
    jungInfo:"Jung offers smart home solutions that allow you to control lighting, heating, security, and energy. These solutions facilitate the control of various home systems through central control panels or mobile apps. Jung technologies include smart lighting control that can be customized to individual needs, as well as security systems with motion sensors, cameras, and locks that ensure home security. The climate control function allows you to automatically adjust temperature and ventilation to achieve optimal comfort. In addition, Jung solutions help to control energy consumption more efficiently, reduce costs, and increase energy savings.",  
    lbManagementInfo:"LB-Management is an intelligent building management system designed for efficient lighting, climate control, and other technical solutions. This system allows you to centrally monitor and regulate various building parameters to ensure higher energy efficiency and comfort. LB-Management is suitable for both residential and commercial buildings, providing users with an intuitive interface and the ability to remotely control systems. Due to its flexibility and smart features, this system becomes an integral part of modern buildings.",
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
    config:"Repeat questioneer",
    contactInfo:"By pressing the button below, you will be redirected to the supplier's contact information page.",
    contactSupplier:"Contact supplier",
    backToMain:"Back to main page",
    errOneCategory:"Choose at least one category.",
    myHistory:"My history",
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
      'eNet Smart Home ist ein Smart-Home-Automatisierungssystem, das für die bequeme und effiziente Steuerung von Beleuchtung, Jalousien, Heizung und anderen elektrischen Geräten entwickelt wurde. Das System arbeitet drahtlos, so dass es leicht in bestehende Häuser integriert werden kann, ohne komplexe Installationsarbeiten durchzuführen. eNet Smart Home ermöglicht es, Geräte sowohl lokal als auch über die mobile App ferngesteuert zu steuern und bietet den Benutzern mehr Komfort und Energiesparoptionen. Aufgrund seiner Zuverlässigkeit und Flexibilität ist dieses System eine hervorragende Lösung für moderne und funktionale Häuser.',
    knxInfo:'KNX ist ein offener globaler Standard für die Steuerung und Automatisierung von Häusern und Gebäuden. Das JUNG KNX-System bietet Vorteile beim Bau von privaten Häusern und anderen Gebäuden: Komfort, Sicherheit und Kosteneffizienz. Alle Haus- und zahlreiche Multimedia-Funktionen können in ein einheitliches Netzwerk mit dem intelligenten KNX-Gebäudesystem integriert und zentral gesteuert werden. Im KNX-System sind alle Bedienelemente über das KNX-Kabel zu einem einzigen System verbunden. Mit der KNX-Technologie ist es einfach, die Visualisierung des Energieverbrauchs und die Datenverarbeitung – "Smart-Metering" – zu implementieren. Die spezifischen Funktionen der Komponenten hängen von ihrer Programmierung ab, die jederzeit geändert werden kann. Für den Benutzer ist dies eine bequeme und flexible Gebäudetechnik, die individuellen Bedürfnissen entspricht. Durch die intelligente Integration von Raumfunktionen in ein einheitliches Netzwerk wird eine höhere Energieeffizienz erreicht, da die automatische Regelung nach Temperatur-, Klima-, Beleuchtungs- und Beschattungsbedürfnissen Ihnen hilft, Strom- und Heizkosten zu senken, während Sie maximalen Komfort genießen können. Die kontinuierliche Überwachung, Analyse und Visualisierung des Verbrauchs von Strom, Gas, Wasser und anderen Ressourcen zeigt Ihnen Einsparpotenziale auf, optimiert den Energieverbrauch und senkt die Betriebskosten des Gebäudes. Statistische Daten, Prozesse und Funktionen werden auf farbigen, berührungsempfindlichen Bildschirmen angezeigt. Mit den KNX-Funktionen können HiFi-Audioanlagen, Fernseher, Heimkinosysteme, das Internet und andere Geräte problemlos in das intelligente Haussteuerungssystem integriert werden. Dann kann die gesamte Multimedia-Ausrüstung zusammen mit anderen gebäudetechnischen Geräten in einem System gesteuert werden. Intelligente Touchscreens ermöglichen die Integration verschiedener Multimedia-Systeme in das KNX-System, was viele zusätzliche Möglichkeiten eröffnet und den Funktionsumfang erweitert. Die neue Benutzeroberfläche auf Touchscreens war noch nie so intuitiv, was die Steuerung verschiedener Systeme besonders bequem macht.',
    jungInfo:"Jung bietet intelligente Lösungen für das Smart Home, mit denen Sie Beleuchtung, Heizung, Sicherheit und Energie steuern können. Diese Lösungen erleichtern die Steuerung verschiedener Haussysteme über zentrale Bedienfelder oder mobile Apps. Die Technologien von Jung umfassen intelligente Lichtsteuerung, die an individuelle Bedürfnisse angepasst werden kann, sowie Sicherheitssysteme mit Bewegungssensoren, Kameras und Schlössern, die die Sicherheit des Hauses gewährleisten. Die Klimasteuerungsfunktion ermöglicht es, die Temperatur und Belüftung automatisch anzupassen, um optimalen Komfort zu erreichen. Darüber hinaus helfen die Lösungen von Jung, den Energieverbrauch effizienter zu steuern, Kosten zu senken und Energieeinsparungen zu erhöhen.",  
    lbManagementInfo:"LB-Management ist ein intelligentes Gebäudemanagementsystem, das für die effiziente Steuerung von Beleuchtung, Klima und anderen technischen Lösungen entwickelt wurde. Dieses System ermöglicht es, verschiedene Gebäudeparameter zentral zu überwachen und zu regulieren, um eine höhere Energieeffizienz und Komfort zu gewährleisten. LB-Management eignet sich sowohl für Wohn- als auch für Gewerbegebäude und bietet Benutzern eine intuitive Benutzeroberfläche und die Möglichkeit, Systeme remote zu steuern. Aufgrund seiner Flexibilität und intelligenten Funktionen wird dieses System zu einem integralen Bestandteil moderner Gebäude.",
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
    config:"Fragebogen wiederholen",
    contactInfo:"Durch Drücken der Schaltfläche unten werden Sie auf die Seite mit den Kontaktdaten des Lieferanten weitergeleitet.",
    contactSupplier:"Lieferant kontaktieren",
    backToMain:"Zurück zur Hauptseite",
    errOneCategory:"Wählen Sie mindestens eine Kategorie.",
    myHistory:"Meine Geschichte",
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
      'eNet Smart Home - это система умного дома, разработанная для удобного и эффективного управления освещением, жалюзи, отоплением и другими электрическими устройствами. Система работает беспроводно, поэтому ее можно легко интегрировать в существующие дома без сложных установочных работ. eNet Smart Home позволяет управлять устройствами как локально, так и удаленно через мобильное приложение, обеспечивая пользователям больше комфорта и возможностей экономии энергии. Благодаря своей надежности и гибкости эта система является отличным решением для современных и функциональных домов.',
    knxInfo:'KNX - это открытый глобальный стандарт для управления и автоматизации домов и зданий. Система JUNG KNX предлагает преимущества в строительстве частных домов и других объектов: удобство, безопасность и экономичность. Все функции дома и многочисленные мультимедийные функции можно объединить в единую сеть с помощью интеллектуальной системы KNX и управлять централизованно. В системе KNX все элементы управления соединены в одну общую систему с помощью кабеля KNX. С помощью технологии KNX легко реализовать визуализацию потребления энергии и обработку данных – "Smart-Metering". Конкретные функции компонентов зависят от их программирования, которое можно изменить в любое время. Для пользователя это удобная и гибкая строительная техника, которая отвечает его индивидуальным потребностям. Интеллектуально объединяя функции помещений в единую сеть, достигается большая энергоэффективность, так как автоматическое регулирование в зависимости от температуры, климата, освещения и затемнения поможет вам снизить затраты на электроэнергию и отопление, а вы сможете наслаждаться максимальным комфортом. Постоянный учет, анализ и визуализация потребления электроэнергии, газа, воды и других ресурсов покажут вам потенциал для экономии, оптимизируют использование энергии и снизят эксплуатационные расходы здания. Статистические данные, процессы и функции будут отображаться на цветных сенсорных экранах. Используя возможности KNX, HiFi аудиоаппаратуру, телевизоры, домашние кинотеатры, интернет и другие устройства можно легко интегрировать с системой управления умным домом. Тогда все мультимедийное оборудование можно будет управлять в одной системе вместе с другими инженерными устройствами здания. Умные сенсорные экраны позволяют интегрировать различные мультимедийные системы в систему KNX, что открывает множество дополнительных возможностей и расширяет спектр функций. Новый пользовательский интерфейс на сенсорных экранах никогда не был таким интуитивным, поэтому управление различными системами становится особенно удобным.',
    jungInfo:"Компания Jung предлагает умные домашние решения, которые позволяют управлять освещением, отоплением, безопасностью и энергией. Эти решения облегчают управление различными домашними системами через центральные панели управления или мобильные приложения. Технологии Jung включают в себя умное управление освещением, которое можно настроить под индивидуальные потребности, а также системы безопасности с датчиками движения, камерами и замками, обеспечивающими безопасность дома. Функция управления климатом позволяет автоматически регулировать температуру и вентиляцию для достижения оптимального комфорта. Кроме того, решения Jung помогают более эффективно управлять энергопотреблением, снижая расходы и увеличивая энергосбережение.",  
    lbManagementInfo:"LB-Management - новая система управления освещением и жалюзи, контроля температуры помещений. В жилых домах эта система обеспечивает больший комфорт и энергоэффективность. Управляется выключателями или умными устройствами с помощью приложения Clever Config. Связь между приложением и оборудованием LB-Management устанавливается через Bluetooth Low Energy. После успешного сканирования обнаруженные устройства отображаются в списке и, перенеся их в приложение, настраиваются. Этим приложением универсальный Bluetooth-таймер, универсальный стенной датчик движения и потолочный датчик присутствия программированы и управляются смартфоном: удобное управление функциями, отображение показателей и состояния, настройка таймера и параметров, таких как задержка отключения или поток света. Связанные устройства могут быть назначены помещениям, им может быть присвоено имя, что делает управление более понятным.",
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
    config:"Повторить опрос",
    contactInfo:"Нажав на кнопку ниже, вы будете перенаправлены на страницу с контактной информацией поставщика.",
    contactSupplier:"Связаться с поставщиком",
    backToMain:"Вернуться на главную страницу",
    errOneCategory:"Выберите хотя бы одну категорию.",
    myHistory:"Моя история",
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