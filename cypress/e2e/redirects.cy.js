describe('Follows redirects from previous blog format', () => {
  it('Managing the Same AWS Key Pair in Multiple Terraform Workspaces', () => {
    cy.visit('/2020/06/01/managing-the-same-aws-key-pair-in-multiple-terraform-workspaces.html')
    cy.url().should('match', /2020-06-01-managing-the-same-aws-key-pair-in-multiple-terraform-workspaces$/)
    cy.get('h1').contains('Managing the Same AWS Key Pair in Multiple Terraform Workspaces')
  })

  it('Edward Tufte: Presenting Data and Information', () => {
    cy.visit('2020/01/17/tufte.html')
    cy.url().should('match', /2020-01-17-tufte$/)
    cy.get('h1').contains('Edward Tufte: Presenting Data and Information')
  })

  it('Migrating My Website to AWS Using Terraform', () => {
    cy.visit('2020/01/06/migrating-my-website-to-aws-using-terraform.html')
    cy.url().should('match', /2020-01-06-migrating-my-website-to-aws-using-terraform$/)
    cy.get('h1').contains('Migrating My Website to AWS Using Terraform')
  })

  it('The Twelve Days of an a cappella Christmas Album', () => {
    cy.visit('2015/12/27/the-twelve-days-of-an-a-cappella-christmas-album.html')
    cy.url().should('match', /2015-12-27-the-twelve-days-of-an-a-cappella-christmas-album$/)
    cy.get('h1').contains('The Twelve Days of an A Cappella Christmas Album')
  })
})
