
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});


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

const Toolbar = (type)=> {
    var iframe = document.createElement('iframe');
    iframe.src = chrome.runtime.getURL(type+'.html');
    iframe.id  = type;
    $(iframe).css({position:'fixed',display:'block',top:-1,left:0,width:100+'%',height:57+'px', border:'none', zIndex:1000})
    $('body').css({paddingTop:40}).prepend(iframe)
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
                    setChromeStorage({session: response})
                    setChromeStorage({status: 'autorisated'})
                    setChromeStorage({email: query.email})
                    sendMessage('success','Вас авторизовано!')
                    $('#iframe2').remove()
                    Toolbar('iframe1')
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
                $('#iframe1').remove()
                Toolbar('iframe2')
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
    onGettoolbar(){
        getChromeStorage('status', (result) => {
            if ("autorisated" === result.status) {
                Toolbar('iframe1')
            }
            else {Toolbar('iframe2')}
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

/*new RequestListener().onGetsite()*/
new RequestListener().onGettoolbar()



