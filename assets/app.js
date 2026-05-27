(() => {
  const STORAGE_KEY = "agrorega.webapp.stockonly.dashboardok.v1";
  const SESSION_KEY = "agrorega.session.v1";
  const currency = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const number = new Intl.NumberFormat("pt-PT");

  const pages = [
    { id: "dashboard", label: "Dashboard", icon: "▦", eyebrow: "Visão geral" },
    { id: "clientes", label: "Clientes", icon: "◎", eyebrow: "CRM agrícola" },
    { id: "projetos", label: "Projetos", icon: "◇", eyebrow: "Instalações" },
    { id: "orcamentos", label: "Orçamentos", icon: "€", eyebrow: "Propostas" },
    { id: "stock", label: "Stock", icon: "□", eyebrow: "Armazém" },
    { id: "financas", label: "Finanças", icon: "∑", eyebrow: "Stock e margem" },
    { id: "admin", label: "Admin", icon: "⚙", eyebrow: "Backoffice" }
  ];

  const stageMeta = {
    "Visita técnica": { cls: "info", progress: 20 },
    "Orçamento": { cls: "warning", progress: 45 },
    "Instalação": { cls: "", progress: 78 },
    "Entrega": { cls: "neutral", progress: 100 }
  };

  const quoteStatus = {
    "Rascunho": "neutral",
    "Enviado": "info",
    "Aprovado": "",
    "Rejeitado": "danger"
  };

  const demoData = () => ({
    settings: {
      company: "AgroRega Solutions",
      nif: "PT 516 234 980",
      address: "Santarém, Portugal",
      phone: "+351 910 000 000",
      email: "geral@agrorega.pt"
    },
    users: [
      { id: "u1", name: "Administrador", email: "admin@agrorega.pt", role: "Administrador", status: "Ativo" },
      { id: "u2", name: "Marta Lopes", email: "marta@agrorega.pt", role: "Comercial", status: "Ativo" },
      { id: "u3", name: "João Martins", email: "joao@agrorega.pt", role: "Técnico", status: "Ativo" }
    ],
    clients: [
      { id: "c1", nome: "Quinta da Lezíria", contacto: "António Mira", email: "antonio@leziria.pt", telefone: "+351 912 345 201", localizacao: "Santarém", tipo: "Vinha", area: 38, estado: "Cliente ativo", ultimoContato: "2026-05-18" },
      { id: "c2", nome: "Herdade Vale Seco", contacto: "Sofia Ramalho", email: "sofia@valeseco.pt", telefone: "+351 913 602 004", localizacao: "Beja", tipo: "Olival", area: 120, estado: "Em proposta", ultimoContato: "2026-05-21" },
      { id: "c3", nome: "AgroMonteiro", contacto: "Rui Monteiro", email: "rui@agromonteiro.pt", telefone: "+351 914 876 993", localizacao: "Évora", tipo: "Hortícolas", area: 22, estado: "Cliente ativo", ultimoContato: "2026-05-09" },
      { id: "c4", nome: "Frutos do Oeste", contacto: "Helena Vaz", email: "helena@frutosoeste.pt", telefone: "+351 919 401 110", localizacao: "Caldas da Rainha", tipo: "Pomar", area: 54, estado: "Manutenção", ultimoContato: "2026-04-28" },
      { id: "c5", nome: "Casa Agrícola Ribeiro", contacto: "Miguel Ribeiro", email: "miguel@ribeiroagro.pt", telefone: "+351 918 880 219", localizacao: "Portalegre", tipo: "Cereal", area: 88, estado: "Lead", ultimoContato: "2026-05-23" }
    ],
    projects: [
      { id: "p1", clientId: "c1", nome: "Setorizar rega gota-a-gota na vinha norte", fase: "Instalação", valor: 48500, probabilidade: 90, inicio: "2026-05-02", entrega: "2026-06-10", responsavel: "João Martins", descricao: "Instalação de tubagem PEAD, válvulas elétricas e controlador de 24 estações." },
      { id: "p2", clientId: "c2", nome: "Projeto de bombagem e filtragem para olival", fase: "Orçamento", valor: 73800, probabilidade: 65, inicio: "2026-05-15", entrega: "2026-07-02", responsavel: "Marta Lopes", descricao: "Dimensionamento hidráulico, bomba, filtros de areia e fertirrega." },
      { id: "p3", clientId: "c3", nome: "Automatização de estufa 4 hectares", fase: "Entrega", valor: 31200, probabilidade: 100, inicio: "2026-04-01", entrega: "2026-05-26", responsavel: "João Martins", descricao: "Controladores, electroválvulas e sensores de humidade." },
      { id: "p4", clientId: "c4", nome: "Manutenção preventiva do sistema de aspersão", fase: "Visita técnica", valor: 8900, probabilidade: 45, inicio: "2026-05-27", entrega: "2026-06-08", responsavel: "Ana Costa", descricao: "Auditoria de pressão, substituição de aspersores e calibração." },
      { id: "p5", clientId: "c5", nome: "Pré-estudo para pivots centrais", fase: "Visita técnica", valor: 56000, probabilidade: 35, inicio: "2026-06-03", entrega: "2026-07-20", responsavel: "Marta Lopes", descricao: "Levantamento de caudal disponível e proposta técnica." }
    ],
    quotes: [
      { id: "q1", numero: "ORC-2026-014", clientId: "c1", projectId: "p1", estado: "Aprovado", createdAt: "2026-05-04", laborHours: 96, laborRate: 34, margin: 18, vat: 23, materials: [
        { name: "Tubo PEAD 63mm PN10", qty: 1800, unit: "m", price: 2.65 },
        { name: "Válvula elétrica 2\"", qty: 18, unit: "un", price: 74 },
        { name: "Controlador 24 estações", qty: 1, unit: "un", price: 940 }
      ]},
      { id: "q2", numero: "ORC-2026-019", clientId: "c2", projectId: "p2", estado: "Enviado", createdAt: "2026-05-17", laborHours: 140, laborRate: 36, margin: 22, vat: 23, materials: [
        { name: "Bomba submersível 15kW", qty: 2, unit: "un", price: 3800 },
        { name: "Filtro de areia 48\"", qty: 4, unit: "un", price: 1650 },
        { name: "Tubagem PEAD 90mm", qty: 2400, unit: "m", price: 4.2 }
      ]},
      { id: "q3", numero: "ORC-2026-021", clientId: "c5", projectId: "p5", estado: "Rascunho", createdAt: "2026-05-24", laborHours: 68, laborRate: 34, margin: 20, vat: 23, materials: [
        { name: "Pivot central 400m", qty: 1, unit: "un", price: 31500 },
        { name: "Quadro elétrico de comando", qty: 1, unit: "un", price: 2750 }
      ]}
    ],
    materials: [
      { id: "m1", nome: "Tubo PEAD 63mm PN10", categoria: "Tubagens", stock: 4200, min: 1500, unit: "m", custo: 1.9, preco: 2.65, fornecedor: "Irritubo" },
      { id: "m2", nome: "Tubagem PEAD 90mm", categoria: "Tubagens", stock: 1200, min: 1400, unit: "m", custo: 3.15, preco: 4.2, fornecedor: "Irritubo" },
      { id: "m3", nome: "Aspersor rotor 1\"", categoria: "Aspersores", stock: 82, min: 60, unit: "un", custo: 18, preco: 29, fornecedor: "RainMaster" },
      { id: "m4", nome: "Válvula elétrica 2\"", categoria: "Válvulas", stock: 24, min: 30, unit: "un", custo: 52, preco: 74, fornecedor: "Agrovalve" },
      { id: "m5", nome: "Controlador 24 estações", categoria: "Controladores", stock: 7, min: 4, unit: "un", custo: 680, preco: 940, fornecedor: "HydroLogic" },
      { id: "m6", nome: "Bomba submersível 15kW", categoria: "Bombas", stock: 3, min: 2, unit: "un", custo: 2920, preco: 3800, fornecedor: "Bombas Ibéricas" },
      { id: "m7", nome: "Filtro de areia 48\"", categoria: "Filtragem", stock: 5, min: 4, unit: "un", custo: 1280, preco: 1650, fornecedor: "FiltraAgro" }
    ],
    sales: [
      { id: "s1", date: "2026-05-02", descricao: "Entrada - Quinta da Lezíria", valor: 14550 },
      { id: "s2", date: "2026-05-15", descricao: "Entrega - AgroMonteiro", valor: 31200 },
      { id: "s3", date: "2026-05-22", descricao: "Manutenção mensal", valor: 4800 },
      { id: "s4", date: "2026-04-28", descricao: "Contrato Frutos do Oeste", valor: 8900 }
    ],
    purchases: [
      { id: "b1", date: "2026-05-03", descricao: "Compra tubagens PEAD", valor: 7850 },
      { id: "b2", date: "2026-05-10", descricao: "Válvulas e controladores", valor: 4120 },
      { id: "b3", date: "2026-05-18", descricao: "Filtros e acessórios", valor: 5200 }
    ],
    activity: [
      { date: "Hoje", text: "Orçamento ORC-2026-019 enviado para Herdade Vale Seco." },
      { date: "Hoje", text: "Stock de Válvula elétrica 2\" abaixo do mínimo definido." },
      { date: "Ontem", text: "Projeto AgroMonteiro marcado como entregue." },
      { date: "21 mai", text: "Novo lead criado: Casa Agrícola Ribeiro." }
    ]
  });

  let state = {
    page: "dashboard",
    data: loadData(),
    filters: {},
    session: sessionStorage.getItem(SESSION_KEY) === "1"
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn("Falha ao ler dados locais", e);
    }
    const data = demoData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
  }

  function init() {
    bindBaseEvents();
    renderNav();
    renderAuth();
  }

  function bindBaseEvents() {
    $("#loginForm").addEventListener("submit", (ev) => {
      ev.preventDefault();
      const user = $("#loginUser").value.trim();
      const pass = $("#loginPass").value.trim();
      if (user === "admin" && pass === "admin123") {
        sessionStorage.setItem(SESSION_KEY, "1");
        state.session = true;
        $("#loginError").hidden = true;
        renderAuth();
        toast("Sessão iniciada.");
      } else {
        $("#loginError").hidden = false;
      }
    });

    $("#logoutBtn").addEventListener("click", () => {
      sessionStorage.removeItem(SESSION_KEY);
      state.session = false;
      renderAuth();
    });

    $("#menuBtn").addEventListener("click", () => toggleMenu(true));
    $("#overlay").addEventListener("click", () => toggleMenu(false));
    $("#quickAddBtn").addEventListener("click", quickAdd);
    $("#exportBtn").addEventListener("click", exportCurrentPage);
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        closeModal();
        toggleMenu(false);
      }
    });

    $("#pageContent").addEventListener("click", handlePageClick);
    $("#pageContent").addEventListener("input", handlePageInput);
    $("#pageContent").addEventListener("change", handlePageInput);
  }

  function renderAuth() {
    $("#loginScreen").hidden = state.session;
    $("#appShell").hidden = !state.session;
    if (state.session) renderPage();
  }

  function renderNav() {
    $("#nav").innerHTML = pages.map(page => `
      <button class="nav-btn" data-nav="${page.id}">
        <span class="nav-ico">${page.icon}</span><span>${page.label}</span>
      </button>
    `).join("");

    $("#bottomNav").innerHTML = pages.slice(0, 5).map(page => `
      <button class="bottom-btn" data-nav="${page.id}">
        <span class="nav-ico">${page.icon}</span><span class="bottom-label">${page.label}</span>
      </button>
    `).join("");

    document.body.addEventListener("click", (ev) => {
      const target = ev.target.closest("[data-nav]");
      if (!target) return;
      state.page = target.dataset.nav;
      state.filters = {};
      toggleMenu(false);
      renderPage();
    });
  }

  function renderPage() {
    const page = pages.find(p => p.id === state.page) || pages[0];
    $("#pageEyebrow").textContent = page.eyebrow;
    $("#pageTitle").textContent = page.label;
    $$("[data-nav]").forEach(btn => btn.classList.toggle("active", btn.dataset.nav === state.page));

    const quickLabels = {
      dashboard: "+ Novo projeto",
      clientes: "+ Cliente",
      projetos: "+ Projeto",
      orcamentos: "+ Orçamento",
      stock: "+ Material",
      financas: "+ Movimento",
      admin: "+ Utilizador"
    };
    $("#quickAddBtn").textContent = quickLabels[state.page] || "+ Novo";

    const renderers = {
      dashboard: renderDashboard,
      clientes: renderClients,
      projetos: renderProjects,
      orcamentos: renderQuotes,
      stock: renderStock,
      financas: renderFinance,
      admin: renderAdmin
    };
    $("#pageContent").innerHTML = renderers[state.page]();
    enhanceResponsiveTables();
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
    requestAnimationFrame(() => {
      if (state.page === "dashboard" || state.page === "financas") drawFinanceChart();
    });
  }

  function enhanceResponsiveTables() {
    $$("#pageContent table").forEach(table => {
      const labels = Array.from(table.querySelectorAll("thead th")).map(th => th.textContent.trim());
      table.querySelectorAll("tbody tr").forEach(row => {
        Array.from(row.children).forEach((cell, index) => {
          if (labels[index]) cell.setAttribute("data-label", labels[index]);
        });
      });
    });
  }

  function toggleMenu(open) {
    $("#sidebar").classList.toggle("open", open);
    $("#overlay").hidden = !open;
  }

  function renderDashboard() {
    const d = state.data;
    const activeProjects = d.projects.filter(p => p.fase !== "Entrega");
    const deliveredProjects = d.projects.filter(p => p.fase === "Entrega").length;
    const pipelineValue = activeProjects.reduce((sum, p) => sum + (Number(p.valor || 0) * Number(p.probabilidade || 0) / 100), 0);
    const openQuotes = d.quotes.filter(q => q.estado !== "Rejeitado");
    const approvedQuotes = d.quotes.filter(q => q.estado === "Aprovado");
    const quotesValue = openQuotes.reduce((sum, q) => sum + quoteTotal(q), 0);
    const approvedQuotesValue = approvedQuotes.reduce((sum, q) => sum + quoteTotal(q), 0);
    const lowStockItems = d.materials.filter(m => Number(m.stock || 0) <= Number(m.min || 0));
    const stockCost = d.materials.reduce((acc, m) => acc + (Number(m.stock || 0) * Number(m.custo || 0)), 0);
    const stockSaleValue = d.materials.reduce((acc, m) => acc + (Number(m.stock || 0) * Number(m.preco || 0)), 0);
    const stockMargin = stockSaleValue - stockCost;
    const totalSales = sum(d.sales, "valor");
    const totalPurchases = sum(d.purchases, "valor");
    const commercialHealth = Math.max(0, Math.round((totalSales / Math.max(totalPurchases, 1)) * 100));
    const nextDeliveries = [...d.projects]
      .sort((a, b) => new Date(a.entrega) - new Date(b.entrega))
      .slice(0, 4);
    const topMaterials = [...d.materials]
      .sort((a, b) => (Number(b.stock || 0) * Number(b.custo || 0)) - (Number(a.stock || 0) * Number(a.custo || 0)))
      .slice(0, 4);

    return `
      <section class="kpi-grid">
        ${kpi("Pipeline ativo", currency.format(pipelineValue), `${activeProjects.length} projetos em curso`)}
        ${kpi("Orçamentos abertos", currency.format(quotesValue), `${openQuotes.length} propostas válidas`)}
        ${kpi("Valor em stock", currency.format(stockCost), `${d.materials.length} referências no armazém`)}
        ${kpi("Stock crítico", lowStockItems.length, lowStockItems.length ? "necessita reposição" : "sem ruturas")}
      </section>

      <section class="grid-2">
        <div class="card">
          <div class="card-head">
            <div><h3>Resumo executivo</h3><p class="muted">Indicadores principais para acompanhar operação, vendas e inventário.</p></div>
            <button class="btn btn-primary compact" data-action="project-add">Novo projeto</button>
          </div>
          <div class="list">
            <div class="list-row"><div><strong>Vendas registadas</strong><small>Entradas associadas a projetos e manutenções</small></div><strong>${currency.format(totalSales)}</strong></div>
            <div class="list-row"><div><strong>Compras de stock</strong><small>Saídas para reposição de materiais</small></div><strong>${currency.format(totalPurchases)}</strong></div>
            <div class="list-row"><div><strong>Margem potencial do stock</strong><small>Diferença entre preço de venda e custo de inventário</small></div><strong>${currency.format(stockMargin)}</strong></div>
            <div class="list-row"><div><strong>Projetos entregues</strong><small>Instalações concluídas na demo</small></div><strong>${deliveredProjects}</strong></div>
            <div class="list-row"><div><strong>Orçamentos aprovados</strong><small>Valor aprovado, com IVA e margem</small></div><strong>${currency.format(approvedQuotesValue)}</strong></div>
          </div>
        </div>

        <div class="card">
          <div class="card-head"><div><h3>Ações prioritárias</h3><p class="muted">O que deve ser tratado primeiro.</p></div></div>
          <div class="list">
            ${lowStockItems.slice(0, 3).map(m => `<div class="list-row"><div><strong>Repor ${escapeHtml(m.nome)}</strong><small>${number.format(m.stock)} ${m.unit} em stock · mínimo ${number.format(m.min)} ${m.unit}</small></div><span class="status danger">Crítico</span></div>`).join("") || `<div class="list-row"><div><strong>Stock sem alertas críticos</strong><small>Todos os materiais estão acima do mínimo definido.</small></div><span class="status">OK</span></div>`}
            ${d.quotes.filter(q => q.estado === "Enviado").map(q => `<div class="list-row"><div><strong>Fazer follow-up ${escapeHtml(q.numero)}</strong><small>${escapeHtml(clientById(q.clientId)?.nome || "Cliente")} · ${currency.format(quoteTotal(q))}</small></div><span class="status info">Enviado</span></div>`).join("")}
          </div>
        </div>
      </section>

      <section class="grid-2">
        <div class="card">
          <div class="card-head"><div><h3>Pipeline por fase</h3><p class="muted">Visita técnica, orçamento, instalação e entrega.</p></div></div>
          ${pipelineHtml()}
        </div>
        <div class="card">
          <div class="card-head"><div><h3>Próximas entregas</h3><p class="muted">Projetos ordenados por data de entrega.</p></div></div>
          <div class="list">
            ${nextDeliveries.map(p => `<div class="list-row"><div><strong>${escapeHtml(p.nome)}</strong><small>${escapeHtml(clientById(p.clientId)?.nome || "—")} · ${formatDate(p.entrega)} · ${escapeHtml(p.fase)}</small></div><strong>${currency.format(p.valor)}</strong></div>`).join("")}
          </div>
        </div>
      </section>

      <section class="finance-split">
        <div class="card">
          <div class="card-head"><div><h3>Vendas, compras e inventário</h3><p class="muted">Dashboard financeiro baseado apenas em stock e movimentos comerciais.</p></div></div>
          <canvas id="financeChart" class="chart" width="900" height="320"></canvas>
        </div>
        <div class="card">
          <div class="card-head"><div><h3>Materiais de maior valor</h3><p class="muted">Referências com maior capital imobilizado.</p></div></div>
          <div class="list">
            ${topMaterials.map(m => `<div class="list-row"><div><strong>${escapeHtml(m.nome)}</strong><small>${number.format(m.stock)} ${m.unit} · ${escapeHtml(m.categoria)}</small></div><strong>${currency.format(Number(m.stock || 0) * Number(m.custo || 0))}</strong></div>`).join("")}
          </div>
        </div>
      </section>

      <section class="card">
        <div class="card-head"><div><h3>Atividade recente</h3><p class="muted">Histórico operacional da demonstração.</p></div><span class="status ${commercialHealth >= 100 ? "" : "warning"}">Índice ${commercialHealth}%</span></div>
        <div class="list">
          ${d.activity.map(item => `<div class="list-row"><div><strong>${escapeHtml(item.text)}</strong><small>${escapeHtml(item.date)}</small></div></div>`).join("")}
        </div>
      </section>
    `;
  }

  function renderClients() {
    const query = (state.filters.clientSearch || "").toLowerCase();
    const tipo = state.filters.clientType || "Todos";
    const clients = state.data.clients.filter(c => {
      const matchesQuery = [c.nome, c.contacto, c.localizacao, c.tipo, c.estado].join(" ").toLowerCase().includes(query);
      const matchesType = tipo === "Todos" || c.tipo === tipo;
      return matchesQuery && matchesType;
    });
    const types = ["Todos", ...new Set(state.data.clients.map(c => c.tipo))];
    return `
      <section class="card">
        <div class="toolbar">
          <div>
            <h3>Gestão de clientes</h3>
            <p class="muted">Ficha do cliente, contactos, localização, propriedade, histórico e documentos.</p>
          </div>
          <div class="filters">
            <input class="search" data-filter="clientSearch" placeholder="Pesquisar cliente, localização ou contacto" value="${escapeAttr(state.filters.clientSearch || "")}" />
            <select data-filter="clientType">${types.map(t => `<option ${t === tipo ? "selected" : ""}>${escapeHtml(t)}</option>`).join("")}</select>
            <button class="btn btn-primary" data-action="client-add">Novo cliente</button>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Cliente</th><th>Contacto</th><th>Localização</th><th>Propriedade</th><th>Estado</th><th>Ações</th></tr></thead>
            <tbody>
              ${clients.map(c => `
                <tr>
                  <td><strong>${escapeHtml(c.nome)}</strong><br><span class="muted">${c.area} ha</span></td>
                  <td>${escapeHtml(c.contacto)}<br><span class="muted">${escapeHtml(c.telefone)}</span></td>
                  <td>${escapeHtml(c.localizacao)}</td>
                  <td>${escapeHtml(c.tipo)}</td>
                  <td>${status(c.estado, c.estado === "Lead" ? "info" : c.estado === "Em proposta" ? "warning" : "")}</td>
                  <td><div class="actions"><button class="btn btn-outline" data-action="client-view" data-id="${c.id}">Ver</button><button class="btn" data-action="client-edit" data-id="${c.id}">Editar</button></div></td>
                </tr>
              `).join("") || emptyRow(6, "Não existem clientes com estes filtros.")}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  function renderProjects() {
    const fase = state.filters.projectStage || "Todas";
    const projects = state.data.projects.filter(p => fase === "Todas" || p.fase === fase);
    return `
      <section class="card">
        <div class="toolbar">
          <div><h3>Projetos de instalação</h3><p class="muted">Controlo por fase e valor ponderado de oportunidade.</p></div>
          <div class="filters">
            <select data-filter="projectStage"><option>Todas</option>${Object.keys(stageMeta).map(f => `<option ${f === fase ? "selected" : ""}>${f}</option>`).join("")}</select>
            <button class="btn btn-primary" data-action="project-add">Novo projeto</button>
          </div>
        </div>
        <div class="pipeline">${pipelineHtml(projects)}</div>
      </section>

      <section class="table-card card">
        <div class="table-wrap">
          <table>
            <thead><tr><th>Projeto</th><th>Cliente</th><th>Fase</th><th>Valor</th><th>Prob.</th><th>Responsável</th><th>Ações</th></tr></thead>
            <tbody>
              ${projects.map(p => {
                const client = clientById(p.clientId);
                return `<tr>
                  <td><strong>${escapeHtml(p.nome)}</strong><br><span class="muted">Entrega: ${formatDate(p.entrega)}</span></td>
                  <td>${escapeHtml(client?.nome || "—")}</td>
                  <td>${status(p.fase, stageMeta[p.fase]?.cls)}</td>
                  <td>${currency.format(p.valor)}</td>
                  <td><div class="progress-bar"><span style="width:${p.probabilidade}%"></span></div><span class="muted">${p.probabilidade}%</span></td>
                  <td>${escapeHtml(p.responsavel)}</td>
                  <td><div class="actions"><button class="btn btn-outline" data-action="project-view" data-id="${p.id}">Ver</button><button class="btn" data-action="project-edit" data-id="${p.id}">Editar</button></div></td>
                </tr>`;
              }).join("") || emptyRow(7, "Sem projetos nesta fase.")}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  function renderQuotes() {
    const statusFilter = state.filters.quoteStatus || "Todos";
    const quotes = state.data.quotes.filter(q => statusFilter === "Todos" || q.estado === statusFilter);
    return `
      <section class="card">
        <div class="toolbar">
          <div><h3>Orçamentação</h3><p class="muted">Materiais, mão de obra, margem, IVA e valor final.</p></div>
          <div class="filters">
            <select data-filter="quoteStatus"><option>Todos</option>${Object.keys(quoteStatus).map(s => `<option ${s === statusFilter ? "selected" : ""}>${s}</option>`).join("")}</select>
            <button class="btn btn-primary" data-action="quote-add">Novo orçamento</button>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Número</th><th>Cliente</th><th>Projeto</th><th>Estado</th><th>Total</th><th>Data</th><th>Ações</th></tr></thead>
            <tbody>
              ${quotes.map(q => {
                const c = clientById(q.clientId);
                const p = projectById(q.projectId);
                return `<tr>
                  <td><strong>${escapeHtml(q.numero)}</strong></td>
                  <td>${escapeHtml(c?.nome || "—")}</td>
                  <td>${escapeHtml(p?.nome || "—")}</td>
                  <td>${status(q.estado, quoteStatus[q.estado])}</td>
                  <td><strong>${currency.format(quoteTotal(q))}</strong></td>
                  <td>${formatDate(q.createdAt)}</td>
                  <td><div class="actions"><button class="btn btn-outline" data-action="quote-view" data-id="${q.id}">Ver</button><button class="btn" data-action="quote-edit" data-id="${q.id}">Editar</button></div></td>
                </tr>`;
              }).join("") || emptyRow(7, "Sem orçamentos neste estado.")}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  function renderStock() {
    const category = state.filters.stockCategory || "Todas";
    const categories = ["Todas", ...new Set(state.data.materials.map(m => m.categoria))];
    const materials = state.data.materials.filter(m => category === "Todas" || m.categoria === category);
    const stockValue = state.data.materials.reduce((sum, m) => sum + m.stock * m.custo, 0);
    return `
      <section class="kpi-grid">
        ${kpi("Valor em armazém", currency.format(stockValue), "custo médio")}
        ${kpi("Referências", state.data.materials.length, "catálogo ativo")}
        ${kpi("Stock crítico", state.data.materials.filter(m => m.stock <= m.min).length, "abaixo do mínimo")}
        ${kpi("Fornecedores", new Set(state.data.materials.map(m => m.fornecedor)).size, "ativos")}
      </section>
      <section class="card">
        <div class="toolbar">
          <div><h3>Equipamentos e stock</h3><p class="muted">Tubagens, aspersores, válvulas, controladores, bombas e filtragem.</p></div>
          <div class="filters">
            <select data-filter="stockCategory">${categories.map(c => `<option ${c === category ? "selected" : ""}>${escapeHtml(c)}</option>`).join("")}</select>
            <button class="btn btn-primary" data-action="material-add">Novo material</button>
          </div>
        </div>
        <div class="stock-grid">
          ${materials.map(m => `
            <article class="stock-item">
              <header><div><strong>${escapeHtml(m.nome)}</strong><small class="muted">${escapeHtml(m.categoria)} · ${escapeHtml(m.fornecedor)}</small></div>${m.stock <= m.min ? status("Crítico", "danger") : status("OK", "")}</header>
              <div class="qty">${number.format(m.stock)} <span class="muted">${m.unit}</span></div>
              <div class="progress-bar"><span style="width:${Math.min(100, Math.round((m.stock / Math.max(m.min * 2, 1)) * 100))}%"></span></div>
              <p class="muted">Mínimo: ${number.format(m.min)} ${m.unit} · Preço venda: ${currency.format(m.preco)}</p>
              <div class="actions"><button class="btn btn-outline" data-action="material-edit" data-id="${m.id}">Editar</button><button class="btn" data-action="material-move" data-id="${m.id}">Movimento</button></div>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderFinance() {
    const d = state.data;
    const totalSales = sum(d.sales, "valor");
    const totalPurchases = sum(d.purchases, "valor");
    const stockCost = d.materials.reduce((acc, m) => acc + (Number(m.stock || 0) * Number(m.custo || 0)), 0);
    const stockSaleValue = d.materials.reduce((acc, m) => acc + (Number(m.stock || 0) * Number(m.preco || 0)), 0);
    const stockMargin = stockSaleValue - stockCost;
    const lowStock = d.materials.filter(m => m.stock <= m.min);
    return `
      <section class="kpi-grid">
        ${kpi("Vendas", currency.format(totalSales), "movimentos registados")}
        ${kpi("Compras de stock", currency.format(totalPurchases), "materiais e fornecedores")}
        ${kpi("Valor em armazém", currency.format(stockCost), "custo do inventário")}
        ${kpi("Margem potencial", currency.format(stockMargin), "baseada no preço de venda")}
      </section>
      <section class="finance-split">
        <div class="card">
          <div class="card-head"><div><h3>Gestão baseada em stock</h3><p class="muted">Controlo financeiro por vendas, compras, inventário e margem potencial dos materiais.</p></div><button class="btn btn-primary compact" data-action="finance-add">Novo movimento</button></div>
          <canvas id="financeChart" class="chart" width="900" height="320"></canvas>
        </div>
        <div class="card">
          <div class="card-head"><div><h3>Stock crítico</h3><p class="muted">Materiais abaixo do mínimo definido.</p></div></div>
          <div class="list">${lowStock.map(m => `<div class="list-row"><div><strong>${escapeHtml(m.nome)}</strong><small>${number.format(m.stock)} ${m.unit} em stock · mínimo ${number.format(m.min)} ${m.unit}</small></div><span class="status danger">Baixo</span></div>`).join("") || `<div class="list-row"><strong>Sem ruturas de stock.</strong><span class="status">OK</span></div>`}</div>
        </div>
      </section>
      <section class="grid-2">
        <div class="card"><div class="card-head"><div><h3>Vendas recentes</h3><p class="muted">Entradas associadas a projetos, manutenções e entregas.</p></div></div><div class="list">${d.sales.map(x => `<div class="list-row"><div><strong>${escapeHtml(x.descricao)}</strong><small>${formatDate(x.date)}</small></div><strong>${currency.format(x.valor)}</strong></div>`).join("")}</div></div>
        <div class="card"><div class="card-head"><div><h3>Compras de stock recentes</h3><p class="muted">Saídas para reposição de materiais e equipamentos.</p></div></div><div class="list">${d.purchases.map(x => `<div class="list-row"><div><strong>${escapeHtml(x.descricao)}</strong><small>${formatDate(x.date)}</small></div><strong>${currency.format(x.valor)}</strong></div>`).join("")}</div></div>
      </section>
    `;
  }

  function renderAdmin() {
    const s = state.data.settings;
    return `
      <section class="admin-grid">
        <div class="card">
          <div class="card-head"><div><h3>Painel de administração</h3><p class="muted">Configuração de empresa, acessos e utilitários de demonstração.</p></div></div>
          <div class="settings-grid">
            <label>Nome da empresa<input data-setting="company" value="${escapeAttr(s.company)}"></label>
            <label>NIF<input data-setting="nif" value="${escapeAttr(s.nif)}"></label>
            <label>Morada<input data-setting="address" value="${escapeAttr(s.address)}"></label>
            <label>Telefone<input data-setting="phone" value="${escapeAttr(s.phone)}"></label>
            <label>Email<input data-setting="email" value="${escapeAttr(s.email)}"></label>
            <button class="btn btn-primary" data-action="settings-save">Guardar definições</button>
          </div>
        </div>
        <div class="card">
          <div class="card-head"><div><h3>Operações</h3><p class="muted">Ferramentas úteis para demo e exportação.</p></div></div>
          <div class="list">
            <button class="btn btn-outline full" data-action="export-all">Exportar dados CSV</button>
            <button class="btn btn-outline full" data-action="install-pwa">Instalar no dispositivo</button>
            <button class="btn btn-danger full" data-action="reset-demo">Repor dados de demonstração</button>
          </div>
        </div>
      </section>
      <section class="card">
        <div class="toolbar"><div><h3>Utilizadores</h3><p class="muted">Perfis de acesso para dar aspeto de produto final.</p></div><button class="btn btn-primary" data-action="user-add">Novo utilizador</button></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Nome</th><th>Email</th><th>Função</th><th>Estado</th><th>Ações</th></tr></thead>
            <tbody>${state.data.users.map(u => `<tr><td><strong>${escapeHtml(u.name)}</strong></td><td>${escapeHtml(u.email)}</td><td>${escapeHtml(u.role)}</td><td>${status(u.status)}</td><td><div class="actions"><button class="btn" data-action="user-edit" data-id="${u.id}">Editar</button></div></td></tr>`).join("")}</tbody>
          </table>
        </div>
      </section>
    `;
  }

  function kpi(label, value, trend) {
    return `<article class="kpi-card"><span class="kpi-label">${escapeHtml(label)}</span><strong class="kpi-value">${escapeHtml(String(value))}</strong><span class="kpi-trend">${escapeHtml(trend)}</span></article>`;
  }

  function pipelineHtml(projects = state.data.projects) {
    return Object.keys(stageMeta).map(stage => {
      const items = projects.filter(p => p.fase === stage);
      return `<div class="pipeline-col"><h4>${stage} · ${items.length}</h4>${items.map(p => {
        const c = clientById(p.clientId);
        return `<div class="project-chip"><strong>${escapeHtml(p.nome)}</strong><span>${escapeHtml(c?.nome || "—")} · ${currency.format(p.valor)}</span><div class="progress-bar" style="margin-top:10px"><span style="width:${stageMeta[p.fase].progress}%"></span></div></div>`;
      }).join("") || `<p class="muted">Sem projetos.</p>`}</div>`;
    }).join("");
  }

  function handlePageInput(ev) {
    const filter = ev.target.dataset.filter;
    if (filter) {
      state.filters[filter] = ev.target.value;
      renderPage();
      return;
    }
  }

  function handlePageClick(ev) {
    const btn = ev.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === "client-add") return openClientForm();
    if (action === "client-edit") return openClientForm(id);
    if (action === "client-view") return openClientView(id);
    if (action === "project-add") return openProjectForm();
    if (action === "project-edit") return openProjectForm(id);
    if (action === "project-view") return openProjectView(id);
    if (action === "quote-add") return openQuoteForm();
    if (action === "quote-edit") return openQuoteForm(id);
    if (action === "quote-view") return openQuoteView(id);
    if (action === "material-add") return openMaterialForm();
    if (action === "material-edit") return openMaterialForm(id);
    if (action === "material-move") return openStockMove(id);
    if (action === "finance-add") return openFinanceForm();
    if (action === "settings-save") return saveSettings();
    if (action === "export-all") return exportAll();
    if (action === "install-pwa") return toast("No Chrome/Edge: menu do browser → Instalar app. Em iPhone: Partilhar → Adicionar ao ecrã principal.");
    if (action === "reset-demo") return resetDemo();
    if (action === "user-add") return openUserForm();
    if (action === "user-edit") return openUserForm(id);
  }

  function quickAdd() {
    const map = {
      dashboard: () => openProjectForm(),
      clientes: () => openClientForm(),
      projetos: () => openProjectForm(),
      orcamentos: () => openQuoteForm(),
      stock: () => openMaterialForm(),
      financas: () => openFinanceForm(),
      admin: () => openUserForm()
    };
    map[state.page]?.();
  }

  function openClientForm(id) {
    const client = id ? state.data.clients.find(c => c.id === id) : null;
    openModal(`${client ? "Editar" : "Novo"} cliente`, "Ficha completa do cliente", `
      <form id="clientForm" class="modal-body">
        <div class="form-grid">
          <label>Empresa<input name="nome" required value="${escapeAttr(client?.nome || "")}"></label>
          <label>Contacto<input name="contacto" required value="${escapeAttr(client?.contacto || "")}"></label>
          <label>Email<input name="email" type="email" value="${escapeAttr(client?.email || "")}"></label>
          <label>Telefone<input name="telefone" value="${escapeAttr(client?.telefone || "")}"></label>
          <label>Localização<input name="localizacao" required value="${escapeAttr(client?.localizacao || "")}"></label>
          <label>Tipo de propriedade<select name="tipo">${["Vinha","Olival","Hortícolas","Pomar","Cereal","Outra"].map(t => `<option ${client?.tipo === t ? "selected" : ""}>${t}</option>`).join("")}</select></label>
          <label>Área, ha<input name="area" type="number" min="0" step="1" value="${client?.area || 0}"></label>
          <label>Estado<select name="estado">${["Lead","Em proposta","Cliente ativo","Manutenção"].map(s => `<option ${client?.estado === s ? "selected" : ""}>${s}</option>`).join("")}</select></label>
        </div>
      </form>
    `, [
      { label: "Cancelar", cls: "btn-outline", click: closeModal },
      { label: "Guardar", cls: "btn-primary", click: () => {
        const form = new FormData($("#clientForm"));
        const payload = Object.fromEntries(form.entries());
        payload.area = Number(payload.area || 0);
        payload.ultimoContato = client?.ultimoContato || new Date().toISOString().slice(0,10);
        if (client) Object.assign(client, payload); else state.data.clients.unshift({ id: uid("c"), ...payload });
        saveData(); closeModal(); renderPage(); toast("Cliente guardado.");
      }}
    ]);
  }

  function openClientView(id) {
    const c = state.data.clients.find(x => x.id === id);
    if (!c) return;
    const projects = state.data.projects.filter(p => p.clientId === id);
    const quotes = state.data.quotes.filter(q => q.clientId === id);
    openModal(c.nome, "Ficha do cliente", `
      <div class="modal-body">
        <section class="grid-2">
          <div class="mini-card card"><h3>Contactos</h3><p><strong>${escapeHtml(c.contacto)}</strong><br>${escapeHtml(c.email)}<br>${escapeHtml(c.telefone)}</p><p class="muted">${escapeHtml(c.localizacao)} · ${escapeHtml(c.tipo)} · ${c.area} ha</p></div>
          <div class="mini-card card"><h3>Documentos associados</h3><div class="list"><div class="list-row"><strong>Contrato de manutenção.pdf</strong><span class="status">Demo</span></div><div class="list-row"><strong>Orçamento aprovado.xlsx</strong><span class="status">Demo</span></div></div></div>
        </section>
        <section class="card"><h3>Histórico de projetos e intervenções</h3><div class="list">${projects.map(p => `<div class="list-row"><div><strong>${escapeHtml(p.nome)}</strong><small>${escapeHtml(p.fase)} · ${formatDate(p.inicio)} → ${formatDate(p.entrega)}</small></div><strong>${currency.format(p.valor)}</strong></div>`).join("") || `<p class="muted">Sem projetos.</p>`}</div></section>
        <section class="card"><h3>Orçamentos</h3><div class="list">${quotes.map(q => `<div class="list-row"><div><strong>${escapeHtml(q.numero)}</strong><small>${escapeHtml(q.estado)}</small></div><strong>${currency.format(quoteTotal(q))}</strong></div>`).join("") || `<p class="muted">Sem orçamentos.</p>`}</div></section>
      </div>
    `, [{ label: "Fechar", cls: "btn-outline", click: closeModal }]);
  }

  function openProjectForm(id) {
    const p = id ? state.data.projects.find(x => x.id === id) : null;
    openModal(`${p ? "Editar" : "Novo"} projeto`, "Projeto de instalação", `
      <form id="projectForm" class="modal-body">
        <div class="form-grid">
          <label class="full-span">Nome do projeto<input name="nome" required value="${escapeAttr(p?.nome || "")}"></label>
          <label>Cliente<select name="clientId">${state.data.clients.map(c => `<option value="${c.id}" ${p?.clientId === c.id ? "selected" : ""}>${escapeHtml(c.nome)}</option>`).join("")}</select></label>
          <label>Fase<select name="fase">${Object.keys(stageMeta).map(f => `<option ${p?.fase === f ? "selected" : ""}>${f}</option>`).join("")}</select></label>
          <label>Valor estimado<input name="valor" type="number" min="0" step="100" value="${p?.valor || 0}"></label>
          <label>Probabilidade %<input name="probabilidade" type="number" min="0" max="100" value="${p?.probabilidade || 50}"></label>
          <label>Início<input name="inicio" type="date" value="${p?.inicio || new Date().toISOString().slice(0,10)}"></label>
          <label>Entrega prevista<input name="entrega" type="date" value="${p?.entrega || new Date().toISOString().slice(0,10)}"></label>
          <label>Responsável<input name="responsavel" value="${escapeAttr(p?.responsavel || "")}"></label>
          <label class="full-span">Descrição<textarea name="descricao">${escapeHtml(p?.descricao || "")}</textarea></label>
        </div>
      </form>
    `, [
      { label: "Cancelar", cls: "btn-outline", click: closeModal },
      { label: "Guardar", cls: "btn-primary", click: () => {
        const payload = Object.fromEntries(new FormData($("#projectForm")).entries());
        payload.valor = Number(payload.valor || 0); payload.probabilidade = Number(payload.probabilidade || 0);
        if (p) Object.assign(p, payload); else state.data.projects.unshift({ id: uid("p"), ...payload });
        saveData(); closeModal(); renderPage(); toast("Projeto guardado.");
      }}
    ]);
  }

  function openProjectView(id) {
    const p = state.data.projects.find(x => x.id === id);
    if (!p) return;
    const c = clientById(p.clientId);
    openModal(p.nome, "Detalhe do projeto", `
      <div class="modal-body">
        <section class="grid-3">
          ${kpi("Cliente", c?.nome || "—", c?.localizacao || "")}
          ${kpi("Valor", currency.format(p.valor), `${p.probabilidade}% probabilidade`)}
          ${kpi("Fase", p.fase, `Entrega ${formatDate(p.entrega)}`)}
        </section>
        <section class="card"><h3>Descrição técnica</h3><p class="muted">${escapeHtml(p.descricao || "Sem descrição.")}</p><div class="progress-bar"><span style="width:${stageMeta[p.fase]?.progress || 20}%"></span></div></section>
      </div>
    `, [{ label: "Fechar", cls: "btn-outline", click: closeModal }]);
  }

  function openQuoteForm(id) {
    const q = id ? state.data.quotes.find(x => x.id === id) : null;
    const materialLines = q?.materials?.length ? q.materials : [{ name: "Tubo PEAD 63mm PN10", qty: 100, unit: "m", price: 2.65 }];
    openModal(`${q ? "Editar" : "Novo"} orçamento`, "Lista de materiais e mão de obra", `
      <form id="quoteForm" class="modal-body">
        <div class="form-grid">
          <label>Número<input name="numero" required value="${escapeAttr(q?.numero || nextQuoteNumber())}"></label>
          <label>Estado<select name="estado">${Object.keys(quoteStatus).map(s => `<option ${q?.estado === s ? "selected" : ""}>${s}</option>`).join("")}</select></label>
          <label>Cliente<select name="clientId" id="quoteClient">${state.data.clients.map(c => `<option value="${c.id}" ${q?.clientId === c.id ? "selected" : ""}>${escapeHtml(c.nome)}</option>`).join("")}</select></label>
          <label>Projeto<select name="projectId">${state.data.projects.map(p => `<option value="${p.id}" ${q?.projectId === p.id ? "selected" : ""}>${escapeHtml(p.nome)}</option>`).join("")}</select></label>
          <label>Mão de obra, horas<input name="laborHours" type="number" min="0" value="${q?.laborHours || 0}"></label>
          <label>Preço/hora<input name="laborRate" type="number" min="0" value="${q?.laborRate || 34}"></label>
          <label>Margem %<input name="margin" type="number" min="0" value="${q?.margin || 20}"></label>
          <label>IVA %<input name="vat" type="number" min="0" value="${q?.vat || 23}"></label>
        </div>
        <section class="card full-span">
          <div class="card-head"><div><h3>Materiais</h3><p class="muted">Para simplificar a demo, cada linha tem nome, quantidade, unidade e preço.</p></div><button type="button" class="btn btn-outline compact" id="addLineBtn">Adicionar linha</button></div>
          <div id="quoteLines" class="list">${materialLines.map(lineHtml).join("")}</div>
        </section>
      </form>
    `, [
      { label: "Cancelar", cls: "btn-outline", click: closeModal },
      { label: "Guardar", cls: "btn-primary", click: () => saveQuote(q) }
    ]);
    $("#addLineBtn").addEventListener("click", () => {
      $("#quoteLines").insertAdjacentHTML("beforeend", lineHtml({ name: "", qty: 1, unit: "un", price: 0 }));
    });
    $("#quoteLines").addEventListener("click", (ev) => {
      if (ev.target.closest("[data-remove-line]")) ev.target.closest(".quote-line").remove();
    });
  }

  function lineHtml(line) {
    return `<div class="quote-line form-grid" style="padding:12px;border:1px solid var(--line);border-radius:16px;background:#fff">
      <label>Material<input name="matName" value="${escapeAttr(line.name)}"></label>
      <label>Qtd.<input name="matQty" type="number" min="0" step="1" value="${line.qty}"></label>
      <label>Unidade<input name="matUnit" value="${escapeAttr(line.unit)}"></label>
      <label>Preço unit.<input name="matPrice" type="number" min="0" step="0.01" value="${line.price}"></label>
      <button type="button" class="btn btn-danger" data-remove-line>Remover</button>
    </div>`;
  }

  function saveQuote(existing) {
    const form = $("#quoteForm");
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    payload.laborHours = Number(payload.laborHours || 0);
    payload.laborRate = Number(payload.laborRate || 0);
    payload.margin = Number(payload.margin || 0);
    payload.vat = Number(payload.vat || 0);
    payload.createdAt = existing?.createdAt || new Date().toISOString().slice(0,10);
    payload.materials = $$(".quote-line").map(row => ({
      name: row.querySelector("[name='matName']").value,
      qty: Number(row.querySelector("[name='matQty']").value || 0),
      unit: row.querySelector("[name='matUnit']").value,
      price: Number(row.querySelector("[name='matPrice']").value || 0)
    })).filter(x => x.name);
    if (existing) Object.assign(existing, payload); else state.data.quotes.unshift({ id: uid("q"), ...payload });
    saveData(); closeModal(); renderPage(); toast("Orçamento guardado.");
  }

  function openQuoteView(id) {
    const q = state.data.quotes.find(x => x.id === id);
    if (!q) return;
    const materials = q.materials.reduce((sum, m) => sum + m.qty * m.price, 0);
    const labor = q.laborHours * q.laborRate;
    const subtotal = materials + labor;
    const marginValue = subtotal * q.margin / 100;
    const beforeVat = subtotal + marginValue;
    const vatValue = beforeVat * q.vat / 100;
    openModal(q.numero, "Resumo do orçamento", `
      <div class="modal-body">
        <section class="grid-3">${kpi("Cliente", clientById(q.clientId)?.nome || "—", q.estado)}${kpi("Materiais", currency.format(materials), `${q.materials.length} linhas`)}${kpi("Total", currency.format(beforeVat + vatValue), `IVA ${q.vat}%`)}</section>
        <section class="card"><h3>Linhas de material</h3><div class="table-wrap"><table><thead><tr><th>Material</th><th>Qtd.</th><th>Preço</th><th>Total</th></tr></thead><tbody>${q.materials.map(m => `<tr><td>${escapeHtml(m.name)}</td><td>${m.qty} ${escapeHtml(m.unit)}</td><td>${currency.format(m.price)}</td><td>${currency.format(m.qty * m.price)}</td></tr>`).join("")}</tbody></table></div></section>
        <section class="card"><h3>Totais</h3><div class="list"><div class="list-row"><span>Mão de obra</span><strong>${currency.format(labor)}</strong></div><div class="list-row"><span>Margem</span><strong>${currency.format(marginValue)}</strong></div><div class="list-row"><span>IVA</span><strong>${currency.format(vatValue)}</strong></div><div class="list-row"><span>Total</span><strong>${currency.format(beforeVat + vatValue)}</strong></div></div></section>
      </div>
    `, [{ label: "Fechar", cls: "btn-outline", click: closeModal }]);
  }

  function openMaterialForm(id) {
    const m = id ? state.data.materials.find(x => x.id === id) : null;
    openModal(`${m ? "Editar" : "Novo"} material`, "Catálogo e armazém", `
      <form id="materialForm" class="modal-body"><div class="form-grid">
        <label class="full-span">Nome<input name="nome" required value="${escapeAttr(m?.nome || "")}"></label>
        <label>Categoria<input name="categoria" value="${escapeAttr(m?.categoria || "Tubagens")}"></label>
        <label>Fornecedor<input name="fornecedor" value="${escapeAttr(m?.fornecedor || "")}"></label>
        <label>Stock<input name="stock" type="number" min="0" value="${m?.stock || 0}"></label>
        <label>Stock mínimo<input name="min" type="number" min="0" value="${m?.min || 0}"></label>
        <label>Unidade<input name="unit" value="${escapeAttr(m?.unit || "un")}"></label>
        <label>Custo<input name="custo" type="number" min="0" step="0.01" value="${m?.custo || 0}"></label>
        <label>Preço venda<input name="preco" type="number" min="0" step="0.01" value="${m?.preco || 0}"></label>
      </div></form>
    `, [
      { label: "Cancelar", cls: "btn-outline", click: closeModal },
      { label: "Guardar", cls: "btn-primary", click: () => {
        const payload = Object.fromEntries(new FormData($("#materialForm")).entries());
        ["stock","min","custo","preco"].forEach(k => payload[k] = Number(payload[k] || 0));
        if (m) Object.assign(m, payload); else state.data.materials.unshift({ id: uid("m"), ...payload });
        saveData(); closeModal(); renderPage(); toast("Material guardado.");
      }}
    ]);
  }

  function openStockMove(id) {
    const m = state.data.materials.find(x => x.id === id);
    if (!m) return;
    openModal("Movimento de stock", m.nome, `
      <form id="moveForm" class="modal-body"><div class="form-grid"><label>Tipo<select name="type"><option value="in">Entrada</option><option value="out">Saída</option></select></label><label>Quantidade<input name="qty" type="number" min="1" value="1"></label></div><p class="muted">Stock atual: ${number.format(m.stock)} ${m.unit}</p></form>
    `, [
      { label: "Cancelar", cls: "btn-outline", click: closeModal },
      { label: "Aplicar", cls: "btn-primary", click: () => {
        const fd = Object.fromEntries(new FormData($("#moveForm")).entries());
        const qty = Number(fd.qty || 0);
        m.stock = Math.max(0, m.stock + (fd.type === "in" ? qty : -qty));
        saveData(); closeModal(); renderPage(); toast("Stock atualizado.");
      }}
    ]);
  }

  function openFinanceForm() {
    openModal("Novo movimento financeiro", "Venda ou compra de stock", `
      <form id="financeForm" class="modal-body"><div class="form-grid">
        <label>Tipo<select name="type"><option value="sales">Venda</option><option value="purchases">Compra</option></select></label>
        <label>Data<input name="date" type="date" value="${new Date().toISOString().slice(0,10)}"></label>
        <label class="full-span">Descrição<input name="descricao" required></label>
        <label>Valor<input name="valor" type="number" min="0" step="1" required></label>
      </div></form>
    `, [
      { label: "Cancelar", cls: "btn-outline", click: closeModal },
      { label: "Guardar", cls: "btn-primary", click: () => {
        const fd = Object.fromEntries(new FormData($("#financeForm")).entries());
        const bucket = fd.type;
        state.data[bucket].unshift({ id: uid(bucket === "sales" ? "s" : "b"), date: fd.date, descricao: fd.descricao, valor: Number(fd.valor || 0) });
        saveData(); closeModal(); renderPage(); toast("Movimento guardado.");
      }}
    ]);
  }

  function openUserForm(id) {
    const u = id ? state.data.users.find(x => x.id === id) : null;
    openModal(`${u ? "Editar" : "Novo"} utilizador`, "Acessos ao painel", `
      <form id="userForm" class="modal-body"><div class="form-grid">
        <label>Nome<input name="name" required value="${escapeAttr(u?.name || "")}"></label>
        <label>Email<input name="email" type="email" required value="${escapeAttr(u?.email || "")}"></label>
        <label>Função<select name="role">${["Administrador","Comercial","Técnico","Financeiro"].map(r => `<option ${u?.role === r ? "selected" : ""}>${r}</option>`).join("")}</select></label>
        <label>Estado<select name="status"><option ${u?.status === "Ativo" ? "selected" : ""}>Ativo</option><option ${u?.status === "Inativo" ? "selected" : ""}>Inativo</option></select></label>
      </div></form>
    `, [
      { label: "Cancelar", cls: "btn-outline", click: closeModal },
      { label: "Guardar", cls: "btn-primary", click: () => {
        const payload = Object.fromEntries(new FormData($("#userForm")).entries());
        if (u) Object.assign(u, payload); else state.data.users.unshift({ id: uid("u"), ...payload });
        saveData(); closeModal(); renderPage(); toast("Utilizador guardado.");
      }}
    ]);
  }

  function saveSettings() {
    $$('[data-setting]').forEach(input => { state.data.settings[input.dataset.setting] = input.value; });
    saveData();
    toast("Definições guardadas.");
  }

  function resetDemo() {
    if (!confirm("Repor todos os dados demo?")) return;
    state.data = demoData();
    saveData();
    renderPage();
    toast("Dados demo repostos.");
  }

  function exportCurrentPage() {
    const map = {
      dashboard: "projects",
      clientes: "clients",
      projetos: "projects",
      orcamentos: "quotes",
      stock: "materials",
      financas: "sales",
      admin: "users"
    };
    exportCsv(`agrorega-${state.page}.csv`, state.data[map[state.page]] || []);
  }

  function exportAll() {
    exportCsv("agrorega-clientes.csv", state.data.clients);
    setTimeout(() => exportCsv("agrorega-projetos.csv", state.data.projects), 250);
    setTimeout(() => exportCsv("agrorega-stock.csv", state.data.materials), 500);
    toast("Exportação CSV iniciada.");
  }

  function exportCsv(filename, rows) {
    if (!rows.length) return toast("Sem dados para exportar.");
    const flat = rows.map(row => flattenRow(row));
    const headers = [...new Set(flat.flatMap(row => Object.keys(row)))];
    const csv = [headers.join(";"), ...flat.map(row => headers.map(h => csvCell(row[h])).join(";"))].join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  function flattenRow(row) {
    const out = {};
    Object.entries(row).forEach(([k, v]) => out[k] = typeof v === "object" ? JSON.stringify(v) : v);
    return out;
  }

  function csvCell(value) {
    const text = value == null ? "" : String(value);
    return `"${text.replaceAll('"', '""')}"`;
  }

  function openModal(title, subtitle, body, actions = []) {
    const root = $("#modalRoot");
    root.hidden = false;
    root.innerHTML = `<div class="modal" role="dialog" aria-modal="true">
      <header><div><p class="eyebrow">${escapeHtml(subtitle)}</p><h2>${escapeHtml(title)}</h2></div><button class="icon-btn" id="closeModalBtn" aria-label="Fechar">×</button></header>
      ${body}
      <div class="modal-actions" id="modalActions"></div>
    </div>`;
    $("#closeModalBtn").addEventListener("click", closeModal);
    const actionsRoot = $("#modalActions");
    actions.forEach(action => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `btn ${action.cls || "btn-outline"}`;
      btn.textContent = action.label;
      btn.addEventListener("click", action.click);
      actionsRoot.appendChild(btn);
    });
  }

  function closeModal() {
    const root = $("#modalRoot");
    root.hidden = true;
    root.innerHTML = "";
  }

  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => el.hidden = true, 2600);
  }

  function drawFinanceChart() {
    const canvas = $("#financeChart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const ratio = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth || 900;
    const cssH = canvas.clientHeight || 320;
    canvas.width = cssW * ratio;
    canvas.height = cssH * ratio;
    ctx.scale(ratio, ratio);
    ctx.clearRect(0, 0, cssW, cssH);
    const stockCost = state.data.materials.reduce((acc, m) => acc + (Number(m.stock || 0) * Number(m.custo || 0)), 0);
    const stockSaleValue = state.data.materials.reduce((acc, m) => acc + (Number(m.stock || 0) * Number(m.preco || 0)), 0);
    const values = [
      { label: "Vendas", value: sum(state.data.sales, "valor") },
      { label: "Compras", value: sum(state.data.purchases, "valor") },
      { label: "Stock custo", value: stockCost },
      { label: "Margem stock", value: Math.max(0, stockSaleValue - stockCost) }
    ];
    const max = Math.max(...values.map(v => v.value), 1);
    const pad = 28;
    const barW = Math.min(90, (cssW - pad * 2) / values.length - 26);
    ctx.font = "700 13px system-ui";
    values.forEach((item, i) => {
      const x = pad + i * ((cssW - pad * 2) / values.length) + 18;
      const h = ((cssH - 92) * item.value) / max;
      const y = cssH - 52 - h;
      ctx.fillStyle = ["#0f5132", "#b7791f", "#2f855a", "#1f5fbf"][i % 4];
      roundRect(ctx, x, y, barW, h, 14);
      ctx.fill();
      ctx.fillStyle = "#10221a";
      ctx.fillText(item.label, x, cssH - 24);
      ctx.fillStyle = "#607069";
      ctx.fillText(currency.format(item.value), x, y - 10);
    });
  }

  function roundRect(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function quoteTotal(q) {
    const materials = q.materials.reduce((sum, m) => sum + Number(m.qty) * Number(m.price), 0);
    const labor = Number(q.laborHours) * Number(q.laborRate);
    const subtotal = materials + labor;
    const withMargin = subtotal * (1 + Number(q.margin) / 100);
    return withMargin * (1 + Number(q.vat) / 100);
  }

  function nextQuoteNumber() {
    const next = state.data.quotes.length + 22;
    return `ORC-2026-${String(next).padStart(3, "0")}`;
  }

  function clientById(id) { return state.data.clients.find(c => c.id === id); }
  function projectById(id) { return state.data.projects.find(p => p.id === id); }
  function sum(arr, key) { return arr.reduce((a, b) => a + Number(b[key] || 0), 0); }
  function uid(prefix) { return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`; }
  function status(text, cls = "") { return `<span class="status ${cls || ""}">${escapeHtml(text)}</span>`; }
  function emptyRow(cols, text) { return `<tr><td colspan="${cols}"><p class="muted">${escapeHtml(text)}</p></td></tr>`; }
  function formatDate(value) { return value ? new Date(value + "T00:00:00").toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" }) : "—"; }
  function escapeHtml(str) { return String(str ?? "").replace(/[&<>'"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c])); }
  function escapeAttr(str) { return escapeHtml(str).replace(/`/g, "&#96;"); }

  window.addEventListener("resize", () => {
    if (state.session && (state.page === "dashboard" || state.page === "financas")) drawFinanceChart();
  });

  init();
})();
