<?php

namespace App\Http;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Foundation\Http\Kernel as HttpKernel;


class Kernel extends HttpKernel
{
    protected $middleware = [
        // Global middleware...
        \Fruitcake\Cors\HandleCors::class,
    ];

    protected $middlewareGroups = [
        'web' => [
            // ...
        ],

        'api' => [
            \Fruitcake\Cors\HandleCors::class,
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];

    protected $routeMiddleware = [
        // Route-specific middleware...
    ];
}
