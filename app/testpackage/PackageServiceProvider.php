<?php


namespace App\testpackage;
use Illuminate\Support\ServiceProvider;



class PackageServiceProvider extends ServiceProvider
{
    public function boot()
    {

        $this->mergeConfigFrom(__DIR__.'/config/testconfig.php', 'testpackage');
        $this->loadRoutesFrom(__DIR__.'/routes/routes.php');
        $this->loadViewsFrom(__DIR__.'/views', 'testpackage');

/*      dd(
            TestPackage::getA(),
        );*/

    }



    public function register()
    {

        $this->app->bind('TestPackage', function() {
            return new \App\testpackage\Test;
        });

    }
}
