<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Passwords\PasswordBroker;
use Illuminate\Support\Facades\Log;

class PasswordResetController extends Controller
{
    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $response = Password::broker('users')->sendResetLink($request->only('email'));

        return $response == PasswordBroker::RESET_LINK_SENT
            ? response()->json(['message' => 'Lien de réinitialisation envoyé.'], 200)
            : response()->json(['message' => 'Impossible d\'envoyer le lien.'], 500);
    }

    public function resetPassword(Request $request)
    {
        // Validation des champs
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        Log::info("Tentative de réinitialisation", [
            'email' => $request->input('email'),
            'token' => $request->input('token')
        ]);

        // Réinitialisation du mot de passe
        $response = Password::broker('users')->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                Log::info("Utilisateur trouvé", ['id' => $user->id]);
                $user->password = Hash::make($password);

                if (!$user->save()) {
                    Log::error("Erreur lors de la sauvegarde du mot de passe", ['user_id' => $user->id]);
                } else {
                    Log::info("Mot de passe mis à jour", ['user_id' => $user->id]);
                }
            }
        );

        // Gestion des réponses
        switch ($response) {
            case PasswordBroker::PASSWORD_RESET:
                return response()->json(['message' => 'Mot de passe réinitialisé avec succès.'], 200);

            case PasswordBroker::INVALID_TOKEN:
                return response()->json(['message' => 'Token invalide ou expiré.'], 400);

            case PasswordBroker::INVALID_USER:
                return response()->json(['message' => 'Utilisateur introuvable.'], 404);

            default:
                return response()->json(['message' => 'Une erreur est survenue.'], 500);
        }
    }
}
