
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// Avoid recursive frame insertion...
var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
if (!location.ancestorOrigins.contains(extensionOrigin)) {
    var iframe = document.createElement('iframe');
    // Must be declared at web_accessible_resources in manifest.json
    iframe.src = chrome.runtime.getURL('iframe.html');

    // Some styles for a fancy sidebar
    iframe.style.cssText = 'position:fixed;top:0;left:0;display:block;' +
        'width:100%;height:100%;z-index:1000;';
    document.body.appendChild(iframe);
    $('body')
}


const getChromeStorage = (key, closure= () => null) =>  {
    chrome.storage.sync.get([key], closure);
}

const setChromeStorage = (object, closure = () => null) => {
    chrome.storage.sync.set(object, closure);
}

const formRequest = (url, data, onSuccess) => {
    $.ajax({
        type:"POST",
        url: url,
        data: data,
        success: onSuccess
    });
}

const sendMessage = (type, text) => {
    chrome.runtime.sendMessage({
        type : type,
        text : text
    });
}


class RequestListener
{
    onAuth(query) {
        formRequest(
            "https://test.local/api/authenticate",
            {
                email: query.email,
                password: query.password
            },
            function (response) {
                if("error" !== response) {
                    let status = 'autorisated',
                        session = response,
                        email = query.email
                    setChromeStorage({session: response})
                    setChromeStorage({status: status})
                    setChromeStorage({email: email})
                    sendMessage('success','Вас авторизовано!')
                }
                if ("error" === response) {
                    sendMessage('error','Не правильний email або пароль!')
                }
            }
        )
    }
    onReg(query){
        formRequest(
            "https://test.local/api/register",
            {
                email: query.email,
                password: query.password
            },
            function (data) {
                console.log('success register')
            }
        )
    }
    onLogout(){
        formRequest(
            "https://test.local/api/logout",
            {},
            function (data) {
                let status = 'not autorisated'
                setChromeStorage({status: status})
                console.log('success logout')
            }
        )
    }
    onGetsite(){
        getChromeStorage('status', (result) => {
            if ("autorisated" === result.status) {
                getChromeStorage('session', (result) =>
                    formRequest(
                        "https://test.local/api/get_site",
                        {
                            session: result.session,
                            url: window.location.href
                        },
                        function (data) {
                            console.log('get site success')
                        }
                    )
                )
            }
        })
    }

}


chrome.runtime.onMessage.addListener(function (query){
    switch (query.type) {
        case 'auth' :
            new RequestListener().onAuth(query)
            break;

        case 'reg' :
            new RequestListener().onReg(query)
            break;

        case 'logout' :
            new RequestListener().onLogout()
            break;
    }

})

new RequestListener().onGetsite()








