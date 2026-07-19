# Baseline aplikácie AdoneaTeam – júl 2026

## Metadáta

- **ID:** APP-BASE-001
- **Typ dokumentu:** Baseline / referenčný stav
- **Verzia:** 1.0
- **Stav:** Accepted (ako referenčný stav, nie ako cieľ)
- **Vlastník:** Product owner AdoneaTeam (POS-080)
- **Zdroj:** statický audit repozitára `vytapetujem/adonea` (Codex), commit `538ee2390d8634fad1ae0968d7629d2b83998d99`, 2026-07-19
- **Súvisiace:** `01-ROADMAP-Z-OPERACNEHO-SYSTEMU.md`, BOOK 7 Strategy

---

## 1. Účel

Tento dokument zaznamenáva overený stav aplikácie k júlu 2026 ako spoločné východisko. Nie je to cieľový stav; je to pravdivý popis toho, čo appka dnes je. Roadmapa naň nadväzuje.

Podklad je statický audit (aplikácia, migrácie ani funkcie neboli spustené). Tvrdenia sú viazané na súbory, tabuľky a migrácie repozitára.

---

## 2. Architektúra v skratke

- **Frontend:** Vite + React + TypeScript SPA, React Router, TanStack Query, Radix/shadcn, `@react-pdf/renderer`, `xlsx`.
- **Backend:** bez klasického servera — Supabase (Postgres, Storage, Auth, Realtime, Edge Functions).
- **PWA/mobil:** `vite-plugin-pwa`, Workbox, push (`sw-push.js`); Capacitor shell (`ADONEA Team`).
- **Deployment:** Lovable workflow; Capacitor smeruje na hosted URL (na produkčný release treba overiť).
- **Roly:** `admin`, `technik`, `obchodnik` (enum `app_role`).

---

## 3. Čo aplikácia dnes reálne pokrýva

| Oblasť | Stav | Kľúčové moduly |
|---|---|---|
| Autentifikácia a roly | funkčné | `auth.tsx`, `ProtectedRoute.tsx`, `UserApproval.tsx` |
| CRM a leady | funkčné, s medzerami | `CRM.tsx`, `Leady.tsx`, `crm_leads` |
| Follow-up | funkčné | `next_follow_up`, `crm-follow-up`, `push-notify-crm` |
| Projekty a montáže | funkčné | `Projects.tsx`, `ProjectDetail.tsx`, `installations` |
| Kalendár a kapacity | funkčné | `Calendar.tsx`, Realtime, absencie |
| Protokoly | funkčné, dva modely | `protocols`, `installation_protocols` |
| Fotodokumentácia | funkčné | `project_photos`, `installation_photos`, Storage |
| Financie | funkčné | `expenses`, `revenues`, `CFODashboard.tsx` |
| Banka | funkčné | `Bank.tsx`, `bank_transactions`, import CSV/XLS |
| Analytika | funkčné | `Analytics.tsx`, `generate-analysis` |
| HR / Human Capital | funkčné | `human_capital`, bonusy, sadzby |
| AI a automatizácie | čiastočné | `ai-agent`, `scan-expense`, `mcp-server`, Telegram |
| Email infraštruktúra | funkčné | queue, log, suppression, unsubscribe, VAPID push |

Integrácie: SuperFaktúra (import CP a výnosov, PDF ponúk), Google Sheets (import výdavkov), AI gateway, Telegram, web push.

---

## 4. Dátový model – kľúčové tabuľky

CRM: `crm_leads`. Realizácia: `projects`, `installations`, `installation_technicians`, `technician_absences`. Dokumentácia: `protocols`, `installation_protocols`, `project_daily_logs`, `project_photos`, `installation_photos`. Financie: `expenses`, `revenues`, `bank_transactions`, `uploads`. HR: `human_capital`, `worker_bonuses`, `per_unit_rates`, `worker_home_addresses`, `project_workers`. Cenníky: `drilling_prices`, `drilling_surcharges`, `cutting_prices`, `folie_products`. Systém: `profiles`, `user_roles`, `app_settings`, email a push tabuľky.

Kľúčové väzby idú cez `project_id`. Väzba `crm_leads` → `projects` **neexistuje**.

---

## 5. Overené business pravidlá (výber)

- Nová montáž zároveň zakladá projekt; default status `planovana`.
- Typy montáže: `montaz`, `servis`, `reklamacia`, `kontrola`.
- Aktívne CRM leady vylučujú `dohodnute` a `strateny`; overdue = minulý `next_follow_up`.
- Import SF quote mapuje SF status na quote/lead status.
- Bankové auto-párovanie vyžaduje confidence ≥ 70, porovnáva **sumu bez DPH**.
- Email queue používa TTL a rate-limit stav v DB.

---

## 6. Prijaté medzery a riziká (východisko pre roadmapu)

### Kritické (bezpečnosť)

1. Viaceré citlivé Edge Functions majú `verify_jwt=false` (`ai-agent`, `mcp-server`, `scan-expense`, `generate-project-protocol`, `telegram-webhook`) — vlastná autorizácia sa musí overiť a zjednotiť.
2. AI/MCP nástroje vedia zapisovať do kritických tabuliek bez auditného logu a schvaľovania.

### Vysoké (proces a dáta)

3. **Nejednotné CRM stavy** medzi UI (`dohodnute/strateny`), AI (`vyhrany/prehrany`) a `Leady.tsx` (`VYHRA/STRATA`).
4. **Chýba prevod lead → projekt** — vyhraný obchod sa môže stratiť medzi CRM a realizáciou.
5. **Bankové párovanie bez DPH** — reálne platby bývajú s DPH, párovanie je nepresné.
6. **Chýba štruktúrovaný dôvod straty** (`lost_reason`) — dôvod je iba v poznámke.

### Stredné

7. Dva paralelné modely protokolov (`protocols` vs `installation_protocols`).
8. `projects.status` je voľný text, nie enum.
9. Cron aktivita (email queue, follow-up, push) sa z repozitára nedá potvrdiť.

### Nízke

10. Poškodené UTF-8 texty (mojibake) v niektorých TSX súboroch.
11. Capacitor mobil závisí od hosted URL — treba potvrdiť release stratégiu.

---

## 7. Otvorené otázky pre vlastníka

- Kanonické CRM stavy a definícia vyhraného/prehraného obchodu.
- Či `dohodnute` znamená konverziu na projekt.
- Ktorý protokolový model je cieľový.
- Či `is_fuska` patrí na projekt, výnos alebo oboje.
- Ktoré cron joby a webhooky reálne bežia v Supabase.

---

## 8. Najhodnotnejšie existujúce aktíva

1. Kompletný interný dátový základ v Supabase.
2. Prepojenie projektov, montáží, fotiek, protokolov a financií cez `project_id`.
3. CRM follow-up s importom cenových ponúk zo SuperFaktúry.
4. CFO/banková vrstva s párovaním transakcií.
5. Email infraštruktúra s queue, logmi, suppression a unsubscribe.

Aplikácia je zrelý základ. Ďalší vývoj je dokončovanie a zosúladenie s operačným systémom, nie stavba od nuly.

---

## História zmien

| Verzia | Dátum | Zmena |
|---|---|---|
| 1.0 | 2026-07-19 | Zaznamenaný baseline z auditu Codexu ako referenčný stav. |
