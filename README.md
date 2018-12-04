# firefox-force-reload-all

[Add-on link on Addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/force-reload-all/)

This is a Firefox web-ext add-on for Firefox Android only. It provides a "Force Reload All" menu item, clicking which will activate and reload all tabs one by one, effectively force reload all tabs.

## Feature / Use Case

Firefox Android provides a convenient feature called [Tab Queue](https://support.mozilla.org/en-US/kb/open-links-background-later-viewing-firefox-android). It allows user to "open links in the background without leaving the app you're on". A good use of this feature is as following:

1. User opens RSS reader while offline
2. RSS reader only provides article summary, user finds a few articles interesting and clicks the link to send them to Firefox Tab Queue
3. Those articles stays in Firefox's background and are not loaded
4. When user goes back online, they switch to Firefox and start deep reading the previous queued articles
5. Now, user will have to WAIT for each article to load after clicking its tab, because they are not loaded in background

This add-on wants to solve the pain point explained in 5. above. Once user clicks the menu item provided by this add-on. All tabs will be force-reloaded, maximally utilize the active network.

## Functionality

Clicking the menu item provided by this add-on will trigger the following flow:

1. Query for all tabs via [`tabs.query()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/query)
2. For each tab:
    a. Make it active via [`tabs.update()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/update)
    b. Trigger a reload via [`tabs.reload()`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/reload)
    c. Wait 100ms before cycle to the next tab
3. After the whole cycle is done, Firefox will continue to load all tabs' content

There are a few "reload all" add-ons on Addons.mozilla.org (AMO), however they don't resolve the above pain point because they don't activate the tabs so they will stay in background and not loaded.