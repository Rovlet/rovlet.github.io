# Wyprawka Justyny

Strona: https://rovlet.github.io/wyprawka/.
Kod znajduje się w istniejącym repozytorium Rovlet/rovlet.github.io, w `_sources/wyprawka`.
GitHub Pages obsługuje folder `wyprawka` z gałęzi `main`.
Strona nie ma edycji, dodawania, logowania ani backendu.
Zachowuje zdjęcia wybranych modeli, ceny, ilości, bezpośrednie linki, szczegóły, pytania do konsultacji i zapis do PDF.

## Aktualizacja na GitHubie

Wymagany jest Node.js 24 lub nowszy; nie trzeba instalować pakietów.

1. W checkout repozytorium przejdź do `_sources/wyprawka` i zmień `items.json`.
2. Uruchom `npm test`.
3. Uruchom `npm run build`, aby wygenerować `../../wyprawka`.
4. Sprawdź `gh api user --jq .login`, zacommituj źródła oraz wynik i wyślij na `main` konta `Rovlet`.

GitHub Pages publikuje z `main` i katalogu głównego repozytorium.
Dotychczasowe portfolio pozostaje pod https://rovlet.github.io/.
Folder `_sources` jest pomijany przez Jekyll; gotowa strona znajduje się w `wyprawka`.
Do tego projektu nie kopiujemy bazy, konfiguracji Sites ani plików środowiskowych prywatnej aplikacji.
Zmiany w prywatnej aplikacji nie synchronizują się automatycznie z tą kopią.

## Podgląd lokalny

Uruchom `node build.ts`, aby wygenerować lokalny folder `docs`.
Następnie `node serve.mjs` otworzy serwer na http://127.0.0.1:5174/.
Nie trzeba instalować zależności.
Testy uruchamia `node --test tests/*.test.mjs`.
Wszystkie odnośniki do lokalnych zasobów są względne, więc strona działa w podfolderze.
W checkout repozytorium folder `docs` jest ignorowany przez Git.

## Dane, budżet i PDF

Źródłem danych jest `items.json`, skopiowany z zapisanej listy 4 października 2026 i uzupełniony o uzgodnione zmiany.
Koszt całej listy wynosi 15 258,36 zł, a bez rzeczy opcjonalnych 11 809,37 zł; kwoty są bez dostawy i obejmują podane szacunki.
Otulacz i kokon należą do „Na start”.
Budżet uwzględnia ilości i pomija pozycje wykluczone oraz archiwalne.
Zdjęcia pobierane są z adresów sklepów i producentów, więc ich dostępność zależy od tych stron.
Nie wyświetlamy zdjęć dla produktów bez wybranego modelu; pozycje bez zdjęć znajdują się na końcu listy.
PDF głównej listy obejmuje wszystkie pozycje, niezależnie od filtrów, i zachowuje klikalne linki.
W oknie drukowania wybierz „Zapisz jako PDF”.
Podział na priorytety służy planowaniu zakupów; pytania dotyczące pielęgnacji i leków pozostają do konsultacji.
Cena Neno Vita 149,99 zł wymaga kodu R2809-121026 ważnego do 12.10.2026.

Aktualizacja: jeden komplet pieluszek muślinowych BIBS Sand (89 zł), dwa zestawy skarpetek Cool Club (6 par, 39,98 zł), przywrócony aspirator Katarek Plus (69,90 zł) i usunięta szczotka do ciemieniuchy.
