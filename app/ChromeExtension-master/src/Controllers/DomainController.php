<?php


namespace ChromeExtension\Controllers;


use App\Http\Controllers\Controller;
use ChromeExtension\DomainSelectOptions;
use ChromeExtension\Models\Domain;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Psy\Util\Json;
use Sentinel;

/**
 * Class DomainController
 * @package ChromeExtension\Controllers
 */
class DomainController extends Controller
{

    const STATUS = [
        'ID' => 'This domain is invalid',
        'IC' => 'These columns are invalid',
        'DNF' => 'Domain not found',
    ];

    /**
     * @var Request
     */
    private $request;

    /**
     * @var DomainSelectOptions
     */
    private $selectHelper;

    /**
     * DomainController constructor.
     * @param Request $request
     * @param DomainSelectOptions $selectHelper
     */
    public function __construct(Request $request, DomainSelectOptions $selectHelper)
    {
        $this->request = $request;
        $this->selectHelper = $selectHelper;
    }

    /**
     * @return array|string
     */
    public function index()
    {

        $domain = $this->request->get('domain');

        if (null === $domain) {
            return static::STATUS['ID'];
        }

        try {
            $model = Domain::query()
                ->select($this->request->get('columns', ['*']))
                ->where('domain', $domain)->first();

            if (null === $model) {
                return static::STATUS['DNF'];
            }

            foreach ($this->selectHelper->getOption('columns') as $column) {
                if (isset($model[$column])) {
                    $model[$column] = $this->selectHelper->getOption($column)[$model[$column]];
                }
            }

            if (isset($model['manager_id'])) {
                $model->setManagerModel($this->request->get('manager'));
                $model['manager'] = $model->getManagerInfo();
            }

            return $model;

        } catch (\Exception $exception) {
            return static::STATUS['IC'];
        }
    }

    /**
     * @return array|string
     */
    public function options()
    {
        if (null === $this->request->get('options')) {
            return 'You did not send options';
        }

        return $this->selectHelper->getOption($this->request->get('options'));
    }


    public function extAuth()
    {

        $credentials = [
            'email' => $this->request->input('email'),
            'password' => $this->request->input('password')
        ];

        Sentinel::Authenticate($credentials);

        if (Sentinel::check()) {

            $token = Session::get('cartalyst_sentinel');

            return view('token')->with(['token'=>$token]);
        }
        return 'error';

    }



}
