<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;
use Illuminate\Support\Facades\Auth;

class FournisseurController extends Controller
{
    //
 public function commandesFournisseur()
{
    $fournisseurId = Auth::id(); // ID du fournisseur connecté

    $commandes = Commande::whereHas('produits', function ($query) use ($fournisseurId) {
        // Vérifier si le produit appartient au fournisseur
        $query->where('fournisseur_id', $fournisseurId);
    })
    ->with(['produits' => function ($query) use ($fournisseurId) {
        // Sélectionner uniquement les produits du fournisseur
        $query->where('fournisseur_id', $fournisseurId);
    }, 'vendeur'])
    ->get();

    return response()->json($commandes);
}


}
