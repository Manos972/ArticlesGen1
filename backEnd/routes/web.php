<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'getUser']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::post('register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


//Route::middleware('auth:sanctum')->group(function () {
    Route::get('/articles', [ArticleController::class, 'index']);          // Récupérer la liste des articles
    Route::get('/articles/{id}', [ArticleController::class, 'show']);      // Récupérer un article spécifique
    Route::post('/articles', [ArticleController::class, 'store']);         // Créer un nouvel article
    Route::put('/articles/{id}', [ArticleController::class, 'update']);    // Mettre à jour un article existant
    Route::delete('/articles/{id}', [ArticleController::class, 'destroy']); // Supprimer un article
//});
