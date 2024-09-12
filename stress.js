const url = 'http://localhost:3001/tasks/23';
const payload = { status: 'Cancelado' };

async function stressTest() {
  const requests = [];

  for (let i = 0; i < 5000; i++) {
    requests.push(
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na requisição ${i}: ${response.statusText}`);
        }
    })
    .catch(error => console.error(error.message))
  );
}

try {
  await Promise.all(requests);
  console.log('Todas as requisições foram enviadas');
} catch (error) {
  console.error('Erro durante o teste de stress:', error);
}
}

stressTest();