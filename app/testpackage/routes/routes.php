<?php
use Illuminate\Support\Facades\Route;


Route::get('/testPackage', function () {
    return view('testpackage::testview');
});

Route::get('/testFacade', function() {
    TestFacade::sayHello();
});


