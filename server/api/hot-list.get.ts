import { HotListService } from "../services/hot-list.service";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const source = query.source as string | undefined;
    const limit = parseInt(query.limit as string) || 20;

    const hotListService = new HotListService();
    const hotItems = await hotListService.getHotItems(source, limit);

    return {
      success: true,
      data: hotItems,
      count: hotItems.length,
    };
  } catch (error) {
    console.error("Error fetching hot list:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch hot list",
    });
  }
});
