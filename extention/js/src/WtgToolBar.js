
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
