<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/




Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


Route::post('/authenticate', 'ExtentionController@authenticate');

Route::post('/register', 'ExtentionController@register');

Route::post('/logout', 'ExtentionController@logout');

Route::post('/get_site', 'ExtentionController@get_site');


Route::any('/', 'ExtentionController@index');

