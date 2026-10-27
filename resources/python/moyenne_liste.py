"""Calcule la moyenne d'une liste de nombres saisie au clavier."""

texte = input("Saisis des nombres séparés par des espaces : ")
try:
    nombres = [float(mot) for mot in texte.split()]
except ValueError:
    print("Erreur : chaque valeur doit être un nombre.")
else:
    if not nombres:
        print("Erreur : la liste ne peut pas être vide.")
    else:
        moyenne = sum(nombres) / len(nombres)
        print(f"Moyenne : {moyenne}")
