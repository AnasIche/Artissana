<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    // Ajouter un commentaire
    public function addReview(Request $request, $id)
    {
        $request->validate([
            'comment' => 'required|string|max:255',
        ]);

        // Vérifier si le produit existe
        $product = Produit::findOrFail($id);

        // Créer un nouvel avis
        $review = new Review();
        $review->user_id = Auth::id();  // L'ID de l'utilisateur authentifié
        $review->product_id = $product->id;
        $review->comment = $request->comment;
        $review->save();

        return response()->json($review, 201);  // Retourner l'avis créé
    }

    // Récupérer les avis pour un produit
    public function getReviews($id)
    {
        // Vérifier si le produit existe
        $product = Produit::findOrFail($id);

        // Récupérer les commentaires du produit
        $reviews = $product->reviews()->with('user')->get();  // Eager load user details

        return response()->json($reviews);
    }
}
