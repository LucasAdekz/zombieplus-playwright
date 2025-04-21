const { test, expect } = require('../support');

const data = require('../support/fixtures/tvshows.json');
const { executeSQL } = require('../support/fixtures/database');

test.beforeAll(async () => {
  await executeSQL(`DELETE from tvshows`);
});

test('deve poder cadastrar uma nova serie', async ({ page }) => {
  // Verificação para garantir que data.create está definido
  if (!data.create) {
    throw new Error('data.create não está definido. Verifique o arquivo tvshows.json.');
  }

  const tvshows = data.create;

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
  await page.tvshows.create(tvshows);
  const message = `A série '${tvshows.title}' foi adicionada ao catálogo.`;
  await page.popup.haveText(message);
});

test('deve poder remover uma série', async ({ page, request }) => {

  const tvshows = data.to_remove
  await request.api.postTvshows(tvshows)
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  
  await page.tvshows.seriesForm()
  await page.tvshows.remove(tvshows.title)
  const message = `Série removida com sucesso.`
  await page.popup.haveText(message) 
})

test('não deve cadastrar quando o título é duplicado', async ({ page, request }) => {

  const tvshows = data.duplicate

  await request.api.postTvshows(tvshows)

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await page.tvshows.create(tvshows)
  const message = `O título '${tvshows.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`
  await page.popup.haveText(message) 
})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {


  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

  await page.tvshows.seriesForm()
  await page.tvshows.goForm()
  await page.tvshows.submit()

  await page.tvshows.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório (apenas números)'
  ])
})

test('deve realizar busca pelo termo zumbi', async ({ page, request }) => {

  const tvshows = data.search

  tvshows.data.forEach(async (tvshows) => {
    await request.api.postTvshows(tvshows)
  })

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
  await page.tvshows.seriesForm()
  
  await page.tvshows.search(tvshows.input)
  await page.tvshows.tableHave(tvshows.outputs)

})