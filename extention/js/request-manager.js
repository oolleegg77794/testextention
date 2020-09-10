
class ChromeStorage {

    getChromeStorage (key, closure= () => null)  {
        chrome.storage.sync.get([key], closure);
    }

    setChromeStorage(object, closure = () => null) {
        chrome.storage.sync.set(object, closure);
    }

}

class AuthManager {

    sendMessage(type, text){
        chrome.runtime.sendMessage({
            type : type,
            text : text
        });
    }

    constructor(query) {
        this.authUrl = "https://test.local/api/authenticate"
        this.regUrl = "https://test.local/api/register"
        this.logOutUrl = "https://test.local/api/logout"
        this.chromeStorage = new ChromeStorage()
        this.toolbar = new WtgToolBar()
        this.query = query

        switch (this.query.type) {
            case 'auth' :
                this.auth()
                break;
            case 'reg' :
                this.reg()
                break;
            case 'logout' :
                this.logOut()
                break;
        }
    }

    auth()
    {
        this.formRequest(
            this.authUrl,
            {
                email: this.query.email,
                password: this.query.password
            },
            (response) =>  {
                if("error" !== response) {
                    this.chromeStorage.setChromeStorage({session: response})
                    this.chromeStorage.setChromeStorage({status: 'autorisated'})
                    this.chromeStorage.setChromeStorage({email: this.query.email})
                    this.sendMessage('success','Вас авторизовано!')
                    chrome.storage.sync.get(['status'], function(result) {
                        console.log(result.status);
                    });
                    $('#iframe2').remove()
                    this.toolbar.render('iframe1')
                }
                if ("error" === response) {
                    this.sendMessage('error','Не правильний email або пароль!')
                }
            }
        )

    }

    reg()
    {
        this.formRequest(
            this.regUrl,
            {
                email: this.query.email,
                password: this.query.password
            },
            () => {
                console.log('success register')
            }
        )

    }

    logOut()
    {
        this.formRequest(
            this.logOutUrl,
            {},
            () => {
                this.chromeStorage.setChromeStorage({status: 'not autorisated'})
                console.log('success logout')

                $('#iframe1').remove()
                this.toolbar.render('iframe2')
            }
        )
    }

    formRequest(url, data, onSuccess, type = "POST")  {
        $.ajax({
            type:type,
            url: url,
            data: data,
            success: onSuccess
        });
    }

}

class WtgToolBar {

    constructor() {
        this.chromeStorage = new ChromeStorage()
    }

    show() {
        this.chromeStorage.getChromeStorage('status', result => {
            this.render("autorisated" === result.status ? "iframe1" : "iframe2")
        })
    }

    render(type) {
        let iframe = document.createElement('iframe');
        iframe.src = chrome.runtime.getURL(type+'.html');
        iframe.id  = type;
        $(iframe).css({position:'fixed',display:'block',top:-1,left:0,width:100+'%',height:57+'px', border:'none', zIndex:1000})
        $('body').css({paddingTop:40}).prepend(iframe)
    }

}

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

