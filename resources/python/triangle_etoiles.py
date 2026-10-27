"""Affiche un triangle rectangle d'astérisques jusqu'à la hauteur choisie."""

try:
    hauteur = int(input("Hauteur du triangle (entier positif) : "))
except ValueError:
    print("Erreur : saisis un nombre entier.")
else:
    if hauteur <= 0:
        print("Erreur : la hauteur doit être positive.")
    else:
        for ligne in range(1, hauteur + 1):
            print("*" * ligne)
