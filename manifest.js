// SAMPLE
this.manifest = {
    "name": "Chrome to Pushover",
    "icon": "icon64.png",
    "settings": [
		{
            "tab": i18n.get("information"),
            "group": i18n.get("login"),
            "name": "userkey",
            "type": "text",
            "label": i18n.get("userkey")
        },
        {
            "tab": i18n.get("information"),
            "group": i18n.get("login"),
            "name": "myDescription",
            "type": "description",
            "text": i18n.get("description")
        }
          ]
};
