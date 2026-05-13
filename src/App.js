// Cole este arquivo em src/App.js
// Versão com design profissional mantendo a mesma lógica e APIs.
// IMPORTANTE: este arquivo preserva a estrutura atual do painel e altera principalmente o layout/visual.

import React, { useCallback, useEffect, useMemo, useState } from "react";

const API_BASE =
  "https://script.google.com/macros/s/AKfycbzpxMBPabGe5Xk16KQBmqmC7_SDzJrncmiAqTgU_Y0az1IkDzUawCW3qQ1gHCrutqlv/exec";

const LINK_APP_SOLICITAR =
  "https://script.google.com/a/macros/bbdi.com.br/s/AKfycbw_60TLX8mspcA1pjnX9XM5vOpFWh05Sps_ESjlQGTcUijq7Wlzd_O1UF6ChPtwkEXK/exec";

const LINK_APP_GESTAO =
  "https://script.google.com/a/macros/bbdi.com.br/s/AKfycbw_60TLX8mspcA1pjnX9XM5vOpFWh05Sps_ESjlQGTcUijq7Wlzd_O1UF6ChPtwkEXK/exec?page=gestao";

const LINK_APP_AJUSTE_SALDO =
  "https://script.google.com/a/macros/bbdi.com.br/s/AKfycby7AXNqbSs5ZRnLYa22oCk68S-i2Wuz_Nd8B-c1seLu6qdvfgdX1LvbA2p1Dww7FESZoA/exec";

const LOGIN_USUARIO = "BBDI";
const LOGIN_SENHA = "BBDI@2026";
const LOGIN_STORAGE_KEY = "painel_operacional_logado";

const FONTES_FATURAMENTO = [
  { key: "equipatech", nome: "Equipatech" },
  { key: "bbbaterias", nome: "BBBaterias" },
];

const FILTROS_FATURAMENTO_INICIAIS = {
  empresa: "",
  pedido: "",
  filial: "",
  dataLiberacao: "",
  quantidade: "",
  status: "",
  tempoPedido: "",
  dataPrazo: "",
  tempoRestanteCategoria: "",
  lista: "",
  faturador: "",
  statusSeparacao: "",
};

const FILTROS_ESTOQUE_INICIAIS = {
  status: "",
  produto: "",
  quantidade: "",
  filial: "",
  pedido: "",
  c5Desctrs: "",
  unidadeFaturamento: "",
  dataHoraFinanceiro: "",
  dataLancamento: "",
  dataHoraEntregueEstoque: "",
};

const FILTROS_CONSULTA_PECAS_INICIAIS = {
  id: "",
  dataHora: "",
  vendedor: "",
  codigoPeca: "",
  tipoSolicitacao: "",
  status: "",
  tempoAguardando: "",
  acaoEstoque: "",
  dataResposta: "",
  respondidoPor: "",
  filial: "",
};

const FILTROS_AJUSTE_SALDO_INICIAIS = {
  data: "",
  solicitante: "",
  produto: "",
  lote: "",
  estoqueFisico: "",
  inventarioProtheus: "",
  ajusteSaldo: "",
  status: "",
  dataAjuste: "",
};

const FILTROS_AJUSTE_SALDO_BB_INICIAIS = {
  dataHora: "",
  nomes: "",
  produto: "",
  lote: "",
  estoqueFisico: "",
  inventarioProtheus: "",
  ajusteSaldo: "",
  status: "",
  dataHoraAjuste: "",
};

const FILTROS_PRODUCAO_INICIAIS = {
  dataHoraFinanceiro: "",
  pedido: "",
  cliente: "",
  produto: "",
  quantidadeLiberada: "",
  equipa01: "",
  equipa98: "",
  bbbaterias01: "",
  transporte: "",
  status: "",
};

const FILTROS_PRODUCAO_RESUMO_INICIAIS = {
  pedido: "",
  cliente: "",
  quantidadeTotal: "",
  totalItens: "",
  produzir: "",
  avisarVendedor: "",
  naoProduzir: "",
  transportes: "",
  statusResumo: "",
};

function normalizar(texto) {
  return String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function parseDataBR(dataTexto) {
  if (!dataTexto) return null;

  const texto = String(dataTexto).trim();
  const partes = texto.match(
    /^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})(?::(\d{2}))?$/
  );

  if (!partes) return null;

  const [, dia, mes, ano, hora, minuto, segundo = "0"] = partes;

  return new Date(
    Number(ano),
    Number(mes) - 1,
    Number(dia),
    Number(hora),
    Number(minuto),
    Number(segundo)
  );
}

function calcularTempoRestante(dataPrazo, agora) {
  const prazo = parseDataBR(dataPrazo);

  if (!prazo) {
    return {
      texto: "-",
      atrasado: false,
      urgente: false,
      categoria: "Sem prazo",
    };
  }

  const diffMs = prazo.getTime() - agora.getTime();
  const atrasado = diffMs < 0;
  const totalSegundos = Math.floor(Math.abs(diffMs) / 1000);

  const dias = Math.floor(totalSegundos / 86400);
  const horas = Math.floor((totalSegundos % 86400) / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;

  let texto = "";

  if (dias > 0) {
    texto = `${dias}d ${horas}h ${minutos}min`;
  } else if (horas > 0) {
    texto = `${horas}h ${minutos}min ${segundos}s`;
  } else {
    texto = `${minutos}min ${segundos}s`;
  }

  const urgente = !atrasado && totalSegundos <= 3600;

  let categoria = "No prazo";

  if (atrasado) {
    categoria = "Atrasado";
  } else if (urgente) {
    categoria = "Vence em menos de 1h";
  }

  return {
    texto: atrasado ? `Atrasado há ${texto}` : texto,
    atrasado,
    urgente,
    categoria,
  };
}

function parseDataPeriodo(valor) {
  if (!valor) return null;

  if (valor instanceof Date && !Number.isNaN(valor.getTime())) {
    return valor;
  }

  const texto = String(valor).trim();

  const partesBR = texto.match(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})(?:[ ]+([0-9]{2}):([0-9]{2})(?::([0-9]{2}))?)?$/);

  if (partesBR) {
    const dia = partesBR[1];
    const mes = partesBR[2];
    const ano = partesBR[3];
    const hora = partesBR[4] || "0";
    const minuto = partesBR[5] || "0";
    const segundo = partesBR[6] || "0";

    return new Date(
      Number(ano),
      Number(mes) - 1,
      Number(dia),
      Number(hora),
      Number(minuto),
      Number(segundo)
    );
  }

  const data = new Date(texto);
  return Number.isNaN(data.getTime()) ? null : data;
}

function inicioDoDia(data) {
  const d = new Date(data);
  d.setHours(0, 0, 0, 0);
  return d;
}

function fimDoDia(data) {
  const d = new Date(data);
  d.setHours(23, 59, 59, 999);
  return d;
}

function obterDataDoItem(item, campoData) {
  const campos = Array.isArray(campoData) ? campoData : [campoData];

  for (const campo of campos) {
    const data = parseDataPeriodo(item[campo]);
    if (data) return data;
  }

  return null;
}

function filtrarPorPeriodo(dados, campoData, periodo, diasPeriodo) {
  if (!periodo || periodo === "todos") return dados;

  const hoje = new Date();
  let inicio = null;
  let fim = null;

  if (periodo === "hoje") {
    inicio = inicioDoDia(hoje);
    fim = fimDoDia(hoje);
  }

  if (periodo === "ontem") {
    const ontem = new Date(hoje);
    ontem.setDate(ontem.getDate() - 1);
    inicio = inicioDoDia(ontem);
    fim = fimDoDia(ontem);
  }

  if (periodo === "ultimos") {
    const dias = Math.max(1, Number(diasPeriodo || 7));
    inicio = inicioDoDia(hoje);
    inicio.setDate(inicio.getDate() - (dias - 1));
    fim = fimDoDia(hoje);
  }

  if (!inicio || !fim) return dados;

  return dados.filter((item) => {
    const data = obterDataDoItem(item, campoData);
    if (!data) return false;
    return data >= inicio && data <= fim;
  });
}

function filtrarDados(dados, busca, filtros, camposBusca) {
  const termo = normalizar(busca);

  return dados.filter((item) => {
    const buscaOk =
      !termo ||
      camposBusca.some((campo) => normalizar(item[campo]).includes(termo));

    const filtrosOk = Object.entries(filtros).every(([campo, valor]) => {
      return !valor || String(item[campo] ?? "") === String(valor);
    });

    return buscaOk && filtrosOk;
  });
}

function opcoesUnicas(dados, campo) {
  return [
    ...new Set(
      dados
        .map((item) => item[campo])
        .filter(
          (valor) =>
            valor !== undefined &&
            valor !== null &&
            String(valor).trim() !== ""
        )
    ),
  ].sort((a, b) => String(a).localeCompare(String(b), "pt-BR"));
}

function Badge({ texto, tipo }) {
  const cores = {
    verde: { bg: "#DCFCE7", color: "#166534", border: "#BBF7D0" },
    vermelho: { bg: "#FEE2E2", color: "#991B1B", border: "#FECACA" },
    azul: { bg: "#DBEAFE", color: "#1E40AF", border: "#BFDBFE" },
    laranja: { bg: "#FFEDD5", color: "#9A3412", border: "#FED7AA" },
    cinza: { bg: "#F1F5F9", color: "#475569", border: "#E2E8F0" },
  };

  const cor = cores[tipo] || cores.cinza;

  return (
    <span
      style={{
        background: cor.bg,
        color: cor.color,
        border: `1px solid ${cor.border}`,
        padding: "3px 7px",
        borderRadius: 8,
        fontSize: 10,
        fontWeight: 800,
        whiteSpace: "nowrap",
        letterSpacing: "0.01em",
      }}
    >
      {texto || "-"}
    </span>
  );
}

