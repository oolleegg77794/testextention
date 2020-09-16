 $.ajaxSetup({
    headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
}
});

 $(document).ready(function() {

     const formRequest = (url, data, onSuccess) => {
         $.ajax({
             type: "POST",
             url: url,
             data: data,
             success: onSuccess
         });
     };

     class RequestListener
     {
        onAuth(email, password) {
         formRequest(
             "/authenticate",
             {
                 email: email,
                 password: password
             },
             function (response) {
                 if ("error" !== response) {
                     let status = 'autorisated',
                         session = response;
                     localStorage.setItem('session', session)
                     localStorage.setItem('status', status)
                     console.log("succesAuth")
                     $('#error').hide();
                     $('form').hide();
                     $('#info').append('<div>' + 'Вас авторизовано!' + '</div>');
                 }
                 if ("error" === response) {
                     $('#info').hide();
                     $('#error').append('<div>' + 'Не правильний email або пароль!' + '</div>');
                 }
             }
         )
        }
        onReg(email, password){
            formRequest(
                "/register",
                {
                    email: email,
                    password: password
                },
                function (data) {
                    console.log('success register')
                }
            )
        }
        onLogout(){
            formRequest(
                "/logout",
                {},
                function (data) {
                    let status = 'not autorisated'
                    localStorage.setItem('status', status)
                    console.log('success logout')
                }
            )
        }
        onGetsite(session){
            formRequest(
                "/get_site",
                {
                    session: session,
                    url: window.location.href
                },
                function (data) {
                    console.log('get site success')
                }
            )
        }
     }

     $('#auth').on('click', function () {
         let email = $('#inputEmail').val(),
             password = $('#inputPassword').val();
         new RequestListener().onAuth(email, password);
     })

     $('#reg').on('click', function () {
         let email = $('#inputEmail').val(),
             password = $('#inputPassword').val();
         new RequestListener().onReg(email, password);
     })

     $('#logout').on('click', function () {
         new RequestListener().onLogout();
     })


    let status = localStorage.getItem('status'),
        session = localStorage.getItem('session')
    if ("autorisated" === status || null !== session) {
        new RequestListener().onGetsite(session);
    }

})
