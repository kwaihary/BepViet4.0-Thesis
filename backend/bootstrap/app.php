<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\HandleCors;
use App\Http\Middleware\Checklogin;
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        
        // 1. Thêm CORS (nếu cần thiết)
        $middleware->append(HandleCors::class);

        // 2. Đăng ký Alias 'Checklogin' Ở ĐÂY (Bên trong ngoặc nhọn)
        $middleware->alias([
            'Checklogin' => CheckLogin::class,
        ]);
        
    }) // Kết thúc hàm cấu hình middleware tại đây
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();