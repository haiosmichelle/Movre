const express = require("express");
const { body } = require("express-validator");
const movieController = require("../controllers/Movie");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: movie
 *   description: Operatii cu filme
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Returnează toate filmele
 *     description: Returnează toate filmele disponibile.
 *     tags: [movie]
 *     responses:
 *       '200':
 *         description: Lista cu filme
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       '404':
 *         description: Filmele nu au fost găsite
 */
router.get("/movies", movieController.moviesGET);

/**
 * @swagger
 * /movies/{movieId}:
 *   get:
 *     summary: Returnează un film după ID
 *     description: Returnează detaliile unui film specificat prin ID.
 *     tags: [movie]
 *     parameters:
 *       - name: movieId
 *         in: path
 *         description: ID-ul filmului de returnat
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Detalii despre film
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       '404':
 *         description: Filmul nu a fost găsit
 */
router.get("/movies/:movieId", movieController.moviesIdGET);

module.exports = router;
