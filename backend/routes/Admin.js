const express = require("express");
const adminController = require("../controllers/Admin");
const upload = require("../middleware/multer");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: admin
 *   description: Operatii cu admini
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Autentificare admin
 *     description: Autentifică un admin existent.
 *     tags: [admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       '200':
 *         description: Autentificare reușită
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       '400':
 *         description: Invalid username/password supplied
 */
router.post("/admin/login", adminController.loginAdmin);
/**
 * @swagger
 * /admin/add-movie:
 *   post:
 *     summary: Adăugare film
 *     description: Adaugă un film nou în baza de date.
 *     tags: [admin]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               runtime:
 *                 type: integer
 *               release_year:
 *                 type: integer
 *               picture:
 *                 type: string
 *                 format: binary
 *               raiting:
 *                 type: number
 *                 format: double
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Film adăugat cu succes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 movie:
 *                   $ref: '#/components/schemas/Movie'
 *       '400':
 *         description: Invalid data supplied
 */
router.post(
  "/admin/add-movie",
  upload.single("picture"),
  adminController.addMovie
);

module.exports = router;
