// src/server/uberNinjaConfig.ts

import type { GameParam } from "react-game-ui";
import { SetupHelper, type RoomConfig } from "react-game-ui/server-io-utils";

export const CELL_COUNTS = {
  SIMPLE: 63,
  HOUSE: 1,
};

export const uberNinjaConfig: RoomConfig = {
  gameId: "uberninja",
  dataFiles: {
    orderCards: "../public/data/uberninja/uberNinjaOrderCards.json",
    addressCards: "../public/data/uberninja/uberNinjaAddressCards.json",
    deliverBoard: "../public/data/uberninja/uberNinjaCells.json",
    tokensOnBoard: "../public/data/uberninja/uberNinjaTokensOnBoard.json"
  },
  setup: async (loadedData: Record<string, any>): Promise<GameParam> => {
    const helper = new SetupHelper();
    const uberNinjaOrderCards = helper.assertCards(loadedData.orderCards);
    const uberNinjaAddressCards = helper.assertCards(loadedData.addressCards)

    const deliverBoard = helper.createGridBoardLayout(
      loadedData.deliverBoard,
      CELL_COUNTS,
      8,
      8,
    );

    const tokensOnBoard = loadedData.tokensOnBoard

    return {
      gameId: "uberninja",
      gameIcon: "🥷",
      initialDecks: [
        {
          deckId: "order",
          name: "商品カード",
          cards: uberNinjaOrderCards,
          backColor: "rgb(11, 108, 26)",
        },
        {
          deckId: "address",
          name: "配達先カード",
          cards: uberNinjaAddressCards,
          backColor: "rgb(212, 175, 55)",
        },
      ],
      initialBoard: { deliver: deliverBoard },
      initialTokenStores: [
        {
          tokenStoreId: "makibishi",
          name: "撒菱",
          tokens: helper.createTokenStore(
            [
              {
                id: "撒菱",
                name: "撒菱",
                ownerId: null,
                position: null,
                movableCells: [],
              },
            ],
            10,
            "/images/uberninja/makibishi.svg",
            "#d43737",
          ),
        },
      ],
      initialTokens: { makibishi: 5 },
      initialTokensOnBoard: tokensOnBoard,
      dice: {
        "environment": { id: "environment", sides: 4, currentValue: 1 }, "action-move": { id: "action-move", sides: 3, currentValue: 1 },
      },
      components: [],
    };
  },
};
