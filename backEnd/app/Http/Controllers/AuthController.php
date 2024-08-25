<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function showRegisterForm()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        // Validation des données
        $validator = Validator::make($request->all(), [
            'pseudo' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);

        // Vérification des erreurs de validation
        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            // Création de l'utilisateur
            $user = User::create([
                'name' => $request->pseudo,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            return response()->json(['message' => 'Registration successful'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Registration failed haha', 'message' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        // Validation des données
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Tentative de connexion
        if (Auth::attempt($request->only('email', 'password'))) {
            // Génération du jeton d'accès
            $token = Auth::user()->createToken('Personal Access Token')->plainTextToken;
            return response()->json(['token' => $token], 200);
        } else {
            // Journalisation de l'échec de connexion
            Log::error('Login failed for user with email: ' . $request->email);
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function getUser(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}
