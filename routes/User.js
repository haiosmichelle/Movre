const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/User");
const isAuth = require("../middleware/is-auth"); 

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: user
 *   description: Operatii cu useri
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Creare user
 *     description: Crează un cont de utilizator nou.
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid input
 */
router.post("/signup", userController.createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Autentificare utilizator
 *     description: Autentifică un utilizator existent.
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Autentificare reușită
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid username/password supplied
 */
router.post("/users/login", userController.loginUser);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returnează detalii despre utilizator
 *     description: Returnează detalii despre un utilizator specific.
 *     tags: [user]
 *     parameters:
 *       - name: email
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Detalii despre utilizator
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *   put:
 *     summary: Actualizează detalii despre utilizator
 *     description: Actualizează detaliile unui utilizator existent.
 *     tags: [user]
 *     parameters:
 *       - name: email
 *         in: query
 *         required: false
 *         style: form
 *         explode: true
 *         schema:
 *             type: string
 *       - name: password
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Detalii despre utilizator actualizate cu succes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: User not found
 *   delete:
 *     summary: Șterge utilizator
 *     description: Șterge un utilizator existent.
 *     tags: [user]
 *     parameters:
 *        - name: email
 *          in: query
 *          required: false
 *          style: form
 *          explode: true
 *          schema:
 *             type: string
 *     responses:
 *       '204':
 *         description: Utilizator șters cu succes
 *       '404':
 *         description: User not found
 */
router.get("/users", isAuth, userController.getUser);
router.put("/users", isAuth,  userController.updateUser);
router.delete("/users", isAuth,  userController.deleteUser);

module.exports = router;
