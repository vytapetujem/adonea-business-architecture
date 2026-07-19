# Rozhodnutie: Zberač leadov (jednotný príjem)

## Stav

**Accepted** (zadané vlastníkom 2026-07-19)

## Kontext

Leady prichádzajú z viacerých kanálov: Meta Ads (lead formuláre), Gmail dopyty
(`info@adonea.sk`, štítok „Cenová ponuka ! dopyt!") a telefonáty. Boli
roztrúsené mimo appky. V súlade s POS-021 a ADR-062 nesmie zaplatený lead
zomrieť a každý lead má mať pravdivý stav v systéme.

## Rozhodnutie

AdoneaTeam dostáva **Zberač leadov** – jednu schránku, kam padajú leady zo
všetkých kanálov. Nové leady sa spracúvajú podľa stanov (POS-021: najprv
potreba → ďalší krok → SLA). Staré leady sa nechávajú v pôvodnom stave.

Kanály v prvej verzii:

- **Meta Ads** – priame stiahnutie cez Graph API (edge `import-meta-leads`).
- **Gmail** – hodinová kontrola neprečítaných správ (edge `poll-gmail-leads`).
- **Telefonát / ručne** – zadanie v appke.

Budúce kanály (pripravené v modeli): web formulár (`contact_messages` na projekte
Adonea web), web chat (`chat_messages.is_hot_lead`), SuperFaktúra CP.

## Dopad na aplikáciu

- `crm_leads` rozšírené o `source_channel`, `source_ref`, `raw_payload`,
  `intake_status` (new/accepted/spam/duplicate) + deduplikácia.
- Stránka `/zberac` s triážou a manuálnymi importmi.
- Automatizácia hodinovým cronom (viď `LEAD-INTAKE-SETUP.md` v app repo).

## Poznámka k zdroju pravdy

Databáza AdoneaTeam je Supabase projekt `vmusyvkkclcfsftjgjrz`. Projekt
`lwzwvdksusmelbzecwzc` („Adonea web") je verejný web/e-shop, nie databáza appky.

## Otvorené (nezmenené týmto rozhodnutím)

Kanonické CRM stavy (E0.1) stále čakajú na rozhodnutie vlastníka; zberač ich
nezavádza, pracuje s `intake_status`, nie s `lead_status`.

## Súvisiace

- `01-ROADMAP-Z-OPERACNEHO-SYSTEMU.md` (E1)
- app repo: migrácia `20260719140000_lead_intake_channels.sql`, funkcie
  `import-meta-leads`, `poll-gmail-leads`, stránka `LeadInbox`
