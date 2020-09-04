

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


chrome.runtime.onMessage.addListener(function (query, sender, sendResponse){

    switch (query.type) {
        case 'auth' :

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
                        getChromeStorage('session',console.log(session))
                    }
                }
            )
            break;

        case 'reg' :

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

            break;

        case 'logout' :

            formRequest(
                "https://test.local/api/logout",
                {},
                function (data) {
                    let status = 'not autorisated'
                    setChromeStorage({status: status})
                    console.log('success logout')
                }
            )

            break;

    }

})

getChromeStorage('status', (result) => {
    if ("autorisated" === result.status) {
        getChromeStorage('session', (result) => formRequest(
            "https://test.local/api/get_site",
            {
                session: result.session,
                url: window.location.href
            },
            function (data) {
                console.log('get site success')
            }
        ))
    }
})










/*


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
    $.post({
        url: url,
        data: data,
        success: onSuccess
    });
};


chrome.runtime.onMessage.addListener(function (query, sender, sendResponse){

    switch (query.type) {
        case 'auth' :

            formRequest(
                "https://test.local/api/authenticate",
                {
                    email: query.email,
                    password: query.password
                },
                function (response) {
                    if("error" !== response) {
                        console.log(response)
                        setChromeStorage({session: response})
                        setChromeStorage({status: 'autorisated'})
                        setChromeStorage({email: query.email})
                        getChromeStorage('session',console.log(session))

                        console.log("succesAuth")
                    }
                }
            )
            break;

        case 'reg' :

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

            break;

        case 'logout' :

            formRequest(
                "https://test.local/api/logout",
                {},
                function (data) {
                    status = 'not autorisated'
                    chrome.storage.sync.set({status: status}, function(){});
                    console.log('success logout')
                }
            )

            break;

    }

})

getChromeStorage('status', (result) => {
    if ("autorisated" === result.status) {
        getChromeStorage('session', (result) => formRequest(
            "https://test.local/api/get_site",
            {
                session: result.session,
                url: window.location.href
            },
            function (data) {
                console.log('get site success')
            }
        ))
    }
})
*/



//---------------------------------------------------------------
/*
const getChromeStorage = (key, closure) =>  {
    chrome.storage.local.get([key], closure);
}

const setChromeStorage = (object, closure = () => null) => {
    chrome.storage.local.set(object, closure);
}

const formRequest = (url, data, onSuccess) => {
    $.post({
        url: url,
        data: data,
        success: onSuccess
    });
};

chrome.runtime.onMessage.addListener(function (query, sender, sendResponse){

    switch (query.type) {
        case 'auth' :
            formRequest(
                "https://test.local/api/authenticate",
                {
                    email: query.email,
                    password: query.password
                },
                function (response) {
                    if("error" !== response) {
                       // status = 'autorisated'
                        setChromeStorage({session: response})
                        setChromeStorage({status: status})
                        console.log("succesAuth")
                    }
                }
            )
            break;
        case 'reg' : break;
        case 'logout' : break;

    }

})


getChromeStorage('status', (result) => {
    if("auhorized" === result.status) {
        getChromeStorage('session', (result) => formRequest(
            "https://test.local/api/get_site",
            {
                session: result.session,
                url:  window.location.href
            },
            function (data) {
                console.log('get site success')
            }
        ))
    }
})*/





