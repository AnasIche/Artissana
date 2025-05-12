<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\Api\ProduitController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\Api\PasswordResetController;
use App\Http\Controllers\Api\AuthController; // Correction ici





Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/test',function(){
    return response()->json(['message'=>"test"]); // Correction de la faute de frappe ici
});
Route::post('/register',[AuthController::class,'register']); // Correction ici
Route::post('/login',[AuthController::class,'login']); // Correction ici

Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword']);

//gerer les produits
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/getuser',[AuthController::class,'getUser']);
    Route::get('/getallusers',[AuthController::class,'index']);
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout'); // Correction ici
    Route::post('/products', [ProduitController::class, 'store']);


    Route::post('/commandes', [CommandeController::class, 'store']);


     Route::get('/vendeurs-commandes', [CommandeController::class, 'getVendeursWithCommandes']);
    // Route::get('/commande/{commandeId}/vendeur', [CommandeController::class, 'getVendeurDetails']);
    Route::get('/fournisseur/produits-confirmes', [ProduitController::class, 'produitsConfirmesFournisseur']);

    Route::delete('/user/{id}', [AuthController::class, 'destroy']);
    Route::delete('/fournisseur/produits/{id}', [ProduitController::class, 'destroy']);
    Route::put('/commandes/{id}', [CommandeController::class, 'updateStatus']);

    Route::get('/fournisseur/commandes', [FournisseurController::class, 'commandesFournisseur']);
});


Route::get('/produits/en-attente', [ProduitController::class, 'produitsEnAttente']);
Route::put('/produits/{id}/confirmer', [ProduitController::class, 'confirmerProduit']);

 Route::get('/products', [ProduitController::class, 'index']);

// Route::middleware('auth:api')->post('/products/{id}/reviews', [ReviewController::class, 'addReview']);
// Route::get('/products/{id}/reviews', [ReviewController::class, 'getReviews']);

//route aporter Tous les  produits
Route::get('/products/{id}', [ProduitController::class, 'show']);

Route::put('/products/{id}/order', [ProduitController::class, 'updateStock']);




//reset password
Route::get('/reset-password/{token}', function ($token) {
    return redirect('http://localhost:3000/reset-password?token=' . $token);
})->name('password.reset');





// Exemple de route qui redirige vers ton front
// Route::get('/reset-password/{token}', function ($token) {
//     return redirect('http://localhost:3000/reset-password?token=' . $token);
// })->name('password.reset');




// routes/api.php



// Route::middleware('auth:sanctum')->group(function () {
// });
