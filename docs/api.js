YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "collectionDock"
    ],
    "modules": [
        "bb-collection-view",
        "collection-dock",
        "event-hanlders",
        "item",
        "proxy"
    ],
    "allModules": [
        {
            "displayName": "bb-collection-view",
            "name": "bb-collection-view",
            "description": "Object that connects data to the html."
        },
        {
            "displayName": "collection-dock",
            "name": "collection-dock"
        },
        {
            "displayName": "event-hanlders",
            "name": "event-hanlders",
            "description": "Defines the event handler for 'add' events on the collection."
        },
        {
            "displayName": "item",
            "name": "item",
            "description": "Defines methods that generate item-related templates and data.\nMethods here should be overwritten for custom behaviour."
        },
        {
            "displayName": "proxy",
            "name": "proxy",
            "description": "Proxies methods to the collection, if it is present."
        }
    ]
} };
});