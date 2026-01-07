import responses from "../helpers/responses.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default function (req, res, next) {
  res.create = function ({ resource, data }) {
    return res.status(201).json({
      error: false,
      message: responses.created(resource),
      data,
    });
  };

  res.success = function (data) {
    return res.status(200).json({
      error: false,
      data,
      message: "Request successful",
    });
  };

  next();
}
