// Cole este arquivo em src/App.js
// Design "Aurora" — moderno com gradientes suaves, fonte Nunito, visual completamente renovado.
// Toda lógica, APIs e campos preservados sem alteração.

import React, { useCallback, useEffect, useMemo, useState } from 'react';

const API_BASE =
  'https://script.google.com/macros/s/AKfycbzpxMBPabGe5Xk16KQBmqmC7_SDzJrncmiAqTgU_Y0az1IkDzUawCW3qQ1gHCrutqlv/exec';
const LINK_APP_SOLICITAR =
  'https://script.google.com/a/macros/bbdi.com.br/s/AKfycbw_60TLX8mspcA1pjnX9XM5vOpFWh05Sps_ESjlQGTcUijq7Wlzd_O1UF6ChPtwkEXK/exec';
const LINK_APP_GESTAO =
  'https://script.google.com/a/macros/bbdi.com.br/s/AKfycbw_60TLX8mspcA1pjnX9XM5vOpFWh05Sps_ESjlQGTcUijq7Wlzd_O1UF6ChPtwkEXK/exec?page=gestao';
const LINK_APP_AJUSTE_SALDO =
  'https://script.google.com/a/macros/bbdi.com.br/s/AKfycby7AXNqbSs5ZRnLYa22oCk68S-i2Wuz_Nd8B-c1seLu6qdvfgdX1LvbA2p1Dww7FESZoA/exec';

const LINK_DASHBOARD_OPERACIONAL_LOGISTICA =
  'https://time-operacional.netlify.app/';

const LOGIN_USUARIO = 'BBDI';
const LOGIN_SENHA = 'BBDI@2026';
const LOGIN_STORAGE_KEY = 'painel_operacional_logado';

const FONTES_FATURAMENTO = [
  { key: 'equipatech', nome: 'Equipatech' },
  { key: 'bbbaterias', nome: 'BBBaterias' },
];

const FILTROS_FATURAMENTO_INICIAIS = {
  empresa: '',
  pedido: '',
  filial: '',
  dataLiberacao: '',
  quantidade: '',
  status: '',
  tempoPedido: '',
  dataPrazo: '',
  tempoRestanteCategoria: '',
  lista: '',
  faturador: '',
  statusSeparacao: '',
};
const FILTROS_ESTOQUE_INICIAIS = {
  status: '',
  produto: '',
  quantidade: '',
  filial: '',
  pedido: '',
  c5Desctrs: '',
  unidadeFaturamento: '',
  dataHoraFinanceiro: '',
  dataLancamento: '',
  dataHoraEntregueEstoque: '',
};
const FILTROS_CONSULTA_PECAS_INICIAIS = {
  filial: '',
  dataHora: '',
  vendedor: '',
  codigoPeca: '',
  tipoSolicitacao: '',
  status: '',
  tempoAguardando: '',
  tempoResposta: '',
  statusResposta: '',
  dataResposta: '',
  respondidoPor: '',
};
const FILTROS_AJUSTE_SALDO_INICIAIS = {
  data: '',
  solicitante: '',
  produto: '',
  lote: '',
  estoqueFisico: '',
  inventarioProtheus: '',
  ajusteSaldo: '',
  status: '',
  dataAjuste: '',
};
const FILTROS_AJUSTE_SALDO_BB_INICIAIS = {
  dataHora: '',
  nomes: '',
  produto: '',
  lote: '',
  estoqueFisico: '',
  inventarioProtheus: '',
  ajusteSaldo: '',
  status: '',
  dataHoraAjuste: '',
};
const FILTROS_PRODUCAO_INICIAIS = {
  dataHoraFinanceiro: '',
  pedido: '',
  cliente: '',
  produto: '',
  quantidadeLiberada: '',
  equipa01: '',
  equipa98: '',
  bbbaterias01: '',
  transporte: '',
  status: '',
};
const FILTROS_PRODUCAO_RESUMO_INICIAIS = {
  pedido: '',
  cliente: '',
  quantidadeTotal: '',
  totalItens: '',
  produzir: '',
  avisarVendedor: '',
  naoProduzir: '',
  transportes: '',
  statusResumo: '',
};
const FILTROS_PEDIDO_VENDA_INICIAIS = {
  dataHoraFinanceiro: '',
  pedido: '',
  cliente: '',
  produto: '',
  quantidadeLiberada: '',
  equipa01: '',
  equipa98: '',
  bateria01: '',
  endereco: '',
  status: '',
};
const FILTROS_INDICADOR_DIARIO_INICIAIS = {
  semana: '',
  mes: '',
  data: '',
  diaSemana: '',
  observacoes: '',
  pedidos001: '',
  pedidos002: '',
  pedidos005: '',
  pedidosGeral: '',
  unidades001: '',
  unidades002: '',
  unidades005: '',
  unidadesGeral: '',
  pedidos1030BB: '',
  pedidos1040BB: '',
  pedidos0104EQ: '',
  pedidos0105EQ: '',
};
const FILTROS_INDICADOR_EXPEDICAO_DIARIO_INICIAIS = {
  data: '',
  diaSemana: '',
  pedidos0101: '',
  pedidos1020: '',
  pedidosGeral: '',
  unidades0101: '',
  unidades1020: '',
  unidadesGeral: '',
  observacao: '',
  eqAtraso: '',
  eqFaturados: '',
  eqEnviados: '',
  eqAposLimiteExpedicao: '',
  eqUnidadesEnviadas: '',
  eqUnidadesFaturadas: '',
  bbAtraso: '',
  bbFaturados: '',
  bbTotalEnviados: '',
  bbFicouAposLimite: '',
  bbUnidadesEnviadas: '',
  bbUnidadesFaturadas: '',
  geralAtraso: '',
  geralFaturados: '',
  geralTotalEnviados: '',
};

const FILTROS_INDICADOR_ABASTECIMENTO_ESTOQUE_INICIAIS = {
  data: '',
  meta: '',
  realizado: '',
  percentualCalculado: '',
  statusMeta: '',
};

// ─── Helpers (lógica preservada) ───────────────────────────────────────────────

function normalizar(texto) {
  return String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function setCacheDadosPainel(fonte, dados) {
  if (typeof window === 'undefined') return;

  window.__BBDI_PAINEL_CACHE__ = window.__BBDI_PAINEL_CACHE__ || {};
  window.__BBDI_PAINEL_CACHE__[fonte] = Array.isArray(dados) ? dados : [];
}

function getCacheDadosPainel(fonte) {
  if (typeof window === 'undefined') return [];

  return window.__BBDI_PAINEL_CACHE__?.[fonte] || [];
}
function parseDataBR(dataTexto) {
  if (!dataTexto) return null;
  const partes = String(dataTexto)
    .trim()
    .match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (!partes) return null;
  const [, dia, mes, ano, hora, minuto, segundo = '0'] = partes;
  return new Date(
    Number(ano),
    Number(mes) - 1,
    Number(dia),
    Number(hora),
    Number(minuto),
    Number(segundo)
  );
}
function formatarDuracaoMs(ms) {
  if (ms === null || ms === undefined || Number.isNaN(ms)) return '—';

  const totalSegundos = Math.max(0, Math.floor(ms / 1000));
  const dias = Math.floor(totalSegundos / 86400);
  const horas = Math.floor((totalSegundos % 86400) / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;

  if (dias > 0) return `${dias}d ${horas}h ${minutos}min`;
  if (horas > 0) return `${horas}h ${minutos}min`;
  if (minutos > 0) return `${minutos}min ${segundos}s`;
  return `${segundos}s`;
}

function calcularTempoRespostaConsulta(dataSolicitacao, dataResposta) {
  const inicio = parseDataBR(dataSolicitacao);
  const fim = parseDataBR(dataResposta);

  if (!inicio || !fim) return '—';

  return formatarDuracaoMs(fim.getTime() - inicio.getTime());
}

function calcularStatusRespostaConsulta(dataSolicitacao, dataResposta) {
  const inicio = parseDataBR(dataSolicitacao);
  const fim = parseDataBR(dataResposta);

  if (!inicio || !fim) return 'Aguardando';

  const minutos = Math.floor(
    Math.max(0, fim.getTime() - inicio.getTime()) / 60000
  );

  return minutos <= 60 ? 'No prazo' : 'Atraso';
}

function calcularTempoRestante(dataPrazo, agora) {
  const prazo = parseDataBR(dataPrazo);
  if (!prazo)
    return {
      texto: '-',
      atrasado: false,
      urgente: false,
      categoria: 'Sem prazo',
    };
  const diffMs = prazo.getTime() - agora.getTime(),
    atrasado = diffMs < 0,
    total = Math.floor(Math.abs(diffMs) / 1000);
  const dias = Math.floor(total / 86400),
    horas = Math.floor((total % 86400) / 3600),
    minutos = Math.floor((total % 3600) / 60),
    segundos = total % 60;
  let texto =
    dias > 0
      ? `${dias}d ${horas}h ${minutos}min`
      : horas > 0
      ? `${horas}h ${minutos}min ${segundos}s`
      : `${minutos}min ${segundos}s`;
  const urgente = !atrasado && total <= 3600;
  return {
    texto: atrasado ? `Atrasado há ${texto}` : texto,
    atrasado,
    urgente,
    categoria: atrasado
      ? 'Atrasado'
      : urgente
      ? 'Vence em menos de 1h'
      : 'No prazo',
  };
}
function parseDataPeriodo(valor) {
  if (!valor) return null;
  if (valor instanceof Date && !Number.isNaN(valor.getTime())) return valor;
  const t = String(valor).trim(),
    p = t.match(
      /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})(?:[ ]+([0-9]{2}):([0-9]{2})(?::([0-9]{2}))?)?$/
    );
  if (p)
    return new Date(
      Number(p[3]),
      Number(p[2]) - 1,
      Number(p[1]),
      Number(p[4] || 0),
      Number(p[5] || 0),
      Number(p[6] || 0)
    );
  const d = new Date(t);
  return Number.isNaN(d.getTime()) ? null : d;
}
function inicioDoDia(d) {
  const r = new Date(d);
  r.setHours(0, 0, 0, 0);
  return r;
}
function fimDoDia(d) {
  const r = new Date(d);
  r.setHours(23, 59, 59, 999);
  return r;
}
function obterDataDoItem(item, campoData) {
  const campos = Array.isArray(campoData) ? campoData : [campoData];
  for (const c of campos) {
    const d = parseDataPeriodo(item[c]);
    if (d) return d;
  }
  return null;
}
function filtrarPorPeriodo(dados, campoData, periodo, diasPeriodo) {
  if (!periodo || periodo === 'todos') return dados;
  const hoje = new Date();
  let inicio = null,
    fim = null;
  if (periodo === 'hoje') {
    inicio = inicioDoDia(hoje);
    fim = fimDoDia(hoje);
  }
  if (periodo === 'ontem') {
    const o = new Date(hoje);
    o.setDate(o.getDate() - 1);
    inicio = inicioDoDia(o);
    fim = fimDoDia(o);
  }
  if (periodo === 'ultimos') {
    const dias = Math.max(1, Number(diasPeriodo || 7));
    inicio = inicioDoDia(hoje);
    inicio.setDate(inicio.getDate() - (dias - 1));
    fim = fimDoDia(hoje);
  }
  if (!inicio || !fim) return dados;
  return dados.filter((item) => {
    const d = obterDataDoItem(item, campoData);
    return d ? d >= inicio && d <= fim : false;
  });
}
function numeroPercentual(valor) {
  if (valor === null || valor === undefined || valor === '') return null;
  const n = Number(
    String(valor).replace('%', '').replace(/\./g, '').replace(',', '.').trim()
  );
  return Number.isNaN(n) ? null : n;
}
function mediaPercentual(dados, campo) {
  const vals = dados
    .map((i) => numeroPercentual(i[campo]))
    .filter((v) => v !== null);
  if (!vals.length) return '0,00%';
  return `${(vals.reduce((t, v) => t + v, 0) / vals.length)
    .toFixed(2)
    .replace('.', ',')}%`;
}
function numeroInteiro(valor) {
  if (valor === null || valor === undefined || valor === '') return 0;
  const n = Number(
    String(valor)
      .replace(/\./g, '')
      .replace(',', '.')
      .replace(/[^0-9.-]/g, '')
  );
  return Number.isNaN(n) ? 0 : n;
}
function somaCampo(dados, campo) {
  return dados.reduce((t, i) => t + numeroInteiro(i[campo]), 0);
}
function filtrarDados(dados, busca, filtros, camposBusca) {
  const termo = normalizar(busca);
  return dados.filter((item) => {
    const buscaOk =
      !termo || camposBusca.some((c) => normalizar(item[c]).includes(termo));
    const filtrosOk = Object.entries(filtros).every(
      ([c, v]) => !v || String(item[c] ?? '') === String(v)
    );
    return buscaOk && filtrosOk;
  });
}
function opcoesUnicas(dados, campo) {
  return [
    ...new Set(
      dados
        .map((i) => i[campo])
        .filter((v) => v !== undefined && v !== null && String(v).trim() !== '')
    ),
  ].sort((a, b) => String(a).localeCompare(String(b), 'pt-BR'));
}
function aplicarStatusSeparacaoEstoque(dados) {
  const grupos = new Map();
  dados.forEach((item, index) => {
    const p = String(item.pedido || `sem-${index}`).trim();
    if (!grupos.has(p)) grupos.set(p, []);
    grupos.get(p).push(item);
  });
  const statusPorPedido = new Map();
  grupos.forEach((itens, pedido) => {
    const total = itens.length,
      entregues = itens.filter((i) =>
        normalizar(i.status).includes('entregue')
      ).length;
    statusPorPedido.set(
      pedido,
      entregues === total && total > 0
        ? 'Separação concluída'
        : entregues > 0
        ? 'Em separação'
        : 'Separação não iniciada'
    );
  });
  return dados.map((item, index) => {
    const pedido = String(item.pedido || `sem-${index}`).trim(),
      situacao = statusPorPedido.get(pedido) || 'Separação não iniciada',
      statusOriginal = item.status || '';
    const itemEntregue = normalizar(statusOriginal).includes('entregue');
    return {
      ...item,
      statusOriginal,
      status:
        situacao === 'Em separação' && itemEntregue ? statusOriginal : situacao,
    };
  });
}
function tipoStatus(status) {
  const s = normalizar(status);
  if (
    s.includes('separacao nao iniciada') ||
    s.includes('separação não iniciada')
  )
    return 'vermelho';
  if (s.includes('em separacao') || s.includes('em separação'))
    return 'laranja';
  if (s.includes('separacao concluida') || s.includes('separação concluída'))
    return 'verde';
  if (
    s.includes('concluido') ||
    s.includes('concluído') ||
    s.includes('concluida') ||
    s.includes('concluída')
  )
    return 'verde';
  if (s.includes('avisar vendedor')) return 'vermelho';
  if (s === 'produzir') return 'azul';
  if (s.includes('nao produzir') || s.includes('não produzir')) return 'verde';
  if (s.includes('no prazo')) return 'verde';
  if (s.includes('atras')) return 'vermelho';
  if (s.includes('entregue')) return 'verde';
  if (s.includes('disponivel')) return 'verde';
  if (s.includes('indisponivel')) return 'vermelho';
  if (s.includes('aguardando')) return 'laranja';
  if (s.includes('pendente')) return 'vermelho';
  if (s.includes('verificando saldo')) return 'laranja';
  if (s.includes('ajustado') || s.includes('resolvido')) return 'verde';
  return 'cinza';
}
function tipoStatusPedidoVenda(status) {
  const s = normalizar(status);

  if (s.includes('avisado')) return 'azul';

  if (
    s.includes('comprar') &&
    !s.includes('nao comprar') &&
    !s.includes('não comprar')
  ) {
    return 'verde';
  }

  if (s.includes('nao comprar') || s.includes('não comprar')) {
    return 'vermelho';
  }

  return tipoStatus(status);
}

function formatarNumeroInteiro(valor) {
  if (valor === null || valor === undefined || valor === '') return '0';

  const numero = Number(
    String(valor)
      .replace(/\./g, '')
      .replace(',', '.')
      .replace(/[^0-9.-]/g, '')
  );

  if (Number.isNaN(numero)) return String(valor || '0');

  return Math.round(numero).toLocaleString('pt-BR');
}

function tipoSeparacao(status) {
  const s = normalizar(status);
  if (!s) return 'cinza';
  if (s.includes('conclu') || s.includes('entregue')) return 'verde';
  if (s.includes('nao iniciada')) return 'vermelho';
  if (s.includes('pedido de venda')) return 'azul';
  return 'cinza';
}
function tipoTempoRestante(r) {
  if (r.atrasado) return 'vermelho';
  if (r.urgente) return 'laranja';
  if (r.texto === '-') return 'cinza';
  return 'verde';
}
function obterValorOrdenacao(valor) {
  if (valor === null || valor === undefined || valor === '') return '';
  const texto = String(valor).trim(),
    data = parseDataBR(texto);
  if (data) return data.getTime();
  const n = Number(
    texto
      .split('.')
      .join('')
      .replace(',', '.')
      .replace(/[^0-9.-]/g, '')
  );
  return !Number.isNaN(n) && /[0-9]/.test(texto) ? n : normalizar(texto);
}
function ordenarDados(dados, sortConfig) {
  if (!sortConfig.campo || !sortConfig.direcao) return dados;
  return [...dados].sort((a, b) => {
    const vA = obterValorOrdenacao(a[sortConfig.campo]),
      vB = obterValorOrdenacao(b[sortConfig.campo]);
    if (vA === '' && vB !== '') return 1;
    if (vA !== '' && vB === '') return -1;
    if (vA === '' && vB === '') return 0;
    const r =
      typeof vA === 'number' && typeof vB === 'number'
        ? vA - vB
        : String(vA).localeCompare(String(vB), 'pt-BR', {
            numeric: true,
            sensitivity: 'base',
          });
    return sortConfig.direcao === 'asc' ? r : -r;
  });
}
function proximaDirecaoOrdenacao(sc, campo) {
  if (sc.campo !== campo) return 'asc';
  if (sc.direcao === 'asc') return 'desc';
  if (sc.direcao === 'desc') return '';
  return 'asc';
}
function gerarResumoProducaoLocal(dados) {
  const mapa = new Map();
  dados.forEach((item) => {
    const pedido = item.pedido || '-';
    if (!mapa.has(pedido))
      mapa.set(pedido, {
        pedido,
        cliente: item.cliente || '',
        quantidadeTotal: 0,
        totalItens: 0,
        produzir: 0,
        avisarVendedor: 0,
        naoProduzir: 0,
        transportesLista: new Set(),
        statusResumo: '',
      });
    const r = mapa.get(pedido),
      qt = Number(
        item.quantidadeLiberadaNumero || item.quantidadeLiberada || 0
      );
    r.quantidadeTotal += Number.isNaN(qt) ? 0 : qt;
    r.totalItens += 1;
    const s = normalizar(item.status);
    if (s === 'produzir') r.produzir += 1;
    if (s.includes('avisar vendedor')) r.avisarVendedor += 1;
    if (s.includes('nao produzir') || s.includes('não produzir'))
      r.naoProduzir += 1;
    if (item.transporte) r.transportesLista.add(item.transporte);
  });
  return Array.from(mapa.values()).map((item) => {
    let sr = 'Não produzir';
    if (item.avisarVendedor > 0) sr = 'Avisar vendedor';
    else if (item.produzir > 0) sr = 'Produzir';
    return {
      ...item,
      statusResumo: sr,
      transportes: Array.from(item.transportesLista).join(', '),
      transportesLista: undefined,
    };
  });
}

// ─── Design System "Aurora" ────────────────────────────────────────────────────

const C = {
  // Sidebar
  sidebarBg: 'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
  sidebarBd: 'rgba(255,255,255,0.07)',

  // Accent gradients
  grad1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // violet
  grad2: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', // teal-green
  grad3: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // pink-red
  grad4: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // sky-blue
  grad5: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', // pink-gold
  grad6: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', // lavender

  // Primary accent
  primary: '#667eea',
  primaryDark: '#5a67d8',
  primaryLight: '#ebf4ff',
  primaryGrad: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',

  // Backgrounds
  bgPage: 'linear-gradient(135deg, #f5f7fa 0%, #eef1f8 100%)',
  bgCard: '#ffffff',
  bgCardGrad: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
  bgStripe: '#f8f9ff',
  bgMuted: '#f0f3ff',

  // Text
  txtPri: '#1a1f36',
  txtSec: '#525f7f',
  txtMuted: '#8898aa',

  // Borders
  bdLight: '#e8ecf4',
  bdMid: '#d2d9e8',

  // Status colors
  green: '#11998e',
  greenBg: '#e6faf7',
  greenBd: '#a7e9e3',
  red: '#e53e3e',
  redBg: '#fff5f5',
  redBd: '#fed7d7',
  amber: '#d97706',
  amberBg: '#fffbeb',
  amberBd: '#fde68a',
  blue: '#3182ce',
  blueBg: '#ebf8ff',
  blueBd: '#bee3f8',

  // Shadows
  shadowSm: '0 2px 8px rgba(102,126,234,0.08), 0 1px 3px rgba(0,0,0,0.05)',
  shadowMd: '0 4px 20px rgba(102,126,234,0.12), 0 2px 8px rgba(0,0,0,0.06)',
  shadowLg: '0 8px 32px rgba(102,126,234,0.16), 0 4px 12px rgba(0,0,0,0.08)',
  shadowXl: '0 20px 60px rgba(15,12,41,0.35)',
  shadowCard: '0 2px 16px rgba(102,126,234,0.10), 0 1px 4px rgba(0,0,0,0.04)',

  radius: { sm: 6, md: 12, lg: 16, xl: 20, pill: 999 },
  font: "'Nunito', 'Segoe UI', sans-serif",
  fontMono: "'JetBrains Mono', monospace",
};

// ─── Componentes visuais ───────────────────────────────────────────────────────

function Badge({ texto, tipo }) {
  const m = {
    verde: { bg: C.greenBg, color: C.green, bd: C.greenBd },
    vermelho: { bg: C.redBg, color: C.red, bd: C.redBd },
    azul: { bg: C.blueBg, color: C.blue, bd: C.blueBd },
    laranja: { bg: C.amberBg, color: C.amber, bd: C.amberBd },
    cinza: { bg: C.bgMuted, color: C.txtMuted, bd: C.bdLight },
  };
  const cor = m[tipo] || m.cinza;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: cor.bg,
        color: cor.color,
        border: `1.5px solid ${cor.bd}`,
        padding: '2px 9px',
        borderRadius: C.radius.pill,
        fontSize: 10,
        fontWeight: 800,
        fontFamily: C.font,
        letterSpacing: '0.03em',
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
      }}
    >
      {texto || '—'}
    </span>
  );
}

