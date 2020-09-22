
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});



const toolBar = new WtgToolBar(),
    eventManager = new EventManager(),
    dataManager = new DataManager(),
    chromeStorage = new ChromeStorage()


eventManager.registerListeners()
toolBar.show()
dataManager.dataSender()
dataManager.authToolbar()































// $(document).ready(function () {
//
//     const frame = document.getElementById('iframe1');
//     frame.onload = function () {
//         dataManager.getData(
//             "https://test.extention/api/domain",
//             {
//                 domain : window.location.href,
//                 columns: ['status','country'],
//                 manager: 'App\\Models\\Manager'
//             },
//             (data) =>  {
//                 frame.contentWindow.postMessage(data, '*');
//             }
//         )
//     }
//
// })

//-----------------------

/*chrome.tabs.query({currentWindow: true, active: true},
    function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            type:'fields',

            field1:'1111111',
            field2:'2222222',
            field3:'3333333'

        })
    }
)*/



/*$.ajax({
    type:"GET",
    url: "https://test.extention/api/domain",
    data: {
        domain : 'http://www.olxo.zzz.com.ua/',
        columns: ['status','country'],
        manager: 'App\\Models\\Manager'
    },
    success:(data) =>  {
        console.log(data)
        $('body').prepend('<div>'+data.status+'</div>')
    }
});*/

/*
window.addEventListener('message', event => {

    console.log(event.data);
    $('.wtg-toolbar__value bg-green').css({backgroundColor:'red'});



});
*/
