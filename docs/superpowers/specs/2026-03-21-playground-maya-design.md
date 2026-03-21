# Playground Maya Interactif — Design Spec

**Date:** 2026-03-21
**Status:** Approved
**Auteur:** CoS SymbiozAI
**Validé par:** Laurent Bouzon

## Objectif

Remplacer le chat mockup statique de la homepage par un playground interactif scénarisé. Le visiteur interagit avec Maya à travers 3 scénarios pré-écrits sans appel LLM. L'objectif est de démontrer la valeur du produit par l'expérience conversationnelle elle-même.

## Décisions de design validées

| Décision | Choix |
|----------|-------|
| Type | Scénarisé (pas de LLM) — zéro coût par visite |
| Emplacement | Intégré dans la homepage, remplace le `ChatMockup` actuel |
| Navigation | Boutons dans le chat (métaphore conversationnelle) |
| Style visuel | Chat type Claude mobile (bulles rondes, minimal, dark header) |
| Affichage messages | Indicateur "..." (1-2s) puis streaming mot par mot (40-60ms/mot) |
| Langue | Bilingue FR/EN via `lib/dictionary.ts` (le seul système i18n utilisé dans les pages — NE PAS modifier `lib/i18n/translations/`) |
| Ton | Pro chaleureux (tutoiement, emojis dosés) — fidèle au produit réel |

## Architecture

### Composant principal : `InteractivePlayground`

Remplace `ChatMockup` dans `app/[lang]/page.tsx` (lignes 340-370).

```
InteractivePlayground (client component)
├── PlaygroundHeader        — Avatar Maya + nom + status "En ligne"
├── MessageBubble           — Bulle user ou AI (réutilisable)
├── TypingIndicator         — Indicateur "..." animé
├── ScenarioButtons         — Boutons de choix scénario
└── hooks/
    └── useStreamingText    — Hook pour simuler le streaming mot par mot
```

Note : `PlaygroundMessages` et `PlaygroundInput` ne sont pas des composants séparés. La zone messages et l'input sont directement dans `interactive-playground.tsx` pour simplifier (peu de logique propre). L'input est un simple `<div>` avec un champ disabled, pas de composant dédié.

### Fichiers à créer

| Fichier | Rôle |
|---------|------|
| `components/playground/interactive-playground.tsx` | Composant principal : orchestration scénarios, zone messages scrollable, input désactivé |
| `components/playground/message-bubble.tsx` | Bulle de message (user/AI), streaming-aware |
| `components/playground/typing-indicator.tsx` | Indicateur "..." avec animation bounce |
| `components/playground/scenario-buttons.tsx` | Boutons de choix cliquables dans le chat |
| `components/playground/playground-header.tsx` | Header avec avatar Maya (voir interface ci-dessous) |
| `hooks/use-streaming-text.ts` | Hook custom pour simuler le streaming (dans `hooks/` racine, pattern existant) |
| `lib/playground-scenarios.ts` | Données des 3 scénarios (FR/EN) |

### Fichiers à modifier

| Fichier | Modification |
|---------|-------------|
| `app/[lang]/page.tsx` | Remplacer `ChatMockup` par `InteractivePlayground` dans la section Solution |
| `lib/dictionary.ts` | Ajouter les clés i18n `playground` au type `Dictionary` ET aux deux dictionnaires `en` et `fr` |

### Fichier inchangé (suppression possible ultérieure)

| Fichier | Note |
|---------|------|
| `components/chat-mockup.tsx` | Conservé pour l'instant, plus importé dans la page |

## Interfaces des composants

### PlaygroundHeader

```typescript
interface PlaygroundHeaderProps {
  agentName: string    // "Maya AI"
  statusText: string   // "En ligne" / "Online"
}
```

Utilise `GlassIcon type="bot" size={40}` pour l'avatar (comme le `ChatMockup` actuel). Indicateur vert animé (`animate-pulse`) pour le status "en ligne".

### InteractivePlayground

```typescript
interface InteractivePlaygroundProps {
  lang: string
}
```