function Kpi({ titulo, valor, subtitulo, onClick, ativo }) {
  const gradients = [C.grad1, C.grad4, C.grad2, C.grad5, C.grad6, C.grad3];
  const idx =
    Math.abs(titulo.charCodeAt(0) + titulo.charCodeAt(1)) % gradients.length;
  const grad = gradients[idx];
  return (
    <div
      onClick={onClick}
      style={{
        background: C.bgCard,
        borderRadius: C.radius.xl,
        padding: '18px 20px 16px',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: ativo ? `0 8px 28px rgba(102,126,234,0.25)` : C.shadowCard,
        border: ativo
          ? '2px solid rgba(102,126,234,0.4)'
          : `1.5px solid ${C.bdLight}`,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 180ms ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: grad,
          borderRadius: `${C.radius.xl}px ${C.radius.xl}px 0 0`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -18,
          right: -12,
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: grad,
          opacity: 0.06,
        }}
      />
      <div
        style={{
          fontSize: 10,
          fontWeight: 800,
          color: C.txtMuted,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontFamily: C.font,
          marginBottom: 10,
        }}
      >
        {titulo}
      </div>
      <div
        style={{
          fontSize: 30,
          fontWeight: 900,
          color: ativo ? C.primary : C.txtPri,
          fontFamily: C.fontMono,
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
      >
        {valor ?? 0}
      </div>
      {onClick && (
        <div
          style={{
            marginTop: 10,
            fontSize: 9,
            color: ativo ? C.primary : C.txtMuted,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            fontFamily: C.font,
          }}
        >
          {ativo ? '● Filtrado' : 'clique para filtrar'}
        </div>
      )}
    </div>
  );
}

function CabecalhoComFiltro({
  titulo,
  value,
  onChange,
  options,
  sortOrder,
  onSort,
}) {
  const ativo = value !== '';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <span style={{ flex: 1, fontFamily: C.font }}>{titulo}</span>
      <button
        type="button"
        onClick={onSort}
        style={{
          width: 18,
          height: 18,
          borderRadius: 5,
          fontSize: 9,
          cursor: 'pointer',
          padding: 0,
          fontWeight: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: sortOrder ? 'rgba(102,126,234,0.12)' : 'transparent',
          border: sortOrder
            ? '1px solid rgba(102,126,234,0.4)'
            : `1px solid ${C.bdMid}`,
          color: sortOrder ? C.primary : C.txtMuted,
        }}
      >
        {sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : '↕'}
      </button>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: 18,
          height: 18,
          borderRadius: 5,
          fontSize: 8,
          cursor: 'pointer',
          padding: 0,
          color: 'transparent',
          flexShrink: 0,
          background: ativo ? 'rgba(102,126,234,0.10)' : 'transparent',
          border: ativo
            ? '1px solid rgba(102,126,234,0.4)'
            : `1px solid ${C.bdMid}`,
        }}
      >
        <option value=""></option>
        {options.map((o) => (
          <option key={o} value={o} style={{ color: C.txtPri }}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function MenuBtn({ ativo, onClick, children, icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        borderRadius: C.radius.md,
        padding: '10px 13px',
        cursor: 'pointer',
        textAlign: 'left',
        fontWeight: 700,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: C.font,
        letterSpacing: '-0.01em',
        transition: 'all 150ms ease',
        color: ativo ? '#fff' : 'rgba(255,255,255,0.55)',
        background: ativo ? C.primaryGrad : 'transparent',
        border: ativo
          ? '1px solid rgba(255,255,255,0.15)'
          : '1px solid transparent',
        boxShadow: ativo ? '0 4px 20px rgba(102,126,234,0.45)' : 'none',
      }}
    >
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: 8,
          flexShrink: 0,
          background: ativo
            ? 'rgba(255,255,255,0.22)'
            : 'rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 900,
          color: ativo ? '#fff' : 'rgba(255,255,255,0.45)',
        }}
      >
        {icon}
      </span>
      <span style={{ flex: 1 }}>{children}</span>
    </button>
  );
}

function MenuGrupBtn({ ativo, onClick, children, icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        borderRadius: C.radius.md,
        padding: '10px 13px',
        cursor: 'pointer',
        textAlign: 'left',
        fontWeight: 700,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: C.font,
        letterSpacing: '-0.01em',
        transition: 'all 150ms ease',
        color: ativo ? '#fff' : 'rgba(255,255,255,0.55)',
        background: ativo ? C.primaryGrad : 'transparent',
        border: ativo
          ? '1px solid rgba(255,255,255,0.15)'
          : '1px solid transparent',
        boxShadow: ativo ? '0 4px 20px rgba(102,126,234,0.45)' : 'none',
      }}
    >
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: 8,
          flexShrink: 0,
          background: ativo
            ? 'rgba(255,255,255,0.22)'
            : 'rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 900,
          color: ativo ? '#fff' : 'rgba(255,255,255,0.45)',
        }}
      >
        {icon}
      </span>
      <span style={{ flex: 1 }}>{children}</span>
      <span
        style={{
          fontSize: 13,
          color: ativo ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
          fontWeight: 700,
        }}
      >
        {ativo ? '▾' : '›'}
      </span>
    </button>
  );
}

function SubMenuBtn({ ativo, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        border: 'none',
        borderRadius: 9,
        padding: '8px 12px 8px 18px',
        marginBottom: 2,
        cursor: 'pointer',
        textAlign: 'left',
        fontWeight: 600,
        fontSize: 12,
        fontFamily: C.font,
        transition: 'all 140ms ease',
        color: ativo ? '#e9d5ff' : 'rgba(255,255,255,0.40)',
        background: ativo ? 'rgba(167,139,250,0.22)' : 'transparent',
        borderLeft: ativo
          ? '3px solid #a78bfa'
          : '3px solid rgba(255,255,255,0.10)',
      }}
    >
      {children}
    </button>
  );
}

function BotaoLink({ href, children, variante = 'primario' }) {
  const p = variante === 'primario';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        height: 36,
        borderRadius: C.radius.md,
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontWeight: 700,
        fontSize: 12,
        fontFamily: C.font,
        letterSpacing: '-0.01em',
        background: p ? C.primaryGrad : C.bgCard,
        color: p ? '#fff' : C.txtPri,
        border: p ? 'none' : `1.5px solid ${C.bdMid}`,
        boxShadow: p ? '0 4px 14px rgba(102,126,234,0.35)' : C.shadowSm,
      }}
    >
      {children}
    </a>
  );
}

