<?php


namespace App\Http\Controllers;

use App\Models\Sites;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Sentinel;
use Activation;
use Illuminate\Support\Facades\Cookie;


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


    
    public function authenticate(Request $request)
    {

        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];
        Sentinel::logout();

        Sentinel::forceAuthenticate($credentials);

        if ($user = Sentinel::check()) {
            return $ses = Session::get('cartalyst_sentinel');
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
        $user = Sentinel::findById(4);

        $site = new Sites(['url' => $url]);
        $user->site()->save($site);
        return $session = $request->input('session');
    }


}











