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
/**
 * @swagger
 * /movies/{movieId}/raiting:
 *   post:
 *     summary: raiting la film
 *     description: adauga un raiting la film.
 *     tags: [movie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     parameters:
 *       - name: movieId
 *         in: path
 *         description: ID-ul filmului care conține recenzia
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Like-ul a fost adăugat cu succes
 *       '404':
 *         description: Recenzia nu a fost găsită
 */
router.post(
    "/movies/:movieId/rating",
    movieController.moviesIdRatingPost
  );
module.exports = router;
