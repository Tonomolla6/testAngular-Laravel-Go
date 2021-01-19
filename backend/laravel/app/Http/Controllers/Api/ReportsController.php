<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redis;

class ReportsController extends Controller
{

    public function getReports() {
        $user = Redis::get('discoteca');

        return response()->json($user, 200);
    }

}
