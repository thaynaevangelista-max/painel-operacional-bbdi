import React, { useCallback, useEffect, useMemo, useState } from "react";

const API_BASE =
  "https://script.google.com/macros/s/AKfycbzpxMBPabGe5Xk16KQBmqmC7_SDzJrncmiAqTgU_Y0az1IkDzUawCW3qQ1gHCrutqlv/exec";

const LINK_APP_SOLICITAR =
  "https://script.google.com/a/macros/bbdi.com.br/s/AKfycbw_60TLX8mspcA1pjnX9XM5vOpFWh05Sps_ESjlQGTcUijq7Wlzd_O1UF6ChPtwkEXK/exec";

const LINK_APP_GESTAO =
  "https://script.google.com/a/macros/bbdi.com.br/s/AKfycbw_60TLX8mspcA1pjnX9XM5vOpFWh05Sps_ESjlQGTcUijq7Wlzd_O1UF6ChPtwkEXK/exec?page=gestao";

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
  filial: "",
  data: "",
  produto: "",
  saldoInventario: "",
  saldoEncontrado: "",
  solicitante: "",
  status: "",
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

function filtrarDados(dados, busca, filtros, camposBusca) {
  const termo = normalizar(busca);

  return dados.filter((item) => {
    const buscaOk =
      !termo ||
      camposBusca.some((campo) => normalizar(item[campo]).includes(termo));

    const filtrosOk = Object.entries(filtros).every(([campo, valor]) => {
      return !valor || item[campo] === valor;
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
    verde: { bg: "#E1F5EE", color: "#0F6E56" },
    vermelho: { bg: "#FCEBEB", color: "#A32D2D" },
    azul: { bg: "#EAF3FF", color: "#1D4E89" },
    laranja: { bg: "#FFF1E0", color: "#A65100" },
    cinza: { bg: "#F1F3F5", color: "#495057" },
  };

  const cor = cores[tipo] || cores.cinza;

  return (
    <span
      style={{
        background: cor.bg,
        color: cor.color,
        padding: "4px 8px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {texto || "-"}
    </span>
  );
}

function tipoStatus(status) {
  const s = normalizar(status);

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

function tipoTempoRestante(resultado) {
  if (resultado.atrasado) return "vermelho";
  if (resultado.urgente) return "laranja";
  if (resultado.texto === "-") return "cinza";

  return "verde";
}

function Kpi({ titulo, valor }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E5E7EB",
        borderRadius: 14,
        padding: 16,
      }}
    >
      <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>
        {titulo}
      </div>

      <div style={{ fontSize: 24, fontWeight: 800, color: "#111827" }}>
        {valor ?? 0}
      </div>
    </div>
  );
}

function CabecalhoComFiltro({ titulo, value, onChange, options }) {
  const temFiltro = value !== "";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        minWidth: 105,
      }}
    >
      <span>{titulo}</span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        title={`Filtrar ${titulo}`}
        style={{
          width: 24,
          height: 24,
          border: temFiltro ? "1px solid #1D4ED8" : "1px solid #D1D5DB",
          borderRadius: 6,
          background: temFiltro ? "#DBEAFE" : "#FFFFFF",
          fontSize: 10,
          cursor: "pointer",
          padding: 0,
          color: "transparent",
        }}
      >
        <option value=""></option>

        {options.map((opcao) => (
          <option key={opcao} value={opcao} style={{ color: "#111827" }}>
            {opcao}
          </option>
        ))}
      </select>
    </div>
  );
}

function MenuButton({ ativo, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        border: "none",
        borderRadius: 10,
        padding: "12px 14px",
        marginBottom: 8,
        cursor: "pointer",
        textAlign: "left",
        fontWeight: 700,
        color: "#fff",
        background: ativo ? "#1D4ED8" : "rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </button>
  );
}

