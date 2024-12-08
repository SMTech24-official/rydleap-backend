import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.services";
import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.costant";
import ApiError from "../../errors/ApiErrors";

// create User
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUserIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Registered successfully!",
    data: result,
  });
});

//create a user for firebase registration
const createFirebaseUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUserFirebase(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "user registered successfully",
    data: user,
  });
});

// create User
const socialLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.socialLogin(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User loggedIn successfully!",
    data: result,
  });
});

// get all user form db
const getUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await userService.getUsersFromDb(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieve successfully!",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Users retrieved successfully",
    data: result,
  });
});

const getAllRiders = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Riders retrieved successfully",
    data: result,
  });
});

// get all riders form db
const getRiders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await userService.getRidersFromDb(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Riders retrieve successfully!",
    data: result,
  });
});

// get user by id
const getUserById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.userId;
  const result = await userService.getSingleUserFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully!",
    data: result,
  });
});

// get rider by id
const getRiderById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.riderId;
  const result = await userService.getSingleRiderFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rider retrieved successfully!",
    data: result,
  });
});

// update user form db
const updateProfile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req?.user;

    const result = await userService.updateProfile(user, req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Profile updated successfully!",
      data: result,
    });
  }
);

// *! update user role and account status
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await userService.updateUserIntoDb(req.body, id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully!",
    data: result,
  });
});

export const userController = {
  createUser,
  getUsers,
  getAllUsers,
  getRiders,
  getAllRiders,
  updateProfile,
  updateUser,
  socialLogin,
  getUserById,
  getRiderById,
  createFirebaseUser,
};
