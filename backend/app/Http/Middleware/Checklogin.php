<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckLogin
{
    public function handle(Request $request, Closure $next)
    {
        // Kiểm tra xem có cookie 'token_bepviet' không và header Authorization chưa có
        if ($request->hasCookie('token_bepviet') && !$request->header('Authorization')) {
            $token = $request->cookie('token_bepviet');
            // Gán token vào Header để Sanctum có thể đọc được
            $request->headers->set('Authorization', 'Bearer ' . $token);
        }

        return $next($request);
    }
}