function SubMenuButton({ ativo, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        border: "none",
        borderRadius: 8,
        padding: "9px 14px",
        marginBottom: 6,
        marginLeft: 12,
        cursor: "pointer",
        textAlign: "left",
        fontWeight: 700,
        fontSize: 13,
        color: ativo ? "#FFFFFF" : "#CBD5E1",
        background: ativo ? "rgba(29,78,216,0.85)" : "rgba(255,255,255,0.04)",
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
        height: 40,
        background: primario ? "#1D4ED8" : "#fff",
        color: primario ? "#fff" : "#111827",
        border: primario ? "1px solid #1D4ED8" : "1px solid #D1D5DB",
        borderRadius: 10,
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        fontWeight: 800,
      }}
    >
      {children}
    </a>
  );
}

function ContadorRegistros({ filtrados, total }) {
  return (
    <span style={{ color: "#6B7280", fontSize: 12 }}>
      {filtrados} de {total} registros
    </span>
  );
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
  return (
    <section style={tableSectionStyle}>
      <div style={tableHeaderStyle}>
        <span>{titulo}</span>
        <ContadorRegistros
          filtrados={dadosFiltrados.length}
          total={dadosBase.length}
        />
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "#F9FAFB" }}>
              {colunas.map((coluna) => (
                <th key={coluna.campo} style={th}>
                  <CabecalhoComFiltro
                    titulo={coluna.titulo}
                    value={filtros[coluna.campo] || ""}
                    onChange={(valor) => onFiltro(coluna.campo, valor)}
                    options={opcoesUnicas(dadosBase, coluna.campo)}
                  />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {carregando && dadosFiltrados.length === 0 && (
              <tr>
                <td colSpan={colunas.length} style={tdCentro}>
                  Carregando dados...
                </td>
              </tr>
            )}

            {!carregando && dadosFiltrados.length === 0 && (
              <tr>
                <td colSpan={colunas.length} style={tdCentro}>
                  {mensagemVazia}
                </td>
              </tr>
            )}

            {dadosFiltrados.map((item, index) => (
              <tr
                key={`${titulo}-${index}`}
                style={{ borderTop: "1px solid #F1F5F9" }}
              >
                {colunas.map((coluna) => (
                  <td key={coluna.campo} style={coluna.bold ? tdBold : td}>
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
    <div
      style={{
        minHeight: "100vh",
        background: "#0F172A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        padding: 20,
      }}
    >
      <form
        onSubmit={entrar}
        style={{
          width: "100%",
          maxWidth: 390,
          background: "#FFFFFF",
          borderRadius: 18,
          padding: 28,
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ marginBottom: 22 }}>
          <h1
            style={{
              margin: 0,
              color: "#111827",
              fontSize: 26,
              fontWeight: 900,
            }}
          >
            Painel Operacional
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "#6B7280",
              fontSize: 13,
              lineHeight: 1.4,
            }}
          >
            Acesse com o usuário e senha definidos para o painel interno.
          </p>
        </div>

        <label
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 800,
            color: "#374151",
            marginBottom: 6,
          }}
        >
          Usuário
        </label>

        <input
          value={usuario}
          onChange={(e) => {
            setUsuario(e.target.value);
            setErro("");
          }}
          placeholder="Digite o usuário"
          autoComplete="username"
          style={{
            width: "100%",
            boxSizing: "border-box",
            border: "1px solid #D1D5DB",
            borderRadius: 10,
            padding: "12px 12px",
            fontSize: 14,
            marginBottom: 14,
          }}
        />

        <label
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 800,
            color: "#374151",
            marginBottom: 6,
          }}
        >
          Senha
        </label>

        <input
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setErro("");
          }}
          placeholder="Digite a senha"
          type="password"
          autoComplete="current-password"
          style={{
            width: "100%",
            boxSizing: "border-box",
            border: "1px solid #D1D5DB",
            borderRadius: 10,
            padding: "12px 12px",
            fontSize: 14,
            marginBottom: 14,
          }}
        />

        {erro && (
          <div
            style={{
              background: "#FCEBEB",
              color: "#A32D2D",
              borderRadius: 10,
              padding: "10px 12px",
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            {erro}
          </div>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            height: 44,
            border: "none",
            borderRadius: 10,
            background: "#1D4ED8",
            color: "#FFFFFF",
            fontWeight: 900,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Entrar
        </button>

        <div
          style={{
            marginTop: 14,
            color: "#9CA3AF",
            fontSize: 11,
            lineHeight: 1.4,
          }}
        >
          Login simples para bloqueio visual do painel. A proteção real da API
          deve ser tratada no Apps Script quando o painel for publicado para uso
          definitivo.
        </div>
      </form>
    </div>
  );
}

function TelaFaturamento() {
  const [dados, setDados] = useState([]);
  const [atualizacoes, setAtualizacoes] = useState({});
  const [busca, setBusca] = useState("");
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
    setFiltrosColuna(FILTROS_FATURAMENTO_INICIAIS);
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

  const dadosFiltrados = useMemo(() => {
    return filtrarDados(dadosComTempo, busca, filtrosColuna, [
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
  }, [dadosComTempo, busca, filtrosColuna]);

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
    { campo: "empresa", titulo: "Empresa", bold: true },
    { campo: "pedido", titulo: "Pedido", bold: true },
    { campo: "filial", titulo: "Filial" },
    { campo: "dataLiberacao", titulo: "Data Liberação" },
    { campo: "quantidade", titulo: "Qtd" },
    {
      campo: "status",
      titulo: "Status",
      render: (item) => (
        <Badge texto={item.status} tipo={tipoStatus(item.status)} />
      ),
    },
    { campo: "tempoPedido", titulo: "Tempo Pedido" },
    { campo: "dataPrazo", titulo: "Data Prazo" },
    {
      campo: "tempoRestanteCategoria",
      titulo: "Tempo Restante",
      bold: true,
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
    { campo: "lista", titulo: "Lista" },
    { campo: "faturador", titulo: "Faturador" },
    {
      campo: "statusSeparacao",
      titulo: "Status Separação",
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
      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Faturamento</h1>

          <p style={subtitleStyle}>
            Visualização conjunta dos pedidos da Equipatech e BBBaterias.
          </p>

          <div style={{ marginTop: 10, fontSize: 12, color: "#6B7280" }}>
            <div>
              Equipatech:{" "}
              <strong>{atualizacoes.Equipatech || "não informado"}</strong>
            </div>
            <div>
              BBBaterias:{" "}
              <strong>{atualizacoes.BBBaterias || "não informado"}</strong>
            </div>
            <div>
              Relógio do painel:{" "}
              <strong>{agora.toLocaleTimeString("pt-BR")}</strong>
            </div>
          </div>
        </div>

        <button
          onClick={carregarDados}
          disabled={carregando}
          style={buttonAtualizarStyle(carregando)}
        >
          {carregando ? "Atualizando..." : "Atualizar"}
        </button>
      </header>

      {erro && <div style={erroStyle}>{erro}</div>}

      <section style={grid4Style}>
        <Kpi titulo="Total Pedidos Equipatech" valor={kpis.totalEquipatech} />
        <Kpi
          titulo="Vencem em menos de 1h Equipatech"
          valor={kpis.vencemMenos1HoraEquipatech}
        />
        <Kpi titulo="Total Pedidos BBBaterias" valor={kpis.totalBBBaterias} />
        <Kpi
          titulo="Vencem em menos de 1h BBBaterias"
          valor={kpis.vencemMenos1HoraBBBaterias}
        />
      </section>

      <section style={filtroTopoStyle}>
        <div style={gridBuscaStyle}>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Busca geral..."
            style={inputBuscaStyle}
          />

          <button onClick={limparFiltros} style={buttonLimparStyle}>
            Limpar filtros
          </button>
        </div>
      </section>

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

function TelaEstoque() {
  const [dados, setDados] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtrosColuna, setFiltrosColuna] = useState(FILTROS_ESTOQUE_INICIAIS);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [atualizadoEm, setAtualizadoEm] = useState("");

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      const url = `${API_BASE}?action=dados&fonte=estoque`;
      const resposta = await fetch(url);
      const json = await resposta.json();

      if (!json.ok) {
        throw new Error(json.erro || "Erro ao carregar estoque.");
      }

      setDados(json.dados || []);
      setAtualizadoEm(json.atualizadoEm || "");
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
    setFiltrosColuna(FILTROS_ESTOQUE_INICIAIS);
  }

  const dadosFiltrados = useMemo(() => {
    return filtrarDados(dados, busca, filtrosColuna, [
      "status",
      "produto",
      "quantidade",
      "filial",
      "pedido",
      "c5Desctrs",
      "unidadeFaturamento",
      "dataHoraFinanceiro",
      "dataLancamento",
      "dataHoraEntregueEstoque",
    ]);
  }, [dados, busca, filtrosColuna]);

  const kpis = useMemo(() => {
    const totalItens = dadosFiltrados.length;

    const totalPedidosUnicos = new Set(
      dadosFiltrados.map((item) => item.pedido).filter(Boolean)
    ).size;

    const entregues = dadosFiltrados.filter((item) =>
      normalizar(item.status).includes("entregue")
    ).length;

    const pendentes = dadosFiltrados.filter(
      (item) => !normalizar(item.status).includes("entregue")
    ).length;

    const quantidadeTotal = dadosFiltrados.reduce((total, item) => {
      const qtd = Number(String(item.quantidade || "0").replace(",", "."));
      return total + (isNaN(qtd) ? 0 : qtd);
    }, 0);

    return {
      totalItens,
      totalPedidosUnicos,
      entregues,
      pendentes,
      quantidadeTotal,
    };
  }, [dadosFiltrados]);

  const colunas = [
    {
      campo: "status",
      titulo: "Status",
      render: (item) => (
        <Badge texto={item.status} tipo={tipoStatus(item.status)} />
      ),
    },
    { campo: "produto", titulo: "Produto", bold: true },
    { campo: "quantidade", titulo: "QTY" },
    { campo: "filial", titulo: "Filial" },
    { campo: "pedido", titulo: "Pedido", bold: true },
    { campo: "c5Desctrs", titulo: "C5_DESCTRS" },
    { campo: "unidadeFaturamento", titulo: "Unidade" },
    { campo: "dataHoraFinanceiro", titulo: "Financeiro" },
    { campo: "dataLancamento", titulo: "Lançamento" },
    { campo: "dataHoraEntregueEstoque", titulo: "Entregue Estoque" },
  ];

  return (
    <>
      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Estoque</h1>

          <p style={subtitleStyle}>
            Acompanhamento dos itens da aba Tela Pedidos.
          </p>

          <div style={{ marginTop: 10, fontSize: 12, color: "#6B7280" }}>
            Última atualização:{" "}
            <strong>{atualizadoEm || "não informado"}</strong>
          </div>
        </div>

        <button
          onClick={carregarDados}
          disabled={carregando}
          style={buttonAtualizarStyle(carregando)}
        >
          {carregando ? "Atualizando..." : "Atualizar"}
        </button>
      </header>

      {erro && <div style={erroStyle}>{erro}</div>}

      <section style={grid5Style}>
        <Kpi titulo="Total de Itens" valor={kpis.totalItens} />
        <Kpi titulo="Pedidos Únicos" valor={kpis.totalPedidosUnicos} />
        <Kpi titulo="Entregues" valor={kpis.entregues} />
        <Kpi titulo="Pendentes" valor={kpis.pendentes} />
        <Kpi titulo="Quantidade Total" valor={kpis.quantidadeTotal} />
      </section>

      <section style={filtroTopoStyle}>
        <div style={gridBuscaStyle}>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Busca geral no estoque..."
            style={inputBuscaStyle}
          />

          <button onClick={limparFiltros} style={buttonLimparStyle}>
            Limpar filtros
          </button>
        </div>
      </section>

      <TabelaPadrao
        titulo="Itens do Estoque"
        dadosBase={dados}
        dadosFiltrados={dadosFiltrados}
        colunas={colunas}
        filtros={filtrosColuna}
        onFiltro={alterarFiltroColuna}
        carregando={carregando}
        mensagemVazia="Nenhum item encontrado."
      />
    </>
  );
}

function TelaAjusteSaldo() {
  const [dados, setDados] = useState([]);
  const [kpis, setKpis] = useState({});
  const [busca, setBusca] = useState("");
  const [filtrosColuna, setFiltrosColuna] = useState(
    FILTROS_AJUSTE_SALDO_INICIAIS
  );
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [atualizadoEm, setAtualizadoEm] = useState("");

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      const url = `${API_BASE}?action=dados&fonte=ajusteSaldo`;
      const resposta = await fetch(url);
      const json = await resposta.json();

      if (!json.ok) {
        throw new Error(json.erro || "Erro ao carregar Ajuste de Saldo.");
      }

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
    setFiltrosColuna(FILTROS_AJUSTE_SALDO_INICIAIS);
  }

  const dadosFiltrados = useMemo(() => {
    return filtrarDados(dados, busca, filtrosColuna, [
      "filial",
      "data",
      "produto",
      "saldoInventario",
      "saldoEncontrado",
      "solicitante",
      "status",
    ]);
  }, [dados, busca, filtrosColuna]);

  const colunas = [
    { campo: "filial", titulo: "Filial", bold: true },
    { campo: "data", titulo: "Data" },
    { campo: "produto", titulo: "Produto", bold: true },
    { campo: "saldoInventario", titulo: "Saldo Inventário" },
    { campo: "saldoEncontrado", titulo: "Saldo Encontrado" },
    { campo: "solicitante", titulo: "Solicitante" },
    {
      campo: "status",
      titulo: "Status",
      render: (item) => (
        <Badge texto={item.status} tipo={tipoStatus(item.status)} />
      ),
    },
  ];

  return (
    <>
      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Ajuste de Saldo - Equipatech</h1>

          <p style={subtitleStyle}>
            Controle dos produtos enviados para conferência e ajuste de saldo.
          </p>

          <div style={{ marginTop: 10, fontSize: 12, color: "#6B7280" }}>
            Última atualização:{" "}
            <strong>{atualizadoEm || "não informado"}</strong>
          </div>
        </div>

        <button
          onClick={carregarDados}
          disabled={carregando}
          style={buttonAtualizarStyle(carregando)}
        >
          {carregando ? "Atualizando..." : "Atualizar"}
        </button>
      </header>

      {erro && <div style={erroStyle}>{erro}</div>}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <Kpi titulo="Pendente" valor={kpis.pendente} />
        <Kpi titulo="Verificando Saldo" valor={kpis.verificandoSaldo} />
      </section>

      <section style={filtroTopoStyle}>
        <div style={gridBuscaStyle}>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Busca geral no Ajuste de Saldo Equipatech..."
            style={inputBuscaStyle}
          />

          <button onClick={limparFiltros} style={buttonLimparStyle}>
            Limpar filtros
          </button>
        </div>
      </section>

      <TabelaPadrao
        titulo="Ajustes de Saldo - Equipatech"
        dadosBase={dados}
        dadosFiltrados={dadosFiltrados}
        colunas={colunas}
        filtros={filtrosColuna}
        onFiltro={alterarFiltroColuna}
        carregando={carregando}
        mensagemVazia="Nenhum ajuste de saldo encontrado."
      />
    </>
  );
}

function TelaAjusteSaldoBBBaterias() {
  const [dados, setDados] = useState([]);
  const [kpis, setKpis] = useState({});
  const [busca, setBusca] = useState("");
  const [filtrosColuna, setFiltrosColuna] = useState(
    FILTROS_AJUSTE_SALDO_BB_INICIAIS
  );
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [atualizadoEm, setAtualizadoEm] = useState("");

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      const url = `${API_BASE}?action=dados&fonte=ajusteSaldoBBBaterias`;
      const resposta = await fetch(url);
      const json = await resposta.json();

      if (!json.ok) {
        throw new Error(
          json.erro || "Erro ao carregar Ajuste de Saldo BBBaterias."
        );
      }

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
    setFiltrosColuna(FILTROS_AJUSTE_SALDO_BB_INICIAIS);
  }

  const dadosFiltrados = useMemo(() => {
    return filtrarDados(dados, busca, filtrosColuna, [
      "dataHora",
      "nomes",
      "produto",
      "lote",
      "estoqueFisico",
      "inventarioProtheus",
      "ajusteSaldo",
      "status",
      "dataHoraAjuste",
    ]);
  }, [dados, busca, filtrosColuna]);

  const colunas = [
    { campo: "dataHora", titulo: "Data e Hora" },
    { campo: "nomes", titulo: "Nomes", bold: true },
    { campo: "produto", titulo: "Produto", bold: true },
    { campo: "lote", titulo: "Lote" },
    { campo: "estoqueFisico", titulo: "Estoque Físico" },
    { campo: "inventarioProtheus", titulo: "Inventário Protheus" },
    { campo: "ajusteSaldo", titulo: "Ajuste de Saldo", bold: true },
    {
      campo: "status",
      titulo: "Status",
      render: (item) => (
        <Badge texto={item.status} tipo={tipoStatus(item.status)} />
      ),
    },
    { campo: "dataHoraAjuste", titulo: "Data Hora Ajuste" },
  ];

  return (
    <>
      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Ajuste de Saldo - BBBaterias</h1>

          <p style={subtitleStyle}>
            Controle de divergências entre estoque físico e inventário Protheus.
          </p>

          <div style={{ marginTop: 10, fontSize: 12, color: "#6B7280" }}>
            Última atualização:{" "}
            <strong>{atualizadoEm || "não informado"}</strong>
          </div>
        </div>

        <button
          onClick={carregarDados}
          disabled={carregando}
          style={buttonAtualizarStyle(carregando)}
        >
          {carregando ? "Atualizando..." : "Atualizar"}
        </button>
      </header>

      {erro && <div style={erroStyle}>{erro}</div>}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <Kpi titulo="Pendente" valor={kpis.pendente} />
        <Kpi titulo="Resolvido" valor={kpis.resolvido} />
      </section>

      <section style={filtroTopoStyle}>
        <div style={gridBuscaStyle}>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Busca geral no Ajuste de Saldo BBBaterias..."
            style={inputBuscaStyle}
          />

          <button onClick={limparFiltros} style={buttonLimparStyle}>
            Limpar filtros
          </button>
        </div>
      </section>

      <TabelaPadrao
        titulo="Ajustes de Saldo - BBBaterias"
        dadosBase={dados}
        dadosFiltrados={dadosFiltrados}
        colunas={colunas}
        filtros={filtrosColuna}
        onFiltro={alterarFiltroColuna}
        carregando={carregando}
        mensagemVazia="Nenhum ajuste de saldo encontrado."
      />
    </>
  );
}

function TelaConsultaPecas() {
  const [dados, setDados] = useState([]);
  const [kpis, setKpis] = useState({});
  const [busca, setBusca] = useState("");
  const [filtrosColuna, setFiltrosColuna] = useState(
    FILTROS_CONSULTA_PECAS_INICIAIS
  );
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [atualizadoEm, setAtualizadoEm] = useState("");

  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      const url = `${API_BASE}?action=dados&fonte=consultaPecas`;
      const resposta = await fetch(url);
      const json = await resposta.json();

      if (!json.ok) {
        throw new Error(json.erro || "Erro ao carregar Consulta de Peças.");
      }

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
    setFiltrosColuna(FILTROS_CONSULTA_PECAS_INICIAIS);
  }

  const dadosFiltrados = useMemo(() => {
    return filtrarDados(dados, busca, filtrosColuna, [
      "id",
      "dataHora",
      "vendedor",
      "codigoPeca",
      "tipoSolicitacao",
      "status",
      "tempoAguardando",
      "acaoEstoque",
      "dataResposta",
      "respondidoPor",
      "filial",
    ]);
  }, [dados, busca, filtrosColuna]);

  const colunas = [
    { campo: "id", titulo: "ID", bold: true },
    { campo: "dataHora", titulo: "DataHora" },
    { campo: "vendedor", titulo: "Vendedor" },
    { campo: "codigoPeca", titulo: "Código Peça", bold: true },
    { campo: "tipoSolicitacao", titulo: "Tipo" },
    {
      campo: "status",
      titulo: "Status",
      render: (item) => (
        <Badge texto={item.status} tipo={tipoStatus(item.status)} />
      ),
    },
    { campo: "tempoAguardando", titulo: "Tempo Aguardando", bold: true },
    { campo: "acaoEstoque", titulo: "Ação Estoque" },
    { campo: "dataResposta", titulo: "Data Resposta" },
    { campo: "respondidoPor", titulo: "Respondido Por" },
    { campo: "filial", titulo: "Filial", bold: true },
  ];

  return (
    <>
      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Consulta de Peças</h1>

          <p style={subtitleStyle}>
            Controle de solicitações pendentes, atrasadas e respondidas pelo
            estoque.
          </p>

          <div style={{ marginTop: 10, fontSize: 12, color: "#6B7280" }}>
            Última atualização:{" "}
            <strong>{atualizadoEm || "não informado"}</strong>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <BotaoLink href={LINK_APP_SOLICITAR}>Solicitar Peça</BotaoLink>

          <BotaoLink href={LINK_APP_GESTAO} variante="secundario">
            Gestão
          </BotaoLink>

          <button
            onClick={carregarDados}
            disabled={carregando}
            style={buttonAtualizarStyle(carregando)}
          >
            {carregando ? "Atualizando..." : "Atualizar"}
          </button>
        </div>
      </header>

      {erro && <div style={erroStyle}>{erro}</div>}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <Kpi titulo="Aguardando Resposta" valor={kpis.aguardandoResposta} />
        <Kpi
          titulo="Aguardando há mais de 1h"
          valor={kpis.aguardandoMaisDe1h}
        />
        <Kpi titulo="Respondidas" valor={kpis.respondidas} />
      </section>

      <section style={filtroTopoStyle}>
        <div style={gridBuscaStyle}>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Busca geral na Consulta de Peças..."
            style={inputBuscaStyle}
          />

          <button onClick={limparFiltros} style={buttonLimparStyle}>
            Limpar filtros
          </button>
        </div>
      </section>

      <TabelaPadrao
        titulo="Solicitações"
        dadosBase={dados}
        dadosFiltrados={dadosFiltrados}
        colunas={colunas}
        filtros={filtrosColuna}
        onFiltro={alterarFiltroColuna}
        carregando={carregando}
        mensagemVazia="Nenhuma solicitação encontrada."
      />
    </>
  );
}

export default function App() {
  const [logado, setLogado] = useState(() => {
    return localStorage.getItem(LOGIN_STORAGE_KEY) === "true";
  });

  const [telaAtual, setTelaAtual] = useState("faturamento");

  function sair() {
    localStorage.removeItem(LOGIN_STORAGE_KEY);
    setLogado(false);
  }

  if (!logado) {
    return <TelaLogin onLogin={() => setLogado(true)} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F7FA",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        color: "#111827",
      }}
    >
      <aside
        style={{
          width: 250,
          background: "#0F172A",
          color: "#FFFFFF",
          padding: 20,
          flexShrink: 0,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20 }}>Painel Operacional</h2>

        <p style={{ color: "#94A3B8", fontSize: 12, marginTop: 6 }}>
          Gestão interna por área
        </p>

        <button
          onClick={sair}
          style={{
            marginTop: 14,
            width: "100%",
            border: "1px solid rgba(255,255,255,0.16)",
            background: "rgba(255,255,255,0.06)",
            color: "#E5E7EB",
            borderRadius: 10,
            padding: "9px 12px",
            cursor: "pointer",
            fontWeight: 800,
            fontSize: 12,
          }}
        >
          Sair
        </button>

        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.12)",
            margin: "20px 0",
          }}
        />

        <MenuButton
          ativo={telaAtual === "faturamento"}
          onClick={() => setTelaAtual("faturamento")}
        >
          Faturamento
        </MenuButton>

        <MenuButton
          ativo={
            telaAtual === "estoque" ||
            telaAtual === "ajusteSaldo" ||
            telaAtual === "ajusteSaldoBBBaterias"
          }
          onClick={() => setTelaAtual("estoque")}
        >
          Estoque
        </MenuButton>

        <SubMenuButton
          ativo={telaAtual === "estoque"}
          onClick={() => setTelaAtual("estoque")}
        >
          Painel Estoque
        </SubMenuButton>

        <SubMenuButton
          ativo={telaAtual === "ajusteSaldo"}
          onClick={() => setTelaAtual("ajusteSaldo")}
        >
          Ajuste de Saldo - Equipatech
        </SubMenuButton>

        <SubMenuButton
          ativo={telaAtual === "ajusteSaldoBBBaterias"}
          onClick={() => setTelaAtual("ajusteSaldoBBBaterias")}
        >
          Ajuste de Saldo - BBBaterias
        </SubMenuButton>

        <MenuButton
          ativo={telaAtual === "consultaPecas"}
          onClick={() => setTelaAtual("consultaPecas")}
        >
          Consulta de Peças
        </MenuButton>
      </aside>

      <main style={{ flex: 1, padding: 28, overflowX: "hidden" }}>
        <div style={{ display: telaAtual === "faturamento" ? "block" : "none" }}>
          <TelaFaturamento />
        </div>

        <div style={{ display: telaAtual === "estoque" ? "block" : "none" }}>
          <TelaEstoque />
        </div>

        <div
          style={{
            display: telaAtual === "ajusteSaldo" ? "block" : "none",
          }}
        >
          <TelaAjusteSaldo />
        </div>

        <div
          style={{
            display: telaAtual === "ajusteSaldoBBBaterias" ? "block" : "none",
          }}
        >
          <TelaAjusteSaldoBBBaterias />
        </div>

        <div
          style={{
            display: telaAtual === "consultaPecas" ? "block" : "none",
          }}
        >
          <TelaConsultaPecas />
        </div>
      </main>
    </div>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 22,
  alignItems: "flex-start",
};

