<?php


namespace App\testpackage;
use Illuminate\Support\Facades\Facade;

class TestPackage extends Facade
{

    protected static function getFacadeAccessor()
    {
        return 'TestPackage';
    }

}
