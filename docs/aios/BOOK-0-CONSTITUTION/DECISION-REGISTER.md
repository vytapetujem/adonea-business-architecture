# Register rozhodnutí

Tento register zachytáva doteraz schválené princípy. Jednotlivé ADR budú ďalej rozpracované do samostatných súborov.

## ADR-051 – Charakter pred výsledkami
**Status:** Accepted

Charakter a integrita majú prednosť pred krátkodobými výsledkami. Firma nesmie odmeňovať výsledok dosiahnutý spôsobom, ktorý poškodzuje dôveru, zákazníka alebo tím.

## ADR-052 – Záväzok je základná jednotka práce
**Status:** Accepted

Základnou jednotkou práce v Adonei nie je neurčitá úloha, ale záväzok s vlastníkom, očakávaným výsledkom a ďalším krokom.

## ADR-053 – Jeden vlastník na jeden záväzok
**Status:** Accepted

Každý záväzok má presne jedného vlastníka. Spolupráca môže byť tímová, zodpovednosť za posun a výsledok však nesmie byť rozmazaná.

## ADR-054 – Každý záväzok má ďalší krok
**Status:** Accepted

Každý otvorený záväzok musí mať definovaný ďalší konkrétny krok. Záväzok bez ďalšieho kroku je neaktívny a rizikový.

## ADR-055 – Systém nesie pamäť, ľudia rozhodnutia
**Status:** Accepted

Informácie, termíny, história a záväzky patria do systému. Ľudia majú používať úsudok, komunikovať a rozhodovať, nie držať firemnú pamäť v hlave.

## ADR-056 – Automatizovať opakovateľnú prácu
**Status:** Accepted

Ak je činnosť opakovateľná, riadená explicitnými pravidlami a nezískava hodnotu ľudským úsudkom, má byť automatizovaná.

## ADR-057 – Follow-up musí viesť k rozhodnutiu
**Status:** Accepted

Výsledkom kontaktu so zákazníkom nie je telefonát. Obchodník musí aktualizovať stav leadu, zaznamenať výsledok a určiť ďalšiu akciu a dátum ďalšieho kontaktu, alebo lead korektne uzavrieť.

## ADR-058 – Neúplné obchodné rozhodnutia nemožno uložiť
**Status:** Accepted

Po ukončení interakcie s leadom musí systém vyžadovať buď ďalší kontakt s termínom, alebo štruktúrovaný dôvod uzatvorenia. Neúplný follow-up sa nesmie uložiť.

## ADR-060 – Pozície existujú nezávisle od ľudí
**Status:** Accepted

Pozície sú trvalé zodpovednosti firmy. Jedna osoba môže držať viac kariet, ale karta existuje nezávisle od osoby, ktorá ju aktuálne vykonáva.

## ADR-061 – Firma je definovaná katalógom pozícií
**Status:** Accepted

Každá karta pozície musí byť priradená konkrétnej osobe alebo označená ako neobsadená. Držiteľ musí byť s poslaním, zodpovednosťami a právomocami preukázateľne oboznámený v aplikácii aj v realite.

## ADR-062 – Systém je digitálne dvojča firmy
**Status:** Accepted

AdoneaTeam má odrážať aktuálnu realitu firmy. Každá významná udalosť, zodpovednosť a stav musia mať svoj ekvivalent v systéme. Ak niečo zostáva iba v hlave alebo súkromnej poznámke, z pohľadu firmy to nie je spoľahlivo spravované.
