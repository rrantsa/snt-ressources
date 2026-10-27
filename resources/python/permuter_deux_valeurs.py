"""Échange (permute) les valeurs de deux variables."""

try:
    a = int(input("Valeur de a : "))
    b = int(input("Valeur de b : "))
except ValueError:
    print("Erreur : saisis deux nombres entiers.")
else:
    print(f"Avant permutation : a = {a}, b = {b}")
    a, b = b, a
    print(f"Après permutation : a = {a}, b = {b}")
