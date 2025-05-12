<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\Produit;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CommandeController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'produits' => 'required|array',
            'produits.*.produit_id' => 'required|exists:produits,id',
            'produits.*.quantite' => 'required|integer|min:1',
        ]);

        $commande = Commande::create([
            'vendeur_id' => auth()->id(),
            'date_commande' => now(),
            'statut' => 'en_attente',
        ]);

        foreach ($request->produits as $item) {
            $produit = Produit::find($item['produit_id']);
            $commande->produits()->attach($produit->id, [
                'quantite' => $item['quantite'],
                'prix_unitaire' => $produit->prix,
            ]);
        }

        return response()->json([
            'message' => 'Commande enregistrée',
            'commande' => $commande->load('produits'),
        ], 201);
    }








   public function getVendeursWithCommandes()
    {
        // Récupérer toutes les commandes avec les vendeurs associés
        $commandes = Commande::with('vendeur')->get();

        // Vérifier si des commandes existent
        if ($commandes->isEmpty()) {
            return response()->json(['message' => 'Aucune commande trouvée'], 404);
        }

        // Extraire les informations des vendeurs uniques
        $vendeurs = $commandes->map(function ($commande) {
            return [
                'vendeur_id' => $commande->vendeur->id,
                'vendeur_name' => $commande->vendeur->name,
                'vendeur_email' => $commande->vendeur->email,
                'vendeur_phone' => $commande->vendeur->phone,
                'vendeur_role' => $commande->vendeur->role,
                'commande_id' => $commande->id,
                "statut" => $commande->statut,
                "prix_total" => $commande->produits->sum(function ($produit) {
                    return $produit->pivot->prix_unitaire * $produit->pivot->quantite;
                }),
                'date_commande' => $commande->date_commande,
            ];
        });

        // Retourner la liste des vendeurs et leurs commandes
        return response()->json($vendeurs);
    }






      public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'statut' => 'required|in:Confirmed,Cancelled'
        ]);

        $commande = Commande::where('id', $id)
                            ->where('id', Auth::id())
                            ->first();

        if (!$commande) {
            return response()->json([
                'message' => 'Commande non trouvée ou non autorisée.'
            ], 404);
        }

        $commande->statut = $request->input('statut');
        $commande->save();

        return response()->json([
            'message' => 'Statut mis à jour avec succès.',
            'commande' => $commande
        ]);
    }
}
