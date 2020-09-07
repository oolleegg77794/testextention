

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
};

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
                    chrome.runtime.sendMessage({
                        type : 'success',
                        text : 'Вас авторизовано!'
                    })
                }
                if ("error" === response) {
                    chrome.runtime.sendMessage({
                        type : 'error',
                        text : 'Не правильний email або пароль!'
                    });
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
    onGetsite(result){
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
    }
}


chrome.runtime.onMessage.addListener(function (query, sender, sendResponse){
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

getChromeStorage('status', (result) => {
    if ("autorisated" === result.status) {
        getChromeStorage('session', (result) =>
            new RequestListener().onGetsite(result)
        )
    }
})








