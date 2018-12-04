function reloadTabs(tabs) {
    for (var i = 0; i <= tabs.length; i++) {
        (function (ind) {
            setTimeout(function () {
                browser.tabs.update(tabs[ind].id, {
                    active: true,
                });
                browser.tabs.reload(tabs[ind].id);
            }, 100 * ind);
        })(i);
    }
}

function reload() {
    browser.tabs.query({}).then(reloadTabs);
}

browser.browserAction.onClicked.addListener(reload);

browser.contextMenus.create({
    id: "force-reload-all",
    title: "Force Reload All",
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
    switch (info.menuItemId) {
        case "force-reload-all":
            reload()
            break;
    }
})