const { expect } = require('@playwright/test');
export class LandingPage {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000')
    }

    async openLeadModal() {
        await this.page.getByRole('button', {name: /Aperte o play/}).click(); 
  
        await expect(
        this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera')
    }

    async submitLeadForm(name, email) {
        await this.page.getByPlaceholder('Informe seu nome').fill(name)

        // await page.locator('#email').fill('lucas@teste.com') 
        await this.page.locator('#email').fill(email)

        //await page.getByRole('button', {name: /Quero entrar na fila!/}).click();
        await this.page.getByTestId('modal')
        .getByText('Quero entrar na fila!').click();
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}