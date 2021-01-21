<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redis;
use JWTAuth;
use Illuminate\Support\Facades\DB;

class ReportsController extends Controller
{

    public function getReports() {
        $user = self::getAuthenticatedUser();
        $user = $user->original["user"]->id;
        
        $discotecas = DB::select("SELECT id,name FROM discotecas WHERE user = $user");

        $total = "";
        Redis::set('name', 'Taylo2r');

        // foreach ($discotecas as $key => $discoteca) {
        //     $total += Redis::get($discoteca->id);
        // }
        // [
        //     {
        //         "id": 1,
        //         "name": ""
        //         "users": [
        //             {
        //             "username":"",
        //             "email":"",
        //             }
        //         ]
        //     }
        // ]

        // Redis::set('name', 'Taylo2r');

        // 

        return response()->json($total, 200);
    }

    public static function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }

        return response()->json(compact('user'));
    }

}
