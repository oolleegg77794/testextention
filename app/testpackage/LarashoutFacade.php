<?php


namespace App\testpackage;
use Illuminate\Support\Facades\Facade;

class LarashoutFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'larashout';
    }
}
