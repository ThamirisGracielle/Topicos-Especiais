const EMAIL_ALUNO = 'aluno@example.test';

describe('Oficinas TechLab', () => {
  beforeEach(() => {
    cy.request({
      method: 'DELETE',
      url: '/api/oficinas/1/inscricoes',
      qs: { email: EMAIL_ALUNO },
      failOnStatusCode: false,
    });

    cy.visit('/');
  });

  it('deve filtrar oficinas pela trilha Qualidade', () => {
    cy.get('#trilha').select('Qualidade');

    cy.get('#oficinas article').should('have.length', 1);
    cy.get('#oficinas').should(
      'contain.text',
      'Testes de interface com Cypress'
    );
  });

  it('deve confirmar e persistir uma inscrição', () => {
    cy.get('[data-cy="oficina-1"]').within(() => {
      cy.get('[data-cy="vagas"]').should(
        'have.text',
        '0 de 2 vagas ocupadas'
      );

      cy.get('input').type(EMAIL_ALUNO);
      cy.contains('button', 'Reservar vaga').click();
    });

    cy.get('[role="status"]').should(
      'have.text',
      'Inscrição confirmada.'
    );

    cy.reload();

    cy.get('[data-cy="oficina-1"] [data-cy="vagas"]').should(
      'have.text',
      '1 de 2 vagas ocupadas'
    );
  });
});
