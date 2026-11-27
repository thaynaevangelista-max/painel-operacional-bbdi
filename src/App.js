import React from "react";
import ReactDOM from "react-dom";

// React no formato que o código compilado espera (o.default.createElement, o.useState...)
const o = { ...React, default: React };
const gg = ReactDOM;

var lo =
    "https://script.google.com/macros/s/AKfycbzpxMBPabGe5Xk16KQBmqmC7_SDzJrncmiAqTgU_Y0az1IkDzUawCW3qQ1gHCrutqlv/exec",
  Gv =
    "https://script.google.com/a/macros/bbdi.com.br/s/AKfycbw_60TLX8mspcA1pjnX9XM5vOpFWh05Sps_ESjlQGTcUijq7Wlzd_O1UF6ChPtwkEXK/exec",
  Qv =
    "https://script.google.com/a/macros/bbdi.com.br/s/AKfycbw_60TLX8mspcA1pjnX9XM5vOpFWh05Sps_ESjlQGTcUijq7Wlzd_O1UF6ChPtwkEXK/exec?page=gestao",
  Xv =
    "https://script.google.com/a/macros/bbdi.com.br/s/AKfycby7AXNqbSs5ZRnLYa22oCk68S-i2Wuz_Nd8B-c1seLu6qdvfgdX1LvbA2p1Dww7FESZoA/exec",
  Ac = "https://njvcostescybgwbnipec.supabase.co",
  x0 =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qdmNvc3Rlc2N5Ymd3Ym5pcGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxNzkxNzMsImV4cCI6MjEwNTc1NTE3M30.ZR9V23Fs-MzYznZCIRrTf2uXwc5oHiltb8hpmgJHADI",
  Jv = [
    { usuario: "BBDI", senha: "BBDI@2026", perfil: "geral" },
    { usuario: "LOGISTICA", senha: "LOG@2026", perfil: "logistica" },
  ],
  Yv = [
    "listaFaturamento",
    "separacaoLista",
    "faturamentoBB",
    "ajusteSaldoBB",
    "viaLeitor",
    "producaoSolicitacoes",
    "ajusteSaldo",
    "indicadorDiario",
    "indicadorExpedicaoDiario",
    "indicadorFaturamentoMensal",
    "indicadorExpedicaoMensal",
    "indicadorAbastecimentoEstoque",
    "indicadorAbastecimentoMensal",
    "indicadorSeparacaoDiario",
    "indicadorSeparacaoMensal",
  ],
  dc = "painel_operacional_logado",
  Zv = [
    { key: "equipatech", nome: "Equipatech" },
    { key: "bbbaterias", nome: "BBBaterias" },
  ],
  ir = {
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
  },
  B0 = {
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
  },
  S0 = {
    filial: "",
    dataHora: "",
    vendedor: "",
    codigoPeca: "",
    tipoSolicitacao: "",
    status: "",
    tempoAguardando: "",
    tempoResposta: "",
    statusResposta: "",
    dataResposta: "",
    respondidoPor: "",
  };
var Vu = {
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
  },
  Gu = {
    pedido: "",
    cliente: "",
    quantidadeTotal: "",
    totalItens: "",
    produzir: "",
    avisarVendedor: "",
    naoProduzir: "",
    transportes: "",
    statusResumo: "",
  },
  E0 = {
    produto: "",
    saldoEquipatech: "",
    semanasEstoque: "",
    produzirSemanas: "",
    transformarQuantidades: "",
    opcao1: "",
    saldo1: "",
    opcao2: "",
    saldo2: "",
    opcao3: "",
    saldo3: "",
  },
  C0 = {
    dataHoraFinanceiro: "",
    pedido: "",
    cliente: "",
    produto: "",
    quantidadeLiberada: "",
    equipa01: "",
    equipa98: "",
    bateria01: "",
    endereco: "",
    status: "",
  },
  w0 = {
    status: "",
    solicitante: "",
    produto: "",
    quantidade: "",
    dataHoraSolicitacao: "",
    prioridade: "",
    endereco: "",
    pedido: "",
    situacaoEntrega: "",
    prazoFaturamento: "",
    tempoRestanteCalculado: "",
  },
  A0 = {
    semana: "",
    mes: "",
    data: "",
    diaSemana: "",
    observacoes: "",
    pedidos001: "",
    pedidos002: "",
    pedidos005: "",
    pedidosGeral: "",
    unidades001: "",
    unidades002: "",
    unidades005: "",
    unidadesGeral: "",
    pedidos1030BB: "",
    pedidos1040BB: "",
    pedidos0104EQ: "",
    pedidos0105EQ: "",
  },
  k0 = {
    data: "",
    diaSemana: "",
    pedidos0101: "",
    pedidos0102: "",
    pedidos1020: "",
    pedidosGeral: "",
    unidades0101: "",
    unidades0102: "",
    unidades1020: "",
    unidadesGeral: "",
    observacao: "",
    c0101Atraso: "",
    c0101Faturados: "",
    c0101Enviados: "",
    c0101UnidadesEnviadas: "",
    c0101UnidadesFaturadas: "",
    c0102Atraso: "",
    c0102Faturados: "",
    c0102Enviados: "",
    c0102UnidadesEnviadas: "",
    c0102UnidadesFaturadas: "",
    c1020Atraso: "",
    c1020Faturados: "",
    c1020Enviados: "",
    c1020UnidadesEnviadas: "",
    c1020UnidadesFaturadas: "",
    geralAtraso: "",
    geralFaturados: "",
    geralTotalEnviados: "",
    geralUnidadesEnviadas: "",
    geralUnidadesFaturadas: "",
  },
  F0 = { data: "", meta: "", realizado: "", percentualCalculado: "", statusMeta: "" };
function Te(e) {
  return String(e || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}
function bn(e, t) {
  typeof window > "u" ||
    ((window.__BBDI_PAINEL_CACHE__ = window.__BBDI_PAINEL_CACHE__ || {}),
    (window.__BBDI_PAINEL_CACHE__[e] = Array.isArray(t) ? t : []));
}
function uc(e) {
  return typeof window > "u" ? [] : window.__BBDI_PAINEL_CACHE__?.[e] || [];
}
function tn(e) {
  let t = true,
    n = null,
    a = false,
    r = async () => {
      if (!(!t || a)) {
        a = true;
        try {
          await e();
        } catch (l) {
          console.error("Falha na atualização sincronizada:", l);
        } finally {
          a = false;
        }
      }
    },
    i = () => {
      if (!t) return;
      let l = Date.now(),
        d = (Math.floor(l / 6e4) + 1) * 6e4,
        u = Math.max(0, d - l + 100);
      n = setTimeout(async () => {
        t && (await r(), i());
      }, u);
    };
  return (
    r(),
    i(),
    () => {
      ((t = false), n && clearTimeout(n));
    }
  );
}
var hg = "bbdi_base_transformacoes_v1";
function vg(e) {
  return String(e || "")
    .trim()
    .toUpperCase();
}
function Rv(e) {
  let t = String(e || "").trim();
  return t !== "" && t !== "-" && t !== "--";
}
function P0() {
  if (typeof window > "u") return { dados: [], atualizadoEm: "" };
  try {
    let e = JSON.parse(window.localStorage.getItem(hg) || "null");
    return !e || !Array.isArray(e.dados)
      ? { dados: [], atualizadoEm: "" }
      : { dados: e.dados, atualizadoEm: e.atualizadoEm || "" };
  } catch {
    return { dados: [], atualizadoEm: "" };
  }
}
function ey(e, t) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(hg, JSON.stringify({ dados: Array.isArray(e) ? e : [], atualizadoEm: t || "" }));
    } catch {}
}
function ty(e) {
  let t = /* @__PURE__ */ new Map();
  return (
    (Array.isArray(e) ? e : []).forEach((n) => {
      let a = vg(n.produto);
      a && !t.has(a) && t.set(a, n);
    }),
    t
  );
}
function fr(e) {
  if (!e) return null;
  let t = String(e)
    .trim()
    .match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (!t) return null;
  let [, n, a, r, i, l, d = "0"] = t;
  return new Date(Number(r), Number(a) - 1, Number(n), Number(i), Number(l), Number(d));
}
function oy(e) {
  if (e == null || Number.isNaN(e)) return "—";
  let t = Math.max(0, Math.floor(e / 1e3)),
    n = Math.floor(t / 86400),
    a = Math.floor((t % 86400) / 3600),
    r = Math.floor((t % 3600) / 60),
    i = t % 60;
  return n > 0 ? `${n}d ${a}h ${r}min` : a > 0 ? `${a}h ${r}min` : r > 0 ? `${r}min ${i}s` : `${i}s`;
}
function ny(e, t) {
  let n = fr(e),
    a = fr(t);
  return !n || !a ? "—" : oy(a.getTime() - n.getTime());
}
function ay(e, t) {
  let n = fr(e),
    a = fr(t);
  return !n || !a
    ? "Aguardando"
    : Math.floor(Math.max(0, a.getTime() - n.getTime()) / 6e4) <= 60
      ? "No prazo"
      : "Atraso";
}
function yg(e, t) {
  let n = fr(e);
  if (!n) return { texto: "-", atrasado: false, urgente: false, categoria: "Sem prazo" };
  let a = n.getTime() - t.getTime(),
    r = a < 0,
    i = Math.floor(Math.abs(a) / 1e3),
    l = Math.floor(i / 86400),
    d = Math.floor((i % 86400) / 3600),
    u = Math.floor((i % 3600) / 60),
    p = i % 60,
    c = l > 0 ? `${l}d ${d}h ${u}min` : d > 0 ? `${d}h ${u}min ${p}s` : `${u}min ${p}s`,
    g = !r && i <= 3600;
  return {
    texto: r ? `Atrasado há ${c}` : c,
    atrasado: r,
    urgente: g,
    categoria: r ? "Atrasado" : g ? "Vence em menos de 1h" : "No prazo",
  };
}
function El(e) {
  if (!e) return null;
  if (e instanceof Date && !Number.isNaN(e.getTime())) return e;
  let t = String(e).trim(),
    n = t.match(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})(?:[ ]+([0-9]{2}):([0-9]{2})(?::([0-9]{2}))?)?$/);
  if (n)
    return new Date(
      Number(n[3]),
      Number(n[2]) - 1,
      Number(n[1]),
      Number(n[4] || 0),
      Number(n[5] || 0),
      Number(n[6] || 0),
    );
  let a = new Date(t);
  return Number.isNaN(a.getTime()) ? null : a;
}
function Qu(e) {
  let t = new Date(e);
  return (t.setHours(0, 0, 0, 0), t);
}
function Xu(e) {
  let t = new Date(e);
  return (t.setHours(23, 59, 59, 999), t);
}
function ry(e, t) {
  let n = Array.isArray(t) ? t : [t];
  for (let a of n) {
    let r = El(e[a]);
    if (r) return r;
  }
  return null;
}
function on(e, t, n, a) {
  if (!n || n === "todos") return e;
  let r = /* @__PURE__ */ new Date(),
    i = null,
    l = null;
  if ((n === "hoje" && ((i = Qu(r)), (l = Xu(r))), n === "ontem")) {
    let d = new Date(r);
    (d.setDate(d.getDate() - 1), (i = Qu(d)), (l = Xu(d)));
  }
  if (n === "ultimos") {
    let d = Math.max(1, Number(a || 7));
    ((i = Qu(r)), i.setDate(i.getDate() - (d - 1)), (l = Xu(r)));
  }
  return !i || !l
    ? e
    : e.filter((d) => {
        let u = ry(d, t);
        return u ? u >= i && u <= l : false;
      });
}
function Je(e) {
  if (e == null || e === "") return null;
  let t = Number(String(e).replace("%", "").replace(/\./g, "").replace(",", ".").trim());
  return Number.isNaN(t) ? null : t;
}
function Sa(e, t) {
  let n = e.map((a) => Je(a[t])).filter((a) => a !== null);
  return n.length ? `${(n.reduce((a, r) => a + r, 0) / n.length).toFixed(2).replace(".", ",")}%` : "0,00%";
}
function wa(e) {
  if (e == null || e === "") return 0;
  let t = Number(
    String(e)
      .replace(/\./g, "")
      .replace(",", ".")
      .replace(/[^0-9.-]/g, ""),
  );
  return Number.isNaN(t) ? 0 : t;
}
function Po(e, t, n, a) {
  let r = Te(t);
  return e.filter((i) => {
    let l = !r || a.some((u) => Te(i[u]).includes(r)),
      d = Object.entries(n).every(([u, p]) => !p || String(i[u] ?? "") === String(p));
    return l && d;
  });
}
function Aa(e, t) {
  return [...new Set(e.map((n) => n[t]).filter((n) => n != null && String(n).trim() !== ""))].sort((n, a) =>
    String(n).localeCompare(String(a), "pt-BR"),
  );
}
function bg(e) {
  let t = /* @__PURE__ */ new Map();
  e.forEach((a, r) => {
    let i = String(a.pedido || `sem-${r}`).trim();
    (t.has(i) || t.set(i, []), t.get(i).push(a));
  });
  let n = /* @__PURE__ */ new Map();
  return (
    t.forEach((a, r) => {
      let i = a.length,
        l = a.filter((d) => Te(d.status).includes("entregue")).length;
      n.set(r, l === i && i > 0 ? "Separação concluída" : l > 0 ? "Em separação" : "Separação não iniciada");
    }),
    e.map((a, r) => {
      let i = String(a.pedido || `sem-${r}`).trim(),
        l = n.get(i) || "Separação não iniciada",
        d = a.status || "",
        u = Te(d).includes("entregue");
      return { ...a, statusOriginal: d, status: l === "Em separação" && u ? d : l };
    })
  );
}
function Ho(e) {
  let t = Te(e);
  return t.includes("separacao nao iniciada") || t.includes("separação não iniciada")
    ? "vermelho"
    : t.includes("em separacao") || t.includes("em separação")
      ? "laranja"
      : t.includes("separacao concluida") ||
          t.includes("separação concluída") ||
          t.includes("concluido") ||
          t.includes("concluído") ||
          t.includes("concluida") ||
          t.includes("concluída")
        ? "verde"
        : t.includes("avisar vendedor")
          ? "vermelho"
          : t === "produzir"
            ? "azul"
            : t.includes("nao produzir") || t.includes("não produzir") || t.includes("no prazo")
              ? "verde"
              : t.includes("atras")
                ? "vermelho"
                : t.includes("entregue") || t.includes("disponivel")
                  ? "verde"
                  : t.includes("indisponivel")
                    ? "vermelho"
                    : t.includes("aguardando")
                      ? "laranja"
                      : t.includes("pendente")
                        ? "vermelho"
                        : t.includes("verificando saldo")
                          ? "laranja"
                          : t.includes("ajustado") || t.includes("resolvido")
                            ? "verde"
                            : "cinza";
}
function iy(e) {
  let t = Te(e);
  return t.includes("avisado")
    ? "azul"
    : t.includes("comprar") && !t.includes("nao comprar") && !t.includes("não comprar")
      ? "verde"
      : t.includes("nao comprar") || t.includes("não comprar")
        ? "vermelho"
        : Ho(e);
}
function ui(e) {
  if (e == null || e === "") return "0";
  let t = Number(
    String(e)
      .replace(/\./g, "")
      .replace(",", ".")
      .replace(/[^0-9.-]/g, ""),
  );
  return Number.isNaN(t) ? String(e || "0") : Math.round(t).toLocaleString("pt-BR");
}
function sy(e) {
  let t = Te(e);
  return t
    ? t.includes("conclu") || t.includes("entregue")
      ? "verde"
      : t.includes("nao iniciada")
        ? "vermelho"
        : t.includes("pedido de venda")
          ? "azul"
          : "cinza"
    : "cinza";
}
function xg(e) {
  return e.atrasado ? "vermelho" : e.urgente ? "laranja" : e.texto === "-" ? "cinza" : "verde";
}
function _0(e) {
  if (e == null || e === "") return "";
  let t = String(e).trim(),
    n = fr(t);
  if (n) return n.getTime();
  let a = Number(
    t
      .split(".")
      .join("")
      .replace(",", ".")
      .replace(/[^0-9.-]/g, ""),
  );
  return !Number.isNaN(a) && /[0-9]/.test(t) ? a : Te(t);
}
function ly(e, t) {
  return !t.campo || !t.direcao
    ? e
    : [...e].sort((n, a) => {
        let r = _0(n[t.campo]),
          i = _0(a[t.campo]);
        if (r === "" && i !== "") return 1;
        if (r !== "" && i === "") return -1;
        if (r === "" && i === "") return 0;
        let l =
          typeof r == "number" && typeof i == "number"
            ? r - i
            : String(r).localeCompare(String(i), "pt-BR", { numeric: true, sensitivity: "base" });
        return t.direcao === "asc" ? l : -l;
      });
}
function dy(e, t) {
  return e.campo !== t ? "asc" : e.direcao === "asc" ? "desc" : e.direcao === "desc" ? "" : "asc";
}
function uy(e) {
  let t = /* @__PURE__ */ new Map();
  return (
    e.forEach((n) => {
      let a = n.pedido || "-";
      t.has(a) ||
        t.set(a, {
          pedido: a,
          cliente: n.cliente || "",
          quantidadeTotal: 0,
          totalItens: 0,
          produzir: 0,
          avisarVendedor: 0,
          naoProduzir: 0,
          transportesLista: /* @__PURE__ */ new Set(),
          statusResumo: "",
        });
      let r = t.get(a),
        i = Number(n.quantidadeLiberadaNumero || n.quantidadeLiberada || 0);
      ((r.quantidadeTotal += Number.isNaN(i) ? 0 : i), (r.totalItens += 1));
      let l = Te(n.status);
      (l === "produzir" && (r.produzir += 1),
        l.includes("avisar vendedor") && (r.avisarVendedor += 1),
        (l.includes("nao produzir") || l.includes("não produzir")) && (r.naoProduzir += 1),
        n.transporte && r.transportesLista.add(n.transporte));
    }),
    Array.from(t.values()).map((n) => {
      let a = "Não produzir";
      return (
        n.avisarVendedor > 0 ? (a = "Avisar vendedor") : n.produzir > 0 && (a = "Produzir"),
        { ...n, statusResumo: a, transportes: Array.from(n.transportesLista).join(", "), transportesLista: void 0 }
      );
    })
  );
}
var s = {
    sidebarBg: "var(--side-bg)",
    sidebarBd: "var(--side-bd)",
    grad1: "var(--accent)",
    grad2: "var(--green)",
    grad3: "var(--red)",
    grad4: "var(--blue)",
    grad5: "var(--amber)",
    grad6: "var(--purple)",
    primary: "var(--accent-tx)",
    primaryDark: "var(--accent-2)",
    primaryLight: "var(--accent-soft)",
    primaryGrad: "var(--accent)",
    bgPage: "var(--page)",
    bgCard: "var(--surf)",
    bgCardGrad: "var(--surf)",
    bgStripe: "var(--surf-alt)",
    bgMuted: "var(--surf-muted)",
    txtPri: "var(--txt)",
    txtSec: "var(--txt-2)",
    txtMuted: "var(--txt-muted)",
    bdLight: "var(--bd)",
    bdMid: "var(--bd-strong)",
    green: "var(--green)",
    greenBg: "var(--green-bg)",
    greenBd: "var(--green-bd)",
    red: "var(--red)",
    redBg: "var(--red-bg)",
    redBd: "var(--red-bd)",
    amber: "var(--amber)",
    amberBg: "var(--amber-bg)",
    amberBd: "var(--amber-bd)",
    blue: "var(--blue)",
    blueBg: "var(--blue-bg)",
    blueBd: "var(--blue-bd)",
    orange: "var(--orange)",
    orangeBg: "var(--orange-bg)",
    orangeBd: "var(--orange-bd)",
    shadowSm: "var(--sh-sm)",
    shadowMd: "var(--sh-md)",
    shadowLg: "var(--sh-lg)",
    shadowXl: "var(--sh-xl)",
    shadowCard: "var(--sh-card)",
    radius: { sm: 6, md: 8, lg: 10, xl: 12, pill: 999 },
    font: "'Inter', 'Segoe UI', system-ui, sans-serif",
    fontMono: "'JetBrains Mono', ui-monospace, monospace",
  },
  Bg = "bbdi_tema",
  cy = `
:root{
  color-scheme: light;
  --page:#f3f5f9; --surf:#ffffff; --surf-alt:#f8fafc; --surf-head:#eef2f7; --surf-muted:#eef2f7;
  --txt:#0f172a; --txt-2:#475569; --txt-muted:#64748b;
  --bd:#e2e8f0; --bd-strong:#cbd5e1;
  --accent:#2f5bea; --accent-2:#2549c9; --accent-soft:#eaf0ff; --accent-tx:#2549c9; --accent-rgb:47,91,234;
  --green:#0f9d6e; --green-bg:#e7f7f0; --green-bd:#a7e3c8; --green-tx:#0b7a55;
  --red:#d92d20; --red-bg:#fdecea; --red-bd:#f5c2c0; --red-tx:#b3261e;
  --amber:#d97706; --amber-bg:#fff7e0; --amber-bd:#f0d99a; --amber-tx:#8a4b00;
  --blue:#2f7fd6; --blue-bg:#e8f2fd; --blue-bd:#b9d6f5; --blue-tx:#1d4ed8;
  --purple:#7c3aed; --purple-bg:#ede9fe; --purple-bd:#d3c6fb; --purple-tx:#6d28d9;
  --orange:#ea580c; --orange-bg:#ffedd5; --orange-bd:#fdc89a; --orange-tx:#c2410c;
  --side-bg:#0f172a; --side-bd:rgba(255,255,255,0.07);
  --sh-sm:0 1px 2px rgba(15,23,42,0.06);
  --sh-md:0 4px 12px rgba(15,23,42,0.08);
  --sh-lg:0 10px 28px rgba(15,23,42,0.12);
  --sh-xl:0 24px 60px rgba(15,23,42,0.35);
  --sh-card:0 1px 2px rgba(15,23,42,0.05), 0 1px 3px rgba(15,23,42,0.04);
}
:root[data-tema="escuro"]{
  color-scheme: dark;
  --page:#0b1120; --surf:#111a2e; --surf-alt:#0e1628; --surf-head:#16223a; --surf-muted:#18243d;
  --txt:#e8edf7; --txt-2:#b6c2d9; --txt-muted:#8493ad;
  --bd:#22304a; --bd-strong:#2f4062;
  --accent:#3f6df0; --accent-2:#5b86ff; --accent-soft:rgba(107,140,255,0.15); --accent-tx:#9db3ff; --accent-rgb:107,140,255;
  --green:#34d399; --green-bg:rgba(52,211,153,0.12); --green-bd:rgba(52,211,153,0.38); --green-tx:#6ee7b7;
  --red:#f87171; --red-bg:rgba(248,113,113,0.12); --red-bd:rgba(248,113,113,0.38); --red-tx:#fca5a5;
  --amber:#fbbf24; --amber-bg:rgba(251,191,36,0.12); --amber-bd:rgba(251,191,36,0.38); --amber-tx:#fcd34d;
  --blue:#60a5fa; --blue-bg:rgba(96,165,250,0.12); --blue-bd:rgba(96,165,250,0.38); --blue-tx:#93c5fd;
  --purple:#a78bfa; --purple-bg:rgba(167,139,250,0.14); --purple-bd:rgba(167,139,250,0.4); --purple-tx:#c4b5fd;
  --orange:#fb923c; --orange-bg:rgba(251,146,60,0.13); --orange-bd:rgba(251,146,60,0.4); --orange-tx:#fdba74;
  --side-bg:#070c18; --side-bd:rgba(255,255,255,0.06);
  --sh-sm:0 1px 2px rgba(0,0,0,0.35);
  --sh-md:0 4px 14px rgba(0,0,0,0.38);
  --sh-lg:0 10px 30px rgba(0,0,0,0.45);
  --sh-xl:0 24px 60px rgba(0,0,0,0.6);
  --sh-card:0 1px 2px rgba(0,0,0,0.30), 0 0 0 1px rgba(255,255,255,0.02);
}
html,body{background:var(--page);margin:0}
.bbdi-nav{background:transparent;transition:background .15s,color .15s}
.bbdi-nav:hover{background:rgba(255,255,255,0.06)}
.bbdi-card-btn{transition:transform .15s,box-shadow .15s,border-color .15s}
.bbdi-card-btn:hover{transform:translateY(-1px);box-shadow:var(--sh-md)!important}
body{color:var(--txt);-webkit-font-smoothing:antialiased;transition:background-color .2s,color .2s}
::selection{background:rgba(var(--accent-rgb),0.25)}
input,select,textarea{color-scheme:inherit}
input::placeholder,textarea::placeholder{color:var(--txt-muted);opacity:.8}
input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid rgba(var(--accent-rgb),0.45);outline-offset:1px}
button:focus-visible,a:focus-visible{outline:2px solid rgba(var(--accent-rgb),0.55);outline-offset:2px}
select option{background:var(--surf);color:var(--txt)}
*::-webkit-scrollbar{width:10px;height:10px}
*::-webkit-scrollbar-thumb{background:var(--bd-strong);border-radius:8px;border:2px solid transparent;background-clip:content-box}
*::-webkit-scrollbar-track{background:transparent}
@media print{:root,:root[data-tema="escuro"]{--page:#fff;--surf:#fff;--txt:#000;--txt-2:#222;--txt-muted:#444;--bd:#ccc;--bd-strong:#999}}
`;
function py() {
  try {
    let e = localStorage.getItem(Bg);
    if (e === "claro" || e === "escuro") return e;
  } catch {}
  return typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "escuro"
    : "claro";
}
function fy() {
  let [e, t] = (0, o.useState)(py);
  ((0, o.useLayoutEffect)(() => {
    let a = document.getElementById("bbdi-tema-css");
    (a || ((a = document.createElement("style")), (a.id = "bbdi-tema-css"), document.head.appendChild(a)),
      (a.textContent = cy));
  }, []),
    (0, o.useLayoutEffect)(() => {
      document.documentElement.setAttribute("data-tema", e);
      try {
        localStorage.setItem(Bg, e);
      } catch {}
    }, [e]));
  let n = (0, o.useCallback)(() => t((a) => (a === "escuro" ? "claro" : "escuro")), []);
  return [e, n];
}
function Sg({ tema: e, alternar: t, compacto: n, sobreEscuro: a }) {
  let r = e === "escuro";
  return o.default.createElement(
    "button",
    {
      type: "button",
      onClick: t,
      title: r ? "Mudar para o modo claro" : "Mudar para o modo escuro",
      "aria-label": r ? "Mudar para o modo claro" : "Mudar para o modo escuro",
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: 36,
        padding: n ? "0 10px" : "0 12px",
        borderRadius: s.radius.md,
        border: a ? "1px solid rgba(255,255,255,0.16)" : `1px solid ${s.bdMid}`,
        background: a ? "rgba(255,255,255,0.08)" : s.bgCard,
        color: a ? "#e8edf7" : s.txtSec,
        cursor: "pointer",
        fontFamily: s.font,
        fontSize: 12,
        fontWeight: 600,
        boxShadow: a ? "none" : s.shadowSm,
      },
    },
    r
      ? o.default.createElement(
          "svg",
          {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
          },
          o.default.createElement("circle", { cx: "12", cy: "12", r: "4" }),
          o.default.createElement("path", {
            d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
          }),
        )
      : o.default.createElement(
          "svg",
          {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
          },
          o.default.createElement("path", { d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" }),
        ),
    !n && o.default.createElement("span", null, r ? "Modo claro" : "Modo escuro"),
  );
}
function gt({ texto: e, tipo: t }) {
  let n = {
      verde: { bg: s.greenBg, color: s.green, bd: s.greenBd },
      vermelho: { bg: s.redBg, color: s.red, bd: s.redBd },
      azul: { bg: s.blueBg, color: s.blue, bd: s.blueBd },
      laranja: { bg: s.amberBg, color: s.amber, bd: s.amberBd },
      cinza: { bg: s.bgMuted, color: s.txtMuted, bd: s.bdLight },
    },
    a = n[t] || n.cinza;
  return o.default.createElement(
    "span",
    {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: a.bg,
        color: a.color,
        border: `1px solid ${a.bd}`,
        padding: "2px 9px",
        borderRadius: s.radius.pill,
        fontSize: 10,
        fontWeight: 800,
        fontFamily: s.font,
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
        textTransform: "uppercase",
      },
    },
    e || "—",
  );
}
function ze({ titulo: e, valor: t, subtitulo: n, onClick: a, ativo: r }) {
  let i = [s.grad1, s.grad4, s.grad2, s.grad5, s.grad6, s.grad3],
    l = Math.abs(e.charCodeAt(0) + e.charCodeAt(1)) % i.length,
    d = i[l];
  return o.default.createElement(
    "div",
    {
      onClick: a,
      style: {
        background: s.bgCard,
        borderRadius: s.radius.xl,
        padding: "18px 20px 16px",
        cursor: a ? "pointer" : "default",
        boxShadow: r ? "0 8px 28px rgba(var(--accent-rgb),0.25)" : s.shadowCard,
        border: r ? `1px solid ${s.primary}` : `1px solid ${s.bdLight}`,
        position: "relative",
        overflow: "hidden",
        transition: "all 180ms ease",
      },
    },
    o.default.createElement("div", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: d,
        borderRadius: `${s.radius.xl}px ${s.radius.xl}px 0 0`,
      },
    }),
    o.default.createElement(
      "div",
      {
        style: {
          fontSize: 10,
          fontWeight: 800,
          color: s.txtMuted,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontFamily: s.font,
          marginBottom: 10,
        },
      },
      e,
    ),
    o.default.createElement(
      "div",
      {
        style: {
          fontSize: 30,
          fontWeight: 800,
          color: r ? s.primary : s.txtPri,
          fontFamily: s.fontMono,
          letterSpacing: "-0.04em",
          lineHeight: 1,
        },
      },
      t ?? 0,
    ),
    a &&
      o.default.createElement(
        "div",
        {
          style: {
            marginTop: 10,
            fontSize: 9,
            color: r ? s.primary : s.txtMuted,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontFamily: s.font,
          },
        },
        r ? "● Filtrado" : "clique para filtrar",
      ),
  );
}
function my({ titulo: e, value: t, onChange: n, options: a, sortOrder: r, onSort: i }) {
  let l = t !== "";
  return o.default.createElement(
    "div",
    { style: { display: "flex", alignItems: "center", gap: 3 } },
    o.default.createElement("span", { style: { flex: 1, fontFamily: s.font } }, e),
    o.default.createElement(
      "button",
      {
        type: "button",
        onClick: i,
        style: {
          width: 18,
          height: 18,
          borderRadius: 5,
          fontSize: 9,
          cursor: "pointer",
          padding: 0,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: r ? "rgba(var(--accent-rgb),0.12)" : "transparent",
          border: r ? "1px solid rgba(var(--accent-rgb),0.4)" : `1px solid ${s.bdMid}`,
          color: r ? s.primary : s.txtMuted,
        },
      },
      r === "asc" ? "↑" : r === "desc" ? "↓" : "↕",
    ),
    o.default.createElement(
      "select",
      {
        value: t,
        onChange: (d) => n(d.target.value),
        style: {
          width: 18,
          height: 18,
          borderRadius: 5,
          fontSize: 8,
          cursor: "pointer",
          padding: 0,
          color: "transparent",
          flexShrink: 0,
          background: l ? "rgba(var(--accent-rgb),0.10)" : "transparent",
          border: l ? "1px solid rgba(var(--accent-rgb),0.4)" : `1px solid ${s.bdMid}`,
        },
      },
      o.default.createElement("option", { value: "" }),
      a.map((d) => o.default.createElement("option", { key: d, value: d, style: { color: s.txtPri } }, d)),
    ),
  );
}
var Cl = (0, o.createContext)({ recolhido: false, expandir: () => {} }),
  L0 = "painel_menu_recolhido";
function Ju({ ativo: e, onClick: t, children: n, icon: a }) {
  let { recolhido: r } = (0, o.useContext)(Cl);
  return o.default.createElement(
    "button",
    {
      className: "bbdi-nav",
      onClick: t,
      title: r && typeof n == "string" ? n : void 0,
      style: {
        width: "100%",
        borderRadius: s.radius.md,
        padding: r ? "9px 0" : "9px 12px",
        justifyContent: r ? "center" : void 0,
        cursor: "pointer",
        textAlign: "left",
        fontWeight: 600,
        fontSize: 13,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: s.font,
        letterSpacing: "-0.01em",
        transition: "all 150ms ease",
        color: e ? "#fff" : "rgba(226,232,240,0.74)",
        background: e ? "rgba(255,255,255,0.09)" : void 0,
        border: "1px solid transparent",
        boxShadow: e ? "inset 3px 0 0 #5b86ff" : "none",
      },
    },
    o.default.createElement(
      "span",
      {
        style: {
          width: 26,
          height: 26,
          borderRadius: 8,
          flexShrink: 0,
          background: e ? "#3f6df0" : "rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 800,
          color: e ? "#fff" : "rgba(226,232,240,0.6)",
        },
      },
      a,
    ),
    !r && o.default.createElement("span", { style: { flex: 1 } }, n),
  );
}
function sr({ ativo: e, onClick: t, children: n, icon: a }) {
  let { recolhido: r, expandir: i } = (0, o.useContext)(Cl);
  return o.default.createElement(
    "button",
    {
      className: "bbdi-nav",
      onClick: r ? i : t,
      title: r && typeof n == "string" ? n : void 0,
      style: {
        width: "100%",
        borderRadius: s.radius.md,
        padding: r ? "9px 0" : "9px 12px",
        justifyContent: r ? "center" : void 0,
        cursor: "pointer",
        textAlign: "left",
        fontWeight: 600,
        fontSize: 13,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: s.font,
        letterSpacing: "-0.01em",
        transition: "all 150ms ease",
        color: e ? "#fff" : "rgba(226,232,240,0.74)",
        background: e ? "rgba(255,255,255,0.09)" : void 0,
        border: "1px solid transparent",
        boxShadow: e ? "inset 3px 0 0 #5b86ff" : "none",
      },
    },
    o.default.createElement(
      "span",
      {
        style: {
          width: 26,
          height: 26,
          borderRadius: 8,
          flexShrink: 0,
          background: e ? "#3f6df0" : "rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 800,
          color: e ? "#fff" : "rgba(226,232,240,0.6)",
        },
      },
      a,
    ),
    !r && o.default.createElement("span", { style: { flex: 1 } }, n),
    !r &&
      o.default.createElement(
        "span",
        { style: { fontSize: 13, color: e ? "rgba(255,255,255,0.8)" : "rgba(226,232,240,0.4)", fontWeight: 700 } },
        e ? "▾" : "›",
      ),
  );
}
function Ze({ ativo: e, onClick: t, children: n, nivel: a = 0 }) {
  let { recolhido: r } = (0, o.useContext)(Cl);
  return r
    ? null
    : o.default.createElement(
        "button",
        {
          className: "bbdi-nav",
          onClick: t,
          style: {
            width: "100%",
            border: "none",
            borderRadius: 9,
            padding: `8px 12px 8px ${18 + a * 14}px`,
            marginBottom: 2,
            cursor: "pointer",
            textAlign: "left",
            fontWeight: 600,
            fontSize: 12,
            fontFamily: s.font,
            transition: "all 140ms ease",
            color: e ? "#fff" : "rgba(226,232,240,0.6)",
            background: e ? "rgba(255,255,255,0.09)" : void 0,
            borderLeft: e ? "3px solid #5b86ff" : "3px solid rgba(255,255,255,0.08)",
          },
        },
        n,
      );
}
function cc({ href: e, children: t, variante: n = "primario" }) {
  let a = n === "primario";
  return o.default.createElement(
    "a",
    {
      href: e,
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        height: 36,
        borderRadius: s.radius.md,
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        fontWeight: 700,
        fontSize: 12,
        fontFamily: s.font,
        letterSpacing: "-0.01em",
        background: a ? s.primaryGrad : s.bgCard,
        color: a ? "#fff" : s.txtPri,
        border: a ? "none" : `1px solid ${s.bdMid}`,
        boxShadow: a ? "0 4px 14px rgba(var(--accent-rgb),0.35)" : s.shadowSm,
      },
    },
    t,
  );
}
function Ei({ filtrados: e, total: t }) {
  return o.default.createElement(
    "span",
    {
      style: {
        color: s.txtMuted,
        fontSize: 11,
        fontWeight: 700,
        fontFamily: s.font,
        background: s.bgMuted,
        border: `1px solid ${s.bdLight}`,
        borderRadius: s.radius.pill,
        padding: "4px 11px",
      },
    },
    e,
    " / ",
    t,
  );
}
function nn({
  titulo: e,
  dadosBase: t,
  dadosFiltrados: n,
  colunas: a,
  filtros: r,
  onFiltro: i,
  carregando: l,
  mensagemVazia: d,
}) {
  let [u, p] = (0, o.useState)({ campo: "", direcao: "" }),
    c = (0, o.useMemo)(() => ly(n, u), [n, u]);
  return o.default.createElement(
    "section",
    {
      style: {
        background: s.bgCard,
        border: `1px solid ${s.bdLight}`,
        borderRadius: s.radius.xl,
        overflow: "hidden",
        boxShadow: s.shadowCard,
      },
    },
    o.default.createElement(
      "div",
      {
        style: {
          padding: "14px 18px",
          borderBottom: `1px solid ${s.bdLight}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: s.bgStripe,
        },
      },
      o.default.createElement(
        "span",
        { style: { fontWeight: 800, color: s.txtPri, fontSize: 14, fontFamily: s.font, letterSpacing: "-0.02em" } },
        e,
      ),
      o.default.createElement(Ei, { filtrados: n.length, total: t.length }),
    ),
    o.default.createElement(
      "div",
      { style: { overflowX: "auto" } },
      o.default.createElement(
        "table",
        { style: { width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: s.font } },
        o.default.createElement(
          "thead",
          null,
          o.default.createElement(
            "tr",
            { style: { background: s.bgMuted } },
            a.map((g) =>
              o.default.createElement(
                "th",
                {
                  key: g.campo,
                  style: {
                    textAlign: "left",
                    padding: "9px 10px",
                    color: s.txtSec,
                    fontSize: 9,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    fontWeight: 800,
                    letterSpacing: "0.07em",
                    borderBottom: `1px solid ${s.bdLight}`,
                    width: g.width,
                    minWidth: g.minWidth || g.width,
                  },
                },
                o.default.createElement(my, {
                  titulo: g.titulo,
                  value: r[g.campo] || "",
                  onChange: (f) => i(g.campo, f),
                  options: Aa(t, g.campo),
                  sortOrder: u.campo === g.campo ? u.direcao : "",
                  onSort: () => p((f) => ({ campo: g.campo, direcao: dy(f, g.campo) })),
                }),
              ),
            ),
          ),
        ),
        o.default.createElement(
          "tbody",
          null,
          l &&
            !c.length &&
            o.default.createElement(
              "tr",
              null,
              o.default.createElement(
                "td",
                {
                  colSpan: a.length,
                  style: { padding: 28, textAlign: "center", color: s.txtMuted, fontFamily: s.font },
                },
                "Carregando dados…",
              ),
            ),
          !l &&
            !c.length &&
            o.default.createElement(
              "tr",
              null,
              o.default.createElement(
                "td",
                {
                  colSpan: a.length,
                  style: { padding: 28, textAlign: "center", color: s.txtMuted, fontFamily: s.font },
                },
                d,
              ),
            ),
          c.map((g, f) =>
            o.default.createElement(
              "tr",
              {
                key: `r${f}`,
                style: {
                  borderTop: `1px solid ${s.bdLight}`,
                  background: f % 2 === 0 ? s.bgCard : s.bgStripe,
                  transition: "background 100ms",
                },
              },
              a.map((x) =>
                o.default.createElement(
                  "td",
                  {
                    key: x.campo,
                    style: {
                      padding: "8px 10px",
                      whiteSpace: x.wrap ? "normal" : "nowrap",
                      lineHeight: x.wrap ? 1.3 : void 0,
                      color: x.bold ? s.txtPri : s.txtSec,
                      fontWeight: x.bold ? 700 : 400,
                      fontSize: 12,
                      width: x.width,
                      minWidth: x.minWidth || x.width,
                    },
                  },
                  x.render ? x.render(g) : g[x.campo] || "—",
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}
function Wt({ titulo: e, atualizadoEm: t, extraInfo: n, actions: a }) {
  return o.default.createElement(
    "header",
    {
      style: {
        background: s.bgCard,
        borderRadius: s.radius.xl,
        padding: "20px 24px",
        marginBottom: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        boxShadow: s.shadowCard,
        border: `1px solid ${s.bdLight}`,
        position: "relative",
        overflow: "hidden",
      },
    },
    o.default.createElement("div", {
      style: { position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.primaryGrad },
    }),
    o.default.createElement(
      "div",
      null,
      o.default.createElement(
        "div",
        {
          style: {
            fontSize: 10,
            fontWeight: 800,
            color: s.primary,
            textTransform: "uppercase",
            letterSpacing: "0.09em",
            marginBottom: 7,
            fontFamily: s.font,
          },
        },
        "Painel Operacional",
      ),
      o.default.createElement(
        "h1",
        {
          style: {
            margin: 0,
            fontSize: 22,
            color: s.txtPri,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            fontFamily: s.font,
          },
        },
        e,
      ),
      (t || n) &&
        o.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              marginTop: 8,
              color: s.txtMuted,
              fontSize: 11,
              fontFamily: s.font,
            },
          },
          t &&
            o.default.createElement(
              "span",
              null,
              "Atualizado:",
              " ",
              o.default.createElement("strong", { style: { color: s.txtSec } }, t),
            ),
          n,
        ),
    ),
    a &&
      o.default.createElement(
        "div",
        { style: { display: "flex", gap: 9, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" } },
        a,
      ),
  );
}
var uo = (e) => ({
    height: 36,
    border: `1px solid ${s.bdMid}`,
    background: e ? s.bgMuted : s.bgCard,
    borderRadius: s.radius.md,
    padding: "0 16px",
    cursor: e ? "not-allowed" : "pointer",
    fontWeight: 700,
    color: s.txtPri,
    fontSize: 12,
    fontFamily: s.font,
    boxShadow: s.shadowSm,
  }),
  co = {
    background: s.redBg,
    color: s.red,
    padding: 12,
    borderRadius: s.radius.md,
    marginBottom: 16,
    fontWeight: 700,
    border: `1px solid ${s.redBd}`,
    fontSize: 12,
    fontFamily: s.font,
  },
  Fa = {
    border: `1px solid ${s.bdMid}`,
    borderRadius: s.radius.md,
    padding: "8px 12px",
    fontSize: 12,
    outline: "none",
    background: s.bgCard,
    height: 36,
    boxSizing: "border-box",
    fontFamily: s.font,
    color: s.txtPri,
    flex: "1 1 220px",
    maxWidth: 480,
    boxShadow: s.shadowSm,
  },
  mt = {
    border: `1px solid ${s.bdMid}`,
    borderRadius: s.radius.md,
    padding: "6px 10px",
    fontSize: 12,
    outline: "none",
    background: s.bgCard,
    color: s.txtPri,
    fontWeight: 700,
    height: 36,
    boxSizing: "border-box",
    fontFamily: s.font,
    boxShadow: s.shadowSm,
  },
  Pa = {
    border: "none",
    borderRadius: s.radius.md,
    padding: "6px 10px",
    fontSize: 11,
    fontWeight: 800,
    background: "transparent",
    color: s.primary,
    cursor: "pointer",
    height: 36,
    fontFamily: s.font,
  };
function Jn({
  busca: e,
  setBusca: t,
  limparFiltros: n,
  placeholder: a,
  periodoFiltro: r,
  setPeriodoFiltro: i,
  diasPeriodo: l,
  setDiasPeriodo: d,
}) {
  return o.default.createElement(
    "section",
    { style: { marginBottom: 16, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" } },
    o.default.createElement("input", { value: e, onChange: (u) => t(u.target.value), placeholder: a, style: Fa }),
    i &&
      o.default.createElement(
        o.default.Fragment,
        null,
        o.default.createElement(
          "select",
          { value: r, onChange: (u) => i(u.target.value), style: mt },
          o.default.createElement("option", { value: "todos" }, "Todos os períodos"),
          o.default.createElement("option", { value: "hoje" }, "Hoje"),
          o.default.createElement("option", { value: "ontem" }, "Ontem"),
          o.default.createElement("option", { value: "ultimos" }, "Últimos X dias"),
        ),
        r === "ultimos" &&
          o.default.createElement("input", {
            type: "number",
            min: "1",
            value: l,
            onChange: (u) => d(u.target.value),
            style: { ...mt, width: 64 },
          }),
      ),
    o.default.createElement("button", { onClick: n, style: Pa }, "Limpar filtros"),
  );
}
function gy({ onLogin: e, tema: t, alternarTema: n }) {
  let [a, r] = (0, o.useState)(""),
    [i, l] = (0, o.useState)(""),
    [d, u] = (0, o.useState)("");
  function p(c) {
    c.preventDefault();
    let g = Jv.find((f) => f.usuario === a.trim().toUpperCase() && f.senha === i);
    if (!g) {
      u("Usuário ou senha inválidos.");
      return;
    }
    (localStorage.setItem(dc, g.perfil), e(g.perfil));
  }
  return o.default.createElement(
    "div",
    {
      style: {
        minHeight: "100vh",
        background: s.sidebarBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: s.font,
        position: "relative",
      },
    },
    o.default.createElement(
      "div",
      { style: { position: "absolute", top: 16, right: 16 } },
      o.default.createElement(Sg, { tema: t, alternar: n, sobreEscuro: true }),
    ),
    o.default.createElement("div", {
      style: {
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 500,
        height: 500,
        background: "radial-gradient(circle, rgba(var(--accent-rgb),0.18) 0%, transparent 65%)",
        pointerEvents: "none",
      },
    }),
    o.default.createElement(
      "form",
      {
        onSubmit: p,
        style: {
          width: "100%",
          maxWidth: 400,
          background: s.bgCard,
          borderRadius: 16,
          padding: 36,
          boxShadow: s.shadowXl,
          border: `1px solid ${s.bdLight}`,
          position: "relative",
        },
      },
      o.default.createElement("div", {
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: s.primaryGrad,
          borderRadius: "16px 16px 0 0",
        },
      }),
      o.default.createElement(
        "div",
        { style: { display: "flex", gap: 13, alignItems: "center", marginBottom: 30 } },
        o.default.createElement(
          "div",
          {
            style: {
              width: 48,
              height: 48,
              borderRadius: 14,
              background: "#3f6df0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 22,
              color: "#fff",
              flexShrink: 0,
              boxShadow: "0 4px 14px rgba(63,109,240,0.4)",
            },
          },
          "B",
        ),
        o.default.createElement(
          "div",
          null,
          o.default.createElement(
            "h1",
            { style: { margin: 0, fontSize: 20, fontWeight: 800, color: s.txtPri, letterSpacing: "-0.04em" } },
            "Painel Operacional",
          ),
          o.default.createElement(
            "p",
            { style: { margin: "3px 0 0", color: s.txtMuted, fontSize: 12, fontWeight: 600 } },
            "Grupo BBDI — Acesso interno",
          ),
        ),
      ),
      o.default.createElement("div", { style: { height: 1, background: s.bdLight, margin: "0 0 24px" } }),
      o.default.createElement(
        "label",
        {
          style: {
            display: "block",
            fontSize: 11,
            fontWeight: 800,
            color: s.txtSec,
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            marginBottom: 7,
          },
        },
        "Usuário",
      ),
      o.default.createElement("input", {
        value: a,
        onChange: (c) => {
          (r(c.target.value), u(""));
        },
        placeholder: "Digite o usuário",
        autoComplete: "username",
        style: {
          width: "100%",
          boxSizing: "border-box",
          border: `1px solid ${s.bdMid}`,
          borderRadius: s.radius.md,
          padding: "12px 14px",
          fontSize: 14,
          outline: "none",
          background: s.bgStripe,
          fontFamily: s.font,
          color: s.txtPri,
          marginBottom: 16,
        },
      }),
      o.default.createElement(
        "label",
        {
          style: {
            display: "block",
            fontSize: 11,
            fontWeight: 800,
            color: s.txtSec,
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            marginBottom: 7,
          },
        },
        "Senha",
      ),
      o.default.createElement("input", {
        value: i,
        onChange: (c) => {
          (l(c.target.value), u(""));
        },
        placeholder: "••••••••",
        type: "password",
        autoComplete: "current-password",
        style: {
          width: "100%",
          boxSizing: "border-box",
          border: `1px solid ${s.bdMid}`,
          borderRadius: s.radius.md,
          padding: "12px 14px",
          fontSize: 14,
          outline: "none",
          background: s.bgStripe,
          fontFamily: s.font,
          color: s.txtPri,
        },
      }),
      d &&
        o.default.createElement(
          "div",
          {
            style: {
              background: s.redBg,
              color: s.red,
              borderRadius: s.radius.md,
              padding: "10px 13px",
              fontSize: 12,
              fontWeight: 700,
              marginTop: 14,
              border: `1px solid ${s.redBd}`,
            },
          },
          d,
        ),
      o.default.createElement(
        "button",
        {
          type: "submit",
          style: {
            width: "100%",
            height: 46,
            border: "none",
            borderRadius: s.radius.md,
            marginTop: 22,
            background: s.primaryGrad,
            color: "#fff",
            fontWeight: 800,
            fontSize: 14,
            cursor: "pointer",
            fontFamily: s.font,
            boxShadow: s.shadowMd,
          },
        },
        "Entrar",
      ),
      o.default.createElement(
        "p",
        { style: { marginTop: 18, color: s.txtMuted, fontSize: 10, lineHeight: 1.5, textAlign: "center" } },
        "Ambiente de visualização operacional. Informações extraídas das bases conectadas ao Apps Script.",
      ),
    ),
  );
}
function hy() {
  let [e, t] = (0, o.useState)([]),
    [n, a] = (0, o.useState)({}),
    [r, i] = (0, o.useState)(""),
    [l, d] = (0, o.useState)("todos"),
    [u, p] = (0, o.useState)("7"),
    [c, g] = (0, o.useState)(ir),
    [f, x] = (0, o.useState)(false),
    [w, F] = (0, o.useState)(""),
    [v, m] = (0, o.useState)(/* @__PURE__ */ new Date());
  (0, o.useEffect)(() => {
    let _ = setInterval(() => m(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(_);
  }, []);
  let h = (0, o.useCallback)(async () => {
    (x(true), F(""));
    try {
      let _ = await Promise.all(
          Zv.map(async (A) => {
            let I = await fetch(`${lo}?action=dados&fonte=${A.key}`),
              V = await I.json();
            if (!V.ok) throw new Error(V.erro || `Erro ${A.nome}`);
            return {
              fonte: A.key,
              nomeFonte: A.nome,
              atualizadoEm: V.atualizadoEm || "",
              dados: (V.dados || []).map((D) => ({ ...D, empresa: A.nome, fonte: A.key })),
            };
          }),
        ),
        q = _.flatMap((A) => A.dados);
      (t(q), _.forEach((A) => bn(A.fonte, A.dados)));
      let E = {};
      (_.forEach((A) => {
        E[A.nomeFonte] = A.atualizadoEm;
      }),
        a(E));
    } catch (_) {
      F(_.message);
    } finally {
      x(false);
    }
  }, []);
  (0, o.useEffect)(() => tn(h), [h]);
  let y = (0, o.useMemo)(
      () =>
        e.map((_) => {
          let q = yg(_.dataPrazo, v);
          return {
            ..._,
            tempoRestanteCalculado: q.texto,
            tempoRestanteAtrasado: q.atrasado,
            tempoRestanteUrgente: q.urgente,
            tempoRestanteCategoria: q.categoria,
          };
        }),
      [e, v],
    ),
    B = (0, o.useMemo)(() => on(y, "dataLiberacao", l, u), [y, l, u]),
    k = (0, o.useMemo)(
      () =>
        Po(B, r, c, [
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
        ]),
      [B, r, c],
    ),
    L = (0, o.useMemo)(
      () => ({
        totalEQ: k.filter((_) => _.fonte === "equipatech").length,
        urgEQ: k.filter((_) => _.fonte === "equipatech" && _.tempoRestanteUrgente).length,
        totalBB: k.filter((_) => _.fonte === "bbbaterias").length,
        urgBB: k.filter((_) => _.fonte === "bbbaterias" && _.tempoRestanteUrgente).length,
      }),
      [k],
    ),
    C = [
      { campo: "filial", titulo: "Filial", bold: true, width: 54 },
      { campo: "pedido", titulo: "Pedido", bold: true, width: 74 },
      { campo: "dataLiberacao", titulo: "Data Lib.", width: 108 },
      { campo: "quantidade", titulo: "Qtd", width: 52 },
      {
        campo: "status",
        titulo: "Status",
        width: 94,
        render: (_) => o.default.createElement(gt, { texto: _.status, tipo: Ho(_.status) }),
      },
      { campo: "tempoPedido", titulo: "Tempo", width: 82 },
      { campo: "dataPrazo", titulo: "Prazo", width: 108 },
      {
        campo: "tempoRestanteCategoria",
        titulo: "Restante",
        bold: true,
        width: 130,
        render: (_) =>
          o.default.createElement(gt, {
            texto: _.tempoRestanteCalculado,
            tipo: xg({
              texto: _.tempoRestanteCalculado,
              atrasado: _.tempoRestanteAtrasado,
              urgente: _.tempoRestanteUrgente,
            }),
          }),
      },
      { campo: "lista", titulo: "Lista", width: 82 },
      { campo: "faturador", titulo: "Faturador", width: 92, wrap: true },
      {
        campo: "statusSeparacao",
        titulo: "Separação",
        width: 130,
        render: (_) => o.default.createElement(gt, { texto: _.statusSeparacao, tipo: sy(_.statusSeparacao) }),
      },
    ];
  return o.default.createElement(
    o.default.Fragment,
    null,
    o.default.createElement(Wt, {
      titulo: "Faturamento",
      extraInfo: o.default.createElement(
        o.default.Fragment,
        null,
        o.default.createElement(
          "span",
          null,
          "Equipatech:",
          " ",
          o.default.createElement("strong", { style: { color: s.txtSec } }, n.Equipatech || "—"),
        ),
        o.default.createElement(
          "span",
          null,
          "BBBaterias:",
          " ",
          o.default.createElement("strong", { style: { color: s.txtSec } }, n.BBBaterias || "—"),
        ),
        o.default.createElement("span", { style: { fontFamily: s.fontMono } }, v.toLocaleTimeString("pt-BR")),
      ),
      actions: o.default.createElement(
        "button",
        { onClick: h, disabled: f, style: uo(f) },
        f ? "Atualizando…" : "Atualizar",
      ),
    }),
    w && o.default.createElement("div", { style: co }, w),
    o.default.createElement(
      "section",
      { style: { display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12, marginBottom: 18 } },
      o.default.createElement(ze, {
        titulo: "Total Equipatech",
        valor: L.totalEQ,
        onClick: () => {
          (i(""), g({ ...ir, empresa: "Equipatech" }));
        },
        ativo: c.empresa === "Equipatech" && !c.tempoRestanteCategoria,
      }),
      o.default.createElement(ze, {
        titulo: "Vencem <1h · Equipatech",
        valor: L.urgEQ,
        onClick: () => {
          (i(""), g({ ...ir, empresa: "Equipatech", tempoRestanteCategoria: "Vence em menos de 1h" }));
        },
        ativo: c.empresa === "Equipatech" && c.tempoRestanteCategoria === "Vence em menos de 1h",
      }),
      o.default.createElement(ze, {
        titulo: "Total BBBaterias",
        valor: L.totalBB,
        onClick: () => {
          (i(""), g({ ...ir, empresa: "BBBaterias" }));
        },
        ativo: c.empresa === "BBBaterias" && !c.tempoRestanteCategoria,
      }),
      o.default.createElement(ze, {
        titulo: "Vencem <1h · BBBaterias",
        valor: L.urgBB,
        onClick: () => {
          (i(""), g({ ...ir, empresa: "BBBaterias", tempoRestanteCategoria: "Vence em menos de 1h" }));
        },
        ativo: c.empresa === "BBBaterias" && c.tempoRestanteCategoria === "Vence em menos de 1h",
      }),
    ),
    o.default.createElement(Jn, {
      busca: r,
      setBusca: i,
      limparFiltros: () => {
        (i(""), d("todos"), p("7"), g(ir));
      },
      placeholder: "Busca por pedido, filial, faturador…",
      periodoFiltro: l,
      setPeriodoFiltro: d,
      diasPeriodo: u,
      setDiasPeriodo: p,
    }),
    o.default.createElement(nn, {
      titulo: "Pedidos de Faturamento",
      dadosBase: y,
      dadosFiltrados: k,
      colunas: C,
      filtros: c,
      onFiltro: (_, q) => g((E) => ({ ...E, [_]: q })),
      carregando: f,
      mensagemVazia: "Nenhum pedido encontrado.",
    }),
  );
}
function vy() {
  let [e, t] = (0, o.useState)([]),
    [n, a] = (0, o.useState)(""),
    [r, i] = (0, o.useState)("todos"),
    [l, d] = (0, o.useState)("7"),
    [u, p] = (0, o.useState)(B0),
    [c, g] = (0, o.useState)(false),
    [f, x] = (0, o.useState)(""),
    [w, F] = (0, o.useState)(""),
    v = (0, o.useCallback)(async () => {
      (g(true), x(""));
      try {
        let k = await fetch(`${lo}?action=dados&fonte=estoque`),
          L = await k.json();
        if (!L.ok) throw new Error(L.erro || "Erro estoque");
        let C = bg(L.dados || []);
        (t(C), bn("estoque", C), F(L.atualizadoEm || ""));
      } catch (k) {
        x(k.message);
      } finally {
        g(false);
      }
    }, []);
  (0, o.useEffect)(() => tn(v), [v]);
  let m = (0, o.useMemo)(
      () => on(e, ["dataHoraFinanceiro", "dataLancamento", "dataHoraEntregueEstoque"], r, l),
      [e, r, l],
    ),
    h = (0, o.useMemo)(
      () =>
        Po(m, n, u, [
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
        ]),
      [m, n, u],
    ),
    y = (0, o.useMemo)(() => {
      let k = h.length,
        L = new Set(h.map((E) => E.pedido).filter(Boolean)).size,
        C = h.filter((E) => Te(E.statusOriginal || E.status).includes("entregue")).length,
        _ = h.filter((E) => !Te(E.statusOriginal || E.status).includes("entregue")).length,
        q = h.reduce((E, A) => {
          let I = Number(String(A.quantidade || "0").replace(",", "."));
          return E + (isNaN(I) ? 0 : I);
        }, 0);
      return { ti: k, tp: L, en: C, pe: _, qt: q };
    }, [h]),
    B = [
      {
        campo: "status",
        titulo: "Status",
        width: 126,
        render: (k) => o.default.createElement(gt, { texto: k.status, tipo: Ho(k.status) }),
      },
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
  return o.default.createElement(
    o.default.Fragment,
    null,
    o.default.createElement(Wt, {
      titulo: "Estoque",
      atualizadoEm: w || "—",
      actions: o.default.createElement(
        "button",
        { onClick: v, disabled: c, style: uo(c) },
        c ? "Atualizando…" : "Atualizar",
      ),
    }),
    f && o.default.createElement("div", { style: co }, f),
    o.default.createElement(
      "section",
      { style: { display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: 12, marginBottom: 18 } },
      o.default.createElement(ze, { titulo: "Total de Itens", valor: y.ti }),
      o.default.createElement(ze, { titulo: "Pedidos Únicos", valor: y.tp }),
      o.default.createElement(ze, { titulo: "Entregues", valor: y.en }),
      o.default.createElement(ze, { titulo: "Pendentes", valor: y.pe }),
      o.default.createElement(ze, { titulo: "Quantidade Total", valor: y.qt }),
    ),
    o.default.createElement(Jn, {
      busca: n,
      setBusca: a,
      limparFiltros: () => {
        (a(""), i("todos"), d("7"), p(B0));
      },
      placeholder: "Busca no estoque…",
      periodoFiltro: r,
      setPeriodoFiltro: i,
      diasPeriodo: l,
      setDiasPeriodo: d,
    }),
    o.default.createElement(nn, {
      titulo: "Itens do Estoque",
      dadosBase: e,
      dadosFiltrados: h,
      colunas: B,
      filtros: u,
      onFiltro: (k, L) => p((C) => ({ ...C, [k]: L })),
      carregando: c,
      mensagemVazia: "Nenhum item encontrado.",
    }),
  );
}
function yy() {
  let e = {
      empresa: "",
      dataHora: "",
      solicitante: "",
      produto: "",
      lote: "",
      estoqueFisico: "",
      inventarioProtheus: "",
      ajusteSaldo: "",
      status: "",
      dataAjuste: "",
    },
    [t, n] = (0, o.useState)([]),
    [a, r] = (0, o.useState)(""),
    [i, l] = (0, o.useState)("todos"),
    [d, u] = (0, o.useState)("7"),
    [p, c] = (0, o.useState)(e),
    [g, f] = (0, o.useState)(false),
    [x, w] = (0, o.useState)(""),
    [F, v] = (0, o.useState)({}),
    m = (0, o.useCallback)(async () => {
      (f(true), w(""));
      try {
        let C = [
            { key: "ajusteSaldo", empresa: "Equipatech" },
            { key: "ajusteSaldoBBBaterias", empresa: "BBBaterias" },
          ],
          _ = await Promise.all(
            C.map(async (E) => {
              let I = await (await fetch(`${lo}?action=dados&fonte=${E.key}`)).json();
              if (!I.ok) throw new Error(I.erro || `Erro ao carregar ${E.empresa}`);
              let V = (I.dados || []).map((D) =>
                E.key === "ajusteSaldo"
                  ? {
                      empresa: E.empresa,
                      fonte: E.key,
                      dataHora: D.data || "",
                      solicitante: D.solicitante || "",
                      produto: D.produto || "",
                      lote: D.lote || "",
                      estoqueFisico: D.estoqueFisico || "",
                      inventarioProtheus: D.inventarioProtheus || "",
                      ajusteSaldo: D.ajusteSaldo || "",
                      status: D.status || "",
                      dataAjuste: D.dataAjuste || "",
                    }
                  : {
                      empresa: E.empresa,
                      fonte: E.key,
                      dataHora: D.dataHora || "",
                      solicitante: D.nomes || "",
                      produto: D.produto || "",
                      lote: D.lote || "",
                      estoqueFisico: D.estoqueFisico || "",
                      inventarioProtheus: D.inventarioProtheus || "",
                      ajusteSaldo: D.ajusteSaldo || "",
                      status: D.status || "",
                      dataAjuste: D.dataHoraAjuste || "",
                    },
              );
              return { empresa: E.empresa, atualizadoEm: I.atualizadoEm || "", dados: V };
            }),
          ),
          q = {};
        (_.forEach((E) => {
          q[E.empresa] = E.atualizadoEm;
        }),
          n(_.flatMap((E) => E.dados)),
          v(q));
      } catch (C) {
        w(C.message);
      } finally {
        f(false);
      }
    }, []);
  (0, o.useEffect)(() => tn(m), [m]);
  let h = (0, o.useMemo)(() => on(t, ["dataHora", "dataAjuste"], i, d), [t, i, d]),
    y = (0, o.useMemo)(
      () =>
        Po(h, a, p, [
          "empresa",
          "dataHora",
          "solicitante",
          "produto",
          "lote",
          "estoqueFisico",
          "inventarioProtheus",
          "ajusteSaldo",
          "status",
          "dataAjuste",
        ]),
      [h, a, p],
    ),
    B = (0, o.useMemo)(
      () => ({
        eqPendente: y.filter((C) => C.empresa === "Equipatech" && Te(C.status).includes("pendente")).length,
        eqVerificando: y.filter((C) => C.empresa === "Equipatech" && Te(C.status).includes("verificando saldo")).length,
        bbPendente: y.filter((C) => C.empresa === "BBBaterias" && Te(C.status).includes("pendente")).length,
        bbResolvido: y.filter((C) => C.empresa === "BBBaterias" && Te(C.status).includes("resolvido")).length,
      }),
      [y],
    ),
    k = [
      { campo: "empresa", titulo: "Empresa", bold: true, width: 92 },
      { campo: "dataHora", titulo: "Data/Hora", width: 112 },
      { campo: "solicitante", titulo: "Solicitante", width: 112, wrap: true },
      { campo: "produto", titulo: "Produto", bold: true, width: 180, wrap: true },
      { campo: "lote", titulo: "Lote", width: 78 },
      { campo: "estoqueFisico", titulo: "Físico", width: 68 },
      { campo: "inventarioProtheus", titulo: "Protheus", width: 76 },
      { campo: "ajusteSaldo", titulo: "Ajuste", bold: true, width: 78 },
      {
        campo: "status",
        titulo: "Status",
        width: 124,
        render: (C) => o.default.createElement(gt, { texto: C.status, tipo: Ho(C.status) }),
      },
      { campo: "dataAjuste", titulo: "Dt Ajuste", width: 112 },
    ];
  function L() {
    (r(""), l("todos"), u("7"), c(e));
  }
  return o.default.createElement(
    o.default.Fragment,
    null,
    o.default.createElement(Wt, {
      titulo: "Ajuste de Saldo",
      extraInfo: o.default.createElement(
        o.default.Fragment,
        null,
        o.default.createElement(
          "span",
          null,
          "Equipatech:",
          " ",
          o.default.createElement("strong", { style: { color: s.txtSec } }, F.Equipatech || "—"),
        ),
        o.default.createElement(
          "span",
          null,
          "BBBaterias:",
          " ",
          o.default.createElement("strong", { style: { color: s.txtSec } }, F.BBBaterias || "—"),
        ),
      ),
      actions: o.default.createElement(
        o.default.Fragment,
        null,
        o.default.createElement(cc, { href: Xv }, "Abrir Ajuste"),
        o.default.createElement("button", { onClick: m, disabled: g, style: uo(g) }, g ? "Atualizando…" : "Atualizar"),
      ),
    }),
    x && o.default.createElement("div", { style: co }, x),
    o.default.createElement(
      "section",
      { style: { display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12, marginBottom: 18 } },
      o.default.createElement(ze, {
        titulo: "Pendente · Equipatech",
        valor: B.eqPendente,
        onClick: () => {
          (r(""), c({ ...e, empresa: "Equipatech", status: "Pendente" }));
        },
        ativo: p.empresa === "Equipatech" && p.status === "Pendente",
      }),
      o.default.createElement(ze, {
        titulo: "Verificando · Equipatech",
        valor: B.eqVerificando,
        onClick: () => {
          (r(""), c({ ...e, empresa: "Equipatech", status: "Verificando saldo" }));
        },
        ativo: p.empresa === "Equipatech" && Te(p.status) === "verificando saldo",
      }),
      o.default.createElement(ze, {
        titulo: "Pendente · BBBaterias",
        valor: B.bbPendente,
        onClick: () => {
          (r(""), c({ ...e, empresa: "BBBaterias", status: "PENDENTE" }));
        },
        ativo: p.empresa === "BBBaterias" && p.status === "PENDENTE",
      }),
      o.default.createElement(ze, {
        titulo: "Resolvido · BBBaterias",
        valor: B.bbResolvido,
        onClick: () => {
          (r(""), c({ ...e, empresa: "BBBaterias", status: "RESOLVIDO" }));
        },
        ativo: p.empresa === "BBBaterias" && p.status === "RESOLVIDO",
      }),
    ),
    o.default.createElement(Jn, {
      busca: a,
      setBusca: r,
      limparFiltros: L,
      placeholder: "Busca no ajuste de saldo…",
      periodoFiltro: i,
      setPeriodoFiltro: l,
      diasPeriodo: d,
      setDiasPeriodo: u,
    }),
    o.default.createElement(nn, {
      titulo: "Ajustes de Saldo — Equipatech e BBBaterias",
      dadosBase: t,
      dadosFiltrados: y,
      colunas: k,
      filtros: p,
      onFiltro: (C, _) => c((q) => ({ ...q, [C]: _ })),
      carregando: g,
      mensagemVazia: "Nenhum ajuste encontrado.",
    }),
  );
}
function by() {
  let [e, t] = (0, o.useState)([]),
    [n, a] = (0, o.useState)(""),
    [r, i] = (0, o.useState)("todos"),
    [l, d] = (0, o.useState)("7"),
    [u, p] = (0, o.useState)(S0),
    [c, g] = (0, o.useState)(false),
    [f, x] = (0, o.useState)(""),
    [w, F] = (0, o.useState)(""),
    v = (0, o.useCallback)(async () => {
      (g(true), x(""));
      try {
        let k = await fetch(`${lo}?action=dados&fonte=consultaPecas`),
          L = await k.json();
        if (!L.ok) throw new Error(L.erro || "Erro peças");
        let C = (L.dados || []).map((_) => ({
          ..._,
          tempoResposta: ny(_.dataHora, _.dataResposta),
          statusResposta: ay(_.dataHora, _.dataResposta),
        }));
        (t(C), bn("consultaPecas", C), F(L.atualizadoEm || ""));
      } catch (k) {
        x(k.message);
      } finally {
        g(false);
      }
    }, []);
  (0, o.useEffect)(() => tn(v), [v]);
  let m = (0, o.useMemo)(() => on(e, "dataHora", r, l), [e, r, l]),
    h = (0, o.useMemo)(
      () =>
        Po(m, n, u, [
          "filial",
          "dataHora",
          "vendedor",
          "codigoPeca",
          "tipoSolicitacao",
          "status",
          "tempoAguardando",
          "tempoResposta",
          "statusResposta",
          "dataResposta",
          "respondidoPor",
        ]),
      [m, n, u],
    ),
    y = (0, o.useMemo)(
      () => ({
        ag: h.filter((k) => k.aguardandoResposta === true).length,
        ag1h: h.filter((k) => k.aguardandoMaisDe1h === true).length,
        resp: h.filter((k) => k.respondida === true).length,
      }),
      [h],
    ),
    B = [
      { campo: "filial", titulo: "Filial", bold: true, width: 88 },
      { campo: "dataHora", titulo: "Data/Hora", width: 112 },
      { campo: "vendedor", titulo: "Vendedor", width: 108, wrap: true },
      { campo: "codigoPeca", titulo: "Peça", bold: true, width: 110 },
      { campo: "tipoSolicitacao", titulo: "Tipo", width: 92, wrap: true },
      {
        campo: "status",
        titulo: "Status",
        width: 112,
        render: (k) => o.default.createElement(gt, { texto: k.status, tipo: Ho(k.status) }),
      },
      { campo: "tempoAguardando", titulo: "Aguard.", bold: true, width: 86 },
      { campo: "tempoResposta", titulo: "Tempo Resp.", bold: true, width: 96 },
      {
        campo: "statusResposta",
        titulo: "Status Resp.",
        width: 104,
        render: (k) => o.default.createElement(gt, { texto: k.statusResposta, tipo: Ho(k.statusResposta) }),
      },
      { campo: "dataResposta", titulo: "Resposta", width: 112 },
      { campo: "respondidoPor", titulo: "Resp. por", width: 112, wrap: true },
    ];
  return o.default.createElement(
    o.default.Fragment,
    null,
    o.default.createElement(Wt, {
      titulo: "Consulta de Peças",
      atualizadoEm: w || "—",
      actions: o.default.createElement(
        o.default.Fragment,
        null,
        o.default.createElement(cc, { href: Gv }, "Solicitar Peça"),
        o.default.createElement(cc, { href: Qv, variante: "secundario" }, "Gestão"),
        o.default.createElement("button", { onClick: v, disabled: c, style: uo(c) }, c ? "Atualizando…" : "Atualizar"),
      ),
    }),
    f && o.default.createElement("div", { style: co }, f),
    o.default.createElement(
      "section",
      { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 18 } },
      o.default.createElement(ze, { titulo: "Aguardando Resposta", valor: y.ag }),
      o.default.createElement(ze, { titulo: "Aguardando +1h", valor: y.ag1h }),
      o.default.createElement(ze, { titulo: "Respondidas", valor: y.resp }),
    ),
    o.default.createElement(Jn, {
      busca: n,
      setBusca: a,
      limparFiltros: () => {
        (a(""), i("todos"), d("7"), p(S0));
      },
      placeholder: "Busca na Consulta de Peças…",
      periodoFiltro: r,
      setPeriodoFiltro: i,
      diasPeriodo: l,
      setDiasPeriodo: d,
    }),
    o.default.createElement(nn, {
      titulo: "Solicitações",
      dadosBase: e,
      dadosFiltrados: h,
      colunas: B,
      filtros: u,
      onFiltro: (k, L) => p((C) => ({ ...C, [k]: L })),
      carregando: c,
      mensagemVazia: "Nenhuma solicitação encontrada.",
    }),
  );
}
function N0({ modo: e }) {
  let [t, n] = (0, o.useState)([]),
    [a, r] = (0, o.useState)(""),
    [i, l] = (0, o.useState)("todos"),
    [d, u] = (0, o.useState)("7"),
    [p, c] = (0, o.useState)(e === "resumo" ? Gu : Vu),
    [g, f] = (0, o.useState)(false),
    [x, w] = (0, o.useState)(""),
    [F, v] = (0, o.useState)(""),
    m = (0, o.useCallback)(async () => {
      (f(true), w(""));
      try {
        let E = await fetch(`${lo}?action=dados&fonte=producao`),
          A = await E.json();
        if (!A.ok) throw new Error(A.erro || "Erro produção");
        let I = A.dados || [];
        (n(I), bn("producao", I), v(A.atualizadoEm || ""));
      } catch (E) {
        w(E.message);
      } finally {
        f(false);
      }
    }, []);
  ((0, o.useEffect)(() => tn(m), [m]),
    (0, o.useEffect)(() => {
      (r(""), c(e === "resumo" ? Gu : Vu));
    }, [e]));
  let h = (0, o.useMemo)(() => on(t, "dataHoraFinanceiro", i, d), [t, i, d]),
    y = (0, o.useMemo)(() => uy(h), [h]),
    B = e === "resumo" ? y : h,
    k = (0, o.useMemo)(
      () => ({
        pu: new Set(h.map((E) => E.pedido).filter(Boolean)).size,
        prod: h.filter((E) => Te(E.status) === "produzir").length,
        av: h.filter((E) => Te(E.status).includes("avisar vendedor")).length,
      }),
      [h],
    ),
    L = (0, o.useMemo)(() => y.reduce((E, A) => E + (Number(A.quantidadeTotal || 0) || 0), 0), [y]),
    C = (0, o.useMemo)(
      () =>
        e === "resumo"
          ? Po(B, a, p, [
              "pedido",
              "cliente",
              "quantidadeTotal",
              "totalItens",
              "produzir",
              "avisarVendedor",
              "naoProduzir",
              "transportes",
              "statusResumo",
            ])
          : Po(B, a, p, [
              "dataHoraFinanceiro",
              "pedido",
              "cliente",
              "produto",
              "quantidadeLiberada",
              "equipa01",
              "equipa98",
              "bbbaterias01",
              "transporte",
              "status",
            ]),
      [B, a, p, e],
    ),
    _ = [
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
        render: (E) => o.default.createElement(gt, { texto: E.status, tipo: Ho(E.status) }),
      },
    ],
    q = [
      { campo: "pedido", titulo: "Pedido", bold: true, width: 74 },
      { campo: "cliente", titulo: "Cliente", width: 150, wrap: true },
      { campo: "quantidadeTotal", titulo: "Qt Total", bold: true, width: 72 },
      { campo: "totalItens", titulo: "SKUs", width: 54 },
      { campo: "produzir", titulo: "Produzir", width: 72 },
      { campo: "avisarVendedor", titulo: "Avisar", width: 68 },
      { campo: "naoProduzir", titulo: "Não Prod.", width: 74 },
      { campo: "transportes", titulo: "Transp.", width: 105, wrap: true },
      {
        campo: "statusResumo",
        titulo: "Status",
        width: 112,
        render: (E) => o.default.createElement(gt, { texto: E.statusResumo, tipo: Ho(E.statusResumo) }),
      },
    ];
  return o.default.createElement(
    o.default.Fragment,
    null,
    o.default.createElement(Wt, {
      titulo: e === "resumo" ? "Resumo por Pedido" : "Produção",
      atualizadoEm: F || "—",
      actions: o.default.createElement(
        "button",
        { onClick: m, disabled: g, style: uo(g) },
        g ? "Atualizando…" : "Atualizar",
      ),
    }),
    x && o.default.createElement("div", { style: co }, x),
    o.default.createElement(
      "section",
      { style: { display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12, marginBottom: 18 } },
      o.default.createElement(ze, { titulo: "Pedidos Únicos", valor: k.pu }),
      o.default.createElement(ze, { titulo: "Produzir", valor: k.prod }),
      o.default.createElement(ze, { titulo: "Avisar Vendedor", valor: k.av }),
      o.default.createElement(ze, { titulo: "Qt Liberada Total", valor: L }),
    ),
    o.default.createElement(Jn, {
      busca: a,
      setBusca: r,
      limparFiltros: () => {
        (r(""), l("todos"), u("7"), c(e === "resumo" ? Gu : Vu));
      },
      placeholder: e === "resumo" ? "Busca no resumo…" : "Busca na produção…",
      periodoFiltro: i,
      setPeriodoFiltro: l,
      diasPeriodo: d,
      setDiasPeriodo: u,
    }),
    o.default.createElement(nn, {
      titulo: e === "resumo" ? "Resumo dos Pedidos" : "Itens de Produção",
      dadosBase: B,
      dadosFiltrados: C,
      colunas: e === "resumo" ? q : _,
      filtros: p,
      onFiltro: (E, A) => c((I) => ({ ...I, [E]: A })),
      carregando: g,
      mensagemVazia: e === "resumo" ? "Nenhum resumo." : "Nenhum item.",
    }),
  );
}
function xy({ somenteLeitura: e }) {
  let [t, n] = (0, o.useState)([]),
    [a, r] = (0, o.useState)({ totalModelos: 0, modelosParaTransformar: 0, modelosComFalta: 0, suficientes: 0 }),
    [i, l] = (0, o.useState)(""),
    [d, u] = (0, o.useState)(E0),
    [p, c] = (0, o.useState)(false),
    [g, f] = (0, o.useState)(false),
    [x, w] = (0, o.useState)(""),
    [F, v] = (0, o.useState)(""),
    [m, h] = (0, o.useState)(""),
    [y, B] = (0, o.useState)("2"),
    k = (0, o.useCallback)(async () => {
      (c(true), w(""));
      try {
        let A = await (await fetch(`${lo}?action=dados&fonte=analiseTransformacoes`, { cache: "no-store" })).json();
        if (!A.ok) throw new Error(A.erro || "Erro ao carregar análise de transformações");
        let I = A.dados || [];
        (n(I),
          r(A.kpis || { totalModelos: I.length, modelosParaTransformar: 0, modelosComFalta: 0, suficientes: 0 }),
          bn("analiseTransformacoes", I),
          h(A.atualizadoEm || ""));
      } catch (E) {
        w(E.message);
      } finally {
        c(false);
      }
    }, []);
  (0, o.useEffect)(() => tn(k), [k]);
  let L = (0, o.useMemo)(
      () =>
        Po(t, i, d, [
          "produto",
          "saldoEquipatech",
          "semanasEstoque",
          "produzirSemanas",
          "transformarQuantidades",
          "opcao1",
          "saldo1",
          "opcao2",
          "saldo2",
          "opcao3",
          "saldo3",
        ]),
      [t, i, d],
    ),
    C = (0, o.useCallback)(async () => {
      let E = Number(y);
      if (![1, 2, 3, 4].includes(E)) {
        w("Selecione 1, 2, 3 ou 4 semanas.");
        return;
      }
      let A = E === 1 ? "1 SEMANA" : `${E} SEMANAS`;
      if (window.confirm(`Aplicar "${A}" na coluna PRODUZIR X SEMANAS de todos os produtos?`)) {
        (f(true), w(""), v(""));
        try {
          let D = await (
            await fetch(`${lo}?action=atualizarSemanasTransformacao&semanas=${E}&_=${Date.now()}`, {
              cache: "no-store",
            })
          ).json();
          if (!D.ok) throw new Error(D.erro || "Não foi possível atualizar as semanas.");
          (v(`${D.valorAplicado} aplicado em ${D.totalAtualizados || 0} modelo(s).`), await k());
        } catch (V) {
          w(V.message);
        } finally {
          f(false);
        }
      }
    }, [y, k]),
    _ = (E) =>
      E.precisaTransformar && E.temOpcaoTransformacao
        ? "vermelho"
        : E.precisaTransformar
          ? "laranja"
          : Te(E.transformarQuantidades).includes("suficiente")
            ? "verde"
            : "cinza",
    q = [
      { campo: "produto", titulo: "Produto", bold: true, width: 125 },
      { campo: "saldoEquipatech", titulo: "Saldo Total", width: 90 },
      { campo: "semanasEstoque", titulo: "Semanas em Estoque", width: 145, wrap: true },
      { campo: "produzirSemanas", titulo: "Produzir X Semanas", width: 125 },
      {
        campo: "transformarQuantidades",
        titulo: "Transformar X Quantidades",
        width: 210,
        wrap: true,
        render: (E) => o.default.createElement(gt, { texto: E.transformarQuantidades || "—", tipo: _(E) }),
      },
      { campo: "opcao1", titulo: "Opção 1", width: 125 },
      { campo: "saldo1", titulo: "Saldo", width: 70 },
      { campo: "opcao2", titulo: "Opção 2", width: 125 },
      { campo: "saldo2", titulo: "Saldo", width: 70 },
      { campo: "opcao3", titulo: "Opção 3", width: 125 },
      { campo: "saldo3", titulo: "Saldo", width: 70 },
    ];
  return o.default.createElement(
    o.default.Fragment,
    null,
    o.default.createElement(Wt, {
      titulo: "Análise de Transformação",
      atualizadoEm: m || "—",
      actions: o.default.createElement(
        "button",
        { onClick: k, disabled: p, style: uo(p) },
        p ? "Atualizando…" : "Atualizar",
      ),
    }),
    x && o.default.createElement("div", { style: co }, x),
    F &&
      o.default.createElement(
        "div",
        {
          style: {
            background: s.greenBg,
            color: s.green,
            padding: 12,
            borderRadius: s.radius.md,
            marginBottom: 16,
            fontWeight: 700,
            border: `1px solid ${s.greenBd}`,
            fontSize: 12,
            fontFamily: s.font,
          },
        },
        F,
      ),
    o.default.createElement(
      "section",
      { style: { display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12, marginBottom: 18 } },
      o.default.createElement(ze, { titulo: "Total de Modelos", valor: a.totalModelos || 0 }),
      o.default.createElement(ze, { titulo: "Para Transformar", valor: a.modelosParaTransformar || 0 }),
      o.default.createElement(ze, { titulo: "Com Falta", valor: a.modelosComFalta || 0 }),
      o.default.createElement(ze, { titulo: "Suficientes", valor: a.suficientes || 0 }),
    ),
    !e &&
      o.default.createElement(
        "section",
        {
          style: {
            background: s.bgCard,
            border: `1px solid ${s.bdLight}`,
            borderRadius: s.radius.lg,
            padding: 16,
            marginBottom: 16,
            boxShadow: s.shadowCard,
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          },
        },
        o.default.createElement(
          "div",
          { style: { marginRight: 8 } },
          o.default.createElement(
            "div",
            { style: { fontWeight: 800, color: s.txtPri, fontSize: 13, fontFamily: s.font } },
            "Produzir X semanas",
          ),
          o.default.createElement(
            "div",
            { style: { color: s.txtMuted, fontSize: 10, marginTop: 2, fontFamily: s.font } },
            "Escolha uma opção e aplique na coluna D de todos os produtos.",
          ),
        ),
        o.default.createElement(
          "select",
          { value: y, onChange: (E) => B(E.target.value), style: { ...mt, minWidth: 135 }, disabled: g },
          o.default.createElement("option", { value: "1" }, "1 SEMANA"),
          o.default.createElement("option", { value: "2" }, "2 SEMANAS"),
          o.default.createElement("option", { value: "3" }, "3 SEMANAS"),
          o.default.createElement("option", { value: "4" }, "4 SEMANAS"),
        ),
        o.default.createElement(
          "button",
          {
            type: "button",
            onClick: C,
            disabled: g,
            style: {
              height: 36,
              border: "none",
              borderRadius: s.radius.md,
              padding: "0 16px",
              background: g ? s.bgMuted : s.primaryGrad,
              color: g ? s.txtMuted : "#fff",
              fontWeight: 800,
              fontSize: 12,
              cursor: g ? "not-allowed" : "pointer",
              fontFamily: s.font,
              boxShadow: g ? "none" : "0 4px 14px rgba(var(--accent-rgb),0.35)",
            },
          },
          g ? "Aplicando…" : "Aplicar para todos",
        ),
      ),
    o.default.createElement(Jn, {
      busca: i,
      setBusca: l,
      limparFiltros: () => {
        (l(""), u(E0));
      },
      placeholder: "Busca por produto, opção ou status…",
    }),
    o.default.createElement(nn, {
      titulo: "Análise de Transformações",
      dadosBase: t,
      dadosFiltrados: L,
      colunas: q,
      filtros: d,
      onFiltro: (E, A) => u((I) => ({ ...I, [E]: A })),
      carregando: p,
      mensagemVazia: "Nenhum modelo encontrado.",
    }),
  );
}
function By() {
  let e = (0, o.useMemo)(() => P0(), []),
    [t, n] = (0, o.useState)(e.dados),
    [a, r] = (0, o.useState)(e.atualizadoEm),
    [i, l] = (0, o.useState)(""),
    [d, u] = (0, o.useState)(e.dados.length === 0),
    [p, c] = (0, o.useState)(null),
    g = (0, o.useMemo)(() => ty(t), [t]),
    f = (0, o.useCallback)(async (F = false) => {
      let v = P0();
      if (!F && v.dados.length > 0) {
        (n(v.dados), r(v.atualizadoEm || ""), u(false));
        return;
      }
      u(true);
      try {
        let h = await (
          await fetch(`${lo}?action=dados&fonte=baseTransformacoes&_=${Date.now()}`, { cache: "no-store" })
        ).json();
        if (!h.ok) throw new Error(h.erro || "Erro ao carregar base técnica.");
        let y = Array.isArray(h.dados) ? h.dados : [],
          B = h.atualizadoEm || /* @__PURE__ */ new Date().toLocaleString("pt-BR");
        (n(y), r(B), ey(y, B));
      } catch (m) {
        console.error("Falha ao carregar base de transformações:", m);
      } finally {
        u(false);
      }
    }, []);
  (0, o.useEffect)(() => {
    f(false);
  }, [f]);
  let x = (0, o.useCallback)(() => {
      let F = vg(i);
      if (!F) {
        c(null);
        return;
      }
      let v = g.get(F) || null;
      c(v);
    }, [i, g]),
    w = p && Rv(p.regraTransformacao);
  return o.default.createElement(
    o.default.Fragment,
    null,
    o.default.createElement(
      "section",
      {
        style: {
          background: s.bgCard,
          border: `1px solid ${s.bdLight}`,
          borderRadius: s.radius.lg,
          padding: 18,
          marginBottom: 16,
          boxShadow: s.shadowCard,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        },
      },
      o.default.createElement(
        "div",
        { style: { fontSize: 22, fontWeight: 800, color: s.txtPri, fontFamily: s.font } },
        "Consulta de Transformação",
      ),
      o.default.createElement(
        "button",
        { onClick: () => f(true), disabled: d, style: uo(d) },
        d ? "Atualizando base…" : "Atualizar base",
      ),
    ),
    o.default.createElement(
      "section",
      {
        style: {
          background: s.bgCard,
          border: `1px solid ${s.bdLight}`,
          borderRadius: s.radius.lg,
          padding: 16,
          marginBottom: 16,
          boxShadow: s.shadowCard,
        },
      },
      o.default.createElement(
        "div",
        { style: { fontSize: 11, fontWeight: 800, color: s.txtMuted, textTransform: "uppercase", marginBottom: 8 } },
        "Pesquisar modelo",
      ),
      o.default.createElement(
        "div",
        { style: { display: "flex", gap: 8 } },
        o.default.createElement("input", {
          value: i,
          onChange: (F) => l(F.target.value),
          onKeyDown: (F) => {
            F.key === "Enter" && x();
          },
          placeholder: "Ex.: B156XW04-V.8",
          style: { ...Fa, flex: 1, minWidth: 0 },
        }),
        o.default.createElement(
          "button",
          {
            type: "button",
            onClick: x,
            style: {
              height: 36,
              border: "none",
              borderRadius: s.radius.md,
              padding: "0 18px",
              background: s.primaryGrad,
              color: "#fff",
              fontWeight: 800,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: s.font,
              boxShadow: "0 4px 14px rgba(var(--accent-rgb),0.35)",
            },
          },
          "Buscar",
        ),
      ),
      o.default.createElement(
        "div",
        { style: { marginTop: 8, fontSize: 10, color: s.txtMuted } },
        "Base carregada: ",
        t.length,
        " modelo(s)",
      ),
    ),
    p === null &&
      i.trim() !== "" &&
      o.default.createElement(
        "div",
        {
          style: {
            background: s.bgCard,
            border: `1.5px dashed ${s.bdMid}`,
            borderRadius: s.radius.lg,
            padding: 18,
            color: s.txtMuted,
            fontSize: 12,
            textAlign: "center",
          },
        },
        "Pesquise o modelo e pressione Buscar.",
      ),
    p &&
      o.default.createElement(
        "section",
        {
          style: {
            background: s.bgCard,
            border: `1px solid ${s.bdLight}`,
            borderRadius: s.radius.lg,
            padding: 16,
            boxShadow: s.shadowCard,
          },
        },
        o.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            },
          },
          o.default.createElement("div", { style: { fontSize: 20, fontWeight: 800, color: s.txtPri } }, p.produto),
          o.default.createElement(gt, {
            texto: w ? "TRANSFORMAÇÃO DISPONÍVEL" : "SEM TRANSFORMAÇÃO",
            tipo: w ? "verde" : "cinza",
          }),
        ),
        o.default.createElement(
          "div",
          { style: { display: "grid", gridTemplateColumns: "repeat(6,minmax(0,1fr))", gap: 8, marginBottom: 14 } },
          [
            ["Resolução", p.resolucao],
            ["Polegada", p.polegada],
            ["Pinos", p.pinos],
            ["Brackets", p.brackets],
            ["Tipo", p.tipoTela],
            ["IPS", p.ips],
          ].map(([F, v]) =>
            o.default.createElement(
              "div",
              {
                key: F,
                style: { background: s.bgStripe, border: `1px solid ${s.bdLight}`, borderRadius: 10, padding: 10 },
              },
              o.default.createElement(
                "div",
                {
                  style: {
                    fontSize: 9,
                    color: s.txtMuted,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    marginBottom: 4,
                  },
                },
                F,
              ),
              o.default.createElement("div", { style: { fontSize: 12, color: s.txtPri, fontWeight: 800 } }, v || "—"),
            ),
          ),
        ),
        o.default.createElement(
          "div",
          {
            style: {
              background: w ? s.greenBg : s.bgStripe,
              border: `1px solid ${w ? s.greenBd : s.bdLight}`,
              borderRadius: 10,
              padding: 13,
              marginBottom: 12,
            },
          },
          o.default.createElement(
            "div",
            { style: { whiteSpace: "pre-wrap", fontSize: 12, lineHeight: 1.5, color: s.txtPri, fontWeight: 700 } },
            p.regraTransformacao || "Nenhuma transformação cadastrada.",
          ),
        ),
        o.default.createElement(
          "div",
          { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
          o.default.createElement(
            "span",
            {
              style: {
                fontSize: 10,
                fontWeight: 800,
                color: s.txtMuted,
                textTransform: "uppercase",
                alignSelf: "center",
              },
            },
            "Peças de reposição:",
          ),
          [p.reposicao1, p.reposicao2, p.reposicao3]
            .filter((F) => String(F || "").trim())
            .map((F) => o.default.createElement(gt, { key: F, texto: F, tipo: "azul" })),
          ![p.reposicao1, p.reposicao2, p.reposicao3].some((F) => String(F || "").trim()) &&
            o.default.createElement("span", { style: { fontSize: 11, color: s.txtMuted } }, "Nenhuma peça cadastrada."),
        ),
      ),
    !p &&
      !i.trim() &&
      o.default.createElement(
        "div",
        {
          style: {
            background: s.bgCard,
            border: `1.5px dashed ${s.bdMid}`,
            borderRadius: s.radius.lg,
            padding: 24,
            color: s.txtMuted,
            fontSize: 12,
            textAlign: "center",
          },
        },
        "Digite um modelo para consultar as possibilidades de transformação.",
      ),
  );
}
function D0(e) {
  let t = Te(e);
  return t.includes("proximo") ? "laranja" : t.includes("nao temos") ? "vermelho" : Ho(e);
}
function Sy() {
  let [e, t] = (0, o.useState)([]),
    [n, a] = (0, o.useState)(""),
    [r, i] = (0, o.useState)("todos"),
    [l, d] = (0, o.useState)("7"),
    [u, p] = (0, o.useState)(w0),
    [c, g] = (0, o.useState)(false),
    [f, x] = (0, o.useState)(""),
    [w, F] = (0, o.useState)(/* @__PURE__ */ new Date()),
    v = (0, o.useCallback)(async () => {
      (g(true), x(""));
      try {
        let C = await (await fetch(`${lo}?action=dados&fonte=producaoSolicitacoes`)).json();
        if (!C.ok) throw new Error(C.erro || "Erro ao carregar Solicitações");
        let _ = C.dados || [];
        (t(_), bn("producaoSolicitacoes", _));
      } catch (L) {
        x(L.message);
      } finally {
        g(false);
      }
    }, []);
  ((0, o.useEffect)(() => tn(v), [v]),
    (0, o.useEffect)(() => {
      let L = setInterval(() => F(/* @__PURE__ */ new Date()), 1e3);
      return () => clearInterval(L);
    }, []));
  let m = (0, o.useMemo)(
      () =>
        e.map((L) => {
          let C = String(L.prazoFaturamento || "").trim();
          /^\d{2}\/\d{2}\/\d{4}$/.test(C) && (C += " 23:59:59");
          let _ = yg(C, w);
          return { ...L, tempoRestanteCalculado: _.texto === "-" ? "" : _.texto, tempoRestanteTipo: xg(_) };
        }),
      [e, w],
    ),
    h = (0, o.useMemo)(() => on(m, "dataHoraSolicitacao", r, l), [m, r, l]),
    y = (0, o.useMemo)(
      () =>
        Po(h, n, u, [
          "status",
          "solicitante",
          "produto",
          "quantidade",
          "dataHoraSolicitacao",
          "prioridade",
          "endereco",
          "pedido",
          "situacaoEntrega",
          "prazoFaturamento",
          "tempoRestanteCalculado",
        ]),
      [h, n, u],
    ),
    B = (0, o.useMemo)(
      () => ({
        total: y.length,
        aguardando: y.filter((L) => L.entregue !== true).length,
        atrasados: y.filter((L) => L.atrasado === true).length,
        quantidade: y.reduce((L, C) => L + (Number(C.quantidadeNumero) || 0), 0),
      }),
      [y],
    ),
    k = [
      {
        campo: "status",
        titulo: "Status",
        width: 140,
        render: (L) => o.default.createElement(gt, { texto: L.status, tipo: D0(L.status) }),
      },
      { campo: "solicitante", titulo: "Solicitante", width: 96, wrap: true },
      { campo: "produto", titulo: "Produto", bold: true, width: 130, wrap: true },
      { campo: "quantidade", titulo: "Qtd", width: 52, render: (L) => ui(L.quantidadeNumero) },
      { campo: "dataHoraSolicitacao", titulo: "Solicitação", width: 118 },
      { campo: "prioridade", titulo: "Prioridade", width: 150, wrap: true },
      { campo: "endereco", titulo: "Endereço", width: 82 },
      { campo: "pedido", titulo: "Pedido", bold: true, width: 74 },
      {
        campo: "situacaoEntrega",
        titulo: "Entrega",
        width: 110,
        render: (L) => o.default.createElement(gt, { texto: L.situacaoEntrega, tipo: D0(L.situacaoEntrega) }),
      },
      { campo: "prazoFaturamento", titulo: "Prazo Fat.", width: 118 },
      {
        campo: "tempoRestanteCalculado",
        titulo: "Tempo Restante",
        width: 150,
        render: (L) =>
          L.tempoRestanteCalculado
            ? o.default.createElement(gt, { texto: L.tempoRestanteCalculado, tipo: L.tempoRestanteTipo })
            : "—",
      },
    ];
  return o.default.createElement(
    o.default.Fragment,
    null,
    f && o.default.createElement("div", { style: co }, f),
    o.default.createElement(
      "section",
      { style: { display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12, marginBottom: 18 } },
      o.default.createElement(ze, { titulo: "Solicitações", valor: B.total }),
      o.default.createElement(ze, { titulo: "Aguardando Entrega", valor: B.aguardando }),
      o.default.createElement(ze, { titulo: "Atrasadas", valor: B.atrasados }),
      o.default.createElement(ze, { titulo: "Quantidade Total", valor: B.quantidade }),
    ),
    o.default.createElement(Jn, {
      busca: n,
      setBusca: a,
      limparFiltros: () => {
        (a(""), i("todos"), d("7"), p(w0));
      },
      placeholder: "Busca por produto, pedido, solicitante…",
      periodoFiltro: r,
      setPeriodoFiltro: i,
      diasPeriodo: l,
      setDiasPeriodo: d,
    }),
    o.default.createElement(nn, {
      titulo: "Solicitações de Produção",
      dadosBase: m,
      dadosFiltrados: y,
      colunas: k,
      filtros: u,
      onFiltro: (L, C) => p((_) => ({ ..._, [L]: C })),
      carregando: c,
      mensagemVazia: "Nenhuma solicitação encontrada.",
    }),
  );
}
function Ey() {
  let [e, t] = (0, o.useState)([]),
    [n, a] = (0, o.useState)(""),
    [r, i] = (0, o.useState)("todos"),
    [l, d] = (0, o.useState)("7"),
    [u, p] = (0, o.useState)(C0),
    [c, g] = (0, o.useState)(false),
    [f, x] = (0, o.useState)(""),
    [w, F] = (0, o.useState)(""),
    [v, m] = (0, o.useState)(""),
    h = (0, o.useCallback)(async () => {
      (g(true), x(""));
      try {
        let _ = await (await fetch(`${lo}?action=dados&fonte=pedidoVenda1020`)).json();
        if (!_.ok) throw new Error(_.erro || "Erro ao carregar Pedido de Venda");
        let q = _.dados || [];
        (t(q), bn("pedidoVenda1020", q), F(_.atualizadoEm || ""), m(_.tipoRelatorio || _.nome || ""));
      } catch (C) {
        x(C.message);
      } finally {
        g(false);
      }
    }, []);
  (0, o.useEffect)(() => tn(h), [h]);
  let y = (0, o.useMemo)(() => on(e, "dataHoraFinanceiro", r, l), [e, r, l]),
    B = (0, o.useMemo)(
      () =>
        Po(y, n, u, [
          "dataHoraFinanceiro",
          "pedido",
          "cliente",
          "produto",
          "quantidadeLiberada",
          "equipa01",
          "equipa98",
          "bateria01",
          "endereco",
          "status",
        ]),
      [y, n, u],
    ),
    k = (0, o.useMemo)(() => {
      let C = new Set(B.map((I) => String(I.pedido || "").trim()).filter((I) => I !== "" && I !== "0")).size,
        _ = B.filter((I) => {
          let V = Te(I.status);
          return V.includes("comprar") && !V.includes("nao comprar") && !V.includes("não comprar");
        }).length,
        q = B.filter((I) => {
          let V = Te(I.status);
          return V.includes("nao comprar") || V.includes("não comprar");
        }).length,
        E = B.filter((I) => Te(I.status).includes("avisado")).length,
        A = B.reduce((I, V) => {
          let D = Number(
            String(V.quantidadeLiberada || "0")
              .replace(/\./g, "")
              .replace(",", ".")
              .replace(/[^0-9.-]/g, ""),
          );
          return I + (Number.isNaN(D) ? 0 : D);
        }, 0);
      return { pedidosUnicos: C, comprar: _, naoComprar: q, avisado: E, quantidadeTotal: Math.round(A) };
    }, [B]),
    L = [
      { campo: "dataHoraFinanceiro", titulo: "Lib. Financeiro", width: 132 },
      { campo: "pedido", titulo: "Pedido", bold: true, width: 78 },
      { campo: "cliente", titulo: "Cliente", width: 100 },
      { campo: "produto", titulo: "Produto", bold: true, width: 150, wrap: true },
      { campo: "quantidadeLiberada", titulo: "Qt", width: 58, render: (C) => ui(C.quantidadeLiberada) },
      { campo: "equipa01", titulo: "Equipa 01", width: 78, render: (C) => ui(C.equipa01) },
      { campo: "equipa98", titulo: "Equipa 98", width: 78, render: (C) => ui(C.equipa98) },
      { campo: "bateria01", titulo: "Bateria", width: 72, render: (C) => ui(C.bateria01) },
      { campo: "endereco", titulo: "Endereço", width: 110, wrap: true },
      {
        campo: "status",
        titulo: "Status",
        width: 104,
        render: (C) => o.default.createElement(gt, { texto: C.status, tipo: iy(C.status) }),
      },
    ];
  return o.default.createElement(
    o.default.Fragment,
    null,
    o.default.createElement(Wt, {
      titulo: "Pedido de Venda",
      atualizadoEm: w || "—",
      extraInfo: v
        ? o.default.createElement(
            "span",
            null,
            "Relatório:",
            " ",
            o.default.createElement("strong", { style: { color: s.txtSec } }, v),
          )
        : null,
      actions: o.default.createElement(
        "button",
        { onClick: h, disabled: c, style: uo(c) },
        c ? "Atualizando…" : "Atualizar",
      ),
    }),
    f && o.default.createElement("div", { style: co }, f),
    o.default.createElement(
      "section",
      { style: { display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: 12, marginBottom: 18 } },
      o.default.createElement(ze, { titulo: "Pedidos Únicos", valor: k.pedidosUnicos }),
      o.default.createElement(ze, { titulo: "Comprar", valor: k.comprar }),
      o.default.createElement(ze, { titulo: "Não Comprar", valor: k.naoComprar }),
      o.default.createElement(ze, { titulo: "Avisado", valor: k.avisado }),
      o.default.createElement(ze, { titulo: "Quantidade Total", valor: k.quantidadeTotal }),
    ),
    o.default.createElement(Jn, {
      busca: n,
      setBusca: a,
      limparFiltros: () => {
        (a(""), i("todos"), d("7"), p(C0));
      },
      placeholder: "Busca no pedido de venda...",
      periodoFiltro: r,
      setPeriodoFiltro: i,
      diasPeriodo: l,
      setDiasPeriodo: d,
    }),
    o.default.createElement(nn, {
      titulo: "Pedidos de Venda",
      dadosBase: e,
      dadosFiltrados: B,
      colunas: L,
      filtros: u,
      onFiltro: (C, _) => p((q) => ({ ...q, [C]: _ })),
      carregando: c,
      mensagemVazia: "Nenhum pedido de venda encontrado.",
    }),
  );
}
function Ci(e, t) {
  let [n, a] = (0, o.useState)([]),
    [r, i] = (0, o.useState)(false),
    [l, d] = (0, o.useState)(""),
    [u, p] = (0, o.useState)(""),
    c = (0, o.useCallback)(async () => {
      (i(true), d(""));
      try {
        let g = await fetch(`${lo}?action=dados&fonte=${e}`),
          f = await g.json();
        if (!f.ok) throw new Error(f.erro || "Erro");
        (a(f.dados || []), p(f.atualizadoEm || ""));
      } catch (g) {
        d(g.message);
      } finally {
        i(false);
      }
    }, [e]);
  return ((0, o.useEffect)(() => tn(c), [c]), { dados: n, loading: r, erro: l, atualizado: u, load: c });
}
function vi(e) {
  let t = typeof e == "number" ? e : Je(e);
  return t === null
    ? { bg: s.bgStripe, color: s.txtMuted, bd: s.bdLight }
    : t >= 95
      ? { bg: s.greenBg, color: s.green, bd: s.greenBd }
      : t >= 90
        ? { bg: s.greenBg, color: s.green, bd: s.greenBd }
        : t >= 70
          ? { bg: s.amberBg, color: s.amber, bd: s.amberBd }
          : t >= 50
            ? { bg: s.orangeBg, color: s.orange, bd: s.orangeBd }
            : { bg: s.redBg, color: s.red, bd: s.redBd };
}
function Kn(e) {
  let t = typeof e == "number" ? e : Je(e);
  return t === null ? "—" : `${t.toFixed(2).replace(".", ",")}%`;
}
function Fo({ titulo: e, valor: t, grad: n, detalhe: a }) {
  return o.default.createElement(
    "div",
    {
      style: {
        background: s.bgCard,
        borderRadius: s.radius.lg,
        padding: "14px 16px",
        boxShadow: s.shadowCard,
        border: `1px solid ${s.bdLight}`,
        position: "relative",
        overflow: "hidden",
      },
    },
    o.default.createElement("div", {
      style: { position: "absolute", top: 0, left: 0, right: 0, height: 3, background: n },
    }),
    o.default.createElement(
      "div",
      {
        style: {
          fontSize: 9,
          fontWeight: 800,
          color: s.txtMuted,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 8,
          fontFamily: s.font,
        },
      },
      e,
    ),
    o.default.createElement(
      "div",
      { style: { fontSize: 22, fontWeight: 800, fontFamily: s.fontMono, letterSpacing: "-0.03em", color: s.txtPri } },
      t,
    ),
    a &&
      o.default.createElement(
        "div",
        { style: { marginTop: 6, fontSize: 10, color: s.txtMuted, fontFamily: s.font } },
        a,
      ),
  );
}
function Cy() {
  let { dados: e, loading: t, erro: n, atualizado: a, load: r } = Ci("indicadorDiario"),
    [i, l] = (0, o.useState)(""),
    [d, u] = (0, o.useState)("todos"),
    [p, c] = (0, o.useState)("15"),
    [g, f] = (0, o.useState)("atual"),
    [x, w] = (0, o.useState)(""),
    [F, v] = (0, o.useState)("todos"),
    [m, h] = (0, o.useState)(A0),
    y = (0, o.useMemo)(() => Aa(e, "mes"), [e]),
    B = (0, o.useMemo)(() => Aa(e, "semana"), [e]),
    k = (0, o.useMemo)(() => {
      let H = /* @__PURE__ */ new Date();
      return `${String(H.getMonth() + 1).padStart(2, "0")}/${H.getFullYear()}`;
    }, []),
    L = (0, o.useMemo)(() => {
      let H = on(e, "data", d, p);
      return (
        g === "atual"
          ? (H = H.filter((M) => String(M.mes || "") === k))
          : g && (H = H.filter((M) => String(M.mes || "") === g)),
        x && (H = H.filter((M) => String(M.semana || "") === String(x))),
        F === "com" && (H = H.filter((M) => String(M.observacoes || "").trim() !== "")),
        F === "sem" && (H = H.filter((M) => String(M.observacoes || "").trim() === "")),
        H
      );
    }, [e, d, p, g, x, F, k]),
    C = (0, o.useMemo)(
      () =>
        Po(L, i, m, [
          "semana",
          "mes",
          "data",
          "diaSemana",
          "observacoes",
          "pedidos001",
          "pedidos002",
          "pedidos005",
          "pedidosGeral",
          "unidades001",
          "unidades002",
          "unidades005",
          "unidadesGeral",
          "pedidos1030BB",
          "pedidos1040BB",
          "pedidos0104EQ",
          "pedidos0105EQ",
        ]),
      [L, i, m],
    ),
    _ = (0, o.useMemo)(() => {
      let H = Je(Sa(C, "pedidosGeral")) || 0,
        M = Je(Sa(C, "unidadesGeral")) || 0,
        Q = C.map((Y) => ({ ...Y, pct: Je(Y.pedidosGeral) }))
          .filter((Y) => Y.pct !== null)
          .sort((Y, de) => de.pct - Y.pct);
      return {
        dias: C.length,
        mp: H,
        mu: M,
        obs: C.filter((Y) => String(Y.observacoes || "").trim() !== "").length,
        melhor: Q[0] || null,
        pior: Q[Q.length - 1] || null,
      };
    }, [C]),
    q = (0, o.useMemo)(
      () =>
        C.map((H) => ({ data: H.data, pedidos: Je(H.pedidosGeral), unidades: Je(H.unidadesGeral) }))
          .filter((H) => H.pedidos !== null || H.unidades !== null)
          .slice(-18),
      [C],
    ),
    E = (0, o.useMemo)(
      () =>
        C.filter((H) => String(H.observacoes || "").trim() !== "")
          .slice(-5)
          .reverse(),
      [C],
    ),
    A = [
      "pedidos001",
      "pedidos002",
      "pedidos005",
      "pedidosGeral",
      "unidades001",
      "unidades002",
      "unidades005",
      "unidadesGeral",
      "pedidos1030BB",
      "pedidos1040BB",
      "pedidos0104EQ",
      "pedidos0105EQ",
    ],
    I = {
      pedidos001: "Ped.001",
      pedidos002: "Ped.002",
      pedidos005: "Ped.005",
      pedidosGeral: "Ped.Geral",
      unidades001: "Unid.001",
      unidades002: "Unid.002",
      unidades005: "Unid.005",
      unidadesGeral: "Unid.Geral",
      pedidos1030BB: "1030-BB",
      pedidos1040BB: "1040-BB",
      pedidos0104EQ: "0104-EQ",
      pedidos0105EQ: "0105-EQ",
    },
    V = [s.grad1, s.grad4, s.grad2, s.grad5, s.grad6, s.grad3],
    D = {
      background: s.bgCard,
      border: `1px solid ${s.bdLight}`,
      borderRadius: s.radius.lg,
      padding: 14,
      boxShadow: s.shadowCard,
    },
    O = {
      fontSize: 10,
      fontWeight: 800,
      color: s.txtSec,
      textTransform: "uppercase",
      letterSpacing: "0.07em",
      marginBottom: 10,
      fontFamily: s.font,
    };
  return o.default.createElement(
    o.default.Fragment,
    null,
    o.default.createElement(Wt, {
      titulo: "Indicador Diário",
      atualizadoEm: a || "—",
      actions: o.default.createElement(
        "button",
        { onClick: r, disabled: t, style: uo(t) },
        t ? "Atualizando…" : "Atualizar",
      ),
    }),
    n && o.default.createElement("div", { style: co }, n),
    o.default.createElement(
      "section",
      {
        style: {
          background: s.bgCard,
          border: `1px solid ${s.bdLight}`,
          borderRadius: s.radius.lg,
          padding: 14,
          marginBottom: 16,
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "center",
          boxShadow: s.shadowCard,
        },
      },
      o.default.createElement("input", {
        value: i,
        onChange: (H) => l(H.target.value),
        placeholder: "Busca nos indicadores…",
        style: { ...Fa, flex: "1 1 180px" },
      }),
      o.default.createElement(
        "select",
        { value: d, onChange: (H) => u(H.target.value), style: mt },
        o.default.createElement("option", { value: "todos" }, "Todos"),
        o.default.createElement("option", { value: "hoje" }, "Hoje"),
        o.default.createElement("option", { value: "ontem" }, "Ontem"),
        o.default.createElement("option", { value: "ultimos" }, "Últimos X dias"),
      ),
      d === "ultimos" &&
        o.default.createElement("input", {
          type: "number",
          min: "1",
          value: p,
          onChange: (H) => c(H.target.value),
          style: { ...mt, width: 64 },
        }),
      o.default.createElement(
        "select",
        { value: g, onChange: (H) => f(H.target.value), style: mt },
        o.default.createElement("option", { value: "atual" }, "Mês atual"),
        o.default.createElement("option", { value: "" }, "Todos"),
        y.map((H) => o.default.createElement("option", { key: H, value: H }, H)),
      ),
      o.default.createElement(
        "select",
        { value: x, onChange: (H) => w(H.target.value), style: mt },
        o.default.createElement("option", { value: "" }, "Todas semanas"),
        B.map((H) => o.default.createElement("option", { key: H, value: H }, "Sem. ", H)),
      ),
      o.default.createElement(
        "select",
        { value: F, onChange: (H) => v(H.target.value), style: mt },
        o.default.createElement("option", { value: "todos" }, "Todas obs."),
        o.default.createElement("option", { value: "com" }, "Com obs."),
        o.default.createElement("option", { value: "sem" }, "Sem obs."),
      ),
      o.default.createElement(
        "button",
        {
          onClick: () => {
            (l(""), u("todos"), c("15"), f("atual"), w(""), v("todos"), h(A0));
          },
          style: Pa,
        },
        "Limpar",
      ),
    ),
    o.default.createElement(
      "section",
      { style: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12, marginBottom: 16 } },
      o.default.createElement(Fo, {
        titulo: "Dias analisados",
        valor: _.dias,
        grad: s.grad2,
        detalhe: "Conforme filtro",
      }),
      o.default.createElement(Fo, {
        titulo: "Com observação",
        valor: _.obs,
        grad: s.grad5,
        detalhe: "Dias com registro",
      }),
      o.default.createElement(Fo, {
        titulo: "Melhor dia",
        valor: _.melhor ? Kn(_.melhor.pct) : "—",
        grad: s.grad3,
        detalhe: _.melhor ? _.melhor.data : "Sem dados",
      }),
      o.default.createElement(Fo, {
        titulo: "Pior dia",
        valor: _.pior ? Kn(_.pior.pct) : "—",
        grad: s.grad6,
        detalhe: _.pior ? _.pior.data : "Sem dados",
      }),
    ),
    o.default.createElement(
      "section",
      {
        style: {
          background: s.bgCard,
          border: `1px solid ${s.bdLight}`,
          borderRadius: s.radius.xl,
          overflow: "hidden",
          boxShadow: s.shadowCard,
        },
      },
      o.default.createElement(
        "div",
        {
          style: {
            padding: "13px 18px",
            borderBottom: `1px solid ${s.bdLight}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: s.bgStripe,
          },
        },
        o.default.createElement(
          "span",
          { style: { fontWeight: 800, color: s.txtPri, fontSize: 14, fontFamily: s.font, letterSpacing: "-0.02em" } },
          "Desempenho Diário Detalhado",
        ),
        o.default.createElement(Ei, { filtrados: C.length, total: e.length }),
      ),
      o.default.createElement(
        "div",
        { style: { overflowX: "auto" } },
        o.default.createElement(
          "table",
          { style: { width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: s.font } },
          o.default.createElement(
            "thead",
            null,
            o.default.createElement(
              "tr",
              null,
              o.default.createElement(
                "th",
                {
                  colSpan: "3",
                  style: {
                    background: "linear-gradient(135deg,#302b63,#24243e)",
                    color: "#c4b5fd",
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    textAlign: "center",
                    padding: "7px 8px",
                  },
                },
                "Dados do Dia",
              ),
              o.default.createElement(
                "th",
                {
                  colSpan: "4",
                  style: {
                    background: "linear-gradient(135deg,#1a1f6e,#2d3282)",
                    color: "#bfdbfe",
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    textAlign: "center",
                    padding: "7px 8px",
                    borderLeft: "4px solid #f0f3ff",
                  },
                },
                "Pedidos (%)",
              ),
              o.default.createElement(
                "th",
                {
                  colSpan: "4",
                  style: {
                    background: "linear-gradient(135deg,#064e3b,#065f46)",
                    color: "#a7f3d0",
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    textAlign: "center",
                    padding: "7px 8px",
                    borderLeft: "4px solid #f0f3ff",
                  },
                },
                "Unidades (%)",
              ),
              o.default.createElement(
                "th",
                {
                  colSpan: "4",
                  style: {
                    background: "linear-gradient(135deg,#374151,#1f2937)",
                    color: "#d1d5db",
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    textAlign: "center",
                    padding: "7px 8px",
                    borderLeft: "4px solid #f0f3ff",
                  },
                },
                "CDs",
              ),
            ),
            o.default.createElement(
              "tr",
              { style: { background: s.bgMuted } },
              ["Mês", "Data", "Dia"].map((H) =>
                o.default.createElement(
                  "th",
                  {
                    key: H,
                    style: {
                      padding: "6px 8px",
                      fontSize: 9,
                      fontWeight: 800,
                      color: s.txtSec,
                      textAlign: "center",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      borderBottom: `1px solid ${s.bdLight}`,
                    },
                  },
                  H,
                ),
              ),
              ["001", "002", "005", "Geral"].map((H, M) =>
                o.default.createElement(
                  "th",
                  {
                    key: `p${M}`,
                    style: {
                      padding: "6px 8px",
                      fontSize: 9,
                      fontWeight: 800,
                      color: s.txtSec,
                      textAlign: "center",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      borderBottom: `1px solid ${s.bdLight}`,
                      borderLeft: M === 0 ? "4px solid #f0f3ff" : void 0,
                    },
                  },
                  H,
                ),
              ),
              ["001", "002", "005", "Geral"].map((H, M) =>
                o.default.createElement(
                  "th",
                  {
                    key: `u${M}`,
                    style: {
                      padding: "6px 8px",
                      fontSize: 9,
                      fontWeight: 800,
                      color: s.txtSec,
                      textAlign: "center",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      borderBottom: `1px solid ${s.bdLight}`,
                      borderLeft: M === 0 ? "4px solid #f0f3ff" : void 0,
                    },
                  },
                  H,
                ),
              ),
              ["1030-BB", "1040-BB", "0104-EQ", "0105-EQ"].map((H, M) =>
                o.default.createElement(
                  "th",
                  {
                    key: `c${M}`,
                    style: {
                      padding: "6px 8px",
                      fontSize: 9,
                      fontWeight: 800,
                      color: s.txtSec,
                      textAlign: "center",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      borderBottom: `1px solid ${s.bdLight}`,
                      borderLeft: M === 0 ? "4px solid #f0f3ff" : void 0,
                    },
                  },
                  H,
                ),
              ),
            ),
          ),
          o.default.createElement(
            "tbody",
            null,
            t &&
              !C.length &&
              o.default.createElement(
                "tr",
                null,
                o.default.createElement(
                  "td",
                  { colSpan: "15", style: { padding: 28, textAlign: "center", color: s.txtMuted, fontFamily: s.font } },
                  "Carregando…",
                ),
              ),
            !t &&
              !C.length &&
              o.default.createElement(
                "tr",
                null,
                o.default.createElement(
                  "td",
                  { colSpan: "15", style: { padding: 28, textAlign: "center", color: s.txtMuted, fontFamily: s.font } },
                  "Nenhum indicador encontrado.",
                ),
              ),
            C.map((H, M) => {
              let Q = (Y, de) => {
                let ce = vi(H[Y]);
                return o.default.createElement(
                  "td",
                  {
                    style: {
                      padding: "4px 7px",
                      textAlign: "center",
                      fontSize: 10,
                      fontWeight: 800,
                      fontFamily: s.fontMono,
                      background: H[Y] ? ce.bg : s.bgCard,
                      color: H[Y] ? ce.color : s.txtMuted,
                      borderLeft: de ? "4px solid #f0f3ff" : `1px dotted ${s.bdLight}`,
                      borderBottom: `1px solid ${s.bdLight}`,
                    },
                  },
                  H[Y] || "—",
                );
              };
              return o.default.createElement(
                "tr",
                { key: M, style: { background: M % 2 === 0 ? s.bgCard : s.bgStripe } },
                o.default.createElement(
                  "td",
                  {
                    style: {
                      padding: "5px 8px",
                      textAlign: "center",
                      fontSize: 10,
                      color: s.txtSec,
                      borderBottom: `1px solid ${s.bdLight}`,
                      fontFamily: s.font,
                    },
                  },
                  H.mes || "—",
                ),
                o.default.createElement(
                  "td",
                  {
                    style: {
                      padding: "5px 8px",
                      textAlign: "center",
                      fontSize: 10,
                      fontWeight: 700,
                      color: s.txtPri,
                      borderBottom: `1px solid ${s.bdLight}`,
                      fontFamily: s.fontMono,
                    },
                  },
                  H.data || "—",
                ),
                o.default.createElement(
                  "td",
                  {
                    style: {
                      padding: "5px 8px",
                      textAlign: "center",
                      fontSize: 10,
                      color: s.txtSec,
                      borderBottom: `1px solid ${s.bdLight}`,
                      fontFamily: s.font,
                    },
                  },
                  H.diaSemana || "—",
                ),
                Q("pedidos001", true),
                Q("pedidos002"),
                Q("pedidos005"),
                Q("pedidosGeral"),
                Q("unidades001", true),
                Q("unidades002"),
                Q("unidades005"),
                Q("unidadesGeral"),
                Q("pedidos1030BB", true),
                Q("pedidos1040BB"),
                Q("pedidos0104EQ"),
                Q("pedidos0105EQ"),
              );
            }),
          ),
        ),
      ),
    ),
    o.default.createElement(
      "section",
      { style: { display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 14, marginTop: 14 } },
      o.default.createElement(
        "div",
        { style: D },
        o.default.createElement("div", { style: O }, "Desempenho por Indicador"),
        o.default.createElement(
          "div",
          { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 } },
          A.slice(0, 8).map((H, M) => {
            let Q = Je(Sa(C, H)) || 0,
              Y = vi(Q),
              de = V[M % V.length];
            return o.default.createElement(
              "div",
              {
                key: H,
                style: {
                  background: s.bgStripe,
                  border: `1px solid ${s.bdLight}`,
                  borderRadius: s.radius.md,
                  padding: 10,
                  position: "relative",
                  overflow: "hidden",
                },
              },
              o.default.createElement("div", {
                style: { position: "absolute", top: 0, left: 0, right: 0, height: 2, background: de },
              }),
              o.default.createElement(
                "div",
                {
                  style: {
                    fontSize: 9,
                    fontWeight: 800,
                    color: s.txtMuted,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 7,
                    fontFamily: s.font,
                  },
                },
                I[H],
              ),
              o.default.createElement(
                "div",
                {
                  style: {
                    fontSize: 17,
                    fontWeight: 800,
                    fontFamily: s.fontMono,
                    marginBottom: 7,
                    background: de,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  },
                },
                Kn(Q),
              ),
              o.default.createElement(
                "div",
                { style: { height: 5, borderRadius: 999, background: s.bdLight, overflow: "hidden" } },
                o.default.createElement("div", {
                  style: { width: `${Math.min(Q, 100)}%`, background: de, height: "100%", borderRadius: 999 },
                }),
              ),
            );
          }),
        ),
      ),
      o.default.createElement(
        "div",
        { style: D },
        o.default.createElement("div", { style: O }, "Últimas Observações"),
        E.length
          ? o.default.createElement(
              "div",
              { style: { display: "flex", flexDirection: "column", gap: 10 } },
              E.map((H, M) =>
                o.default.createElement(
                  "div",
                  { key: M, style: { borderBottom: `1px solid ${s.bdLight}`, paddingBottom: 10 } },
                  o.default.createElement(
                    "div",
                    {
                      style: {
                        fontSize: 10,
                        fontWeight: 800,
                        background: s.grad1,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: 3,
                        fontFamily: s.font,
                      },
                    },
                    H.data,
                    " · ",
                    H.diaSemana,
                  ),
                  o.default.createElement(
                    "div",
                    { style: { color: s.txtPri, fontSize: 12, lineHeight: 1.4, fontFamily: s.font } },
                    H.observacoes,
                  ),
                ),
              ),
            )
          : o.default.createElement(
              "div",
              {
                style: { color: s.txtMuted, fontSize: 12, fontFamily: s.font, padding: "20px 0", textAlign: "center" },
              },
              "Nenhuma observação no período.",
            ),
      ),
    ),
  );
}
function wy() {
  let { dados: e, loading: t, erro: n, atualizado: a, load: r } = Ci("indicadorExpedicaoDiario"),
    [i, l] = (0, o.useState)(""),
    [d, u] = (0, o.useState)("todos"),
    [p, c] = (0, o.useState)("15"),
    [g, f] = (0, o.useState)("atual"),
    [x, w] = (0, o.useState)("todos"),
    [F, v] = (0, o.useState)(k0),
    [m, h] = (0, o.useState)(false);
  function y(M) {
    let Q = El(M);
    return Q ? `${String(Q.getMonth() + 1).padStart(2, "0")}/${Q.getFullYear()}` : "";
  }
  let B = (0, o.useMemo)(() => e.map((M) => ({ ...M, mes: y(M.data) })), [e]),
    k = (0, o.useMemo)(() => Aa(B, "mes"), [B]),
    L = (0, o.useMemo)(() => {
      let M = /* @__PURE__ */ new Date();
      return `${String(M.getMonth() + 1).padStart(2, "0")}/${M.getFullYear()}`;
    }, []),
    C = (0, o.useMemo)(() => {
      let M = on(B, "data", d, p);
      return (
        g === "atual"
          ? (M = M.filter((Q) => String(Q.mes || "") === L))
          : g && (M = M.filter((Q) => String(Q.mes || "") === g)),
        x === "com" && (M = M.filter((Q) => String(Q.observacao || "").trim() !== "")),
        x === "sem" && (M = M.filter((Q) => String(Q.observacao || "").trim() === "")),
        M
      );
    }, [B, d, p, g, x, L]),
    _ = (0, o.useMemo)(
      () =>
        Po(C, i, F, [
          "data",
          "diaSemana",
          "pedidos0101",
          "pedidos0102",
          "pedidos1020",
          "pedidosGeral",
          "unidades0101",
          "unidades0102",
          "unidades1020",
          "unidadesGeral",
          "observacao",
          "c0101Atraso",
          "c0101Faturados",
          "c0101Enviados",
          "c0101UnidadesEnviadas",
          "c0101UnidadesFaturadas",
          "c0102Atraso",
          "c0102Faturados",
          "c0102Enviados",
          "c0102UnidadesEnviadas",
          "c0102UnidadesFaturadas",
          "c1020Atraso",
          "c1020Faturados",
          "c1020Enviados",
          "c1020UnidadesEnviadas",
          "c1020UnidadesFaturadas",
          "geralAtraso",
          "geralFaturados",
          "geralTotalEnviados",
          "geralUnidadesEnviadas",
          "geralUnidadesFaturadas",
        ]),
      [C, i, F],
    ),
    q = (0, o.useMemo)(() => {
      let M = Je(Sa(_, "pedidosGeral")) || 0,
        Q = Je(Sa(_, "unidadesGeral")) || 0,
        Y = _.map((de) => ({ ...de, pct: Je(de.pedidosGeral) }))
          .filter((de) => de.pct !== null)
          .sort((de, ce) => ce.pct - de.pct);
      return {
        dias: _.length,
        mp: M,
        mu: Q,
        obs: _.filter((de) => String(de.observacao || "").trim() !== "").length,
        melhor: Y[0] || null,
        pior: Y[Y.length - 1] || null,
      };
    }, [_]),
    E = (0, o.useMemo)(
      () =>
        _.map((M) => ({ data: M.data, pedidos: Je(M.pedidosGeral), unidades: Je(M.unidadesGeral) }))
          .filter((M) => M.pedidos !== null || M.unidades !== null)
          .slice(-18),
      [_],
    ),
    A = (0, o.useMemo)(
      () =>
        _.filter((M) => String(M.observacao || "").trim() !== "")
          .slice(-6)
          .reverse(),
      [_],
    ),
    I = (M, Q, Y) => {
      let de = vi(M[Q]);
      return o.default.createElement(
        "td",
        {
          style: {
            padding: "4px 7px",
            textAlign: "center",
            fontSize: 10,
            fontWeight: 800,
            fontFamily: s.fontMono,
            background: M[Q] ? de.bg : s.bgCard,
            color: M[Q] ? de.color : s.txtMuted,
            borderLeft: Y ? "4px solid #f0f3ff" : `1px dotted ${s.bdLight}`,
            borderBottom: `1px solid ${s.bdLight}`,
          },
        },
        M[Q] || "—",
      );
    },
    V = (M, Q, Y, de) => {
      let ce = M[Q] || "—",
        W = wa(ce);
      return o.default.createElement(
        "td",
        {
          style: {
            padding: "4px 7px",
            textAlign: "center",
            fontSize: 10,
            fontFamily: s.fontMono,
            fontWeight: 600,
            color: de && W > 0 ? s.red : s.txtPri,
            background: de && W > 0 ? s.redBg : s.bgCard,
            borderLeft: Y ? "4px solid #f0f3ff" : `1px dotted ${s.bdLight}`,
            borderBottom: `1px solid ${s.bdLight}`,
          },
        },
        ce,
      );
    },
    D = {
      background: s.bgCard,
      border: `1px solid ${s.bdLight}`,
      borderRadius: s.radius.lg,
      padding: 14,
      boxShadow: s.shadowCard,
    },
    O = {
      fontSize: 10,
      fontWeight: 800,
      color: s.txtSec,
      textTransform: "uppercase",
      letterSpacing: "0.07em",
      marginBottom: 10,
      fontFamily: s.font,
    },
    H = m ? 30 : 10;
  return o.default.createElement(
    o.default.Fragment,
    null,
    o.default.createElement(Wt, {
      titulo: "Indicador Diário — Expedição",
      atualizadoEm: a || "—",
      actions: o.default.createElement(
        "button",
        { onClick: r, disabled: t, style: uo(t) },
        t ? "Atualizando…" : "Atualizar",
      ),
    }),
    n && o.default.createElement("div", { style: co }, n),
    o.default.createElement(
      "section",
      {
        style: {
          background: s.bgCard,
          border: `1px solid ${s.bdLight}`,
          borderRadius: s.radius.lg,
          padding: 14,
          marginBottom: 16,
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "center",
          boxShadow: s.shadowCard,
        },
      },
      o.default.createElement("input", {
        value: i,
        onChange: (M) => l(M.target.value),
        placeholder: "Busca na expedição…",
        style: { ...Fa, flex: "1 1 180px" },
      }),
      o.default.createElement(
        "select",
        { value: d, onChange: (M) => u(M.target.value), style: mt },
        o.default.createElement("option", { value: "todos" }, "Todos"),
        o.default.createElement("option", { value: "hoje" }, "Hoje"),
        o.default.createElement("option", { value: "ontem" }, "Ontem"),
        o.default.createElement("option", { value: "ultimos" }, "Últimos X dias"),
      ),
      d === "ultimos" &&
        o.default.createElement("input", {
          type: "number",
          min: "1",
          value: p,
          onChange: (M) => c(M.target.value),
          style: { ...mt, width: 64 },
        }),
      o.default.createElement(
        "select",
        { value: g, onChange: (M) => f(M.target.value), style: mt },
        o.default.createElement("option", { value: "atual" }, "Mês atual"),
        o.default.createElement("option", { value: "" }, "Todos"),
        k.map((M) => o.default.createElement("option", { key: M, value: M }, M)),
      ),
      o.default.createElement(
        "select",
        { value: x, onChange: (M) => w(M.target.value), style: mt },
        o.default.createElement("option", { value: "todos" }, "Todas obs."),
        o.default.createElement("option", { value: "com" }, "Com obs."),
        o.default.createElement("option", { value: "sem" }, "Sem obs."),
      ),
      o.default.createElement(
        "button",
        {
          onClick: () => {
            (l(""), u("todos"), c("15"), f("atual"), w("todos"), h(false), v(k0));
          },
          style: Pa,
        },
        "Limpar",
      ),
    ),
    o.default.createElement(
      "section",
      { style: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12, marginBottom: 16 } },
      o.default.createElement(Fo, {
        titulo: "Dias analisados",
        valor: q.dias,
        grad: s.grad2,
        detalhe: "Conforme filtro",
      }),
      o.default.createElement(Fo, {
        titulo: "Com observação",
        valor: q.obs,
        grad: s.grad5,
        detalhe: "Dias com registro",
      }),
      o.default.createElement(Fo, {
        titulo: "Melhor dia",
        valor: q.melhor ? Kn(q.melhor.pct) : "—",
        grad: s.grad3,
        detalhe: q.melhor ? q.melhor.data : "Sem dados",
      }),
      o.default.createElement(Fo, {
        titulo: "Pior dia",
        valor: q.pior ? Kn(q.pior.pct) : "—",
        grad: s.grad6,
        detalhe: q.pior ? q.pior.data : "Sem dados",
      }),
    ),
    o.default.createElement(
      "section",
      {
        style: {
          background: s.bgCard,
          border: `1px solid ${s.bdLight}`,
          borderRadius: s.radius.xl,
          overflow: "hidden",
          boxShadow: s.shadowCard,
        },
      },
      o.default.createElement(
        "div",
        {
          style: {
            padding: "13px 18px",
            borderBottom: `1px solid ${s.bdLight}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: s.bgStripe,
          },
        },
        o.default.createElement(
          "span",
          { style: { fontWeight: 800, color: s.txtPri, fontSize: 14, fontFamily: s.font, letterSpacing: "-0.02em" } },
          "Desempenho Diário — Expedição",
        ),
        o.default.createElement(
          "div",
          { style: { display: "flex", gap: 8, alignItems: "center" } },
          o.default.createElement(
            "button",
            {
              type: "button",
              onClick: () => h((M) => !M),
              style: {
                height: 30,
                border: `1px solid ${m ? s.primary : s.bdMid}`,
                borderRadius: s.radius.md,
                padding: "0 12px",
                fontSize: 11,
                fontWeight: 700,
                background: m ? s.primaryLight : s.bgCard,
                color: m ? s.primary : s.txtPri,
                cursor: "pointer",
                fontFamily: s.font,
              },
            },
            m ? "Ocultar detalhes" : "Ver detalhes",
          ),
          o.default.createElement(Ei, { filtrados: _.length, total: e.length }),
        ),
      ),
      o.default.createElement(
        "div",
        { style: { overflowX: "auto" } },
        o.default.createElement(
          "table",
          { style: { width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: s.font } },
          o.default.createElement(
            "thead",
            null,
            o.default.createElement(
              "tr",
              null,
              o.default.createElement(
                "th",
                {
                  colSpan: "2",
                  style: {
                    background: "linear-gradient(135deg,#302b63,#24243e)",
                    color: "#c4b5fd",
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    textAlign: "center",
                    padding: "7px 8px",
                  },
                },
                "Dia",
              ),
              o.default.createElement(
                "th",
                {
                  colSpan: "4",
                  style: {
                    background: "linear-gradient(135deg,#1a1f6e,#2d3282)",
                    color: "#bfdbfe",
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    textAlign: "center",
                    padding: "7px 8px",
                    borderLeft: "4px solid #f0f3ff",
                  },
                },
                "Pedidos (%)",
              ),
              o.default.createElement(
                "th",
                {
                  colSpan: "4",
                  style: {
                    background: "linear-gradient(135deg,#064e3b,#065f46)",
                    color: "#a7f3d0",
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    textAlign: "center",
                    padding: "7px 8px",
                    borderLeft: "4px solid #f0f3ff",
                  },
                },
                "Unidades (%)",
              ),
              m &&
                [
                  ["0101", "linear-gradient(135deg,#1e3a5f,#1e40af)", "#bae6fd"],
                  ["0102", "linear-gradient(135deg,#3b2a6e,#5b3fb0)", "#ddd6fe"],
                  ["1020", "linear-gradient(135deg,#134e4a,#065f46)", "#99f6e4"],
                  ["Geral", "linear-gradient(135deg,#374151,#1f2937)", "#d1d5db"],
                ].map(([M, Q, Y]) =>
                  o.default.createElement(
                    "th",
                    {
                      key: `g-${M}`,
                      colSpan: "5",
                      style: {
                        background: Q,
                        color: Y,
                        fontSize: 9,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        textAlign: "center",
                        padding: "7px 8px",
                        borderLeft: "4px solid #f0f3ff",
                      },
                    },
                    M,
                  ),
                ),
            ),
            o.default.createElement(
              "tr",
              { style: { background: s.bgMuted } },
              ["Data", "Dia"].map((M) =>
                o.default.createElement(
                  "th",
                  {
                    key: M,
                    style: {
                      padding: "6px 8px",
                      fontSize: 9,
                      fontWeight: 800,
                      color: s.txtSec,
                      textAlign: "center",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      borderBottom: `1px solid ${s.bdLight}`,
                    },
                  },
                  M,
                ),
              ),
              ["0101", "0102", "1020", "Geral"].map((M, Q) =>
                o.default.createElement(
                  "th",
                  {
                    key: `p${Q}`,
                    style: {
                      padding: "6px 8px",
                      fontSize: 9,
                      fontWeight: 800,
                      color: s.txtSec,
                      textAlign: "center",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      borderBottom: `1px solid ${s.bdLight}`,
                      borderLeft: Q === 0 ? "4px solid #f0f3ff" : void 0,
                    },
                  },
                  M,
                ),
              ),
              ["0101", "0102", "1020", "Geral"].map((M, Q) =>
                o.default.createElement(
                  "th",
                  {
                    key: `u${Q}`,
                    style: {
                      padding: "6px 8px",
                      fontSize: 9,
                      fontWeight: 800,
                      color: s.txtSec,
                      textAlign: "center",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      borderBottom: `1px solid ${s.bdLight}`,
                      borderLeft: Q === 0 ? "4px solid #f0f3ff" : void 0,
                    },
                  },
                  M,
                ),
              ),
              m &&
                ["0101", "0102", "1020", "Geral"].map((M) =>
                  ["Atraso", "Fat.", "Env.", "Un.Env.", "Un.Fat."].map((Q, Y) =>
                    o.default.createElement(
                      "th",
                      {
                        key: `${M}-${Y}`,
                        style: {
                          padding: "5px 6px",
                          fontSize: 9,
                          fontWeight: 800,
                          color: s.txtSec,
                          textAlign: "center",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                          borderBottom: `1px solid ${s.bdLight}`,
                          borderLeft: Y === 0 ? "4px solid #f0f3ff" : void 0,
                          whiteSpace: "nowrap",
                        },
                      },
                      Q,
                    ),
                  ),
                ),
            ),
          ),
          o.default.createElement(
            "tbody",
            null,
            t &&
              !_.length &&
              o.default.createElement(
                "tr",
                null,
                o.default.createElement(
                  "td",
                  { colSpan: H, style: { padding: 28, textAlign: "center", color: s.txtMuted, fontFamily: s.font } },
                  "Carregando…",
                ),
              ),
            !t &&
              !_.length &&
              o.default.createElement(
                "tr",
                null,
                o.default.createElement(
                  "td",
                  { colSpan: H, style: { padding: 28, textAlign: "center", color: s.txtMuted, fontFamily: s.font } },
                  "Nenhum indicador encontrado.",
                ),
              ),
            _.map((M, Q) =>
              o.default.createElement(
                "tr",
                { key: Q, style: { background: Q % 2 === 0 ? s.bgCard : s.bgStripe } },
                o.default.createElement(
                  "td",
                  {
                    style: {
                      padding: "5px 8px",
                      textAlign: "center",
                      fontSize: 10,
                      fontWeight: 700,
                      color: s.txtPri,
                      borderBottom: `1px solid ${s.bdLight}`,
                      fontFamily: s.fontMono,
                    },
                  },
                  M.data || "—",
                ),
                o.default.createElement(
                  "td",
                  {
                    style: {
                      padding: "5px 8px",
                      textAlign: "center",
                      fontSize: 10,
                      color: s.txtSec,
                      borderBottom: `1px solid ${s.bdLight}`,
                      fontFamily: s.font,
                    },
                  },
                  M.diaSemana || "—",
                ),
                I(M, "pedidos0101", true),
                I(M, "pedidos0102"),
                I(M, "pedidos1020"),
                I(M, "pedidosGeral"),
                I(M, "unidades0101", true),
                I(M, "unidades0102"),
                I(M, "unidades1020"),
                I(M, "unidadesGeral"),
                m &&
                  ["c0101", "c0102", "c1020", "geral"].map((Y) =>
                    o.default.createElement(
                      o.default.Fragment,
                      { key: Y },
                      V(M, Y + "Atraso", true, true),
                      V(M, Y + "Faturados"),
                      V(M, Y === "geral" ? "geralTotalEnviados" : Y + "Enviados"),
                      V(M, Y + "UnidadesEnviadas"),
                      V(M, Y + "UnidadesFaturadas"),
                    ),
                  ),
              ),
            ),
          ),
        ),
      ),
    ),
    o.default.createElement(
      "section",
      { style: { ...D, marginTop: 14 } },
      o.default.createElement("div", { style: O }, "Últimas Observações"),
      A.length
        ? o.default.createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 10 } },
            A.map((M, Q) =>
              o.default.createElement(
                "div",
                { key: Q, style: { borderBottom: `1px solid ${s.bdLight}`, paddingBottom: 10 } },
                o.default.createElement(
                  "div",
                  {
                    style: {
                      fontSize: 10,
                      fontWeight: 800,
                      background: s.grad1,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginBottom: 3,
                      fontFamily: s.font,
                    },
                  },
                  M.data,
                  " · ",
                  M.diaSemana,
                ),
                o.default.createElement(
                  "div",
                  { style: { color: s.txtPri, fontSize: 12, lineHeight: 1.4, fontFamily: s.font } },
                  M.observacao,
                ),
              ),
            ),
          )
        : o.default.createElement(
            "div",
            { style: { color: s.txtMuted, fontSize: 12, fontFamily: s.font, padding: "20px 0", textAlign: "center" } },
            "Nenhuma observação no período.",
          ),
    ),
  );
}
function Ay() {
  let { dados: e, loading: t, erro: n, atualizado: a, load: r } = Ci("indicadorAbastecimentoEstoque"),
    [i, l] = (0, o.useState)(""),
    [d, u] = (0, o.useState)("atual"),
    [p, c] = (0, o.useState)("todos"),
    [g, f] = (0, o.useState)("30"),
    [x, w] = (0, o.useState)(F0),
    F = (0, o.useMemo)(() => {
      let A = /* @__PURE__ */ new Date();
      return `${String(A.getMonth() + 1).padStart(2, "0")}/${A.getFullYear()}`;
    }, []);
  function v(A) {
    let I = El(A);
    return I ? `${String(I.getMonth() + 1).padStart(2, "0")}/${I.getFullYear()}` : "";
  }
  function m() {
    return 95;
  }
  function h(A) {
    let I = Je(A),
      V = m();
    return I === null ? "Sem percentual" : I >= V ? "Meta atingida" : I >= V - 2 ? "Atenção" : "Abaixo da meta";
  }
  function y(A) {
    let I = Te(A);
    return I.includes("atingida")
      ? "verde"
      : I.includes("atencao")
        ? "laranja"
        : I.includes("abaixo")
          ? "vermelho"
          : "cinza";
  }
  let B = (0, o.useMemo)(
      () =>
        (e || []).map((A) => {
          let I = Je(A.percentual),
            V = wa(A.meta),
            D = wa(A.realizado),
            O = I !== null ? I : V > 0 ? (D / V) * 100 : null,
            H = O === null ? "" : `${O.toFixed(2).replace(".", ",")}%`,
            M = h(H);
          return {
            ...A,
            mes: v(A.data),
            metaSistema: "95%",
            percentualCalculado: H,
            percentualNumero: O,
            statusMeta: M,
          };
        }),
      [e],
    ),
    k = (0, o.useMemo)(() => Aa(B, "mes"), [B]),
    L = (0, o.useMemo)(
      () =>
        d === "atual"
          ? B.filter((A) => String(A.mes || "") === F)
          : d
            ? B.filter((A) => String(A.mes || "") === String(d))
            : B,
      [B, d, F],
    ),
    C = (0, o.useMemo)(() => on(L, "data", p, g), [L, p, g]),
    _ = (0, o.useMemo)(
      () => Po(C, i, x, ["data", "mes", "meta", "metaSistema", "realizado", "percentualCalculado", "statusMeta"]),
      [C, i, x],
    ),
    q = (0, o.useMemo)(() => {
      let A = _.map((D) => D.percentualNumero).filter((D) => D != null),
        I = A.length > 0 ? A.reduce((D, O) => D + O, 0) / A.length : null,
        V = _.filter((D) => D.percentualNumero !== null).sort((D, O) => O.percentualNumero - D.percentualNumero);
      return {
        registros: _.length,
        media: I === null ? "—" : `${I.toFixed(2).replace(".", ",")}%`,
        metaAtingida: _.filter((D) => Te(D.statusMeta).includes("atingida")).length,
        abaixoMeta: _.filter((D) => Te(D.statusMeta).includes("abaixo")).length,
        melhor: V[0] || null,
        pior: V[V.length - 1] || null,
      };
    }, [_]),
    E = [
      { campo: "data", titulo: "Data", bold: true, width: 120 },
      { campo: "mes", titulo: "Mês", width: 90 },
      { campo: "metaSistema", titulo: "Meta", width: 90 },
      { campo: "realizado", titulo: "Realizado", width: 90 },
      {
        campo: "percentualCalculado",
        titulo: "Percentual",
        bold: true,
        width: 110,
        render: (A) => o.default.createElement(gt, { texto: A.percentualCalculado || "—", tipo: y(A.statusMeta) }),
      },
      {
        campo: "statusMeta",
        titulo: "Status",
        width: 130,
        render: (A) => o.default.createElement(gt, { texto: A.statusMeta, tipo: y(A.statusMeta) }),
      },
    ];
  return o.default.createElement(
    o.default.Fragment,
    null,
    o.default.createElement(Wt, {
      titulo: "Abastecimento Estoque",
      atualizadoEm: a || "—",
      extraInfo: o.default.createElement(
        "span",
        null,
        "Meta considerada: ",
        o.default.createElement("strong", { style: { color: s.txtSec } }, "95%"),
      ),
      actions: o.default.createElement(
        "button",
        { onClick: r, disabled: t, style: uo(t) },
        t ? "Atualizando…" : "Atualizar",
      ),
    }),
    n && o.default.createElement("div", { style: co }, n),
    o.default.createElement(
      "section",
      { style: { display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12, marginBottom: 18 } },
      o.default.createElement(ze, { titulo: "Registros", valor: q.registros }),
      o.default.createElement(ze, { titulo: "Média Picking", valor: q.media }),
      o.default.createElement(ze, { titulo: "Meta Atingida", valor: q.metaAtingida }),
      o.default.createElement(ze, { titulo: "Abaixo da Meta", valor: q.abaixoMeta }),
    ),
    o.default.createElement(
      "section",
      { style: { marginBottom: 16, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" } },
      o.default.createElement("input", {
        value: i,
        onChange: (A) => l(A.target.value),
        placeholder: "Busca nos registros de abastecimento...",
        style: Fa,
      }),
      o.default.createElement(
        "select",
        { value: d, onChange: (A) => u(A.target.value), style: mt },
        o.default.createElement("option", { value: "atual" }, "Mês atual"),
        o.default.createElement("option", { value: "" }, "Todos os meses"),
        k.map((A) => o.default.createElement("option", { key: A, value: A }, A)),
      ),
      o.default.createElement(
        "select",
        { value: p, onChange: (A) => c(A.target.value), style: mt },
        o.default.createElement("option", { value: "todos" }, "Todos os períodos"),
        o.default.createElement("option", { value: "hoje" }, "Hoje"),
        o.default.createElement("option", { value: "ontem" }, "Ontem"),
        o.default.createElement("option", { value: "ultimos" }, "Últimos X dias"),
      ),
      p === "ultimos" &&
        o.default.createElement("input", {
          type: "number",
          min: "1",
          value: g,
          onChange: (A) => f(A.target.value),
          style: { ...mt, width: 64 },
        }),
      o.default.createElement(
        "button",
        {
          onClick: () => {
            (l(""), u("atual"), c("todos"), f("30"), w(F0));
          },
          style: Pa,
        },
        "Limpar filtros",
      ),
    ),
    o.default.createElement(nn, {
      titulo: "Registros Diários — Abastecimento do Estoque",
      dadosBase: B,
      dadosFiltrados: _,
      colunas: E,
      filtros: x,
      onFiltro: (A, I) => w((V) => ({ ...V, [A]: I })),
      carregando: t,
      mensagemVazia: "Nenhum registro de abastecimento encontrado.",
    }),
  );
}
function ky() {
  let { dados: e, loading: t, erro: n, atualizado: a, load: r } = Ci("indicadorAbastecimentoEstoque"),
    [i, l] = (0, o.useState)(""),
    [d, u] = (0, o.useState)("atual"),
    p = (0, o.useMemo)(() => String(/* @__PURE__ */ new Date().getFullYear()), []);
  function c(B) {
    let k = El(B);
    return k ? `${String(k.getMonth() + 1).padStart(2, "0")}/${k.getFullYear()}` : "";
  }
  function g(B) {
    let k = String(B || "").match(/^(\d{2})\/(\d{4})$/);
    return k ? k[2] : "";
  }
  function f(B) {
    let k = Je(B);
    return k === null ? "Sem percentual" : k >= 95 ? "Meta atingida" : k >= 93 ? "Atenção" : "Abaixo da meta";
  }
  function x(B) {
    let k = Te(B);
    return k.includes("atingida")
      ? "verde"
      : k.includes("atencao")
        ? "laranja"
        : k.includes("abaixo")
          ? "vermelho"
          : "cinza";
  }
  let w = (0, o.useMemo)(
      () =>
        (e || [])
          .map((B) => {
            let k = Je(B.percentual),
              L = wa(B.meta),
              C = wa(B.realizado),
              _ = k !== null ? k : L > 0 ? (C / L) * 100 : null,
              q = c(B.data);
            return { ...B, mesAno: q, ano: g(q), percentualNumero: _ };
          })
          .filter((B) => B.mesAno && B.percentualNumero !== null && B.percentualNumero !== void 0),
      [e],
    ),
    F = (0, o.useMemo)(() => {
      let B = /* @__PURE__ */ new Map();
      return (
        w.forEach((k) => {
          B.has(k.mesAno) || B.set(k.mesAno, { mesAno: k.mesAno, ano: k.ano, totalPercentual: 0, registros: 0 });
          let L = B.get(k.mesAno);
          ((L.totalPercentual += k.percentualNumero), (L.registros += 1));
        }),
        Array.from(B.values())
          .map((k) => {
            let L = k.registros > 0 ? k.totalPercentual / k.registros : null,
              C = L === null ? "" : `${L.toFixed(2).replace(".", ",")}%`;
            return { mesAno: k.mesAno, ano: k.ano, percentual: C, percentualNumero: L, statusMeta: f(C) };
          })
          .sort((k, L) => {
            let [C, _] = String(k.mesAno).split("/").map(Number),
              [q, E] = String(L.mesAno).split("/").map(Number);
            return _ === E ? C - q : _ - E;
          })
      );
    }, [w]),
    v = (0, o.useMemo)(() => Aa(F, "ano"), [F]),
    m = (0, o.useMemo)(() => {
      let B = Te(i);
      return F.filter((k) => {
        let L = d === "atual" ? String(k.ano || "") === p : !d || String(k.ano || "") === String(d),
          C = !B || Te(k.mesAno).includes(B) || Te(k.percentual).includes(B) || Te(k.statusMeta).includes(B);
        return L && C;
      });
    }, [F, i, d, p]),
    h = (0, o.useMemo)(() => {
      let B = m.map((C) => C.percentualNumero).filter((C) => C != null),
        k = B.length > 0 ? B.reduce((C, _) => C + _, 0) / B.length : null,
        L = [...m].filter((C) => C.percentualNumero !== null).sort((C, _) => _.percentualNumero - C.percentualNumero);
      return {
        meses: m.length,
        media: k === null ? "—" : `${k.toFixed(2).replace(".", ",")}%`,
        melhor: L[0] || null,
        pior: L[L.length - 1] || null,
      };
    }, [m]),
    y = [
      { campo: "mesAno", titulo: "Mês/Ano", bold: true, width: 120 },
      {
        campo: "percentual",
        titulo: "Percentual",
        bold: true,
        width: 120,
        render: (B) => o.default.createElement(gt, { texto: B.percentual || "—", tipo: x(B.statusMeta) }),
      },
    ];
  return o.default.createElement(
    o.default.Fragment,
    null,
    o.default.createElement(Wt, {
      titulo: "Abastecimento Mensal",
      atualizadoEm: a || "—",
      extraInfo: o.default.createElement(
        "span",
        null,
        "Meta considerada: ",
        o.default.createElement("strong", { style: { color: s.txtSec } }, "95%"),
      ),
      actions: o.default.createElement(
        "button",
        { onClick: r, disabled: t, style: uo(t) },
        t ? "Atualizando…" : "Atualizar",
      ),
    }),
    n && o.default.createElement("div", { style: co }, n),
    o.default.createElement(
      "section",
      { style: { display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12, marginBottom: 18 } },
      o.default.createElement(ze, { titulo: "Meses Analisados", valor: h.meses }),
      o.default.createElement(ze, { titulo: "Média Geral", valor: h.media }),
      o.default.createElement(ze, {
        titulo: "Melhor Mês",
        valor: h.melhor ? h.melhor.percentual : "—",
        subtitulo: h.melhor ? h.melhor.mesAno : "",
      }),
      o.default.createElement(ze, {
        titulo: "Pior Mês",
        valor: h.pior ? h.pior.percentual : "—",
        subtitulo: h.pior ? h.pior.mesAno : "",
      }),
    ),
    o.default.createElement(
      "section",
      { style: { marginBottom: 16, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" } },
      o.default.createElement("input", {
        value: i,
        onChange: (B) => l(B.target.value),
        placeholder: "Busca por mês ou percentual...",
        style: Fa,
      }),
      o.default.createElement(
        "select",
        { value: d, onChange: (B) => u(B.target.value), style: mt },
        o.default.createElement("option", { value: "atual" }, "Ano atual"),
        o.default.createElement("option", { value: "" }, "Todos os anos"),
        v.map((B) => o.default.createElement("option", { key: B, value: B }, B)),
      ),
      o.default.createElement(
        "button",
        {
          onClick: () => {
            (l(""), u("atual"));
          },
          style: Pa,
        },
        "Limpar filtros",
      ),
    ),
    o.default.createElement(nn, {
      titulo: "Abastecimento Mensal — Média por Mês",
      dadosBase: F,
      dadosFiltrados: m,
      colunas: y,
      filtros: {},
      onFiltro: () => {},
      carregando: t,
      mensagemVazia: "Nenhum indicador mensal de abastecimento encontrado.",
    }),
  );
}
function Fy(e) {
  let t = String(e || "")
    .trim()
    .match(/^(\d{2})\/(\d{4})$/);
  return t ? t[2] : "";
}
function T0({ tipo: e }) {
  let t = e === "expedicao",
    n = t ? "indicadorExpedicaoMensal" : "indicadorFaturamentoMensal",
    a = t ? "Indicador Mensal — Expedição" : "Indicador Mensal — Faturamento",
    { dados: r, loading: i, erro: l, atualizado: d, load: u } = Ci(n),
    [p, c] = (0, o.useState)(""),
    [g, f] = (0, o.useState)("atual"),
    x = (0, o.useMemo)(() => String(/* @__PURE__ */ new Date().getFullYear()), []),
    w = (0, o.useMemo)(() => r.map((A) => ({ ...A, ano: Fy(A.mes) })), [r]),
    F = (0, o.useMemo)(() => Aa(w, "ano"), [w]),
    v = t
      ? [
          "mes",
          "pedidos0101",
          "pedidos1020",
          "pedidosGeral",
          "unidades0101",
          "unidades1020",
          "unidadesGeral",
          "unidadesMedia",
        ]
      : [
          "mes",
          "pedidos001",
          "pedidos002",
          "pedidos005",
          "pedidosGeral",
          "unidades001",
          "unidades002",
          "unidades005",
          "unidadesGeral",
          "unidadesMedia",
          "pedidos1030SP",
          "pedidos1040MG",
          "pedidos0104MG",
          "pedidos0105ES",
          "pedidosMediaCD",
        ],
    m = (0, o.useMemo)(() => {
      let A = Te(p);
      return w.filter((I) => {
        let V = g === "atual" ? String(I.ano || "") === x : !g || String(I.ano || "") === String(g),
          D = !A || v.some((O) => Te(I[O]).includes(A));
        return V && D;
      });
    }, [w, p, g, x, v]),
    h = (0, o.useMemo)(() => {
      let A = Je(Sa(m, "pedidosGeral")) || 0,
        I = Je(Sa(m, "unidadesGeral")) || 0,
        V = m
          .map((D) => ({ ...D, pct: Je(D.pedidosGeral) }))
          .filter((D) => D.pct !== null)
          .sort((D, O) => O.pct - D.pct);
      return { meses: m.length, mp: A, mu: I, melhor: V[0] || null, pior: V[V.length - 1] || null };
    }, [m]),
    y = (0, o.useMemo)(
      () =>
        m
          .map((A) => ({ mes: A.mes, pedidos: Je(A.pedidosGeral), unidades: Je(A.unidadesGeral) }))
          .filter((A) => A.pedidos !== null || A.unidades !== null)
          .slice(-18),
      [m],
    ),
    B = {
      background: s.bgCard,
      border: `1px solid ${s.bdLight}`,
      borderRadius: s.radius.lg,
      padding: 14,
      boxShadow: s.shadowCard,
    },
    k = {
      fontSize: 10,
      fontWeight: 800,
      color: s.txtSec,
      textTransform: "uppercase",
      letterSpacing: "0.07em",
      marginBottom: 10,
      fontFamily: s.font,
    },
    L = (A, I, V = false) => ({
      background: A,
      color: I,
      fontSize: 9,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.07em",
      textAlign: "center",
      padding: "7px 8px",
      borderLeft: V ? "4px solid #f0f3ff" : void 0,
    }),
    C = (A = false) => ({
      padding: "6px 8px",
      fontSize: 9,
      fontWeight: 800,
      color: s.txtSec,
      textAlign: "center",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      borderBottom: `1px solid ${s.bdLight}`,
      borderLeft: A ? "4px solid #f0f3ff" : void 0,
      whiteSpace: "nowrap",
    }),
    _ = {
      padding: "5px 8px",
      textAlign: "center",
      fontSize: 10,
      fontWeight: 800,
      color: s.txtPri,
      borderBottom: `1px solid ${s.bdLight}`,
      fontFamily: s.fontMono,
      whiteSpace: "nowrap",
    };
  function q({ item: A, campo: I, sep: V }) {
    let D = vi(A[I]);
    return o.default.createElement(
      "td",
      {
        style: {
          padding: "4px 7px",
          textAlign: "center",
          fontSize: 10,
          fontWeight: 800,
          fontFamily: s.fontMono,
          background: A[I] ? D.bg : s.bgCard,
          color: A[I] ? D.color : s.txtMuted,
          borderLeft: V ? "4px solid #f0f3ff" : `1px dotted ${s.bdLight}`,
          borderBottom: `1px solid ${s.bdLight}`,
          whiteSpace: "nowrap",
        },
      },
      A[I] || "—",
    );
  }
  let E = t ? 8 : 15;
  return o.default.createElement(
    o.default.Fragment,
    null,
    o.default.createElement(Wt, {
      titulo: a,
      atualizadoEm: d || "—",
      actions: o.default.createElement(
        "button",
        { onClick: u, disabled: i, style: uo(i) },
        i ? "Atualizando…" : "Atualizar",
      ),
    }),
    l && o.default.createElement("div", { style: co }, l),
    o.default.createElement(
      "section",
      {
        style: {
          background: s.bgCard,
          border: `1px solid ${s.bdLight}`,
          borderRadius: s.radius.lg,
          padding: 14,
          marginBottom: 16,
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "center",
          boxShadow: s.shadowCard,
        },
      },
      o.default.createElement("input", {
        value: p,
        onChange: (A) => c(A.target.value),
        placeholder: "Busca no indicador mensal…",
        style: { ...Fa, flex: "1 1 220px" },
      }),
      o.default.createElement(
        "select",
        { value: g, onChange: (A) => f(A.target.value), style: mt },
        o.default.createElement("option", { value: "atual" }, "Ano atual"),
        o.default.createElement("option", { value: "" }, "Todos os anos"),
        F.map((A) => o.default.createElement("option", { key: A, value: A }, A)),
      ),
      o.default.createElement(
        "button",
        {
          onClick: () => {
            (c(""), f("atual"));
          },
          style: Pa,
        },
        "Limpar",
      ),
    ),
    o.default.createElement(
      "section",
      {
        style: {
          background: s.bgCard,
          border: `1px solid ${s.bdLight}`,
          borderRadius: s.radius.xl,
          overflow: "hidden",
          boxShadow: s.shadowCard,
        },
      },
      o.default.createElement(
        "div",
        {
          style: {
            padding: "13px 18px",
            borderBottom: `1px solid ${s.bdLight}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: s.bgStripe,
          },
        },
        o.default.createElement(
          "span",
          { style: { fontWeight: 800, color: s.txtPri, fontSize: 14, fontFamily: s.font, letterSpacing: "-0.02em" } },
          "Desempenho Mensal Detalhado",
        ),
        o.default.createElement(Ei, { filtrados: m.length, total: r.length }),
      ),
      o.default.createElement(
        "div",
        { style: { overflowX: "auto" } },
        o.default.createElement(
          "table",
          { style: { width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: s.font } },
          o.default.createElement(
            "thead",
            null,
            o.default.createElement(
              "tr",
              null,
              o.default.createElement(
                "th",
                { colSpan: "1", style: L("linear-gradient(135deg,#302b63,#24243e)", "#c4b5fd") },
                "Mês",
              ),
              o.default.createElement(
                "th",
                { colSpan: t ? 3 : 4, style: L("linear-gradient(135deg,#1a1f6e,#2d3282)", "#bfdbfe", true) },
                "Pedidos (%)",
              ),
              o.default.createElement(
                "th",
                { colSpan: t ? 4 : 5, style: L("linear-gradient(135deg,#064e3b,#065f46)", "#a7f3d0", true) },
                "Unidades (%)",
              ),
              !t &&
                o.default.createElement(
                  "th",
                  { colSpan: "5", style: L("linear-gradient(135deg,#374151,#1f2937)", "#d1d5db", true) },
                  "CDs",
                ),
            ),
            o.default.createElement(
              "tr",
              { style: { background: s.bgMuted } },
              o.default.createElement("th", { style: C() }, "Mês"),
              t
                ? o.default.createElement(
                    o.default.Fragment,
                    null,
                    ["0101", "1020", "Geral"].map((A, I) =>
                      o.default.createElement("th", { key: `p${I}`, style: C(I === 0) }, A),
                    ),
                    ["0101", "1020", "Geral", "Média"].map((A, I) =>
                      o.default.createElement("th", { key: `u${I}`, style: C(I === 0) }, A),
                    ),
                  )
                : o.default.createElement(
                    o.default.Fragment,
                    null,
                    ["001", "002", "005", "Geral"].map((A, I) =>
                      o.default.createElement("th", { key: `p${I}`, style: C(I === 0) }, A),
                    ),
                    ["001", "002", "005", "Geral", "Média"].map((A, I) =>
                      o.default.createElement("th", { key: `u${I}`, style: C(I === 0) }, A),
                    ),
                    ["1030-SP", "1040-MG", "0104-MG", "0105-ES", "Média"].map((A, I) =>
                      o.default.createElement("th", { key: `c${I}`, style: C(I === 0) }, A),
                    ),
                  ),
            ),
          ),
          o.default.createElement(
            "tbody",
            null,
            i &&
              !m.length &&
              o.default.createElement(
                "tr",
                null,
                o.default.createElement(
                  "td",
                  { colSpan: E, style: { padding: 28, textAlign: "center", color: s.txtMuted, fontFamily: s.font } },
                  "Carregando…",
                ),
              ),
            !i &&
              !m.length &&
              o.default.createElement(
                "tr",
                null,
                o.default.createElement(
                  "td",
                  { colSpan: E, style: { padding: 28, textAlign: "center", color: s.txtMuted, fontFamily: s.font } },
                  "Nenhum indicador mensal encontrado.",
                ),
              ),
            m.map((A, I) =>
              o.default.createElement(
                "tr",
                { key: I, style: { background: I % 2 === 0 ? s.bgCard : s.bgStripe } },
                o.default.createElement("td", { style: _ }, A.mes || "—"),
                t
                  ? o.default.createElement(
                      o.default.Fragment,
                      null,
                      o.default.createElement(q, { item: A, campo: "pedidos0101", sep: true }),
                      o.default.createElement(q, { item: A, campo: "pedidos1020" }),
                      o.default.createElement(q, { item: A, campo: "pedidosGeral" }),
                      o.default.createElement(q, { item: A, campo: "unidades0101", sep: true }),
                      o.default.createElement(q, { item: A, campo: "unidades1020" }),
                      o.default.createElement(q, { item: A, campo: "unidadesGeral" }),
                      o.default.createElement(q, { item: A, campo: "unidadesMedia" }),
                    )
                  : o.default.createElement(
                      o.default.Fragment,
                      null,
                      o.default.createElement(q, { item: A, campo: "pedidos001", sep: true }),
                      o.default.createElement(q, { item: A, campo: "pedidos002" }),
                      o.default.createElement(q, { item: A, campo: "pedidos005" }),
                      o.default.createElement(q, { item: A, campo: "pedidosGeral" }),
                      o.default.createElement(q, { item: A, campo: "unidades001", sep: true }),
                      o.default.createElement(q, { item: A, campo: "unidades002" }),
                      o.default.createElement(q, { item: A, campo: "unidades005" }),
                      o.default.createElement(q, { item: A, campo: "unidadesGeral" }),
                      o.default.createElement(q, { item: A, campo: "unidadesMedia" }),
                      o.default.createElement(q, { item: A, campo: "pedidos1030SP", sep: true }),
                      o.default.createElement(q, { item: A, campo: "pedidos1040MG" }),
                      o.default.createElement(q, { item: A, campo: "pedidos0104MG" }),
                      o.default.createElement(q, { item: A, campo: "pedidos0105ES" }),
                      o.default.createElement(q, { item: A, campo: "pedidosMediaCD" }),
                    ),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}
var Eg = "bbdi_dashboard_snapshot_v1";
function Py() {
  if (typeof window > "u") return null;
  try {
    let e = localStorage.getItem(Eg);
    return e ? JSON.parse(e) : null;
  } catch {
    return null;
  }
}
function _y(e) {
  if (!(typeof window > "u"))
    try {
      localStorage.setItem(Eg, JSON.stringify(e));
    } catch {}
}
function Ly({ setTela: e, ativo: t = true }) {
  let n = (0, o.useRef)(t);
  n.current = t;
  let a = (0, o.useRef)(true),
    [r] = (0, o.useState)(() => Py()),
    [i, l] = (0, o.useState)(() => r?.resumo || null),
    [d, u] = (0, o.useState)(false),
    [p, c] = (0, o.useState)({
      equipatech: [],
      bbbaterias: [],
      producao: [],
      analiseTransformacoes: [],
      estoque: [],
      consultaPecas: [],
      ajusteSaldo: [],
      ajusteSaldoBBBaterias: [],
      pedidoVenda1020: [],
      indicadorFaturamentoMensal: [],
      indicadorExpedicaoMensal: [],
      indicadorAbastecimentoEstoque: [],
    }),
    [g, f] = (0, o.useState)(() => r?.atualizacoesDashboard || {}),
    [x, w] = (0, o.useState)(() => r?.atualizadoEm || ""),
    [F, v] = (0, o.useState)(false),
    [m, h] = (0, o.useState)([]),
    [y, B] = (0, o.useState)({ dados: null, erro: "", hora: "" }),
    [k, L] = (0, o.useState)({ dados: null, erro: "", hora: "" }),
    [C, _] = (0, o.useState)({ dados: null, erro: "", hora: "" }),
    [ntC, setNtC] = (0, o.useState)({ dados: null, erro: "", hora: "" }),
    q = (0, o.useCallback)(async () => {
      try {
        let W = await Ry();
        B({
          dados: W,
          erro: "",
          hora: /* @__PURE__ */ new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" }),
        });
      } catch (W) {
        B((S) => ({ ...S, erro: W.message || "falha ao carregar" }));
      }
    }, []);
  (0, o.useEffect)(() => {
    q();
    let W = setInterval(() => {
      lr() && n.current && q();
    }, 3e5);
    return () => clearInterval(W);
  }, [q]);
  let E = (0, o.useCallback)(async () => {
    try {
      let W = await D2();
      _({
        dados: W,
        erro: "",
        hora: /* @__PURE__ */ new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      });
    } catch (W) {
      _((S) => ({ ...S, erro: W.message || "falha ao carregar" }));
    }
  }, []);
  (0, o.useEffect)(() => {
    E();
    let W = setInterval(() => {
      lr() && n.current && E();
    }, 3e5);
    return () => clearInterval(W);
  }, [E]);
  let ntR = (0, o.useCallback)(async () => {
    try {
      let W = await NtResumo();
      setNtC({
        dados: W,
        erro: "",
        hora: /* @__PURE__ */ new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      });
    } catch (W) {
      setNtC((S) => ({ ...S, erro: W.message || "falha ao carregar" }));
    }
  }, []);
  (0, o.useEffect)(() => {
    ntR();
    let W = setInterval(() => {
      lr() && n.current && ntR();
    }, 3e5);
    return () => clearInterval(W);
  }, [ntR]);
  let A = (0, o.useCallback)(async () => {
    try {
      let W = await hb();
      L({
        dados: W,
        erro: "",
        hora: /* @__PURE__ */ new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      });
    } catch (W) {
      L((S) => ({ ...S, erro: W.message || "falha ao carregar" }));
    }
  }, []);
  ((0, o.useEffect)(() => {
    A();
    let W = setInterval(() => {
      lr() && n.current && A();
    }, 12e4);
    return () => clearInterval(W);
  }, [A]),
    (0, o.useEffect)(() => {
      if (a.current) {
        a.current = false;
        return;
      }
      t && lr() && (q(), A(), E());
    }, [t, q, A, E]),
    (0, o.useEffect)(() => {
      let W = () => {
        lr() && n.current && (q(), A(), E());
      };
      return (
        document.addEventListener("visibilitychange", W),
        () => document.removeEventListener("visibilitychange", W)
      );
    }, [q, A, E]));
  let I = (0, o.useCallback)(async () => {
    v(true);
    let W = [
        "equipatech",
        "bbbaterias",
        "producao",
        "analiseTransformacoes",
        "estoque",
        "consultaPecas",
        "ajusteSaldo",
        "ajusteSaldoBBBaterias",
        "pedidoVenda1020",
        "indicadorFaturamentoMensal",
        "indicadorExpedicaoMensal",
        "indicadorAbastecimentoEstoque",
      ],
      S = async (te) => {
        try {
          let be = await (await fetch(`${lo}?action=dados&fonte=${te}`)).json();
          if (!be.ok) throw new Error(be.erro || `Erro ao carregar ${te}`);
          let pe = be.dados || [];
          return (
            te === "estoque" && (pe = bg(pe)),
            bn(te, pe),
            c(($) => ({ ...$, [te]: pe })),
            f(($) => ({ ...$, [te]: be.atualizadoEm || "" })),
            { fonte: te, ok: true, dados: pe, atualizadoEm: be.atualizadoEm || "" }
          );
        } catch (re) {
          return { fonte: te, ok: false, dados: [], erro: re.message, atualizadoEm: "" };
        }
      };
    try {
      let te = await Promise.all(W.map(S)),
        re = {},
        be = {};
      (te.forEach(($) => {
        ((re[$.fonte] = $.dados || []), (be[$.fonte] = $.atualizadoEm || ""));
      }),
        c(($) => ({ ...$, ...re })),
        f(($) => ({ ...$, ...be })));
      let pe = te.filter(($) => !$.ok).map(($) => `${$.fonte}: ${$.erro}`);
      (h(pe), w(/* @__PURE__ */ new Date().toLocaleString("pt-BR")));
    } finally {
      (v(false), u(true));
    }
  }, []);
  (0, o.useEffect)(() => tn(I), [I]);
  function V(W) {
    let S = String(g[W] || "").trim();
    if (!S) return "";
    let te = S.match(/\b\d{2}:\d{2}(?::\d{2})?\b/);
    return te ? te[0] : S;
  }
  let D = (0, o.useMemo)(() => {
      let W = p.equipatech || [],
        S = p.bbbaterias || [],
        te = p.producao || [],
        re = p.analiseTransformacoes || [],
        be = p.estoque || [],
        pe = p.consultaPecas || [],
        $ = p.ajusteSaldo || [],
        ee = p.ajusteSaldoBBBaterias || [],
        se = p.pedidoVenda1020 || [],
        Ae = p.indicadorFaturamentoMensal || [],
        Ne = p.indicadorExpedicaoMensal || [],
        Ce = p.indicadorAbastecimentoEstoque || [],
        Ie = (ue) =>
          new Set(ue.map((Pe) => String(Pe.pedido || "").trim()).filter((Pe) => Pe !== "" && Pe !== "0")).size,
        Be = te.filter((ue) => Te(ue.status) === "produzir"),
        Ve = re.filter((ue) => ue.precisaTransformar === true && ue.temOpcaoTransformacao === true).length,
        lt = be.filter((ue) => {
          let Pe = Te(ue.status);
          return !Pe.includes("conclu") && !Pe.includes("entregue");
        }),
        G = pe.filter((ue) => ue.aguardandoResposta === true || Te(ue.dataResposta) === ""),
        me = [...$, ...ee].filter((ue) => {
          let Pe = Te(ue.status);
          return Pe.includes("pendente") || Pe.includes("verificando saldo");
        }),
        je = se.filter((ue) => {
          let Pe = Te(ue.status);
          return Pe.includes("comprar") && !Pe.includes("nao comprar") && !Pe.includes("não comprar");
        }),
        Ye = Ae.filter((ue) => String(ue.unidadesMedia || "").trim() !== "")
          .map((ue) => ({ mes: ue.mes || "", media: ue.unidadesMedia || "", mediaNumero: Je(ue.unidadesMedia) }))
          .filter((ue) => ue.mediaNumero !== null),
        Se = Ae.filter((ue) => String(ue.pedidosMediaCD || "").trim() !== "")
          .map((ue) => ({ mes: ue.mes || "", media: ue.pedidosMediaCD || "", mediaNumero: Je(ue.pedidosMediaCD) }))
          .filter((ue) => ue.mediaNumero !== null),
        De = Ne.filter((ue) => String(ue.pedidosGeral || "").trim() !== "")
          .map((ue) => ({ mes: ue.mes || "", media: ue.pedidosGeral || "", mediaNumero: Je(ue.pedidosGeral) }))
          .filter((ue) => ue.mediaNumero !== null),
        xe = Ye[Ye.length - 1] || null,
        ke = Se[Se.length - 1] || null,
        we = De[De.length - 1] || null,
        Qe = Ce.map((ue) => {
          let Pe = Je(ue.percentual),
            dt = wa(ue.meta),
            Tt = wa(ue.realizado),
            _e = Pe !== null ? Pe : dt > 0 ? (Tt / dt) * 100 : null;
          return {
            data: ue.data || "",
            meta: ue.meta || "",
            realizado: ue.realizado || "",
            percentualNumero: _e,
            percentual: _e === null ? "" : `${_e.toFixed(2).replace(".", ",")}%`,
            metaComparacao: 95,
          };
        }).filter((ue) => ue.percentualNumero !== null),
        Xe = Qe[Qe.length - 1] || null;
      return {
        pedidosBB: Ie(S),
        pedidosEQ: Ie(W),
        produzir: Ie(Be),
        produzirSkus: Be.length,
        modelosParaTransformar: Ve,
        estoquePendente: Ie(lt),
        estoqueSkusPendentes: lt.length,
        consultaAguardando: G.length,
        consultaAguardando1h: G.filter((ue) => ue.aguardandoMaisDe1h).length,
        ajustePendente: me.length,
        pedidoVendaComprar: Ie(je),
        pedidoVendaComprarSkus: je.length,
        totalFaturamento: Ie(S) + Ie(W),
        mediaMensalFaturamento: xe ? xe.media : "—",
        mediaMensalFaturamentoMes: xe ? xe.mes : "Sem dados",
        mediaMensalCds: ke ? ke.media : "—",
        mediaMensalCdsMes: ke ? ke.mes : "Sem dados",
        mediaMensalExpedicao: we ? we.media : "—",
        mediaMensalExpedicaoMes: we ? we.mes : "Sem dados",
        abastecimentoEstoquePercentual: Xe ? Xe.percentual : "—",
        abastecimentoEstoqueData: Xe ? Xe.data : "Sem dados",
        abastecimentoEstoqueMeta: Xe ? Xe.metaComparacao : 100,
      };
    }, [p]),
    O = !d && i ? i : D;
  (0, o.useEffect)(() => {
    d && (l(D), _y({ resumo: D, atualizacoesDashboard: g, atualizadoEm: x, salvoEm: Date.now() }));
  }, [d, D, g, x]);
  function H(W, S) {
    let te = Je(W);
    return te === null ? "#64748B" : te >= S ? "#16A34A" : te >= S - 2 ? "#F59E0B" : "#DC2626";
  }
  let M = [
      {
        titulo: "Faturamento BBBaterias",
        valor: O.pedidosBB,
        detalhe: "Total de pedidos da BBBaterias",
        cor: "#2563EB",
        icon: "bb",
        tela: "faturamento",
        horario: V("bbbaterias"),
      },
      {
        titulo: "Faturamento Equipatech",
        valor: O.pedidosEQ,
        detalhe: "Total de pedidos da Equipatech",
        cor: "#0F766E",
        icon: "eq",
        tela: "faturamento",
        horario: V("equipatech"),
      },
      {
        titulo: "Total Faturamento",
        valor: O.totalFaturamento,
        detalhe: "BB + EQ no faturamento",
        cor: "#475569",
        icon: "total",
        tela: "faturamento",
        horario: "",
      },
      {
        titulo: "Para Produzir",
        valor: O.produzir,
        detalhe: `${O.produzirSkus} SKU(s) com status Produzir`,
        cor: "#7C3AED",
        icon: "producao",
        tela: "producao",
        horario: V("producao"),
      },
      {
        titulo: "Análise de Transformação",
        valor: O.modelosParaTransformar ?? 0,
        detalhe: "Modelos com falta e opção disponível",
        cor: "#0891B2",
        icon: "transformacao",
        tela: "analiseTransformacoes",
        horario: V("analiseTransformacoes"),
      },
      {
        titulo: "Estoque Pendente",
        valor: O.estoquePendente,
        detalhe: `${O.estoqueSkusPendentes} SKU(s) ainda pendentes`,
        cor: "#EA580C",
        icon: "estoque",
        tela: "estoque",
        horario: V("estoque"),
      },
      {
        titulo: "Consulta de Peças",
        valor: O.consultaAguardando,
        detalhe: `${O.consultaAguardando1h} aguardando há mais de 1h`,
        cor: "#DC2626",
        icon: "consulta",
        tela: "consultaPecas",
        horario: V("consultaPecas"),
      },
      {
        titulo: "Ajuste de Saldo",
        valor: O.ajustePendente,
        detalhe: "Pendentes ou verificando saldo",
        cor: "#64748B",
        icon: "ajuste",
        tela: "ajusteSaldo",
        horario: V("ajusteSaldo") || V("ajusteSaldoBBBaterias"),
      },
      {
        titulo: "Pedido de Venda",
        valor: O.pedidoVendaComprar,
        detalhe: `${O.pedidoVendaComprarSkus} SKU(s) com status Comprar`,
        cor: "#16A34A",
        icon: "pedidoVenda",
        tela: "pedidoVenda",
        horario: V("pedidoVenda1020"),
      },
      ...(() => {
        let W = y.dados,
          S = !!W,
          te = ($) =>
            y.erro && !S
              ? "Via Leitor indisponível"
              : S
                ? `${$.atrasados} atrasado(s) · ${$.total - $.atrasados} no prazo`
                : "Carregando...",
          re = S ? W.bb : null,
          be = S ? W.eq : null,
          pe = S ? { total: re.total + be.total, atrasados: re.atrasados + be.atrasados } : null;
        return [
          {
            titulo: "Total a Expedir (Via Leitor)",
            valor: S ? pe.total : "—",
            detalhe: te(pe),
            cor: "#475569",
            icon: "expedicao",
            tela: "viaLeitor",
            horario: y.hora,
          },
          {
            titulo: "Expedição BBBaterias",
            valor: S ? re.total : "—",
            detalhe: te(re),
            cor: "#4F46E5",
            icon: "bb",
            tela: "viaLeitor",
            horario: y.hora,
          },
          {
            titulo: "Expedição Equipatech",
            valor: S ? be.total : "—",
            detalhe: te(be),
            cor: "#0D9488",
            icon: "eq",
            tela: "viaLeitor",
            horario: y.hora,
          },
        ];
      })(),
      ...(() => {
        let W = C.dados,
          S = !!W;
        return [
          {
            titulo: "Sem estoque Filiais",
            valor: S ? W.pedidos : "—",
            detalhe:
              C.erro && !S
                ? "Sem estoque indisponível"
                : S
                  ? W.pedidos === 0
                    ? "Nenhum pedido bloqueado"
                    : `${W.mais72} há mais de 72h · ${W.itens} item(ns)`
                  : "Carregando...",
            cor: S && W.mais72 > 0 ? "#DC2626" : "#D97706",
            icon: "semEstoque",
            tela: "semEstoque",
            horario: C.hora,
          },
        ];
      })(),
      ...(() => {
        let W = ntC.dados,
          S = !!W;
        return [
          {
            titulo: "NFe trancadas",
            valor: S ? W.total : "—",
            detalhe:
              ntC.erro && !S
                ? "NFe trancadas indisponível"
                : S
                  ? W.total === 0
                    ? "Nenhuma NF trancada"
                    : `${W.naoAut} não autorizada(s) · ${W.naoTrans} não transmitida(s)`
                  : "Carregando...",
            cor: S ? (W.total === 0 ? "#16A34A" : "#DC2626") : "#64748B",
            icon: "nfeTrancada",
            tela: "nfeTrancadas",
            horario: ntC.hora,
          },
        ];
      })(),
    ],
    Q = (() => {
      let W = k.dados,
        S = !!W,
        te = (pe) => (k.erro && !S ? "Cancelamentos indisponível" : S ? pe(W) : "Carregando..."),
        re = (pe) => (S ? pe : "—"),
        be = (pe, $) => `${pe} NF(s) pendente(s) · ${$} atrasada(s)`;
      return [
        {
          titulo: "Aguard. Cancelamento",
          valor: re(W && W.ag),
          detalhe: te((pe) => be(pe.ag, pe.agAtr)),
          cor: "#EA580C",
          icon: "cancelamento",
          tela: "cancelamentos",
          horario: k.hora,
        },
        {
          titulo: "Aguardando CNT",
          valor: re(W && W.cnt),
          detalhe: te((pe) => be(pe.cnt, pe.cntAtr)),
          cor: "#2563EB",
          icon: "cancelamento",
          tela: "cancelamentos",
          horario: k.hora,
        },
      ];
    })(),
    Y = [
      {
        titulo: "Média Mensal Faturamento",
        valor: O.mediaMensalFaturamento,
        detalhe: `Meta 97% · ${O.mediaMensalFaturamentoMes}`,
        cor: H(O.mediaMensalFaturamento, 97),
        icon: "indicadorMensal",
        tela: "indicadorFaturamentoMensal",
        horario: V("indicadorFaturamentoMensal"),
      },
      {
        titulo: "Média Mensal CDs",
        valor: O.mediaMensalCds,
        detalhe: `Meta 97% · ${O.mediaMensalCdsMes}`,
        cor: H(O.mediaMensalCds, 97),
        icon: "cds",
        tela: "indicadorFaturamentoMensal",
        horario: V("indicadorFaturamentoMensal"),
      },
      {
        titulo: "Média Mensal Expedição",
        valor: O.mediaMensalExpedicao,
        detalhe: `Meta 99% · ${O.mediaMensalExpedicaoMes}`,
        cor: H(O.mediaMensalExpedicao, 99),
        icon: "expedicao",
        tela: "indicadorExpedicaoMensal",
        horario: V("indicadorExpedicaoMensal"),
      },
      {
        titulo: "Abastecimento Estoque",
        valor: O.abastecimentoEstoquePercentual,
        detalhe: `Meta 95% · ${O.abastecimentoEstoqueData}`,
        cor: H(O.abastecimentoEstoquePercentual, O.abastecimentoEstoqueMeta),
        icon: "abastecimento",
        tela: null,
        horario: V("indicadorAbastecimentoEstoque"),
      },
    ];
  function de({ tipo: W }) {
    let S = {
      width: 34,
      height: 34,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ariaHidden: true,
    };
    return W === "nfeTrancada"
      ? o.default.createElement(
          "svg",
          { ...S },
          o.default.createElement("path", { d: "M12 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v3" }),
          o.default.createElement("path", { d: "M14 3v5h5" }),
          o.default.createElement("rect", { x: 13, y: 15, width: 8, height: 6, rx: 1.2 }),
          o.default.createElement("path", { d: "M15 15v-1.5a2 2 0 0 1 4 0V15" }),
        )
      : W === "bb"
        ? o.default.createElement(
            "svg",
            { ...S },
            o.default.createElement("path", { d: "M4 7h16" }),
            o.default.createElement("path", { d: "M5 7l1.2 12h11.6L19 7" }),
            o.default.createElement("path", { d: "M9 7V5a3 3 0 0 1 6 0v2" }),
            o.default.createElement("path", { d: "M9 12h6" }),
          )
        : W === "eq"
          ? o.default.createElement(
              "svg",
              { ...S },
              o.default.createElement("path", { d: "M4 6h16v12H4z" }),
              o.default.createElement("path", { d: "M7 9h10" }),
              o.default.createElement("path", { d: "M7 13h6" }),
              o.default.createElement("path", { d: "M17 17l3 3" }),
            )
          : W === "total"
            ? o.default.createElement(
                "svg",
                { ...S },
                o.default.createElement("path", { d: "M4 19V5" }),
                o.default.createElement("path", { d: "M4 19h16" }),
                o.default.createElement("path", { d: "M8 16v-5" }),
                o.default.createElement("path", { d: "M12 16V8" }),
                o.default.createElement("path", { d: "M16 16v-3" }),
              )
            : W === "producao"
              ? o.default.createElement(
                  "svg",
                  { ...S },
                  o.default.createElement("path", { d: "M3 21h18" }),
                  o.default.createElement("path", { d: "M5 21V10l5 3V9l5 4V7h4v14" }),
                  o.default.createElement("path", { d: "M8 17h1" }),
                  o.default.createElement("path", { d: "M12 17h1" }),
                  o.default.createElement("path", { d: "M16 17h1" }),
                )
              : W === "transformacao"
                ? o.default.createElement(
                    "svg",
                    { ...S },
                    o.default.createElement("path", { d: "M7 7h10" }),
                    o.default.createElement("path", { d: "M14 4l3 3-3 3" }),
                    o.default.createElement("path", { d: "M17 17H7" }),
                    o.default.createElement("path", { d: "M10 14l-3 3 3 3" }),
                  )
                : W === "estoque"
                  ? o.default.createElement(
                      "svg",
                      { ...S },
                      o.default.createElement("path", { d: "M21 8l-9-5-9 5 9 5 9-5z" }),
                      o.default.createElement("path", { d: "M3 8v8l9 5 9-5V8" }),
                      o.default.createElement("path", { d: "M12 13v8" }),
                    )
                  : W === "consulta"
                    ? o.default.createElement(
                        "svg",
                        { ...S },
                        o.default.createElement("path", { d: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" }),
                        o.default.createElement("path", { d: "M15 15l5 5" }),
                        o.default.createElement("path", { d: "M13 13l2 2" }),
                        o.default.createElement("path", { d: "M4 20h7" }),
                        o.default.createElement("path", { d: "M4 16h5" }),
                      )
                    : W === "ajuste"
                      ? o.default.createElement(
                          "svg",
                          { ...S },
                          o.default.createElement("path", { d: "M12 3v18" }),
                          o.default.createElement("path", { d: "M5 7h14" }),
                          o.default.createElement("path", { d: "M6 7l-3 6h6L6 7z" }),
                          o.default.createElement("path", { d: "M18 7l-3 6h6l-3-6z" }),
                          o.default.createElement("path", { d: "M9 21h6" }),
                        )
                      : W === "indicadorMensal"
                        ? o.default.createElement(
                            "svg",
                            { ...S },
                            o.default.createElement("path", { d: "M4 19h16" }),
                            o.default.createElement("path", { d: "M4 5v14" }),
                            o.default.createElement("path", { d: "M8 15l3-4 3 2 4-6" }),
                            o.default.createElement("path", { d: "M17 7h1v1" }),
                          )
                        : W === "cds"
                          ? o.default.createElement(
                              "svg",
                              { ...S },
                              o.default.createElement("path", { d: "M4 20h16" }),
                              o.default.createElement("path", { d: "M6 20V8h5v12" }),
                              o.default.createElement("path", { d: "M13 20V4h5v16" }),
                              o.default.createElement("path", { d: "M8 11h1" }),
                              o.default.createElement("path", { d: "M15 7h1" }),
                            )
                          : W === "expedicao"
                            ? o.default.createElement(
                                "svg",
                                { ...S },
                                o.default.createElement("path", { d: "M3 7h11v9H3z" }),
                                o.default.createElement("path", { d: "M14 10h4l3 3v3h-7" }),
                                o.default.createElement("path", { d: "M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" }),
                                o.default.createElement("path", { d: "M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" }),
                              )
                            : W === "semEstoque"
                              ? o.default.createElement(
                                  "svg",
                                  { ...S },
                                  o.default.createElement("path", { d: "M21 8l-9-5-9 5 9 5 9-5z" }),
                                  o.default.createElement("path", { d: "M3 8v8l9 5 9-5V8" }),
                                  o.default.createElement("path", { d: "M9 10l6 6" }),
                                  o.default.createElement("path", { d: "M15 10l-6 6" }),
                                )
                              : W === "cancelamento"
                                ? o.default.createElement(
                                    "svg",
                                    { ...S },
                                    o.default.createElement("path", { d: "M6 3h9l4 4v14H6z" }),
                                    o.default.createElement("path", { d: "M14 3v5h5" }),
                                    o.default.createElement("path", { d: "M9.5 12.5l5 5" }),
                                    o.default.createElement("path", { d: "M14.5 12.5l-5 5" }),
                                  )
                                : W === "abastecimento"
                                  ? o.default.createElement(
                                      "svg",
                                      { ...S },
                                      o.default.createElement("path", { d: "M4 19h16" }),
                                      o.default.createElement("path", { d: "M5 16l4-4 3 3 6-8" }),
                                      o.default.createElement("path", { d: "M16 7h2v2" }),
                                      o.default.createElement("path", { d: "M6 5h5" }),
                                      o.default.createElement("path", { d: "M6 9h3" }),
                                    )
                                  : o.default.createElement(
                                      "svg",
                                      { ...S },
                                      o.default.createElement("path", { d: "M6 3h12v18H6z" }),
                                      o.default.createElement("path", { d: "M9 7h6" }),
                                      o.default.createElement("path", { d: "M9 11h6" }),
                                      o.default.createElement("path", { d: "M9 15h4" }),
                                      o.default.createElement("path", { d: "M17 19l3 2" }),
                                    );
  }
  function ce({ item: W }) {
    return o.default.createElement(
      "button",
      {
        type: "button",
        onClick: () => W.tela && e(W.tela),
        style: {
          border: "none",
          background: W.cor,
          color: "#FFFFFF",
          borderRadius: 9,
          minHeight: 116,
          padding: 0,
          overflow: "hidden",
          boxShadow: "0 8px 18px rgba(15,23,42,0.14)",
          cursor: W.tela ? "pointer" : "default",
          textAlign: "left",
          fontFamily: s.font,
        },
      },
      o.default.createElement(
        "div",
        {
          style: {
            padding: "11px 16px",
            borderBottom: "1px solid rgba(0,0,0,0.10)",
            fontSize: 14,
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          },
        },
        o.default.createElement("span", { style: { overflow: "hidden", textOverflow: "ellipsis" } }, W.titulo),
        W.horario &&
          o.default.createElement(
            "span",
            {
              style: {
                flexShrink: 0,
                fontSize: 11,
                fontWeight: 500,
                opacity: 0.9,
                background: "rgba(255,255,255,0.16)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 999,
                padding: "3px 8px",
              },
            },
            W.horario,
          ),
      ),
      o.default.createElement(
        "div",
        {
          style: {
            minHeight: 76,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            padding: "12px 16px",
            textAlign: "center",
          },
        },
        o.default.createElement(
          "div",
          {
            style: {
              width: 56,
              height: 56,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.18)",
              color: "#FFFFFF",
              fontSize: 25,
              lineHeight: 1,
              flexShrink: 0,
            },
          },
          o.default.createElement(de, { tipo: W.icon }),
        ),
        o.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 0,
            },
          },
          o.default.createElement(
            "div",
            { style: { fontSize: 31, lineHeight: 1, fontWeight: 650, letterSpacing: "-0.04em", marginBottom: 8 } },
            W.valor,
          ),
          o.default.createElement(
            "div",
            {
              style: {
                fontSize: 11,
                lineHeight: 1.3,
                fontWeight: 500,
                opacity: 0.95,
                background: "rgba(0,0,0,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                padding: "6px 10px",
                maxWidth: "100%",
              },
            },
            W.detalhe,
          ),
        ),
      ),
    );
  }
  return o.default.createElement(
    o.default.Fragment,
    null,
    o.default.createElement(
      "section",
      {
        style: {
          borderRadius: s.radius.xl,
          overflow: "hidden",
          background: s.bgCard,
          border: `1px solid ${s.bdLight}`,
          boxShadow: s.shadowCard,
        },
      },
      o.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "16px 20px",
            borderBottom: `1px solid ${s.bdLight}`,
            fontFamily: s.font,
          },
        },
        o.default.createElement(
          "div",
          null,
          o.default.createElement(
            "div",
            { style: { fontSize: 18, fontWeight: 700, color: s.txtPri, letterSpacing: "-0.02em" } },
            "Dashboard operacional",
          ),
          o.default.createElement(
            "div",
            { style: { fontSize: 12, color: s.txtMuted, marginTop: 2 } },
            "Faturamento, expedição, estoque, produção e indicadores em um só lugar",
          ),
        ),
        o.default.createElement(
          "button",
          {
            type: "button",
            onClick: () => {
              (I(), q(), A(), E());
            },
            disabled: F,
            title: "Atualizar dashboard",
            style: {
              height: 36,
              padding: "0 14px",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: s.radius.md,
              border: `1px solid ${s.bdMid}`,
              background: s.bgCard,
              color: s.txtSec,
              fontFamily: s.font,
              fontSize: 12,
              fontWeight: 600,
              cursor: F ? "not-allowed" : "pointer",
              opacity: F ? 0.6 : 1,
              boxShadow: s.shadowSm,
            },
          },
          o.default.createElement("span", { style: { fontSize: 15, lineHeight: 1 } }, "↻"),
          F ? "Atualizando…" : "Atualizar",
        ),
      ),
      o.default.createElement(
        "div",
        { style: { padding: 18 } },
        o.default.createElement(
          "div",
          { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 } },
          o.default.createElement(
            "div",
            {
              style: {
                fontSize: 12,
                fontWeight: 700,
                color: s.txtSec,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontFamily: s.font,
              },
            },
            "Núcleo Operacional",
          ),
          o.default.createElement("div", { style: { height: 1, flex: 1, marginLeft: 14, background: s.bdLight } }),
        ),
        o.default.createElement(
          "div",
          { style: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16 } },
          M.map((W) => o.default.createElement(ce, { key: W.titulo, item: W })),
        ),
        o.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 24,
              marginBottom: 10,
            },
          },
          o.default.createElement(
            "div",
            {
              style: {
                fontSize: 12,
                fontWeight: 700,
                color: s.txtSec,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontFamily: s.font,
              },
            },
            "Núcleo de Cancelamentos",
          ),
          o.default.createElement("div", { style: { height: 1, flex: 1, marginLeft: 14, background: s.bdLight } }),
        ),
        o.default.createElement(
          "div",
          { style: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16 } },
          Q.map((W) => o.default.createElement(ce, { key: W.titulo, item: W })),
        ),
        o.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 24,
              marginBottom: 10,
            },
          },
          o.default.createElement(
            "div",
            {
              style: {
                fontSize: 12,
                fontWeight: 700,
                color: s.txtSec,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontFamily: s.font,
              },
            },
            "Núcleo de Indicadores",
          ),
          o.default.createElement("div", { style: { height: 1, flex: 1, marginLeft: 14, background: s.bdLight } }),
        ),
        o.default.createElement(
          "div",
          { style: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16 } },
          Y.map((W) => o.default.createElement(ce, { key: W.titulo, item: W })),
        ),
      ),
    ),
    o.default.createElement(
      "div",
      {
        style: {
          marginTop: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          color: s.txtMuted,
          fontSize: 11,
          fontWeight: 700,
          fontFamily: s.font,
        },
      },
      o.default.createElement("span", null, "Última atualização do dashboard: ", x || "carregando..."),
      F && o.default.createElement("span", null, "Atualizando dados..."),
    ),
    m.length > 0 &&
      o.default.createElement(
        "div",
        {
          style: {
            marginTop: 12,
            border: `1px solid ${s.orangeBd}`,
            background: s.orangeBg,
            color: "var(--orange-tx)",
            borderRadius: 12,
            padding: 12,
            fontSize: 12,
            fontWeight: 750,
          },
        },
        "Algumas fontes não carregaram: ",
        m.join(" | "),
      ),
  );
}
var gi = 200,
  Cg =
    "linha_id,nf,filial,pedido,cliente_codigo,cliente_nome,chave_nfe,rastreios,transportadora,transportadora_canon,data_faturamento,data_limite,postado_em,bipador,embalador,volume,romaneio,romaneio_status,coleta_em,retirada_em,situacao,status_texto",
  z0 = { status: "", filial: "", transp: "", rom: "", busca: "" };
function kc() {
  return { apikey: x0, Authorization: `Bearer ${x0}` };
}
async function Dt(e) {
  let t = await fetch(`${Ac}/rest/v1/${e}`, { headers: kc(), cache: "no-store" });
  if (!t.ok) {
    let n = "";
    try {
      let i = await t.json();
      n = [i.code, i.message, i.hint, i.details].filter(Boolean).join(" — ");
    } catch {}
    let a = String(e).split("?")[0],
      r = "";
    throw (
      t.status === 404 && /^v_via_/.test(a)
        ? (r = " Dica: rode o SQL bloco_11_via_leitor.sql no Supabase (ele já faz o reload do schema).")
        : t.status === 404 &&
          (r = " Dica: rode no Supabase  notify pgrst, 'reload schema';  e confira o SQL fase_c_14 (blocos 1 a 5)."),
      (t.status === 401 || t.status === 403) && (r = " Dica: faltam permissões (rode o bloco 5 do SQL fase_c_14)."),
      new Error(`Falha ao consultar "${a}" — HTTP ${t.status}: ${n || "sem detalhe"}.${r}`)
    );
  }
  return t.json();
}
function lr() {
  return typeof document > "u" || !document.hidden;
}
async function ya(e) {
  let t = await fetch(`${Ac}/rest/v1/${e}${e.includes("?") ? "&" : "?"}limit=1`, {
    headers: { ...kc(), Prefer: "count=exact" },
    cache: "no-store",
  });
  if (!t.ok) throw new Error(`HTTP ${t.status}`);
  let n = (t.headers.get("content-range") || "").split("/")[1] || "",
    a = await t.json();
  return `${n}|${Array.isArray(a) && a[0] ? JSON.stringify(a[0]) : ""}`;
}
function wi(e) {
  let t = String(e ?? "").trim();
  if (!t) return null;
  let n = t.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?)?\s*(Z|[+-]\d{2}(?::?\d{2})?)?$/,
  );
  if (!n) return null;
  let [, a, r, i, l, d, u, p] = n;
  if (l === void 0) return { data: `${i}/${r}/${a}`, hora: "" };
  let c = u || "00";
  if (!p) return { data: `${i}/${r}/${a}`, hora: `${l}:${d}:${c}` };
  let g = "Z";
  if (p !== "Z") {
    let w = p.replace(":", "");
    g = `${w.slice(0, 3)}:${w.length > 3 ? w.slice(3, 5) : "00"}`;
  }
  let f = /* @__PURE__ */ new Date(`${a}-${r}-${i}T${l}:${d}:${c}${g}`);
  if (Number.isNaN(f.getTime())) return { data: `${i}/${r}/${a}`, hora: `${l}:${d}:${c}` };
  let x = {};
  return (
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(f)
      .forEach((w) => {
        x[w.type] = w.value;
      }),
    { data: `${x.day}/${x.month}/${x.year}`, hora: `${x.hour}:${x.minute}:${x.second}` }
  );
}
function ur(e) {
  let t = wi(e);
  return t ? t.data : "—";
}
function pr(e) {
  let t = wi(e);
  return t && t.hora ? t.hora : "—";
}
function wg(e) {
  let t = wi(e);
  return t ? (t.hora ? `${t.data} ${t.hora}` : t.data) : "—";
}
function Jt(e) {
  return String(e ?? "").replace(
    /[&<>"']/g,
    (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[t],
  );
}
function nl(e) {
  let t = String(e || "").replace(/\D/g, "");
  return t ? t.padStart(9, "0") : "—";
}
var Ny = (() => {
  let e = new Uint32Array(256);
  for (let t = 0; t < 256; t += 1) {
    let n = t;
    for (let a = 0; a < 8; a += 1) n = n & 1 ? 3988292384 ^ (n >>> 1) : n >>> 1;
    e[t] = n >>> 0;
  }
  return e;
})();
function Dy(e) {
  let t = 4294967295;
  for (let n = 0; n < e.length; n += 1) t = Ny[(t ^ e[n]) & 255] ^ (t >>> 8);
  return (t ^ 4294967295) >>> 0;
}
function Ty(e) {
  let t = new TextEncoder(),
    n = [],
    a = [],
    r = 0,
    i = /* @__PURE__ */ new Date(),
    l = i.getHours() * 2048 + i.getMinutes() * 32 + Math.floor(i.getSeconds() / 2),
    d = (i.getFullYear() - 1980) * 512 + (i.getMonth() + 1) * 32 + i.getDate();
  e.forEach(([c, g]) => {
    let f = t.encode(c),
      x = t.encode(g),
      w = Dy(x),
      F = new DataView(new ArrayBuffer(30));
    (F.setUint32(0, 67324752, true),
      F.setUint16(4, 20, true),
      F.setUint16(6, 2048, true),
      F.setUint16(8, 0, true),
      F.setUint16(10, l, true),
      F.setUint16(12, d, true),
      F.setUint32(14, w, true),
      F.setUint32(18, x.length, true),
      F.setUint32(22, x.length, true),
      F.setUint16(26, f.length, true),
      F.setUint16(28, 0, true),
      n.push(new Uint8Array(F.buffer), f, x));
    let v = new DataView(new ArrayBuffer(46));
    (v.setUint32(0, 33639248, true),
      v.setUint16(4, 20, true),
      v.setUint16(6, 20, true),
      v.setUint16(8, 2048, true),
      v.setUint16(10, 0, true),
      v.setUint16(12, l, true),
      v.setUint16(14, d, true),
      v.setUint32(16, w, true),
      v.setUint32(20, x.length, true),
      v.setUint32(24, x.length, true),
      v.setUint16(28, f.length, true),
      v.setUint16(30, 0, true),
      v.setUint16(32, 0, true),
      v.setUint16(34, 0, true),
      v.setUint16(36, 0, true),
      v.setUint32(38, 0, true),
      v.setUint32(42, r, true),
      a.push(new Uint8Array(v.buffer), f),
      (r += 30 + f.length + x.length));
  });
  let u = a.reduce((c, g) => c + g.length, 0),
    p = new DataView(new ArrayBuffer(22));
  return (
    p.setUint32(0, 101010256, true),
    p.setUint16(4, 0, true),
    p.setUint16(6, 0, true),
    p.setUint16(8, e.length, true),
    p.setUint16(10, e.length, true),
    p.setUint32(12, u, true),
    p.setUint32(16, r, true),
    p.setUint16(20, 0, true),
    new Blob([...n, ...a, new Uint8Array(p.buffer)], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })
  );
}
function zy(e) {
  let t = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;
  return String(e ?? "")
    .replace(t, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function I0(e) {
  let t = "",
    n = e + 1;
  for (; n > 0;) {
    let a = (n - 1) % 26;
    ((t = String.fromCharCode(65 + a) + t), (n = Math.floor((n - 1) / 26)));
  }
  return t;
}
function Iy(e, t, n, a) {
  let r = (c, g, f, x) => {
      let w = I0(g) + f;
      return n.has(g) && typeof c == "number" && Number.isFinite(c)
        ? `<c r="${w}"><v>${c}</v></c>`
        : `<c r="${w}" t="inlineStr"${x ? ` s="${x}"` : ""}><is><t xml:space="preserve">${zy(c)}</t></is></c>`;
    },
    i = `<row r="1">${e.map((c, g) => r(c, g, 1, 1)).join("")}</row>`;
  t.forEach((c, g) => {
    i += `<row r="${g + 2}">${c.map((f, x) => r(f, x, g + 2, 0)).join("")}</row>`;
  });
  let l = I0(e.length - 1) + (t.length + 1),
    d =
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="15"/><cols>' +
      a.map((c, g) => `<col min="${g + 1}" max="${g + 1}" width="${c}" customWidth="1"/>`).join("") +
      `</cols><sheetData>${i}</sheetData><autoFilter ref="A1:${l}"/></worksheet>`,
    u = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    p = [
      [
        "[Content_Types].xml",
        `${u}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`,
      ],
      [
        "_rels/.rels",
        `${u}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
      ],
      [
        "xl/workbook.xml",
        `${u}<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Coletas" sheetId="1" r:id="rId1"/></sheets></workbook>`,
      ],
      [
        "xl/_rels/workbook.xml.rels",
        `${u}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
      ],
      [
        "xl/styles.xml",
        `${u}<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF146C43"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`,
      ],
      ["xl/worksheets/sheet1.xml", d],
    ];
  return Ty(p);
}
function My(e, t) {
  let n = URL.createObjectURL(e),
    a = document.createElement("a");
  ((a.href = n),
    (a.download = t),
    (a.rel = "noopener"),
    (a.style.display = "none"),
    document.body.appendChild(a),
    a.click(),
    setTimeout(() => {
      try {
        a.remove();
      } catch {}
      try {
        URL.revokeObjectURL(n);
      } catch {}
    }, 6e4));
}
function $y(e) {
  return String(e ?? "")
    .replace(/\D/g, "")
    .replace(/^0+/, "");
}
function Zs(e) {
  let t = new Date(e).getTime();
  return Number.isFinite(t) ? t : NaN;
}
async function Oy(e) {
  let [t, n, a] = e.split("-").map(Number),
    r = new Date(Date.UTC(t, n - 1, a - 1, 0, 0, 0)).toISOString(),
    i = new Date(Date.UTC(t, n - 1, a + 2, 0, 0, 0)).toISOString(),
    l = [];
  for (let v = 0; v < 1e5; v += 1e3) {
    let m = await Dt(
      `v_coletas_painel?select=*&coleta_em=gte.${encodeURIComponent(r)}&coleta_em=lt.${encodeURIComponent(i)}&order=coleta_em.asc,postagem_id.asc&limit=1000&offset=${v}`,
    );
    if (!Array.isArray(m)) throw new Error("Resposta inesperada do Supabase ao consultar as coletas.");
    if ((l.push(...m), m.length < 1e3)) break;
  }
  let d = `${String(a).padStart(2, "0")}/${String(n).padStart(2, "0")}/${t}`,
    u = l.filter((v) => {
      let m = wi(v.coleta_em);
      return m && m.data === d;
    });
  if (!u.length) return { vazio: true, dataBr: d, total: 0 };
  let p = (v) => `${v.grupo_romaneio}|${Zs(v.coleta_em)}`,
    c = /* @__PURE__ */ new Map();
  u.forEach((v) => {
    let m = Zs(v.bipada_em || v.criado_em);
    if (Number.isNaN(m)) return;
    let h = p(v);
    (!c.has(h) || m > c.get(h)) && c.set(h, m);
  });
  let g = /* @__PURE__ */ new Map();
  [...u]
    .sort((v, m) => Zs(v.coleta_em) - Zs(m.coleta_em) || String(v.nf).localeCompare(String(m.nf)))
    .forEach((v) => {
      let m = /^\d{4}$/.test(String(v.filial_xml || "").trim()),
        h = /^\d{4}$/.test(String(v.filial_postagem || "").trim()),
        y = m ? String(v.filial_xml).trim() : h ? String(v.filial_postagem).trim() : "",
        B = String(v.chave_nfe || "").replace(/\D/g, ""),
        k = $y(v.nf),
        L = B.length >= 40 ? B : `${y || "?"}|${k}`;
      g.has(L) ||
        g.set(L, {
          p: v,
          filial: y,
          nf: k,
          coleta: v.coleta_em,
          fim: c.get(p(v)),
          embs: /* @__PURE__ */ new Set(),
          vols: 0,
        });
      let C = g.get(L);
      C.vols += Math.max(1, parseInt(v.volume, 10) || 1);
      let _ = String(v.embalador || "").trim();
      _ && C.embs.add(_);
    });
  let f = (v, m) =>
      v === "1020"
        ? "BBBATERIAS"
        : v === "0101" || v === "0102"
          ? "EQUIPATECH"
          : String(m.empresa || "")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/\s+/g, "")
              .toUpperCase(),
    x = [
      "Data",
      "Nota Fiscal",
      "Horário de Finalização",
      "Horário da Coleta",
      "Embalador",
      "Transporte",
      "Filial",
      "Código da Filial",
      "Volume",
    ],
    w = [...g.values()].map((v) => {
      let m = Number(v.nf),
        h = Number.isFinite(v.fim) ? pr(new Date(v.fim).toISOString()) : "";
      return [
        ur(v.coleta),
        Number.isFinite(m) && m > 0 ? m : "",
        h === "—" ? "" : h,
        pr(v.coleta) === "—" ? "" : pr(v.coleta),
        [...v.embs].join(" / "),
        String(v.p.transporte || "").trim(),
        f(v.filial, v.p),
        v.filial,
        v.vols,
      ];
    }),
    F = Iy(x, w, /* @__PURE__ */ new Set([1, 8]), [13, 14, 22, 19, 20, 22, 14, 16, 9]);
  return (
    My(F, `Relatorio_Coletas_${String(a).padStart(2, "0")}-${String(n).padStart(2, "0")}-${t}.xlsx`),
    { vazio: false, dataBr: d, total: w.length }
  );
}
var qy = `
.rm-fundo{position:fixed;inset:0;z-index:100;background:rgba(15,18,26,.6);display:flex;align-items:flex-start;justify-content:center;padding:24px 16px;overflow:auto}
.rm{width:100%;max-width:1180px;background:#fff;border:1px solid #d6dad2;border-radius:8px;overflow:hidden;font-family:Inter,'Nunito',Arial,sans-serif;color:#1a2430}
.rm-head{background:#121a24;color:#fff;padding:18px 20px;display:flex;justify-content:space-between;align-items:flex-start;gap:10px;position:relative}
.rm-lbl{font-size:10.5px;color:#9fb0be;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px}
.rm-rid{font-family:'JetBrains Mono',Consolas,monospace;font-size:20px;font-weight:700;letter-spacing:1px}
.rm-barcode{display:flex;gap:2px;height:26px;align-items:stretch;margin-top:8px}
.rm-barcode span{background:#e1631c}
.rm-transp{align-self:center;font-weight:800;font-size:15px;letter-spacing:.5px;text-transform:uppercase;text-align:center}
.rm-emp{font-size:10.5px;font-weight:700;color:#9fb0be;letter-spacing:1px;margin-bottom:3px}
.rm-cnpj{font-size:10.5px;font-weight:500;color:#9fb0be;letter-spacing:.5px;margin-top:3px;text-transform:none}
.rm-btns{display:flex;gap:8px}
.rm-btn{border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.1);color:#fff;border-radius:6px;padding:8px 14px;font:700 12px Inter,Arial,sans-serif;cursor:pointer}
.rm-btn:disabled{opacity:.5;cursor:default}
.rm-stamp{position:absolute;right:20px;bottom:-14px;border:3px solid #2e7d4f;color:#2e7d4f;font-family:'JetBrains Mono',Consolas,monospace;font-weight:800;font-size:15px;padding:5px 12px;border-radius:6px;transform:rotate(-7deg);background:rgba(255,255,255,.95);letter-spacing:1px}
.rm-meta{display:flex;justify-content:space-between;padding:14px 20px;border-bottom:1px dashed #d6dad2;font-size:13px;flex-wrap:wrap;gap:10px}
.rm-meta b{display:block;font-size:11px;color:#5b6670;text-transform:uppercase;letter-spacing:.4px;font-weight:700;margin-bottom:2px}
.rm-body{padding:14px 20px 18px}
.rm-wrap{overflow:auto;max-height:55vh;border:1px solid #d6dad2}
.rm table{width:100%;border-collapse:collapse;font-size:11px}
.rm th{position:sticky;top:0;background:#e9ecef;border-bottom:1px solid #d6dad2;padding:7px 8px;text-align:left;font-size:9.5px;letter-spacing:.4px;color:#314654;text-transform:uppercase}
.rm td{padding:7px 8px;border-bottom:1px solid #eceee9}
.rm tbody tr:nth-child(even){background:#f6f7f5}
.rm .mono{font-family:'JetBrains Mono',Consolas,monospace}
.rm-sig{margin-top:14px;border-top:1px dashed #d6dad2;padding-top:14px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.rm-sig img{height:70px;border:1px solid #d6dad2;border-radius:6px;background:#fff}
.rm-sigmeta{font-size:12.5px;color:#5b6670}
.rm-sigmeta b{color:#1a2430}
.rm-vazio{padding:28px;text-align:center;color:#71828d}
.rm-erro{margin:16px;background:#fdecea;color:#b3261e;border:1px solid #f5c2c0;border-radius:6px;padding:10px 12px;font-size:12px;font-weight:700}
`;
function jy(e) {
  let t = Number(e);
  return Number.isFinite(t) && e !== null && e !== ""
    ? t.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    : "—";
}
function Hy({ codigo: e, onClose: t }) {
  let [n, a] = (0, o.useState)([]),
    [r, i] = (0, o.useState)(""),
    [l, d] = (0, o.useState)(true),
    [u, p] = (0, o.useState)("");
  ((0, o.useEffect)(() => {
    let L = true;
    return (
      (async () => {
        (d(true), p(""), i(""));
        try {
          let C = await Dt(
              `v_romaneio_itens_painel?select=id,romaneio,romaneio_status,romaneio_criado_em,romaneio_assinado_em,romaneio_transportadora,transportadora_exibicao,transportadora_cnpj,romaneio_filial,empresa_nome,motorista_nome,motorista_cpf,nf,chave_nfe,pedido,cliente_nome,valor_nf,rastreio,volume,postado_em&romaneio=eq.${encodeURIComponent(e)}&order=postado_em.asc,id.asc&limit=2000`,
            ),
            _ = Array.isArray(C) ? C : [];
          if ((L && a(_), _[0] && String(_[0].romaneio_status).toLowerCase() === "assinado"))
            try {
              let q = await Dt(
                `v_romaneio_assinatura_painel?select=assinatura&romaneio=eq.${encodeURIComponent(e)}&limit=1`,
              );
              L && Array.isArray(q) && q[0] && q[0].assinatura && i(q[0].assinatura);
            } catch {}
        } catch (C) {
          L && p(C.message || "Erro ao carregar o romaneio.");
        } finally {
          L && d(false);
        }
      })(),
      () => {
        L = false;
      }
    );
  }, [e]),
    (0, o.useEffect)(() => {
      let L = (C) => {
        C.key === "Escape" && t();
      };
      return (window.addEventListener("keydown", L), () => window.removeEventListener("keydown", L));
    }, [t]));
  let c = n[0] || {},
    g = String(c.romaneio_status || "").toLowerCase() === "assinado",
    f = String(c.transportadora_exibicao || c.romaneio_transportadora || "").trim() || "—",
    x = String(c.transportadora_cnpj || "").trim();
  !x && /LOGGI/i.test(f) && (x = "24.217.653/0053-16");
  let w = String(c.romaneio_filial || "")
      .split(",")
      .map((L) => L.trim())
      .filter(Boolean)
      .join(", "),
    F = c.empresa_nome ? `${c.empresa_nome}${w ? ` (${w})` : ""}` : "",
    v = n.reduce((L, C) => L + (parseInt(C.volume, 10) || 1), 0),
    m = new Set(n.map((L) => nl(L.nf))).size,
    h = c.romaneio_criado_em ? pr(c.romaneio_criado_em) : "—",
    y = c.romaneio_assinado_em ? wg(c.romaneio_assinado_em) : "—",
    B = String(e)
      .padEnd(26, "7")
      .slice(0, 26)
      .split("")
      .map((L, C) => 1 + ((L.charCodeAt(0) + C) % 4));
  function k() {
    let L = /* @__PURE__ */ new Map();
    n.forEach((O) => {
      let H = nl(O.nf);
      (L.has(H) || L.set(H, { nf: H, chave: O.chave_nfe || "", vol: 0 }),
        (L.get(H).vol += parseInt(O.volume, 10) || 1));
    });
    let C = [...L.values()],
      _ = 28,
      q = Math.max(1, Math.ceil(C.length / _)),
      E = c.romaneio_criado_em ? ur(c.romaneio_criado_em) : "—",
      A = /* @__PURE__ */ new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      I = `<div class="ass">
      <div class="ass-dados">
        <div><b>Responsável pela coleta:</b> ${Jt(g ? c.motorista_nome || "—" : "")}</div>
        <div><b>Documento:</b> ${Jt(g ? c.motorista_cpf || "—" : "")}</div>
        <div><b>Data/Hora da assinatura:</b> ${Jt(g ? y : "")}</div>
      </div>
      <div class="ass-caixa">${g && r ? `<img src="${Jt(r)}" alt="assinatura">` : ""}</div>
      <div class="ass-leg">Assinatura digital do responsável pela coleta</div>
    </div>`,
      V = [];
    for (let O = 0; O < q; O += 1) {
      let M = C.slice(O * _, (O + 1) * _)
        .map((Q) => `<tr><td>${Jt(Q.nf)}</td><td>${Jt(Q.chave || "—")}</td><td class="c">${Q.vol}</td></tr>`)
        .join("");
      V.push(`<section class="pg">
        <div class="cab">
          <div class="cab-e">${Jt(c.empresa_nome || "BBDI DISTRIBUIDORA")}${w ? `<br><span class="fil">Filial(is): ${Jt(w)}</span>` : ""}</div>
          <div class="cab-c"><b>Romaneio Nº ${Jt(e)}</b><br>${Jt(f)}${x ? `<br>CNPJ: ${Jt(x)}` : ""}</div>
          <div class="cab-d">Data: ${Jt(E)}<br>NFs: ${C.length}<br>Volumes: ${v}<br>Página: ${O + 1}/${q}</div>
        </div>
        <table><thead><tr><th>Nota Fiscal</th><th>Chave de Acesso</th><th class="c">Volumes</th></tr></thead><tbody>${M}</tbody></table>
        <div class="rodape">${I}<div class="gerado">Romaneio ${Jt(e)} | Gerado em: ${Jt(A)}</div></div>
      </section>`);
    }
    let D = window.open("", "_blank");
    if (!D) {
      alert("O navegador bloqueou a janela de impressão. Permita pop-ups para este site.");
      return;
    }
    (D.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Romaneio ${Jt(e)}</title>
<style>
@page{size:A4;margin:10mm}
*{box-sizing:border-box}
body{margin:0;font-family:Arial,Helvetica,sans-serif;color:#111;font-size:9px}
.pg{position:relative;height:276mm;page-break-after:always;padding-bottom:62mm}
.pg:last-child{page-break-after:auto}
.cab{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid #999;padding-bottom:6px;margin-bottom:8px}
.cab-e{font-weight:700;font-size:12px;width:30%}
.fil{font-weight:400;font-size:9px}
.cab-c{text-align:center;font-size:10px;width:40%;line-height:1.4}
.cab-d{text-align:right;font-size:9px;width:30%;line-height:1.35}
table{width:100%;border-collapse:collapse}
th{border-bottom:1px solid #444;padding:4px 6px;font-size:9px;text-align:center}
td{padding:3px 6px;font-size:8.5px;text-align:center}
td.c,th.c{text-align:center}
.rodape{position:absolute;left:0;right:0;bottom:0}
.ass{border-top:1px solid #999;padding-top:6px}
.ass-dados{font-size:8.5px;line-height:1.5;margin-bottom:6px}
.ass-caixa{height:22mm;border:1px solid #444;display:flex;align-items:center;justify-content:center}
.ass-caixa img{max-height:20mm;max-width:100%}
.ass-leg{text-align:center;font-size:7.5px;color:#333;margin-top:2px}
.gerado{text-align:center;font-size:8px;color:#333;border-top:1px solid #999;margin-top:6px;padding-top:4px}
</style></head><body>${V.join("")}
<script>window.onload=function(){window.print()}<\/script></body></html>`),
      D.document.close());
  }
  return o.default.createElement(
    "div",
    { className: "rm-fundo", onClick: t },
    o.default.createElement("style", null, qy),
    o.default.createElement(
      "div",
      { className: "rm", onClick: (L) => L.stopPropagation() },
      o.default.createElement(
        "div",
        { className: "rm-head" },
        o.default.createElement(
          "div",
          null,
          o.default.createElement("div", { className: "rm-lbl" }, "Romaneio de expedição"),
          o.default.createElement("div", { className: "rm-rid" }, e),
          o.default.createElement(
            "div",
            { className: "rm-barcode" },
            B.map((L, C) => o.default.createElement("span", { key: C, style: { width: L } })),
          ),
        ),
        o.default.createElement(
          "div",
          { className: "rm-transp" },
          F && o.default.createElement("div", { className: "rm-emp" }, F),
          o.default.createElement("div", null, f),
          x && o.default.createElement("div", { className: "rm-cnpj" }, "CNPJ: ", x),
        ),
        o.default.createElement(
          "div",
          { className: "rm-btns" },
          o.default.createElement(
            "button",
            { type: "button", className: "rm-btn", onClick: k, disabled: l || !n.length },
            "Imprimir",
          ),
          o.default.createElement("button", { type: "button", className: "rm-btn", onClick: t }, "Fechar"),
        ),
        g && o.default.createElement("div", { className: "rm-stamp" }, "CONFIRMADO"),
      ),
      o.default.createElement(
        "div",
        { className: "rm-meta" },
        o.default.createElement("div", null, o.default.createElement("b", null, "Gerado por"), "—"),
        o.default.createElement("div", null, o.default.createElement("b", null, "Hora"), h),
        o.default.createElement("div", null, o.default.createElement("b", null, "Notas fiscais"), m),
        o.default.createElement("div", null, o.default.createElement("b", null, "Volumes"), v),
      ),
      o.default.createElement(
        "div",
        { className: "rm-body" },
        u && o.default.createElement("div", { className: "rm-erro" }, u),
        l && o.default.createElement("div", { className: "rm-vazio" }, "Carregando romaneio…"),
        !l &&
          !u &&
          !n.length &&
          o.default.createElement("div", { className: "rm-vazio" }, "Nenhuma NF encontrada neste romaneio."),
        !l &&
          n.length > 0 &&
          o.default.createElement(
            "div",
            { className: "rm-wrap" },
            o.default.createElement(
              "table",
              null,
              o.default.createElement(
                "thead",
                null,
                o.default.createElement(
                  "tr",
                  null,
                  o.default.createElement("th", null, "NF"),
                  o.default.createElement("th", null, "Pedido"),
                  o.default.createElement("th", null, "Cliente"),
                  o.default.createElement("th", null, "Valor NF"),
                  o.default.createElement("th", null, "Chave"),
                  o.default.createElement("th", null, "Rastreio"),
                  o.default.createElement("th", null, "Volume"),
                ),
              ),
              o.default.createElement(
                "tbody",
                null,
                n.map((L, C) =>
                  o.default.createElement(
                    "tr",
                    { key: L.id || C },
                    o.default.createElement("td", { className: "mono", style: { fontWeight: 700 } }, nl(L.nf)),
                    o.default.createElement("td", { className: "mono" }, L.pedido || "—"),
                    o.default.createElement("td", null, L.cliente_nome || "—"),
                    o.default.createElement(
                      "td",
                      { className: "mono", style: { fontWeight: 700, whiteSpace: "nowrap" } },
                      jy(L.valor_nf),
                    ),
                    o.default.createElement("td", { className: "mono", style: { fontSize: 10.5 } }, L.chave_nfe || "—"),
                    o.default.createElement("td", { className: "mono" }, L.rastreio || "—"),
                    o.default.createElement("td", { className: "mono" }, parseInt(L.volume, 10) || 1),
                  ),
                ),
              ),
            ),
          ),
        g &&
          !l &&
          o.default.createElement(
            "div",
            { className: "rm-sig" },
            r ? o.default.createElement("img", { src: r, alt: "assinatura" }) : null,
            o.default.createElement(
              "div",
              { className: "rm-sigmeta" },
              "Retirada confirmada por ",
              o.default.createElement("b", null, c.motorista_nome || "—"),
              c.motorista_cpf
                ? o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement("br", null),
                    "CPF: ",
                    o.default.createElement("b", null, c.motorista_cpf),
                  )
                : null,
              o.default.createElement("br", null),
              "em ",
              y,
            ),
          ),
      ),
    ),
  );
}
var Wy = `
.pgh{font-family:Inter,'Nunito',Arial,sans-serif;color:var(--txt)}
.pgh *{box-sizing:border-box}
.pgh-title{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:12px;gap:12px;flex-wrap:wrap}
.pgh-title h2{margin:0;font-size:20px;color:var(--txt)}
.pgh-title p{margin:3px 0 0;font-size:11px;color:var(--txt-muted)}
.pgh-total{text-align:right;font-size:13px}
.pgh-total small{display:block;font-size:9px;color:var(--txt-muted);margin-top:3px}
.pgh-filtros{display:grid;grid-template-columns:155px 120px 170px 165px minmax(220px,1fr) 90px minmax(260px,285px);gap:8px;background:var(--surf);border:1px solid var(--bd);border-radius:7px;padding:10px;margin-bottom:9px;align-items:end}
.pgh-campo label{display:block;font-size:9px;font-weight:800;color:var(--txt-2);margin-bottom:4px}
.pgh-campo input,.pgh-campo select{width:100%;height:31px;border:1px solid var(--bd-strong);border-radius:3px;padding:0 8px;font-size:10px;background:var(--surf);color:var(--txt)}
.pgh-atualizar{height:31px;border:0;border-radius:3px;background:var(--accent);color:#fff;font-size:10px;font-weight:800;cursor:pointer}
.pgh-atualizar:disabled,.pgh-relatorio:disabled{opacity:.6;cursor:default}
.pgh-rel{display:flex;align-items:flex-end;gap:6px;flex-wrap:wrap}
.pgh-rel input{height:31px;width:132px;min-width:132px;border:1px solid var(--bd-strong);border-radius:5px;padding:0 7px;background:var(--surf);color:var(--txt);font:600 11px Inter,Arial,sans-serif}
.pgh-relatorio{height:31px;min-width:120px;border:0;border-radius:3px;background:#146c43;color:#fff;font-size:10px;font-weight:800;cursor:pointer;padding:0 14px;white-space:nowrap}
.pgh-box{max-height:calc(100vh - 250px);min-height:200px;overflow:auto;background:var(--surf);border:1px solid var(--bd-strong)}
.pgh-table{width:100%;min-width:2350px;border-collapse:collapse;white-space:nowrap;font-size:9px}
.pgh-table th{position:sticky;top:0;z-index:2;background:var(--surf-head);border:1px solid var(--bd-strong);padding:6px 7px;text-align:left;color:var(--txt-2);font-size:8px}
.pgh-table td{border-bottom:1px solid var(--bd);padding:5px 7px;color:var(--txt);white-space:nowrap}
.pgh-table tbody tr:nth-child(even){background:var(--surf-alt)}
.pgh-table td.pgh-cli{max-width:230px;overflow:hidden;text-overflow:ellipsis}
.pgh-table td.pgh-mono{font-family:'JetBrains Mono',Consolas,monospace}
.pgh-dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:5px}
.pgh-verde{background:#28b779}.pgh-amarelo{background:#e9b62f}.pgh-vermelho{background:#e94b4b}.pgh-cancelado{background:#6b7280}.pgh-canc_cnt{background:#2563eb}.pgh-canc_bft{background:#7c3aed}.pgh-canc_ag{background:#ea580c}
.pgh-status{font-weight:800}
.pgh-legenda{display:flex;gap:18px;padding:7px 2px;font-size:9px;color:var(--txt-muted);flex-wrap:wrap}
.pgh-vazio{text-align:center!important;padding:45px!important;color:var(--txt-muted)}
.pgh-pager{display:flex;align-items:center;justify-content:flex-end;gap:8px;padding:7px 8px;background:var(--surf);border:1px solid var(--bd);border-top:0;font-size:10px;color:var(--txt-2)}
.pgh-pager button{height:27px;padding:0 10px;border:1px solid var(--bd-strong);background:var(--surf);border-radius:3px;font-size:10px;font-weight:800;cursor:pointer;color:var(--txt)}
.pgh-pager button:disabled{opacity:.4;cursor:default}
.pgh-romlink{border:0;background:none;padding:0;color:var(--accent-tx);font:inherit;font-weight:800;cursor:pointer;text-decoration:underline;text-underline-offset:2px}
.pgh-romlink:hover{color:var(--accent-tx)}
.pgh-ret{display:inline-block;border:1px solid var(--green-bd);color:var(--green-tx);background:var(--green-bg);border-radius:5px;padding:3px 7px;font-size:9px;font-weight:800}
.pgh-mais{border:1px solid var(--bd-strong);background:var(--surf);color:var(--accent-tx);border-radius:4px;padding:1px 5px;font-size:9px;font-weight:800;cursor:default;margin-left:4px}
.pgh-erro{background:var(--red-bg);color:var(--red-tx);border:1px solid var(--red-bd);border-radius:6px;padding:10px 12px;font-size:12px;font-weight:700;margin-bottom:9px}
@media(max-width:1100px){.pgh-filtros{grid-template-columns:repeat(3,minmax(130px,1fr))}}
`,
  M0 = [
    "STATUS",
    "FILIAL",
    "NF",
    "PEDIDO",
    "CÓD. CLIENTE",
    "CLIENTE",
    "CHAVE NF-e",
    "RASTREIO 1",
    "RASTREIO 2",
    "RASTREIO 3",
    "TRANSPORTADORA",
    "DATA FAT.",
    "HORA FAT.",
    "DATA LIMITE",
    "DATA POSTAGEM",
    "HORA",
    "BIPADOR",
    "EMBALADOR",
    "VOLUME",
    "ROMANEIO / RETIRADA",
    "COLETA",
  ];
function Uy() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(/* @__PURE__ */ new Date());
}
function Ky(e, t) {
  let n = [`select=${Cg}`];
  (e.status && n.push(`situacao=eq.${encodeURIComponent(e.status)}`),
    e.filial && n.push(`filial=eq.${encodeURIComponent(e.filial)}`),
    e.transp && n.push(`transportadora_canon=eq.${encodeURIComponent(e.transp)}`));
  let a = e.rom.trim().replace(/[,*()%]/g, "");
  a && n.push(`romaneio=ilike.${encodeURIComponent(`*${a}*`)}`);
  let r = e.busca
    .trim()
    .toLowerCase()
    .replace(/[,*()%]/g, "");
  return (
    r && n.push(`busca=ilike.${encodeURIComponent(`*${r}*`)}`),
    n.push("order=ordem.desc,nf.desc,linha_id.asc"),
    n.push(`limit=${gi + 1}`),
    n.push(`offset=${t * gi}`),
    `v_postagens_painel?${n.join("&")}`
  );
}
async function Vy(e, t, n = "pedido") {
  let a = String(e || "")
      .trim()
      .replace(/[,*()%]/g, ""),
    r = [],
    i = [];
  if (a.length < 3) return { itens: r, falhas: i };
  let l = encodeURIComponent(`*${a}*`),
    d = a.toLowerCase(),
    u = n === "nf",
    p = (w) =>
      String(w ?? "")
        .trim()
        .toLowerCase()
        .replace(/^0+(?=.)/, ""),
    c = p(a),
    g = (w) =>
      u
        ? p(w.nf_norm || w.nf).includes(c)
        : String(w.pedido || "")
            .toLowerCase()
            .includes(d),
    f = (w) => {
      let F = wi(w);
      return F ? F.data : "-";
    },
    x = [];
  return (
    x.push(
      (async () => {
        let w = `v_postagens_painel?select=${Cg}&busca=ilike.${encodeURIComponent(`*${d}*`)}&order=ordem.desc,nf.desc,linha_id.asc&limit=100`,
          F = await Ag(w);
        (F || (F = await Dt(w)),
          (Array.isArray(F) ? F : [])
            .filter(g)
            .slice(0, 50)
            .forEach((v) => {
              r.push({
                origem: "Postagens",
                telaDestino: "postagens",
                pedido: v.pedido || a,
                filial: v.filial || "-",
                produto: "-",
                quantidade: v.volume || "-",
                status: v.status_texto || v.situacao || "-",
                data: v.postado_em ? f(v.postado_em) : "-",
                detalhe: `NF: ${v.nf || "-"} · Transportadora: ${v.transportadora || "-"} · Romaneio: ${v.romaneio || "-"}`,
              });
            }));
      })().catch((w) => i.push(`Postagens (${w.message || "erro"})`)),
    ),
    t &&
      x.push(
        (async () => {
          let w = await hl("via"),
            F;
          (w
            ? (F = w.linhas.filter(g))
            : (F = await Dt(
                `via_leitor?select=${Fc}&filial=in.(0101,0102,1020)&${n}=eq.${encodeURIComponent(a)}&limit=50`,
              )),
            (Array.isArray(F) ? F : []).slice(0, 50).forEach((v) => {
              r.push({
                origem: "Via Leitor",
                telaDestino: "viaLeitor",
                pedido: v.pedido || a,
                filial: v.filial || "-",
                produto: "-",
                quantidade: v.total_unidades || v.volume || "-",
                status: "Faturado — aguardando expedição",
                data: v.data_saida_entrada ? f(v.data_saida_entrada) : "-",
                detalhe: `NF: ${v.nf || "-"} · Transportadora: ${gl(v.transportadora) || "-"} · Cliente: ${v.cliente_codigo || "-"}`,
              });
            }));
        })().catch((w) => i.push(`Via Leitor (${w.message || "erro"})`)),
      ),
    x.push(
      (async () => {
        let w = await hl("canc"),
          F;
        (w
          ? (F = w.itens.filter(g))
          : (F = await Dt(`v_cancelamentos_painel?select=*&${n}=ilike.${l}&order=id.desc&limit=50`)),
          (Array.isArray(F) ? F : [])
            .filter((v) => t || v.status === Yt)
            .slice(0, 50)
            .forEach((v) => {
              r.push({
                origem: "Cancelamentos",
                telaDestino: "cancelamentos",
                pedido: v.pedido || a,
                filial: v.filial || "-",
                produto: "-",
                quantidade: "-",
                status: v.status || "-",
                data: v.data_cancelamento ? f(v.data_cancelamento) : "-",
                detalhe: `NF: ${v.nf || "-"} · Solicitante: ${v.solicitante || "-"} · Motivo: ${v.motivo || "-"}`,
              });
            }));
      })().catch((w) => i.push(`Cancelamentos (${w.message || "erro"})`)),
    ),
    await Promise.all(x),
    { itens: r, falhas: i }
  );
}
async function Ag(e) {
  if (!so) return null;
  let t = typeof AbortController < "u" ? new AbortController() : null,
    n = t ? setTimeout(() => t.abort(), 3e4) : null;
  try {
    let a = so.includes("?") ? "&" : "?",
      r = await fetch(`${so}${a}action=postagens&q=${encodeURIComponent(e)}`, t ? { signal: t.signal } : void 0);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    let i = await r.json();
    if (!i || !i.ok || !Array.isArray(i.dados)) throw new Error("resposta inválida");
    return i.dados;
  } catch {
    return null;
  } finally {
    n && clearTimeout(n);
  }
}
function Gy({ ativo: e }) {
  let [t, n] = (0, o.useState)([]),
    [a, r] = (0, o.useState)(0),
    [i, l] = (0, o.useState)(false),
    [d, u] = (0, o.useState)(z0),
    [p, c] = (0, o.useState)(z0),
    [g, f] = (0, o.useState)([]),
    [x, w] = (0, o.useState)(false),
    [F, v] = (0, o.useState)(""),
    [m, h] = (0, o.useState)(""),
    [y, B] = (0, o.useState)(""),
    [k, L] = (0, o.useState)(Uy),
    [C, _] = (0, o.useState)(false),
    q = (0, o.useRef)({ t: 0, chave: "" }),
    E = (0, o.useRef)(0);
  (0, o.useEffect)(() => {
    let D = d.busca.trim(),
      O = D.length === 0 || D.length >= 3 ? d.busca : p.busca,
      H = { ...d, busca: O };
    if (JSON.stringify(H) === JSON.stringify(p)) return;
    let M = H.rom !== p.rom || H.busca !== p.busca,
      Q = setTimeout(
        () => {
          (r(0), c(H));
        },
        M ? 600 : 0,
      );
    return () => clearTimeout(Q);
  }, [d, p]);
  let A = (0, o.useCallback)(async () => {
    let D = E.current + 1;
    ((E.current = D), w(true), v(""));
    try {
      let O = Ky(p, a),
        M = !p.rom.trim() && !p.busca.trim() ? await Ag(O) : null;
      if ((M || (M = await Dt(O)), D !== E.current)) return;
      let Q = Array.isArray(M) ? M : [];
      (l(Q.length > gi),
        n(Q.slice(0, gi)),
        h(
          /* @__PURE__ */ new Date().toLocaleTimeString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            hour: "2-digit",
            minute: "2-digit",
          }),
        ),
        (q.current = { t: Date.now(), chave: `${JSON.stringify(p)}|${a}` }));
    } catch (O) {
      D === E.current && v(O.message || "Erro ao carregar as postagens.");
    } finally {
      D === E.current && w(false);
    }
  }, [p, a]);
  ((0, o.useEffect)(() => {
    if (!e) return;
    let D = `${JSON.stringify(p)}|${a}`;
    (q.current.chave === D && Date.now() - q.current.t < 6e4) || A();
  }, [e, p, a, A]),
    (0, o.useEffect)(() => {
      !e ||
        g.length ||
        Dt("v_transportadoras_painel?select=transportadora&order=transportadora.asc&limit=500")
          .then((D) => f((Array.isArray(D) ? D : []).map((O) => O.transportadora).filter(Boolean)))
          .catch(() => {});
    }, [e, g.length]));
  async function I() {
    if (!C) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(k)) {
        alert("Selecione a data da coleta.");
        return;
      }
      _(true);
      try {
        let D = await Oy(k);
        D.vazio
          ? alert(`Nenhuma coleta encontrada para ${D.dataBr}.`)
          : alert(`Relatório gerado com sucesso — ${D.total} registros.`);
      } catch (D) {
        alert(`Erro ao gerar relatório: ${D.message || D}`);
      } finally {
        _(false);
      }
    }
  }
  let V = (D) => (O) => u((H) => ({ ...H, [D]: O.target.value }));
  return o.default.createElement(
    "div",
    { className: "pgh" },
    o.default.createElement("style", null, Wy),
    o.default.createElement(
      "div",
      { className: "pgh-title" },
      o.default.createElement(
        "div",
        null,
        o.default.createElement("h2", null, "Postagens — Histórico geral"),
        o.default.createElement("p", null, "Histórico completo do Supabase · sem limite de data"),
      ),
      o.default.createElement(
        "div",
        { className: "pgh-total" },
        o.default.createElement("b", null, t.length, " registro(s)"),
        o.default.createElement("small", null, x ? "Atualizando…" : m ? `Atualizado ${m}` : " "),
      ),
    ),
    o.default.createElement(
      "div",
      { className: "pgh-filtros" },
      o.default.createElement(
        "div",
        { className: "pgh-campo" },
        o.default.createElement("label", null, "STATUS"),
        o.default.createElement(
          "select",
          { value: d.status, onChange: V("status") },
          o.default.createElement("option", { value: "" }, "Todos"),
          o.default.createElement("option", { value: "verde" }, "Aguardando postagem"),
          o.default.createElement("option", { value: "amarelo" }, "Postado — aguardando coleta"),
          o.default.createElement("option", { value: "vermelho" }, "Expedido / coletado"),
          o.default.createElement("option", { value: "canc_cnt" }, "Aguardando CNT"),
          o.default.createElement("option", { value: "canc_ag" }, "Aguardando Cancelamento"),
          o.default.createElement("option", { value: "canc_bft" }, "Aguardando Pagto BFT"),
          o.default.createElement("option", { value: "cancelado" }, "Cancelado"),
        ),
      ),
      o.default.createElement(
        "div",
        { className: "pgh-campo" },
        o.default.createElement("label", null, "FILIAL"),
        o.default.createElement(
          "select",
          { value: d.filial, onChange: V("filial") },
          o.default.createElement("option", { value: "" }, "Todas"),
          o.default.createElement("option", null, "0101"),
          o.default.createElement("option", null, "0102"),
          o.default.createElement("option", null, "1020"),
        ),
      ),
      o.default.createElement(
        "div",
        { className: "pgh-campo" },
        o.default.createElement("label", null, "TRANSPORTADORA"),
        o.default.createElement(
          "select",
          { value: d.transp, onChange: V("transp") },
          o.default.createElement("option", { value: "" }, "Todas"),
          g.map((D) => o.default.createElement("option", { key: D, value: D }, D)),
        ),
      ),
      o.default.createElement(
        "div",
        { className: "pgh-campo" },
        o.default.createElement("label", null, "ROMANEIO"),
        o.default.createElement("input", { value: d.rom, onChange: V("rom"), placeholder: "RM-000..." }),
      ),
      o.default.createElement(
        "div",
        { className: "pgh-campo" },
        o.default.createElement("label", null, "PESQUISAR"),
        o.default.createElement("input", {
          value: d.busca,
          onChange: V("busca"),
          placeholder: "NF, pedido, cliente, chave...",
        }),
      ),
      o.default.createElement(
        "button",
        { type: "button", className: "pgh-atualizar", disabled: x, onClick: () => (a === 0 ? A() : r(0)) },
        "Atualizar",
      ),
      o.default.createElement(
        "div",
        { className: "pgh-rel" },
        o.default.createElement("input", {
          type: "date",
          value: k,
          onChange: (D) => L(D.target.value),
          title: "Data da coleta",
        }),
        o.default.createElement(
          "button",
          { type: "button", className: "pgh-relatorio", disabled: C, onClick: I },
          C ? "Gerando..." : "Gerar relatório",
        ),
      ),
    ),
    F && o.default.createElement("div", { className: "pgh-erro" }, F),
    o.default.createElement(
      "div",
      { className: "pgh-box" },
      o.default.createElement(
        "table",
        { className: "pgh-table" },
        o.default.createElement(
          "thead",
          null,
          o.default.createElement(
            "tr",
            null,
            M0.map((D) => o.default.createElement("th", { key: D }, D)),
          ),
        ),
        o.default.createElement(
          "tbody",
          null,
          t.length === 0 &&
            o.default.createElement(
              "tr",
              null,
              o.default.createElement(
                "td",
                { colSpan: M0.length, className: "pgh-vazio" },
                x ? "Carregando…" : "Nenhum registro encontrado.",
              ),
            ),
          t.map((D) => {
            let O = Array.isArray(D.rastreios) ? D.rastreios : [],
              H = /RETIRA/i.test(String(D.transportadora || "")),
              M = O.length > 3 ? O.slice(3) : [],
              Q = "—";
            return (
              H
                ? D.retirada_em &&
                  (Q = o.default.createElement(
                    "span",
                    { className: "pgh-ret" },
                    "Retirada registrada · ",
                    ur(D.retirada_em),
                  ))
                : D.romaneio &&
                  (Q = o.default.createElement(
                    "button",
                    {
                      type: "button",
                      className: "pgh-romlink",
                      title: "Visualizar romaneio",
                      onClick: () => B(D.romaneio),
                    },
                    D.romaneio,
                  )),
              o.default.createElement(
                "tr",
                { key: D.linha_id },
                o.default.createElement(
                  "td",
                  null,
                  o.default.createElement("span", { className: `pgh-dot pgh-${D.situacao}` }),
                  o.default.createElement("span", { className: "pgh-status" }, D.status_texto),
                ),
                o.default.createElement("td", null, D.filial || "—"),
                o.default.createElement("td", null, o.default.createElement("b", null, nl(D.nf))),
                o.default.createElement("td", null, D.pedido || "—"),
                o.default.createElement("td", null, D.cliente_codigo || "—"),
                o.default.createElement(
                  "td",
                  { className: "pgh-cli", title: D.cliente_nome || "" },
                  D.cliente_nome || "—",
                ),
                o.default.createElement("td", null, D.chave_nfe || "—"),
                o.default.createElement("td", { className: "pgh-mono" }, O[0] || "—"),
                o.default.createElement("td", { className: "pgh-mono" }, O[1] || "—"),
                o.default.createElement(
                  "td",
                  { className: "pgh-mono" },
                  O[2] || "—",
                  M.length > 0 &&
                    o.default.createElement("span", { className: "pgh-mais", title: M.join(" | ") }, "+", M.length),
                ),
                o.default.createElement("td", null, D.transportadora || "—"),
                o.default.createElement("td", null, ur(D.data_faturamento)),
                o.default.createElement("td", null, pr(D.data_faturamento)),
                o.default.createElement("td", null, ur(D.data_limite)),
                o.default.createElement("td", null, ur(D.postado_em)),
                o.default.createElement("td", null, pr(D.postado_em)),
                o.default.createElement("td", null, D.bipador || "—"),
                o.default.createElement("td", null, D.embalador || "—"),
                o.default.createElement(
                  "td",
                  null,
                  D.volume === null || D.volume === void 0 || D.volume === "" ? 1 : D.volume,
                ),
                o.default.createElement("td", null, Q),
                o.default.createElement("td", null, wg(D.coleta_em)),
              )
            );
          }),
        ),
      ),
    ),
    o.default.createElement(
      "div",
      { className: "pgh-pager" },
      o.default.createElement(
        "button",
        { type: "button", disabled: a === 0 || x, onClick: () => r((D) => Math.max(0, D - 1)) },
        "‹ Anterior",
      ),
      o.default.createElement(
        "span",
        null,
        "Página ",
        a + 1,
        " · até ",
        gi,
        " registros · histórico completo do Supabase",
      ),
      o.default.createElement(
        "button",
        { type: "button", disabled: !i || x, onClick: () => r((D) => D + 1) },
        "Próxima ›",
      ),
    ),
    o.default.createElement(
      "div",
      { className: "pgh-legenda" },
      o.default.createElement(
        "span",
        null,
        o.default.createElement("i", { className: "pgh-dot pgh-verde" }),
        "Aguardando postagem",
      ),
      o.default.createElement(
        "span",
        null,
        o.default.createElement("i", { className: "pgh-dot pgh-amarelo" }),
        "Postado — aguardando coleta",
      ),
      o.default.createElement(
        "span",
        null,
        o.default.createElement("i", { className: "pgh-dot pgh-vermelho" }),
        "Expedido / coletado",
      ),
      o.default.createElement(
        "span",
        null,
        o.default.createElement("i", { className: "pgh-dot pgh-canc_cnt" }),
        "Cancelamento — Aguardando CNT",
      ),
      o.default.createElement(
        "span",
        null,
        o.default.createElement("i", { className: "pgh-dot pgh-canc_ag" }),
        "Cancelamento — Aguardando Cancelamento",
      ),
      o.default.createElement(
        "span",
        null,
        o.default.createElement("i", { className: "pgh-dot pgh-canc_bft" }),
        "Cancelamento — Aguardando Pagto BFT",
      ),
      o.default.createElement(
        "span",
        null,
        o.default.createElement("i", { className: "pgh-dot pgh-cancelado" }),
        "Cancelado",
      ),
    ),
    y && o.default.createElement(Hy, { codigo: y, onClose: () => B("") }),
  );
}
var $0 = "2026-10-13",
  Qy = 30,
  ga = 2e3,
  Fc =
    "filial,nf,pedido,cliente_codigo,transportadora,data_saida_entrada,hora_autorizacao,data_limite,volume,total_unidades",
  Xy = [
    ["filial", "Filial"],
    ["nf", "NF"],
    ["pedido", "Pedido"],
    ["cliente_codigo", "Cliente"],
    ["transportadora", "Transporte"],
    ["total_unidades", "Qtd."],
    ["volume", "Volume"],
    ["data_saida_entrada", "Data fat."],
    ["data_limite", "Data limite"],
  ],
  Jy = `
.vlg{font-family:Inter,'Nunito',Arial,sans-serif;color:var(--txt)}
.vlg *{box-sizing:border-box}
.vlg-toolbar{min-height:44px;background:var(--surf-alt);border:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between;padding:5px 9px;margin-bottom:3px;gap:10px;flex-wrap:wrap}
.vlg-title{display:flex;flex-direction:column}.vlg-title strong{font-size:13px;color:var(--txt)}.vlg-title span{font-size:9px;color:var(--txt-muted);margin-top:1px}
.vlg-actions{display:flex;align-items:center;gap:6px}.vlg-actions label{font-size:8px;font-weight:900;color:var(--txt-2)}
.vlg-actions select{height:27px;border:1px solid var(--bd-strong);background:var(--surf);border-radius:3px;padding:0 25px 0 7px;font-size:10px;font-weight:700;color:var(--txt)}
.vlg-btn{height:27px;padding:0 11px;border:1px solid var(--bd-strong);background:var(--surf);border-radius:3px;font-size:10px;font-weight:800;cursor:pointer;color:var(--txt)}
.vlg-btn:disabled{opacity:.5;cursor:default}
.vlg-filtros{display:flex;flex-wrap:wrap;gap:6px;align-items:flex-end;background:var(--surf);border:1px solid var(--bd);border-bottom:0;padding:5px 7px}
.vlg-campo label{display:block;font-size:8px;font-weight:800;color:var(--txt-2);margin-bottom:3px}
.vlg-campo select,.vlg-campo input{height:26px;border:1px solid var(--bd-strong);border-radius:3px;padding:0 7px;font-size:10px;background:var(--surf);color:var(--txt)}
.vlg-f-filial select{width:150px}.vlg-f-transp select{width:200px}.vlg-f-busca{flex:1 1 220px}.vlg-f-busca input{width:100%}
.vlg-f-col select{min-width:130px}.vlg-f-col input{min-width:150px}
.vlg-hint{font-size:9px;color:var(--txt-muted);align-self:center}
.vlg-total{height:26px;min-width:90px;display:flex;align-items:center;justify-content:center;gap:5px;background:var(--accent-soft);border:1px solid var(--bd);border-radius:3px;padding:0 8px}
.vlg-total span{font-size:8px;font-weight:900;color:var(--txt-2)}.vlg-total strong{font-size:13px;color:var(--accent-tx)}
.vlg-grid{background:var(--surf);border:1px solid var(--bd);max-height:calc(100vh - 250px);min-height:200px;overflow:auto}
.vlg-table{width:100%;border-collapse:collapse;font-size:10px}
.vlg-table thead{position:sticky;top:0;z-index:2;background:var(--surf-head)}
.vlg-table th{height:23px;padding:3px 6px;text-align:left;border-bottom:1px solid var(--bd-strong);color:var(--txt-2);font-size:9px;font-weight:800;white-space:nowrap}
.vlg-table th.vlg-ord{cursor:pointer;user-select:none}
.vlg-table th.vlg-asc::after{content:" ▲";font-size:8px}.vlg-table th.vlg-desc::after{content:" ▼";font-size:8px}
.vlg-table td{height:22px;padding:2px 6px;border-bottom:1px solid var(--bd);white-space:nowrap;font-size:10px}
.vlg-table tbody tr:nth-child(even){background:var(--surf-alt)}.vlg-table tbody tr:hover{background:var(--accent-soft)}
.vlg-table .vlg-mono{font-size:9.5px;font-family:'JetBrains Mono',Consolas,monospace}
.vlg-st{width:20px;text-align:center}
.vlg-dot{width:8px;height:8px;border-radius:50%;display:inline-block}.vlg-dot.ok{background:#18ad62}.vlg-dot.late{background:#ef3e36}
.vlg-obs{min-width:250px}.vlg-obs span{display:inline-block;max-width:300px;overflow:hidden;text-overflow:ellipsis;vertical-align:middle;color:var(--txt-2)}
.vlg-vazio{padding:28px;text-align:center;color:var(--txt-muted);font-size:11px}
.vlg-pager{display:flex;align-items:center;justify-content:flex-end;gap:8px;padding:7px 8px;background:var(--surf);border:1px solid var(--bd);border-top:0;font-size:10px;color:var(--txt-2)}
.vlg-pager button{height:27px;padding:0 10px;border:1px solid var(--bd-strong);background:var(--surf);border-radius:3px;font-size:10px;font-weight:800;cursor:pointer;color:var(--txt)}
.vlg-pager button:disabled{opacity:.4;cursor:default}
.vlg-legenda{display:flex;gap:15px;align-items:center;padding:5px 8px;font-size:9px;color:var(--txt-muted);border:1px solid var(--bd);border-top:0;background:var(--surf-alt)}
.vlg-legenda i{margin-right:5px}
.vlg-erro{background:var(--red-bg);color:var(--red-tx);border:1px solid var(--red-bd);border-radius:6px;padding:10px 12px;font-size:12px;font-weight:700;margin-bottom:6px}
.vlg-aviso{background:var(--amber-bg);color:var(--amber-tx);border:1px solid var(--amber-bd);border-radius:6px;padding:8px 12px;font-size:11px;font-weight:700;margin-bottom:6px}
`;
function gl(e) {
  let t = String(e || "")
    .trim()
    .toUpperCase();
  return ["PAC", "SEDEX", "CORREIOS"].includes(t)
    ? "CORREIOS"
    : t === "LOGGI"
      ? "LOGGI - POA RS"
      : t.startsWith("TROCA")
        ? "TROCA"
        : t;
}
function O0(e) {
  let t = String(e || "")
    .trim()
    .toUpperCase();
  return ["PAC", "SEDEX", "CORREIOS"].includes(t)
    ? "CORREIOS"
    : t === "LOGGI - POA RS"
      ? "LOGGI"
      : t.startsWith("TROCA")
        ? "TROCA"
        : t;
}
function q0(e) {
  return String(e || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
function j0(e) {
  let t = String(e || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  return t ? `${t[3]}/${t[2]}/${t[1]}` : e || "—";
}
function kg(e) {
  let t = { transportadoras: [], cortes: [], feriados: [], ignorados: [] };
  return (
    (Array.isArray(e) ? e : []).forEach((n) => {
      n.tipo === "transportadora"
        ? t.transportadoras.push({ id: String(n.id), nome: n.nome, ativo: n.ativo })
        : n.tipo === "corte"
          ? t.cortes.push({
              transportadora_id: String(n.transportadora_id),
              filial: n.filial || null,
              hora_corte: n.hora_corte,
              tipo_regra: n.tipo_regra,
              dias_uteis: n.dias_uteis,
              ativo: n.ativo,
            })
          : n.tipo === "feriado"
            ? t.feriados.push({ data: n.data, ativo: n.ativo })
            : n.tipo === "ignorado" && t.ignorados.push({ codigo: n.codigo_cliente, ativo: n.ativo });
    }),
    t
  );
}
function H0(e) {
  return (
    String(e ?? "")
      .trim()
      .replace(/\D/g, "")
      .replace(/^0+/, "") || "0"
  );
}
function Pc(e, t, n) {
  let a = q0(O0(t));
  if (!a) return null;
  let r = e.transportadoras
      .filter((l) => l.ativo)
      .map((l) => ({ item: l, cfg: q0(O0(l.nome)) }))
      .filter((l) => l.cfg && (a.includes(l.cfg) || l.cfg.includes(a)))
      .sort((l, d) => d.cfg.length - l.cfg.length),
    i = r[0] && r[0].item;
  return (
    (i &&
      (e.cortes.find((l) => l.transportadora_id === i.id && l.ativo && l.filial === n) ||
        e.cortes.find((l) => l.transportadora_id === i.id && l.ativo && !l.filial))) ||
    null
  );
}
function Fg(e, t, n) {
  let a = Pc(e, t, n);
  if (!a) return "—";
  if (a.tipo_regra === "HORARIO") return String(a.hora_corte || "").slice(0, 5) || "—";
  if (a.tipo_regra === "DIAS_UTEIS") {
    let r = Number(a.dias_uteis) === 1;
    return `${a.dias_uteis} dia${r ? "" : "s"} ${r ? "útil" : "úteis"}`;
  }
  return "—";
}
function Pg(e) {
  let t = String(e || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  return t ? new Date(+t[1], +t[2] - 1, +t[3], 0, 0, 0) : null;
}
function al(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}
function pc(e, t) {
  if (!t || t.getDay() === 0 || t.getDay() === 6) return false;
  let n = al(t);
  return !e.feriados.some((a) => a.ativo !== false && String(a.data || "").slice(0, 10) === n);
}
function _g(e, t) {
  let n = new Date(t);
  do n.setDate(n.getDate() + 1);
  while (!pc(e, n));
  return n;
}
function Yy(e, t, n) {
  let a = new Date(t);
  for (let r = 0; r < n; r += 1) a = _g(e, a);
  return a;
}
function Lg(e, t) {
  let n = Pc(e, t.transporte, t.filial),
    a = Pg(t.data);
  if (!n || !a) return "";
  if (n.tipo_regra === "DIAS_UTEIS") return al(Yy(e, a, Math.max(0, Number(n.dias_uteis || 0))));
  if (!pc(e, a)) {
    for (; !pc(e, a);) a.setDate(a.getDate() + 1);
    return al(a);
  }
  let r = String(n.hora_corte || "00:00").slice(0, 5),
    i = String(t.hora || "00:00").slice(0, 5);
  return (i && r && i > r && (a = _g(e, a)), al(a));
}
function Ng(e, t, n) {
  let a = Pc(e, t.transporte, t.filial);
  if (!a) return "—";
  let r = Pg(t.data_limite || Lg(e, t));
  if (!r) return "—";
  let i = "18:18";
  a.tipo_regra === "HORARIO" && (i = String(a.hora_corte || "00:00").slice(0, 5));
  let [l, d] = i.split(":").map(Number);
  r.setHours(l, d, 0, 0);
  let u = r - n;
  if (u <= 0) return "ATRASADO";
  let p = Math.floor(u / 6e4),
    c = Math.floor(p / 1440),
    g = Math.floor((p % 1440) / 60);
  return c > 0 ? `${c}d ${g}h` : `${g}h ${p % 60}min`;
}
function wl(e, t) {
  let n = {
      transporte: t.transportadora,
      filial: t.filial,
      data: t.data_saida_entrada,
      hora: t.hora_saida,
      data_limite: t.data_limite,
    },
    a = Fg(e, t.transportadora, t.filial).toLowerCase(),
    r = a.includes("útil") || a.includes("uteis") || a.includes("úteis"),
    i = Lg(e, n);
  return { obj: n, dl: r ? i || t.data_limite || "" : t.data_limite || i || "" };
}
function Yu(e, t, n) {
  return n === "data_limite" ? wl(e, t).dl : t && t[n] !== null && t[n] !== void 0 ? t[n] : "";
}
function W0(e, t) {
  if (t === "data_saida_entrada" || t === "data_limite") {
    let n = new Date(e).getTime();
    return Number.isFinite(n) ? n : 0;
  }
  if (t === "volume" || t === "total_unidades") {
    let n = Number(String(e ?? "").replace(",", "."));
    return Number.isFinite(n) ? n : 0;
  }
  return String(e ?? "")
    .trim()
    .toLocaleLowerCase("pt-BR");
}
async function yi(e, t, n) {
  let a = [];
  for (; a.length < t;) {
    let r = Math.min(1e3, t - a.length),
      i = await Dt(`${e}&limit=${r}&offset=${(n || 0) + a.length}`),
      l = Array.isArray(i) ? i : [];
    if (((a = a.concat(l)), l.length < r)) break;
  }
  return a;
}
function Dg(e) {
  return { ...e, transportadora: gl(e.transportadora), hora_saida: String(e.hora_autorizacao || "").slice(0, 5) };
}
function fc() {
  let e = $0 ? `&data_saida_entrada=gte.${encodeURIComponent(`${$0}T00:00:00-03:00`)}` : "";
  return `via_leitor?select=${Fc}&filial=in.(0101,0102,1020)${e}&order=data_saida_entrada.asc,nf.asc,pedido.asc`;
}
function Tg(e, t) {
  let n = new Set(t.ignorados.filter((d) => d.ativo).map((d) => H0(d.codigo))),
    a = e.filter((d) => !n.size || !n.has(H0(d.cliente_codigo))),
    r = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    i = r.format(/* @__PURE__ */ new Date()),
    l = r.format(new Date(Date.now() - Qy * 864e5));
  return a.filter((d) => {
    let u = String(wl(t, d).dl || "").slice(0, 10);
    return /^\d{4}-\d{2}-\d{2}$/.test(u) ? u <= i && u >= l : true;
  });
}
var so = "",
  zg = { versao: "", via: null, canc: null, ts: 0, pendente: null };
async function Ig() {
  if (!so) return null;
  let e = zg;
  return e.canc && Date.now() - e.ts < 2e4
    ? e
    : (e.pendente ||
        (e.pendente = (async () => {
          let t = typeof AbortController < "u" ? new AbortController() : null,
            n = t ? setTimeout(() => t.abort(), 3e4) : null;
          try {
            let a = so.includes("?") ? "&" : "?",
              r = `${so}${a}action=dashboardCompartilhado&v=${encodeURIComponent(e.versao || "")}`,
              i = await fetch(r, t ? { signal: t.signal } : void 0);
            if (!i.ok) throw new Error(`HTTP ${i.status}`);
            let l = await i.json();
            if (!l || !l.ok) throw new Error((l && l.erro) || "resposta inválida");
            if (!Array.isArray(l.canc)) throw new Error("sem cancelamentos");
            if (l.via && Array.isArray(l.via.linhas) && Array.isArray(l.via.cfg))
              ((e.via = { linhas: l.via.linhas, cfg: l.via.cfg }), (e.versao = l.versao || ""));
            else if (!(l.igual && e.via)) throw new Error("sem Via Leitor");
            return ((e.canc = l.canc), (e.ts = Date.now()), e);
          } catch {
            return ((e.ts = 0), (e.canc = null), null);
          } finally {
            (n && clearTimeout(n), (e.pendente = null));
          }
        })()),
      e.pendente);
}
var Mg = {
  via: { versao: "", dados: null, ts: 0, pendente: null },
  canc: { versao: "", dados: null, ts: 0, pendente: null },
};
async function hl(e) {
  if (!so) return null;
  let t = Mg[e];
  return t.dados && Date.now() - t.ts < 15e3
    ? t.dados
    : (t.pendente ||
        (t.pendente = (async () => {
          let n = typeof AbortController < "u" ? new AbortController() : null,
            a = n ? setTimeout(() => n.abort(), 3e4) : null;
          try {
            let r = so.includes("?") ? "&" : "?",
              i = `${so}${r}action=tela&tipo=${e}&v=${encodeURIComponent((t.dados && t.versao) || "")}`,
              l = await fetch(i, n ? { signal: n.signal } : void 0);
            if (!l.ok) throw new Error(`HTTP ${l.status}`);
            let d = await l.json();
            if (!d || !d.ok) throw new Error((d && d.erro) || "resposta inválida");
            if (d.dados) ((t.dados = d.dados), (t.versao = d.versao || ""));
            else if (!(d.igual && t.dados)) throw new Error("sem dados");
            return ((t.ts = Date.now()), t.dados);
          } catch {
            return ((t.ts = 0), null);
          } finally {
            (a && clearTimeout(a), (t.pendente = null));
          }
        })()),
      t.pendente);
}
async function Zy(e) {
  if (!so) return false;
  ((Mg[e].ts = 0), (zg.ts = 0));
  try {
    let t = so.includes("?") ? "&" : "?",
      n = await fetch(`${so}${t}action=invalidar&tipo=${e}`);
    if (!n.ok) return false;
    let a = await n.json();
    return !!(a && a.ok);
  } catch {
    return false;
  }
}
var gn = { assin: "", ts: 0, linhas: null, cfgLinhas: null };
async function Ry() {
  let e = fc()
      .replace(`select=${Fc}`, "select=filial,nf,pedido")
      .replace("order=data_saida_entrada.asc,nf.asc,pedido.asc", "order=data_saida_entrada.desc,nf.desc,pedido.desc"),
    t = await Ig(),
    n = "";
  if (!t)
    try {
      n = await ya(e);
    } catch {
      n = "";
    }
  let a, r;
  t && t.via
    ? ((a = t.via.linhas), (r = t.via.cfg))
    : n && gn.linhas && gn.assin === n && Date.now() - gn.ts < 15 * 6e4
      ? ((a = gn.linhas), (r = gn.cfgLinhas))
      : (([a, r] = await Promise.all([yi(fc(), 1e4, 0), Dt("v_via_config_painel?select=*&limit=5000")])),
        (gn.assin = n),
        (gn.ts = Date.now()),
        (gn.linhas = a),
        (gn.cfgLinhas = r));
  let i = kg(r);
  if (!i.transportadoras.length) throw new Error("regras de corte indisponíveis (rode o bloco 11 do SQL)");
  let l = Tg(a.map(Dg), i),
    d = Date.now(),
    u = { bb: { total: 0, atrasados: 0 }, eq: { total: 0, atrasados: 0 } };
  return (
    l.forEach((p) => {
      let c = String(p.filial) === "1020" ? u.bb : u.eq,
        { obj: g, dl: f } = wl(i, p);
      ((c.total += 1), Ng(i, { ...g, data_limite: f }, d) === "ATRASADO" && (c.atrasados += 1));
    }),
    u
  );
}
var eb = { filial: "", transp: "", busca: "" };
function tb({ ativo: e }) {
  let [t, n] = (0, o.useState)([]),
    [a, r] = (0, o.useState)({ transportadoras: [], cortes: [], feriados: [], ignorados: [] }),
    [i, l] = (0, o.useState)({}),
    [d, u] = (0, o.useState)(0),
    [p, c] = (0, o.useState)(false),
    [g, f] = (0, o.useState)(eb),
    [x, w] = (0, o.useState)(""),
    [F, v] = (0, o.useState)(""),
    [m, h] = (0, o.useState)({ campo: "data_saida_entrada", dir: 1 }),
    [y, B] = (0, o.useState)(false),
    [k, L] = (0, o.useState)(""),
    [C, _] = (0, o.useState)(""),
    [q, E] = (0, o.useState)(""),
    [A, I] = (0, o.useState)(0),
    V = (0, o.useRef)({ t: 0, pagina: -1 }),
    D = (0, o.useRef)(0),
    O = (0, o.useCallback)(async () => {
      let S = D.current + 1;
      ((D.current = S), B(true), L(""));
      try {
        let te = fc(),
          re = await hl("via"),
          [be, pe, $] = re
            ? [re.linhas.slice(d * ga, d * ga + ga + 1), { ok: true, j: re.cfg }, re.obs || []]
            : await Promise.all([
                yi(te, ga + 1, d * ga),
                Dt("v_via_config_painel?select=*&limit=5000").then(
                  (se) => ({ ok: true, j: se }),
                  (se) => ({ ok: false, e: se }),
                ),
                yi("v_via_obs_painel?select=filial,nf,pedido,observacao&order=filial.asc,nf.asc", 2e4, 0).catch(
                  () => [],
                ),
              ]);
        if (S !== D.current) return;
        (c(be.length > ga),
          n(be.slice(0, ga).map(Dg)),
          pe.ok
            ? (r(kg(pe.j)), _(""))
            : _(
                `Não foi possível carregar as regras de corte (rode o bloco 11 do SQL no Supabase). ${pe.e.message || ""}`,
              ));
        let ee = {};
        ($.forEach((se) => {
          ((ee[`${se.filial}|${se.nf}|${se.pedido || ""}`] = se.observacao || ""),
            (ee[`${se.filial}|${se.nf}`] = se.observacao || ""));
        }),
          l(ee),
          E(
            /* @__PURE__ */ new Date().toLocaleTimeString("pt-BR", {
              timeZone: "America/Sao_Paulo",
              hour: "2-digit",
              minute: "2-digit",
            }),
          ),
          (V.current = { t: Date.now(), pagina: d }));
      } catch (te) {
        S === D.current && (n([]), L(`Não foi possível carregar os dados da VIEW Via Leitor. ${te.message || ""}`));
      } finally {
        S === D.current && B(false);
      }
    }, [d]);
  ((0, o.useEffect)(() => {
    e && ((V.current.pagina === d && Date.now() - V.current.t < 6e4) || O());
  }, [e, d, O]),
    (0, o.useEffect)(() => {
      if (!e) return;
      let S = setInterval(() => I((te) => te + 1), 6e4);
      return () => clearInterval(S);
    }, [e]));
  let H = (0, o.useMemo)(() => [...new Set(t.map((S) => S.transportadora).filter(Boolean))].sort(), [t]),
    M = (0, o.useMemo)(() => {
      let S = Tg(t, a);
      (g.filial && (S = S.filter((re) => g.filial.split(",").includes(String(re.filial)))),
        g.transp && (S = S.filter((re) => gl(re.transportadora) === gl(g.transp))));
      let te = g.busca.trim().toLowerCase();
      if (
        (te &&
          (S = S.filter((re) =>
            `${re.nf} ${re.pedido} ${re.cliente_codigo} ${re.transportadora}`.toLowerCase().includes(te),
          )),
        x && F)
      ) {
        let re = F.trim().toLocaleLowerCase("pt-BR");
        S = S.filter((be) =>
          String(Yu(a, be, x))
            .toLocaleLowerCase("pt-BR")
            .includes(re),
        );
      }
      return (
        m.campo &&
          (S = [...S].sort((re, be) => {
            let pe = W0(Yu(a, re, m.campo), m.campo),
              $ = W0(Yu(a, be, m.campo), m.campo);
            return (pe < $ ? -1 : pe > $ ? 1 : 0) * m.dir;
          })),
        S
      );
    }, [t, a, g, x, F, m, A]),
    Q = Date.now(),
    Y = (S) => (te) => f((re) => ({ ...re, [S]: te.target.value })),
    de = (S) => h((te) => (te.campo === S ? { campo: S, dir: -te.dir } : { campo: S, dir: 1 })),
    ce = () => {
      (w(""), v(""), h({ campo: "data_saida_entrada", dir: 1 }));
    },
    W = [
      ["", ""],
      ["filial", "FILIAL"],
      ["nf", "NF"],
      ["pedido", "PEDIDO"],
      ["cliente_codigo", "CLIENTE"],
      ["transportadora", "TRANSPORTE"],
      ["total_unidades", "QTD."],
      ["volume", "VOLUME"],
      ["data_saida_entrada", "DATA FAT."],
      ["", "HORÁRIO AUT."],
      ["", "CORTE"],
      ["data_limite", "DATA LIMITE"],
      ["", "TEMPO RESTANTE"],
      ["", "OBSERVAÇÃO"],
    ];
  return o.default.createElement(
    "div",
    { className: "vlg" },
    o.default.createElement("style", null, Jy),
    o.default.createElement(
      "div",
      { className: "vlg-toolbar" },
      o.default.createElement(
        "div",
        { className: "vlg-title" },
        o.default.createElement("strong", null, "Via Leitor — Expedição"),
        o.default.createElement(
          "span",
          null,
          "Somente pendentes com data limite hoje ou anterior · VIEW Supabase · somente leitura",
          q ? ` · atualizado ${q}` : "",
        ),
      ),
      o.default.createElement(
        "div",
        { className: "vlg-actions" },
        o.default.createElement("label", null, "VISUALIZAR"),
        o.default.createElement(
          "select",
          { value: "pendentes", onChange: () => {} },
          o.default.createElement("option", { value: "pendentes" }, "Pendentes de envio — últimos 10 dias"),
        ),
        o.default.createElement(
          "button",
          { type: "button", className: "vlg-btn", disabled: y, onClick: () => (d === 0 ? O() : u(0)) },
          "↻ Atualizar",
        ),
      ),
    ),
    o.default.createElement(
      "div",
      { className: "vlg-filtros" },
      o.default.createElement(
        "div",
        { className: "vlg-campo vlg-f-filial" },
        o.default.createElement("label", null, "FILIAL"),
        o.default.createElement(
          "select",
          { value: g.filial, onChange: Y("filial") },
          o.default.createElement("option", { value: "" }, "Todas"),
          o.default.createElement("option", { value: "1020" }, "BB Baterias · 1020"),
          o.default.createElement("option", { value: "0101,0102" }, "Equipatech · 0101/0102"),
          o.default.createElement("option", { value: "0101" }, "0101"),
          o.default.createElement("option", { value: "0102" }, "0102"),
        ),
      ),
      o.default.createElement(
        "div",
        { className: "vlg-campo vlg-f-transp" },
        o.default.createElement("label", null, "TRANSPORTADORA"),
        o.default.createElement(
          "select",
          { value: g.transp, onChange: Y("transp") },
          o.default.createElement("option", { value: "" }, "Todas"),
          H.map((S) => o.default.createElement("option", { key: S, value: S }, S)),
        ),
      ),
      o.default.createElement(
        "div",
        { className: "vlg-campo vlg-f-busca" },
        o.default.createElement("label", null, "PESQUISAR"),
        o.default.createElement("input", {
          value: g.busca,
          onChange: Y("busca"),
          placeholder: "NF, pedido, cliente ou transportadora",
        }),
      ),
      o.default.createElement(
        "div",
        { className: "vlg-campo vlg-f-col" },
        o.default.createElement("label", null, "FILTRAR COLUNA"),
        o.default.createElement(
          "select",
          { value: x, onChange: (S) => w(S.target.value) },
          o.default.createElement("option", { value: "" }, "Selecione..."),
          Xy.map(([S, te]) => o.default.createElement("option", { key: S, value: S }, te)),
        ),
      ),
      o.default.createElement(
        "div",
        { className: "vlg-campo vlg-f-col" },
        o.default.createElement("label", null, "CONTÉM"),
        o.default.createElement("input", {
          value: F,
          onChange: (S) => v(S.target.value),
          placeholder: "Digite para filtrar",
          autoComplete: "off",
        }),
      ),
      o.default.createElement("button", { type: "button", className: "vlg-btn", onClick: ce }, "Limpar"),
      o.default.createElement(
        "span",
        { className: "vlg-hint" },
        "Clique no cabeçalho para ordenar · padrão: mais antigos primeiro",
      ),
      o.default.createElement(
        "div",
        { className: "vlg-total" },
        o.default.createElement("span", null, "PENDENTES"),
        o.default.createElement("strong", null, M.length),
      ),
    ),
    k && o.default.createElement("div", { className: "vlg-erro" }, k),
    C && o.default.createElement("div", { className: "vlg-aviso" }, C),
    o.default.createElement(
      "div",
      { className: "vlg-grid" },
      M.length === 0
        ? o.default.createElement(
            "div",
            { className: "vlg-vazio" },
            y ? "Carregando pendentes do Via Leitor..." : "Nenhum pedido pendente de envio encontrado neste filtro.",
          )
        : o.default.createElement(
            "table",
            { className: "vlg-table" },
            o.default.createElement(
              "thead",
              null,
              o.default.createElement(
                "tr",
                null,
                W.map(([S, te], re) =>
                  o.default.createElement(
                    "th",
                    {
                      key: `${S}-${te}-${re}`,
                      className: S ? `vlg-ord${m.campo === S ? (m.dir === 1 ? " vlg-asc" : " vlg-desc") : ""}` : "",
                      onClick: S ? () => de(S) : void 0,
                    },
                    te,
                  ),
                ),
              ),
            ),
            o.default.createElement(
              "tbody",
              null,
              M.map((S) => {
                let { obj: te, dl: re } = wl(a, S),
                  be = Ng(a, { ...te, data_limite: re }, Q),
                  pe = String(be).toUpperCase() === "ATRASADO",
                  $ = i[`${S.filial}|${S.nf}|${S.pedido || ""}`] || i[`${S.filial}|${S.nf}`] || "";
                return o.default.createElement(
                  "tr",
                  { key: `${S.filial}|${S.nf}|${S.pedido}` },
                  o.default.createElement(
                    "td",
                    { className: "vlg-st" },
                    o.default.createElement("span", {
                      className: `vlg-dot ${pe ? "late" : "ok"}`,
                      title: pe ? "Fora do prazo" : "Dentro do prazo",
                    }),
                  ),
                  o.default.createElement("td", null, S.filial),
                  o.default.createElement("td", { className: "vlg-mono" }, S.nf),
                  o.default.createElement("td", { className: "vlg-mono" }, S.pedido),
                  o.default.createElement("td", { className: "vlg-mono" }, S.cliente_codigo || "—"),
                  o.default.createElement("td", null, S.transportadora || "—"),
                  o.default.createElement(
                    "td",
                    { className: "vlg-mono" },
                    S.total_unidades === null || S.total_unidades === void 0 ? "—" : S.total_unidades,
                  ),
                  o.default.createElement(
                    "td",
                    { className: "vlg-mono" },
                    S.volume === null || S.volume === void 0 ? "—" : S.volume,
                  ),
                  o.default.createElement("td", null, j0(S.data_saida_entrada)),
                  o.default.createElement("td", { className: "vlg-mono" }, S.hora_saida || "—"),
                  o.default.createElement("td", { className: "vlg-mono" }, Fg(a, S.transportadora, S.filial)),
                  o.default.createElement("td", { className: "vlg-mono" }, re ? j0(re) : "—"),
                  o.default.createElement("td", { className: "vlg-mono" }, be),
                  o.default.createElement(
                    "td",
                    { className: "vlg-obs" },
                    o.default.createElement("span", { title: $ }, $ || "—"),
                  ),
                );
              }),
            ),
          ),
    ),
    o.default.createElement(
      "div",
      { className: "vlg-pager" },
      o.default.createElement(
        "button",
        { type: "button", disabled: d === 0 || y, onClick: () => u((S) => Math.max(0, S - 1)) },
        "‹ Anterior",
      ),
      o.default.createElement("span", null, "Página ", d + 1, " · XMLS"),
      o.default.createElement(
        "button",
        { type: "button", disabled: !p || y, onClick: () => u((S) => S + 1) },
        "Próxima ›",
      ),
    ),
    o.default.createElement(
      "div",
      { className: "vlg-legenda" },
      o.default.createElement(
        "span",
        null,
        o.default.createElement("i", { className: "vlg-dot ok" }),
        "Dentro do prazo",
      ),
      o.default.createElement(
        "span",
        null,
        o.default.createElement("i", { className: "vlg-dot late" }),
        "Fora do prazo",
      ),
    ),
  );
}
var hi = ["0101", "0102", "0104", "0105", "1020", "1030", "1040"],
  ob = [
    "Bloqueado na UF",
    "Cancelado no ML",
    "ICMS",
    "Desistência",
    "Produto com Defeito",
    "Endereço Insuficiente",
    "Pedido Duplicado",
    "Cancelado no Magalu",
    "CST",
    "Alterar o Transporte",
    "Erro de Cadastro",
    "Extravio",
    "Erro no CEP",
    "Teste",
    "Faturar com outro serial",
    "Outro",
  ],
  ci = "Aguardando CNT",
  nb = ["0104", "0105", "1030", "1040"],
  cr = "Aguardando Cancelamento",
  vn = "Aguardando Pagto BFT",
  Yt = "Cancelado",
  $g = "Aguardando Inutilização",
  Og = "Inutilizado",
  ab = 1440 * 60 * 1e3;
function rb(e) {
  let t = e.status === Og;
  return {
    ...e,
    tipo: "inut",
    rawId: e.id,
    id: `i${e.id}`,
    nf: "",
    nf_norm: "",
    status: t ? Yt : $g,
    cancelado_em: e.inutilizado_em,
    data_cancelamento: e.data_inutilizacao,
  };
}
var U0 = 30,
  rl = 200;
function ib(e) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date(Date.now() - e * 864e5));
}
async function sb() {
  let e = (a) => Number(String(a).split("|")[0]) || 0,
    [t, n] = await Promise.all([
      ya("v_cancelamentos_painel?select=id&order=id.desc"),
      ya(`v_cancelamentos_painel?select=id&status=eq.${encodeURIComponent(Yt)}&order=id.desc`),
    ]);
  return { total: e(t), canc: e(n) };
}
async function K0({ busca: e, antesDoId: t }) {
  let n = ["select=*", `status=eq.${encodeURIComponent(Yt)}`],
    a = String(e || "")
      .trim()
      .replace(/[,*()%]/g, "");
  if (a) {
    let i = encodeURIComponent(`*${a}*`);
    n.push(`or=(pedido.ilike.${i},nf.ilike.${i},solicitante.ilike.${i})`);
  }
  (t && n.push(`id=lt.${Number(t)}`), n.push("order=id.desc", `limit=${rl}`));
  let r = await Dt(`v_cancelamentos_painel?${n.join("&")}`);
  return Array.isArray(r) ? r : [];
}
async function lb() {
  let e = "v_cancelamentos_painel?select=id&order=id.desc",
    t = (a) => `${e}&status=eq.${encodeURIComponent(a)}`;
  return (
    await Promise.all([ya("v_cancelamentos_painel?select=id,status&order=id.desc"), ya(t(Yt)), ya(t(vn)), ya(t(cr))])
  ).join("#");
}
var Rs = ({ d: e }) =>
    o.default.createElement(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
      },
      e.map((t) => o.default.createElement("path", { key: t, d: t })),
    ),
  V0 = ["M20 6 9 17l-5-5"],
  db = ["M12 20h9", "M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"],
  ub = ["M3 6h18", "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6", "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"],
  cb = `
.cnl{font-family:Inter,'Nunito',Arial,sans-serif;color:var(--txt)}
.cnl *{box-sizing:border-box}
.cnl-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px}
.cnl-head h2{margin:0;font-size:22px;font-weight:800;letter-spacing:-.01em;color:var(--txt)}.cnl-head p{margin:3px 0 0;font-size:11px;color:var(--txt-muted)}
.cnl-head h2{margin:0;font-size:20px;color:var(--txt)}.cnl-head p{margin:3px 0 0;font-size:11px;color:var(--txt-muted)}
.cnl-tabs{display:flex;gap:4px;border-bottom:1px solid var(--bd);margin-bottom:16px;flex-wrap:wrap}
.cnl-tab{display:inline-flex;align-items:center;gap:8px;border:0;background:none;padding:11px 16px;font-size:13px;font-weight:700;color:var(--txt-muted);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;transition:color .15s,border-color .15s}
.cnl-tab:hover{color:var(--txt)}
.cnl-tab.on{color:var(--accent-tx);border-bottom-color:var(--accent)}
.cnl-badge{display:inline-flex;align-items:center;justify-content:center;min-width:22px;height:20px;padding:0 7px;margin:0;border-radius:999px;background:var(--amber-bg);color:var(--amber-tx);border:1px solid var(--amber-bd);font-size:11px;font-weight:800;line-height:1}
.cnl-badge.ok{background:var(--green-bg);color:var(--green-tx);border-color:var(--green-bd)}
.cnl-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:16px}
.cnl-stat{--k:var(--accent);position:relative;display:flex;flex-direction:column-reverse;gap:4px;background:var(--surf);border:1px solid var(--bd);border-radius:12px;padding:14px 16px 14px 20px;text-align:left;box-shadow:0 1px 2px rgba(15,23,42,.04);overflow:hidden}
.cnl-stat::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--k)}
.cnl-stat b{display:block;font-size:28px;line-height:1.1;font-weight:800;color:var(--k);font-variant-numeric:tabular-nums}.cnl-stat span{font-size:11px;font-weight:600;color:var(--txt-muted)}
.cnl-card{background:var(--surf);border:1px solid var(--bd);border-radius:12px;padding:18px;margin-bottom:16px;box-shadow:0 1px 2px rgba(15,23,42,.04)}
.cnl-card h3{margin:0 0 14px;font-size:15px;font-weight:800;color:var(--txt);display:flex;align-items:center;gap:8px}
.cnl-form{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.cnl-campo label{display:block;font-size:10px;font-weight:700;letter-spacing:.04em;color:var(--txt-2);margin-bottom:5px;text-transform:uppercase}
.cnl-campo input,.cnl-campo select{width:100%;height:36px;border:1px solid var(--bd-strong);border-radius:8px;padding:0 10px;font-size:13px;background:var(--surf);color:var(--txt);transition:border-color .15s,box-shadow .15s}
.cnl-campo input:focus,.cnl-campo select:focus,.cnl-sel:focus,.cnl-busca:focus{outline:0;border-color:var(--accent);box-shadow:0 0 0 3px rgba(var(--accent-rgb),.15)}
.cnl-acoes{grid-column:1/-1;display:flex;gap:8px}
.cnl-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:36px;padding:0 16px;border:1px solid var(--bd-strong);background:var(--surf);border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;color:var(--txt);transition:background .15s,border-color .15s,filter .15s}
.cnl-btn:hover:not(:disabled){filter:brightness(.96);border-color:var(--txt-muted)}
.cnl-btn.pri{background:var(--accent);border-color:var(--accent);color:#fff;flex:1}
.cnl-btn.pri:hover:not(:disabled){filter:brightness(1.08);border-color:var(--accent)}
.cnl-btn.ok{background:var(--green-bg);border-color:var(--green-bd);color:var(--green-tx)}.cnl-btn.amb{background:var(--amber-bg);border-color:var(--amber-bd);color:var(--amber-tx)}
.cnl-btn.red{background:var(--red-bg);border-color:var(--red-bd);color:var(--red-tx)}.cnl-btn.sm{height:28px;padding:0 11px;font-size:11px;border-radius:7px}
.cnl-btn.go{background:#198754;border-color:#198754;color:#fff}.cnl-btn.go:hover:not(:disabled){filter:brightness(1.1);border-color:#198754}
.cnl-btn.ico{width:28px;padding:0;background:transparent;border-color:transparent;color:var(--txt-muted)}
.cnl-btn.ico:hover:not(:disabled){background:var(--surf-alt);border-color:var(--bd);color:var(--txt);filter:none}
.cnl-btn.ico.red{background:transparent;border-color:transparent;color:var(--txt-muted)}.cnl-btn.ico.red:hover:not(:disabled){background:var(--red-bg);border-color:var(--red-bd);color:var(--red-tx)}
.cnl-btn svg{width:14px;height:14px;flex:none}
.cnl-sep{width:1px;height:18px;background:var(--bd);margin:0 4px}
.cnl-acao{display:inline-flex;align-items:center;gap:6px;justify-content:flex-end}
.cnl-btn:disabled{opacity:.5;cursor:default}
.cnl-filtros{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:14px}
.cnl-filtros small{font-size:10px;font-weight:700;letter-spacing:.05em;color:var(--txt-muted);text-transform:uppercase;margin-right:2px}
.cnl-grp{display:inline-flex;align-items:center;gap:6px}.cnl-grp{margin-left:6px}
.cnl-sel{border:1px solid var(--bd-strong);background:var(--surf);color:var(--txt);border-radius:8px;padding:7px 10px;font-size:12px;font-weight:600;height:34px}
.cnl-chip{border:1px solid var(--bd-strong);background:var(--surf);border-radius:999px;padding:6px 14px;font-size:12px;font-weight:600;cursor:pointer;color:var(--txt-2);transition:background .15s,border-color .15s}
.cnl-chip:hover{border-color:var(--txt-muted)}
.cnl-chip.on{background:var(--accent);border-color:var(--accent);color:#fff}
.cnl-busca{width:100%;height:36px;border:1px solid var(--bd-strong);border-radius:8px;padding:0 12px;font-size:13px;margin-bottom:12px;background:var(--surf);color:var(--txt)}
.cnl-box{overflow:auto;max-height:calc(100vh - 380px);min-height:80px;border:1px solid var(--bd);border-radius:10px}
.cnl-table{width:100%;border-collapse:separate;border-spacing:0;font-size:12px;white-space:nowrap}
.cnl-table th{position:sticky;top:0;z-index:1;background:var(--surf-head);text-align:left;padding:10px 14px;font-size:10px;font-weight:700;letter-spacing:.06em;color:var(--txt-muted);text-transform:uppercase;border-bottom:1px solid var(--bd)}
.cnl-table td{padding:12px 14px;border-bottom:1px solid var(--bd);vertical-align:middle;color:var(--txt)}
.cnl-table tbody tr{transition:background .12s}.cnl-table tbody tr:hover{background:var(--surf-alt)}.cnl-table tbody tr:last-child td{border-bottom:0}
.cnl-fil{display:inline-block;padding:2px 8px;border-radius:6px;background:var(--surf-alt);border:1px solid var(--bd);font-size:11px;font-weight:700;font-family:'JetBrains Mono',Consolas,monospace}
.cnl-mono{font-family:'JetBrains Mono',Consolas,monospace}
.cnl-st,.cnl-prazo{display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:700;white-space:nowrap}
.cnl-st::before,.cnl-prazo::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor;flex:none}
.cnl-st.ok{background:var(--red-bg);color:var(--red-tx)}.cnl-st.cnt{background:var(--blue-bg);color:var(--blue-tx)}.cnl-st.bft{background:var(--purple-bg);color:var(--purple-tx)}.cnl-st.ag{background:var(--orange-bg);color:var(--orange-tx)}.cnl-dica{grid-column:1/-1;font-size:11px;color:var(--txt-muted);margin-top:-2px}
.cnl-aviso{grid-column:1/-1;background:var(--amber-bg);border:1px solid var(--amber-bd);color:var(--amber-tx);border-radius:6px;padding:7px 10px;font-size:11px;font-weight:700}
.cnl-okbox{grid-column:1/-1;background:var(--green-bg);border:1px solid var(--green-bd);color:var(--green-tx);border-radius:6px;padding:7px 10px;font-size:11px;font-weight:700}
.cnl-info{grid-column:1/-1;font-size:11px;color:var(--txt-muted)}
.cnl-atencao{color:var(--amber-tx);font-weight:900;font-size:15px;line-height:1;margin-left:6px;cursor:help}
.cnl-atmot{font-size:10px;color:var(--amber-tx);white-space:normal;max-width:340px;margin-top:2px;font-family:Inter,Arial,sans-serif}
.cnl-link{background:none;border:0;color:var(--accent-tx);font-size:10px;font-weight:800;cursor:pointer;padding:0;margin-top:3px}
.cnl-lista{max-height:320px;overflow:auto;border:1px solid var(--bd);border-radius:6px;margin-bottom:10px}
.cnl-lista label{display:flex;align-items:center;gap:8px;padding:6px 10px;border-bottom:1px solid var(--bd);font-size:12px;cursor:pointer}
.cnl-lista label small{color:var(--txt-muted);font-size:10px;margin-left:auto}
.cnl-prazo.ok{background:var(--green-bg);color:var(--green-tx)}.cnl-prazo.aviso{background:var(--amber-bg);color:var(--amber-tx)}.cnl-prazo.atraso{background:var(--red-bg);color:var(--red-tx)}
.cnl-vazio{padding:30px;text-align:center;color:var(--txt-muted);font-size:12px}
.cnl-erro{background:var(--red-bg);color:var(--red-tx);border:1px solid var(--red-bd);border-radius:6px;padding:10px 12px;font-size:12px;font-weight:700;margin-bottom:9px}
.cnl-toast{position:fixed;bottom:22px;right:22px;z-index:9999;padding:11px 18px;border-radius:8px;color:#fff;font-size:12px;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,.25)}
.cnl-toast.ok{background:#198754}.cnl-toast.err{background:#d92d20}
.cnl-modal{position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:9998;display:flex;align-items:center;justify-content:center;padding:16px}
.cnl-modal>div{background:var(--surf);border-radius:10px;padding:20px;width:100%;max-width:520px}
.cnl-modal h4{margin:0 0 8px;font-size:15px}.cnl-modal p{margin:0 0 14px;font-size:12px;color:var(--txt-2)}
.cnl-modal textarea{width:100%;height:150px;border:1px solid var(--bd-strong);border-radius:6px;padding:8px;font:11px 'JetBrains Mono',Consolas,monospace;margin-bottom:12px}
.cnl-modal .cnl-linha{display:flex;gap:8px;justify-content:flex-end}
.cnl-modal textarea{background:var(--surf);color:var(--txt)}
.cnl-modal .cnl-bftarea{height:110px;font:600 13px Inter,Arial,sans-serif}
.cnl-bftcfg{border-top:1px solid var(--bd);padding-top:10px}
.cnl-bftcfg label{display:block;font-size:10px;font-weight:800;color:var(--txt-2);margin:0 0 4px}
.cnl-bftcfg small{display:block;font-size:10px;color:var(--txt-muted);line-height:1.4}
.cnl-btn.cntb{background:var(--blue-bg);color:var(--blue-tx);border-color:transparent}
.cnl-btn.bftmsg{background:var(--purple-bg,#ede9fe);color:var(--purple-tx,#6d28d9);border-color:transparent}
@media(max-width:900px){.cnl-form{grid-template-columns:1fr 1fr}.cnl-stats{grid-template-columns:1fr 1fr}}
`;
function Zu() {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(/* @__PURE__ */ new Date());
}
function Ru(e) {
  let t = String(e || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  return t ? `${t[3]}/${t[2]}/${t[1]}` : "—";
}
function pb(e) {
  let t = String(e || "")
    .trim()
    .match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  return t ? `${t[3]}-${t[2].padStart(2, "0")}-${t[1].padStart(2, "0")}` : "";
}
var fb = 3600 * 1e3;
function ka(e) {
  if (!e) return null;
  let t = String(e)
      .trim()
      .replace(" ", "T")
      .replace(/(\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)([+-]\d{2})$/, "$1$2:00"),
    n = new Date(t);
  return Number.isNaN(n.getTime()) ? null : n;
}
function G0(e) {
  let t = ka(e);
  return t
    ? new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
        .format(t)
        .replace(",", "")
    : "—";
}
function ec(e) {
  let t = Math.max(0, Math.round(e / 6e4));
  if (t < 60) return `${t} min`;
  let n = Math.floor(t / 60);
  return n < 24 ? (t % 60 ? `${n}h ${t % 60}min` : `${n}h`) : `${Math.floor(n / 24)}d ${n % 24}h`;
}
function qg(e) {
  let t = ka(e.solicitado_em);
  return t ? ka(e.prazo_em) || new Date(t.getTime() + (e.tipo === "inut" ? ab : fb)) : null;
}
function mc(e, t) {
  let n = qg(e);
  return !!n && e.status !== Yt && t > n.getTime();
}
function mb({ c: e, agora: t }) {
  let n = ka(e.solicitado_em),
    a = qg(e);
  if (!n || !a) return o.default.createElement("span", { style: { color: "#8a97a0" } }, "—");
  if (e.status === Yt) {
    let i = ka(e.cancelado_em);
    if (!i) return o.default.createElement("span", { style: { color: "#8a97a0" } }, "—");
    let l = i.getTime() <= a.getTime();
    return o.default.createElement(
      "span",
      { className: `cnl-prazo ${l ? "ok" : "atraso"}` },
      l ? "✔" : "⏰",
      " ",
      ec(i - n),
      " ",
      l ? "(no prazo)" : "(fora do prazo)",
    );
  }
  let r = a.getTime() - t;
  return r >= 0
    ? o.default.createElement("span", { className: `cnl-prazo ${r < 15 * 6e4 ? "aviso" : "ok"}` }, "faltam ", ec(r))
    : o.default.createElement("span", { className: "cnl-prazo atraso" }, "⏰ atrasado ", ec(-r));
}
var jg = "bbdi_canc_bft_v1",
  il = {
    financeiro: "Jessica Kerber - Grupo BBDI",
    modelo: `Excluir NF: {nf} Pedido: {pedido} - {motivo}
esse é BFT {financeiro}`,
  };
function gb() {
  try {
    let e = JSON.parse(localStorage.getItem(jg) || "null");
    if (e && typeof e == "object")
      return {
        financeiro: typeof e.financeiro == "string" ? e.financeiro : il.financeiro,
        modelo: typeof e.modelo == "string" && e.modelo.trim() ? e.modelo : il.modelo,
      };
  } catch {}
  return { ...il };
}
function Q0(e) {
  try {
    localStorage.setItem(jg, JSON.stringify(e));
  } catch {}
}
function tc(e, t) {
  let n = String(e.nf || "").trim(),
    a = /^\d+$/.test(n) ? n.padStart(9, "0") : n,
    r = String(t.financeiro || "")
      .split(/[\n,;]+/)
      .map((i) => i.trim())
      .filter(Boolean)
      .join(" ");
  return String(t.modelo || il.modelo)
    .split("{nf}")
    .join(a)
    .split("{pedido}")
    .join(String(e.pedido || "").trim())
    .split("{motivo}")
    .join(String(e.motivo || "").trim())
    .split("{filial}")
    .join(String(e.filial || "").trim())
    .split("{solicitante}")
    .join(String(e.solicitante || "").trim())
    .split("{financeiro}")
    .join(r);
}
async function Hg(e) {
  try {
    return (await navigator.clipboard.writeText(e), true);
  } catch {
    try {
      let n = document.createElement("textarea");
      ((n.value = e), (n.style.position = "fixed"), (n.style.opacity = "0"), document.body.appendChild(n), n.select());
      let a = document.execCommand("copy");
      return (document.body.removeChild(n), a);
    } catch {
      return false;
    }
  }
}
async function hb() {
  let e = await Ig(),
    t =
      e && e.canc
        ? e.canc
        : await yi(
            "v_cancelamentos_painel?select=id,status,solicitado_em,prazo_em&status=neq.Cancelado&order=id.desc",
            2e4,
            0,
          ),
    n = Date.now(),
    a = { total: 0, atrasados: 0, cnt: 0, cntAtr: 0, ag: 0, agAtr: 0, bft: 0 };
  return (
    t.forEach((r) => {
      let i = mc(r, n);
      ((a.total += 1),
        i && (a.atrasados += 1),
        r.status === ci
          ? ((a.cnt += 1), i && (a.cntAtr += 1))
          : r.status === vn
            ? (a.bft += 1)
            : ((a.ag += 1), i && (a.agAtr += 1)));
    }),
    a
  );
}
async function Yo(e, t) {
  let n = await fetch(`${Ac}/rest/v1/rpc/${e}`, {
    method: "POST",
    headers: { ...kc(), "Content-Type": "application/json" },
    body: JSON.stringify(t),
  });
  if (!n.ok) {
    let r = `HTTP ${n.status}`;
    try {
      ((r = (await n.json()).message || r), n.status === 404 && (r += " — rode os blocos 12 a 16 do SQL no Supabase."));
    } catch {}
    throw new Error(r);
  }
  let a = await n.text();
  return a ? JSON.parse(a) : null;
}
function vb({ status: e }) {
  return o.default.createElement(
    "span",
    { className: `cnl-st ${e === Yt ? "ok" : e === vn ? "bft" : e === cr || e === $g ? "ag" : "cnt"}` },
    e || "—",
  );
}
var X0 = { data: "", filial: "", pedido: "", nf: "", solicitante: "", motivo: "", inut: false };
var NT_URL = "https://flvvhthiepgkgnnzrjmj.supabase.co",
  NT_KEY = "sb_publishable_T3QCEpguQ4thZhUFDex70A_Kf9lMVYD";
async function NtResumo() {
  if (!NT_KEY || String(NT_KEY).startsWith("COLE_AQUI")) throw new Error("chave pública ausente");
  let h = { apikey: NT_KEY };
  String(NT_KEY).startsWith("eyJ") && (h.Authorization = `Bearer ${NT_KEY}`);
  let r = await fetch(`${NT_URL}/rest/v1/v_nfe_trancadas?select=status_classe,emissao_pedido&limit=5000`, {
    headers: h,
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  let j = await r.json();
  if (!Array.isArray(j)) throw new Error("resposta inesperada");
  let n = Date.now();
  return {
    total: j.length,
    naoAut: j.filter((x) => x.status_classe === "NAO_AUTORIZADO").length,
    naoTrans: j.filter((x) => x.status_classe === "NAO_TRANSMITIDO").length,
    mais2: j.filter((x) => {
      let t = Date.parse(String(x.emissao_pedido || "").slice(0, 10) + "T00:00:00-03:00");
      return Number.isFinite(t) && n - t >= 2 * 864e5;
    }).length,
  };
}
function NtDataHora(e) {
  let t = e ? new Date(e) : null;
  return t && !Number.isNaN(t.getTime())
    ? new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
        .format(t)
        .replace(",", "")
    : "";
}
function NtLinha(e) {
  let t = String(e.status_classe || ""),
    n =
      t === "NAO_AUTORIZADO"
        ? "Não autorizada"
        : t === "NAO_TRANSMITIDO"
          ? "Não transmitida"
          : String(e.status_nfe || t || "Sem status"),
    a = String(e.emissao_pedido || "").slice(0, 10),
    r = a ? Date.parse(a + "T00:00:00-03:00") : NaN,
    i = Number.isFinite(r) ? Math.max(0, Math.floor((Date.now() - r) / 864e5)) : null;
  return {
    status: n,
    statusTipo: t === "NAO_AUTORIZADO" ? "vermelho" : t === "NAO_TRANSMITIDO" ? "laranja" : "cinza",
    filial: String(e.filial || ""),
    nf: String(e.numero || "").replace(/^0+(?=\d)/, ""),
    serie: String(e.serie || ""),
    pedido: String(e.pedido || ""),
    cliente: String(e.cliente || ""),
    transportadora: String(e.transportadora || ""),
    emissao: a ? Ru(a) : "",
    dias: i,
    chave: String(e.chave_nfe || ""),
    horaAut: String(e.hora_autorizacao || ""),
    detectada: NtDataHora(e.primeira_vez_em),
    numeroRaw: String(e.numero || ""),
    obs: String(e.observacao || ""),
  };
}
function NfeTrancadasTela({ ativo: e }) {
  let [t, n] = (0, o.useState)([]),
    [a, r] = (0, o.useState)(false),
    [i, l] = (0, o.useState)(""),
    [d, u] = (0, o.useState)(""),
    [p, c] = (0, o.useState)(""),
    [g, f] = (0, o.useState)({}),
    [ed, setEd] = (0, o.useState)(null),
    edRef = (0, o.useRef)(null);
  edRef.current = ed;
  let x = (0, o.useCallback)(async () => {
    (r(true), l(""));
    try {
      if (!NT_KEY || NT_KEY.startsWith("COLE_AQUI"))
        throw new Error("falta colar a chave pública (publishable) do Supabase no index.html, na linha NT_KEY.");
      let w = { apikey: NT_KEY };
      String(NT_KEY).startsWith("eyJ") && (w.Authorization = `Bearer ${NT_KEY}`);
      let F = await fetch(`${NT_URL}/rest/v1/v_nfe_trancadas?select=*&order=emissao_pedido.asc.nullsfirst&limit=5000`, {
        headers: w,
        cache: "no-store",
      });
      if (!F.ok) {
        let m = "";
        try {
          let h3 = await F.json();
          m = [h3.code, h3.message, h3.hint].filter(Boolean).join(" — ");
        } catch {}
        throw new Error(
          `HTTP ${F.status}${m ? ": " + m : ""}${F.status === 404 ? " — rode o SQL supabase_nfe_trancadas.sql no Supabase." : ""}`,
        );
      }
      let v = await F.json();
      (n(Array.isArray(v) ? v.map(NtLinha) : []), u(/* @__PURE__ */ new Date().toLocaleTimeString("pt-BR")));
    } catch (w) {
      l(`Não foi possível carregar as NFe trancadas. ${w.message || w}`);
    } finally {
      r(false);
    }
  }, []);
  (0, o.useEffect)(() => {
    if (!e) return;
    x();
    let w = setInterval(() => {
      lr() && !edRef.current && x();
    }, 3e5);
    return () => clearInterval(w);
  }, [e, x]);
  let ntSalvar = async (w) => {
      if (!ed || ed.salvando) return;
      let z = ed.txt;
      setEd({ ...ed, salvando: true, erro: "" });
      try {
        let hd = { apikey: NT_KEY, "Content-Type": "application/json" };
        String(NT_KEY).startsWith("eyJ") && (hd.Authorization = `Bearer ${NT_KEY}`);
        let rs = await fetch(`${NT_URL}/rest/v1/rpc/nfe_trancada_observacao`, {
          method: "POST",
          headers: hd,
          body: JSON.stringify({ p_filial: w.filial, p_numero: w.numeroRaw, p_serie: w.serie, p_observacao: z }),
        });
        if (!rs.ok) {
          let m = "";
          try {
            let j = await rs.json();
            m = [j.code, j.message, j.hint].filter(Boolean).join(" — ");
          } catch {}
          throw new Error(
            `HTTP ${rs.status}${m ? ": " + m : ""}${rs.status === 404 ? " — rode o SQL supabase_nfe_trancadas.sql no Supabase." : ""}`,
          );
        }
        (n((j) =>
          j.map((m) =>
            m.filial === w.filial && m.numeroRaw === w.numeroRaw && m.serie === w.serie ? { ...m, obs: z.trim() } : m,
          ),
        ),
          setEd(null));
      } catch (m) {
        setEd((j) => (j ? { ...j, salvando: false, erro: String(m.message || m) } : j));
      }
    },
    h = (0, o.useMemo)(
      () => Po(t, p, g, ["status", "filial", "nf", "serie", "pedido", "cliente", "transportadora", "obs"]),
      [t, p, g],
    ),
    y = t.filter((w) => w.statusTipo === "vermelho").length,
    B = t.filter((w) => w.statusTipo === "laranja").length,
    k = t.filter((w) => (w.dias || 0) >= 2).length,
    L = [
      {
        campo: "status",
        titulo: "Status",
        width: 130,
        render: (w) => o.default.createElement(gt, { texto: w.status, tipo: w.statusTipo }),
      },
      { campo: "filial", titulo: "Filial", width: 64, bold: true },
      { campo: "nf", titulo: "NF", width: 90, bold: true },
      { campo: "serie", titulo: "Série", width: 56 },
      { campo: "pedido", titulo: "Pedido", width: 90 },
      { campo: "cliente", titulo: "Cliente", width: 120 },
      { campo: "transportadora", titulo: "Transportadora", width: 150 },
      { campo: "emissao", titulo: "Emissão", width: 92 },
      { campo: "horaAut", titulo: "Hr. Aut.", width: 72 },
      { campo: "detectada", titulo: "Detectada em", width: 112 },
      {
        campo: "dias",
        titulo: "Dias",
        width: 70,
        render: (w) =>
          w.dias == null
            ? "—"
            : o.default.createElement(gt, {
                texto: `${w.dias} d`,
                tipo: w.dias >= 3 ? "vermelho" : w.dias >= 1 ? "laranja" : "cinza",
              }),
      },
      {
        campo: "obs",
        titulo: "Observação",
        minWidth: 300,
        render: (w) => {
          let z = `${w.filial}|${w.numeroRaw}|${w.serie}`;
          return ed && ed.k === z
            ? o.default.createElement(
                "div",
                { style: { display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" } },
                o.default.createElement("input", {
                  autoFocus: true,
                  value: ed.txt,
                  disabled: ed.salvando,
                  maxLength: 300,
                  placeholder: "Observação…",
                  onChange: (j) => setEd({ ...ed, txt: j.target.value }),
                  onKeyDown: (j) => {
                    (j.key === "Enter" && ntSalvar(w), j.key === "Escape" && setEd(null));
                  },
                  style: { ...Fa, height: 28, flex: "1 1 180px", minWidth: 170, maxWidth: "none" },
                }),
                o.default.createElement(
                  "button",
                  {
                    type: "button",
                    onClick: () => ntSalvar(w),
                    disabled: ed.salvando,
                    style: { ...uo(ed.salvando), height: 28, padding: "0 10px" },
                  },
                  ed.salvando ? "…" : "Salvar",
                ),
                o.default.createElement(
                  "button",
                  {
                    type: "button",
                    onClick: () => setEd(null),
                    disabled: ed.salvando,
                    style: { ...uo(ed.salvando), height: 28, padding: "0 10px" },
                  },
                  "Cancelar",
                ),
                ed.erro &&
                  o.default.createElement(
                    "span",
                    { style: { color: s.red, fontSize: 11, fontWeight: 700, flexBasis: "100%" } },
                    ed.erro,
                  ),
              )
            : o.default.createElement(
                "div",
                { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 } },
                o.default.createElement(
                  "span",
                  {
                    title: w.obs,
                    style: { overflow: "hidden", textOverflow: "ellipsis", maxWidth: 320, display: "inline-block" },
                  },
                  w.obs || "—",
                ),
                o.default.createElement(
                  "button",
                  {
                    type: "button",
                    title: "Editar observação",
                    onClick: () => setEd({ k: z, txt: w.obs, salvando: false, erro: "" }),
                    style: {
                      width: 26,
                      height: 24,
                      borderRadius: s.radius.sm,
                      border: `1px solid ${s.blueBd}`,
                      background: s.blueBg,
                      color: s.blue,
                      cursor: "pointer",
                      fontSize: 13,
                      lineHeight: 1,
                      flexShrink: 0,
                    },
                  },
                  "✎",
                ),
              );
        },
      },
    ];
  return o.default.createElement(
    o.default.Fragment,
    null,
    o.default.createElement(Wt, {
      titulo: "NFe trancadas",
      atualizadoEm: d,
      extraInfo: o.default.createElement(
        "span",
        null,
        "NF-e não autorizadas ou não transmitidas · mês atual · atualiza a cada 5 min",
      ),
      actions: o.default.createElement(
        "button",
        { onClick: x, disabled: a, style: uo(a) },
        a ? "Atualizando…" : "Atualizar",
      ),
    }),
    i && o.default.createElement("div", { style: co }, i),
    o.default.createElement(
      "section",
      { style: { display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12, marginBottom: 18 } },
      o.default.createElement(ze, {
        titulo: "Total trancadas",
        valor: t.length,
        onClick: () => {
          (c(""), f({}));
        },
        ativo: !Object.values(g).some(Boolean),
      }),
      o.default.createElement(ze, {
        titulo: "Não autorizadas",
        valor: y,
        onClick: () => {
          (c(""), f({ status: "Não autorizada" }));
        },
        ativo: g.status === "Não autorizada",
      }),
      o.default.createElement(ze, {
        titulo: "Não transmitidas",
        valor: B,
        onClick: () => {
          (c(""), f({ status: "Não transmitida" }));
        },
        ativo: g.status === "Não transmitida",
      }),
      o.default.createElement(ze, { titulo: "Há 2 dias ou mais", valor: k }),
    ),
    o.default.createElement(
      "div",
      { style: { display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" } },
      o.default.createElement("input", {
        value: p,
        onChange: (w) => c(w.target.value),
        placeholder: "Buscar NF, pedido, cliente, observação…",
        style: Fa,
      }),
    ),
    o.default.createElement(nn, {
      titulo: "NFe trancadas",
      dadosBase: t,
      dadosFiltrados: h,
      colunas: L,
      filtros: g,
      onFiltro: (w, F) => f((v) => ({ ...v, [w]: F })),
      carregando: a,
      mensagemVazia: "Nenhuma NF-e trancada. Tudo transmitido e autorizado.",
    }),
  );
}
function yb({ ativo: e, somenteLeitura: t }) {
  let [n, a] = (0, o.useState)([]),
    [r, i] = (0, o.useState)([]),
    [l, d] = (0, o.useState)(t ? "cancelados" : "lancar"),
    [u, p] = (0, o.useState)({ ...X0, data: Zu() }),
    [c, g] = (0, o.useState)(null),
    [f, x] = (0, o.useState)("todos"),
    [w, F] = (0, o.useState)(""),
    [v, m] = (0, o.useState)(""),
    [h, y] = (0, o.useState)(false),
    [B, k] = (0, o.useState)(false),
    [L, C] = (0, o.useState)(""),
    [_, q] = (0, o.useState)(null),
    [E, A] = (0, o.useState)(null),
    [I, V] = (0, o.useState)(null),
    [D, O] = (0, o.useState)(false),
    [H, M] = (0, o.useState)([]),
    [Q, Y] = (0, o.useState)(false),
    [de, ce] = (0, o.useState)(null),
    [W, S] = (0, o.useState)(null),
    te = (0, o.useRef)(false),
    re = (0, o.useRef)(0),
    [be, pe] = (0, o.useState)(() => Date.now()),
    $ = (0, o.useRef)(0),
    ee = (0, o.useRef)(""),
    [se, Ae] = (0, o.useState)(null),
    [Ne, Ce] = (0, o.useState)([]),
    [Ie, Be] = (0, o.useState)(""),
    [Ve, lt] = (0, o.useState)(null),
    [G, me] = (0, o.useState)(false),
    [je, Ye] = (0, o.useState)(false),
    Se = (0, o.useCallback)((z, U) => {
      (q({ texto: z, tipo: U || "ok" }), setTimeout(() => q(null), 3200));
    }, []),
    De = (0, o.useCallback)(async () => {
      try {
        let z = await Dt("v_inutilizacoes_painel?select=*&order=id.desc&limit=3000");
        i(Array.isArray(z) ? z.map(rb) : []);
      } catch {
        i([]);
      }
    }, []),
    xe = (0, o.useCallback)(async (z) => {
      De();
      let U = z === true;
      (y(true), C(""));
      try {
        if (so && (U ? await Zy("canc") : true)) {
          let P = await hl("canc");
          if (P) {
            (a(P.itens), P.totais && Ae(P.totais), M(P.fixos || []), ($.current = Date.now()));
            return;
          }
        }
        let T = ib(U0),
          [J, ie] = await Promise.all([
            yi(
              `v_cancelamentos_painel?select=*&or=(status.neq.${encodeURIComponent(Yt)},cancelado_em.gte.${T},data_cancelamento.gte.${T})&order=id.desc`,
              2e4,
              0,
            ),
            sb().catch(() => null),
          ]);
        (a(J), ie && Ae(ie), ($.current = Date.now()));
      } catch (T) {
        C(`Não foi possível carregar os cancelamentos. ${T.message || ""} (rode o bloco 12 do SQL no Supabase)`);
      } finally {
        y(false);
      }
      try {
        let T = await Dt("v_cancelamento_solicitantes_fixos?select=nome&order=nome");
        M(Array.isArray(T) ? T.map((J) => J.nome) : []);
      } catch {
        M([]);
      }
    }, []);
  ((0, o.useEffect)(() => {
    if (!e) return;
    Date.now() - $.current >= 3e4 && xe();
    let z = setInterval(async () => {
      if (lr()) {
        if (so) {
          xe();
          return;
        }
        try {
          let U = await lb();
          if (U && U === ee.current && Date.now() - $.current < 5 * 6e4) return;
          ee.current = U;
        } catch {}
        xe();
      }
    }, 6e4);
    return () => clearInterval(z);
  }, [e, xe]),
    (0, o.useEffect)(() => {
      let z = u.nf.trim(),
        U = u.pedido.trim();
      if (!e || (!z && !U) || u.inut) {
        V(null);
        return;
      }
      let T = ++re.current,
        J = setTimeout(async () => {
          O(true);
          try {
            let ie = await Yo("cancelamento_analisar", { p_nf: z, p_pedido: U });
            if (T !== re.current) return;
            (V(ie),
              p((ve) => {
                let P = { ...ve };
                return (
                  ie.filial && !te.current && (P.filial = ie.filial),
                  !ve.pedido.trim() && ie.pedido && (P.pedido = ie.pedido),
                  !ve.nf.trim() && ie.nf && (P.nf = String(ie.nf).replace(/^0+(?=\d)/, "")),
                  P
                );
              }));
          } catch (ie) {
            T === re.current && V({ erro: ie.message || "Erro" });
          } finally {
            T === re.current && O(false);
          }
        }, 450);
      return () => clearTimeout(J);
    }, [e, u.nf, u.pedido, u.inut]),
    (0, o.useEffect)(() => {
      if (!e) return;
      pe(Date.now());
      let z = setInterval(() => pe(Date.now()), 3e4);
      return () => clearInterval(z);
    }, [e]));
  let ke = (0, o.useMemo)(() => [...n, ...r].filter((z) => z.status !== Yt), [n, r]),
    we = (0, o.useMemo)(() => r.filter((z) => z.status === Yt), [r]),
    Qe = (0, o.useMemo)(() => {
      let z = /* @__PURE__ */ new Map();
      return (
        [...n.filter((U) => U.status === Yt), ...Ne].forEach((U) => z.set(U.id, U)),
        [...z.values()].sort((U, T) => Number(T.id) - Number(U.id))
      );
    }, [n, Ne]),
    Xe = (z) => {
      let U = ka(z.cancelado_em);
      return U ? U.getTime() : 0;
    },
    ue = (0, o.useMemo)(() => {
      if (Ve !== null) {
        let z = Ie.trim().toLowerCase(),
          U = we.filter((T) => [T.pedido, T.solicitante].join(" ").toLowerCase().includes(z));
        return [...Ve, ...U].sort((T, J) => Xe(J) - Xe(T));
      }
      return [...Qe, ...we].sort((z, U) => Xe(U) - Xe(z));
    }, [Ve, Ie, Qe, we]),
    Pe = (se ? se.canc : Qe.length) + we.length,
    dt = (se ? se.total : n.length) + r.length;
  (0, o.useEffect)(() => {
    let z = Ie.trim();
    if (z.length < 2) {
      lt(null);
      return;
    }
    let U = true,
      T = setTimeout(async () => {
        me(true);
        try {
          let J = await K0({ busca: z });
          U && lt(J);
        } catch (J) {
          U && Se(J.message || "Falha na busca", "err");
        } finally {
          U && me(false);
        }
      }, 500);
    return () => {
      ((U = false), clearTimeout(T));
    };
  }, [Ie, Se]);
  async function Tt() {
    if (G) return;
    let z = Qe.reduce((U, T) => Math.min(U, Number(T.id)), 1 / 0);
    me(true);
    try {
      let U = await K0({ antesDoId: Number.isFinite(z) ? z : 0 });
      (Ce((T) => [...T, ...U]), U.length < rl && Ye(true));
    } catch (U) {
      Se(U.message || "Falha ao carregar", "err");
    } finally {
      me(false);
    }
  }
  let _e = (z) => n.filter((U) => U.status === z).length,
    yt = ke.filter((z) => z.tipo === "inut").length,
    zt = ke.filter((z) => z.atencao).length,
    po = ke.filter((z) => mc(z, be)).length,
    Ut = Zu(),
    nt = ke.filter((z) => Ru(z.data_cancelamento) === Ut).length,
    At = (z) => (U) => {
      let T = U.target.value;
      p((J) => ({ ...J, [z]: T }));
    };
  function kt(z) {
    if (z.status === Yt) {
      Se("Registro já concluído — não pode mais ser editado.", "err");
      return;
    }
    ((te.current = true),
      Y(false),
      g(z.tipo === "inut" ? z.rawId : z.id),
      p({
        data: Ru(z.data_cancelamento),
        filial: z.filial || "",
        pedido: z.pedido || "",
        nf: z.nf || "",
        solicitante: z.solicitante || "",
        motivo: z.motivo || "",
        inut: z.tipo === "inut",
      }),
      d("lancar"),
      window.scrollTo({ top: 0, behavior: "smooth" }));
  }
  function It() {
    ((te.current = false), Y(false), V(null), g(null), p({ ...X0, data: Zu() }));
  }
  async function Mt(z) {
    if ((z.preventDefault(), B)) return;
    let U = pb(u.data);
    if (!U || !u.filial || !u.pedido.trim() || (!u.inut && !u.nf.trim())) {
      Se(
        u.inut ? "Preencha Data (dd/mm/aaaa), Filial e Pedido." : "Preencha Data (dd/mm/aaaa), Filial, Pedido e NF.",
        "err",
      );
      return;
    }
    if (!u.solicitante.trim() || u.solicitante === "__outro") {
      Se("Preencha o Solicitante.", "err");
      return;
    }
    if (!u.motivo) {
      Se("Preencha o Motivo.", "err");
      return;
    }
    k(true);
    try {
      (u.inut
        ? await Yo("inutilizacao_salvar", {
            p_id: c,
            p_data: U,
            p_filial: u.filial,
            p_pedido: u.pedido,
            p_solicitante: u.solicitante,
            p_motivo: u.motivo,
          })
        : await Yo("cancelamento_salvar", {
            p_id: c,
            p_data: U,
            p_filial: u.filial,
            p_pedido: u.pedido,
            p_nf: u.nf,
            p_solicitante: u.solicitante,
            p_responsavel: "",
            p_motivo: u.motivo,
          }),
        Se(c ? "Registro atualizado!" : u.inut ? "Inutilização salva!" : "Cancelamento salvo!"),
        It(),
        await xe(true));
    } catch (T) {
      Se(T.message || "Erro ao salvar.", "err");
    } finally {
      k(false);
    }
  }
  async function ht() {
    ce({ lista: [], busca: "", novo: "", carregando: true });
    try {
      let z = await Dt("v_cancelamento_solicitantes_sugestao?select=nome,qtd,fixo&order=fixo.desc,qtd.desc");
      ce((U) => U && { ...U, lista: Array.isArray(z) ? z : [], carregando: false });
    } catch (z) {
      (ce(null),
        Se(
          `Não foi possível carregar os nomes: ${z.message || ""} (confira se o bloco 16 do SQL foi rodado no Supabase)`,
          "err",
        ));
    }
  }
  async function xt(z, U) {
    ce((T) => T && { ...T, lista: T.lista.map((J) => (J.nome === z ? { ...J, fixo: U } : J)) });
    try {
      (await Yo("cancelamento_solicitante_fixar", { p_nome: z, p_fixo: U }),
        M((T) =>
          U ? (T.includes(z) ? T : [...T, z].sort((J, ie) => J.localeCompare(ie, "pt-BR"))) : T.filter((J) => J !== z),
        ));
    } catch (T) {
      (ce((J) => J && { ...J, lista: J.lista.map((ie) => (ie.nome === z ? { ...ie, fixo: !U } : ie)) }),
        Se(T.message || "Erro ao salvar o nome.", "err"));
    }
  }
  async function Ft() {
    let z = (de.novo || "").trim().replace(/\s+/g, " ");
    if (z)
      try {
        (await Yo("cancelamento_solicitante_fixar", { p_nome: z, p_fixo: true }),
          ce(
            (U) =>
              U && {
                ...U,
                novo: "",
                lista: [
                  { nome: z, qtd: 0, fixo: true },
                  ...U.lista.filter((T) => T.nome.toLowerCase() !== z.toLowerCase()),
                ],
              },
          ),
          M((U) =>
            U.some((T) => T.toLowerCase() === z.toLowerCase())
              ? U
              : [...U, z].sort((T, J) => T.localeCompare(J, "pt-BR")),
          ));
      } catch (U) {
        Se(U.message || "Erro ao salvar o nome.", "err");
      }
  }
  function eo(z) {
    let U = gb();
    S({ c: z, cfg: U, texto: tc(z, U), config: false });
  }
  async function Wo() {
    let z = await Hg(W.texto);
    Se(
      z ? "Mensagem copiada! Cole no grupo." : "Não consegui copiar — selecione o texto e use Ctrl+C.",
      z ? "ok" : "err",
    );
  }
  function N(z) {
    A({
      titulo: "Confirmar",
      texto: `Marcar como Inutilizado — Pedido ${z.pedido}?`,
      botao: "Confirmar",
      acao: async () => {
        (await Yo("inutilizacao_status", { p_id: z.rawId, p_status: Og }), Se("Inutilizado!"), await xe(true));
      },
    });
  }
  function b(z, U, T) {
    A({
      titulo: "Confirmar",
      texto: `${T} — Pedido ${z.pedido} · NF ${z.nf}?`,
      botao: "Confirmar",
      acao: async () => {
        (await Yo("cancelamento_status", { p_id: z.id, p_status: U }),
          Se(U === Yt ? "Cancelado! A NF sai do Via Leitor." : `${U}!`),
          await xe(true),
          U === vn && eo(z));
      },
    });
  }
  function j(z) {
    let U = z.tipo === "inut";
    A({
      titulo: "Confirmar exclusão",
      texto: U
        ? `Tem certeza que deseja excluir a inutilização do pedido ${z.pedido}?`
        : `Tem certeza que deseja excluir o registro do pedido ${z.pedido}? Se estava Cancelado, a NF volta ao Via Leitor.`,
      botao: "Excluir",
      perigo: true,
      acao: async () => {
        (U ? await Yo("inutilizacao_excluir", { p_id: z.rawId }) : await Yo("cancelamento_excluir", { p_id: z.id }),
          Se("Excluído!"),
          await xe(true));
      },
    });
  }
  async function Z() {
    let z = E;
    A(null);
    try {
      await z.acao();
    } catch (U) {
      Se(U.message || "Erro.", "err");
    }
  }
  let ae = (z, U) =>
      z.length
        ? o.default.createElement(
            "div",
            { className: "cnl-box" },
            o.default.createElement(
              "table",
              { className: "cnl-table" },
              o.default.createElement(
                "thead",
                null,
                o.default.createElement(
                  "tr",
                  null,
                  o.default.createElement("th", null, "Solicitado em"),
                  o.default.createElement("th", null, "Filial"),
                  o.default.createElement("th", null, "Pedido"),
                  o.default.createElement("th", null, "NF"),
                  o.default.createElement("th", null, "Solicitante"),
                  o.default.createElement("th", null, "Motivo"),
                  o.default.createElement("th", null, U === "canc" ? "Cancelado em" : "Status"),
                  o.default.createElement("th", null, U === "canc" ? "Tempo" : "Prazo (1h / 24h)"),
                  o.default.createElement("th", { style: { textAlign: "right" } }, "Ações"),
                ),
              ),
              o.default.createElement(
                "tbody",
                null,
                z.map((T) =>
                  o.default.createElement(
                    "tr",
                    { key: T.id, style: U === "canc" ? { opacity: 0.75 } : void 0 },
                    o.default.createElement(
                      "td",
                      null,
                      T.solicitado_em ? G0(T.solicitado_em) : Ru(T.data_cancelamento),
                    ),
                    o.default.createElement(
                      "td",
                      null,
                      o.default.createElement("span", { className: "cnl-fil" }, T.filial),
                    ),
                    o.default.createElement(
                      "td",
                      { className: "cnl-mono" },
                      T.pedido,
                      T.tipo === "inut" &&
                        o.default.createElement(
                          "span",
                          { className: "cnl-st ag", style: { marginLeft: 8, fontFamily: "Inter,Arial,sans-serif" } },
                          "Inutilização",
                        ),
                      T.atencao &&
                        U !== "canc" &&
                        o.default.createElement(
                          "span",
                          { className: "cnl-atencao", title: T.atencao_motivo || "NF e pedido não batem" },
                          "⚠",
                        ),
                      T.atencao &&
                        U === "pend" &&
                        T.atencao_motivo &&
                        o.default.createElement("div", { className: "cnl-atmot" }, T.atencao_motivo),
                    ),
                    o.default.createElement("td", { className: "cnl-mono" }, T.tipo === "inut" ? "—" : T.nf),
                    o.default.createElement("td", null, T.solicitante || "—"),
                    o.default.createElement("td", null, T.motivo || "—"),
                    o.default.createElement(
                      "td",
                      null,
                      U === "canc" ? G0(T.cancelado_em) : o.default.createElement(vb, { status: T.status }),
                    ),
                    o.default.createElement("td", null, o.default.createElement(mb, { c: T, agora: be })),
                    o.default.createElement(
                      "td",
                      { style: { textAlign: "right" } },
                      !t &&
                        o.default.createElement(
                          "span",
                          { className: "cnl-acao" },
                          U === "pend" &&
                            T.tipo === "inut" &&
                            o.default.createElement(
                              "button",
                              { type: "button", className: "cnl-btn sm go", onClick: () => N(T) },
                              o.default.createElement(Rs, { d: V0 }),
                              "Inutilizar",
                            ),
                          U === "pend" &&
                            T.tipo !== "inut" &&
                            o.default.createElement(
                              o.default.Fragment,
                              null,
                              o.default.createElement(
                                "button",
                                {
                                  type: "button",
                                  className: "cnl-btn sm go",
                                  onClick: () => b(T, Yt, "Marcar como Cancelado"),
                                },
                                o.default.createElement(Rs, { d: V0 }),
                                "Cancelar",
                              ),
                              T.status === cr &&
                                nb.includes(String(T.filial)) &&
                                o.default.createElement(
                                  "button",
                                  {
                                    type: "button",
                                    className: "cnl-btn sm cntb",
                                    onClick: () => b(T, ci, "Marcar como Aguardando CNT"),
                                    title: "A NF entrou no processo do CNT",
                                  },
                                  "CNT",
                                ),
                              o.default.createElement(
                                "button",
                                {
                                  type: "button",
                                  className: "cnl-btn sm amb",
                                  onClick: () => b(T, vn, "Marcar como Aguardando Pagto BFT"),
                                  title: "Aguardando pagamento BFT",
                                },
                                "BFT",
                              ),
                            ),
                          U === "pend" &&
                            T.tipo !== "inut" &&
                            T.status === vn &&
                            o.default.createElement(
                              "button",
                              {
                                type: "button",
                                className: "cnl-btn sm bftmsg",
                                onClick: () => eo(T),
                                title: "Texto pronto para avisar o financeiro no grupo",
                              },
                              "💬 Msg BFT",
                            ),
                          o.default.createElement("span", { className: "cnl-sep" }),
                          U !== "canc" &&
                            o.default.createElement(
                              "button",
                              {
                                type: "button",
                                className: "cnl-btn sm ico",
                                onClick: () => kt(T),
                                title: "Editar",
                                "aria-label": "Editar",
                              },
                              o.default.createElement(Rs, { d: db }),
                            ),
                          o.default.createElement(
                            "button",
                            {
                              type: "button",
                              className: "cnl-btn sm ico red",
                              onClick: () => j(T),
                              title: "Excluir",
                              "aria-label": "Excluir",
                            },
                            o.default.createElement(Rs, { d: ub }),
                          ),
                        ),
                    ),
                  ),
                ),
              ),
            ),
          )
        : o.default.createElement(
            "div",
            { className: "cnl-vazio" },
            h ? "Carregando…" : U === "pend" ? "Nenhum cancelamento pendente neste filtro." : "Nenhum registro.",
          ),
    K = ke;
  f === "atencao"
    ? (K = K.filter((z) => z.atencao))
    : f === "atrasados"
      ? (K = K.filter((z) => mc(z, be)))
      : f === "inut"
        ? (K = K.filter((z) => z.tipo === "inut"))
        : f !== "todos" && (K = K.filter((z) => z.status === f));
  let Ee = (z) => {
    let U = ka(z.solicitado_em);
    return U ? U.getTime() : 1 / 0;
  };
  w && (K = K.filter((z) => String(z.filial) === w));
  let he = (z) => Number(String(z.nf_norm || z.nf || "").replace(/\D/g, "")) || 0;
  return (
    (K = [...K].sort((z, U) =>
      v ? (v === "desc" ? he(U) - he(z) : he(z) - he(U)) : Ee(z) === Ee(U) ? 0 : Ee(z) < Ee(U) ? -1 : 1,
    )),
    o.default.createElement(
      "div",
      { className: "cnl" },
      o.default.createElement("style", null, cb),
      o.default.createElement("div", { className: "cnl-head" }, o.default.createElement("h2", null, "Cancelamentos")),
      L && o.default.createElement("div", { className: "cnl-erro" }, L),
      o.default.createElement(
        "div",
        { className: "cnl-tabs" },
        !t &&
          o.default.createElement(
            "button",
            { type: "button", className: `cnl-tab${l === "lancar" ? " on" : ""}`, onClick: () => d("lancar") },
            "Lançar Cancelamento",
          ),
        !t &&
          o.default.createElement(
            "button",
            { type: "button", className: `cnl-tab${l === "pendentes" ? " on" : ""}`, onClick: () => d("pendentes") },
            "Cancelamentos Pendentes",
            ke.length > 0 && o.default.createElement("span", { className: "cnl-badge" }, ke.length),
          ),
        o.default.createElement(
          "button",
          { type: "button", className: `cnl-tab${l === "cancelados" ? " on" : ""}`, onClick: () => d("cancelados") },
          "Já Cancelados",
          Pe > 0 && o.default.createElement("span", { className: "cnl-badge ok" }, Pe),
        ),
      ),
      l === "lancar" &&
        o.default.createElement(
          o.default.Fragment,
          null,
          o.default.createElement(
            "div",
            { className: "cnl-stats" },
            o.default.createElement(
              "div",
              { className: "cnl-stat" },
              o.default.createElement("b", null, dt),
              o.default.createElement("span", null, "Total"),
            ),
            o.default.createElement(
              "div",
              { className: "cnl-stat", style: { "--k": "var(--red)" } },
              o.default.createElement("b", null, Pe),
              o.default.createElement("span", null, "Cancelados"),
            ),
            o.default.createElement(
              "div",
              { className: "cnl-stat", style: { "--k": "var(--blue-tx)" } },
              o.default.createElement("b", null, _e(ci)),
              o.default.createElement("span", null, "Aguardando CNT"),
            ),
            o.default.createElement(
              "div",
              { className: "cnl-stat", style: { "--k": "var(--orange-tx)" } },
              o.default.createElement("b", null, _e(cr)),
              o.default.createElement("span", null, "Aguardando Cancelamento"),
            ),
            o.default.createElement(
              "div",
              { className: "cnl-stat", style: { "--k": "var(--purple-tx)" } },
              o.default.createElement("b", null, _e(vn)),
              o.default.createElement("span", null, "Aguardando BFT"),
            ),
            o.default.createElement(
              "div",
              { className: "cnl-stat", style: { "--k": "var(--orange-tx)" } },
              o.default.createElement("b", null, yt),
              o.default.createElement("span", null, "Aguard. Inutilização"),
            ),
          ),
          o.default.createElement(
            "div",
            { className: "cnl-card" },
            o.default.createElement(
              "h3",
              null,
              c
                ? u.inut
                  ? "Editar Inutilização"
                  : "Editar Cancelamento"
                : u.inut
                  ? "Nova Inutilização de Pedido"
                  : "Novo Cancelamento",
            ),
            o.default.createElement(
              "form",
              { className: "cnl-form", onSubmit: Mt },
              o.default.createElement(
                "div",
                { className: "cnl-campo" },
                o.default.createElement("label", null, "Data"),
                o.default.createElement("input", { value: u.data, onChange: At("data"), placeholder: "dd/mm/aaaa" }),
              ),
              o.default.createElement(
                "div",
                { className: "cnl-campo" },
                o.default.createElement("label", null, "Filial"),
                o.default.createElement(
                  "select",
                  {
                    value: u.filial,
                    onChange: (z) => {
                      ((te.current = true), At("filial")(z));
                    },
                  },
                  o.default.createElement("option", { value: "" }, "Selecione..."),
                  hi.map((z) => o.default.createElement("option", { key: z, value: z }, z)),
                ),
              ),
              o.default.createElement(
                "div",
                { className: "cnl-campo" },
                o.default.createElement("label", null, "Nº Pedido"),
                o.default.createElement("input", { value: u.pedido, onChange: At("pedido"), placeholder: "12345" }),
              ),
              o.default.createElement(
                "div",
                { className: "cnl-campo" },
                o.default.createElement("label", null, "Nota Fiscal"),
                o.default.createElement("input", {
                  value: u.inut ? "" : u.nf,
                  onChange: At("nf"),
                  placeholder: u.inut ? "sem NF" : "98765",
                  disabled: u.inut,
                }),
                o.default.createElement(
                  "label",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      marginTop: 8,
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "none",
                      letterSpacing: 0,
                      cursor: c ? "default" : "pointer",
                      color: "var(--txt)",
                    },
                  },
                  o.default.createElement("input", {
                    type: "checkbox",
                    style: { width: 16, height: 16, margin: 0 },
                    checked: !!u.inut,
                    disabled: !!c,
                    onChange: (z) => {
                      let U = z.target.checked;
                      p((T) => ({ ...T, inut: U, nf: U ? "" : T.nf }));
                    },
                  }),
                  "Inutilização de pedido",
                ),
              ),
              o.default.createElement(
                "div",
                { className: "cnl-campo" },
                o.default.createElement("label", null, "Solicitante *"),
                H.length > 0 && !Q && (!u.solicitante || H.includes(u.solicitante))
                  ? o.default.createElement(
                      "select",
                      {
                        value: u.solicitante,
                        onChange: (z) => {
                          z.target.value === "__outro"
                            ? (Y(true), p((U) => ({ ...U, solicitante: "" })))
                            : At("solicitante")(z);
                        },
                      },
                      o.default.createElement("option", { value: "" }, "Selecione..."),
                      H.map((z) => o.default.createElement("option", { key: z, value: z }, z)),
                      o.default.createElement("option", { value: "__outro" }, "Outro (digitar)…"),
                    )
                  : o.default.createElement("input", {
                      value: u.solicitante,
                      onChange: At("solicitante"),
                      placeholder: "Nome do solicitante",
                    }),
                o.default.createElement(
                  "button",
                  { type: "button", className: "cnl-link", onClick: ht },
                  "⚙ Escolher nomes fixos",
                ),
                H.length > 0 &&
                  (Q || (u.solicitante && !H.includes(u.solicitante))) &&
                  o.default.createElement(
                    "button",
                    {
                      type: "button",
                      className: "cnl-link",
                      style: { marginLeft: 10 },
                      onClick: () => {
                        (Y(false), p((z) => ({ ...z, solicitante: "" })));
                      },
                    },
                    "↩ usar a lista",
                  ),
              ),
              o.default.createElement(
                "div",
                { className: "cnl-campo" },
                o.default.createElement("label", null, "Motivo *"),
                o.default.createElement(
                  "select",
                  { value: u.motivo, onChange: At("motivo") },
                  o.default.createElement("option", { value: "" }, "Selecione..."),
                  ob.map((z) => o.default.createElement("option", { key: z, value: z }, z)),
                ),
              ),
              D && o.default.createElement("div", { className: "cnl-info" }, "Buscando na expedição…"),
              !D &&
                I &&
                I.erro &&
                o.default.createElement(
                  "div",
                  { className: "cnl-info" },
                  "Não foi possível consultar a expedição (",
                  I.erro,
                  "). Rode o bloco 16 do SQL no Supabase e escolha a filial manualmente.",
                ),
              !D &&
                I &&
                !I.erro &&
                I.atencao &&
                o.default.createElement(
                  "div",
                  { className: "cnl-aviso" },
                  "⚠ Atenção: ",
                  I.motivo,
                  " Quem for cancelar vai analisar.",
                ),
              !D &&
                I &&
                !I.erro &&
                !I.atencao &&
                I.encontrado &&
                I.filial &&
                o.default.createElement(
                  "div",
                  { className: "cnl-okbox" },
                  "✔ Encontrado na expedição: filial ",
                  I.filial,
                  I.cliente ? ` · ${I.cliente}` : "",
                ),
              !D &&
                I &&
                !I.erro &&
                !I.atencao &&
                I.encontrado &&
                !I.filial &&
                o.default.createElement(
                  "div",
                  { className: "cnl-aviso" },
                  "Esta NF/pedido existe em mais de uma filial — informe também o pedido ou escolha a filial.",
                ),
              !D &&
                I &&
                !I.erro &&
                !I.atencao &&
                !I.encontrado &&
                o.default.createElement(
                  "div",
                  { className: "cnl-info" },
                  "Não encontrado na expedição — escolha a filial manualmente.",
                ),
              !D &&
                I &&
                !I.erro &&
                I.filial &&
                u.filial &&
                I.filial !== u.filial &&
                o.default.createElement(
                  "div",
                  { className: "cnl-aviso" },
                  "⚠ A filial escolhida (",
                  u.filial,
                  ") é diferente da filial da NF (",
                  I.filial,
                  ").",
                ),
              o.default.createElement(
                "div",
                { className: "cnl-dica" },
                u.inut
                  ? o.default.createElement(
                      o.default.Fragment,
                      null,
                      "A data e a hora da solicitação são gravadas automaticamente. Pedido ",
                      o.default.createElement("b", null, "sem NF"),
                      ". Prazo para inutilizar: ",
                      o.default.createElement("b", null, "24 horas"),
                      ". Começa como ",
                      o.default.createElement("b", null, "Aguardando Inutilização"),
                      ".",
                    )
                  : o.default.createElement(
                      o.default.Fragment,
                      null,
                      "A data e a hora da solicitação são gravadas automaticamente. Prazo para cancelar: ",
                      o.default.createElement("b", null, "1 hora"),
                      ". Todo cancelamento começa como ",
                      o.default.createElement("b", null, "Aguardando Cancelamento"),
                      ". Nas filiais 0104, 0105, 1030 e 1040, quem for cancelar marca ",
                      o.default.createElement("b", null, "Aguardando CNT"),
                      " ",
                      "(botão CNT) quando a NF entrar nesse processo.",
                    ),
              ),
              o.default.createElement(
                "div",
                { className: "cnl-acoes" },
                o.default.createElement(
                  "button",
                  { type: "submit", className: "cnl-btn pri", disabled: B },
                  B ? "Salvando…" : c ? "Salvar Alterações" : u.inut ? "Salvar Inutilização" : "Salvar Cancelamento",
                ),
                c &&
                  o.default.createElement(
                    "button",
                    { type: "button", className: "cnl-btn", onClick: It },
                    "Cancelar edição",
                  ),
              ),
            ),
          ),
        ),
      l === "pendentes" &&
        o.default.createElement(
          o.default.Fragment,
          null,
          o.default.createElement(
            "div",
            { className: "cnl-stats" },
            o.default.createElement(
              "div",
              { className: "cnl-stat", style: { "--k": "var(--amber)" } },
              o.default.createElement("b", null, ke.length),
              o.default.createElement("span", null, "Pendentes"),
            ),
            o.default.createElement(
              "div",
              { className: "cnl-stat", style: { "--k": "var(--blue-tx)" } },
              o.default.createElement("b", null, _e(ci)),
              o.default.createElement("span", null, "Aguardando CNT"),
            ),
            o.default.createElement(
              "div",
              { className: "cnl-stat", style: { "--k": "var(--orange-tx)" } },
              o.default.createElement("b", null, _e(cr)),
              o.default.createElement("span", null, "Aguardando Cancelamento"),
            ),
            o.default.createElement(
              "div",
              { className: "cnl-stat", style: { "--k": "var(--purple-tx)" } },
              o.default.createElement("b", null, _e(vn)),
              o.default.createElement("span", null, "Aguardando BFT"),
            ),
            o.default.createElement(
              "div",
              { className: "cnl-stat", style: { "--k": "var(--orange-tx)" } },
              o.default.createElement("b", null, yt),
              o.default.createElement("span", null, "Aguard. Inutilização"),
            ),
            o.default.createElement(
              "div",
              { className: "cnl-stat", style: { "--k": "var(--green-tx)" } },
              o.default.createElement("b", null, nt),
              o.default.createElement("span", null, "Para Hoje"),
            ),
            o.default.createElement(
              "div",
              { className: "cnl-stat", style: { "--k": "var(--amber)" } },
              o.default.createElement("b", null, zt),
              o.default.createElement("span", null, "⚠ Com atenção"),
            ),
            o.default.createElement(
              "div",
              { className: "cnl-stat", style: { "--k": "var(--red)" } },
              o.default.createElement("b", null, po),
              o.default.createElement("span", null, "⏰ Atrasados (prazo vencido)"),
            ),
          ),
          o.default.createElement(
            "div",
            { className: "cnl-filtros" },
            o.default.createElement("small", null, "Status"),
            [
              ["todos", "Todos"],
              [ci, "Aguardando CNT"],
              [cr, "Aguardando Cancelamento"],
              [vn, "Aguardando Pagto BFT"],
              ["inut", "Inutilização"],
              ["atencao", "⚠ Com atenção"],
              ["atrasados", "⏰ Atrasados"],
            ].map(([z, U]) =>
              o.default.createElement(
                "button",
                { key: z, type: "button", className: `cnl-chip${f === z ? " on" : ""}`, onClick: () => x(z) },
                U,
              ),
            ),
            o.default.createElement(
              "span",
              { className: "cnl-grp" },
              o.default.createElement("small", null, "Filial"),
              o.default.createElement(
                "select",
                { className: "cnl-sel", value: w, onChange: (z) => F(z.target.value) },
                o.default.createElement("option", { value: "" }, "Todas"),
                hi.map((z) => o.default.createElement("option", { key: z, value: z }, z)),
              ),
            ),
            o.default.createElement(
              "span",
              { className: "cnl-grp" },
              o.default.createElement("small", null, "Ordenar NF"),
              o.default.createElement(
                "select",
                { className: "cnl-sel", value: v, onChange: (z) => m(z.target.value) },
                o.default.createElement("option", { value: "" }, "Padrão (mais antigos)"),
                o.default.createElement("option", { value: "desc" }, "Maior → menor"),
                o.default.createElement("option", { value: "asc" }, "Menor → maior"),
              ),
            ),
          ),
          o.default.createElement(
            "div",
            { className: "cnl-card" },
            o.default.createElement("h3", null, "Cancelamentos Pendentes (", K.length, ")"),
            ae(K, "pend"),
          ),
        ),
      l === "cancelados" &&
        o.default.createElement(
          "div",
          { className: "cnl-card" },
          o.default.createElement(
            "h3",
            null,
            "Pedidos Cancelados (",
            ue.length,
            Ve === null && Pe > ue.length ? ` de ${Pe}` : "",
            ")",
          ),
          o.default.createElement("input", {
            className: "cnl-busca",
            type: "search",
            placeholder: "Buscar no histórico completo: pedido, NF ou solicitante (mín. 2 caracteres)",
            value: Ie,
            onChange: (z) => Be(z.target.value),
          }),
          o.default.createElement(
            "small",
            { style: { display: "block", marginBottom: 10, opacity: 0.7 } },
            Ve !== null
              ? G
                ? "Buscando…"
                : `Resultado da busca no histórico completo (até ${rl} registros).`
              : `Mostrando os cancelados dos últimos ${U0} dias. Use a busca ou "Carregar mais antigos" para ver o restante.`,
          ),
          ae(ue, "canc"),
          Ve === null &&
            !je &&
            Pe > ue.length &&
            o.default.createElement(
              "div",
              { style: { textAlign: "center", marginTop: 12 } },
              o.default.createElement(
                "button",
                { type: "button", className: "cnl-btn sm", disabled: G, onClick: Tt },
                G ? "Carregando…" : `Carregar mais antigos (+${rl})`,
              ),
            ),
        ),
      E &&
        o.default.createElement(
          "div",
          { className: "cnl-modal", onMouseDown: (z) => z.target === z.currentTarget && A(null) },
          o.default.createElement(
            "div",
            null,
            o.default.createElement("h4", null, E.titulo),
            o.default.createElement("p", null, E.texto),
            o.default.createElement(
              "div",
              { className: "cnl-linha" },
              o.default.createElement(
                "button",
                { type: "button", className: "cnl-btn", onClick: () => A(null) },
                "Voltar",
              ),
              o.default.createElement(
                "button",
                {
                  type: "button",
                  className: `cnl-btn ${E.perigo ? "red" : "pri"}`,
                  style: E.perigo ? void 0 : { flex: "none" },
                  onClick: Z,
                },
                E.botao,
              ),
            ),
          ),
        ),
      W &&
        o.default.createElement(
          "div",
          { className: "cnl-modal", onMouseDown: (z) => z.target === z.currentTarget && S(null) },
          o.default.createElement(
            "div",
            { style: { maxWidth: 560 } },
            o.default.createElement("h4", null, "💬 Mensagem BFT — Pedido ", W.c.pedido, " · NF ", W.c.nf),
            o.default.createElement(
              "p",
              null,
              "Copie e cole no grupo, respondendo (citando) a mensagem original. Depois marque o pessoal do financeiro.",
            ),
            o.default.createElement("textarea", {
              className: "cnl-bftarea",
              value: W.texto,
              onChange: (z) => S({ ...W, texto: z.target.value }),
            }),
            o.default.createElement(
              "div",
              { className: "cnl-linha", style: { justifyContent: "space-between", marginBottom: W.config ? 10 : 0 } },
              o.default.createElement(
                "button",
                { type: "button", className: "cnl-btn sm", onClick: () => S({ ...W, config: !W.config }) },
                "⚙ ",
                W.config ? "Fechar ajustes" : "Ajustar texto e nomes",
              ),
              o.default.createElement(
                "span",
                { style: { display: "inline-flex", gap: 8 } },
                o.default.createElement(
                  "button",
                  { type: "button", className: "cnl-btn sm", onClick: () => S(null) },
                  "Fechar",
                ),
                o.default.createElement(
                  "button",
                  { type: "button", className: "cnl-btn sm ok", onClick: Wo },
                  "📋 Copiar mensagem",
                ),
              ),
            ),
            W.config &&
              o.default.createElement(
                "div",
                { className: "cnl-bftcfg" },
                o.default.createElement("label", null, "Quem do financeiro marcar (um nome por linha)"),
                o.default.createElement("textarea", {
                  style: { height: 64 },
                  value: W.cfg.financeiro,
                  onChange: (z) => {
                    let U = { ...W.cfg, financeiro: z.target.value };
                    (Q0(U), S({ ...W, cfg: U, texto: tc(W.c, U) }));
                  },
                }),
                o.default.createElement(
                  "label",
                  null,
                  "Modelo do texto (use ",
                  "{nf}",
                  " ",
                  "{pedido}",
                  " ",
                  "{motivo}",
                  " ",
                  "{filial}",
                  " ",
                  "{solicitante}",
                  " ",
                  "{financeiro}",
                  ")",
                ),
                o.default.createElement("textarea", {
                  style: { height: 84 },
                  value: W.cfg.modelo,
                  onChange: (z) => {
                    let U = { ...W.cfg, modelo: z.target.value };
                    (Q0(U), S({ ...W, cfg: U, texto: tc(W.c, U) }));
                  },
                }),
                o.default.createElement(
                  "small",
                  null,
                  "Fica salvo neste navegador. Obs.: o Teams só cria a marcação de verdade se você digitar @ e escolher o nome — o texto copiado já vem com o nome para você conferir.",
                ),
              ),
          ),
        ),
      de &&
        o.default.createElement(
          "div",
          { className: "cnl-modal", onMouseDown: (z) => z.target === z.currentTarget && ce(null) },
          o.default.createElement(
            "div",
            null,
            o.default.createElement("h4", null, "Nomes fixos do Solicitante"),
            o.default.createElement(
              "p",
              null,
              "Marque os nomes que devem aparecer no campo Solicitante. A lista vem da equipe da expedição (bipador/embalador das postagens) e dos nomes já usados.",
            ),
            o.default.createElement("input", {
              className: "cnl-busca",
              value: de.busca,
              onChange: (z) => ce({ ...de, busca: z.target.value }),
              placeholder: "Buscar nome...",
            }),
            o.default.createElement(
              "div",
              { className: "cnl-lista" },
              de.carregando && o.default.createElement("div", { className: "cnl-vazio" }, "Carregando…"),
              de.lista
                .filter((z) => !de.busca.trim() || z.nome.toLowerCase().includes(de.busca.trim().toLowerCase()))
                .map((z) =>
                  o.default.createElement(
                    "label",
                    { key: z.nome },
                    o.default.createElement("input", {
                      type: "checkbox",
                      checked: !!z.fixo,
                      onChange: (U) => xt(z.nome, U.target.checked),
                    }),
                    z.nome,
                    z.qtd > 0 && o.default.createElement("small", null, z.qtd, " registro(s)"),
                  ),
                ),
            ),
            o.default.createElement(
              "div",
              { style: { display: "flex", gap: 8, marginBottom: 12 } },
              o.default.createElement("input", {
                className: "cnl-busca",
                style: { marginBottom: 0 },
                value: de.novo,
                onChange: (z) => ce({ ...de, novo: z.target.value }),
                onKeyDown: (z) => z.key === "Enter" && Ft(),
                placeholder: "Adicionar outro nome...",
              }),
              o.default.createElement("button", { type: "button", className: "cnl-btn", onClick: Ft }, "Adicionar"),
            ),
            o.default.createElement(
              "div",
              { className: "cnl-linha" },
              o.default.createElement(
                "button",
                { type: "button", className: "cnl-btn pri", style: { flex: "none" }, onClick: () => ce(null) },
                "Fechar",
              ),
            ),
          ),
        ),
      _ && o.default.createElement("div", { className: `cnl-toast ${_.tipo}` }, _.texto),
    )
  );
}
var vl = {
    "B140XW02-V.1": "F-01-11",
    "B156XTN08.1": "F-01-9",
    "B156XW02-V.2": "F-01-6",
    "B156XW04-V.8": "F-01-2",
    "LP140WH1-TLA2": "F-02-9",
    "LP156WF4-SPJ1": "F-02-7",
    "N140BGE-E43": "F-02-4",
    "N140HCA-EAC": "F-02-2",
    "N156BGA-EA3": "F-03-11",
    "N156HCA-EBA": "F-03-8",
    "N156HGA-EAL": "F-03-5",
    "NT140WHM-N43": "F-03-2",
    "B101AW06-V.1": "F-04-11",
    B116XW02: "F-04-11",
    "B116XW03-V.2": "F-04-11",
    "B116XW05-V.0": "F-04-11",
    B133XW01: "F-04-10",
    "B140RW01-V.0": "F-04-10",
    B140RW02: "F-04-10",
    "B140XTT01.0": "F-04-10",
    "B140XW03-V.0": "F-04-9",
    B156HW01: "F-04-8",
    "B156XTN01.0": "F-04-7",
    "B156XW03-V.1": "F-04-6",
    "B156XW04-V.8-G": "F-04-5",
    B173HW01: "F-04-4",
    "B173RTN01.1": "F-04-3",
    CLAA156WA01A: "F-04-2",
    "DP-AP127": "F-05-11",
    "DP-AP140": "F-05-11",
    "DP-AP170": "F-05-11",
    "DP-AP171": "F-05-11",
    "DP-AP190": "F-05-10",
    "DP-AP205": "F-05-10",
    "DP-AP230": "F-05-10",
    "DP-AP231": "F-05-10",
    "DP-AP232": "F-05-9",
    "DP-FM100": "F-05-9",
    "DP-FN600": "F-05-9",
    "DP-HF140": "F-05-9",
    "DP-HM320": "F-05-8",
    "DP-HM400": "F-05-8",
    "DP-LE520": "F-05-7",
    "DP-LF150": "F-05-7",
    "DP-LF151": "F-05-6",
    "DP-LF153": "F-05-6",
    "DP-LM100": "F-05-5",
    "DP-LM200": "F-05-5",
    "DP-LM300": "F-05-4",
    "DP-LM500": "F-05-4",
    "DP-LM700": "F-05-3",
    "DP-LP756": "F-05-3",
    "DP-SJ300": "F-05-2",
    "DP-SM300": "F-05-2",
    "DP-SM400": "F-05-1",
    "DP-SM510": "F-05-1",
    "LP101WH2-TLB1": "F-06-11",
    LP101WSA: "F-06-11",
    LP116WH2: "F-06-11",
    "LP133WP1-TJA1": "F-06-10",
    "LP133WX1-TLB1": "F-06-10",
    "LP140WF1-SPU1": "F-06-9",
    "LP140WH1-TLD1": "F-06-9",
    LP141WX1: "F-06-9",
    LP154WX4: "F-06-8",
    "LP156WF7-SPN3": "F-06-6",
    "LP156WF9-SPK2": "F-06-6",
    LP173WD1: "F-06-4",
    LTN140AT21: "F-06-3",
    LTN141AT16: "F-06-2",
    LTN145AT01: "F-06-2",
    LTN156AT36: "F-06-1",
    "LTN156AT40-D01": "F-07-11",
    "N116BGE-EA2": "F-07-10",
    "N133BGE-EAB": "F-07-10",
    "N133HSE-EA1": "F-07-9",
    "N140BGE-LB2": "F-07-9",
    "N140FGE-EA2": "F-07-9",
    "N140HCA-E5C": "F-07-8",
    "N140HCE-EN1": "F-07-8",
    "N140HCE-G52": "F-07-7",
    "N140HGE-EBA": "F-07-7",
    "N156BGA-E53": "F-07-6",
    "N156HGE-LA1": "F-07-6",
    "N173HCE-E31": "F-07-5",
    "NT116WHM-N23": "F-07-4",
    "NT140WHM-N44": "F-07-4",
    "NT140WHM-N45": "F-07-3",
    "NT156FHM-N43": "F-07-2",
    "NV156FHM-N4T": "F-07-1",
    "BB20-AC19-3": "A-01-4",
    "BB20-AC19-B21": "A-01-3",
    "BB20-AC19-C21": "A-01-2",
    "BB20-AP16-L": "A-01-2",
    "BB20-AP45-M2": "A-01-2",
    "BB20-AP85-M2": "A-01-2",
    "BB20-AS019-4": "A-02-4",
    "BB20-AS019-45": "A-02-4",
    "BB20-BC65": "A-02-4",
    "BB20-CP6300": "A-02-3",
    "BB20-DE19-A": "A-02-3",
    "BB20-DE19-B": "A-02-3",
    "BB20-DE19-T6": "A-02-2",
    "BB20-DE19-U6": "A-03-4",
    "BB20-HP19-4": "A-03-5",
    "BB20-HP19-SP": "A-03-4",
    "BB20-LE20-E": "A-03-3",
    "BB20-LE20-F": "A-03-3",
    "BB20-SA19-40B": "A-03-3",
    "BB20-SA19-A": "A-03-2",
    "BB20-SO19-B2": "A-03-2",
    "BB20-TO19-B25": "A-03-2",
    "BB20-19V-150W": "B-03-4",
    "BB20-19V-180W": "B-03-4",
    "BB20-19V-230W": "B-03-4",
    "BB20-AC19-E21": "B-03-4",
    "BB20-AC19-E25": "B-03-4",
    "BB20-AC19-F21": "B-03-4",
    "BB20-AC19-ONE": "B-03-4",
    "BB20-AP140-M3": "B-03-4",
    "BB20-AP18-L": "B-03-4",
    "BB20-AP29-C": "B-03-4",
    "BB20-AP30-C": "B-03-4",
    "BB20-AP61-C": "B-03-4",
    "BB20-AP65-M2": "B-03-4",
    "BB20-AP89-C": "B-03-4",
    "BB20-AP96-C": "B-03-4",
    "BB20-AP96-M3": "B-03-3",
    "BB20-AS019": "B-03-3",
    "BB20-AS019-3": "B-03-3",
    "BB20-AS019-5": "B-03-3",
    "BB20-AS019-6": "B-03-3",
    "BB20-BC45": "B-03-3",
    "BB20-BD45": "B-03-3",
    "BB20-BD65": "B-03-3",
    "BB20-BD90": "B-03-3",
    "BB20-CP19-B": "B-03-3",
    "BB20-CP6300-120": "B-03-3",
    "BB20-CP6300-135": "B-03-3",
    "BB20-CP6300-H": "B-03-3",
    "BB20-DE19-E": "B-03-3",
    "BB20-DE19-T13": "B-03-3",
    "BB20-DE19-U9": "B-03-2",
    "BB20-HP19-40": "B-03-2",
    "BB20-HP19-5": "B-03-2",
    "BB20-IB16-C": "B-03-2",
    "BB20-IB20-B": "B-03-2",
    "BB20-LE20-A": "B-03-2",
    "BB20-LE20-B": "B-03-2",
    "BB20-LE20-C": "B-03-2",
    "BB20-LG19-65": "B-03-2",
    "BB20-PO05": "B-03-2",
    "BB20-PO20": "B-03-2",
    "BB20-SA19-40W": "B-03-2",
    "BB20-SA19-C": "B-03-2",
    "BB11-AC066": "C-01-4",
    "BB11-AC074": "C-01-4",
    "BB11-AC077": "C-01-4",
    "BB11-AC081": "C-01-4",
    "BB11-AC082": "C-01-3",
    "BB11-AC085": "C-01-3",
    "BB11-AC086": "C-01-3",
    "BB11-AC088": "C-01-3",
    "BB11-AS065": "C-01-3",
    "BB11-DE080": "C-01-2",
    "BB11-DE085": "C-01-2",
    "BB11-DE099": "C-01-2",
    "BB11-DE099-4C": "C-01-2",
    "BB11-DE101": "C-01-2",
    "BB11-DE111": "C-02-4",
    "BB11-DE120": "C-02-4",
    "BB11-DE125": "C-02-4",
    "BB11-DE125-4C": "C-02-3",
    "BB11-HP058": "C-02-3",
    "BB11-HP081": "C-02-3",
    "BB11-HP113": "C-02-3",
    "BB11-LE023": "C-02-2",
    "BB11-LE043": "C-02-2",
    "BB11-SS015": "C-02-2",
    "BB11-SS021": "C-02-2",
    "BB11-AC091": "B-01-1",
    "BB11-AC095": "B-01-1",
    "BB11-AP024": "B-01-1",
    "BB11-AP038": "B-01-1",
    "BB11-AP041": "B-01-1",
    "BB11-AP044": "B-01-1",
    "BB11-AP047": "B-01-1",
    "BB11-AP048": "B-01-1",
    "BB11-AP049": "B-01-1",
    "BB11-AS046": "B-01-1",
    "BB11-AS092": "B-01-1",
    "BB11-AS213": "B-01-1",
    "BB11-AS325": "B-01-1",
    "BB11-AS413": "B-01-1",
    "BB11-AS435": "B-01-1",
    "BB11-AS510": "B-01-1",
    "BB11-AS515": "B-01-1",
    "BB11-AS515-B": "B-01-1",
    "BB11-AS515-C": "B-01-1",
    "BB11-AS515-D": "B-01-1",
    "BB11-AS531": "B-01-1",
    "BB11-DE064": "B-02-1",
    "BB11-DE078-6C": "B-02-1",
    "BB11-DE082": "B-02-1",
    "BB11-DE097": "B-02-1",
    "BB11-DE127": "B-02-1",
    "BB11-DE141-HH": "B-02-1",
    "BB11-DE143": "B-02-1",
    "BB11-DE150-H": "B-02-1",
    "BB11-DE156": "B-02-1",
    "BB11-DE157": "B-02-1",
    "BB11-DE410": "B-02-1",
    "BB11-DE9310": "B-02-1",
    "BB11-HP025-A": "B-02-1",
    "BB11-HP102": "B-02-1",
    "BB11-HP109": "B-02-1",
    "BB11-HP112": "B-02-1",
    "BB11-HP119": "B-02-1",
    "BB11-HP120": "B-02-1",
    "BB11-HP360": "B-02-1",
    "BB11-HP361": "B-02-1",
    "BB11-LE051": "B-02-1",
    "BB11-LE053": "B-02-1",
    "BB11-LE058-C": "B-02-1",
    "BB11-LE062": "B-02-1",
    "BB11-LE066": "B-02-1",
    "BB11-LE070": "B-03-1",
    "BB11-LE070-2C": "B-03-1",
    "BB11-LE540": "B-03-1",
    "BB11-LE720": "B-03-1",
    "BB11-SO043": "B-03-1",
    "BB11-SO044": "B-03-1",
    "BB11-SO049": "B-03-1",
    "BB11-SO240": "B-03-1",
    "BB11-SS030": "B-03-1",
    "BB11-SS670": "B-03-1",
    "BB11-SS940": "B-03-1",
    "ML-HP058": "B-03-1",
    "KB-AC111": "D-01-4",
    "KB-AC117": "D-01-4",
    "KB-AC117-F2": "D-01-4",
    "KB-AC3810T-WF": "D-01-4",
    "KB-AC3830T": "D-01-4",
    "KB-AC431": "D-01-4",
    "KB-AC515-54": "D-01-3",
    "KB-AC515-F2": "D-01-3",
    "KB-AC521": "D-01-3",
    "KB-AC5830T": "D-01-3",
    "KB-AP1278-US": "D-01-3",
    "KB-AP1369-US": "D-01-3",
    "KB-AS103-ST": "D-01-2",
    "KB-AS104": "D-01-2",
    "KB-ASK45": "D-01-2",
    "KB-ATI8371": "D-01-2",
    "KB-DE101": "D-01-2",
    "KB-DE105": "D-01-2",
    "KB-DE109": "D-02-4",
    "KB-DE111": "D-02-4",
    "KB-DE113": "D-02-4",
    "KB-DIN14-3": "D-02-4",
    "KB-DIN14-3SLI": "D-02-4",
    "KB-DIN14RN": "D-02-4",
    "KB-DIN15-3": "D-02-3",
    "KB-DIN15-3LI": "D-02-3",
    "KB-DIN1545": "D-02-3",
    "KB-DIN15R": "D-02-3",
    "KB-HP104": "D-02-3",
    "KB-HP132": "D-02-3",
    "KB-HP135": "D-02-2",
    "KB-HPCQ42": "D-02-2",
    "KB-HPCQ43": "D-02-2",
    "KB-LE109/IMP": "D-02-2",
    "KB-LE113": "D-02-2",
    "KB-LE114": "D-02-2",
    "KB-LE115": "D-03-4",
    "KB-LE122": "D-03-4",
    "KB-LE431": "D-03-4",
    "KB-LG102": "D-03-4",
    "KB-NAC-10": "D-03-4",
    "KB-NAC-13": "D-03-4",
    "KB-NAC-13-F4": "D-03-3",
    "KB-NAC-13-F4A": "D-03-3",
    "KB-NAC-13-TCB": "D-03-3",
    "KB-NAC-14": "D-03-3",
    "KB-NAC-40": "D-03-3",
    "KB-SAN300-E5K": "D-03-3",
    "KB-SAN300-E5K-WH": "D-03-2",
    "KB-SANP270": "D-03-2",
    "KB-SANP300": "D-03-2",
    "KB-SANP370": "D-03-2",
    "KB-SANP550": "D-03-2",
    "KB-SARV411": "D-03-2",
    "SM2-2280F9-128G": "E-01-4",
    "SM2-2280F9-256G": "E-01-4",
    "SM2-2280F9-512G": "E-01-4",
    "SM2-2280NVME-128G": "E-01-4",
    "SM2-2280NVME-256G": "E-01-4",
    "SM2-2280NVME-512G": "E-01-4",
    "SSD-700S3W5-120G": "E-01-4",
    "SSD-700S3W5-240G": "E-01-4",
    "SSD-700S3W5-480G": "E-01-4",
    "SM2-2280NVME-512-G4": "E-01-4",
    "SSD-700S3W5-1T": "E-01-4",
    "SSP-NVME2500-1TB": "E-01-4",
    "SSP-NVME2500-256G": "E-01-4",
    "D3NB-16E-4GB": "E-01-4",
    "D3NB-16E-8GB": "E-01-4",
    "D3NB-16L-4GB": "E-01-4",
    "D3NB-16L-8GB": "E-01-4",
    "D4DS-26E-16GB": "E-01-4",
    "D4DS-26E-8GB": "E-01-4",
    "D4NB-32E-16GB": "E-01-4",
    "D4NB-24E-4GB": "E-01-4",
    "D4NB-24E-8GB": "E-01-4",
    "D4NB-24E-16GB": "E-01-4",
    "D4NB-32E-8GB": "E-01-4",
    "D5DS-48E-16GB": "E-01-4",
    "D5NB-48E-16GB": "E-01-4",
    "D5NB-56E-16GB": "E-01-4",
    "KB-AC101": "E-01-3",
    "KB-AC102": "E-01-3",
    "KB-AC111-GAT": "E-01-3",
    "KB-AC115": "E-01-3",
    "KB-AC117-ES": "E-01-3",
    "KB-AC118": "E-01-3",
    "KB-AC119": "E-01-3",
    "KB-AC119-US": "E-01-3",
    "KB-AC120-BT": "E-01-3",
    "KB-AC3100": "E-01-3",
    "KB-AC515-43": "E-01-3",
    "KB-AC521-GAT": "E-01-3",
    "KB-AC531-BR": "E-01-3",
    "KB-AC5516": "E-01-3",
    "KB-AC591-32": "E-01-3",
    "KB-AC591G": "E-01-3",
    "KB-AC5930": "E-01-3",
    "KB-AC7000": "E-01-3",
    "KB-ACONE-B": "E-01-3",
    "KB-ACONE-WBR": "E-01-3",
    "KB-ACONE532": "E-01-3",
    "KB-ACONE751": "E-01-3",
    "KB-ACS3": "E-01-3",
    "KB-AP1278": "E-01-3",
    "KB-AP1286": "E-01-3",
    "KB-AP1286-US": "E-01-3",
    "KB-AP1369": "E-01-3",
    "KB-AP1370-US": "E-01-3",
    "KB-AP1398-US": "E-01-3",
    "KB-AP1425": "E-01-3",
    "KB-AP1502-US": "E-01-3",
    "KB-AP1534": "E-01-3",
    "KB-AP1706": "E-01-3",
    "KB-AP1708": "E-01-3",
    "KB-AP1932": "E-01-3",
    "KB-AP1989": "E-01-3",
    "KB-AP2141": "E-01-3",
    "KB-AS102": "E-01-3",
    "KB-AS105": "E-01-3",
    "KB-AS105-F": "E-01-3",
    "KB-AS105-W": "E-01-3",
    "KB-AS110": "E-01-3",
    "KB-AS117": "E-01-3",
    "KB-AS121-P": "E-01-3",
    "KB-AS122": "E-01-3",
    "KB-AS125": "E-01-3",
    "KB-AS126": "E-01-3",
    "KB-AS126-US": "E-01-3",
    "KB-AS127": "E-01-3",
    "KB-AS128": "E-01-3",
    "KB-AS131": "E-01-3",
    "KB-AS152": "E-01-3",
    "KB-AS154": "E-01-3",
    "KB-AS510UA": "E-01-3",
    "KB-AS515": "E-01-2",
    "KB-ASF80": "E-01-2",
    "KB-ASF80-BT": "E-01-2",
    "KB-ASK42": "E-01-2",
    "KB-ASK42-F": "E-01-2",
    "KB-ASK42-US": "E-01-2",
    "KB-ASM515": "E-01-2",
    "KB-ASN10": "E-01-2",
    "KB-ASUL20-SF": "E-01-2",
    "KB-ASUX21": "E-01-2",
    "KB-ASVS200": "E-01-2",
    "KB-ASVS400": "E-01-2",
    "KB-CPCQ25": "E-01-2",
    "KB-CPCQ29": "E-01-2",
    "KB-DE102": "E-01-2",
    "KB-DE104": "E-01-2",
    "KB-DE106": "E-01-2",
    "KB-DE107": "E-01-2",
    "KB-DE108": "E-01-2",
    "KB-DE109-BL": "E-01-2",
    "KB-DE1090": "E-01-2",
    "KB-DE111-LI": "E-01-2",
    "KB-DE114": "E-01-2",
    "KB-DE1310": "E-01-2",
    "KB-DE3501": "E-01-2",
    "KB-DE3501-SI": "E-01-2",
    "KB-DE3511": "E-01-2",
    "KB-DE3520": "E-01-2",
    "KB-DE4310-A": "E-01-2",
    "KB-DE500-BR": "E-01-2",
    "KB-DE5400": "E-01-2",
    "KB-DE5470-P": "E-01-2",
    "KB-DE5510": "E-01-2",
    "KB-DE5520": "E-01-2",
    "KB-DE5570": "E-01-2",
    "KB-DE6400-B-US": "E-01-2",
    "KB-DE6420-B": "E-01-2",
    "KB-DE7537": "E-01-2",
    "KB-DIN14R": "E-01-2",
    "KB-DIN14RN-LI": "E-01-2",
    "KB-DIN1545-S": "E-01-2",
    "KB-DIN16R": "E-01-2",
    "KB-DIN3168": "E-01-2",
    "KB-DV6000": "E-01-2",
    "KB-DVO3300": "E-01-2",
    "KB-EEE1000-B": "E-01-2",
    "KB-EEE1000HE": "E-01-2",
    "KB-EEE1005-BL": "E-01-2",
    "KB-EEE1015": "E-01-2",
    "KB-EEE1015-TC": "E-01-2",
    "KB-EEE1015-WH": "E-01-2",
    "KB-EEE900-W": "E-01-2",
    "KB-HCQ62": "E-01-2",
    "KB-HDM1-3": "E-01-2",
    "KB-HDM3": "E-02-4",
    "KB-HDM4-F": "E-02-4",
    "KB-HDM4-WH": "E-02-4",
    "KB-HDV2": "E-02-4",
    "KB-HDV2000": "E-02-4",
    "KB-HDV4-3BL": "E-02-4",
    "KB-HDV4-BL": "E-02-4",
    "KB-HDV5": "E-02-4",
    "KB-HDV6-3BL": "E-02-4",
    "KB-HDV6-6": "E-02-4",
    "KB-HDV6-BR": "E-02-4",
    "KB-HDV7-4-BR": "E-02-4",
    "KB-HDV7-4-PO": "E-02-4",
    "KB-HEL2530": "E-02-4",
    "KB-HEL2560": "E-02-4",
    "KB-HEL8440": "E-02-4",
    "KB-HEL8460": "E-02-4",
    "KB-HEL8460-F": "E-02-4",
    "KB-HEL8460-P": "E-02-4",
    "KB-HMI1000-BL": "E-02-4",
    "KB-HMI110-1BL": "E-02-4",
    "KB-HMI210": "E-02-4",
    "KB-HMI210-F": "E-02-4",
    "KB-HP0015": "E-02-4",
    "KB-HP027": "E-02-4",
    "KB-HP102": "E-02-4",
    "KB-HP103": "E-02-4",
    "KB-HP1030-G2": "E-02-4",
    "KB-HP104-SF": "E-02-4",
    "KB-HP108": "E-02-4",
    "KB-HP109": "E-02-4",
    "KB-HP114": "E-02-4",
    "KB-HP114-F": "E-02-4",
    "KB-HP115": "E-02-4",
    "KB-HP116": "E-02-4",
    "KB-HP117": "E-02-4",
    "KB-HP121": "E-02-3",
    "KB-HP124": "E-02-3",
    "KB-HP125-BR": "E-02-3",
    "KB-HP127": "E-02-3",
    "KB-HP127-PO": "E-02-3",
    "KB-HP127-PO-F": "E-02-3",
    "KB-HP128": "E-02-3",
    "KB-HP129": "E-02-3",
    "KB-HP130": "E-02-3",
    "KB-HP131": "E-02-3",
    "KB-HP133": "E-02-3",
    "KB-HP136": "E-02-3",
    "KB-HP137": "E-02-3",
    "KB-HP138": "E-02-3",
    "KB-HP140": "E-02-3",
    "KB-HP141": "E-02-3",
    "KB-HP2560": "E-02-3",
    "KB-HP320-BR": "E-02-3",
    "KB-HP420": "E-02-3",
    "KB-HP500": "E-02-3",
    "KB-HP500-US": "E-02-3",
    "KB-HP510": "E-02-3",
    "KB-HP650-G2": "E-02-3",
    "KB-HP6510": "E-02-3",
    "KB-HP6530B": "E-02-3",
    "KB-HP745-G3": "E-02-3",
    "KB-HP745-G7": "E-02-3",
    "KB-HP820-G1": "E-02-3",
    "KB-HPCQ10-BR": "E-02-3",
    "KB-HPCQ10-BR-SI": "E-02-3",
    "KB-HPCQ45": "E-02-3",
    "KB-HPCQ60": "E-02-3",
    "KB-HPCQ700": "E-02-3",
    "KB-HPG4-2-BL": "E-02-3",
    "KB-HPG4-2-WH": "E-02-3",
    "KB-HPR4330": "E-02-3",
    "KB-HPR4535": "E-02-3",
    "KB-HPR6440": "E-02-3",
    "KB-HPV6000": "E-02-3",
    "KB-LE10-2": "E-02-3",
    "KB-LE105": "E-02-3",
    "KB-LE106": "E-02-3",
    "KB-LE107": "E-02-3",
    "KB-LE108": "E-02-3",
    "KB-LE108-CI": "E-02-3",
    "KB-LE110": "E-02-3",
    "KB-LE111": "E-02-3",
    "KB-LE112": "E-02-3",
    "KB-LE116": "E-02-3",
    "KB-LE117": "E-02-3",
    "KB-LE118": "E-02-3",
    "KB-LE119": "E-02-3",
    "KB-LE120": "E-02-3",
    "KB-LE121": "E-02-3",
    "KB-LE123": "E-02-2",
    "KB-LE124": "E-02-2",
    "KB-LE125": "E-02-2",
    "KB-LE126": "E-02-2",
    "KB-LE127": "E-02-2",
    "KB-LE382": "E-02-2",
    "KB-LE480S": "E-02-2",
    "KB-LE481S": "E-02-2",
    "KB-LEB470": "E-02-2",
    "KB-LEB5050": "E-02-2",
    "KB-LEF514": "E-02-2",
    "KB-LEG50": "E-02-2",
    "KB-LEG530": "E-02-2",
    "KB-LEG550": "E-02-2",
    "KB-LEIZ450": "E-02-2",
    "KB-LEIZ450-FC": "E-02-2",
    "KB-LEIZ450-SF": "E-02-2",
    "KB-LES400-BL": "E-02-2",
    "KB-LES400-BL-US": "E-02-2",
    "KB-LES400-CI": "E-02-2",
    "KB-LEY520": "E-02-2",
    "KB-LEZ400": "E-02-2",
    "KB-LEZ480": "E-02-2",
    "KB-LG103": "E-02-2",
    "KB-LG105": "E-02-2",
    "KB-LG106": "E-02-2",
    "KB-LGA510-B": "E-02-2",
    "KB-LGC400-BR": "E-02-2",
    "KB-LGLW60": "E-02-2",
    "KB-LGR410-B": "E-02-2",
    "KB-LGR510-B": "E-02-2",
    "KB-LGU360": "E-02-2",
    "KB-NAC-06": "E-02-2",
    "KB-NAC-06-SF": "E-02-2",
    "KB-NAC-08": "E-02-2",
    "KB-NAC-12": "E-02-2",
    "KB-NAC-13-F": "E-02-2",
    "KB-NAC-15": "E-02-2",
    "KB-NAC-17": "E-02-2",
    "KB-NAC-21": "E-02-2",
    "KB-NAC-22": "E-02-2",
    "KB-NAC-23": "E-02-2",
    "KB-NAC-23-F10": "E-02-2",
    "KB-NAC-23-F4": "E-02-2",
    "KB-NAC-24": "E-02-2",
    "KB-NAC-25": "E-02-2",
    "KB-NAC-26": "E-02-2",
    "KB-NAC-27": "E-02-2",
    "KB-NAC-29": "E-02-2",
    "KB-NAC-30-B": "E-02-2",
    "KB-NAC-30-S": "E-02-2",
    "KB-NAC-31": "E-02-2",
    "KB-NAC-37": "E-02-2",
    "KB-NAC-38": "E-02-2",
    "KB-NAC-41": "E-03-4",
    "KB-NAC-42": "E-03-4",
    "KB-PO003": "E-03-4",
    "KB-PO3010": "E-03-4",
    "KB-SA102-WH-US": "E-03-4",
    "KB-SA103": "E-03-4",
    "KB-SA103-WH": "E-03-4",
    "KB-SA111": "E-03-4",
    "KB-SA112": "E-03-4",
    "KB-SA113": "E-03-4",
    "KB-SA114": "E-03-4",
    "KB-SA116": "E-03-4",
    "KB-SA117": "E-03-4",
    "KB-SA117-WH": "E-03-4",
    "KB-SA118": "E-03-4",
    "KB-SA119": "E-03-4",
    "KB-SA119-US": "E-03-4",
    "KB-SA120": "E-03-4",
    "KB-SA122": "E-03-4",
    "KB-SA311": "E-03-4",
    "KB-SANP270-WH": "E-03-4",
    "KB-SANP530": "E-03-4",
    "KB-SANP550-WH": "E-03-4",
    "KB-SANP670": "E-03-4",
    "KB-SAR480": "E-03-4",
    "KB-SARV511": "E-03-4",
    "KB-SO104-B": "E-03-4",
    "KB-SO104-W": "E-03-4",
    "KB-SO105": "E-03-4",
    "KB-SO107-B": "E-03-4",
    "KB-SO107-W": "E-03-4",
    "KB-SO109": "E-03-4",
    "KB-SOCW-BL": "E-03-4",
    "KB-SOCW-WH-F": "E-03-4",
    "KB-SOEA-BL": "E-03-4",
    "KB-SOEA-WH": "E-03-4",
    "KB-SOEB-BL": "E-03-3",
    "KB-SOEB-WH": "E-03-3",
    "KB-SOEB-WH-CF": "E-03-3",
    "KB-SOEE-BL": "E-03-3",
    "KB-SOEE-WH": "E-03-3",
    "KB-SOEG-BL": "E-03-3",
    "KB-SOEG-WH": "E-03-3",
    "KB-SOEH-WH": "E-03-3",
    "KB-SOFE14": "E-03-3",
    "KB-SOM-BL": "E-03-3",
    "KB-SOM-SI": "E-03-3",
    "KB-SOSD-BN": "E-03-3",
    "KB-SOSD-SI": "E-03-3",
    "KB-SOSVC14": "E-03-3",
    "KB-SOSVE15": "E-03-3",
    "KB-SOSVE15-WH-F": "E-03-3",
    "KB-SOSVE151": "E-03-3",
    "KB-SOSVF14-B": "E-03-3",
    "KB-SOSVP71": "E-03-3",
    "KB-SOSVT13": "E-03-3",
    "KB-TM2300-BR": "E-03-3",
    "KB-TO101": "E-03-3",
    "KB-TO104": "E-03-3",
    "KB-TOA200-BL": "E-03-3",
    "KB-TOA200-SI": "E-03-3",
    "KB-TOA660": "E-03-3",
    "KB-TOC650": "E-03-3",
    "KB-TOC850": "E-03-4",
    "KB-TOL600": "E-03-5",
    "KB-TOP750-BR": "E-03-6",
    "KB-AC5830T-TC": "E-03-3",
    "KB-AS103": "E-03-3",
    "KB-SANP270-TP-BLUE": "E-03-2",
    "KB-SANP370-TP-B": "E-03-2",
    "KB-SANP370-TP-S": "E-03-2",
    "KB-SARV511-TC": "E-03-2",
    "PM-14FNB": "E-03-2",
    "PM-15FNB": "E-03-2",
    "PM-16FNG": "E-03-2",
    "PM-17FNB": "E-03-2",
    "BB11-AC058-PRO": "C-03-4",
    "BB11-AC071": "C-03-4",
    "BB11-AC072": "C-03-4",
    "BB11-AC075": "C-03-4",
    "BB11-AP028": "C-03-4",
    "BB11-AP034": "C-03-4",
    "BB11-AS055": "C-03-4",
    "BB11-AS060": "C-03-4",
    "BB11-AS083": "C-03-4",
    "BB11-AS084": "C-03-3",
    "BB11-AS088": "C-03-3",
    "BB11-ASX510": "C-03-3",
    "BB11-DE040": "C-03-3",
    "BB11-DE061": "C-03-3",
    "BB11-DE063": "C-03-3",
    "BB11-DE065": "C-03-3",
    "BB11-DE069": "C-03-3",
    "BB11-DE084-6C": "C-03-3",
    "BB11-DE086": "C-03-2",
    "BB11-DE089": "C-03-2",
    "BB11-DE091": "C-03-2",
    "BB11-DE096": "C-03-2",
    "BB11-DE096-H": "C-03-2",
    "BB11-DE098": "C-03-2",
    "BB11-DE111-4C": "C-03-2",
    "BB11-DE119": "C-03-2",
    "BB11-DE121": "C-03-2",
    "BB11-DE122": "B-01-4",
    "BB11-DE124": "B-01-4",
    "BB11-DE133": "B-01-4",
    "BB11-DE133-3C": "B-01-4",
    "BB11-DE137": "B-01-4",
    "BB11-DE137-4C": "B-01-4",
    "BB11-DE138": "B-01-4",
    "BB11-DE147": "B-01-4",
    "BB11-DE155": "B-01-3",
    "BB11-DE3410": "B-01-3",
    "BB11-DE3500-3C": "B-01-3",
    "BB11-DE549": "B-01-3",
    "BB11-DE7300-3C": "B-01-3",
    "BB11-HP031-A": "B-01-3",
    "BB11-HP031-H": "B-01-3",
    "BB11-HP058-H": "B-01-3",
    "BB11-HP064": "B-01-3",
    "BB11-HP068": "B-01-2",
    "BB11-HP082": "B-01-2",
    "BB11-HP085": "B-01-2",
    "BB11-HP086": "B-01-2",
    "BB11-HP088": "B-01-2",
    "BB11-HP094": "B-01-2",
    "BB11-HP097": "B-01-2",
    "BB11-HP098": "B-01-2",
    "BB11-HP100": "B-02-4",
    "BB11-HP103": "B-02-4",
    "BB11-HP104": "B-02-4",
    "BB11-HP105": "B-02-4",
    "BB11-HP830": "B-02-4",
    "BB11-LE009": "B-02-4",
    "BB11-LE014": "B-02-4",
    "BB11-LE019": "B-02-4",
    "BB11-LE024": "B-02-4",
    "BB11-LE025": "B-02-3",
    "BB11-LE031": "B-02-3",
    "BB11-LE032": "B-02-3",
    "BB11-LE034": "B-02-3",
    "BB11-LE041": "B-02-3",
    "BB11-LE052": "B-02-3",
    "BB11-LE055": "B-02-3",
    "BB11-LE057": "B-02-3",
    "BB11-LG010-B": "B-02-3",
    "BB11-NA003-11": "B-02-2",
    "BB11-NA003-14": "B-02-2",
    "BB11-NA005": "B-02-2",
    "BB11-SO031": "B-02-2",
    "BB11-SO036": "B-02-2",
    "BB11-SS015-S": "B-02-2",
    "BB11-SS015-WH": "B-02-2",
    "BB11-SS017": "B-02-2",
    "BB11-TS004-A": "B-02-2",
    "KB-AC515-55": "D-01-1",
    "KB-ACN515-45": "D-01-1",
    "KB-ACN515-47": "D-01-1",
    "KB-ACSF314": "D-01-1",
    "KB-AP1370": "D-01-1",
    "KB-ASX513": "D-02-1",
    "KB-DEI5480": "D-02-1",
    "KB-DEV3401": "D-02-1",
    "KB-DEV3510": "D-02-1",
    "KB-DEV3510-SI": "D-02-1",
    "KB-LEI382MF": "D-02-1",
    "KB-TO105": "D-02-1",
    "BB11-AC003-11": "F-08-4",
    "BB11-AC037-V11": "F-08-4",
    "BB11-AC038-A": "F-08-4",
    "BB11-AC051-A": "F-08-4",
    "BB11-AC058-PRO-H": "F-08-3",
    "BB11-AC060-B": "F-08-3",
    "BB11-AC060-BW": "F-08-3",
    "BB11-AC060-SW": "F-08-3",
    "BB11-AC062-A": "F-08-2",
    "BB11-AC063": "F-08-2",
    "BB11-AC066-H": "F-08-2",
    "BB11-AC068": "F-08-1",
    "BB11-AC070": "F-08-1",
    "BB11-AC073": "F-08-1",
    "BB11-AC076": "F-09-4",
    "BB11-AC079": "F-09-4",
    "BB11-AC080": "F-09-4",
    "BB11-AC084": "F-09-3",
    "BB11-AC087": "F-09-3",
    "BB11-AC089": "F-09-3",
    "BB11-AC090": "F-09-2",
    "BB11-AP021-W": "F-09-2",
    "BB11-AP025": "F-09-2",
    "BB11-AP026": "F-09-1",
    "BB11-AP027": "F-09-1",
    "BB11-AP029": "F-09-1",
    "BB11-AP030": "F-10-4",
    "BB11-AP031": "F-10-4",
    "BB11-AP032": "F-10-3",
    "BB11-AP033": "F-10-3",
    "BB11-AP035": "F-10-2",
    "BB11-AP036": "F-10-2",
    "BB11-AP037": "F-10-2",
    "BB11-AP039": "F-10-1",
    "BB11-AP043": "F-10-1",
    "BB11-AP045": "F-11-4",
    "BB11-AP046": "F-11-4",
    "BB11-AP050": "F-11-4",
    "BB11-AS052-B": "F-11-3",
    "BB11-AS054": "F-11-3",
    "BB11-AS056": "F-11-3",
    "BB11-AS057": "F-11-2",
    "BB11-AS059": "F-11-2",
    "BB11-AS061": "F-11-2",
    "BB11-AS062": "F-11-2",
    "BB11-AS063": "F-11-1",
    "BB11-AS064": "F-11-1",
    "BB11-AS066": "F-12-4",
    "BB11-AS067": "F-12-4",
    "BB11-AS068": "F-12-4",
    "BB11-AS071": "F-12-4",
    "BB11-AS073": "F-12-4",
    "BB11-AS074": "F-12-3",
    "BB11-AS075": "F-12-3",
    "BB11-AS076": "F-12-2",
    "BB11-AS077": "F-12-2",
    "BB11-AS078": "F-12-2",
    "BB11-AS079": "F-12-1",
    "BB11-AS081": "F-12-1",
    "BB11-AS085": "F-12-1",
    "BB11-AS430": "F-12-1",
    "BB11-AS433": "F-13-4",
    "BB11-AS451": "F-13-4",
    "BB11-AS507": "F-13-3",
    "BB11-AS540": "F-13-3",
    "BB11-AS550": "F-13-3",
    "BB11-CP041-A": "F-13-2",
    "BB11-CP045": "F-13-2",
    "BB11-DE003-A": "F-13-2",
    "BB11-DE025-PRO": "F-13-2",
    "BB11-DE037": "F-13-2",
    "BB11-DE040-H": "F-13-1",
    "BB11-DE050-6": "F-13-1",
    "BB11-DE051": "F-14-4",
    "BB11-DE052": "F-14-4",
    "BB11-DE052-H": "F-14-4",
    "BB11-DE053-H": "F-14-3",
    "BB11-DE055-HH": "F-14-3",
    "BB11-DE057": "F-14-3",
    "BB11-DE061-H": "F-14-3",
    "BB11-DE062": "F-14-2",
    "BB11-DE063-H": "F-14-2",
    "BB11-DE067": "F-14-1",
    "BB11-DE076": "F-14-1",
    "BB11-DE080-H": "F-14-1",
    "BB11-DE081": "F-14-1",
    "BB11-DE081-H": "F-15-4",
    "BB11-DE085-H": "F-15-4",
    "BB11-DE087": "F-15-4",
    "BB11-DE088": "F-15-3",
    "BB11-DE091-H": "F-15-3",
    "BB11-DE094": "F-15-3",
    "BB11-DE095": "F-15-2",
    "BB11-DE102": "F-15-2",
    "BB11-DE103": "F-15-2",
    "BB11-DE105": "F-15-2",
    "BB11-DE105-3C": "F-15-1",
    "BB11-DE107": "F-15-1",
    "BB11-DE108": "F-16-4",
    "BB11-DE110": "F-16-3",
    "BB11-DE118": "F-16-3",
    "BB11-DE119-3C": "F-16-3",
    "BB11-DE123": "F-16-2",
    "BB11-DE126": "F-16-2",
    "BB11-DE127-3C": "F-16-2",
    "BB11-DE128": "F-16-1",
    "BB11-DE132": "F-16-1",
    "BB11-DE134": "F-16-1",
    "BB11-DE135": "F-17-4",
    "BB11-DE138-4C": "F-17-4",
    "BB11-DE139": "F-17-4",
    "BB11-DE141": "F-17-3",
    "BB11-DE145": "F-17-3",
    "BB11-DE148": "F-17-3",
    "BB11-DE149": "F-17-2",
    "BB11-DE150": "F-17-2",
    "BB11-DE151": "F-17-1",
    "BB11-DE151-3C": "F-17-1",
    "BB11-DE153": "F-17-1",
    "BB11-DE154": "F-18-4",
    "BB11-DE175": "F-18-4",
    "BB11-DE3410-4C": "F-18-4",
    "BB11-DE3500-4C": "F-18-3",
    "BB11-DE3511-3C": "F-18-3",
    "BB11-DE3511-4C": "F-18-2",
    "BB11-DE3590": "F-18-2",
    "BB11-DE5285": "F-18-1",
    "BB11-DE5520-3C": "F-18-1",
    "BB11-DE5520-4C": "F-18-1",
    "BB11-DE5550": "F-19-4",
    "BB11-DE7300-4C": "F-19-4",
    "BB11-HP019-A": "F-19-4",
    "BB11-HP020-PRO": "F-19-3",
    "BB11-HP022-PRO": "F-19-3",
    "BB11-HP028-H": "F-19-3",
    "BB11-HP033-A": "F-19-3",
    "BB11-HP034-A": "F-19-2",
    "BB11-HP035-PRO": "F-19-2",
    "BB11-HP040-H": "F-19-2",
    "BB11-HP043-A": "F-19-2",
    "BB11-HP044-A": "F-19-1",
    "BB11-HP046": "F-19-1",
    "BB11-HP050-H": "F-19-1",
    "BB11-HP051": "F-19-1",
    "BB11-HP054": "F-20-4",
    "BB11-HP056": "F-20-4",
    "BB11-HP066": "F-20-4",
    "BB11-HP067": "F-20-4",
    "BB11-HP070": "F-20-4",
    "BB11-HP072": "F-20-3",
    "BB11-HP073": "F-20-3",
    "BB11-HP073-9C": "F-20-3",
    "BB11-HP074": "F-20-2",
    "BB11-HP077": "F-20-2",
    "BB11-HP078": "F-20-1",
    "BB11-HP080": "F-20-1",
    "BB11-HP087": "F-20-1",
    "BB11-HP088-S": "F-21-4",
    "BB11-HP089": "F-21-4",
    "BB11-HP090": "F-21-4",
    "BB11-HP092": "F-21-3",
    "BB11-HP093": "F-21-3",
    "BB11-HP101": "F-21-3",
    "BB11-HP1030": "F-21-3",
    "BB11-HP108": "F-21-2",
    "BB11-HP110": "F-21-2",
    "BB11-HP111": "F-21-2",
    "BB11-HP114": "F-21-1",
    "BB11-HP115": "F-21-1",
    "BB11-HP117": "F-21-1",
    "BB11-HP455": "F-22-4",
    "BB11-IB049-PRO": "F-22-4",
    "BB11-IB055-H": "F-22-4",
    "BB11-IT008-A": "F-22-4",
    "BB11-LE007-A": "F-22-3",
    "BB11-LE007-H": "F-22-3",
    "BB11-LE010": "F-22-3",
    "BB11-LE015": "F-22-3",
    "BB11-LE017": "F-22-3",
    "BB11-LE019-H": "F-22-2",
    "BB11-LE021": "F-22-2",
    "BB11-LE022": "F-22-2",
    "BB11-LE027": "F-22-1",
    "BB11-LE029": "F-22-1",
    "BB11-LE030": "F-22-1",
    "BB11-LE033": "F-23-4",
    "BB11-LE040": "F-23-4",
    "BB11-LE042": "F-23-4",
    "BB11-LE044": "F-23-4",
    "BB11-LE045": "F-23-3",
    "BB11-LE046": "F-23-3",
    "BB11-LE047": "F-23-3",
    "BB11-LE050": "F-23-2",
    "BB11-LE058": "F-23-2",
    "BB11-LE063": "F-23-2",
    "BB11-LE280": "F-23-2",
    "BB11-LE507": "F-23-1",
    "BB11-LE910": "F-23-1",
    "BB11-LEL380": "F-23-1",
    "BB11-LET490": "F-23-1",
    "BB11-LG001-A": "F-24-4",
    "BB11-LG009": "F-24-4",
    "BB11-LG009-WH": "F-24-4",
    "BB11-LG011": "F-24-3",
    "BB11-LG012": "F-24-3",
    "BB11-MS002": "F-24-2",
    "BB11-NA006": "F-24-2",
    "BB11-NA018": "F-24-2",
    "BB11-NA021": "F-24-2",
    "BB11-SO015-PRO": "F-24-1",
    "BB11-SO023-A": "F-24-1",
    "BB11-SO023-A2": "F-24-1",
    "BB11-SO025-H": "F-25-4",
    "BB11-SO038": "F-25-4",
    "BB11-SO040": "F-25-4",
    "BB11-SO041": "F-25-3",
    "BB11-SO042": "F-25-3",
    "BB11-SO046": "F-25-3",
    "BB11-SO047": "F-25-3",
    "BB11-SS005-A": "F-25-2",
    "BB11-SS016": "F-25-2",
    "BB11-SS019": "F-25-2",
    "BB11-SS022": "F-25-1",
    "BB11-SS037": "F-25-1",
    "BB11-SS200": "F-25-1",
    "BB11-SS530": "F-25-1",
    "BB11-TS004-H": "F-23-5",
    "BB11-TS029-A": "F-23-5",
    "BB11-TS085-A": "F-24-5",
    "BB11-TS091": "F-24-5",
    "BB11-TS092": "F-24-5",
    "BB11-TS096": "F-25-5",
    "ML-AC077": "F-25-5",
    "ML-DE080-H": "F-25-5",
    "ML-DE120": "F-25-5",
    "BB20-AP140-C": "A-01-1",
    "BB24-MACB-M": "A-01-1",
    "BB20-MI3": "A-01-1",
    "BB24-SAMS-M": "A-01-1",
    "BB24-HP-M": "A-01-1",
    "BB20-HP19": "A-01-1",
    "CA-AC315": "F-26-8",
    "CA-AC515": "F-26-8",
    "CA-ACVX15": "F-26-8",
    "CA-AN515": "F-26-7",
    "CA-DE3590": "F-26-7",
    "CAB-AC315": "F-26-7",
    "CAB-AC515": "F-26-6",
    "CAB-AC533": "F-26-6",
    "CAB-LE3156": "F-26-6",
    "CAB-SA300": "F-26-5",
    "CAB-SA530": "F-26-5",
    "CC-AC531": "F-26-5",
    "CC-DE3410": "F-26-4",
    "CC-DE3580": "F-26-4",
    "CC-DE5547": "F-26-4",
    "CC-DE5558": "F-26-3",
    "CCD-LEG50": "F-26-3",
    "CCD-SA550": "F-26-3",
    "CD-DE1430": "F-26-2",
    "CD-DE3490": "F-26-2",
    "CD-DE5110": "F-26-2",
    "CAB-DE15R6": "F-26-1",
    "CAB-DE17R4": "F-26-1",
    "BB12-CA001-A": "F-27-8",
    "BB12-CA008-A": "F-27-8",
    "BB12-CA009-A": "F-27-8",
    "BB12-CA010-A": "F-27-8",
    "BB12-CA014-A": "F-27-8",
    "BB12-CA015-A": "F-27-8",
    "BB12-CA016": "F-27-8",
    "BB12-CA016-D": "F-27-7",
    "BB12-CA017": "F-27-7",
    "BB12-CA018": "F-27-7",
    "BB12-CA019": "F-27-7",
    "BB12-CA020": "F-27-7",
    "BB12-CA022": "F-27-7",
    "BB12-CA023": "F-27-7",
    "BB12-CA024": "F-27-6",
    "BB12-CA025": "F-27-6",
    "BB12-CA027": "F-27-6",
    "BB12-CA028": "F-27-6",
    "BB12-CS006": "F-27-6",
    "BB12-FU004-A": "F-27-6",
    "BB12-FU006-A": "F-27-6",
    "BB12-GE002-A": "F-27-5",
    "BB12-GP001": "F-27-5",
    "BB12-GP002": "F-27-5",
    "BB12-GP003": "F-27-5",
    "BB12-GP004": "F-27-5",
    "BB12-GP005": "F-27-5",
    "BB12-GP006": "F-27-5",
    "BB12-HP001-A": "F-27-4",
    "BB12-NI004-A": "F-27-4",
    "BB12-NI008-A": "F-27-4",
    "BB12-NI009-A": "F-27-4",
    "BB12-NI011": "F-27-4",
    "BB12-NI012": "F-27-4",
    "BB12-NI013": "F-27-4",
    "BB12-NI014": "F-27-3",
    "BB12-NI015": "F-27-3",
    "BB12-NI016": "F-27-3",
    "BB12-NI018": "F-27-3",
    "BB12-NI019": "F-27-3",
    "BB12-NI025": "F-27-3",
    "BB12-OP006-A": "F-27-3",
    "BB12-OP008-A": "F-27-2",
    "BB12-PO001-A": "F-27-2",
    "BB12-PS002-A": "F-27-2",
    "BB12-PS005-A": "F-27-2",
    "BB12-PS006-A": "F-27-2",
    "BB12-PS008-A": "F-27-2",
    "BB12-PS011-A": "F-27-2",
    "BB12-PS014": "F-27-1",
    "BB12-SA003-A": "F-27-1",
    "BB12-SO006-A": "F-27-1",
    "BB12-SO007-A": "F-27-1",
    "BB12-SO011-A": "F-27-1",
    "BB12-SO012": "F-27-1",
    "BB12-SO013": "F-27-1",
    "BB12-SO014": "F-28-8",
    "BB12-SO015": "F-28-8",
    "BB12-SS006-A": "F-28-8",
    "BB12-SS007-A": "F-28-8",
    "BB13-JV034-A": "F-28-8",
    "BB13-PS008-H": "F-28-8",
    "BB13-PS014-A": "F-28-8",
    "BB13-PS016-A": "F-28-7",
    "BB13-PS027": "F-28-7",
    "BB13-SO001-H": "F-28-7",
    "BB13-SO002-B": "F-28-7",
    "BB13-SO005-A": "F-28-7",
    "BB13-SO005-C": "F-28-7",
    "BB13-SO013-A": "F-28-7",
    "BB13-SO014-A": "F-28-6",
    "BB13-SO015-A": "F-28-6",
    "BB13-SO017-A": "F-28-6",
    "BB13-SO017-H": "F-28-6",
    "BB13-SO025-DIG": "F-28-6",
    "BB13-SO026": "F-28-6",
    "BB13-SO027": "F-28-6",
    "BB13-SO031": "F-28-5",
    "BB13-SO032": "F-28-5",
    "BB13-SO033": "F-28-5",
    "BB13-SO034": "F-28-5",
    "BB14-BP-L100-A": "F-28-5",
    "BB14-BP-L100-S": "F-28-5",
    "BB14-BPU90": "F-28-5",
    "BB14-SO016": "F-28-4",
    "BB32-AHDBT-301": "F-28-4",
    "BB32-AHDBT-401": "F-28-4",
    "BB32-AHDBT-501": "F-28-4",
    "BB32-CA13L": "F-28-4",
    "BB32-CA1L": "F-28-4",
    "BB32-CA4L": "F-28-4",
    "BB32-CAE10": "F-28-3",
    "BB32-CAE10-D": "F-28-3",
    "BB32-CAE17": "F-28-3",
    "BB32-CAE6": "F-28-3",
    "BB32-CAE8": "F-28-3",
    "BB32-FU40": "F-28-3",
    "BB32-NIEL14": "F-28-3",
    "BB32-NIEL19": "F-28-2",
    "BB32-NIEL23": "F-28-2",
    "BB32-NIEL5": "F-28-2",
    "BB32-PABL19": "F-28-2",
    "BB32-SO550": "F-28-2",
    "BB32-SO570": "F-28-2",
    "BB32-SO970": "F-28-2",
    "BB32-SOBG1": "F-28-1",
    "BB32-SOBN1": "F-28-1",
    "BB32-SOFW50": "F-28-1",
    "BB32-SOFZ100": "F-28-1",
    "CABO-2507": "F-28-1",
    "CABO-4530": "F-28-1",
    "CABO-AC19-B21": "F-28-1",
    "CABO-AP16-L": "F-29-8",
    "CABO-AP65-M2": "F-29-8",
    "CABO-BP": "F-29-8",
    "CABO-C": "F-29-8",
    "CABO-CP18-A": "F-29-8",
    "CABO-CP6300": "F-29-8",
    "CABO-DE19-A": "F-29-8",
    "CABO-DE19-T6": "F-29-7",
    "CABO-DE19-U6": "F-29-7",
    "CABO-HP19-4": "F-29-7",
    "CABO-HP19-40": "F-29-7",
    "CABO-LE79": "F-29-7",
    "CABO-LEUSB": "F-29-7",
    "CABO-SA19-40B": "F-29-7",
    "CABO-SA19-A": "F-29-6",
    "CABO-SO19-B2": "F-29-6",
    "CABO-TO19-B25": "F-29-6",
    "CABO-TP": "F-29-6",
    "CI-AC001": "F-29-6",
    "CI-AC002": "F-29-6",
    "CI-AC005": "F-29-6",
    "CI-AC3820T": "F-29-5",
    "CI-AC4738": "F-29-5",
    "CI-AC4739": "F-29-5",
    "CI-AC4750": "F-29-5",
    "CI-AC515": "F-29-5",
    "CI-AC5421": "F-29-5",
    "CI-AC5571": "F-29-5",
    "CI-AC5733": "F-29-4",
    "CI-AC5750": "F-29-4",
    "CI-ACE1-471": "F-29-4",
    "CI-ACV5-571": "F-29-4",
    "CI-AS002": "F-29-4",
    "CI-AS004": "F-29-4",
    "CI-AS543": "F-29-4",
    "CI-ASA45": "F-29-3",
    "CI-ASS400": "F-29-3",
    "CI-CCEU25": "F-29-3",
    "CI-DE001": "F-29-3",
    "CI-DE002": "F-29-3",
    "CI-DE005": "F-29-3",
    "CI-DE006": "F-29-3",
    "CI-DE007": "F-29-2",
    "CI-DE008": "F-29-2",
    "CI-DE1555": "F-29-2",
    "CI-DE3300": "F-29-2",
    "CI-DE3421": "F-29-2",
    "CI-DE3460": "F-29-2",
    "CI-DE3490": "F-29-2",
    "CI-DE3511": "F-29-1",
    "CI-DE3550": "F-29-1",
    "CI-DE3560": "F-29-1",
    "CI-DE3579": "F-29-1",
    "CI-DE5400": "F-29-1",
    "CI-DE5423": "F-29-1",
    "CI-DE5450": "F-29-1",
    "CI-DE5481": "F-30-8",
    "CI-DE5570": "F-30-8",
    "CI-DE7472": "F-30-8",
    "CI-DEN4030": "F-30-8",
    "CI-DEN4110": "F-30-8",
    "CI-DEN5030": "F-30-8",
    "CI-DEN5050": "F-30-8",
    "CI-DEN5110": "F-30-7",
    "CI-DEV3400": "F-30-7",
    "CI-HP001": "F-30-7",
    "CI-HP002": "F-30-7",
    "CI-HP005": "F-30-7",
    "CI-HP14K": "F-30-7",
    "CI-HP256": "F-30-7",
    "CI-HP4325": "F-30-6",
    "CI-HP4330S": "F-30-6",
    "CI-HP440": "F-30-6",
    "CI-HP4530S": "F-30-6",
    "CI-HP52000": "F-30-6",
    "CI-HPCQ42-3PIN": "F-30-6",
    "CI-HPCQ43": "F-30-6",
    "CI-HPDM42": "F-30-5",
    "CI-HPDV66": "F-30-5",
    "CI-HPDV67": "F-30-5",
    "CI-HPG6-2000": "F-30-5",
    "CI-IT7520": "F-30-5",
    "CI-LE001": "F-30-5",
    "CI-LE002": "F-30-5",
    "CI-LE003": "F-30-4",
    "CI-LE400": "F-30-4",
    "CI-LE530": "F-30-4",
    "CI-LEB480": "F-30-4",
    "CI-LEG460": "F-30-4",
    "CI-LEG470": "F-30-4",
    "CI-LES400": "F-30-4",
    "CI-LET470": "F-30-3",
    "CI-LG580": "F-30-3",
    "CI-PH14M2": "F-30-3",
    "CI-SA001": "F-30-3",
    "CI-SA003": "F-30-3",
    "CI-SA004": "F-30-3",
    "CI-SA0410": "F-30-3",
    "CI-SA300E": "F-30-2",
    "CI-SA905S": "F-30-2",
    "CI-SANP300": "F-30-2",
    "CI-SANP550": "F-30-2",
    "CI-SO001": "F-30-2",
    "CI-SO6100": "F-30-2",
    "CI-SOVT13": "F-30-2",
    "B116XW03-V.0": "E-01-1",
    "B156RW01-V.0": "E-01-1",
    "DP-FP100": "E-01-1",
    "DP-HF141": "E-01-1",
    "DP-HF142": "E-01-1",
    "DP-HF143": "E-01-1",
    "DP-HM101": "E-01-1",
    "DP-HM120": "E-01-1",
    "DP-NP100": "E-01-1",
    "DP-SJ270": "E-01-1",
    "DP-SJ340": "E-01-1",
    "DP-ST300": "E-01-1",
    LP154WX7: "E-01-1",
    "BB20-AC19-F25": "A-21-5",
    "BB20-AC19-ONE40": "A-21-5",
    "BB20-AP14.5": "A-21-5",
    "BB20-AS009": "A-21-4",
    "BB20-CP18-A": "A-21-4",
    "BB20-CP18-E": "A-21-3",
    "BB20-CP19-A": "A-21-3",
    "BB20-CP6300-180": "A-21-3",
    "BB20-DE19-C": "A-21-2",
    "BB20-DE19-D": "A-21-2",
    "BB20-DE19-G": "A-21-1",
    "BB20-DE19-N": "A-21-1",
    "BB20-DE19-T9": "A-21-1",
    "BB20-HP19-3": "A-22-5",
    "BB20-HP19-6": "A-22-5",
    "BB20-IB20-C": "A-22-4",
    "BB20-LE20-D": "A-22-3",
    "BB20-LE20-G": "A-22-3",
    "BB20-LE20-H": "A-22-2",
    "BB20-MI2": "A-22-2",
    "BB20-MI4": "A-22-1",
    "BB20-PH19": "A-22-1",
    "BB20-PH19-30": "A-22-1",
    "BB20-PO12-A": "A-22-1",
    "BB20-PO20-B": "A-23-5",
    "BB20-SA12-A": "A-23-4",
    "BB20-SO10.5-30": "A-23-4",
    "BB20-SO19-40": "A-23-3",
    "BB20-SO19-A": "A-23-3",
    "BB20-SO19-B": "A-23-3",
    "BB20-SO19-E": "A-23-2",
    "BB24-ACER-M": "A-23-2",
    "BB24-ASUS-M": "A-23-1",
    "BB24-DELL-M": "A-23-1",
    "BB24-LENV-M": "A-23-1",
    "MLF-DE19-T6": "A-23-1",
  },
  bb = "https://flvvhthiepgkgnnzrjmj.supabase.co",
  J0 = "sb_publishable_T3QCEpguQ4thZhUFDex70A_Kf9lMVYD",
  xb = bb + "/rest/v1",
  _c = ["0101", "0102"],
  Wg = "&filial=in.(" + _c.join(",") + ")",
  Bb = { apikey: J0, Authorization: "Bearer " + J0, "Content-Type": "application/json" },
  Sb = [
    { nome: "Amanda Carvalho", email: "bbdifaturamento04@gmail.com" },
    { nome: "André Fossati", email: "estoque@bbdi.com.br" },
    { nome: "Camile Macedo", email: "estoque.gbbdi6@gmail.com" },
    { nome: "Eduarda Rodrigues", email: "" },
    { nome: "Jorge William", email: "faturamento2@bestbattery.com.br" },
    { nome: "Lorenzo Silva", email: "" },
    { nome: "Pietro Fayh", email: "faturamento1@bestbattery.com.br" },
    { nome: "Thayna Evangelista", email: "thayna.evangelista@bbdi.com.br" },
  ].sort((e, t) => e.nome.localeCompare(t.nome, "pt-BR"));
var Eb = ["C9 Pedido", "C9 Produto", "C9 Filial", "C5_DESCTRS", "Quantidade a Faturar"],
  Y0 = [
    "C9 Produto ORDENCAO",
    "C9 Produto",
    "C9 Filial",
    "C9 Pedido",
    "Onda de Separacao",
    "Unidade de faturamento",
    "DataHoraFinanceiro",
    "Tipo de faturamento",
    "C5_DESCTRS",
    "Tipo de Separacao",
    "FILTRO V.1",
    "Quantidade a Faturar",
    "RANK 2",
    "RANK",
    "Quantidade a Faturar 2",
    "WMS PICKING",
    "WMS CAIXA",
    "Soma de Lead Time",
  ],
  pi = "PICKING POLUÍDO";
async function ye(e, t = {}) {
  let n = await fetch(xb + e, { ...t, headers: { ...Bb, ...(t.headers || {}) } }),
    a = await n.text();
  if (!n.ok) throw new Error(a || "Erro HTTP " + n.status);
  if (!a) return null;
  try {
    return JSON.parse(a);
  } catch {
    return a;
  }
}
function bi(e) {
  return String(e || "")
    .trim()
    .replace(/^"|"$/g, "");
}
function Ug(e, t) {
  let n = [],
    a = "",
    r = false;
  for (let i = 0; i < e.length; i++) {
    let l = e[i];
    l === '"'
      ? r && e[i + 1] === '"'
        ? ((a += '"'), i++)
        : (r = !r)
      : l === t && !r
        ? (n.push(a.trim()), (a = ""))
        : (a += l);
  }
  return (n.push(a.trim()), n);
}
function Cb(e) {
  let t = "	",
    n = e.split(/\r?\n/)[0] || "";
  return (
    n.includes(";") ? (t = ";") : n.includes(",") && (t = ","),
    e
      .split(/\r?\n/)
      .filter((a) => a.trim())
      .map((a) => Ug(a, t))
  );
}
async function Kg(e) {
  let t = new Uint8Array(await e.arrayBuffer()),
    n;
  return (
    t.length >= 2 && t[0] === 255 && t[1] === 254
      ? (n = new TextDecoder("utf-16le").decode(t.subarray(2)))
      : t.length >= 2 && t[0] === 254 && t[1] === 255
        ? (n = new TextDecoder("utf-16be").decode(t.subarray(2)))
        : t.length >= 3 && t[0] === 239 && t[1] === 187 && t[2] === 191
          ? (n = new TextDecoder("utf-8").decode(t.subarray(3)))
          : ((n = new TextDecoder("utf-8").decode(t)),
            n.includes("�") && (n = new TextDecoder("windows-1252").decode(t))),
    n.replace(/^\ufeff/, "")
  );
}
function wb(e) {
  let t = Cb(e);
  if (!t.length) throw new Error("O arquivo está vazio.");
  let n = t[0].map(bi),
    a = t.slice(1).filter((l) => l.length),
    r = {};
  n.forEach((l, d) => {
    r[l] = d;
  });
  let i = Eb.filter((l) => r[l] === void 0);
  return { headers: n, rows: a, idx: r, faltando: i };
}
function $o(e, t, n) {
  for (let a of n) {
    let r = t[a];
    if (r !== void 0) return bi(e[r]);
  }
  return "";
}
function Vg(e) {
  return (
    Number(
      String(e || "0")
        .replace(",", ".")
        .replace(/[^0-9.-]/g, ""),
    ) || 0
  );
}
function Vn(e) {
  try {
    let t = new Date(e);
    return Number.isNaN(t.getTime()) ? String(e || "") : t.toLocaleString("pt-BR");
  } catch {
    return e || "";
  }
}
function xi(e, t) {
  let n = [];
  for (let a = 0; a < e.length; a += t) n.push(e.slice(a, a + t));
  return n;
}
function Ab(e) {
  let t = bi(e).replace(/ /g, " ").replace(/\s+/g, "").toUpperCase();
  return (/^\d+[.,]0+$/.test(t) && (t = t.replace(/[.,]0+$/, "")), t);
}
function Gn(e) {
  return String(e || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}
function kb(e, t, n) {
  let a = $o(t, n, [
    "Localização",
    "Localizacao",
    "Endereço",
    "Endereco",
    "Localização Produto",
    "Localizacao Produto",
    "Endereço Produto",
    "Endereco Produto",
  ]);
  if (a) return a;
  let r = String(e || "")
    .trim()
    .toUpperCase();
  return vl[r] || vl[String(e || "").trim()] || "";
}
function yl(e, t) {
  let n = String(t || "").trim();
  if (n) return n;
  let a = String(e || "")
    .trim()
    .toUpperCase();
  return vl[a] || vl[String(e || "").trim()] || "";
}
function bl(e) {
  return e.tipoCaixa ? "PEDIDO_CAIXA" : e.pickingInsuficiente ? "PICKING_INSUFICIENTE" : "";
}
function Fb(e) {
  return e === "PEDIDO_CAIXA" ? "PEDIDO CAIXA" : "PICKING INSUFICIENTE";
}
function Pb(e) {
  let t = Gn(e);
  return /CORREIO|SEDEX|\bPAC\b/.test(t) ? "GRUPO_CORREIOS" : t;
}
function gc(e) {
  let t = [];
  (e || []).forEach((a) => {
    let r = String(a.transportadora || "").trim();
    r && !t.some((i) => Gn(i) === Gn(r)) && t.push(r);
  });
  let n = t.join(" / ");
  return n.length > 120 ? n.slice(0, 117) + "..." : n;
}
function Gg(e, t) {
  let n = t || 15,
    a = /* @__PURE__ */ new Map();
  e.forEach((l, d) => a.set(l, d));
  let r = /* @__PURE__ */ new Map();
  e.forEach((l) => {
    let d = String(l.filial);
    r.has(d) || r.set(d, /* @__PURE__ */ new Map());
    let u = Pb(l.transportadora),
      p = r.get(d);
    (p.has(u) || p.set(u, []), p.get(u).push(l));
  });
  let i = [];
  return (
    r.forEach((l) => {
      let d = [];
      l.forEach((g) => xi(g, n).forEach((f) => d.push(f)));
      let u = d.filter((g) => g.length === 1).map((g) => g[0]),
        p = d.filter((g) => g.length > 1),
        c = [];
      (u.forEach((g) => {
        let f = p.filter((x) => x.length < n).sort((x, w) => x.length - w.length);
        f.length ? f[0].push(g) : c.push(g);
      }),
        xi(c, n).forEach((g) => p.push(g)),
        p.forEach((g) => g.sort((f, x) => a.get(f) - a.get(x))),
        p.forEach((g) => i.push(g)));
    }),
    i
  );
}
function Qg(e, t, n, a) {
  let r = /* @__PURE__ */ new Map(),
    i = 0;
  for (let l of e) {
    let d = String($o(l, t, ["C9 Pedido"]) || "").trim(),
      u = String($o(l, t, ["C9 Produto"]) || "").trim();
    if (!d || !u) {
      i++;
      continue;
    }
    let p = Vg($o(l, t, ["Quantidade a Faturar", "Quantidade Faturar"]));
    r.has(d) ||
      r.set(d, {
        pedido: d,
        filial: $o(l, t, ["C9 Filial"]),
        transportadora: $o(l, t, ["C5_DESCTRS", "C5_DESCTRIS", "C5 DESCTRS"]),
        totalQtd: 0,
        tipoCaixa: false,
        pickingInsuficiente: false,
        linhasOriginais: [],
        itensMap: /* @__PURE__ */ new Map(),
      });
    let c = r.get(d);
    (c.linhasOriginais.push(l),
      (Gn($o(l, t, ["Tipo de faturamento", "Tipo de Faturamento", "Tipo Faturamento"])).includes("CAIXA") ||
        Gn($o(l, t, ["Tipo de Separacao", "Tipo de Separação", "Tipo Separacao"])).includes("CAIXA")) &&
        (c.tipoCaixa = true));
    let g = Gn($o(l, t, ["FILTRO V.1", "Filtro V.1", "FILTRO V1"]));
    (g.includes("INSUFICIENTE") || g.includes("PRODUTO EM FALTA")) && (c.pickingInsuficiente = true);
    let f = u.toUpperCase();
    c.itensMap.has(f) ||
      c.itensMap.set(f, {
        row: l,
        pedido: d,
        produto: u,
        qtd: 0,
        localizacao: kb(u, l, t),
        filial: c.filial,
        transportadora: c.transportadora,
        unidade: $o(l, t, ["Unidade de faturamento"]),
        financeiro: $o(l, t, ["DataHoraFinanceiro"]),
        dataExec: a,
        dataExecISO: n,
      });
    let x = c.itensMap.get(f);
    ((x.qtd += p), (c.totalQtd += p));
  }
  return {
    pedidos: [...r.values()].map((l) => ({
      pedido: l.pedido,
      filial: l.filial,
      transportadora: l.transportadora,
      totalQtd: l.totalQtd,
      tipoCaixa: l.tipoCaixa,
      pickingInsuficiente: l.pickingInsuficiente,
      linhasOriginais: l.linhasOriginais,
      itens: [...l.itensMap.values()],
    })),
    linhasInvalidas: i,
  };
}
async function Xg(e, t, n) {
  let a = [...new Set((n || []).map((l) => String(l || "").trim()).filter(Boolean))],
    r = [];
  for (let l = 0; l < a.length; l += 180) {
    let d = a
      .slice(l, l + 180)
      .map((u) => encodeURIComponent(u))
      .join(",");
    r.push(ye("/" + e + "?select=" + t + "&pedido=in.(" + d + ")&limit=5000"));
  }
  return (r.length ? await Promise.all(r) : []).flat().filter(Boolean);
}
async function Jg(e) {
  let t = await Xg("pedidos_gerados", "pedido,lista,usuario,data_hora", e),
    n = /* @__PURE__ */ new Map();
  return (
    t.forEach((a) => {
      let r = String(a.pedido || "").trim();
      r && !n.has(r) && n.set(r, { lista: a.lista || "", usuario: a.usuario || "", data_hora: a.data_hora || "" });
    }),
    n
  );
}
async function Yg(e) {
  let t = await Xg("pedidos_estoque", "pedido", e);
  return new Set(t.map((n) => String(n.pedido || "").trim()));
}
async function _b(e) {
  let t = [...new Set((e || []).map((n) => String(n || "").trim()).filter(Boolean))];
  t.length &&
    (await ye("/pedidos_estoque?on_conflict=pedido", {
      method: "POST",
      body: JSON.stringify(t.map((n) => ({ pedido: n }))),
      headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
    }));
}
async function Lb() {
  let e = await ye("/historico_listas?select=lista&order=id.desc&limit=1");
  if (!e || !e.length) return 1;
  let t = String(e[0].lista || "").match(/(\d+)/);
  if (!t) return 1;
  let n = Number(t[1]);
  return n >= 1e4 ? 1 : n + 1;
}
function Zg({ pedido: e, ordem: t, motivo: n, cabecalhos: a, linha: r, usuario: i, email: l }) {
  let d = {};
  Y0.forEach((p) => {
    d[p] = "";
  });
  let u = {};
  return (
    (a || []).forEach((p, c) => {
      let g = String(p ?? "").trim();
      u[g] = (u[g] || 0) + 1;
      let f = u[g] === 1 ? g : g + " " + u[g];
      Y0.includes(f) && (d[f] = String((r || [])[c] ?? ""));
    }),
    (d["C9 Pedido"] = String(e)),
    (d.motivo = n),
    (d.ordem = t),
    (d.chave = String(e) + "|" + n + "|" + t),
    (d.usuario = i),
    (d.email = l),
    d
  );
}
async function Rg(e) {
  let t = (e || []).filter((l) => String(l?.chave || "").trim() && String(l?.["C9 Pedido"] || "").trim());
  if (!t.length) return { confirmados: 0, pedidos: [] };
  let n = t.map((l) => ({ ...l, status: "PENDENTE", erro: null, enviado_em: null })),
    a = await ye("/fila_lancamentos?on_conflict=chave&select=chave,status,erro", {
      method: "POST",
      body: JSON.stringify(n),
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    }),
    r = Array.isArray(a) ? a : [],
    i = [
      ...new Set(
        r
          .map((l) =>
            String(l.chave || "")
              .split("|")[0]
              .trim(),
          )
          .filter(Boolean),
      ),
    ];
  return { confirmados: r.length, pedidos: i };
}
function Nb(e) {
  let t = String(e ?? "").trim();
  if (!t) return "";
  let n = t.match(/(\d{2})\/(\d{2})\/(\d{4})/),
    a,
    r,
    i;
  if (n) ((i = +n[1]), (r = +n[2]), (a = +n[3]));
  else {
    if (((n = t.match(/(\d{4})-(\d{2})-(\d{2})/) || t.match(/(?:^|\D)(\d{4})(\d{2})(\d{2})(?!\d)/)), !n)) return "";
    ((a = +n[1]), (r = +n[2]), (i = +n[3]));
  }
  return a < 2e3 || a > 2100 || r < 1 || r > 12 || i < 1 || i > 31
    ? ""
    : a + "-" + String(r).padStart(2, "0") + "-" + String(i).padStart(2, "0");
}
async function e1(e, t) {
  let n = Lc(),
    a = /* @__PURE__ */ new Map(),
    r = Object.keys(t || {}).filter((l) => /agend/i.test(l));
  r.length &&
    e.forEach((l) => {
      (l.linhasOriginais || []).forEach((d) => {
        r.forEach((u) => {
          let p = Nb(d[t[u]]);
          p && p > n && a.set(String(l.pedido).trim(), p);
        });
      });
    });
  try {
    let l = await Xn("/via_leitor_agente?select=pedido,agendado_para&agendado_para=gt." + n);
    (Array.isArray(l) ? l : []).forEach((d) => {
      let u = String(d.pedido || "").trim();
      u && !a.has(u) && a.set(u, String(d.agendado_para || "").slice(0, 10));
    });
  } catch {}
  let i = new Set(e.map((l) => String(l.pedido).trim()));
  return new Map([...a].filter(([l]) => i.has(l)));
}
async function Db(e, t) {
  let n = /* @__PURE__ */ new Date().toISOString(),
    a = Qg(e, t, n, Vn(n)),
    r = await e1(a.pedidos, t);
  a.pedidos = a.pedidos.filter((v) => !r.has(String(v.pedido).trim()));
  let i = a.pedidos.map((v) => v.pedido),
    l = a.pedidos.filter((v) => bl(v)).map((v) => v.pedido),
    d = await Jg(i),
    u = /* @__PURE__ */ new Set(),
    p = "";
  try {
    u = await Yg(l);
  } catch (v) {
    p = "Não foi possível consultar a tabela pedidos_estoque: " + v.message;
  }
  let c = [],
    g = [],
    f = 0,
    x = 0,
    w = 0;
  for (let v of a.pedidos) {
    let m = bl(v);
    if (m && u.has(String(v.pedido).trim())) {
      w++;
      continue;
    }
    if (m) {
      m === "PEDIDO_CAIXA" ? f++ : x++;
      continue;
    }
    if (d.has(v.pedido)) {
      let h = d.get(v.pedido) || {};
      g.push({ pedido: v.pedido, ...h });
      continue;
    }
    c.push(v);
  }
  return {
    grupos: Gg(c, 15).map((v) => ({
      filial: v[0].filial,
      transportadora: gc(v),
      pedidos: v.length,
      unidades: v.reduce((m, h) => m + h.totalQtd, 0),
    })),
    novosParaLista: c.length,
    caixa: f,
    insuf: x,
    paraEstoque: f + x,
    bloqueadosEstoque: w,
    repetidos: g,
    agendadosFora: [...r].map(([v, m]) => ({ pedido: v, dia: m })),
    linhasInvalidas: a.linhasInvalidas,
    aviso: p,
  };
}
async function Tb({ rows: e, headers: t, idx: n, usuario: a, email: r, origemArquivo: i }) {
  let l = /* @__PURE__ */ new Date().toISOString(),
    d = Vn(l),
    u = Qg(e, n, l, d),
    p = await e1(u.pedidos, n);
  u.pedidos = u.pedidos.filter((D) => !p.has(String(D.pedido).trim()));
  let c = u.pedidos.map((D) => D.pedido),
    g = u.pedidos.filter((D) => bl(D)).map((D) => D.pedido),
    [f, x, w] = await Promise.all([Jg(c), Lb(), Yg(g)]),
    F = [],
    v = [],
    m = /* @__PURE__ */ new Set(),
    h = 0,
    y = 0,
    B = 0,
    k = 0;
  for (let D of u.pedidos) {
    let O = bl(D);
    if (O && w.has(String(D.pedido).trim())) {
      k++;
      continue;
    }
    if (O) {
      (m.add(String(D.pedido).trim()),
        O === "PEDIDO_CAIXA" ? h++ : y++,
        D.linhasOriginais.forEach((H, M) => {
          v.push(Zg({ pedido: D.pedido, ordem: M + 1, motivo: Fb(O), cabecalhos: t, linha: H, usuario: a, email: r }));
        }));
      continue;
    }
    if (f.has(D.pedido)) {
      B++;
      continue;
    }
    F.push(D);
  }
  let L = x,
    C = [],
    _ = {},
    q = [],
    E = [];
  Gg(F, 15).forEach((D) => {
    let O = "Lista " + L++,
      H = D.reduce((Q, Y) => Q + Y.totalQtd, 0);
    (C.push({
      lista: O,
      filial: D[0].filial,
      transportadora: gc(D),
      pedidos: D.length,
      unidades: H,
      data_hora: l,
      impresso: "NÃO",
      status: "ATIVA",
    }),
      q.push({
        lista: O,
        data_hora: l,
        usuario: a,
        email: r,
        filial: D[0].filial,
        transportadora: gc(D),
        pedidos: D.length,
        unidades: H,
        impresso: "NÃO",
      }));
    let M = [];
    (D.forEach((Q) => {
      Q.itens.forEach((Y) => {
        let de = (Y.row || []).map((W) => bi(W));
        t.forEach((W, S) => {
          let te = bi(W).toLowerCase();
          (te === "quantidade a faturar" || te === "quantidade faturar") && (de[S] = String(Number(Y.qtd || 0)));
        });
        let ce = {
          lista: O,
          data_hora: l,
          usuario: a,
          email: r,
          filial: Y.filial,
          transportadora: Y.transportadora,
          pedido: Y.pedido,
          produto: Y.produto,
          quantidade: Y.qtd,
          localizacao: Y.localizacao,
          unidade_faturamento: Y.unidade,
          data_hora_financeiro: Y.financeiro,
          origem_arquivo: i,
          cabecalhos_csv: [...t],
          linha_csv: de,
        };
        (M.push(ce), E.push(ce));
      });
    }),
      (_[O] = M));
  });
  let A = [];
  if (
    (q.length &&
      A.push(
        ye("/historico_listas", { method: "POST", body: JSON.stringify(q), headers: { Prefer: "return=minimal" } }),
      ),
    E.length)
  ) {
    let D = /* @__PURE__ */ new Set(),
      O = [];
    (E.forEach((H) => {
      let M = String(H.pedido || "").trim();
      !M || D.has(M) || (D.add(M), O.push({ pedido: M, lista: H.lista, usuario: H.usuario, data_hora: H.data_hora }));
    }),
      A.push(
        ye("/pedidos_gerados?on_conflict=pedido", {
          method: "POST",
          body: JSON.stringify(O),
          headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        }),
      ),
      A.push(
        ye("/historico_pedidos", { method: "POST", body: JSON.stringify(E), headers: { Prefer: "return=minimal" } }),
      ));
  }
  let I = v.length ? Rg(v) : Promise.resolve({ confirmados: 0, pedidos: [] }),
    [, V] = await Promise.all([Promise.all(A), I]);
  if (v.length && V.confirmados === 0)
    throw new Error(
      "O sistema identificou pedidos para o estoque, mas o Supabase não confirmou a gravação na fila_lancamentos.",
    );
  if (m.size) {
    let D = new Set(V.pedidos || []);
    await _b([...m].filter((O) => D.has(O)));
  }
  return {
    listasSessao: C,
    registrosPorLista: _,
    resumo: {
      listas: q.length,
      pedidosEstoque: h + y,
      pedidosCaixa: h,
      pedidosInsuf: y,
      itensFila: V.confirmados,
      bloqueadosHistorico: B,
      bloqueadosEstoque: k,
      agendadosFora: p.size,
      linhasInvalidas: u.linhasInvalidas,
    },
  };
}
function xl(e, t) {
  let n = Array.isArray(e?.cabecalhos_csv) ? e.cabecalhos_csv : [],
    a = Array.isArray(e?.linha_csv) ? e.linha_csv : [],
    r = t.map((l) => String(l).trim().toLowerCase()),
    i = n.findIndex((l) =>
      r.includes(
        String(l || "")
          .trim()
          .toLowerCase(),
      ),
    );
  return i >= 0 ? String(a[i] ?? "").trim() : "";
}
function zb(e) {
  let t = /* @__PURE__ */ new Map(),
    n = 1;
  return e.map((a, r) => {
    let i = Ab(a.pedido) || "__linha_" + r;
    return (t.has(i) || t.set(i, n++), t.get(i));
  });
}
async function Ib(e) {
  let [t, n] = await Promise.all([
      ye(
        "/historico_listas?select=lista,data_hora,filial,transportadora,pedidos,unidades,status,motivo_ajuste,ajustada_em,ajustada_por,ajustada_email,usuario&lista=eq." +
          encodeURIComponent(e) +
          "&limit=1",
      ),
      ye(
        "/historico_pedidos?select=pedido,produto,quantidade,localizacao,unidade_faturamento,data_hora_financeiro,data_hora,filial,transportadora,cabecalhos_csv,linha_csv&lista=eq." +
          encodeURIComponent(e) +
          "&order=id.asc&limit=5000",
      ),
    ]),
    a = Array.isArray(t) && t.length ? t[0] : {};
  return { lista: e, info: a, registros: Array.isArray(n) ? n : [] };
}
async function Z0(e) {
  await Promise.all(
    e.map((t) =>
      ye("/historico_listas?lista=eq." + encodeURIComponent(t), {
        method: "PATCH",
        body: JSON.stringify({ impresso: "SIM" }),
        headers: { Prefer: "return=minimal" },
      }),
    ),
  );
}
async function Mb({ tipo: e, lista: t, pedido: n, motivo: a, usuario: r, email: i }) {
  e === "LISTA"
    ? await ye("/rpc/cancelar_lista_controlada", {
        method: "POST",
        body: JSON.stringify({ p_lista: t, p_motivo: a, p_usuario: r, p_email: i }),
        headers: { Prefer: "return=representation" },
      })
    : await ye("/rpc/remover_pedido_controlado", {
        method: "POST",
        body: JSON.stringify({ p_lista: t, p_pedido: n, p_motivo: a, p_usuario: r, p_email: i }),
        headers: { Prefer: "return=representation" },
      });
  let l = "";
  try {
    e === "LISTA"
      ? await ye("/pedidos_gerados?lista=eq." + encodeURIComponent(t), {
          method: "DELETE",
          headers: { Prefer: "return=minimal" },
        })
      : await ye("/pedidos_gerados?pedido=eq." + encodeURIComponent(n) + "&lista=eq." + encodeURIComponent(t), {
          method: "DELETE",
          headers: { Prefer: "return=minimal" },
        });
  } catch (d) {
    l = "A exclusão foi registrada, mas não consegui liberar o(s) pedido(s) para gerar de novo: " + d.message;
  }
  return l;
}
function hc(e) {
  return String(e || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}
function $b(e, t, n) {
  let a = (n || []).map(hc);
  for (let r = 0; r < e.length; r++) if (a.includes(hc(e[r]))) return t[r] ?? "";
  return "";
}
function Ob(e) {
  let t = Array.isArray(e?.linha_csv) ? e.linha_csv : [];
  if (t.length >= 7) {
    let r = t[6];
    return r == null ? "" : String(r);
  }
  let n = Array.isArray(e?.cabecalhos_csv) ? e.cabecalhos_csv : [],
    a = $b(n, t, ["DataHoraFinanceiro"]);
  return a != null && String(a) !== "" ? String(a) : String(e?.data_hora_financeiro || "");
}
function qb(e) {
  let t = /* @__PURE__ */ new Map();
  return (
    (e || []).forEach((n) => {
      let a = String(n.produto || "").trim();
      if (!a) return;
      let r = a.toUpperCase();
      (t.has(r) || t.set(r, { ...n, produto: a, quantidade: 0 }), (t.get(r).quantidade += Number(n.quantidade) || 0));
    }),
    [...t.values()]
  );
}
function jb(e) {
  let t = Ob(e),
    n = Array.isArray(e.cabecalhos_csv) ? [...e.cabecalhos_csv] : [],
    a = Array.isArray(e.linha_csv) ? [...e.linha_csv] : [];
  for (
    (!n.length || !a.length) &&
    ((n = [
      "C9 Produto ORDENCAO",
      "C9 Produto",
      "C9 Filial",
      "C9 Pedido",
      "Onda de Separacao",
      "Unidade de faturamento",
      "DataHoraFinanceiro",
      "Tipo de faturamento",
      "C5_DESCTRS",
      "Tipo de Separacao",
      "FILTRO V.1",
      "Quantidade a Faturar",
    ]),
    (a = [
      e.produto || "",
      e.produto || "",
      e.filial || "",
      e.pedido || "",
      "",
      e.unidade_faturamento || "",
      t,
      "",
      e.transportadora || "",
      pi,
      pi,
      String(Number(e.quantidade) || 0),
    ]));
    a.length < Math.max(n.length, 7);
  )
    a.push("");
  return (
    (a[6] = t),
    n.forEach((r, i) => {
      let l = hc(r);
      (l === "c9 produto" && (a[i] = String(e.produto || "")),
        (l === "c9 produto ordencao" || l === "c9 produto ordenacao") && (a[i] = String(a[i] || e.produto || "")),
        l === "c9 filial" && (a[i] = String(e.filial || "")),
        l === "c9 pedido" && (a[i] = String(e.pedido || "")),
        (l === "c5_desctrs" || l === "c5 desctrs" || l === "c5_desctris") && (a[i] = String(e.transportadora || "")),
        l === "unidade de faturamento" && (a[i] = String(e.unidade_faturamento || "")),
        l === "datahorafinanceiro" && (a[i] = t),
        l === "tipo de separacao" && (a[i] = pi),
        l === "filtro v.1" && (a[i] = pi),
        (l === "quantidade a faturar" || l === "quantidade faturar") && (a[i] = String(Number(e.quantidade) || 0)));
    }),
    { cabecalhos: n, linha: a, data_hora_financeiro: t }
  );
}
async function Hb({ pedido: e, usuario: t, email: n }) {
  let a = pi,
    r = encodeURIComponent("C9 Pedido"),
    [i, l] = await Promise.all([
      ye(
        "/fila_lancamentos?select=id,chave,status,erro&" +
          r +
          "=eq." +
          encodeURIComponent(e) +
          "&motivo=eq." +
          encodeURIComponent(a) +
          "&limit=5000",
      ),
      ye(
        "/historico_pedidos?select=lista,pedido,produto,quantidade,localizacao,unidade_faturamento,data_hora_financeiro,data_hora,filial,transportadora,origem_arquivo,cabecalhos_csv,linha_csv&pedido=eq." +
          encodeURIComponent(e) +
          "&order=id.asc&limit=5000",
      ),
    ]),
    d = Array.isArray(i) ? i : [];
  if (d.filter((B) => ["PENDENTE", "PROCESSANDO", "ENVIADO"].includes(String(B.status || "").toUpperCase())).length)
    throw new Error("Este pedido já está na fila ou na planilha do estoque.");
  if (d.filter((B) => String(B.status || "").toUpperCase() === "ERRO").length)
    return (
      await ye("/fila_lancamentos?" + r + "=eq." + encodeURIComponent(e) + "&motivo=eq." + encodeURIComponent(a), {
        method: "PATCH",
        body: JSON.stringify({ status: "PENDENTE", erro: null, enviado_em: null }),
        headers: { Prefer: "return=minimal" },
      }),
      { tipo: "ok", mensagem: "Pedido " + e + " reenviado ao estoque. Aguardando o processamento automático." }
    );
  if (!Array.isArray(l) || !l.length) throw new Error("Pedido não encontrado no Histórico de listas.");
  let c = [...new Set(l.map((B) => String(B.lista || "").trim()).filter(Boolean))],
    f = (
      await Promise.all(
        c.map((B) =>
          ye(
            "/historico_listas?select=lista,status,data_hora,filial,transportadora&lista=eq." +
              encodeURIComponent(B) +
              "&limit=1",
          ),
        ),
      )
    )
      .flat()
      .filter(Boolean)
      .sort((B, k) => new Date(k.data_hora || 0).getTime() - new Date(B.data_hora || 0).getTime()),
    x = f.find((B) => String(B.status || "ATIVA").toUpperCase() !== "CANCELADA") || f[0] || { lista: c[0] || "" };
  if (String(x.status || "ATIVA").toUpperCase() === "CANCELADA")
    throw new Error("O pedido está somente em uma lista cancelada.");
  let w = String(x.lista || c[0] || ""),
    F = l.filter((B) => String(B.lista || "") === w),
    v = qb(F.length ? F : l);
  if (!v.length) throw new Error("Nenhum produto válido foi encontrado para este pedido.");
  let m = v.map((B, k) => {
      let L = {
          ...B,
          pedido: e,
          lista: w || B.lista || "",
          filial: String(B.filial || x.filial || "").trim(),
          transportadora: String(B.transportadora || x.transportadora || "").trim(),
        },
        C = jb(L);
      return Zg({ pedido: e, ordem: k + 1, motivo: a, cabecalhos: C.cabecalhos, linha: C.linha, usuario: t, email: n });
    }),
    h = await Rg(m);
  if (h.confirmados === 0)
    throw new Error("O Supabase não confirmou o envio do pedido para a fila da planilha (Lançamentos).");
  let y = m.reduce((B, k) => B + Vg(k["Quantidade a Faturar"]), 0);
  return {
    tipo: "ok",
    mensagem:
      "Picking Poluído " +
      e +
      " confirmado na fila da planilha (Lançamentos). " +
      h.confirmados +
      " produto(s) e " +
      y +
      " unidade(s) aguardando processamento automático.",
  };
}
async function Wb(e) {
  let t = encodeURIComponent("C9 Pedido"),
    [n, a] = await Promise.all([
      ye(
        "/fila_lancamentos?select=id,motivo,status,erro,enviado_em&" +
          t +
          "=eq." +
          encodeURIComponent(e) +
          "&order=id.asc&limit=5000",
      ),
      ye("/pedidos_estoque?select=pedido&pedido=eq." + encodeURIComponent(e) + "&limit=1"),
    ]);
  return { pedido: e, fila: Array.isArray(n) ? n : [], noEstoque: Array.isArray(a) && a.length > 0 };
}
async function Ub({ pedido: e, motivo: t, usuario: n, email: a }) {
  try {
    return (
      (await ye("/rpc/excluir_pedido_estoque", {
        method: "POST",
        body: JSON.stringify({ p_pedido: e, p_motivo: t, p_usuario: n, p_email: a }),
        headers: { Prefer: "return=representation" },
      })) || {}
    );
  } catch (r) {
    let i = r.message;
    try {
      i = JSON.parse(r.message).message || i;
    } catch {}
    throw (
      /PGRST202|Could not find the function/i.test(String(r.message)) &&
        (i = "A função excluir_pedido_estoque ainda não existe no Supabase. Rode o SQL excluir_pedido_estoque.sql."),
      new Error(i)
    );
  }
}
var Bi = `
.lf-print-root{display:none}
@media print{
  body > *:not(.lf-print-root){display:none !important}
  .lf-print-root{display:block !important;background:#fff !important;color:#000 !important;padding:0;margin:0}
  .lf-bloco{break-after:page;page-break-after:always}
  .lf-bloco:last-child{break-after:auto;page-break-after:auto}
}
.lf-print-root, .lf-print-root *{box-sizing:border-box;font-family:Arial,Helvetica,sans-serif}
.lf-print-head{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #111;padding-bottom:10px;margin-bottom:10px;color:#000}
.lf-print-head h2{margin:0 0 4px;font-size:20px;color:#000}
.lf-print-table{width:100%;border-collapse:collapse;color:#000}
.lf-print-table th{font-size:10.5px;text-align:left;padding:3px 4px;border-bottom:2px solid #333;white-space:nowrap;color:#000}
.lf-print-table td{font-size:10.5px;padding:3px 4px;border-bottom:1px solid #ddd;white-space:nowrap;color:#000}
.lf-cancelada{padding:60px 20px;color:#000}
.lf-cancelada h1{font-size:34px;margin:0 0 12px;color:#991b1b}
.lf-cancelada .lf-num{font-size:54px;font-weight:900;margin-bottom:18px}
.lf-cancelada .lf-motivo{border:2px solid #991b1b;background:#fef2f2;padding:14px;border-radius:8px;margin-bottom:16px;font-size:16px}

.lf-btn{transition:filter .12s,background .12s,border-color .12s,box-shadow .12s}
.lf-btn:hover:not(:disabled){filter:brightness(0.95)}
.lf-btn:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.lf-table tbody tr:nth-child(even){background:var(--surf-alt)}
.lf-table tbody tr:hover{background:var(--accent-soft)}
.lf-table tbody tr:last-child td{border-bottom:none}
.lf-table.lf-sticky thead th{position:sticky;top:0;z-index:1}
.lf-table.lf-compact th,.lf-table.lf-compact td{padding-left:8px !important;padding-right:8px !important}
.sep-grid{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:18px;align-items:start}
@media (max-width:1150px){.sep-grid{grid-template-columns:minmax(0,1fr)}}
.lf-table input[type=checkbox]{width:15px;height:15px;accent-color:var(--accent);cursor:pointer}
.lf-tab{transition:color .12s,border-color .12s}
.lf-tab:hover{color:var(--txt)}
.lf-file{display:block;width:100%;box-sizing:border-box;padding:18px;border:1.5px dashed var(--bd-strong);border-radius:12px;background:var(--surf-alt);color:var(--txt-2);font-size:13px;font-weight:500;cursor:pointer;font-family:inherit}
.lf-file:hover{border-color:var(--accent)}
.lf-file::file-selector-button{margin-right:14px;height:34px;padding:0 16px;border-radius:8px;border:1px solid var(--bd-strong);background:var(--surf);color:var(--txt);font-weight:700;font-size:13px;cursor:pointer;font-family:inherit}
.lf-input:focus{border-color:var(--accent) !important;box-shadow:0 0 0 3px var(--accent-soft)}
`,
  t1 = "lf_ordem_impressao_v1",
  o1 = [
    ["padrao", "Padrão (ordem do arquivo)"],
    ["produto", "Por produto"],
    ["local", "Por localização"],
  ],
  oc = new Intl.Collator("pt-BR", { numeric: true, sensitivity: "base" });
function Kb() {
  try {
    let e = localStorage.getItem(t1);
    return o1.some((t) => t[0] === e) ? e : "padrao";
  } catch {
    return "padrao";
  }
}
function n1(e, t) {
  let n = zb(e),
    a = e.map((d, u) => ({ reg: d, rank: n[u], i: u }));
  if (t !== "produto" && t !== "local") return a;
  let r = (d) => String(yl(d.reg.produto, d.reg.localizacao) || "").trim(),
    i = (d) => String(d.reg.produto || "").trim(),
    l = (d) => String(d.reg.pedido || "").trim();
  return a.sort((d, u) => {
    if (t === "local") {
      let p = r(d),
        c = r(u);
      if (!p != !c) return p ? -1 : 1;
      let g = oc.compare(p, c);
      if (g) return g;
    }
    return oc.compare(i(d), i(u)) || oc.compare(l(d), l(u)) || d.i - u.i;
  });
}
function R0({ valor: e, onChange: t }) {
  return o.default.createElement(
    "label",
    {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12,
        fontWeight: 700,
        color: s.txtSec,
        fontFamily: s.font,
      },
    },
    "Ordem da impressão",
    o.default.createElement(
      "select",
      {
        className: "lf-input",
        value: e,
        onChange: (n) => t(n.target.value),
        style: { ...Ke, height: 32, padding: "0 8px" },
      },
      o1.map(([n, a]) => o.default.createElement("option", { key: n, value: n }, a)),
    ),
  );
}
function Vb({ lista: e, info: t, registros: n, ordem: a }) {
  if (String(t?.status || "ATIVA").toUpperCase() === "CANCELADA")
    return o.default.createElement(
      "div",
      { className: "lf-bloco" },
      o.default.createElement(
        "div",
        { className: "lf-cancelada" },
        o.default.createElement("div", { className: "lf-num" }, e),
        o.default.createElement("h1", null, "LISTA CANCELADA"),
        o.default.createElement(
          "div",
          { className: "lf-motivo" },
          o.default.createElement("b", null, "Motivo do cancelamento:"),
          o.default.createElement("br", null),
          t.motivo_ajuste || "Motivo não informado",
        ),
        o.default.createElement(
          "div",
          { style: { fontSize: 14, lineHeight: 1.7 } },
          o.default.createElement("b", null, "Filial:"),
          " ",
          t.filial || "",
          o.default.createElement("br", null),
          o.default.createElement("b", null, "Transportadora:"),
          " ",
          t.transportadora || "",
          o.default.createElement("br", null),
          o.default.createElement("b", null, "Cancelada por:"),
          " ",
          t.ajustada_por || t.usuario || "",
          o.default.createElement("br", null),
          o.default.createElement("b", null, "Data do cancelamento:"),
          " ",
          Vn(t.ajustada_em || t.data_hora),
        ),
      ),
    );
  let i = n1(n, a),
    l = new Set(n.map((d) => String(d.pedido || "").trim()).filter(Boolean)).size;
  return o.default.createElement(
    "div",
    { className: "lf-bloco" },
    o.default.createElement(
      "div",
      { className: "lf-print-head" },
      o.default.createElement(
        "div",
        null,
        o.default.createElement("h2", null, e),
        o.default.createElement(
          "div",
          null,
          "Filial: ",
          o.default.createElement("b", null, t.filial || n[0]?.filial || ""),
          "   Transportadora:",
          " ",
          o.default.createElement("b", null, t.transportadora || n[0]?.transportadora || ""),
        ),
      ),
      o.default.createElement("div", null, "Total: ", o.default.createElement("b", null, l), " pedidos"),
    ),
    o.default.createElement(
      "table",
      { className: "lf-print-table" },
      o.default.createElement(
        "thead",
        null,
        o.default.createElement(
          "tr",
          null,
          o.default.createElement("th", null, "Categoria lista"),
          o.default.createElement("th", null, "Data de execução"),
          o.default.createElement("th", null, "Ranking"),
          o.default.createElement("th", null, "C9 Produto"),
          o.default.createElement("th", null, "Quantidade Faturar"),
          o.default.createElement("th", null, "Localização"),
          o.default.createElement("th", null, "C9 Filial"),
          o.default.createElement("th", null, "C9 Pedido"),
          o.default.createElement("th", null, "Unidade de faturamento"),
          o.default.createElement("th", null, "DataHoraFinanceiro"),
          o.default.createElement("th", null, "C5_DESCTRS"),
          o.default.createElement("th", null, "Tipo de faturamento"),
          o.default.createElement("th", null, "FILTRO V.1"),
        ),
      ),
      o.default.createElement(
        "tbody",
        null,
        i.map(({ reg: d, rank: u }, p) =>
          o.default.createElement(
            "tr",
            { key: p },
            o.default.createElement("td", null, e),
            o.default.createElement("td", null, Vn(t.data_hora || d.data_hora)),
            o.default.createElement("td", null, u),
            o.default.createElement("td", null, d.produto || ""),
            o.default.createElement("td", null, d.quantidade || 0),
            o.default.createElement("td", null, yl(d.produto, d.localizacao) || "SEM ENDEREÇO"),
            o.default.createElement("td", null, t.filial || d.filial || ""),
            o.default.createElement("td", null, d.pedido || ""),
            o.default.createElement("td", null, d.unidade_faturamento || ""),
            o.default.createElement("td", null, d.data_hora_financeiro || ""),
            o.default.createElement("td", null, t.transportadora || d.transportadora || ""),
            o.default.createElement("td", null, xl(d, ["Tipo de faturamento", "Tipo Faturamento"])),
            o.default.createElement("td", null, xl(d, ["FILTRO V.1", "FILTRO V1"])),
          ),
        ),
      ),
    ),
  );
}
function ft({ titulo: e, subtitulo: t, children: n, acoes: a, semPadding: r }) {
  return o.default.createElement(
    "div",
    {
      style: {
        background: s.bgCard,
        border: `1px solid ${s.bdLight}`,
        borderRadius: 14,
        boxShadow: s.shadowCard,
        marginBottom: 18,
        overflow: "hidden",
      },
    },
    (e || a) &&
      o.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            padding: "14px 20px",
            borderBottom: `1px solid ${s.bdLight}`,
            background: s.bgStripe,
            flexWrap: "wrap",
          },
        },
        o.default.createElement(
          "div",
          null,
          o.default.createElement(
            "div",
            { style: { fontSize: 14, fontWeight: 800, color: s.txtPri, fontFamily: s.font, letterSpacing: "-0.01em" } },
            e,
          ),
          t &&
            o.default.createElement(
              "div",
              { style: { fontSize: 12, fontWeight: 500, color: s.txtMuted, marginTop: 2, fontFamily: s.font } },
              t,
            ),
        ),
        a &&
          o.default.createElement(
            "div",
            { style: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" } },
            a,
          ),
      ),
    o.default.createElement("div", { style: { padding: r ? 0 : 20 } }, n),
  );
}
function ge({ children: e, onClick: t, disabled: n, tipo: a = "neutro", title: r, pequeno: i }) {
  let l = {
    primario: { bg: s.primaryGrad, cor: "#fff", bd: "transparent" },
    verde: { bg: s.green, cor: "#fff", bd: "transparent" },
    perigo: { bg: s.bgCard, cor: s.red, bd: s.redBd },
    neutro: { bg: s.bgCard, cor: s.txtPri, bd: s.bdMid },
  }[a];
  return o.default.createElement(
    "button",
    {
      type: "button",
      className: "lf-btn",
      title: r,
      disabled: n,
      onClick: t,
      style: {
        height: i ? 28 : 36,
        padding: i ? "0 10px" : "0 16px",
        borderRadius: s.radius.md,
        border: `1px solid ${n ? s.bdLight : l.bd}`,
        background: n ? s.bgMuted : l.bg,
        color: n ? s.txtMuted : l.cor,
        fontSize: i ? 12 : 13,
        fontWeight: 700,
        cursor: n ? "not-allowed" : "pointer",
        fontFamily: s.font,
        whiteSpace: "nowrap",
        boxShadow: n || a === "neutro" || a === "perigo" ? "none" : s.shadowSm,
      },
    },
    e,
  );
}
function $e({ tipo: e = "info", children: t }) {
  let n = {
    info: [s.blueBg, s.blueBd, s.blue, "i"],
    ok: [s.greenBg, s.greenBd, s.green, "✓"],
    warn: [s.amberBg, s.amberBd, s.amber, "!"],
    erro: [s.redBg, s.redBd, s.red, "✕"],
  }[e];
  return o.default.createElement(
    "div",
    {
      style: {
        background: n[0],
        border: `1px solid ${n[1]}`,
        color: s.txtPri,
        borderRadius: s.radius.lg,
        padding: "11px 14px",
        fontSize: 13,
        fontWeight: 500,
        lineHeight: 1.55,
        marginTop: 12,
        fontFamily: s.font,
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
      },
    },
    o.default.createElement(
      "span",
      {
        "aria-hidden": "true",
        style: {
          flex: "0 0 auto",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: n[2],
          color: "#fff",
          fontSize: 11,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 1,
        },
      },
      n[3],
    ),
    o.default.createElement("div", { style: { flex: 1, minWidth: 0 } }, t),
  );
}
function qo({ tipo: e = "neutro", children: t }) {
  let n = {
    ok: [s.greenBg, s.greenBd, s.green],
    warn: [s.amberBg, s.amberBd, s.amber],
    erro: [s.redBg, s.redBd, s.red],
    info: [s.blueBg, s.blueBd, s.blue],
    neutro: [s.bgMuted, s.bdLight, s.txtSec],
  }[e];
  return o.default.createElement(
    "span",
    {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "2px 10px",
        borderRadius: s.radius.pill,
        background: n[0],
        border: `1px solid ${n[1]}`,
        color: n[2],
        fontSize: 11.5,
        fontWeight: 700,
        fontFamily: s.font,
        whiteSpace: "nowrap",
      },
    },
    o.default.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: n[2] } }),
    t,
  );
}
function Me({ rotulo: e, valor: t, detalhe: n, tipo: a = "neutro" }) {
  let r = { ok: s.green, warn: s.amber, erro: s.red, info: s.blue, neutro: s.txtMuted }[a];
  return o.default.createElement(
    "div",
    {
      style: {
        flex: "1 1 150px",
        minWidth: 140,
        background: s.bgCard,
        border: `1px solid ${s.bdLight}`,
        borderTop: `3px solid ${r}`,
        borderRadius: s.radius.lg,
        padding: "12px 14px",
        fontFamily: s.font,
      },
    },
    o.default.createElement(
      "div",
      {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: s.txtMuted,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        },
      },
      e,
    ),
    o.default.createElement(
      "div",
      {
        style: {
          fontSize: 26,
          fontWeight: 800,
          color: s.txtPri,
          marginTop: 4,
          lineHeight: 1.1,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.02em",
        },
      },
      t,
    ),
    n &&
      o.default.createElement("div", { style: { fontSize: 11.5, color: s.txtSec, marginTop: 4, fontWeight: 500 } }, n),
  );
}
function Ea({ children: e }) {
  return o.default.createElement("div", { style: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 } }, e);
}
function Zt({ children: e }) {
  return o.default.createElement(
    "div",
    {
      style: {
        padding: "28px 16px",
        textAlign: "center",
        color: s.txtMuted,
        fontSize: 13,
        fontWeight: 500,
        fontFamily: s.font,
      },
    },
    e,
  );
}
var Ke = {
    height: 36,
    border: `1px solid ${s.bdMid}`,
    borderRadius: s.radius.md,
    padding: "0 12px",
    fontSize: 13,
    fontWeight: 500,
    color: s.txtPri,
    background: s.bgCard,
    fontFamily: s.font,
    outline: "none",
  },
  Bl = {
    textAlign: "left",
    padding: "10px 12px",
    fontSize: 11,
    fontWeight: 700,
    color: s.txtMuted,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    background: s.bgStripe,
    borderBottom: `1px solid ${s.bdMid}`,
    whiteSpace: "nowrap",
    fontFamily: s.font,
  },
  oe = {
    padding: "10px 12px",
    fontSize: 13,
    color: s.txtPri,
    borderBottom: `1px solid ${s.bdLight}`,
    whiteSpace: "nowrap",
    fontFamily: s.font,
    fontVariantNumeric: "tabular-nums",
  },
  pt = { ...oe, textAlign: "right" };
function ko({ colunas: e, children: t, numericas: n = [], altura: a, compacta: r }) {
  return o.default.createElement(
    "div",
    {
      style: {
        overflowX: "auto",
        overflowY: a ? "auto" : "visible",
        maxHeight: a || void 0,
        border: `1px solid ${s.bdLight}`,
        borderRadius: s.radius.lg,
      },
    },
    o.default.createElement(
      "table",
      {
        className: `lf-table${a ? " lf-sticky" : ""}${r ? " lf-compact" : ""}`,
        style: { width: "100%", borderCollapse: "collapse" },
      },
      o.default.createElement(
        "thead",
        null,
        o.default.createElement(
          "tr",
          null,
          e.map((i, l) =>
            o.default.createElement("th", { key: i + l, style: n.includes(i) ? { ...Bl, textAlign: "right" } : Bl }, i),
          ),
        ),
      ),
      o.default.createElement("tbody", null, t),
    ),
  );
}
var a1 =
    "filial,pedido,qtd_total,transportadora,produtos,lib_estoque,data_limite,tempo_pedido_horas,lista_status,tem_lista,no_estoque,atualizado_em",
  r1 = a1 + ",separador,separacao_status,separacao_inicio,separacao_fim,separacao_id,faturador,faturador_manual",
  i1 = r1 + ",est_itens,est_entregues,est_separando",
  s1 = i1 + ",itens",
  Gb = s1 + ",agendado_para",
  Lc = (e) =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(e ?? Date.now())),
  sl = (e, t) => !!(e && e.agendado_para) && String(e.agendado_para).slice(0, 10) > t,
  l1 = (e) => {
    let t = String(e || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
    return t ? `${t[3]}/${t[2]}/${t[1]}` : "";
  },
  nc = 2;
function dr(e) {
  return Array.isArray(e.itens) && e.itens.length
    ? e.itens.map((t) => ({ produto: String(t.produto || ""), qtd: t.qtd == null ? null : Number(t.qtd) }))
    : String(e.produtos || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => ({ produto: t, qtd: null }));
}
var d1 = "#b00000",
  vc = "#f9ab00",
  u1 = "#34a853",
  c1 = 15 * 6e4,
  Qb = 60 * 6e4,
  Xb = 50,
  Jb = 180 * 6e4,
  eg = (e) => !!e.tem_lista || !!e.no_estoque;
function li(e) {
  return e.restante == null
    ? null
    : e.restante <= Qb
      ? "vermelho"
      : Number(e.qtd_total) > Xb && e.restante <= Jb
        ? "azul"
        : null;
}
var Nc = "#2f6b55",
  tg = "#e60000",
  Yb = "#4285f4",
  Zb = "#ff9900",
  di = (e) =>
    e
      ? `${new Date(e).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} ${new Date(e).toLocaleTimeString("pt-BR")}`
      : "—";
function yc(e) {
  let t = e < 0,
    n = Math.floor(Math.abs(e) / 1e3),
    a = (i) => String(i).padStart(2, "0"),
    r = `${Math.floor(n / 3600)}:${a(Math.floor((n % 3600) / 60))}:${a(n % 60)}`;
  return t ? `−${r}` : r;
}
var Rb = [],
  bc = [8, 30, 0],
  p1 = [18, 18, 0],
  mr = 864e5,
  e2 = (e) => (e <= 5 ? 2 : e <= 200 ? 4 : e <= 1e3 ? 5 : 12),
  Si = (e, t) => {
    let n = new Date(e);
    return Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), t[0], t[1], t[2]);
  },
  f1 = (e) => {
    let t = new Date(e).getUTCDay();
    return t !== 0 && t !== 6 && !Rb.includes(new Date(e).toISOString().slice(0, 10));
  };
function Sl(e) {
  let t = Si(e + mr, bc);
  for (let n = 0; n < 800 && !f1(t); n++) t = Si(t + mr, bc);
  return t;
}
function og(e) {
  let t = e;
  for (let n = 0; n < 800; n++) {
    if (!f1(t)) {
      t = Sl(t);
      continue;
    }
    let a = Si(t, bc),
      r = Si(t, p1);
    return t < a ? a : t >= r ? Sl(t) : t;
  }
  return t;
}
function t2(e, t) {
  let n = String(t || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (e == null || !n) return e;
  let a = Math.floor(e / mr) * mr,
    r = Date.UTC(+n[1], +n[2] - 1, +n[3]);
  return r > a ? r + (e - a) : e;
}
function o2(e, t) {
  let n = og(e),
    a = t * 36e5;
  for (let r = 0; r < 800; r++) {
    n = og(n);
    let i = Math.max(0, Si(n, p1) - n);
    if (i <= 0) {
      n = Sl(n);
      continue;
    }
    if (a <= i) return n + a;
    ((a -= i), (n = Sl(n)));
  }
  return n;
}
var ac = (e) => new Date(e).toISOString().slice(0, 19) + "-03:00",
  xc = (e) => {
    let t = new Date(e),
      n = (a) => String(a).padStart(2, "0");
    return `${n(t.getUTCDate())}/${n(t.getUTCMonth() + 1)}/${t.getUTCFullYear()} ${n(t.getUTCHours())}:${n(t.getUTCMinutes())}:${n(t.getUTCSeconds())}`;
  };
function Qn(e, t) {
  if (e == null || e === "") return null;
  if (typeof e == "number") return e > 2e4 ? Math.round(((e - 25569) * mr) / 1e3) * 1e3 : null;
  let n = String(e).trim();
  if (!n) return null;
  let a = n.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\D+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/),
    r;
  if (a) {
    let l = +a[1],
      d = +a[2];
    ((r = t === "mdy" ? [+a[3], l, d] : [+a[3], d, l]), r.push(+(a[4] || 0), +(a[5] || 0), +(a[6] || 0)));
  } else {
    if (
      ((a =
        n.match(/(\d{4})-(\d{2})-(\d{2})(?:[T\s]+(\d{2}):(\d{2})(?::(\d{2}))?)?/) ||
        n.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/)),
      !a)
    )
      return /^\d{5}(\.\d+)?$/.test(n) ? Qn(Number(n)) : null;
    r = [+a[1], +a[2], +a[3], +(a[4] || 0), +(a[5] || 0), +(a[6] || 0)];
  }
  if (r[1] < 1 || r[1] > 12 || r[2] < 1 || r[2] > 31) return null;
  let i = Date.UTC(r[0], r[1] - 1, r[2], r[3], r[4], r[5]);
  return Number.isNaN(i) ? null : i;
}
function n2(e) {
  if (e == null || e === "") return null;
  if (typeof e == "number") return e >= 0 && e < 1 ? Math.round(e * 86400) : null;
  let t = String(e).match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
  return t ? +t[1] * 3600 + +t[2] * 60 + +(t[3] || 0) : null;
}
function ng(e, t, n) {
  if (e == null || e === "") return null;
  let a = n2(t);
  if (a == null) return Qn(e, n);
  let r = typeof e == "number" ? Qn(Math.floor(e)) : Qn(String(e).trim().split(/[T\s]/)[0], n);
  return r == null ? null : r + a * 1e3;
}
function ag(e) {
  if (typeof e == "number") return e;
  let t = String(e ?? "").trim();
  if (!t) return 0;
  let n = t.includes(",")
      ? t.replace(/\./g, "").replace(",", ".")
      : /^\d{1,3}(\.\d{3})+$/.test(t)
        ? t.replace(/\./g, "")
        : t,
    a = parseFloat(n.replace(/[^0-9.\-]/g, ""));
  return Number.isNaN(a) ? 0 : a;
}
async function a2(e) {
  let t = new DecompressionStream("deflate-raw"),
    n = t.writable.getWriter();
  return (n.write(e), n.close(), new Uint8Array(await new Response(t.readable).arrayBuffer()));
}
function Dc(e) {
  let t = new Uint8Array(e),
    n = new DataView(e),
    a = -1;
  for (let d = t.length - 22; d >= Math.max(0, t.length - 7e4); d--)
    if (n.getUint32(d, true) === 101010256) {
      a = d;
      break;
    }
  if (a < 0) throw new Error("Arquivo .xlsx inválido.");
  let r = n.getUint16(a + 10, true),
    i = n.getUint32(a + 16, true),
    l = {};
  for (let d = 0; d < r && n.getUint32(i, true) === 33639248; d++) {
    let u = n.getUint16(i + 28, true),
      p = n.getUint16(i + 30, true),
      c = n.getUint16(i + 32, true);
    ((l[new TextDecoder().decode(t.subarray(i + 46, i + 46 + u))] = {
      metodo: n.getUint16(i + 10, true),
      comp: n.getUint32(i + 20, true),
      off: n.getUint32(i + 42, true),
    }),
      (i += 46 + u + p + c));
  }
  return { u8: t, dv: n, arqs: l };
}
async function fi(e, t) {
  let n = e.arqs[t];
  if (!n) return null;
  let a = e.dv.getUint16(n.off + 26, true),
    r = e.dv.getUint16(n.off + 28, true),
    i = n.off + 30 + a + r,
    l = e.u8.subarray(i, i + n.comp);
  return new TextDecoder("utf-8").decode(n.metodo === 0 ? l : await a2(l));
}
async function r2(e) {
  let t = Dc(e),
    n = (g) => new DOMParser().parseFromString(g, "application/xml"),
    a = [],
    r = await fi(t, "xl/sharedStrings.xml");
  r &&
    Array.from(n(r).getElementsByTagName("si")).forEach((g) => {
      a.push(
        Array.from(g.getElementsByTagName("t"))
          .map((f) => f.textContent)
          .join(""),
      );
    });
  let i = "xl/worksheets/sheet1.xml",
    l = await fi(t, "xl/workbook.xml"),
    d = await fi(t, "xl/_rels/workbook.xml.rels");
  if (l && d) {
    let g = n(l).getElementsByTagName("sheet")[0],
      f =
        g &&
        (g.getAttribute("r:id") ||
          g.getAttributeNS("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "id")),
      x = Array.from(n(d).getElementsByTagName("Relationship")).find((w) => w.getAttribute("Id") === f);
    if (x) {
      let w = x.getAttribute("Target") || "";
      i = w.startsWith("/") ? w.slice(1) : "xl/" + w;
    }
  }
  let u = await fi(t, i);
  if (!u) throw new Error("Não achei a planilha dentro do arquivo .xlsx.");
  let p = (g) => {
      let f = 0;
      return (
        String(g || "")
          .replace(/[^A-Z]/gi, "")
          .toUpperCase()
          .split("")
          .forEach((x) => {
            f = f * 26 + x.charCodeAt(0) - 64;
          }),
        f - 1
      );
    },
    c = [];
  return (
    Array.from(n(u).getElementsByTagName("row")).forEach((g) => {
      let f = [];
      Array.from(g.getElementsByTagName("c")).forEach((x) => {
        let w = p(x.getAttribute("r")),
          F = x.getAttribute("t"),
          v = x.getElementsByTagName("v")[0],
          m = v ? v.textContent : "",
          h;
        (F === "s"
          ? (h = a[Number(m)] == null ? "" : a[Number(m)])
          : F === "inlineStr"
            ? (h = Array.from(x.getElementsByTagName("t"))
                .map((y) => y.textContent)
                .join(""))
            : F === "str" || F === "e" || F === "b"
              ? (h = m)
              : (h = m === "" ? "" : Number(m)),
          (f[w < 0 ? f.length : w] = h));
      });
      for (let x = 0; x < f.length; x++) f[x] === void 0 && (f[x] = "");
      c.push(f);
    }),
    c
  );
}
async function i2(e) {
  let t = Dc(e),
    n = await fi(t, "content.xml");
  if (!n) throw new Error("Arquivo .ods inválido.");
  let a = "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
    r = "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
    l = new DOMParser().parseFromString(n, "application/xml").getElementsByTagNameNS(a, "table")[0];
  if (!l) throw new Error("Não achei a planilha dentro do arquivo .ods.");
  let d = [];
  return (
    Array.from(l.getElementsByTagNameNS(a, "table-row")).forEach((u) => {
      let p = [];
      for (
        Array.from(u.children).forEach((g) => {
          if (g.localName !== "table-cell" && g.localName !== "covered-table-cell") return;
          let f = g.getAttributeNS(r, "value-type"),
            x = "";
          if (f === "float" || f === "percentage" || f === "currency") x = Number(g.getAttributeNS(r, "value"));
          else if (f === "date") x = g.getAttributeNS(r, "date-value") || "";
          else if (f === "time") {
            let F = (g.getAttributeNS(r, "time-value") || "").match(/PT(\d+)H(\d+)M(\d+)/);
            x = F ? `${F[1].padStart(2, "0")}:${F[2]}:${F[3]}` : "";
          } else
            f === "boolean"
              ? (x = g.getAttributeNS(r, "boolean-value"))
              : f &&
                (x = Array.from(g.children)
                  .filter((F) => F.localName === "p")
                  .map((F) => F.textContent)
                  .join(" "));
          let w = Math.min(Number(g.getAttributeNS(a, "number-columns-repeated") || 1), x === "" ? 1 : 200);
          for (let F = 0; F < w; F++) p.push(x);
        });
        p.length && p[p.length - 1] === "";
      )
        p.pop();
      if (!p.length) return;
      let c = Math.min(Number(u.getAttributeNS(a, "number-rows-repeated") || 1), 200);
      for (let g = 0; g < c; g++) d.push(p);
    }),
    d
  );
}
async function m1(e) {
  let t = await e.arrayBuffer(),
    n = new Uint8Array(t.slice(0, 4));
  if (n[0] === 80 && n[1] === 75) return Dc(t).arqs["content.xml"] ? i2(t) : r2(t);
  if (n[0] === 208 && n[1] === 207) throw new Error("Este é um .xls antigo. Abra no Excel e salve como .xlsx ou .csv.");
  let r = (await Kg(e)).split(/\r?\n/).filter((u) => u.trim()),
    i = r.slice(0, 8).join(`
`),
    l = (u) => i.split(u).length - 1,
    d = l(";") >= l("	") && l(";") >= l(",") ? ";" : l("	") >= l(",") ? "	" : ",";
  return r.map((u) => Ug(u, d));
}
var g1 = (e) =>
    String(e ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ""),
  rg = (e) => e.includes("lib") || e.includes("data") || e.includes("hora") || e.startsWith("dt") || e.startsWith("hr"),
  Bc = [
    [
      "pedido",
      "Pedido",
      ["pedido", "numeropedido", "numpedido", "npedido", "nopedido", "nrpedido", "pedidovenda", "order"],
    ],
    ["filial", "Filial", ["filial", "codfilial", "codigofilial", "empresa", "unidade", "loja"]],
    [
      "qtdTotal",
      "Qtd total do pedido",
      ["totalqtd", "qtdtotal", "quantidadetotal", "qtdtotalpedido", "totalquantidade", "totalunidades"],
    ],
    [
      "qtd",
      "Quantidade",
      [
        "qtliberada",
        "qtdliberada",
        "qtdlib",
        "qtlib",
        "quantidadeliberada",
        "qtdliberado",
        "qtd",
        "qt",
        "quantidade",
        "quant",
        "qtde",
        "unidades",
      ],
    ],
    [
      "libEstData",
      "Data lib. estoque",
      ["dtlibest", "datalibest", "dtlibestoque", "datalibestoque", "dataliberacaoestoque"],
      (e) => /^(dt|data)/.test(e) && e.includes("lib") && /est(oque)?$/.test(e),
    ],
    [
      "libEstHora",
      "Hora lib. estoque",
      ["hrlibest", "horalibest", "hrlibestoque", "horalibestoque", "horaliberacaoestoque"],
      (e) => /^(hr|hora)/.test(e) && e.includes("lib") && /est(oque)?$/.test(e),
    ],
    [
      "libEst",
      "Liberação do estoque (data e hora)",
      ["datahoraliberacaoestoque", "datahoralibestoque", "dtlibestoque", "libestoque"],
      (e) => e.includes("estoque") && rg(e),
    ],
    [
      "libFinData",
      "Data lib. financeiro",
      ["dtlibfin", "datalibfin", "dtlibfinanceiro", "datalibfinanceiro", "dataliberacaofinanceiro"],
      (e) => /^(dt|data)/.test(e) && e.includes("lib") && /fin(anceiro)?$/.test(e),
    ],
    [
      "libFinHora",
      "Hora lib. financeiro",
      ["hrlibfin", "horalibfin", "hrlibfinanceiro", "horalibfinanceiro", "horaliberacaofinanceiro"],
      (e) => /^(hr|hora)/.test(e) && e.includes("lib") && /fin(anceiro)?$/.test(e),
    ],
    [
      "libFin",
      "Liberação do financeiro (data e hora)",
      ["datahoraliberacaofinanceiro", "datahoralibfinanceiro"],
      (e) => e.includes("financ") && rg(e),
    ],
    [
      "agendado",
      "Agendado para",
      ["agendadopara", "agendado", "dtagendamento", "dataagendamento", "agendamento", "dataagendada"],
      (e) => e.includes("agend"),
    ],
    ["transp", "Transportadora", ["transportadora", "transporte", "transp", "nometransportadora", "carrier"]],
    [
      "produto",
      "Produto",
      ["produto", "modelo", "produtomodelo", "descricaoproduto", "descricao", "sku", "codigoproduto", "codproduto"],
    ],
  ];
function s2(e) {
  for (let t = 0; t < Math.min(e.length, 25); t++) {
    let n = (e[t] || []).map(g1),
      a = {},
      r = /* @__PURE__ */ new Set();
    if (
      (Bc.forEach(([i, , l]) => {
        for (let d of l) {
          let u = n.findIndex((p, c) => p === d && !r.has(c));
          if (u >= 0) {
            ((a[i] = u), r.add(u));
            break;
          }
        }
      }),
      Bc.forEach(([i, , , l]) => {
        if (a[i] !== void 0 || !l) return;
        let d = n.findIndex((u, p) => u && !r.has(p) && l(u));
        d >= 0 && ((a[i] = d), r.add(d));
      }),
      a.pedido !== void 0 && Object.keys(a).length >= 2)
    ) {
      let i = {};
      return (
        Object.keys(a).forEach((l) => {
          i[l] = String(e[t][a[l]]);
        }),
        { linhaCab: t, col: a, rotulos: i }
      );
    }
  }
  return null;
}
var l2 = (e) => {
  let t = String(e ?? "").replace(/\D/g, "");
  return t ? t.padStart(4, "0") : "";
};
function d2(e, t) {
  let n = ["libEstData", "libEst", "libFinData", "libFin"].map((c) => t.col[c]).filter((c) => c !== void 0),
    a = false,
    r = false,
    i = false,
    l = 0,
    d = 0,
    u = Date.now() + 3 * 36e5 * -1,
    p = (c, g, f) => Math.abs(Date.UTC(c, g - 1, f) - u) < 45 * mr;
  return (
    e.slice(t.linhaCab + 1).forEach((c) => {
      n.forEach((g) => {
        let f = typeof c[g] == "string" && c[g].match(/^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        f &&
          ((i = true),
          +f[1] <= 12 && +f[2] <= 12 && (p(+f[3], +f[2], +f[1]) && l++, p(+f[3], +f[1], +f[2]) && d++),
          +f[1] > 12 && (a = true),
          +f[2] > 12 && (r = true));
      });
    }),
    r && !a
      ? { fmt: "mdy", ambiguo: false }
      : a && !r
        ? { fmt: "dmy", ambiguo: false }
        : { fmt: d > l ? "mdy" : "dmy", ambiguo: i && d === l }
  );
}
function u2(e, t, n) {
  let a = t.col,
    { fmt: r, ambiguo: i } = d2(e, t),
    l = /* @__PURE__ */ new Map(),
    d = { semPedido: 0, ambiguo: i, fmt: r },
    u = (c) => c === "" || c == null;
  return (
    e.slice(t.linhaCab + 1).forEach((c) => {
      let g = a.pedido !== void 0 ? c[a.pedido] : "";
      if (
        ((g =
          typeof g == "number"
            ? String(Math.round(g))
            : String(g ?? "")
                .replace(/^'/, "")
                .replace(/\.0+$/, "")
                .trim()),
        !g || !/^[A-Za-z0-9._-]+$/.test(g))
      ) {
        c.some((v) => String(v).trim()) && d.semPedido++;
        return;
      }
      let f = (a.filial !== void 0 ? l2(c[a.filial]) : "") || n,
        x = f + "|" + g,
        w = l.get(x);
      w ||
        ((w = { filial: f, pedido: g, soma: 0, total: null, transp: "", est: null, fin: null, agend: null, itens: [] }),
        l.set(x, w));
      let F = a.qtd !== void 0 ? ag(c[a.qtd]) : 0;
      if (
        ((w.soma += F),
        a.qtdTotal !== void 0 && w.total == null && (w.total = ag(c[a.qtdTotal])),
        a.transp !== void 0 && !w.transp && (w.transp = String(c[a.transp] == null ? "" : c[a.transp]).trim()),
        a.agendado !== void 0)
      ) {
        let v = Qn(c[a.agendado], r);
        if (v != null) {
          let m = new Date(v).toISOString().slice(0, 10);
          (!w.agend || m < w.agend) && (w.agend = m);
        }
      }
      if (
        (w.est == null &&
          (a.libEstData !== void 0
            ? (w.est = ng(c[a.libEstData], a.libEstHora !== void 0 ? c[a.libEstHora] : null, r))
            : a.libEst !== void 0 && !u(c[a.libEst]) && (w.est = Qn(c[a.libEst], r))),
        w.fin == null &&
          (a.libFinData !== void 0
            ? (w.fin = ng(c[a.libFinData], a.libFinHora !== void 0 ? c[a.libFinHora] : null, r))
            : a.libFin !== void 0 && !u(c[a.libFin]) && (w.fin = Qn(c[a.libFin], r))),
        a.produto !== void 0)
      ) {
        let v = String(c[a.produto] == null ? "" : c[a.produto]).trim();
        if (v) {
          let m = w.itens.find((h) => h.produto.toLowerCase() === v.toLowerCase());
          m ? (m.qtd += F) : w.itens.push({ produto: v, qtd: F });
        }
      }
    }),
    {
      lista: [...l.values()].map((c) => {
        let g = c.total != null && c.total > 0 ? c.total : c.soma,
          f = e2(g);
        return {
          filial: c.filial,
          pedido: c.pedido,
          qtd_total: g,
          transportadora: c.transp,
          lib_financeiro: c.fin == null ? null : ac(c.fin),
          lib_estoque: c.est == null ? null : ac(c.est),
          lib_financeiro_txt: c.fin == null ? "" : xc(c.fin),
          lib_estoque_txt: c.est == null ? "" : xc(c.est),
          produtos: c.itens.map((x) => x.produto).join(", "),
          itens: c.itens,
          tempo_pedido_horas: f,
          data_limite: c.est == null ? null : ac(o2(t2(c.est, c.agend), f)),
          ...(c.agend ? { agendado_para: c.agend } : {}),
        };
      }),
      ign: d,
    }
  );
}
function c2({ existentes: e, agenteHa: t, onFechar: n, onFeito: a }) {
  let [r, i] = (0, o.useState)(""),
    [l, d] = (0, o.useState)(null),
    [u, p] = (0, o.useState)(""),
    [c, g] = (0, o.useState)("0101"),
    [f, x] = (0, o.useState)(false),
    w = (0, o.useRef)(null);
  (0, o.useEffect)(() => {
    let E = (A) => A.key === "Escape" && !f && n();
    return (window.addEventListener("keydown", E), () => window.removeEventListener("keydown", E));
  }, [n, f]);
  let F = async (E) => {
      let A = E.target.files && E.target.files[0];
      if (((E.target.value = ""), !!A)) {
        (p(""), d(null), i(A.name));
        try {
          let I = await m1(A);
          if (!I.length) throw new Error("O arquivo está vazio.");
          d(I);
        } catch (I) {
          p(String(I.message || I));
        }
      }
    },
    v = (0, o.useMemo)(() => (l ? s2(l) : null), [l]),
    m = (0, o.useMemo)(() => (l && v ? u2(l, v, c) : null), [l, v, c]),
    h = (0, o.useMemo)(() => (m ? [...new Set(m.lista.map((E) => E.filial))].sort() : []), [m]),
    y = (E) => (e || []).filter((A) => A.filial === E).length,
    B = m ? m.lista.filter((E) => !E.lib_estoque).length : 0,
    k = async () => {
      if (!(!m || !m.lista.length)) {
        (x(true), p(""));
        try {
          let E = /* @__PURE__ */ new Date().toISOString(),
            A = m.lista.map((V) => ({ ...V, ciclo: E, atualizado_em: E })),
            I = async (V) => {
              for (let D of xi(V, 300))
                await ye("/via_leitor_agente?on_conflict=filial,pedido", {
                  method: "POST",
                  body: JSON.stringify(D),
                  headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
                });
            };
          try {
            await I(A);
          } catch (V) {
            if (!/itens|agendado/i.test(String(V.message))) throw V;
            await I(A.map(({ itens: D, agendado_para: O, ...H }) => H));
          }
          for (let V of h)
            await ye("/via_leitor_agente?filial=eq." + encodeURIComponent(V) + "&ciclo=lt." + encodeURIComponent(E), {
              method: "DELETE",
              headers: { Prefer: "return=minimal" },
            });
          try {
            await ye("/via_leitor_atualizacoes?on_conflict=origem", {
              method: "POST",
              body: JSON.stringify([{ origem: "manual", atualizado_em: E, detalhe: `${r} · ${A.length} pedidos` }]),
              headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
            });
          } catch {}
          a(`Relatório "${r}" importado: ${A.length} pedidos (${h.join(" + ")}).`);
        } catch (E) {
          let A = String(E.message || E);
          (p(
            /42501|row-level|policy|permission/i.test(A)
              ? "O Supabase bloqueou a gravação. Rode o SQL criar_faturador_separacao.sql (libera a importação manual)."
              : "Não foi possível importar: " + A.slice(0, 200),
          ),
            x(false));
        }
      }
    },
    L = {
      background: Nc,
      color: "#fff",
      fontSize: 12,
      fontWeight: 800,
      padding: "7px 9px",
      textAlign: "left",
      whiteSpace: "nowrap",
    },
    C = {
      padding: "6px 9px",
      fontSize: 12.5,
      borderBottom: `1px solid ${s.bdLight}`,
      color: s.txtPri,
      whiteSpace: "nowrap",
    },
    _ = v && (v.col.libEst !== void 0 || v.col.libEstData !== void 0),
    q = v
      ? [
          ["pedido", "Pedido"],
          ["qtd", "Quantidade"],
          ["transp", "Transportadora"],
          ...(_ ? [] : [["libEstData", "Data/Hora lib. estoque"]]),
        ].filter(([E]) => v.col[E] === void 0)
      : [];
  return o.default.createElement(
    "div",
    {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(2px)",
        zIndex: 1e3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      onClick: () => !f && n(),
    },
    o.default.createElement(
      "div",
      {
        onClick: (E) => E.stopPropagation(),
        style: {
          background: s.bgCard,
          borderRadius: s.radius.xl,
          padding: 22,
          width: 860,
          maxWidth: "95vw",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: s.shadowXl,
          border: `1px solid ${s.bdMid}`,
        },
      },
      o.default.createElement(
        "div",
        { style: { display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 } },
        o.default.createElement(
          "div",
          null,
          o.default.createElement(
            "div",
            { style: { fontSize: 17, fontWeight: 800, color: s.txtPri } },
            "Subir relatório do Via Leitor",
          ),
          o.default.createElement(
            "div",
            { style: { fontSize: 12.5, color: s.txtMuted, marginTop: 3 } },
            "Use quando o agente estiver desligado. Arquivo .ods, .xlsx ou .csv; as colunas são achadas pelo título, em qualquer ordem.",
          ),
        ),
        o.default.createElement(ge, { pequeno: true, onClick: n, disabled: f }, "Fechar ✕"),
      ),
      t != null &&
        t < c1 &&
        o.default.createElement(
          $e,
          { tipo: "warn" },
          "O agente atualizou há ",
          Tc(t),
          ". Se ele está rodando, não precisa subir relatório: os dados do arquivo ficam no lugar dos do agente até o próximo ciclo dele.",
        ),
      o.default.createElement("input", {
        ref: w,
        type: "file",
        accept: ".csv,.txt,.xlsx,.ods",
        style: { display: "none" },
        onChange: F,
      }),
      o.default.createElement(
        "div",
        { style: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", margin: "10px 0" } },
        o.default.createElement(
          ge,
          { tipo: "primario", onClick: () => w.current && w.current.click(), disabled: f },
          "📂 Escolher arquivo",
        ),
        o.default.createElement("span", { style: { fontSize: 13, color: s.txtSec } }, r || "Nenhum arquivo escolhido"),
      ),
      u && o.default.createElement($e, { tipo: "erro" }, u),
      l &&
        !v &&
        o.default.createElement(
          $e,
          { tipo: "erro" },
          "Não achei a coluna do pedido. Títulos que o site reconhece: Pedido, Filial, Quantidade, Transportadora, Produto, Data/Hora Lib. Estoque, Data/Hora Lib. Financeiro.",
        ),
      v &&
        m &&
        o.default.createElement(
          o.default.Fragment,
          null,
          o.default.createElement(
            "div",
            { style: { fontSize: 12.5, color: s.txtSec, margin: "6px 0 8px", lineHeight: 1.7 } },
            o.default.createElement("b", null, "Colunas encontradas:"),
            " ",
            Bc.filter(([E]) => v.col[E] !== void 0).map(([E, A]) =>
              o.default.createElement(
                "span",
                {
                  key: E,
                  style: {
                    display: "inline-block",
                    background: s.bgStripe,
                    border: `1px solid ${s.bdLight}`,
                    borderRadius: 999,
                    padding: "1px 9px",
                    marginRight: 6,
                  },
                },
                A,
                " ← “",
                v.rotulos[E],
                "”",
              ),
            ),
          ),
          q.length > 0 &&
            o.default.createElement(
              $e,
              { tipo: "warn" },
              "Não encontrei: ",
              q.map(([, E]) => E).join(", "),
              ".",
              _ ? "" : " Sem a liberação do estoque os pedidos ficam sem data limite.",
            ),
          v.col.filial === void 0 &&
            o.default.createElement(
              "div",
              { style: { display: "flex", alignItems: "center", gap: 8, margin: "8px 0", fontSize: 13 } },
              "O arquivo não tem coluna Filial. Filial deste arquivo:",
              o.default.createElement(
                "select",
                { className: "lf-input", style: Ke, value: c, onChange: (E) => g(E.target.value) },
                o.default.createElement("option", { value: "0101" }, "0101"),
                o.default.createElement("option", { value: "0102" }, "0102"),
              ),
            ),
          o.default.createElement(
            $e,
            { tipo: "info" },
            m.lista.length,
            " pedidos no arquivo",
            h.length
              ? " — " +
                  h
                    .map((E) => `filial ${E}: ${m.lista.filter((A) => A.filial === E).length} (hoje ${y(E)} no site)`)
                    .join(" · ")
              : "",
            ".",
            B ? ` ${B} sem data de liberação do estoque (ficam sem data limite).` : "",
            m.ign.semPedido ? ` ${m.ign.semPedido} linha(s) sem número de pedido foram ignoradas.` : "",
            m.ign.ambiguo
              ? " Atenção às datas: todas têm dia e mês ≤ 12, então assumi dia/mês — confira na prévia abaixo."
              : "",
            o.default.createElement("br", null),
            "Ao importar, os pedidos atuais da(s) filial(is) acima são ",
            o.default.createElement("b", null, "substituídos"),
            " pelos do arquivo.",
          ),
          m.lista.length > 0 &&
            o.default.createElement(
              "div",
              {
                style: {
                  overflow: "auto",
                  maxHeight: 230,
                  border: `1px solid ${s.bdLight}`,
                  borderRadius: s.radius.lg,
                  margin: "8px 0",
                },
              },
              o.default.createElement(
                "table",
                { style: { width: "100%", borderCollapse: "collapse", fontFamily: s.font } },
                o.default.createElement(
                  "thead",
                  null,
                  o.default.createElement(
                    "tr",
                    null,
                    ["Filial", "Pedido", "Quant", "Transporte", "Produto", "Lib. estoque", "Prazo", "Data limite"].map(
                      (E) => o.default.createElement("th", { key: E, style: L }, E),
                    ),
                  ),
                ),
                o.default.createElement(
                  "tbody",
                  null,
                  m.lista
                    .slice(0, 8)
                    .map((E) =>
                      o.default.createElement(
                        "tr",
                        { key: E.filial + E.pedido },
                        o.default.createElement("td", { style: C }, E.filial),
                        o.default.createElement("td", { style: { ...C, fontWeight: 700 } }, E.pedido),
                        o.default.createElement("td", { style: C }, E.qtd_total),
                        o.default.createElement("td", { style: C }, E.transportadora || "—"),
                        o.default.createElement(
                          "td",
                          { style: { ...C, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" } },
                          E.produtos || "—",
                        ),
                        o.default.createElement("td", { style: C }, E.lib_estoque_txt || "—"),
                        o.default.createElement("td", { style: C }, E.tempo_pedido_horas, "h"),
                        o.default.createElement(
                          "td",
                          { style: C },
                          E.data_limite ? xc(Qn(E.data_limite.slice(0, 19))) : "—",
                        ),
                      ),
                    ),
                ),
              ),
            ),
          o.default.createElement(
            "div",
            { style: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 10 } },
            o.default.createElement(ge, { onClick: n, disabled: f }, "Cancelar"),
            o.default.createElement(
              ge,
              { tipo: "verde", onClick: k, disabled: f || !m.lista.length },
              f ? "Importando..." : `✓ Importar ${m.lista.length} pedidos`,
            ),
          ),
        ),
    ),
  );
}
function p2({ r: e, onFechar: t, bb: n }) {
  let [a, r] = (0, o.useState)(null),
    [i, l] = (0, o.useState)("");
  ((0, o.useEffect)(() => {
    if (n) {
      r([]);
      return;
    }
    let v = true;
    return (
      r(null),
      l(""),
      ye("/painel_estoque?select=*&pedido=eq." + encodeURIComponent(e.pedido) + "&order=linha_planilha.asc&limit=500")
        .then((m) => v && r(Array.isArray(m) ? m : []))
        .catch((m) => v && (l(String(m.message || m).slice(0, 140)), r([]))),
      () => {
        v = false;
      }
    );
  }, [e.pedido, n]),
    (0, o.useEffect)(() => {
      let v = (m) => m.key === "Escape" && t();
      return (window.addEventListener("keydown", v), () => window.removeEventListener("keydown", v));
    }, [t]));
  let d = (v) => Rt(String(v || "")),
    u = dr(e),
    p = /* @__PURE__ */ new Set(),
    c = u.map((v) => {
      let m = (a || []).filter((y, B) => d(y.produto) === d(v.produto) && (p.add(B), true)),
        h = m.map((y) => Number(y.quantidade)).filter((y) => !Number.isNaN(y));
      return { ...v, qtd: v.qtd != null ? v.qtd : h.length ? Math.max(...h) : null, est: m };
    });
  (a || []).forEach((v, m) => {
    p.has(m) ||
      c.push({ produto: String(v.produto || ""), qtd: v.quantidade != null ? Number(v.quantidade) : null, est: [v] });
  });
  let g = (v) => {
      let m = v.map((h) =>
        String(h.status_original == null ? "" : h.status_original)
          .trim()
          .toUpperCase(),
      );
      return m.every((h) => h === "ENTREGUE")
        ? "E"
        : m.some((h) => h !== "" && h !== "EMPTY" && h !== "ENTREGUE")
          ? "S"
          : "A";
    },
    f = (v) => (v === "E" ? "Entregue" : v === "S" ? "Em separação" : "Aguardando separação"),
    x = (v) => (v === "E" ? u1 : v === "S" ? vc : d1),
    w = {
      background: Nc,
      color: "#fff",
      fontSize: 12.5,
      fontWeight: 800,
      padding: "9px 10px",
      textAlign: "left",
      whiteSpace: "nowrap",
    },
    F = {
      padding: "8px 10px",
      fontSize: 13,
      borderBottom: `1px solid ${s.bdLight}`,
      color: s.txtPri,
      verticalAlign: "top",
    };
  return o.default.createElement(
    "div",
    {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(2px)",
        zIndex: 1e3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      onClick: t,
    },
    o.default.createElement(
      "div",
      {
        onClick: (v) => v.stopPropagation(),
        style: {
          background: s.bgCard,
          borderRadius: s.radius.xl,
          padding: 22,
          width: 820,
          maxWidth: "95vw",
          maxHeight: "88vh",
          overflow: "auto",
          boxShadow: s.shadowXl,
          border: `1px solid ${s.bdMid}`,
        },
      },
      o.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
            marginBottom: 6,
          },
        },
        o.default.createElement(
          "div",
          null,
          o.default.createElement(
            "div",
            { style: { fontSize: 17, fontWeight: 800, color: s.txtPri } },
            "Pedido ",
            e.pedido,
          ),
          o.default.createElement(
            "div",
            { style: { fontSize: 12.5, color: s.txtMuted, marginTop: 3 } },
            [
              `Filial ${e.filial}`,
              e.transportadora,
              `${Wn(e.qtd_total)} un`,
              e.lista_status,
              e.restante == null ? "" : e.restante < 0 ? `Atrasado ${yc(-e.restante)}` : `Restam ${yc(e.restante)}`,
            ]
              .filter(Boolean)
              .join(" · "),
          ),
          e.faturador &&
            o.default.createElement(
              "div",
              { style: { fontSize: 12.5, color: s.txtMuted, marginTop: 2 } },
              "Faturador: ",
              e.faturador,
            ),
        ),
        o.default.createElement(ge, { pequeno: true, onClick: t }, "Fechar ✕"),
      ),
      i && o.default.createElement($e, { tipo: "warn" }, "Não consegui ler o painel do estoque: ", i),
      a === null
        ? o.default.createElement(Zt, null, "Carregando itens...")
        : c.length === 0
          ? o.default.createElement(Zt, null, "Nenhum item encontrado para este pedido.")
          : o.default.createElement(
              "div",
              {
                style: { overflow: "auto", border: `1px solid ${s.bdLight}`, borderRadius: s.radius.lg, marginTop: 10 },
              },
              o.default.createElement(
                "table",
                { style: { width: "100%", borderCollapse: "collapse", fontFamily: s.font } },
                o.default.createElement(
                  "thead",
                  null,
                  o.default.createElement(
                    "tr",
                    null,
                    (n
                      ? ["Produto", "Qtd", "Localização", "EST-FD-01", "Compra"]
                      : ["Produto", "Qtd", "Estoque", "Entregue"]
                    ).map((v) =>
                      o.default.createElement(
                        "th",
                        { key: v, style: { ...w, textAlign: v === "Qtd" || v === "Entregue" ? "center" : "left" } },
                        v,
                      ),
                    ),
                  ),
                ),
                o.default.createElement(
                  "tbody",
                  null,
                  c.map((v, m) => {
                    let h = v.est[0],
                      y = h ? g(v.est) : "";
                    if (n) {
                      let B = (n.locMap || {})[jo(v.produto)] || {};
                      return o.default.createElement(
                        "tr",
                        { key: v.produto + m },
                        o.default.createElement("td", { style: { ...F, fontWeight: 700 } }, v.produto),
                        o.default.createElement(
                          "td",
                          { style: { ...F, textAlign: "center" } },
                          v.qtd == null ? "—" : v.qtd,
                        ),
                        o.default.createElement(
                          "td",
                          { style: { ...F, fontWeight: 800 } },
                          zc(B.localizacao, 99).txt || "—",
                        ),
                        o.default.createElement(
                          "td",
                          { style: { ...F, textAlign: "center" } },
                          B.saldo_fd == null ? "—" : Un(B.saldo_fd),
                        ),
                        o.default.createElement(
                          "td",
                          { style: F },
                          o.default.createElement(
                            "div",
                            { style: { display: "flex", alignItems: "center", gap: 8 } },
                            n.chkCompra ? n.chkCompra(v) : null,
                            n.pvSelo ? n.pvSelo(v) : null,
                            n.btnCompra ? n.btnCompra(v) : null,
                          ),
                        ),
                      );
                    }
                    return o.default.createElement(
                      "tr",
                      { key: v.produto + m },
                      o.default.createElement("td", { style: { ...F, fontWeight: 700 } }, v.produto),
                      o.default.createElement(
                        "td",
                        { style: { ...F, textAlign: "center" } },
                        v.qtd == null ? "—" : v.qtd,
                      ),
                      o.default.createElement(
                        "td",
                        { style: F },
                        h
                          ? o.default.createElement(
                              "span",
                              {
                                style: {
                                  background: x(y),
                                  color: y === "S" ? "#000" : "#fff",
                                  fontWeight: 700,
                                  fontSize: 12,
                                  padding: "3px 8px",
                                  borderRadius: 999,
                                  whiteSpace: "nowrap",
                                },
                              },
                              f(y),
                            )
                          : o.default.createElement("span", { style: { color: s.txtMuted } }, "Fora do painel"),
                      ),
                      o.default.createElement(
                        "td",
                        { style: { ...F, textAlign: "center" } },
                        h ? (h.qtd_entregue != null && h.qtd_entregue !== "" ? h.qtd_entregue : "—") : "",
                      ),
                    );
                  }),
                ),
              ),
            ),
    ),
  );
}
function h1({ ativo: e, bb: t }) {
  let n = t ? t.filial : "",
    a = t ? t.listaDe : null,
    [r, i] = (0, o.useState)({}),
    [l, d] = (0, o.useState)(false),
    [u, p] = (0, o.useState)(false),
    [c, g] = (0, o.useState)(""),
    [f, x] = (0, o.useState)(false),
    w = (0, o.useRef)(null),
    F = () => {
      let N = w.current;
      if (f) {
        x(false);
        try {
          document.fullscreenElement && document.exitFullscreen && document.exitFullscreen().catch(() => {});
        } catch {}
      } else {
        x(true);
        try {
          N && N.requestFullscreen && N.requestFullscreen().catch(() => {});
        } catch {}
      }
    };
  (0, o.useEffect)(() => {
    if (!f) return;
    let N = () => {
        document.fullscreenElement || x(false);
      },
      b = (j) => {
        j.key === "Escape" && !document.fullscreenElement && x(false);
      };
    return (
      document.addEventListener("fullscreenchange", N),
      document.addEventListener("keydown", b),
      () => {
        (document.removeEventListener("fullscreenchange", N), document.removeEventListener("keydown", b));
      }
    );
  }, [f]);
  let v = async (N) => {
    let b = await Hg(String(N));
    g(b ? String(N) : "!" + N);
  };
  (0, o.useEffect)(() => {
    if (!c) return;
    let N = setTimeout(() => g(""), 2200);
    return () => clearTimeout(N);
  }, [c]);
  let [m, h] = (0, o.useState)(false),
    [y, B] = (0, o.useState)({}),
    [k, L] = (0, o.useState)(false),
    [C, _] = (0, o.useState)(null),
    [q, E] = (0, o.useState)(""),
    [A, I] = (0, o.useState)(false),
    [V, D] = (0, o.useState)(Date.now()),
    [O, H] = (0, o.useState)(""),
    [M, Q] = (0, o.useState)(""),
    [Y, de] = (0, o.useState)(""),
    [ce, W] = (0, o.useState)(""),
    [S, te] = (0, o.useState)(""),
    [re, be] = (0, o.useState)(false),
    [pe, $] = (0, o.useState)(200),
    [ee, se] = (0, o.useState)(""),
    [Ae, Ne] = (0, o.useState)(false),
    [Ce, Ie] = (0, o.useState)(""),
    [Be, Ve] = (0, o.useState)({}),
    [lt, G] = (0, o.useState)(false),
    [me, je] = (0, o.useState)(null),
    [Ye, Se] = (0, o.useState)(null),
    De = (0, o.useCallback)(
      async (N) => {
        N || I(true);
        try {
          let b = "&order=data_limite.asc.nullslast,pedido.asc",
            j,
            Z = [
              [Gb, false],
              [s1, false],
              [i1, false],
              [r1, false],
              [a1, true],
            ];
          for (let ae = 0; ae < Z.length; ae++)
            try {
              ((j = await Xn(
                `/v_via_leitor_lista?select=${Z[ae][0]}${n ? "&filial=eq." + encodeURIComponent(n) : Wg}${b}`,
              )),
                Ne(Z[ae][1]));
              break;
            } catch (K) {
              if (
                !/agendado|itens|est_itens|est_entregues|est_separando|separador|separacao_status|faturador|42703|column/i.test(
                  String(K.message || K),
                ) ||
                ae === Z.length - 1
              )
                throw K;
            }
          (_(j), E(""));
          try {
            let ae = await ye("/via_leitor_atualizacoes?select=origem,atualizado_em,detalhe"),
              K = {};
            ((Array.isArray(ae) ? ae : []).forEach((Ee) => {
              K[Ee.origem] = Ee;
            }),
              Ve(K));
          } catch {}
        } catch (b) {
          let j = String(b.message || b);
          E(
            /PGRST205|does not exist|Could not find/i.test(j)
              ? "A view do Via Leitor ainda não existe no Supabase. Rode o SQL criar_via_leitor_agente.sql."
              : "Não foi possível carregar o Via Leitor: " + j.slice(0, 160),
          );
        } finally {
          I(false);
        }
      },
      [n],
    );
  ((0, o.useEffect)(() => {
    if (!e) return;
    De(false);
    let N = setInterval(() => {
      document.hidden || De(true);
    }, 3e4);
    return () => clearInterval(N);
  }, [e, De]),
    (0, o.useEffect)(() => {
      if (!e) return;
      D(Date.now());
      let N = setInterval(() => D(Date.now()), 1e3);
      return () => clearInterval(N);
    }, [e]));
  let xe = Lc(V),
    ke = (0, o.useMemo)(() => (C || []).filter((N) => sl(N, xe)).length, [C, xe]),
    we = (0, o.useMemo)(
      () =>
        (C || [])
          .filter((N) => re || !sl(N, xe))
          .map((N) => {
            let b = N.data_limite ? new Date(N.data_limite).getTime() : null,
              j = {
                ...N,
                ...(a ? { tempo_pedido_horas: 3 } : {}),
                lim: b,
                restante: b == null ? null : b - V,
                tipo: N.tem_lista ? "lista" : N.no_estoque ? "estoque" : "gerar",
                aplica: eg(N),
                estPct:
                  Number(N.est_itens) > 0
                    ? Math.round((Number(N.est_entregues || 0) / Number(N.est_itens)) * 100)
                    : null,
                sepSt: eg(N)
                  ? Number(N.est_itens) > 0
                    ? Number(N.est_entregues || 0) >= Number(N.est_itens)
                      ? "concluida"
                      : Number(N.est_entregues || 0) + Number(N.est_separando || 0) > 0
                        ? "andamento"
                        : "nao"
                    : N.tem_lista
                      ? N.separacao_status === "finalizada"
                        ? "concluida"
                        : N.separacao_status === "em_separacao"
                          ? "andamento"
                          : "nao"
                      : null
                  : null,
              };
            if (a) {
              let Z = a[String(N.pedido)];
              ((j.tipo = Z ? "lista" : "gerar"),
                (j.tem_lista = !!Z),
                (j.lista_status = Z ? Ba(Z) : "Gerar Lista"),
                (j.aplica = false),
                (j.sepSt = null));
            }
            return j;
          }),
      [C, V, a, re, xe],
    ),
    Qe = (0, o.useMemo)(() => {
      let N = new Set(Ec);
      return (
        (C || []).forEach((b) => {
          (b.separador && N.add(b.separador), b.faturador && N.add(b.faturador));
        }),
        [...N]
      );
    }, [C]),
    Xe = async (N, b) => {
      let j = b;
      if (j === "__outro" && ((j = (window.prompt("Nome de quem faturou:") || "").trim()), !j)) return;
      let Z = N.separacao_id ? "l" + N.separacao_id : "p" + N.pedido;
      (Ie(Z), Se(null));
      try {
        (N.separacao_id
          ? await ye("/separacao_listas?id=eq." + encodeURIComponent(N.separacao_id), {
              method: "PATCH",
              body: JSON.stringify({ faturador: j || null, faturou_lista: j ? j === N.separador : null }),
              headers: { Prefer: "return=minimal" },
            })
          : j
            ? await ye("/pedido_faturador?on_conflict=pedido", {
                method: "POST",
                body: JSON.stringify({ pedido: N.pedido, faturador: j }),
                headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
              })
            : await ye("/pedido_faturador?pedido=eq." + encodeURIComponent(N.pedido), {
                method: "DELETE",
                headers: { Prefer: "return=minimal" },
              }),
          _((ae) =>
            (ae || []).map((K) =>
              (N.separacao_id ? K.separacao_id === N.separacao_id : K.pedido === N.pedido)
                ? { ...K, faturador: j || null, faturador_manual: !N.separacao_id && !!j }
                : K,
            ),
          ),
          De(true));
      } catch (ae) {
        Se({ tipo: "erro", texto: "Não foi possível gravar o faturador: " + String(ae.message || ae).slice(0, 160) });
      } finally {
        Ie("");
      }
    },
    ue = (N, b) => {
      if (!t) return null;
      let j = wt(N.pedido, b.produto),
        Z = (t.pedVenda || {})[j];
      return !Z || (Z.mantido && (t.compras || {})[j] && xa(t.compras[j]).texto === "Chegou")
        ? null
        : o.default.createElement(
            "span",
            {
              title: `Pedido de venda: sem estoque na 1020. A peça está sendo comprada da 0101 e ainda pode não ter chegado. Não procurar no estoque.${Z.mantido ? " (Já saiu do relatório, mas continua marcado por 24 h desde a última vez que apareceu: " + new Date(Z.visto).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" }) + ")" : ""}`,
              style: { ...ic, background: "#7c3aed", color: "#fff" },
            },
            "📦 Pedido de venda",
          );
    },
    Pe = (N, b) => {
      if (!t || !t.solicitarLote) return null;
      let j = wt(N.pedido, b.produto),
        Z = (t.compras || {})[j];
      if (!Z) return null;
      let ae = xa(Z),
        K = (t.comprasDatas || {})[j] || {},
        Ee = [
          K.solic && `Solicitado em ${K.solic}`,
          K.compra && `Comprado em ${K.compra}`,
          K.chegou && `Chegou em ${K.chegou}`,
        ]
          .filter(Boolean)
          .join(" · ");
      return o.default.createElement(
        "span",
        { title: Ee || `Situação na planilha: ${Z}`, style: { ...ic, background: ae.bg, color: ae.fg } },
        "🛒 ",
        ae.texto,
      );
    },
    dt = (N) => {
      let b = dr(N),
        j = (K) => xa(K),
        Z = (K) => {
          let Ee = ue(N, K),
            he = Pe(N, K);
          return Ee || he ? o.default.createElement(o.default.Fragment, null, Ee, he) : null;
        },
        ae;
      if (!b.length) ae = "—";
      else if (b.length <= nc)
        ae = b.some((K) => Z(K))
          ? o.default.createElement(
              "div",
              { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 } },
              b.map((K) =>
                o.default.createElement(
                  "div",
                  {
                    key: K.produto,
                    title: K.produto,
                    style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 3 },
                  },
                  Z(K) || "—",
                ),
              ),
            )
          : "—";
      else {
        let K = b.filter((z) => (t.pedVenda || {})[wt(N.pedido, z.produto)]).length,
          Ee = {};
        b.forEach((z) => {
          let U = (t.compras || {})[wt(N.pedido, z.produto)];
          if (U) {
            let T = j(U);
            ((Ee[T.texto] = Ee[T.texto] || { v: T, n: 0 }), (Ee[T.texto].n += 1));
          }
        });
        let he = ic;
        ae =
          K || Object.keys(Ee).length
            ? o.default.createElement(
                "div",
                { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 } },
                K > 0 &&
                  o.default.createElement(
                    "span",
                    {
                      title:
                        "Itens deste pedido que são pedido de venda (peça sendo comprada da 0101). Veja o detalhe.",
                      style: { ...he, background: "#7c3aed", color: "#fff" },
                    },
                    "📦 ",
                    K,
                    " pedido",
                    K > 1 ? "s" : "",
                    " de venda",
                  ),
                Object.values(Ee).map((z) =>
                  o.default.createElement(
                    "span",
                    { key: z.v.texto, style: { ...he, background: z.v.bg, color: z.v.fg } },
                    "🛒 ",
                    z.n,
                    " ",
                    z.v.texto,
                  ),
                ),
              )
            : "—";
      }
      return ae;
    },
    Tt = (N, b) => ({
      pedido: String(N.pedido),
      produto: b.produto,
      qtd: b.qtd > 0 ? b.qtd : 1,
      transporte: N.transportadora || "",
      lib: N.lib_estoque || "",
      lim: N.data_limite || "",
    }),
    _e = (N) => !!(t && t.solicitarLote) && !(t.compras || {})[N] && !(t.enviando || {})[N],
    yt = (N, b) =>
      i((j) => {
        let Z = { ...j };
        return (
          N.forEach(([ae, K]) => {
            b ? (Z[ae] = K) : delete Z[ae];
          }),
          Z
        );
      }),
    zt = { width: 17, height: 17, cursor: "pointer", accentColor: "#1a73e8" },
    po = (N, b) => {
      if (m) {
        let Z = jo(b.produto);
        return o.default.createElement("input", {
          type: "checkbox",
          "aria-label": `Selecionar ${b.produto} para ajuste`,
          style: zt,
          checked: !!y[Z],
          onChange: (ae) =>
            B((K) => {
              let Ee = { ...K };
              return (ae.target.checked ? (Ee[Z] = { produto: b.produto }) : delete Ee[Z], Ee);
            }),
        });
      }
      let j = wt(N.pedido, b.produto);
      return !u || !_e(j)
        ? null
        : o.default.createElement("input", {
            type: "checkbox",
            "aria-label": `Selecionar ${b.produto}`,
            style: zt,
            checked: !!r[j],
            onChange: (Z) => yt([[j, Tt(N, b)]], Z.target.checked),
          });
    },
    Ut = Object.entries(r)
      .filter(([N]) => _e(N))
      .map(([, N]) => N),
    nt = (0, o.useMemo)(
      () => ({
        total: we.length,
        alerta: we.filter((N) => li(N) === "vermelho").length,
        azul: we.filter((N) => li(N) === "azul").length,
        gerar: we.filter((N) => N.tipo === "gerar").length,
        estoque: we.filter((N) => N.tipo === "estoque").length,
        emLista: we.filter((N) => N.tipo === "lista").length,
        atraso: we.filter((N) => N.restante != null && N.restante < 0).length,
        semFat: we.filter((N) => (N.sepSt === "concluida" || (N.tipo === "estoque" && N.aplica)) && !N.faturador)
          .length,
        naoIniciada: we.filter((N) => N.sepSt === "nao").length,
      }),
      [we],
    ),
    At = !!(O.trim() || M || Y || ce || ee || S),
    kt = (0, o.useMemo)(() => {
      let N = Rt(O);
      return we.filter((b) => {
        if (
          (M && b.filial !== M) ||
          (Y && b.tipo !== Y) ||
          (ce === "atraso" && !(b.restante != null && b.restante < 0)) ||
          (ce === "vermelho" && li(b) !== "vermelho") ||
          (ce === "azul" && li(b) !== "azul") ||
          (ce === "prazo" && !(b.restante != null && b.restante >= 0))
        )
          return false;
        if (t && S) {
          let j = dr(b).some((Z) => !!(t.pedVenda || {})[wt(b.pedido, Z.produto)]);
          if ((S === "pv" && !j) || (S === "estoque" && j)) return false;
          if (S === "chegando" || S === "liberado") {
            let Z = dr(b).some((ae) => {
              let K = wt(b.pedido, ae.produto),
                Ee = (t.compras || {})[K];
              return Ee ? xa(Ee).texto !== "Chegou" : !!(t.pedVenda || {})[K];
            });
            if ((S === "chegando" && !Z) || (S === "liberado" && Z)) return false;
          }
        }
        if (ee === "sem_faturador") {
          if (!((b.sepSt === "concluida" || (b.tipo === "estoque" && b.aplica)) && !b.faturador)) return false;
        } else if (ee && b.sepSt !== ee) return false;
        return !(
          N &&
          !Rt(
            `${b.pedido} ${b.transportadora} ${b.produtos || ""} ${b.lista_status} ${b.separador || ""} ${b.faturador || ""}`,
          ).includes(N)
        );
      });
    }, [we, O, M, Y, ce, ee, S, t && t.pedVenda, t && t.compras]),
    It = t && t.onVisiveis,
    Mt = At ? kt.map((N) => N.pedido).join(",") : "*";
  ((0, o.useEffect)(() => {
    It && It(Mt === "*" ? null : Mt ? Mt.split(",") : []);
  }, [Mt, It]),
    (0, o.useEffect)(() => $(200), [O, M, Y, ce, ee, S]));
  let ht = (0, o.useMemo)(
      () => (C && C.length ? Math.max(...C.map((N) => new Date(N.atualizado_em).getTime() || 0)) : 0),
      [C],
    ),
    xt = Be.agente ? new Date(Be.agente.atualizado_em).getTime() : 0,
    Ft = Be.manual ? new Date(Be.manual.atualizado_em).getTime() : 0,
    eo = Math.max(xt, Ft) || ht,
    Wo = eo && V - eo > c1;
  return o.default.createElement(
    "div",
    {
      ref: w,
      style: f
        ? {
            position: "fixed",
            inset: 0,
            zIndex: 900,
            overflow: "auto",
            background: "var(--page)",
            padding: "16px 20px",
            boxSizing: "border-box",
          }
        : void 0,
    },
    o.default.createElement(
      Ea,
      null,
      o.default.createElement(Me, {
        rotulo: "Pedidos no Via Leitor",
        valor: nt.total,
        detalhe: t ? "Filial " + t.filial : "Filiais 0101 e 0102",
        tipo: "info",
      }),
      o.default.createElement(Me, {
        rotulo: "Gerar lista",
        valor: nt.gerar,
        detalhe: "Sem lista e fora do estoque",
        tipo: nt.gerar ? "erro" : "ok",
      }),
      o.default.createElement(Me, {
        rotulo: "Em lista",
        valor: nt.emLista,
        detalhe: "Já têm lista gerada",
        tipo: "ok",
      }),
      !t &&
        o.default.createElement(Me, {
          rotulo: "Estoque - separação",
          valor: nt.estoque,
          detalhe: "Lançados para o estoque",
          tipo: "warn",
        }),
      o.default.createElement(Me, {
        rotulo: "Em vermelho",
        valor: nt.alerta,
        detalhe: "Falta 1h ou menos, ou já atrasou",
        tipo: nt.alerta ? "erro" : "ok",
      }),
      o.default.createElement(Me, {
        rotulo: "Em azul",
        valor: nt.azul,
        detalhe: "Mais de 50 un, faltam 3h ou menos",
        tipo: "info",
      }),
      o.default.createElement(Me, {
        rotulo: "Em atraso",
        valor: nt.atraso,
        detalhe: "Passou da data limite",
        tipo: nt.atraso ? "erro" : "ok",
      }),
      !Ae &&
        !t &&
        o.default.createElement(Me, {
          rotulo: "Separação não iniciada",
          valor: nt.naoIniciada,
          detalhe: "Sem nenhum item iniciado",
          tipo: nt.naoIniciada ? "warn" : "ok",
        }),
      !Ae &&
        !t &&
        o.default.createElement(Me, {
          rotulo: "Sem faturador",
          valor: nt.semFat,
          detalhe: "Concluída ou estoque, sem nome",
          tipo: nt.semFat ? "warn" : "ok",
        }),
    ),
    o.default.createElement(
      ft,
      {
        titulo: "Via Leitor × Listas",
        subtitulo:
          ht || xt || Ft
            ? `Agente: ${xt ? di(xt) : ht && !Ft ? di(ht) : "—"} · Manual: ${Ft ? di(Ft) : "—"} · ${kt.length} de ${we.length} pedidos`
            : "Pedidos do Via Leitor e a lista de cada um",
        acoes: o.default.createElement(
          "div",
          { style: { display: "flex", gap: 8 } },
          o.default.createElement(ge, { onClick: F }, f ? "🗗 Sair da tela cheia" : "⛶ Tela cheia"),
          o.default.createElement(ge, { onClick: () => G(true) }, "📤 Subir relatório"),
          o.default.createElement(ge, { onClick: () => De(false), disabled: A }, A ? "Atualizando..." : "🔄 Atualizar"),
        ),
      },
      t && t.avisoCompra && o.default.createElement($e, { tipo: t.avisoCompra.tipo }, t.avisoCompra.texto),
      q && o.default.createElement($e, { tipo: "erro" }, q),
      Ye && o.default.createElement($e, { tipo: Ye.tipo }, Ye.texto),
      Ae &&
        !t &&
        !q &&
        o.default.createElement(
          $e,
          { tipo: "warn" },
          "As colunas Separador, Faturador e Status da separação aparecem depois de rodar o SQL criar_faturador_separacao.sql no Supabase.",
        ),
      Wo &&
        o.default.createElement(
          $e,
          { tipo: "erro" },
          "O Via Leitor não é atualizado há ",
          Tc(V - eo),
          ". Confira se o agente está rodando ou suba o relatório manualmente.",
        ),
      o.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            margin: "4px 0 14px",
            padding: 12,
            background: s.bgStripe,
            border: `1px solid ${s.bdLight}`,
            borderRadius: s.radius.lg,
          },
        },
        o.default.createElement("input", {
          className: "lf-input",
          style: { ...Ke, width: 240 },
          placeholder: "🔍 Pedido, produto, transportadora, lista ou pessoa",
          value: O,
          onChange: (N) => H(N.target.value),
        }),
        !t &&
          o.default.createElement(
            "select",
            { className: "lf-input", style: Ke, value: M, onChange: (N) => Q(N.target.value) },
            o.default.createElement("option", { value: "" }, "Filial: todas"),
            _c.map((N) => o.default.createElement("option", { key: N, value: N }, N)),
          ),
        o.default.createElement(
          "select",
          { className: "lf-input", style: Ke, value: Y, onChange: (N) => de(N.target.value) },
          o.default.createElement("option", { value: "" }, "Lista: todas"),
          o.default.createElement("option", { value: "gerar" }, "Gerar Lista"),
          !t && o.default.createElement("option", { value: "estoque" }, "Estoque - separação"),
          o.default.createElement("option", { value: "lista" }, "Em lista"),
        ),
        o.default.createElement(
          "select",
          { className: "lf-input", style: Ke, value: ce, onChange: (N) => W(N.target.value) },
          o.default.createElement("option", { value: "" }, "Prazo: todos"),
          o.default.createElement("option", { value: "vermelho" }, "Em vermelho (≤ 1h)"),
          o.default.createElement("option", { value: "azul" }, "Em azul (mais de 50 un, até 3h)"),
          o.default.createElement("option", { value: "atraso" }, "Em atraso"),
          o.default.createElement("option", { value: "prazo" }, "No prazo"),
        ),
        t &&
          o.default.createElement(
            "select",
            {
              className: "lf-input",
              style: Ke,
              value: S,
              onChange: (N) => te(N.target.value),
              "aria-label": "Situação do pedido",
            },
            o.default.createElement("option", { value: "" }, "Situação: todas"),
            o.default.createElement("option", { value: "liberado" }, "✅ Pronto para catar (nada aguardando)"),
            o.default.createElement("option", { value: "chegando" }, "⏳ Tem item aguardando chegada"),
            o.default.createElement("option", { value: "pv" }, "📦 Pedido de venda"),
            o.default.createElement("option", { value: "estoque" }, "Do estoque (sem pedido de venda)"),
          ),
        t &&
          t.solicitarLote &&
          o.default.createElement(
            "div",
            { style: { display: "flex", gap: 8, alignItems: "center", marginLeft: "auto", flexWrap: "wrap" } },
            !u && !m
              ? o.default.createElement(
                  o.default.Fragment,
                  null,
                  o.default.createElement(
                    ge,
                    {
                      title: "Libera as caixinhas para marcar os produtos que precisam de ajuste de saldo",
                      onClick: () => h(true),
                    },
                    "⚖\ufe0f Ajuste de saldo",
                  ),
                  o.default.createElement(
                    ge,
                    {
                      tipo: "primario",
                      title: "Libera as caixinhas para marcar os produtos que precisam de compra",
                      onClick: () => p(true),
                    },
                    "🛒 Solicitar compra",
                  ),
                )
              : m
                ? o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(
                      "span",
                      { style: { fontSize: 12.5, color: s.txtMuted, fontWeight: 600 } },
                      "Marque os produtos que precisam de ajuste de saldo",
                    ),
                    o.default.createElement(
                      ge,
                      {
                        pequeno: true,
                        onClick: () => {
                          (h(false), B({}));
                        },
                      },
                      "Cancelar",
                    ),
                    o.default.createElement(
                      ge,
                      {
                        tipo: "primario",
                        disabled: Object.keys(y).length === 0,
                        title: "Informar os saldos e enviar para a planilha",
                        onClick: () => L(true),
                      },
                      "⚖\ufe0f Informar saldos",
                      Object.keys(y).length > 0 ? ` (${Object.keys(y).length})` : "",
                    ),
                  )
                : o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement(
                      "span",
                      { style: { fontSize: 12.5, color: s.txtMuted, fontWeight: 600 } },
                      "Marque os produtos que precisam de compra",
                    ),
                    o.default.createElement(
                      ge,
                      {
                        pequeno: true,
                        onClick: () => {
                          (p(false), i({}));
                        },
                      },
                      "Cancelar",
                    ),
                    o.default.createElement(
                      ge,
                      {
                        tipo: "primario",
                        disabled: Ut.length === 0,
                        title: "Revisar e enviar para a planilha",
                        onClick: () => d(true),
                      },
                      "🛒 Enviar solicitação",
                      Ut.length > 0 ? ` (${Ut.length})` : "",
                    ),
                  ),
          ),
        !Ae &&
          !t &&
          o.default.createElement(
            "select",
            { className: "lf-input", style: Ke, value: ee, onChange: (N) => se(N.target.value) },
            o.default.createElement("option", { value: "" }, "Separação: todas"),
            o.default.createElement("option", { value: "nao" }, "Não iniciada"),
            o.default.createElement("option", { value: "andamento" }, "Em separação"),
            o.default.createElement("option", { value: "concluida" }, "Concluída"),
            o.default.createElement("option", { value: "sem_faturador" }, "Sem faturador"),
          ),
      ),
      ke > 0 &&
        o.default.createElement(
          "div",
          {
            style: {
              margin: "-4px 0 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              fontSize: 12.5,
              color: s.txtSec,
            },
          },
          o.default.createElement(
            "span",
            null,
            "📅 ",
            ke,
            " ",
            ke === 1
              ? "pedido agendado para outro dia está escondido"
              : "pedidos agendados para outros dias estão escondidos",
            " (aparecem no dia agendado).",
          ),
          o.default.createElement(
            "button",
            {
              type: "button",
              onClick: () => be((N) => !N),
              style: {
                padding: "3px 10px",
                borderRadius: 999,
                border: `1px solid ${s.bdMid}`,
                background: re ? "#ede9fe" : s.bgCard,
                color: re ? "#6d28d9" : s.txtSec,
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
                fontFamily: s.font,
              },
            },
            re ? "Esconder agendados" : "Mostrar agendados",
          ),
        ),
      C === null && !q
        ? o.default.createElement(Zt, null, "Carregando pedidos do Via Leitor...")
        : kt.length === 0
          ? o.default.createElement(
              Zt,
              null,
              we.length ? "Nenhum pedido encontrado neste filtro." : "Nenhum pedido no Via Leitor.",
            )
          : o.default.createElement(
              o.default.Fragment,
              null,
              o.default.createElement(
                "div",
                {
                  style: {
                    overflow: "auto",
                    maxHeight: "70vh",
                    border: `1px solid ${s.bdLight}`,
                    borderRadius: s.radius.lg,
                  },
                },
                o.default.createElement(
                  "table",
                  {
                    style: {
                      width: "100%",
                      borderCollapse: "collapse",
                      fontFamily: s.font,
                      fontVariantNumeric: "tabular-nums",
                    },
                  },
                  o.default.createElement(
                    "thead",
                    null,
                    o.default.createElement(
                      "tr",
                      null,
                      ["Filial", "Pedido", "Data Liberação", "Agendado para", "Quant", "Transporte", "Produto"]
                        .concat(t ? ["Localização"] : [])
                        .concat(["Status", "Tempo Pedido", "Data limite", "Tempo Restante"])
                        .concat(t ? ["Situação"] : [])
                        .concat(["Lista"])
                        .concat(Ae || t ? [] : ["Separador", "Faturador", "Status separação"])
                        .map((N) =>
                          o.default.createElement(
                            "th",
                            {
                              key: N,
                              style: {
                                position: "sticky",
                                top: 0,
                                zIndex: 1,
                                background: Nc,
                                color: "#fff",
                                fontSize: 12.5,
                                fontWeight: 800,
                                padding: "11px 8px",
                                textAlign: N === "Transporte" || N === "Produto" ? "left" : "center",
                                whiteSpace: "nowrap",
                                letterSpacing: "0.02em",
                              },
                            },
                            N,
                          ),
                        ),
                    ),
                  ),
                  o.default.createElement(
                    "tbody",
                    null,
                    kt.slice(0, pe).map((N) => {
                      let b = N.restante != null && N.restante < 0,
                        j = li(N),
                        Z = j === "vermelho",
                        ae = j != null,
                        K = {
                          padding: "9px 8px",
                          fontSize: 13,
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          borderBottom: `1px solid ${ae ? "rgba(255,255,255,0.35)" : s.bdLight}`,
                          background: Z ? tg : j === "azul" ? Yb : "transparent",
                          color: ae ? "#fff" : s.txtPri,
                          fontWeight: ae ? 700 : 500,
                        },
                        Ee = Number(N.tempo_pedido_horas);
                      return o.default.createElement(
                        "tr",
                        { key: `${N.filial}-${N.pedido}` },
                        o.default.createElement("td", { style: K }, N.filial),
                        o.default.createElement(
                          "td",
                          { style: { ...K, fontWeight: 800 } },
                          o.default.createElement(
                            "span",
                            {
                              onClick: () => v(N.pedido),
                              title: "Clique para copiar o número do pedido",
                              style: { cursor: "copy", textDecoration: "underline dotted", textUnderlineOffset: 3 },
                            },
                            N.pedido,
                          ),
                          o.default.createElement(
                            "button",
                            {
                              type: "button",
                              onClick: () => je(`${N.filial}-${N.pedido}`),
                              title: "Ver o pedido: itens, quantidades e localização",
                              "aria-label": `Ver o pedido ${N.pedido}`,
                              style: {
                                marginLeft: 6,
                                padding: "0 4px",
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                fontSize: 13,
                                lineHeight: 1,
                                verticalAlign: "middle",
                              },
                            },
                            "🔍",
                          ),
                        ),
                        o.default.createElement(
                          "td",
                          { style: K },
                          N.lib_estoque ? di(new Date(N.lib_estoque).getTime()) : "—",
                        ),
                        o.default.createElement(
                          "td",
                          { style: K },
                          N.agendado_para
                            ? o.default.createElement(
                                "span",
                                {
                                  title: sl(N, xe)
                                    ? "Agendado para um dia futuro"
                                    : String(N.agendado_para).slice(0, 10) === xe
                                      ? "Agendado para hoje"
                                      : "Agendado para um dia que já passou",
                                  style: {
                                    display: "inline-block",
                                    padding: "2px 8px",
                                    borderRadius: 6,
                                    fontWeight: 800,
                                    background: ae ? "rgba(255,255,255,0.25)" : "#ede9fe",
                                    color: ae ? "#fff" : "#6d28d9",
                                  },
                                },
                                "📅 ",
                                l1(N.agendado_para),
                              )
                            : "—",
                        ),
                        o.default.createElement("td", { style: K }, Wn(N.qtd_total)),
                        o.default.createElement("td", { style: { ...K, textAlign: "left" } }, N.transportadora || "—"),
                        o.default.createElement(
                          "td",
                          {
                            style: {
                              ...K,
                              textAlign: "left",
                              whiteSpace: "normal",
                              minWidth: 130,
                              maxWidth: 240,
                              wordBreak: "break-word",
                            },
                          },
                          (() => {
                            let he = dr(N);
                            return he.length
                              ? he.length <= nc && t
                                ? o.default.createElement(
                                    "div",
                                    {
                                      style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "2px 8px",
                                        flexWrap: "wrap",
                                        minHeight: 26,
                                      },
                                    },
                                    he.map((z, U) =>
                                      o.default.createElement(
                                        "span",
                                        {
                                          key: z.produto,
                                          style: {
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 6,
                                            whiteSpace: "nowrap",
                                          },
                                        },
                                        (u || m) &&
                                          (po(N, z) || o.default.createElement("span", { style: { width: 17 } })),
                                        o.default.createElement("span", null, z.produto, U < he.length - 1 ? "," : ""),
                                      ),
                                    ),
                                  )
                                : he.length <= nc
                                  ? he.map((z) => z.produto).join(" , ")
                                  : o.default.createElement(
                                      "button",
                                      {
                                        type: "button",
                                        onClick: () => je(`${N.filial}-${N.pedido}`),
                                        style: {
                                          fontFamily: s.font,
                                          fontSize: 12,
                                          fontWeight: 700,
                                          padding: "3px 9px",
                                          borderRadius: 999,
                                          border: "1px solid rgba(0,0,0,0.25)",
                                          background: "#fff",
                                          color: "#111",
                                          cursor: "pointer",
                                        },
                                      },
                                      "🔍 Ver ",
                                      he.length,
                                      " itens",
                                      t &&
                                        t.solicitarLote &&
                                        (u || m) &&
                                        (() => {
                                          let z = m
                                            ? he.filter((U) => y[jo(U.produto)]).length
                                            : he.filter(
                                                (U) => r[wt(N.pedido, U.produto)] && _e(wt(N.pedido, U.produto)),
                                              ).length;
                                          return z > 0 ? ` · ${z} marcado${z > 1 ? "s" : ""}` : "";
                                        })(),
                                    )
                              : "";
                          })(),
                        ),
                        t &&
                          (() => {
                            let he = dr(N),
                              z = he.map((U) => zc(((t.locMap || {})[jo(U.produto)] || {}).localizacao));
                            return o.default.createElement(
                              o.default.Fragment,
                              null,
                              o.default.createElement(
                                "td",
                                {
                                  title: he.length === 1 && z[0].extra ? z[0].completo : void 0,
                                  style: {
                                    ...K,
                                    fontWeight: 800,
                                    whiteSpace: "normal",
                                    minWidth: 140,
                                    maxWidth: 260,
                                    wordBreak: "break-word",
                                  },
                                },
                                he.length === 1
                                  ? z[0].txt || "—"
                                  : he.length > 1
                                    ? o.default.createElement(
                                        "button",
                                        {
                                          type: "button",
                                          title: "Ver a localização de cada item",
                                          onClick: () => je(`${N.filial}-${N.pedido}`),
                                          style: {
                                            fontFamily: s.font,
                                            fontSize: 12,
                                            fontWeight: 700,
                                            padding: "3px 10px",
                                            borderRadius: 999,
                                            border: "1px solid rgba(0,0,0,0.25)",
                                            background: "#fff",
                                            color: "#111",
                                            cursor: "pointer",
                                            whiteSpace: "nowrap",
                                          },
                                        },
                                        "🔍 Ver localização",
                                      )
                                    : "—",
                              ),
                            );
                          })(),
                        o.default.createElement(
                          "td",
                          { style: K },
                          N.restante == null ? "—" : b ? "Atraso" : "No Prazo",
                        ),
                        o.default.createElement("td", { style: K }, Ee ? `${Ee}:00:00` : "—"),
                        o.default.createElement("td", { style: K }, N.lim ? di(N.lim) : "—"),
                        o.default.createElement(
                          "td",
                          { style: { ...K, fontWeight: 800 } },
                          N.restante == null ? "—" : yc(N.restante),
                        ),
                        t &&
                          o.default.createElement(
                            "td",
                            { style: { ...K, whiteSpace: "normal", width: 160, minWidth: 140, maxWidth: 170 } },
                            dt(N),
                          ),
                        o.default.createElement(
                          "td",
                          {
                            style: {
                              ...K,
                              ...(N.tipo === "estoque"
                                ? { background: Zb, color: "#000", fontStyle: "italic", fontWeight: 600 }
                                : N.tipo === "gerar"
                                  ? { background: tg, color: "#fff", fontStyle: "italic", fontWeight: 700 }
                                  : null),
                            },
                          },
                          N.lista_status,
                        ),
                        !Ae &&
                          !t &&
                          o.default.createElement(
                            o.default.Fragment,
                            null,
                            o.default.createElement("td", { style: K }, N.aplica ? N.separador || "—" : ""),
                            o.default.createElement(
                              "td",
                              { style: { ...K, padding: "5px 8px" } },
                              N.aplica
                                ? N.sepSt === "concluida" || N.tipo === "estoque"
                                  ? o.default.createElement(
                                      "select",
                                      {
                                        value: N.faturador || "",
                                        disabled: Ce === (N.separacao_id ? "l" + N.separacao_id : "p" + N.pedido),
                                        onChange: (he) => Xe(N, he.target.value),
                                        title: N.separacao_id
                                          ? "Vale para a lista inteira"
                                          : "Vale só para este pedido",
                                        style: {
                                          fontFamily: s.font,
                                          fontSize: 12.5,
                                          fontWeight: 700,
                                          padding: "4px 6px",
                                          borderRadius: 6,
                                          border: `1px solid ${N.faturador ? s.bdMid : vc}`,
                                          background: N.faturador ? "#fff" : "#fff7e0",
                                          color: "#111",
                                          maxWidth: 150,
                                        },
                                      },
                                      o.default.createElement("option", { value: "" }, "Escolher..."),
                                      Qe.map((he) => o.default.createElement("option", { key: he, value: he }, he)),
                                      o.default.createElement("option", { value: "__outro" }, "Outro..."),
                                    )
                                  : N.faturador || "—"
                                : null,
                            ),
                            o.default.createElement(
                              "td",
                              {
                                style: {
                                  ...K,
                                  ...(N.sepSt === "nao"
                                    ? { background: d1, color: "#fff", fontWeight: 700 }
                                    : N.sepSt === "andamento"
                                      ? { background: vc, color: "#000", fontWeight: 700 }
                                      : N.sepSt === "concluida"
                                        ? { background: u1, color: "#fff", fontWeight: 700 }
                                        : null),
                                },
                              },
                              N.sepSt === "nao"
                                ? N.estPct != null
                                  ? "Não iniciada · 0%"
                                  : "Não iniciada"
                                : N.sepSt === "andamento"
                                  ? N.estPct != null
                                    ? `Em separação · ${N.estPct}% (${N.est_entregues || 0}/${N.est_itens})`
                                    : `Em separação · ${en(V - new Date(N.separacao_inicio).getTime())}`
                                  : N.sepSt === "concluida"
                                    ? N.estPct != null
                                      ? "Concluída · 100%"
                                      : "Concluída"
                                    : "",
                            ),
                          ),
                      );
                    }),
                  ),
                ),
              ),
              kt.length > pe &&
                o.default.createElement(
                  "div",
                  { style: { textAlign: "center", marginTop: 12 } },
                  o.default.createElement(
                    ge,
                    { onClick: () => $((N) => N + 200) },
                    "Mostrar mais (",
                    kt.length - pe,
                    " restantes)",
                  ),
                ),
            ),
    ),
    lt &&
      o.default.createElement(c2, {
        existentes: C || [],
        agenteHa: xt ? V - xt : null,
        onFechar: () => G(false),
        onFeito: (N) => {
          (G(false), Se({ tipo: "ok", texto: N }), De(false));
        },
      }),
    l &&
      t &&
      Ut.length > 0 &&
      o.default.createElement(B2, {
        itens: Ut,
        pessoas: yn,
        usuario: t.usuario,
        onFechar: () => d(false),
        onEnviar: (N) => {
          (d(false), p(false), i({}), t.solicitarLote(N));
        },
      }),
    c &&
      o.default.createElement(
        "div",
        {
          role: "status",
          style: {
            position: "fixed",
            left: "50%",
            bottom: 28,
            transform: "translateX(-50%)",
            zIndex: 1300,
            background: c[0] === "!" ? "#b3261e" : "#1e293b",
            color: "#fff",
            fontFamily: s.font,
            fontSize: 14,
            fontWeight: 700,
            padding: "10px 18px",
            borderRadius: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          },
        },
        c[0] === "!"
          ? `Não foi possível copiar o pedido ${c.slice(1)}`
          : o.default.createElement(
              o.default.Fragment,
              null,
              o.default.createElement("span", { style: { color: "#4ade80" } }, "✓"),
              " Pedido ",
              c,
              " copiado",
            ),
      ),
    k &&
      t &&
      Object.keys(y).length > 0 &&
      o.default.createElement(S2, {
        itens: Object.values(y),
        pessoas: yn,
        usuario: t.usuario,
        onFechar: () => L(false),
        onEnviar: (N) => {
          (L(false), h(false), B({}), t.solicitarAjuste(N));
        },
      }),
    me &&
      we.find((N) => `${N.filial}-${N.pedido}` === me) &&
      o.default.createElement(p2, {
        r: we.find((N) => `${N.filial}-${N.pedido}` === me),
        onFechar: () => je(null),
        bb: t && {
          ...t,
          btnCompra: (N) =>
            Pe(
              we.find((b) => `${b.filial}-${b.pedido}` === me),
              N,
            ),
          chkCompra: (N) =>
            po(
              we.find((b) => `${b.filial}-${b.pedido}` === me),
              N,
            ),
          pvSelo: (N) =>
            ue(
              we.find((b) => `${b.filial}-${b.pedido}` === me),
              N,
            ),
        },
      }),
  );
}
function f2({ ativo: e }) {
  let [t, n] = (0, o.useState)("importar"),
    [a, r] = (0, o.useState)(null),
    [i, l] = (0, o.useState)(""),
    d = (P, R) => {
      (l(""), r({ titulo: P, aoEscolher: R }));
    },
    [u, p] = (0, o.useState)(null),
    [c, g] = (0, o.useState)(null),
    [f, x] = (0, o.useState)(null),
    [w, F] = (0, o.useState)(false),
    [v, m] = (0, o.useState)(false),
    [h, y] = (0, o.useState)(null),
    B = (0, o.useRef)(null),
    [k, L] = (0, o.useState)({ listas: [], registros: {} }),
    [C, _] = (0, o.useState)(""),
    [q, E] = (0, o.useState)([]),
    [A, I] = (0, o.useState)(false),
    [V, D] = (0, o.useState)(null),
    [O, H] = (0, o.useState)({ busca: "", filial: "", transp: "", impresso: "", status: "" }),
    [M, Q] = (0, o.useState)(() => /* @__PURE__ */ new Set()),
    [Y, de] = (0, o.useState)(""),
    [ce, W] = (0, o.useState)(null),
    [S, te] = (0, o.useState)(""),
    [re, be] = (0, o.useState)(150),
    [pe, $] = (0, o.useState)(null),
    [ee, se] = (0, o.useState)(""),
    [Ae, Ne] = (0, o.useState)(false),
    [Ce, Ie] = (0, o.useState)([]),
    [Be, Ve] = (0, o.useState)(Kb),
    lt = (P) => {
      Ve(P);
      try {
        localStorage.setItem(t1, P);
      } catch {}
    },
    [G, me] = (0, o.useState)(false),
    [je, Ye] = (0, o.useState)(""),
    [Se, De] = (0, o.useState)(false),
    [xe, ke] = (0, o.useState)(null),
    we = async (P) => {
      let R = P.target.files && P.target.files[0];
      if (R) {
        (x(null), y(null), p(null));
        try {
          let X = await Kg(R),
            le = wb(X);
          if (le.faltando.length) {
            g({ tipo: "erro", texto: "Cabeçalho inválido. Faltando: " + le.faltando.join(", ") });
            return;
          }
          (p({ nome: R.name, ...le }),
            g({ tipo: "ok", texto: "Arquivo carregado com sucesso. " + le.rows.length + " linhas encontradas." }),
            F(true));
          try {
            x(await Db(le.rows, le.idx));
          } finally {
            F(false);
          }
        } catch (X) {
          (F(false), g({ tipo: "erro", texto: "Erro ao ler o arquivo: " + X.message }));
        }
      }
    },
    Qe = () => {
      u && d("Quem está gerando as listas?", Xe);
    },
    Xe = async (P) => {
      (m(true), y({ tipo: "info", texto: "Gerando listas..." }));
      try {
        let R = await Tb({
          rows: u.rows,
          headers: u.headers,
          idx: u.idx,
          usuario: P.nome,
          email: P.email,
          origemArquivo: u.nome,
        });
        L({ listas: R.listasSessao, registros: R.registrosPorLista });
        let X = R.resumo;
        (y({
          tipo: "ok",
          texto:
            `Listas salvas: ${X.listas}. Pedidos enviados para a fila do estoque: ${X.pedidosEstoque} (Pedido Caixa: ${X.pedidosCaixa}, Picking Insuficiente: ${X.pedidosInsuf}). Itens confirmados na fila da planilha (Lançamentos): ${X.itensFila}. Pedidos bloqueados pelo histórico: ${X.bloqueadosHistorico}. Pedidos já enviados antes ao estoque (bloqueados): ${X.bloqueadosEstoque}. ` +
            (X.agendadosFora ? `Pedidos agendados para outro dia (ficaram de fora): ${X.agendadosFora}. ` : "") +
            `Linhas inválidas: ${X.linhasInvalidas}.`,
        }),
          p(null),
          x(null),
          B.current && (B.current.value = ""),
          n("listas"));
      } catch (R) {
        y({ tipo: "erro", texto: "Erro: " + R.message });
      } finally {
        m(false);
      }
    },
    ue = (P) => {
      (Ie(P), setTimeout(() => window.print(), 350));
    },
    Pe = async (P) => {
      let R = k.listas.find((X) => X.lista === P);
      if (R) {
        me(true);
        try {
          (await Z0([P]),
            L((X) => ({ ...X, listas: X.listas.map((le) => (le.lista === P ? { ...le, impresso: "SIM" } : le)) })),
            E((X) => X.map((le) => (le.lista === P ? { ...le, impresso: "SIM" } : le))),
            ue([{ lista: P, info: R, registros: k.registros[P] || [] }]));
        } catch (X) {
          alert("Erro ao marcar " + P + " como impressa: " + X.message);
        } finally {
          me(false);
        }
      }
    },
    dt = (0, o.useCallback)(async (P) => {
      (I(true), D(null));
      try {
        let R = P ? "&lista=ilike." + encodeURIComponent("*" + P + "*") : "",
          X = await ye(
            "/historico_listas?select=id,lista,data_hora,usuario,filial,transportadora,pedidos,unidades,impresso,status,motivo_ajuste,ajustada_por,ajustada_em" +
              R +
              "&order=id.desc&limit=" +
              (P ? 500 : 1e3) +
              Wg,
          );
        (E(Array.isArray(X) ? X : []), be(150));
      } catch (R) {
        D({ tipo: "erro", texto: "Erro ao carregar histórico: " + R.message });
      } finally {
        I(false);
      }
    }, []);
  (0, o.useEffect)(() => {
    e && t === "historico" && q.length === 0 && !A && dt("");
  }, [e, t]);
  let Tt = (0, o.useMemo)(
      () => [...new Set(q.map((P) => String(P.transportadora || "").trim()).filter(Boolean))].sort(),
      [q],
    ),
    _e = (0, o.useMemo)(
      () =>
        q.filter((P) => {
          let R = O.busca.trim().toLowerCase();
          return (
            (!R ||
              String(P.lista || "")
                .toLowerCase()
                .includes(R)) &&
            (!O.filial || String(P.filial || "").trim() === O.filial) &&
            (!O.transp || String(P.transportadora || "").trim() === O.transp) &&
            (!O.impresso || String(P.impresso || "NÃO").toUpperCase() === O.impresso) &&
            (!O.status || String(P.status || "ATIVA").toUpperCase() === O.status)
          );
        }),
      [q, O],
    ),
    yt = (P, R) =>
      Q((X) => {
        let le = new Set(X);
        return (R ? le.add(P) : le.delete(P), le);
      }),
    zt = async (P) => {
      if (P.length) {
        (me(true), D(null));
        try {
          let R = [],
            X = [],
            le = [];
          for (let Le of P) {
            let Ue = await Ib(Le);
            String(Ue.info.status || "ATIVA").toUpperCase() === "CANCELADA" || Ue.registros.length
              ? (R.push(Ue), X.push(Le))
              : le.push(Le);
          }
          if (!R.length) throw new Error("Nenhuma das listas selecionadas está disponível para impressão.");
          (await Z0(X),
            E((Le) => Le.map((Ue) => (X.includes(Ue.lista) ? { ...Ue, impresso: "SIM" } : Ue))),
            Q((Le) => {
              let Ue = new Set(Le);
              return (X.forEach((to) => Ue.delete(to)), Ue);
            }),
            le.length && D({ tipo: "warn", texto: "Não incluídas (sem pedidos e não canceladas): " + le.join(", ") }),
            ue(R));
        } catch (R) {
          D({ tipo: "erro", texto: "Erro ao imprimir: " + R.message });
        } finally {
          me(false);
        }
      }
    },
    po = async (P) => {
      if (Y === P) {
        de("");
        return;
      }
      (de(P), W(null));
      try {
        let R = await ye(
          "/historico_pedidos?select=pedido,produto,quantidade,localizacao,unidade_faturamento&lista=eq." +
            encodeURIComponent(P) +
            "&order=id.asc&limit=5000",
        );
        W(Array.isArray(R) ? R : []);
      } catch (R) {
        (W([]), D({ tipo: "erro", texto: "Erro ao carregar pedidos: " + R.message }));
      }
    },
    Ut = () => {
      if (!pe) return;
      let P = ee.trim();
      if (P.length < 5) {
        alert("Informe um motivo com pelo menos 5 caracteres.");
        return;
      }
      d("Quem está excluindo?", (R) => nt(R, P));
    },
    nt = async (P, R) => {
      Ne(true);
      try {
        let X = await Mb({ ...pe, motivo: R, usuario: P.nome, email: P.email });
        ($(null),
          se(""),
          de(""),
          await dt(""),
          D({
            tipo: X ? "warn" : "ok",
            texto: X || "Exclusão registrada com sucesso. O motivo ficou salvo na auditoria.",
          }));
      } catch (X) {
        alert("Não foi possível excluir: " + X.message);
      } finally {
        Ne(false);
      }
    },
    At = () => {
      let P = je.trim();
      if (!P) {
        ke({ tipo: "warn", texto: "Informe o número do pedido." });
        return;
      }
      d("Quem está lançando o pedido?", (R) => kt(R, P));
    },
    kt = async (P, R) => {
      (De(true), ke({ tipo: "info", texto: "Buscando todos os produtos e enviando ao estoque..." }));
      try {
        let X = await Hb({ pedido: R, usuario: P.nome, email: P.email });
        (ke({ tipo: X.tipo, texto: X.mensagem }), Ye(""));
      } catch (X) {
        ke({ tipo: "erro", texto: "Erro ao lançar: " + X.message });
      } finally {
        De(false);
      }
    },
    [It, Mt] = (0, o.useState)(""),
    [ht, xt] = (0, o.useState)(null),
    [Ft, eo] = (0, o.useState)(false),
    [Wo, N] = (0, o.useState)(""),
    [b, j] = (0, o.useState)(false),
    [Z, ae] = (0, o.useState)(null),
    K = (0, o.useMemo)(() => {
      let P = /* @__PURE__ */ new Set();
      return (
        String(It || "")
          .split(/[\s,;]+/)
          .map((R) => R.trim())
          .filter(Boolean)
          .forEach((R) => P.add(R)),
        [...P]
      );
    }, [It]),
    Ee = async () => {
      let P = K;
      if (!P.length) {
        ae({ tipo: "warn", texto: "Informe o número de pelo menos um pedido." });
        return;
      }
      if (P.length > 300) {
        ae({ tipo: "warn", texto: "Informe no máximo 300 pedidos por vez." });
        return;
      }
      (eo(true), ae(null), xt(null), N(""));
      try {
        let R = [];
        for (let X = 0; X < P.length; X += 5) {
          let le = await Promise.all(P.slice(X, X + 5).map((Le) => Wb(Le)));
          R.push(...le);
        }
        (xt({ itens: R }),
          R.some((X) => X.fila.length || X.noEstoque) ||
            ae({
              tipo: "warn",
              texto:
                (R.length === 1 ? "O pedido " + R[0].pedido + " não está" : "Nenhum dos pedidos informados está") +
                " na fila do estoque nem na tabela pedidos_estoque. Não há nada para excluir.",
            }));
      } catch (R) {
        ae({ tipo: "erro", texto: "Erro ao consultar: " + R.message });
      } finally {
        eo(false);
      }
    },
    he = async (P, R, X) => {
      j(true);
      let le = [],
        Le = [],
        Ue = [],
        to = 0;
      try {
        for (let bo of R)
          try {
            let Kt = await Ub({ pedido: bo, motivo: X, usuario: P.nome, email: P.email }),
              Yn = Number(Kt.linhas_fila) || 0,
              Ai = Number(Kt.pedidos_estoque) || 0;
            !Yn && !Ai ? Le.push(bo) : (le.push(bo), (to += Yn));
          } catch (Kt) {
            if ((Ue.push({ pedido: bo, erro: Kt.message }), /ainda não existe/.test(Kt.message))) break;
          }
        let Uo = [];
        if (
          (le.length &&
            Uo.push(
              le.length +
                " pedido(s) excluído(s) do estoque (" +
                to +
                " linha(s) da fila): " +
                le.join(", ") +
                ". Já podem ser lançados de novo.",
            ),
          Le.length && Uo.push("Já não estavam no estoque: " + Le.join(", ") + "."),
          Ue.length && Uo.push("Falharam: " + Ue.map((bo) => bo.pedido).join(", ") + " — " + Ue[0].erro),
          ae({ tipo: Ue.length ? (le.length ? "warn" : "erro") : le.length ? "ok" : "warn", texto: Uo.join(" ") }),
          Ue.length)
        ) {
          let bo = new Set(Ue.map((Kt) => Kt.pedido));
          (xt((Kt) => Kt && { itens: Kt.itens.filter((Yn) => bo.has(Yn.pedido)) }),
            Mt(
              [...bo].join(`
`),
            ));
        } else (xt(null), Mt(""), N(""));
      } finally {
        j(false);
      }
    },
    z = () => {
      if (!ht) return;
      let P = ht.itens.filter((X) => X.fila.length || X.noEstoque).map((X) => X.pedido);
      if (!P.length) return;
      let R = Wo.trim();
      if (R.length < 5) {
        alert("Informe um motivo com pelo menos 5 caracteres.");
        return;
      }
      d("Quem está excluindo " + (P.length > 1 ? "os " + P.length + " pedidos" : "o pedido") + " do estoque?", (X) =>
        he(X, P, R),
      );
    },
    U = (0, o.useMemo)(() => {
      let P = (ht && ht.itens) || [],
        R = P.filter((X) => X.fila.length || X.noEstoque);
      return {
        itens: P,
        comRegistro: R.length,
        semRegistro: P.length - R.length,
        linhas: P.reduce((X, le) => X + le.fila.length, 0),
        enviados: P.filter((X) => X.fila.some((le) => String(le.status).toUpperCase() === "ENVIADO")).map(
          (X) => X.pedido,
        ),
        pendentes: P.filter((X) =>
          X.fila.some((le) => ["PENDENTE", "PROCESSANDO"].includes(String(le.status).toUpperCase())),
        ).length,
      };
    }, [ht]),
    T = U.comRegistro > 0,
    J = [
      ["importar", "Importar CSV"],
      ["listas", "Listas geradas"],
      ["historico", "Histórico de listas"],
      ["poluido", "Picking Poluído"],
      ["exclusao", "Exclusão pedido estoque"],
      ["vialeitor", "Via Leitor"],
    ],
    ie = C ? k.registros[C] || [] : [],
    ve = n1(ie, Be);
  return o.default.createElement(
    "div",
    { style: { fontFamily: s.font } },
    o.default.createElement("style", null, Bi),
    o.default.createElement(Wt, {
      titulo: "Lista Faturamento",
      extraInfo: "Importar CSV, gerar e imprimir listas, histórico, Picking Poluído e Via Leitor",
    }),
    o.default.createElement(
      "div",
      {
        role: "tablist",
        style: { display: "flex", gap: 4, marginBottom: 20, flexWrap: "wrap", borderBottom: `1px solid ${s.bdMid}` },
      },
      J.map(([P, R]) => {
        let X = t === P;
        return o.default.createElement(
          "button",
          {
            key: P,
            type: "button",
            role: "tab",
            "aria-selected": X,
            className: "lf-tab",
            onClick: () => n(P),
            style: {
              padding: "10px 16px",
              marginBottom: -1,
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${X ? s.primary : "transparent"}`,
              color: X ? s.primary : s.txtSec,
              fontWeight: X ? 800 : 600,
              fontSize: 13.5,
              cursor: "pointer",
              fontFamily: s.font,
              display: "flex",
              alignItems: "center",
              gap: 8,
            },
          },
          R,
          P === "listas" &&
            k.listas.length > 0 &&
            o.default.createElement(
              "span",
              {
                style: {
                  background: s.primaryLight,
                  color: s.primary,
                  borderRadius: s.radius.pill,
                  padding: "1px 8px",
                  fontSize: 11.5,
                  fontWeight: 800,
                },
              },
              k.listas.length,
            ),
        );
      }),
    ),
    t === "importar" &&
      o.default.createElement(
        o.default.Fragment,
        null,
        o.default.createElement(
          ft,
          { titulo: "Importar CSV do Tableau", subtitulo: "Exportação do Tableau com as colunas de faturamento" },
          o.default.createElement("input", {
            ref: B,
            className: "lf-file",
            type: "file",
            accept: ".csv,.txt,.tsv",
            onChange: we,
          }),
          c && o.default.createElement($e, { tipo: c.tipo }, c.texto),
          !c && o.default.createElement($e, null, "Selecione o CSV exportado do Tableau para ver a prévia."),
        ),
        w && o.default.createElement($e, null, "Analisando o arquivo..."),
        f &&
          f.novosParaLista === 0 &&
          f.paraEstoque === 0 &&
          o.default.createElement(
            o.default.Fragment,
            null,
            o.default.createElement(
              $e,
              { tipo: "warn" },
              "Atenção: não há pedidos para geração de lista neste arquivo.",
              f.repetidos.length + f.bloqueadosEstoque > 0 &&
                ` (${f.repetidos.length} já estavam em listas · ${f.bloqueadosEstoque} já enviados ao estoque)`,
              f.agendadosFora.length > 0 &&
                ` ${f.agendadosFora.length} pedido(s) agendado(s) para outro dia ficaram de fora.`,
            ),
            f.aviso && o.default.createElement($e, { tipo: "warn" }, f.aviso),
          ),
        f &&
          (f.novosParaLista > 0 || f.paraEstoque > 0) &&
          o.default.createElement(
            ft,
            {
              titulo: "Prévia da geração",
              subtitulo: "Confira antes de gerar as listas",
              acoes: o.default.createElement(
                ge,
                { tipo: "primario", disabled: v || !u, onClick: Qe },
                v ? "Gerando..." : "Gerar listas automáticas",
              ),
            },
            o.default.createElement(
              Ea,
              null,
              o.default.createElement(Me, {
                rotulo: "Novos para lista",
                valor: f.novosParaLista,
                tipo: "ok",
                detalhe: "pedidos que entram nas listas",
              }),
              o.default.createElement(Me, {
                rotulo: "Para o estoque",
                valor: f.paraEstoque,
                tipo: "info",
                detalhe: `Caixa: ${f.caixa} · Picking Insuficiente: ${f.insuf}`,
              }),
              o.default.createElement(Me, {
                rotulo: "Já enviados ao estoque",
                valor: f.bloqueadosEstoque,
                tipo: f.bloqueadosEstoque ? "warn" : "neutro",
                detalhe: "bloqueados",
              }),
              o.default.createElement(Me, {
                rotulo: "Já gerados",
                valor: f.repetidos.length,
                tipo: f.repetidos.length ? "warn" : "neutro",
                detalhe: "bloqueados",
              }),
              o.default.createElement(Me, {
                rotulo: "Agendados (outro dia)",
                valor: f.agendadosFora.length,
                tipo: f.agendadosFora.length ? "info" : "neutro",
                detalhe: "ficam de fora até o dia",
              }),
              o.default.createElement(Me, {
                rotulo: "Linhas inválidas",
                valor: f.linhasInvalidas,
                tipo: f.linhasInvalidas ? "erro" : "neutro",
              }),
            ),
            f.aviso && o.default.createElement($e, { tipo: "warn" }, f.aviso),
            o.default.createElement(
              "div",
              { style: { marginTop: 14 } },
              o.default.createElement(
                ko,
                {
                  colunas: ["Filial", "Transportadora", "Pedidos novos", "Unidades"],
                  numericas: ["Pedidos novos", "Unidades"],
                },
                f.grupos.length
                  ? f.grupos.map((P, R) =>
                      o.default.createElement(
                        "tr",
                        { key: R },
                        o.default.createElement("td", { style: oe }, P.filial),
                        o.default.createElement("td", { style: oe }, P.transportadora),
                        o.default.createElement("td", { style: pt }, P.pedidos),
                        o.default.createElement("td", { style: pt }, P.unidades),
                      ),
                    )
                  : o.default.createElement(
                      "tr",
                      null,
                      o.default.createElement(
                        "td",
                        { style: oe, colSpan: 4 },
                        o.default.createElement(Zt, null, "Sem pedidos novos para lista."),
                      ),
                    ),
              ),
            ),
            f.agendadosFora.length > 0 &&
              o.default.createElement(
                "div",
                { style: { marginTop: 12 } },
                o.default.createElement(
                  $e,
                  { tipo: "info" },
                  "📅 ",
                  f.agendadosFora.length,
                  " pedido(s) agendado(s) para outro dia não entram nas listas agora: ",
                  f.agendadosFora
                    .slice(0, 40)
                    .map((P) => `${P.pedido} (${l1(P.dia)})`)
                    .join(", "),
                  f.agendadosFora.length > 40 ? "…" : "",
                ),
              ),
            f.repetidos.length > 0 &&
              o.default.createElement(
                "div",
                { style: { marginTop: 12 } },
                o.default.createElement(
                  $e,
                  { tipo: "warn" },
                  f.repetidos.length,
                  " pedido(s) já estavam em listas e não serão gerados de novo.",
                ),
                o.default.createElement(
                  "div",
                  { style: { marginTop: 8 } },
                  o.default.createElement(
                    ko,
                    { colunas: ["Pedido", "Lista", "Usuário", "Data"] },
                    f.repetidos
                      .slice(0, 200)
                      .map((P) =>
                        o.default.createElement(
                          "tr",
                          { key: P.pedido },
                          o.default.createElement("td", { style: oe }, P.pedido),
                          o.default.createElement("td", { style: oe }, P.lista),
                          o.default.createElement("td", { style: oe }, P.usuario),
                          o.default.createElement("td", { style: oe }, Vn(P.data_hora)),
                        ),
                      ),
                  ),
                ),
              ),
          ),
        h && o.default.createElement($e, { tipo: h.tipo }, h.texto),
      ),
    t === "listas" &&
      o.default.createElement(
        o.default.Fragment,
        null,
        h &&
          o.default.createElement(
            "div",
            { style: { marginBottom: 16, marginTop: -6 } },
            o.default.createElement($e, { tipo: h.tipo }, h.texto),
          ),
        k.listas.length > 0 &&
          o.default.createElement(
            Ea,
            null,
            o.default.createElement(Me, { rotulo: "Listas geradas", valor: k.listas.length, tipo: "info" }),
            o.default.createElement(Me, {
              rotulo: "Pedidos",
              valor: k.listas.reduce((P, R) => P + (Number(R.pedidos) || 0), 0),
              tipo: "neutro",
            }),
            o.default.createElement(Me, {
              rotulo: "Unidades",
              valor: k.listas.reduce((P, R) => P + (Number(R.unidades) || 0), 0),
              tipo: "neutro",
            }),
            o.default.createElement(Me, {
              rotulo: "Pendentes de impressão",
              valor: k.listas.filter((P) => String(P.impresso).toUpperCase() !== "SIM").length,
              tipo: k.listas.some((P) => String(P.impresso).toUpperCase() !== "SIM") ? "warn" : "ok",
            }),
          ),
        o.default.createElement(
          ft,
          {
            titulo: "Listas geradas para impressão",
            subtitulo: "Listas criadas nesta sessão",
            acoes: o.default.createElement(R0, { valor: Be, onChange: lt }),
          },
          k.listas.length === 0
            ? o.default.createElement(
                Zt,
                null,
                'Nenhuma lista gerada nesta sessão. Use "Histórico de listas" para listas de outros dias.',
              )
            : o.default.createElement(
                ko,
                {
                  colunas: ["Lista", "Filial", "Transportadora", "Pedidos", "Unidades", "Impresso", "Ações"],
                  numericas: ["Pedidos", "Unidades"],
                },
                k.listas.map((P) =>
                  o.default.createElement(
                    "tr",
                    { key: P.lista },
                    o.default.createElement("td", { style: { ...oe, fontWeight: 800 } }, P.lista),
                    o.default.createElement("td", { style: oe }, P.filial),
                    o.default.createElement("td", { style: oe }, P.transportadora),
                    o.default.createElement("td", { style: pt }, P.pedidos),
                    o.default.createElement("td", { style: pt }, P.unidades),
                    o.default.createElement(
                      "td",
                      { style: oe },
                      o.default.createElement(
                        qo,
                        { tipo: String(P.impresso).toUpperCase() === "SIM" ? "ok" : "neutro" },
                        String(P.impresso).toUpperCase() === "SIM" ? "Impresso" : "Pendente",
                      ),
                    ),
                    o.default.createElement(
                      "td",
                      { style: oe },
                      o.default.createElement(
                        "div",
                        { style: { display: "flex", gap: 6 } },
                        o.default.createElement(
                          ge,
                          { pequeno: true, onClick: () => _(C === P.lista ? "" : P.lista) },
                          C === P.lista ? "Fechar" : "Ver",
                        ),
                        o.default.createElement(
                          ge,
                          { pequeno: true, tipo: "verde", disabled: G, onClick: () => Pe(P.lista) },
                          "🖨 Imprimir",
                        ),
                      ),
                    ),
                  ),
                ),
              ),
        ),
        C &&
          o.default.createElement(
            ft,
            {
              titulo: `${C} — ${ie.length} linha(s)`,
              acoes: o.default.createElement(ge, { tipo: "verde", disabled: G, onClick: () => Pe(C) }, "🖨 Imprimir"),
            },
            o.default.createElement(
              ko,
              {
                colunas: [
                  "Ranking",
                  "C9 Produto",
                  "Qtd",
                  "Localização",
                  "C9 Pedido",
                  "Unidade",
                  "Tipo de faturamento",
                  "FILTRO V.1",
                ],
                numericas: ["Qtd"],
              },
              ve.map(({ reg: P, rank: R }, X) =>
                o.default.createElement(
                  "tr",
                  { key: X },
                  o.default.createElement("td", { style: oe }, R),
                  o.default.createElement("td", { style: oe }, P.produto),
                  o.default.createElement("td", { style: pt }, P.quantidade),
                  o.default.createElement("td", { style: oe }, yl(P.produto, P.localizacao) || "SEM ENDEREÇO"),
                  o.default.createElement("td", { style: oe }, P.pedido),
                  o.default.createElement("td", { style: oe }, P.unidade_faturamento),
                  o.default.createElement("td", { style: oe }, xl(P, ["Tipo de faturamento", "Tipo Faturamento"])),
                  o.default.createElement("td", { style: oe }, xl(P, ["FILTRO V.1", "FILTRO V1"])),
                ),
              ),
            ),
          ),
      ),
    t === "historico" &&
      o.default.createElement(
        ft,
        {
          titulo: "Histórico de listas",
          subtitulo: "Consulte, reimprima ou cancele listas já geradas",
          acoes: o.default.createElement(
            o.default.Fragment,
            null,
            o.default.createElement(R0, { valor: Be, onChange: lt }),
            o.default.createElement(ge, { onClick: () => dt(""), disabled: A }, "🔄 Atualizar"),
            o.default.createElement(
              ge,
              {
                onClick: () =>
                  Q(
                    new Set(
                      _e
                        .slice(0, re)
                        .filter((P) => String(P.status || "ATIVA").toUpperCase() !== "CANCELADA")
                        .map((P) => P.lista),
                    ),
                  ),
              },
              "☑ Selecionar visíveis",
            ),
            o.default.createElement(ge, { onClick: () => Q(/* @__PURE__ */ new Set()) }, "Limpar seleção"),
            o.default.createElement(
              ge,
              {
                tipo: "verde",
                disabled: !M.size || G,
                onClick: () => zt(_e.map((P) => P.lista).filter((P) => M.has(P))),
              },
              G ? "Preparando..." : `🖨 Imprimir selecionadas (${M.size})`,
            ),
          ),
        },
        o.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 4,
              padding: 12,
              background: s.bgStripe,
              border: `1px solid ${s.bdLight}`,
              borderRadius: s.radius.lg,
            },
          },
          o.default.createElement("input", {
            className: "lf-input",
            style: { ...Ke, width: 220 },
            placeholder: "🔍 Buscar lista (ex.: 240) e Enter",
            value: O.busca,
            onChange: (P) => H({ ...O, busca: P.target.value }),
            onKeyDown: (P) => {
              P.key === "Enter" && dt(O.busca.replace(/^lista\s*/i, "").trim());
            },
          }),
          o.default.createElement(
            "select",
            { className: "lf-input", style: Ke, value: O.filial, onChange: (P) => H({ ...O, filial: P.target.value }) },
            o.default.createElement("option", { value: "" }, "Filial: todas"),
            _c.map((P) => o.default.createElement("option", { key: P }, P)),
          ),
          o.default.createElement(
            "select",
            { className: "lf-input", style: Ke, value: O.transp, onChange: (P) => H({ ...O, transp: P.target.value }) },
            o.default.createElement("option", { value: "" }, "Transportadora: todas"),
            Tt.map((P) => o.default.createElement("option", { key: P }, P)),
          ),
          o.default.createElement(
            "select",
            {
              className: "lf-input",
              style: Ke,
              value: O.impresso,
              onChange: (P) => H({ ...O, impresso: P.target.value }),
            },
            o.default.createElement("option", { value: "" }, "Impresso: todos"),
            o.default.createElement("option", { value: "NÃO" }, "NÃO"),
            o.default.createElement("option", { value: "SIM" }, "SIM"),
          ),
          o.default.createElement(
            "select",
            { className: "lf-input", style: Ke, value: O.status, onChange: (P) => H({ ...O, status: P.target.value }) },
            o.default.createElement("option", { value: "" }, "Status: todos"),
            o.default.createElement("option", { value: "ATIVA" }, "ATIVA"),
            o.default.createElement("option", { value: "AJUSTADA" }, "AJUSTADA"),
            o.default.createElement("option", { value: "CANCELADA" }, "CANCELADA"),
          ),
        ),
        o.default.createElement(
          $e,
          null,
          "Marque as listas e clique em imprimir. Listas canceladas ficam só para consulta. Mostrando as listas mais recentes; para achar uma lista antiga, digite o número e aperte Enter.",
        ),
        V && o.default.createElement($e, { tipo: V.tipo }, V.texto),
        o.default.createElement(
          "div",
          { style: { marginTop: 12 } },
          A
            ? o.default.createElement($e, null, "Carregando histórico...")
            : o.default.createElement(
                ko,
                {
                  colunas: [
                    "",
                    "Lista",
                    "Data/Hora",
                    "Usuário",
                    "Filial",
                    "Transportadora",
                    "Pedidos",
                    "Unidades",
                    "Impresso",
                    "Status",
                    "Ações",
                  ],
                  numericas: ["Pedidos", "Unidades"],
                },
                _e.length === 0 &&
                  o.default.createElement(
                    "tr",
                    null,
                    o.default.createElement(
                      "td",
                      { style: oe, colSpan: 11 },
                      o.default.createElement(Zt, null, "Nenhuma lista encontrada."),
                    ),
                  ),
                _e.slice(0, re).map((P) => {
                  let R = String(P.status || "ATIVA").toUpperCase(),
                    X = R === "CANCELADA";
                  return o.default.createElement(
                    o.default.Fragment,
                    { key: P.lista },
                    o.default.createElement(
                      "tr",
                      { style: { background: X ? s.redBg : M.has(P.lista) ? s.primaryLight : "transparent" } },
                      o.default.createElement(
                        "td",
                        { style: oe },
                        !X &&
                          o.default.createElement("input", {
                            type: "checkbox",
                            checked: M.has(P.lista),
                            onChange: (le) => yt(P.lista, le.target.checked),
                          }),
                      ),
                      o.default.createElement("td", { style: { ...oe, fontWeight: 800 } }, P.lista),
                      o.default.createElement("td", { style: oe }, Vn(P.data_hora)),
                      o.default.createElement("td", { style: oe }, P.usuario),
                      o.default.createElement("td", { style: oe }, P.filial),
                      o.default.createElement("td", { style: oe }, P.transportadora),
                      o.default.createElement("td", { style: pt }, P.pedidos || 0),
                      o.default.createElement("td", { style: pt }, P.unidades || 0),
                      o.default.createElement(
                        "td",
                        { style: oe },
                        o.default.createElement(
                          qo,
                          { tipo: String(P.impresso || "NÃO").toUpperCase() === "SIM" ? "ok" : "neutro" },
                          String(P.impresso || "NÃO").toUpperCase() === "SIM" ? "Impresso" : "Pendente",
                        ),
                      ),
                      o.default.createElement(
                        "td",
                        { style: oe },
                        o.default.createElement(
                          qo,
                          { tipo: X ? "erro" : R === "AJUSTADA" ? "warn" : "info" },
                          R.charAt(0) + R.slice(1).toLowerCase(),
                        ),
                      ),
                      o.default.createElement(
                        "td",
                        { style: oe },
                        X
                          ? o.default.createElement(
                              ge,
                              {
                                pequeno: true,
                                title: "Ver motivo do cancelamento",
                                onClick: () => te(S === P.lista ? "" : P.lista),
                              },
                              S === P.lista ? "Fechar" : "Motivo",
                            )
                          : o.default.createElement(
                              "div",
                              { style: { display: "flex", gap: 6 } },
                              o.default.createElement(
                                ge,
                                { pequeno: true, title: "Ver pedidos da lista", onClick: () => po(P.lista) },
                                Y === P.lista ? "Fechar" : "Pedidos",
                              ),
                              o.default.createElement(
                                ge,
                                {
                                  pequeno: true,
                                  tipo: "verde",
                                  title: "Imprimir",
                                  disabled: G,
                                  onClick: () => zt([P.lista]),
                                },
                                "🖨",
                              ),
                              o.default.createElement(
                                ge,
                                {
                                  pequeno: true,
                                  tipo: "perigo",
                                  onClick: () => $({ tipo: "LISTA", lista: P.lista, pedido: "" }),
                                },
                                "Excluir",
                              ),
                            ),
                      ),
                    ),
                    X &&
                      S === P.lista &&
                      o.default.createElement(
                        "tr",
                        { style: { background: s.redBg } },
                        o.default.createElement(
                          "td",
                          { colSpan: 11, style: { ...oe, whiteSpace: "normal", padding: "12px 14px 14px 46px" } },
                          o.default.createElement(
                            "div",
                            { style: { display: "flex", gap: 28, flexWrap: "wrap", alignItems: "flex-start" } },
                            o.default.createElement(
                              "div",
                              null,
                              o.default.createElement(
                                "div",
                                {
                                  style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: s.txtMuted,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                  },
                                },
                                "Cancelada por",
                              ),
                              o.default.createElement(
                                "div",
                                { style: { fontWeight: 700, marginTop: 2 } },
                                P.ajustada_por || P.usuario || "não informado",
                              ),
                            ),
                            o.default.createElement(
                              "div",
                              null,
                              o.default.createElement(
                                "div",
                                {
                                  style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: s.txtMuted,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                  },
                                },
                                "Data e horário",
                              ),
                              o.default.createElement(
                                "div",
                                { style: { fontWeight: 700, marginTop: 2 } },
                                P.ajustada_em ? Vn(P.ajustada_em) : "não informado",
                              ),
                            ),
                            o.default.createElement(
                              "div",
                              { style: { flex: "1 1 260px", minWidth: 220 } },
                              o.default.createElement(
                                "div",
                                {
                                  style: {
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: s.txtMuted,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                  },
                                },
                                "Motivo",
                              ),
                              o.default.createElement(
                                "div",
                                { style: { fontWeight: 600, marginTop: 2, lineHeight: 1.5 } },
                                P.motivo_ajuste || "não informado",
                              ),
                            ),
                          ),
                        ),
                      ),
                    Y === P.lista &&
                      o.default.createElement(
                        "tr",
                        null,
                        o.default.createElement(
                          "td",
                          { colSpan: 11, style: { padding: 10, background: s.bgStripe } },
                          !ce || ce.length === 0
                            ? o.default.createElement(
                                "span",
                                { style: { fontSize: 12.5, color: s.txtMuted } },
                                ce ? "Esta lista não tem pedidos registrados." : "Carregando pedidos...",
                              )
                            : o.default.createElement(
                                ko,
                                {
                                  colunas: ["C9 Pedido", "C9 Produto", "Qtd", "Localização", "Unidade", ""],
                                  numericas: ["Qtd"],
                                },
                                ce.map((le, Le) => {
                                  let Ue =
                                    ce.findIndex((to) => String(to.pedido).trim() === String(le.pedido).trim()) === Le;
                                  return o.default.createElement(
                                    "tr",
                                    { key: Le },
                                    o.default.createElement("td", { style: oe }, le.pedido),
                                    o.default.createElement("td", { style: oe }, le.produto),
                                    o.default.createElement("td", { style: pt }, le.quantidade),
                                    o.default.createElement(
                                      "td",
                                      { style: oe },
                                      yl(le.produto, le.localizacao) || "SEM ENDEREÇO",
                                    ),
                                    o.default.createElement("td", { style: oe }, le.unidade_faturamento),
                                    o.default.createElement(
                                      "td",
                                      { style: oe },
                                      Ue &&
                                        !X &&
                                        o.default.createElement(
                                          ge,
                                          {
                                            pequeno: true,
                                            tipo: "perigo",
                                            onClick: () =>
                                              $({ tipo: "PEDIDO", lista: P.lista, pedido: String(le.pedido).trim() }),
                                          },
                                          "Excluir pedido",
                                        ),
                                    ),
                                  );
                                }),
                              ),
                        ),
                      ),
                  );
                }),
              ),
          _e.length > re &&
            o.default.createElement(
              "div",
              { style: { marginTop: 10 } },
              o.default.createElement(
                ge,
                { onClick: () => be((P) => P + 150) },
                "Mostrar mais (",
                _e.length - re,
                " restantes)",
              ),
            ),
        ),
      ),
    t === "vialeitor" && o.default.createElement(h1, { ativo: e && t === "vialeitor" }),
    t === "poluido" &&
      o.default.createElement(
        ft,
        {
          titulo: "Lançar Picking Poluído",
          subtitulo: "Envia o pedido inteiro para a planilha do estoque (aba Lançamentos)",
        },
        o.default.createElement(
          $e,
          null,
          "Digite o número do pedido e clique em Lançar pedido. Todos os produtos serão enviados para a planilha do estoque (aba Lançamentos). O mesmo pedido não pode ser lançado mais de uma vez.",
        ),
        o.default.createElement(
          "div",
          { style: { display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap", alignItems: "center" } },
          o.default.createElement("input", {
            className: "lf-input",
            style: { ...Ke, width: 240, height: 38 },
            inputMode: "numeric",
            autoComplete: "off",
            placeholder: "Ex.: 577120",
            value: je,
            onChange: (P) => Ye(P.target.value),
            onKeyDown: (P) => {
              P.key === "Enter" && At();
            },
          }),
          o.default.createElement(
            ge,
            { tipo: "verde", disabled: Se, onClick: At },
            Se ? "Lançando..." : "📦 Lançar pedido",
          ),
          o.default.createElement(
            ge,
            {
              onClick: () => {
                (Ye(""), ke(null));
              },
            },
            "Limpar",
          ),
        ),
        xe && o.default.createElement($e, { tipo: xe.tipo }, xe.texto),
      ),
    t === "exclusao" &&
      o.default.createElement(
        ft,
        {
          titulo: "Exclusão pedido estoque",
          subtitulo:
            "Tira um ou vários pedidos da fila e da tabela de bloqueio do estoque para poderem ser lançados de novo",
        },
        o.default.createElement(
          $e,
          null,
          "Cole um ou vários números de pedido (um por linha, ou separados por espaço, vírgula ou ponto e vírgula) e clique em Consultar. O sistema mostra onde cada pedido está preso. Ao confirmar, eles são apagados da fila do estoque (fila_lancamentos) e da tabela pedidos_estoque, e a exclusão fica registrada com o motivo e o nome de quem fez.",
        ),
        o.default.createElement(
          "div",
          { style: { display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap", alignItems: "flex-start" } },
          o.default.createElement("textarea", {
            className: "lf-input",
            style: { ...Ke, width: 300, height: 90, padding: 10, boxSizing: "border-box", resize: "vertical" },
            autoComplete: "off",
            placeholder: `Ex.:
577120
577121
577122`,
            value: It,
            onChange: (P) => {
              (Mt(P.target.value), xt(null), ae(null));
            },
          }),
          o.default.createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 8 } },
            o.default.createElement(
              ge,
              { tipo: "primario", disabled: Ft, onClick: Ee },
              Ft ? "Consultando..." : "🔎 Consultar",
            ),
            o.default.createElement(
              ge,
              {
                onClick: () => {
                  (Mt(""), xt(null), N(""), ae(null));
                },
              },
              "Limpar",
            ),
            o.default.createElement(
              "span",
              { style: { fontSize: 12, color: s.textoSuave || "#64748b" } },
              K.length,
              " pedido(s) informado(s)",
            ),
          ),
        ),
        Z && o.default.createElement($e, { tipo: Z.tipo }, Z.texto),
        ht &&
          T &&
          o.default.createElement(
            "div",
            { style: { marginTop: 16 } },
            o.default.createElement(
              Ea,
              null,
              o.default.createElement(Me, { rotulo: "Pedidos consultados", valor: U.itens.length, tipo: "info" }),
              o.default.createElement(Me, {
                rotulo: "Com o que excluir",
                valor: U.comRegistro,
                tipo: U.comRegistro ? "warn" : "neutro",
              }),
              o.default.createElement(Me, {
                rotulo: "Sem registro",
                valor: U.semRegistro,
                tipo: "neutro",
                detalhe: "nada a excluir",
              }),
              o.default.createElement(Me, {
                rotulo: "Linhas na fila",
                valor: U.linhas,
                tipo: "neutro",
                detalhe: "bloqueia o Picking Poluído",
              }),
            ),
            o.default.createElement(
              ko,
              { colunas: ["Pedido", "Fila do estoque", "Em pedidos_estoque", "Situação"], compacta: true },
              U.itens.map((P) => {
                let R = /* @__PURE__ */ new Map();
                P.fila.forEach((le) => {
                  let Le = String(le.motivo || "—") + " · " + String(le.status || "—").toUpperCase();
                  R.set(Le, (R.get(Le) || 0) + 1);
                });
                let X = P.fila.length > 0 || P.noEstoque;
                return o.default.createElement(
                  "tr",
                  { key: P.pedido },
                  o.default.createElement("td", { style: oe }, o.default.createElement("b", null, P.pedido)),
                  o.default.createElement(
                    "td",
                    { style: oe },
                    R.size
                      ? [...R.entries()].map(([le, Le]) =>
                          o.default.createElement(
                            "div",
                            { key: le },
                            le,
                            " ",
                            o.default.createElement(
                              "span",
                              { style: { opacity: 0.7 } },
                              "(",
                              Le,
                              " linha",
                              Le > 1 ? "s" : "",
                              ")",
                            ),
                          ),
                        )
                      : "—",
                  ),
                  o.default.createElement("td", { style: oe }, P.noEstoque ? "Sim" : "Não"),
                  o.default.createElement(
                    "td",
                    { style: oe },
                    o.default.createElement(
                      qo,
                      { tipo: X ? "warn" : "neutro" },
                      X ? "Será excluído" : "Nada a excluir",
                    ),
                  ),
                );
              }),
            ),
            U.enviados.length > 0 &&
              o.default.createElement(
                $e,
                { tipo: "warn" },
                "Já foram gravados na aba Lançamentos da planilha do estoque: ",
                U.enviados.join(", "),
                ". A exclusão NÃO apaga as linhas da planilha: apague as linhas desses pedidos lá antes de lançar de novo, senão ficam duplicados.",
              ),
            U.pendentes > 0 &&
              o.default.createElement(
                $e,
                { tipo: "info" },
                U.pendentes,
                " pedido(s) têm linhas ainda não enviadas à planilha (Pendente/Processando). Excluir cancela o envio delas.",
              ),
            o.default.createElement("textarea", {
              className: "lf-input",
              value: Wo,
              onChange: (P) => N(P.target.value),
              maxLength: 500,
              placeholder:
                "Explique por que precisa excluir (mínimo 5 caracteres). O mesmo motivo vale para todos os pedidos acima...",
              style: {
                ...Ke,
                width: "100%",
                height: 80,
                padding: 10,
                boxSizing: "border-box",
                resize: "vertical",
                marginTop: 12,
              },
            }),
            o.default.createElement(
              "div",
              { style: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 10 } },
              o.default.createElement(
                ge,
                { tipo: "perigo", disabled: b, onClick: z },
                b ? "Excluindo..." : "Excluir do estoque (" + U.comRegistro + ")",
              ),
            ),
          ),
      ),
    a &&
      o.default.createElement(
        "div",
        {
          style: {
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.55)",
            backdropFilter: "blur(2px)",
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          onClick: () => r(null),
        },
        o.default.createElement(
          "div",
          {
            onClick: (P) => P.stopPropagation(),
            style: {
              background: s.bgCard,
              borderRadius: s.radius.xl,
              padding: 24,
              width: 460,
              maxWidth: "92vw",
              boxShadow: s.shadowXl,
              border: `1px solid ${s.bdMid}`,
            },
          },
          o.default.createElement(
            "div",
            { style: { fontSize: 16, fontWeight: 800, color: s.txtPri, marginBottom: 4 } },
            a.titulo,
          ),
          o.default.createElement(
            "div",
            { style: { fontSize: 12.5, color: s.txtMuted, marginBottom: 14 } },
            "Escolha o seu nome para continuar.",
          ),
          o.default.createElement(
            "div",
            { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } },
            Sb.map((P) =>
              o.default.createElement(
                ge,
                {
                  key: P.nome,
                  onClick: () => {
                    let R = a.aoEscolher;
                    (r(null), R(P));
                  },
                },
                P.nome,
              ),
            ),
          ),
          o.default.createElement(
            "div",
            { style: { marginTop: 14, paddingTop: 12, borderTop: `1px solid ${s.bdLight}` } },
            o.default.createElement(
              "div",
              { style: { fontSize: 12.5, color: s.txtSec, fontWeight: 700, marginBottom: 6 } },
              "Não está na lista? Informe outro nome:",
            ),
            o.default.createElement(
              "div",
              { style: { display: "flex", gap: 8 } },
              o.default.createElement("input", {
                className: "lf-input",
                style: { ...Ke, flex: 1 },
                placeholder: "Nome e sobrenome",
                maxLength: 60,
                value: i,
                onChange: (P) => l(P.target.value),
                onKeyDown: (P) => {
                  if (P.key === "Enter" && i.trim().length >= 2) {
                    let R = a.aoEscolher;
                    (r(null), R({ nome: i.trim().replace(/\s+/g, " "), email: "" }));
                  }
                },
              }),
              o.default.createElement(
                ge,
                {
                  tipo: "primario",
                  disabled: i.trim().length < 2,
                  onClick: () => {
                    let P = a.aoEscolher;
                    (r(null), P({ nome: i.trim().replace(/\s+/g, " "), email: "" }));
                  },
                },
                "Continuar",
              ),
            ),
          ),
          o.default.createElement(
            "div",
            { style: { display: "flex", justifyContent: "flex-end", marginTop: 12 } },
            o.default.createElement(ge, { pequeno: true, onClick: () => r(null) }, "Cancelar"),
          ),
        ),
      ),
    pe &&
      o.default.createElement(
        "div",
        {
          style: {
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.55)",
            backdropFilter: "blur(2px)",
            zIndex: 1e3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        },
        o.default.createElement(
          "div",
          {
            style: {
              background: s.bgCard,
              borderRadius: s.radius.xl,
              padding: 24,
              width: 480,
              maxWidth: "92vw",
              boxShadow: s.shadowXl,
              border: `1px solid ${s.bdMid}`,
            },
          },
          o.default.createElement(
            "div",
            { style: { fontSize: 16, fontWeight: 800, color: s.txtPri, marginBottom: 8 } },
            pe.tipo === "LISTA" ? "Excluir lista" : "Excluir pedido da lista",
          ),
          o.default.createElement(
            "div",
            { style: { fontSize: 13, color: s.txtSec, marginBottom: 10, lineHeight: 1.5 } },
            pe.tipo === "LISTA"
              ? `A lista ${pe.lista} será cancelada. Os pedidos dela poderão ser gerados novamente.`
              : `O pedido ${pe.pedido} será removido somente da lista ${pe.lista}.`,
          ),
          o.default.createElement("textarea", {
            className: "lf-input",
            value: ee,
            onChange: (P) => se(P.target.value),
            maxLength: 500,
            placeholder: "Explique por que precisa ser removido (mínimo 5 caracteres)...",
            style: { ...Ke, width: "100%", height: 90, padding: 10, boxSizing: "border-box", resize: "vertical" },
          }),
          o.default.createElement(
            "div",
            { style: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 } },
            o.default.createElement(
              ge,
              {
                onClick: () => {
                  ($(null), se(""));
                },
              },
              "Cancelar",
            ),
            o.default.createElement(
              ge,
              { tipo: "perigo", disabled: Ae, onClick: Ut },
              Ae ? "Excluindo..." : "Confirmar exclusão",
            ),
          ),
        ),
      ),
    (0, gg.createPortal)(
      o.default.createElement(
        "div",
        { className: "lf-print-root" },
        Ce.map((P) =>
          o.default.createElement(Vb, {
            key: P.lista,
            lista: P.lista,
            info: P.info,
            registros: P.registros,
            ordem: Be,
          }),
        ),
      ),
      document.body,
    ),
  );
}
var Sc = 15,
  ha = Sc * 6e4,
  ct = 60 * 6e4,
  ll = (e) => (e > ct ? s.red : e > ha ? s.amber : s.txtPri),
  jn = (e) => (e.geradaEm && e.inicio ? Math.max(0, e.inicio - e.geradaEm) : null),
  Ec = [
    "Camile Macedo",
    "Thayna Silva",
    "Pietro Fayh",
    "Jorge William",
    "Tamiris Pereira",
    "Amanda Carvalho",
    "Theo Aristimunho",
    "Eduarda",
    "Lorenzo Braga",
  ],
  el = ["var(--accent)", "var(--green)", "var(--blue)", "var(--amber)", "var(--purple)", "var(--red)"],
  Ca = (e) => String(e).padStart(2, "0");
function en(e) {
  let t = Math.max(0, Math.floor(Number(e || 0) / 1e3));
  return `${Ca(Math.floor(t / 3600))}:${Ca(Math.floor((t % 3600) / 60))}:${Ca(t % 60)}`;
}
function Hn(e) {
  let t = Math.max(0, Math.floor(Number(e || 0) / 1e3));
  return t >= 3600 ? en(e) : `${Ca(Math.floor(t / 60))}:${Ca(t % 60)}`;
}
function Tc(e) {
  let t = Math.round(Number(e || 0) / 6e4);
  return t >= 60 ? `${Math.floor(t / 60)}h${Ca(t % 60)}` : `${t}min`;
}
var m2 = (e) => new Date(e).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
  Zo = (e) => (e ? `${dl(e)} ${m2(e)}` : "—"),
  Wn = (e) => (e == null || e === "" ? "—" : e),
  tl = (e) => new Date(e).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
  dl = (e) => new Date(e).toLocaleDateString("pt-BR"),
  Oo = (e) => {
    let t = new Date(e);
    return (t.setHours(0, 0, 0, 0), t.getTime());
  },
  Rt = (e) =>
    String(e ?? "")
      .trim()
      .toLocaleLowerCase("pt-BR"),
  Ro = (e, t, n) => (e === 1 ? t : n),
  ig = (e) =>
    String(e || "")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((t) => t.charAt(0).toUpperCase())
      .join("") || "?";
function ul(e) {
  let t = e.inicio ? new Date(e.inicio).getTime() : 0,
    n = e.fim ? new Date(e.fim).getTime() : null;
  return {
    id: String(e.id),
    lista: String(e.lista),
    separador: String(e.separador || ""),
    inicio: t,
    fim: n,
    duracao: e.duracao_ms != null ? Number(e.duracao_ms) : n && t ? n - t : null,
    status: e.status || (n ? "finalizada" : "em_separacao"),
    oculto: !!e.oculto,
    filial: e.filial || "",
    transportadora: e.transportadora || "",
    pedidos: e.pedidos,
    unidades: e.unidades,
    geradaEm: e.gerada_em ? new Date(e.gerada_em).getTime() : null,
  };
}
async function Xn(e) {
  let t = [];
  for (let n = 0; n < 2e4; n += 1e3) {
    let a = await ye(`${e}${e.includes("?") ? "&" : "?"}limit=1000&offset=${n}`);
    if (!Array.isArray(a) || (t.push(...a), a.length < 1e3)) break;
  }
  return t;
}
function sg({ inicio: e }) {
  let [t, n] = (0, o.useState)(Date.now());
  (0, o.useEffect)(() => {
    let r = setInterval(() => n(Date.now()), 1e3);
    return () => clearInterval(r);
  }, []);
  let a = Math.max(0, t - e);
  return o.default.createElement(
    "span",
    { style: { fontVariantNumeric: "tabular-nums", fontWeight: 800, fontSize: 15, color: ll(a) } },
    en(a),
  );
}
function g2({ desde: e }) {
  let [t, n] = (0, o.useState)(Date.now());
  (0, o.useEffect)(() => {
    let r = setInterval(() => n(Date.now()), 1e3);
    return () => clearInterval(r);
  }, []);
  let a = Math.max(0, t - e);
  return o.default.createElement(
    "span",
    { style: { fontVariantNumeric: "tabular-nums", fontWeight: 800, color: a > ct ? s.red : s.txtPri } },
    en(a),
    a > ct &&
      o.default.createElement("span", { style: { marginLeft: 6, fontSize: 11, fontWeight: 800, color: s.red } }, "+1h"),
  );
}
function rc({ r: e }) {
  let t = jn(e);
  return o.default.createElement(
    o.default.Fragment,
    null,
    Zo(e.geradaEm),
    t != null &&
      o.default.createElement(
        "div",
        { style: { fontSize: 11.5, fontWeight: 700, color: t > ct ? s.red : s.txtMuted } },
        "espera ",
        Hn(t),
        t > ct ? " · acima de 1h" : "",
      ),
  );
}
function h2({ abas: e, aba: t, setAba: n, contagens: a = {} }) {
  return o.default.createElement(
    "div",
    {
      role: "tablist",
      style: { display: "flex", gap: 4, marginBottom: 20, flexWrap: "wrap", borderBottom: `1px solid ${s.bdMid}` },
    },
    e.map(([r, i]) => {
      let l = t === r;
      return o.default.createElement(
        "button",
        {
          key: r,
          type: "button",
          role: "tab",
          "aria-selected": l,
          className: "lf-tab",
          onClick: () => n(r),
          style: {
            padding: "10px 16px",
            marginBottom: -1,
            background: "transparent",
            border: "none",
            borderBottom: `2px solid ${l ? s.primary : "transparent"}`,
            color: l ? s.primary : s.txtSec,
            fontWeight: l ? 800 : 600,
            fontSize: 13.5,
            cursor: "pointer",
            fontFamily: s.font,
            display: "flex",
            alignItems: "center",
            gap: 8,
          },
        },
        i,
        a[r] > 0 &&
          o.default.createElement(
            "span",
            {
              style: {
                background: s.primaryLight,
                color: s.primary,
                borderRadius: s.radius.pill,
                padding: "1px 8px",
                fontSize: 11.5,
                fontWeight: 800,
              },
            },
            a[r],
          ),
      );
    }),
  );
}
function v2({ rotulo: e, children: t }) {
  return o.default.createElement(
    "label",
    { style: { display: "block", fontFamily: s.font } },
    o.default.createElement(
      "div",
      { style: { fontSize: 11.5, fontWeight: 700, color: s.txtMuted, marginBottom: 5 } },
      e,
    ),
    t,
  );
}
var cl = "1020",
  ba = "bb_lista_usuario",
  v1 = "https://mntlzdlilnvebvqinxzi.supabase.co",
  mi = "sb_publishable_LIRfujLgg_PkuUlKGtyeNw_IHCCqEN-";
async function y2() {
  let e = [];
  for (let t = 0; t < 2e4; t += 1e3) {
    let n = await fetch(
      `${v1}/rest/v1/v_bb_localizacao?select=produto,localizacao,saldo_fd,atualizado_em&order=produto.asc&limit=1000&offset=${t}`,
      { headers: mi.startsWith("eyJ") ? { apikey: mi, Authorization: `Bearer ${mi}` } : { apikey: mi } },
    );
    if (!n.ok) throw new Error("Estoque " + n.status);
    let a = await n.json();
    if (!Array.isArray(a)) throw new Error("Resposta inesperada do estoque");
    if ((e.push(...a), a.length < 1e3)) break;
  }
  return e;
}
var yn = ["Mayza Gomes", "Tamires Pereira", "Gregory Rutkoski", "Thayna Evangelista"],
  Cc =
    "https://script.google.com/macros/s/AKfycbzR6yTnxd2JS3ZenY9Ze8HPokguS_1yla7bVRxt8qeLlRP2RzE9iOR5ezZfYfVSTQrZRQ/exec",
  b2 = "BB-COMPRA-1020-2026";
function xa(e) {
  let t = w2(e);
  return t.startsWith("pendente") || t === "solicitado"
    ? { texto: "Aguardando compra", bg: "#f9ab00", fg: "#000" }
    : t.startsWith("comprado") || t.startsWith("encontrada")
      ? { texto: "Comprado · aguardando chegada", bg: "#8ab4f8", fg: "#000" }
      : t.startsWith("chegou")
        ? { texto: "Chegou", bg: "#34a853", fg: "#fff" }
        : { texto: String(e).trim() || "Solicitado", bg: "#e8eaed", fg: "#111" };
}
var ic = {
    display: "inline-block",
    fontFamily: s.font,
    fontSize: 11,
    fontWeight: 800,
    padding: "3px 9px",
    borderRadius: 12,
    lineHeight: 1.25,
    textAlign: "center",
    maxWidth: 150,
  },
  x2 = 24,
  lg = {
    fontFamily: s.font,
    fontSize: 11,
    fontWeight: 800,
    padding: "2px 8px",
    borderRadius: 999,
    lineHeight: 1.25,
    whiteSpace: "nowrap",
  },
  wt = (e, t) => String(e).trim() + "|" + jo(t);
async function pl(e, t) {
  if (!Cc) throw new Error("A solicitação de compra ainda não foi configurada (falta a URL do Apps Script).");
  let n = new URLSearchParams({ acao: e, segredo: b2 }),
    a = e === "solicitar_lote" || e === "ajuste_saldo_lote";
  t && !a && n.set("data", JSON.stringify(t));
  let r = new AbortController(),
    i = setTimeout(() => r.abort(), a ? 7e4 : 4e4);
  try {
    let d = await (
      await fetch(
        Cc + "?" + n.toString(),
        a
          ? {
              method: "POST",
              redirect: "follow",
              signal: r.signal,
              headers: { "Content-Type": "text/plain;charset=utf-8" },
              body: JSON.stringify(t || {}),
            }
          : { redirect: "follow", signal: r.signal },
      )
    ).text();
    try {
      return JSON.parse(d);
    } catch {
      throw new Error(
        "A planilha não respondeu como esperado. Confira a publicação do Apps Script (acesso: qualquer pessoa).",
      );
    }
  } catch (l) {
    throw l && l.name === "AbortError"
      ? new Error("Demorou demais para responder. Confira na planilha antes de tentar de novo.")
      : l;
  } finally {
    clearTimeout(i);
  }
}
function B2({ itens: e, pessoas: t, usuario: n, onEnviar: a, onFechar: r }) {
  let [i, l] = (0, o.useState)(() => e.map((v) => ({ ...v, q: String(v.qtd || 1) }))),
    [d, u] = (0, o.useState)(n || ""),
    [p, c] = (0, o.useState)(!!n && !t.includes(n));
  (0, o.useEffect)(() => {
    let v = (m) => m.key === "Escape" && r();
    return (window.addEventListener("keydown", v), () => window.removeEventListener("keydown", v));
  }, [r]);
  let g = (v) => Number(v) >= 1 && Number.isInteger(Number(v)),
    f = i.length > 0 && i.every((v) => g(v.q)) && d.trim().length > 0,
    x = {
      fontFamily: s.font,
      fontSize: 14,
      padding: "8px 10px",
      borderRadius: s.radius.md,
      border: `1px solid ${s.bdMid}`,
      background: s.bgCard,
      color: s.txtPri,
      width: "100%",
      boxSizing: "border-box",
    },
    w = {
      textAlign: "left",
      fontSize: 12,
      fontWeight: 800,
      color: s.txtMuted,
      padding: "6px 8px",
      borderBottom: `1px solid ${s.bdLight}`,
    },
    F = { padding: "6px 8px", fontSize: 13, borderBottom: `1px solid ${s.bdLight}` };
  return o.default.createElement(
    "div",
    {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(2px)",
        zIndex: 1100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      onClick: r,
    },
    o.default.createElement(
      "div",
      {
        onClick: (v) => v.stopPropagation(),
        style: {
          background: s.bgCard,
          borderRadius: s.radius.xl,
          padding: 22,
          width: 620,
          maxWidth: "94vw",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: s.shadowXl,
          border: `1px solid ${s.bdMid}`,
          fontFamily: s.font,
          color: s.txtPri,
        },
      },
      o.default.createElement(
        "div",
        { style: { fontSize: 17, fontWeight: 800 } },
        "Solicitar compra (",
        i.length,
        " ",
        i.length === 1 ? "produto" : "produtos",
        ")",
      ),
      o.default.createElement(
        "div",
        { style: { fontSize: 13, color: s.txtMuted, margin: "4px 0 12px" } },
        "Ajuste a quantidade de cada um, se precisar, e envie todos de uma vez para a planilha.",
      ),
      o.default.createElement(
        "div",
        { style: { overflow: "auto", border: `1px solid ${s.bdLight}`, borderRadius: s.radius.lg, minHeight: 60 } },
        o.default.createElement(
          "table",
          { style: { width: "100%", borderCollapse: "collapse" } },
          o.default.createElement(
            "thead",
            null,
            o.default.createElement(
              "tr",
              null,
              o.default.createElement("th", { style: w }, "Pedido"),
              o.default.createElement("th", { style: w }, "Produto"),
              o.default.createElement("th", { style: { ...w, width: 90 } }, "Quantidade"),
              o.default.createElement("th", { style: { ...w, width: 36 } }),
            ),
          ),
          o.default.createElement(
            "tbody",
            null,
            i.map((v, m) =>
              o.default.createElement(
                "tr",
                { key: v.pedido + "|" + v.produto },
                o.default.createElement("td", { style: { ...F, fontWeight: 800 } }, v.pedido),
                o.default.createElement("td", { style: F }, v.produto),
                o.default.createElement(
                  "td",
                  { style: F },
                  o.default.createElement("input", {
                    type: "number",
                    min: 1,
                    step: 1,
                    "aria-label": `Quantidade de ${v.produto}`,
                    value: v.q,
                    onChange: (h) => l((y) => y.map((B, k) => (k === m ? { ...B, q: h.target.value } : B))),
                    style: { ...x, padding: "5px 8px", width: 76, borderColor: g(v.q) ? s.bdMid : "#d93025" },
                  }),
                ),
                o.default.createElement(
                  "td",
                  { style: F },
                  o.default.createElement(
                    "button",
                    {
                      type: "button",
                      title: "Tirar da solicitação",
                      "aria-label": `Tirar ${v.produto}`,
                      onClick: () => l((h) => h.filter((y, B) => B !== m)),
                      style: {
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: 16,
                        color: s.txtMuted,
                      },
                    },
                    "✕",
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
      o.default.createElement(
        "label",
        { style: { fontSize: 12, fontWeight: 700, color: s.txtMuted, marginTop: 12 } },
        "Solicitante",
      ),
      o.default.createElement(
        "select",
        {
          style: { ...x, margin: "4px 0 8px" },
          value: p ? "__outro" : d,
          onChange: (v) => {
            v.target.value === "__outro" ? (c(true), u("")) : (c(false), u(v.target.value));
          },
        },
        o.default.createElement("option", { value: "" }, "Escolha..."),
        t.map((v) => o.default.createElement("option", { key: v, value: v }, v)),
        o.default.createElement("option", { value: "__outro" }, "Outro..."),
      ),
      p &&
        o.default.createElement("input", {
          style: { ...x, marginBottom: 8 },
          placeholder: "Digite o nome",
          value: d,
          onChange: (v) => u(v.target.value),
        }),
      o.default.createElement(
        "div",
        { style: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 10 } },
        o.default.createElement(ge, { onClick: r }, "Cancelar"),
        o.default.createElement(
          ge,
          {
            tipo: "primario",
            disabled: !f,
            onClick: () =>
              a({
                solicitante: d.trim(),
                itens: i.map((v) => ({
                  pedido: v.pedido,
                  produto: v.produto,
                  qtd: Number(v.q),
                  transporte: v.transporte,
                  lib: v.lib,
                  lim: v.lim,
                })),
              }),
          },
          "🛒 Enviar ",
          i.length,
          " para a planilha",
        ),
      ),
    ),
  );
}
function S2({ itens: e, pessoas: t, usuario: n, onEnviar: a, onFechar: r }) {
  let [i, l] = (0, o.useState)(() => e.map((y) => ({ produto: y.produto, lote: "", fis: "", inv: "", ti: false }))),
    [d, u] = (0, o.useState)(n || ""),
    [p, c] = (0, o.useState)(!!n && !t.includes(n));
  (0, o.useEffect)(() => {
    let y = (B) => B.key === "Escape" && r();
    return (window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y));
  }, [r]);
  let g = (y) => String(y).trim() !== "" && Number.isInteger(Number(y)) && Number(y) >= 0,
    f = (y) => g(y.inv) && (y.ti || g(y.fis)),
    x = i.length > 0 && i.every(f) && d.trim().length > 0,
    w = (y, B) => l((k) => k.map((L, C) => (C === y ? { ...L, ...B } : L))),
    F = {
      fontFamily: s.font,
      fontSize: 14,
      padding: "8px 10px",
      borderRadius: s.radius.md,
      border: `1px solid ${s.bdMid}`,
      background: s.bgCard,
      color: s.txtPri,
      width: "100%",
      boxSizing: "border-box",
    },
    v = {
      textAlign: "left",
      fontSize: 12,
      fontWeight: 800,
      color: s.txtMuted,
      padding: "6px 8px",
      borderBottom: `1px solid ${s.bdLight}`,
    },
    m = { padding: "6px 8px", fontSize: 13, borderBottom: `1px solid ${s.bdLight}`, verticalAlign: "top" },
    h = { ...F, padding: "5px 8px" };
  return o.default.createElement(
    "div",
    {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(2px)",
        zIndex: 1100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      onClick: r,
    },
    o.default.createElement(
      "div",
      {
        onClick: (y) => y.stopPropagation(),
        style: {
          background: s.bgCard,
          borderRadius: s.radius.xl,
          padding: 22,
          width: 760,
          maxWidth: "96vw",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: s.shadowXl,
          border: `1px solid ${s.bdLight}`,
          color: s.txtPri,
          fontFamily: s.font,
        },
      },
      o.default.createElement(
        "div",
        { style: { fontSize: 17, fontWeight: 800 } },
        "Ajuste de saldo (",
        i.length,
        " ",
        i.length === 1 ? "produto" : "produtos",
        ")",
      ),
      o.default.createElement(
        "div",
        { style: { fontSize: 13, color: s.txtMuted, margin: "4px 0 12px" } },
        "Informe o saldo físico e o saldo do inventário de cada produto. O ajuste e o status a planilha calcula.",
      ),
      o.default.createElement(
        "div",
        { style: { overflow: "auto", border: `1px solid ${s.bdLight}`, borderRadius: s.radius.lg, minHeight: 60 } },
        o.default.createElement(
          "table",
          { style: { width: "100%", borderCollapse: "collapse" } },
          o.default.createElement(
            "thead",
            null,
            o.default.createElement(
              "tr",
              null,
              o.default.createElement("th", { style: v }, "Produto"),
              o.default.createElement("th", { style: { ...v, width: 100 } }, "Lote"),
              o.default.createElement("th", { style: { ...v, width: 150 } }, "Saldo físico"),
              o.default.createElement("th", { style: { ...v, width: 100 } }, "Inventário"),
              o.default.createElement("th", { style: { ...v, width: 70 } }, "Ajuste"),
              o.default.createElement("th", { style: { ...v, width: 36 } }),
            ),
          ),
          o.default.createElement(
            "tbody",
            null,
            i.map((y, B) => {
              let k = !y.ti && g(y.fis) && g(y.inv) ? Number(y.fis) - Number(y.inv) : null;
              return o.default.createElement(
                "tr",
                { key: y.produto },
                o.default.createElement("td", { style: { ...m, fontWeight: 800 } }, y.produto),
                o.default.createElement(
                  "td",
                  { style: m },
                  o.default.createElement("input", {
                    "aria-label": `Lote de ${y.produto}`,
                    placeholder: "Opcional",
                    value: y.lote,
                    onChange: (L) => w(B, { lote: L.target.value }),
                    style: h,
                  }),
                ),
                o.default.createElement(
                  "td",
                  { style: m },
                  o.default.createElement("input", {
                    type: "number",
                    min: 0,
                    step: 1,
                    "aria-label": `Saldo físico de ${y.produto}`,
                    disabled: y.ti,
                    placeholder: y.ti ? "GABRIEL PEGOU" : "0",
                    value: y.ti ? "" : y.fis,
                    onChange: (L) => w(B, { fis: L.target.value }),
                    style: {
                      ...h,
                      opacity: y.ti ? 0.5 : 1,
                      borderColor: y.ti || g(y.fis) || y.fis === "" ? s.bdMid : "#d93025",
                    },
                  }),
                  o.default.createElement(
                    "label",
                    {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        marginTop: 5,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                      },
                    },
                    o.default.createElement("input", {
                      type: "checkbox",
                      "aria-label": `Uso T.I / Gabriel de ${y.produto}`,
                      checked: y.ti,
                      onChange: (L) => w(B, { ti: L.target.checked }),
                      style: { width: 15, height: 15, accentColor: "#1a73e8", cursor: "pointer" },
                    }),
                    "Uso T.I / Gabriel",
                  ),
                ),
                o.default.createElement(
                  "td",
                  { style: m },
                  o.default.createElement("input", {
                    type: "number",
                    min: 0,
                    step: 1,
                    "aria-label": `Saldo do inventário de ${y.produto}`,
                    placeholder: "0",
                    value: y.inv,
                    onChange: (L) => w(B, { inv: L.target.value }),
                    style: { ...h, borderColor: g(y.inv) || y.inv === "" ? s.bdMid : "#d93025" },
                  }),
                ),
                o.default.createElement(
                  "td",
                  {
                    style: { ...m, fontWeight: 800, color: k == null || k === 0 ? s.txtPri : k < 0 ? s.red : s.green },
                  },
                  k == null ? "—" : k > 0 ? `+${k}` : k,
                ),
                o.default.createElement(
                  "td",
                  { style: m },
                  o.default.createElement(
                    "button",
                    {
                      type: "button",
                      title: "Tirar do ajuste",
                      "aria-label": `Tirar ${y.produto}`,
                      onClick: () => l((L) => L.filter((C, _) => _ !== B)),
                      style: {
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: 16,
                        color: s.txtMuted,
                      },
                    },
                    "✕",
                  ),
                ),
              );
            }),
          ),
        ),
      ),
      o.default.createElement(
        "label",
        { style: { fontSize: 12, fontWeight: 700, color: s.txtMuted, marginTop: 12 } },
        "Solicitante",
      ),
      o.default.createElement(
        "select",
        {
          style: { ...F, margin: "4px 0 8px" },
          value: p ? "__outro" : d,
          onChange: (y) => {
            y.target.value === "__outro" ? (c(true), u("")) : (c(false), u(y.target.value));
          },
        },
        o.default.createElement("option", { value: "" }, "Escolha..."),
        t.map((y) => o.default.createElement("option", { key: y, value: y }, y)),
        o.default.createElement("option", { value: "__outro" }, "Outro..."),
      ),
      p &&
        o.default.createElement("input", {
          style: { ...F, marginBottom: 8 },
          placeholder: "Digite o nome",
          value: d,
          onChange: (y) => u(y.target.value),
        }),
      o.default.createElement(
        "div",
        { style: { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 10 } },
        o.default.createElement(ge, { onClick: r }, "Cancelar"),
        o.default.createElement(
          ge,
          {
            tipo: "primario",
            disabled: !x,
            onClick: () =>
              a({
                solicitante: d.trim(),
                itens: i.map((y) => ({
                  produto: y.produto,
                  lote: y.lote.trim(),
                  fisico: y.ti ? "" : Number(y.fis),
                  inventario: Number(y.inv),
                  tiGabriel: y.ti,
                })),
              }),
          },
          "⚖\ufe0f Enviar ",
          i.length,
          " para a planilha",
        ),
      ),
    ),
  );
}
var Ba = (e) => "BB-" + String(e).padStart(4, "0"),
  hn = (e) => String(e ?? "").replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]),
  wc = (e) => {
    if (!e) return "";
    let t = new Date(e);
    return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
  },
  fl = (e) => {
    if (!e) return "";
    let t = new Date(e);
    return Number.isNaN(t.getTime())
      ? ""
      : t.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour12: false });
  },
  Un = (e) => (e == null || e === "" ? "-" : String(Number(e)).replace(".", ",")),
  jo = (e) =>
    String(e ?? "")
      .trim()
      .toUpperCase(),
  E2 = 2;
function C2(e) {
  let t = String(e ?? "").trim();
  if (!t) return [];
  let n;
  return (
    /\(\s*\d/.test(t)
      ? (n = [...t.matchAll(/([^\s;|·,]+)\s*\(([^)]*)\)/g)].map((a) => ({
          txt: `${a[1]} (${a[2].trim()})`,
          q: Number(String(a[2]).replace(",", ".")),
        })))
      : (n = t
          .split(/\s*(?:;|\||·|,)\s*/)
          .filter(Boolean)
          .map((a) => ({ txt: a, q: NaN }))),
    n.every((a) => !Number.isNaN(a.q)) &&
      (n = n.map((a, r) => ({ ...a, i: r })).sort((a, r) => r.q - a.q || a.i - r.i)),
    n.map((a) => a.txt)
  );
}
function zc(e, t = E2) {
  let n = C2(e);
  return {
    txt: n.slice(0, t).join(" · ") + (n.length > t ? ` +${n.length - t}` : ""),
    completo: n.join(" · "),
    extra: Math.max(0, n.length - t),
  };
}
var dg = "bb_ordem_impressao";
function y1(e, t) {
  let n = (a, r) => String(a).localeCompare(String(r), "pt-BR", { numeric: true });
  return [...e].sort((a, r) =>
    t === "localizacao"
      ? n(a.localizacao || "￿", r.localizacao || "￿") || n(a.produto, r.produto) || n(a.pedido, r.pedido)
      : n(a.produto, r.produto) || n(a.pedido, r.pedido),
  );
}
var w2 = (e) =>
  String(e ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
function b1(e) {
  let t = Array.isArray(e.itens) ? e.itens.filter((a) => a && a.produto) : [];
  if (t.length) return t.map((a) => ({ produto: String(a.produto).trim(), qtd: Number(a.qtd) || 0 }));
  let n = String(e.produtos || "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  return n.length === 1
    ? [{ produto: n[0], qtd: Number(e.qtd_total) || 0 }]
    : [{ produto: String(e.produtos || "").trim() || "(sem produto)", qtd: Number(e.qtd_total) || 0 }];
}
function ug(e, t = {}, n = "produto") {
  let a = [];
  return (
    e.forEach((r) => {
      let i = { pedido: String(r.pedido), transporte: r.transportadora || "", lib_estoque: r.lib_estoque || null };
      b1(r).forEach((l) => {
        let d = t[jo(l.produto)];
        a.push({
          ...i,
          produto: l.produto,
          qtd: l.qtd,
          estoque_fd: d && d.saldo_fd != null ? Number(d.saldo_fd) : null,
          localizacao: zc(d && d.localizacao).txt || null,
        });
      });
    }),
    y1(a, n)
  );
}
var A2 = (e) => {
  if (e == null || String(e).trim() === "") return null;
  let t = String(e).trim();
  t.includes(",") && (t = t.replace(/\./g, "").replace(",", "."));
  let n = Number(t);
  return Number.isNaN(n) ? null : n;
};
function k2(e) {
  let t = ["produto", "sku", "codigo", "codigoproduto", "modelo", "item"],
    n = ["localizacao", "endereco", "enderecamento", "local", "loc", "posicao"],
    a = ["estfd01", "estoquefd01", "estoquefd", "saldofd01", "saldofd", "saldo", "estoque", "qtd", "quantidade"];
  for (let r = 0; r < Math.min(e.length, 25); r++) {
    let i = (e[r] || []).map(g1),
      l = (c) => {
        for (let g of c) {
          let f = i.indexOf(g);
          if (f >= 0) return f;
        }
        return -1;
      },
      d = l(t),
      u = l(n),
      p = l(a);
    if (d >= 0 && (u >= 0 || p >= 0)) return { linha: r, iProd: d, iLoc: u, iSal: p };
  }
  return null;
}
function cg(e, t, n = "produto", a = {}) {
  let r = a.folha !== "paisagem",
    i = a.situacao || (() => ""),
    l = t.some((w) => i(w)),
    d = (w) => {
      let F = wc(w);
      return F ? `${F.slice(0, 5)} <span class="h">${hn(fl(w).slice(0, 5))}</span>` : "—";
    },
    p = y1(t, n)
      .map((w, F) => {
        let v = String(w.localizacao || "").trim(),
          m = i(w);
        return (
          `<tr${m ? ' class="ag"' : ""}><td class="n">${F + 1}</td><td class="ok"><span class="box"></span></td><td class="ped">${hn(w.pedido)}</td><td class="prod">${hn(w.produto)}</td><td class="q">${Un(w.qtd)}</td><td class="loc">${v ? hn(v) : '<span class="nd">—</span>'}</td><td class="c">${Un(w.estoque_fd) === "-" ? '<span class="nd">—</span>' : Un(w.estoque_fd)}</td><td>${hn(w.transporte || "")}</td><td class="c">${d(w.lib_estoque)}</td>` +
          (l ? `<td class="c sit">${m ? hn(m.toUpperCase()) : ""}</td>` : "") +
          "</tr>"
        );
      })
      .join(""),
    c = new Date(e.criada_em || Date.now()),
    g = (Number.isNaN(c.getTime()) ? /* @__PURE__ */ new Date() : c).toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      dateStyle: "short",
      timeStyle: "short",
    }),
    f =
      `<!doctype html><html><head><meta charset="utf-8"><title>Lista ${Ba(e.id)}</title><style>@page{size:A4 ${r ? "portrait" : "landscape"};margin:${r ? "10mm 8mm 12mm" : "10mm 10mm 12mm"}}*{box-sizing:border-box;font-family:"Segoe UI",Roboto,Arial,Helvetica,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}body{margin:0;color:#111;font-size:12px}.topo{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid #1f3a5f;padding-bottom:8px;margin-bottom:8px}.marca{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#1f3a5f}h1{font-size:24px;margin:2px 0 0;letter-spacing:-.01em}.ger{text-align:right;font-size:11px;color:#444;line-height:1.5}.ger b{color:#111;font-size:12px}.resumo{display:flex;flex-wrap:wrap;gap:0 22px;margin:0 0 8px;font-size:11px;color:#444}.resumo span{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#666;margin-right:5px}.resumo b{font-size:12px;color:#111}table{width:100%;border-collapse:collapse}thead{display:table-header-group}tr{break-inside:avoid}th{background:#eef1f5;color:#1f3a5f;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;text-align:left;padding:${r ? "5px 4px" : "7px 8px"};border-top:1px solid #1f3a5f;border-bottom:2px solid #1f3a5f}td{padding:${r ? "5px 4px" : "7px 8px"};border-bottom:1px solid #d5d9e0;vertical-align:middle;white-space:nowrap;font-size:${r ? "10px" : "12px"}}tbody tr:nth-child(even) td{background:#f8f9fb}th.c,td.c,th.q,td.q,th.n,td.n,th.ok,td.ok{text-align:center}td.n{color:#777;font-size:${r ? "9px" : "10.5px"};width:${r ? "18px" : "26px"}}td.ped{font-weight:700;font-size:${r ? "11px" : "13px"};font-variant-numeric:tabular-nums}td.prod{font-weight:700;font-size:${r ? "10.5px" : "13px"}}td.loc{font-weight:800;font-size:${r ? "10px" : "13px"}}td.q{font-weight:800;font-size:${r ? "13px" : "15px"}}.nd{color:#999;font-weight:400}.h{color:#666}td.sit{font-size:${r ? "9px" : "10px"};font-weight:800}tr.ag td{background:#e9e9e9!important}td.ok{width:${r ? "34px" : "44px"}}.box{display:inline-block;width:${r ? "14px" : "16px"};height:${r ? "14px" : "16px"};border:1.5px solid #333;border-radius:3px;background:#fff}</style></head><body><div class="topo"><div><div class="marca">BBBaterias · Filial ${hn(cl)}</div><h1>Lista de Separação ${Ba(e.id)}</h1></div><div class="ger">Gerada em <b>${hn(g)}</b><br>Responsável: <b>${hn(e.usuario || "—")}</b></div></div><div class="resumo"><div><span>Pedidos</span><b>${e.pedidos}</b></div><div><span>Itens</span><b>${e.itens}</b></div><div><span>Unidades</span><b>${Un(e.unidades)}</b></div><div><span>Ordem</span><b>${n === "localizacao" ? "Por localização" : "Por produto"}</b></div>` +
      (a.semAguardando ? "<div><span>Filtro</span><b>Sem itens aguardando chegada</b></div>" : "") +
      `</div><table><thead><tr><th class="n">#</th><th class="ok">Catado</th><th>Pedido</th><th>Produto</th><th class="q">Qtd</th><th>Localização</th><th class="c">Saldo<br>FD-01</th><th>Transporte</th><th class="c">Liberação</th>${l ? '<th class="c">Situação</th>' : ""}</tr></thead><tbody>${p}</tbody></table></body></html>`,
    x = document.createElement("iframe");
  ((x.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0"),
    document.body.appendChild(x),
    x.contentDocument.open(),
    x.contentDocument.write(f),
    x.contentDocument.close(),
    setTimeout(() => {
      try {
        (x.contentWindow.focus(), x.contentWindow.print());
      } finally {
        setTimeout(() => x.remove(), 6e4);
      }
    }, 300));
}
var pg = "reenvio_usuario";
function F2({ ativo: e, somenteLeitura: t }) {
  let [n, a] = (0, o.useState)(""),
    [r, i] = (0, o.useState)(""),
    [l, d] = (0, o.useState)(""),
    [u, p] = (0, o.useState)(""),
    [c, g] = (0, o.useState)(""),
    [f, x] = (0, o.useState)(""),
    [w, F] = (0, o.useState)(() => {
      try {
        return localStorage.getItem(pg) || "";
      } catch {
        return "";
      }
    }),
    [v, m] = (0, o.useState)(false),
    [h, y] = (0, o.useState)(null),
    [B, k] = (0, o.useState)([]),
    [L, C] = (0, o.useState)(false),
    [_, q] = (0, o.useState)(""),
    [E, A] = (0, o.useState)(""),
    [I, V] = (0, o.useState)(""),
    D = (0, o.useRef)(null),
    [O, H] = (0, o.useState)([]),
    [M, Q] = (0, o.useState)(false),
    [Y, de] = (0, o.useState)(""),
    ce = (0, o.useRef)(false),
    W = (0, o.useRef)(0),
    [S, te] = (0, o.useState)(""),
    [re, be] = (0, o.useState)("");
  ((0, o.useEffect)(() => {
    e &&
      Dt("v_cancelamento_solicitantes_fixos?select=nome&order=nome")
        .then((G) => H(Array.isArray(G) ? G.map((me) => me.nome).filter(Boolean) : []))
        .catch(() => H([]));
  }, [e]),
    (0, o.useEffect)(() => {
      let G = r.trim(),
        me = l.trim();
      if (!e || (!G && !me)) {
        (de(""), te(""), be(""), (ce.current = false));
        return;
      }
      let je = ++W.current,
        Ye = setTimeout(async () => {
          try {
            let Se = null;
            try {
              Se = await Yo("cancelamento_analisar", { p_nf: G, p_pedido: me });
            } catch {
              Se = null;
            }
            if (je !== W.current) return;
            let De = Se && Se.filial ? String(Se.filial) : "",
              xe = Se && Se.pedido ? String(Se.pedido) : "",
              ke = Se && Se.nf ? String(Se.nf) : "",
              we = Se && Se.cliente ? String(Se.cliente) : "";
            if (!we || !De)
              try {
                let Xe = G.replace(/^0+(?=\d)/, ""),
                  ue = [.../* @__PURE__ */ new Set([G, Xe, Xe.padStart(9, "0")])].filter(Boolean),
                  Pe = G ? `nf=in.(${ue.map(encodeURIComponent).join(",")})` : `pedido=eq.${encodeURIComponent(me)}`,
                  dt = await Dt(`v_postagens_painel?select=filial,nf,pedido,cliente_nome&${Pe}&limit=20`);
                if (je !== W.current) return;
                let Tt = (Array.isArray(dt) ? dt : []).filter(
                    (yt) => !me || !yt.pedido || String(yt.pedido) === me || !G,
                  ),
                  _e =
                    Tt.find((yt) => yt.cliente_nome && (!De || String(yt.filial) === De)) ||
                    Tt.find((yt) => yt.cliente_nome) ||
                    Tt[0];
                _e &&
                  (!we && _e.cliente_nome && (we = String(_e.cliente_nome)),
                  !De && _e.filial && (De = String(_e.filial)),
                  !xe && _e.pedido && (xe = String(_e.pedido)),
                  !ke && _e.nf && (ke = String(_e.nf)));
              } catch {}
            if (je !== W.current) return;
            (te(we), be(De));
            let Qe = [];
            (De && hi.includes(De) && !ce.current && (a(De), Qe.push(`filial ${De}`)),
              !me && xe && (d(xe), Qe.push(`pedido ${xe}`)),
              !G && ke && (i(ke.replace(/^0+(?=\d)/, "")), Qe.push("NF")),
              we && Qe.push("cliente"),
              de(Qe.length ? "Preenchido pela expedição: " + Qe.join(", ") + "." : ""));
          } catch {
            je === W.current && de("");
          }
        }, 450);
      return () => clearTimeout(Ye);
    }, [e, r, l]));
  let pe = (0, o.useCallback)(async () => {
    (C(true), q(""));
    try {
      let G = await ye("/reenvios_log?select=*&order=id.desc&limit=500");
      k(Array.isArray(G) ? G : []);
    } catch (G) {
      let me = String(G.message || G);
      q(
        /PGRST205|does not exist|Could not find/i.test(me)
          ? "A tabela de reenvios ainda não existe no Supabase. Rode o SQL criar_reenvios.sql."
          : "Erro ao carregar: " + me.slice(0, 180),
      );
    } finally {
      C(false);
    }
  }, []);
  (0, o.useEffect)(() => {
    e && pe();
  }, [e, pe]);
  let $ = (0, o.useMemo)(() => [...new Set(B.map((G) => G.incluido_por).filter(Boolean))].slice(0, 30), [B]),
    ee = n && re === n && S ? S : "",
    se = n && r.trim() && l.trim() && (u.trim() || c.trim()) && w.trim(),
    Ae = (G) => {
      let me = new Date(G);
      return Number.isNaN(me.getTime())
        ? "—"
        : me.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" });
    },
    Ne = async () => {
      if (!se || v) return;
      let G = {
          filial: n,
          nf: r.trim(),
          pedido: l.trim(),
          transporte: u.trim() || null,
          rastreio: c.trim() || null,
          ticket: f.replace(/^[#\s]+/, "").trim() ? "#" + f.replace(/^[#\s]+/, "").trim() : null,
          cliente: ee || null,
          incluido_por: w.trim(),
        },
        me = B.find(
          (je) =>
            je.filial === G.filial &&
            String(je.nf).trim().toUpperCase() === G.nf.toUpperCase() &&
            String(je.pedido).trim() === G.pedido,
        );
      if (!(
        me &&
        !window.confirm(
          `Esse reenvio (filial ${me.filial}, NF ${me.nf}, pedido ${me.pedido}) já foi registrado em ${Ae(me.criado_em)} por ${me.incluido_por}. Registrar de novo?`,
        )
      )) {
        (m(true), y(null));
        try {
          try {
            localStorage.setItem(pg, G.incluido_por);
          } catch {}
          let je = (De) =>
              ye("/reenvios_log", {
                method: "POST",
                body: JSON.stringify(De),
                headers: { Prefer: "return=representation", "Content-Type": "application/json" },
              }),
            Ye;
          try {
            Ye = await je(G);
          } catch (De) {
            if (/cliente/i.test(String(De.message || De)) && /PGRST204|column/i.test(String(De.message || De))) {
              let { cliente: xe, ...ke } = G;
              Ye = await je(ke);
            } else throw De;
          }
          let Se = Array.isArray(Ye) ? Ye[0] : null;
          (y({
            tipo: "ok",
            texto: `Reenvio registrado: NF ${G.nf} · pedido ${G.pedido}${Se ? " · " + Ae(Se.criado_em) : ""}.`,
          }),
            Se ? k((De) => [Se, ...De]) : pe(),
            i(""),
            d(""),
            p(""),
            g(""),
            x(""),
            te(""),
            be(""),
            de(""),
            (ce.current = false),
            D.current && D.current.focus());
        } catch (je) {
          let Ye = String(je.message || je);
          y({
            tipo: "erro",
            texto: /PGRST205|does not exist|Could not find/i.test(Ye)
              ? "A tabela de reenvios ainda não existe no Supabase. Rode o SQL criar_reenvios.sql."
              : "Não foi possível registrar: " + Ye.slice(0, 200),
          });
        } finally {
          m(false);
        }
      }
    },
    Ce = async (G) => {
      if (
        window.confirm(
          `Excluir o reenvio da NF ${G.nf} (pedido ${G.pedido}), registrado em ${Ae(G.criado_em)} por ${G.incluido_por}?`,
        )
      )
        try {
          (await ye("/reenvios_log?id=eq." + G.id, {
            method: "DELETE",
            headers: { Prefer: "return=representation" },
          }).then((me) => {
            if (Array.isArray(me) && me.length === 0)
              throw new Error("Nada foi excluído (sem permissão). Rode de novo o SQL criar_reenvios.sql.");
          }),
            k((me) => me.filter((je) => je.id !== G.id)),
            y({ tipo: "ok", texto: `Reenvio da NF ${G.nf} excluído.` }));
        } catch (me) {
          y({ tipo: "erro", texto: "Não foi possível excluir: " + String(me.message || me).slice(0, 200) });
        }
    },
    Ie = (0, o.useMemo)(() => {
      let G = Rt(E);
      return B.filter((me) => !I || me.filial === I)
        .filter(
          (me) =>
            !G ||
            Rt(
              `${me.nf} ${me.pedido} ${me.cliente || ""} ${me.transporte || ""} ${me.rastreio || ""} ${me.ticket || ""} ${me.incluido_por} ${me.filial}`,
            ).includes(G),
        )
        .slice(0, 200);
    }, [B, E, I]),
    Be = {
      fontFamily: s.font,
      fontSize: 14,
      padding: "8px 10px",
      borderRadius: s.radius.md,
      border: `1px solid ${s.bdMid}`,
      background: s.bgCard,
      color: s.txtPri,
      width: "100%",
      boxSizing: "border-box",
    },
    Ve = { fontSize: 12, fontWeight: 700, color: s.txtMuted, marginBottom: 4, display: "block" },
    lt = (G) => {
      G.key === "Enter" && Ne();
    };
  return o.default.createElement(
    "div",
    { style: { padding: 20, fontFamily: s.font, color: s.txtPri } },
    !t &&
      o.default.createElement(
        o.default.Fragment,
        null,
        o.default.createElement(
          ft,
          {
            titulo: "Reenvio",
            subtitulo:
              "Registre os pedidos reenviados. A data e a hora ficam marcadas automaticamente no momento em que você salvar.",
          },
          h && o.default.createElement($e, { tipo: h.tipo }, h.texto),
          o.default.createElement(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                gap: 14,
                alignItems: "start",
              },
            },
            o.default.createElement(
              "div",
              null,
              o.default.createElement("label", { style: Ve, htmlFor: "rv-filial" }, "Filial"),
              o.default.createElement(
                "select",
                {
                  id: "rv-filial",
                  style: Be,
                  value: n,
                  onChange: (G) => {
                    ((ce.current = true), a(G.target.value));
                  },
                },
                o.default.createElement("option", { value: "" }, "-"),
                hi.map((G) => o.default.createElement("option", { key: G, value: G }, G)),
              ),
            ),
            o.default.createElement(
              "div",
              null,
              o.default.createElement("label", { style: Ve, htmlFor: "rv-nf" }, "NF"),
              o.default.createElement("input", {
                id: "rv-nf",
                ref: D,
                style: Be,
                placeholder: "Número da nota",
                value: r,
                onChange: (G) => i(G.target.value),
                onKeyDown: lt,
              }),
            ),
            o.default.createElement(
              "div",
              null,
              o.default.createElement("label", { style: Ve, htmlFor: "rv-pedido" }, "Pedido"),
              o.default.createElement("input", {
                id: "rv-pedido",
                style: Be,
                placeholder: "Número do pedido",
                value: l,
                onChange: (G) => d(G.target.value),
                onKeyDown: lt,
              }),
            ),
            o.default.createElement(
              "div",
              null,
              o.default.createElement("label", { style: Ve, htmlFor: "rv-cliente" }, "Cliente"),
              o.default.createElement("input", {
                id: "rv-cliente",
                readOnly: true,
                tabIndex: -1,
                title: "Preenchido automático pela expedição ao digitar a NF ou o pedido. Sem nome encontrado fica -",
                style: { ...Be, background: s.bgStripe, fontWeight: 700, cursor: "default" },
                value: ee || "-",
              }),
            ),
            o.default.createElement(
              "div",
              null,
              o.default.createElement("label", { style: Ve, htmlFor: "rv-transp" }, "Transporte"),
              o.default.createElement("input", {
                id: "rv-transp",
                style: Be,
                placeholder: "Ex.: LOGGI, SEDEX",
                value: u,
                onChange: (G) => p(G.target.value),
                onKeyDown: lt,
              }),
            ),
            o.default.createElement(
              "div",
              null,
              o.default.createElement("label", { style: Ve, htmlFor: "rv-rastreio" }, "Rastreio"),
              o.default.createElement("input", {
                id: "rv-rastreio",
                style: Be,
                placeholder: "Código de rastreio",
                value: c,
                onChange: (G) => g(G.target.value),
                onKeyDown: lt,
              }),
            ),
            o.default.createElement(
              "div",
              null,
              o.default.createElement(
                "label",
                { style: Ve, htmlFor: "rv-ticket" },
                "Ticket ",
                o.default.createElement("span", { style: { fontWeight: 400 } }, "(opcional)"),
              ),
              o.default.createElement("input", {
                id: "rv-ticket",
                style: Be,
                placeholder: "Ex.: 65556 (salva como #65556)",
                value: f,
                onChange: (G) => x(G.target.value),
                onKeyDown: lt,
              }),
            ),
            o.default.createElement(
              "div",
              null,
              o.default.createElement("label", { style: Ve, htmlFor: "rv-nome" }, "Quem está incluindo"),
              O.length > 0 && !M && (!w || O.includes(w))
                ? o.default.createElement(
                    "select",
                    {
                      id: "rv-nome",
                      style: Be,
                      value: w,
                      onChange: (G) => {
                        G.target.value === "__outro" ? (Q(true), F("")) : F(G.target.value);
                      },
                    },
                    o.default.createElement("option", { value: "" }, "Selecione..."),
                    O.map((G) => o.default.createElement("option", { key: G, value: G }, G)),
                    o.default.createElement("option", { value: "__outro" }, "Outro (digitar)…"),
                  )
                : o.default.createElement(
                    o.default.Fragment,
                    null,
                    o.default.createElement("input", {
                      id: "rv-nome",
                      list: "rv-nomes",
                      style: Be,
                      placeholder: "Seu nome",
                      value: w,
                      onChange: (G) => F(G.target.value),
                      onKeyDown: lt,
                    }),
                    o.default.createElement(
                      "datalist",
                      { id: "rv-nomes" },
                      $.map((G) => o.default.createElement("option", { key: G, value: G })),
                    ),
                    O.length > 0 &&
                      o.default.createElement(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            (Q(false), F(""));
                          },
                          style: {
                            border: "none",
                            background: "transparent",
                            color: s.blue,
                            cursor: "pointer",
                            fontSize: 12,
                            fontWeight: 700,
                            padding: "4px 0",
                          },
                        },
                        "↩ usar a lista",
                      ),
                  ),
            ),
          ),
          o.default.createElement(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 14,
                gap: 12,
                flexWrap: "wrap",
              },
            },
            o.default.createElement(
              "span",
              { style: { fontSize: 12, color: Y ? s.green : s.txtMuted, fontWeight: Y ? 700 : 400 } },
              Y || "Informe o transporte ou o rastreio (pelo menos um).",
            ),
            o.default.createElement(
              ge,
              { tipo: "primario", disabled: !se || v, onClick: Ne },
              v ? "Salvando..." : "Registrar reenvio",
            ),
          ),
        ),
        o.default.createElement("div", { style: { height: 14 } }),
      ),
    o.default.createElement(
      ft,
      {
        titulo: "Reenvios registrados",
        subtitulo: `${B.length} no histórico · mostrando os mais novos primeiro${t ? " · somente consulta" : ""}`,
        acoes: o.default.createElement(
          o.default.Fragment,
          null,
          o.default.createElement(
            "select",
            {
              className: "lf-input",
              style: Ke,
              value: I,
              onChange: (G) => V(G.target.value),
              "aria-label": "Filtrar por filial",
            },
            o.default.createElement("option", { value: "" }, "Filial: todas"),
            hi.map((G) => o.default.createElement("option", { key: G, value: G }, G)),
          ),
          o.default.createElement("input", {
            className: "lf-input",
            style: { ...Ke, width: 240 },
            placeholder: "Buscar NF, pedido, cliente, rastreio, ticket...",
            value: E,
            onChange: (G) => A(G.target.value),
          }),
          o.default.createElement(ge, { onClick: pe, disabled: L }, L ? "Atualizando..." : "Atualizar"),
        ),
        semPadding: true,
      },
      _ && o.default.createElement($e, { tipo: "erro" }, _),
      o.default.createElement(
        "div",
        { style: { overflow: "auto", maxHeight: "55vh" } },
        o.default.createElement(
          "table",
          { style: { width: "100%", borderCollapse: "collapse" } },
          o.default.createElement(
            "thead",
            null,
            o.default.createElement(
              "tr",
              null,
              ["Data / hora", "Filial", "NF", "Pedido", "Cliente", "Transporte", "Rastreio", "Ticket", "Incluído por"]
                .concat(t ? [] : [""])
                .map((G) => o.default.createElement("th", { key: G, style: Bl }, G)),
            ),
          ),
          o.default.createElement(
            "tbody",
            null,
            Ie.map((G) =>
              o.default.createElement(
                "tr",
                { key: G.id },
                o.default.createElement("td", { style: oe }, Ae(G.criado_em)),
                o.default.createElement("td", { style: oe }, G.filial),
                o.default.createElement("td", { style: { ...oe, fontWeight: 800 } }, G.nf),
                o.default.createElement("td", { style: { ...oe, fontWeight: 800 } }, G.pedido),
                o.default.createElement("td", { style: oe }, G.cliente || "-"),
                o.default.createElement("td", { style: oe }, G.transporte || "—"),
                o.default.createElement("td", { style: oe }, G.rastreio || "—"),
                o.default.createElement("td", { style: oe }, G.ticket || "—"),
                o.default.createElement("td", { style: oe }, G.incluido_por),
                !t &&
                  o.default.createElement(
                    "td",
                    { style: { ...oe, textAlign: "right" } },
                    o.default.createElement(
                      "button",
                      {
                        type: "button",
                        onClick: () => Ce(G),
                        title: "Excluir este registro",
                        style: {
                          fontFamily: s.font,
                          fontSize: 12,
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: 6,
                          border: `1px solid ${s.redBd}`,
                          background: s.redBg,
                          color: s.red,
                          cursor: "pointer",
                        },
                      },
                      "Excluir",
                    ),
                  ),
              ),
            ),
            !Ie.length &&
              !L &&
              o.default.createElement(
                "tr",
                null,
                o.default.createElement(
                  "td",
                  { style: { ...oe, textAlign: "center", color: s.txtMuted }, colSpan: t ? 9 : 10 },
                  B.length ? "Nenhum reenvio encontrado neste filtro." : "Nenhum reenvio registrado ainda.",
                ),
              ),
          ),
        ),
      ),
    ),
  );
}
function P2({ ativo: e }) {
  let [t, n] = (0, o.useState)(() => {
      try {
        return localStorage.getItem(ba) || "";
      } catch {
        return "";
      }
    }),
    [a, r] = (0, o.useState)(() => {
      try {
        let S = localStorage.getItem(ba) || "";
        return !!S && !yn.includes(S);
      } catch {
        return false;
      }
    }),
    [i, l] = (0, o.useState)(""),
    [d, u] = (0, o.useState)(""),
    [p, c] = (0, o.useState)(""),
    [g, f] = (0, o.useState)(""),
    [x, w] = (0, o.useState)(false),
    [F, v] = (0, o.useState)(false),
    [m, h] = (0, o.useState)(null),
    [y, B] = (0, o.useState)([]),
    [k, L] = (0, o.useState)(false),
    [C, _] = (0, o.useState)(""),
    [q, E] = (0, o.useState)(""),
    A = (0, o.useRef)(null),
    I = (0, o.useCallback)(async () => {
      (L(true), _(""));
      try {
        let te = await (await fetch(`${lo}?action=dados&fonte=ajusteSaldoBBBaterias`)).json();
        if (!te.ok) throw new Error(te.erro || "Erro ao carregar os ajustes");
        B(te.dados || []);
      } catch (S) {
        _(String(S.message || S));
      } finally {
        L(false);
      }
    }, []);
  (0, o.useEffect)(() => {
    e && I();
  }, [e, I]);
  let V = (S) => (S === "" || S == null ? null : Number(S)),
    D = V(p),
    O = V(g),
    H = (S) => S != null && !Number.isNaN(S) && Number.isInteger(S) && S >= 0,
    M = t.trim() && i.trim() && H(O) && (x || H(D)),
    Q = !x && H(D) && H(O) ? D - O : null,
    Y = async () => {
      if (!(!M || F)) {
        (v(true), h({ tipo: "info", texto: "Enviando para a planilha..." }));
        try {
          try {
            localStorage.setItem(ba, t.trim());
          } catch {}
          let S = await pl("ajuste_saldo", {
            solicitante: t.trim(),
            produto: i.trim(),
            lote: d.trim(),
            fisico: x ? "" : D,
            inventario: O,
            tiGabriel: x,
          });
          S && S.ok
            ? (h({
                tipo: "ok",
                texto: `Ajuste de ${i.trim().toUpperCase()} enviado para a planilha (linha ${S.linha}).`,
              }),
              l(""),
              u(""),
              c(""),
              f(""),
              w(false),
              I(),
              A.current && A.current.focus())
            : S && S.duplicado
              ? h({ tipo: "warn", texto: S.erro || "Já existe um ajuste pendente desse produto e lote." })
              : h({
                  tipo: "erro",
                  texto: "Não foi possível enviar: " + ((S && S.erro) || "resposta inesperada da planilha."),
                });
        } catch (S) {
          h({ tipo: "erro", texto: "Não foi possível enviar: " + String(S.message || S).slice(0, 220) });
        } finally {
          v(false);
        }
      }
    },
    de = (0, o.useMemo)(() => {
      let S = Rt(q),
        te = [...y].reverse();
      return (S ? te.filter((re) => Rt(`${re.produto} ${re.lote} ${re.nomes} ${re.status}`).includes(S)) : te).slice(
        0,
        40,
      );
    }, [y, q]),
    ce = {
      fontFamily: s.font,
      fontSize: 14,
      padding: "8px 10px",
      borderRadius: s.radius.md,
      border: `1px solid ${s.bdMid}`,
      background: s.bgCard,
      color: s.txtPri,
      width: "100%",
      boxSizing: "border-box",
    },
    W = { fontSize: 12, fontWeight: 700, color: s.txtMuted, marginBottom: 4, display: "block" };
  return o.default.createElement(
    "div",
    { style: { padding: 20, fontFamily: s.font, color: s.txtPri } },
    o.default.createElement(
      ft,
      {
        titulo: "Ajuste de saldo · BBBaterias",
        subtitulo:
          'Envia o pedido de ajuste para a aba "AJUSTE SALDO BB" da planilha CALCULADORA. O ajuste (físico − inventário) e o status a planilha calcula.',
      },
      m && o.default.createElement($e, { tipo: m.tipo }, m.texto),
      o.default.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 14,
            alignItems: "start",
          },
        },
        o.default.createElement(
          "div",
          null,
          o.default.createElement("label", { style: W, htmlFor: "aj-sol" }, "Solicitante"),
          o.default.createElement(
            "select",
            {
              id: "aj-sol",
              style: ce,
              value: a ? "__outro" : t,
              onChange: (S) => {
                S.target.value === "__outro" ? (r(true), n("")) : (r(false), n(S.target.value));
              },
            },
            o.default.createElement("option", { value: "" }, "Escolha..."),
            yn.map((S) => o.default.createElement("option", { key: S, value: S }, S)),
            o.default.createElement("option", { value: "__outro" }, "Outro..."),
          ),
          a &&
            o.default.createElement("input", {
              style: { ...ce, marginTop: 6 },
              placeholder: "Digite o nome",
              value: t,
              onChange: (S) => n(S.target.value),
            }),
        ),
        o.default.createElement(
          "div",
          null,
          o.default.createElement("label", { style: W, htmlFor: "aj-prod" }, "Produto"),
          o.default.createElement("input", {
            id: "aj-prod",
            ref: A,
            style: { ...ce, textTransform: "uppercase" },
            placeholder: "Ex.: SSD-700S3W5-240G",
            value: i,
            onChange: (S) => l(S.target.value),
          }),
        ),
        o.default.createElement(
          "div",
          null,
          o.default.createElement("label", { style: W, htmlFor: "aj-lote" }, "Lote"),
          o.default.createElement("input", {
            id: "aj-lote",
            style: ce,
            placeholder: "Opcional",
            value: d,
            onChange: (S) => u(S.target.value),
          }),
        ),
        o.default.createElement(
          "div",
          null,
          o.default.createElement("label", { style: W, htmlFor: "aj-fis" }, "Saldo físico"),
          o.default.createElement("input", {
            id: "aj-fis",
            type: "number",
            min: 0,
            step: 1,
            style: { ...ce, opacity: x ? 0.5 : 1 },
            disabled: x,
            placeholder: x ? "GABRIEL PEGOU" : "0",
            value: x ? "" : p,
            onChange: (S) => c(S.target.value),
          }),
          o.default.createElement(
            "label",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: 8,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              },
              title: 'Marca "GABRIEL PEGOU" no estoque físico, como a equipe já fazia na planilha',
            },
            o.default.createElement("input", {
              type: "checkbox",
              checked: x,
              onChange: (S) => w(S.target.checked),
              style: { width: 17, height: 17, accentColor: "#1a73e8", cursor: "pointer" },
            }),
            "Uso T.I / Gabriel",
          ),
        ),
        o.default.createElement(
          "div",
          null,
          o.default.createElement("label", { style: W, htmlFor: "aj-inv" }, "Saldo no inventário (Protheus)"),
          o.default.createElement("input", {
            id: "aj-inv",
            type: "number",
            min: 0,
            step: 1,
            style: ce,
            placeholder: "0",
            value: g,
            onChange: (S) => f(S.target.value),
          }),
          o.default.createElement(
            "div",
            { style: { fontSize: 12, color: s.txtMuted, marginTop: 8, minHeight: 18 } },
            Q != null
              ? o.default.createElement(
                  o.default.Fragment,
                  null,
                  "Ajuste: ",
                  o.default.createElement(
                    "b",
                    { style: { color: Q === 0 ? s.txtPri : Q < 0 ? s.red : s.green } },
                    Q > 0 ? `+${Q}` : Q,
                  ),
                  " (físico − inventário)",
                )
              : x
                ? 'Uso T.I / Gabriel: o físico vai como "GABRIEL PEGOU".'
                : "",
          ),
        ),
      ),
      o.default.createElement(
        "div",
        { style: { display: "flex", justifyContent: "flex-end", marginTop: 14 } },
        o.default.createElement(
          ge,
          { tipo: "primario", disabled: !M || F, onClick: Y },
          F ? "Enviando..." : "Enviar ajuste",
        ),
      ),
    ),
    o.default.createElement("div", { style: { height: 14 } }),
    o.default.createElement(
      ft,
      {
        titulo: "Últimos ajustes",
        subtitulo: "Como estão na planilha (os mais novos primeiro)",
        acoes: o.default.createElement(
          o.default.Fragment,
          null,
          o.default.createElement("input", {
            className: "lf-input",
            style: { ...Ke, width: 220 },
            placeholder: "Buscar produto, lote, nome...",
            value: q,
            onChange: (S) => E(S.target.value),
          }),
          o.default.createElement(ge, { onClick: I, disabled: k }, k ? "Atualizando..." : "Atualizar"),
        ),
        semPadding: true,
      },
      C && o.default.createElement($e, { tipo: "erro" }, C),
      o.default.createElement(
        "div",
        { style: { overflow: "auto", maxHeight: "50vh" } },
        o.default.createElement(
          "table",
          { style: { width: "100%", borderCollapse: "collapse" } },
          o.default.createElement(
            "thead",
            null,
            o.default.createElement(
              "tr",
              null,
              [
                "Data / hora",
                "Solicitante",
                "Produto",
                "Lote",
                "Físico",
                "Inventário",
                "Ajuste",
                "Status",
                "Ajustado em",
              ].map((S) => o.default.createElement("th", { key: S, style: Bl }, S)),
            ),
          ),
          o.default.createElement(
            "tbody",
            null,
            de.map((S, te) =>
              o.default.createElement(
                "tr",
                { key: te },
                o.default.createElement("td", { style: oe }, S.dataHora || "—"),
                o.default.createElement("td", { style: oe }, S.nomes || "—"),
                o.default.createElement("td", { style: { ...oe, fontWeight: 800 } }, S.produto),
                o.default.createElement("td", { style: oe }, S.lote || "—"),
                o.default.createElement(
                  "td",
                  { style: oe },
                  S.estoqueFisico === "" || S.estoqueFisico == null ? "—" : S.estoqueFisico,
                ),
                o.default.createElement(
                  "td",
                  { style: oe },
                  S.inventarioProtheus === "" || S.inventarioProtheus == null ? "—" : S.inventarioProtheus,
                ),
                o.default.createElement(
                  "td",
                  { style: { ...oe, fontWeight: 800 } },
                  S.ajusteSaldo === "" || S.ajusteSaldo == null ? "—" : S.ajusteSaldo,
                ),
                o.default.createElement(
                  "td",
                  { style: oe },
                  S.status
                    ? o.default.createElement(gt, { texto: S.status, tipo: Ho(S.status) })
                    : o.default.createElement(gt, { texto: "Pendente", tipo: "vermelho" }),
                ),
                o.default.createElement("td", { style: oe }, S.dataHoraAjuste || "—"),
              ),
            ),
            !de.length &&
              !k &&
              o.default.createElement(
                "tr",
                null,
                o.default.createElement(
                  "td",
                  { style: { ...oe, textAlign: "center", color: s.txtMuted }, colSpan: 9 },
                  "Nenhum ajuste encontrado.",
                ),
              ),
          ),
        ),
      ),
    ),
  );
}
function _2({ ativo: e }) {
  let [t, n] = (0, o.useState)([]),
    [a, r] = (0, o.useState)({}),
    [i, l] = (0, o.useState)({}),
    [d, u] = (0, o.useState)(null),
    p = (0, o.useCallback)((T) => u(T ? new Set(T) : null), []),
    [c, g] = (0, o.useState)(() => {
      try {
        return localStorage.getItem("bb_so_liberados") === "1";
      } catch {
        return false;
      }
    }),
    [f, x] = (0, o.useState)([]),
    [w, F] = (0, o.useState)(""),
    [v, m] = (0, o.useState)(false),
    [h, y] = (0, o.useState)(null),
    [B, k] = (0, o.useState)(() => {
      try {
        return localStorage.getItem(ba) || "";
      } catch {
        return "";
      }
    }),
    [L, C] = (0, o.useState)(false),
    [_, q] = (0, o.useState)({}),
    [E, A] = (0, o.useState)({}),
    [I, V] = (0, o.useState)({}),
    [D, O] = (0, o.useState)(null),
    [H, M] = (0, o.useState)(false),
    [Q, Y] = (0, o.useState)(null),
    [de, ce] = (0, o.useState)({}),
    [W, S] = (0, o.useState)(""),
    [te, re] = (0, o.useState)({}),
    [be, pe] = (0, o.useState)(() => {
      try {
        return localStorage.getItem(dg) === "localizacao" ? "localizacao" : "produto";
      } catch {
        return "produto";
      }
    }),
    [$, ee] = (0, o.useState)(() => {
      try {
        return localStorage.getItem("bb_folha_imp") === "paisagem" ? "paisagem" : "retrato";
      } catch {
        return "retrato";
      }
    }),
    se = (T) => {
      ee(T);
      try {
        localStorage.setItem("bb_folha_imp", T);
      } catch {}
    },
    Ae = (T) => {
      pe(T);
      try {
        localStorage.setItem(dg, T);
      } catch {}
    },
    [Ne, Ce] = (0, o.useState)("vialeitor"),
    [Ie, Be] = (0, o.useState)(""),
    [Ve, lt] = (0, o.useState)(false),
    G = (0, o.useRef)(null),
    me = (0, o.useRef)(0),
    je = (0, o.useRef)({}),
    Ye = (0, o.useRef)({}),
    Se = (0, o.useRef)({}),
    De = (0, o.useRef)(0),
    xe = (0, o.useRef)(0),
    ke = (0, o.useRef)(false),
    we = (0, o.useRef)(0),
    Qe = (0, o.useCallback)(async (T) => {
      m(true);
      try {
        let J = (Fe) =>
            "/via_leitor_agente?select=" + Fe + "&filial=eq." + cl + "&order=data_limite.asc.nullslast,pedido.asc",
          ie =
            "pedido,qtd_total,transportadora,produtos,itens,lib_estoque,data_limite,tempo_pedido_horas,atualizado_em",
          ve;
        try {
          ve = await Xn(J(ie + ",agendado_para"));
        } catch (Fe) {
          if (!/agendado|42703|column/i.test(String(Fe.message || Fe))) throw Fe;
          ve = await Xn(J(ie));
        }
        let P = Lc(),
          R = ve.filter((Fe) => !sl(Fe, P)),
          X = {},
          le = {};
        for (let Fe of xi(
          R.map((He) => String(He.pedido)),
          100,
        )) {
          let He = await ye(
            "/bb_lista_itens?select=pedido,produto,lista_id&pedido=in.(" +
              Fe.map(encodeURIComponent).join(",") +
              ")&limit=5000",
          );
          (Array.isArray(He) ? He : []).forEach((Oe) => {
            ((le[wt(Oe.pedido, Oe.produto)] = Oe.lista_id),
              (!X[String(Oe.pedido)] || Oe.lista_id > X[String(Oe.pedido)]) && (X[String(Oe.pedido)] = Oe.lista_id));
          });
        }
        let Le = !!(T && T.type === "click"),
          Ue = false;
        if (v1 && mi)
          if (ke.current && !Le && Date.now() - xe.current < 17e4) Ue = true;
          else
            try {
              let Fe = await y2(),
                He = {};
              (Fe.forEach((Oe) => {
                He[jo(Oe.produto)] = Oe;
              }),
                re(He),
                S("estoque"),
                (ke.current = true),
                (xe.current = Date.now()),
                (Ue = true));
            } catch {
              ke.current = false;
            }
        if (!Ue)
          try {
            let Fe = await Xn("/bb_localizacao?select=produto,localizacao,saldo_fd,atualizado_em"),
              He = {};
            (Fe.forEach((Oe) => {
              He[jo(Oe.produto)] = Oe;
            }),
              re(He),
              S("arquivo"));
          } catch {}
        let to = (Fe) => {
            let He = Date.now(),
              Oe = Object.entries(Fe).filter(([Pt]) => He - (Se.current[Pt] || 0) > 25 * 6e4);
            if (Oe.length) {
              Oe.forEach(([Pt]) => {
                Se.current[Pt] = He;
              });
              for (let Pt = 0; Pt < Oe.length; Pt += 300) {
                let ki = Oe.slice(Pt, Pt + 300);
                ye("/bb_pedido_venda?on_conflict=chave", {
                  method: "POST",
                  headers: { Prefer: "resolution=merge-duplicates,return=minimal", "Content-Type": "application/json" },
                  body: JSON.stringify(
                    ki.map(([gr, Zn]) => ({
                      chave: gr,
                      pedido: Zn.pedido,
                      produto: Zn.produto,
                      dados: { qtd: Zn.qtd, equipa01: Zn.equipa01, endereco: Zn.endereco },
                    })),
                  ),
                }).catch(() => {
                  ki.forEach(([gr]) => {
                    delete Se.current[gr];
                  });
                });
              }
            }
          },
          Uo = async () => {
            if (!(Date.now() - De.current < 24e4)) {
              De.current = Date.now();
              try {
                let Fe = new Date(Date.now() - x2 * 36e5).toISOString(),
                  He = await ye(
                    `/bb_pedido_venda?select=chave,dados,ultimo_visto&ultimo_visto=gte.${encodeURIComponent(Fe)}&limit=5000`,
                  ),
                  Oe = {};
                ((Array.isArray(He) ? He : []).forEach((Pt) => {
                  Oe[Pt.chave] = { ...(Pt.dados || {}), mantido: true, visto: Pt.ultimo_visto };
                }),
                  (Ye.current = Oe),
                  ce({ ...Oe, ...je.current }));
              } catch {}
            }
          },
          bo = (Fe) => {
            let He = {};
            ((Array.isArray(Fe) ? Fe : []).forEach((Oe) => {
              let Pt = Te(Oe.status);
              Pt.includes("comprar") &&
                !Pt.includes("nao comprar") &&
                Oe.pedido &&
                Oe.produto &&
                (He[wt(Oe.pedido, Oe.produto)] = {
                  qtd: Oe.quantidadeLiberada,
                  equipa01: Oe.equipa01,
                  endereco: Oe.endereco,
                  pedido: String(Oe.pedido),
                  produto: String(Oe.produto),
                });
            }),
              (je.current = He),
              ce({ ...Ye.current, ...He }),
              to(He));
          },
          Kt = uc("pedidoVenda1020");
        (Kt && Kt.length
          ? bo(Kt)
          : !document.hidden &&
            (Le || Date.now() - me.current > 17e4) &&
            ((me.current = Date.now()),
            fetch(`${lo}?action=dados&fonte=pedidoVenda1020`)
              .then((Fe) => Fe.json())
              .then((Fe) => {
                Fe && Fe.ok && (bn("pedidoVenda1020", Fe.dados || []), bo(Fe.dados || []));
              })
              .catch(() => {})),
          Uo());
        let Yn = (Fe) => {
            let He = {},
              Oe = {};
            (Fe.forEach(([Pt, ki, gr, Zn, S1, E1]) => {
              let $c = wt(Pt, ki);
              ((He[$c] = gr || "Solicitado"), (Oe[$c] = { solic: Zn || "", compra: S1 || "", chegou: E1 || "" }));
            }),
              q(He),
              A(Oe));
          },
          Ai = false;
        try {
          let Fe = await ye(
            "/bb_compras?select=pedido,produto,status,solicitado_em,comprado_em,chegou_em&order=linha.desc&limit=1000",
          );
          Array.isArray(Fe) &&
            Fe.length &&
            (Yn(
              Fe.reverse().map((He) => [
                He.pedido,
                He.produto,
                He.status,
                He.solicitado_em,
                He.comprado_em,
                He.chegou_em,
              ]),
            ),
            (Ai = true));
        } catch {}
        (!Ai &&
          Cc &&
          (Le || (!document.hidden && Date.now() - we.current > 17e4)) &&
          ((we.current = Date.now()),
          pl("listar")
            .then((Fe) => {
              Fe && Fe.ok && Yn(Fe.itens || []);
            })
            .catch(() => {})),
          n(R),
          r(X),
          l(le),
          F(R.reduce((Fe, He) => (He.atualizado_em && He.atualizado_em > Fe ? He.atualizado_em : Fe), "")));
        let Mc = await ye("/bb_listas?select=*&order=id.desc&limit=300");
        (x(Array.isArray(Mc) ? Mc : []), y(null));
      } catch (J) {
        let ie = String(J.message || J);
        y({
          tipo: "erro",
          texto: /PGRST205|does not exist|Could not find/i.test(ie)
            ? "As tabelas da Lista BB ainda não existem no Supabase. Rode o SQL criar_lista_bb.sql."
            : "Erro ao carregar: " + ie.slice(0, 180),
        });
      } finally {
        m(false);
      }
    }, []);
  (0, o.useEffect)(() => {
    if (e) {
      Qe();
      let T = setInterval(Qe, 6e4);
      return () => clearInterval(T);
    }
  }, [e, Qe]);
  let Xe = (0, o.useMemo)(() => t.filter((T) => !a[String(T.pedido)]), [t, a]),
    ue = (0, o.useMemo)(() => (d ? t.filter((T) => d.has(String(T.pedido))) : t), [t, d]),
    Pe = (0, o.useMemo)(() => (d ? Xe.filter((T) => d.has(String(T.pedido))) : Xe), [Xe, d]),
    dt = (0, o.useCallback)(
      (T, J) => {
        let ie = wt(T, J),
          ve = _[ie];
        return ve ? xa(ve).texto !== "Chegou" : !!de[ie];
      },
      [de, _],
    ),
    Tt = (0, o.useCallback)(
      (T, J) => {
        let ie = wt(T, J),
          ve = [];
        return (de[ie] && ve.push("Pedido de venda"), _[ie] && ve.push(xa(_[ie]).texto), ve.join(" · "));
      },
      [de, _],
    ),
    _e = (0, o.useMemo)(() => ug(ue, te, be), [ue, te, be]),
    yt = (0, o.useMemo)(() => ug(Pe, te, be), [Pe, te, be]),
    zt = (0, o.useMemo)(() => (c ? _e.filter((T) => !dt(T.pedido, T.produto)) : _e), [c, _e, dt]),
    po = (0, o.useMemo)(
      () => (c ? _e.filter((T) => !i[wt(T.pedido, T.produto)] && !dt(T.pedido, T.produto)) : yt),
      [c, _e, yt, i, dt],
    ),
    Ut = (T) => new Set(T.map((J) => J.pedido)).size,
    nt = _e.length - _e.filter((T) => !dt(T.pedido, T.produto)).length,
    At = (T) => {
      g(T);
      try {
        localStorage.setItem("bb_so_liberados", T ? "1" : "0");
      } catch {}
    },
    kt = (0, o.useMemo)(() => {
      let T = /* @__PURE__ */ new Set();
      return (
        t.forEach((J) => b1(J).forEach((ie) => !(te[jo(ie.produto)] || {}).localizacao && T.add(jo(ie.produto)))),
        T.size
      );
    }, [t, te]),
    It = (0, o.useMemo)(
      () => Object.values(te).reduce((T, J) => (J.atualizado_em && J.atualizado_em > T ? J.atualizado_em : T), ""),
      [te],
    );
  (0, o.useEffect)(() => {
    if (!D || D.tipo === "info") return;
    let T = setTimeout(() => O(null), 12e3);
    return () => clearTimeout(T);
  }, [D]);
  let Mt = (0, o.useCallback)(async (T) => {
      let J = T.itens.map((ie) => wt(ie.pedido, ie.produto));
      (V((ie) => {
        let ve = { ...ie };
        return (
          J.forEach((P) => {
            ve[P] = true;
          }),
          ve
        );
      }),
        O({ tipo: "info", texto: `Enviando ${T.itens.length} produto(s) para a planilha...` }));
      try {
        try {
          localStorage.setItem(ba, T.solicitante);
        } catch {}
        (k(T.solicitante), C(!yn.includes(T.solicitante)));
        let ie = await pl("solicitar_lote", T);
        if (ie && ie.ok && Array.isArray(ie.resultados)) {
          let ve = ie.resultados,
            P = ve.filter((Le) => Le && Le.ok),
            R = ve.filter((Le) => Le && Le.duplicado),
            X = ve.filter((Le) => Le && !Le.ok && !Le.duplicado);
          q((Le) => {
            let Ue = { ...Le };
            return (
              ve.forEach((to, Uo) => {
                to &&
                  (to.ok || to.duplicado) &&
                  T.itens[Uo] &&
                  (Ue[wt(T.itens[Uo].pedido, T.itens[Uo].produto)] = to.status || "Pendente");
              }),
              Ue
            );
          });
          let le = [`${P.length} solicitado(s) na planilha`];
          (R.length && le.push(`${R.length} já estavam solicitados`),
            X.length && le.push(`${X.length} com erro (${String(X[0].erro || "").slice(0, 120)})`),
            O({ tipo: X.length || R.length ? "warn" : "ok", texto: le.join(" · ") + "." }));
        } else
          O({
            tipo: "erro",
            texto: "Não foi possível solicitar: " + ((ie && ie.erro) || "resposta inesperada da planilha."),
          });
      } catch (ie) {
        O({ tipo: "erro", texto: "Não foi possível solicitar: " + String(ie.message || ie).slice(0, 220) });
      } finally {
        V((ie) => {
          let ve = { ...ie };
          return (
            J.forEach((P) => {
              delete ve[P];
            }),
            ve
          );
        });
      }
    }, []),
    ht = (0, o.useCallback)(async (T) => {
      O({ tipo: "info", texto: `Enviando ${T.itens.length} ajuste(s) de saldo para a planilha...` });
      try {
        try {
          localStorage.setItem(ba, T.solicitante);
        } catch {}
        (k(T.solicitante), C(!yn.includes(T.solicitante)));
        let J = await pl("ajuste_saldo_lote", T);
        if (J && J.ok && Array.isArray(J.resultados)) {
          let ie = J.resultados,
            ve = ie.filter((le) => le && le.ok),
            P = ie.filter((le) => le && le.duplicado),
            R = ie.filter((le) => le && !le.ok && !le.duplicado),
            X = [`${ve.length} ajuste(s) enviado(s) para a planilha`];
          (P.length && X.push(`${P.length} já tinham ajuste pendente`),
            R.length && X.push(`${R.length} com erro (${String(R[0].erro || "").slice(0, 120)})`),
            O({ tipo: R.length || P.length ? "warn" : "ok", texto: X.join(" · ") + "." }));
        } else
          O({
            tipo: "erro",
            texto: "Não foi possível enviar o ajuste: " + ((J && J.erro) || "resposta inesperada da planilha."),
          });
      } catch (J) {
        O({ tipo: "erro", texto: "Não foi possível enviar o ajuste: " + String(J.message || J).slice(0, 220) });
      }
    }, []),
    xt = (0, o.useMemo)(
      () => ({
        filial: cl,
        onVisiveis: p,
        listaDe: a,
        locMap: te,
        usuario: B.trim(),
        compras: _,
        comprasDatas: E,
        pedVenda: de,
        enviando: I,
        avisoCompra: D,
        solicitarLote: Mt,
        solicitarAjuste: ht,
      }),
      [p, a, te, B, _, E, de, I, D, Mt, ht],
    ),
    Ft = (0, o.useMemo)(() => {
      let T = Ie.trim().toLowerCase();
      return T
        ? f.filter(
            (J) =>
              Ba(J.id).toLowerCase().includes(T) ||
              String(J.usuario || "")
                .toLowerCase()
                .includes(T),
          )
        : f;
    }, [f, Ie]),
    eo = async (T) => {
      let J = B.trim();
      if (!J) {
        y({ tipo: "erro", texto: "Escolha o responsável (quem está gerando a lista)." });
        return;
      }
      let ie = T === "tudo" ? zt : po;
      if (ie.length) {
        if (T === "tudo") {
          let ve = ue.length - Pe.length;
          if (
            !window.confirm(
              c
                ? `Gerar uma lista com ${zt.length} itens de ${Ut(zt)} pedidos do Via Leitor, sem os que aguardam chegada` +
                    (ve ? " (inclui itens de pedidos que já estão em outra lista)" : "") +
                    "?"
                : `Gerar uma lista com ${d ? "os" : "TODOS os"} ${ue.length} pedidos ${d ? "que estão na tela (filtro aplicado)" : "do Via Leitor"}` +
                    (ve ? `, incluindo ${ve} que já estão em outra lista` : "") +
                    "?",
            )
          )
            return;
        }
        (M(true), y({ tipo: "info", texto: "Gerando lista..." }));
        try {
          try {
            localStorage.setItem(ba, J);
          } catch {}
          let ve = await ye("/rpc/bb_gerar_lista", {
              method: "POST",
              body: JSON.stringify({ p_usuario: J, p_itens: ie, p_somente_novos: T !== "tudo" && !c }),
            }),
            [P] = await ye("/bb_listas?id=eq." + ve + "&select=*"),
            R = await ye("/bb_lista_itens?lista_id=eq." + ve + "&select=*&order=produto.asc,pedido.asc");
          (cg(P, R, be, { situacao: (X) => Tt(X.pedido, X.produto), semAguardando: c, folha: $ }),
            await ye("/bb_listas?id=eq." + ve, {
              method: "PATCH",
              body: JSON.stringify({ impresso: true }),
              headers: { Prefer: "return=minimal" },
            }),
            y({ tipo: "ok", texto: `Lista ${Ba(ve)} gerada: ${P.pedidos} pedidos, ${P.itens} itens.` }),
            await Qe());
        } catch (ve) {
          let P = String(ve.message || ve);
          y({
            tipo: "erro",
            texto: "Erro ao gerar: " + ((P.match(/"message":"([^"]+)"/) || [])[1] || P.slice(0, 200)),
          });
        } finally {
          M(false);
        }
      }
    },
    Wo = async (T) => {
      let J = T.target.files && T.target.files[0];
      if ((T.target && (T.target.value = ""), !!J)) {
        (lt(true), y({ tipo: "info", texto: "Lendo " + J.name + "..." }));
        try {
          let ie = await m1(J),
            ve = k2(ie);
          if (!ve)
            throw new Error(
              'Não achei as colunas. O arquivo precisa ter "Produto" e "Localização" (e/ou "EST-FD-01" / saldo) no cabeçalho.',
            );
          let P = /* @__PURE__ */ new Date().toISOString(),
            R = /* @__PURE__ */ new Map();
          ie.slice(ve.linha + 1).forEach((le) => {
            let Le = jo(le[ve.iProd]);
            if (!Le) return;
            let Ue = { produto: Le, origem: "arquivo", atualizado_em: P };
            (ve.iLoc >= 0 && (Ue.localizacao = String(le[ve.iLoc] == null ? "" : le[ve.iLoc]).trim() || null),
              ve.iSal >= 0 && (Ue.saldo_fd = A2(le[ve.iSal])),
              R.set(Le, Ue));
          });
          let X = [...R.values()];
          if (!X.length) throw new Error("O arquivo não tem nenhum produto abaixo do cabeçalho.");
          for (let le of xi(X, 500))
            await ye("/bb_localizacao?on_conflict=produto", {
              method: "POST",
              body: JSON.stringify(le),
              headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
            });
          (y({
            tipo: "ok",
            texto:
              `${X.length} produtos atualizados` +
              (ve.iLoc >= 0 ? " (localização" + (ve.iSal >= 0 ? " e saldo)" : ")") : " (saldo)") +
              ".",
          }),
            await Qe());
        } catch (ie) {
          let ve = String(ie.message || ie);
          y({
            tipo: "erro",
            texto: /PGRST205|does not exist|Could not find/i.test(ve)
              ? "A tabela de localização não existe. Rode o SQL criar_lista_bb.sql."
              : "Erro ao subir o arquivo: " + ve.slice(0, 200),
          });
        } finally {
          lt(false);
        }
      }
    },
    N = async (T) => ye("/bb_lista_itens?lista_id=eq." + T + "&select=*&order=produto.asc,pedido.asc"),
    b = async (T) => {
      try {
        (cg(T, await N(T.id), be, { situacao: (J) => Tt(J.pedido, J.produto), folha: $ }),
          await ye("/bb_listas?id=eq." + T.id, {
            method: "PATCH",
            body: JSON.stringify({ impresso: true }),
            headers: { Prefer: "return=minimal" },
          }),
          x((J) => J.map((ie) => (ie.id === T.id ? { ...ie, impresso: true } : ie))));
      } catch (J) {
        y({ tipo: "erro", texto: "Erro ao imprimir: " + String(J.message || J).slice(0, 160) });
      }
    },
    j = async (T) => {
      if (Q && Q.id === T.id) return Y(null);
      try {
        Y({ id: T.id, itens: await N(T.id) });
      } catch (J) {
        y({ tipo: "erro", texto: "Erro ao abrir: " + String(J.message || J).slice(0, 160) });
      }
    },
    Z = async (T) => {
      if (
        window.confirm(
          `Excluir a lista ${Ba(T.id)}? Os pedidos que não estiverem em outra lista voltam para "Gerar Lista".`,
        )
      )
        try {
          (await ye("/bb_listas?id=eq." + T.id, { method: "DELETE", headers: { Prefer: "return=minimal" } }),
            Q && Q.id === T.id && Y(null),
            await Qe());
        } catch (J) {
          y({ tipo: "erro", texto: "Erro ao excluir: " + String(J.message || J).slice(0, 160) });
        }
    },
    ae = (T) => (T ? wc(T) + " " + fl(T) : ""),
    K = {
      background: s.bgCard,
      border: `1px solid ${s.bdLight}`,
      borderRadius: s.radius.lg,
      boxShadow: s.shadowSm,
      marginBottom: 16,
      overflow: "hidden",
    },
    Ee = {
      textAlign: "left",
      padding: "9px 12px",
      fontSize: 11,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: 0.4,
      color: "#fff",
      background: "#2f6b57",
      position: "sticky",
      top: 0,
      whiteSpace: "nowrap",
    },
    he = {
      padding: "8px 12px",
      fontSize: 13,
      color: s.txtPri,
      borderBottom: `1px solid ${s.bdLight}`,
      whiteSpace: "nowrap",
    },
    z = (T, J) => ({
      border: T ? "none" : `1px solid ${s.bdMid}`,
      background: T ? s.primaryGrad : s.bgCard,
      color: T ? "#fff" : s.txtPri,
      borderRadius: s.radius.md,
      padding: "8px 14px",
      fontWeight: 700,
      fontSize: 13,
      cursor: J ? "not-allowed" : "pointer",
      opacity: J ? 0.55 : 1,
      fontFamily: s.font,
      whiteSpace: "nowrap",
    }),
    U =
      h &&
      (h.tipo === "erro"
        ? [s.redBg, s.redBd, s.red]
        : h.tipo === "ok"
          ? [s.greenBg, s.greenBd, s.green]
          : [s.blueBg, s.blueBd, s.blue]);
  return o.default.createElement(
    "div",
    { style: { fontFamily: s.font, color: s.txtPri } },
    o.default.createElement("style", null, Bi),
    o.default.createElement(
      "div",
      { style: { ...K, padding: "16px 22px", borderTop: `3px solid ${s.primary}` } },
      o.default.createElement(
        "div",
        {
          style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" },
        },
        o.default.createElement(
          "div",
          null,
          o.default.createElement(
            "div",
            {
              style: { fontSize: 11, fontWeight: 800, letterSpacing: 1, color: s.primary, textTransform: "uppercase" },
            },
            "Faturamento · BBBaterias",
          ),
          o.default.createElement("div", { style: { fontSize: 24, fontWeight: 800 } }, "Via Leitor"),
          o.default.createElement(
            "div",
            { style: { fontSize: 12, color: s.txtMuted, marginTop: 2 } },
            "Filial ",
            cl,
            " · agente",
            w ? " · atualizado às " + fl(w) : "",
            " · ",
            t.length,
            " pedidos · ",
            Xe.length,
            " aguardando lista",
            Object.keys(te).length
              ? ` · localização ${W === "estoque" ? "do estoque" : "de"} ${ae(It)}${kt ? " · " + kt + " produtos sem localização" : ""}`
              : " · localização ainda não carregada",
          ),
        ),
        o.default.createElement(
          "div",
          { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" } },
          o.default.createElement(
            "select",
            {
              className: "cnl-sel",
              style: { height: 38 },
              "aria-label": "Responsável",
              value: yn.includes(B) ? B : B || L ? "__outro" : "",
              onChange: (T) => {
                T.target.value === "__outro" ? (C(true), k("")) : (C(false), k(T.target.value));
              },
            },
            o.default.createElement("option", { value: "" }, "Responsável (quem está usando)"),
            yn.map((T) => o.default.createElement("option", { key: T, value: T }, T)),
            o.default.createElement("option", { value: "__outro" }, "Outro..."),
          ),
          !yn.includes(B) &&
            (B || L) &&
            o.default.createElement("input", {
              className: "cnl-busca",
              style: { marginBottom: 0, width: 170 },
              placeholder: "Digite o nome",
              value: B,
              onChange: (T) => k(T.target.value),
              autoFocus: L,
            }),
          d &&
            o.default.createElement(
              "span",
              {
                title:
                  "Há filtro no Via Leitor (busca, lista, prazo, situação...). Gerar novos / Gerar tudo levam só o que está aparecendo.",
                style: {
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: "#174ea6",
                  background: "#e8f0fe",
                  border: "1px solid #1a73e8",
                  borderRadius: 8,
                  padding: "8px 12px",
                  whiteSpace: "nowrap",
                },
              },
              "🔎 Só o que está na tela (",
              ue.length,
              " ",
              ue.length === 1 ? "pedido" : "pedidos",
              ")",
            ),
          o.default.createElement(
            "label",
            {
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
                padding: "8px 12px",
                borderRadius: 8,
                border: `1px solid ${c ? "#1a73e8" : s.bdMid}`,
                background: c ? "#e8f0fe" : s.bgCard,
                color: c ? "#174ea6" : s.txtPri,
              },
              title:
                "A lista leva só os itens que já podem ser catados. Ficam de fora os que são pedido de venda ou estão aguardando compra / chegada (planilha de compra).",
            },
            o.default.createElement("input", {
              type: "checkbox",
              checked: c,
              onChange: (T) => At(T.target.checked),
              style: { width: 17, height: 17, accentColor: "#1a73e8", cursor: "pointer" },
            }),
            "Sem os aguardando chegada",
            nt > 0 ? ` (${nt} ${nt === 1 ? "item" : "itens"})` : "",
          ),
          o.default.createElement(
            "button",
            {
              style: { ...z(true, H || !po.length), padding: "10px 18px", fontSize: 14 },
              disabled: H || !po.length,
              onClick: () => eo("novos"),
              title: "Lista só com os pedidos que ainda não estão em nenhuma lista",
            },
            H ? "Gerando..." : `Gerar novos (${c ? Ut(po) : Pe.length})`,
          ),
          o.default.createElement(
            "button",
            {
              style: { ...z(false, H || !zt.length), padding: "10px 18px", fontSize: 14 },
              disabled: H || !zt.length,
              onClick: () => eo("tudo"),
              title: "Lista com todos os pedidos que estão no Via Leitor, inclusive os que já têm lista",
            },
            `Gerar tudo (${c ? Ut(zt) : ue.length})`,
          ),
          o.default.createElement(
            "select",
            {
              className: "cnl-sel",
              style: { height: 38 },
              value: be,
              onChange: (T) => Ae(T.target.value),
              title: "Ordem em que a lista é impressa",
            },
            o.default.createElement("option", { value: "produto" }, "Imprimir por produto"),
            o.default.createElement("option", { value: "localizacao" }, "Imprimir por localização"),
          ),
          o.default.createElement(
            "select",
            {
              className: "cnl-sel",
              style: { height: 38 },
              value: $,
              onChange: (T) => se(T.target.value),
              title: "Orientação da folha na impressão",
            },
            o.default.createElement("option", { value: "retrato" }, "Folha em pé (reta)"),
            o.default.createElement("option", { value: "paisagem" }, "Folha deitada"),
          ),
          o.default.createElement(
            "button",
            { style: z(false, Ve), disabled: Ve, onClick: () => G.current && G.current.click() },
            Ve ? "Subindo..." : "Subir localização",
          ),
          o.default.createElement("input", {
            ref: G,
            type: "file",
            accept: ".csv,.txt,.xlsx,.ods",
            style: { display: "none" },
            onChange: Wo,
          }),
          o.default.createElement(
            "button",
            { style: z(false, v), disabled: v, onClick: Qe },
            v ? "Atualizando..." : "Atualizar",
          ),
        ),
      ),
    ),
    h &&
      o.default.createElement(
        "div",
        {
          style: {
            background: U[0],
            border: `1px solid ${U[1]}`,
            color: U[2],
            borderRadius: s.radius.md,
            padding: "10px 14px",
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 14,
          },
        },
        h.texto,
      ),
    o.default.createElement(
      "div",
      {
        role: "tablist",
        style: { display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap", borderBottom: `1px solid ${s.bdMid}` },
      },
      [
        ["vialeitor", "Via Leitor"],
        ["historico", "Histórico de listas" + (f.length ? " (" + f.length + ")" : "")],
      ].map(([T, J]) => {
        let ie = Ne === T;
        return o.default.createElement(
          "button",
          {
            key: T,
            type: "button",
            role: "tab",
            "aria-selected": ie,
            onClick: () => Ce(T),
            style: {
              padding: "10px 16px",
              marginBottom: -1,
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${ie ? s.primary : "transparent"}`,
              color: ie ? s.primary : s.txtSec,
              fontWeight: ie ? 800 : 600,
              fontSize: 13.5,
              cursor: "pointer",
              fontFamily: s.font,
            },
          },
          J,
        );
      }),
    ),
    Ne === "vialeitor" && o.default.createElement(h1, { ativo: e, bb: xt }),
    Ne === "historico" &&
      o.default.createElement(
        "div",
        { style: K },
        o.default.createElement(
          "div",
          {
            style: {
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              borderBottom: `1px solid ${s.bdLight}`,
            },
          },
          o.default.createElement("div", { style: { fontWeight: 800, fontSize: 15 } }, "Histórico de listas"),
          o.default.createElement("input", {
            className: "cnl-busca",
            style: { marginBottom: 0, width: 260, marginLeft: "auto" },
            placeholder: "Buscar nº da lista ou responsável",
            value: Ie,
            onChange: (T) => Be(T.target.value),
          }),
        ),
        o.default.createElement(
          "div",
          { style: { overflowX: "auto" } },
          o.default.createElement(
            "table",
            { style: { width: "100%", borderCollapse: "collapse" } },
            o.default.createElement(
              "thead",
              null,
              o.default.createElement(
                "tr",
                null,
                ["Nº da lista", "Gerada em", "Responsável", "Pedidos", "Itens", "Unidades", "Impressa", ""].map((T) =>
                  o.default.createElement("th", { key: T, style: Ee }, T),
                ),
              ),
            ),
            o.default.createElement(
              "tbody",
              null,
              Ft.map((T) =>
                o.default.createElement(
                  o.default.Fragment,
                  { key: T.id },
                  o.default.createElement(
                    "tr",
                    null,
                    o.default.createElement("td", { style: { ...he, fontWeight: 800 } }, Ba(T.id)),
                    o.default.createElement(
                      "td",
                      { style: he },
                      new Date(T.criada_em).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
                    ),
                    o.default.createElement("td", { style: he }, T.usuario || "-"),
                    o.default.createElement("td", { style: he }, T.pedidos),
                    o.default.createElement("td", { style: he }, T.itens),
                    o.default.createElement("td", { style: he }, Un(T.unidades)),
                    o.default.createElement("td", { style: he }, T.impresso ? "Sim" : "Não"),
                    o.default.createElement(
                      "td",
                      { style: { ...he, whiteSpace: "nowrap", textAlign: "right" } },
                      o.default.createElement(
                        "button",
                        { style: { ...z(false), padding: "5px 10px", marginRight: 6 }, onClick: () => j(T) },
                        Q && Q.id === T.id ? "Fechar" : "Ver",
                      ),
                      o.default.createElement(
                        "button",
                        { style: { ...z(false), padding: "5px 10px", marginRight: 6 }, onClick: () => b(T) },
                        "Imprimir",
                      ),
                      o.default.createElement(
                        "button",
                        { style: { ...z(false), padding: "5px 10px", color: s.red }, onClick: () => Z(T) },
                        "Excluir",
                      ),
                    ),
                  ),
                  Q &&
                    Q.id === T.id &&
                    o.default.createElement(
                      "tr",
                      null,
                      o.default.createElement(
                        "td",
                        { colSpan: 8, style: { padding: 0, background: s.bgStripe } },
                        o.default.createElement(
                          "table",
                          { style: { width: "100%", borderCollapse: "collapse" } },
                          o.default.createElement(
                            "thead",
                            null,
                            o.default.createElement(
                              "tr",
                              null,
                              [
                                "Pedido",
                                "Produto",
                                "Localização",
                                "Qtd",
                                "EST-FD-01",
                                "Transporte",
                                "Liberação",
                                "Situação",
                              ].map((J) =>
                                o.default.createElement(
                                  "th",
                                  {
                                    key: J,
                                    style: {
                                      textAlign: "left",
                                      padding: "7px 12px",
                                      fontSize: 11,
                                      fontWeight: 800,
                                      color: s.txtMuted,
                                      textTransform: "uppercase",
                                      letterSpacing: "0.05em",
                                      borderBottom: `1px solid ${s.bdMid}`,
                                    },
                                  },
                                  J,
                                ),
                              ),
                            ),
                          ),
                          o.default.createElement(
                            "tbody",
                            null,
                            Q.itens.map((J) =>
                              o.default.createElement(
                                "tr",
                                { key: J.id },
                                o.default.createElement("td", { style: he }, J.pedido),
                                o.default.createElement("td", { style: he }, J.produto),
                                o.default.createElement(
                                  "td",
                                  { style: { ...he, fontWeight: 800 } },
                                  J.localizacao || "-",
                                ),
                                o.default.createElement("td", { style: he }, Un(J.qtd)),
                                o.default.createElement("td", { style: he }, Un(J.estoque_fd)),
                                o.default.createElement("td", { style: he }, J.transporte),
                                o.default.createElement("td", { style: he }, wc(J.lib_estoque), " ", fl(J.lib_estoque)),
                                o.default.createElement(
                                  "td",
                                  { style: he },
                                  (() => {
                                    let ie = wt(J.pedido, J.produto),
                                      ve = de[ie],
                                      P = _[ie] ? xa(_[ie]) : null;
                                    return ve || P
                                      ? o.default.createElement(
                                          "span",
                                          { style: { display: "inline-flex", gap: 4, flexWrap: "wrap" } },
                                          ve &&
                                            o.default.createElement(
                                              "span",
                                              { style: { ...lg, background: "#7c3aed", color: "#fff" } },
                                              "📦 Pedido de venda",
                                            ),
                                          P &&
                                            o.default.createElement(
                                              "span",
                                              { style: { ...lg, background: P.bg, color: P.fg } },
                                              "🛒 ",
                                              P.texto,
                                            ),
                                        )
                                      : "—";
                                  })(),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                ),
              ),
              !Ft.length &&
                o.default.createElement(
                  "tr",
                  null,
                  o.default.createElement(
                    "td",
                    { style: { ...he, textAlign: "center", color: s.txtMuted, padding: 24 }, colSpan: 8 },
                    f.length ? "Nenhuma lista encontrada." : "Nenhuma lista gerada ainda.",
                  ),
                ),
            ),
          ),
        ),
      ),
  );
}
var va = ["1030", "0104", "0105", "1040"],
  L2 =
    "filial,pedido,cod_cliente,transportadora,cod,produto,qtd_lib,est_eq_01,est_bbb_01,lib_financeiro,lib_estoque,agendado_para,atualizado_em";
async function N2() {
  let e = [];
  for (let t = 0; t < 1e4; t += 1e3) {
    let n = await ye(
      "/bloq_estoque_agente?select=" +
        L2 +
        "&filial=in.(" +
        va.join(",") +
        ")&order=lib_estoque.asc.nullslast,pedido.asc,chave.asc&limit=1000&offset=" +
        t,
    );
    if (!Array.isArray(n) || (e.push(...n), n.length < 1e3)) break;
  }
  return e;
}
async function D2() {
  let e = await ye("/bloq_estoque_agente?select=filial,pedido,lib_estoque&filial=in.(" + va.join(",") + ")&limit=5000"),
    t = Array.isArray(e) ? e : [],
    n = Date.now(),
    a = /* @__PURE__ */ new Map();
  t.forEach((i) => {
    let l = i.filial + "|" + i.pedido,
      d = ml(i, n),
      u = a.get(l);
    (u === void 0 || (d !== null && (u === null || d > u))) && a.set(l, d);
  });
  let r = 0;
  return (
    a.forEach((i) => {
      i !== null && i > 72 * 36e5 && (r += 1);
    }),
    { pedidos: a.size, itens: t.length, mais72: r }
  );
}
function sc(e) {
  if (!e) return "—";
  let t = new Date(e);
  return Number.isNaN(t.getTime())
    ? "—"
    : t.toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
}
function fg(e) {
  let t = String(e || "").match(/^(\d{4})-(\d{2})-(\d{2})/);
  return t ? `${t[3]}/${t[2]}/${t[1]}` : "—";
}
function ol(e) {
  if (e == null || e === "") return "—";
  let t = Number(e);
  return Number.isNaN(t) ? "—" : t.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
}
function ml(e, t) {
  let n = e.lib_estoque ? new Date(e.lib_estoque).getTime() : NaN;
  return Number.isNaN(n) ? null : Math.max(0, t - n);
}
function lc(e) {
  if (e === null) return "—";
  let t = Math.floor(e / 36e5),
    n = Math.floor(t / 24);
  return n > 0 ? `${n}d ${t % 24}h` : `${t}h`;
}
function T2({ ativo: e }) {
  let [t, n] = (0, o.useState)([]),
    [a, r] = (0, o.useState)(false),
    [i, l] = (0, o.useState)(false),
    [d, u] = (0, o.useState)(""),
    [p, c] = (0, o.useState)(""),
    [g, f] = (0, o.useState)(Date.now()),
    [x, w] = (0, o.useState)("todas"),
    [F, v] = (0, o.useState)(""),
    m = (0, o.useCallback)(async () => {
      r(true);
      try {
        let [E, A] = await Promise.all([
          N2(),
          ye("/via_leitor_atualizacoes?select=atualizado_em&origem=eq.bloq_estoque&limit=1").catch(() => null),
        ]);
        (n(E), c(Array.isArray(A) && A[0] ? A[0].atualizado_em : ""), f(Date.now()), u(""), l(true));
      } catch (E) {
        let A = String(E.message || E);
        u(
          /PGRST205|Could not find the table|404/.test(A)
            ? 'A tabela bloq_estoque_agente ainda não existe no Supabase. Rode o SQL criar_bloq_estoque_agente.sql e deixe o agente "Pedidos c/ Bloq. Estoque" rodando.'
            : "Não foi possível carregar: " + A,
        );
      } finally {
        r(false);
      }
    }, []);
  (0, o.useEffect)(() => {
    if (!e) return;
    m();
    let E = setInterval(m, 300 * 1e3);
    return () => clearInterval(E);
  }, [e, m]);
  let h = (0, o.useMemo)(() => {
      let E = {};
      return (
        va.forEach((A) => (E[A] = /* @__PURE__ */ new Set())),
        t.forEach((A) => {
          E[A.filial] && E[A.filial].add(String(A.pedido));
        }),
        E
      );
    }, [t]),
    y = (0, o.useMemo)(() => new Set(t.map((E) => E.filial + "|" + E.pedido)).size, [t]),
    B = (0, o.useMemo)(() => {
      let E = Gn(F);
      return t.filter((A) =>
        x !== "todas" && A.filial !== x
          ? false
          : E
            ? Gn([A.pedido, A.cod_cliente, A.transportadora, A.produto].join(" ")).includes(E)
            : true,
      );
    }, [t, x, F]),
    k = (0, o.useMemo)(() => {
      let E = /* @__PURE__ */ new Set(),
        A = 0,
        I = null,
        V = /* @__PURE__ */ new Set();
      return (
        B.forEach((D) => {
          (E.add(D.filial + "|" + D.pedido), (A += Number(D.qtd_lib) || 0));
          let O = ml(D, g);
          (O !== null && (I === null || O > I) && (I = O), D.agendado_para && V.add(D.filial + "|" + D.pedido));
        }),
        { pedidos: E.size, itens: B.length, qtd: A, maior: I, agendados: V.size }
      );
    }, [B, g]),
    L = () => {
      let I =
          "\uFEFF" +
          [
            [
              "Filial",
              "Pedido",
              "Cliente",
              "Transportadora",
              "Cód.",
              "Produto",
              "Qtd liberada",
              "EST-EQ-01",
              "EST-BBB-01",
              "Lib. financeiro",
              "Bloqueado há",
              "Agendado para",
            ],
            ...B.map((O) => [
              O.filial,
              O.pedido,
              O.cod_cliente || "",
              O.transportadora || "",
              O.cod || "",
              O.produto || "",
              O.qtd_lib ?? "",
              O.est_eq_01 ?? "",
              O.est_bbb_01 ?? "",
              O.lib_financeiro ? sc(O.lib_financeiro) : "",
              lc(ml(O, g)),
              O.agendado_para ? fg(O.agendado_para) : "",
            ]),
          ].map((O) => O.map((H) => `"${String(H).replace(/"/g, '""')}"`).join(";")).join(`
`),
        V = URL.createObjectURL(new Blob([I], { type: "text/csv;charset=utf-8;" })),
        D = document.createElement("a");
      ((D.href = V),
        (D.download = `sem_estoque_${x === "todas" ? "filiais" : x}_${/* @__PURE__ */ new Date().toISOString().slice(0, 10)}.csv`),
        D.click(),
        URL.revokeObjectURL(V));
    },
    C = 2e3,
    _ = [["todas", "Todas as filiais"], ...va.map((E) => [E, E])],
    q = { color: s.txtMuted };
  return o.default.createElement(
    "div",
    { style: { fontFamily: s.font } },
    o.default.createElement("style", null, Bi),
    o.default.createElement(Wt, {
      titulo: "Sem estoque",
      extraInfo: "Pedidos com bloqueio de estoque · filiais " + va.join(", ") + (p ? " · Agente: " + sc(p) : ""),
    }),
    o.default.createElement(
      "div",
      {
        role: "tablist",
        style: { display: "flex", gap: 4, marginBottom: 20, flexWrap: "wrap", borderBottom: `1px solid ${s.bdMid}` },
      },
      _.map(([E, A]) => {
        let I = x === E,
          V = E === "todas" ? y : h[E] ? h[E].size : 0;
        return o.default.createElement(
          "button",
          {
            key: E,
            type: "button",
            role: "tab",
            "aria-selected": I,
            className: "lf-tab",
            onClick: () => {
              w(E);
            },
            style: {
              padding: "10px 16px",
              marginBottom: -1,
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${I ? s.primary : "transparent"}`,
              color: I ? s.primary : s.txtSec,
              fontWeight: I ? 800 : 600,
              fontSize: 13.5,
              cursor: "pointer",
              fontFamily: s.font,
              display: "flex",
              alignItems: "center",
              gap: 8,
            },
          },
          A,
          o.default.createElement(
            "span",
            {
              style: {
                background: V > 0 ? s.primaryLight : s.bgStripe,
                color: V > 0 ? s.primary : s.txtMuted,
                borderRadius: s.radius.pill,
                padding: "1px 8px",
                fontSize: 11.5,
                fontWeight: 800,
              },
            },
            V,
          ),
        );
      }),
    ),
    d && o.default.createElement($e, { tipo: "erro" }, d),
    !d &&
      o.default.createElement(
        o.default.Fragment,
        null,
        o.default.createElement(
          Ea,
          null,
          o.default.createElement(Me, {
            rotulo: "Pedidos",
            valor: k.pedidos,
            tipo: k.pedidos ? "warn" : "ok",
            detalhe: x === "todas" ? "Filiais " + va.join(", ") : "Filial " + x,
          }),
          o.default.createElement(Me, { rotulo: "Itens", valor: k.itens, tipo: "info" }),
          o.default.createElement(Me, { rotulo: "Qtd liberada", valor: ol(k.qtd), tipo: "neutro" }),
          o.default.createElement(Me, {
            rotulo: "Mais antigo",
            valor: lc(k.maior),
            tipo: k.maior !== null && k.maior > 72 * 36e5 ? "erro" : "neutro",
            detalhe: "tempo bloqueado",
          }),
          o.default.createElement(Me, { rotulo: "Agendados", valor: k.agendados, tipo: "neutro" }),
        ),
        o.default.createElement(
          ft,
          {
            titulo: x === "todas" ? "Pedidos sem estoque" : "Filial " + x,
            subtitulo: a ? "Atualizando..." : "Atualiza sozinho a cada 5 minutos",
            acoes: o.default.createElement(
              o.default.Fragment,
              null,
              o.default.createElement("input", {
                className: "lf-input",
                style: { ...Ke, width: 240 },
                placeholder: "Pedido, cliente, produto, transportadora",
                value: F,
                onChange: (E) => v(E.target.value),
              }),
              o.default.createElement(ge, { onClick: m, disabled: a }, a ? "Atualizando..." : "↻ Atualizar"),
              o.default.createElement(ge, { onClick: L, disabled: !B.length }, "Exportar CSV"),
            ),
            semPadding: true,
          },
          i
            ? B.length === 0
              ? o.default.createElement(
                  Zt,
                  null,
                  F
                    ? "Nenhum pedido encontrado com esses filtros."
                    : x === "todas"
                      ? "Nenhum pedido com bloqueio de estoque nas filiais " + va.join(", ") + " no momento."
                      : "Nenhum pedido com bloqueio de estoque na filial " + x + " no momento.",
                )
              : o.default.createElement(
                  o.default.Fragment,
                  null,
                  o.default.createElement(
                    ko,
                    {
                      altura: "65vh",
                      compacta: true,
                      numericas: ["Qtd lib.", "EST-EQ-01", "EST-BBB-01"],
                      colunas: [
                        "Filial",
                        "Pedido",
                        "Cliente",
                        "Transportadora",
                        "Cód.",
                        "Produto",
                        "Qtd lib.",
                        "EST-EQ-01",
                        "EST-BBB-01",
                        "Lib. financeiro",
                        "Bloqueado há",
                        "Agendado para",
                      ],
                    },
                    B.slice(0, C).map((E, A) => {
                      let I = ml(E, g),
                        V = (D) => (Number(D) === 0 || D === null || D === void 0 ? q : void 0);
                      return o.default.createElement(
                        "tr",
                        { key: E.filial + E.pedido + E.produto + A },
                        o.default.createElement("td", { style: oe }, E.filial),
                        o.default.createElement("td", { style: { ...oe, fontWeight: 700 } }, E.pedido),
                        o.default.createElement("td", { style: oe }, E.cod_cliente || "—"),
                        o.default.createElement("td", { style: oe }, E.transportadora || "—"),
                        o.default.createElement("td", { style: oe }, E.cod || "—"),
                        o.default.createElement("td", { style: oe }, E.produto || "—"),
                        o.default.createElement("td", { style: { ...pt, fontWeight: 700 } }, ol(E.qtd_lib)),
                        o.default.createElement("td", { style: { ...pt, ...V(E.est_eq_01) } }, ol(E.est_eq_01)),
                        o.default.createElement("td", { style: { ...pt, ...V(E.est_bbb_01) } }, ol(E.est_bbb_01)),
                        o.default.createElement("td", { style: oe }, sc(E.lib_financeiro)),
                        o.default.createElement(
                          "td",
                          { style: oe },
                          I === null
                            ? "—"
                            : o.default.createElement(
                                qo,
                                { tipo: I > 72 * 36e5 ? "erro" : I > 24 * 36e5 ? "warn" : "neutro" },
                                lc(I),
                              ),
                        ),
                        o.default.createElement(
                          "td",
                          { style: oe },
                          E.agendado_para ? o.default.createElement(qo, { tipo: "info" }, fg(E.agendado_para)) : "—",
                        ),
                      );
                    }),
                  ),
                  B.length > C &&
                    o.default.createElement(
                      "div",
                      { style: { padding: "10px 16px", fontSize: 12, color: s.txtMuted } },
                      "Mostrando ",
                      C,
                      " de ",
                      B.length,
                      " itens. Use a busca ou exporte o CSV para ver tudo.",
                    ),
                )
            : o.default.createElement(Zt, null, "Carregando..."),
        ),
      ),
  );
}
function z2({ ativo: e }) {
  let [t, n] = (0, o.useState)(""),
    [a, r] = (0, o.useState)(false),
    [i, l] = (0, o.useState)(""),
    [d, u] = (0, o.useState)("fila"),
    [p, c] = (0, o.useState)(3),
    [g, f] = (0, o.useState)([]),
    [x, w] = (0, o.useState)([]),
    [F, v] = (0, o.useState)(false),
    [m, h] = (0, o.useState)(""),
    [y, B] = (0, o.useState)(0),
    [k, L] = (0, o.useState)(""),
    [C, _] = (0, o.useState)(null),
    [q, E] = (0, o.useState)(""),
    [A, I] = (0, o.useState)(null),
    [V, D] = (0, o.useState)("todas_ativas"),
    [O, H] = (0, o.useState)(""),
    [M, Q] = (0, o.useState)(""),
    [Y, de] = (0, o.useState)("hoje"),
    [ce, W] = (0, o.useState)(""),
    [S, te] = (0, o.useState)(""),
    [re, be] = (0, o.useState)(""),
    [pe, $] = (0, o.useState)("recente"),
    ee = (0, o.useCallback)(
      async (b) => {
        b || v(true);
        try {
          let j = Y === "tudo" ? 0 : Y === "30d" ? 31 : 8,
            Z = j ? "&inicio=gte." + encodeURIComponent(new Date(Oo(Date.now()) - j * 864e5).toISOString()) : "",
            ae = encodeURIComponent(new Date(Oo(Date.now()) - 7 * 864e5).toISOString()),
            [K, Ee, he] = await Promise.all([
              ye("/separacao_listas?select=*&status=eq.em_separacao&order=inicio.asc&limit=1000"),
              Xn("/separacao_listas?select=*&status=eq.finalizada" + Z + "&order=id.desc"),
              ye(
                "/historico_listas?select=lista,data_hora,usuario,filial,transportadora,pedidos,unidades,impresso,status&data_hora=gte." +
                  ae +
                  "&order=id.asc&limit=1000",
              ),
            ]),
            z = /* @__PURE__ */ new Map();
          ([...(Array.isArray(Ee) ? Ee : []), ...(Array.isArray(K) ? K : [])].forEach((U) =>
            z.set(String(U.id), ul(U)),
          ),
            f([...z.values()]),
            w(Array.isArray(he) ? he : []),
            h(""),
            B(Date.now()));
        } catch (j) {
          h(j.message || "Não foi possível carregar.");
        } finally {
          v(false);
        }
      },
      [Y],
    );
  (0, o.useEffect)(() => {
    if (!e) return;
    ee(false);
    let b = setInterval(() => {
      document.hidden || ee(true);
    }, 15e3);
    return () => clearInterval(b);
  }, [e, ee]);
  let se = (0, o.useMemo)(() => {
      let b = new Map(x.map((j) => [Rt(j.lista), j]));
      return g.map((j) => {
        let Z = b.get(Rt(j.lista));
        return Z
          ? {
              ...j,
              geradaEm: j.geradaEm || (Z.data_hora ? new Date(Z.data_hora).getTime() : null),
              transportadora: j.transportadora || Z.transportadora || "",
              filial: j.filial || Z.filial || "",
              pedidos: j.pedidos != null ? j.pedidos : Z.pedidos,
              unidades: j.unidades != null ? j.unidades : Z.unidades,
            }
          : j;
      });
    }, [g, x]),
    Ae = (0, o.useMemo)(() => se.filter((b) => b.status === "em_separacao").sort((b, j) => b.inicio - j.inicio), [se]),
    Ne = (0, o.useMemo)(
      () =>
        se
          .filter((b) => b.status === "finalizada" && !b.oculto)
          .sort((b, j) => (j.fim || j.inicio) - (b.fim || b.inicio)),
      [se],
    ),
    Ce = (0, o.useMemo)(() => {
      let b = new Set(g.map((Z) => Rt(Z.lista))),
        j = Oo(Date.now()) - (p - 1) * 864e5;
      return x
        .filter(
          (Z) =>
            String(Z.status || "ATIVA").toUpperCase() !== "CANCELADA" &&
            new Date(Z.data_hora).getTime() >= j &&
            !b.has(Rt(Z.lista)),
        )
        .sort((Z, ae) => new Date(Z.data_hora).getTime() - new Date(ae.data_hora).getTime());
    }, [g, x, p]),
    Ie = (0, o.useMemo)(
      () =>
        [.../* @__PURE__ */ new Set([...Ec, ...g.map((b) => b.separador)])]
          .filter(Boolean)
          .sort((b, j) => b.localeCompare(j, "pt-BR")),
      [g],
    ),
    Be = (b) =>
      b.status === "em_separacao"
        ? `A lista ${b.lista} já está em separação por ${b.separador}.`
        : `A lista ${b.lista} já foi finalizada e não pode ser selecionada novamente.`,
    Ve = (b) => {
      let j = String(b || "").trim();
      j && (n(j), r(false), l(""), _(null), u("fila"));
    },
    lt = () => {
      (n(""), _(null), L(""));
    },
    G = async (b) => {
      if (!t) return;
      _(null);
      let j = b && typeof b == "object" ? b : null;
      E(j ? "ini:" + j.lista : "ini");
      try {
        if (!j) {
          let K = String(b || k || "").trim();
          if (!K) {
            _({ tipo: "erro", texto: "Informe o número da lista." });
            return;
          }
          let Ee = /^\d+$/.test(K) ? "Lista " + K : K.replace(/^lista\s*/i, "Lista "),
            he = await ye(
              "/historico_listas?select=lista,data_hora,filial,transportadora,pedidos,unidades,status&lista=ilike." +
                encodeURIComponent(Ee) +
                "&limit=1",
            );
          if (!Array.isArray(he) || !he.length) {
            _({ tipo: "erro", texto: `A lista "${Ee}" não foi encontrada nas listas geradas.` });
            return;
          }
          if (((j = he[0]), String(j.status || "ATIVA").toUpperCase() === "CANCELADA")) {
            _({ tipo: "erro", texto: `A ${j.lista} foi cancelada e não pode ser separada.` });
            return;
          }
        }
        let Z = {
            lista: j.lista,
            separador: t,
            filial: j.filial || null,
            transportadora: j.transportadora || null,
            pedidos: j.pedidos != null ? Number(j.pedidos) : null,
            unidades: j.unidades != null ? Number(j.unidades) : null,
            gerada_em: j.data_hora || null,
          },
          ae = (K) =>
            ye("/separacao_listas", {
              method: "POST",
              body: JSON.stringify(K),
              headers: { Prefer: "return=representation" },
            });
        try {
          try {
            await ae(Z);
          } catch (K) {
            if (/gerada_em/i.test(K.message)) {
              let { gerada_em: Ee, ...he } = Z;
              await ae(he);
            } else throw K;
          }
        } catch (K) {
          if (/23505|duplicate|unique/i.test(K.message)) {
            let Ee = await ye("/separacao_listas?select=*&lista=eq." + encodeURIComponent(j.lista) + "&limit=1");
            (_({
              tipo: "erro",
              texto: Array.isArray(Ee) && Ee.length ? Be(ul(Ee[0])) : `A ${j.lista} já foi iniciada.`,
            }),
              await ee(true));
            return;
          }
          throw K;
        }
        (L(""), _({ tipo: "ok", texto: `${j.lista} iniciada por ${t}.` }), await ee(true));
      } catch (Z) {
        _({ tipo: "erro", texto: "Não foi possível iniciar a separação: " + Z.message });
      } finally {
        E("");
      }
    },
    me = (b) => I(b),
    je = async (b, j) => {
      (I(null), E("fin:" + b.id));
      try {
        let Z = "/separacao_listas?id=eq." + encodeURIComponent(b.id) + "&status=eq.em_separacao",
          ae = (Ee) =>
            ye(Z, { method: "PATCH", body: JSON.stringify(Ee), headers: { Prefer: "return=representation" } }),
          K;
        try {
          K = await ae({ status: "finalizada", faturou_lista: j, faturador: j ? b.separador : null });
        } catch (Ee) {
          if (/faturou_lista|faturador/i.test(String(Ee.message))) K = await ae({ status: "finalizada" });
          else throw Ee;
        }
        if (!Array.isArray(K) || !K.length)
          _({ tipo: "warn", texto: `A ${b.lista} já tinha sido finalizada ou cancelada em outro lugar.` });
        else {
          let Ee = ul(K[0]);
          _({
            tipo: "ok",
            texto:
              `${b.lista} finalizada em ${en(Ee.duracao != null ? Ee.duracao : Date.now() - b.inicio)}. ` +
              (j ? `Faturador: ${b.separador}. ` : "Escolha quem faturou na aba Lista Faturamento › Via Leitor. ") +
              "Ela não poderá ser selecionada novamente.",
          });
        }
        await ee(true);
      } catch (Z) {
        _({ tipo: "erro", texto: "Erro ao finalizar: " + Z.message });
      } finally {
        E("");
      }
    },
    Ye = async (b) => {
      if (
        window.confirm(
          `Cancelar a separação da lista ${b.lista}? Como ela não foi finalizada, volta para a fila e fica disponível de novo.`,
        )
      ) {
        E("can:" + b.id);
        try {
          (await ye("/separacao_listas?id=eq." + encodeURIComponent(b.id) + "&status=eq.em_separacao", {
            method: "DELETE",
            headers: { Prefer: "return=minimal" },
          }),
            _({ tipo: "info", texto: `Separação da ${b.lista} cancelada. A lista voltou para a fila.` }),
            await ee(true));
        } catch (j) {
          _({ tipo: "erro", texto: "Erro ao cancelar: " + j.message });
        } finally {
          E("");
        }
      }
    },
    Se = async (b) => {
      if (
        window.confirm(`Ocultar o registro da lista ${b.lista} do histórico?

A lista continuará bloqueada e não poderá ser utilizada novamente.`)
      )
        try {
          (await ye("/separacao_listas?id=eq." + encodeURIComponent(b.id), {
            method: "PATCH",
            body: JSON.stringify({ oculto: true }),
            headers: { Prefer: "return=minimal" },
          }),
            await ee(true));
        } catch (j) {
          _({ tipo: "erro", texto: "Erro ao ocultar: " + j.message });
        }
    },
    De = async () => {
      if (!Ne.length) {
        window.alert("O histórico já está vazio.");
        return;
      }
      if (
        window.confirm(`Ocultar os ${Ne.length} registros do histórico?

As listas continuarão bloqueadas e não poderão ser utilizadas novamente.`)
      )
        try {
          (await ye("/separacao_listas?status=eq.finalizada&oculto=eq.false", {
            method: "PATCH",
            body: JSON.stringify({ oculto: true }),
            headers: { Prefer: "return=minimal" },
          }),
            await ee(true));
        } catch (b) {
          _({ tipo: "erro", texto: "Erro ao limpar: " + b.message });
        }
    },
    xe = (0, o.useMemo)(() => {
      if (Y === "tudo") return Ne;
      let b = Y === "hoje" ? Oo(Date.now()) : Y === "7d" ? Oo(Date.now()) - 6 * 864e5 : Oo(Date.now()) - 29 * 864e5;
      return Ne.filter((j) => j.inicio >= b);
    }, [Ne, Y]),
    ke = (0, o.useMemo)(() => Ne.filter((b) => b.inicio >= Oo(Date.now())), [Ne]),
    we = (0, o.useMemo)(() => {
      let b = ce.trim().toLowerCase(),
        j = xe.filter(
          (ae) =>
            (!b || String(ae.lista).toLowerCase().includes(b)) &&
            (!S || ae.separador === S) &&
            (!re ||
              (re === "ok"
                ? Number(ae.duracao || 0) <= ha
                : re === "lim"
                  ? Number(ae.duracao || 0) > ct
                  : Number(ae.duracao || 0) > ha)),
        ),
        Z = {
          recente: (ae, K) => K.inicio - ae.inicio,
          antiga: (ae, K) => ae.inicio - K.inicio,
          lenta: (ae, K) => Number(K.duracao || 0) - Number(ae.duracao || 0),
          rapida: (ae, K) => Number(ae.duracao || 0) - Number(K.duracao || 0),
        }[pe];
      return [...j].sort(Z);
    }, [xe, ce, S, re, pe]),
    Qe = () => {
      if (!we.length) {
        window.alert("Não há registros para exportar com os filtros atuais.");
        return;
      }
      let j =
          "\uFEFF" +
          [
            [
              "Data",
              "Lista",
              "Separador",
              "Transportadora",
              "Gerada",
              "Espera",
              "Pedidos",
              "Itens",
              "Inicio",
              "Fim",
              "Tempo",
              "Minutos",
              "Situacao",
            ],
            ...we.map((K) => [
              dl(K.inicio),
              K.lista,
              K.separador,
              K.transportadora || "",
              K.geradaEm ? dl(K.geradaEm) + " " + tl(K.geradaEm) : "",
              jn(K) != null ? en(jn(K)) : "",
              K.pedidos == null ? "" : K.pedidos,
              K.unidades == null ? "" : K.unidades,
              tl(K.inicio),
              K.fim ? tl(K.fim) : "",
              en(K.duracao),
              (Number(K.duracao || 0) / 6e4).toFixed(2).replace(".", ","),
              Number(K.duracao || 0) > ct ? "Acima de 1h" : Number(K.duracao || 0) <= ha ? "Na meta" : "Acima da meta",
            ]),
          ].map((K) => K.map((Ee) => `"${String(Ee).replace(/"/g, '""')}"`).join(";")).join(`
`),
        Z = URL.createObjectURL(new Blob([j], { type: "text/csv;charset=utf-8;" })),
        ae = document.createElement("a");
      ((ae.href = Z),
        (ae.download = `separacoes_${/* @__PURE__ */ new Date().toISOString().slice(0, 10)}.csv`),
        ae.click(),
        URL.revokeObjectURL(Z));
    },
    Xe = o.default.createElement(Wt, {
      titulo: "Separação de Lista",
      extraInfo: "As listas geradas aparecem na fila; o separador inicia e finaliza cada uma",
      actions: t
        ? o.default.createElement(
            "div",
            { style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" } },
            o.default.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "4px 12px 4px 4px",
                  borderRadius: s.radius.pill,
                  border: `1px solid ${s.bdMid}`,
                  background: s.bgCard,
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: s.txtSec,
                },
              },
              o.default.createElement(
                "span",
                {
                  style: {
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: s.primaryLight,
                    color: s.primary,
                    fontWeight: 800,
                    fontSize: 11.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                },
                ig(t),
              ),
              "Separador: ",
              o.default.createElement("b", { style: { color: s.txtPri } }, t),
            ),
            o.default.createElement(ge, { onClick: lt }, "Trocar separador"),
          )
        : null,
    });
  if (!t)
    return o.default.createElement(
      "div",
      { style: { fontFamily: s.font } },
      o.default.createElement("style", null, Bi),
      Xe,
      o.default.createElement(
        ft,
        {
          titulo: "Quem vai separar agora?",
          subtitulo: "Selecione seu nome. As listas iniciadas depois disso ficam registradas em seu nome.",
        },
        o.default.createElement(
          "div",
          { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 12 } },
          Ec.map((b) =>
            o.default.createElement(
              "button",
              {
                key: b,
                type: "button",
                className: "lf-btn",
                onClick: () => Ve(b),
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  borderRadius: s.radius.lg,
                  border: `1px solid ${s.bdMid}`,
                  background: s.bgCard,
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: s.font,
                },
              },
              o.default.createElement(
                "span",
                {
                  style: {
                    width: 40,
                    height: 40,
                    flex: "0 0 auto",
                    borderRadius: "50%",
                    background: s.primaryLight,
                    color: s.primary,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                },
                ig(b),
              ),
              o.default.createElement(
                "span",
                null,
                o.default.createElement(
                  "span",
                  { style: { display: "block", fontWeight: 800, fontSize: 14, color: s.txtPri } },
                  b,
                ),
                o.default.createElement(
                  "span",
                  { style: { display: "block", fontSize: 12, color: s.txtMuted, marginTop: 2 } },
                  "Usar este separador",
                ),
              ),
            ),
          ),
          o.default.createElement(
            "button",
            {
              type: "button",
              className: "lf-btn",
              onClick: () => r(true),
              style: {
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderRadius: s.radius.lg,
                border: `1.5px dashed ${s.bdMid}`,
                background: s.bgStripe,
                cursor: "pointer",
                textAlign: "left",
                fontFamily: s.font,
              },
            },
            o.default.createElement(
              "span",
              {
                style: {
                  width: 40,
                  height: 40,
                  flex: "0 0 auto",
                  borderRadius: "50%",
                  background: s.bgMuted,
                  color: s.txtSec,
                  fontWeight: 800,
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              },
              "+",
            ),
            o.default.createElement(
              "span",
              null,
              o.default.createElement(
                "span",
                { style: { display: "block", fontWeight: 800, fontSize: 14, color: s.txtPri } },
                "Ajudante de outro setor",
              ),
              o.default.createElement(
                "span",
                { style: { display: "block", fontSize: 12, color: s.txtMuted, marginTop: 2 } },
                "Digitar nome manualmente",
              ),
            ),
          ),
        ),
        a &&
          o.default.createElement(
            "div",
            { style: { marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" } },
            o.default.createElement(
              v2,
              { rotulo: "Nome do ajudante" },
              o.default.createElement("input", {
                className: "lf-input",
                autoFocus: true,
                style: { ...Ke, width: 260 },
                placeholder: "Digite o nome da pessoa",
                value: i,
                onChange: (b) => l(b.target.value),
                onKeyDown: (b) => {
                  b.key === "Enter" && Ve(i);
                },
              }),
            ),
            o.default.createElement(ge, { tipo: "primario", onClick: () => Ve(i) }, "Usar este nome"),
            o.default.createElement(
              ge,
              {
                onClick: () => {
                  (r(false), l(""));
                },
              },
              "Cancelar",
            ),
          ),
      ),
    );
  let ue = (() => {
      let b = V === "todas_ativas" ? Ae : V === "finalizadas" ? Ne : [...Ae, ...Ne];
      return (
        O && (b = b.filter((j) => Rt(j.separador) === Rt(O))),
        [...b]
          .sort((j, Z) =>
            j.status !== Z.status ? (j.status === "em_separacao" ? -1 : 1) : (Z.fim || Z.inicio) - (j.fim || j.inicio),
          )
          .slice(0, 50)
      );
    })(),
    Pe = (() => {
      let b = M.trim().toLowerCase();
      return Ne.filter(
        (j) => !b || String(j.lista).toLowerCase().includes(b) || String(j.separador).toLowerCase().includes(b),
      );
    })(),
    dt = ke.reduce((b, j) => b + Number(j.duracao || 0), 0),
    Tt = o.default.createElement(
      o.default.Fragment,
      null,
      C &&
        o.default.createElement(
          "div",
          { style: { marginTop: -8, marginBottom: 16 } },
          o.default.createElement($e, { tipo: C.tipo }, C.texto),
        ),
      m &&
        o.default.createElement(
          "div",
          { style: { marginTop: -8, marginBottom: 16 } },
          o.default.createElement($e, { tipo: "erro" }, "Não foi possível carregar os dados: ", m),
        ),
    ),
    _e = Ce.filter((b) => Date.now() - new Date(b.data_hora).getTime() > ct).length,
    yt = Ae.filter((b) => Date.now() - b.inicio > ct).length,
    zt = o.default.createElement(
      ft,
      {
        titulo: "Fila de listas",
        subtitulo: "Listas geradas em Lista Faturamento que ainda não foram separadas",
        acoes: o.default.createElement(
          o.default.Fragment,
          null,
          o.default.createElement(
            "select",
            { className: "lf-input", style: Ke, value: p, onChange: (b) => c(Number(b.target.value)) },
            o.default.createElement("option", { value: 1 }, "Hoje"),
            o.default.createElement("option", { value: 3 }, "Últimos 3 dias"),
            o.default.createElement("option", { value: 7 }, "Últimos 7 dias"),
          ),
          o.default.createElement(ge, { onClick: () => ee(false), disabled: F }, F ? "Atualizando..." : "🔄 Atualizar"),
        ),
      },
      o.default.createElement(
        "div",
        { style: { display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" } },
        o.default.createElement("input", {
          className: "lf-input",
          style: { ...Ke, flex: "1 1 200px" },
          inputMode: "numeric",
          autoComplete: "off",
          placeholder: "Iniciar pelo número da lista (ex.: 14)",
          value: k,
          onChange: (b) => L(b.target.value),
          onKeyDown: (b) => {
            b.key === "Enter" && G();
          },
        }),
        o.default.createElement(ge, { tipo: "primario", disabled: q === "ini", onClick: () => G() }, "▶ Iniciar"),
      ),
      _e > 0 &&
        o.default.createElement(
          "div",
          { style: { marginBottom: 14, marginTop: -4 } },
          o.default.createElement(
            $e,
            { tipo: "erro" },
            _e,
            " ",
            Ro(_e, "lista está esperando", "listas estão esperando"),
            " há mais de 1h para ser iniciada.",
          ),
        ),
      Ce.length === 0
        ? o.default.createElement(
            Zt,
            null,
            "Nenhuma lista aguardando separação. Quando uma lista for gerada, ela aparece aqui.",
          )
        : o.default.createElement(
            ko,
            {
              altura: 420,
              colunas: ["Lista", "Gerada", "Espera", "Filial / Transportadora", "Pedidos", "Itens", "Impressa", ""],
              numericas: ["Pedidos", "Itens"],
            },
            Ce.map((b) =>
              o.default.createElement(
                "tr",
                { key: b.lista },
                o.default.createElement("td", { style: { ...oe, fontWeight: 800 } }, b.lista),
                o.default.createElement("td", { style: oe, title: Vn(b.data_hora) }, Zo(b.data_hora)),
                o.default.createElement(
                  "td",
                  { style: oe },
                  o.default.createElement(g2, { desde: new Date(b.data_hora).getTime() }),
                ),
                o.default.createElement(
                  "td",
                  { style: oe },
                  o.default.createElement("b", null, b.filial),
                  " ",
                  o.default.createElement("span", { style: { color: s.txtSec } }, "· ", b.transportadora),
                ),
                o.default.createElement("td", { style: pt }, b.pedidos || 0),
                o.default.createElement("td", { style: pt }, b.unidades || 0),
                o.default.createElement(
                  "td",
                  { style: oe },
                  o.default.createElement(
                    qo,
                    { tipo: String(b.impresso || "NÃO").toUpperCase() === "SIM" ? "ok" : "neutro" },
                    String(b.impresso || "NÃO").toUpperCase() === "SIM" ? "Sim" : "Não",
                  ),
                ),
                o.default.createElement(
                  "td",
                  { style: oe },
                  o.default.createElement(
                    ge,
                    { pequeno: true, tipo: "verde", disabled: q === "ini:" + b.lista, onClick: () => G(b) },
                    "▶ Iniciar",
                  ),
                ),
              ),
            ),
          ),
    ),
    po = o.default.createElement(
      ft,
      { titulo: "Em separação agora", subtitulo: "Cada lista iniciada tem seu cronômetro (meta de 15 min)" },
      o.default.createElement(
        Ea,
        null,
        o.default.createElement(Me, { rotulo: "Em andamento", valor: Ae.length, tipo: "info" }),
        o.default.createElement(Me, {
          rotulo: "Acima de 1h",
          valor: yt,
          tipo: yt ? "erro" : "ok",
          detalhe: "separação passou do limite",
        }),
        o.default.createElement(Me, { rotulo: "Finalizadas hoje", valor: ke.length, tipo: "ok" }),
        o.default.createElement(Me, {
          rotulo: "Tempo médio hoje",
          valor: ke.length ? Hn(dt / ke.length) : "--:--",
          tipo: "neutro",
        }),
        o.default.createElement(Me, {
          rotulo: "Mais rápida hoje",
          valor: ke.length ? Hn(Math.min(...ke.map((b) => Number(b.duracao || 0)))) : "--:--",
          tipo: "neutro",
        }),
      ),
      Ae.length === 0
        ? o.default.createElement(Zt, null, "Nenhuma lista em separação.")
        : o.default.createElement(
            "div",
            { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: 12 } },
            Ae.map((b) =>
              o.default.createElement(
                "div",
                {
                  key: b.id,
                  "data-lista": b.lista,
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    flexWrap: "wrap",
                    padding: "12px 14px",
                    border: `1px solid ${s.bdLight}`,
                    borderLeft: `4px solid ${Date.now() - b.inicio > ct ? s.red : s.blue}`,
                    borderRadius: s.radius.lg,
                    background: s.bgStripe,
                  },
                },
                o.default.createElement(
                  "div",
                  { style: { flex: "1 1 150px", minWidth: 130 } },
                  o.default.createElement(
                    "div",
                    {
                      style: {
                        fontWeight: 800,
                        fontSize: 14,
                        color: s.txtPri,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      },
                    },
                    b.lista,
                    Date.now() - b.inicio > ct && o.default.createElement(qo, { tipo: "erro" }, "Passou de 1h"),
                  ),
                  o.default.createElement(
                    "div",
                    { style: { fontSize: 12, color: s.txtSec, marginTop: 2 } },
                    o.default.createElement("b", null, b.separador),
                    " · início ",
                    Zo(b.inicio),
                  ),
                  o.default.createElement(
                    "div",
                    { style: { fontSize: 11.5, color: s.txtMuted, marginTop: 2 } },
                    [
                      b.filial,
                      b.transportadora,
                      b.geradaEm ? `gerada ${Zo(b.geradaEm)}` : "",
                      jn(b) != null ? `esperou ${Hn(jn(b))} para iniciar` : "",
                      b.pedidos != null ? `${b.pedidos} ${Ro(Number(b.pedidos), "pedido", "pedidos")}` : "",
                      b.unidades != null ? `${b.unidades} ${Ro(Number(b.unidades), "item", "itens")}` : "",
                    ]
                      .filter(Boolean)
                      .join(" · "),
                  ),
                ),
                o.default.createElement(sg, { inicio: b.inicio }),
                o.default.createElement(
                  "div",
                  { style: { display: "flex", gap: 6 } },
                  o.default.createElement(
                    ge,
                    { pequeno: true, tipo: "verde", disabled: q === "fin:" + b.id, onClick: () => me(b) },
                    "✓ Finalizar",
                  ),
                  o.default.createElement(
                    ge,
                    { pequeno: true, tipo: "perigo", disabled: q === "can:" + b.id, onClick: () => Ye(b) },
                    "Cancelar",
                  ),
                ),
              ),
            ),
          ),
    ),
    Ut = o.default.createElement(
      ft,
      {
        titulo: "Painel de tempo",
        subtitulo: "Filtre por status e por separador. Listas finalizadas permanecem bloqueadas para novo uso.",
        acoes: o.default.createElement(
          o.default.Fragment,
          null,
          o.default.createElement(
            "select",
            { className: "lf-input", style: Ke, value: V, onChange: (b) => D(b.target.value) },
            o.default.createElement("option", { value: "todas_ativas" }, "Em separação"),
            o.default.createElement("option", { value: "finalizadas" }, "Finalizadas"),
            o.default.createElement("option", { value: "todas" }, "Todas"),
          ),
          o.default.createElement(
            "select",
            { className: "lf-input", style: Ke, value: O, onChange: (b) => H(b.target.value) },
            o.default.createElement("option", { value: "" }, "Separador: todos"),
            Ie.map((b) => o.default.createElement("option", { key: b, value: b }, b)),
          ),
        ),
      },
      ue.length === 0
        ? o.default.createElement(Zt, null, "Nenhuma lista para exibir neste filtro.")
        : o.default.createElement(
            ko,
            {
              colunas: [
                "Lista",
                "Separador",
                "Transportadora",
                "Gerada",
                "Pedidos",
                "Itens",
                "Início",
                "Fim",
                "Status",
                "Tempo",
              ],
              compacta: true,
              numericas: ["Pedidos", "Itens", "Tempo"],
            },
            ue.map((b) => {
              let j = b.status === "em_separacao",
                Z = j ? Date.now() - b.inicio : Number(b.duracao || 0);
              return o.default.createElement(
                "tr",
                { key: b.id },
                o.default.createElement("td", { style: { ...oe, fontWeight: 800 } }, b.lista),
                o.default.createElement("td", { style: oe }, b.separador),
                o.default.createElement("td", { style: oe }, b.transportadora || "—"),
                o.default.createElement("td", { style: oe }, o.default.createElement(rc, { r: b })),
                o.default.createElement("td", { style: pt }, Wn(b.pedidos)),
                o.default.createElement("td", { style: pt }, Wn(b.unidades)),
                o.default.createElement("td", { style: oe }, Zo(b.inicio)),
                o.default.createElement("td", { style: oe }, !j && b.fim ? Zo(b.fim) : "—"),
                o.default.createElement(
                  "td",
                  { style: oe },
                  o.default.createElement(qo, { tipo: j ? "info" : "ok" }, j ? "Em separação" : "Finalizada"),
                ),
                o.default.createElement(
                  "td",
                  { style: { ...pt, fontWeight: 800, color: ll(Z) } },
                  j ? o.default.createElement(sg, { inicio: b.inicio }) : en(Z),
                ),
              );
            }),
          ),
      o.default.createElement(
        "div",
        { style: { fontSize: 11.5, color: s.txtMuted, marginTop: 10 } },
        y ? `Atualizado às ${tl(y)} · atualiza sozinho a cada 15 segundos` : "Carregando...",
      ),
    ),
    nt = o.default.createElement(
      ft,
      {
        titulo: "Histórico de listas",
        subtitulo: ke.length
          ? `${ke.length} ${Ro(ke.length, "lista", "listas")} hoje · ${Pe.length} no total carregado`
          : `${Pe.length} ${Ro(Pe.length, "registro", "registros")}`,
        acoes: o.default.createElement("input", {
          className: "lf-input",
          style: { ...Ke, width: 260 },
          placeholder: "🔍 Buscar lista ou separador",
          value: M,
          onChange: (b) => Q(b.target.value),
        }),
      },
      Pe.length === 0
        ? o.default.createElement(Zt, null, M ? "Nenhuma lista encontrada." : "Nenhuma separação registrada ainda.")
        : o.default.createElement(
            ko,
            {
              colunas: [
                "Lista",
                "Separador",
                "Transportadora",
                "Gerada",
                "Pedidos",
                "Itens",
                "Início",
                "Fim",
                "Tempo",
                "Status",
              ],
              numericas: ["Pedidos", "Itens", "Tempo"],
            },
            Pe.slice(0, 15).map((b) => {
              let j = (jn(b) || 0) > ct,
                Z = Number(b.duracao || 0) > ct,
                ae = j || Z,
                K = j && Z ? "espera e sep." : j ? "na espera" : "na separação";
              return o.default.createElement(
                "tr",
                { key: b.id },
                o.default.createElement("td", { style: { ...oe, fontWeight: 800 } }, b.lista),
                o.default.createElement("td", { style: oe }, b.separador),
                o.default.createElement("td", { style: oe }, b.transportadora || "—"),
                o.default.createElement("td", { style: oe }, o.default.createElement(rc, { r: b })),
                o.default.createElement("td", { style: pt }, Wn(b.pedidos)),
                o.default.createElement("td", { style: pt }, Wn(b.unidades)),
                o.default.createElement("td", { style: oe }, Zo(b.inicio)),
                o.default.createElement("td", { style: oe }, Zo(b.fim)),
                o.default.createElement(
                  "td",
                  { style: { ...pt, fontWeight: 800, color: ll(Number(b.duracao || 0)) } },
                  en(b.duracao),
                ),
                o.default.createElement(
                  "td",
                  { style: oe },
                  o.default.createElement(qo, { tipo: ae ? "erro" : "ok" }, ae ? "Atraso" : "No prazo"),
                  ae &&
                    o.default.createElement(
                      "div",
                      { style: { fontSize: 11, fontWeight: 600, color: s.red, marginTop: 2 } },
                      K,
                    ),
                ),
              );
            }),
          ),
    ),
    At = xe.reduce((b, j) => b + Number(j.duracao || 0), 0),
    kt = xe.filter((b) => Number(b.duracao || 0) <= ha).length,
    It = new Set(xe.map((b) => b.separador)),
    Mt = Y === "hoje" ? 1 : Y === "7d" ? 7 : Y === "30d" ? 30 : Math.max(1, new Set(xe.map((b) => Oo(b.inicio))).size),
    ht = (() => {
      let b = /* @__PURE__ */ new Map();
      return (
        xe.forEach((j) => {
          let Z = b.get(j.separador) || { nome: j.separador, qtd: 0, soma: 0 };
          ((Z.qtd += 1), (Z.soma += Number(j.duracao || 0)), b.set(j.separador, Z));
        }),
        [...b.values()].sort((j, Z) => Z.qtd - j.qtd || j.soma / j.qtd - Z.soma / Z.qtd)
      );
    })(),
    xt = ht.length ? ht[0].qtd : 1,
    Ft = (() => {
      let b = Oo(Date.now()),
        j = [];
      for (let Z = 6; Z >= 0; Z--) {
        let ae = b - Z * 864e5;
        j.push({
          ini: ae,
          qtd: Ne.filter((K) => K.inicio >= ae && K.inicio < ae + 864e5).length,
          rot: new Date(ae).toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", "").slice(0, 3),
          hoje: Z === 0,
        });
      }
      return j;
    })(),
    eo = Math.max(1, ...Ft.map((b) => b.qtd)),
    Wo = { hoje: "Hoje", "7d": "Últimos 7 dias", "30d": "Últimos 30 dias", tudo: "Todo o histórico" }[Y],
    N = o.default.createElement(
      o.default.Fragment,
      null,
      o.default.createElement(
        ft,
        {
          titulo: "Período de análise",
          subtitulo: Wo,
          acoes: o.default.createElement(
            o.default.Fragment,
            null,
            [
              ["hoje", "Hoje"],
              ["7d", "7 dias"],
              ["30d", "30 dias"],
              ["tudo", "Tudo"],
            ].map(([b, j]) =>
              o.default.createElement(ge, { key: b, tipo: Y === b ? "primario" : "neutro", onClick: () => de(b) }, j),
            ),
          ),
        },
        o.default.createElement(
          Ea,
          null,
          o.default.createElement(Me, {
            rotulo: "Listas finalizadas",
            valor: xe.length,
            tipo: "info",
            detalhe: Y === "hoje" ? "no dia de hoje" : `${(xe.length / Mt).toFixed(1).replace(".", ",")} por dia`,
          }),
          o.default.createElement(Me, {
            rotulo: "Tempo médio",
            valor: xe.length ? Hn(At / xe.length) : "--:--",
            tipo: "neutro",
            detalhe: xe.length
              ? `mais rápida ${Hn(Math.min(...xe.map((b) => Number(b.duracao || 0))))}`
              : "sem registros",
          }),
          o.default.createElement(Me, {
            rotulo: "Dentro da meta",
            valor: xe.length ? Math.round((kt / xe.length) * 100) + "%" : "—",
            tipo: xe.length && kt / xe.length < 0.7 ? "warn" : "ok",
            detalhe: xe.length ? `${kt} de ${xe.length} até ${Sc} min` : `meta de ${Sc} min`,
          }),
          o.default.createElement(Me, {
            rotulo: "Separação acima de 1h",
            valor: xe.filter((b) => Number(b.duracao || 0) > ct).length,
            tipo: xe.some((b) => Number(b.duracao || 0) > ct) ? "erro" : "ok",
            detalhe: "entre iniciar e finalizar",
          }),
          o.default.createElement(Me, {
            rotulo: "Espera acima de 1h",
            valor: xe.filter((b) => (jn(b) || 0) > ct).length,
            tipo: xe.some((b) => (jn(b) || 0) > ct) ? "erro" : "ok",
            detalhe: "entre gerar e iniciar",
          }),
          o.default.createElement(Me, {
            rotulo: "Tempo em separação",
            valor: Tc(At),
            tipo: "neutro",
            detalhe: It.size ? `${It.size} ${Ro(It.size, "separador", "separadores")}` : "sem registros",
          }),
        ),
      ),
      o.default.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
            gap: 18,
            alignItems: "start",
          },
        },
        o.default.createElement(
          ft,
          { titulo: "Por separador", subtitulo: "Volume e tempo médio no período" },
          ht.length === 0
            ? o.default.createElement(Zt, null, "Sem dados no período.")
            : o.default.createElement(
                "div",
                { style: { display: "flex", flexDirection: "column", gap: 14 } },
                ht.map((b, j) =>
                  o.default.createElement(
                    "div",
                    { key: b.nome },
                    o.default.createElement(
                      "div",
                      {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 10,
                          fontSize: 13,
                          color: s.txtPri,
                          marginBottom: 5,
                        },
                      },
                      o.default.createElement("b", null, b.nome),
                      o.default.createElement(
                        "span",
                        { style: { color: s.txtSec, fontVariantNumeric: "tabular-nums" } },
                        o.default.createElement("b", null, b.qtd),
                        " ",
                        Ro(b.qtd, "lista", "listas"),
                        " · média ",
                        Hn(b.soma / b.qtd),
                      ),
                    ),
                    o.default.createElement(
                      "div",
                      { style: { height: 8, borderRadius: 99, background: s.bgMuted, overflow: "hidden" } },
                      o.default.createElement("div", {
                        style: {
                          width: `${Math.max(4, Math.round((b.qtd / xt) * 100))}%`,
                          height: "100%",
                          borderRadius: 99,
                          background: el[j % el.length],
                        },
                      }),
                    ),
                  ),
                ),
              ),
        ),
        o.default.createElement(
          ft,
          { titulo: "Listas por dia", subtitulo: "Últimos 7 dias" },
          o.default.createElement(
            "div",
            { style: { display: "flex", alignItems: "flex-end", gap: 10, height: 170 } },
            Ft.map((b, j) =>
              o.default.createElement(
                "div",
                {
                  key: b.ini,
                  title: `${dl(b.ini)}: ${b.qtd}`,
                  style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    height: "100%",
                    gap: 6,
                  },
                },
                o.default.createElement(
                  "span",
                  { style: { fontSize: 12, fontWeight: 800, color: s.txtPri, fontVariantNumeric: "tabular-nums" } },
                  b.qtd,
                ),
                o.default.createElement("div", {
                  style: {
                    width: "100%",
                    height: `${Math.max(3, Math.round((b.qtd / eo) * 100))}px`,
                    maxHeight: 110,
                    borderRadius: 6,
                    background: b.hoje ? s.primaryGrad : el[j % el.length],
                    opacity: b.hoje ? 1 : 0.5,
                  },
                }),
                o.default.createElement(
                  "span",
                  {
                    style: {
                      fontSize: 11.5,
                      color: b.hoje ? s.primary : s.txtMuted,
                      fontWeight: b.hoje ? 800 : 600,
                      textTransform: "capitalize",
                    },
                  },
                  b.rot,
                ),
              ),
            ),
          ),
        ),
      ),
      o.default.createElement(
        ft,
        {
          titulo: "Histórico de separações",
          subtitulo: we.length
            ? `${Math.min(50, we.length)} de ${we.length} ${Ro(we.length, "registro", "registros")}`
            : "Nenhum registro",
          acoes: o.default.createElement(
            o.default.Fragment,
            null,
            o.default.createElement(ge, { onClick: Qe }, "Exportar CSV"),
            o.default.createElement(ge, { tipo: "perigo", onClick: De }, "Limpar histórico"),
          ),
        },
        o.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 14,
              padding: 12,
              background: s.bgStripe,
              border: `1px solid ${s.bdLight}`,
              borderRadius: s.radius.lg,
            },
          },
          o.default.createElement("input", {
            className: "lf-input",
            style: { ...Ke, width: 200 },
            placeholder: "🔍 Número da lista",
            value: ce,
            onChange: (b) => W(b.target.value),
          }),
          o.default.createElement(
            "select",
            { className: "lf-input", style: Ke, value: S, onChange: (b) => te(b.target.value) },
            o.default.createElement("option", { value: "" }, "Separador: todos"),
            Ie.map((b) => o.default.createElement("option", { key: b, value: b }, b)),
          ),
          o.default.createElement(
            "select",
            { className: "lf-input", style: Ke, value: re, onChange: (b) => be(b.target.value) },
            o.default.createElement("option", { value: "" }, "Situação: todas"),
            o.default.createElement("option", { value: "ok" }, "Dentro da meta"),
            o.default.createElement("option", { value: "late" }, "Acima da meta (15 min)"),
            o.default.createElement("option", { value: "lim" }, "Acima de 1h"),
          ),
          o.default.createElement(
            "select",
            { className: "lf-input", style: Ke, value: pe, onChange: (b) => $(b.target.value) },
            o.default.createElement("option", { value: "recente" }, "Mais recentes"),
            o.default.createElement("option", { value: "antiga" }, "Mais antigas"),
            o.default.createElement("option", { value: "lenta" }, "Maior tempo"),
            o.default.createElement("option", { value: "rapida" }, "Menor tempo"),
          ),
        ),
        we.length === 0
          ? o.default.createElement(Zt, null, "Nenhum registro encontrado.")
          : o.default.createElement(
              ko,
              {
                colunas: [
                  "Lista",
                  "Separador",
                  "Transportadora",
                  "Gerada",
                  "Pedidos",
                  "Itens",
                  "Início",
                  "Fim",
                  "Tempo",
                  "Situação",
                ],
                compacta: true,
                numericas: ["Pedidos", "Itens", "Tempo"],
              },
              we.slice(0, 50).map((b) => {
                let j = Number(b.duracao || 0),
                  Z = j > ha,
                  ae = j > ct;
                return o.default.createElement(
                  "tr",
                  { key: b.id },
                  o.default.createElement("td", { style: { ...oe, fontWeight: 800 } }, b.lista),
                  o.default.createElement("td", { style: oe }, b.separador),
                  o.default.createElement("td", { style: oe }, b.transportadora || "—"),
                  o.default.createElement("td", { style: oe }, o.default.createElement(rc, { r: b })),
                  o.default.createElement("td", { style: pt }, Wn(b.pedidos)),
                  o.default.createElement("td", { style: pt }, Wn(b.unidades)),
                  o.default.createElement("td", { style: oe }, Zo(b.inicio)),
                  o.default.createElement("td", { style: oe }, Zo(b.fim)),
                  o.default.createElement(
                    "td",
                    { style: { ...pt, fontWeight: 800, color: ll(Number(b.duracao || 0)) } },
                    en(b.duracao),
                  ),
                  o.default.createElement(
                    "td",
                    { style: oe },
                    o.default.createElement(
                      "div",
                      { style: { display: "flex", alignItems: "center", gap: 8 } },
                      o.default.createElement(
                        qo,
                        { tipo: ae ? "erro" : Z ? "warn" : "ok" },
                        ae ? "> 1h" : Z ? "> 15 min" : "Na meta",
                      ),
                      o.default.createElement(
                        ge,
                        { pequeno: true, tipo: "perigo", title: "Ocultar do histórico", onClick: () => Se(b) },
                        "✕",
                      ),
                    ),
                  ),
                );
              }),
            ),
        o.default.createElement(
          "div",
          { style: { fontSize: 11.5, color: s.txtMuted, marginTop: 10 } },
          "Exibindo até 50 registros · o CSV exporta tudo que está filtrado",
        ),
      ),
    );
  return o.default.createElement(
    "div",
    { style: { fontFamily: s.font } },
    o.default.createElement("style", null, Bi),
    Xe,
    o.default.createElement(h2, {
      abas: [
        ["fila", "Fila de listas"],
        ["andamento", "Em separação"],
        ["tempo", "Painel de tempo"],
        ["hist", "Histórico"],
        ["dados", "Dados"],
      ],
      aba: d,
      setAba: (b) => {
        (u(b), _(null));
      },
      contagens: { fila: Ce.length, andamento: Ae.length },
    }),
    (d === "fila" || d === "andamento") && Tt,
    d === "fila" && zt,
    d === "andamento" && po,
    d === "tempo" && Ut,
    d === "hist" && nt,
    d === "dados" && N,
    A &&
      o.default.createElement(
        "div",
        {
          style: {
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.55)",
            backdropFilter: "blur(2px)",
            zIndex: 1e3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          onClick: () => I(null),
        },
        o.default.createElement(
          "div",
          {
            onClick: (b) => b.stopPropagation(),
            style: {
              background: s.bgCard,
              borderRadius: s.radius.xl,
              padding: 24,
              width: 440,
              maxWidth: "92vw",
              boxShadow: s.shadowXl,
              border: `1px solid ${s.bdMid}`,
            },
          },
          o.default.createElement(
            "div",
            { style: { fontSize: 16, fontWeight: 800, color: s.txtPri, marginBottom: 6 } },
            "Finalizar ",
            A.lista,
          ),
          o.default.createElement(
            "div",
            { style: { fontSize: 13, color: s.txtSec, marginBottom: 16, lineHeight: 1.5 } },
            "Separador: ",
            o.default.createElement("b", null, A.separador),
            o.default.createElement("br", null),
            "Você faturou essa lista?",
          ),
          o.default.createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 8 } },
            o.default.createElement(
              ge,
              { tipo: "verde", onClick: () => je(A, true) },
              "✓ Sim, eu faturei (",
              A.separador,
              ")",
            ),
            o.default.createElement(ge, { onClick: () => je(A, false) }, "Não, outra pessoa vai faturar"),
            o.default.createElement(ge, { tipo: "perigo", onClick: () => I(null) }, "Voltar (não finalizar)"),
          ),
          o.default.createElement(
            "div",
            { style: { fontSize: 11.5, color: s.txtMuted, marginTop: 12 } },
            "Se não foi você, quem faturou é escolhido depois na aba Via Leitor.",
          ),
        ),
      ),
  );
}
function mg({ ativo: e, modo: t }) {
  let n = t === "mes",
    [a, r] = (0, o.useState)([]),
    [i, l] = (0, o.useState)([]),
    [d, u] = (0, o.useState)(false),
    [p, c] = (0, o.useState)(""),
    [g, f] = (0, o.useState)(""),
    [x, w] = (0, o.useState)("atual"),
    [F, v] = (0, o.useState)("todos"),
    [m, h] = (0, o.useState)("7"),
    [y, B] = (0, o.useState)("atual"),
    [k, L] = (0, o.useState)(""),
    C = (0, o.useCallback)(async () => {
      u(true);
      try {
        let [$, ee] = await Promise.all([
          Xn("/separacao_listas?select=*&status=eq.finalizada&order=id.desc"),
          Xn("/historico_listas?select=lista,data_hora,transportadora,pedidos,unidades&order=id.desc"),
        ]);
        (r((Array.isArray($) ? $ : []).map(ul)),
          l(Array.isArray(ee) ? ee : []),
          c(""),
          f(/* @__PURE__ */ new Date().toLocaleString("pt-BR")));
      } catch ($) {
        c($.message || "Não foi possível carregar.");
      } finally {
        u(false);
      }
    }, []);
  (0, o.useEffect)(() => {
    if (!e) return;
    C();
    let $ = setInterval(() => {
      document.hidden || C();
    }, 6e4);
    return () => clearInterval($);
  }, [e, C]);
  let _ = (0, o.useMemo)(() => {
      let $ = new Map(i.map((ee) => [Rt(ee.lista), ee]));
      return a
        .filter((ee) => ee.inicio)
        .map((ee) => {
          let se = $.get(Rt(ee.lista)),
            Ae = ee.geradaEm || (se && se.data_hora ? new Date(se.data_hora).getTime() : null),
            Ne = Ae ? Math.max(0, ee.inicio - Ae) : null,
            Ce = Number(ee.duracao || 0);
          return {
            ...ee,
            espera: Ne,
            dur: Ce,
            pedidos: ee.pedidos != null ? ee.pedidos : se ? se.pedidos : null,
            unidades: ee.unidades != null ? ee.unidades : se ? se.unidades : null,
            atrEsp: Ne != null && Ne > ct,
            atrSep: Ce > ct,
            dia: Oo(ee.inicio),
          };
        });
    }, [a, i]),
    q = ($) => `${Ca(new Date($).getMonth() + 1)}/${new Date($).getFullYear()}`,
    E = q(Date.now()),
    A = (0, o.useMemo)(
      () =>
        [...new Set(_.map(($) => q($.dia)))].sort(
          ($, ee) => ee.slice(3).localeCompare($.slice(3)) || ee.localeCompare($),
        ),
      [_],
    ),
    I = String(/* @__PURE__ */ new Date().getFullYear()),
    V = (0, o.useMemo)(
      () => [...new Set(_.map(($) => String(new Date($.dia).getFullYear())))].sort(($, ee) => ee.localeCompare($)),
      [_],
    ),
    D = (0, o.useMemo)(
      () => [...new Set(_.map(($) => $.separador))].filter(Boolean).sort(($, ee) => $.localeCompare(ee, "pt-BR")),
      [_],
    ),
    O = (0, o.useMemo)(() => {
      let $ = Oo(Date.now());
      return _.filter((ee) => {
        if (k && ee.separador !== k) return false;
        if (n) {
          let se = String(new Date(ee.dia).getFullYear());
          return y === "atual" ? se === I : !y || se === y;
        }
        return !(
          (x === "atual" ? q(ee.dia) !== E : x && q(ee.dia) !== x) ||
          (F === "hoje" && ee.dia !== $) ||
          (F === "ontem" && ee.dia !== $ - 864e5) ||
          (F === "ultimos" && ee.dia < $ - (Math.max(1, Number(m) || 1) - 1) * 864e5)
        );
      });
    }, [_, x, F, m, y, k, n]),
    H = ($) => {
      let ee = $.filter((Ce) => Ce.espera != null),
        se = $.filter((Ce) => !Ce.atrEsp && !Ce.atrSep).length,
        Ae = (Ce, Ie) => (Ie ? (Ce / Ie) * 100 : null),
        Ne = (Ce) => (Ce.length ? Ce.reduce((Ie, Be) => Ie + Be, 0) / Ce.length : null);
      return {
        total: $.length,
        noPrazo: se,
        atraso: $.length - se,
        pctGeral: Ae(se, $.length),
        pctEsp: Ae(ee.filter((Ce) => !Ce.atrEsp).length, ee.length),
        pctSep: Ae($.filter((Ce) => !Ce.atrSep).length, $.length),
        pctMeta: Ae($.filter((Ce) => Ce.dur <= ha).length, $.length),
        mediaEsp: Ne(ee.map((Ce) => Ce.espera)),
        mediaSep: Ne($.map((Ce) => Ce.dur)),
        pedidos: $.reduce((Ce, Ie) => Ce + (Number(Ie.pedidos) || 0), 0),
        unidades: $.reduce((Ce, Ie) => Ce + (Number(Ie.unidades) || 0), 0),
      };
    },
    M = (0, o.useMemo)(() => {
      let $ = /* @__PURE__ */ new Map();
      return (
        O.forEach((ee) => {
          let se = n ? new Date(new Date(ee.dia).getFullYear(), new Date(ee.dia).getMonth(), 1).getTime() : ee.dia;
          ($.has(se) || $.set(se, []), $.get(se).push(ee));
        }),
        [...$.entries()]
          .sort((ee, se) => se[0] - ee[0])
          .map(([ee, se]) => ({ dia: ee, diasComLista: new Set(se.map((Ae) => Ae.dia)).size, ...H(se) }))
      );
    }, [O, n]),
    Q = (0, o.useMemo)(() => ({ ...H(O), diasTotal: new Set(O.map(($) => $.dia)).size }), [O]),
    Y = (0, o.useMemo)(
      () => M.filter(($) => $.pctGeral != null).sort(($, ee) => $.pctGeral - ee.pctGeral)[0] || null,
      [M],
    ),
    de = {
      padding: "6px 8px",
      fontSize: 9,
      fontWeight: 800,
      color: s.txtSec,
      textAlign: "center",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      borderBottom: `1px solid ${s.bdLight}`,
    },
    ce = ($, ee, se) => ({
      background: $,
      color: ee,
      fontSize: 9,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.07em",
      textAlign: "center",
      padding: "7px 8px",
      ...se,
    }),
    W = "4px solid #f0f3ff",
    S = { padding: "5px 8px", textAlign: "center", fontSize: 10, borderBottom: `1px solid ${s.bdLight}` },
    te = ($, ee) => {
      let se = vi($);
      return o.default.createElement(
        "td",
        {
          style: {
            ...S,
            fontWeight: 800,
            fontFamily: s.fontMono,
            background: $ == null ? s.bgCard : se.bg,
            color: $ == null ? s.txtMuted : se.color,
            borderLeft: ee ? W : `1px dotted ${s.bdLight}`,
          },
        },
        $ == null ? "—" : Kn($),
      );
    },
    re = ($, ee, se) =>
      o.default.createElement(
        "td",
        {
          style: {
            ...S,
            fontFamily: s.fontMono,
            color: s.txtPri,
            borderLeft: ee ? W : `1px dotted ${s.bdLight}`,
            ...se,
          },
        },
        $,
      ),
    be = ($) => ($ == null ? "—" : Hn($)),
    pe = ($, ee, se, Ae) => {
      let Ne = $.dia != null ? new Date($.dia) : null,
        Ce = se ? { fontWeight: 800, background: s.bgMuted } : null;
      return o.default.createElement(
        "tr",
        { key: ee, style: { background: Ae % 2 === 0 ? s.bgCard : s.bgStripe } },
        n
          ? o.default.createElement(
              o.default.Fragment,
              null,
              o.default.createElement(
                "td",
                { style: { ...S, fontWeight: 800, fontFamily: s.fontMono, color: s.txtPri, ...Ce } },
                se || q($.dia),
              ),
              o.default.createElement(
                "td",
                { style: { ...S, color: s.txtSec, ...Ce } },
                se ? $.diasTotal : $.diasComLista,
              ),
            )
          : o.default.createElement(
              o.default.Fragment,
              null,
              o.default.createElement("td", { style: { ...S, color: s.txtSec, ...Ce } }, Ne ? q($.dia) : ""),
              o.default.createElement(
                "td",
                { style: { ...S, fontWeight: 800, fontFamily: s.fontMono, color: s.txtPri, ...Ce } },
                se || Ne.toLocaleDateString("pt-BR"),
              ),
              o.default.createElement(
                "td",
                { style: { ...S, color: s.txtSec, ...Ce } },
                Ne ? Ne.toLocaleDateString("pt-BR", { weekday: "long" }) : "",
              ),
            ),
        te($.pctEsp, true),
        te($.pctSep, false),
        te($.pctGeral, false),
        re($.total, true, { fontWeight: 800 }),
        re($.noPrazo, false, { color: s.green, fontWeight: 800 }),
        re($.atraso, false, { color: $.atraso ? s.red : s.txtMuted, fontWeight: 800 }),
        re(be($.mediaEsp), true, $.mediaEsp > ct ? { color: s.red, fontWeight: 800 } : null),
        re(be($.mediaSep), false, $.mediaSep > ct ? { color: s.red, fontWeight: 800 } : null),
        re($.pedidos || "—", true),
        re($.unidades || "—", false),
      );
    };
  return o.default.createElement(
    o.default.Fragment,
    null,
    o.default.createElement(Wt, {
      titulo: n ? "Separação Mensal" : "Separação Diário",
      atualizadoEm: g || "—",
      extraInfo: o.default.createElement(
        "span",
        null,
        "No prazo: até ",
        o.default.createElement("strong", { style: { color: s.txtSec } }, "1h"),
        " para iniciar e até",
        " ",
        o.default.createElement("strong", { style: { color: s.txtSec } }, "1h"),
        " para finalizar",
      ),
      actions: o.default.createElement(
        "button",
        { onClick: C, disabled: d, style: uo(d) },
        d ? "Atualizando…" : "Atualizar",
      ),
    }),
    p && o.default.createElement("div", { style: co }, p),
    o.default.createElement(
      "section",
      {
        style: {
          background: s.bgCard,
          border: `1px solid ${s.bdLight}`,
          borderRadius: s.radius.lg,
          padding: 14,
          marginBottom: 16,
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "center",
          boxShadow: s.shadowCard,
        },
      },
      n
        ? o.default.createElement(
            "select",
            { value: y, onChange: ($) => B($.target.value), style: mt },
            o.default.createElement("option", { value: "atual" }, "Ano atual"),
            o.default.createElement("option", { value: "" }, "Todos os anos"),
            V.map(($) => o.default.createElement("option", { key: $, value: $ }, $)),
          )
        : o.default.createElement(
            o.default.Fragment,
            null,
            o.default.createElement(
              "select",
              { value: F, onChange: ($) => v($.target.value), style: mt },
              o.default.createElement("option", { value: "todos" }, "Todos os dias"),
              o.default.createElement("option", { value: "hoje" }, "Hoje"),
              o.default.createElement("option", { value: "ontem" }, "Ontem"),
              o.default.createElement("option", { value: "ultimos" }, "Últimos X dias"),
            ),
            F === "ultimos" &&
              o.default.createElement("input", {
                type: "number",
                min: "1",
                value: m,
                onChange: ($) => h($.target.value),
                style: { ...mt, width: 64 },
              }),
            o.default.createElement(
              "select",
              { value: x, onChange: ($) => w($.target.value), style: mt },
              o.default.createElement("option", { value: "atual" }, "Mês atual"),
              o.default.createElement("option", { value: "" }, "Todos os meses"),
              A.map(($) => o.default.createElement("option", { key: $, value: $ }, $)),
            ),
          ),
      o.default.createElement(
        "select",
        { value: k, onChange: ($) => L($.target.value), style: mt },
        o.default.createElement("option", { value: "" }, "Separador: todos"),
        D.map(($) => o.default.createElement("option", { key: $, value: $ }, $)),
      ),
      o.default.createElement(
        "button",
        {
          onClick: () => {
            (v("todos"), h("7"), w("atual"), B("atual"), L(""));
          },
          style: Pa,
        },
        "Limpar",
      ),
    ),
    o.default.createElement(
      "section",
      { style: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12, marginBottom: 16 } },
      o.default.createElement(Fo, {
        titulo: "Listas separadas",
        valor: Q.total,
        grad: s.grad2,
        detalhe: n
          ? `${M.length} ${Ro(M.length, "mês", "meses")} no filtro`
          : `${M.length} ${Ro(M.length, "dia", "dias")} no filtro`,
      }),
      o.default.createElement(Fo, {
        titulo: "% no prazo",
        valor: Q.pctGeral == null ? "—" : Kn(Q.pctGeral),
        grad: s.grad3,
        detalhe: `${Q.noPrazo} de ${Q.total} listas`,
      }),
      o.default.createElement(Fo, {
        titulo: "Em atraso",
        valor: Q.atraso,
        grad: s.grad6,
        detalhe: "Passou de 1h para iniciar ou finalizar",
      }),
      o.default.createElement(Fo, {
        titulo: n ? "Pior mês" : "Pior dia",
        valor: Y ? Kn(Y.pctGeral) : "—",
        grad: s.grad5,
        detalhe: Y ? (n ? q(Y.dia) : new Date(Y.dia).toLocaleDateString("pt-BR")) : "Sem dados",
      }),
    ),
    o.default.createElement(
      "section",
      {
        style: {
          background: s.bgCard,
          border: `1px solid ${s.bdLight}`,
          borderRadius: s.radius.xl,
          overflow: "hidden",
          boxShadow: s.shadowCard,
        },
      },
      o.default.createElement(
        "div",
        {
          style: {
            padding: "13px 18px",
            borderBottom: `1px solid ${s.bdLight}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: s.bgStripe,
          },
        },
        o.default.createElement(
          "span",
          { style: { fontWeight: 800, color: s.txtPri, fontSize: 14, fontFamily: s.font, letterSpacing: "-0.02em" } },
          n ? "Desempenho Mensal da Separação" : "Desempenho Diário da Separação",
        ),
        o.default.createElement(Ei, {
          filtrados: M.length,
          total: n ? new Set(_.map(($) => q($.dia))).size : new Set(_.map(($) => $.dia)).size,
        }),
      ),
      o.default.createElement(
        "div",
        { style: { overflowX: "auto" } },
        o.default.createElement(
          "table",
          { style: { width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: s.font } },
          o.default.createElement(
            "thead",
            null,
            o.default.createElement(
              "tr",
              null,
              o.default.createElement(
                "th",
                { colSpan: n ? 2 : 3, style: ce("linear-gradient(135deg,#302b63,#24243e)", "#c4b5fd") },
                n ? "Dados do Mês" : "Dados do Dia",
              ),
              o.default.createElement(
                "th",
                { colSpan: "3", style: ce("linear-gradient(135deg,#064e3b,#065f46)", "#a7f3d0", { borderLeft: W }) },
                "Prazo (%)",
              ),
              o.default.createElement(
                "th",
                { colSpan: "3", style: ce("linear-gradient(135deg,#1a1f6e,#2d3282)", "#bfdbfe", { borderLeft: W }) },
                "Listas",
              ),
              o.default.createElement(
                "th",
                { colSpan: "2", style: ce("linear-gradient(135deg,#374151,#1f2937)", "#d1d5db", { borderLeft: W }) },
                "Tempo médio",
              ),
              o.default.createElement(
                "th",
                { colSpan: "2", style: ce("linear-gradient(135deg,#7c2d12,#9a3412)", "#fed7aa", { borderLeft: W }) },
                "Volume",
              ),
            ),
            o.default.createElement(
              "tr",
              { style: { background: s.bgMuted } },
              (n ? ["Mês", "Dias"] : ["Mês", "Data", "Dia"]).map(($) =>
                o.default.createElement("th", { key: $, style: de }, $),
              ),
              ["Iniciar ≤1h", "Finalizar ≤1h", "Geral"].map(($, ee) =>
                o.default.createElement("th", { key: $, style: { ...de, borderLeft: ee === 0 ? W : void 0 } }, $),
              ),
              ["Total", "No prazo", "Atraso"].map(($, ee) =>
                o.default.createElement("th", { key: $, style: { ...de, borderLeft: ee === 0 ? W : void 0 } }, $),
              ),
              ["Espera", "Separação"].map(($, ee) =>
                o.default.createElement("th", { key: $, style: { ...de, borderLeft: ee === 0 ? W : void 0 } }, $),
              ),
              ["Pedidos", "Itens"].map(($, ee) =>
                o.default.createElement("th", { key: $, style: { ...de, borderLeft: ee === 0 ? W : void 0 } }, $),
              ),
            ),
          ),
          o.default.createElement(
            "tbody",
            null,
            d &&
              !M.length &&
              o.default.createElement(
                "tr",
                null,
                o.default.createElement(
                  "td",
                  {
                    colSpan: n ? 12 : 13,
                    style: { padding: 28, textAlign: "center", color: s.txtMuted, fontFamily: s.font },
                  },
                  "Carregando…",
                ),
              ),
            !d &&
              !M.length &&
              o.default.createElement(
                "tr",
                null,
                o.default.createElement(
                  "td",
                  {
                    colSpan: n ? 12 : 13,
                    style: { padding: 28, textAlign: "center", color: s.txtMuted, fontFamily: s.font },
                  },
                  "Nenhuma lista separada neste filtro.",
                ),
              ),
            M.map(($, ee) => pe($, $.dia, null, ee)),
            M.length > 1 && pe(Q, "total", "Total / média", 1),
          ),
        ),
      ),
    ),
  );
}
function Ic() {
  let [e, t] = (0, o.useState)(() => {
      try {
        return localStorage.getItem(L0) !== "0";
      } catch {
        return true;
      }
    }),
    n = (0, o.useCallback)((S) => {
      t((te) => {
        let re = typeof S == "boolean" ? S : !te;
        try {
          localStorage.setItem(L0, re ? "1" : "0");
        } catch {}
        return re;
      });
    }, []),
    a = (0, o.useMemo)(() => ({ recolhido: e, expandir: () => n(false) }), [e, n]),
    [r, i] = fy(),
    [l, d] = (0, o.useState)(() => {
      let S = localStorage.getItem(dc);
      return S === "logistica" ? "logistica" : S ? "geral" : "";
    }),
    u = !!l,
    p = l === "logistica",
    [c, g] = (0, o.useState)("dashboard"),
    f = (0, o.useCallback)(
      (S) => {
        (p || !Yv.includes(S)) && g(S);
      },
      [p],
    ),
    [x, w] = (0, o.useState)(""),
    [F, v] = (0, o.useState)([]),
    [m, h] = (0, o.useState)(false),
    [y, B] = (0, o.useState)(""),
    [k, L] = (0, o.useState)("pedido"),
    [C, _] = (0, o.useState)(false);
  (0, o.useEffect)(() => {
    let S = document.createElement("link");
    return (
      (S.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"),
      (S.rel = "stylesheet"),
      document.head.appendChild(S),
      () => document.head.removeChild(S)
    );
  }, []);
  let q = ["estoque", "ajusteSaldo"].includes(c),
    E = ["semEstoque"].includes(c),
    A = ["viaLeitor", "postagens"].includes(c),
    I = [
      "faturamento",
      "listaFaturamento",
      "separacaoLista",
      "faturamentoBB",
      "ajusteSaldoBB",
      "cancelamentos",
      "reenvio",
      "nfeTrancadas",
    ].includes(c),
    V = ["listaFaturamento", "separacaoLista"].includes(c),
    D = ["faturamentoBB", "ajusteSaldoBB"].includes(c),
    [O, H] = (0, o.useState)(false),
    [M, Q] = (0, o.useState)(false),
    Y = [
      "producao",
      "producaoResumo",
      "producaoSolicitacoes",
      "analiseTransformacoes",
      "consultaTransformacao",
    ].includes(c),
    de = [
      "indicadorDiario",
      "indicadorExpedicaoDiario",
      "indicadorFaturamentoMensal",
      "indicadorExpedicaoMensal",
      "indicadorAbastecimentoEstoque",
      "indicadorAbastecimentoMensal",
      "indicadorSeparacaoDiario",
      "indicadorSeparacaoMensal",
    ].includes(c),
    ce = (0, o.useCallback)(async () => {
      let S = String(x || "").trim(),
        te = k === "nf";
      if (!S) {
        (_(true),
          B(te ? "Digite o número da NF para pesquisar." : "Digite um número de pedido para pesquisar."),
          v([]));
        return;
      }
      (_(true), h(true), B(""));
      let re = [
        { key: "equipatech", origem: "Faturamento · Equipatech", telaDestino: "faturamento" },
        { key: "bbbaterias", origem: "Faturamento · BBBaterias", telaDestino: "faturamento" },
        { key: "estoque", origem: "Estoque", telaDestino: "estoque" },
        { key: "producao", origem: "Produção", telaDestino: "producao" },
      ];
      try {
        let be = Te(S),
          pe = [];
        (te ? [] : re).forEach((se) => {
          let Ae = uc(se.key),
            Ne = se.key === "equipatech" || se.key === "bbbaterias",
            Ce = se.key === "estoque",
            Ie = se.key === "producao";
          Ae.filter((Be) => Te(Be.pedido).includes(be)).forEach((Be) => {
            pe.push({
              origem: se.origem,
              telaDestino: se.telaDestino,
              pedido: Be.pedido || S,
              filial: Be.filial || Be.unidadeFaturamento || "-",
              produto: Be.produto || "-",
              quantidade: Be.quantidadeLiberada || Be.quantidade || Be.quantidadeTotal || "-",
              status: Be.statusSeparacao || Be.statusResumo || Be.status || "-",
              data: Be.dataLiberacao || Be.dataHoraFinanceiro || Be.dataLancamento || Be.dataHoraEntregueEstoque || "-",
              detalhe: Ne
                ? `Lista: ${Be.lista || "-"} · Faturador: ${Be.faturador || "-"}`
                : Ce
                  ? `Produto: ${Be.produto || "-"} · Status original: ${Be.statusOriginal || Be.status || "-"}`
                  : Ie
                    ? `Transporte: ${Be.transporte || "-"} · Cliente: ${Be.cliente || "-"}`
                    : "-",
            });
          });
        });
        let $ = await Vy(S, p, te ? "nf" : "pedido");
        (pe.push(...$.itens), v(pe));
        let ee = re.reduce((se, Ae) => se + uc(Ae.key).length, 0);
        $.falhas.length
          ? B(`Não foi possível pesquisar em: ${$.falhas.join(", ")}.`)
          : !te && ee === 0 && !pe.length
            ? B("As bases ainda estão carregando. Aguarde alguns segundos e pesquise novamente.")
            : B("");
      } catch (be) {
        (v([]), B(be.message || "Erro ao pesquisar pedido."));
      } finally {
        h(false);
      }
    }, [x, p, k]);
  function W() {
    (localStorage.removeItem(dc), g("dashboard"), d(""));
  }
  return u
    ? o.default.createElement(
        "div",
        { style: { minHeight: "100vh", background: s.bgPage, display: "flex", fontFamily: s.font, color: s.txtPri } },
        o.default.createElement(
          Cl.Provider,
          { value: a },
          o.default.createElement(
            "div",
            { style: { position: "relative", flexShrink: 0, alignSelf: "stretch", display: "flex" } },
            o.default.createElement(
              "aside",
              {
                style: {
                  width: e ? 68 : 256,
                  transition: "width 180ms ease",
                  overflowX: "hidden",
                  background: s.sidebarBg,
                  color: "#fff",
                  padding: e ? "20px 8px" : "20px 12px",
                  flexShrink: 0,
                  minHeight: "100vh",
                  alignSelf: "stretch",
                  overflowY: "auto",
                  boxSizing: "border-box",
                  borderRight: `1px solid ${s.sidebarBd}`,
                },
              },
              o.default.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "4px 4px 18px",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    marginBottom: 18,
                  },
                },
                o.default.createElement(
                  "div",
                  {
                    style: {
                      width: 38,
                      height: 38,
                      borderRadius: 11,
                      background: "#3f6df0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 18,
                      color: "#fff",
                      flexShrink: 0,
                      boxShadow: "0 2px 10px rgba(63,109,240,0.45)",
                    },
                  },
                  "B",
                ),
                !e &&
                  o.default.createElement(
                    "div",
                    null,
                    o.default.createElement(
                      "div",
                      { style: { fontSize: 15, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" } },
                      "BBDI",
                    ),
                    o.default.createElement(
                      "div",
                      { style: { fontSize: 10, color: "rgba(255,255,255,0.38)", fontWeight: 600, marginTop: 1 } },
                      "Painel Operacional",
                    ),
                  ),
              ),
              o.default.createElement(
                "div",
                { style: { display: "flex", flexDirection: e ? "column" : "row", gap: 8, marginBottom: 16 } },
                o.default.createElement(
                  "button",
                  {
                    onClick: W,
                    title: "Sair da conta",
                    style: {
                      flex: e ? "none" : 1,
                      height: 36,
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.05)",
                      color: "rgba(226,232,240,0.8)",
                      borderRadius: s.radius.md,
                      padding: "0 10px",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: 12,
                      fontFamily: s.font,
                    },
                  },
                  e ? "⏻" : "Sair da conta",
                ),
                o.default.createElement(Sg, { tema: r, alternar: i, compacto: true, sobreEscuro: true }),
              ),
              !e &&
                o.default.createElement(
                  "div",
                  {
                    style: {
                      fontSize: 10,
                      color: "rgba(226,232,240,0.45)",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      marginBottom: 8,
                      padding: "0 4px",
                    },
                  },
                  "Módulos",
                ),
              o.default.createElement(
                "nav",
                { style: { display: "flex", flexDirection: "column", gap: 2 } },
                o.default.createElement(
                  Ju,
                  { icon: "D", ativo: c === "dashboard", onClick: () => f("dashboard") },
                  "Dashboard",
                ),
                o.default.createElement(
                  "div",
                  {
                    style: {
                      borderRadius: s.radius.md,
                      padding: A ? 5 : 0,
                      background: A ? "rgba(255,255,255,0.04)" : "transparent",
                      border: A ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
                      marginTop: 2,
                    },
                  },
                  o.default.createElement(
                    sr,
                    { icon: "EX", ativo: A, onClick: () => f(p ? "viaLeitor" : "postagens") },
                    "Expedição",
                  ),
                  A &&
                    o.default.createElement(
                      "div",
                      { style: { marginTop: 4, paddingTop: 2 } },
                      p &&
                        o.default.createElement(
                          Ze,
                          { ativo: c === "viaLeitor", onClick: () => f("viaLeitor") },
                          "Via Leitor",
                        ),
                      o.default.createElement(
                        Ze,
                        { ativo: c === "postagens", onClick: () => f("postagens") },
                        "Postagens",
                      ),
                    ),
                ),
                o.default.createElement(
                  "div",
                  {
                    style: {
                      borderRadius: s.radius.md,
                      padding: I ? 5 : 0,
                      background: I ? "rgba(255,255,255,0.04)" : "transparent",
                      border: I ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
                      marginTop: 2,
                    },
                  },
                  o.default.createElement(sr, { icon: "F", ativo: I, onClick: () => f("faturamento") }, "Faturamento"),
                  I &&
                    o.default.createElement(
                      "div",
                      { style: { marginTop: 4, paddingTop: 2 } },
                      o.default.createElement(
                        Ze,
                        { ativo: c === "faturamento", onClick: () => f("faturamento") },
                        "Painel Faturamento",
                      ),
                      p &&
                        o.default.createElement(
                          o.default.Fragment,
                          null,
                          o.default.createElement(
                            Ze,
                            { ativo: V && !O, onClick: () => H((S) => !S) },
                            O ? "▾" : "›",
                            " Equipatech",
                          ),
                          O &&
                            o.default.createElement(
                              o.default.Fragment,
                              null,
                              o.default.createElement(
                                Ze,
                                { nivel: 1, ativo: c === "listaFaturamento", onClick: () => f("listaFaturamento") },
                                "Lista Faturamento",
                              ),
                              o.default.createElement(
                                Ze,
                                { nivel: 1, ativo: c === "separacaoLista", onClick: () => f("separacaoLista") },
                                "Separação de Lista",
                              ),
                            ),
                          o.default.createElement(
                            Ze,
                            { ativo: D && !M, onClick: () => Q((S) => !S) },
                            M ? "▾" : "›",
                            " BBBaterias",
                          ),
                          M &&
                            o.default.createElement(
                              o.default.Fragment,
                              null,
                              o.default.createElement(
                                Ze,
                                { nivel: 1, ativo: c === "faturamentoBB", onClick: () => f("faturamentoBB") },
                                "Via Leitor",
                              ),
                              o.default.createElement(
                                Ze,
                                { nivel: 1, ativo: c === "ajusteSaldoBB", onClick: () => f("ajusteSaldoBB") },
                                "Ajuste de saldo",
                              ),
                            ),
                        ),
                      o.default.createElement(
                        Ze,
                        { ativo: c === "cancelamentos", onClick: () => f("cancelamentos") },
                        "Cancelamentos",
                      ),
                      o.default.createElement(Ze, { ativo: c === "reenvio", onClick: () => f("reenvio") }, "Reenvio"),
                      o.default.createElement(
                        Ze,
                        { ativo: c === "nfeTrancadas", onClick: () => f("nfeTrancadas") },
                        "NFe trancadas",
                      ),
                    ),
                ),
                o.default.createElement(
                  "div",
                  {
                    style: {
                      borderRadius: s.radius.md,
                      padding: E ? 5 : 0,
                      background: E ? "rgba(255,255,255,0.04)" : "transparent",
                      border: E ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
                      marginTop: 2,
                    },
                  },
                  o.default.createElement(sr, { icon: "L", ativo: E, onClick: () => f("semEstoque") }, "Filiais"),
                  E &&
                    o.default.createElement(
                      "div",
                      { style: { marginTop: 4, paddingTop: 2 } },
                      o.default.createElement(
                        Ze,
                        { ativo: c === "semEstoque", onClick: () => f("semEstoque") },
                        "Sem estoque",
                      ),
                    ),
                ),
                o.default.createElement(
                  "div",
                  {
                    style: {
                      borderRadius: s.radius.md,
                      padding: q ? 5 : 0,
                      background: q ? "rgba(255,255,255,0.04)" : "transparent",
                      border: q ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
                      marginTop: 2,
                    },
                  },
                  o.default.createElement(sr, { icon: "E", ativo: q, onClick: () => f("estoque") }, "Estoque"),
                  q &&
                    o.default.createElement(
                      "div",
                      { style: { marginTop: 4, paddingTop: 2 } },
                      o.default.createElement(
                        Ze,
                        { ativo: c === "estoque", onClick: () => f("estoque") },
                        "Painel Estoque",
                      ),
                      p &&
                        o.default.createElement(
                          Ze,
                          { ativo: c === "ajusteSaldo", onClick: () => f("ajusteSaldo") },
                          "Ajuste de Saldo",
                        ),
                    ),
                ),
                o.default.createElement(
                  Ju,
                  { icon: "C", ativo: c === "consultaPecas", onClick: () => f("consultaPecas") },
                  "Consulta de Peças",
                ),
                o.default.createElement(
                  "div",
                  {
                    style: {
                      borderRadius: s.radius.md,
                      padding: Y ? 5 : 0,
                      background: Y ? "rgba(255,255,255,0.04)" : "transparent",
                      border: Y ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
                      marginTop: 2,
                    },
                  },
                  o.default.createElement(sr, { icon: "P", ativo: Y, onClick: () => f("producao") }, "Produção"),
                  Y &&
                    o.default.createElement(
                      "div",
                      { style: { marginTop: 4, paddingTop: 2 } },
                      o.default.createElement(
                        Ze,
                        { ativo: c === "producao", onClick: () => f("producao") },
                        "Painel Produção",
                      ),
                      o.default.createElement(
                        Ze,
                        { ativo: c === "producaoResumo", onClick: () => f("producaoResumo") },
                        "Resumo por Pedido",
                      ),
                      p &&
                        o.default.createElement(
                          Ze,
                          { ativo: c === "producaoSolicitacoes", onClick: () => f("producaoSolicitacoes") },
                          "Solicitações de Produção",
                        ),
                      o.default.createElement(
                        Ze,
                        { ativo: c === "analiseTransformacoes", onClick: () => f("analiseTransformacoes") },
                        "Análise de Transformação",
                      ),
                      o.default.createElement(
                        Ze,
                        { ativo: c === "consultaTransformacao", onClick: () => f("consultaTransformacao") },
                        "Consulta de Transformação",
                      ),
                    ),
                ),
                o.default.createElement(
                  Ju,
                  { icon: "PV", ativo: c === "pedidoVenda", onClick: () => f("pedidoVenda") },
                  "Pedido de Venda",
                ),
                p &&
                  o.default.createElement(
                    "div",
                    {
                      style: {
                        borderRadius: s.radius.md,
                        padding: de ? 5 : 0,
                        background: de ? "rgba(255,255,255,0.04)" : "transparent",
                        border: de ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
                        marginTop: 2,
                      },
                    },
                    o.default.createElement(
                      sr,
                      { icon: "I", ativo: de, onClick: () => f("indicadorDiario") },
                      "Indicadores",
                    ),
                    de &&
                      o.default.createElement(
                        "div",
                        { style: { marginTop: 4, paddingTop: 2 } },
                        o.default.createElement(
                          Ze,
                          { ativo: c === "indicadorDiario", onClick: () => f("indicadorDiario") },
                          "Faturamento Diário",
                        ),
                        o.default.createElement(
                          Ze,
                          { ativo: c === "indicadorExpedicaoDiario", onClick: () => f("indicadorExpedicaoDiario") },
                          "Expedição Diário",
                        ),
                        o.default.createElement(
                          Ze,
                          { ativo: c === "indicadorFaturamentoMensal", onClick: () => f("indicadorFaturamentoMensal") },
                          "Faturamento Mensal",
                        ),
                        o.default.createElement(
                          Ze,
                          { ativo: c === "indicadorExpedicaoMensal", onClick: () => f("indicadorExpedicaoMensal") },
                          "Expedição Mensal",
                        ),
                        o.default.createElement(
                          Ze,
                          {
                            ativo: c === "indicadorAbastecimentoEstoque",
                            onClick: () => f("indicadorAbastecimentoEstoque"),
                          },
                          "Abastecimento Estoque",
                        ),
                        o.default.createElement(
                          Ze,
                          {
                            ativo: c === "indicadorAbastecimentoMensal",
                            onClick: () => f("indicadorAbastecimentoMensal"),
                          },
                          "Abastecimento Mensal",
                        ),
                        o.default.createElement(
                          Ze,
                          { ativo: c === "indicadorSeparacaoDiario", onClick: () => f("indicadorSeparacaoDiario") },
                          "Separação Diário",
                        ),
                        o.default.createElement(
                          Ze,
                          { ativo: c === "indicadorSeparacaoMensal", onClick: () => f("indicadorSeparacaoMensal") },
                          "Separação Mensal",
                        ),
                      ),
                  ),
              ),
              o.default.createElement(
                "div",
                {
                  style: {
                    marginTop: 32,
                    fontSize: 9,
                    color: "rgba(255,255,255,0.15)",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textAlign: "center",
                    fontFamily: s.font,
                  },
                },
                e ? "v13.60" : `BBDI © ${/* @__PURE__ */ new Date().getFullYear()} · v13.74-card-sem-estoque`,
              ),
            ),
            o.default.createElement(
              "button",
              {
                type: "button",
                onClick: () => n(),
                title: e ? "Abrir o menu" : "Recolher o menu (só os símbolos)",
                "aria-label": e ? "Abrir o menu" : "Recolher o menu",
                style: {
                  position: "absolute",
                  top: 26,
                  right: -13,
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.25)",
                  background: "#3f6df0",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 800,
                  lineHeight: 1,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
                  zIndex: 50,
                  padding: 0,
                },
              },
              e ? "›" : "‹",
            ),
          ),
        ),
        o.default.createElement(
          "main",
          { style: { flex: 1, padding: "28px 30px", overflowX: "hidden", minWidth: 0, boxSizing: "border-box" } },
          o.default.createElement(
            "section",
            {
              style: {
                position: "sticky",
                top: 0,
                zIndex: 30,
                background: "color-mix(in srgb, var(--surf) 92%, transparent)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${s.bdLight}`,
                borderRadius: s.radius.lg,
                padding: 10,
                marginBottom: 18,
                boxShadow: s.shadowMd,
              },
            },
            o.default.createElement(
              "form",
              {
                onSubmit: (S) => {
                  (S.preventDefault(), ce());
                },
                style: { display: "flex", gap: 8, alignItems: "center" },
              },
              o.default.createElement(
                "select",
                {
                  value: k,
                  onChange: (S) => L(S.target.value),
                  "aria-label": "Pesquisar por",
                  style: {
                    height: 38,
                    border: `1px solid ${s.bdMid}`,
                    borderRadius: s.radius.md,
                    padding: "0 8px",
                    fontSize: 13,
                    fontWeight: 800,
                    color: s.txtPri,
                    outline: "none",
                    fontFamily: s.font,
                    background: s.bgCard,
                    cursor: "pointer",
                  },
                },
                o.default.createElement("option", { value: "pedido" }, "Pedido"),
                o.default.createElement("option", { value: "nf" }, "NF"),
              ),
              o.default.createElement("input", {
                value: x,
                onChange: (S) => w(S.target.value),
                placeholder: k === "nf" ? "Buscar NF (nº da NF)" : "Buscar pedido (nº do pedido)",
                style: {
                  height: 38,
                  width: 260,
                  border: `1px solid ${s.bdMid}`,
                  borderRadius: s.radius.md,
                  padding: "0 12px",
                  fontSize: 13,
                  fontWeight: 700,
                  color: s.txtPri,
                  outline: "none",
                  fontFamily: s.font,
                  background: s.bgCard,
                },
              }),
              o.default.createElement(
                "button",
                {
                  type: "submit",
                  disabled: m,
                  style: {
                    height: 38,
                    border: "none",
                    borderRadius: s.radius.md,
                    padding: "0 14px",
                    background: m ? s.bgMuted : s.primaryGrad,
                    color: "#FFFFFF",
                    fontSize: 13,
                    fontWeight: 800,
                    cursor: m ? "not-allowed" : "pointer",
                    fontFamily: s.font,
                    minWidth: 92,
                  },
                },
                m ? "Buscando..." : "Buscar",
              ),
              C &&
                o.default.createElement(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      (w(""), v([]), B(""), _(false));
                    },
                    style: {
                      height: 38,
                      border: `1px solid ${s.bdMid}`,
                      borderRadius: s.radius.md,
                      padding: "0 12px",
                      background: s.bgCard,
                      color: s.txtSec,
                      fontSize: 12,
                      fontWeight: 800,
                      cursor: "pointer",
                      fontFamily: s.font,
                    },
                  },
                  "Limpar",
                ),
              o.default.createElement(
                "span",
                {
                  style: { marginLeft: "auto", fontSize: 11, color: s.txtMuted, fontWeight: 800, whiteSpace: "nowrap" },
                },
                k === "nf"
                  ? p
                    ? "Pesquisa por NF: Postagens, Via Leitor e Cancelamentos"
                    : "Pesquisa por NF: Postagens e Cancelamentos"
                  : p
                    ? "Pesquisa geral: Faturamento, Estoque, Produção, Postagens, Via Leitor e Cancelamentos"
                    : "Pesquisa geral: Faturamento, Estoque, Produção, Postagens e Cancelamentos",
              ),
            ),
            C &&
              o.default.createElement(
                "div",
                {
                  style: {
                    marginTop: 10,
                    background: s.bgCard,
                    border: `1px solid ${s.bdLight}`,
                    borderRadius: s.radius.md,
                    overflow: "hidden",
                  },
                },
                o.default.createElement(
                  "div",
                  {
                    style: {
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottom: `1px solid ${s.bdLight}`,
                    },
                  },
                  o.default.createElement(
                    "div",
                    { style: { fontSize: 13, fontWeight: 800, color: s.txtPri } },
                    "Resultado da busca (",
                    k === "nf" ? "NF" : "pedido",
                    "): ",
                    x || "—",
                  ),
                  o.default.createElement(
                    "div",
                    {
                      style: {
                        fontSize: 11,
                        fontWeight: 800,
                        color: s.txtSec,
                        background: s.bgMuted,
                        borderRadius: 999,
                        padding: "5px 10px",
                      },
                    },
                    F.length,
                    " ocorrência(s)",
                  ),
                ),
                !m &&
                  o.default.createElement(
                    "div",
                    {
                      style: {
                        padding: "7px 12px",
                        fontSize: 11,
                        fontWeight: 700,
                        color: s.txtSec,
                        borderBottom: `1px solid ${s.bdLight}`,
                      },
                    },
                    (k === "nf"
                      ? ["Postagens", p && "Via Leitor", "Cancelamentos"]
                      : ["Faturamento", "Estoque", "Produção", "Postagens", p && "Via Leitor", "Cancelamentos"]
                    )
                      .filter(Boolean)
                      .map((S) => `${S}: ${F.filter((te) => String(te.origem).startsWith(S)).length}`)
                      .join(" · "),
                  ),
                y &&
                  o.default.createElement(
                    "div",
                    {
                      style: {
                        padding: "9px 12px",
                        color: s.red,
                        background: s.redBg,
                        fontSize: 11,
                        fontWeight: 800,
                        borderBottom: `1px solid ${s.redBd}`,
                      },
                    },
                    y,
                  ),
                m
                  ? o.default.createElement(
                      "div",
                      { style: { padding: 18, color: s.txtMuted, fontSize: 12, fontWeight: 800 } },
                      "Pesquisando...",
                    )
                  : F.length === 0
                    ? o.default.createElement(
                        "div",
                        { style: { padding: 18, color: s.txtMuted, fontSize: 12, fontWeight: 800 } },
                        `Nenhum registro encontrado para ${k === "nf" ? "essa NF" : "esse pedido"}.`,
                      )
                    : o.default.createElement(
                        "div",
                        { style: { overflowX: "auto", maxHeight: 280, overflowY: "auto" } },
                        o.default.createElement(
                          "table",
                          { style: { width: "100%", borderCollapse: "collapse", fontSize: 12 } },
                          o.default.createElement(
                            "thead",
                            null,
                            o.default.createElement(
                              "tr",
                              { style: { background: s.bgMuted } },
                              ["Origem", "Pedido", "Filial", "Produto", "Qtd", "Status", "Data", "Detalhe", ""].map(
                                (S) =>
                                  o.default.createElement(
                                    "th",
                                    {
                                      key: S,
                                      style: {
                                        padding: "9px 10px",
                                        textAlign: "left",
                                        fontSize: 10,
                                        color: s.txtSec,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.04em",
                                        whiteSpace: "nowrap",
                                      },
                                    },
                                    S,
                                  ),
                              ),
                            ),
                          ),
                          o.default.createElement(
                            "tbody",
                            null,
                            F.map((S, te) =>
                              o.default.createElement(
                                "tr",
                                {
                                  key: `${S.origem}-${S.pedido}-${te}`,
                                  style: { borderTop: `1px solid ${s.bdLight}` },
                                },
                                o.default.createElement(
                                  "td",
                                  {
                                    style: {
                                      padding: "9px 10px",
                                      fontWeight: 800,
                                      color: s.txtPri,
                                      whiteSpace: "nowrap",
                                    },
                                  },
                                  S.origem,
                                ),
                                o.default.createElement(
                                  "td",
                                  {
                                    style: {
                                      padding: "9px 10px",
                                      fontWeight: 800,
                                      color: s.primary,
                                      whiteSpace: "nowrap",
                                    },
                                  },
                                  S.pedido,
                                ),
                                o.default.createElement(
                                  "td",
                                  { style: { padding: "9px 10px", color: s.txtSec, whiteSpace: "nowrap" } },
                                  S.filial,
                                ),
                                o.default.createElement(
                                  "td",
                                  { style: { padding: "9px 10px", color: s.txtSec, whiteSpace: "nowrap" } },
                                  S.produto,
                                ),
                                o.default.createElement(
                                  "td",
                                  { style: { padding: "9px 10px", color: s.txtSec, whiteSpace: "nowrap" } },
                                  S.quantidade,
                                ),
                                o.default.createElement(
                                  "td",
                                  { style: { padding: "9px 10px", whiteSpace: "nowrap" } },
                                  o.default.createElement(gt, { texto: S.status, tipo: Ho(S.status) }),
                                ),
                                o.default.createElement(
                                  "td",
                                  { style: { padding: "9px 10px", color: s.txtSec, whiteSpace: "nowrap" } },
                                  S.data,
                                ),
                                o.default.createElement(
                                  "td",
                                  { style: { padding: "9px 10px", color: s.txtSec, minWidth: 220 } },
                                  S.detalhe,
                                ),
                                o.default.createElement(
                                  "td",
                                  { style: { padding: "9px 10px", textAlign: "right" } },
                                  o.default.createElement(
                                    "button",
                                    {
                                      type: "button",
                                      onClick: () => f(S.telaDestino),
                                      style: {
                                        border: `1px solid ${s.bdMid}`,
                                        background: s.bgCard,
                                        borderRadius: 9,
                                        padding: "6px 10px",
                                        cursor: "pointer",
                                        color: s.txtPri,
                                        fontWeight: 800,
                                        fontSize: 11,
                                        fontFamily: s.font,
                                      },
                                    },
                                    "Abrir",
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
              ),
          ),
          o.default.createElement(
            "div",
            { style: { display: c === "dashboard" ? "block" : "none" } },
            o.default.createElement(Ly, { setTela: f, ativo: c === "dashboard" }),
          ),
          o.default.createElement(
            "div",
            { style: { display: c === "faturamento" ? "block" : "none" } },
            o.default.createElement(hy, null),
          ),
          o.default.createElement(
            "div",
            { style: { display: c === "semEstoque" ? "block" : "none" } },
            o.default.createElement(T2, { ativo: c === "semEstoque" }),
          ),
          p &&
            o.default.createElement(
              "div",
              { style: { display: c === "listaFaturamento" ? "block" : "none" } },
              o.default.createElement(f2, { ativo: c === "listaFaturamento" }),
            ),
          p &&
            o.default.createElement(
              "div",
              { style: { display: c === "separacaoLista" ? "block" : "none" } },
              o.default.createElement(z2, { ativo: c === "separacaoLista" }),
            ),
          p &&
            o.default.createElement(
              "div",
              { style: { display: c === "faturamentoBB" ? "block" : "none" } },
              o.default.createElement(_2, { ativo: c === "faturamentoBB" }),
            ),
          p &&
            o.default.createElement(
              "div",
              { style: { display: c === "ajusteSaldoBB" ? "block" : "none" } },
              o.default.createElement(P2, { ativo: c === "ajusteSaldoBB" }),
            ),
          o.default.createElement(
            "div",
            { style: { display: c === "postagens" ? "block" : "none" } },
            o.default.createElement(Gy, { ativo: c === "postagens" }),
          ),
          p &&
            o.default.createElement(
              "div",
              { style: { display: c === "viaLeitor" ? "block" : "none" } },
              o.default.createElement(tb, { ativo: c === "viaLeitor" }),
            ),
          o.default.createElement(
            "div",
            { style: { display: c === "nfeTrancadas" ? "block" : "none" } },
            o.default.createElement(NfeTrancadasTela, { ativo: c === "nfeTrancadas" }),
          ),
          o.default.createElement(
            "div",
            { style: { display: c === "reenvio" ? "block" : "none" } },
            o.default.createElement(F2, { ativo: c === "reenvio", somenteLeitura: !p }),
          ),
          o.default.createElement(
            "div",
            { style: { display: c === "cancelamentos" ? "block" : "none" } },
            o.default.createElement(yb, { ativo: c === "cancelamentos", somenteLeitura: !p }),
          ),
          o.default.createElement(
            "div",
            { style: { display: c === "estoque" ? "block" : "none" } },
            o.default.createElement(vy, null),
          ),
          p &&
            o.default.createElement(
              "div",
              { style: { display: c === "ajusteSaldo" ? "block" : "none" } },
              o.default.createElement(yy, null),
            ),
          o.default.createElement(
            "div",
            { style: { display: c === "consultaPecas" ? "block" : "none" } },
            o.default.createElement(by, null),
          ),
          o.default.createElement(
            "div",
            { style: { display: c === "producao" ? "block" : "none" } },
            o.default.createElement(N0, { modo: "painel" }),
          ),
          o.default.createElement(
            "div",
            { style: { display: c === "producaoResumo" ? "block" : "none" } },
            o.default.createElement(N0, { modo: "resumo" }),
          ),
          p &&
            o.default.createElement(
              "div",
              { style: { display: c === "producaoSolicitacoes" ? "block" : "none" } },
              o.default.createElement(Sy, null),
            ),
          o.default.createElement(
            "div",
            { style: { display: c === "analiseTransformacoes" ? "block" : "none" } },
            o.default.createElement(xy, { somenteLeitura: !p }),
          ),
          o.default.createElement(
            "div",
            { style: { display: c === "consultaTransformacao" ? "block" : "none" } },
            o.default.createElement(By, null),
          ),
          o.default.createElement(
            "div",
            { style: { display: c === "pedidoVenda" ? "block" : "none" } },
            o.default.createElement(Ey, null),
          ),
          p &&
            o.default.createElement(
              "div",
              { style: { display: c === "indicadorDiario" ? "block" : "none" } },
              o.default.createElement(Cy, null),
            ),
          p &&
            o.default.createElement(
              "div",
              { style: { display: c === "indicadorExpedicaoDiario" ? "block" : "none" } },
              o.default.createElement(wy, null),
            ),
          p &&
            o.default.createElement(
              "div",
              { style: { display: c === "indicadorFaturamentoMensal" ? "block" : "none" } },
              o.default.createElement(T0, { tipo: "faturamento" }),
            ),
          p &&
            o.default.createElement(
              "div",
              { style: { display: c === "indicadorExpedicaoMensal" ? "block" : "none" } },
              o.default.createElement(T0, { tipo: "expedicao" }),
            ),
          p &&
            o.default.createElement(
              "div",
              { style: { display: c === "indicadorAbastecimentoEstoque" ? "block" : "none" } },
              o.default.createElement(Ay, null),
            ),
          p &&
            o.default.createElement(
              "div",
              { style: { display: c === "indicadorAbastecimentoMensal" ? "block" : "none" } },
              o.default.createElement(ky, null),
            ),
          p &&
            o.default.createElement(
              "div",
              { style: { display: c === "indicadorSeparacaoDiario" ? "block" : "none" } },
              o.default.createElement(mg, { ativo: c === "indicadorSeparacaoDiario", modo: "dia" }),
            ),
          p &&
            o.default.createElement(
              "div",
              { style: { display: c === "indicadorSeparacaoMensal" ? "block" : "none" } },
              o.default.createElement(mg, { ativo: c === "indicadorSeparacaoMensal", modo: "mes" }),
            ),
        ),
      )
    : o.default.createElement(gy, {
        onLogin: (S) => {
          (g("dashboard"), d(S));
        },
        tema: r,
        alternarTema: i,
      });
}
export default Ic;
