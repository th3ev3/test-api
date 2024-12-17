// URL da API no Vercel
const apiUrl = 'https://my-api.vercel.app/api';

// Carregar os contadores ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  fetch(`${apiUrl}/joinhas`)
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        const informativo = document.querySelector(`.informativo[data-id="${item.id}"]`);
        if (informativo) {
          const countSpan = informativo.querySelector('.count');
          countSpan.textContent = item.count;
        }
      });
    })
    .catch(err => console.error('Erro ao carregar os joinhas:', err));
});

// Adicionar evento de clique nos botões
document.querySelectorAll('.joinha-btn').forEach(button => {
  button.addEventListener('click', () => {
    const informativo = button.closest('.informativo');
    const id = informativo.getAttribute('data-id');

    // Enviar joinha para a API
    fetch(`${apiUrl}/joinhas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
      .then(response => response.json())
      .then(() => {
        // Atualizar o contador localmente
        const countSpan = informativo.querySelector('.count');
        countSpan.textContent = parseInt(countSpan.textContent) + 1;
      })
      .catch(err => console.error('Erro ao dar joinha:', err));
  });
});
