export const uberNinjaData: any = {
  "gameId": "uberninja",
  "gameIcon": "🥷",
  "initialDecks": [
    {
      "deckId": "order",
      "name": "商品カード",
      "cards": [
        {
          "id": "ninja-potato-bag",
          "name": "ninja-potato-bag",
          "location": "deck",
          "drawCondition": [
            "hand",
            "face"
          ],
          "playLocation": "field",
          "fieldBackConditon": "discard",
          "frontImage": "/images/uberninja/ninja-potato-bag.png"
        },
        {
          "id": "ninja-chicken-box",
          "name": "ninja-chicken-box",
          "location": "deck",
          "drawCondition": [
            "hand",
            "face"
          ],
          "playLocation": "field",
          "fieldBackConditon": "discard",
          "frontImage": "/images/uberninja/ninja-chicken-box.png"
        }
      ],
      "backColor": "rgb(11, 108, 26)"
    },
    {
      "deckId": "address",
      "name": "配達先カード",
      "cards": [
        {
          "id": "card-B-01",
          "name": "東1",
          "location": "deck",
          "drawCondition": [
            "hand",
            "face"
          ],
          "playLocation": "field",
          "fieldBackConditon": "discard"
        },
        {
          "id": "card-B-02",
          "name": "東2",
          "location": "deck",
          "drawCondition": [
            "hand",
            "face"
          ],
          "playLocation": "field",
          "fieldBackConditon": "discard"
        },
        {
          "id": "card-C-01",
          "name": "南1",
          "location": "deck",
          "drawCondition": [
            "hand",
            "face"
          ],
          "playLocation": "field",
          "fieldBackConditon": "discard"
        },
        {
          "id": "card-A-03",
          "name": "南2",
          "location": "deck",
          "drawCondition": [
            "hand",
            "face"
          ],
          "playLocation": "field",
          "fieldBackConditon": "discard"
        },
        {
          "id": "card-A-04",
          "name": "西1",
          "location": "deck",
          "drawCondition": [
            "hand",
            "face"
          ],
          "playLocation": "field",
          "fieldBackConditon": "discard"
        },
        {
          "id": "card-B-03",
          "name": "西2",
          "location": "deck",
          "drawCondition": [
            "hand",
            "face"
          ],
          "playLocation": "field",
          "fieldBackConditon": "discard"
        }
      ],
      "backColor": "rgb(212, 175, 55)"
    }
  ],
  "initialBoard": {
    "deliver": [
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r0c0",
        "adjacentCellIds": [
          "r1c0",
          "r0c1"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r0c1",
        "adjacentCellIds": [
          "r1c1",
          "r0c0",
          "r0c2"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r0c2",
        "adjacentCellIds": [
          "r1c2",
          "r0c1",
          "r0c3"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r0c3",
        "adjacentCellIds": [
          "r1c3",
          "r0c2",
          "r0c4"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r0c4",
        "adjacentCellIds": [
          "r1c4",
          "r0c3",
          "r0c5"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r0c5",
        "adjacentCellIds": [
          "r1c5",
          "r0c4",
          "r0c6"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r0c6",
        "adjacentCellIds": [
          "r1c6",
          "r0c5",
          "r0c7"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r0c7",
        "adjacentCellIds": [
          "r1c7",
          "r0c6"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r1c0",
        "adjacentCellIds": [
          "r0c0",
          "r2c0",
          "r1c1"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r1c1",
        "adjacentCellIds": [
          "r0c1",
          "r2c1",
          "r1c0",
          "r1c2"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r1c2",
        "adjacentCellIds": [
          "r0c2",
          "r2c2",
          "r1c1",
          "r1c3"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r1c3",
        "adjacentCellIds": [
          "r0c3",
          "r2c3",
          "r1c2",
          "r1c4"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r1c4",
        "adjacentCellIds": [
          "r0c4",
          "r2c4",
          "r1c3",
          "r1c5"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r1c5",
        "adjacentCellIds": [
          "r0c5",
          "r2c5",
          "r1c4",
          "r1c6"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r1c6",
        "adjacentCellIds": [
          "r0c6",
          "r2c6",
          "r1c5",
          "r1c7"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r1c7",
        "adjacentCellIds": [
          "r0c7",
          "r2c7",
          "r1c6"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r2c0",
        "adjacentCellIds": [
          "r1c0",
          "r3c0",
          "r2c1"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r2c1",
        "adjacentCellIds": [
          "r1c1",
          "r3c1",
          "r2c0",
          "r2c2"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r2c2",
        "adjacentCellIds": [
          "r1c2",
          "r3c2",
          "r2c1",
          "r2c3"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r2c3",
        "adjacentCellIds": [
          "r1c3",
          "r3c3",
          "r2c2",
          "r2c4"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r2c4",
        "adjacentCellIds": [
          "r1c4",
          "r3c4",
          "r2c3",
          "r2c5"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r2c5",
        "adjacentCellIds": [
          "r1c5",
          "r3c5",
          "r2c4",
          "r2c6"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r2c6",
        "adjacentCellIds": [
          "r1c6",
          "r3c6",
          "r2c5",
          "r2c7"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r2c7",
        "adjacentCellIds": [
          "r1c7",
          "r3c7",
          "r2c6"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r3c0",
        "adjacentCellIds": [
          "r2c0",
          "r4c0",
          "r3c1"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r3c1",
        "adjacentCellIds": [
          "r2c1",
          "r4c1",
          "r3c0",
          "r3c2"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r3c2",
        "adjacentCellIds": [
          "r2c2",
          "r4c2",
          "r3c1",
          "r3c3"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r3c3",
        "adjacentCellIds": [
          "r2c3",
          "r4c3",
          "r3c2",
          "r3c4"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r3c4",
        "adjacentCellIds": [
          "r2c4",
          "r4c4",
          "r3c3",
          "r3c5"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r3c5",
        "adjacentCellIds": [
          "r2c5",
          "r4c5",
          "r3c4",
          "r3c6"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r3c6",
        "adjacentCellIds": [
          "r2c6",
          "r4c6",
          "r3c5",
          "r3c7"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r3c7",
        "adjacentCellIds": [
          "r2c7",
          "r4c7",
          "r3c6"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r4c0",
        "adjacentCellIds": [
          "r3c0",
          "r5c0",
          "r4c1"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r4c1",
        "adjacentCellIds": [
          "r3c1",
          "r5c1",
          "r4c0",
          "r4c2"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r4c2",
        "adjacentCellIds": [
          "r3c2",
          "r5c2",
          "r4c1",
          "r4c3"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r4c3",
        "adjacentCellIds": [
          "r3c3",
          "r5c3",
          "r4c2",
          "r4c4"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r4c4",
        "adjacentCellIds": [
          "r3c4",
          "r5c4",
          "r4c3",
          "r4c5"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r4c5",
        "adjacentCellIds": [
          "r3c5",
          "r5c5",
          "r4c4",
          "r4c6"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r4c6",
        "adjacentCellIds": [
          "r3c6",
          "r5c6",
          "r4c5",
          "r4c7"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r4c7",
        "adjacentCellIds": [
          "r3c7",
          "r5c7",
          "r4c6"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r5c0",
        "adjacentCellIds": [
          "r4c0",
          "r6c0",
          "r5c1"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r5c1",
        "adjacentCellIds": [
          "r4c1",
          "r6c1",
          "r5c0",
          "r5c2"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r5c2",
        "adjacentCellIds": [
          "r4c2",
          "r6c2",
          "r5c1",
          "r5c3"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r5c3",
        "adjacentCellIds": [
          "r4c3",
          "r6c3",
          "r5c2",
          "r5c4"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r5c4",
        "adjacentCellIds": [
          "r4c4",
          "r6c4",
          "r5c3",
          "r5c5"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r5c5",
        "adjacentCellIds": [
          "r4c5",
          "r6c5",
          "r5c4",
          "r5c6"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r5c6",
        "adjacentCellIds": [
          "r4c6",
          "r6c6",
          "r5c5",
          "r5c7"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r5c7",
        "adjacentCellIds": [
          "r4c7",
          "r6c7",
          "r5c6"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r6c0",
        "adjacentCellIds": [
          "r5c0",
          "r7c0",
          "r6c1"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r6c1",
        "adjacentCellIds": [
          "r5c1",
          "r7c1",
          "r6c0",
          "r6c2"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r6c2",
        "adjacentCellIds": [
          "r5c2",
          "r7c2",
          "r6c1",
          "r6c3"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r6c3",
        "adjacentCellIds": [
          "r5c3",
          "r7c3",
          "r6c2",
          "r6c4"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r6c4",
        "adjacentCellIds": [
          "r5c4",
          "r7c4",
          "r6c3",
          "r6c5"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r6c5",
        "adjacentCellIds": [
          "r5c5",
          "r7c5",
          "r6c4",
          "r6c6"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r6c6",
        "adjacentCellIds": [
          "r5c6",
          "r7c6",
          "r6c5",
          "r6c7"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r6c7",
        "adjacentCellIds": [
          "r5c7",
          "r7c7",
          "r6c6"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r7c0",
        "adjacentCellIds": [
          "r6c0",
          "r7c1"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r7c1",
        "adjacentCellIds": [
          "r6c1",
          "r7c0",
          "r7c2"
        ]
      },
      {
        "templateId": "HOUSE",
        "name": "HOUSE",
        "shapeType": "square",
        "backgroundColor": "#87A96B",
        "content": "南1",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r7c2",
        "adjacentCellIds": [
          "r6c2",
          "r7c1",
          "r7c3"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r7c3",
        "adjacentCellIds": [
          "r6c3",
          "r7c2",
          "r7c4"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r7c4",
        "adjacentCellIds": [
          "r6c4",
          "r7c3",
          "r7c5"
        ]
      },
      {
        "templateId": "HOUSE",
        "name": "HOUSE",
        "shapeType": "square",
        "backgroundColor": "#87A96B",
        "content": "南2",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r7c5",
        "adjacentCellIds": [
          "r6c5",
          "r7c4",
          "r7c6"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r7c6",
        "adjacentCellIds": [
          "r6c6",
          "r7c5",
          "r7c7"
        ]
      },
      {
        "templateId": "SIMPLE",
        "name": "SIMPLE",
        "shapeType": "square",
        "backgroundColor": "#666666",
        "content": "",
        "changedContent": "",
        "changedColor": "#4b0082",
        "id": "r7c7",
        "adjacentCellIds": [
          "r6c7",
          "r7c6",
        ]
      },

    ]
  },
  "initialTokenStores": [
    {
      "tokenStoreId": "makibishi",
      "name": "撒菱",
      "tokens": [
        {
          "id": "撒菱-s1",
          "name": "撒菱",
          "ownerId": null,
          "position": null,
          "movableCells": [],
          "image": "/images/uberninja/makibishi.svg",
          "color": "#d43737"
        },
        {
          "id": "撒菱-s2",
          "name": "撒菱",
          "ownerId": null,
          "position": null,
          "movableCells": [],
          "image": "/images/uberninja/makibishi.svg",
          "color": "#d43737"
        },
        {
          "id": "撒菱-s3",
          "name": "撒菱",
          "ownerId": null,
          "position": null,
          "movableCells": [],
          "image": "/images/uberninja/makibishi.svg",
          "color": "#d43737"
        },
        {
          "id": "撒菱-s4",
          "name": "撒菱",
          "ownerId": null,
          "position": null,
          "movableCells": [],
          "image": "/images/uberninja/makibishi.svg",
          "color": "#d43737"
        },
        {
          "id": "撒菱-s5",
          "name": "撒菱",
          "ownerId": null,
          "position": null,
          "movableCells": [],
          "image": "/images/uberninja/makibishi.svg",
          "color": "#d43737"
        },
        {
          "id": "撒菱-s6",
          "name": "撒菱",
          "ownerId": null,
          "position": null,
          "movableCells": [],
          "image": "/images/uberninja/makibishi.svg",
          "color": "#d43737"
        },
        {
          "id": "撒菱-s7",
          "name": "撒菱",
          "ownerId": null,
          "position": null,
          "movableCells": [],
          "image": "/images/uberninja/makibishi.svg",
          "color": "#d43737"
        },
        {
          "id": "撒菱-s8",
          "name": "撒菱",
          "ownerId": null,
          "position": null,
          "movableCells": [],
          "image": "/images/uberninja/makibishi.svg",
          "color": "#d43737"
        },
        {
          "id": "撒菱-s9",
          "name": "撒菱",
          "ownerId": null,
          "position": null,
          "movableCells": [],
          "image": "/images/uberninja/makibishi.svg",
          "color": "#d43737"
        },
        {
          "id": "撒菱-s10",
          "name": "撒菱",
          "ownerId": null,
          "position": null,
          "movableCells": [],
          "image": "/images/uberninja/makibishi.svg",
          "color": "#d43737"
        }
      ]
    }
  ],
  "initialTokens": {
    "makibishi": 4
  },
  "initialTokensOnBoard": {
    "ninja": [
      {
        "id": "ninja",
        "tokenStoreId": "ninja",
        "name": "ninja",
        "ownerId": "player",
        "color": "#ff4444",
        "position": {
          "row": 0,
          "col": 3
        },
        "movableCells": [],
        "image": "/images/uberninja/ninja.svg"
      }
    ],
    "scooter": [
      {
        "id": "scooter",
        "tokenStoreId": "scooter",
        "name": "scooter",
        "ownerId": "player",
        "color": "#ff4444",
        "position": {
          "row": 0,
          "col": 4
        },
        "movableCells": [],
        "image": "/images/uberninja/scooter.svg"
      }
    ],
    "ninja-potato": [
      {
        "id": "ninja-potato",
        "tokenStoreId": "ninja-potato",
        "name": "ninja-potato",
        "ownerId": null,
        "color": "white",
        "position": {
          "row": 4,
          "col": 0
        },
        "movableCells": [],
        "image": "/images/uberninja/ninja-potato.png"
      }
    ],
    "ninja-chicken": [
      {
        "id": "ninja-chicken",
        "tokenStoreId": "ninja-chicken",
        "name": "ninja-chicken",
        "ownerId": null,
        "color": "white",
        "position": {
          "row": 3,
          "col": 7
        },
        "movableCells": [],
        "image": "/images/uberninja/ninja-chicken.png"
      }
    ]
  },
  "dice": {
    "environment": {
      "id": "environment",
      "sides": 4,
      "currentValue": 1
    },
    "action-move": {
      "id": "action-move",
      "sides": 3,
      "currentValue": 1
    }
  },
  "components": []
};