const express = require("express");
const { Hash } = require("../models/hash");
const { logger } = require("../utils/logger");
const { upload } = require("../utils/upload");
const router = express.Router();
const ipfsHash = require("ipfs-only-hash");
const { authentication } = require("../middlewares/authentication");
/**
 * @openapi
 * /pinIpfs:
 *  post:
 *     tags:
 *     - Hash
 *     security:
 *       - ApiKeyAuth: []
 *     description: post json file to ipfs
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Get list success
 *       400:
 *         description: Invalid token
 */
router.post(
  "/pinIpfs",
  [authentication, upload.single("file")],
  async (req, res, next) => {
    try {
      const hash = await ipfsHash.of(req.file.path);
      const data = await Hash.create({ content: req.file.path, hash });
      return res.status(200).json(data);
    } catch (error) {
      logger.error(error?.message);
      return res.status(400).json(error);
    }
  }
);

/**
 * @openapi
 * /pinJsonIpfs:
 *  post:
 *     tags:
 *     - Hash
 *     security:
 *       - ApiKeyAuth: []
 *     description: post json file to ipfs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data: 
 *                 type: object
 *     responses:
 *       200:
 *         description: Get list success
 *       400:
 *         description: Invalid token
 */
router.post(
  "/pinJsonIpfs",
  [authentication],
  async (req, res, next) => {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ message: "data is required" });
    }
    try {
      const hash = await ipfsHash.of(JSON.stringify(data));
      const result = await Hash.create({ content: data, hash, type: "json" });
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error?.message);
      return res.status(400).json(error);
    }
  }
);

/**
 * @openapi
 * /{hash}:
 *  get:
 *     tags:
 *     - Hash
 *     description: get file by hash
 *     parameters:
 *     - in: path
 *       name: hash
 *     responses:
 *       200:
 *         description: Get list success
 *       400:
 *         description: Invalid token
 */
router.get("/:hash", async (req, res, next) => {
  const { hash } = req.params;
  try {
    const data = await Hash.findOne({ hash }).select({ _id: 0, __v: 0 });
    if (!data) {
      return res.status(404).send({ message: "not found" });
    }
    if (data.type === "json") {
      return res.status(200).json(data.content);
    }
    return res.status(200).sendfile(data.content);

  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message, error });
  }
});

module.exports = { router };
