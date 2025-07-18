// Скрипт настроек.

// Объявление элементов

var acceessKeyInput;
var cityInput;
var updateIntervalInput;

// Объявление класса настроек
var mySettings = new weatherSettings();

// Функция загрузки настроек

function loadSettings()
{	
	// Присваивание элементов после загрузки настроек
	acceessKeyInput = document.getElementById("access_key");
	cityInput = document.getElementById("city");
	updateIntervalInput = document.getElementById("updateInterval");

	// Восстановление значений текущих настроек
	mySettings.load();

	// Обновляем значения параметров в элементах
	updateSettings(mySettings);

	// Вызов функции при закрытии настроек
	System.Gadget.onSettingsClosing = settingsClosing;
	
	self.focus;document.body.focus();
}

// Функция обновления значений

function updateSettings(settings)
{
	acceessKeyInput.value = settings.access_key;
	cityInput.value = settings.city;
	updateIntervalInput.value = settings.updateInterval;
}

// Функция при закрытии настроек. Если пользователь нажал на OK, сохраняем настройки.

function settingsClosing(event)
{
	if (event.closeAction == event.Action.commit)
	{
		mySettings.save();
	}
	
	event.cancel = false;
}

// Объект настроек (настрйоки по умолчанию, загрузка и сохранение)

function weatherSettings()
{ 
	this.access_key = "";
	this.city = "Moscow";
	this.updateInterval = "1";
	this.save = saveSettingToDisk;
	this.load = loadSettingFromDisk;
}

// Если есть пользовательские настройки, загружаем их

function loadSettingFromDisk()
{
	if (System.Gadget.Settings.read("SettingExist") == true) 
	{
		mySettings.access_key = System.Gadget.Settings.read("access_key");
		mySettings.city = System.Gadget.Settings.read("city");
		mySettings.updateInterval = System.Gadget.Settings.read("updateInterval");
	}
}

// Сохранеям настройки

function saveSettingToDisk()
{
	System.Gadget.Settings.write("access_key", acceessKeyInput.value);
	System.Gadget.Settings.write("city", cityInput.value);
	System.Gadget.Settings.write("updateInterval", updateIntervalInput.value);
	System.Gadget.Settings.write("SettingExist", true);
}