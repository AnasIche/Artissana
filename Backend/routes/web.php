<?php

use Illuminate\Support\Facades\Route;

// Exemple de route qui redirige vers ton front
// routes/web.php
Route::get('/reset-password/{token}', function ($token) {
    return redirect('http://localhost:3000/reset-password?token=' . $token);
})->name('password.reset');




// Route::get('/reset-password/{token}', function ($token) {
//     return redirect('http://localhost:3000/reset-password?token=' . $token);
// })->name('password.reset');
