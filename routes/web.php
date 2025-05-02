<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PageController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/search', fn () => Inertia::render('Search'));
Route::get('/contact', fn () => Inertia::render('Contact'));
Route::get('/inquiries', [PageController::class, 'inquiriesPage'])->name('inquiries');
