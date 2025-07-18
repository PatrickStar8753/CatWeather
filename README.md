![logo](readme/logows.png)

Рабочий гаджет погоды с Weatherstack API. Оформлен в стиле Windows Aero.

Гаджет умеет показывать город и температуру в миниатюрном виде, а также загрязненность и влажность воздуха, как ощущается температура и погодные условия в развернутом виде.

![sizes](readme/sizes.png)

# Установка гаджета
Устаовка происходит в пару кликов:
1. Скачайте архив при помощи кнопки `Code -> Download ZIP`
2. Достаньте папку из архива и переименуйте её в `CatWeather.Gadget`
3. Переместите папку в `C:\Program Files\Windows Sidebar\Gadgets`
4. Готово!

![howto](readme/howto.gif)

# Настройка гаджета
При первом использовании гаджет попросит настроить его. Для этого зайдите в настройки гаджета.

![settings](readme/settings.gif)

Внутри настроек всего 3 пункта:
1. Ключ от Weatherstack API _(получить можно по ссылке, указанная в настройках гаджета)_
2. Нужный город на латинице.
3. Интервал обновления в минутах

Если параметры будут некорректны, гаджет сообщит об этом.

![settingserror](readme/settingserror.png)

# Справочник по файлам

| Файл                       | Назначение                                                                                                                        |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `/ru-RU/css/settings.css`  | Стили для окна с настройками.                                                                                                     |
| `/ru-RU/css/weather.css`   | Стили для самого гаджета.                                                                                                         |
| `/ru-RU/images/glass.png`  | Aero-рамка для гаджета развернутого вида.                                                                                         |
| `/ru-RU/images/glassS.png` | Aero-рамка для гаджета маленького вида.                                                                                           |
| `/ru-RU/js/json2.js`       | Скрипт, который добавляет поддержку работы JSON в старых браузерных движках.                                                      |
| `/ru-RU/js/settings.js`    | Скрипт для настроек.                                                                                                              |
| `/ru-RU/js/weather.js`     | Скрипт для гаджета, там весь основной функционал.                                                                                 |
| `/ru-RU/gadget.xml`        | XML-файл с информацией о гаджете. Там указывается имя, иконки и версия гаджета, а также логотип, имя, год и сайт организации.     |
| `/ru-RU/settings.html`     | HTML-файл для настроек.                                                                                                           |
| `/ru-RU/weather.html`      | HTML-файл для самого гаджета. Именно этот файл показывается при добавлении гаджета на рабочий стол.                               |
| `/drag.png`                | Картинка, которая показывается при перемещении каджета с окна выбора гаджетов на рабочий стол. Должна быть равна размеру гаджета. |
| `/icon.png`                | Картинка, которая показывается в окне выбора гаджетов.                                                                            |
| `/logo.png`                | Логотип организации, который показывается в подробностях гаджета.                                                                 |

<img src="readme/gadgetimages.png" width="100%">

---

Каждый скрипт подробно закомментирован для понимания работы гаджета.
