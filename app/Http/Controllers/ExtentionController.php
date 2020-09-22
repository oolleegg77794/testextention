<?php

namespace App\Http\Controllers;

use App\Models\Sites;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Sentinel;
use Activation;

class ExtentionController extends Controller
{

    /**
     * @var Request
     */
    public $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function authenticate()
    {
        $credentials = [
            'email' => $this->request->input('email'),
            'password' => $this->request->input('password')
        ];

        Sentinel::Authenticate($credentials);

        if (Sentinel::check()) {
            return  Session::get('cartalyst_sentinel');
        }
        return 'error';

    }

    public function register()
    {
        return Sentinel::register([
            'email' => $this->request->input('email'),
            'password' => $this->request->input('password')
        ]);
    }

    public function logout()
    {
        return Sentinel::logout();
    }

    public function get_site()
    {
        $url = $this->request->input('url');
        $user = Sentinel::findByPersistenceCode($this->request->input('session'));
        $site = new Sites(['url' => $url]);
        return $user->site()->save($site);

    }

    public function get_ext_data(){
        return $this->request;

    }

    public function index(){
        return view('index');

    }

}











