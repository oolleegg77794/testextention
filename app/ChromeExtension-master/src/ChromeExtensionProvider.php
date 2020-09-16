<?php


namespace ChromeExtension;


use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

/**
 * Class ChromeExtensionProvider
 * @package ChromeExtension
 */
class ChromeExtensionProvider extends ServiceProvider
{

    public function boot()
    {
        $this->routeRegister();
        $this->migrationsRegister();
        $this->publish();
    }

    private function routeRegister()
    {
        Route::prefix('api')
            ->namespace('ChromeExtension\Controllers')
            ->group(__DIR__ . ('/route.php'));

    }

    private function migrationsRegister()
    {
        $this->loadMigrationsFrom(__DIR__.'/migrations');
    }

    public function publish()
    {
        $this->publishes([
            __DIR__ . '/public' => public_path('vendor/mykola-map'),
        ], 'domain');
    }

}
