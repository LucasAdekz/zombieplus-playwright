
const { test, expect } = require('../support');
const { faker } = require('@faker-js/faker');

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  //visit  
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)
  // await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  //await page.locator('#name').fill('Lucas campos')
  //await page.locator('ELEMENTO[PLACEHOLDER="SEU NOME COMPLETO"]').fill('Lucas campos')

  


  // await page.getByText('seus dados conosco').click() //serve pra pegar o elemento flutiante
  // const content = await page.content() // pega o html da pagina
  // console.log(content) //exibe o html que esta na variavel content
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

  await page.toast.containText(message) 
  
});

test('não deve cadastrar quando o email ja existe', async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  //visit  
  const newLead = await request.post('http://localhost:3333/leads', {
    data:{
      name:leadName,
      email:leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)
  // await page.click('//button[text()="Aperte o play... se tiver coragem"]')

  //await page.locator('#name').fill('Lucas campos')
  //await page.locator('ELEMENTO[PLACEHOLDER="SEU NOME COMPLETO"]').fill('Lucas campos')

  


  // await page.getByText('seus dados conosco').click() //serve pra pegar o elemento flutiante
  // const content = await page.content() // pega o html da pagina
  // console.log(content) //exibe o html que esta na variavel content
  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'

  await page.toast.containText(message) 
  
});

test('Não deve cadastrar com e-mail incorreto', async ({ page }) => {

  //visit  
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('lucas teste', 'lucas.com.br')

  await page.landing.alertHaveText('Email incorreto')
});

test('Nome deve ser obrigatório', async ({ page }) => {
  //visit  
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', 'lucas@teste.com')

  await page.landing.alertHaveText('Campo obrigatório')
});

test('Email deve ser obrigatório', async ({ page }) => {

  //visit  
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('lucas teste', '')

  await page.landing.alertHaveText('Campo obrigatório')
});

test('não cadastrar quando email e nome não for preenchido', async ({ page }) => {

  //visit  
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', '')

  await page.landing.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
});