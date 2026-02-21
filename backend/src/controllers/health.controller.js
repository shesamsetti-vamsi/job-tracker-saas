import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import healthService from "../services/health.service.js";

export const healthCheck = asyncHandler(async (req, res) => {
  const result = await healthService.getHealthStatus();

  return res
    .status(200)
    .json(new ApiResponse(200, null, result.message));
});