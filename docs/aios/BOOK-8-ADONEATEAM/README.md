# BOOK 8 – AdoneaTeam (digitálne dvojča)

Táto kniha spája operačný systém firmy s aplikáciou AdoneaTeam. Určuje, ako sa schválené pravidlá, procesy a KPI premietajú do softvéru, ktorý je digitálnym dvojčaťom firmy (ADR-062).

## Zmysel knihy

AdoneaTeam nie je pomocná evidencia. Je to systém, ktorý má niesť pamäť firmy, presadzovať schválené pravidlá a merať ciele zo stratégie. Preto vývoj aplikácie nemá riadiť náhodná požiadavka, ale operačný systém.

## Vzťah k realite

- **Realita firmy** je definovaná v BOOK 0–7.
- **Baseline aplikácie** zachytáva, čo appka reálne robí dnes.
- **Roadmapa** určuje, čo treba doplniť a opraviť, aby aplikácia zodpovedala operačnému systému a merateľne podporila stratégiu.

Rozdiel medzi baseline a operačným systémom je zoznam práce.

## Dokumenty

- `00-BASELINE-AUDIT-2026-07.md` – prijatý stav aplikácie k júlu 2026
- `01-ROADMAP-Z-OPERACNEHO-SYSTEMU.md` – vývojový plán odvodený z OS a auditu
- `decisions/` – schválené rozhodnutia o smerovaní aplikácie

## Zdrojový repozitár aplikácie

`https://github.com/vytapetujem/adonea` — Vite + React + TypeScript + Supabase PWA.

## Pravidlo

Aplikácia sa nemení podľa dojmu. Zmena musí byť odvodená z operačného systému alebo z opravy nesúladu medzi appkou a realitou firmy.
