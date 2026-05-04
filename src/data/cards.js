export const cards = [
  {
    id: 1,
    theme: "Acteurs de la mondialisation",
    text: "Une Firme Multinationale (FMN) américaine veut installer son usine d'assemblage dans un pays d'Afrique subsaharienne pour réduire ses coûts.",
    leftChoice: {
      text: "Accepter (Investissement)",
      impact: { integration: +15, equity: -10, france: 0, tensions: +10 },
      argument: "L'IDE (Investissement Direct à l'Étranger) intègre un pays en marge, mais la DIT (Division Internationale du Travail) maintient des emplois précaires."
    },
    rightChoice: {
      text: "Refuser (Protéger le Nord)",
      impact: { integration: -10, equity: +10, france: 0, tensions: -5 },
      argument: "Le refus de la DIT protège les emplois industriels dans les pays du Nord, mais prive un PMA (Pays le Moins Avancé) d'investissements de développement."
    }
  },
  {
    id: 2,
    theme: "Territoires Inégaux",
    text: "Faut-il construire un nouveau port en eau profonde (ZIP) sur la côte ou développer les infrastructures de l'arrière-pays ?",
    leftChoice: {
      text: "Construire la ZIP",
      impact: { integration: +20, equity: -15, france: 0, tensions: +5 },
      argument: "La littoralisation des activités renforce l'intégration mondiale grâce au transport maritime, mais accentue la fracture avec l'arrière-pays (hinterland)."
    },
    rightChoice: {
      text: "Développer l'arrière-pays",
      impact: { integration: -10, equity: +20, france: 0, tensions: -10 },
      argument: "L'aménagement du territoire réduit les inégalités spatiales, mais le pays risque d'être marginalisé dans les grands flux maritimes internationaux."
    }
  },
  {
    id: 3,
    theme: "La France dans la mondialisation",
    text: "La France possède la 2ème plus grande ZEE mondiale. Faut-il investir massivement dans l'exploitation des ressources de nos DROM-COM ?",
    leftChoice: {
      text: "Investir et exploiter",
      impact: { integration: +10, equity: 0, france: +20, tensions: +15 },
      argument: "Les DROM-COM assurent une présence géopolitique mondiale à la France, mais leur exploitation suscite des tensions écologiques et locales."
    },
    rightChoice: {
      text: "Préserver et protéger",
      impact: { integration: 0, equity: +10, france: -10, tensions: -10 },
      argument: "Ne pas exploiter la ZEE française limite la puissance économique de la France face aux concurrents (États-Unis, Chine), mais préserve la biodiversité."
    }
  },
  {
    id: 4,
    theme: "L'Archipel Mégalopolitain",
    text: "Paris subit la concurrence de Londres. Faut-il créer des zones franches fiscales pour attirer les sièges sociaux des FMN ?",
    leftChoice: {
      text: "Créer des zones franches",
      impact: { integration: +15, equity: -20, france: +15, tensions: +10 },
      argument: "Attirer les sièges sociaux renforce le statut de Ville Globale (métropolisation), mais la gentrification et la fragmentation socio-spatiale explosent."
    },
    rightChoice: {
      text: "Taxer et redistribuer",
      impact: { integration: -10, equity: +15, france: -10, tensions: -5 },
      argument: "La redistribution limite les inégalités intra-urbaines, mais entraîne une perte d'attractivité internationale face aux autres grandes métropoles mondiales."
    }
  },
  {
    id: 5,
    theme: "Flux et Réseaux",
    text: "Une crise bloque temporairement le Canal de Suez (goulet d'étranglement). Les chaînes mondiales sont à l'arrêt. Que faire ?",
    leftChoice: {
      text: "Relocaliser la production",
      impact: { integration: -20, equity: +10, france: +10, tensions: -10 },
      argument: "La relocalisation réduit la dépendance aux points de passage stratégiques, démontrant les limites et la fragilité de la mondialisation hyper-connectée."
    },
    rightChoice: {
      text: "Sécuriser militairement",
      impact: { integration: +10, equity: -10, france: 0, tensions: +25 },
      argument: "La sécurisation des grandes voies par les puissances étatiques illustre l'importance vitale du commerce maritime (la maritimisation de l'économie)."
    }
  },
  {
    id: 6,
    theme: "Acteurs institutionnels",
    text: "L'OMC (Organisation Mondiale du Commerce) propose de supprimer toutes les barrières douanières sur les produits agricoles.",
    leftChoice: {
      text: "Accepter (Libre-échange)",
      impact: { integration: +25, equity: -20, france: -15, tensions: +15 },
      argument: "Le libre-échange stimule l'économie globale, mais ruine les petits agriculteurs du Sud et d'Europe face à l'agrobusiness des grands pays exportateurs."
    },
    rightChoice: {
      text: "Refuser (Protectionnisme)",
      impact: { integration: -20, equity: +15, france: +10, tensions: +10 },
      argument: "Le protectionnisme préserve la souveraineté alimentaire (ex: la PAC en Europe), mais ralentit l'intégration économique et crée des tensions commerciales."
    }
  },
  {
    id: 7,
    theme: "La France : Puissance d'influence",
    text: "Faut-il augmenter le budget de l'OIF (Organisation Internationale de la Francophonie) pour développer des universités en Afrique ?",
    leftChoice: {
      text: "Financer la francophonie",
      impact: { integration: +10, equity: +15, france: +20, tensions: -5 },
      argument: "La francophonie et les alliances françaises sont des outils majeurs du Soft Power français, favorisant le rayonnement culturel face à l'anglosphère."
    },
    rightChoice: {
      text: "Réduire le budget",
      impact: { integration: 0, equity: -10, france: -20, tensions: +5 },
      argument: "Le repli sur soi fragilise l'influence culturelle et diplomatique de la France dans ses anciennes zones d'influence (la Françafrique)."
    }
  },
  {
    id: 8,
    theme: "Périphéries et Marges",
    text: "Un pays andin enclavé (Bolivie) veut rejoindre le marché mondial en exploitant intensivement son lithium pour les batteries électriques.",
    leftChoice: {
      text: "Soutenir l'exploitation",
      impact: { integration: +20, equity: -15, france: 0, tensions: +15 },
      argument: "La mondialisation intègre les périphéries fournisseuses de matières premières, mais souvent au prix du pillage des ressources (néocolonialisme)."
    },
    rightChoice: {
      text: "Imposer des normes écolos",
      impact: { integration: -15, equity: +20, france: +5, tensions: -10 },
      argument: "Le commerce équitable ou écologique protège les marges, mais ralentit leur développement économique rapide (intégration limitée)."
    }
  },
  {
    id: 9,
    theme: "Les flux immatériels",
    text: "De grands câbles sous-marins internet doivent être posés. Faut-il confier la gestion aux GAFAM ou aux États ?",
    leftChoice: {
      text: "Confier aux GAFAM",
      impact: { integration: +20, equity: -10, france: -10, tensions: +5 },
      argument: "Les firmes transnationales (FTN/GAFAM) monopolisent les réseaux mondiaux, contournant la puissance traditionnelle des États."
    },
    rightChoice: {
      text: "Contrôle par les États",
      impact: { integration: -10, equity: +5, france: +15, tensions: +20 },
      argument: "L'État cherche à conserver sa souveraineté numérique, provoquant des conflits géopolitiques (cyberespace comme nouveau territoire de guerre)."
    }
  },
  {
    id: 10,
    theme: "Les Suds et l'émergence",
    text: "La Chine propose de financer et de construire les infrastructures d'un PMA africain en échange de ses matières premières (Nouvelles routes de la soie).",
    leftChoice: {
      text: "Accepter l'aide chinoise",
      impact: { integration: +20, equity: -15, france: -15, tensions: +20 },
      argument: "Les pays émergents (ex: Chine) modifient les équilibres mondiaux (coopération Sud-Sud), mais créent des 'pièges de la dette' pour les PMA."
    },
    rightChoice: {
      text: "Privilégier l'aide de l'UE",
      impact: { integration: 0, equity: +10, france: +15, tensions: +5 },
      argument: "L'aide au développement de la Triade (Nord) est souvent conditionnée aux droits humains, limitant l'intégration rapide mais protégeant les populations."
    }
  }
];
