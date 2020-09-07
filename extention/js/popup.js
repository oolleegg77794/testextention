
$(document).ready(function(){

    $('#auth').on('click',function () {
        chrome.tabs.query({currentWindow: true, active: true},
        function (tabs){

            email = $('#exampleInputEmail1').val();
            password = $('#exampleInputPassword1').val();

            chrome.tabs.sendMessage(tabs[0].id, {
                type : 'auth',
                email : email,
                password : password
             }, function(response) {});

        })
    })

    $('#register').on('click',function () {
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs){
                email = $('#exampleInputEmail1').val();
                password = $('#exampleInputPassword1').val();

                chrome.tabs.sendMessage(tabs[0].id, {
                    type : 'reg',
                    email : email,
                    password : password
                }, function(response) {});
            })
    })

    $('#logout').on('click',function () {
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs){
                chrome.tabs.sendMessage(tabs[0].id, {
                    type : 'logout',
                }, function(response) {});
        })
        $('form').show();
    })

    chrome.storage.sync.get(['status'], function(result) {
        console.log(result.status)
        if (result.status == 'autorisated'){
            $('form').hide();
            $('#info').append('<div>' + 'Вас авторизовано!' + '</div>');
        }
    })


    chrome.runtime.onMessage.addListener(function (result){

        if (result.type == 'error'){
            $('#error').append('<div>' + result.text + '</div>');
        }

        if (result.type == 'success'){
            $('#error').hide();
            $('form').hide();
            $('#info').append('<div>' + result.text + '</div>');
        }

    })





})
