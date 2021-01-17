<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Controllers\Controller;

class UserController extends Controller
{


    public function login(Request $request)
    {
        $credentials = $request->only('user.email', 'user.password');
        $credentials = $credentials['user'];

        // Comprobamos si el usuario existe
        if (!$user = User::where('email', $credentials['email'])->get())
            return response()->json(['error' => 'invalid_credentials'], 400);
        

        // // Comprobamos si el usuario es administrador
        if ($user[0]['type'] != "admin")
            return response()->json(['error' => 'invalid_credentials'], 400);

        // Iniciamos sesión.
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json(compact('token'));
    }


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'username' => $request->get('username'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'type' => "admin"
        ]);

        return response()->json(compact('user'), 201);
    }

    public function getCompaniesFromUser($email) {
        $auth = self::getAuthenticatedUser();

        if ($auth->original["user"]->email != $email) {
            return response()->json([
                "message" => "User does not have permissions"
              ], 404);
        }

        if (User::where('email', $email)->exists()) {
          $user = User::where('email', $email)->get();
          $companies = $user->load('companies')->first();

          return response()->json($companies->companies, 200);
        } else {
          return response()->json([
            "message" => "Company not found"
          ], 404);
        }
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
