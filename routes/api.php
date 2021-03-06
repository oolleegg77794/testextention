<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('authenticate', 'ExtentionController@authenticate');

Route::post('register', 'ExtentionController@register');

Route::post('logout', 'ExtentionController@logout');

Route::post('get_site', 'ExtentionController@get_site');

Route::get('getdata', 'ExtentionController@get_ext_data');