Le composant importe `getDictionary(lang)` directement (c'est une fonction pure synchrone, utilisable côté client). Les scénarios sont chargés via `getScenarios(lang)` depuis `lib/playground-scenarios.ts`.

### Fallback i18n

Si `lang` n'est ni "fr" ni "en", le composant fallback sur "en" (cohérent avec `getDictionary` qui fait déjà `dictionaries[locale] ?? dictionaries.en`). Les scénarios suivent le même pattern : `scenarios[lang] ?? scenarios.en`.

## Flow utilisateur détaillé

### Phase 1 : Accueil
Le visiteur scrolle jusqu'à la section Solution. L'Intersection Observer déclenche l'animation.

```
Maya: "Salut ! Je suis Maya, l'IA qui pilote ton CRM. Essaie par toi-même"
     [🎯 Trouve-moi des ESN en Île-de-France]
     [🔄 Deals perdus récupérables]
     [💬 Ajoute une note sur Pennylane]
```

### Phase 2 : Scénario "Prospection"
```
User (auto): "Trouve-moi des ESN en Île-de-France"
Maya [typing 1.5s]: "Je cherche dans nos sources..."
Maya [rich content]: Affiche un mini-tableau de 5 résultats (apparaît d'un coup après typing) :
  | Entreprise      | Ville       | Taille   | Secteur          |
  |-----------------|-------------|----------|------------------|
  | Néosoft         | Paris       | 500+     | Conseil IT       |
  | Linkvalue       | Nantes      | 200-500  | Dev & Cloud      |
  | Apside          | Boulogne    | 1000+    | Ingénierie IT    |
  | Ippon Tech      | Paris       | 200-500  | Data & Cloud     |
  | Zenika          | Paris       | 200-500  | Conseil & Devops |

Maya [streaming]: "J'en ai trouvé 23 au total. Tu veux que je les ajoute à une séquence d'outreach ?"
```

### Phase 3 : Scénario "Recovery"
```
User (auto): "Montre-moi les deals perdus récupérables"
Maya [typing 1.5s]: "Analyse en cours..."
Maya [rich content]: Affiche 3 deals (apparaît d'un coup après typing) :
  🟡 TechCorp — 45K€ — Contrat concurrent expire dans 2 mois — Score: 78%
  🟠 DataVision — 28K€ — Nouveau CTO arrivé — Score: 65%
  🔵 CloudFactory — 18K€ — Budget débloqué Q2 — Score: 72%

Maya [streaming]: "TechCorp a la meilleure fenêtre. Leur contrat Salesforce expire en mai. Tu veux que je prépare une relance ?"
```

### Phase 4 : Scénario "CRM"
```
User (auto): "Ajoute une note sur le prospect Pennylane"
Maya [typing 1.5s]: "Sur quel sujet ?"
[Pause 1.5s — simule l'attente d'une réponse]
User (auto): "Call de 30min — intéressés par le plan Pro, décision en avril"
Maya [typing 1s]:
Maya [streaming]: "Note ajoutée sur Pennylane. J'ai aussi détecté une date clé : je te rappellerai début avril pour le follow-up."
```

### Phase 5 : CTA de sortie
Après chaque scénario, Maya propose les scénarios restants via boutons. Quand tous sont joués :

```
Maya: "Ça, c'est juste un aperçu. La vraie Maya fait ça sur TES données."
     [🚀 Rejoindre la beta]  ← scrolle vers la section CTA finale (#cta-final)
```

Le bouton CTA scrolle vers la section CTA finale (la seconde instance de `WaitlistForm`, section `py-20` avec le fond bleu gradient). Ajouter `id="cta-final"` à cette `<section>` dans `page.tsx`. Scroll via `document.getElementById('cta-final')?.scrollIntoView({ behavior: 'smooth' })`.

## Spécifications techniques

### Hook `useStreamingText`

```typescript
interface UseStreamingTextOptions {
  text: string
  speed?: number        // ms par mot (default: 50)
  startDelay?: number   // délai avant de commencer (default: 0)
  enabled?: boolean     // trigger le streaming
}

interface UseStreamingTextReturn {
  displayedText: string
  isStreaming: boolean
  isComplete: boolean
}
```

Implémentation : `setInterval` qui ajoute un mot à chaque tick. Le texte source est splitté par espaces. L'intervalle est légèrement randomisé (speed +/- 20%) pour un effet naturel.

**Note StrictMode** : React 19 en dev exécute les effets deux fois. Le hook doit retourner un cleanup function qui clear l'interval ET reset l'état interne. Tester en dev mode pour vérifier l'absence de double-streaming.

### Scénarios data structure

```typescript
// lib/playground-scenarios.ts

import { Locale } from "./dictionary"

interface PlaygroundMessage {
  type: "user" | "ai" | "buttons"
  text?: string                    // pour user et ai
  richContent?: "table" | "deals"  // pour ai avec contenu structuré
  richData?: unknown               // données du tableau/deals
  buttons?: ScenarioButton[]       // pour type "buttons"
  delay?: number                   // délai avant affichage (ms)
  autoAdvance?: boolean            // true pour les messages user (pas d'attente)
}

interface ScenarioButton {
  id: string          // "prospection" | "recovery" | "crm"
  emoji: string
  label: string
}

interface Scenario {
  id: string
  messages: PlaygroundMessage[]
}

// Export function — même pattern que getDictionary
export function getScenarios(locale: string): Scenario[] {
  return scenarios[locale as Locale] ?? scenarios.en
}

const scenarios: Record<Locale, Scenario[]> = {
  en: [...],
  fr: [...]
}
```

### Séquençage du contenu riche

Pour les messages AI qui contiennent du `richContent` :
1. Indicateur "..." (typing) pendant `delay` ms
2. Le contenu riche (tableau ou deals) apparaît **d'un coup** (pas de streaming)
3. Si un message texte suit immédiatement, il est streamé normalement après un court délai (500ms)

Le `richContent` et le `text` sont dans des messages séparés dans le scénario data. Un message avec `richContent` n'a pas de `text` (et inversement).

### State machine du playground

```
IDLE → WELCOME (accueil Maya + boutons)
WELCOME → SCENARIO_PLAYING (bouton cliqué)
SCENARIO_PLAYING → SCENARIO_DONE (tous messages affichés)
SCENARIO_DONE → SCENARIO_PLAYING (autre bouton cliqué)
SCENARIO_DONE → CTA (tous scénarios joués — auto-transition)
```

**Boutons désactivés pendant SCENARIO_PLAYING** : les boutons de scénario sont `disabled` (opacity réduite, cursor not-allowed) pendant qu'un scénario se joue. Ils se réactivent une fois SCENARIO_DONE atteint. Pas de file d'attente — c'est plus simple et évite les scénarios entremêlés.

**Replay** : hors scope v1. Le visiteur ne peut pas rejouer un scénario déjà vu. Les boutons déjà joués disparaissent de la liste proposée.

### Gestion du scroll
- Le conteneur messages a un `max-height` fixe avec `overflow-y: auto`
- Auto-scroll vers le bas à chaque nouveau message — **seulement si l'utilisateur est déjà en bas** (tolérance 50px). Si l'utilisateur a scrollé manuellement vers le haut, on ne force pas le scroll.
- L'Intersection Observer déclenche l'animation d'accueil au premier scroll dans la section

### Rendu du contenu riche
- **Tableau prospection** : grid CSS stylisé (pas un `<table>` HTML), cohérent avec le design dark/minimal
- **Deals recovery** : cards empilées avec emoji indicateur de couleur, nom, montant, raison, score en badge

### Responsive
- Mobile : pleine largeur, hauteur adaptée (min 400px, max 70vh)
- Desktop : `max-w-md` comme le ChatMockup actuel, centré dans la grille

### Animation d'entrée
- Comme le ChatMockup actuel, déclenché par Intersection Observer (threshold 0.4)
- Le header et l'input apparaissent d'abord (fade-in 300ms), puis le message d'accueil de Maya en streaming

### SSR / Hydration
Le composant est "use client". Côté SSR il rend le cadre vide (header + zone messages vide + input) comme placeholder statique. Le contenu interactif ne démarre qu'après hydration + Intersection Observer trigger. Pas de skeleton dédié nécessaire — le cadre vide fait office de placeholder.

### Accessibilité
- `role="log"` sur le conteneur messages (live region)
- `aria-live="polite"` pour les nouveaux messages
- Boutons avec `aria-label` descriptif
- Focus management : le premier bouton reçoit le focus après l'accueil

## Design visuel

### Palette (cohérente avec le site existant)
- **Header** : `bg-[#0d47a1]` (bleu foncé existant)
- **Fond messages** : `bg-gray-50` (clair, comme actuellement)
- **Bulle user** : `bg-[#0d47a1]` texte blanc, coin bas-droit arrondi moindre
- **Bulle Maya** : `bg-white` border `gray-200`, coin bas-gauche arrondi moindre
- **Boutons scénario** : border `[#0d47a1]/20`, hover `bg-[#0d47a1]/5`, texte `[#0d47a1]`
- **Bouton CTA** : gradient `from-[#0d47a1] to-[#00e5ff]`, texte blanc

### Typographie
- Messages : `text-sm` (14px)
- Nom Maya dans header : `font-medium`
- Contenu riche (tableaux, deals) : `text-xs` (12px) pour densité

### Dimensions
- Header : ~56px hauteur
- Zone messages : 350-400px min, auto-scroll
- Input : ~52px hauteur
- Largeur max : `max-w-md` (28rem / 448px)
- Border radius global : `rounded-2xl`

## Intégration dans la homepage

La section "Solution / Maya Section" (lignes 270-373 de `page.tsx`) conserve sa structure grid 2 colonnes. Seul le composant dans `order-1 lg:order-2` change :

```tsx
// Avant
<ChatMockup messages={[...]} ... />

// Après
<InteractivePlayground lang={lang} />
```

Le composant `InteractivePlayground` reçoit uniquement `lang` et charge ses propres données via `getDictionary(lang)` et `getScenarios(lang)` (les deux sont des fonctions pures synchrones, importables côté client).

Ajouter `id="cta-final"` à la section CTA finale de la page pour le scroll-to depuis le playground.

## Scénarios i18n

Les textes des scénarios sont dans `lib/playground-scenarios.ts`, pas dans `dictionary.ts`, pour garder le dictionnaire principal léger. Seuls les textes d'accueil et de CTA vont dans le dictionnaire.

### Ajouts à `dictionary.ts`

**1. Ajouter au type `Dictionary` :**

```typescript
playground: {
  welcome: string       // "Salut ! Je suis Maya..."
  tryAnother: string    // "Tu veux voir autre chose ?"
  ctaText: string       // "Ça, c'est juste un aperçu..."
  ctaButton: string     // "Rejoindre la beta"
  inputPlaceholder: string  // "Demande à Maya..."
}
```

**2. Ajouter aux deux dictionnaires `en` et `fr` les valeurs correspondantes.**

## Tests

### Tests manuels attendus
1. Les 3 scénarios se jouent sans erreur
2. Le streaming s'affiche correctement (pas de clignotement, pas de saut)
3. Le scroll auto fonctionne dans le conteneur (et ne force pas si l'utilisateur a scrollé manuellement)
4. Le switch FR/EN affiche les bons textes
5. Le bouton CTA scrolle bien vers le formulaire waitlist (#cta-final)
6. Mobile : le playground est utilisable et lisible
7. L'Intersection Observer déclenche correctement l'animation
8. En React dev mode (StrictMode), pas de double-streaming

### Edge cases
- Le visiteur clique un bouton pendant un scénario → boutons désactivés, aucun effet
- Le visiteur quitte la section pendant un streaming → cleanup des intervals
- Le visiteur revient sur la section → le playground garde son état (pas de reset)
- Langue non supportée → fallback anglais

## Hors scope

- Appels LLM réels
- Persistance de l'état entre sessions
- Analytics/tracking des interactions (phase ultérieure)
- Scénarios supplémentaires au-delà des 3 validés
- Mode sombre du playground (le site est en thème clair)
- Replay des scénarios déjà joués (v1)
- Modifier `lib/i18n/translations/` (système i18n séparé, non utilisé par les pages)
