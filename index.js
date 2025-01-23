// Factory para criar objetos de cadastro
function CadastroFactory(nome, dataNascimento, telefone, email) {
    return {
        id: Date.now(),
        nome,
        dataNascimento,
        telefone,
        email
    };
}

// Função para salvar dados no localStorage
function salvarDados(dados) {
    localStorage.setItem('cadastros', JSON.stringify(dados));
}

// Função para carregar dados do localStorage
function carregarDados() {
    const dados = localStorage.getItem('cadastros');
    return dados ? JSON.parse(dados) : [];
}

// Função para exibir cadastros (usada na página `usuarios.html`)
function exibirCadastros() {
    const cadastros = carregarDados();
    const cadastrosDiv = document.getElementById('cadastros');

    if (!cadastrosDiv) {
        return; // Não executa caso não esteja na página correta
    }

    cadastrosDiv.innerHTML = ''; 

    cadastros.forEach(cadastro => {
        const div = document.createElement('div');
        div.className = 'cadastro-item';
        div.innerHTML = `
            <p><strong>Nome:</strong> ${cadastro.nome}</p>
            <p><strong>Data de Nascimento:</strong> ${cadastro.dataNascimento}</p>
            <p><strong>Telefone:</strong> ${cadastro.telefone}</p>
            <p><strong>Email:</strong> ${cadastro.email}</p>
            <button onclick="excluirCadastro(${cadastro.id})">Excluir</button>
        `;
        cadastrosDiv.appendChild(div);
    });
}

// Função para criar um novo cadastro (usada na página do formulário)
function criarCadastro() {
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    if (!nome || !dataNascimento || !telefone || !email) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const novoCadastro = CadastroFactory(nome, dataNascimento, telefone, email);
    const cadastros = carregarDados();
    cadastros.push(novoCadastro);
    salvarDados(cadastros);

    // Limpar os campos
    document.getElementById('nome').value = '';
    document.getElementById('dataNascimento').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('email').value = '';

    // Redirecionar para a página de usuários
    window.location.href = 'usuarios.html';
}

// Função para excluir um cadastro (usada na página `usuarios.html`)
function excluirCadastro(id) {
    let cadastros = carregarDados();
    cadastros = cadastros.filter(cadastro => cadastro.id !== id);
    salvarDados(cadastros);
    exibirCadastros();
}



// Exibe os cadastros automaticamente quando a página `usuarios.html` é carregada
document.addEventListener('DOMContentLoaded', exibirCadastros);

