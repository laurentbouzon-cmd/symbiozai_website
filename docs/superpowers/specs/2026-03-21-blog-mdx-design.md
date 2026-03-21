# Blog MDX SymbiozAI — Design Spec

**Date:** 2026-03-21
**Status:** Approved
**Validé par:** Laurent Bouzon

## Objectif

Blog SEO + éducation produit intégré au site Next.js existant. Bilingue FR/EN. Design minimal YC-like. Géré entièrement par la workforce IA (content-creator écrit en MDX, commit, deploy).

## Décisions validées

| Décision | Choix |
|----------|-------|
| Stack | MDX dans le Next.js existant |
| Route | /[lang]/blog (index) + /[lang]/blog/[slug] (articles) |
| Catégories | 4 : Produit, Comparatifs, Guides, Actualités IA |
| Design | Minimal YC-like, wahouu effect, beaucoup d'espace blanc |
| Langue | Bilingue FR/EN (comme le site) |
| Auteur | Workforce IA, Laurent valide avant publication |
| Contenu | Fichiers .mdx dans content/blog/ avec frontmatter YAML |

## Architecture

### Structure des fichiers articles

```
content/
  blog/
    fr/
      pourquoi-les-crm-traditionnels-echouent.mdx
      symbiozai-vs-hubspot.mdx
    en/
      why-traditional-crms-fail.mdx
      symbiozai-vs-hubspot.mdx
```

### Frontmatter

```yaml
---
title: "Pourquoi les CRM traditionnels échouent en 2026"
description: "Les CRM ont été conçus pour documenter la vente. Pas pour la piloter."
date: "2026-03-21"
category: "guides"        # produit | comparatifs | guides | actualites-ia
author: "SymbiozAI"
readingTime: 8             # minutes
slug: "pourquoi-les-crm-traditionnels-echouent"
featured: true             # affiché en premier sur l'index
---
```

### Fichiers à créer

| Fichier | Rôle |
|---------|------|
| `app/[lang]/blog/page.tsx` | Page index blog — liste des articles, filtres catégorie |
| `app/[lang]/blog/[slug]/page.tsx` | Page article — rendu MDX, TOC, CTA |
| `lib/blog.ts` | Utilitaires : lire les fichiers MDX, parser frontmatter, trier, filtrer |
| `components/blog/article-card.tsx` | Card article pour la liste (titre, date, catégorie, extrait) |
| `components/blog/article-layout.tsx` | Layout article (header, prose, sidebar TOC, CTA) |
| `components/blog/category-filter.tsx` | Pills/tabs de filtre par catégorie |
| `components/blog/table-of-contents.tsx` | Table des matières auto-générée, sticky sidebar |
| `content/blog/fr/pourquoi-les-crm-traditionnels-echouent.mdx` | Premier article FR |
| `content/blog/en/why-traditional-crms-fail.mdx` | Premier article EN |

### Fichiers à modifier

| Fichier | Modification |
|---------|-------------|
| `app/[lang]/page.tsx` | Ajouter lien "Blog" dans la navigation header |
| `lib/dictionary.ts` | Ajouter clés i18n blog (titre, description, catégories, CTA) |
| `app/sitemap.js` | Étendre avec les URLs des articles |

### Dépendances à ajouter

```
next-mdx-remote (rendu MDX server-side)
gray-matter (parse frontmatter YAML)
@tailwindcss/typography (prose styling)
```

## Design visuel

### Page index /blog

Design YC-like : ultra clean, typo forte, espace blanc généreux.

```
┌──────────────────────────────────────────┐
│  [Nav existante]              Blog  │
├──────────────────────────────────────────┤
│                                          │
│  Blog                                    │  ← h1 large, font-bold
│  Les idées derrière le CRM AI-Native.    │  ← sous-titre gris
│                                          │
│  [Tous] [Produit] [Comparatifs]          │
│  [Guides] [Actualités IA]                │  ← pills filtres
│                                          │
│  ──────────────────────────────────────  │
│                                          │
│  Pourquoi les CRM traditionnels          │
│  échouent en 2026                        │  ← titre article, text-xl font-bold
│  Les CRM ont été conçus pour documenter  │
│  la vente. Pas pour la piloter...        │  ← extrait, text-gray-600
│  21 mars 2026 · Guides · 8 min          │  ← méta, text-sm text-gray-400
│                                          │
│  ──────────────────────────────────────  │
│                                          │
│  [Prochain article...]                   │
│                                          │
└──────────────────────────────────────────┘
```

