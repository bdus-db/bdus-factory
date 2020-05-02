const defaults = {
    app_data: {
      "lang": "en",
      "name": "test",
      "definition": "A BraDypUS database",
      "status": "on"
    },
    tables: {
      "tables": [
      {
        "name": "test__siti",
        "label": "Siti",
        "order": "nome",
        "id_field": "nome",
        "preview": [
        "nome",
        "tipologia",
        "cronologia"
        ],
        "plugin": [
        "test__m_biblio"
        ]
      },
      {
        "name": "test__us",
        "label": "Unità stratigrafiche",
        "order": "nome",
        "id_field": "nome",
        "preview": [
        "nome",
        "tipo"
        ],
        "plugin": [
        "test__m_campioni"
        ]
      },
      {
        "name": "test__bibliografia",
        "label": "Bibliografia",
        "order": "breve",
        "id_field": "breve",
        "preview": [
        "breve",
        "autori",
        "anno"
        ]
      },
      {
        "name": "test__files",
        "label": "Allegati",
        "order": "id",
        "id_field": "id",
        "preview": [
        "id",
        "filename",
        "ext",
        "description"
        ]
      },
      {
        "name": "test__m_biblio",
        "label": "Bibliografia",
        "is_plugin": "1"
      },
      {
        "name": "test__m_campioni",
        "label": "Campioni",
        "is_plugin": "1"
      }
      ]
    },
    bibliografia: [
        {
            "name": "id",
            "label": "ID",
            "type": "text",
            "readonly": true,
            "disabled": true
        },
        {
            "name": "breve",
            "label": "Breve",
            "type": "text"
        },
        {
            "name": "autori",
            "label": "Autori",
            "type": "text"
        },
        {
            "name": "anno",
            "label": "Anno",
            "type": "text"
        },
        {
            "name": "descrizione",
            "label": "Descrizione",
            "type": "long_text"
        }
    ],
    m_biblio: [
        {
            "name": "id",
            "label": "ID",
            "type": "text",
            "readonly": true,
            "disabled": true
        },
        {
            "name": "breve",
            "label": "Breve",
            "type": "select",
            "id_from_tb": "test__bibliografia"
        },
        {
            "name": "pp",
            "label": "pp",
            "type": "text"
        }
    ],
    m_campioni: [
        {
            "name": "id",
            "label": "ID",
            "type": "text",
            "readonly": true,
            "disabled": true
        },
        {
            "name": "dataprelievo",
            "label": "Data di prelievo",
            "type": "text"
        },
        {
            "name": "tipoanalisi",
            "label": "Tipo di analisi",
            "type": "text"
        },
        {
            "name": "note",
            "label": "Note",
            "type": "long_text"
        }
    ],
    siti: [
        {
            "name": "id",
            "label": "ID",
            "type": "text",
            "readonly": true,
            "disabled": true
        },
        {
            "name": "nome",
            "label": "Nome sito",
            "type": "text",
            "check": [
              "no_dupl"
            ]
        },
        {
            "name": "tipologia",
            "label": "Tipologia",
            "type": "select",
            "vocabulary_set": "tipo_siti"
        },
        {
            "name": "cronologia",
            "label": "Cronologia",
            "type": "multi_select",
            "vocabulary_set": "crono_siti"
        },
        {
            "name": "descrizione",
            "label": "Descrizione",
            "type": "long_text"
        }
    ],
    us: [
        {
            "name": "id",
            "label": "ID",
            "type": "text",
            "readonly": true,
            "disabled": true
        },
        {
            "name": "sito",
            "label": "Sito",
            "type": "select",
            "get_values_from_table": "test__siti:nome"
        },
        {
            "name": "nome",
            "label": "Nome US",
            "type": "text",
            "check": [
              "no_dupl"
            ]
        },
        {
            "name": "tipo",
            "label": "Tipologia",
            "type": "select",
            "vocabulary_set": "tipo_us"
        },
        {
            "name": "descrizione",
            "label": "Descrizione",
            "type": "long_text"
        }
    ]
  };