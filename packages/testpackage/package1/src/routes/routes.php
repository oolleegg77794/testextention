<?php
use Illuminate\Support\Facades\Route;

Route::get('/testPackage', function () {
    return view('welcome');
});


Route::get('/testPackage2', function () {
    return view('testpackage::testview');
});
