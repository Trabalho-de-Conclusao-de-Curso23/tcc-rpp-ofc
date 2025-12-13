/* ========================= OLHINHO DA SENHA ========================= */
function toggleSenha(id, icon) {
  const campo = document.getElementById(id);

  if (campo.type === "password") {
    campo.type = "text";
    icon.textContent = "🙈";
  } else {
    campo.type = "password";
    icon.textContent = "👁";
  }
}

/* ========================= CADASTRO ========================= */
function realizarCadastro(e) {
  e.preventDefault();

  const usuario = cadUsuario.value;
  const email = cadEmail.value;
  const senha = cadSenha.value;

  if (!usuario || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  // Verifica duplicidade
  if (
    localStorage.getItem(`user_${usuario}`) ||
    localStorage.getItem(`email_${email}`)
  ) {
    alert("Usuário ou e-mail já cadastrado!");
    return;
  }

  // Salva dados
  localStorage.setItem(`user_${usuario}`, senha);
  localStorage.setItem(`email_${email}`, usuario);

  // Login automático
  localStorage.setItem("logado", usuario);
  window.location.href = "home.html";
}

/* ========================= LOGIN ========================= */
function realizarLogin(e) {
  e.preventDefault();

  const identificador = loginIdentificador.value;
  const senha = loginSenha.value;

  let usuario;

  if (!identificador || !senha) {
    alert("Preencha ambos os campos de identificação e senha!");
    return;
  }

  // Detecta se é e-mail
  if (identificador.includes("@")) {
    usuario = localStorage.getItem(`email_${identificador}`);
  } else {
    usuario = identificador;
  }

  const senhaSalva = localStorage.getItem(`user_${usuario}`);

  if (senhaSalva && senhaSalva === senha) {
    localStorage.setItem("logado", usuario);
    window.location.href = "home.html";
  } else {
    alert("Usuário/e-mail ou senha incorretos!");
  }
}

/* ========================= PROTEÇÃO DA HOME ========================= */
if (window.location.pathname.includes("home.html")) {
  if (!localStorage.getItem("logado")) {
    window.location.href = "index.html";
  }
}

/* ========================= LOGOUT ========================= */
function logout() {
  localStorage.removeItem("logado");
  window.location.href = "index.html";
}

function responderQuestao(botao, correta) {
  const questao = botao.closest(".questao");
  const msg = questao.querySelector(".quiz-msg");
  const alternativas = questao.querySelectorAll(".alternativas button");

  alternativas.forEach(btn => {
  btn.disabled = true;
});

  // Marca resposta
  if (correta) {
    botao.style.background = "green";
    msg.textContent = "Resposta correta!";
    msg.style.color = "green";
  } else {
    botao.style.background = "red";
    msg.textContent = "Resposta errada!";
    msg.style.color = "red";
  }
}


function mostrarResolucao(botao) {
  const questao = botao.closest(".questao");
  const resolucao = questao.querySelector(".resolucao");

  if (!resolucao) {
    console.error("Resolução não encontrada nesta questão");
    return;
  }

  if (resolucao.style.display === "block") {
    resolucao.style.display = "none";
    botao.textContent = "Ver resolução";
  } else {
    resolucao.style.display = "block";
    botao.textContent = "Ocultar resolução";
  }
}

function toggleMenu() {
  const menu = document.getElementById("menu");

  if (!menu) {
    console.error("Menu não encontrado");
    return;
  }

  if (menu.classList.contains("ativo")) {
    menu.classList.remove("ativo");
  } else {
    menu.classList.add("ativo");
  }
}
