# Script Voix-Off — Bala Bala Awards 2025
**Durée cible :** 30 secondes
**Plateforme :** ElevenLabs
**Langue :** Français (fr-FR / fr-CG)

---

## Texte intégral (30 s)

> L'excellence congolaise… en lumière.
>
> Les **Bala Bala Awards** — la cérémonie qui célèbre l'excellence ! Révélation de l'année, Étoiles, Best Women, Meilleur Beat, Tam-Tam, DJs, Mode, Médias en ligne… toute la culture congolaise sur une seule scène !
>
> Rendez-vous **le 1er Mars** au Centre Culturel Zola, à Brazzaville. Une nuit de gloire, inoubliable !
>
> Réservez vos places dès maintenant sur **tickets point cé gé** — la billetterie officielle du Congo Brazzaville. Paiement Airtel Money, MTN Money. QR code sécurisé, livraison instantanée. À partir de **deux mille francs** seulement !
>
> Ne ratez pas ça ! Rendez-vous sur **tickets point cé gé**… et vivez les **Bala Bala Awards 2025** !

---

## Script minuté (sync avec les séquences Remotion)

| Timecode | Texte | Ton |
|----------|-------|-----|
| **0–4 s** | *"L'excellence congolaise… en lumière."* | Mystérieux, voix posée qui monte |
| **4–10 s** | *"Les Bala Bala Awards — la cérémonie qui célèbre l'excellence ! Révélation de l'année, Étoiles, Best Women, Meilleur Beat, Tam-Tam, DJs, Mode, Médias en ligne… toute la culture congolaise sur une seule scène !"* | Explosif, award show announcer, très dynamique |
| **10–16 s** | *"Rendez-vous le 1er Mars au Centre Culturel Zola, à Brazzaville. Une nuit de gloire, inoubliable !"* | Cinématique, dramatique, solennité festive |
| **16–24 s** | *"Réservez vos places dès maintenant sur tickets point cé gé — la billetterie officielle du Congo Brazzaville. Paiement Airtel Money, MTN Money. QR code sécurisé, livraison instantanée. À partir de deux mille francs seulement !"* | Informatif, enthousiaste, rassurant, clair |
| **24–30 s** | *"Ne ratez pas ça ! Rendez-vous sur tickets point cé gé… et vivez les Bala Bala Awards 2025 !"* | Énergie maximale, urgent, festif, cri de joie |

---

## Paramètres ElevenLabs recommandés

### Choix de voix
| Option | Voix EL | Raison |
|--------|---------|--------|
| ⭐ Recommandée | **Adam** (Premade) | Voix grave, dynamique, autorité naturelle |
| Alternative 1 | **Antoni** (Premade) | Énergie élevée, ton narrateur |
| Alternative 2 | **Callum** (Premade) | Intensité, registre africain |
| Custom | Cloner une voix d'animateur congolais francophone | Authenticité maximale |

### Réglages Voice Settings
```
Stability      : 0.38   → dynamique, variations naturelles, énergie awards
Similarity     : 0.82   → colle bien au timbre de la voix choisie
Style          : 0.55   → expressivité marquée
Speaker Boost  : ON     → présence renforcée (idéal pour TikTok)
Speed          : 1.05×  → légèrement plus rapide, énergie TikTok
```

### Modèle
```
eleven_multilingual_v2   (meilleur pour le français)
```

---

## Guide de prononciation (SSML optionnel)

Pour une prononciation parfaite, vous pouvez utiliser ces balises SSML
dans l'API ElevenLabs ou en mode avancé :

```xml
<speak>
  Ce soir… la scène congolaise s'éveille.

  Les <emphasis level="strong">Bala Bala Awards</emphasis> —
  la cérémonie qui célèbre l'excellence !
  Musique, mode, médias, DJs, humour, arts…
  toute la culture congolaise réunie sur une seule scène !

  Rendez-vous le
  <say-as interpret-as="date" format="dm">01-03</say-as>
  au Centre Culturel Zola, à Brazzaville.
  Une nuit de gloire, inoubliable !

  Réservez vos places dès maintenant sur
  <phoneme alphabet="ipa" ph="tikɛ pwɛ̃ se ʒe">tickets.cg</phoneme>
  — la billetterie officielle du Congo Brazzaville.
  Paiement Airtel Money, MTN Money.
  QR code sécurisé, livraison instantanée.
  À partir de
  <say-as interpret-as="cardinal">2000</say-as> francs seulement !

  Ne ratez pas ça !
  Rendez-vous sur
  <phoneme alphabet="ipa" ph="tikɛ pwɛ̃ se ʒe">tickets.cg</phoneme>…
  et vivez les <emphasis level="strong">Bala Bala Awards</emphasis>
  <say-as interpret-as="cardinal">2025</say-as> !
</speak>
```

### Points d'accentuation manuelle

- `tickets.cg` → **"tickets POINT cé gé"** (détacher chaque mot)
- `Bala Bala` → accent tonique sur la 2ᵉ syllabe : *"ba-LA ba-LA"*
- `Brazzaville` → *"Bra-za-VIL"*
- `2 000 F` → *"deux MILLE francs"* (insister sur MILLE)
- `1er Mars` → *"PREMIER MARS"* (fort, dramatique)

---

## Workflow d'intégration Remotion

1. Générer le fichier audio sur ElevenLabs → exporter en **MP3 192 kbps**
2. Renommer → `voiceover.mp3`
3. Placer dans `remotion/public/voiceover.mp3`
4. Dans `BalaBalAwardsVideo.tsx`, décommenter :
   ```tsx
   import { Audio, staticFile } from "remotion";
   // ...
   <Audio src={staticFile("voiceover.mp3")} />
   ```
5. Ajuster les timings des séquences dans `constants.ts` si nécessaire
   en fonction de la durée réelle du fichier audio.

---

## Alternatives (si ElevenLabs non disponible)

| Service | Notes |
|---------|-------|
| **Murf.ai** | Voix françaises africaines disponibles |
| **Play.ht** | Bonne qualité FR, clonage de voix |
| **Coqui TTS** | Open source, modèle FR |
| **Google Cloud TTS** | `fr-FR-Neural2-D` (voix masculine) ou `fr-FR-Wavenet-B` |
