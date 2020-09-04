<?php

namespace App\Http\Controllers;

use App\Models\Sites;
use Illuminate\Http\Request;
use Sentinel;
use Activation;
use Cartalyst\Sentinel\Sessions\SessionInterface;
use Illuminate\Support\Facades\Session;


class ExtentionController extends Controller
{

    /**
     * @var User
     */
    public $user;

    /**
     * @var Request
     */
    public $request;

    /**
     * @var Credentials
     */
    public $credentials;


    public function authenticate(Request $request)
    {

        Sentinel::logout();

        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];



        Sentinel::forceAuthenticate($credentials);

        if ($user = Sentinel::check()) {
            return Session::get('cartalyst_sentinel');
        }
        return 'error';

    }

    public function register(Request $request)
    {
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];
        return Sentinel::register($credentials);

    }

    public function logout()
    {

        return Sentinel::logout();

    }

    public function get_site(Request $request)
    {

        $url = $request->input('url');
        $user = Sentinel::findById(1);

        $site = new Sites(['url' => $url]);
        return $user->site()->save($site);

    }
}

/*
//аутентификация через сесию
    public function authenticate()
    {

        Sentinel::logout();

        Sentinel::forceAuthenticate($this->credentials);

        if ($user = Sentinel::check())
        {
            return \Session::get('cartalyst_sentinel');
        }
        return 'error';
    }*/
