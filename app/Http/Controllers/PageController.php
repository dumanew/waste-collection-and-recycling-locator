<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function inquiriesPage(): Response
    {
        $inquiries = DB::table('inquiries')
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Inquiries', [
            'inquiries' => $inquiries,
        ]);
    }
}