function ContadorRegistros({ filtrados, total }) {
  return (
    <span
      style={{
        color: C.txtMuted,
        fontSize: 11,
        fontWeight: 700,
        fontFamily: C.font,
        background: C.bgMuted,
        border: `1.5px solid ${C.bdLight}`,
        borderRadius: C.radius.pill,
        padding: '4px 11px',
      }}
    >
      {filtrados} / {total}
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
  const [sc, setSc] = useState({ campo: '', direcao: '' });
  const dadosOrd = useMemo(
    () => ordenarDados(dadosFiltrados, sc),
    [dadosFiltrados, sc]
  );
  return (
    <section
      style={{
        background: C.bgCard,
        border: `1.5px solid ${C.bdLight}`,
        borderRadius: C.radius.xl,
        overflow: 'hidden',
        boxShadow: C.shadowCard,
      }}
    >
      <div
        style={{
          padding: '14px 18px',
          borderBottom: `1.5px solid ${C.bdLight}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg,#fafbff 0%,#f5f7ff 100%)',
        }}
      >
        <span
          style={{
            fontWeight: 800,
            color: C.txtPri,
            fontSize: 14,
            fontFamily: C.font,
            letterSpacing: '-0.02em',
          }}
        >
          {titulo}
        </span>
        <ContadorRegistros
          filtrados={dadosFiltrados.length}
          total={dadosBase.length}
        />
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 12,
            fontFamily: C.font,
          }}
        >
          <thead>
            <tr
              style={{
                background: 'linear-gradient(135deg,#f0f3ff 0%,#e8ecff 100%)',
              }}
            >
              {colunas.map((col) => (
                <th
                  key={col.campo}
                  style={{
                    textAlign: 'left',
                    padding: '9px 10px',
                    color: C.txtSec,
                    fontSize: 9,
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    fontWeight: 900,
                    letterSpacing: '0.07em',
                    borderBottom: `1.5px solid ${C.bdLight}`,
                    width: col.width,
                    minWidth: col.minWidth || col.width,
                  }}
                >
                  <CabecalhoComFiltro
                    titulo={col.titulo}
                    value={filtros[col.campo] || ''}
                    onChange={(v) => onFiltro(col.campo, v)}
                    options={opcoesUnicas(dadosBase, col.campo)}
                    sortOrder={sc.campo === col.campo ? sc.direcao : ''}
                    onSort={() =>
                      setSc((cur) => ({
                        campo: col.campo,
                        direcao: proximaDirecaoOrdenacao(cur, col.campo),
                      }))
                    }
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {carregando && !dadosOrd.length && (
              <tr>
                <td
                  colSpan={colunas.length}
                  style={{
                    padding: 28,
                    textAlign: 'center',
                    color: C.txtMuted,
                    fontFamily: C.font,
                  }}
                >
                  Carregando dados…
                </td>
              </tr>
            )}
            {!carregando && !dadosOrd.length && (
              <tr>
                <td
                  colSpan={colunas.length}
                  style={{
                    padding: 28,
                    textAlign: 'center',
                    color: C.txtMuted,
                    fontFamily: C.font,
                  }}
                >
                  {mensagemVazia}
                </td>
              </tr>
            )}
            {dadosOrd.map((item, idx) => (
              <tr
                key={`r${idx}`}
                style={{
                  borderTop: `1px solid ${C.bdLight}`,
                  background: idx % 2 === 0 ? '#fff' : C.bgStripe,
                  transition: 'background 100ms',
                }}
              >
                {colunas.map((col) => (
                  <td
                    key={col.campo}
                    style={{
                      padding: '8px 10px',
                      whiteSpace: col.wrap ? 'normal' : 'nowrap',
                      lineHeight: col.wrap ? 1.3 : undefined,
                      color: col.bold ? C.txtPri : C.txtSec,
                      fontWeight: col.bold ? 700 : 400,
                      fontSize: 12,
                      width: col.width,
                      minWidth: col.minWidth || col.width,
                    }}
                  >
                    {col.render ? col.render(item) : item[col.campo] || '—'}
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

function PageHeader({ titulo, atualizadoEm, extraInfo, actions }) {
  return (
    <header
      style={{
        background: C.bgCard,
        borderRadius: C.radius.xl,
        padding: '20px 24px',
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        boxShadow: C.shadowCard,
        border: `1.5px solid ${C.bdLight}`,
        borderTop: `3px solid transparent`,
        borderImage: `${C.grad1} 1`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: C.primaryGrad,
        }}
      />
      <div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: C.primary,
            textTransform: 'uppercase',
            letterSpacing: '0.09em',
            marginBottom: 7,
            fontFamily: C.font,
          }}
        >
          Painel Operacional
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 24,
            color: C.txtPri,
            fontWeight: 900,
            letterSpacing: '-0.04em',
            fontFamily: C.font,
          }}
        >
          {titulo}
        </h1>
        {(atualizadoEm || extraInfo) && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 14,
              marginTop: 8,
              color: C.txtMuted,
              fontSize: 11,
              fontFamily: C.font,
            }}
          >
            {atualizadoEm && (
              <span>
                Atualizado:{' '}
                <strong style={{ color: C.txtSec }}>{atualizadoEm}</strong>
              </span>
            )}
            {extraInfo}
          </div>
        )}
      </div>
      {actions && (
        <div
          style={{
            display: 'flex',
            gap: 9,
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
          }}
        >
          {actions}
        </div>
      )}
    </header>
  );
}

const btnAtualizar = (loading) => ({
  height: 36,
  border: `1.5px solid ${C.bdMid}`,
  background: loading ? C.bgMuted : C.bgCard,
  borderRadius: C.radius.md,
  padding: '0 16px',
  cursor: loading ? 'not-allowed' : 'pointer',
  fontWeight: 700,
  color: C.txtPri,
  fontSize: 12,
  fontFamily: C.font,
  boxShadow: C.shadowSm,
});
const erroEl = {
  background: C.redBg,
  color: C.red,
  padding: 12,
  borderRadius: C.radius.md,
  marginBottom: 16,
  fontWeight: 700,
  border: `1.5px solid ${C.redBd}`,
  fontSize: 12,
  fontFamily: C.font,
};
const inputEl = {
  border: `1.5px solid ${C.bdMid}`,
  borderRadius: C.radius.md,
  padding: '8px 12px',
  fontSize: 12,
  outline: 'none',
  background: C.bgCard,
  height: 36,
  boxSizing: 'border-box',
  fontFamily: C.font,
  color: C.txtPri,
  flex: '1 1 220px',
  maxWidth: 480,
  boxShadow: C.shadowSm,
};
const selectEl = {
  border: `1.5px solid ${C.bdMid}`,
  borderRadius: C.radius.md,
  padding: '6px 10px',
  fontSize: 12,
  outline: 'none',
  background: C.bgCard,
  color: C.txtPri,
  fontWeight: 700,
  height: 36,
  boxSizing: 'border-box',
  fontFamily: C.font,
  boxShadow: C.shadowSm,
};
const btnLimpar = {
  border: 'none',
  borderRadius: C.radius.md,
  padding: '6px 10px',
  fontSize: 11,
  fontWeight: 800,
  background: 'transparent',
  color: C.primary,
  cursor: 'pointer',
  height: 36,
  fontFamily: C.font,
};

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
  return (
    <section
      style={{
        marginBottom: 16,
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <input
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder={placeholder}
        style={inputEl}
      />
      {setPeriodoFiltro && (
        <>
          <select
            value={periodoFiltro}
            onChange={(e) => setPeriodoFiltro(e.target.value)}
            style={selectEl}
          >
            <option value="todos">Todos os períodos</option>
            <option value="hoje">Hoje</option>
            <option value="ontem">Ontem</option>
            <option value="ultimos">Últimos X dias</option>
          </select>
          {periodoFiltro === 'ultimos' && (
            <input
              type="number"
              min="1"
              value={diasPeriodo}
              onChange={(e) => setDiasPeriodo(e.target.value)}
              style={{ ...selectEl, width: 64 }}
            />
          )}
        </>
      )}
      <button onClick={limparFiltros} style={btnLimpar}>
        Limpar filtros
      </button>
    </section>
  );
}

// ─── Login ─────────────────────────────────────────────────────────────────────

function TelaLogin({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  function entrar(e) {
    e.preventDefault();
    if (
      usuario.trim().toUpperCase() !== LOGIN_USUARIO ||
      senha !== LOGIN_SENHA
    ) {
      setErro('Usuário ou senha inválidos.');
      return;
    }
    localStorage.setItem(LOGIN_STORAGE_KEY, 'true');
    onLogin();
  }
  return (
    <div
      style={{
        minHeight: '100vh',
        background: C.sidebarBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        fontFamily: C.font,
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: 'fixed',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 500,
          height: 500,
          background:
            'radial-gradient(circle, rgba(102,126,234,0.18) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <form
        onSubmit={entrar}
        style={{
          width: '100%',
          maxWidth: 400,
          background: 'rgba(255,255,255,0.97)',
          borderRadius: 24,
          padding: 36,
          boxShadow: C.shadowXl,
          border: '1px solid rgba(255,255,255,0.6)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: C.primaryGrad,
            borderRadius: '24px 24px 0 0',
          }}
        />
        <div
          style={{
            display: 'flex',
            gap: 13,
            alignItems: 'center',
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: C.primaryGrad,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 22,
              color: '#fff',
              flexShrink: 0,
              boxShadow: '0 6px 20px rgba(102,126,234,0.4)',
            }}
          >
            B
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 900,
                color: C.txtPri,
                letterSpacing: '-0.04em',
              }}
            >
              Painel Operacional
            </h1>
            <p
              style={{
                margin: '3px 0 0',
                color: C.txtMuted,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Grupo BBDI — Acesso interno
            </p>
          </div>
        </div>
        <div style={{ height: 1, background: C.bdLight, margin: '0 0 24px' }} />
        <label
          style={{
            display: 'block',
            fontSize: 11,
            fontWeight: 800,
            color: C.txtSec,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            marginBottom: 7,
          }}
        >
          Usuário
        </label>
        <input
          value={usuario}
          onChange={(e) => {
            setUsuario(e.target.value);
            setErro('');
          }}
          placeholder="Digite o usuário"
          autoComplete="username"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            border: `1.5px solid ${C.bdMid}`,
            borderRadius: C.radius.md,
            padding: '12px 14px',
            fontSize: 14,
            outline: 'none',
            background: C.bgStripe,
            fontFamily: C.font,
            color: C.txtPri,
            marginBottom: 16,
          }}
        />
        <label
          style={{
            display: 'block',
            fontSize: 11,
            fontWeight: 800,
            color: C.txtSec,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            marginBottom: 7,
          }}
        >
          Senha
        </label>
        <input
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setErro('');
          }}
          placeholder="••••••••"
          type="password"
          autoComplete="current-password"
          style={{
            width: '100%',
            boxSizing: 'border-box',
            border: `1.5px solid ${C.bdMid}`,
            borderRadius: C.radius.md,
            padding: '12px 14px',
            fontSize: 14,
            outline: 'none',
            background: C.bgStripe,
            fontFamily: C.font,
            color: C.txtPri,
          }}
        />
        {erro && (
          <div
            style={{
              background: C.redBg,
              color: C.red,
              borderRadius: C.radius.md,
              padding: '10px 13px',
              fontSize: 12,
              fontWeight: 700,
              marginTop: 14,
              border: `1.5px solid ${C.redBd}`,
            }}
          >
            {erro}
          </div>
        )}
        <button
          type="submit"
          style={{
            width: '100%',
            height: 46,
            border: 'none',
            borderRadius: C.radius.md,
            marginTop: 22,
            background: C.primaryGrad,
            color: '#fff',
            fontWeight: 800,
            fontSize: 14,
            cursor: 'pointer',
            fontFamily: C.font,
            boxShadow: '0 6px 20px rgba(102,126,234,0.40)',
          }}
        >
          Entrar
        </button>
        <p
          style={{
            marginTop: 18,
            color: C.txtMuted,
            fontSize: 10,
            lineHeight: 1.5,
            textAlign: 'center',
          }}
        >
          Ambiente de visualização operacional. Informações extraídas das bases
          conectadas ao Apps Script.
        </p>
      </form>
    </div>
  );
}

// ─── Telas ─────────────────────────────────────────────────────────────────────

function TelaFaturamento() {
  const [dados, setDados] = useState([]);
  const [atualizacoes, setAtualizacoes] = useState({});
  const [busca, setBusca] = useState('');
  const [periodoFiltro, setPeriodoFiltro] = useState('todos');
  const [diasPeriodo, setDiasPeriodo] = useState('7');
  const [filtrosColuna, setFiltrosColuna] = useState(
    FILTROS_FATURAMENTO_INICIAIS
  );
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const carregarDados = useCallback(async () => {
    setCarregando(true);
    setErro('');
    try {
      const rs = await Promise.all(
        FONTES_FATURAMENTO.map(async (f) => {
          const r = await fetch(`${API_BASE}?action=dados&fonte=${f.key}`),
            j = await r.json();
          if (!j.ok) throw new Error(j.erro || `Erro ${f.nome}`);
          return {
            fonte: f.key,
            nomeFonte: f.nome,
            atualizadoEm: j.atualizadoEm || '',
            dados: (j.dados || []).map((i) => ({
              ...i,
              empresa: f.nome,
              fonte: f.key,
            })),
          };
        })
      );
      const dadosConsolidados = rs.flatMap((r) => r.dados);
      setDados(dadosConsolidados);
      rs.forEach((r) => setCacheDadosPainel(r.fonte, r.dados));
      const a = {};
      rs.forEach((r) => {
        a[r.nomeFonte] = r.atualizadoEm;
      });
      setAtualizacoes(a);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, []);
  useEffect(() => {
    carregarDados();
    const i = setInterval(carregarDados, 60000);
    return () => clearInterval(i);
  }, [carregarDados]);

  const dadosComTempo = useMemo(
    () =>
      dados.map((item) => {
        const t = calcularTempoRestante(item.dataPrazo, agora);
        return {
          ...item,
          tempoRestanteCalculado: t.texto,
          tempoRestanteAtrasado: t.atrasado,
          tempoRestanteUrgente: t.urgente,
          tempoRestanteCategoria: t.categoria,
        };
      }),
    [dados, agora]
  );
  const dadosPeriodo = useMemo(
    () =>
      filtrarPorPeriodo(
        dadosComTempo,
        'dataLiberacao',
        periodoFiltro,
        diasPeriodo
      ),
    [dadosComTempo, periodoFiltro, diasPeriodo]
  );
  const dadosFiltrados = useMemo(
    () =>
      filtrarDados(dadosPeriodo, busca, filtrosColuna, [
        'empresa',
        'pedido',
        'filial',
        'dataLiberacao',
        'quantidade',
        'status',
        'tempoPedido',
        'dataPrazo',
        'tempoRestanteCalculado',
        'lista',
        'faturador',
        'statusSeparacao',
      ]),
    [dadosPeriodo, busca, filtrosColuna]
  );
  const kpis = useMemo(
    () => ({
      totalEQ: dadosFiltrados.filter((i) => i.fonte === 'equipatech').length,
      urgEQ: dadosFiltrados.filter(
        (i) => i.fonte === 'equipatech' && i.tempoRestanteUrgente
      ).length,
      totalBB: dadosFiltrados.filter((i) => i.fonte === 'bbbaterias').length,
      urgBB: dadosFiltrados.filter(
        (i) => i.fonte === 'bbbaterias' && i.tempoRestanteUrgente
      ).length,
    }),
    [dadosFiltrados]
  );

  const colunas = [
    { campo: 'filial', titulo: 'Filial', bold: true, width: 54 },
    { campo: 'pedido', titulo: 'Pedido', bold: true, width: 74 },
    { campo: 'dataLiberacao', titulo: 'Data Lib.', width: 108 },
    { campo: 'quantidade', titulo: 'Qtd', width: 52 },
    {
      campo: 'status',
      titulo: 'Status',
      width: 94,
      render: (i) => <Badge texto={i.status} tipo={tipoStatus(i.status)} />,
    },
    { campo: 'tempoPedido', titulo: 'Tempo', width: 82 },
    { campo: 'dataPrazo', titulo: 'Prazo', width: 108 },
    {
      campo: 'tempoRestanteCategoria',
      titulo: 'Restante',
      bold: true,
      width: 130,
      render: (i) => (
        <Badge
          texto={i.tempoRestanteCalculado}
          tipo={tipoTempoRestante({
            texto: i.tempoRestanteCalculado,
            atrasado: i.tempoRestanteAtrasado,
            urgente: i.tempoRestanteUrgente,
          })}
        />
      ),
    },
    { campo: 'lista', titulo: 'Lista', width: 82 },
    { campo: 'faturador', titulo: 'Faturador', width: 92, wrap: true },
    {
      campo: 'statusSeparacao',
      titulo: 'Separação',
      width: 130,
      render: (i) => (
        <Badge
          texto={i.statusSeparacao}
          tipo={tipoSeparacao(i.statusSeparacao)}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        titulo="Faturamento"
        extraInfo={
          <>
            <span>
              Equipatech:{' '}
              <strong style={{ color: C.txtSec }}>
                {atualizacoes.Equipatech || '—'}
              </strong>
            </span>
            <span>
              BBBaterias:{' '}
              <strong style={{ color: C.txtSec }}>
                {atualizacoes.BBBaterias || '—'}
              </strong>
            </span>
            <span style={{ fontFamily: C.fontMono }}>
              {agora.toLocaleTimeString('pt-BR')}
            </span>
          </>
        }
        actions={
          <button
            onClick={carregarDados}
            disabled={carregando}
            style={btnAtualizar(carregando)}
          >
            {carregando ? 'Atualizando…' : 'Atualizar'}
          </button>
        }
      />
      {erro && <div style={erroEl}>{erro}</div>}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
          gap: 12,
          marginBottom: 18,
        }}
      >
        <Kpi
          titulo="Total Equipatech"
          valor={kpis.totalEQ}
          onClick={() => {
            setBusca('');
            setFiltrosColuna({
              ...FILTROS_FATURAMENTO_INICIAIS,
              empresa: 'Equipatech',
            });
          }}
          ativo={
            filtrosColuna.empresa === 'Equipatech' &&
            !filtrosColuna.tempoRestanteCategoria
          }
        />
        <Kpi
          titulo="Vencem &lt;1h · Equipatech"
          valor={kpis.urgEQ}
          onClick={() => {
            setBusca('');
            setFiltrosColuna({
              ...FILTROS_FATURAMENTO_INICIAIS,
              empresa: 'Equipatech',
              tempoRestanteCategoria: 'Vence em menos de 1h',
            });
          }}
          ativo={
            filtrosColuna.empresa === 'Equipatech' &&
            filtrosColuna.tempoRestanteCategoria === 'Vence em menos de 1h'
          }
        />
        <Kpi
          titulo="Total BBBaterias"
          valor={kpis.totalBB}
          onClick={() => {
            setBusca('');
            setFiltrosColuna({
              ...FILTROS_FATURAMENTO_INICIAIS,
              empresa: 'BBBaterias',
            });
          }}
          ativo={
            filtrosColuna.empresa === 'BBBaterias' &&
            !filtrosColuna.tempoRestanteCategoria
          }
        />
        <Kpi
          titulo="Vencem &lt;1h · BBBaterias"
          valor={kpis.urgBB}
          onClick={() => {
            setBusca('');
            setFiltrosColuna({
              ...FILTROS_FATURAMENTO_INICIAIS,
              empresa: 'BBBaterias',
              tempoRestanteCategoria: 'Vence em menos de 1h',
            });
          }}
          ativo={
            filtrosColuna.empresa === 'BBBaterias' &&
            filtrosColuna.tempoRestanteCategoria === 'Vence em menos de 1h'
          }
        />
      </section>
      <FiltroTopo
        busca={busca}
        setBusca={setBusca}
        limparFiltros={() => {
          setBusca('');
          setPeriodoFiltro('todos');
          setDiasPeriodo('7');
          setFiltrosColuna(FILTROS_FATURAMENTO_INICIAIS);
        }}
        placeholder="Busca por pedido, filial, faturador…"
        periodoFiltro={periodoFiltro}
        setPeriodoFiltro={setPeriodoFiltro}
        diasPeriodo={diasPeriodo}
        setDiasPeriodo={setDiasPeriodo}
      />
      <TabelaPadrao
        titulo="Pedidos de Faturamento"
        dadosBase={dadosComTempo}
        dadosFiltrados={dadosFiltrados}
        colunas={colunas}
        filtros={filtrosColuna}
        onFiltro={(c, v) => setFiltrosColuna((p) => ({ ...p, [c]: v }))}
        carregando={carregando}
        mensagemVazia="Nenhum pedido encontrado."
      />
    </>
  );
}

function TelaEstoque() {
  const [dados, setDados] = useState([]);
  const [busca, setBusca] = useState('');
  const [periodoFiltro, setPeriodoFiltro] = useState('todos');
  const [diasPeriodo, setDiasPeriodo] = useState('7');
  const [filtrosColuna, setFiltrosColuna] = useState(FILTROS_ESTOQUE_INICIAIS);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [atualizadoEm, setAtualizadoEm] = useState('');
  const load = useCallback(async () => {
    setCarregando(true);
    setErro('');
    try {
      const r = await fetch(`${API_BASE}?action=dados&fonte=estoque`),
        j = await r.json();
      if (!j.ok) throw new Error(j.erro || 'Erro estoque');
      const dadosEstoque = aplicarStatusSeparacaoEstoque(j.dados || []);
      setDados(dadosEstoque);
      setCacheDadosPainel('estoque', dadosEstoque);
      setAtualizadoEm(j.atualizadoEm || '');
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, []);
  useEffect(() => {
    load();
    const i = setInterval(load, 60000);
    return () => clearInterval(i);
  }, [load]);
  const dadosPeriodo = useMemo(
    () =>
      filtrarPorPeriodo(
        dados,
        ['dataHoraFinanceiro', 'dataLancamento', 'dataHoraEntregueEstoque'],
        periodoFiltro,
        diasPeriodo
      ),
    [dados, periodoFiltro, diasPeriodo]
  );
  const dadosFiltrados = useMemo(
    () =>
      filtrarDados(dadosPeriodo, busca, filtrosColuna, [
        'status',
        'produto',
        'quantidade',
        'filial',
        'pedido',
        'c5Desctrs',
        'unidadeFaturamento',
        'dataHoraFinanceiro',
        'dataLancamento',
        'dataHoraEntregueEstoque',
      ]),
    [dadosPeriodo, busca, filtrosColuna]
  );
  const kpis = useMemo(() => {
    const ti = dadosFiltrados.length,
      tp = new Set(dadosFiltrados.map((i) => i.pedido).filter(Boolean)).size,
      en = dadosFiltrados.filter((i) =>
        normalizar(i.statusOriginal || i.status).includes('entregue')
      ).length,
      pe = dadosFiltrados.filter(
        (i) => !normalizar(i.statusOriginal || i.status).includes('entregue')
      ).length,
      qt = dadosFiltrados.reduce((t, i) => {
        const q = Number(String(i.quantidade || '0').replace(',', '.'));
        return t + (isNaN(q) ? 0 : q);
      }, 0);
    return { ti, tp, en, pe, qt };
  }, [dadosFiltrados]);
  const colunas = [
    {
      campo: 'status',
      titulo: 'Status',
      width: 126,
      render: (i) => <Badge texto={i.status} tipo={tipoStatus(i.status)} />,
    },
    { campo: 'produto', titulo: 'Produto', bold: true, width: 180, wrap: true },
    { campo: 'quantidade', titulo: 'QTY', width: 52 },
    { campo: 'filial', titulo: 'Filial', width: 54 },
    { campo: 'pedido', titulo: 'Pedido', bold: true, width: 74 },
    { campo: 'c5Desctrs', titulo: 'C5', width: 95, wrap: true },
    { campo: 'unidadeFaturamento', titulo: 'Unid.', width: 68 },
    { campo: 'dataHoraFinanceiro', titulo: 'Financeiro', width: 112 },
    { campo: 'dataLancamento', titulo: 'Lançam.', width: 112 },
    { campo: 'dataHoraEntregueEstoque', titulo: 'Entregue', width: 112 },
  ];
  return (
    <>
      <PageHeader
        titulo="Estoque"
        atualizadoEm={atualizadoEm || '—'}
        actions={
          <button
            onClick={load}
            disabled={carregando}
            style={btnAtualizar(carregando)}
          >
            {carregando ? 'Atualizando…' : 'Atualizar'}
          </button>
        }
      />
      {erro && <div style={erroEl}>{erro}</div>}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5,minmax(0,1fr))',
          gap: 12,
          marginBottom: 18,
        }}
      >
        <Kpi titulo="Total de Itens" valor={kpis.ti} />
        <Kpi titulo="Pedidos Únicos" valor={kpis.tp} />
        <Kpi titulo="Entregues" valor={kpis.en} />
        <Kpi titulo="Pendentes" valor={kpis.pe} />
        <Kpi titulo="Quantidade Total" valor={kpis.qt} />
      </section>
      <FiltroTopo
        busca={busca}
        setBusca={setBusca}
        limparFiltros={() => {
          setBusca('');
          setPeriodoFiltro('todos');
          setDiasPeriodo('7');
          setFiltrosColuna(FILTROS_ESTOQUE_INICIAIS);
        }}
        placeholder="Busca no estoque…"
        periodoFiltro={periodoFiltro}
        setPeriodoFiltro={setPeriodoFiltro}
        diasPeriodo={diasPeriodo}
        setDiasPeriodo={setDiasPeriodo}
      />
      <TabelaPadrao
        titulo="Itens do Estoque"
        dadosBase={dados}
        dadosFiltrados={dadosFiltrados}
        colunas={colunas}
        filtros={filtrosColuna}
        onFiltro={(c, v) => setFiltrosColuna((p) => ({ ...p, [c]: v }))}
        carregando={carregando}
        mensagemVazia="Nenhum item encontrado."
      />
    </>
  );
}

function criarTelaAjusteSaldo({
  fonte,
  titulo,
  filtrosIniciais,
  camposBusca,
  colunas,
  kpiLabels,
  campoData,
  linkApp,
  labelApp,
}) {
  return function () {
    const [dados, setDados] = useState([]);
    const [kpis, setKpis] = useState({});
    const [busca, setBusca] = useState('');
    const [pf, setPf] = useState('todos');
    const [dp, setDp] = useState('7');
    const [fc, setFc] = useState(filtrosIniciais);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');
    const [atualizado, setAtualizado] = useState('');
    const load = useCallback(async () => {
      setLoading(true);
      setErro('');
      try {
        const r = await fetch(`${API_BASE}?action=dados&fonte=${fonte}`),
          j = await r.json();
        if (!j.ok) throw new Error(j.erro || `Erro ${titulo}`);
        setDados(j.dados || []);
        setKpis(j.kpis || {});
        setAtualizado(j.atualizadoEm || '');
      } catch (e) {
        setErro(e.message);
      } finally {
        setLoading(false);
      }
    }, []);
    useEffect(() => {
      load();
      const i = setInterval(load, 60000);
      return () => clearInterval(i);
    }, [load]);
    const dadosPeriodo = useMemo(
      () => filtrarPorPeriodo(dados, campoData, pf, dp),
      [dados, pf, dp]
    );
    const dadosFiltrados = useMemo(
      () => filtrarDados(dadosPeriodo, busca, fc, camposBusca),
      [dadosPeriodo, busca, fc]
    );
    const kpisPeriodo = useMemo(() => {
      if (fonte === 'ajusteSaldo')
        return {
          pendente: dadosFiltrados.filter((i) =>
            normalizar(i.status).includes('pendente')
          ).length,
          verificandoSaldo: dadosFiltrados.filter((i) =>
            normalizar(i.status).includes('verificando saldo')
          ).length,
        };
      if (fonte === 'ajusteSaldoBBBaterias')
        return {
          pendente: dadosFiltrados.filter((i) =>
            normalizar(i.status).includes('pendente')
          ).length,
          resolvido: dadosFiltrados.filter((i) =>
            normalizar(i.status).includes('resolvido')
          ).length,
        };
      return kpis;
    }, [dadosFiltrados, kpis]);
    return (
      <>
        <PageHeader
          titulo={titulo}
          atualizadoEm={atualizado || '—'}
          actions={
            <>
              {linkApp && (
                <BotaoLink href={linkApp}>{labelApp || 'Abrir App'}</BotaoLink>
              )}
              <button
                onClick={load}
                disabled={loading}
                style={btnAtualizar(loading)}
              >
                {loading ? 'Atualizando…' : 'Atualizar'}
              </button>
            </>
          }
        />
        {erro && <div style={erroEl}>{erro}</div>}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: 12,
            marginBottom: 18,
          }}
        >
          {kpiLabels.map((k) => (
            <Kpi key={k.key} titulo={k.titulo} valor={kpisPeriodo[k.key]} />
          ))}
        </section>
        <FiltroTopo
          busca={busca}
          setBusca={setBusca}
          limparFiltros={() => {
            setBusca('');
            setPf('todos');
            setDp('7');
            setFc(filtrosIniciais);
          }}
          placeholder={`Busca em ${titulo}…`}
          periodoFiltro={pf}
          setPeriodoFiltro={setPf}
          diasPeriodo={dp}
          setDiasPeriodo={setDp}
        />
        <TabelaPadrao
          titulo={titulo}
          dadosBase={dados}
          dadosFiltrados={dadosFiltrados}
          colunas={colunas}
          filtros={fc}
          onFiltro={(c, v) => setFc((p) => ({ ...p, [c]: v }))}
          carregando={loading}
          mensagemVazia="Nenhum registro encontrado."
        />
      </>
    );
  };
}

function TelaAjusteSaldo() {
  const filtrosIniciais = {
    empresa: '',
    dataHora: '',
    solicitante: '',
    produto: '',
    lote: '',
    estoqueFisico: '',
    inventarioProtheus: '',
    ajusteSaldo: '',
    status: '',
    dataAjuste: '',
  };

  const [dados, setDados] = useState([]);
  const [busca, setBusca] = useState('');
  const [pf, setPf] = useState('todos');
  const [dp, setDp] = useState('7');
  const [fc, setFc] = useState(filtrosIniciais);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [atualizacoes, setAtualizacoes] = useState({});

  const load = useCallback(async () => {
    setLoading(true);
    setErro('');

    try {
      const fontes = [
        {
          key: 'ajusteSaldo',
          empresa: 'Equipatech',
        },
        {
          key: 'ajusteSaldoBBBaterias',
          empresa: 'BBBaterias',
        },
      ];

      const resultados = await Promise.all(
        fontes.map(async (fonte) => {
          const resposta = await fetch(
            `${API_BASE}?action=dados&fonte=${fonte.key}`
          );
          const json = await resposta.json();

          if (!json.ok) {
            throw new Error(json.erro || `Erro ao carregar ${fonte.empresa}`);
          }

          const linhas = (json.dados || []).map((item) => {
            if (fonte.key === 'ajusteSaldo') {
              return {
                empresa: fonte.empresa,
                fonte: fonte.key,
                dataHora: item.data || '',
                solicitante: item.solicitante || '',
                produto: item.produto || '',
                lote: item.lote || '',
                estoqueFisico: item.estoqueFisico || '',
                inventarioProtheus: item.inventarioProtheus || '',
                ajusteSaldo: item.ajusteSaldo || '',
                status: item.status || '',
                dataAjuste: item.dataAjuste || '',
              };
            }

            return {
              empresa: fonte.empresa,
              fonte: fonte.key,
              dataHora: item.dataHora || '',
              solicitante: item.nomes || '',
              produto: item.produto || '',
              lote: item.lote || '',
              estoqueFisico: item.estoqueFisico || '',
              inventarioProtheus: item.inventarioProtheus || '',
              ajusteSaldo: item.ajusteSaldo || '',
              status: item.status || '',
              dataAjuste: item.dataHoraAjuste || '',
            };
          });

          return {
            empresa: fonte.empresa,
            atualizadoEm: json.atualizadoEm || '',
            dados: linhas,
          };
        })
      );

      const atualizacoesPorEmpresa = {};
      resultados.forEach((resultado) => {
        atualizacoesPorEmpresa[resultado.empresa] = resultado.atualizadoEm;
      });

      setDados(resultados.flatMap((resultado) => resultado.dados));
      setAtualizacoes(atualizacoesPorEmpresa);
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const i = setInterval(load, 60000);
    return () => clearInterval(i);
  }, [load]);

  const dadosPeriodo = useMemo(
    () => filtrarPorPeriodo(dados, ['dataHora', 'dataAjuste'], pf, dp),
    [dados, pf, dp]
  );

  const dadosFiltrados = useMemo(
    () =>
      filtrarDados(dadosPeriodo, busca, fc, [
        'empresa',
        'dataHora',
        'solicitante',
        'produto',
        'lote',
        'estoqueFisico',
        'inventarioProtheus',
        'ajusteSaldo',
        'status',
        'dataAjuste',
      ]),
    [dadosPeriodo, busca, fc]
  );

  const kpis = useMemo(() => {
    return {
      eqPendente: dadosFiltrados.filter(
        (item) =>
          item.empresa === 'Equipatech' &&
          normalizar(item.status).includes('pendente')
      ).length,
      eqVerificando: dadosFiltrados.filter(
        (item) =>
          item.empresa === 'Equipatech' &&
          normalizar(item.status).includes('verificando saldo')
      ).length,
      bbPendente: dadosFiltrados.filter(
        (item) =>
          item.empresa === 'BBBaterias' &&
          normalizar(item.status).includes('pendente')
      ).length,
      bbResolvido: dadosFiltrados.filter(
        (item) =>
          item.empresa === 'BBBaterias' &&
          normalizar(item.status).includes('resolvido')
      ).length,
    };
  }, [dadosFiltrados]);

  const colunas = [
    { campo: 'empresa', titulo: 'Empresa', bold: true, width: 92 },
    { campo: 'dataHora', titulo: 'Data/Hora', width: 112 },
    { campo: 'solicitante', titulo: 'Solicitante', width: 112, wrap: true },
    { campo: 'produto', titulo: 'Produto', bold: true, width: 180, wrap: true },
    { campo: 'lote', titulo: 'Lote', width: 78 },
    { campo: 'estoqueFisico', titulo: 'Físico', width: 68 },
    { campo: 'inventarioProtheus', titulo: 'Protheus', width: 76 },
    { campo: 'ajusteSaldo', titulo: 'Ajuste', bold: true, width: 78 },
    {
      campo: 'status',
      titulo: 'Status',
      width: 124,
      render: (i) => <Badge texto={i.status} tipo={tipoStatus(i.status)} />,
    },
    { campo: 'dataAjuste', titulo: 'Dt Ajuste', width: 112 },
  ];

  function limparTudo() {
    setBusca('');
    setPf('todos');
    setDp('7');
    setFc(filtrosIniciais);
  }

  return (
    <>
      <PageHeader
        titulo="Ajuste de Saldo"
        extraInfo={
          <>
            <span>
              Equipatech:{' '}
              <strong style={{ color: C.txtSec }}>
                {atualizacoes.Equipatech || '—'}
              </strong>
            </span>
            <span>
              BBBaterias:{' '}
              <strong style={{ color: C.txtSec }}>
                {atualizacoes.BBBaterias || '—'}
              </strong>
            </span>
          </>
        }
        actions={
          <>
            <BotaoLink href={LINK_APP_AJUSTE_SALDO}>Abrir Ajuste</BotaoLink>
            <button
              onClick={load}
              disabled={loading}
              style={btnAtualizar(loading)}
            >
              {loading ? 'Atualizando…' : 'Atualizar'}
            </button>
          </>
        }
      />

      {erro && <div style={erroEl}>{erro}</div>}

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
          gap: 12,
          marginBottom: 18,
        }}
      >
        <Kpi
          titulo="Pendente · Equipatech"
          valor={kpis.eqPendente}
          onClick={() => {
            setBusca('');
            setFc({
              ...filtrosIniciais,
              empresa: 'Equipatech',
              status: 'Pendente',
            });
          }}
          ativo={fc.empresa === 'Equipatech' && fc.status === 'Pendente'}
        />

        <Kpi
          titulo="Verificando · Equipatech"
          valor={kpis.eqVerificando}
          onClick={() => {
            setBusca('');
            setFc({
              ...filtrosIniciais,
              empresa: 'Equipatech',
              status: 'Verificando saldo',
            });
          }}
          ativo={
            fc.empresa === 'Equipatech' &&
            normalizar(fc.status) === 'verificando saldo'
          }
        />

        <Kpi
          titulo="Pendente · BBBaterias"
          valor={kpis.bbPendente}
          onClick={() => {
            setBusca('');
            setFc({
              ...filtrosIniciais,
              empresa: 'BBBaterias',
              status: 'PENDENTE',
            });
          }}
          ativo={fc.empresa === 'BBBaterias' && fc.status === 'PENDENTE'}
        />

        <Kpi
          titulo="Resolvido · BBBaterias"
          valor={kpis.bbResolvido}
          onClick={() => {
            setBusca('');
            setFc({
              ...filtrosIniciais,
              empresa: 'BBBaterias',
              status: 'RESOLVIDO',
            });
          }}
          ativo={fc.empresa === 'BBBaterias' && fc.status === 'RESOLVIDO'}
        />
      </section>

      <FiltroTopo
        busca={busca}
        setBusca={setBusca}
        limparFiltros={limparTudo}
        placeholder="Busca no ajuste de saldo…"
        periodoFiltro={pf}
        setPeriodoFiltro={setPf}
        diasPeriodo={dp}
        setDiasPeriodo={setDp}
      />

      <TabelaPadrao
        titulo="Ajustes de Saldo — Equipatech e BBBaterias"
        dadosBase={dados}
        dadosFiltrados={dadosFiltrados}
        colunas={colunas}
        filtros={fc}
        onFiltro={(c, v) => setFc((p) => ({ ...p, [c]: v }))}
        carregando={loading}
        mensagemVazia="Nenhum ajuste encontrado."
      />
    </>
  );
}

function TelaConsultaPecas() {
  const [dados, setDados] = useState([]);
  const [busca, setBusca] = useState('');
  const [pf, setPf] = useState('todos');
  const [dp, setDp] = useState('7');
  const [fc, setFc] = useState(FILTROS_CONSULTA_PECAS_INICIAIS);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [atualizado, setAtualizado] = useState('');
  const load = useCallback(async () => {
    setLoading(true);
    setErro('');
    try {
      const r = await fetch(`${API_BASE}?action=dados&fonte=consultaPecas`),
        j = await r.json();
      if (!j.ok) throw new Error(j.erro || 'Erro peças');
      const registros = (j.dados || []).map((item) => ({
        ...item,
        tempoResposta: calcularTempoRespostaConsulta(
          item.dataHora,
          item.dataResposta
        ),
        statusResposta: calcularStatusRespostaConsulta(
          item.dataHora,
          item.dataResposta
        ),
      }));
      setDados(registros);
      setCacheDadosPainel('consultaPecas', registros);
      setAtualizado(j.atualizadoEm || '');
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    load();
    const i = setInterval(load, 60000);
    return () => clearInterval(i);
  }, [load]);
  const dadosPeriodo = useMemo(
    () => filtrarPorPeriodo(dados, 'dataHora', pf, dp),
    [dados, pf, dp]
  );
  const dadosFiltrados = useMemo(
    () =>
      filtrarDados(dadosPeriodo, busca, fc, [
        'filial',
        'dataHora',
        'vendedor',
        'codigoPeca',
        'tipoSolicitacao',
        'status',
        'tempoAguardando',
        'tempoResposta',
        'statusResposta',
        'dataResposta',
        'respondidoPor',
      ]),
    [dadosPeriodo, busca, fc]
  );
  const kpis = useMemo(
    () => ({
      ag: dadosFiltrados.filter((i) => i.aguardandoResposta === true).length,
      ag1h: dadosFiltrados.filter((i) => i.aguardandoMaisDe1h === true).length,
      resp: dadosFiltrados.filter((i) => i.respondida === true).length,
    }),
    [dadosFiltrados]
  );
  const colunas = [
    { campo: 'filial', titulo: 'Filial', bold: true, width: 88 },
    { campo: 'dataHora', titulo: 'Data/Hora', width: 112 },
    { campo: 'vendedor', titulo: 'Vendedor', width: 108, wrap: true },
    { campo: 'codigoPeca', titulo: 'Peça', bold: true, width: 110 },
    { campo: 'tipoSolicitacao', titulo: 'Tipo', width: 92, wrap: true },
    {
      campo: 'status',
      titulo: 'Status',
      width: 112,
      render: (i) => <Badge texto={i.status} tipo={tipoStatus(i.status)} />,
    },
    { campo: 'tempoAguardando', titulo: 'Aguard.', bold: true, width: 86 },
    {
      campo: 'tempoResposta',
      titulo: 'Tempo Resp.',
      bold: true,
      width: 96,
    },
    {
      campo: 'statusResposta',
      titulo: 'Status Resp.',
      width: 104,
      render: (i) => (
        <Badge texto={i.statusResposta} tipo={tipoStatus(i.statusResposta)} />
      ),
    },
    { campo: 'dataResposta', titulo: 'Resposta', width: 112 },
    { campo: 'respondidoPor', titulo: 'Resp. por', width: 112, wrap: true },
  ];
  return (
    <>
      <PageHeader
        titulo="Consulta de Peças"
        atualizadoEm={atualizado || '—'}
        actions={
          <>
            <BotaoLink href={LINK_APP_SOLICITAR}>Solicitar Peça</BotaoLink>
            <BotaoLink href={LINK_APP_GESTAO} variante="secundario">
              Gestão
            </BotaoLink>
            <button
              onClick={load}
              disabled={loading}
              style={btnAtualizar(loading)}
            >
              {loading ? 'Atualizando…' : 'Atualizar'}
            </button>
          </>
        }
      />
      {erro && <div style={erroEl}>{erro}</div>}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 12,
          marginBottom: 18,
        }}
      >
        <Kpi titulo="Aguardando Resposta" valor={kpis.ag} />
        <Kpi titulo="Aguardando +1h" valor={kpis.ag1h} />
        <Kpi titulo="Respondidas" valor={kpis.resp} />
      </section>
      <FiltroTopo
        busca={busca}
        setBusca={setBusca}
        limparFiltros={() => {
          setBusca('');
          setPf('todos');
          setDp('7');
          setFc(FILTROS_CONSULTA_PECAS_INICIAIS);
        }}
        placeholder="Busca na Consulta de Peças…"
        periodoFiltro={pf}
        setPeriodoFiltro={setPf}
        diasPeriodo={dp}
        setDiasPeriodo={setDp}
      />
      <TabelaPadrao
        titulo="Solicitações"
        dadosBase={dados}
        dadosFiltrados={dadosFiltrados}
        colunas={colunas}
        filtros={fc}
        onFiltro={(c, v) => setFc((p) => ({ ...p, [c]: v }))}
        carregando={loading}
        mensagemVazia="Nenhuma solicitação encontrada."
      />
    </>
  );
}

function TelaProducao({ modo }) {
  const [dados, setDados] = useState([]);
  const [busca, setBusca] = useState('');
  const [pf, setPf] = useState('todos');
  const [dp, setDp] = useState('7');
  const [fc, setFc] = useState(
    modo === 'resumo'
      ? FILTROS_PRODUCAO_RESUMO_INICIAIS
      : FILTROS_PRODUCAO_INICIAIS
  );
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [atualizado, setAtualizado] = useState('');
  const load = useCallback(async () => {
    setLoading(true);
    setErro('');
    try {
      const r = await fetch(`${API_BASE}?action=dados&fonte=producao`),
        j = await r.json();
      if (!j.ok) throw new Error(j.erro || 'Erro produção');
      const dadosProducao = j.dados || [];
      setDados(dadosProducao);
      setCacheDadosPainel('producao', dadosProducao);
      setAtualizado(j.atualizadoEm || '');
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    load();
    const i = setInterval(load, 60000);
    return () => clearInterval(i);
  }, [load]);
  useEffect(() => {
    setBusca('');
    setFc(
      modo === 'resumo'
        ? FILTROS_PRODUCAO_RESUMO_INICIAIS
        : FILTROS_PRODUCAO_INICIAIS
    );
  }, [modo]);
  const dadosPeriodo = useMemo(
    () => filtrarPorPeriodo(dados, 'dataHoraFinanceiro', pf, dp),
    [dados, pf, dp]
  );
  const resumo = useMemo(
    () => gerarResumoProducaoLocal(dadosPeriodo),
    [dadosPeriodo]
  );
  const tabela = modo === 'resumo' ? resumo : dadosPeriodo;
  const kpis = useMemo(
    () => ({
      pu: new Set(dadosPeriodo.map((i) => i.pedido).filter(Boolean)).size,
      prod: dadosPeriodo.filter((i) => normalizar(i.status) === 'produzir')
        .length,
      av: dadosPeriodo.filter((i) =>
        normalizar(i.status).includes('avisar vendedor')
      ).length,
    }),
    [dadosPeriodo]
  );
  const qtTotal = useMemo(
    () => resumo.reduce((t, i) => t + (Number(i.quantidadeTotal || 0) || 0), 0),
    [resumo]
  );
  const dadosFiltrados = useMemo(() => {
    if (modo === 'resumo')
      return filtrarDados(tabela, busca, fc, [
        'pedido',
        'cliente',
        'quantidadeTotal',
        'totalItens',
        'produzir',
        'avisarVendedor',
        'naoProduzir',
        'transportes',
        'statusResumo',
      ]);
    return filtrarDados(tabela, busca, fc, [
      'dataHoraFinanceiro',
      'pedido',
      'cliente',
      'produto',
      'quantidadeLiberada',
      'equipa01',
      'equipa98',
      'bbbaterias01',
      'transporte',
      'status',
    ]);
  }, [tabela, busca, fc, modo]);
  const colPainel = [
    { campo: 'dataHoraFinanceiro', titulo: 'Data Lib.', width: 112 },
    { campo: 'pedido', titulo: 'Pedido', bold: true, width: 72 },
    { campo: 'cliente', titulo: 'Cliente', width: 130, wrap: true },
    { campo: 'produto', titulo: 'Produto', bold: true, width: 165, wrap: true },
    { campo: 'quantidadeLiberada', titulo: 'Qt', bold: true, width: 56 },
    { campo: 'equipa01', titulo: 'E01', width: 52 },
    { campo: 'equipa98', titulo: 'E98', width: 52 },
    { campo: 'bbbaterias01', titulo: 'BB01', width: 58 },
    { campo: 'transporte', titulo: 'Transp.', width: 88 },
    {
      campo: 'status',
      titulo: 'Status',
      width: 96,
      render: (i) => <Badge texto={i.status} tipo={tipoStatus(i.status)} />,
    },
  ];
  const colResumo = [
    { campo: 'pedido', titulo: 'Pedido', bold: true, width: 74 },
    { campo: 'cliente', titulo: 'Cliente', width: 150, wrap: true },
    { campo: 'quantidadeTotal', titulo: 'Qt Total', bold: true, width: 72 },
    { campo: 'totalItens', titulo: 'SKUs', width: 54 },
    { campo: 'produzir', titulo: 'Produzir', width: 72 },
    { campo: 'avisarVendedor', titulo: 'Avisar', width: 68 },
    { campo: 'naoProduzir', titulo: 'Não Prod.', width: 74 },
    { campo: 'transportes', titulo: 'Transp.', width: 105, wrap: true },
    {
      campo: 'statusResumo',
      titulo: 'Status',
      width: 112,
      render: (i) => (
        <Badge texto={i.statusResumo} tipo={tipoStatus(i.statusResumo)} />
      ),
    },
  ];
  return (
    <>
      <PageHeader
        titulo={modo === 'resumo' ? 'Resumo por Pedido' : 'Produção'}
        atualizadoEm={atualizado || '—'}
        actions={
          <button
            onClick={load}
            disabled={loading}
            style={btnAtualizar(loading)}
          >
            {loading ? 'Atualizando…' : 'Atualizar'}
          </button>
        }
      />
      {erro && <div style={erroEl}>{erro}</div>}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
          gap: 12,
          marginBottom: 18,
        }}
      >
        <Kpi titulo="Pedidos Únicos" valor={kpis.pu} />
        <Kpi titulo="Produzir" valor={kpis.prod} />
        <Kpi titulo="Avisar Vendedor" valor={kpis.av} />
        <Kpi titulo="Qt Liberada Total" valor={qtTotal} />
      </section>
      <FiltroTopo
        busca={busca}
        setBusca={setBusca}
        limparFiltros={() => {
          setBusca('');
          setPf('todos');
          setDp('7');
          setFc(
            modo === 'resumo'
              ? FILTROS_PRODUCAO_RESUMO_INICIAIS
              : FILTROS_PRODUCAO_INICIAIS
          );
        }}
        placeholder={
          modo === 'resumo' ? 'Busca no resumo…' : 'Busca na produção…'
        }
        periodoFiltro={pf}
        setPeriodoFiltro={setPf}
        diasPeriodo={dp}
        setDiasPeriodo={setDp}
      />
      <TabelaPadrao
        titulo={modo === 'resumo' ? 'Resumo dos Pedidos' : 'Itens de Produção'}
        dadosBase={tabela}
        dadosFiltrados={dadosFiltrados}
        colunas={modo === 'resumo' ? colResumo : colPainel}
        filtros={fc}
        onFiltro={(c, v) => setFc((p) => ({ ...p, [c]: v }))}
        carregando={loading}
        mensagemVazia={modo === 'resumo' ? 'Nenhum resumo.' : 'Nenhum item.'}
      />
    </>
  );
}

function TelaPedidoVenda() {
  const [dados, setDados] = useState([]);
  const [busca, setBusca] = useState('');
  const [pf, setPf] = useState('todos');
  const [dp, setDp] = useState('7');
  const [fc, setFc] = useState(FILTROS_PEDIDO_VENDA_INICIAIS);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [atualizado, setAtualizado] = useState('');
  const [tipoRelatorio, setTipoRelatorio] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setErro('');

    try {
      const resposta = await fetch(
        `${API_BASE}?action=dados&fonte=pedidoVenda1020`
      );
      const json = await resposta.json();

      if (!json.ok) {
        throw new Error(json.erro || 'Erro ao carregar Pedido de Venda');
      }

      const registros = json.dados || [];

      setDados(registros);
      setCacheDadosPainel('pedidoVenda1020', registros);
      setAtualizado(json.atualizadoEm || '');
      setTipoRelatorio(json.tipoRelatorio || json.nome || '');
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const intervalo = setInterval(load, 60000);
    return () => clearInterval(intervalo);
  }, [load]);

  const dadosPeriodo = useMemo(
    () => filtrarPorPeriodo(dados, 'dataHoraFinanceiro', pf, dp),
    [dados, pf, dp]
  );

  const dadosFiltrados = useMemo(
    () =>
      filtrarDados(dadosPeriodo, busca, fc, [
        'dataHoraFinanceiro',
        'pedido',
        'cliente',
        'produto',
        'quantidadeLiberada',
        'equipa01',
        'equipa98',
        'bateria01',
        'endereco',
        'status',
      ]),
    [dadosPeriodo, busca, fc]
  );

  const kpis = useMemo(() => {
    const pedidosUnicos = new Set(
      dadosFiltrados
        .map((item) => String(item.pedido || '').trim())
        .filter((pedido) => pedido !== '' && pedido !== '0')
    ).size;

    const comprar = dadosFiltrados.filter((item) => {
      const status = normalizar(item.status);
      return (
        status.includes('comprar') &&
        !status.includes('nao comprar') &&
        !status.includes('não comprar')
      );
    }).length;

    const naoComprar = dadosFiltrados.filter((item) => {
      const status = normalizar(item.status);
      return status.includes('nao comprar') || status.includes('não comprar');
    }).length;

    const avisado = dadosFiltrados.filter((item) =>
      normalizar(item.status).includes('avisado')
    ).length;

    const quantidadeTotal = dadosFiltrados.reduce((total, item) => {
      const valor = Number(
        String(item.quantidadeLiberada || '0')
          .replace(/\./g, '')
          .replace(',', '.')
          .replace(/[^0-9.-]/g, '')
      );

      return total + (Number.isNaN(valor) ? 0 : valor);
    }, 0);

    return {
      pedidosUnicos,
      comprar,
      naoComprar,
      avisado,
      quantidadeTotal: Math.round(quantidadeTotal),
    };
  }, [dadosFiltrados]);

  const colunas = [
    { campo: 'dataHoraFinanceiro', titulo: 'Lib. Financeiro', width: 132 },
    { campo: 'pedido', titulo: 'Pedido', bold: true, width: 78 },
    { campo: 'cliente', titulo: 'Cliente', width: 100 },
    { campo: 'produto', titulo: 'Produto', bold: true, width: 150, wrap: true },
    {
      campo: 'quantidadeLiberada',
      titulo: 'Qt',
      width: 58,
      render: (item) => formatarNumeroInteiro(item.quantidadeLiberada),
    },
    {
      campo: 'equipa01',
      titulo: 'Equipa 01',
      width: 78,
      render: (item) => formatarNumeroInteiro(item.equipa01),
    },
    {
      campo: 'equipa98',
      titulo: 'Equipa 98',
      width: 78,
      render: (item) => formatarNumeroInteiro(item.equipa98),
    },
    {
      campo: 'bateria01',
      titulo: 'Bateria',
      width: 72,
      render: (item) => formatarNumeroInteiro(item.bateria01),
    },
    { campo: 'endereco', titulo: 'Endereço', width: 110, wrap: true },
    {
      campo: 'status',
      titulo: 'Status',
      width: 104,
      render: (item) => (
        <Badge texto={item.status} tipo={tipoStatusPedidoVenda(item.status)} />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        titulo="Pedido de Venda"
        atualizadoEm={atualizado || '—'}
        extraInfo={
          tipoRelatorio ? (
            <span>
              Relatório:{' '}
              <strong style={{ color: C.txtSec }}>{tipoRelatorio}</strong>
            </span>
          ) : null
        }
        actions={
          <button
            onClick={load}
            disabled={loading}
            style={btnAtualizar(loading)}
          >
            {loading ? 'Atualizando…' : 'Atualizar'}
          </button>
        }
      />

      {erro && <div style={erroEl}>{erro}</div>}

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5,minmax(0,1fr))',
          gap: 12,
          marginBottom: 18,
        }}
      >
        <Kpi titulo="Pedidos Únicos" valor={kpis.pedidosUnicos} />
        <Kpi titulo="Comprar" valor={kpis.comprar} />
        <Kpi titulo="Não Comprar" valor={kpis.naoComprar} />
        <Kpi titulo="Avisado" valor={kpis.avisado} />
        <Kpi titulo="Quantidade Total" valor={kpis.quantidadeTotal} />
      </section>

      <FiltroTopo
        busca={busca}
        setBusca={setBusca}
        limparFiltros={() => {
          setBusca('');
          setPf('todos');
          setDp('7');
          setFc(FILTROS_PEDIDO_VENDA_INICIAIS);
        }}
        placeholder="Busca no pedido de venda..."
        periodoFiltro={pf}
        setPeriodoFiltro={setPf}
        diasPeriodo={dp}
        setDiasPeriodo={setDp}
      />

      <TabelaPadrao
        titulo="Pedidos de Venda"
        dadosBase={dados}
        dadosFiltrados={dadosFiltrados}
        colunas={colunas}
        filtros={fc}
        onFiltro={(c, v) => setFc((p) => ({ ...p, [c]: v }))}
        carregando={loading}
        mensagemVazia="Nenhum pedido de venda encontrado."
      />
    </>
  );
}

// ─── Indicadores (inline para manter tamanho gerenciável) ─────────────────────

function useIndicador(fonte, filtrosIniciais) {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [atualizado, setAtualizado] = useState('');
  const load = useCallback(async () => {
    setLoading(true);
    setErro('');
    try {
      const r = await fetch(`${API_BASE}?action=dados&fonte=${fonte}`),
        j = await r.json();
      if (!j.ok) throw new Error(j.erro || 'Erro');
      setDados(j.dados || []);
      setAtualizado(j.atualizadoEm || '');
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }, [fonte]);
  useEffect(() => {
    load();
    const i = setInterval(load, 60000);
    return () => clearInterval(i);
  }, [load]);
  return { dados, loading, erro, atualizado, load };
}

function corPct(valor) {
  const n = typeof valor === 'number' ? valor : numeroPercentual(valor);
  if (n === null) return { bg: '#f8f9ff', color: '#8898aa', bd: '#e8ecf4' };
  if (n >= 95) return { bg: '#e6faf7', color: '#11998e', bd: '#a7e9e3' };
  if (n >= 90) return { bg: '#d1fae5', color: '#059669', bd: '#6ee7b7' };
  if (n >= 70) return { bg: '#fffbeb', color: '#d97706', bd: '#fde68a' };
  if (n >= 50) return { bg: '#fff7ed', color: '#c2410c', bd: '#fed7aa' };
  return { bg: '#fff5f5', color: '#e53e3e', bd: '#fed7d7' };
}
function fmtPct(v) {
  const n = typeof v === 'number' ? v : numeroPercentual(v);
  if (n === null) return '—';
  return `${n.toFixed(2).replace('.', ',')}%`;
}

function ICard({ titulo, valor, grad, detalhe }) {
  return (
    <div
      style={{
        background: C.bgCard,
        borderRadius: C.radius.lg,
        padding: '14px 16px',
        boxShadow: C.shadowCard,
        border: `1.5px solid ${C.bdLight}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: grad,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -16,
          right: -10,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: grad,
          opacity: 0.07,
        }}
      />
      <div
        style={{
          fontSize: 9,
          fontWeight: 800,
          color: C.txtMuted,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 8,
          fontFamily: C.font,
        }}
      >
        {titulo}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 900,
          fontFamily: C.fontMono,
          letterSpacing: '-0.03em',
          background: grad,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {valor}
      </div>
      {detalhe && (
        <div
          style={{
            marginTop: 6,
            fontSize: 10,
            color: C.txtMuted,
            fontFamily: C.font,
          }}
        >
          {detalhe}
        </div>
      )}
    </div>
  );
}

function MiniChart({ data, campo, color, tipo = 'line' }) {
  const W = 520,
    H = 140,
    P = 26;
  if (!data.length)
    return (
      <div
        style={{
          height: 140,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: C.txtMuted,
          fontSize: 12,
          fontFamily: C.font,
        }}
      >
        Sem dados
      </div>
    );
  if (tipo === 'bar') {
    const gap = 4,
      bw =
        (W - P * 2 - gap * Math.max(data.length - 1, 0)) /
        Math.max(data.length, 1);
    return (
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 140 }}>
        {[0, 25, 50, 75, 100].map((l) => {
          const y = H - P - (l / 100) * (H - P * 2);
          return (
            <g key={l}>
              <line
                x1={P}
                y1={y}
                x2={W - P}
                y2={y}
                stroke={C.bdLight}
                strokeWidth="1"
              />
              <text x="2" y={y + 3} fontSize="9" fill={C.txtMuted}>
                {l}%
              </text>
            </g>
          );
        })}
        {data.map((item, i) => {
          const v = item[campo] ?? 0,
            h = (v / 100) * (H - P * 2),
            x = P + i * (bw + gap);
          return (
            <rect
              key={i}
              x={x}
              y={H - P - h}
              width={Math.max(bw, 3)}
              height={h}
              rx="4"
              fill={color}
              opacity="0.80"
            />
          );
        })}
      </svg>
    );
  }
  const pts = data.map((item, i) => ({
    x: P + (i * (W - P * 2)) / Math.max(data.length - 1, 1),
    y: H - P - ((item[campo] ?? 0) / 100) * (H - P * 2),
  }));
  const path = pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`)
    .join(' ');
  const area = `${path} L${pts[pts.length - 1].x},${H - P} L${pts[0].x},${
    H - P
  } Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 140 }}>
      {[0, 25, 50, 75, 100].map((l) => {
        const y = H - P - (l / 100) * (H - P * 2);
        return (
          <g key={l}>
            <line
              x1={P}
              y1={y}
              x2={W - P}
              y2={y}
              stroke={C.bdLight}
              strokeWidth="1"
            />
            <text x="2" y={y + 3} fontSize="9" fill={C.txtMuted}>
              {l}%
            </text>
          </g>
        );
      })}
      <defs>
        <linearGradient
          id={`g${color.replace('#', '')}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.20" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#g${color.replace('#', '')})`} />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3.5"
          fill="#fff"
          stroke={color}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

