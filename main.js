var settings = new Store('settings', {"userkey" : ""});

function pushover(type, title, url, url_title) {
	var pushBoardURL = "https://api.pushover.net/1/messages.json";
	var xhr = new XMLHttpRequest();
	var userkey = encodeURIComponent(settings.get('userkey'));	
	
	if(type == 'dial') {
		title = 'Dial Request';
		url_title = 'Dial: ' + url;
		url = 'tel:' + url;
	} else if(type == 'link') {
		title = 'New Link';
		url_title = '';
	} else if(type == 'image') {
		title = 'New Image';
		url_title = '';
	}

	var title = encodeURIComponent(title);
	var url = encodeURIComponent(url);
	var url_title = encodeURIComponent(url_title);
	 
	var params = "token=c8WOOK4IiGR2OmvrmYoa78k2MmzYRE&user=" + userkey + "&title=Pushed+From+Chrome&message=" + title + "&url=" + url + "&url_title=" + url_title;
	
	if(type == 'text') {
		var params = "token=c8WOOK4IiGR2OmvrmYoa78k2MmzYRE&user=" + userkey + "&title=Pushed+From+Chrome&message=" + title;
	}
	
	console.log(params);
      xhr.open("POST", pushBoardURL, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
      	if (xhr.readyState == 4) {
	      	console.log('Successfully pushed to Pushover');
      	}
      }
      xhr.send(params);
};


chrome.contextMenus.create(
	{
		title: 'Push Link',
		contexts: ['link'],
		'onclick': function(info, tab) {
			console.log('Pushed link for: ' + info.linkUrl);
			pushover('link', info.linkUrl, info.linkUrl);
		}
	}, function() {
		console.log('Link context menu added');
	}
); 

chrome.contextMenus.create(
	{
		title: 'Push Page',
		contexts: ['page'],
		'onclick': function(info, tab) {
			console.log('Pushed page for: ' + info.pageUrl);
			pushover('page', tab.title, info.pageUrl, tab.title);
		}
	}, function() {
		console.log('Page context menu added');
	}
); 
	
chrome.contextMenus.create(
	{
		title: 'Push Image',
		contexts: ['image'],
		'onclick': function(info, tab) {
			console.log('Pushed Image for: ' + info.srcUrl);
			pushover('image', info.srcUrl, info.srcUrl);
		}
	}, function() {
		console.log('Image context menu added');
	}
); 

chrome.contextMenus.create(
	{
		title: 'Push \'%s\'',
		contexts: ['selection'],
		'onclick': function(info, tab) {
			console.log('Pushed Text for: ' + info.selectionText);
			pushover('text', info.selectionText);
		}
	}, function() {
		console.log('Selection text context menu added');
	}
); 

chrome.contextMenus.create(
	{
		title: 'Dial \'%s\'',
		contexts: ['selection'],
		'onclick': function(info, tab) {
			console.log('Send Dial Request for: ' + info.selectionText);
			pushover('dial', info.selectionText, info.selectionText);
		}
	}, function() {
		console.log('Dial text context menu added');
	}
);

if (settings.get('userkey')=='') {
	var optionsPage = chrome.extension.getURL('index.html');
	chrome.tabs.create(
		{
			url: optionsPage
		}
	);	
};