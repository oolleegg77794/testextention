<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    <title>Relations</title>
    <script src="js/jquery-3.5.1.min.js"></script>
    <script src="js/script.js"></script>

</head>
<body>

<div class="container">
    <form>
        <h1>FORM</h1>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
    </form>
    <div id="info"></div>
    <div id="error"></div>

    <div class="status_buttons">
        <button type="button" id="auth" class="btn btn-info">Auth</button>
        <button type="button" id="logout" class="btn btn-danger">Logout</button>
        <button type="button" id="register" class="btn btn-primary">Register</button>
    </div>
</div>





</body>
</html>
