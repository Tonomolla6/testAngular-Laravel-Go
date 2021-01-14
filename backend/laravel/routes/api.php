<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// USERS 
    // MIDDLEWARE
    Route::group(['middleware' => ['jwt.verify']], function() {
        Route::get('user', 'Api\UserController@getAuthenticatedUser');
    });

    // POST
    Route::post('users/register', 'Api\UserController@register');
    Route::post('users/login', 'Api\UserController@login');

// COMPANIES
    // POST
    Route::post('company', 'Api\CompanyController@createCompany');

    // GET
    Route::get('companies', 'Api\CompanyController@getAllCompanies');
    Route::get('company/{id}', 'Api\CompanyController@getCompany');
    
    // PUT
    Route::put('company/{id}', 'Api\CompanyController@updateCompany');

    // DELETE
    Route::delete('company/{id}','Api\CompanyController@deleteCompany');
