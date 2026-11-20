// =====================================================================================================
//  MUNDO 1 · EL BOSQUE — ficha de datos
// =====================================================================================================
// Cada mundo es SOLO datos: el motor (main.js) no sabe nada de ningún mundo concreto y lee de aquí
// lo que cambia entre uno y otro (ver "MUNDOS" en main.js y worlds/README.md). Se carga antes que
// main.js (ver index.html) y se registra en window.FN_WORLDS por su id.
//
// Un mundo nuevo = un archivo nuevo en esta carpeta + su <script> en index.html + sus textos
// (world.N.name / world.N.desc) en lang.js. Nada más.
(window.FN_WORLDS = window.FN_WORLDS || {})[1] = {
    id: 1,
    nameKey: 'world.1.name',

    // Mapa de 100×100. camp* = el área del campamento inicial (6×6), de la que se mide la distancia
    // que endurece los árboles; tcX/tcY = esquina del Centro Urbano (4×4); cx/cy = centro del
    // campamento (territorio inicial, cámara, anillos de la vista del bosque).
    map: { campX0: 47, campX1: 52, campY0: 47, campY1: 52, tcX: 48, tcY: 48, cx: 50, cy: 50 },

    // Vida de los árboles según la distancia al campamento (ver getTreeMaxCapacity): cada fila
    // multiplica por (growthStart - growthDecay·k), sin bajar de ×1.
    trees: { growthStart: 1.28, growthDecay: 0.003 },

    // Las 4 primeras reliquias salen en línea recta desde el Centro Urbano, en este orden de
    // direcciones: 0 abajo, 1 arriba, 2 derecha, 3 izquierda. Después, al azar.
    relics: { firstDirs: [0, 1, 2, 3] },

    // Suelo: nombre de la imagen en assets/ (sin .png) para la hierba de tu territorio, el suelo del
    // bosque visible que aún no es tuyo y el empedrado de la ciudad (bajo casas y edificios).
    terrain: { grass: 'grass_base', forest: 'grass_base_bosque', city: 'low_stone' },


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
        { id: 'donaPozo',         x: 320, y: 320, ts: 3, branch: 'reliquias'    },
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
        { id: 'hidraulica',       x: 640, y: 640, ts: 3, branch: 'edificacion'  },
        { id: 'aserradero',       x: 640, y: 800, ts: 3, branch: 'edificacion'  },
        { id: 'bosqueCultivado',  x: 640, y: 880, ts: 3, branch: 'edificacion'  },
        { id: 'madereroMovil',    x: 480, y: 880, ts: 3, branch: 'edificacion'  },
        { id: 'pozoOvejas',       x: 640, y: 960, ts: 3, branch: 'edificacion'  },
        { id: 'cadenaGranjas',    x: 640, y:1120, ts: 3, branch: 'edificacion'  },
        { id: 'cadenaOvejas',     x: 640, y:1280, ts: 3, branch: 'edificacion'  },
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
        { id: 'rutaArtesania',    x: 1440, y: 940, ts: 3, branch: 'obras'        },
        { id: 'paradaComercial',  x: 1440, y: 840, ts: 3, branch: 'obras'        },
        { id: 'mulasLigeras',     x: 1440, y: 760, ts: 3, branch: 'obras'        },
        // Antes nodo de convergencia (rutaComercial Y maestria); ahora solo cuelga de rutaComercial, que ya
        // exige maestria por su cadena (rutaComercial → gremioMercaderes → maestria). Su x,y es
        // solo un valor de partida cualquiera para que el layout radial automático tenga algo. Sin
        // posición manual todavía (STK_MANUAL_POSITIONS): hay que arrastrarla en modo "O" (ver
        // _stkLogManualPositions) hasta un punto que quede bien entre las dos ramas y copiarla aquí.
        { id: 'establo',          x: 1520, y: 300, ts: 3, branch: 'obras'        },
        { id: 'establoPozoGranja', x: 1600, y: 300, ts: 3, branch: 'obras'        },
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
        'donaPozo':   'masCartas',
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
        'hidraulica':     'pedernal',
        'aserradero':     'maestria',
        'madereroMovil':  'aserradero',
        'pozoOvejas':     'hidraulica',
        'cadenaGranjas':  'hidraulica',
        'cadenaOvejas':   'pozoOvejas',
        'cadenaFrutales': 'arbolFrutal',
        'cadenaAlgodon':  'plantacion',
        'panaderia':          'maestria',
        'panaderiaIntegrada': 'panaderia',
        'taberna':            'maestria',
        'iglesia':            'maestria',
        'gremioMercaderes':   'maestria',
        'rutaComercial':      'gremioMercaderes',
        'mercaderExperto':    'rutaComercial',
        'paradaComercial':    'mercaderExperto',
        'rutaArtesania':      'mercaderExperto',
        // Cuelga de bosqueCultivado, no de aserradero: el bonus solo hace algo si tienes
        // Plantaciones Forestales, y quien las desbloquea es esa habilidad. Colgandolo del Aserradero
        // se podia comprar antes de poder construir una sola plantacion, y no habria hecho nada.
        // No hace falta pedir tambien aserradero: bosqueCultivado ya desciende de el.
        'complejoMaderero':   'bosqueCultivado',
        'mulasLigeras':       'rutaComercial',
        'establo':            'rutaComercial',   // maestria ya va incluida: rutaComercial → gremioMercaderes → maestria
        'establoPozoGranja':  'establo',
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
        // legacyT8 (Fase 2) exige los TRES paquetes, no solo uno — array de prereqs, no una cadena.
        // isLocked/_stkIsVisible ya recorren _prereqList(id) con every(), así que con esto solo se
        // vuelve reclamable (y visible) una vez tomados los tres, sin tocar esa lógica genérica.
        'legacyT8': ['legacyPkgSindicatos', 'legacyPkgAbundancia', 'legacyPkgBanca'],
        },
        // Raíces: los nodos sin padre, de los que salen los radios decorativos desde el centro.
        roots: ['doubleChop', 'talaX5', 'startVillagers4', 'arquitectoWood', 'masCartas', 'pastoreoPareja', 'maestria', 'rutaMilitar'],
        // Posición final de cada nodo en el dibujo (modo "O" del árbol para moverlos y copiar esto).
        positions: {
        barridoTala: { x: -1900, y: -800 },
        talaX5: { x: -1900, y: -700 },
        recoleccion: { x: -1900, y: -600 },
        trioTaladores: { x: -1900, y: -500 },
        talaX6: { x: -1900, y: -400 },
        talaX8: { x: -1900, y: -300 },
        talaX10: { x: -1900, y: -200 },
        areaTala1: { x: -2000, y: -600 },
        areaTala2: { x: -2000, y: -500 },
        areaTala3: { x: -2000, y: -400 },
        areaTala4: { x: -2000, y: -300 },
        areaTala5: { x: -2000, y: -200 },
        arquitectoWood: { x: -2200, y: -800 },
        arquitectoFood: { x: -2200, y: -700 },
        arquitectoWool: { x: -2200, y: -600 },
        arquitectoStone: { x: -2200, y: -500 },
        descuentoMover: { x: -2200, y: -400 },
        moverSoloMadera: { x: -2200, y: -300 },
        masCartas: { x: 100, y: -800 },
        masCartas2: { x: 200, y: -700 },
        todasOpciones: { x: 100, y: -500 },
        todasOpciones2: { x: 100, y: -600 },
        canteras: { x: 200, y: -500 },
        donaPozo: { x: -200, y: -700 },
        donaCasa: { x: -100, y: -700 },
        donaOvejas: { x: 100, y: -700 },
        donaAlgodon: { x: 300, y: -500 },
        donaFrutal: { x: 400, y: -500 },
        donaCaminos5: { x: 0, y: -700 },
        donaCaminos10: { x: 0, y: -500 },
        capacidadMochila: { x: -1600, y: -700 },
        capacidadMochila2: { x: -1700, y: -600 },
        capacidadMochila3: { x: -1700, y: -500 },
        capacidadMochila4: { x: -1700, y: -400 },
        capacidadMochila5: { x: -1700, y: -300 },
        velocidadAldeano: { x: -1600, y: -600 },
        velocidadAldeano2: { x: -1500, y: -500 },
        velocidadAldeano3: { x: -1500, y: -400 },
        velocidadAldeano4: { x: -1500, y: -300 },
        velocidadAldeano5: { x: -1500, y: -200 },
        talaVelocidad: { x: -1600, y: -500 },
        talaVelocidad2: { x: -1600, y: -400 },
        talaVelocidad3: { x: -1600, y: -300 },
        talaVelocidad4: { x: -1600, y: -200 },
        talaVelocidad5: { x: -1600, y: -100 },
        startVillagers4: { x: -1500, y: -800 },
        startVillagers10: { x: -1400, y: -700 },
        casaGrande: { x: -1300, y: -600 },
        casaGrande2: { x: -1400, y: -500 },
        migracion: { x: -1200, y: -500 },
        teatro: { x: -500, y: -300 },
        teatroCapacidad: { x: -500, y: -200 },
        doubleChop: { x: -600, y: -800 },
        insectivoro: { x: -600, y: -700 },
        pedernal: { x: -700, y: -600 },
        pastoreoFertil: { x: -600, y: -600 },
        talaX4: { x: -500, y: -600 },
        proximaCamp4: { x: -200, y: -500 },
        proximaCamp10: { x: -100, y: -400 },
        duoTaladores: { x: -300, y: -400 },
        estatuaOfrenda: { x: -200, y: -400 },
        hidraulica: { x: -1000, y: -500 },
        aserradero: { x: -200, y: -300 },
        bosqueCultivado: { x: -100, y: -200 },
        madereroMovil: { x: -200, y: -200 },
        pozoOvejas: { x: -1000, y: -300 },
        cadenaGranjas: { x: -1100, y: -300 },
        cadenaOvejas: { x: -1000, y: -200 },
        pastoreoPareja: { x: -1300, y: -500 },
        arbolFrutal: { x: -1300, y: -400 },
        huertosGemelos: { x: -1200, y: -200 },
        plantacion: { x: -1300, y: -200 },
        cadenaFrutales: { x: -1400, y: -200 },
        cadenaAlgodon: { x: -1300, y: -100 },
        brigadaMinera: { x: -900, y: -200 },
        canteraLogistica: { x: -900, y: -100 },
        vetaDeOro: { x: -800, y: -200 },
        maestria: { x: -600, y: -500 },
        iglesia: { x: -600, y: -300 },
        ritual: { x: -600, y: -200 },
        panaderia: { x: -400, y: -300 },
        panaderiaIntegrada: { x: -400, y: -200 },
        taberna: { x: -700, y: -300 },
        tabernaRadio: { x: -700, y: -200 },
        tabernaDoble: { x: -700, y: -100 },
        gremioMercaderes: { x: -300, y: -300 },
        rutaComercial: { x: -300, y: -100 },
        mercaderExperto: { x: -300, y: 100 },
        paradaComercial: { x: -400, y: 200 },
        mulasLigeras: { x: -200, y: 100 },
        establo: { x: -500, y: 100 },
        establoPozoGranja: { x: -500, y: 200 },
        ingenieroCaminos: { x: -400, y: 100 },
        tesoreria: { x: -100, y: 100 },
        segundoRecolector: { x: 0, y: 200 },
        diezmoSagrado: { x: -100, y: 200 },
        cadenaCobro: { x: -200, y: 200 },
        peajeComercial: { x: 100, y: 200 },
        artePiedra: { x: -800, y: -300 },
        legacyT1: { x: -1100, y: 300 },
        legacyT2: { x: -1000, y: 300 },
        legacyT3: { x: -900, y: 300 },
        legacyT4: { x: -800, y: 300 },
        legacyPkgSindicatos: { x: -700, y: 200 },
        legacyPkgAbundancia: { x: -700, y: 400 },
        legacyPkgBanca: { x: -700, y: 300 },
        legacyT8: { x: -600, y: 300 },
        rutaMilitar: { x: -1100, y: -800 },
        torreVigilancia: { x: -1100, y: -700 },
        torreAlcance: { x: -1100, y: -600 },
        rutaArtesania: { x: -300, y: 200 },
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
        { relic: 20, bonuses: ['collect3x'],                   nameKey: 'prestige.t1.name', descKey: 'prestige.t1.desc' },
        { relic: 30, bonuses: ['speed3x', 'cap3x'],            nameKey: 'prestige.t2.name', descKey: 'prestige.t2.desc' },
        { relic: 40, bonuses: ['popCap20', 'villCheaper', 'start5'], nameKey: 'prestige.t3.name', descKey: 'prestige.t3.desc' },
        { relic: 50, bonuses: ['buildCheaper', 'startWith10'], nameKey: 'prestige.t4.name', descKey: 'prestige.t4.desc' },
        { relic: 60, choice: true, nameKey: 'prestige.choice.name', descKey: 'prestige.choice.desc' },
        { relic: 70, choice: true, nameKey: 'prestige.choice.name', descKey: 'prestige.choice.desc' },
        { relic: 80, choice: true, nameKey: 'prestige.choice.name', descKey: 'prestige.choice.desc' },
        { relic: 90, bonuses: ['phase2Unlocked'],              nameKey: 'prestige.t8.name', descKey: 'prestige.t8.desc' },
        ],
        // Paquetes para los tramos de elección — uno por tramo, sin repetir.
        packages: [
        { id: 'sindicatos', bonuses: ['chopX2', 'lumbStack'],                 icon: 'fa-solid fa-people-group',       nameKey: 'prestige.pkg.sindicatos.name', descKey: 'prestige.pkg.sindicatos.desc' },
        { id: 'abundancia', bonuses: ['hoverX2', 'hoverRadioX2', 'donaX2'],   icon: 'fa-solid fa-hand-holding-heart', nameKey: 'prestige.pkg.abundancia.name', descKey: 'prestige.pkg.abundancia.desc' },
        { id: 'banca',      bonuses: ['goldX2', 'marketFromStart', 'startGold1000'], icon: 'fa-solid fa-coins', nameKey: 'prestige.pkg.banca.name', descKey: 'prestige.pkg.banca.desc' },
        ],
        // Nodos del árbol que son tramos de Legado: id del nodo -> índice en milestones.
        legacyNodes: { legacyT1: 0, legacyT2: 1, legacyT3: 2, legacyT4: 3, legacyT8: 7 },
        // Nodos del árbol que son paquetes: id del nodo -> id del paquete.
        packageNodes: {
        legacyPkgSindicatos: 'sindicatos',
        legacyPkgAbundancia: 'abundancia',
        legacyPkgBanca:      'banca',
        },
    },

    // Edificios que NO existen en este mundo aunque no dependan de ninguna habilidad (tipo de edificio,
    // p. ej. 'house', 'farm'). Los que dependen de una habilidad ya desaparecen solos si su nodo no está
    // en el árbol de este mundo.
    buildings: { exclude: [] },
};