- Pas de cards avec bordures — juste du texte, des séparateurs fins, beaucoup d'air
- Hover : titre passe en bleu #0d47a1
- Badge catégorie : pill petit, border subtle
- Animation scroll-reveal sur chaque article

### Page article

```
┌──────────────────────────────────────────┐
│  ← Retour au blog                        │
├──────────────────────────────────────────┤
│                                          │
│  GUIDES                                  │  ← catégorie uppercase, bleu
│  Pourquoi les CRM traditionnels          │
│  échouent en 2026                        │  ← h1 text-4xl font-bold
│  21 mars 2026 · 8 min de lecture         │  ← méta
│                                          │
│  ┌──────────┐  ┌─────────────────────┐   │
│  │ Sommaire │  │                     │   │
│  │ 1. xxx   │  │  Corps de l'article │   │
│  │ 2. xxx   │  │  en prose Tailwind  │   │
│  │ 3. xxx   │  │                     │   │
│  │ (sticky) │  │  ## Heading 2       │   │
│  │          │  │  Paragraphe...      │   │
│  └──────────┘  │                     │   │
│                │  > Blockquote       │   │
│                │                     │   │
│                └─────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │  CTA Waitlist (gradient bleu)   │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ← Article précédent  Article suivant →  │
│                                          │
└──────────────────────────────────────────┘
```

- TOC sidebar sticky sur desktop, masquée sur mobile
- Prose Tailwind : `prose prose-lg` avec overrides pour la palette
- CTA waitlist en fin d'article (réutilise WaitlistForm existant)

### Palette

- Fond : blanc `bg-white`
- Titres : `text-gray-900` noir
- Corps : `text-gray-700`
- Méta : `text-gray-400`
- Accents : `text-[#0d47a1]` (bleu existant)
- Séparateurs : `border-gray-100`
- Hover titres : `hover:text-[#0d47a1]`

### Typographie

- h1 blog index : `text-5xl font-bold tracking-tight`
- h1 article : `text-4xl font-bold tracking-tight`
- Titres articles dans la liste : `text-xl font-semibold`
- Extrait : `text-base text-gray-600`
- Méta : `text-sm text-gray-400`
- Corps article : Tailwind prose `prose-lg`

## SEO

### Metadata par article
- `<title>` : titre article + " | SymbiozAI Blog"
- `<meta description>` : champ description du frontmatter
- OG tags : titre, description, image (générique ou custom)
- Schema.org BlogPosting avec author, datePublished, headline

### Sitemap
- Étendre `app/sitemap.js` pour inclure tous les articles publiés
- URLs canoniques avec alternates FR/EN

### Structured data
```json
{
  "@type": "BlogPosting",
  "headline": "...",
  "datePublished": "...",
  "author": { "@type": "Organization", "name": "SymbiozAI" },
  "publisher": { "@type": "Organization", "name": "SymbiozAI" }
}
```

## Workflow AI Workforce

### Publication d'un article
1. Content-creator crée le fichier .mdx dans `content/blog/[lang]/`
2. Frontmatter rempli (titre, description, catégorie, date, slug)
3. Git commit + push
4. Le blog détecte automatiquement le nouveau fichier (filesystem-based)
5. Build + deploy OVH

### Convention de nommage
- Fichier : `content/blog/fr/[slug].mdx`
- Slug = kebab-case, pas de date dans le nom de fichier
- Les slugs FR et EN doivent correspondre pour le switch de langue

## Ajouts dictionary.ts

```typescript
blog: {
  title: string           // "Blog"
  subtitle: string        // "Les idées derrière le CRM AI-Native."
  allPosts: string        // "Tous"
  categories: {
    produit: string       // "Produit"
    comparatifs: string   // "Comparatifs"
    guides: string        // "Guides"
    "actualites-ia": string  // "Actualités IA"
  }
  readingTime: string     // "min de lecture"
  backToBlog: string      // "Retour au blog"
  ctaTitle: string        // "Prêt à essayer ?"
  ctaDescription: string  // "Rejoignez la beta..."
  previousArticle: string // "Article précédent"
  nextArticle: string     // "Article suivant"
}
```

## Hors scope v1

- Système de tags (catégories suffisent)
- Recherche dans le blog
- Commentaires
- RSS feed (v2)
- Images de couverture par article (v2 — on utilise une image générique)
- Pagination (pas nécessaire avec < 20 articles)
