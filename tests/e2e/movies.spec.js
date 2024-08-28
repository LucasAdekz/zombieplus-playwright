const { test } = require('../support');

const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/fixtures/database')


test('deve poder cadastrar um novo filme', async ({page}) => {

    const movie = data.create
    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()

    await page.movies.createMovies(movie.title, movie.overview, movie.company, movie.release_year)
    
    const message = 'Cadastro realizado com sucesso!'
    await page.toast.containText(message) 
})