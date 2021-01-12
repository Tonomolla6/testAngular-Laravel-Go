<?php   
namespace App\Http\Controllers;

    use App\User;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Facades\Validator;
    
    use JWTAuth;
    use JWTFactory;
    use DB;

    use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt', ['except' => ['login']]);
    }

    public function login() {
        // Comprueba que hay conexion en la DB
        try {
            DB::connection()->getPdo();
            error_log("se conecta bien");
        } catch (\Exception $e) {
            die("Could not connect to the database.  Please check your configuration. error:" . $e );
        }

        // Obtiene las credenciales
        $credentials = request(['email', 'password']);
        error_log(json_encode($credentials));

        // Valido los campos de credenciales.
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        // Devolvemos el error
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        error_log("Valida datos");

        // Iniciamos sesion y generamos token
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        error_log("Logeado");

        return response()->json([
            'token' => $token,
            'expires' => auth('api')->factory()->getTTL() * 60,
        ]);
    }

    // public function login()
    // {
    //     // Obtenemos las credenciales
    //     $credentials = request(['email', 'password']);
    //     $validator = Validator::make($credentials, [
    //         'email' => 'required|email',
    //         'password' => 'required|string|min:6',
    //     ]);
        
    //     // Comprobamos las validaciones.
    //     if ($validator->fails()) {
    //         return response()->json($validator->errors(), 422);
    //     }

    //     error_log("optio3");
    //     error_log(json_encode($credentials));
    //     if ($token = JWTAuth::attempt($credentials)) {
    //         return $this->respondWithToken($token);
    //     }
    
    //     return response()->json(['error' => 'Unauthorized'], 401);

    //     error_log("optio4");

    //     return $this->createNewToken($token);

    //     // $credentials = request(['email', 'password']);
    //     // $token = auth()->attempt($credentials);
    //     // error_log("polla");
    //     // error_log(json_encode($token));
    //     // if (!$token = JWTauth()->attempt($credentials)) {
    //     //     return response()->json(['error' => 'Unauthorized'], 401);
    //     // }
    //     // return $this->respondWithToken($token);
    // }


    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }


    // /**
    //  * Get the token array structure.
    //  *
    //  * @param string $token
    //  *
    //  * @return \Illuminate\Http\JsonResponse
    //  */
    // protected function respondWithToken($token)
    // {
    //     return response()->json([
    //         'access_token' => $token,
    //         'token_type' => 'bearer',
    //         'expires_in' => auth()->factory()->getTTL() * 60,
    //         'user' => auth()->user(),
    //     ]);
    // }
}