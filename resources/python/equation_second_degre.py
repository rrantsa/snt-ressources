"""Résout a*x**2 + b*x + c = 0 dans l'ensemble des réels."""

from math import sqrt

try:
    a = float(input("Coefficient a : "))
    b = float(input("Coefficient b : "))
    c = float(input("Coefficient c : "))
except ValueError:
    print("Erreur : saisis des nombres.")
else:
    if a == 0:
        if b == 0:
            if c == 0:
                print("Tous les nombres réels sont solutions.")
            else:
                print("L'équation n'a pas de solution.")
        else:
            x = -c / b
            print(f"Équation du premier degré : x = {x}")
    else:
        discriminant = b**2 - 4 * a * c
        if discriminant < 0:
            print("L'équation n'a pas de solution réelle.")
        elif discriminant == 0:
            x = -b / (2 * a)
            print(f"Une solution réelle : x = {x}")
        else:
            x1 = (-b - sqrt(discriminant)) / (2 * a)
            x2 = (-b + sqrt(discriminant)) / (2 * a)
            print(f"Deux solutions réelles : x1 = {x1} et x2 = {x2}")
