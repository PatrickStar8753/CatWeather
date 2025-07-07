// Скрипт работы погоды.

// Объявление переменных и настроек

var weathercontainer;

// Получаем параметры
var yourCity = System.Gadget.Settings.read("city");
var updateInterval = parseInt(System.Gadget.Settings.read("updateInterval"));
var access_key = System.Gadget.Settings.read("access_key");

// setup() запускается после полной загрузки гаджета и объявляет все переменные и настройки.

function setup(){
	try {
		// Старый JS, никаких classList.add!
        document.getElementById("details").className = "load";
        weathercontainer = document.getElementById("weather_container");
	    var WeatherBG = document.getElementById("WeatherBG");
		// Undock / Dock - изменение размера
        System.Gadget.onUndock = checkState;
	    System.Gadget.onDock = checkState;
		// Указываем HTML-файл настроек и действие при закрытии настроек
		System.Gadget.settingsUI = "settings.html";
		System.Gadget.onSettingsClosed = settingsClosed;
		// Проверяем размер
        checkState();
		// Продолжаем объявление элементов
        var city = document.getElementById("city");
        var airquality = document.getElementById("airquality");
        var humidity = document.getElementById("humidity");
        var feelslike = document.getElementById("feelslike");
        var gradus = document.getElementById("gradus");
        var weathername = document.getElementById("weathername");
		var lastupdated = document.getElementById("lastupdated");
        var answer;
		// Если есть ключ, обновляем данные. Если нету, просим настроить гаджет.
        if (access_key != "") {updateWeather()} else {city.innerHTML = "Setup this gadget!"}
	} catch (e) {document.getElementById("city").innerHTML = e.message /* Если что-то полетит */}
}

// При закрытии гаджета на всякий случай все подчищаем.

function cleanup(){
	try {
        document.getElementById("details").className = "load";
		city.innerHTML = "Preapiring...";
        airquality.innerHTML = 'O<sub>3</sub>: <span class="number">0</span>';
        humidity.innerHTML = 'Humidity: <span class="number">0%</span>';
        feelslike.innerHTML = 'Feels like: <span class="number">0&deg;C</span>';
        gradus.innerHTML = "0&deg;C";
        weathername.innerHTML = "Cool";
		clearTimeout(tm);
	} catch (e) {document.getElementById("city").innerHTML = e.message}
}

// Обновление данных о погоде и отправка запроса на сервер WeatherStack.

function updateWeather() {
	// Делаем "визуальный" статус обновления
    city.innerHTML = "Updating...";
    document.getElementById("details").className = "load";
	// Старый JS, работаем с XHR.
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.weatherstack.com/forecast?access_key=" + access_key + "&query=" + yourCity + "&_=" + new Date().getTime(), true);
																											// ^ - Чтобы не было кэширования ответа
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
        	if (xhr.status === 200) {
				// readyState = 4 & status = 200 -> Получили ответ
				try {
            		answer = JSON.parse(xhr.responseText);
                	city.innerHTML = answer.location.name;
                	airquality.innerHTML = 'O<sub>3</sub>: <span class="number">' + answer.current.air_quality.o3 + '</span>';
                	humidity.innerHTML = 'Humidity: <span class="number">' + answer.current.humidity + '%</span>';
                	feelslike.innerHTML = 'Feels like: <span class="number">' + answer.current.feelslike + '&deg;C</span>';
                	gradus.innerHTML = answer.current.temperature + "&deg;C";
                	weathername.innerHTML = answer.current.weather_descriptions[0];
					document.getElementById("details").className = "";
				} catch (e) {city.innerHTML = "Error: Check your settings."}
        	} else {
				if (xhr.status === 12007) {
					// 12007 - ошибка подключения к интернету.
					city.innerHTML = "Internet error.";
				} else {
					city.innerHTML = "Error! XMLHttpRequest status:" + xhr.status;
				}
        	}
			lastupdated.innerHTML = "Last updated: " + getCurrentTime();
			xhr.abort();
        }
    };
	xhr.send();
	// Обновление каждые N минут, указанные в updateeInterval
	var tm = setTimeout(updateWeather, updateInterval * 60000);
}

// Проверка размера гаджета

function checkState()
{
	// !docked - большой размер
	if(!System.Gadget.docked) 
	{
		undockedState();
	} 
	// docked - маленький размер
	else if (System.Gadget.docked)
	{
		dockedState(); 
	}
}

// Меняем размеры и классы гаджета.

function undockedState()
{
	gUndockFlag = true;
	with(document.body.style)
		width=360, 
		height=280;

	with(WeatherBG.style)
		width=360, 
		height=280;
	WeatherBG.src="url(images/glass.png)";

	with(weathercontainer.style)
		marginTop=16,marginleft=17,width=320, height=240;
		weathercontainer.className = "";
}

function dockedState()
{ 
	with(document.body.style)
		width=130,
		height=100;

	with(WeatherBG.style)
		width=130,
		height=100;
	WeatherBG.src="url(images/glassS.png)";

	with(weathercontainer.style)
		marginTop=5,marginleft=4,width=120, height=90;
	weathercontainer.className = "small";
}

// Получение времени для показа времени последнего обновления

function getCurrentTime() {
    var now = new Date();

    function pad(n) {
        return (n < 10 ? "0" : "") + n;
    }

    var hours = pad(now.getHours());
    var minutes = pad(now.getMinutes());
    var seconds = pad(now.getSeconds());

    return hours + ":" + minutes + ":" + seconds;
}

// Функция при закрытии настроек. Обновляем параметры, если пользователь нажал на OK.

function settingsClosed(event)
{
	if (event.closeAction == event.Action.commit)
	{
		yourCity = System.Gadget.Settings.read("city");
		updateInterval = parseInt(System.Gadget.Settings.read("updateInterval"));
		access_key = System.Gadget.Settings.read("access_key");
		updateWeather();
	} else if (event.closeAction == event.Action.cancel) {}
}