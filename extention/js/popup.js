
$(document).ready(function(){

    const sendExtentionData = (type) => {
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: type,
                    email: $('#inputEmail').val(),
                    password: $('#inputPassword').val()
                }, function (response) {});
            }
        )
    }

    $('#auth').on('click',function () {
        sendExtentionData('auth')
    })

    $('#register').on('click',function () {
        sendExtentionData('reg')
    })

    $('#logout').on('click',function () {
        sendExtentionData('logout')
        $('form').show();
    })

    chrome.storage.sync.get(['status'], function(result) {
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



