<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CenterController;
use App\Http\Controllers\Api\InquiryController;
use App\Http\Controllers\Api\MaterialController;

// API Routes (used by React frontend via Axios)
Route::get('/materials', [MaterialController::class, 'index']);
Route::get('/center-names', [CenterController::class, 'centerNames']);
Route::get('/center-details', [CenterController::class, 'centerDetails']);
Route::get('/cities', [CenterController::class, 'cities']);
Route::get('/available-types', [CenterController::class, 'availableTypes']);

Route::post('/inquiries', [InquiryController::class, 'store']);
