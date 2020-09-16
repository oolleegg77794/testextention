
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});



const toolBar = new WtgToolBar(),
    eventManager = new EventManager(),
    dataManager = new DataManager()


//-----------------------------------------------

eventManager.registerListeners()
toolBar.show()

$(document).ready(function () {

    const frame = document.getElementById('iframe1');
    frame.onload = function () {
        dataManager.getData(
            "https://test.extention/api/domain",
            {
                domain : window.location.href,
                columns: ['status','country'],
                manager: 'App\\Models\\Manager'
            },
            (data) =>  {
                frame.contentWindow.postMessage(data, '*');
            }
        )
    }

})

