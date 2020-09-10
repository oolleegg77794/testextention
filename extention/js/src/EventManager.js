
class EventManager {
    registerListeners() {

        this.registerOnMsgListener()

    }
    registerOnMsgListener() {
        chrome.runtime.onMessage.addListener(function (query){
            new AuthManager(query);
        })
    }

}
