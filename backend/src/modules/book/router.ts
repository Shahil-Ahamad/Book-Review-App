import { Router } from "express";
import {
  addBookController,
  deleteBookController,
  getAllBookController,
  getBookByIdController,
  updateBookController,
} from "./controller";
import { getReviewsByBookIdController } from "../review/controller";
import { permitAdmin } from "../auth/controller";
import { checkAdmin, checkAuth} from "../auth/middleware";

function createBookRouter() {
  const router = Router();

  router.get("/", getAllBookController);
  router.get("/get/:id", getBookByIdController);

  router.post(
    "/addBook",
    checkAuth,
    checkAdmin,
    addBookController
  );

  router.post("/update/:bookId", checkAuth, permitAdmin, updateBookController);

  router.delete(
    "/delete/:bookId",
    checkAuth,
    permitAdmin,
    deleteBookController
  );

  return router;
}

export const bookRouter = createBookRouter();
