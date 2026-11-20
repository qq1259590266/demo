// =====================================================================================================
//  MUNDO 2 · LA COSTA — ficha de datos
// =====================================================================================================
// Se llega naufragando a la costa SUR y se tala hacia el norte. Mismo formato que worlds/world1.js
// (ver ahí qué es cada campo y worlds/README.md para cómo añadir mundos).
(window.FN_WORLDS = window.FN_WORLDS || {})[2] = {
    id: 2,
    nameKey: 'world.2.name',

    // Campamento pegado a la costa sur (filas 94-99): el borde norte queda a ~94 filas, el doble que
    // en el mundo 1, y por eso los árboles de allí son mucho más duros con la MISMA curva (opción A
    // de diseño: ~×27 de madera total frente al mundo 1).
    // Aldeanos con los que empieza CADA partida (los supervivientes del naufragio), también la primera. Los Legados que dan más (4, 10)
    // mandan: se coge el mayor, no se suman.
    startVillagers: 2,
    // tcSprite: 'm2',   // (descomentar para que el Centro Urbano use assets/town_center_m2.png en vez del de siempre)
    map: { campX0: 47, campX1: 52, campY0: 94, campY1: 99, tcX: 48, tcY: 95, cx: 50, cy: 97 },

    // sideCols/sideSpan: a los lados, 2 columnas por "fila" de vida durante 25 columnas desde el campamento y luego 1 por columna hasta el final (ver getDistanceToInitialCamp)
    trees: { growthStart: 1.28, growthDecay: 0.003, sideCols: 2, sideSpan: 25 },

    // Abajo está el mar: la primera reliquia iba "abajo" y, sin árboles, caía al azar. Aquí se
    // reparte arriba, derecha, izquierda y otra vez arriba (más lejos).
    relics: { firstDirs: [1, 2, 3, 1] },
    // Cada reliquia pide un 10% menos de árboles (ver _chestStep): con el agua, el mapa no daba para las 110 del último Legado en una partida
    relicStepScale: 0.9,

    // Suelo propio del mundo 2 (si falta alguna imagen, se usa la del mundo 1).
    terrain: { grass: 'grass_base_m2', forest: 'grass_base_bosque_m2', city: 'low_stone_m2', riverBank: 'grass_base' },   // riverBank: hierba de la orilla fértil (1 casilla alrededor del río: ahí el bonus del río)


    // =================================================================================================
    //  ÁRBOL DE HABILIDADES DE ESTE MUNDO
    // =================================================================================================
    // Qué nodos hay, qué pide cada uno y dónde se dibuja. Las habilidades en sí (qué HACE cada id) son
    // del motor (main.js, _activateSkill y compañía): aquí solo se decide cuáles existen en este mundo
    // y cómo se encadenan. Un id que no esté en `nodes` no se puede conseguir en este mundo.
    skillTree: {
        // Nodos: id, posición base (x/y, solo orden si hay posición manual), tamaño (ts) y rama.
        nodes: [
        // Col 0  — Manual click chain
        { id: 'barridoTala',      x:   0, y:   0, ts: 3, branch: 'manual'       },
        { id: 'talaX5',           x:   0, y: 160, ts: 3, branch: 'manual'       },
        { id: 'recoleccion',      x:   0, y: 320, ts: 3, branch: 'manual'       },
        { id: 'trioTaladores',    x:   0, y: 480, ts: 3, branch: 'manual'       },
        { id: 'talaX6',           x:   0, y: 640, ts: 3, branch: 'manual'       },
        { id: 'talaX8',           x:   0, y: 800, ts: 3, branch: 'manual'       },
        { id: 'talaX10',          x:   0, y: 960, ts: 3, branch: 'manual'       },
        // Branch off talaX5 — manual AoE radius tiers (temp position, reposition via dev arrange-mode)
        { id: 'areaTala1',        x: -160, y: 160, ts: 3, branch: 'manual'       },
        { id: 'areaTala2',        x: -320, y: 160, ts: 3, branch: 'manual'       },
        { id: 'areaTala3',        x: -480, y: 160, ts: 3, branch: 'manual'       },
        { id: 'areaTala4',        x: -640, y: 160, ts: 3, branch: 'manual'       },
        { id: 'areaTala5',        x: -800, y: 160, ts: 3, branch: 'manual'       },
        // Col 1  — Construcción + movimiento
        { id: 'arquitectoWood',   x: 160, y:   0, ts: 3, branch: 'construccion' },
        { id: 'arquitectoFood',   x: 160, y: 160, ts: 3, branch: 'construccion' },
        { id: 'arquitectoWool',   x: 160, y: 320, ts: 3, branch: 'construccion' },
        { id: 'arquitectoStone',  x: 160, y: 480, ts: 3, branch: 'construccion' },
        { id: 'descuentoMover',   x: 160, y: 640, ts: 3, branch: 'construccion' },
        { id: 'moverSoloMadera',  x: 160, y: 800, ts: 3, branch: 'construccion' },
        // Col 2  — Reliquias + Stackables de aldeanos
        { id: 'masCartas',        x: 320, y:   0, ts: 3, branch: 'reliquias'    },
        { id: 'masCartas2',       x: 320, y:  80, ts: 3, branch: 'reliquias'    },
        { id: 'todasOpciones',    x: 480, y:  80, ts: 3, branch: 'reliquias'    },   // la siguiente reliquia: todas las opciones
        { id: 'todasOpciones2',   x: 480, y:   0, ts: 3, branch: 'reliquias'    },   // hija de la anterior: lo mismo, otra vez
        { id: 'canteras',         x: 320, y: 160, ts: 3, branch: 'reliquias'    },
        { id: 'donaCasa',         x: 320, y: 480, ts: 3, branch: 'reliquias'    },
        { id: 'donaOvejas',       x: 320, y: 640, ts: 3, branch: 'reliquias'    },
        { id: 'donaAlgodon',      x: 320, y: 800, ts: 3, branch: 'reliquias'    },
        { id: 'donaFrutal',       x: 320, y: 960, ts: 3, branch: 'reliquias'    },
        { id: 'donaCaminos5',     x: 320, y:1040, ts: 3, branch: 'reliquias'    },
        { id: 'donaCaminos10',    x: 320, y:1080, ts: 3, branch: 'reliquias'    },
        { id: 'capacidadMochila', x: 320, y:1120, ts: 3, branch: 'aldea'        },
        { id: 'capacidadMochila2',x: 320, y:1160, ts: 3, branch: 'aldea'        },
        { id: 'capacidadMochila3',x: 320, y:1200, ts: 3, branch: 'aldea'        },
        { id: 'capacidadMochila4',x: 320, y:1240, ts: 3, branch: 'aldea'        },
        { id: 'capacidadMochila5',x: 320, y:1280, ts: 3, branch: 'aldea'        },
        { id: 'velocidadAldeano', x: 320, y: 640, ts: 3, branch: 'aldea'        },
        { id: 'velocidadAldeano2',x: 320, y: 660, ts: 3, branch: 'aldea'        },
        { id: 'velocidadAldeano3',x: 320, y: 680, ts: 3, branch: 'aldea'        },
        { id: 'velocidadAldeano4',x: 320, y: 700, ts: 3, branch: 'aldea'        },
        { id: 'velocidadAldeano5',x: 320, y: 720, ts: 3, branch: 'aldea'        },
        { id: 'talaVelocidad',    x: 320, y: 800, ts: 3, branch: 'aldea'        },
        { id: 'talaVelocidad2',   x: 320, y: 820, ts: 3, branch: 'aldea'        },
        { id: 'talaVelocidad3',   x: 320, y: 840, ts: 3, branch: 'aldea'        },
        { id: 'talaVelocidad4',   x: 320, y: 860, ts: 3, branch: 'aldea'        },
        { id: 'talaVelocidad5',   x: 320, y: 880, ts: 3, branch: 'aldea'        },
        // Col 3  — Aldea temprana + Población
        { id: 'startVillagers4',  x: 480, y:   0, ts: 3, branch: 'aldea'        },
        { id: 'startVillagers10', x: 480, y: 160, ts: 3, branch: 'aldea'        },
        { id: 'casaGrande',       x: 480, y: 320, ts: 3, branch: 'aldea'        },
        { id: 'casaGrande2',      x: 480, y: 340, ts: 3, branch: 'aldea'        },
        { id: 'migracion',        x: 480, y: 480, ts: 3, branch: 'poblacion'    },
        { id: 'teatro',           x: 480, y: 640, ts: 3, branch: 'poblacion'    },
        { id: 'teatroCapacidad',  x: 480, y: 800, ts: 3, branch: 'poblacion'    },
        // Col 4  — Bosque + Edificación
        { id: 'doubleChop',       x: 640, y:   0, ts: 3, branch: 'bosque'       },
        { id: 'insectivoro',      x: 640, y: 160, ts: 3, branch: 'bosque'       },
        { id: 'pedernal',         x: 640, y: 320, ts: 3, branch: 'bosque'       },
        { id: 'pastoreoFertil',   x: 640, y: 640, ts: 3, branch: 'bosque'       },
        { id: 'talaX4',           x: 640, y: 480, ts: 3, branch: 'bosque'       },
        { id: 'proximaCamp4',     x: 800, y: 960, ts: 3, branch: 'bosque'       },
        { id: 'proximaCamp10',    x: 800, y:1120, ts: 3, branch: 'bosque'       },
        { id: 'duoTaladores',     x: 960, y:1040, ts: 3, branch: 'bosque'       },
        { id: 'estatuaOfrenda',   x: 960, y: 960, ts: 3, branch: 'bosque'       },
        { id: 'pescaProfunda',    x: 640, y: 640, ts: 3, branch: 'edificacion'  },   // (mundo 1: hidraulica)
        { id: 'aserradero',       x: 640, y: 800, ts: 3, branch: 'edificacion'  },
        { id: 'bosqueCultivado',  x: 640, y: 880, ts: 3, branch: 'edificacion'  },
        { id: 'madereroMovil',    x: 480, y: 880, ts: 3, branch: 'edificacion'  },
        { id: 'pescaRio',         x: 640, y:1120, ts: 3, branch: 'edificacion'  },   // (mundo 1: cadenaGranjas)
        { id: 'cadenaGranjas',    x: 640, y: 1040, ts: 3, branch: 'edificacion'  },   // Cooperativa Agrícola: las otras cooperativas la mencionan, así que tiene que existir aquí (en el mundo 1 colgaba de Hidráulica)
        { id: 'cadenaOvejas',     x: 640, y: 960, ts: 3, branch: 'edificacion'  },   // (sube al hueco de Riego Ganadero, que en este mundo no existe: el río ya riega)
        { id: 'zanja',            x: 640, y:1280, ts: 3, branch: 'edificacion'  },   // zanjas de riego
        { id: 'riegoIntensivo',   x: 640, y:1440, ts: 3, branch: 'edificacion'  },   // +10% por casilla verde
        { id: 'cuadrillaZanja',   x: 800, y:1280, ts: 3, branch: 'edificacion'  },   // hasta 4 cavadores por zanja
        { id: 'picoZanja',        x: 960, y:1280, ts: 3, branch: 'edificacion'  },
        { id: 'pasarela',         x: 1120, y:1280, ts: 3, branch: 'edificacion'  },
        { id: 'riegoExtendido',   x: 1280, y:1280, ts: 3, branch: 'edificacion'  },   // +4 casillas regadas por zanja (en cruz)   // camino sobre zanjas (2 caminos)   // la velocidad del pico se suma a la de cavar
        { id: 'molinoAgua',       x: 640, y:1600, ts: 3, branch: 'edificacion'  },   // Molino de Agua (tras las zanjas)
        // Col 5  — Aldea tardía
        { id: 'pastoreoPareja',   x: 800, y:   0, ts: 3, branch: 'aldea'        },
        { id: 'arbolFrutal',      x: 800, y: 160, ts: 3, branch: 'aldea'        },
        { id: 'huertosGemelos',   x: 960, y: 200, ts: 3, branch: 'aldea'        },
        { id: 'plantacion',       x: 800, y: 320, ts: 3, branch: 'aldea'        },
        { id: 'cadenaFrutales',   x: 960, y: 360, ts: 3, branch: 'aldea'        },
        { id: 'cadenaAlgodon',    x: 960, y: 480, ts: 3, branch: 'aldea'        },
        { id: 'brigadaMinera',    x: 800, y: 640, ts: 3, branch: 'aldea'        },
        // Antes una mejora comprable en la Cantera (wood+stone, ver upgradeQuarrySupply — ahora
        // eliminada); ahora es un skill como el resto, colgando de brigadaMinera (misma familia de
        // "cantera" que ella y vetaDeOro). Posición provisional — reordenar con el modo de arreglo
        // "O" del árbol (ver stkToggleArrangeMode) igual que cualquier otro nodo nuevo.
        { id: 'canteraLogistica', x: 800, y: 720, ts: 3, branch: 'aldea'        },
        { id: 'vetaDeOro',        x: 800, y: 800, ts: 3, branch: 'aldea'        },
        // Col 6  — Obras (maestria + hijos)
        { id: 'maestria',         x: 960, y:   0, ts: 3, branch: 'obras'        },
        { id: 'iglesia',          x: 960, y: 160, ts: 3, branch: 'obras'        },
        { id: 'ritual',           x: 1120, y: 160, ts: 3, branch: 'obras'       },
        { id: 'panaderia',        x: 960, y: 320, ts: 3, branch: 'obras'        },
        { id: 'panaderiaIntegrada', x: 1120, y: 320, ts: 3, branch: 'obras'      },   // hija de panadería: ×2 con Granja y Molino pegados
        { id: 'taberna',          x: 960, y: 480, ts: 3, branch: 'obras'        },
        { id: 'tabernaRadio',     x: 800, y: 480, ts: 3, branch: 'obras'        },
        { id: 'tabernaDoble',     x: 800, y: 400, ts: 3, branch: 'obras'        },
        { id: 'gremioMercaderes', x: 960, y: 640, ts: 3, branch: 'obras'        },
        { id: 'rutaComercial',    x: 1120, y: 800, ts: 3, branch: 'obras'        },
        { id: 'mercaderExperto',  x: 1280, y: 760, ts: 3, branch: 'obras'        },
        { id: 'complejoMaderero', x: 1440, y: 1040, ts: 3, branch: 'edificacion'  },
        { id: 'mulasLigeras',     x: 1440, y: 760, ts: 3, branch: 'obras'        },
        // Antes nodo de convergencia (rutaComercial Y maestria); ahora solo cuelga de rutaComercial, que ya
        // exige maestria por su cadena (rutaComercial → gremioMercaderes → maestria). Su x,y es
        // solo un valor de partida cualquiera para que el layout radial automático tenga algo. Sin
        // posición manual todavía (STK_MANUAL_POSITIONS): hay que arrastrarla en modo "O" (ver
        // _stkLogManualPositions) hasta un punto que quede bien entre las dos ramas y copiarla aquí.
        { id: 'astillero',        x: 1600, y: 300, ts: 3, branch: 'obras'        },
        { id: 'faro',             x: 1280, y: 800, ts: 3, branch: 'obras'        },   // Faro: barcas +50% en 20 casillas   // (mundo 1: establoPozoGranja) — rama del Establo
        { id: 'ingenieroCaminos', x: 1280, y: 840, ts: 3, branch: 'obras'        },
        { id: 'tesoreria',        x: 1280, y: 900, ts: 3, branch: 'obras'        },
        { id: 'segundoRecolector', x: 1440, y: 900, ts: 3, branch: 'obras'       },
        { id: 'diezmoSagrado',    x: 1280, y: 1060, ts: 3, branch: 'obras'       },
        { id: 'cadenaCobro',      x: 1440, y: 1060, ts: 3, branch: 'obras'       },
        { id: 'peajeComercial',   x: 1600, y: 1060, ts: 3, branch: 'obras'       },
        { id: 'artePiedra',       x: 960, y: 800, ts: 3, branch: 'obras'        },
        // Col 7 — Legado (prestige reset tiers)
        { id: 'legacyT1',            x: 1120, y:   0, ts: 3, branch: 'legado'   },
        { id: 'legacyT2',            x: 1120, y: 160, ts: 3, branch: 'legado'   },
        { id: 'legacyT3',            x: 1120, y: 320, ts: 3, branch: 'legado'   },
        { id: 'legacyT4',            x: 1120, y: 480, ts: 3, branch: 'legado'   },
        // Three-way fork off legacyT4 — fanned out sideways so the branching reads as a branch.
        { id: 'legacyPkgSindicatos', x:  960, y: 640, ts: 3, branch: 'legado'   },
        { id: 'legacyPkgAbundancia', x: 1120, y: 640, ts: 3, branch: 'legado'   },
        { id: 'legacyPkgBanca',      x: 1280, y: 640, ts: 3, branch: 'legado'   },
        // Los tres paquetes vuelven a converger en legacyT8 (la puerta a la Fase 2, ver
        // PRESTIGE_MILESTONES) — solo reclamable con los tres ya tomados (SKILL_PREREQS más abajo).
        // Esta x/y es solo el valor base/de respaldo; la posición real la fija STK_MANUAL_POSITIONS.
        { id: 'legacyT8',            x: 1120, y: 800, ts: 3, branch: 'legado'   },
        { id: 'legacyT9',            x: 1280, y: 800, ts: 3, branch: 'legado'   },   // hermano del 8 (Mareas)
        { id: 'legacyT10',           x: 1200, y: 960, ts: 3, branch: 'legado'   },   // Legado 10: tras los dos hermanos
        // Defensa/Ataque (new branch, root: rutaMilitar → torreVigilancia — more nodes later). x
        // here is only a left-to-right ordering key for roots in the live radial layout (see
        // colOf/roots in renderSkillTree) — kept past the highest existing column (1120) so it
        // sorts last.
        { id: 'rutaMilitar',      x: 1280, y:   0, ts: 3, branch: 'territorio'  },
        { id: 'torreVigilancia',  x: 1280, y:  80, ts: 3, branch: 'territorio'  },
        { id: 'torreAlcance',     x: 1280, y: 160, ts: 3, branch: 'territorio'  },
        ],
        // Prerrequisitos: id -> id del padre (o lista de padres, hacen falta todos).
        prereqs: {
        'insectivoro':    'doubleChop',
        'pedernal':       'insectivoro',
        'pastoreoFertil': 'insectivoro',
        'talaX4':         'insectivoro',
        'proximaCamp4':   'talaX4',
        'proximaCamp10':  'proximaCamp4',
        'duoTaladores':   'proximaCamp4',
        'estatuaOfrenda': 'proximaCamp4',
        'arquitectoFood':  'arquitectoWood',
        'arquitectoWool':  'arquitectoFood',
        'arquitectoStone': 'arquitectoWool',
        'descuentoMover':   'arquitectoStone',
        'moverSoloMadera':  'descuentoMover',
        'startVillagers10': 'startVillagers4',
        'casaGrande':       'startVillagers10',
        'casaGrande2':      'casaGrande',
        'capacidadMochila': 'startVillagers4',
        'capacidadMochila2': 'capacidadMochila',
        'capacidadMochila3': 'capacidadMochila2',
        'capacidadMochila4': 'capacidadMochila3',
        'capacidadMochila5': 'capacidadMochila4',
        'velocidadAldeano': 'capacidadMochila',
        'velocidadAldeano2': 'velocidadAldeano',
        'velocidadAldeano3': 'velocidadAldeano2',
        'velocidadAldeano4': 'velocidadAldeano3',
        'velocidadAldeano5': 'velocidadAldeano4',
        'talaVelocidad':    'velocidadAldeano',
        'talaVelocidad2':   'talaVelocidad',
        'talaVelocidad3':   'talaVelocidad2',
        'talaVelocidad4':   'talaVelocidad3',
        'talaVelocidad5':   'talaVelocidad4',
        'masCartas2': 'masCartas',
        'todasOpciones': 'masCartas2',
        'todasOpciones2': 'todasOpciones',
        'canteras':   'masCartas2',
        'donaCasa':    'masCartas',
        'donaOvejas':  'masCartas',
        'donaAlgodon': 'masCartas2',
        'donaFrutal':  'masCartas2',
        'donaCaminos5':  'masCartas',
        'donaCaminos10': ['masCartas2', 'donaCaminos5'],
        'torreVigilancia': 'rutaMilitar',
        'torreAlcance':    'torreVigilancia',
        'talaX5':         'barridoTala',
        'recoleccion':  'talaX5',
        'trioTaladores':  'recoleccion',
        'talaX6':         'trioTaladores',
        'talaX8':         'talaX6',
        'talaX10':        'talaX8',
        'areaTala1':      'talaX5',
        'areaTala2':      'areaTala1',
        'areaTala3':      'areaTala2',
        'areaTala4':      'areaTala3',
        'areaTala5':      'areaTala4',
        'pastoreoPareja': 'casaGrande',
        'brigadaMinera':  'artePiedra',
        'canteraLogistica': 'brigadaMinera',
        'vetaDeOro':      'artePiedra',
        'maestria':       'pedernal',
        'pescaProfunda':  'insectivoro',   // comida que no sale de una granja, como Insectívoro (antes colgaba de Pedernal)
        'aserradero':     'maestria',
        'madereroMovil':  'aserradero',
        'pescaRio':       'pescaProfunda',
        'cadenaGranjas':  'casaGrande',   // la Cooperativa Agrícola cuelga de Casa Grande (en el mundo 1, de Hidráulica)
        'cadenaOvejas':   'pescaProfunda',
        'zanja':          'startVillagers4',
        'riegoIntensivo': 'zanja',
        'molinoAgua':     'riegoIntensivo',
        'cuadrillaZanja': 'picoZanja',
        'picoZanja':      'zanja',
        'pasarela':       'zanja',
        'riegoExtendido': 'riegoIntensivo',
        'cadenaFrutales': 'arbolFrutal',
        'cadenaAlgodon':  'plantacion',
        'panaderia':          'maestria',
        'panaderiaIntegrada': 'panaderia',
        'taberna':            'maestria',
        'iglesia':            'maestria',
        'gremioMercaderes':   'maestria',
        'rutaComercial':      'gremioMercaderes',
        'mercaderExperto':    'rutaComercial',
        // Cuelga de bosqueCultivado, no de aserradero: el bonus solo hace algo si tienes
        // Plantaciones Forestales, y quien las desbloquea es esa habilidad. Colgandolo del Aserradero
        // se podia comprar antes de poder construir una sola plantacion, y no habria hecho nada.
        // No hace falta pedir tambien aserradero: bosqueCultivado ya desciende de el.
        'complejoMaderero':   'bosqueCultivado',
        'mulasLigeras':       'rutaComercial',
        'astillero':          'rutaComercial',   // maestria ya va incluida: rutaComercial → gremioMercaderes → maestria
        'faro':               'rutaComercial',   // como el Establo al que sustituye
        'tabernaRadio':       'taberna',
        'tabernaDoble':       'tabernaRadio',
        'bosqueCultivado':    'aserradero',
        'ingenieroCaminos':   'rutaComercial',
        'tesoreria':          'rutaComercial',
        'segundoRecolector':  'tesoreria',
        'diezmoSagrado':      'tesoreria',
        'cadenaCobro':        'tesoreria',
        'peajeComercial':     'tesoreria',
        'artePiedra':         'maestria',
        'arbolFrutal':    'pastoreoPareja',
        'huertosGemelos': 'arbolFrutal',
        'plantacion':     'arbolFrutal',
        'migracion':      'casaGrande',
        'teatro':            'maestria',
        'teatroCapacidad':   'teatro',
        'ritual':            'iglesia',
        'legacyT2': 'legacyT1',
        'legacyT3': 'legacyT2',
        'legacyT4': 'legacyT3',
        // The three packages all fork off the last fixed tier — siblings, not a chain, so owning one
        // never gates the others (you end up with all three, only the order is yours to choose).
        'legacyPkgSindicatos': 'legacyT4',
        'legacyPkgAbundancia': 'legacyT4',
        'legacyPkgBanca':      'legacyT4',
        // Legados 8 y 9 (hermanos, en cualquier orden): cada uno cuelga de DOS paquetes, los de su camino.
        // Ingenieros del Río (puentes y zanjas) vale para los dos: es el paquete común.
        'legacyT8': ['legacyPkgAbundancia', 'legacyPkgSindicatos'],   // Raíces (tierra): Cosecha del Río + Ingenieros del Río
        'legacyT9': ['legacyPkgBanca', 'legacyPkgSindicatos'],        // Mareas (agua): Flota Mercante + Ingenieros del Río
        'legacyT10': ['legacyT8', 'legacyT9'],                        // Legado 10: con Raíces y Mareas
        },
        // Raíces: los nodos sin padre, de los que salen los radios decorativos desde el centro.
        roots: ['doubleChop', 'talaX5', 'startVillagers4', 'arquitectoWood', 'masCartas', 'pastoreoPareja', 'maestria', 'rutaMilitar'],
        // Posición final de cada nodo en el dibujo (modo "O" del árbol para moverlos y copiar esto).
        positions: {
        barridoTala: { x: -2000, y: -800 },
        talaX5: { x: -2000, y: -700 },
        recoleccion: { x: -2000, y: -600 },
        trioTaladores: { x: -2000, y: -500 },
        talaX6: { x: -2000, y: -400 },
        talaX8: { x: -2000, y: -300 },
        talaX10: { x: -2000, y: -200 },
        areaTala1: { x: -2100, y: -600 },
        areaTala2: { x: -2100, y: -500 },
        areaTala3: { x: -2100, y: -400 },
        areaTala4: { x: -2100, y: -300 },
        areaTala5: { x: -2100, y: -200 },
        arquitectoWood: { x: -2200, y: -800 },
        arquitectoFood: { x: -2200, y: -700 },
        arquitectoWool: { x: -2200, y: -600 },
        arquitectoStone: { x: -2200, y: -500 },
        descuentoMover: { x: -2200, y: -400 },
        moverSoloMadera: { x: -2200, y: -300 },
        masCartas: { x: 200, y: -800 },
        masCartas2: { x: 300, y: -700 },
        todasOpciones: { x: 200, y: -500 },
        todasOpciones2: { x: 200, y: -600 },
        canteras: { x: 300, y: -500 },
        donaCasa: { x: 0, y: -700 },
        donaOvejas: { x: 200, y: -700 },
        donaAlgodon: { x: 400, y: -500 },
        donaFrutal: { x: 500, y: -500 },
        donaCaminos5: { x: 100, y: -700 },
        donaCaminos10: { x: 100, y: -500 },
        capacidadMochila: { x: -1800, y: -700 },
        capacidadMochila2: { x: -1900, y: -600 },
        capacidadMochila3: { x: -1900, y: -500 },
        capacidadMochila4: { x: -1900, y: -400 },
        capacidadMochila5: { x: -1900, y: -300 },
        velocidadAldeano: { x: -1800, y: -600 },
        velocidadAldeano2: { x: -1700, y: -500 },
        velocidadAldeano3: { x: -1700, y: -400 },
        velocidadAldeano4: { x: -1700, y: -300 },
        velocidadAldeano5: { x: -1700, y: -200 },
        talaVelocidad: { x: -1800, y: -500 },
        talaVelocidad2: { x: -1800, y: -400 },
        talaVelocidad3: { x: -1800, y: -300 },
        talaVelocidad4: { x: -1800, y: -200 },
        talaVelocidad5: { x: -1800, y: -100 },
        startVillagers4: { x: -1500, y: -800 },
        startVillagers10: { x: -1300, y: -700 },
        casaGrande: { x: -1200, y: -600 },
        casaGrande2: { x: -1300, y: -500 },
        migracion: { x: -1000, y: -500 },
        teatro: { x: -400, y: -300 },
        teatroCapacidad: { x: -400, y: -200 },
        doubleChop: { x: -500, y: -800 },
        insectivoro: { x: -500, y: -700 },
        pedernal: { x: -600, y: -600 },
        pastoreoFertil: { x: -500, y: -600 },
        talaX4: { x: -400, y: -600 },
        proximaCamp4: { x: -100, y: -500 },
        proximaCamp10: { x: 0, y: -400 },
        duoTaladores: { x: -200, y: -400 },
        estatuaOfrenda: { x: -100, y: -400 },
        pescaProfunda: { x: -700, y: -600 },   // junto a Pedernal, bajo Insectívoro
        aserradero: { x: -200, y: -300 },
        bosqueCultivado: { x: -100, y: -200 },
        madereroMovil: { x: -200, y: -200 },
        pescaRio: { x: -800, y: -500 },
        cadenaGranjas: { x: -1100, y: -500 },   // encima de Casa Grande
        cadenaOvejas: { x: -700, y: -500 },
        zanja: { x: -1500, y: -700 },
        riegoIntensivo: { x: -1500, y: -600 },
        molinoAgua: { x: -1500, y: -500 },
        cuadrillaZanja: { x: -1600, y: -500 },
        picoZanja: { x: -1600, y: -600 },
        pasarela: { x: -1400, y: -600 },
        riegoExtendido: { x: -1400, y: -500 },
        pastoreoPareja: { x: -1200, y: -500 },
        arbolFrutal: { x: -1200, y: -400 },
        huertosGemelos: { x: -1100, y: -300 },
        plantacion: { x: -1200, y: -300 },
        cadenaFrutales: { x: -1300, y: -300 },
        cadenaAlgodon: { x: -1200, y: -200 },
        brigadaMinera: { x: -800, y: -200 },
        canteraLogistica: { x: -800, y: -100 },
        vetaDeOro: { x: -900, y: -200 },
        maestria: { x: -600, y: -500 },
        iglesia: { x: -600, y: -300 },
        ritual: { x: -600, y: -200 },
        panaderia: { x: -500, y: -300 },
        panaderiaIntegrada: { x: -500, y: -200 },
        taberna: { x: -700, y: -300 },
        tabernaRadio: { x: -700, y: -200 },
        tabernaDoble: { x: -700, y: -100 },
        gremioMercaderes: { x: -300, y: -300 },
        rutaComercial: { x: -300, y: -100 },
        mercaderExperto: { x: -400, y: 100 },
        mulasLigeras: { x: -100, y: 100 },
        astillero: { x: -200, y: 100 },
        faro: { x: 0, y: 100 },
        ingenieroCaminos: { x: -500, y: 100 },
        tesoreria: { x: -300, y: 100 },
        segundoRecolector: { x: -200, y: 300 },
        diezmoSagrado: { x: -300, y: 300 },
        cadenaCobro: { x: -400, y: 300 },
        peajeComercial: { x: -100, y: 300 },
        artePiedra: { x: -800, y: -300 },
        legacyT1: { x: -1400, y: 300 },
        legacyT2: { x: -1300, y: 300 },
        legacyT3: { x: -1200, y: 300 },
        legacyT4: { x: -1100, y: 300 },
        legacyPkgSindicatos: { x: -900, y: 300 },
        legacyPkgAbundancia: { x: -1000, y: 400 },
        legacyPkgBanca: { x: -1000, y: 200 },
        legacyT8: { x: -800, y: 400 },
        legacyT9: { x: -800, y: 200 },
        legacyT10: { x: -700, y: 300 },
        rutaMilitar: { x: -900, y: -800 },
        torreVigilancia: { x: -900, y: -700 },
        torreAlcance: { x: -900, y: -600 },
        complejoMaderero: { x: -100, y: -100 },
        },
    },

    // =================================================================================================
    //  LEGADOS DE ESTE MUNDO
    // =================================================================================================
    prestige: {
        // Tramos en orden: coste en reliquias y bonus fijos, o `choice: true` = eliges un paquete.
        // (El tramo con 'phase2Unlocked' lo quita el motor solo si la Fase 2 está apagada.)
        milestones: [
        // Propios del mundo 2: más flojos en aldeanos (×2 en vez de ×3) pero con el río, la pesca y
        // el naufragio dentro, para que no se sienta "lo mismo otra vez".
        { relic: 20, bonuses: ['collect2x', 'freeFishers2'],        nameKey: 'prestige.w2t1.name', descKey: 'prestige.w2t1.desc' },
        { relic: 30, bonuses: ['speed2x', 'cap2x', 'softTrees3'],   nameKey: 'prestige.w2t2.name', descKey: 'prestige.w2t2.desc' },
        { relic: 40, bonuses: ['fishBoots', 'villCheaper25'], nameKey: 'prestige.w2t4.name', descKey: 'prestige.w2t4.desc' },   // Pescando Botas (antes en el 50)
        { relic: 50, bonuses: ['riverBank3', 'popCap20', 'startWith10', 'start5'], nameKey: 'prestige.w2t3.name', descKey: 'prestige.w2t3.desc' },   // Riberas Anchas (antes en el 40)
        { relic: 60, choice: true, nameKey: 'prestige.choice.name', descKey: 'prestige.choice.desc' },
        { relic: 70, choice: true, nameKey: 'prestige.choice.name', descKey: 'prestige.choice.desc' },
        { relic: 80, choice: true, nameKey: 'prestige.choice.name', descKey: 'prestige.choice.desc' },
        // Sin "Horizonte Abierto": el mundo 2 no tiene Fase 2. Los Legados 8 y 9 son hermanos: a 90
        // eliges Raíces o Mareas, y a 100 te llevas el otro (grupo 'final', ver packages).
        { relic: 90,  choice: true, group: 'final', nameKey: 'prestige.choice.name', descKey: 'prestige.choice_final.desc' },
        { relic: 100, choice: true, group: 'final', nameKey: 'prestige.choice.name', descKey: 'prestige.choice_final.desc' },
        { relic: 110, bonuses: ['greenChop25', 'coastRelics'],                nameKey: 'prestige.w2t10.name', descKey: 'prestige.w2t10.desc' },   // Legado 10: tala +25% en suelo verde
        ],
        // Paquetes para los tramos de elección — uno por tramo, sin repetir.
        packages: [
        { id: 'ingenieros', bonuses: ['highBridge5', 'bridgeCheap', 'digFast'],          icon: 'fa-solid fa-archway',   nameKey: 'prestige.pkg.ingenieros.name', descKey: 'prestige.pkg.ingenieros.desc' },
        { id: 'cosecha',    bonuses: ['freeWatermill', 'millBig', 'startRiego', 'greenFood25'],             icon: 'fa-solid fa-wheat-awn', nameKey: 'prestige.pkg.cosecha.name',    descKey: 'prestige.pkg.cosecha.desc' },
        { id: 'flota',      bonuses: ['marketFromStart', 'harborBoats2', 'boatGold2', 'startGold500'],   icon: 'fa-solid fa-sailboat',  nameKey: 'prestige.pkg.flota.name',      descKey: 'prestige.pkg.flota.desc' },
        // Legados 8 y 9 (grupo 'final'): solo se ofrecen en los tramos de 90 y 100.
        { id: 'raices',     group: 'final', bonuses: ['lumberRelic2'], icon: 'fa-solid fa-tree',  nameKey: 'prestige.pkg.raices.name', descKey: 'prestige.pkg.raices.desc' },
        { id: 'mareas',     group: 'final', bonuses: ['boatCap2', 'faro2', 'faroRange25'], icon: 'fa-solid fa-water', nameKey: 'prestige.pkg.mareas.name', descKey: 'prestige.pkg.mareas.desc' },
        ],
        // Nodos del árbol que son tramos de Legado: id del nodo -> índice en milestones.
        legacyNodes: { legacyT1: 0, legacyT2: 1, legacyT3: 2, legacyT4: 3, legacyT10: 9 },
        // Nodos del árbol que son paquetes: id del nodo -> id del paquete.
        packageNodes: {
        legacyPkgSindicatos: 'ingenieros',   // (mundo 1: sindicatos)
        legacyPkgAbundancia: 'cosecha',      // (mundo 1: abundancia)
        legacyPkgBanca:      'flota',        // (mundo 1: banca)
        legacyT8:            'raices',       // Legado 8/9: hermanos, en cualquier orden
        legacyT9:            'mareas',
        },
    },

    // Edificios que NO existen en este mundo aunque no dependan de ninguna habilidad (tipo de edificio,
    // p. ej. 'house', 'farm'). Los que dependen de una habilidad ya desaparecen solos si su nodo no está
    // en el árbol de este mundo.
    buildings: {
        // Sin Pozo: aquí hace de pozo el río (ver food).
        exclude: ['well', 'establo'],
        // Edificios que SOLO existen en los mundos que los incluyen (ver _WORLD_ONLY_BUILDINGS).
        include: ['fisher_hut', 'watermill', 'astillero', 'lighthouse'],
    },

    // Costa del mapa (N/S/E/O): donde hay que construir los edificios de costa, como el Pescador.
    coast: 'S',

    // Fuera del mapa, lo que no es la costa es montaña (roca gris) en vez de mar: aquí el mar solo
    // está al sur.
    mountains: true,

    // Unas puertas en el centro del borde norte (en la montaña): decoración, ver _drawWorldGates en main.js. No hay nada detrás.
    gates: true,

    // Comercio por agua: el Mercado Ciudad y el Mercado Rural son PUERTOS (2×2 de tierra + 2×2 de
    // agua pegada) y las mulas son BARCAS que navegan entre ellos por el río y el mar. Un puente
    // normal les corta el paso; uno alto (habilidad Puente Alto) no.
    boats: true,

    // Textos propios de este mundo: clave normal → clave de lang.js que la sustituye aquí.
    lang: {
        'market.name': 'market.name_m2', 'build.market': 'build.market_m2', 'bminfo.market': 'bminfo.market_m2',
        'rutaComercial.name': 'rutaComercial.name_m2', 'rutaComercial.desc': 'rutaComercial.desc_m2',
        'rutaComercial.no_route': 'rutaComercial.no_route_m2', 'rutaComercial.convoy': 'rutaComercial.convoy_m2',
        'bminfo.ruta_comercial': 'bminfo.ruta_comercial_m2',
        'bminfo.road': 'bminfo.road_m2',   // con la frase del puente
        'mule.recruit': 'mule.recruit_m2', 'mule.recruit_souls': 'mule.recruit_souls_m2',
        'mule.pop_full': 'mule.pop_full_m2', 'mule.pop_full_desc': 'mule.pop_full_desc_m2', 'mule.upg_wheels': 'mule.upg_wheels_m2',
        'skill.gremioMercaderes.desc': 'skill.gremioMercaderes.desc_m2',
        'skill.rutaComercial.name': 'skill.rutaComercial.name_m2', 'skill.rutaComercial.desc': 'skill.rutaComercial.desc_m2',
        'skill.mercaderExperto.desc': 'skill.mercaderExperto.desc_m2',
        'skill.mulasLigeras.name': 'skill.mulasLigeras.name_m2', 'skill.mulasLigeras.desc': 'skill.mulasLigeras.desc_m2',
        'minimap.legend.mule_route': 'minimap.legend.mule_route_m2',
        'skill.peajeComercial.desc': 'skill.peajeComercial.desc_m2', 'skill.ritual.desc': 'skill.ritual.desc_m2',
        'stats.legado8_lead': 'stats.legado8_lead_m2', 'stats.legado8_call': 'stats.legado8_call_m2',   // el final del bosque en el mundo 2 no habla de la Fase 2 (aquí no hay) 'bonus.tax.route_hint': 'bonus.tax.route_hint_m2', 'bonus.peaje.onroute': 'bonus.peaje.onroute_m2',
        // barcas en vez de mulas en estadísticas, población, logros… (generado)
        'phase2.mule': 'phase2.mule_m2', 'phase2.mules': 'phase2.mules_m2', 'hud.pop_tip': 'hud.pop_tip_m2', 'prestige.pkg.banca.desc': 'prestige.pkg.banca.desc_m2', 'howto.tip_mules_desc': 'howto.tip_mules_desc_m2', 'isolnotice.market': 'isolnotice.market_m2', 'skill.paradaComercial.desc': 'skill.paradaComercial.desc_m2', 'skill.rutaArtesania.desc': 'skill.rutaArtesania.desc_m2', 'stats.souls_mules': 'stats.souls_mules_m2', 'ach.flotaComercial.desc': 'ach.flotaComercial.desc_m2', 'ach.primerosComerciantes.desc': 'ach.primerosComerciantes.desc_m2', 'stats.mule_trips': 'stats.mule_trips_m2', 'stats.mule': 'stats.mule_m2', 'stats.mules_section': 'stats.mules_section_m2',
    },

    // Río: PNG de 100×100 en assets/ (1 píxel = 1 casilla, AZUL = agua). No se tala ni se construye
    // encima; se cruza con puentes (camino sobre el agua, 5 del stock de caminos por casilla).
    // Vista previa y comprobación del PNG: node tools/preview_river.js
    river: 'river_m2',

    // Comida: los edificios de 'types' producen a ×mult, o a ×riverMult si tocan el río (casilla
    // vecina, diagonal incluida, como el Pozo en el mundo 1).
    // Pescador: ×sea en el mar,
    // ×seaDeep con Pesca de Profundidad, ×river junto al río (se construye ahí con Pesca de Río).
    food: { mult: 0.5, riverMult: 2, types: ['farm', 'sheep_farm', 'fruit_orchard', 'cotton_farm'],
            fisher: { sea: 1, seaDeep: 2, river: 1 } },

    // Descripción distinta de una habilidad en este mundo: id -> clave de lang.js.

    // Pasos del tutorial básico que cambian en este mundo: textos, botón resaltado y el edificio
    // que hay que construir para completarlo.
    tutorial: {
        2: { title: 'tuto.2.title_m2', desc: 'tuto.2.desc_m2' },   // ya hay 2 supervivientes: toca el tercero
        8: { title: 'tuto.8.title_m2', desc: 'tuto.8.desc_m2', target: 'btnBuildFisher', building: 'fisher_hut' },
    },
};