const titleStyle = {
  margin: 0,
  fontSize: 30,
  color: "#111827",
};

const subtitleStyle = {
  color: "#6B7280",
  marginTop: 8,
};

const buttonAtualizarStyle = (carregando) => ({
  height: 40,
  border: "1px solid #D1D5DB",
  background: "#fff",
  borderRadius: 10,
  padding: "0 16px",
  cursor: carregando ? "not-allowed" : "pointer",
  fontWeight: 700,
});

const erroStyle = {
  background: "#FCEBEB",
  color: "#A32D2D",
  padding: 12,
  borderRadius: 10,
  marginBottom: 16,
  fontWeight: 700,
};

const grid4Style = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 12,
  marginBottom: 18,
};

const grid5Style = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: 12,
  marginBottom: 18,
};

const filtroTopoStyle = {
  background: "#fff",
  border: "1px solid #E5E7EB",
  borderRadius: 14,
  padding: 16,
  marginBottom: 18,
};

const gridBuscaStyle = {
  display: "grid",
  gridTemplateColumns: "2fr auto",
  gap: 12,
};

const inputBuscaStyle = {
  border: "1px solid #D1D5DB",
  borderRadius: 10,
  padding: "10px 12px",
  fontSize: 13,
};

const buttonLimparStyle = {
  border: "1px solid #D1D5DB",
  background: "#fff",
  borderRadius: 10,
  padding: "0 14px",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: 13,
};

const tableSectionStyle = {
  background: "#fff",
  border: "1px solid #E5E7EB",
  borderRadius: 14,
  overflow: "hidden",
};

const tableHeaderStyle = {
  padding: "14px 16px",
  background: "#F9FAFB",
  borderBottom: "1px solid #E5E7EB",
  fontWeight: 800,
  display: "flex",
  justifyContent: "space-between",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 13,
};

const th = {
  textAlign: "left",
  padding: "10px 12px",
  color: "#6B7280",
  fontSize: 11,
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};

const td = {
  padding: "10px 12px",
  whiteSpace: "nowrap",
};

const tdBold = {
  padding: "10px 12px",
  whiteSpace: "nowrap",
  fontWeight: 800,
};

const tdCentro = {
  padding: 28,
  textAlign: "center",
  color: "#6B7280",
};