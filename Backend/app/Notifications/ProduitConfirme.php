<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProduitConfirme extends Notification
{
    use Queueable;

    protected $produit;

    /**
     * Create a new notification instance.
     */
    public function __construct($produit)
    {
        $this->produit = $produit;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Votre produit a été confirmé')
            ->greeting('Bonjour ' . $notifiable->name)
            ->line("Votre produit intitulé « {$this->produit->nom} » a été confirmé par l'administrateur.")
            ->action('Voir mon produit', url('/fournisseur/produits')) // ajuste l’URL selon ton app
            ->line('Merci pour votre contribution sur notre plateforme.');
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(object $notifiable): array
    {
        return [
            'produit_id' => $this->produit->id,
            'nom' => $this->produit->nom,
            'etat' => $this->produit->etat,
        ];
    }
}
