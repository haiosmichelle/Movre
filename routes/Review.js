const express = require("express");
const { body } = require("express-validator");
const reviewController = require("../controllers/Review");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: review
 *   description: Operații cu recenzii
 */

/**
 * @swagger
 * /movies/{movieId}/reviews:
 *   get:
 *     summary: Returnează recenziile pentru un film
 *     description: Returnează recenziile pentru un film specificat prin ID-ul său.
 *     tags: [review]
 *     parameters:
 *       - name: movieId
 *         in: path
 *         description: ID-ul filmului pentru care se doresc recenziile
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Recenziile pentru film
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       '404':
 *         description: Filmul nu a fost găsit sau nu are recenzii
 */
router.get("/movies/:movieId/reviews", reviewController.moviesIdReviewsGET);

/**
 * @swagger
 * /movies/{movieId}/reviews:
 *   post:
 *     summary: Creează o recenzie pentru un film
 *     description: Creează o recenzie pentru un film specificat prin ID-ul său.
 *     tags: [review]
 *     parameters:
 *       - name: movieId
 *         in: path
 *         description: ID-ul filmului pentru care se dorește adăugarea recenziei
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '201':
 *         description: Recenzia a fost creată cu succes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       '400':
 *         description: Cerere incorectă
 */
router.post("/movies/:movieId/reviews", reviewController.moviesIdReviewsPOST);

/**
 * @swagger
 * /movies/{movieId}/reviews/{reviewId}:
 *   put:
 *     summary: Actualizează o recenzie
 *     description: Actualizează detaliile unei recenzii pentru un film specificat.
 *     tags: [review]
 *     parameters:
 *       - name: movieId
 *         in: path
 *         description: ID-ul filmului care conține recenzia de actualizat
 *         required: true
 *         schema:
 *           type: integer
 *       - name: reviewId
 *         in: path
 *         description: ID-ul recenziei de actualizat
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Recenzia a fost actualizată cu succes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       '404':
 *         description: Recenzia nu a fost găsită
 */
router.put(
  "/movies/:movieId/reviews/:reviewId",
  reviewController.moviesMovie_idReviewsReview_idPUT
);

/**
 * @swagger
 * /movies/{movieId}/reviews/{reviewId}:
 *   delete:
 *     summary: Șterge o recenzie
 *     description: Șterge o recenzie pentru un film specificat.
 *     tags: [review]
 *     parameters:
 *       - name: movieId
 *         in: path
 *         description: ID-ul filmului care conține recenzia de șters
 *         required: true
 *         schema:
 *           type: integer
 *       - name: reviewId
 *         in: path
 *         description: ID-ul recenziei de șters
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Recenzia a fost ștearsă cu succes
 *       '404':
 *         description: Recenzia nu a fost găsită
 */
router.delete(
  "/movies/:movieId/reviews/:reviewId",
  reviewController.moviesMovie_idReviewsReview_idDELETE
);

/**
 * @swagger
 * /movies/{movieId}/reviews/{reviewId}/like:
 *   post:
 *     summary: Like pentru o recenzie
 *     description: Adaugă un like la o recenzie specificată.
 *     tags: [review]
 *     parameters:
 *       - name: movieId
 *         in: path
 *         description: ID-ul filmului care conține recenzia
 *         required: true
 *         schema:
 *           type: integer
 *       - name: reviewId
 *         in: path
 *         description: ID-ul recenziei pentru care se adaugă like
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
  "/movies/:movieId/reviews/:reviewId/like",
  reviewController.moviesMovie_idReviewsReview_idLikePOST
);

module.exports = router;
