"""Trouve le minimum et le maximum d'une liste d'entiers."""

texte = input("Saisis des entiers séparés par des espaces : ")
try:
    nombres = [int(mot) for mot in texte.split()]
except ValueError:
    print("Erreur : saisis uniquement des nombres entiers.")
else:
    if not nombres:
        print("Erreur : la liste ne peut pas être vide.")
    else:
        minimum = maximum = nombres[0]
        for nombre in nombres[1:]:
            if nombre < minimum:
                minimum = nombre
            if nombre > maximum:
                maximum = nombre
        print(f"Minimum : {minimum}")
        print(f"Maximum : {maximum}")
