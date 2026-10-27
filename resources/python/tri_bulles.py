"""Trie une liste d'entiers par ordre croissant avec le tri à bulles."""

texte = input("Saisis des entiers séparés par des espaces : ")
try:
    nombres = [int(mot) for mot in texte.split()]
except ValueError:
    print("Erreur : saisis uniquement des nombres entiers.")
else:
    if not nombres:
        print("Erreur : la liste ne peut pas être vide.")
    else:
        for fin in range(len(nombres) - 1, 0, -1):
            for i in range(fin):
                if nombres[i] > nombres[i + 1]:
                    nombres[i], nombres[i + 1] = nombres[i + 1], nombres[i]
        print("Liste triée :", nombres)
