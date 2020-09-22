<?php

namespace ChromeExtension\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Domain
 * @package ChromeExtension\Models
 */
class Domain extends Model
{
    protected $table = 'domain_list';

    protected $guarded = ['id'];

    /**
     * @var string|Model
     */
    private static $managerModel;

    /**
     * @param string|Model $managerModel
     */
    public static function setManagerModel($managerModel)
    {
        static::$managerModel = $managerModel;
    }

    /**
     * @return Model|string
     */
    public static function getManagerModel()
    {
        return static::$managerModel;
    }

    /**
     * @return mixed
     */
    public function getManagerInfo()
    {
        return static::getManagerModel()::query()->select(['id', 'name', 'avatar'])->find($this->getAttribute('manager_id'));
    }


}