function TelaIndicadorDiario() {
  const { dados, loading, erro, atualizado, load } =
    useIndicador('indicadorDiario');
  const [busca, setBusca] = useState('');
  const [pf, setPf] = useState('todos');
  const [dp, setDp] = useState('15');
  const [mf, setMf] = useState('atual');
  const [sf, setSf] = useState('');
  const [of, setOf] = useState('todos');
  const [fc, setFc] = useState(FILTROS_INDICADOR_DIARIO_INICIAIS);
  const meses = useMemo(() => opcoesUnicas(dados, 'mes'), [dados]);
  const semanas = useMemo(() => opcoesUnicas(dados, 'semana'), [dados]);
  const mesAtual = useMemo(() => {
    const h = new Date();
    return `${String(h.getMonth() + 1).padStart(2, '0')}/${h.getFullYear()}`;
  }, []);
  const dadosPeriodo = useMemo(() => {
    let b = filtrarPorPeriodo(dados, 'data', pf, dp);
    if (mf === 'atual') b = b.filter((i) => String(i.mes || '') === mesAtual);
    else if (mf) b = b.filter((i) => String(i.mes || '') === mf);
    if (sf) b = b.filter((i) => String(i.semana || '') === String(sf));
    if (of === 'com')
      b = b.filter((i) => String(i.observacoes || '').trim() !== '');
    if (of === 'sem')
      b = b.filter((i) => String(i.observacoes || '').trim() === '');
    return b;
  }, [dados, pf, dp, mf, sf, of, mesAtual]);
  const dadosFiltrados = useMemo(
    () =>
      filtrarDados(dadosPeriodo, busca, fc, [
        'semana',
        'mes',
        'data',
        'diaSemana',
        'observacoes',
        'pedidos001',
        'pedidos002',
        'pedidos005',
        'pedidosGeral',
        'unidades001',
        'unidades002',
        'unidades005',
        'unidadesGeral',
        'pedidos1030BB',
        'pedidos1040BB',
        'pedidos0104EQ',
        'pedidos0105EQ',
      ]),
    [dadosPeriodo, busca, fc]
  );
  const kpis = useMemo(() => {
    const mp =
        numeroPercentual(mediaPercentual(dadosFiltrados, 'pedidosGeral')) || 0,
      mu =
        numeroPercentual(mediaPercentual(dadosFiltrados, 'unidadesGeral')) || 0,
      rk = dadosFiltrados
        .map((i) => ({ ...i, pct: numeroPercentual(i.pedidosGeral) }))
        .filter((i) => i.pct !== null)
        .sort((a, b) => b.pct - a.pct);
    return {
      dias: dadosFiltrados.length,
      mp,
      mu,
      obs: dadosFiltrados.filter(
        (i) => String(i.observacoes || '').trim() !== ''
      ).length,
      melhor: rk[0] || null,
      pior: rk[rk.length - 1] || null,
    };
  }, [dadosFiltrados]);
  const grafico = useMemo(
    () =>
      dadosFiltrados
        .map((i) => ({
          data: i.data,
          pedidos: numeroPercentual(i.pedidosGeral),
          unidades: numeroPercentual(i.unidadesGeral),
        }))
        .filter((i) => i.pedidos !== null || i.unidades !== null)
        .slice(-18),
    [dadosFiltrados]
  );
  const obs = useMemo(
    () =>
      dadosFiltrados
        .filter((i) => String(i.observacoes || '').trim() !== '')
        .slice(-5)
        .reverse(),
    [dadosFiltrados]
  );
  const camposPct = [
    'pedidos001',
    'pedidos002',
    'pedidos005',
    'pedidosGeral',
    'unidades001',
    'unidades002',
    'unidades005',
    'unidadesGeral',
    'pedidos1030BB',
    'pedidos1040BB',
    'pedidos0104EQ',
    'pedidos0105EQ',
  ];
  const tituloC = {
    pedidos001: 'Ped.001',
    pedidos002: 'Ped.002',
    pedidos005: 'Ped.005',
    pedidosGeral: 'Ped.Geral',
    unidades001: 'Unid.001',
    unidades002: 'Unid.002',
    unidades005: 'Unid.005',
    unidadesGeral: 'Unid.Geral',
    pedidos1030BB: '1030-BB',
    pedidos1040BB: '1040-BB',
    pedidos0104EQ: '0104-EQ',
    pedidos0105EQ: '0105-EQ',
  };
  const gradArr = [C.grad1, C.grad4, C.grad2, C.grad5, C.grad6, C.grad3];
  const panelSt = {
    background: C.bgCard,
    border: `1.5px solid ${C.bdLight}`,
    borderRadius: C.radius.lg,
    padding: 14,
    boxShadow: C.shadowCard,
  };
  const pTitle = {
    fontSize: 10,
    fontWeight: 800,
    color: C.txtSec,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    marginBottom: 10,
    fontFamily: C.font,
  };
  return (
    <>
      <PageHeader
        titulo="Indicador Diário"
        atualizadoEm={atualizado || '—'}
        actions={
          <button
            onClick={load}
            disabled={loading}
            style={btnAtualizar(loading)}
          >
            {loading ? 'Atualizando…' : 'Atualizar'}
          </button>
        }
      />
      {erro && <div style={erroEl}>{erro}</div>}
      <section
        style={{
          background: C.bgCard,
          border: `1.5px solid ${C.bdLight}`,
          borderRadius: C.radius.lg,
          padding: 14,
          marginBottom: 16,
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          alignItems: 'center',
          boxShadow: C.shadowCard,
        }}
      >
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Busca nos indicadores…"
          style={{ ...inputEl, flex: '1 1 180px' }}
        />
        <select
          value={pf}
          onChange={(e) => setPf(e.target.value)}
          style={selectEl}
        >
          <option value="todos">Todos</option>
          <option value="hoje">Hoje</option>
          <option value="ontem">Ontem</option>
          <option value="ultimos">Últimos X dias</option>
        </select>
        {pf === 'ultimos' && (
          <input
            type="number"
            min="1"
            value={dp}
            onChange={(e) => setDp(e.target.value)}
            style={{ ...selectEl, width: 64 }}
          />
        )}
        <select
          value={mf}
          onChange={(e) => setMf(e.target.value)}
          style={selectEl}
        >
          <option value="atual">Mês atual</option>
          <option value="">Todos</option>
          {meses.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={sf}
          onChange={(e) => setSf(e.target.value)}
          style={selectEl}
        >
          <option value="">Todas semanas</option>
          {semanas.map((s) => (
            <option key={s} value={s}>
              Sem. {s}
            </option>
          ))}
        </select>
        <select
          value={of}
          onChange={(e) => setOf(e.target.value)}
          style={selectEl}
        >
          <option value="todos">Todas obs.</option>
          <option value="com">Com obs.</option>
          <option value="sem">Sem obs.</option>
        </select>
        <button
          onClick={() => {
            setBusca('');
            setPf('todos');
            setDp('15');
            setMf('atual');
            setSf('');
            setOf('todos');
            setFc(FILTROS_INDICADOR_DIARIO_INICIAIS);
          }}
          style={btnLimpar}
        >
          Limpar
        </button>
      </section>
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 12,
          marginBottom: 16,
        }}
      >
        <ICard
          titulo="Dias analisados"
          valor={kpis.dias}
          grad={C.grad2}
          detalhe="Conforme filtro"
        />
        <ICard
          titulo="Com observação"
          valor={kpis.obs}
          grad={C.grad5}
          detalhe="Dias com registro"
        />
        <ICard
          titulo="Melhor dia"
          valor={kpis.melhor ? fmtPct(kpis.melhor.pct) : '—'}
          grad={C.grad3}
          detalhe={kpis.melhor ? kpis.melhor.data : 'Sem dados'}
        />
        <ICard
          titulo="Pior dia"
          valor={kpis.pior ? fmtPct(kpis.pior.pct) : '—'}
          grad={C.grad6}
          detalhe={kpis.pior ? kpis.pior.data : 'Sem dados'}
        />
      </section>
      <section
        style={{
          background: C.bgCard,
          border: `1.5px solid ${C.bdLight}`,
          borderRadius: C.radius.xl,
          overflow: 'hidden',
          boxShadow: C.shadowCard,
        }}
      >
        <div
          style={{
            padding: '13px 18px',
            borderBottom: `1.5px solid ${C.bdLight}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(135deg,#fafbff,#f5f7ff)',
          }}
        >
          <span
            style={{
              fontWeight: 800,
              color: C.txtPri,
              fontSize: 14,
              fontFamily: C.font,
              letterSpacing: '-0.02em',
            }}
          >
            Desempenho Diário Detalhado
          </span>
          <ContadorRegistros
            filtrados={dadosFiltrados.length}
            total={dados.length}
          />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 11,
              fontFamily: C.font,
            }}
          >
            <thead>
              <tr>
                <th
                  colSpan="3"
                  style={{
                    background: 'linear-gradient(135deg,#302b63,#24243e)',
                    color: '#c4b5fd',
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    textAlign: 'center',
                    padding: '7px 8px',
                  }}
                >
                  Dados do Dia
                </th>
                <th
                  colSpan="4"
                  style={{
                    background: 'linear-gradient(135deg,#1a1f6e,#2d3282)',
                    color: '#bfdbfe',
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    textAlign: 'center',
                    padding: '7px 8px',
                    borderLeft: '4px solid #f0f3ff',
                  }}
                >
                  Pedidos (%)
                </th>
                <th
                  colSpan="4"
                  style={{
                    background: 'linear-gradient(135deg,#064e3b,#065f46)',
                    color: '#a7f3d0',
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    textAlign: 'center',
                    padding: '7px 8px',
                    borderLeft: '4px solid #f0f3ff',
                  }}
                >
                  Unidades (%)
                </th>
                <th
                  colSpan="4"
                  style={{
                    background: 'linear-gradient(135deg,#374151,#1f2937)',
                    color: '#d1d5db',
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    textAlign: 'center',
                    padding: '7px 8px',
                    borderLeft: '4px solid #f0f3ff',
                  }}
                >
                  CDs
                </th>
              </tr>
              <tr
                style={{
                  background: 'linear-gradient(135deg,#f0f3ff,#e8ecff)',
                }}
              >
                {['Mês', 'Data', 'Dia'].map((t) => (
                  <th
                    key={t}
                    style={{
                      padding: '6px 8px',
                      fontSize: 9,
                      fontWeight: 900,
                      color: C.txtSec,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: `1.5px solid ${C.bdLight}`,
                    }}
                  >
                    {t}
                  </th>
                ))}
                {['001', '002', '005', 'Geral'].map((t, i) => (
                  <th
                    key={`p${i}`}
                    style={{
                      padding: '6px 8px',
                      fontSize: 9,
                      fontWeight: 900,
                      color: C.txtSec,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: `1.5px solid ${C.bdLight}`,
                      borderLeft: i === 0 ? '4px solid #f0f3ff' : undefined,
                    }}
                  >
                    {t}
                  </th>
                ))}
                {['001', '002', '005', 'Geral'].map((t, i) => (
                  <th
                    key={`u${i}`}
                    style={{
                      padding: '6px 8px',
                      fontSize: 9,
                      fontWeight: 900,
                      color: C.txtSec,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: `1.5px solid ${C.bdLight}`,
                      borderLeft: i === 0 ? '4px solid #f0f3ff' : undefined,
                    }}
                  >
                    {t}
                  </th>
                ))}
                {['1030-BB', '1040-BB', '0104-EQ', '0105-EQ'].map((t, i) => (
                  <th
                    key={`c${i}`}
                    style={{
                      padding: '6px 8px',
                      fontSize: 9,
                      fontWeight: 900,
                      color: C.txtSec,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: `1.5px solid ${C.bdLight}`,
                      borderLeft: i === 0 ? '4px solid #f0f3ff' : undefined,
                    }}
                  >
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && !dadosFiltrados.length && (
                <tr>
                  <td
                    colSpan="15"
                    style={{
                      padding: 28,
                      textAlign: 'center',
                      color: C.txtMuted,
                      fontFamily: C.font,
                    }}
                  >
                    Carregando…
                  </td>
                </tr>
              )}
              {!loading && !dadosFiltrados.length && (
                <tr>
                  <td
                    colSpan="15"
                    style={{
                      padding: 28,
                      textAlign: 'center',
                      color: C.txtMuted,
                      fontFamily: C.font,
                    }}
                  >
                    Nenhum indicador encontrado.
                  </td>
                </tr>
              )}
              {dadosFiltrados.map((item, idx) => {
                const rp = (campo, sep) => {
                  const cor = corPct(item[campo]);
                  return (
                    <td
                      style={{
                        padding: '4px 7px',
                        textAlign: 'center',
                        fontSize: 10,
                        fontWeight: 800,
                        fontFamily: C.fontMono,
                        background: item[campo] ? cor.bg : '#fff',
                        color: item[campo] ? cor.color : C.txtMuted,
                        borderLeft: sep
                          ? '4px solid #f0f3ff'
                          : `1px dotted ${C.bdLight}`,
                        borderBottom: `1px solid ${C.bdLight}`,
                      }}
                    >
                      {item[campo] || '—'}
                    </td>
                  );
                };
                return (
                  <tr
                    key={idx}
                    style={{ background: idx % 2 === 0 ? '#fff' : C.bgStripe }}
                  >
                    <td
                      style={{
                        padding: '5px 8px',
                        textAlign: 'center',
                        fontSize: 10,
                        color: C.txtSec,
                        borderBottom: `1px solid ${C.bdLight}`,
                        fontFamily: C.font,
                      }}
                    >
                      {item.mes || '—'}
                    </td>
                    <td
                      style={{
                        padding: '5px 8px',
                        textAlign: 'center',
                        fontSize: 10,
                        fontWeight: 700,
                        color: C.txtPri,
                        borderBottom: `1px solid ${C.bdLight}`,
                        fontFamily: C.fontMono,
                      }}
                    >
                      {item.data || '—'}
                    </td>
                    <td
                      style={{
                        padding: '5px 8px',
                        textAlign: 'center',
                        fontSize: 10,
                        color: C.txtSec,
                        borderBottom: `1px solid ${C.bdLight}`,
                        fontFamily: C.font,
                      }}
                    >
                      {item.diaSemana || '—'}
                    </td>
                    {rp('pedidos001', true)}
                    {rp('pedidos002')}
                    {rp('pedidos005')}
                    {rp('pedidosGeral')}
                    {rp('unidades001', true)}
                    {rp('unidades002')}
                    {rp('unidades005')}
                    {rp('unidadesGeral')}
                    {rp('pedidos1030BB', true)}
                    {rp('pedidos1040BB')}
                    {rp('pedidos0104EQ')}
                    {rp('pedidos0105EQ')}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: 14,
          marginTop: 14,
        }}
      >
        <div style={panelSt}>
          <div style={pTitle}>Desempenho por Indicador</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: 10,
            }}
          >
            {camposPct.slice(0, 8).map((campo, i) => {
              const media =
                  numeroPercentual(mediaPercentual(dadosFiltrados, campo)) || 0,
                cor = corPct(media),
                grad = gradArr[i % gradArr.length];
              return (
                <div
                  key={campo}
                  style={{
                    background: C.bgStripe,
                    border: `1.5px solid ${C.bdLight}`,
                    borderRadius: C.radius.md,
                    padding: 10,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: grad,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 800,
                      color: C.txtMuted,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: 7,
                      fontFamily: C.font,
                    }}
                  >
                    {tituloC[campo]}
                  </div>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 900,
                      fontFamily: C.fontMono,
                      marginBottom: 7,
                      background: grad,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {fmtPct(media)}
                  </div>
                  <div
                    style={{
                      height: 5,
                      borderRadius: 999,
                      background: C.bdLight,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.min(media, 100)}%`,
                        background: grad,
                        height: '100%',
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={panelSt}>
          <div style={pTitle}>Últimas Observações</div>
          {!obs.length ? (
            <div
              style={{
                color: C.txtMuted,
                fontSize: 12,
                fontFamily: C.font,
                padding: '20px 0',
                textAlign: 'center',
              }}
            >
              Nenhuma observação no período.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {obs.map((item, i) => (
                <div
                  key={i}
                  style={{
                    borderBottom: `1.5px solid ${C.bdLight}`,
                    paddingBottom: 10,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      background: C.grad1,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      marginBottom: 3,
                      fontFamily: C.font,
                    }}
                  >
                    {item.data} · {item.diaSemana}
                  </div>
                  <div
                    style={{
                      color: C.txtPri,
                      fontSize: 12,
                      lineHeight: 1.4,
                      fontFamily: C.font,
                    }}
                  >
                    {item.observacoes}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function TelaIndicadorExpedicaoDiario() {
  const { dados, loading, erro, atualizado, load } = useIndicador(
    'indicadorExpedicaoDiario'
  );
  const [busca, setBusca] = useState('');
  const [pf, setPf] = useState('todos');
  const [dp, setDp] = useState('15');
  const [mf, setMf] = useState('atual');
  const [of, setOf] = useState('todos');
  const [fc, setFc] = useState(FILTROS_INDICADOR_EXPEDICAO_DIARIO_INICIAIS);
  const [det, setDet] = useState(false);
  function obterMes(v) {
    const d = parseDataPeriodo(v);
    if (!d) return '';
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  }
  const dadosComMes = useMemo(
    () => dados.map((i) => ({ ...i, mes: obterMes(i.data) })),
    [dados]
  );
  const meses = useMemo(() => opcoesUnicas(dadosComMes, 'mes'), [dadosComMes]);
  const mesAtual = useMemo(() => {
    const h = new Date();
    return `${String(h.getMonth() + 1).padStart(2, '0')}/${h.getFullYear()}`;
  }, []);
  const dadosPeriodo = useMemo(() => {
    let b = filtrarPorPeriodo(dadosComMes, 'data', pf, dp);
    if (mf === 'atual') b = b.filter((i) => String(i.mes || '') === mesAtual);
    else if (mf) b = b.filter((i) => String(i.mes || '') === mf);
    if (of === 'com')
      b = b.filter((i) => String(i.observacao || '').trim() !== '');
    if (of === 'sem')
      b = b.filter((i) => String(i.observacao || '').trim() === '');
    return b;
  }, [dadosComMes, pf, dp, mf, of, mesAtual]);
  const dadosFiltrados = useMemo(
    () =>
      filtrarDados(dadosPeriodo, busca, fc, [
        'data',
        'diaSemana',
        'pedidos0101',
        'pedidos1020',
        'pedidosGeral',
        'unidades0101',
        'unidades1020',
        'unidadesGeral',
        'observacao',
        'eqAtraso',
        'eqFaturados',
        'eqEnviados',
        'eqAposLimiteExpedicao',
        'eqUnidadesEnviadas',
        'eqUnidadesFaturadas',
        'bbAtraso',
        'bbFaturados',
        'bbTotalEnviados',
        'bbFicouAposLimite',
        'bbUnidadesEnviadas',
        'bbUnidadesFaturadas',
        'geralAtraso',
        'geralFaturados',
        'geralTotalEnviados',
      ]),
    [dadosPeriodo, busca, fc]
  );
  const kpis = useMemo(() => {
    const mp =
        numeroPercentual(mediaPercentual(dadosFiltrados, 'pedidosGeral')) || 0,
      mu =
        numeroPercentual(mediaPercentual(dadosFiltrados, 'unidadesGeral')) || 0,
      rk = dadosFiltrados
        .map((i) => ({ ...i, pct: numeroPercentual(i.pedidosGeral) }))
        .filter((i) => i.pct !== null)
        .sort((a, b) => b.pct - a.pct);
    return {
      dias: dadosFiltrados.length,
      mp,
      mu,
      obs: dadosFiltrados.filter(
        (i) => String(i.observacao || '').trim() !== ''
      ).length,
      melhor: rk[0] || null,
      pior: rk[rk.length - 1] || null,
    };
  }, [dadosFiltrados]);
  const grafico = useMemo(
    () =>
      dadosFiltrados
        .map((i) => ({
          data: i.data,
          pedidos: numeroPercentual(i.pedidosGeral),
          unidades: numeroPercentual(i.unidadesGeral),
        }))
        .filter((i) => i.pedidos !== null || i.unidades !== null)
        .slice(-18),
    [dadosFiltrados]
  );
  const obs = useMemo(
    () =>
      dadosFiltrados
        .filter((i) => String(i.observacao || '').trim() !== '')
        .slice(-6)
        .reverse(),
    [dadosFiltrados]
  );
  const rp = (item, campo, sep) => {
    const cor = corPct(item[campo]);
    return (
      <td
        style={{
          padding: '4px 7px',
          textAlign: 'center',
          fontSize: 10,
          fontWeight: 800,
          fontFamily: C.fontMono,
          background: item[campo] ? cor.bg : '#fff',
          color: item[campo] ? cor.color : C.txtMuted,
          borderLeft: sep ? '4px solid #f0f3ff' : `1px dotted ${C.bdLight}`,
          borderBottom: `1px solid ${C.bdLight}`,
        }}
      >
        {item[campo] || '—'}
      </td>
    );
  };
  const rn = (item, campo, sep, dest) => {
    const v = item[campo] || '—',
      n = numeroInteiro(v);
    return (
      <td
        style={{
          padding: '4px 7px',
          textAlign: 'center',
          fontSize: 10,
          fontFamily: C.fontMono,
          fontWeight: 600,
          color: dest && n > 0 ? C.red : C.txtPri,
          background: dest && n > 0 ? C.redBg : '#fff',
          borderLeft: sep ? '4px solid #f0f3ff' : `1px dotted ${C.bdLight}`,
          borderBottom: `1px solid ${C.bdLight}`,
        }}
      >
        {v}
      </td>
    );
  };
  const panelSt = {
    background: C.bgCard,
    border: `1.5px solid ${C.bdLight}`,
    borderRadius: C.radius.lg,
    padding: 14,
    boxShadow: C.shadowCard,
  };
  const pTitle = {
    fontSize: 10,
    fontWeight: 800,
    color: C.txtSec,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    marginBottom: 10,
    fontFamily: C.font,
  };
  const cols = det ? 23 : 8;
  return (
    <>
      <PageHeader
        titulo="Indicador Diário — Expedição"
        atualizadoEm={atualizado || '—'}
        actions={
          <button
            onClick={load}
            disabled={loading}
            style={btnAtualizar(loading)}
          >
            {loading ? 'Atualizando…' : 'Atualizar'}
          </button>
        }
      />
      {erro && <div style={erroEl}>{erro}</div>}
      <section
        style={{
          background: C.bgCard,
          border: `1.5px solid ${C.bdLight}`,
          borderRadius: C.radius.lg,
          padding: 14,
          marginBottom: 16,
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          alignItems: 'center',
          boxShadow: C.shadowCard,
        }}
      >
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Busca na expedição…"
          style={{ ...inputEl, flex: '1 1 180px' }}
        />
        <select
          value={pf}
          onChange={(e) => setPf(e.target.value)}
          style={selectEl}
        >
          <option value="todos">Todos</option>
          <option value="hoje">Hoje</option>
          <option value="ontem">Ontem</option>
          <option value="ultimos">Últimos X dias</option>
        </select>
        {pf === 'ultimos' && (
          <input
            type="number"
            min="1"
            value={dp}
            onChange={(e) => setDp(e.target.value)}
            style={{ ...selectEl, width: 64 }}
          />
        )}
        <select
          value={mf}
          onChange={(e) => setMf(e.target.value)}
          style={selectEl}
        >
          <option value="atual">Mês atual</option>
          <option value="">Todos</option>
          {meses.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={of}
          onChange={(e) => setOf(e.target.value)}
          style={selectEl}
        >
          <option value="todos">Todas obs.</option>
          <option value="com">Com obs.</option>
          <option value="sem">Sem obs.</option>
        </select>
        <button
          onClick={() => {
            setBusca('');
            setPf('todos');
            setDp('15');
            setMf('atual');
            setOf('todos');
            setDet(false);
            setFc(FILTROS_INDICADOR_EXPEDICAO_DIARIO_INICIAIS);
          }}
          style={btnLimpar}
        >
          Limpar
        </button>
      </section>
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 12,
          marginBottom: 16,
        }}
      >
        <ICard
          titulo="Dias analisados"
          valor={kpis.dias}
          grad={C.grad2}
          detalhe="Conforme filtro"
        />
        <ICard
          titulo="Com observação"
          valor={kpis.obs}
          grad={C.grad5}
          detalhe="Dias com registro"
        />
        <ICard
          titulo="Melhor dia"
          valor={kpis.melhor ? fmtPct(kpis.melhor.pct) : '—'}
          grad={C.grad3}
          detalhe={kpis.melhor ? kpis.melhor.data : 'Sem dados'}
        />
        <ICard
          titulo="Pior dia"
          valor={kpis.pior ? fmtPct(kpis.pior.pct) : '—'}
          grad={C.grad6}
          detalhe={kpis.pior ? kpis.pior.data : 'Sem dados'}
        />
      </section>
      <section
        style={{
          background: C.bgCard,
          border: `1.5px solid ${C.bdLight}`,
          borderRadius: C.radius.xl,
          overflow: 'hidden',
          boxShadow: C.shadowCard,
        }}
      >
        <div
          style={{
            padding: '13px 18px',
            borderBottom: `1.5px solid ${C.bdLight}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(135deg,#fafbff,#f5f7ff)',
          }}
        >
          <span
            style={{
              fontWeight: 800,
              color: C.txtPri,
              fontSize: 14,
              fontFamily: C.font,
              letterSpacing: '-0.02em',
            }}
          >
            Desempenho Diário — Expedição
          </span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setDet((v) => !v)}
              style={{
                height: 30,
                border: `1.5px solid ${det ? C.primary : C.bdMid}`,
                borderRadius: C.radius.md,
                padding: '0 12px',
                fontSize: 11,
                fontWeight: 700,
                background: det ? C.primaryLight : C.bgCard,
                color: det ? C.primary : C.txtPri,
                cursor: 'pointer',
                fontFamily: C.font,
              }}
            >
              {det ? 'Ocultar detalhes' : 'Ver detalhes'}
            </button>
            <ContadorRegistros
              filtrados={dadosFiltrados.length}
              total={dados.length}
            />
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 11,
              fontFamily: C.font,
            }}
          >
            <thead>
              <tr>
                <th
                  colSpan="2"
                  style={{
                    background: 'linear-gradient(135deg,#302b63,#24243e)',
                    color: '#c4b5fd',
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    padding: '7px 8px',
                  }}
                >
                  Dia
                </th>
                <th
                  colSpan="3"
                  style={{
                    background: 'linear-gradient(135deg,#1a1f6e,#2d3282)',
                    color: '#bfdbfe',
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    padding: '7px 8px',
                    borderLeft: '4px solid #f0f3ff',
                  }}
                >
                  Pedidos (%)
                </th>
                <th
                  colSpan="3"
                  style={{
                    background: 'linear-gradient(135deg,#064e3b,#065f46)',
                    color: '#a7f3d0',
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    padding: '7px 8px',
                    borderLeft: '4px solid #f0f3ff',
                  }}
                >
                  Unidades (%)
                </th>
                {det && (
                  <>
                    <th
                      colSpan="6"
                      style={{
                        background: 'linear-gradient(135deg,#1e3a5f,#1e40af)',
                        color: '#bae6fd',
                        fontSize: 9,
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        padding: '7px 8px',
                        borderLeft: '4px solid #f0f3ff',
                      }}
                    >
                      Equipatech
                    </th>
                    <th
                      colSpan="6"
                      style={{
                        background: 'linear-gradient(135deg,#134e4a,#065f46)',
                        color: '#99f6e4',
                        fontSize: 9,
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        padding: '7px 8px',
                        borderLeft: '4px solid #f0f3ff',
                      }}
                    >
                      BBBaterias
                    </th>
                    <th
                      colSpan="3"
                      style={{
                        background: 'linear-gradient(135deg,#374151,#1f2937)',
                        color: '#d1d5db',
                        fontSize: 9,
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        padding: '7px 8px',
                        borderLeft: '4px solid #f0f3ff',
                      }}
                    >
                      Geral
                    </th>
                  </>
                )}
              </tr>
              <tr
                style={{
                  background: 'linear-gradient(135deg,#f0f3ff,#e8ecff)',
                }}
              >
                {['Data', 'Dia'].map((t) => (
                  <th
                    key={t}
                    style={{
                      padding: '6px 8px',
                      fontSize: 9,
                      fontWeight: 900,
                      color: C.txtSec,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: `1.5px solid ${C.bdLight}`,
                    }}
                  >
                    {t}
                  </th>
                ))}
                {['0101', '1020', 'Geral'].map((t, i) => (
                  <th
                    key={`p${i}`}
                    style={{
                      padding: '6px 8px',
                      fontSize: 9,
                      fontWeight: 900,
                      color: C.txtSec,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: `1.5px solid ${C.bdLight}`,
                      borderLeft: i === 0 ? '4px solid #f0f3ff' : undefined,
                    }}
                  >
                    {t}
                  </th>
                ))}
                {['0101', '1020', 'Geral'].map((t, i) => (
                  <th
                    key={`u${i}`}
                    style={{
                      padding: '6px 8px',
                      fontSize: 9,
                      fontWeight: 900,
                      color: C.txtSec,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: `1.5px solid ${C.bdLight}`,
                      borderLeft: i === 0 ? '4px solid #f0f3ff' : undefined,
                    }}
                  >
                    {t}
                  </th>
                ))}
                {det && (
                  <>
                    {[
                      'Atraso',
                      'Fat.',
                      'Env.',
                      'Após lim.',
                      'Un.Env.',
                      'Un.Fat.',
                    ].map((t, i) => (
                      <th
                        key={`eq${i}`}
                        style={{
                          padding: '5px 6px',
                          fontSize: 9,
                          fontWeight: 900,
                          color: C.txtSec,
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          borderBottom: `1.5px solid ${C.bdLight}`,
                          borderLeft: i === 0 ? '4px solid #f0f3ff' : undefined,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {t}
                      </th>
                    ))}
                    {[
                      'Atraso',
                      'Fat.',
                      'Env.',
                      'Após lim.',
                      'Un.Env.',
                      'Un.Fat.',
                    ].map((t, i) => (
                      <th
                        key={`bb${i}`}
                        style={{
                          padding: '5px 6px',
                          fontSize: 9,
                          fontWeight: 900,
                          color: C.txtSec,
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          borderBottom: `1.5px solid ${C.bdLight}`,
                          borderLeft: i === 0 ? '4px solid #f0f3ff' : undefined,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {t}
                      </th>
                    ))}
                    {['Atraso', 'Fat.', 'Env.'].map((t, i) => (
                      <th
                        key={`g${i}`}
                        style={{
                          padding: '5px 6px',
                          fontSize: 9,
                          fontWeight: 900,
                          color: C.txtSec,
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          borderBottom: `1.5px solid ${C.bdLight}`,
                          borderLeft: i === 0 ? '4px solid #f0f3ff' : undefined,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {t}
                      </th>
                    ))}
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {loading && !dadosFiltrados.length && (
                <tr>
                  <td
                    colSpan={cols}
                    style={{
                      padding: 28,
                      textAlign: 'center',
                      color: C.txtMuted,
                      fontFamily: C.font,
                    }}
                  >
                    Carregando…
                  </td>
                </tr>
              )}
              {!loading && !dadosFiltrados.length && (
                <tr>
                  <td
                    colSpan={cols}
                    style={{
                      padding: 28,
                      textAlign: 'center',
                      color: C.txtMuted,
                      fontFamily: C.font,
                    }}
                  >
                    Nenhum indicador encontrado.
                  </td>
                </tr>
              )}
              {dadosFiltrados.map((item, idx) => (
                <tr
                  key={idx}
                  style={{ background: idx % 2 === 0 ? '#fff' : C.bgStripe }}
                >
                  <td
                    style={{
                      padding: '5px 8px',
                      textAlign: 'center',
                      fontSize: 10,
                      fontWeight: 700,
                      color: C.txtPri,
                      borderBottom: `1px solid ${C.bdLight}`,
                      fontFamily: C.fontMono,
                    }}
                  >
                    {item.data || '—'}
                  </td>
                  <td
                    style={{
                      padding: '5px 8px',
                      textAlign: 'center',
                      fontSize: 10,
                      color: C.txtSec,
                      borderBottom: `1px solid ${C.bdLight}`,
                      fontFamily: C.font,
                    }}
                  >
                    {item.diaSemana || '—'}
                  </td>
                  {rp(item, 'pedidos0101', true)}
                  {rp(item, 'pedidos1020')}
                  {rp(item, 'pedidosGeral')}
                  {rp(item, 'unidades0101', true)}
                  {rp(item, 'unidades1020')}
                  {rp(item, 'unidadesGeral')}
                  {det && (
                    <>
                      {rn(item, 'eqAtraso', true, true)}
                      {rn(item, 'eqFaturados')}
                      {rn(item, 'eqEnviados')}
                      {rn(item, 'eqAposLimiteExpedicao', false, true)}
                      {rn(item, 'eqUnidadesEnviadas')}
                      {rn(item, 'eqUnidadesFaturadas')}
                      {rn(item, 'bbAtraso', true, true)}
                      {rn(item, 'bbFaturados')}
                      {rn(item, 'bbTotalEnviados')}
                      {rn(item, 'bbFicouAposLimite', false, true)}
                      {rn(item, 'bbUnidadesEnviadas')}
                      {rn(item, 'bbUnidadesFaturadas')}
                      {rn(item, 'geralAtraso', true, true)}
                      {rn(item, 'geralFaturados')}
                      {rn(item, 'geralTotalEnviados')}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section style={{ ...panelSt, marginTop: 14 }}>
        <div style={pTitle}>Últimas Observações</div>
        {!obs.length ? (
          <div
            style={{
              color: C.txtMuted,
              fontSize: 12,
              fontFamily: C.font,
              padding: '20px 0',
              textAlign: 'center',
            }}
          >
            Nenhuma observação no período.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {obs.map((item, i) => (
              <div
                key={i}
                style={{
                  borderBottom: `1.5px solid ${C.bdLight}`,
                  paddingBottom: 10,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    background: C.grad1,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: 3,
                    fontFamily: C.font,
                  }}
                >
                  {item.data} · {item.diaSemana}
                </div>
                <div
                  style={{
                    color: C.txtPri,
                    fontSize: 12,
                    lineHeight: 1.4,
                    fontFamily: C.font,
                  }}
                >
                  {item.observacao}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function TelaIndicadorAbastecimentoEstoque() {
  const { dados, loading, erro, atualizado, load } = useIndicador(
    'indicadorAbastecimentoEstoque'
  );

  const [busca, setBusca] = useState('');
  const [mesFiltro, setMesFiltro] = useState('atual');
  const [pf, setPf] = useState('todos');
  const [dp, setDp] = useState('30');
  const [fc, setFc] = useState(
    FILTROS_INDICADOR_ABASTECIMENTO_ESTOQUE_INICIAIS
  );

  const mesAtual = useMemo(() => {
    const hoje = new Date();
    return `${String(hoje.getMonth() + 1).padStart(
      2,
      '0'
    )}/${hoje.getFullYear()}`;
  }, []);

  function obterMesPorData(valor) {
    const data = parseDataPeriodo(valor);

    if (!data) return '';

    return `${String(data.getMonth() + 1).padStart(
      2,
      '0'
    )}/${data.getFullYear()}`;
  }

  function obterMetaComparacao() {
    return 95;
  }

  function obterStatusMeta(percentual) {
    const numero = numeroPercentual(percentual);
    const metaComparacao = obterMetaComparacao();

    if (numero === null) return 'Sem percentual';
    if (numero >= metaComparacao) return 'Meta atingida';
    if (numero >= metaComparacao - 2) return 'Atenção';
    return 'Abaixo da meta';
  }

  function tipoStatusMeta(status) {
    const s = normalizar(status);

    if (s.includes('atingida')) return 'verde';
    if (s.includes('atencao')) return 'laranja';
    if (s.includes('abaixo')) return 'vermelho';

    return 'cinza';
  }

  const dadosTratados = useMemo(
    () =>
      (dados || []).map((item) => {
        const percentualDireto = numeroPercentual(item.percentual);
        const metaNumero = numeroInteiro(item.meta);
        const realizadoNumero = numeroInteiro(item.realizado);

        const percentualNumero =
          percentualDireto !== null
            ? percentualDireto
            : metaNumero > 0
            ? (realizadoNumero / metaNumero) * 100
            : null;

        const percentualCalculado =
          percentualNumero === null
            ? ''
            : `${percentualNumero.toFixed(2).replace('.', ',')}%`;

        const statusMeta = obterStatusMeta(percentualCalculado);

        return {
          ...item,
          mes: obterMesPorData(item.data),
          metaSistema: '95%',
          percentualCalculado,
          percentualNumero,
          statusMeta,
        };
      }),
    [dados]
  );

  const meses = useMemo(
    () => opcoesUnicas(dadosTratados, 'mes'),
    [dadosTratados]
  );

  const dadosMes = useMemo(() => {
    if (mesFiltro === 'atual') {
      return dadosTratados.filter(
        (item) => String(item.mes || '') === mesAtual
      );
    }

    if (!mesFiltro) return dadosTratados;

    return dadosTratados.filter(
      (item) => String(item.mes || '') === String(mesFiltro)
    );
  }, [dadosTratados, mesFiltro, mesAtual]);

  const dadosPeriodo = useMemo(
    () => filtrarPorPeriodo(dadosMes, 'data', pf, dp),
    [dadosMes, pf, dp]
  );

  const dadosFiltrados = useMemo(
    () =>
      filtrarDados(dadosPeriodo, busca, fc, [
        'data',
        'mes',
        'meta',
        'metaSistema',
        'realizado',
        'percentualCalculado',
        'statusMeta',
      ]),
    [dadosPeriodo, busca, fc]
  );

  const kpis = useMemo(() => {
    const percentuais = dadosFiltrados
      .map((item) => item.percentualNumero)
      .filter((numero) => numero !== null && numero !== undefined);

    const media =
      percentuais.length > 0
        ? percentuais.reduce((total, numero) => total + numero, 0) /
          percentuais.length
        : null;

    const ordenados = dadosFiltrados
      .filter((item) => item.percentualNumero !== null)
      .sort((a, b) => b.percentualNumero - a.percentualNumero);

    return {
      registros: dadosFiltrados.length,
      media: media === null ? '—' : `${media.toFixed(2).replace('.', ',')}%`,
      metaAtingida: dadosFiltrados.filter((item) =>
        normalizar(item.statusMeta).includes('atingida')
      ).length,
      abaixoMeta: dadosFiltrados.filter((item) =>
        normalizar(item.statusMeta).includes('abaixo')
      ).length,
      melhor: ordenados[0] || null,
      pior: ordenados[ordenados.length - 1] || null,
    };
  }, [dadosFiltrados]);

  const colunas = [
    { campo: 'data', titulo: 'Data', bold: true, width: 120 },
    { campo: 'mes', titulo: 'Mês', width: 90 },
    { campo: 'metaSistema', titulo: 'Meta', width: 90 },
    { campo: 'realizado', titulo: 'Realizado', width: 90 },
    {
      campo: 'percentualCalculado',
      titulo: 'Percentual',
      bold: true,
      width: 110,
      render: (item) => (
        <Badge
          texto={item.percentualCalculado || '—'}
          tipo={tipoStatusMeta(item.statusMeta)}
        />
      ),
    },
    {
      campo: 'statusMeta',
      titulo: 'Status',
      width: 130,
      render: (item) => (
        <Badge texto={item.statusMeta} tipo={tipoStatusMeta(item.statusMeta)} />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        titulo="Abastecimento Estoque"
        atualizadoEm={atualizado || '—'}
        extraInfo={
          <span>
            Meta considerada: <strong style={{ color: C.txtSec }}>95%</strong>
          </span>
        }
        actions={
          <button
            onClick={load}
            disabled={loading}
            style={btnAtualizar(loading)}
          >
            {loading ? 'Atualizando…' : 'Atualizar'}
          </button>
        }
      />

      {erro && <div style={erroEl}>{erro}</div>}

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
          gap: 12,
          marginBottom: 18,
        }}
      >
        <Kpi titulo="Registros" valor={kpis.registros} />
        <Kpi titulo="Média Picking" valor={kpis.media} />
        <Kpi titulo="Meta Atingida" valor={kpis.metaAtingida} />
        <Kpi titulo="Abaixo da Meta" valor={kpis.abaixoMeta} />
      </section>

      <section
        style={{
          marginBottom: 16,
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Busca nos registros de abastecimento..."
          style={inputEl}
        />

        <select
          value={mesFiltro}
          onChange={(e) => setMesFiltro(e.target.value)}
          style={selectEl}
        >
          <option value="atual">Mês atual</option>
          <option value="">Todos os meses</option>
          {meses.map((mes) => (
            <option key={mes} value={mes}>
              {mes}
            </option>
          ))}
        </select>

        <select
          value={pf}
          onChange={(e) => setPf(e.target.value)}
          style={selectEl}
        >
          <option value="todos">Todos os períodos</option>
          <option value="hoje">Hoje</option>
          <option value="ontem">Ontem</option>
          <option value="ultimos">Últimos X dias</option>
        </select>

        {pf === 'ultimos' && (
          <input
            type="number"
            min="1"
            value={dp}
            onChange={(e) => setDp(e.target.value)}
            style={{ ...selectEl, width: 64 }}
          />
        )}

        <button
          onClick={() => {
            setBusca('');
            setMesFiltro('atual');
            setPf('todos');
            setDp('30');
            setFc(FILTROS_INDICADOR_ABASTECIMENTO_ESTOQUE_INICIAIS);
          }}
          style={btnLimpar}
        >
          Limpar filtros
        </button>
      </section>

      <TabelaPadrao
        titulo="Registros Diários — Abastecimento do Estoque"
        dadosBase={dadosTratados}
        dadosFiltrados={dadosFiltrados}
        colunas={colunas}
        filtros={fc}
        onFiltro={(c, v) => setFc((p) => ({ ...p, [c]: v }))}
        carregando={loading}
        mensagemVazia="Nenhum registro de abastecimento encontrado."
      />
    </>
  );
}

function TelaIndicadorAbastecimentoMensal() {
  const { dados, loading, erro, atualizado, load } = useIndicador(
    'indicadorAbastecimentoEstoque'
  );

  const [busca, setBusca] = useState('');
  const [anoFiltro, setAnoFiltro] = useState('atual');

  const anoAtual = useMemo(() => String(new Date().getFullYear()), []);

  function obterMesAnoPorData(valor) {
    const data = parseDataPeriodo(valor);

    if (!data) return '';

    return `${String(data.getMonth() + 1).padStart(
      2,
      '0'
    )}/${data.getFullYear()}`;
  }

  function obterAnoPorMesAno(valor) {
    const partes = String(valor || '').match(/^(\d{2})\/(\d{4})$/);
    return partes ? partes[2] : '';
  }

  function statusMetaMensal(percentual) {
    const numero = numeroPercentual(percentual);

    if (numero === null) return 'Sem percentual';
    if (numero >= 95) return 'Meta atingida';
    if (numero >= 93) return 'Atenção';
    return 'Abaixo da meta';
  }

  function tipoStatusMetaMensal(status) {
    const s = normalizar(status);

    if (s.includes('atingida')) return 'verde';
    if (s.includes('atencao')) return 'laranja';
    if (s.includes('abaixo')) return 'vermelho';

    return 'cinza';
  }

  const dadosTratados = useMemo(
    () =>
      (dados || [])
        .map((item) => {
          const percentualDireto = numeroPercentual(item.percentual);
          const metaNumero = numeroInteiro(item.meta);
          const realizadoNumero = numeroInteiro(item.realizado);

          const percentualNumero =
            percentualDireto !== null
              ? percentualDireto
              : metaNumero > 0
              ? (realizadoNumero / metaNumero) * 100
              : null;

          const mesAno = obterMesAnoPorData(item.data);

          return {
            ...item,
            mesAno,
            ano: obterAnoPorMesAno(mesAno),
            percentualNumero,
          };
        })
        .filter(
          (item) =>
            item.mesAno &&
            item.percentualNumero !== null &&
            item.percentualNumero !== undefined
        ),
    [dados]
  );

  const dadosMensais = useMemo(() => {
    const mapa = new Map();

    dadosTratados.forEach((item) => {
      if (!mapa.has(item.mesAno)) {
        mapa.set(item.mesAno, {
          mesAno: item.mesAno,
          ano: item.ano,
          totalPercentual: 0,
          registros: 0,
        });
      }

      const registro = mapa.get(item.mesAno);
      registro.totalPercentual += item.percentualNumero;
      registro.registros += 1;
    });

    return Array.from(mapa.values())
      .map((item) => {
        const mediaNumero =
          item.registros > 0 ? item.totalPercentual / item.registros : null;

        const percentual =
          mediaNumero === null
            ? ''
            : `${mediaNumero.toFixed(2).replace('.', ',')}%`;

        return {
          mesAno: item.mesAno,
          ano: item.ano,
          percentual,
          percentualNumero: mediaNumero,
          statusMeta: statusMetaMensal(percentual),
        };
      })
      .sort((a, b) => {
        const [mesA, anoA] = String(a.mesAno).split('/').map(Number);
        const [mesB, anoB] = String(b.mesAno).split('/').map(Number);
        return anoA === anoB ? mesA - mesB : anoA - anoB;
      });
  }, [dadosTratados]);

  const anos = useMemo(() => opcoesUnicas(dadosMensais, 'ano'), [dadosMensais]);

  const dadosFiltrados = useMemo(() => {
    const termo = normalizar(busca);

    return dadosMensais.filter((item) => {
      const anoOk =
        anoFiltro === 'atual'
          ? String(item.ano || '') === anoAtual
          : !anoFiltro || String(item.ano || '') === String(anoFiltro);

      const buscaOk =
        !termo ||
        normalizar(item.mesAno).includes(termo) ||
        normalizar(item.percentual).includes(termo) ||
        normalizar(item.statusMeta).includes(termo);

      return anoOk && buscaOk;
    });
  }, [dadosMensais, busca, anoFiltro, anoAtual]);

  const kpis = useMemo(() => {
    const percentuais = dadosFiltrados
      .map((item) => item.percentualNumero)
      .filter((numero) => numero !== null && numero !== undefined);

    const media =
      percentuais.length > 0
        ? percentuais.reduce((total, numero) => total + numero, 0) /
          percentuais.length
        : null;

    const ordenados = [...dadosFiltrados]
      .filter((item) => item.percentualNumero !== null)
      .sort((a, b) => b.percentualNumero - a.percentualNumero);

    return {
      meses: dadosFiltrados.length,
      media: media === null ? '—' : `${media.toFixed(2).replace('.', ',')}%`,
      melhor: ordenados[0] || null,
      pior: ordenados[ordenados.length - 1] || null,
    };
  }, [dadosFiltrados]);

  const colunas = [
    { campo: 'mesAno', titulo: 'Mês/Ano', bold: true, width: 120 },
    {
      campo: 'percentual',
      titulo: 'Percentual',
      bold: true,
      width: 120,
      render: (item) => (
        <Badge
          texto={item.percentual || '—'}
          tipo={tipoStatusMetaMensal(item.statusMeta)}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        titulo="Abastecimento Mensal"
        atualizadoEm={atualizado || '—'}
        extraInfo={
          <span>
            Meta considerada: <strong style={{ color: C.txtSec }}>95%</strong>
          </span>
        }
        actions={
          <button
            onClick={load}
            disabled={loading}
            style={btnAtualizar(loading)}
          >
            {loading ? 'Atualizando…' : 'Atualizar'}
          </button>
        }
      />

      {erro && <div style={erroEl}>{erro}</div>}

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
          gap: 12,
          marginBottom: 18,
        }}
      >
        <Kpi titulo="Meses Analisados" valor={kpis.meses} />
        <Kpi titulo="Média Geral" valor={kpis.media} />
        <Kpi
          titulo="Melhor Mês"
          valor={kpis.melhor ? kpis.melhor.percentual : '—'}
          subtitulo={kpis.melhor ? kpis.melhor.mesAno : ''}
        />
        <Kpi
          titulo="Pior Mês"
          valor={kpis.pior ? kpis.pior.percentual : '—'}
          subtitulo={kpis.pior ? kpis.pior.mesAno : ''}
        />
      </section>

      <section
        style={{
          marginBottom: 16,
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Busca por mês ou percentual..."
          style={inputEl}
        />

        <select
          value={anoFiltro}
          onChange={(e) => setAnoFiltro(e.target.value)}
          style={selectEl}
        >
          <option value="atual">Ano atual</option>
          <option value="">Todos os anos</option>
          {anos.map((ano) => (
            <option key={ano} value={ano}>
              {ano}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setBusca('');
            setAnoFiltro('atual');
          }}
          style={btnLimpar}
        >
          Limpar filtros
        </button>
      </section>

      <TabelaPadrao
        titulo="Abastecimento Mensal — Média por Mês"
        dadosBase={dadosMensais}
        dadosFiltrados={dadosFiltrados}
        colunas={colunas}
        filtros={{}}
        onFiltro={() => {}}
        carregando={loading}
        mensagemVazia="Nenhum indicador mensal de abastecimento encontrado."
      />
    </>
  );
}

function obterAnoMesIndicador(mesTexto) {
  const partes = String(mesTexto || '')
    .trim()
    .match(/^(\d{2})\/(\d{4})$/);
  return partes ? partes[2] : '';
}

function TelaIndicadorMensal({ tipo }) {
  const expedicao = tipo === 'expedicao';
  const fonte = expedicao
    ? 'indicadorExpedicaoMensal'
    : 'indicadorFaturamentoMensal';
  const titulo = expedicao
    ? 'Indicador Mensal — Expedição'
    : 'Indicador Mensal — Faturamento';
  const { dados, loading, erro, atualizado, load } = useIndicador(fonte);
  const [busca, setBusca] = useState('');
  const [anoFiltro, setAnoFiltro] = useState('atual');

  const anoAtual = useMemo(() => String(new Date().getFullYear()), []);

  const dadosComAno = useMemo(
    () =>
      dados.map((item) => ({ ...item, ano: obterAnoMesIndicador(item.mes) })),
    [dados]
  );

  const anos = useMemo(() => opcoesUnicas(dadosComAno, 'ano'), [dadosComAno]);

  const camposBusca = expedicao
    ? [
        'mes',
        'pedidos0101',
        'pedidos1020',
        'pedidosGeral',
        'unidades0101',
        'unidades1020',
        'unidadesGeral',
        'unidadesMedia',
      ]
    : [
        'mes',
        'pedidos001',
        'pedidos002',
        'pedidos005',
        'pedidosGeral',
        'unidades001',
        'unidades002',
        'unidades005',
        'unidadesGeral',
        'unidadesMedia',
        'pedidos1030SP',
        'pedidos1040MG',
        'pedidos0104MG',
        'pedidos0105ES',
        'pedidosMediaCD',
      ];

  const dadosFiltrados = useMemo(() => {
    const termo = normalizar(busca);
    return dadosComAno.filter((item) => {
      const anoOk =
        anoFiltro === 'atual'
          ? String(item.ano || '') === anoAtual
          : !anoFiltro || String(item.ano || '') === String(anoFiltro);

      const buscaOk =
        !termo ||
        camposBusca.some((campo) => normalizar(item[campo]).includes(termo));

      return anoOk && buscaOk;
    });
  }, [dadosComAno, busca, anoFiltro, anoAtual, camposBusca]);

  const kpis = useMemo(() => {
    const mp =
      numeroPercentual(mediaPercentual(dadosFiltrados, 'pedidosGeral')) || 0;
    const mu =
      numeroPercentual(mediaPercentual(dadosFiltrados, 'unidadesGeral')) || 0;
    const rk = dadosFiltrados
      .map((item) => ({ ...item, pct: numeroPercentual(item.pedidosGeral) }))
      .filter((item) => item.pct !== null)
      .sort((a, b) => b.pct - a.pct);

    return {
      meses: dadosFiltrados.length,
      mp,
      mu,
      melhor: rk[0] || null,
      pior: rk[rk.length - 1] || null,
    };
  }, [dadosFiltrados]);

  const grafico = useMemo(
    () =>
      dadosFiltrados
        .map((item) => ({
          mes: item.mes,
          pedidos: numeroPercentual(item.pedidosGeral),
          unidades: numeroPercentual(item.unidadesGeral),
        }))
        .filter((item) => item.pedidos !== null || item.unidades !== null)
        .slice(-18),
    [dadosFiltrados]
  );

  const panelSt = {
    background: C.bgCard,
    border: `1.5px solid ${C.bdLight}`,
    borderRadius: C.radius.lg,
    padding: 14,
    boxShadow: C.shadowCard,
  };

  const pTitle = {
    fontSize: 10,
    fontWeight: 800,
    color: C.txtSec,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    marginBottom: 10,
    fontFamily: C.font,
  };

  const grupoHeader = (grad, color, left = false) => ({
    background: grad,
    color,
    fontSize: 9,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    textAlign: 'center',
    padding: '7px 8px',
    borderLeft: left ? '4px solid #f0f3ff' : undefined,
  });

  const subHeader = (left = false) => ({
    padding: '6px 8px',
    fontSize: 9,
    fontWeight: 900,
    color: C.txtSec,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    borderBottom: `1.5px solid ${C.bdLight}`,
    borderLeft: left ? '4px solid #f0f3ff' : undefined,
    whiteSpace: 'nowrap',
  });

  const tdInfo = {
    padding: '5px 8px',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 800,
    color: C.txtPri,
    borderBottom: `1px solid ${C.bdLight}`,
    fontFamily: C.fontMono,
    whiteSpace: 'nowrap',
  };

  function PercentCell({ item, campo, sep }) {
    const cor = corPct(item[campo]);
    return (
      <td
        style={{
          padding: '4px 7px',
          textAlign: 'center',
          fontSize: 10,
          fontWeight: 800,
          fontFamily: C.fontMono,
          background: item[campo] ? cor.bg : '#fff',
          color: item[campo] ? cor.color : C.txtMuted,
          borderLeft: sep ? '4px solid #f0f3ff' : `1px dotted ${C.bdLight}`,
          borderBottom: `1px solid ${C.bdLight}`,
          whiteSpace: 'nowrap',
        }}
      >
        {item[campo] || '—'}
      </td>
    );
  }

  const totalColunas = expedicao ? 8 : 15;

  return (
    <>
      <PageHeader
        titulo={titulo}
        atualizadoEm={atualizado || '—'}
        actions={
          <button
            onClick={load}
            disabled={loading}
            style={btnAtualizar(loading)}
          >
            {loading ? 'Atualizando…' : 'Atualizar'}
          </button>
        }
      />

      {erro && <div style={erroEl}>{erro}</div>}

      <section
        style={{
          background: C.bgCard,
          border: `1.5px solid ${C.bdLight}`,
          borderRadius: C.radius.lg,
          padding: 14,
          marginBottom: 16,
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          alignItems: 'center',
          boxShadow: C.shadowCard,
        }}
      >
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Busca no indicador mensal…"
          style={{ ...inputEl, flex: '1 1 220px' }}
        />
        <select
          value={anoFiltro}
          onChange={(e) => setAnoFiltro(e.target.value)}
          style={selectEl}
        >
          <option value="atual">Ano atual</option>
          <option value="">Todos os anos</option>
          {anos.map((ano) => (
            <option key={ano} value={ano}>
              {ano}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            setBusca('');
            setAnoFiltro('atual');
          }}
          style={btnLimpar}
        >
          Limpar
        </button>
      </section>

      <section
        style={{
          background: C.bgCard,
          border: `1.5px solid ${C.bdLight}`,
          borderRadius: C.radius.xl,
          overflow: 'hidden',
          boxShadow: C.shadowCard,
        }}
      >
        <div
          style={{
            padding: '13px 18px',
            borderBottom: `1.5px solid ${C.bdLight}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(135deg,#fafbff,#f5f7ff)',
          }}
        >
          <span
            style={{
              fontWeight: 800,
              color: C.txtPri,
              fontSize: 14,
              fontFamily: C.font,
              letterSpacing: '-0.02em',
            }}
          >
            Desempenho Mensal Detalhado
          </span>
          <ContadorRegistros
            filtrados={dadosFiltrados.length}
            total={dados.length}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 11,
              fontFamily: C.font,
            }}
          >
            <thead>
              <tr>
                <th
                  colSpan="1"
                  style={grupoHeader(
                    'linear-gradient(135deg,#302b63,#24243e)',
                    '#c4b5fd'
                  )}
                >
                  Mês
                </th>
                <th
                  colSpan={expedicao ? 3 : 4}
                  style={grupoHeader(
                    'linear-gradient(135deg,#1a1f6e,#2d3282)',
                    '#bfdbfe',
                    true
                  )}
                >
                  Pedidos (%)
                </th>
                <th
                  colSpan={expedicao ? 4 : 5}
                  style={grupoHeader(
                    'linear-gradient(135deg,#064e3b,#065f46)',
                    '#a7f3d0',
                    true
                  )}
                >
                  Unidades (%)
                </th>
                {!expedicao && (
                  <th
                    colSpan="5"
                    style={grupoHeader(
                      'linear-gradient(135deg,#374151,#1f2937)',
                      '#d1d5db',
                      true
                    )}
                  >
                    CDs
                  </th>
                )}
              </tr>
              <tr
                style={{
                  background: 'linear-gradient(135deg,#f0f3ff,#e8ecff)',
                }}
              >
                <th style={subHeader()}>Mês</th>
                {expedicao ? (
                  <>
                    {['0101', '1020', 'Geral'].map((t, i) => (
                      <th key={`p${i}`} style={subHeader(i === 0)}>
                        {t}
                      </th>
                    ))}
                    {['0101', '1020', 'Geral', 'Média'].map((t, i) => (
                      <th key={`u${i}`} style={subHeader(i === 0)}>
                        {t}
                      </th>
                    ))}
                  </>
                ) : (
                  <>
                    {['001', '002', '005', 'Geral'].map((t, i) => (
                      <th key={`p${i}`} style={subHeader(i === 0)}>
                        {t}
                      </th>
                    ))}
                    {['001', '002', '005', 'Geral', 'Média'].map((t, i) => (
                      <th key={`u${i}`} style={subHeader(i === 0)}>
                        {t}
                      </th>
                    ))}
                    {['1030-SP', '1040-MG', '0104-MG', '0105-ES', 'Média'].map(
                      (t, i) => (
                        <th key={`c${i}`} style={subHeader(i === 0)}>
                          {t}
                        </th>
                      )
                    )}
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {loading && !dadosFiltrados.length && (
                <tr>
                  <td
                    colSpan={totalColunas}
                    style={{
                      padding: 28,
                      textAlign: 'center',
                      color: C.txtMuted,
                      fontFamily: C.font,
                    }}
                  >
                    Carregando…
                  </td>
                </tr>
              )}
              {!loading && !dadosFiltrados.length && (
                <tr>
                  <td
                    colSpan={totalColunas}
                    style={{
                      padding: 28,
                      textAlign: 'center',
                      color: C.txtMuted,
                      fontFamily: C.font,
                    }}
                  >
                    Nenhum indicador mensal encontrado.
                  </td>
                </tr>
              )}
              {dadosFiltrados.map((item, idx) => (
                <tr
                  key={idx}
                  style={{ background: idx % 2 === 0 ? '#fff' : C.bgStripe }}
                >
                  <td style={tdInfo}>{item.mes || '—'}</td>
                  {expedicao ? (
                    <>
                      <PercentCell item={item} campo="pedidos0101" sep />
                      <PercentCell item={item} campo="pedidos1020" />
                      <PercentCell item={item} campo="pedidosGeral" />
                      <PercentCell item={item} campo="unidades0101" sep />
                      <PercentCell item={item} campo="unidades1020" />
                      <PercentCell item={item} campo="unidadesGeral" />
                      <PercentCell item={item} campo="unidadesMedia" />
                    </>
                  ) : (
                    <>
                      <PercentCell item={item} campo="pedidos001" sep />
                      <PercentCell item={item} campo="pedidos002" />
                      <PercentCell item={item} campo="pedidos005" />
                      <PercentCell item={item} campo="pedidosGeral" />
                      <PercentCell item={item} campo="unidades001" sep />
                      <PercentCell item={item} campo="unidades002" />
                      <PercentCell item={item} campo="unidades005" />
                      <PercentCell item={item} campo="unidadesGeral" />
                      <PercentCell item={item} campo="unidadesMedia" />
                      <PercentCell item={item} campo="pedidos1030SP" sep />
                      <PercentCell item={item} campo="pedidos1040MG" />
                      <PercentCell item={item} campo="pedidos0104MG" />
                      <PercentCell item={item} campo="pedidos0105ES" />
                      <PercentCell item={item} campo="pedidosMediaCD" />
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

// ─── App Shell ─────────────────────────────────────────────────────────────────

function TelaDashboard({ setTela }) {
  const [dadosDashboard, setDadosDashboard] = useState({
    equipatech: [],
    bbbaterias: [],
    producao: [],
    estoque: [],
    consultaPecas: [],
    ajusteSaldo: [],
    ajusteSaldoBBBaterias: [],
    pedidoVenda1020: [],
    indicadorFaturamentoMensal: [],
    indicadorExpedicaoMensal: [],
    indicadorAbastecimentoEstoque: [],
  });
  const [atualizacoesDashboard, setAtualizacoesDashboard] = useState({});
  const [atualizadoEm, setAtualizadoEm] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [errosFontes, setErrosFontes] = useState([]);

  const carregarDashboard = useCallback(async () => {
    setCarregando(true);

    const fontes = [
      'equipatech',
      'bbbaterias',
      'producao',
      'estoque',
      'consultaPecas',
      'ajusteSaldo',
      'ajusteSaldoBBBaterias',
      'pedidoVenda1020',
      'indicadorFaturamentoMensal',
      'indicadorExpedicaoMensal',
      'indicadorAbastecimentoEstoque',
    ];

    const buscarFonte = async (fonte) => {
      try {
        const resposta = await fetch(`${API_BASE}?action=dados&fonte=${fonte}`);
        const json = await resposta.json();

        if (!json.ok) {
          throw new Error(json.erro || `Erro ao carregar ${fonte}`);
        }

        let dados = json.dados || [];

        if (fonte === 'estoque') {
          dados = aplicarStatusSeparacaoEstoque(dados);
        }

        setCacheDadosPainel(fonte, dados);

        return {
          fonte,
          ok: true,
          dados,
          atualizadoEm: json.atualizadoEm || '',
        };
      } catch (e) {
        return {
          fonte,
          ok: false,
          dados: [],
          erro: e.message,
          atualizadoEm: '',
        };
      }
    };

    try {
      const respostas = await Promise.all(fontes.map(buscarFonte));
      const novoEstado = {};
      const novasAtualizacoes = {};

      respostas.forEach((item) => {
        novoEstado[item.fonte] = item.dados || [];
        novasAtualizacoes[item.fonte] = item.atualizadoEm || '';
      });

      setDadosDashboard((estadoAtual) => ({
        ...estadoAtual,
        ...novoEstado,
      }));

      setAtualizacoesDashboard((estadoAtual) => ({
        ...estadoAtual,
        ...novasAtualizacoes,
      }));

      const erros = respostas
        .filter((item) => !item.ok)
        .map((item) => `${item.fonte}: ${item.erro}`);

      setErrosFontes(erros);
      setAtualizadoEm(new Date().toLocaleString('pt-BR'));
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarDashboard();
    const intervalo = setInterval(carregarDashboard, 60000);
    return () => clearInterval(intervalo);
  }, [carregarDashboard]);

  function horaFonte(fonte) {
    const valor = String(atualizacoesDashboard[fonte] || '').trim();

    if (!valor) return '';

    const hora = valor.match(/\b\d{2}:\d{2}(?::\d{2})?\b/);
    if (hora) return hora[0];

    return valor;
  }

  const resumo = useMemo(() => {
    const faturamentoEQ = dadosDashboard.equipatech || [];
    const faturamentoBB = dadosDashboard.bbbaterias || [];
    const producao = dadosDashboard.producao || [];
    const estoque = dadosDashboard.estoque || [];
    const consultaPecas = dadosDashboard.consultaPecas || [];
    const ajusteEQ = dadosDashboard.ajusteSaldo || [];
    const ajusteBB = dadosDashboard.ajusteSaldoBBBaterias || [];
    const pedidoVenda = dadosDashboard.pedidoVenda1020 || [];
    const indicadorMensalFaturamento =
      dadosDashboard.indicadorFaturamentoMensal || [];
    const indicadorMensalExpedicao =
      dadosDashboard.indicadorExpedicaoMensal || [];
    const indicadorAbastecimentoEstoque =
      dadosDashboard.indicadorAbastecimentoEstoque || [];

    const pedidosUnicos = (lista) =>
      new Set(
        lista
          .map((item) => String(item.pedido || '').trim())
          .filter((pedido) => pedido !== '' && pedido !== '0')
      ).size;

    const producaoProduzir = producao.filter(
      (item) => normalizar(item.status) === 'produzir'
    );

    const estoquePendente = estoque.filter((item) => {
      const status = normalizar(item.status);
      return !status.includes('conclu') && !status.includes('entregue');
    });

    const consultaAguardando = consultaPecas.filter(
      (item) =>
        item.aguardandoResposta === true || normalizar(item.dataResposta) === ''
    );

    const ajustePendente = [...ajusteEQ, ...ajusteBB].filter((item) => {
      const status = normalizar(item.status);
      return (
        status.includes('pendente') || status.includes('verificando saldo')
      );
    });

    const pedidoVendaComprar = pedidoVenda.filter((item) => {
      const status = normalizar(item.status);
      return (
        status.includes('comprar') &&
        !status.includes('nao comprar') &&
        !status.includes('não comprar')
      );
    });

    const mediasMensaisFaturamento = indicadorMensalFaturamento
      .filter((item) => String(item.unidadesMedia || '').trim() !== '')
      .map((item) => ({
        mes: item.mes || '',
        media: item.unidadesMedia || '',
        mediaNumero: numeroPercentual(item.unidadesMedia),
      }))
      .filter((item) => item.mediaNumero !== null);

    const mediasMensaisCds = indicadorMensalFaturamento
      .filter((item) => String(item.pedidosMediaCD || '').trim() !== '')
      .map((item) => ({
        mes: item.mes || '',
        media: item.pedidosMediaCD || '',
        mediaNumero: numeroPercentual(item.pedidosMediaCD),
      }))
      .filter((item) => item.mediaNumero !== null);

    const mediasMensaisExpedicao = indicadorMensalExpedicao
      .filter((item) => String(item.pedidosGeral || '').trim() !== '')
      .map((item) => ({
        mes: item.mes || '',
        media: item.pedidosGeral || '',
        mediaNumero: numeroPercentual(item.pedidosGeral),
      }))
      .filter((item) => item.mediaNumero !== null);

    const ultimaMediaMensalFaturamento =
      mediasMensaisFaturamento[mediasMensaisFaturamento.length - 1] || null;

    const ultimaMediaMensalCds =
      mediasMensaisCds[mediasMensaisCds.length - 1] || null;

    const ultimaMediaMensalExpedicao =
      mediasMensaisExpedicao[mediasMensaisExpedicao.length - 1] || null;

    const registrosAbastecimentoEstoque = indicadorAbastecimentoEstoque
      .map((item) => {
        const percentualDireto = numeroPercentual(item.percentual);
        const metaNumero = numeroInteiro(item.meta);
        const realizadoNumero = numeroInteiro(item.realizado);

        const percentualCalculado =
          percentualDireto !== null
            ? percentualDireto
            : metaNumero > 0
            ? (realizadoNumero / metaNumero) * 100
            : null;

        return {
          data: item.data || '',
          meta: item.meta || '',
          realizado: item.realizado || '',
          percentualNumero: percentualCalculado,
          percentual:
            percentualCalculado === null
              ? ''
              : `${percentualCalculado.toFixed(2).replace('.', ',')}%`,
          metaComparacao: 95,
        };
      })
      .filter((item) => item.percentualNumero !== null);

    const ultimoAbastecimentoEstoque =
      registrosAbastecimentoEstoque[registrosAbastecimentoEstoque.length - 1] ||
      null;

    return {
      pedidosBB: pedidosUnicos(faturamentoBB),
      pedidosEQ: pedidosUnicos(faturamentoEQ),
      produzir: pedidosUnicos(producaoProduzir),
      produzirSkus: producaoProduzir.length,
      estoquePendente: pedidosUnicos(estoquePendente),
      estoqueSkusPendentes: estoquePendente.length,
      consultaAguardando: consultaAguardando.length,
      consultaAguardando1h: consultaAguardando.filter(
        (item) => item.aguardandoMaisDe1h
      ).length,
      ajustePendente: ajustePendente.length,
      pedidoVendaComprar: pedidosUnicos(pedidoVendaComprar),
      pedidoVendaComprarSkus: pedidoVendaComprar.length,
      totalFaturamento:
        pedidosUnicos(faturamentoBB) + pedidosUnicos(faturamentoEQ),
      mediaMensalFaturamento: ultimaMediaMensalFaturamento
        ? ultimaMediaMensalFaturamento.media
        : '—',
      mediaMensalFaturamentoMes: ultimaMediaMensalFaturamento
        ? ultimaMediaMensalFaturamento.mes
        : 'Sem dados',
      mediaMensalCds: ultimaMediaMensalCds ? ultimaMediaMensalCds.media : '—',
      mediaMensalCdsMes: ultimaMediaMensalCds
        ? ultimaMediaMensalCds.mes
        : 'Sem dados',
      mediaMensalExpedicao: ultimaMediaMensalExpedicao
        ? ultimaMediaMensalExpedicao.media
        : '—',
      mediaMensalExpedicaoMes: ultimaMediaMensalExpedicao
        ? ultimaMediaMensalExpedicao.mes
        : 'Sem dados',
      abastecimentoEstoquePercentual: ultimoAbastecimentoEstoque
        ? ultimoAbastecimentoEstoque.percentual
        : '—',
      abastecimentoEstoqueData: ultimoAbastecimentoEstoque
        ? ultimoAbastecimentoEstoque.data
        : 'Sem dados',
      abastecimentoEstoqueMeta: ultimoAbastecimentoEstoque
        ? ultimoAbastecimentoEstoque.metaComparacao
        : 100,
    };
  }, [dadosDashboard]);

  function corMetaIndicador(valor, meta) {
    const numero = numeroPercentual(valor);

    if (numero === null) return '#64748B';

    if (numero >= meta) return '#16A34A';

    if (numero >= meta - 2) return '#F59E0B';

    return '#DC2626';
  }

  const cardsOperacao = [
    {
      titulo: 'Faturamento BBBaterias',
      valor: resumo.pedidosBB,
      detalhe: 'Total de pedidos da BBBaterias',
      cor: '#2563EB',
      icon: 'bb',
      tela: 'faturamento',
      horario: horaFonte('bbbaterias'),
    },
    {
      titulo: 'Faturamento Equipatech',
      valor: resumo.pedidosEQ,
      detalhe: 'Total de pedidos da Equipatech',
      cor: '#0F766E',
      icon: 'eq',
      tela: 'faturamento',
      horario: horaFonte('equipatech'),
    },
    {
      titulo: 'Total Faturamento',
      valor: resumo.totalFaturamento,
      detalhe: 'BB + EQ no faturamento',
      cor: '#475569',
      icon: 'total',
      tela: 'faturamento',
      horario: '',
    },
    {
      titulo: 'Para Produzir',
      valor: resumo.produzir,
      detalhe: `${resumo.produzirSkus} SKU(s) com status Produzir`,
      cor: '#7C3AED',
      icon: 'producao',
      tela: 'producao',
      horario: horaFonte('producao'),
    },
    {
      titulo: 'Estoque Pendente',
      valor: resumo.estoquePendente,
      detalhe: `${resumo.estoqueSkusPendentes} SKU(s) ainda pendentes`,
      cor: '#EA580C',
      icon: 'estoque',
      tela: 'estoque',
      horario: horaFonte('estoque'),
    },
    {
      titulo: 'Consulta de Peças',
      valor: resumo.consultaAguardando,
      detalhe: `${resumo.consultaAguardando1h} aguardando há mais de 1h`,
      cor: '#DC2626',
      icon: 'consulta',
      tela: 'consultaPecas',
      horario: horaFonte('consultaPecas'),
    },
    {
      titulo: 'Ajuste de Saldo',
      valor: resumo.ajustePendente,
      detalhe: 'Pendentes ou verificando saldo',
      cor: '#64748B',
      icon: 'ajuste',
      tela: 'ajusteSaldo',
      horario: horaFonte('ajusteSaldo') || horaFonte('ajusteSaldoBBBaterias'),
    },
    {
      titulo: 'Pedido de Venda',
      valor: resumo.pedidoVendaComprar,
      detalhe: `${resumo.pedidoVendaComprarSkus} SKU(s) com status Comprar`,
      cor: '#16A34A',
      icon: 'pedidoVenda',
      tela: 'pedidoVenda',
      horario: horaFonte('pedidoVenda1020'),
    },
  ];

  const cardsIndicadores = [
    {
      titulo: 'Média Mensal Faturamento',
      valor: resumo.mediaMensalFaturamento,
      detalhe: `Meta 97% · ${resumo.mediaMensalFaturamentoMes}`,
      cor: corMetaIndicador(resumo.mediaMensalFaturamento, 97),
      icon: 'indicadorMensal',
      tela: 'indicadorFaturamentoMensal',
      horario: horaFonte('indicadorFaturamentoMensal'),
    },
    {
      titulo: 'Média Mensal CDs',
      valor: resumo.mediaMensalCds,
      detalhe: `Meta 97% · ${resumo.mediaMensalCdsMes}`,
      cor: corMetaIndicador(resumo.mediaMensalCds, 97),
      icon: 'cds',
      tela: 'indicadorFaturamentoMensal',
      horario: horaFonte('indicadorFaturamentoMensal'),
    },
    {
      titulo: 'Média Mensal Expedição',
      valor: resumo.mediaMensalExpedicao,
      detalhe: `Meta 99% · ${resumo.mediaMensalExpedicaoMes}`,
      cor: corMetaIndicador(resumo.mediaMensalExpedicao, 99),
      icon: 'expedicao',
      tela: 'indicadorExpedicaoMensal',
      horario: horaFonte('indicadorExpedicaoMensal'),
    },
    {
      titulo: 'Abastecimento Estoque',
      valor: resumo.abastecimentoEstoquePercentual,
      detalhe: `Meta 95% · ${resumo.abastecimentoEstoqueData}`,
      cor: corMetaIndicador(
        resumo.abastecimentoEstoquePercentual,
        resumo.abastecimentoEstoqueMeta
      ),
      icon: 'abastecimento',
      tela: null,
      horario: horaFonte('indicadorAbastecimentoEstoque'),
    },
  ];

  function DashboardIcon({ tipo }) {
    const svgBase = {
      width: 34,
      height: 34,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      ariaHidden: true,
    };

    if (tipo === 'bb') {
      return (
        <svg {...svgBase}>
          <path d="M4 7h16" />
          <path d="M5 7l1.2 12h11.6L19 7" />
          <path d="M9 7V5a3 3 0 0 1 6 0v2" />
          <path d="M9 12h6" />
        </svg>
      );
    }

    if (tipo === 'eq') {
      return (
        <svg {...svgBase}>
          <path d="M4 6h16v12H4z" />
          <path d="M7 9h10" />
          <path d="M7 13h6" />
          <path d="M17 17l3 3" />
        </svg>
      );
    }

    if (tipo === 'total') {
      return (
        <svg {...svgBase}>
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="M8 16v-5" />
          <path d="M12 16V8" />
          <path d="M16 16v-3" />
        </svg>
      );
    }

    if (tipo === 'producao') {
      return (
        <svg {...svgBase}>
          <path d="M3 21h18" />
          <path d="M5 21V10l5 3V9l5 4V7h4v14" />
          <path d="M8 17h1" />
          <path d="M12 17h1" />
          <path d="M16 17h1" />
        </svg>
      );
    }

    if (tipo === 'estoque') {
      return (
        <svg {...svgBase}>
          <path d="M21 8l-9-5-9 5 9 5 9-5z" />
          <path d="M3 8v8l9 5 9-5V8" />
          <path d="M12 13v8" />
        </svg>
      );
    }

    if (tipo === 'consulta') {
      return (
        <svg {...svgBase}>
          <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M15 15l5 5" />
          <path d="M13 13l2 2" />
          <path d="M4 20h7" />
          <path d="M4 16h5" />
        </svg>
      );
    }

    if (tipo === 'ajuste') {
      return (
        <svg {...svgBase}>
          <path d="M12 3v18" />
          <path d="M5 7h14" />
          <path d="M6 7l-3 6h6L6 7z" />
          <path d="M18 7l-3 6h6l-3-6z" />
          <path d="M9 21h6" />
        </svg>
      );
    }

    if (tipo === 'indicadorMensal') {
      return (
        <svg {...svgBase}>
          <path d="M4 19h16" />
          <path d="M4 5v14" />
          <path d="M8 15l3-4 3 2 4-6" />
          <path d="M17 7h1v1" />
        </svg>
      );
    }

    if (tipo === 'cds') {
      return (
        <svg {...svgBase}>
          <path d="M4 20h16" />
          <path d="M6 20V8h5v12" />
          <path d="M13 20V4h5v16" />
          <path d="M8 11h1" />
          <path d="M15 7h1" />
        </svg>
      );
    }

    if (tipo === 'expedicao') {
      return (
        <svg {...svgBase}>
          <path d="M3 7h11v9H3z" />
          <path d="M14 10h4l3 3v3h-7" />
          <path d="M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          <path d="M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        </svg>
      );
    }

    if (tipo === 'abastecimento') {
      return (
        <svg {...svgBase}>
          <path d="M4 19h16" />
          <path d="M5 16l4-4 3 3 6-8" />
          <path d="M16 7h2v2" />
          <path d="M6 5h5" />
          <path d="M6 9h3" />
        </svg>
      );
    }

    return (
      <svg {...svgBase}>
        <path d="M6 3h12v18H6z" />
        <path d="M9 7h6" />
        <path d="M9 11h6" />
        <path d="M9 15h4" />
        <path d="M17 19l3 2" />
      </svg>
    );
  }

  function DashCard({ item }) {
    return (
      <button
        type="button"
        onClick={() => item.tela && setTela(item.tela)}
        style={{
          border: 'none',
          background: item.cor,
          color: '#FFFFFF',
          borderRadius: 9,
          minHeight: 116,
          padding: 0,
          overflow: 'hidden',
          boxShadow: '0 8px 18px rgba(15,23,42,0.14)',
          cursor: item.tela ? 'pointer' : 'default',
          textAlign: 'left',
          fontFamily: C.font,
        }}
      >
        <div
          style={{
            padding: '11px 16px',
            borderBottom: '1px solid rgba(0,0,0,0.10)',
            fontSize: 14,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {item.titulo}
          </span>

          {item.horario && (
            <span
              style={{
                flexShrink: 0,
                fontSize: 11,
                fontWeight: 500,
                opacity: 0.9,
                background: 'rgba(255,255,255,0.16)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 999,
                padding: '3px 8px',
              }}
            >
              {item.horario}
            </span>
          )}
        </div>

        <div
          style={{
            minHeight: 76,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            padding: '12px 16px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.18)',
              color: '#FFFFFF',
              fontSize: 25,
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            <DashboardIcon tipo={item.icon} />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontSize: 31,
                lineHeight: 1,
                fontWeight: 650,
                letterSpacing: '-0.04em',
                marginBottom: 8,
              }}
            >
              {item.valor}
            </div>

            <div
              style={{
                fontSize: 11,
                lineHeight: 1.3,
                fontWeight: 500,
                opacity: 0.95,
                background: 'rgba(0,0,0,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
                padding: '6px 10px',
                maxWidth: '100%',
              }}
            >
              {item.detalhe}
            </div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <>
      <section
        style={{
          borderRadius: 6,
          overflow: 'hidden',
          background: '#FFFFFF',
          border: `1.5px solid ${C.bdLight}`,
          boxShadow: C.shadowCard,
        }}
      >
        <div
          style={{
            background: '#6B747B',
            color: '#FFFFFF',
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            fontSize: 23,
            fontWeight: 750,
            letterSpacing: '-0.03em',
            fontFamily: C.font,
          }}
        >
          <span>DASHBOARD OPERACIONAL</span>
          <button
            type="button"
            onClick={carregarDashboard}
            disabled={carregando}
            title="Atualizar dashboard"
            style={{
              border: 'none',
              background: 'transparent',
              color: '#FFFFFF',
              cursor: carregando ? 'not-allowed' : 'pointer',
              fontSize: 25,
              lineHeight: 1,
              fontWeight: 900,
            }}
          >
            ↻
          </button>
        </div>

        <div style={{ padding: 18 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: C.txtSec,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontFamily: C.font,
              }}
            >
              Núcleo Operacional
            </div>
            <div
              style={{
                height: 1,
                flex: 1,
                marginLeft: 14,
                background: C.bdLight,
              }}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 16,
            }}
          >
            {cardsOperacao.map((card) => (
              <DashCard key={card.titulo} item={card} />
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 24,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: C.txtSec,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontFamily: C.font,
              }}
            >
              Núcleo de Indicadores
            </div>
            <div
              style={{
                height: 1,
                flex: 1,
                marginLeft: 14,
                background: C.bdLight,
              }}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 16,
            }}
          >
            {cardsIndicadores.map((card) => (
              <DashCard key={card.titulo} item={card} />
            ))}
          </div>
        </div>
      </section>

      <div
        style={{
          marginTop: 12,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          color: C.txtMuted,
          fontSize: 11,
          fontWeight: 700,
          fontFamily: C.font,
        }}
      >
        <span>
          Última atualização do dashboard: {atualizadoEm || 'carregando...'}
        </span>
        {carregando && <span>Atualizando dados...</span>}
      </div>

      {errosFontes.length > 0 && (
        <div
          style={{
            marginTop: 12,
            border: '1px solid #FED7AA',
            background: '#FFF7ED',
            color: '#9A3412',
            borderRadius: 12,
            padding: 12,
            fontSize: 12,
            fontWeight: 750,
          }}
        >
          Algumas fontes não carregaram: {errosFontes.join(' | ')}
        </div>
      )}
    </>
  );
}

export default function App() {
  const [logado, setLogado] = useState(
    () => localStorage.getItem(LOGIN_STORAGE_KEY) === 'true'
  );
  const [tela, setTela] = useState('dashboard');
  const [pedidoBuscaGlobal, setPedidoBuscaGlobal] = useState('');
  const [resultadosBuscaGlobal, setResultadosBuscaGlobal] = useState([]);
  const [buscandoGlobal, setBuscandoGlobal] = useState(false);
  const [erroBuscaGlobal, setErroBuscaGlobal] = useState('');
  const [buscaGlobalFeita, setBuscaGlobalFeita] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const estoqueAtivo = ['estoque', 'ajusteSaldo'].includes(tela);
  const producaoAtivo = ['producao', 'producaoResumo'].includes(tela);
  const indicAtivo = [
    'indicadorDiario',
    'indicadorExpedicaoDiario',
    'indicadorFaturamentoMensal',
    'indicadorExpedicaoMensal',
    'indicadorAbastecimentoEstoque',
    'indicadorAbastecimentoMensal',
  ].includes(tela);

  const buscarPedidoGlobal = useCallback(() => {
    const pedido = String(pedidoBuscaGlobal || '').trim();

    if (!pedido) {
      setBuscaGlobalFeita(true);
      setErroBuscaGlobal('Digite um número de pedido para pesquisar.');
      setResultadosBuscaGlobal([]);
      return;
    }

    setBuscaGlobalFeita(true);
    setBuscandoGlobal(true);
    setErroBuscaGlobal('');

    const fontes = [
      {
        key: 'equipatech',
        origem: 'Faturamento · Equipatech',
        telaDestino: 'faturamento',
      },
      {
        key: 'bbbaterias',
        origem: 'Faturamento · BBBaterias',
        telaDestino: 'faturamento',
      },
      { key: 'estoque', origem: 'Estoque', telaDestino: 'estoque' },
      { key: 'producao', origem: 'Produção', telaDestino: 'producao' },
    ];

    try {
      const termoPedido = normalizar(pedido);
      const encontrados = [];

      fontes.forEach((fonte) => {
        const dadosFonte = getCacheDadosPainel(fonte.key);
        const ehFaturamento =
          fonte.key === 'equipatech' || fonte.key === 'bbbaterias';
        const ehEstoque = fonte.key === 'estoque';
        const ehProducao = fonte.key === 'producao';

        dadosFonte
          .filter((item) => normalizar(item.pedido).includes(termoPedido))
          .forEach((item) => {
            encontrados.push({
              origem: fonte.origem,
              telaDestino: fonte.telaDestino,
              pedido: item.pedido || pedido,
              filial: item.filial || item.unidadeFaturamento || '-',
              produto: item.produto || '-',
              quantidade:
                item.quantidadeLiberada ||
                item.quantidade ||
                item.quantidadeTotal ||
                '-',
              status:
                item.statusSeparacao || item.statusResumo || item.status || '-',
              data:
                item.dataLiberacao ||
                item.dataHoraFinanceiro ||
                item.dataLancamento ||
                item.dataHoraEntregueEstoque ||
                '-',
              detalhe: ehFaturamento
                ? `Lista: ${item.lista || '-'} · Faturador: ${
                    item.faturador || '-'
                  }`
                : ehEstoque
                ? `Produto: ${item.produto || '-'} · Status original: ${
                    item.statusOriginal || item.status || '-'
                  }`
                : ehProducao
                ? `Transporte: ${item.transporte || '-'} · Cliente: ${
                    item.cliente || '-'
                  }`
                : '-',
            });
          });
      });

      setResultadosBuscaGlobal(encontrados);

      const totalCarregado = fontes.reduce(
        (total, fonte) => total + getCacheDadosPainel(fonte.key).length,
        0
      );

      if (totalCarregado === 0) {
        setErroBuscaGlobal(
          'As bases ainda estão carregando. Aguarde alguns segundos e pesquise novamente.'
        );
      } else {
        setErroBuscaGlobal('');
      }
    } catch (e) {
      setResultadosBuscaGlobal([]);
      setErroBuscaGlobal(e.message || 'Erro ao pesquisar pedido.');
    } finally {
      setBuscandoGlobal(false);
    }
  }, [pedidoBuscaGlobal]);

  function sair() {
    localStorage.removeItem(LOGIN_STORAGE_KEY);
    setLogado(false);
  }

  if (!logado) return <TelaLogin onLogin={() => setLogado(true)} />;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: C.bgPage,
        display: 'flex',
        fontFamily: C.font,
        color: C.txtPri,
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 256,
          background: C.sidebarBg,
          color: '#fff',
          padding: '20px 12px',
          flexShrink: 0,
          minHeight: '100vh',
          alignSelf: 'stretch',
          overflowY: 'auto',
          boxSizing: 'border-box',
          borderRight: `1px solid ${C.sidebarBd}`,
          boxShadow: '4px 0 32px rgba(15,12,41,0.25)',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '4px 4px 18px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            marginBottom: 18,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 11,
              background: C.primaryGrad,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 18,
              color: '#fff',
              flexShrink: 0,
              boxShadow: '0 4px 18px rgba(102,126,234,0.45)',
            }}
          >
            B
          </div>
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: '#fff',
              }}
            >
              BBDI
            </div>
            <div
              style={{
                fontSize: 10,
                color: 'rgba(255,255,255,0.38)',
                fontWeight: 600,
                marginTop: 1,
              }}
            >
              Painel Operacional
            </div>
          </div>
        </div>
        <button
          onClick={sair}
          style={{
            width: '100%',
            border: '1px solid rgba(255,255,255,0.10)',
            background: 'rgba(255,255,255,0.05)',
            color: 'rgba(255,255,255,0.50)',
            borderRadius: C.radius.md,
            padding: '8px 10px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: 11,
            fontFamily: C.font,
            marginBottom: 14,
            letterSpacing: '-0.01em',
          }}
        >
          Sair da conta
        </button>
        <div
          style={{
            fontSize: 9,
            color: 'rgba(255,255,255,0.25)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: 8,
            padding: '0 4px',
          }}
        >
          Módulos
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <MenuBtn
            icon="D"
            ativo={tela === 'dashboard'}
            onClick={() => setTela('dashboard')}
          >
            Dashboard
          </MenuBtn>
          <MenuBtn
            icon="OP"
            ativo={false}
            onClick={() =>
              window.open(
                LINK_DASHBOARD_OPERACIONAL_LOGISTICA,
                '_blank',
                'noopener,noreferrer'
              )
            }
          >
            Operação Logística
          </MenuBtn>
          <MenuBtn
            icon="F"
            ativo={tela === 'faturamento'}
            onClick={() => setTela('faturamento')}
          >
            Faturamento
          </MenuBtn>
          <div
            style={{
              borderRadius: C.radius.md,
              padding: estoqueAtivo ? 5 : 0,
              background: estoqueAtivo
                ? 'rgba(255,255,255,0.04)'
                : 'transparent',
              border: estoqueAtivo
                ? '1px solid rgba(255,255,255,0.07)'
                : '1px solid transparent',
              marginTop: 2,
            }}
          >
            <MenuGrupBtn
              icon="E"
              ativo={estoqueAtivo}
              onClick={() => setTela('estoque')}
            >
              Estoque
            </MenuGrupBtn>
            {estoqueAtivo && (
              <div style={{ marginTop: 4, paddingTop: 2 }}>
                <SubMenuBtn
                  ativo={tela === 'estoque'}
                  onClick={() => setTela('estoque')}
                >
                  Painel Estoque
                </SubMenuBtn>
                <SubMenuBtn
                  ativo={tela === 'ajusteSaldo'}
                  onClick={() => setTela('ajusteSaldo')}
                >
                  Ajuste de Saldo
                </SubMenuBtn>
              </div>
            )}
          </div>
          <MenuBtn
            icon="C"
            ativo={tela === 'consultaPecas'}
            onClick={() => setTela('consultaPecas')}
          >
            Consulta de Peças
          </MenuBtn>
          <div
            style={{
              borderRadius: C.radius.md,
              padding: producaoAtivo ? 5 : 0,
              background: producaoAtivo
                ? 'rgba(255,255,255,0.04)'
                : 'transparent',
              border: producaoAtivo
                ? '1px solid rgba(255,255,255,0.07)'
                : '1px solid transparent',
              marginTop: 2,
            }}
          >
            <MenuGrupBtn
              icon="P"
              ativo={producaoAtivo}
              onClick={() => setTela('producao')}
            >
              Produção
            </MenuGrupBtn>
            {producaoAtivo && (
              <div style={{ marginTop: 4, paddingTop: 2 }}>
                <SubMenuBtn
                  ativo={tela === 'producao'}
                  onClick={() => setTela('producao')}
                >
                  Painel Produção
                </SubMenuBtn>
                <SubMenuBtn
                  ativo={tela === 'producaoResumo'}
                  onClick={() => setTela('producaoResumo')}
                >
                  Resumo por Pedido
                </SubMenuBtn>
              </div>
            )}
          </div>
          <MenuBtn
            icon="PV"
            ativo={tela === 'pedidoVenda'}
            onClick={() => setTela('pedidoVenda')}
          >
            Pedido de Venda
          </MenuBtn>
          <div
            style={{
              borderRadius: C.radius.md,
              padding: indicAtivo ? 5 : 0,
              background: indicAtivo ? 'rgba(255,255,255,0.04)' : 'transparent',
              border: indicAtivo
                ? '1px solid rgba(255,255,255,0.07)'
                : '1px solid transparent',
              marginTop: 2,
            }}
          >
            <MenuGrupBtn
              icon="I"
              ativo={indicAtivo}
              onClick={() => setTela('indicadorDiario')}
            >
              Indicadores
            </MenuGrupBtn>
            {indicAtivo && (
              <div style={{ marginTop: 4, paddingTop: 2 }}>
                <SubMenuBtn
                  ativo={tela === 'indicadorDiario'}
                  onClick={() => setTela('indicadorDiario')}
                >
                  Faturamento Diário
                </SubMenuBtn>
                <SubMenuBtn
                  ativo={tela === 'indicadorExpedicaoDiario'}
                  onClick={() => setTela('indicadorExpedicaoDiario')}
                >
                  Expedição Diário
                </SubMenuBtn>
                <SubMenuBtn
                  ativo={tela === 'indicadorFaturamentoMensal'}
                  onClick={() => setTela('indicadorFaturamentoMensal')}
                >
                  Faturamento Mensal
                </SubMenuBtn>
                <SubMenuBtn
                  ativo={tela === 'indicadorExpedicaoMensal'}
                  onClick={() => setTela('indicadorExpedicaoMensal')}
                >
                  Expedição Mensal
                </SubMenuBtn>
                <SubMenuBtn
                  ativo={tela === 'indicadorAbastecimentoEstoque'}
                  onClick={() => setTela('indicadorAbastecimentoEstoque')}
                >
                  Abastecimento Estoque
                </SubMenuBtn>
                <SubMenuBtn
                  ativo={tela === 'indicadorAbastecimentoMensal'}
                  onClick={() => setTela('indicadorAbastecimentoMensal')}
                >
                  Abastecimento Mensal
                </SubMenuBtn>
              </div>
            )}
          </div>
        </nav>
        <div
          style={{
            marginTop: 32,
            fontSize: 9,
            color: 'rgba(255,255,255,0.15)',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textAlign: 'center',
            fontFamily: C.font,
          }}
        >
          BBDI © {new Date().getFullYear()}
        </div>
      </aside>
      {/* Main */}
      <main
        style={{
          flex: 1,
          padding: '28px 30px',
          overflowX: 'hidden',
          minWidth: 0,
          boxSizing: 'border-box',
        }}
      >
        <section
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            background: 'rgba(248,250,252,0.92)',
            backdropFilter: 'blur(12px)',
            border: `1.5px solid ${C.bdLight}`,
            borderRadius: C.radius.lg,
            padding: 10,
            marginBottom: 18,
            boxShadow: '0 12px 32px rgba(15,23,42,0.08)',
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              buscarPedidoGlobal();
            }}
            style={{ display: 'flex', gap: 8, alignItems: 'center' }}
          >
            <input
              value={pedidoBuscaGlobal}
              onChange={(e) => setPedidoBuscaGlobal(e.target.value)}
              placeholder="Consulta: Pedido"
              style={{
                height: 38,
                width: 260,
                border: `1.5px solid ${C.bdMid}`,
                borderRadius: C.radius.md,
                padding: '0 12px',
                fontSize: 13,
                fontWeight: 700,
                color: C.txtPri,
                outline: 'none',
                fontFamily: C.font,
                background: '#FFFFFF',
              }}
            />
            <button
              type="submit"
              disabled={buscandoGlobal}
              style={{
                height: 38,
                border: 'none',
                borderRadius: C.radius.md,
                padding: '0 14px',
                background: buscandoGlobal ? C.bgMuted : C.primaryGrad,
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 900,
                cursor: buscandoGlobal ? 'not-allowed' : 'pointer',
                fontFamily: C.font,
                minWidth: 92,
              }}
            >
              {buscandoGlobal ? 'Buscando...' : 'Buscar'}
            </button>
            {buscaGlobalFeita && (
              <button
                type="button"
                onClick={() => {
                  setPedidoBuscaGlobal('');
                  setResultadosBuscaGlobal([]);
                  setErroBuscaGlobal('');
                  setBuscaGlobalFeita(false);
                }}
                style={{
                  height: 38,
                  border: `1.5px solid ${C.bdMid}`,
                  borderRadius: C.radius.md,
                  padding: '0 12px',
                  background: '#FFFFFF',
                  color: C.txtSec,
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: 'pointer',
                  fontFamily: C.font,
                }}
              >
                Limpar
              </button>
            )}
            <span
              style={{
                marginLeft: 'auto',
                fontSize: 11,
                color: C.txtMuted,
                fontWeight: 800,
                whiteSpace: 'nowrap',
              }}
            >
              Pesquisa nos dados já carregados: Faturamento, Estoque e Produção
            </span>
          </form>

          {buscaGlobalFeita && (
            <div
              style={{
                marginTop: 10,
                background: '#FFFFFF',
                border: `1.5px solid ${C.bdLight}`,
                borderRadius: C.radius.md,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: `1px solid ${C.bdLight}`,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 900, color: C.txtPri }}>
                  Resultado da busca: {pedidoBuscaGlobal || '—'}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    color: C.txtSec,
                    background: C.bgMuted,
                    borderRadius: 999,
                    padding: '5px 10px',
                  }}
                >
                  {resultadosBuscaGlobal.length} ocorrência(s)
                </div>
              </div>

              {erroBuscaGlobal && (
                <div
                  style={{
                    padding: '9px 12px',
                    color: C.red,
                    background: C.redBg,
                    fontSize: 11,
                    fontWeight: 800,
                    borderBottom: `1px solid ${C.redBd}`,
                  }}
                >
                  {erroBuscaGlobal}
                </div>
              )}

              {buscandoGlobal ? (
                <div
                  style={{
                    padding: 18,
                    color: C.txtMuted,
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  Pesquisando nos dados já carregados...
                </div>
              ) : resultadosBuscaGlobal.length === 0 ? (
                <div
                  style={{
                    padding: 18,
                    color: C.txtMuted,
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  Nenhum registro encontrado para esse pedido.
                </div>
              ) : (
                <div
                  style={{
                    overflowX: 'auto',
                    maxHeight: 280,
                    overflowY: 'auto',
                  }}
                >
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      fontSize: 12,
                    }}
                  >
                    <thead>
                      <tr style={{ background: '#F3F6FC' }}>
                        {[
                          'Origem',
                          'Pedido',
                          'Filial',
                          'Produto',
                          'Qtd',
                          'Status',
                          'Data',
                          'Detalhe',
                          '',
                        ].map((h) => (
                          <th
                            key={h}
                            style={{
                              padding: '9px 10px',
                              textAlign: 'left',
                              fontSize: 10,
                              color: C.txtSec,
                              textTransform: 'uppercase',
                              letterSpacing: '0.04em',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {resultadosBuscaGlobal.map((item, index) => (
                        <tr
                          key={`${item.origem}-${item.pedido}-${index}`}
                          style={{ borderTop: `1px solid ${C.bdLight}` }}
                        >
                          <td
                            style={{
                              padding: '9px 10px',
                              fontWeight: 900,
                              color: C.txtPri,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.origem}
                          </td>
                          <td
                            style={{
                              padding: '9px 10px',
                              fontWeight: 900,
                              color: C.primary,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.pedido}
                          </td>
                          <td
                            style={{
                              padding: '9px 10px',
                              color: C.txtSec,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.filial}
                          </td>
                          <td
                            style={{
                              padding: '9px 10px',
                              color: C.txtSec,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.produto}
                          </td>
                          <td
                            style={{
                              padding: '9px 10px',
                              color: C.txtSec,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.quantidade}
                          </td>
                          <td
                            style={{
                              padding: '9px 10px',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <Badge
                              texto={item.status}
                              tipo={tipoStatus(item.status)}
                            />
                          </td>
                          <td
                            style={{
                              padding: '9px 10px',
                              color: C.txtSec,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.data}
                          </td>
                          <td
                            style={{
                              padding: '9px 10px',
                              color: C.txtSec,
                              minWidth: 220,
                            }}
                          >
                            {item.detalhe}
                          </td>
                          <td
                            style={{ padding: '9px 10px', textAlign: 'right' }}
                          >
                            <button
                              type="button"
                              onClick={() => setTela(item.telaDestino)}
                              style={{
                                border: `1.5px solid ${C.bdMid}`,
                                background: '#FFFFFF',
                                borderRadius: 9,
                                padding: '6px 10px',
                                cursor: 'pointer',
                                color: C.txtPri,
                                fontWeight: 800,
                                fontSize: 11,
                                fontFamily: C.font,
                              }}
                            >
                              Abrir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </section>
        <div style={{ display: tela === 'dashboard' ? 'block' : 'none' }}>
          <TelaDashboard setTela={setTela} />
        </div>
        <div style={{ display: tela === 'faturamento' ? 'block' : 'none' }}>
          <TelaFaturamento />
        </div>
        <div style={{ display: tela === 'estoque' ? 'block' : 'none' }}>
          <TelaEstoque />
        </div>
        <div style={{ display: tela === 'ajusteSaldo' ? 'block' : 'none' }}>
          <TelaAjusteSaldo />
        </div>

        <div style={{ display: tela === 'consultaPecas' ? 'block' : 'none' }}>
          <TelaConsultaPecas />
        </div>
        <div style={{ display: tela === 'producao' ? 'block' : 'none' }}>
          <TelaProducao modo="painel" />
        </div>
        <div style={{ display: tela === 'producaoResumo' ? 'block' : 'none' }}>
          <TelaProducao modo="resumo" />
        </div>
        <div style={{ display: tela === 'pedidoVenda' ? 'block' : 'none' }}>
          <TelaPedidoVenda />
        </div>
        <div style={{ display: tela === 'indicadorDiario' ? 'block' : 'none' }}>
          <TelaIndicadorDiario />
        </div>
        <div
          style={{
            display: tela === 'indicadorExpedicaoDiario' ? 'block' : 'none',
          }}
        >
          <TelaIndicadorExpedicaoDiario />
        </div>
        <div
          style={{
            display: tela === 'indicadorFaturamentoMensal' ? 'block' : 'none',
          }}
        >
          <TelaIndicadorMensal tipo="faturamento" />
        </div>
        <div
          style={{
            display: tela === 'indicadorExpedicaoMensal' ? 'block' : 'none',
          }}
        >
          <TelaIndicadorMensal tipo="expedicao" />
        </div>
        <div
          style={{
            display:
              tela === 'indicadorAbastecimentoEstoque' ? 'block' : 'none',
          }}
        >
          <TelaIndicadorAbastecimentoEstoque />
        </div>
        <div
          style={{
            display: tela === 'indicadorAbastecimentoMensal' ? 'block' : 'none',
          }}
        >
          <TelaIndicadorAbastecimentoMensal />
        </div>
      </main>
    </div>
  );
}
