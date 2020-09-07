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
     * @var Request
     */
    public $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->url = $request->input('url');

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
        $user = Sentinel::findByPersistenceCode($this->request->input('session'));
        $site = new Sites(['url' => $this->url]);
        return $user->site()->save($site);

    }

    public function index()
    {
        return view('index');
    }

}











