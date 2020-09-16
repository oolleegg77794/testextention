<?php


namespace ChromeExtension\Controllers;


use App\Http\Controllers\Controller;
use ChromeExtension\DomainSelectOptions;
use ChromeExtension\Models\Domain;
use Illuminate\Http\Request;

/**
 * Class DomainController
 * @package ChromeExtension\Controllers
 */
class DomainController extends Controller
{
    const STATUS = [
        0 => 'Invalid domain',
        1 => 'Invalid columns',
        2 => 'Domain not found',

    ];

    /**
     * @param Request $request
     * @param DomainSelectOptions $domainSelect
     * @return array|string
     */
    public function index(Request $request, DomainSelectOptions $domainSelect)
    {

        $domain = $request->get('domain');

        if (null === $domain) {
            return self::STATUS[0];
        }

        try {
            $model = Domain::query()
                ->select($request->get('columns', ['*']))
                ->where('domain', $domain)->first()->toArray();


            if (null === $model) {
                return self::STATUS[2];
            }

            foreach ($domainSelect->getOption('columns') as $column) {
                if (isset($model[$column])) {
                    $model[$column] = $domainSelect->getOption($column)[$model[$column]];
                }
            }

            if (isset($model['manager'])) {
                $model['manager'] = $this->getManagerInfo($model['manager'], $request->get('manager'));
            }
            return $model;

        } catch (\Exception $exception) {
//            return $exception->getMessage();
            return self::STATUS[1];
        }
    }

    /**
     * @param Request $request
     * @param DomainSelectOptions $domainSelect
     * @return array
     */
    public function options(Request $request, DomainSelectOptions $domainSelect)
    {
        return $domainSelect->getOption($request->get('options'));
    }

    /**
     * @param string $manager_id
     * @param string $model_name
     * @return mixed
     */
    private function getManagerInfo(string $manager_id, string $model_name)
    {
        return $model_name::query()->select(['name', 'id', 'avatar'])->find($manager_id);
    }

}
