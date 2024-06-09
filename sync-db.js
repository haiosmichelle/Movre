const { sequelizePostgres } = require('./dataBase/database');
const models = require('./models');

// Sincronizează toate modelele
sequelizePostgres.sync({ force: true })
  .then(async () => {
    console.log('Tabelele au fost create cu succes.');

    // Adaugă date inițiale în tabele

    await models.Admin.create({
      email: 'admin@gmail.com',
      password: '1234'
    });

    await models.User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '12345678',
      birth_date: new Date(1990, 1, 1)
    });

    await models.Movie.create({
      name: 'Inception',
      type: 'Sci-Fi',
      runtime: 148,
      release_year: 2010,
      picture: 'Lady-Bird.jpg',
      raiting: 0,
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology.'
    });

    await models.Rating.create({
      movieId: 1,
      userId: 1,
      star: 5
    });

    await models.Review.create({
      movieId: 1,
      userId: 1,
      message: 'Great movie!',
      post_date: new Date(),
      like: 10
    });

    await models.LikeReview.create({
      ReviewId: 1,
      userId: 1
    });

    await models.WatchList.create({
      MovieId: 1,
      userId: 1
    });

    console.log('Datele inițiale au fost adăugate cu succes.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Eroare la crearea tabelelor: ', err);
    process.exit(1);
  });
