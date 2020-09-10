
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

//-----------------------------------------------

const toolBar = new WtgToolBar(),
    eventManager = new EventManager()

eventManager.registerListeners()
toolBar.show()

