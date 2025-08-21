import { HotListService } from "../services/hot-list.service";

export default defineEventHandler(async (event) => {
  try {
    const hotListService = new HotListService();
    const sources = await hotListService.getSources();

    return {
      success: true,
      data: sources,
    };
  } catch (error) {
    console.error("Error fetching sources:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch sources",
    });
  }
});
