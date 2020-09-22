
class WtgToolBar {

    constructor() {
        this.chromeStorage = new ChromeStorage()
    }

    show() {
        this.chromeStorage.getChromeStorage('status', result => {
            if("autorisated" === result.status){
                this.render_index()
            }
            else {
                this.render_logout()
            }
            $('body').css({paddingTop:40})
        })
    }

    render_index() {

/*        let iframe = document.createElement('iframe');
        iframe.src = chrome.runtime.getURL(type+'.html');
        iframe.id  = type;
        iframe.sandbox = "allow-scripts";
        $(iframe).css({position:'fixed',display:'block',top:-1,left:0,width:100+'%',height:57+'px', border:'none', zIndex:1000})
        $('body').css({paddingTop:40}).prepend(iframe)*/

        var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;

        const getToolbarIndex = (extensionUrl, webDoc) => {
            $.ajax({
                type:"GET",
                url: `${extensionUrl}/frontend/index.html`,
                success: (res) => {
                    console.log('success');
                    let parser = new DOMParser(),
                        doc = parser.parseFromString(res, "text/html"),
                        toolbar = doc.querySelector('.js-wtg-toolbar'),
                        toolbarModal = doc.querySelector('.js-wtg-toolbar-modal'),
                        styles = document.createElement('link'),
                        allImg = doc.querySelectorAll('img'),
                        scripts = document.createElement('script');

                    //Set styles and scripts
                    styles.setAttribute('rel', 'stylesheet');
                    styles.setAttribute('type', 'text/css');
                    styles.setAttribute('href', `${extensionUrl}/frontend/css/styles.min.css`);
                    scripts.setAttribute('src', `${extensionUrl}/frontend/js/script.min.js`);

                    //Set image url
                    allImg.forEach( el => {
                        let src = el.getAttribute('src');

                        switch (src.slice(0, 3)) {
                            case 'img':
                                src.replace('img',`${extensionUrl}/frontend/img`);
                                el.setAttribute('src', `${extensionUrl}/frontend/${src}`);
                            case 'svg':
                                src.replace('img',`${extensionUrl}/frontend/svg`);
                                el.setAttribute('src', `${extensionUrl}/frontend/${src}`);
                        }

                    });

                    //insert styles
                    webDoc.head.appendChild(styles);
                    webDoc.body.appendChild(toolbar);
                    webDoc.body.appendChild(toolbarModal);
                    webDoc.body.appendChild(scripts);

                }
            });
        }

        getToolbarIndex(extensionOrigin, document);

    }

    render_logout() {

        var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;

        const getToolbarIndex = (extensionUrl, webDoc) => {
            $.ajax({
                type:"GET",
                url: `${extensionUrl}/frontend/logout.html`,
                success: (res) => {
                    console.log('success');
                    let parser = new DOMParser(),
                        doc = parser.parseFromString(res, "text/html"),
                        toolbar = doc.querySelector('.js-wtg-toolbar'),
                        styles = document.createElement('link'),
                        allImg = doc.querySelectorAll('img'),
                        scripts = document.createElement('script');

                    //Set styles and scripts
                    styles.setAttribute('rel', 'stylesheet');
                    styles.setAttribute('type', 'text/css');
                    styles.setAttribute('href', `${extensionUrl}/frontend/css/styles.min.css`);
                    scripts.setAttribute('src', `${extensionUrl}/frontend/js/script.min.js`);

                    //Set image url
                    allImg.forEach( el => {
                        let src = el.getAttribute('src');

                        switch (src.slice(0, 3)) {
                            case 'img':
                                src.replace('img',`${extensionUrl}/frontend/img`);
                                el.setAttribute('src', `${extensionUrl}/frontend/${src}`);
                            case 'svg':
                                src.replace('img',`${extensionUrl}/frontend/svg`);
                                el.setAttribute('src', `${extensionUrl}/frontend/${src}`);
                        }

                    });

                    //insert styles
                    webDoc.head.appendChild(styles);
                    webDoc.body.appendChild(toolbar);
                    webDoc.body.appendChild(scripts);

                }
            });
        }

        getToolbarIndex(extensionOrigin, document);

    }

}
