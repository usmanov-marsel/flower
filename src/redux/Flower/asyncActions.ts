import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Flower, SearchFlowerParams } from "./types";
import pickBy from "lodash/pickBy";
import identity from "lodash/identity";

export const fetchFlowers = createAsyncThunk<Flower[], SearchFlowerParams>(
  "Flower/fetchFlowersStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    console.log(params, 4444);
    const { data } = await axios.get<Flower[]>(
      `https://63a49359821953d4f2b88053.mockapi.io/items`,
      {
        params: pickBy(
          {
            page: currentPage,
            limit: 4,
            category,
            sortBy,
            order,
            search,
          },
          identity
        ),
      }
    );

    return data;
  }
);
