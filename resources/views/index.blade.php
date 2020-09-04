<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <title>Relations</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>
<body>

<div class="container">
    <div class="container">
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
        </form>
        <div id="info"></div>
    </div>

    <div class="modal-content">
        <button type="button" id="auth" class="btn btn-info">Auth</button>
        <button type="button" id="logout" class="btn btn-danger">Logout</button>
        <button type="button" id="register" class="btn btn-primary">Register</button>
    </div>
</div>

<script>

$.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

/*
    const getChromeStorage = (key, closure= () => null) =>  {
        chrome.storage.local.get([key], closure);
    }

    const setChromeStorage = (object, closure = () => null) => {
        chrome.storage.local.set(object, closure);
    }*/

    const formRequest = (url, data, onSuccess) => {
        $.ajax({
            type:"POST",
            url: url,
            data: data,
            success: onSuccess
        });
    };



    $('#auth').on('click',function () {
        email = $('#exampleInputEmail1').val();
        password = $('#exampleInputPassword1').val();

        formRequest(
            "/authenticate",
            {
                email: email,
                password:password
            },
            function (response) {
                if ("error" !== response) {
/*
                    setChromeStorage({session: response})
                    setChromeStorage({status: 'autorisated'})
                    setChromeStorage({email: query.email})
                    getChromeStorage('session', console.log(session))
*/

                    console.log("succesAuth")
                }
            }
        )
    })

    $('#reg').on('click',function () {
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
    })

    $('#logout').on('click',function () {
        formRequest(
            "/logout",
            {},
            function (data) {
                status = 'not autorisated'
                chrome.storage.local.set({status: status}, function () {
                });
                console.log('success logout')
            }
        )
    })



    /*getChromeStorage('status', (result) => {
        if ("autorisated" === result.status) {
            getChromeStorage('session', (result) => formRequest(
                "/get_site",
                {
                    session: result.session,
                    url: window.location.href
                },
                function (data) {
                    console.log('get site success')
                }
            ))
        }
    })*/
    </script>
<?php
    var_dump($data);

?>
</body>
</html>