function tipoStatus(status) {
  const s = normalizar(status);

  if (s.includes("separacao nao iniciada")) return "vermelho";
  if (s.includes("separação não iniciada")) return "vermelho";
  if (s.includes("em separacao")) return "laranja";
  if (s.includes("em separação")) return "laranja";
  if (s.includes("separacao concluida")) return "verde";
  if (s.includes("separação concluída")) return "verde";
  if (s.includes("concluido")) return "verde";
  if (s.includes("concluído")) return "verde";
  if (s.includes("concluida")) return "verde";
  if (s.includes("concluída")) return "verde";

  if (s.includes("avisar vendedor")) return "vermelho";
  if (s === "produzir") return "azul";
  if (s.includes("nao produzir")) return "verde";
  if (s.includes("não produzir")) return "verde";
  if (s.includes("no prazo")) return "verde";
  if (s.includes("atras")) return "vermelho";
  if (s.includes("entregue")) return "verde";
  if (s.includes("disponivel")) return "verde";
  if (s.includes("indisponivel")) return "vermelho";
  if (s.includes("aguardando")) return "laranja";
  if (s.includes("pendente")) return "vermelho";
  if (s.includes("verificando saldo")) return "laranja";
  if (s.includes("ajustado")) return "verde";
  if (s.includes("resolvido")) return "verde";

  return "cinza";
}

function tipoSeparacao(status) {
  const s = normalizar(status);

  if (!s) return "cinza";
  if (s.includes("conclu")) return "verde";
  if (s.includes("entregue")) return "verde";
  if (s.includes("nao iniciada")) return "vermelho";
  if (s.includes("pedido de venda")) return "azul";

  return "cinza";
}

function aplicarStatusSeparacaoEstoque(dados) {
  const grupos = new Map();

  dados.forEach((item, index) => {
    const pedido = String(item.pedido || `sem-pedido-${index}`).trim();

    if (!grupos.has(pedido)) {
      grupos.set(pedido, []);
    }

    grupos.get(pedido).push(item);
  });

  const statusPorPedido = new Map();

  grupos.forEach((itens, pedido) => {
    const totalItens = itens.length;
    const totalEntregues = itens.filter((item) =>
      normalizar(item.status).includes("entregue")
    ).length;

    let situacaoPedido = "Separação não iniciada";

    if (totalEntregues === totalItens && totalItens > 0) {
      situacaoPedido = "Separação concluída";
    } else if (totalEntregues > 0) {
      situacaoPedido = "Em separação";
    }

    statusPorPedido.set(pedido, situacaoPedido);
  });

  return dados.map((item, index) => {
    const pedido = String(item.pedido || `sem-pedido-${index}`).trim();
    const situacaoPedido = statusPorPedido.get(pedido) || "Separação não iniciada";
    const statusOriginal = item.status || "";
    const itemEntregue = normalizar(statusOriginal).includes("entregue");

    let statusCalculado = situacaoPedido;

    if (situacaoPedido === "Em separação" && itemEntregue) {
      statusCalculado = statusOriginal;
    }

    return {
      ...item,
      statusOriginal,
      status: statusCalculado,
    };
  });
}

function tipoTempoRestante(resultado) {
  if (resultado.atrasado) return "vermelho";
  if (resultado.urgente) return "laranja";
  if (resultado.texto === "-") return "cinza";

  return "verde";
}

function Kpi({ titulo, valor, subtitulo, onClick, ativo }) {
  return (
    <div
      onClick={onClick}
      title={onClick ? "Clique para filtrar" : undefined}
      style={{
        ...kpiStyle,
        cursor: onClick ? "pointer" : "default",
        border: ativo ? "1px solid #2563EB" : kpiStyle.border,
        boxShadow: ativo
          ? "0 18px 42px rgba(37,99,235,0.16)"
          : kpiStyle.boxShadow,
        transform: ativo ? "translateY(-1px)" : "none",
      }}
    >
      <div style={kpiTopLineStyle} />
      <div style={kpiLabelStyle}>{titulo}</div>
      <div style={kpiValueStyle}>{valor ?? 0}</div>
      {subtitulo && <div style={kpiSubLabelStyle}>{subtitulo}</div>}
      {onClick && <div style={kpiClickHintStyle}>Clique para filtrar</div>}
    </div>
  );
}

function CabecalhoComFiltro({ titulo, value, onChange, options, sortOrder, onSort }) {
  const temFiltro = value !== "";

  return (
    <div style={headerFilterWrapperStyle}>
      <span>{titulo}</span>

      <button
        type="button"
        onClick={onSort}
        title={`Ordenar ${titulo}`}
        style={{
          ...sortButtonStyle,
          background: sortOrder ? "#DBEAFE" : "#FFFFFF",
          border: sortOrder ? "1px solid #2563EB" : "1px solid #CBD5E1",
          color: sortOrder ? "#1D4ED8" : "#64748B",
        }}
      >
        {sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : "↕"}
      </button>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        title={`Filtrar ${titulo}`}
        style={{
          ...filterSelectStyle,
          border: temFiltro ? "1px solid #2563EB" : "1px solid #CBD5E1",
          background: temFiltro ? "#EFF6FF" : "#FFFFFF",
        }}
      >
        <option value=""></option>

        {options.map((opcao) => (
          <option key={opcao} value={opcao} style={{ color: "#0F172A" }}>
            {opcao}
          </option>
        ))}
      </select>
    </div>
  );
}

function MenuButton({ ativo, onClick, children, icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...menuButtonStyle,
        color: ativo ? "#FFFFFF" : "#CBD5E1",
        background: ativo
          ? "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)"
          : "transparent",
        border: ativo ? "1px solid rgba(255,255,255,0.20)" : "1px solid transparent",
        boxShadow: ativo ? "0 12px 28px rgba(37,99,235,0.28)" : "none",
      }}
    >
      <span style={menuIconStyle(ativo)}>{icon || "•"}</span>
      <span style={{ flex: 1 }}>{children}</span>
    </button>
  );
}

function MenuGroupButton({ ativo, onClick, children, icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...menuButtonStyle,
        color: ativo ? "#FFFFFF" : "#CBD5E1",
        background: ativo
          ? "linear-gradient(135deg, rgba(37,99,235,0.96) 0%, rgba(30,64,175,0.96) 100%)"
          : "transparent",
        border: ativo ? "1px solid rgba(147,197,253,0.26)" : "1px solid transparent",
        boxShadow: ativo ? "0 14px 30px rgba(37,99,235,0.24)" : "none",
      }}
    >
      <span style={menuIconStyle(ativo)}>{icon || "•"}</span>
      <span style={{ flex: 1 }}>{children}</span>
      <span style={menuChevronStyle(ativo)}>{ativo ? "⌄" : "›"}</span>
    </button>
  );
}

function SubMenuButton({ ativo, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...subMenuButtonStyle,
        color: ativo ? "#EAF2FF" : "#94A3B8",
        background: ativo ? "rgba(37, 99, 235, 0.18)" : "transparent",
        borderLeft: ativo ? "3px solid #60A5FA" : "3px solid rgba(148,163,184,0.25)",
      }}
    >
      {children}
    </button>
  );
}

function BotaoLink({ href, children, variante = "primario" }) {
  const primario = variante === "primario";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        ...actionLinkStyle,
        background: primario ? "#2563EB" : "#FFFFFF",
        color: primario ? "#FFFFFF" : "#0F172A",
        border: primario ? "1px solid #2563EB" : "1px solid #CBD5E1",
      }}
    >
      {children}
    </a>
  );
}

function ContadorRegistros({ filtrados, total }) {
  return (
    <span style={recordCounterStyle}>
      {filtrados} de {total} registros
    </span>
  );
}

function obterValorOrdenacao(valor) {
  if (valor === null || valor === undefined || valor === "") return "";

  const texto = String(valor).trim();
  const data = parseDataBR(texto);

  if (data) return data.getTime();

  const numero = Number(
    texto
      .split(".").join("")
      .replace(",", ".")
      .replace(/[^0-9.-]/g, "")
  );

  if (!Number.isNaN(numero) && /[0-9]/.test(texto)) {
    return numero;
  }

  return normalizar(texto);
}

function ordenarDados(dados, sortConfig) {
  if (!sortConfig.campo || !sortConfig.direcao) return dados;

  return [...dados].sort((a, b) => {
    const valorA = obterValorOrdenacao(a[sortConfig.campo]);
    const valorB = obterValorOrdenacao(b[sortConfig.campo]);

    if (valorA === "" && valorB !== "") return 1;
    if (valorA !== "" && valorB === "") return -1;
    if (valorA === "" && valorB === "") return 0;

    let resultado = 0;

    if (typeof valorA === "number" && typeof valorB === "number") {
      resultado = valorA - valorB;
    } else {
      resultado = String(valorA).localeCompare(String(valorB), "pt-BR", {
        numeric: true,
        sensitivity: "base",
      });
    }

    return sortConfig.direcao === "asc" ? resultado : -resultado;
  });
}

function proximaDirecaoOrdenacao(sortConfig, campo) {
  if (sortConfig.campo !== campo) return "asc";
  if (sortConfig.direcao === "asc") return "desc";
  if (sortConfig.direcao === "desc") return "";
  return "asc";
}

