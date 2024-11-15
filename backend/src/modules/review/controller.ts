import { Request, Response, NextFunction } from "express";
import {
  AddReviewControllerSchema,
  TReviewCtx,
  UpdateReviewControllerSchema,
} from "./validation";
import {
  createReviewService,
  deleteReviewService,
  getReviewsByBookIdService,
  updateReviewService,
} from "./service";
import { APIError } from "../../utils/error";
import { any } from "zod";

export async function addReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("Incoming Request Body:", req.body);
    console.log("Incoming Request Params:", req.params);

    const body = req.body;
    const bookId = req.params.bookId;
    const userId = req.user.id;

    const { success, error, data } = AddReviewControllerSchema.safeParse(body);
    if (!success) {
      console.error("Validation Errors:", error.flatten().fieldErrors);
      return res.status(400).json({
        message: "Invalid request",
        data: null,
        isSuccess: false,
        errors: error.flatten().fieldErrors,
      });
    }

    const review = await createReviewService(
      {
        userId,
        bookId,
      },
      data
    );

    res.status(201).json({
      message: "Review created successfully",
      isSuccess: true,
      data: review,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function updateReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const userId = req.user.id;
    const reviewId = req.params.reviewId;
    const role = req.body.user.role;

    const { success, error, data } =
      UpdateReviewControllerSchema.safeParse(body);
    if (!success) {
      const errors = error.flatten().fieldErrors;
      res.status(400).json({
        message: "Invalid request",
        data: null,
        isSuccess: false,
        errors: errors,
      });
      return;
    }

    const review = await updateReviewService(
      reviewId,
      {
        userId,
        bookId: "",
        role,
      },
      data
    );

    res.status(201).json({
      message: "Review updated sucessfully",
      isSuccess: true,
      data: review,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function getReviewsByBookIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bookId = req.params.bookId;

    const reviews = await getReviewsByBookIdService(bookId);
    res.status(200).json({
      message: "Reviews retrieved successfully",
      isSuccess: true,
      data: reviews,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function deleteReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviewId = req.params.reviewId;

    const role = req.user.role;

    const userId = req.user.id;

    const deletedReview = await deleteReviewService(reviewId, {
      userId,
      bookId: "",
      role,
    });

    res.status(200).json({
      message: "Review deleted successfully",
      review: deletedReview,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}
