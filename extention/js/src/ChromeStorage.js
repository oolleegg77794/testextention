
class ChromeStorage {

    getChromeStorage (key, closure= () => null)  {
        chrome.storage.sync.get([key], closure);
    }

    setChromeStorage(object, closure = () => null) {
        chrome.storage.sync.set(object, closure);
    }

}
