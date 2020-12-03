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


Route::post('authenticate', 'ExtensionController@authenticate');

Route::post('register', 'ExtensionController@register');

Route::post('logout', 'ExtensionController@logout');

Route::post('get_site', 'ExtensionController@get_site');

Route::get('getdata', 'ExtensionController@get_ext_data');

Route::get('logout', [\ChromeExtension\Controllers\ExtensionController::class, 'logout']);