function TabelaPadrao({
  titulo,
  dadosBase,
  dadosFiltrados,
  colunas,
  filtros,
  onFiltro,
  carregando,
  mensagemVazia,
}) {
  const [sortConfig, setSortConfig] = useState({ campo: "", direcao: "" });

  const dadosOrdenados = useMemo(() => {
    return ordenarDados(dadosFiltrados, sortConfig);
  }, [dadosFiltrados, sortConfig]);

  function alterarOrdenacao(campo) {
    setSortConfig((atual) => ({
      campo,
      direcao: proximaDirecaoOrdenacao(atual, campo),
    }));
  }

  return (
    <section style={tableSectionStyle}>
      <div style={tableHeaderStyle}>
        <div>
          <div style={tableTitleStyle}>{titulo}</div>
          <div style={tableSubtitleStyle}>Dados atualizados conforme origem da planilha</div>
        </div>
        <ContadorRegistros
          filtrados={dadosFiltrados.length}
          total={dadosBase.length}
        />
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {colunas.map((coluna) => (
                <th
                  key={coluna.campo}
                  style={{
                    ...th,
                    width: coluna.width,
                    minWidth: coluna.minWidth || coluna.width,
                    maxWidth: coluna.maxWidth,
                  }}
                >
                  <CabecalhoComFiltro
                    titulo={coluna.titulo}
                    value={filtros[coluna.campo] || ""}
                    onChange={(valor) => onFiltro(coluna.campo, valor)}
                    options={opcoesUnicas(dadosBase, coluna.campo)}
                    sortOrder={sortConfig.campo === coluna.campo ? sortConfig.direcao : ""}
                    onSort={() => alterarOrdenacao(coluna.campo)}
                  />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {carregando && dadosOrdenados.length === 0 && (
              <tr>
                <td colSpan={colunas.length} style={tdCentro}>
                  Carregando dados...
                </td>
              </tr>
            )}

            {!carregando && dadosOrdenados.length === 0 && (
              <tr>
                <td colSpan={colunas.length} style={tdCentro}>
                  {mensagemVazia}
                </td>
              </tr>
            )}

            {dadosOrdenados.map((item, index) => (
              <tr
                key={`${titulo}-${index}`}
                style={{
                  borderTop: "1px solid #E2E8F0",
                  background: index % 2 === 0 ? "#FFFFFF" : "#FBFDFF",
                }}
              >
                {colunas.map((coluna) => (
                  <td
                    key={coluna.campo}
                    style={{
                      ...(coluna.bold ? tdBold : td),
                      width: coluna.width,
                      minWidth: coluna.minWidth || coluna.width,
                      maxWidth: coluna.maxWidth,
                      whiteSpace: coluna.wrap ? "normal" : "nowrap",
                      lineHeight: coluna.wrap ? 1.25 : undefined,
                    }}
                  >
                    {coluna.render
                      ? coluna.render(item)
                      : item[coluna.campo] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PageHeader({ titulo, descricao, atualizadoEm, extraInfo, actions }) {
  return (
    <header style={pageHeaderStyle}>
      <div>
        <div style={breadcrumbStyle}>Painel Operacional</div>
        <h1 style={titleStyle}>{titulo}</h1>
        <p style={subtitleStyle}>{descricao}</p>

        {(atualizadoEm || extraInfo) && (
          <div style={metaBoxStyle}>
            {atualizadoEm && (
              <span>
                Última atualização: <strong>{atualizadoEm}</strong>
              </span>
            )}
            {extraInfo}
          </div>
        )}
      </div>

      {actions && <div style={headerActionsStyle}>{actions}</div>}
    </header>
  );
}

function TelaLogin({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function entrar(e) {
    e.preventDefault();

    const usuarioOk = usuario.trim().toUpperCase() === LOGIN_USUARIO;
    const senhaOk = senha === LOGIN_SENHA;

    if (!usuarioOk || !senhaOk) {
      setErro("Usuário ou senha inválidos.");
      return;
    }

    localStorage.setItem(LOGIN_STORAGE_KEY, "true");
    onLogin();
  }

  return (
    <div style={loginPageStyle}>
      <form onSubmit={entrar} style={loginCardStyle}>
        <div style={loginBrandBoxStyle}>
          <div style={loginBrandIconStyle}>B</div>
          <div>
            <h1 style={loginTitleStyle}>Painel Operacional</h1>
            <p style={loginSubtitleStyle}>Acesso interno Grupo BBDI</p>
          </div>
        </div>

        <label style={labelLoginStyle}>Usuário</label>
        <input
          value={usuario}
          onChange={(e) => {
            setUsuario(e.target.value);
            setErro("");
          }}
          placeholder="Digite o usuário"
          autoComplete="username"
          style={inputLoginStyle}
        />

        <label style={labelLoginStyle}>Senha</label>
        <input
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setErro("");
          }}
          placeholder="Digite a senha"
          type="password"
          autoComplete="current-password"
          style={inputLoginStyle}
        />

        {erro && <div style={loginErrorStyle}>{erro}</div>}

        <button type="submit" style={buttonLoginStyle}>
          Entrar
        </button>

        <div style={loginFootnoteStyle}>
          Ambiente de visualização operacional. As informações exibidas são
          extraídas das bases conectadas ao Apps Script.
        </div>
      </form>
    </div>
  );
}

function TelaFaturamento() {
  const [dados, setDados] = useState([]);
  const [atualizacoes, setAtualizacoes] = useState({});
  const [busca, setBusca] = useState("");
  const [periodoFiltro, setPeriodoFiltro] = useState("todos");
  const [diasPeriodo, setDiasPeriodo] = useState("7");
  const [filtrosColuna, setFiltrosColuna] = useState(
    FILTROS_FATURAMENTO_INICIAIS
  );
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setAgora(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      const respostas = await Promise.all(
        FONTES_FATURAMENTO.map(async (fonte) => {
          const url = `${API_BASE}?action=dados&fonte=${fonte.key}`;
          const resposta = await fetch(url);
          const json = await resposta.json();

          if (!json.ok) {
            throw new Error(json.erro || `Erro ao carregar ${fonte.nome}.`);
          }

          return {
            fonte: fonte.key,
            nomeFonte: fonte.nome,
            atualizadoEm: json.atualizadoEm || "",
            dados: (json.dados || []).map((item) => ({
              ...item,
              empresa: fonte.nome,
              fonte: fonte.key,
            })),
          };
        })
      );

      const todosDados = respostas.flatMap((resposta) => resposta.dados);

      const atualizacaoPorFonte = {};
      respostas.forEach((resposta) => {
        atualizacaoPorFonte[resposta.nomeFonte] = resposta.atualizadoEm;
      });

      setDados(todosDados);
      setAtualizacoes(atualizacaoPorFonte);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();

    const intervalo = setInterval(() => {
      carregarDados();
    }, 60000);

    return () => clearInterval(intervalo);
  }, [carregarDados]);

  function alterarFiltroColuna(campo, valor) {
    setFiltrosColuna((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  function limparFiltros() {
    setBusca("");
    setPeriodoFiltro("todos");
    setDiasPeriodo("7");
    setFiltrosColuna(FILTROS_FATURAMENTO_INICIAIS);
  }

  function filtrarCardFaturamento(empresa, categoriaTempo) {
    setBusca("");
    setFiltrosColuna({
      ...FILTROS_FATURAMENTO_INICIAIS,
      empresa,
      tempoRestanteCategoria: categoriaTempo || "",
    });
  }

  const dadosComTempo = useMemo(() => {
    return dados.map((item) => {
      const tempoCalculado = calcularTempoRestante(item.dataPrazo, agora);

      return {
        ...item,
        tempoRestanteCalculado: tempoCalculado.texto,
        tempoRestanteAtrasado: tempoCalculado.atrasado,
        tempoRestanteUrgente: tempoCalculado.urgente,
        tempoRestanteCategoria: tempoCalculado.categoria,
      };
    });
  }, [dados, agora]);

  const dadosPeriodo = useMemo(() => {
    return filtrarPorPeriodo(dadosComTempo, "dataLiberacao", periodoFiltro, diasPeriodo);
  }, [dadosComTempo, periodoFiltro, diasPeriodo]);

  const dadosFiltrados = useMemo(() => {
    return filtrarDados(dadosPeriodo, busca, filtrosColuna, [
      "empresa",
      "pedido",
      "filial",
      "dataLiberacao",
      "quantidade",
      "status",
      "tempoPedido",
      "dataPrazo",
      "tempoRestanteCalculado",
      "lista",
      "faturador",
      "statusSeparacao",
    ]);
  }, [dadosPeriodo, busca, filtrosColuna]);

  const kpis = useMemo(() => {
    return {
      totalEquipatech: dadosFiltrados.filter(
        (item) => item.fonte === "equipatech"
      ).length,
      vencemMenos1HoraEquipatech: dadosFiltrados.filter(
        (item) => item.fonte === "equipatech" && item.tempoRestanteUrgente
      ).length,
      totalBBBaterias: dadosFiltrados.filter(
        (item) => item.fonte === "bbbaterias"
      ).length,
      vencemMenos1HoraBBBaterias: dadosFiltrados.filter(
        (item) => item.fonte === "bbbaterias" && item.tempoRestanteUrgente
      ).length,
    };
  }, [dadosFiltrados]);

  const colunas = [
    { campo: "filial", titulo: "Filial", bold: true, width: 54 },
    { campo: "pedido", titulo: "Pedido", bold: true, width: 74 },
    { campo: "dataLiberacao", titulo: "Data Lib.", width: 108 },
    { campo: "quantidade", titulo: "Qtd", width: 52 },
    {
      campo: "status",
      titulo: "Status",
      width: 94,
      render: (item) => (
        <Badge texto={item.status} tipo={tipoStatus(item.status)} />
      ),
    },
    { campo: "tempoPedido", titulo: "Tempo", width: 82 },
    { campo: "dataPrazo", titulo: "Prazo", width: 108 },
    {
      campo: "tempoRestanteCategoria",
      titulo: "Restante",
      bold: true,
      width: 122,
      render: (item) => (
        <Badge
          texto={item.tempoRestanteCalculado}
          tipo={tipoTempoRestante({
            texto: item.tempoRestanteCalculado,
            atrasado: item.tempoRestanteAtrasado,
            urgente: item.tempoRestanteUrgente,
          })}
        />
      ),
    },
    { campo: "lista", titulo: "Lista", width: 82 },
    { campo: "faturador", titulo: "Faturador", width: 92, wrap: true },
    {
      campo: "statusSeparacao",
      titulo: "Separação",
      width: 126,
      render: (item) => (
        <Badge
          texto={item.statusSeparacao}
          tipo={tipoSeparacao(item.statusSeparacao)}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        titulo="Faturamento"
        descricao="Pedidos da liberação via leitor Equipatech e BBBaterias."
        extraInfo={
          <>
            <span>Equipatech: <strong>{atualizacoes.Equipatech || "não informado"}</strong></span>
            <span>BBBaterias: <strong>{atualizacoes.BBBaterias || "não informado"}</strong></span>
            <span>Relógio: <strong>{agora.toLocaleTimeString("pt-BR")}</strong></span>
          </>
        }
        actions={
          <button
            onClick={carregarDados}
            disabled={carregando}
            style={buttonAtualizarStyle(carregando)}
          >
            {carregando ? "Atualizando..." : "Atualizar"}
          </button>
        }
      />

      {erro && <div style={erroStyle}>{erro}</div>}

      <section style={grid4Style}>
        <Kpi
          titulo="Total Pedidos Equipatech"
          valor={kpis.totalEquipatech}
          onClick={() => filtrarCardFaturamento("Equipatech")}
          ativo={filtrosColuna.empresa === "Equipatech" && !filtrosColuna.tempoRestanteCategoria}
        />
        <Kpi
          titulo="Vencem em menos de 1h Equipatech"
          valor={kpis.vencemMenos1HoraEquipatech}
          onClick={() => filtrarCardFaturamento("Equipatech", "Vence em menos de 1h")}
          ativo={filtrosColuna.empresa === "Equipatech" && filtrosColuna.tempoRestanteCategoria === "Vence em menos de 1h"}
        />
        <Kpi
          titulo="Total Pedidos BBBaterias"
          valor={kpis.totalBBBaterias}
          onClick={() => filtrarCardFaturamento("BBBaterias")}
          ativo={filtrosColuna.empresa === "BBBaterias" && !filtrosColuna.tempoRestanteCategoria}
        />
        <Kpi
          titulo="Vencem em menos de 1h BBBaterias"
          valor={kpis.vencemMenos1HoraBBBaterias}
          onClick={() => filtrarCardFaturamento("BBBaterias", "Vence em menos de 1h")}
          ativo={filtrosColuna.empresa === "BBBaterias" && filtrosColuna.tempoRestanteCategoria === "Vence em menos de 1h"}
        />
      </section>

      <FiltroTopo
        busca={busca}
        setBusca={setBusca}
        limparFiltros={limparFiltros}
        placeholder="Busca geral..."
        periodoFiltro={periodoFiltro}
        setPeriodoFiltro={setPeriodoFiltro}
        diasPeriodo={diasPeriodo}
        setDiasPeriodo={setDiasPeriodo}
      />

      <TabelaPadrao
        titulo="Pedidos"
        dadosBase={dadosComTempo}
        dadosFiltrados={dadosFiltrados}
        colunas={colunas}
        filtros={filtrosColuna}
        onFiltro={alterarFiltroColuna}
        carregando={carregando}
        mensagemVazia="Nenhum pedido encontrado."
      />
    </>
  );
}

function FiltroTopo({
  busca,
  setBusca,
  limparFiltros,
  placeholder,
  periodoFiltro,
  setPeriodoFiltro,
  diasPeriodo,
  setDiasPeriodo,
}) {
  const mostrarPeriodo = Boolean(setPeriodoFiltro);

  return (
    <section style={filtroTopoStyle}>
      <div style={mostrarPeriodo ? gridBuscaPeriodoStyle : gridBuscaStyle}>
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder={placeholder}
          style={inputBuscaStyle}
        />

        {mostrarPeriodo && (
          <>
            <select
              value={periodoFiltro}
              onChange={(e) => setPeriodoFiltro(e.target.value)}
              style={periodoSelectStyle}
              title="Filtrar por período"
            >
              <option value="todos">Todos</option>
              <option value="hoje">Hoje</option>
              <option value="ontem">Ontem</option>
              <option value="ultimos">Últimos X dias</option>
            </select>

            {periodoFiltro === "ultimos" && (
              <input
                type="number"
                min="1"
                value={diasPeriodo}
                onChange={(e) => setDiasPeriodo(e.target.value)}
                style={periodoDiasStyle}
                title="Quantidade de dias"
              />
            )}
          </>
        )}

        <button onClick={limparFiltros} style={buttonLimparStyle}>
          Limpar filtros
        </button>
      </div>
    </section>
  );
}

// As telas abaixo mantêm a mesma lógica, com o novo design aplicado pelos componentes e estilos.
// Para preservar estabilidade, a estrutura de API, filtros e nomes de campos continua igual.

function TelaEstoque() {
  const [dados, setDados] = useState([]);
  const [busca, setBusca] = useState("");
  const [periodoFiltro, setPeriodoFiltro] = useState("todos");
  const [diasPeriodo, setDiasPeriodo] = useState("7");
  const [filtrosColuna, setFiltrosColuna] = useState(FILTROS_ESTOQUE_INICIAIS);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [atualizadoEm, setAtualizadoEm] = useState("");

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      const resposta = await fetch(`${API_BASE}?action=dados&fonte=estoque`);
      const json = await resposta.json();

      if (!json.ok) throw new Error(json.erro || "Erro ao carregar estoque.");

      setDados(aplicarStatusSeparacaoEstoque(json.dados || []));
      setAtualizadoEm(json.atualizadoEm || "");
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
    const intervalo = setInterval(carregarDados, 60000);
    return () => clearInterval(intervalo);
  }, [carregarDados]);

  function alterarFiltroColuna(campo, valor) {
    setFiltrosColuna((prev) => ({ ...prev, [campo]: valor }));
  }

  function limparFiltros() {
    setBusca("");
    setPeriodoFiltro("todos");
    setDiasPeriodo("7");
    setFiltrosColuna(FILTROS_ESTOQUE_INICIAIS);
  }

  const dadosPeriodo = useMemo(() => {
    return filtrarPorPeriodo(
      dados,
      ["dataHoraFinanceiro", "dataLancamento", "dataHoraEntregueEstoque"],
      periodoFiltro,
      diasPeriodo
    );
  }, [dados, periodoFiltro, diasPeriodo]);

  const dadosFiltrados = useMemo(() => {
    return filtrarDados(dadosPeriodo, busca, filtrosColuna, [
      "status", "produto", "quantidade", "filial", "pedido", "c5Desctrs",
      "unidadeFaturamento", "dataHoraFinanceiro", "dataLancamento", "dataHoraEntregueEstoque",
    ]);
  }, [dadosPeriodo, busca, filtrosColuna]);

  const kpis = useMemo(() => {
    const totalItens = dadosFiltrados.length;
    const totalPedidosUnicos = new Set(dadosFiltrados.map((item) => item.pedido).filter(Boolean)).size;
    const entregues = dadosFiltrados.filter((item) =>
      normalizar(item.statusOriginal || item.status).includes("entregue")
    ).length;
    const pendentes = dadosFiltrados.filter(
      (item) => !normalizar(item.statusOriginal || item.status).includes("entregue")
    ).length;
    const quantidadeTotal = dadosFiltrados.reduce((total, item) => {
      const qtd = Number(String(item.quantidade || "0").replace(",", "."));
      return total + (isNaN(qtd) ? 0 : qtd);
    }, 0);
    return { totalItens, totalPedidosUnicos, entregues, pendentes, quantidadeTotal };
  }, [dadosFiltrados]);

  const colunas = [
    { campo: "status", titulo: "Status", width: 126, render: (item) => <Badge texto={item.status} tipo={tipoStatus(item.status)} /> },
    { campo: "produto", titulo: "Produto", bold: true, width: 180, wrap: true },
    { campo: "quantidade", titulo: "QTY", width: 52 },
    { campo: "filial", titulo: "Filial", width: 54 },
    { campo: "pedido", titulo: "Pedido", bold: true, width: 74 },
    { campo: "c5Desctrs", titulo: "C5", width: 95, wrap: true },
    { campo: "unidadeFaturamento", titulo: "Unid.", width: 68 },
    { campo: "dataHoraFinanceiro", titulo: "Financeiro", width: 112 },
    { campo: "dataLancamento", titulo: "Lançam.", width: 112 },
    { campo: "dataHoraEntregueEstoque", titulo: "Entregue", width: 112 },
  ];

  return (
    <>
      <PageHeader
        titulo="Estoque"
        descricao="Acompanhamento da separação dos pedidos."
        atualizadoEm={atualizadoEm || "não informado"}
        actions={<button onClick={carregarDados} disabled={carregando} style={buttonAtualizarStyle(carregando)}>{carregando ? "Atualizando..." : "Atualizar"}</button>}
      />
      {erro && <div style={erroStyle}>{erro}</div>}
      <section style={grid5Style}>
        <Kpi titulo="Total de Itens" valor={kpis.totalItens} />
        <Kpi titulo="Pedidos Únicos" valor={kpis.totalPedidosUnicos} />
        <Kpi titulo="Entregues" valor={kpis.entregues} />
        <Kpi titulo="Pendentes" valor={kpis.pendentes} />
        <Kpi titulo="Quantidade Total" valor={kpis.quantidadeTotal} />
      </section>
      <FiltroTopo
        busca={busca}
        setBusca={setBusca}
        limparFiltros={limparFiltros}
        placeholder="Busca geral no estoque..."
        periodoFiltro={periodoFiltro}
        setPeriodoFiltro={setPeriodoFiltro}
        diasPeriodo={diasPeriodo}
        setDiasPeriodo={setDiasPeriodo}
      />
      <TabelaPadrao titulo="Itens do Estoque" dadosBase={dados} dadosFiltrados={dadosFiltrados} colunas={colunas} filtros={filtrosColuna} onFiltro={alterarFiltroColuna} carregando={carregando} mensagemVazia="Nenhum item encontrado." />
    </>
  );
}

function criarTelaAjusteSaldo({ fonte, titulo, descricao, filtrosIniciais, camposBusca, colunas, kpiLabels, campoData, linkApp, labelApp }) {
  return function TelaAjusteSaldoGenerica() {
    const [dados, setDados] = useState([]);
    const [kpis, setKpis] = useState({});
    const [busca, setBusca] = useState("");
    const [periodoFiltro, setPeriodoFiltro] = useState("todos");
    const [diasPeriodo, setDiasPeriodo] = useState("7");
    const [filtrosColuna, setFiltrosColuna] = useState(filtrosIniciais);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const [atualizadoEm, setAtualizadoEm] = useState("");

    const carregarDados = useCallback(async () => {
      setCarregando(true);
      setErro("");
      try {
        const resposta = await fetch(`${API_BASE}?action=dados&fonte=${fonte}`);
        const json = await resposta.json();
        if (!json.ok) throw new Error(json.erro || `Erro ao carregar ${titulo}.`);
        setDados(json.dados || []);
        setKpis(json.kpis || {});
        setAtualizadoEm(json.atualizadoEm || "");
      } catch (e) {
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    }, []);

    useEffect(() => {
      carregarDados();
      const intervalo = setInterval(carregarDados, 60000);
      return () => clearInterval(intervalo);
    }, [carregarDados]);

    function alterarFiltroColuna(campo, valor) {
      setFiltrosColuna((prev) => ({ ...prev, [campo]: valor }));
    }

    function limparFiltros() {
      setBusca("");
      setPeriodoFiltro("todos");
      setDiasPeriodo("7");
      setFiltrosColuna(filtrosIniciais);
    }

    const dadosPeriodo = useMemo(() => {
      return filtrarPorPeriodo(dados, campoData, periodoFiltro, diasPeriodo);
    }, [dados, campoData, periodoFiltro, diasPeriodo]);

    const dadosFiltrados = useMemo(() => filtrarDados(dadosPeriodo, busca, filtrosColuna, camposBusca), [dadosPeriodo, busca, filtrosColuna]);

    const kpisPeriodo = useMemo(() => {
      if (fonte === "ajusteSaldo") {
        return {
          pendente: dadosFiltrados.filter((item) => normalizar(item.status).includes("pendente")).length,
          verificandoSaldo: dadosFiltrados.filter((item) => normalizar(item.status).includes("verificando saldo")).length,
        };
      }

      if (fonte === "ajusteSaldoBBBaterias") {
        return {
          pendente: dadosFiltrados.filter((item) => normalizar(item.status).includes("pendente")).length,
          resolvido: dadosFiltrados.filter((item) => normalizar(item.status).includes("resolvido")).length,
        };
      }

      return kpis;
    }, [dadosFiltrados, fonte, kpis]);

    return (
      <>
        <PageHeader
          titulo={titulo}
          descricao={descricao}
          atualizadoEm={atualizadoEm || "não informado"}
          actions={
            <>
              {linkApp && <BotaoLink href={linkApp}>{labelApp || "Abrir App"}</BotaoLink>}
              <button onClick={carregarDados} disabled={carregando} style={buttonAtualizarStyle(carregando)}>{carregando ? "Atualizando..." : "Atualizar"}</button>
            </>
          }
        />
        {erro && <div style={erroStyle}>{erro}</div>}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 20 }}>
          {kpiLabels.map((kpi) => <Kpi key={kpi.key} titulo={kpi.titulo} valor={kpisPeriodo[kpi.key]} />)}
        </section>
        <FiltroTopo
          busca={busca}
          setBusca={setBusca}
          limparFiltros={limparFiltros}
          placeholder={`Busca geral em ${titulo}...`}
          periodoFiltro={periodoFiltro}
          setPeriodoFiltro={setPeriodoFiltro}
          diasPeriodo={diasPeriodo}
          setDiasPeriodo={setDiasPeriodo}
        />
        <TabelaPadrao titulo={titulo} dadosBase={dados} dadosFiltrados={dadosFiltrados} colunas={colunas} filtros={filtrosColuna} onFiltro={alterarFiltroColuna} carregando={carregando} mensagemVazia="Nenhum registro encontrado." />
      </>
    );
  };
}

const TelaAjusteSaldo = criarTelaAjusteSaldo({
  fonte: "ajusteSaldo",
  campoData: ["data", "dataAjuste"],
  linkApp: LINK_APP_AJUSTE_SALDO,
  labelApp: "Abrir Ajuste",
  titulo: "Ajuste de Saldo - Equipatech",
  descricao: "Controle dos produtos enviados para conferência e ajuste de saldo.",
  filtrosIniciais: FILTROS_AJUSTE_SALDO_INICIAIS,
  camposBusca: ["data", "solicitante", "produto", "lote", "estoqueFisico", "inventarioProtheus", "ajusteSaldo", "status", "dataAjuste"],
  kpiLabels: [
    { key: "pendente", titulo: "Pendente" },
    { key: "verificandoSaldo", titulo: "Verificando Saldo" },
  ],
  colunas: [
    { campo: "data", titulo: "Data", width: 92 },
    { campo: "solicitante", titulo: "Solicit.", width: 110, wrap: true },
    { campo: "produto", titulo: "Produto", width: 180, wrap: true },
    { campo: "lote", titulo: "Lote", width: 78 },
    { campo: "estoqueFisico", titulo: "Físico", width: 68 },
    { campo: "inventarioProtheus", titulo: "Protheus", width: 76 },
    { campo: "ajusteSaldo", titulo: "Ajuste", width: 76 },
    { campo: "status", titulo: "Status", width: 118, render: (item) => <Badge texto={item.status} tipo={tipoStatus(item.status)} /> },
    { campo: "dataAjuste", titulo: "Dt Ajuste", width: 112 },
  ],
});

const TelaAjusteSaldoBBBaterias = criarTelaAjusteSaldo({
  fonte: "ajusteSaldoBBBaterias",
  campoData: "dataHora",
  titulo: "Ajuste de Saldo - BBBaterias",
  descricao: "Controle de divergências entre estoque físico e inventário Protheus.",
  filtrosIniciais: FILTROS_AJUSTE_SALDO_BB_INICIAIS,
  camposBusca: ["dataHora", "nomes", "produto", "lote", "estoqueFisico", "inventarioProtheus", "ajusteSaldo", "status", "dataHoraAjuste"],
  kpiLabels: [
    { key: "pendente", titulo: "Pendente" },
    { key: "resolvido", titulo: "Resolvido" },
  ],
  colunas: [
    { campo: "dataHora", titulo: "Data/Hora", width: 112 },
    { campo: "nomes", titulo: "Nomes", bold: true, width: 110, wrap: true },
    { campo: "produto", titulo: "Produto", bold: true, width: 180, wrap: true },
    { campo: "lote", titulo: "Lote", width: 78 },
    { campo: "estoqueFisico", titulo: "Físico", width: 68 },
    { campo: "inventarioProtheus", titulo: "Protheus", width: 76 },
    { campo: "ajusteSaldo", titulo: "Ajuste", bold: true, width: 78 },
    { campo: "status", titulo: "Status", width: 112, render: (item) => <Badge texto={item.status} tipo={tipoStatus(item.status)} /> },
    { campo: "dataHoraAjuste", titulo: "Dt Ajuste", width: 112 },
  ],
});

function TelaConsultaPecas() {
  const [dados, setDados] = useState([]);
  const [kpis, setKpis] = useState({});
  const [busca, setBusca] = useState("");
  const [periodoFiltro, setPeriodoFiltro] = useState("todos");
  const [diasPeriodo, setDiasPeriodo] = useState("7");
  const [filtrosColuna, setFiltrosColuna] = useState(FILTROS_CONSULTA_PECAS_INICIAIS);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [atualizadoEm, setAtualizadoEm] = useState("");

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro("");
    try {
      const resposta = await fetch(`${API_BASE}?action=dados&fonte=consultaPecas`);
      const json = await resposta.json();
      if (!json.ok) throw new Error(json.erro || "Erro ao carregar Consulta de Peças.");
      setDados(json.dados || []);
      setKpis(json.kpis || {});
      setAtualizadoEm(json.atualizadoEm || "");
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
    const intervalo = setInterval(carregarDados, 60000);
    return () => clearInterval(intervalo);
  }, [carregarDados]);

  function alterarFiltroColuna(campo, valor) {
    setFiltrosColuna((prev) => ({ ...prev, [campo]: valor }));
  }

  function limparFiltros() {
    setBusca("");
    setPeriodoFiltro("todos");
    setDiasPeriodo("7");
    setFiltrosColuna(FILTROS_CONSULTA_PECAS_INICIAIS);
  }

  const dadosPeriodo = useMemo(() => {
    return filtrarPorPeriodo(dados, "dataHora", periodoFiltro, diasPeriodo);
  }, [dados, periodoFiltro, diasPeriodo]);

  const dadosFiltrados = useMemo(() => filtrarDados(dadosPeriodo, busca, filtrosColuna, ["id", "dataHora", "vendedor", "codigoPeca", "tipoSolicitacao", "status", "tempoAguardando", "acaoEstoque", "dataResposta", "respondidoPor", "filial"]), [dadosPeriodo, busca, filtrosColuna]);

  const kpisPeriodo = useMemo(() => {
    return {
      aguardandoResposta: dadosFiltrados.filter((item) => item.aguardandoResposta === true).length,
      aguardandoMaisDe1h: dadosFiltrados.filter((item) => item.aguardandoMaisDe1h === true).length,
      respondidas: dadosFiltrados.filter((item) => item.respondida === true).length,
    };
  }, [dadosFiltrados]);

  const colunas = [
    { campo: "id", titulo: "ID", bold: true, width: 48 },
    { campo: "dataHora", titulo: "Data/Hora", width: 112 },
    { campo: "vendedor", titulo: "Vendedor", width: 108, wrap: true },
    { campo: "codigoPeca", titulo: "Peça", bold: true, width: 110 },
    { campo: "tipoSolicitacao", titulo: "Tipo", width: 92, wrap: true },
    { campo: "status", titulo: "Status", width: 112, render: (item) => <Badge texto={item.status} tipo={tipoStatus(item.status)} /> },
    { campo: "tempoAguardando", titulo: "Aguard.", bold: true, width: 86 },
    { campo: "acaoEstoque", titulo: "Ação", width: 116, wrap: true },
    { campo: "dataResposta", titulo: "Resposta", width: 112 },
    { campo: "respondidoPor", titulo: "Resp. por", width: 112, wrap: true },
    { campo: "filial", titulo: "Filial", bold: true, width: 54 },
  ];

  return (
    <>
      <PageHeader
        titulo="Consulta de Peças"
        descricao="Controle de solicitações pendentes, atrasadas e respondidas pelo estoque."
        atualizadoEm={atualizadoEm || "não informado"}
        actions={
          <>
            <BotaoLink href={LINK_APP_SOLICITAR}>Solicitar Peça</BotaoLink>
            <BotaoLink href={LINK_APP_GESTAO} variante="secundario">Gestão</BotaoLink>
            <button onClick={carregarDados} disabled={carregando} style={buttonAtualizarStyle(carregando)}>{carregando ? "Atualizando..." : "Atualizar"}</button>
          </>
        }
      />
      {erro && <div style={erroStyle}>{erro}</div>}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
        <Kpi titulo="Aguardando Resposta" valor={kpisPeriodo.aguardandoResposta} />
        <Kpi titulo="Aguardando há mais de 1h" valor={kpisPeriodo.aguardandoMaisDe1h} />
        <Kpi titulo="Respondidas" valor={kpisPeriodo.respondidas} />
      </section>
      <FiltroTopo
        busca={busca}
        setBusca={setBusca}
        limparFiltros={limparFiltros}
        placeholder="Busca geral na Consulta de Peças..."
        periodoFiltro={periodoFiltro}
        setPeriodoFiltro={setPeriodoFiltro}
        diasPeriodo={diasPeriodo}
        setDiasPeriodo={setDiasPeriodo}
      />
      <TabelaPadrao titulo="Solicitações" dadosBase={dados} dadosFiltrados={dadosFiltrados} colunas={colunas} filtros={filtrosColuna} onFiltro={alterarFiltroColuna} carregando={carregando} mensagemVazia="Nenhuma solicitação encontrada." />
    </>
  );
}

function gerarResumoProducaoLocal(dados) {
  const mapa = new Map();

  dados.forEach((item) => {
    const pedido = item.pedido || "-";

    if (!mapa.has(pedido)) {
      mapa.set(pedido, {
        pedido,
        cliente: item.cliente || "",
        quantidadeTotal: 0,
        totalItens: 0,
        produzir: 0,
        avisarVendedor: 0,
        naoProduzir: 0,
        transportesLista: new Set(),
        statusResumo: "",
      });
    }

    const registro = mapa.get(pedido);
    const quantidade = Number(item.quantidadeLiberadaNumero || item.quantidadeLiberada || 0);
    registro.quantidadeTotal += Number.isNaN(quantidade) ? 0 : quantidade;
    registro.totalItens += 1;

    const status = normalizar(item.status);

    if (status === "produzir") registro.produzir += 1;
    if (status.includes("avisar vendedor")) registro.avisarVendedor += 1;
    if (status.includes("nao produzir") || status.includes("não produzir")) registro.naoProduzir += 1;

    if (item.transporte) registro.transportesLista.add(item.transporte);
  });

  return Array.from(mapa.values()).map((item) => {
    let statusResumo = "Não produzir";
    if (item.avisarVendedor > 0) statusResumo = "Avisar vendedor";
    else if (item.produzir > 0) statusResumo = "Produzir";

    return {
      ...item,
      statusResumo,
      transportes: Array.from(item.transportesLista).join(", "),
      transportesLista: undefined,
    };
  });
}

function TelaProducao({ modo }) {
  const [dados, setDados] = useState([]);
  const [resumoPedidos, setResumoPedidos] = useState([]);
  const [kpis, setKpis] = useState({});
  const [busca, setBusca] = useState("");
  const [periodoFiltro, setPeriodoFiltro] = useState("todos");
  const [diasPeriodo, setDiasPeriodo] = useState("7");
  const [filtrosColuna, setFiltrosColuna] = useState(modo === "resumo" ? FILTROS_PRODUCAO_RESUMO_INICIAIS : FILTROS_PRODUCAO_INICIAIS);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [atualizadoEm, setAtualizadoEm] = useState("");

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro("");
    try {
      const resposta = await fetch(`${API_BASE}?action=dados&fonte=producao`);
      const json = await resposta.json();
      if (!json.ok) throw new Error(json.erro || "Erro ao carregar Produção.");
      setDados(json.dados || []);
      setResumoPedidos(json.resumoPedidos || []);
      setKpis(json.kpis || {});
      setAtualizadoEm(json.atualizadoEm || "");
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
    const intervalo = setInterval(carregarDados, 60000);
    return () => clearInterval(intervalo);
  }, [carregarDados]);

  useEffect(() => {
    setBusca("");
    setFiltrosColuna(modo === "resumo" ? FILTROS_PRODUCAO_RESUMO_INICIAIS : FILTROS_PRODUCAO_INICIAIS);
  }, [modo]);

  function alterarFiltroColuna(campo, valor) {
    setFiltrosColuna((prev) => ({ ...prev, [campo]: valor }));
  }

  function limparFiltros() {
    setBusca("");
    setPeriodoFiltro("todos");
    setDiasPeriodo("7");
    setFiltrosColuna(modo === "resumo" ? FILTROS_PRODUCAO_RESUMO_INICIAIS : FILTROS_PRODUCAO_INICIAIS);
  }

  const dadosPeriodo = useMemo(() => {
    return filtrarPorPeriodo(dados, "dataHoraFinanceiro", periodoFiltro, diasPeriodo);
  }, [dados, periodoFiltro, diasPeriodo]);

  const resumoPedidosPeriodo = useMemo(() => {
    return gerarResumoProducaoLocal(dadosPeriodo);
  }, [dadosPeriodo]);

  const dadosTabela = modo === "resumo" ? resumoPedidosPeriodo : dadosPeriodo;
  const telaResumo = modo === "resumo";

  const kpisPeriodo = useMemo(() => {
    const pedidosUnicos = new Set(dadosPeriodo.map((item) => item.pedido).filter(Boolean)).size;
    const produzir = dadosPeriodo.filter((item) => normalizar(item.status) === "produzir").length;
    const avisarVendedor = dadosPeriodo.filter((item) => normalizar(item.status).includes("avisar vendedor")).length;

    return { pedidosUnicos, produzir, avisarVendedor };
  }, [dadosPeriodo]);

  const dadosFiltrados = useMemo(() => {
    if (modo === "resumo") {
      return filtrarDados(dadosTabela, busca, filtrosColuna, ["pedido", "cliente", "quantidadeTotal", "totalItens", "produzir", "avisarVendedor", "naoProduzir", "transportes", "statusResumo"]);
    }
    return filtrarDados(dadosTabela, busca, filtrosColuna, ["dataHoraFinanceiro", "pedido", "cliente", "produto", "quantidadeLiberada", "equipa01", "equipa98", "bbbaterias01", "transporte", "status"]);
  }, [dadosTabela, busca, filtrosColuna, modo]);

  const quantidadeTotalResumo = useMemo(() => resumoPedidosPeriodo.reduce((total, item) => total + (Number(item.quantidadeTotal || 0) || 0), 0), [resumoPedidosPeriodo]);

  const colunasPainel = [
    { campo: "dataHoraFinanceiro", titulo: "Data Lib.", width: 112 },
    { campo: "pedido", titulo: "Pedido", bold: true, width: 72 },
    { campo: "cliente", titulo: "Cliente", width: 130, wrap: true },
    { campo: "produto", titulo: "Produto", bold: true, width: 165, wrap: true },
    { campo: "quantidadeLiberada", titulo: "Qt", bold: true, width: 56 },
    { campo: "equipa01", titulo: "E01", width: 52 },
    { campo: "equipa98", titulo: "E98", width: 52 },
    { campo: "bbbaterias01", titulo: "BB01", width: 58 },
    { campo: "transporte", titulo: "Transp.", width: 88 },
    {
      campo: "status",
      titulo: "Status",
      width: 96,
      render: (item) => <Badge texto={item.status} tipo={tipoStatus(item.status)} />,
    },
  ];

  const colunasResumo = [
    { campo: "pedido", titulo: "Pedido", bold: true, width: 74 },
    { campo: "cliente", titulo: "Cliente", width: 150, wrap: true },
    { campo: "quantidadeTotal", titulo: "Qt Total", bold: true, width: 72 },
    { campo: "totalItens", titulo: "SKUs", width: 54 },
    { campo: "produzir", titulo: "Produzir", width: 72 },
    { campo: "avisarVendedor", titulo: "Avisar", width: 68 },
    { campo: "naoProduzir", titulo: "Não Prod.", width: 74 },
    { campo: "transportes", titulo: "Transp.", width: 105, wrap: true },
    { campo: "statusResumo", titulo: "Status", width: 112, render: (item) => <Badge texto={item.statusResumo} tipo={tipoStatus(item.statusResumo)} /> },
  ];

  return (
    <>
      <PageHeader
        titulo={telaResumo ? "Resumo por Pedido" : "Produção"}
        descricao={telaResumo ? "Resumo agrupado por pedido, somando a quantidade liberada." : "Controle de produção por item, produto, transporte e status."}
        atualizadoEm={atualizadoEm || "não informado"}
        actions={<button onClick={carregarDados} disabled={carregando} style={buttonAtualizarStyle(carregando)}>{carregando ? "Atualizando..." : "Atualizar"}</button>}
      />
      {erro && <div style={erroStyle}>{erro}</div>}
      <section style={grid4Style}>
        <Kpi titulo="Pedidos Únicos" valor={kpisPeriodo.pedidosUnicos} />
        <Kpi titulo="Produzir" valor={kpisPeriodo.produzir} />
        <Kpi titulo="Avisar Vendedor" valor={kpisPeriodo.avisarVendedor} />
        <Kpi titulo="Qt Liberada Total" valor={quantidadeTotalResumo} />
      </section>
      <FiltroTopo
        busca={busca}
        setBusca={setBusca}
        limparFiltros={limparFiltros}
        placeholder={telaResumo ? "Busca geral no resumo por pedido..." : "Busca geral na produção..."}
        periodoFiltro={periodoFiltro}
        setPeriodoFiltro={setPeriodoFiltro}
        diasPeriodo={diasPeriodo}
        setDiasPeriodo={setDiasPeriodo}
      />
      <TabelaPadrao titulo={telaResumo ? "Resumo dos Pedidos" : "Itens de Produção"} dadosBase={dadosTabela} dadosFiltrados={dadosFiltrados} colunas={telaResumo ? colunasResumo : colunasPainel} filtros={filtrosColuna} onFiltro={alterarFiltroColuna} carregando={carregando} mensagemVazia={telaResumo ? "Nenhum resumo encontrado." : "Nenhum item de produção encontrado."} />
    </>
  );
}

export default function App() {
  const [logado, setLogado] = useState(() => localStorage.getItem(LOGIN_STORAGE_KEY) === "true");
  const [telaAtual, setTelaAtual] = useState("faturamento");

  const estoqueAtivo = ["estoque", "ajusteSaldo", "ajusteSaldoBBBaterias"].includes(telaAtual);
  const producaoAtivo = ["producao", "producaoResumo"].includes(telaAtual);

  function sair() {
    localStorage.removeItem(LOGIN_STORAGE_KEY);
    setLogado(false);
  }

  if (!logado) return <TelaLogin onLogin={() => setLogado(true)} />;

  return (
    <div style={appShellStyle}>
      <aside style={sidebarStyle}>
        <div style={sidebarHeaderStyle}>
          <div style={sidebarLogoStyle}>B</div>
          <div>
            <h2 style={sidebarTitleStyle}>BBDI</h2>
            <p style={sidebarSubTitleStyle}>Painel Operacional</p>
          </div>
        </div>

        <button onClick={sair} style={buttonSairStyle}>Sair</button>
        <div style={sidebarDividerStyle} />

        <div style={sidebarNavStyle}>
          <div style={sectionLabelStyle}>Áreas</div>

          <MenuButton
            icon="F"
            ativo={telaAtual === "faturamento"}
            onClick={() => setTelaAtual("faturamento")}
          >
            Faturamento
          </MenuButton>

          <div style={navGroupStyle(estoqueAtivo)}>
            <MenuGroupButton
              icon="E"
              ativo={estoqueAtivo}
              onClick={() => setTelaAtual("estoque")}
            >
              Estoque
            </MenuGroupButton>

            {estoqueAtivo && (
              <div style={navGroupContentStyle}>
                <SubMenuButton ativo={telaAtual === "estoque"} onClick={() => setTelaAtual("estoque")}>
                  Painel Estoque
                </SubMenuButton>
                <SubMenuButton ativo={telaAtual === "ajusteSaldo"} onClick={() => setTelaAtual("ajusteSaldo")}>
                  Ajuste de Saldo - Equipatech
                </SubMenuButton>
                <SubMenuButton ativo={telaAtual === "ajusteSaldoBBBaterias"} onClick={() => setTelaAtual("ajusteSaldoBBBaterias")}>
                  Ajuste de Saldo - BBBaterias
                </SubMenuButton>
              </div>
            )}
          </div>

          <MenuButton
            icon="C"
            ativo={telaAtual === "consultaPecas"}
            onClick={() => setTelaAtual("consultaPecas")}
          >
            Consulta de Peças
          </MenuButton>

          <div style={navGroupStyle(producaoAtivo)}>
            <MenuGroupButton
              icon="P"
              ativo={producaoAtivo}
              onClick={() => setTelaAtual("producao")}
            >
              Produção
            </MenuGroupButton>

            {producaoAtivo && (
              <div style={navGroupContentStyle}>
                <SubMenuButton ativo={telaAtual === "producao"} onClick={() => setTelaAtual("producao")}>
                  Painel Produção
                </SubMenuButton>
                <SubMenuButton ativo={telaAtual === "producaoResumo"} onClick={() => setTelaAtual("producaoResumo")}>
                  Resumo por Pedido
                </SubMenuButton>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main style={mainStyle}>
        <div style={{ display: telaAtual === "faturamento" ? "block" : "none" }}><TelaFaturamento /></div>
        <div style={{ display: telaAtual === "estoque" ? "block" : "none" }}><TelaEstoque /></div>
        <div style={{ display: telaAtual === "ajusteSaldo" ? "block" : "none" }}><TelaAjusteSaldo /></div>
        <div style={{ display: telaAtual === "ajusteSaldoBBBaterias" ? "block" : "none" }}><TelaAjusteSaldoBBBaterias /></div>
        <div style={{ display: telaAtual === "consultaPecas" ? "block" : "none" }}><TelaConsultaPecas /></div>
        <div style={{ display: telaAtual === "producao" ? "block" : "none" }}><TelaProducao modo="painel" /></div>
        <div style={{ display: telaAtual === "producaoResumo" ? "block" : "none" }}><TelaProducao modo="resumo" /></div>
      </main>
    </div>
  );
}

const appShellStyle = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top right, rgba(37,99,235,0.10) 0%, transparent 32%), linear-gradient(180deg, #F8FAFC 0%, #EEF2F7 100%)",
  display: "flex",
  fontFamily: "Inter, Arial, sans-serif",
  color: "#0F172A",
};

const sidebarStyle = {
  width: 304,
  background:
    "linear-gradient(180deg, #06111F 0%, #0F172A 48%, #111827 100%)",
  color: "#FFFFFF",
  padding: 22,
  flexShrink: 0,
  height: "100vh",
  overflowY: "auto",
  boxSizing: "border-box",
  borderRight: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "22px 0 55px rgba(15,23,42,0.14)",
};

const sidebarHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "4px 2px 2px",
};

const sidebarLogoStyle = {
  width: 42,
  height: 42,
  borderRadius: 14,
  background: "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
  fontSize: 20,
  boxShadow: "0 16px 30px rgba(37,99,235,0.28)",
};

const sidebarTitleStyle = { margin: 0, fontSize: 18, fontWeight: 900 };
const sidebarSubTitleStyle = { margin: "3px 0 0", color: "#94A3B8", fontSize: 12, fontWeight: 700 };
const sidebarDividerStyle = { height: 1, background: "rgba(255,255,255,0.10)", margin: "20px 0" };

const mainStyle = {
  flex: 1,
  padding: 32,
  overflowX: "hidden",
  minWidth: 0,
};

const sidebarNavStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 7,
};

const sectionLabelStyle = {
  color: "#64748B",
  fontSize: 11,
  fontWeight: 950,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  margin: "2px 0 7px 2px",
};

const navGroupStyle = (ativo) => ({
  borderRadius: 16,
  padding: ativo ? 6 : 0,
  background: ativo ? "rgba(15,23,42,0.50)" : "transparent",
  border: ativo ? "1px solid rgba(148,163,184,0.13)" : "1px solid transparent",
  boxShadow: ativo ? "inset 0 1px 0 rgba(255,255,255,0.04)" : "none",
});

const navGroupContentStyle = {
  marginTop: 6,
  padding: "3px 0 2px",
  borderRadius: 12,
  background: "rgba(2,6,23,0.18)",
};

const menuButtonStyle = {
  width: "100%",
  borderRadius: 13,
  padding: "12px 13px",
  marginBottom: 0,
  cursor: "pointer",
  textAlign: "left",
  fontWeight: 850,
  display: "flex",
  alignItems: "center",
  gap: 10,
  transition: "all 160ms ease",
};

const menuIconStyle = (ativo) => ({
  width: 28,
  height: 28,
  borderRadius: 10,
  background: ativo ? "rgba(255,255,255,0.20)" : "rgba(148,163,184,0.12)",
  color: ativo ? "#FFFFFF" : "#94A3B8",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  fontWeight: 950,
  flexShrink: 0,
});

const menuChevronStyle = (ativo) => ({
  color: ativo ? "#DBEAFE" : "#64748B",
  fontSize: 18,
  lineHeight: 1,
  fontWeight: 900,
  transform: ativo ? "translateY(-1px)" : "none",
});

const subMenuButtonStyle = {
  width: "100%",
  border: "none",
  borderRadius: 10,
  padding: "10px 12px 10px 17px",
  marginBottom: 4,
  marginLeft: 0,
  cursor: "pointer",
  textAlign: "left",
  fontWeight: 800,
  fontSize: 13,
  transition: "all 160ms ease",
};

const buttonSairStyle = {
  marginTop: 16,
  width: "100%",
  border: "1px solid rgba(255,255,255,0.13)",
  background: "rgba(255,255,255,0.06)",
  color: "#E2E8F0",
  borderRadius: 12,
  padding: "10px 12px",
  cursor: "pointer",
  fontWeight: 850,
  fontSize: 12,
};

const pageHeaderStyle = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.96) 100%)",
  border: "1px solid rgba(226,232,240,0.95)",
  borderRadius: 24,
  padding: 24,
  marginBottom: 22,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  boxShadow: "0 18px 46px rgba(15,23,42,0.075)",
  position: "relative",
  overflow: "hidden",
};

const breadcrumbStyle = { fontSize: 11, color: "#64748B", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 };
const titleStyle = { margin: 0, fontSize: 30, color: "#0F172A", fontWeight: 900, letterSpacing: "-0.03em" };
const subtitleStyle = { color: "#64748B", marginTop: 8, marginBottom: 0, lineHeight: 1.45 };

const metaBoxStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  marginTop: 13,
  color: "#64748B",
  fontSize: 12,
};

const headerActionsStyle = { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" };

const buttonAtualizarStyle = (carregando) => ({
  height: 42,
  border: "1px solid #CBD5E1",
  background: carregando ? "#F8FAFC" : "#FFFFFF",
  borderRadius: 12,
  padding: "0 16px",
  cursor: carregando ? "not-allowed" : "pointer",
  fontWeight: 850,
  color: "#0F172A",
  boxShadow: "0 6px 14px rgba(15,23,42,0.05)",
});

const actionLinkStyle = {
  height: 42,
  borderRadius: 12,
  padding: "0 16px",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  fontWeight: 850,
  boxShadow: "0 6px 14px rgba(15,23,42,0.05)",
};

const erroStyle = { background: "#FEE2E2", color: "#991B1B", padding: 14, borderRadius: 14, marginBottom: 18, fontWeight: 800, border: "1px solid #FECACA" };
const grid4Style = { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 14, marginBottom: 20 };
const grid5Style = { display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 14, marginBottom: 20 };

const kpiStyle = {
  background: "#FFFFFF",
  border: "1px solid #E2E8F0",
  borderRadius: 18,
  padding: 18,
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 12px 28px rgba(15,23,42,0.055)",
};

const kpiTopLineStyle = { position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #2563EB, #38BDF8)" };
const kpiLabelStyle = { fontSize: 12, color: "#64748B", marginBottom: 8, fontWeight: 850, textTransform: "uppercase", letterSpacing: "0.04em" };
const kpiValueStyle = { fontSize: 29, fontWeight: 950, color: "#0F172A", letterSpacing: "-0.04em" };
const kpiSubLabelStyle = { marginTop: 4, fontSize: 11, color: "#94A3B8" };
const kpiClickHintStyle = { marginTop: 9, fontSize: 10, color: "#2563EB", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em" };

const filtroTopoStyle = {
  background: "transparent",
  border: "none",
  borderRadius: 0,
  padding: 0,
  marginBottom: 18,
  boxShadow: "none",
};
const gridBuscaStyle = {
  display: "grid",
  gridTemplateColumns: "minmax(240px, 520px) auto",
  gap: 9,
  alignItems: "center",
  justifyContent: "start",
};
const gridBuscaPeriodoStyle = {
  display: "grid",
  gridTemplateColumns: "minmax(240px, 520px) 112px 64px auto",
  gap: 9,
  alignItems: "center",
  justifyContent: "start",
};
const inputBuscaStyle = {
  border: "1px solid #CBD5E1",
  borderRadius: 10,
  padding: "8px 12px",
  fontSize: 12,
  outline: "none",
  background: "#FFFFFF",
  height: 34,
  boxSizing: "border-box",
  boxShadow: "0 4px 12px rgba(15,23,42,0.04)",
};
const periodoSelectStyle = {
  border: "1px solid #CBD5E1",
  borderRadius: 10,
  padding: "7px 9px",
  fontSize: 12,
  outline: "none",
  background: "#FFFFFF",
  color: "#0F172A",
  fontWeight: 700,
  height: 34,
  boxSizing: "border-box",
  boxShadow: "0 4px 12px rgba(15,23,42,0.04)",
};
const periodoDiasStyle = {
  border: "1px solid #CBD5E1",
  borderRadius: 10,
  padding: "7px 9px",
  fontSize: 12,
  outline: "none",
  background: "#FFFFFF",
  color: "#0F172A",
  fontWeight: 700,
  height: 34,
  boxSizing: "border-box",
  width: 64,
  boxShadow: "0 4px 12px rgba(15,23,42,0.04)",
};
const buttonLimparStyle = {
  border: "none",
  borderRadius: 8,
  padding: "7px 8px",
  fontSize: 12,
  fontWeight: 850,
  background: "transparent",
  color: "#2563EB",
  cursor: "pointer",
  height: 34,
  boxSizing: "border-box",
  whiteSpace: "nowrap",
};

const tableSectionStyle = { background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 18, overflow: "hidden", boxShadow: "0 14px 32px rgba(15,23,42,0.055)" };
const tableHeaderStyle = { padding: "16px 18px", background: "#FFFFFF", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" };
const tableTitleStyle = { fontWeight: 900, color: "#0F172A", fontSize: 15 };
const tableSubtitleStyle = { marginTop: 3, color: "#94A3B8", fontSize: 11, fontWeight: 700 };
const recordCounterStyle = { color: "#64748B", fontSize: 12, fontWeight: 800, background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 999, padding: "6px 10px" };

const tableStyle = { width: "100%", borderCollapse: "collapse", fontSize: 12 };
const th = {
  textAlign: "left",
  padding: "8px 9px",
  color: "#475569",
  fontSize: 10,
  textTransform: "uppercase",
  whiteSpace: "nowrap",
  fontWeight: 900,
  letterSpacing: "0.035em",
  borderBottom: "1px solid #E2E8F0",
};
const td = {
  padding: "8px 9px",
  whiteSpace: "nowrap",
  color: "#334155",
  fontSize: 12,
};
const tdBold = {
  padding: "8px 9px",
  whiteSpace: "nowrap",
  fontWeight: 500,
  color: "#1F2937",
  fontSize: 12,
};
const tdCentro = { padding: 24, textAlign: "center", color: "#64748B", fontWeight: 750, fontSize: 12 };
const headerFilterWrapperStyle = { display: "flex", alignItems: "center", gap: 4, minWidth: 0 };
const filterSelectStyle = {
  width: 20,
  height: 20,
  borderRadius: 6,
  fontSize: 9,
  cursor: "pointer",
  padding: 0,
  color: "transparent",
};
const sortButtonStyle = {
  width: 20,
  height: 20,
  borderRadius: 6,
  fontSize: 10,
  cursor: "pointer",
  padding: 0,
  fontWeight: 900,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const loginPageStyle = { minHeight: "100vh", background: "radial-gradient(circle at top left, #1E3A8A 0%, #0F172A 42%, #020617 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, Arial, sans-serif", padding: 20 };
const loginCardStyle = { width: "100%", maxWidth: 410, background: "#FFFFFF", borderRadius: 22, padding: 30, boxShadow: "0 28px 70px rgba(0,0,0,0.34)", border: "1px solid rgba(255,255,255,0.50)" };
const loginBrandBoxStyle = { display: "flex", gap: 13, alignItems: "center", marginBottom: 26 };
const loginBrandIconStyle = { width: 46, height: 46, borderRadius: 16, background: "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 950, fontSize: 22 };
const loginTitleStyle = { margin: 0, color: "#0F172A", fontSize: 25, fontWeight: 950, letterSpacing: "-0.03em" };
const loginSubtitleStyle = { margin: "4px 0 0", color: "#64748B", fontSize: 13, fontWeight: 800 };
const labelLoginStyle = { display: "block", fontSize: 12, fontWeight: 900, color: "#334155", marginBottom: 7 };
const inputLoginStyle = { width: "100%", boxSizing: "border-box", border: "1px solid #CBD5E1", borderRadius: 12, padding: "12px 13px", fontSize: 14, marginBottom: 15, outline: "none", background: "#F8FAFC" };
const loginErrorStyle = { background: "#FEE2E2", color: "#991B1B", borderRadius: 12, padding: "10px 12px", fontSize: 13, fontWeight: 800, marginBottom: 14, border: "1px solid #FECACA" };
const buttonLoginStyle = { width: "100%", height: 46, border: "none", borderRadius: 12, background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", color: "#FFFFFF", fontWeight: 950, fontSize: 14, cursor: "pointer", boxShadow: "0 16px 30px rgba(37,99,235,0.22)" };
const loginFootnoteStyle = { marginTop: 16, color: "#94A3B8", fontSize: 11, lineHeight: 1.45 };
