<?php

// config/cors.php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    
    // ĐỊA CHỈ PHẢI CHÍNH XÁC: Không được để dấu '*' nếu dùng Cookie
    'allowed_origins' => ['http://localhost:3000'], 

    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    
    // PHẢI LÀ TRUE: Để cho phép nhận Cookie từ AJAX/Fetch
    'supports_credentials' => true, 
];
