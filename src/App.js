// VERSAO: CONSULTA_TRANSFORMACAO_VISUAL_CORRIGIDO_2026_09_28 + MODULO_POSTAGENS_2026_10_14 + MODULO_VIA_LEITOR_2026_10_14
// Cole este arquivo em src/App.js
// Design "Aurora" — moderno com gradientes suaves, fonte Nunito, visual completamente renovado.
// Toda lógica, APIs e campos preservados sem alteração.

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

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

// Supabase da Central de Expedição — somente LEITURA (funções/views criadas por fase_c_14_view_postagens_painel.sql).
// A chave abaixo é a chave PÚBLICA (anon). Nunca coloque aqui a chave service_role / secret.
const SUPABASE_URL = 'https://njvcostescybgwbnipec.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qdmNvc3Rlc2N5Ymd3Ym5pcGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxNzkxNzMsImV4cCI6MjEwNTc1NTE3M30.ZR9V23Fs-MzYznZCIRrTf2uXwc5oHiltb8hpmgJHADI';

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
const FILTROS_ANALISE_TRANSFORMACOES_INICIAIS = {
  produto: '',
  saldoEquipatech: '',
  semanasEstoque: '',
  produzirSemanas: '',
  transformarQuantidades: '',
  opcao1: '',
  saldo1: '',
  opcao2: '',
  saldo2: '',
  opcao3: '',
  saldo3: '',
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

function iniciarAtualizacaoSincronizada(callback) {
  let ativo = true;
  let timerId = null;
  let executando = false;

  const executar = async () => {
    if (!ativo || executando) return;

    executando = true;

    try {
      await callback();
    } catch (erro) {
      console.error('Falha na atualização sincronizada:', erro);
    } finally {
      executando = false;
    }
  };

  const agendarProximoMinuto = () => {
    if (!ativo) return;

    const agoraMs = Date.now();
    const proximoMinutoMs = (Math.floor(agoraMs / 60000) + 1) * 60000;

    const esperaMs = Math.max(0, proximoMinutoMs - agoraMs + 100);

    timerId = setTimeout(async () => {
      if (!ativo) return;

      await executar();
      agendarProximoMinuto();
    }, esperaMs);
  };

  // Carrega imediatamente ao abrir a tela.
  executar();

  // Depois sincroniza pelo relógio cheio:
  // 13:02:00, 13:03:00, 13:04:00...
  agendarProximoMinuto();

  return () => {
    ativo = false;

    if (timerId) {
      clearTimeout(timerId);
    }
  };
}

const BASE_TRANSFORMACOES_STORAGE_KEY = 'bbdi_base_transformacoes_v1';

function normalizarCodigoTransformacao(valor) {
  return String(valor || '')
    .trim()
    .toUpperCase();
}

function regraTransformacaoValida(valor) {
  const texto = String(valor || '').trim();
  return texto !== '' && texto !== '-' && texto !== '--';
}

function lerBaseTransformacoesLocal() {
  if (typeof window === 'undefined') {
    return { dados: [], atualizadoEm: '' };
  }

  try {
    const salvo = JSON.parse(
      window.localStorage.getItem(BASE_TRANSFORMACOES_STORAGE_KEY) || 'null'
    );

    if (!salvo || !Array.isArray(salvo.dados)) {
      return { dados: [], atualizadoEm: '' };
    }

    return {
      dados: salvo.dados,
      atualizadoEm: salvo.atualizadoEm || '',
    };
  } catch (e) {
    return { dados: [], atualizadoEm: '' };
  }
}

function salvarBaseTransformacoesLocal(dados, atualizadoEm) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(
      BASE_TRANSFORMACOES_STORAGE_KEY,
      JSON.stringify({
        dados: Array.isArray(dados) ? dados : [],
        atualizadoEm: atualizadoEm || '',
      })
    );
  } catch (e) {
    // Cache local opcional.
  }
}

function criarIndiceBaseTransformacoes(lista) {
  const indice = new Map();

  (Array.isArray(lista) ? lista : []).forEach((item) => {
    const chave = normalizarCodigoTransformacao(item.produto);

    if (chave && !indice.has(chave)) {
      indice.set(chave, item);
    }
  });

  return indice;
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
  sidebarBg: 'var(--side-bg)',
  sidebarBd: 'var(--side-bd)',

  // Cores de destaque (planas — a paleta muda com o tema claro/escuro)
  grad1: 'var(--accent)',
  grad2: 'var(--green)',
  grad3: 'var(--red)',
  grad4: 'var(--blue)',
  grad5: 'var(--amber)',
  grad6: 'var(--purple)',

  // Primary accent
  primary: 'var(--accent-tx)',
  primaryDark: 'var(--accent-2)',
  primaryLight: 'var(--accent-soft)',
  primaryGrad: 'var(--accent)',

  // Backgrounds
  bgPage: 'var(--page)',
  bgCard: 'var(--surf)',
  bgCardGrad: 'var(--surf)',
  bgStripe: 'var(--surf-alt)',
  bgMuted: 'var(--surf-muted)',

  // Text
  txtPri: 'var(--txt)',
  txtSec: 'var(--txt-2)',
  txtMuted: 'var(--txt-muted)',

  // Borders
  bdLight: 'var(--bd)',
  bdMid: 'var(--bd-strong)',

  // Status colors
  green: 'var(--green)',
  greenBg: 'var(--green-bg)',
  greenBd: 'var(--green-bd)',
  red: 'var(--red)',
  redBg: 'var(--red-bg)',
  redBd: 'var(--red-bd)',
  amber: 'var(--amber)',
  amberBg: 'var(--amber-bg)',
  amberBd: 'var(--amber-bd)',
  blue: 'var(--blue)',
  blueBg: 'var(--blue-bg)',
  blueBd: 'var(--blue-bd)',
  orange: 'var(--orange)',
  orangeBg: 'var(--orange-bg)',
  orangeBd: 'var(--orange-bd)',

  // Shadows
  shadowSm: 'var(--sh-sm)',
  shadowMd: 'var(--sh-md)',
  shadowLg: 'var(--sh-lg)',
  shadowXl: 'var(--sh-xl)',
  shadowCard: 'var(--sh-card)',

  radius: { sm: 6, md: 8, lg: 10, xl: 12, pill: 999 },
  font: "'Inter', 'Segoe UI', system-ui, sans-serif",
  fontMono: "'JetBrains Mono', ui-monospace, monospace",
};

// ─── Tema claro / escuro ───────────────────────────────────────────────────────
// Todas as cores do painel saem destas variáveis. O tema fica em <html data-tema="claro|escuro">.

const TEMA_STORAGE_KEY = 'bbdi_tema';

const TEMA_CSS = `
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

function temaInicial() {
  try {
    const salvo = localStorage.getItem(TEMA_STORAGE_KEY);
    if (salvo === 'claro' || salvo === 'escuro') return salvo;
  } catch (e) {
    // sem armazenamento: segue a preferência do sistema
  }
  return typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'escuro'
    : 'claro';
}

function useTema() {
  const [tema, setTema] = useState(temaInicial);
  useLayoutEffect(() => {
    let el = document.getElementById('bbdi-tema-css');
    if (!el) {
      el = document.createElement('style');
      el.id = 'bbdi-tema-css';
      document.head.appendChild(el);
    }
    el.textContent = TEMA_CSS;
  }, []);
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-tema', tema);
    try {
      localStorage.setItem(TEMA_STORAGE_KEY, tema);
    } catch (e) {
      // sem armazenamento
    }
  }, [tema]);
  const alternar = useCallback(
    () => setTema((t) => (t === 'escuro' ? 'claro' : 'escuro')),
    []
  );
  return [tema, alternar];
}

function BotaoTema({ tema, alternar, compacto, sobreEscuro }) {
  const escuro = tema === 'escuro';
  return (
    <button
      type="button"
      onClick={alternar}
      title={escuro ? 'Mudar para o modo claro' : 'Mudar para o modo escuro'}
      aria-label={
        escuro ? 'Mudar para o modo claro' : 'Mudar para o modo escuro'
      }
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        height: 36,
        padding: compacto ? '0 10px' : '0 12px',
        borderRadius: C.radius.md,
        border: sobreEscuro
          ? '1px solid rgba(255,255,255,0.16)'
          : `1px solid ${C.bdMid}`,
        background: sobreEscuro ? 'rgba(255,255,255,0.08)' : C.bgCard,
        color: sobreEscuro ? '#e8edf7' : C.txtSec,
        cursor: 'pointer',
        fontFamily: C.font,
        fontSize: 12,
        fontWeight: 600,
        boxShadow: sobreEscuro ? 'none' : C.shadowSm,
      }}
    >
      {escuro ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
      {!compacto && <span>{escuro ? 'Modo claro' : 'Modo escuro'}</span>}
    </button>
  );
}

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
        border: `1px solid ${cor.bd}`,
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
        boxShadow: ativo
          ? `0 8px 28px rgba(var(--accent-rgb),0.25)`
          : C.shadowCard,
        border: ativo ? `1px solid ${C.primary}` : `1px solid ${C.bdLight}`,
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
          fontWeight: 800,
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
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: sortOrder
            ? 'rgba(var(--accent-rgb),0.12)'
            : 'transparent',
          border: sortOrder
            ? '1px solid rgba(var(--accent-rgb),0.4)'
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
          background: ativo ? 'rgba(var(--accent-rgb),0.10)' : 'transparent',
          border: ativo
            ? '1px solid rgba(var(--accent-rgb),0.4)'
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
      className="bbdi-nav"
      onClick={onClick}
      style={{
        width: '100%',
        borderRadius: C.radius.md,
        padding: '9px 12px',
        cursor: 'pointer',
        textAlign: 'left',
        fontWeight: 600,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: C.font,
        letterSpacing: '-0.01em',
        transition: 'all 150ms ease',
        color: ativo ? '#fff' : 'rgba(226,232,240,0.74)',
        background: ativo ? 'rgba(255,255,255,0.09)' : undefined,
        border: '1px solid transparent',
        boxShadow: ativo ? 'inset 3px 0 0 #5b86ff' : 'none',
      }}
    >
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: 8,
          flexShrink: 0,
          background: ativo ? '#3f6df0' : 'rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 800,
          color: ativo ? '#fff' : 'rgba(226,232,240,0.6)',
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
      className="bbdi-nav"
      onClick={onClick}
      style={{
        width: '100%',
        borderRadius: C.radius.md,
        padding: '9px 12px',
        cursor: 'pointer',
        textAlign: 'left',
        fontWeight: 600,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: C.font,
        letterSpacing: '-0.01em',
        transition: 'all 150ms ease',
        color: ativo ? '#fff' : 'rgba(226,232,240,0.74)',
        background: ativo ? 'rgba(255,255,255,0.09)' : undefined,
        border: '1px solid transparent',
        boxShadow: ativo ? 'inset 3px 0 0 #5b86ff' : 'none',
      }}
    >
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: 8,
          flexShrink: 0,
          background: ativo ? '#3f6df0' : 'rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 800,
          color: ativo ? '#fff' : 'rgba(226,232,240,0.6)',
        }}
      >
        {icon}
      </span>
      <span style={{ flex: 1 }}>{children}</span>
      <span
        style={{
          fontSize: 13,
          color: ativo ? 'rgba(255,255,255,0.8)' : 'rgba(226,232,240,0.4)',
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
      className="bbdi-nav"
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
        color: ativo ? '#fff' : 'rgba(226,232,240,0.6)',
        background: ativo ? 'rgba(255,255,255,0.09)' : undefined,
        borderLeft: ativo
          ? '3px solid #5b86ff'
          : '3px solid rgba(255,255,255,0.08)',
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
        border: p ? 'none' : `1px solid ${C.bdMid}`,
        boxShadow: p ? '0 4px 14px rgba(var(--accent-rgb),0.35)' : C.shadowSm,
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
        border: `1px solid ${C.bdLight}`,
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
        border: `1px solid ${C.bdLight}`,
        borderRadius: C.radius.xl,
        overflow: 'hidden',
        boxShadow: C.shadowCard,
      }}
    >
      <div
        style={{
          padding: '14px 18px',
          borderBottom: `1px solid ${C.bdLight}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: C.bgStripe,
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
                background: C.bgMuted,
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
                    fontWeight: 800,
                    letterSpacing: '0.07em',
                    borderBottom: `1px solid ${C.bdLight}`,
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
                  background: idx % 2 === 0 ? C.bgCard : C.bgStripe,
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
        border: `1px solid ${C.bdLight}`,
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
            fontSize: 22,
            color: C.txtPri,
            fontWeight: 700,
            letterSpacing: '-0.03em',
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
  border: `1px solid ${C.bdMid}`,
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
  border: `1px solid ${C.redBd}`,
  fontSize: 12,
  fontFamily: C.font,
};
const inputEl = {
  border: `1px solid ${C.bdMid}`,
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
  border: `1px solid ${C.bdMid}`,
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

function TelaLogin({ onLogin, tema, alternarTema }) {
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
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <BotaoTema tema={tema} alternar={alternarTema} sobreEscuro />
      </div>
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
            'radial-gradient(circle, rgba(var(--accent-rgb),0.18) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <form
        onSubmit={entrar}
        style={{
          width: '100%',
          maxWidth: 400,
          background: C.bgCard,
          borderRadius: 16,
          padding: 36,
          boxShadow: C.shadowXl,
          border: `1px solid ${C.bdLight}`,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: C.primaryGrad,
            borderRadius: '16px 16px 0 0',
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
              background: '#3f6df0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 22,
              color: '#fff',
              flexShrink: 0,
              boxShadow: '0 4px 14px rgba(63,109,240,0.4)',
            }}
          >
            B
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 800,
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
            border: `1px solid ${C.bdMid}`,
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
            border: `1px solid ${C.bdMid}`,
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
              border: `1px solid ${C.redBd}`,
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
            boxShadow: C.shadowMd,
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
    return iniciarAtualizacaoSincronizada(carregarDados);
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
    return iniciarAtualizacaoSincronizada(load);
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
      return iniciarAtualizacaoSincronizada(load);
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
    return iniciarAtualizacaoSincronizada(load);
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
    return iniciarAtualizacaoSincronizada(load);
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
    return iniciarAtualizacaoSincronizada(load);
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

function TelaAnaliseTransformacoes() {
  const [dados, setDados] = useState([]);
  const [kpis, setKpis] = useState({
    totalModelos: 0,
    modelosParaTransformar: 0,
    modelosComFalta: 0,
    suficientes: 0,
  });
  const [busca, setBusca] = useState('');
  const [fc, setFc] = useState(FILTROS_ANALISE_TRANSFORMACOES_INICIAIS);
  const [loading, setLoading] = useState(false);
  const [salvandoSemanas, setSalvandoSemanas] = useState(false);
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [atualizado, setAtualizado] = useState('');
  const [semanasGlobal, setSemanasGlobal] = useState('2');

  const load = useCallback(async () => {
    setLoading(true);
    setErro('');

    try {
      const resposta = await fetch(
        `${API_BASE}?action=dados&fonte=analiseTransformacoes`,
        { cache: 'no-store' }
      );
      const json = await resposta.json();

      if (!json.ok) {
        throw new Error(
          json.erro || 'Erro ao carregar análise de transformações'
        );
      }

      const registros = json.dados || [];

      setDados(registros);
      setKpis(
        json.kpis || {
          totalModelos: registros.length,
          modelosParaTransformar: 0,
          modelosComFalta: 0,
          suficientes: 0,
        }
      );
      setCacheDadosPainel('analiseTransformacoes', registros);
      setAtualizado(json.atualizadoEm || '');
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    return iniciarAtualizacaoSincronizada(load);
  }, [load]);

  const dadosFiltrados = useMemo(
    () =>
      filtrarDados(dados, busca, fc, [
        'produto',
        'saldoEquipatech',
        'semanasEstoque',
        'produzirSemanas',
        'transformarQuantidades',
        'opcao1',
        'saldo1',
        'opcao2',
        'saldo2',
        'opcao3',
        'saldo3',
      ]),
    [dados, busca, fc]
  );

  const aplicarSemanasEmTodos = useCallback(async () => {
    const semanas = Number(semanasGlobal);

    if (![1, 2, 3, 4].includes(semanas)) {
      setErro('Selecione 1, 2, 3 ou 4 semanas.');
      return;
    }

    const texto = semanas === 1 ? '1 SEMANA' : `${semanas} SEMANAS`;

    const confirmou = window.confirm(
      `Aplicar "${texto}" na coluna PRODUZIR X SEMANAS de todos os produtos?`
    );

    if (!confirmou) return;

    setSalvandoSemanas(true);
    setErro('');
    setMensagem('');

    try {
      const resposta = await fetch(
        `${API_BASE}?action=atualizarSemanasTransformacao&semanas=${semanas}&_=${Date.now()}`,
        { cache: 'no-store' }
      );
      const json = await resposta.json();

      if (!json.ok) {
        throw new Error(json.erro || 'Não foi possível atualizar as semanas.');
      }

      setMensagem(
        `${json.valorAplicado} aplicado em ${
          json.totalAtualizados || 0
        } modelo(s).`
      );

      await load();
    } catch (e) {
      setErro(e.message);
    } finally {
      setSalvandoSemanas(false);
    }
  }, [semanasGlobal, load]);

  const tipoTransformacao = (item) => {
    if (item.precisaTransformar && item.temOpcaoTransformacao)
      return 'vermelho';
    if (item.precisaTransformar) return 'laranja';
    if (normalizar(item.transformarQuantidades).includes('suficiente'))
      return 'verde';
    return 'cinza';
  };

  const colunas = [
    { campo: 'produto', titulo: 'Produto', bold: true, width: 125 },
    { campo: 'saldoEquipatech', titulo: 'Saldo Total', width: 90 },
    {
      campo: 'semanasEstoque',
      titulo: 'Semanas em Estoque',
      width: 145,
      wrap: true,
    },
    { campo: 'produzirSemanas', titulo: 'Produzir X Semanas', width: 125 },
    {
      campo: 'transformarQuantidades',
      titulo: 'Transformar X Quantidades',
      width: 210,
      wrap: true,
      render: (item) => (
        <Badge
          texto={item.transformarQuantidades || '—'}
          tipo={tipoTransformacao(item)}
        />
      ),
    },
    { campo: 'opcao1', titulo: 'Opção 1', width: 125 },
    { campo: 'saldo1', titulo: 'Saldo', width: 70 },
    { campo: 'opcao2', titulo: 'Opção 2', width: 125 },
    { campo: 'saldo2', titulo: 'Saldo', width: 70 },
    { campo: 'opcao3', titulo: 'Opção 3', width: 125 },
    { campo: 'saldo3', titulo: 'Saldo', width: 70 },
  ];

  return (
    <>
      <PageHeader
        titulo="Análise de Transformação"
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

      {mensagem && (
        <div
          style={{
            background: C.greenBg,
            color: C.green,
            padding: 12,
            borderRadius: C.radius.md,
            marginBottom: 16,
            fontWeight: 700,
            border: `1px solid ${C.greenBd}`,
            fontSize: 12,
            fontFamily: C.font,
          }}
        >
          {mensagem}
        </div>
      )}

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
          gap: 12,
          marginBottom: 18,
        }}
      >
        <Kpi titulo="Total de Modelos" valor={kpis.totalModelos || 0} />
        <Kpi
          titulo="Para Transformar"
          valor={kpis.modelosParaTransformar || 0}
        />
        <Kpi titulo="Com Falta" valor={kpis.modelosComFalta || 0} />
        <Kpi titulo="Suficientes" valor={kpis.suficientes || 0} />
      </section>

      <section
        style={{
          background: C.bgCard,
          border: `1px solid ${C.bdLight}`,
          borderRadius: C.radius.lg,
          padding: 16,
          marginBottom: 16,
          boxShadow: C.shadowCard,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ marginRight: 8 }}>
          <div
            style={{
              fontWeight: 800,
              color: C.txtPri,
              fontSize: 13,
              fontFamily: C.font,
            }}
          >
            Produzir X semanas
          </div>
          <div
            style={{
              color: C.txtMuted,
              fontSize: 10,
              marginTop: 2,
              fontFamily: C.font,
            }}
          >
            Escolha uma opção e aplique na coluna D de todos os produtos.
          </div>
        </div>

        <select
          value={semanasGlobal}
          onChange={(e) => setSemanasGlobal(e.target.value)}
          style={{ ...selectEl, minWidth: 135 }}
          disabled={salvandoSemanas}
        >
          <option value="1">1 SEMANA</option>
          <option value="2">2 SEMANAS</option>
          <option value="3">3 SEMANAS</option>
          <option value="4">4 SEMANAS</option>
        </select>

        <button
          type="button"
          onClick={aplicarSemanasEmTodos}
          disabled={salvandoSemanas}
          style={{
            height: 36,
            border: 'none',
            borderRadius: C.radius.md,
            padding: '0 16px',
            background: salvandoSemanas ? C.bgMuted : C.primaryGrad,
            color: salvandoSemanas ? C.txtMuted : '#fff',
            fontWeight: 800,
            fontSize: 12,
            cursor: salvandoSemanas ? 'not-allowed' : 'pointer',
            fontFamily: C.font,
            boxShadow: salvandoSemanas
              ? 'none'
              : '0 4px 14px rgba(var(--accent-rgb),0.35)',
          }}
        >
          {salvandoSemanas ? 'Aplicando…' : 'Aplicar para todos'}
        </button>
      </section>

      <FiltroTopo
        busca={busca}
        setBusca={setBusca}
        limparFiltros={() => {
          setBusca('');
          setFc(FILTROS_ANALISE_TRANSFORMACOES_INICIAIS);
        }}
        placeholder="Busca por produto, opção ou status…"
      />

      <TabelaPadrao
        titulo="Análise de Transformações"
        dadosBase={dados}
        dadosFiltrados={dadosFiltrados}
        colunas={colunas}
        filtros={fc}
        onFiltro={(c, v) => setFc((p) => ({ ...p, [c]: v }))}
        carregando={loading}
        mensagemVazia="Nenhum modelo encontrado."
      />
    </>
  );
}

function TelaConsultaTransformacao() {
  const localInicial = useMemo(() => lerBaseTransformacoesLocal(), []);

  const [base, setBase] = useState(localInicial.dados);
  const [atualizadoEm, setAtualizadoEm] = useState(localInicial.atualizadoEm);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(localInicial.dados.length === 0);
  const [resultado, setResultado] = useState(null);

  const indice = useMemo(() => criarIndiceBaseTransformacoes(base), [base]);

  const carregarBase = useCallback(async (forcar = false) => {
    const local = lerBaseTransformacoesLocal();

    if (!forcar && local.dados.length > 0) {
      setBase(local.dados);
      setAtualizadoEm(local.atualizadoEm || '');
      setCarregando(false);
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch(
        `${API_BASE}?action=dados&fonte=baseTransformacoes&_=${Date.now()}`,
        { cache: 'no-store' }
      );

      const json = await resposta.json();

      if (!json.ok) {
        throw new Error(json.erro || 'Erro ao carregar base técnica.');
      }

      const registros = Array.isArray(json.dados) ? json.dados : [];
      const atualizado =
        json.atualizadoEm || new Date().toLocaleString('pt-BR');

      setBase(registros);
      setAtualizadoEm(atualizado);
      salvarBaseTransformacoesLocal(registros, atualizado);
    } catch (e) {
      console.error('Falha ao carregar base de transformações:', e);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarBase(false);
  }, [carregarBase]);

  const pesquisar = useCallback(() => {
    const chave = normalizarCodigoTransformacao(busca);

    if (!chave) {
      setResultado(null);
      return;
    }

    const encontrado = indice.get(chave) || null;
    setResultado(encontrado);
  }, [busca, indice]);

  const temTransformacao =
    resultado && regraTransformacaoValida(resultado.regraTransformacao);

  return (
    <>
      <section
        style={{
          background: C.bgCard,
          border: `1px solid ${C.bdLight}`,
          borderRadius: C.radius.lg,
          padding: 18,
          marginBottom: 16,
          boxShadow: C.shadowCard,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: C.txtPri,
            fontFamily: C.font,
          }}
        >
          Consulta de Transformação
        </div>

        <button
          onClick={() => carregarBase(true)}
          disabled={carregando}
          style={btnAtualizar(carregando)}
        >
          {carregando ? 'Atualizando base…' : 'Atualizar base'}
        </button>
      </section>

      <section
        style={{
          background: C.bgCard,
          border: `1px solid ${C.bdLight}`,
          borderRadius: C.radius.lg,
          padding: 16,
          marginBottom: 16,
          boxShadow: C.shadowCard,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: C.txtMuted,
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          Pesquisar modelo
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') pesquisar();
            }}
            placeholder="Ex.: B156XW04-V.8"
            style={{
              ...inputEl,
              flex: 1,
              minWidth: 0,
            }}
          />

          <button
            type="button"
            onClick={pesquisar}
            style={{
              height: 36,
              border: 'none',
              borderRadius: C.radius.md,
              padding: '0 18px',
              background: C.primaryGrad,
              color: '#fff',
              fontWeight: 800,
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: C.font,
              boxShadow: '0 4px 14px rgba(var(--accent-rgb),0.35)',
            }}
          >
            Buscar
          </button>
        </div>

        <div
          style={{
            marginTop: 8,
            fontSize: 10,
            color: C.txtMuted,
          }}
        >
          Base carregada: {base.length} modelo(s)
        </div>
      </section>

      {resultado === null && busca.trim() !== '' && (
        <div
          style={{
            background: C.bgCard,
            border: `1.5px dashed ${C.bdMid}`,
            borderRadius: C.radius.lg,
            padding: 18,
            color: C.txtMuted,
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          Pesquise o modelo e pressione Buscar.
        </div>
      )}

      {resultado && (
        <section
          style={{
            background: C.bgCard,
            border: `1px solid ${C.bdLight}`,
            borderRadius: C.radius.lg,
            padding: 16,
            boxShadow: C.shadowCard,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: C.txtPri,
              }}
            >
              {resultado.produto}
            </div>

            <Badge
              texto={
                temTransformacao
                  ? 'TRANSFORMAÇÃO DISPONÍVEL'
                  : 'SEM TRANSFORMAÇÃO'
              }
              tipo={temTransformacao ? 'verde' : 'cinza'}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6,minmax(0,1fr))',
              gap: 8,
              marginBottom: 14,
            }}
          >
            {[
              ['Resolução', resultado.resolucao],
              ['Polegada', resultado.polegada],
              ['Pinos', resultado.pinos],
              ['Brackets', resultado.brackets],
              ['Tipo', resultado.tipoTela],
              ['IPS', resultado.ips],
            ].map(([rotulo, valor]) => (
              <div
                key={rotulo}
                style={{
                  background: C.bgStripe,
                  border: `1px solid ${C.bdLight}`,
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    color: C.txtMuted,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  {rotulo}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: C.txtPri,
                    fontWeight: 800,
                  }}
                >
                  {valor || '—'}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: temTransformacao ? C.greenBg : C.bgStripe,
              border: `1px solid ${temTransformacao ? C.greenBd : C.bdLight}`,
              borderRadius: 10,
              padding: 13,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                whiteSpace: 'pre-wrap',
                fontSize: 12,
                lineHeight: 1.5,
                color: C.txtPri,
                fontWeight: 700,
              }}
            >
              {resultado.regraTransformacao ||
                'Nenhuma transformação cadastrada.'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: C.txtMuted,
                textTransform: 'uppercase',
                alignSelf: 'center',
              }}
            >
              Peças de reposição:
            </span>

            {[resultado.reposicao1, resultado.reposicao2, resultado.reposicao3]
              .filter((valor) => String(valor || '').trim())
              .map((valor) => (
                <Badge key={valor} texto={valor} tipo="azul" />
              ))}

            {![
              resultado.reposicao1,
              resultado.reposicao2,
              resultado.reposicao3,
            ].some((valor) => String(valor || '').trim()) && (
              <span style={{ fontSize: 11, color: C.txtMuted }}>
                Nenhuma peça cadastrada.
              </span>
            )}
          </div>
        </section>
      )}

      {!resultado && !busca.trim() && (
        <div
          style={{
            background: C.bgCard,
            border: `1.5px dashed ${C.bdMid}`,
            borderRadius: C.radius.lg,
            padding: 24,
            color: C.txtMuted,
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          Digite um modelo para consultar as possibilidades de transformação.
        </div>
      )}
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
    return iniciarAtualizacaoSincronizada(load);
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
    return iniciarAtualizacaoSincronizada(load);
  }, [load]);
  return { dados, loading, erro, atualizado, load };
}

function corPct(valor) {
  const n = typeof valor === 'number' ? valor : numeroPercentual(valor);
  if (n === null) return { bg: C.bgStripe, color: C.txtMuted, bd: C.bdLight };
  if (n >= 95) return { bg: C.greenBg, color: C.green, bd: C.greenBd };
  if (n >= 90) return { bg: C.greenBg, color: C.green, bd: C.greenBd };
  if (n >= 70) return { bg: C.amberBg, color: C.amber, bd: C.amberBd };
  if (n >= 50) return { bg: C.orangeBg, color: C.orange, bd: C.orangeBd };
  return { bg: C.redBg, color: C.red, bd: C.redBd };
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
        border: `1px solid ${C.bdLight}`,
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
          fontWeight: 800,
          fontFamily: C.fontMono,
          letterSpacing: '-0.03em',
          color: C.txtPri,
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
    border: `1px solid ${C.bdLight}`,
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
          border: `1px solid ${C.bdLight}`,
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
          border: `1px solid ${C.bdLight}`,
          borderRadius: C.radius.xl,
          overflow: 'hidden',
          boxShadow: C.shadowCard,
        }}
      >
        <div
          style={{
            padding: '13px 18px',
            borderBottom: `1px solid ${C.bdLight}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: C.bgStripe,
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
                  background: C.bgMuted,
                }}
              >
                {['Mês', 'Data', 'Dia'].map((t) => (
                  <th
                    key={t}
                    style={{
                      padding: '6px 8px',
                      fontSize: 9,
                      fontWeight: 800,
                      color: C.txtSec,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: `1px solid ${C.bdLight}`,
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
                      fontWeight: 800,
                      color: C.txtSec,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: `1px solid ${C.bdLight}`,
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
                      fontWeight: 800,
                      color: C.txtSec,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: `1px solid ${C.bdLight}`,
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
                      fontWeight: 800,
                      color: C.txtSec,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: `1px solid ${C.bdLight}`,
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
                        background: item[campo] ? cor.bg : C.bgCard,
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
                    style={{
                      background: idx % 2 === 0 ? C.bgCard : C.bgStripe,
                    }}
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
                    border: `1px solid ${C.bdLight}`,
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
                      fontWeight: 800,
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
                    borderBottom: `1px solid ${C.bdLight}`,
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
          background: item[campo] ? cor.bg : C.bgCard,
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
          background: dest && n > 0 ? C.redBg : C.bgCard,
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
    border: `1px solid ${C.bdLight}`,
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
          border: `1px solid ${C.bdLight}`,
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
          border: `1px solid ${C.bdLight}`,
          borderRadius: C.radius.xl,
          overflow: 'hidden',
          boxShadow: C.shadowCard,
        }}
      >
        <div
          style={{
            padding: '13px 18px',
            borderBottom: `1px solid ${C.bdLight}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: C.bgStripe,
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
                border: `1px solid ${det ? C.primary : C.bdMid}`,
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
                  background: C.bgMuted,
                }}
              >
                {['Data', 'Dia'].map((t) => (
                  <th
                    key={t}
                    style={{
                      padding: '6px 8px',
                      fontSize: 9,
                      fontWeight: 800,
                      color: C.txtSec,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: `1px solid ${C.bdLight}`,
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
                      fontWeight: 800,
                      color: C.txtSec,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: `1px solid ${C.bdLight}`,
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
                      fontWeight: 800,
                      color: C.txtSec,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: `1px solid ${C.bdLight}`,
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
                          fontWeight: 800,
                          color: C.txtSec,
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          borderBottom: `1px solid ${C.bdLight}`,
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
                          fontWeight: 800,
                          color: C.txtSec,
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          borderBottom: `1px solid ${C.bdLight}`,
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
                          fontWeight: 800,
                          color: C.txtSec,
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          borderBottom: `1px solid ${C.bdLight}`,
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
                  style={{ background: idx % 2 === 0 ? C.bgCard : C.bgStripe }}
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
                  borderBottom: `1px solid ${C.bdLight}`,
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
    border: `1px solid ${C.bdLight}`,
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
    fontWeight: 800,
    color: C.txtSec,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    borderBottom: `1px solid ${C.bdLight}`,
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
          background: item[campo] ? cor.bg : C.bgCard,
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
          border: `1px solid ${C.bdLight}`,
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
          border: `1px solid ${C.bdLight}`,
          borderRadius: C.radius.xl,
          overflow: 'hidden',
          boxShadow: C.shadowCard,
        }}
      >
        <div
          style={{
            padding: '13px 18px',
            borderBottom: `1px solid ${C.bdLight}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: C.bgStripe,
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
                  background: C.bgMuted,
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
                  style={{ background: idx % 2 === 0 ? C.bgCard : C.bgStripe }}
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

// ─── Cache visual do Dashboard ─────────────────────────────────────────────────

const DASHBOARD_SNAPSHOT_KEY = 'bbdi_dashboard_snapshot_v1';

function lerSnapshotDashboard() {
  if (typeof window === 'undefined') return null;

  try {
    const salvo = localStorage.getItem(DASHBOARD_SNAPSHOT_KEY);
    return salvo ? JSON.parse(salvo) : null;
  } catch (e) {
    return null;
  }
}

function salvarSnapshotDashboard(snapshot) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(DASHBOARD_SNAPSHOT_KEY, JSON.stringify(snapshot));
  } catch (e) {
    // Se o navegador bloquear o armazenamento, o painel continua funcionando.
  }
}

// ─── App Shell ─────────────────────────────────────────────────────────────────

function TelaDashboard({ setTela }) {
  const [snapshotInicialDashboard] = useState(() => lerSnapshotDashboard());
  const [resumoCacheDashboard, setResumoCacheDashboard] = useState(
    () => snapshotInicialDashboard?.resumo || null
  );
  const [carregouDashboardUmaVez, setCarregouDashboardUmaVez] = useState(false);

  const [dadosDashboard, setDadosDashboard] = useState({
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
  });
  const [atualizacoesDashboard, setAtualizacoesDashboard] = useState(
    () => snapshotInicialDashboard?.atualizacoesDashboard || {}
  );
  const [atualizadoEm, setAtualizadoEm] = useState(
    () => snapshotInicialDashboard?.atualizadoEm || ''
  );
  const [carregando, setCarregando] = useState(false);
  const [errosFontes, setErrosFontes] = useState([]);
  const [viaDash, setViaDash] = useState({ dados: null, erro: '', hora: '' });
  const [cancDash, setCancDash] = useState({ dados: null, erro: '', hora: '' });

  // Cards de Expedição (Via Leitor): leitura própria, a cada 5 minutos e no botão de atualizar
  const carregarViaDash = useCallback(async () => {
    try {
      const dados = await viaResumoDashboard();
      setViaDash({
        dados,
        erro: '',
        hora: new Date().toLocaleTimeString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
        }),
      });
    } catch (e) {
      setViaDash((cur) => ({ ...cur, erro: e.message || 'falha ao carregar' }));
    }
  }, []);

  useEffect(() => {
    carregarViaDash();
    const t = setInterval(carregarViaDash, 300000);
    return () => clearInterval(t);
  }, [carregarViaDash]);

  // Cards de Cancelamentos (NFs pendentes): leitura própria, a cada 2 minutos e no botão de atualizar
  const carregarCancDash = useCallback(async () => {
    try {
      const dados = await cancResumoDashboard();
      setCancDash({
        dados,
        erro: '',
        hora: new Date().toLocaleTimeString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
        }),
      });
    } catch (e) {
      setCancDash((cur) => ({
        ...cur,
        erro: e.message || 'falha ao carregar',
      }));
    }
  }, []);

  useEffect(() => {
    carregarCancDash();
    const t = setInterval(carregarCancDash, 120000);
    return () => clearInterval(t);
  }, [carregarCancDash]);

  const carregarDashboard = useCallback(async () => {
    setCarregando(true);

    const fontes = [
      'equipatech',
      'bbbaterias',
      'producao',
      'analiseTransformacoes',
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

        // Atualiza o card desta fonte assim que ela responder,
        // sem esperar todas as outras fontes terminarem.
        setDadosDashboard((estadoAtual) => ({
          ...estadoAtual,
          [fonte]: dados,
        }));

        setAtualizacoesDashboard((estadoAtual) => ({
          ...estadoAtual,
          [fonte]: json.atualizadoEm || '',
        }));

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
      setCarregouDashboardUmaVez(true);
    }
  }, []);

  useEffect(() => {
    return iniciarAtualizacaoSincronizada(carregarDashboard);
  }, [carregarDashboard]);

  function horaFonte(fonte) {
    const valor = String(atualizacoesDashboard[fonte] || '').trim();

    if (!valor) return '';

    const hora = valor.match(/\b\d{2}:\d{2}(?::\d{2})?\b/);
    if (hora) return hora[0];

    return valor;
  }

  const resumoCalculado = useMemo(() => {
    const faturamentoEQ = dadosDashboard.equipatech || [];
    const faturamentoBB = dadosDashboard.bbbaterias || [];
    const producao = dadosDashboard.producao || [];
    const analiseTransformacoes = dadosDashboard.analiseTransformacoes || [];
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

    const modelosParaTransformar = analiseTransformacoes.filter(
      (item) =>
        item.precisaTransformar === true && item.temOpcaoTransformacao === true
    ).length;

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
      modelosParaTransformar,
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

  // Ao abrir o site, mostra imediatamente o último resumo salvo no navegador.
  // Assim que a atualização atual terminar, troca pelos dados novos.
  const resumo =
    !carregouDashboardUmaVez && resumoCacheDashboard
      ? resumoCacheDashboard
      : resumoCalculado;

  useEffect(() => {
    if (!carregouDashboardUmaVez) return;

    setResumoCacheDashboard(resumoCalculado);

    salvarSnapshotDashboard({
      resumo: resumoCalculado,
      atualizacoesDashboard,
      atualizadoEm,
      salvoEm: Date.now(),
    });
  }, [
    carregouDashboardUmaVez,
    resumoCalculado,
    atualizacoesDashboard,
    atualizadoEm,
  ]);

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
      titulo: 'Análise de Transformação',
      valor: resumo.modelosParaTransformar ?? 0,
      detalhe: 'Modelos com falta e opção disponível',
      cor: '#0891B2',
      icon: 'transformacao',
      tela: 'analiseTransformacoes',
      horario: horaFonte('analiseTransformacoes'),
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
    ...(() => {
      const v = viaDash.dados;
      const ok = !!v;
      const detalhe = (g) =>
        viaDash.erro && !ok
          ? 'Via Leitor indisponível'
          : !ok
          ? 'Carregando...'
          : `${g.atrasados} atrasado(s) · ${g.total - g.atrasados} no prazo`;
      const bb = ok ? v.bb : null;
      const eq = ok ? v.eq : null;
      const total = ok
        ? { total: bb.total + eq.total, atrasados: bb.atrasados + eq.atrasados }
        : null;
      return [
        {
          titulo: 'Total a Expedir (Via Leitor)',
          valor: ok ? total.total : '—',
          detalhe: detalhe(total),
          cor: '#475569',
          icon: 'expedicao',
          tela: 'viaLeitor',
          horario: viaDash.hora,
        },
        {
          titulo: 'Expedição BBBaterias',
          valor: ok ? bb.total : '—',
          detalhe: detalhe(bb),
          cor: '#4F46E5',
          icon: 'bb',
          tela: 'viaLeitor',
          horario: viaDash.hora,
        },
        {
          titulo: 'Expedição Equipatech',
          valor: ok ? eq.total : '—',
          detalhe: detalhe(eq),
          cor: '#0D9488',
          icon: 'eq',
          tela: 'viaLeitor',
          horario: viaDash.hora,
        },
      ];
    })(),
  ];

  const cardsCancelamento = (() => {
    const v = cancDash.dados;
    const ok = !!v;
    const txt = (fn) =>
      cancDash.erro && !ok
        ? 'Cancelamentos indisponível'
        : !ok
        ? 'Carregando...'
        : fn(v);
    const val = (n) => (ok ? n : '—');
    const detalhe = (n, atr) => `${n} NF(s) pendente(s) · ${atr} atrasada(s)`;
    return [
      {
        titulo: 'Aguard. Cancelamento',
        valor: val(v && v.ag),
        detalhe: txt((x) => detalhe(x.ag, x.agAtr)),
        cor: '#EA580C',
        icon: 'cancelamento',
        tela: 'cancelamentos',
        horario: cancDash.hora,
      },
      {
        titulo: 'Aguardando CNT',
        valor: val(v && v.cnt),
        detalhe: txt((x) => detalhe(x.cnt, x.cntAtr)),
        cor: '#2563EB',
        icon: 'cancelamento',
        tela: 'cancelamentos',
        horario: cancDash.hora,
      },
    ];
  })();

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

    if (tipo === 'transformacao') {
      return (
        <svg {...svgBase}>
          <path d="M7 7h10" />
          <path d="M14 4l3 3-3 3" />
          <path d="M17 17H7" />
          <path d="M10 14l-3 3 3 3" />
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

    if (tipo === 'cancelamento') {
      return (
        <svg {...svgBase}>
          <path d="M6 3h9l4 4v14H6z" />
          <path d="M14 3v5h5" />
          <path d="M9.5 12.5l5 5" />
          <path d="M14.5 12.5l-5 5" />
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
          borderRadius: C.radius.xl,
          overflow: 'hidden',
          background: C.bgCard,
          border: `1px solid ${C.bdLight}`,
          boxShadow: C.shadowCard,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: '16px 20px',
            borderBottom: `1px solid ${C.bdLight}`,
            fontFamily: C.font,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: C.txtPri,
                letterSpacing: '-0.02em',
              }}
            >
              Dashboard operacional
            </div>
            <div style={{ fontSize: 12, color: C.txtMuted, marginTop: 2 }}>
              Faturamento, expedição, estoque, produção e indicadores em um só
              lugar
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              carregarDashboard();
              carregarViaDash();
              carregarCancDash();
            }}
            disabled={carregando}
            title="Atualizar dashboard"
            style={{
              height: 36,
              padding: '0 14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              borderRadius: C.radius.md,
              border: `1px solid ${C.bdMid}`,
              background: C.bgCard,
              color: C.txtSec,
              fontFamily: C.font,
              fontSize: 12,
              fontWeight: 600,
              cursor: carregando ? 'not-allowed' : 'pointer',
              opacity: carregando ? 0.6 : 1,
              boxShadow: C.shadowSm,
            }}
          >
            <span style={{ fontSize: 15, lineHeight: 1 }}>↻</span>
            {carregando ? 'Atualizando…' : 'Atualizar'}
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
              Núcleo de Cancelamentos
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
            {cardsCancelamento.map((card) => (
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
            border: `1px solid ${C.orangeBd}`,
            background: C.orangeBg,
            color: 'var(--orange-tx)',
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

// ─── Postagens (Expedição) — réplica da tela "Postagens — Histórico geral" da Central ─────────
// Lê as funções/views criadas por fase_c_14_view_postagens_painel.sql (somente leitura):
//   v_postagens_painel · v_coletas_painel · v_romaneio_itens_painel · v_transportadoras_painel

const POSTAGENS_TAM_PAGINA = 200;
const POSTAGENS_COLUNAS =
  'linha_id,nf,filial,pedido,cliente_codigo,cliente_nome,chave_nfe,rastreios,transportadora,transportadora_canon,data_faturamento,data_limite,postado_em,bipador,embalador,volume,romaneio,romaneio_status,coleta_em,retirada_em,situacao,status_texto';
const POSTAGENS_FILTROS_VAZIOS = {
  status: '',
  filial: '',
  transp: '',
  rom: '',
  busca: '',
};

function headersSupabasePostagem() {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  };
}

async function lerSupabasePostagem(caminho) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${caminho}`, {
    headers: headersSupabasePostagem(),
    cache: 'no-store',
  });
  if (!r.ok) {
    let det = '';
    try {
      const j = await r.json();
      det = [j.code, j.message, j.hint, j.details].filter(Boolean).join(' — ');
    } catch (e) {
      // sem detalhe
    }
    const nome = String(caminho).split('?')[0];
    let dica = '';
    if (r.status === 404 && /^v_via_/.test(nome))
      dica =
        ' Dica: rode o SQL bloco_11_via_leitor.sql no Supabase (ele já faz o reload do schema).';
    else if (r.status === 404)
      dica =
        " Dica: rode no Supabase  notify pgrst, 'reload schema';  e confira o SQL fase_c_14 (blocos 1 a 5).";
    if (r.status === 401 || r.status === 403)
      dica = ' Dica: faltam permissões (rode o bloco 5 do SQL fase_c_14).';
    throw new Error(
      `Falha ao consultar "${nome}" — HTTP ${r.status}: ${
        det || 'sem detalhe'
      }.${dica}`
    );
  }
  return r.json();
}

// Divide "AAAA-MM-DD[ T]HH:MM:SS[.ms][fuso]" e devolve data/hora no horário de São Paulo.
// Texto com fuso (ex.: "+00:00", "-03", "Z") é convertido; sem fuso é tratado como horário local.
function partesPostagem(valor) {
  const t = String(valor === null || valor === undefined ? '' : valor).trim();
  if (!t) return null;
  const m = t.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?)?\s*(Z|[+-]\d{2}(?::?\d{2})?)?$/
  );
  if (!m) return null;
  const [, a, mo, d, h, mi, s, fuso] = m;
  if (h === undefined) return { data: `${d}/${mo}/${a}`, hora: '' };
  const seg = s || '00';
  if (!fuso) return { data: `${d}/${mo}/${a}`, hora: `${h}:${mi}:${seg}` };
  let off = 'Z';
  if (fuso !== 'Z') {
    const dig = fuso.replace(':', '');
    off = `${dig.slice(0, 3)}:${dig.length > 3 ? dig.slice(3, 5) : '00'}`;
  }
  const dt = new Date(`${a}-${mo}-${d}T${h}:${mi}:${seg}${off}`);
  if (Number.isNaN(dt.getTime()))
    return { data: `${d}/${mo}/${a}`, hora: `${h}:${mi}:${seg}` };
  const o = {};
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  })
    .formatToParts(dt)
    .forEach((p) => {
      o[p.type] = p.value;
    });
  return {
    data: `${o.day}/${o.month}/${o.year}`,
    hora: `${o.hour}:${o.minute}:${o.second}`,
  };
}
function dataPostagem(v) {
  const p = partesPostagem(v);
  return p ? p.data : '—';
}
function horaPostagem(v) {
  const p = partesPostagem(v);
  return p && p.hora ? p.hora : '—';
}
function dataHoraPostagem(v) {
  const p = partesPostagem(v);
  if (!p) return '—';
  return p.hora ? `${p.data} ${p.hora}` : p.data;
}

function escHtmlPostagem(v) {
  return String(v === null || v === undefined ? '' : v).replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[
        c
      ])
  );
}

function nf9Postagem(v) {
  const n = String(v || '').replace(/\D/g, '');
  return n ? n.padStart(9, '0') : '—';
}

// ── Relatório de coletas (.xlsx gerado no navegador, sem bibliotecas) ─────────────────────────
const REL_TABELA_CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function relCrc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1)
    c = REL_TABELA_CRC[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function relZip(arquivos) {
  const enc = new TextEncoder();
  const partes = [];
  const central = [];
  let off = 0;
  const agora = new Date();
  const dosT =
    agora.getHours() * 2048 +
    agora.getMinutes() * 32 +
    Math.floor(agora.getSeconds() / 2);
  const dosD =
    (agora.getFullYear() - 1980) * 512 +
    (agora.getMonth() + 1) * 32 +
    agora.getDate();
  arquivos.forEach(([nome, conteudo]) => {
    const nb = enc.encode(nome);
    const db = enc.encode(conteudo);
    const crc = relCrc32(db);
    const lh = new DataView(new ArrayBuffer(30));
    lh.setUint32(0, 0x04034b50, true);
    lh.setUint16(4, 20, true);
    lh.setUint16(6, 0x0800, true);
    lh.setUint16(8, 0, true);
    lh.setUint16(10, dosT, true);
    lh.setUint16(12, dosD, true);
    lh.setUint32(14, crc, true);
    lh.setUint32(18, db.length, true);
    lh.setUint32(22, db.length, true);
    lh.setUint16(26, nb.length, true);
    lh.setUint16(28, 0, true);
    partes.push(new Uint8Array(lh.buffer), nb, db);
    const ch = new DataView(new ArrayBuffer(46));
    ch.setUint32(0, 0x02014b50, true);
    ch.setUint16(4, 20, true);
    ch.setUint16(6, 20, true);
    ch.setUint16(8, 0x0800, true);
    ch.setUint16(10, 0, true);
    ch.setUint16(12, dosT, true);
    ch.setUint16(14, dosD, true);
    ch.setUint32(16, crc, true);
    ch.setUint32(20, db.length, true);
    ch.setUint32(24, db.length, true);
    ch.setUint16(28, nb.length, true);
    ch.setUint16(30, 0, true);
    ch.setUint16(32, 0, true);
    ch.setUint16(34, 0, true);
    ch.setUint16(36, 0, true);
    ch.setUint32(38, 0, true);
    ch.setUint32(42, off, true);
    central.push(new Uint8Array(ch.buffer), nb);
    off += 30 + nb.length + db.length;
  });
  const tamCentral = central.reduce((a, b) => a + b.length, 0);
  const eo = new DataView(new ArrayBuffer(22));
  eo.setUint32(0, 0x06054b50, true);
  eo.setUint16(4, 0, true);
  eo.setUint16(6, 0, true);
  eo.setUint16(8, arquivos.length, true);
  eo.setUint16(10, arquivos.length, true);
  eo.setUint32(12, tamCentral, true);
  eo.setUint32(16, off, true);
  eo.setUint16(20, 0, true);
  return new Blob([...partes, ...central, new Uint8Array(eo.buffer)], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
}

function relXmlEsc(s) {
  // remove caracteres de controle que tornam o XML do Excel inválido
  // eslint-disable-next-line no-control-regex
  const controle = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;
  return String(s === null || s === undefined ? '' : s)
    .replace(controle, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function relColLetra(indice) {
  let s = '';
  let i = indice + 1;
  while (i > 0) {
    const r = (i - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    i = Math.floor((i - 1) / 26);
  }
  return s;
}

function relXlsx(cab, linhas, colNumericas, larguras) {
  const cel = (v, c, r, estilo) => {
    const ref = relColLetra(c) + r;
    if (colNumericas.has(c) && typeof v === 'number' && Number.isFinite(v))
      return `<c r="${ref}"><v>${v}</v></c>`;
    return `<c r="${ref}" t="inlineStr"${
      estilo ? ` s="${estilo}"` : ''
    }><is><t xml:space="preserve">${relXmlEsc(v)}</t></is></c>`;
  };
  let rows = `<row r="1">${cab.map((h, c) => cel(h, c, 1, 1)).join('')}</row>`;
  linhas.forEach((l, i) => {
    rows += `<row r="${i + 2}">${l
      .map((v, c) => cel(v, c, i + 2, 0))
      .join('')}</row>`;
  });
  const ult = relColLetra(cab.length - 1) + (linhas.length + 1);
  const sheet =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
    '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>' +
    '<sheetFormatPr defaultRowHeight="15"/><cols>' +
    larguras
      .map(
        (w, i) =>
          `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`
      )
      .join('') +
    '</cols>' +
    `<sheetData>${rows}</sheetData><autoFilter ref="A1:${ult}"/></worksheet>`;
  const cab0 = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
  const arquivos = [
    [
      '[Content_Types].xml',
      `${cab0}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`,
    ],
    [
      '_rels/.rels',
      `${cab0}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
    ],
    [
      'xl/workbook.xml',
      `${cab0}<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Coletas" sheetId="1" r:id="rId1"/></sheets></workbook>`,
    ],
    [
      'xl/_rels/workbook.xml.rels',
      `${cab0}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
    ],
    [
      'xl/styles.xml',
      `${cab0}<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF146C43"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`,
    ],
    ['xl/worksheets/sheet1.xml', sheet],
  ];
  return relZip(arquivos);
}

function relBaixar(blob, nome) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nome;
  a.rel = 'noopener';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    try {
      a.remove();
    } catch (e) {
      // já removido
    }
    try {
      URL.revokeObjectURL(url);
    } catch (e) {
      // já liberado
    }
  }, 60000);
}

function relSemZero(v) {
  return String(v === null || v === undefined ? '' : v)
    .replace(/\D/g, '')
    .replace(/^0+/, '');
}

function relMsEm(v) {
  const t = new Date(v).getTime();
  return Number.isFinite(t) ? t : NaN;
}

// Gera o mesmo relatório da Central: uma linha por NF coletada na data escolhida (horário de São Paulo).
async function gerarRelatorioColetasPostagem(dataSelecionada) {
  const [Y, M, D] = dataSelecionada.split('-').map(Number);
  const lo = new Date(Date.UTC(Y, M - 1, D - 1, 0, 0, 0)).toISOString();
  const hi = new Date(Date.UTC(Y, M - 1, D + 2, 0, 0, 0)).toISOString();
  const brutas = [];
  for (let off = 0; off < 100000; off += 1000) {
    const lote = await lerSupabasePostagem(
      `v_coletas_painel?select=*&coleta_em=gte.${encodeURIComponent(
        lo
      )}&coleta_em=lt.${encodeURIComponent(hi)}` +
        `&order=coleta_em.asc,postagem_id.asc&limit=1000&offset=${off}`
    );
    if (!Array.isArray(lote))
      throw new Error(
        'Resposta inesperada do Supabase ao consultar as coletas.'
      );
    brutas.push(...lote);
    if (lote.length < 1000) break;
  }
  const dataBr = `${String(D).padStart(2, '0')}/${String(M).padStart(
    2,
    '0'
  )}/${Y}`;
  const posts = brutas.filter((p) => {
    const pt = partesPostagem(p.coleta_em);
    return pt && pt.data === dataBr;
  });
  if (!posts.length) return { vazio: true, dataBr, total: 0 };

  // Horário de Finalização = último "Salvar lote" (bipada_em) do romaneio naquela coleta
  const grupoDe = (p) => `${p.grupo_romaneio}|${relMsEm(p.coleta_em)}`;
  const fimPorGrupo = new Map();
  posts.forEach((p) => {
    const t = relMsEm(p.bipada_em || p.criado_em);
    if (Number.isNaN(t)) return;
    const g = grupoDe(p);
    if (!fimPorGrupo.has(g) || t > fimPorGrupo.get(g)) fimPorGrupo.set(g, t);
  });

  const porNF = new Map();
  [...posts]
    .sort(
      (a, b) =>
        relMsEm(a.coleta_em) - relMsEm(b.coleta_em) ||
        String(a.nf).localeCompare(String(b.nf))
    )
    .forEach((p) => {
      const filialOk = /^\d{4}$/.test(String(p.filial_xml || '').trim());
      const postOk = /^\d{4}$/.test(String(p.filial_postagem || '').trim());
      const filial = filialOk
        ? String(p.filial_xml).trim()
        : postOk
        ? String(p.filial_postagem).trim()
        : '';
      const chave = String(p.chave_nfe || '').replace(/\D/g, '');
      const nf = relSemZero(p.nf);
      const k = chave.length >= 40 ? chave : `${filial || '?'}|${nf}`;
      if (!porNF.has(k))
        porNF.set(k, {
          p,
          filial,
          nf,
          coleta: p.coleta_em,
          fim: fimPorGrupo.get(grupoDe(p)),
          embs: new Set(),
          vols: 0,
        });
      const r = porNF.get(k);
      r.vols += Math.max(1, parseInt(p.volume, 10) || 1);
      const e = String(p.embalador || '').trim();
      if (e) r.embs.add(e);
    });

  const empresaDe = (cod, p) => {
    if (cod === '1020') return 'BBBATERIAS';
    if (cod === '0101' || cod === '0102') return 'EQUIPATECH';
    return String(p.empresa || '')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/\s+/g, '')
      .toUpperCase();
  };
  const cab = [
    'Data',
    'Nota Fiscal',
    'Horário de Finalização',
    'Horário da Coleta',
    'Embalador',
    'Transporte',
    'Filial',
    'Código da Filial',
    'Volume',
  ];
  const linhas = [...porNF.values()].map((r) => {
    const nfNum = Number(r.nf);
    const fim = Number.isFinite(r.fim)
      ? horaPostagem(new Date(r.fim).toISOString())
      : '';
    return [
      dataPostagem(r.coleta),
      Number.isFinite(nfNum) && nfNum > 0 ? nfNum : '',
      fim === '—' ? '' : fim,
      horaPostagem(r.coleta) === '—' ? '' : horaPostagem(r.coleta),
      [...r.embs].join(' / '),
      String(r.p.transporte || '').trim(),
      empresaDe(r.filial, r.p),
      r.filial,
      r.vols,
    ];
  });
  const blob = relXlsx(
    cab,
    linhas,
    new Set([1, 8]),
    [13, 14, 22, 19, 20, 22, 14, 16, 9]
  );
  relBaixar(
    blob,
    `Relatorio_Coletas_${String(D).padStart(2, '0')}-${String(M).padStart(
      2,
      '0'
    )}-${Y}.xlsx`
  );
  return { vazio: false, dataBr, total: linhas.length };
}

// ── Visualização (somente leitura) de um romaneio — mesmo layout do romaneio da Central ───────
const CSS_ROMANEIO_POSTAGENS = `
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

function moedaPostagem(v) {
  const n = Number(v);
  return Number.isFinite(n) && v !== null && v !== ''
    ? n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : '—';
}

function ModalRomaneioPostagens({ codigo, onClose }) {
  const [itens, setItens] = useState([]);
  const [assinatura, setAssinatura] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let vivo = true;
    (async () => {
      setCarregando(true);
      setErro('');
      setAssinatura('');
      try {
        const j = await lerSupabasePostagem(
          `v_romaneio_itens_painel?select=id,romaneio,romaneio_status,romaneio_criado_em,romaneio_assinado_em,romaneio_transportadora,transportadora_exibicao,transportadora_cnpj,romaneio_filial,empresa_nome,motorista_nome,motorista_cpf,nf,chave_nfe,pedido,cliente_nome,valor_nf,rastreio,volume,postado_em` +
            `&romaneio=eq.${encodeURIComponent(
              codigo
            )}&order=postado_em.asc,id.asc&limit=2000`
        );
        const lista = Array.isArray(j) ? j : [];
        if (vivo) setItens(lista);
        if (
          lista[0] &&
          String(lista[0].romaneio_status).toLowerCase() === 'assinado'
        ) {
          try {
            const a = await lerSupabasePostagem(
              `v_romaneio_assinatura_painel?select=assinatura&romaneio=eq.${encodeURIComponent(
                codigo
              )}&limit=1`
            );
            if (vivo && Array.isArray(a) && a[0] && a[0].assinatura)
              setAssinatura(a[0].assinatura);
          } catch (e) {
            // a assinatura é opcional: a tela continua sem a imagem
          }
        }
      } catch (e) {
        if (vivo) setErro(e.message || 'Erro ao carregar o romaneio.');
      } finally {
        if (vivo) setCarregando(false);
      }
    })();
    return () => {
      vivo = false;
    };
  }, [codigo]);

  useEffect(() => {
    const esc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  const cab = itens[0] || {};
  const assinado =
    String(cab.romaneio_status || '').toLowerCase() === 'assinado';
  const transp =
    String(
      cab.transportadora_exibicao || cab.romaneio_transportadora || ''
    ).trim() || '—';
  let cnpjTransp = String(cab.transportadora_cnpj || '').trim();
  if (!cnpjTransp && /LOGGI/i.test(transp)) cnpjTransp = '24.217.653/0053-16';
  const filiaisRom = String(cab.romaneio_filial || '')
    .split(',')
    .map((f) => f.trim())
    .filter(Boolean)
    .join(', ');
  const empresaTxt = cab.empresa_nome
    ? `${cab.empresa_nome}${filiaisRom ? ` (${filiaisRom})` : ''}`
    : '';
  const totalVolumes = itens.reduce(
    (t, i) => t + (parseInt(i.volume, 10) || 1),
    0
  );
  const totalNFs = new Set(itens.map((i) => nf9Postagem(i.nf))).size;
  const horaCriacao = cab.romaneio_criado_em
    ? horaPostagem(cab.romaneio_criado_em)
    : '—';
  const retiradaEm = cab.romaneio_assinado_em
    ? dataHoraPostagem(cab.romaneio_assinado_em)
    : '—';
  const barras = String(codigo)
    .padEnd(26, '7')
    .slice(0, 26)
    .split('')
    .map((ch, n) => 1 + ((ch.charCodeAt(0) + n) % 4));

  // PDF/impressão no modelo do romaneio de coleta: uma linha por NF, e o bloco de assinatura em TODAS as páginas.
  function imprimir() {
    const porNF = new Map();
    itens.forEach((i) => {
      const k = nf9Postagem(i.nf);
      if (!porNF.has(k))
        porNF.set(k, { nf: k, chave: i.chave_nfe || '', vol: 0 });
      porNF.get(k).vol += parseInt(i.volume, 10) || 1;
    });
    const lista = [...porNF.values()];
    const porPagina = 28;
    const totalPag = Math.max(1, Math.ceil(lista.length / porPagina));
    const dataRom = cab.romaneio_criado_em
      ? dataPostagem(cab.romaneio_criado_em)
      : '—';
    const gerado = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    });
    const bloco = `<div class="ass">
      <div class="ass-dados">
        <div><b>Responsável pela coleta:</b> ${escHtmlPostagem(
          assinado ? cab.motorista_nome || '—' : ''
        )}</div>
        <div><b>Documento:</b> ${escHtmlPostagem(
          assinado ? cab.motorista_cpf || '—' : ''
        )}</div>
        <div><b>Data/Hora da assinatura:</b> ${escHtmlPostagem(
          assinado ? retiradaEm : ''
        )}</div>
      </div>
      <div class="ass-caixa">${
        assinado && assinatura
          ? `<img src="${escHtmlPostagem(assinatura)}" alt="assinatura">`
          : ''
      }</div>
      <div class="ass-leg">Assinatura digital do responsável pela coleta</div>
    </div>`;
    const paginas = [];
    for (let p = 0; p < totalPag; p += 1) {
      const fatia = lista.slice(p * porPagina, (p + 1) * porPagina);
      const linhas = fatia
        .map(
          (r) =>
            `<tr><td>${escHtmlPostagem(r.nf)}</td><td>${escHtmlPostagem(
              r.chave || '—'
            )}</td><td class="c">${r.vol}</td></tr>`
        )
        .join('');
      paginas.push(`<section class="pg">
        <div class="cab">
          <div class="cab-e">${escHtmlPostagem(
            cab.empresa_nome || 'BBDI DISTRIBUIDORA'
          )}${
        filiaisRom
          ? `<br><span class="fil">Filial(is): ${escHtmlPostagem(
              filiaisRom
            )}</span>`
          : ''
      }</div>
          <div class="cab-c"><b>Romaneio Nº ${escHtmlPostagem(
            codigo
          )}</b><br>${escHtmlPostagem(transp)}${
        cnpjTransp ? `<br>CNPJ: ${escHtmlPostagem(cnpjTransp)}` : ''
      }</div>
          <div class="cab-d">Data: ${escHtmlPostagem(dataRom)}<br>NFs: ${
        lista.length
      }<br>Volumes: ${totalVolumes}<br>Página: ${p + 1}/${totalPag}</div>
        </div>
        <table><thead><tr><th>Nota Fiscal</th><th>Chave de Acesso</th><th class="c">Volumes</th></tr></thead><tbody>${linhas}</tbody></table>
        <div class="rodape">${bloco}<div class="gerado">Romaneio ${escHtmlPostagem(
        codigo
      )} | Gerado em: ${escHtmlPostagem(gerado)}</div></div>
      </section>`);
    }
    const w = window.open('', '_blank');
    if (!w) {
      alert(
        'O navegador bloqueou a janela de impressão. Permita pop-ups para este site.'
      );
      return;
    }
    w.document
      .write(`<!doctype html><html><head><meta charset="utf-8"><title>Romaneio ${escHtmlPostagem(
      codigo
    )}</title>
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
</style></head><body>${paginas.join('')}
<script>window.onload=function(){window.print()}</script></body></html>`);
    w.document.close();
  }

  return (
    <div className="rm-fundo" onClick={onClose}>
      <style>{CSS_ROMANEIO_POSTAGENS}</style>
      <div className="rm" onClick={(e) => e.stopPropagation()}>
        <div className="rm-head">
          <div>
            <div className="rm-lbl">Romaneio de expedição</div>
            <div className="rm-rid">{codigo}</div>
            <div className="rm-barcode">
              {barras.map((w, n) => (
                <span key={n} style={{ width: w }} />
              ))}
            </div>
          </div>
          <div className="rm-transp">
            {empresaTxt && <div className="rm-emp">{empresaTxt}</div>}
            <div>{transp}</div>
            {cnpjTransp && <div className="rm-cnpj">CNPJ: {cnpjTransp}</div>}
          </div>
          <div className="rm-btns">
            <button
              type="button"
              className="rm-btn"
              onClick={imprimir}
              disabled={carregando || !itens.length}
            >
              Imprimir
            </button>
            <button type="button" className="rm-btn" onClick={onClose}>
              Fechar
            </button>
          </div>
          {assinado && <div className="rm-stamp">CONFIRMADO</div>}
        </div>
        <div className="rm-meta">
          <div>
            <b>Gerado por</b>—
          </div>
          <div>
            <b>Hora</b>
            {horaCriacao}
          </div>
          <div>
            <b>Notas fiscais</b>
            {totalNFs}
          </div>
          <div>
            <b>Volumes</b>
            {totalVolumes}
          </div>
        </div>
        <div className="rm-body">
          {erro && <div className="rm-erro">{erro}</div>}
          {carregando && <div className="rm-vazio">Carregando romaneio…</div>}
          {!carregando && !erro && !itens.length && (
            <div className="rm-vazio">
              Nenhuma NF encontrada neste romaneio.
            </div>
          )}
          {!carregando && itens.length > 0 && (
            <div className="rm-wrap">
              <table>
                <thead>
                  <tr>
                    <th>NF</th>
                    <th>Pedido</th>
                    <th>Cliente</th>
                    <th>Valor NF</th>
                    <th>Chave</th>
                    <th>Rastreio</th>
                    <th>Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {itens.map((i, n) => (
                    <tr key={i.id || n}>
                      <td className="mono" style={{ fontWeight: 700 }}>
                        {nf9Postagem(i.nf)}
                      </td>
                      <td className="mono">{i.pedido || '—'}</td>
                      <td>{i.cliente_nome || '—'}</td>
                      <td
                        className="mono"
                        style={{ fontWeight: 700, whiteSpace: 'nowrap' }}
                      >
                        {moedaPostagem(i.valor_nf)}
                      </td>
                      <td className="mono" style={{ fontSize: 10.5 }}>
                        {i.chave_nfe || '—'}
                      </td>
                      <td className="mono">{i.rastreio || '—'}</td>
                      <td className="mono">{parseInt(i.volume, 10) || 1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {assinado && !carregando && (
            <div className="rm-sig">
              {assinatura ? <img src={assinatura} alt="assinatura" /> : null}
              <div className="rm-sigmeta">
                Retirada confirmada por <b>{cab.motorista_nome || '—'}</b>
                {cab.motorista_cpf ? (
                  <>
                    <br />
                    CPF: <b>{cab.motorista_cpf}</b>
                  </>
                ) : null}
                <br />
                em {retiradaEm}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Estilo da tela (mesmo visual da Central). Classes com prefixo "pgh-" para não interferir no resto do painel.
const CSS_POSTAGENS = `
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
`;

const COLUNAS_TABELA_POSTAGENS = [
  'STATUS',
  'FILIAL',
  'NF',
  'PEDIDO',
  'CÓD. CLIENTE',
  'CLIENTE',
  'CHAVE NF-e',
  'RASTREIO 1',
  'RASTREIO 2',
  'RASTREIO 3',
  'TRANSPORTADORA',
  'DATA FAT.',
  'HORA FAT.',
  'DATA LIMITE',
  'DATA POSTAGEM',
  'HORA',
  'BIPADOR',
  'EMBALADOR',
  'VOLUME',
  'ROMANEIO / RETIRADA',
  'COLETA',
];

function hojeISOPostagem() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
  }).format(new Date());
}

function montarConsultaPostagens(filtros, pagina) {
  const q = [`select=${POSTAGENS_COLUNAS}`];
  if (filtros.status)
    q.push(`situacao=eq.${encodeURIComponent(filtros.status)}`);
  if (filtros.filial) q.push(`filial=eq.${encodeURIComponent(filtros.filial)}`);
  if (filtros.transp)
    q.push(`transportadora_canon=eq.${encodeURIComponent(filtros.transp)}`);
  const rom = filtros.rom.trim().replace(/[,*()%]/g, '');
  if (rom) q.push(`romaneio=ilike.${encodeURIComponent(`*${rom}*`)}`);
  const busca = filtros.busca
    .trim()
    .toLowerCase()
    .replace(/[,*()%]/g, '');
  if (busca) q.push(`busca=ilike.${encodeURIComponent(`*${busca}*`)}`);
  q.push('order=ordem.desc,nf.desc,linha_id.asc');
  q.push(`limit=${POSTAGENS_TAM_PAGINA + 1}`);
  q.push(`offset=${pagina * POSTAGENS_TAM_PAGINA}`);
  return `v_postagens_painel?${q.join('&')}`;
}

function TelaPostagens({ ativo }) {
  const [linhas, setLinhas] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [temProxima, setTemProxima] = useState(false);
  const [filtros, setFiltros] = useState(POSTAGENS_FILTROS_VAZIOS); // valores digitados
  const [aplicados, setAplicados] = useState(POSTAGENS_FILTROS_VAZIOS); // valores que já foram enviados ao banco
  const [transpOpcoes, setTranspOpcoes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [atualizadoEm, setAtualizadoEm] = useState('');
  const [romAberto, setRomAberto] = useState('');
  const [dataRel, setDataRel] = useState(hojeISOPostagem);
  const [gerando, setGerando] = useState(false);
  const ultimaCarga = useRef({ t: 0, chave: '' });
  const seq = useRef(0);

  // aplica rapidamente selects; texto (romaneio/pesquisa) espera 600 ms e exige 3+ letras na pesquisa
  useEffect(() => {
    const busca = filtros.busca.trim();
    const buscaValida =
      busca.length === 0 || busca.length >= 3 ? filtros.busca : aplicados.busca;
    const alvo = { ...filtros, busca: buscaValida };
    if (JSON.stringify(alvo) === JSON.stringify(aplicados)) return undefined;
    const textoMudou =
      alvo.rom !== aplicados.rom || alvo.busca !== aplicados.busca;
    const t = setTimeout(
      () => {
        setPagina(0);
        setAplicados(alvo);
      },
      textoMudou ? 600 : 0
    );
    return () => clearTimeout(t);
  }, [filtros, aplicados]);

  const carregar = useCallback(async () => {
    const minha = seq.current + 1;
    seq.current = minha;
    setCarregando(true);
    setErro('');
    try {
      const lote = await lerSupabasePostagem(
        montarConsultaPostagens(aplicados, pagina)
      );
      if (minha !== seq.current) return;
      const lista = Array.isArray(lote) ? lote : [];
      setTemProxima(lista.length > POSTAGENS_TAM_PAGINA);
      setLinhas(lista.slice(0, POSTAGENS_TAM_PAGINA));
      setAtualizadoEm(
        new Date().toLocaleTimeString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
      ultimaCarga.current = {
        t: Date.now(),
        chave: `${JSON.stringify(aplicados)}|${pagina}`,
      };
    } catch (e) {
      if (minha === seq.current)
        setErro(e.message || 'Erro ao carregar as postagens.');
    } finally {
      if (minha === seq.current) setCarregando(false);
    }
  }, [aplicados, pagina]);

  // Só consulta o banco com a tela aberta. Reabrir a aba em menos de 1 min com o mesmo filtro não consulta de novo.
  useEffect(() => {
    if (!ativo) return;
    const chave = `${JSON.stringify(aplicados)}|${pagina}`;
    if (
      ultimaCarga.current.chave === chave &&
      Date.now() - ultimaCarga.current.t < 60000
    )
      return;
    carregar();
  }, [ativo, aplicados, pagina, carregar]);

  // opções do filtro de transportadora (uma vez, ao abrir a tela)
  useEffect(() => {
    if (!ativo || transpOpcoes.length) return;
    lerSupabasePostagem(
      'v_transportadoras_painel?select=transportadora&order=transportadora.asc&limit=500'
    )
      .then((j) =>
        setTranspOpcoes(
          (Array.isArray(j) ? j : [])
            .map((x) => x.transportadora)
            .filter(Boolean)
        )
      )
      .catch(() => {});
  }, [ativo, transpOpcoes.length]);

  async function baixarRelatorio() {
    if (gerando) return;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dataRel)) {
      alert('Selecione a data da coleta.');
      return;
    }
    setGerando(true);
    try {
      const res = await gerarRelatorioColetasPostagem(dataRel);
      if (res.vazio) alert(`Nenhuma coleta encontrada para ${res.dataBr}.`);
      else alert(`Relatório gerado com sucesso — ${res.total} registros.`);
    } catch (e) {
      alert(`Erro ao gerar relatório: ${e.message || e}`);
    } finally {
      setGerando(false);
    }
  }

  const set = (campo) => (e) =>
    setFiltros((cur) => ({ ...cur, [campo]: e.target.value }));

  return (
    <div className="pgh">
      <style>{CSS_POSTAGENS}</style>
      <div className="pgh-title">
        <div>
          <h2>Postagens — Histórico geral</h2>
          <p>Histórico completo do Supabase · sem limite de data</p>
        </div>
        <div className="pgh-total">
          <b>{linhas.length} registro(s)</b>
          <small>
            {carregando
              ? 'Atualizando…'
              : atualizadoEm
              ? `Atualizado ${atualizadoEm}`
              : ' '}
          </small>
        </div>
      </div>

      <div className="pgh-filtros">
        <div className="pgh-campo">
          <label>STATUS</label>
          <select value={filtros.status} onChange={set('status')}>
            <option value="">Todos</option>
            <option value="verde">Aguardando postagem</option>
            <option value="amarelo">Postado — aguardando coleta</option>
            <option value="vermelho">Expedido / coletado</option>
            <option value="canc_cnt">Aguardando CNT</option>
            <option value="canc_ag">Aguardando Cancelamento</option>
            <option value="canc_bft">Aguardando Pagto BFT</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        <div className="pgh-campo">
          <label>FILIAL</label>
          <select value={filtros.filial} onChange={set('filial')}>
            <option value="">Todas</option>
            <option>0101</option>
            <option>0102</option>
            <option>1020</option>
          </select>
        </div>
        <div className="pgh-campo">
          <label>TRANSPORTADORA</label>
          <select value={filtros.transp} onChange={set('transp')}>
            <option value="">Todas</option>
            {transpOpcoes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="pgh-campo">
          <label>ROMANEIO</label>
          <input
            value={filtros.rom}
            onChange={set('rom')}
            placeholder="RM-000..."
          />
        </div>
        <div className="pgh-campo">
          <label>PESQUISAR</label>
          <input
            value={filtros.busca}
            onChange={set('busca')}
            placeholder="NF, pedido, cliente, chave..."
          />
        </div>
        <button
          type="button"
          className="pgh-atualizar"
          disabled={carregando}
          onClick={() => (pagina === 0 ? carregar() : setPagina(0))}
        >
          Atualizar
        </button>
        <div className="pgh-rel">
          <input
            type="date"
            value={dataRel}
            onChange={(e) => setDataRel(e.target.value)}
            title="Data da coleta"
          />
          <button
            type="button"
            className="pgh-relatorio"
            disabled={gerando}
            onClick={baixarRelatorio}
          >
            {gerando ? 'Gerando...' : 'Gerar relatório'}
          </button>
        </div>
      </div>

      {erro && <div className="pgh-erro">{erro}</div>}

      <div className="pgh-box">
        <table className="pgh-table">
          <thead>
            <tr>
              {COLUNAS_TABELA_POSTAGENS.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhas.length === 0 && (
              <tr>
                <td
                  colSpan={COLUNAS_TABELA_POSTAGENS.length}
                  className="pgh-vazio"
                >
                  {carregando ? 'Carregando…' : 'Nenhum registro encontrado.'}
                </td>
              </tr>
            )}
            {linhas.map((r) => {
              const rs = Array.isArray(r.rastreios) ? r.rastreios : [];
              const ehRetira = /RETIRA/i.test(String(r.transportadora || ''));
              const extras = rs.length > 3 ? rs.slice(3) : [];
              let celulaRom = '—';
              if (ehRetira) {
                if (r.retirada_em)
                  celulaRom = (
                    <span className="pgh-ret">
                      Retirada registrada · {dataPostagem(r.retirada_em)}
                    </span>
                  );
              } else if (r.romaneio) {
                celulaRom = (
                  <button
                    type="button"
                    className="pgh-romlink"
                    title="Visualizar romaneio"
                    onClick={() => setRomAberto(r.romaneio)}
                  >
                    {r.romaneio}
                  </button>
                );
              }
              return (
                <tr key={r.linha_id}>
                  <td>
                    <span className={`pgh-dot pgh-${r.situacao}`} />
                    <span className="pgh-status">{r.status_texto}</span>
                  </td>
                  <td>{r.filial || '—'}</td>
                  <td>
                    <b>{nf9Postagem(r.nf)}</b>
                  </td>
                  <td>{r.pedido || '—'}</td>
                  <td>{r.cliente_codigo || '—'}</td>
                  <td className="pgh-cli" title={r.cliente_nome || ''}>
                    {r.cliente_nome || '—'}
                  </td>
                  <td>{r.chave_nfe || '—'}</td>
                  <td className="pgh-mono">{rs[0] || '—'}</td>
                  <td className="pgh-mono">{rs[1] || '—'}</td>
                  <td className="pgh-mono">
                    {rs[2] || '—'}
                    {extras.length > 0 && (
                      <span className="pgh-mais" title={extras.join(' | ')}>
                        +{extras.length}
                      </span>
                    )}
                  </td>
                  <td>{r.transportadora || '—'}</td>
                  <td>{dataPostagem(r.data_faturamento)}</td>
                  <td>{horaPostagem(r.data_faturamento)}</td>
                  <td>{dataPostagem(r.data_limite)}</td>
                  <td>{dataPostagem(r.postado_em)}</td>
                  <td>{horaPostagem(r.postado_em)}</td>
                  <td>{r.bipador || '—'}</td>
                  <td>{r.embalador || '—'}</td>
                  <td>
                    {r.volume === null ||
                    r.volume === undefined ||
                    r.volume === ''
                      ? 1
                      : r.volume}
                  </td>
                  <td>{celulaRom}</td>
                  <td>{dataHoraPostagem(r.coleta_em)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pgh-pager">
        <button
          type="button"
          disabled={pagina === 0 || carregando}
          onClick={() => setPagina((p) => Math.max(0, p - 1))}
        >
          ‹ Anterior
        </button>
        <span>
          Página {pagina + 1} · até {POSTAGENS_TAM_PAGINA} registros · histórico
          completo do Supabase
        </span>
        <button
          type="button"
          disabled={!temProxima || carregando}
          onClick={() => setPagina((p) => p + 1)}
        >
          Próxima ›
        </button>
      </div>
      <div className="pgh-legenda">
        <span>
          <i className="pgh-dot pgh-verde" />
          Aguardando postagem
        </span>
        <span>
          <i className="pgh-dot pgh-amarelo" />
          Postado — aguardando coleta
        </span>
        <span>
          <i className="pgh-dot pgh-vermelho" />
          Expedido / coletado
        </span>
        <span>
          <i className="pgh-dot pgh-canc_cnt" />
          Cancelamento — Aguardando CNT
        </span>
        <span>
          <i className="pgh-dot pgh-canc_ag" />
          Cancelamento — Aguardando Cancelamento
        </span>
        <span>
          <i className="pgh-dot pgh-canc_bft" />
          Cancelamento — Aguardando Pagto BFT
        </span>
        <span>
          <i className="pgh-dot pgh-cancelado" />
          Cancelado
        </span>
      </div>
      {romAberto && (
        <ModalRomaneioPostagens
          codigo={romAberto}
          onClose={() => setRomAberto('')}
        />
      )}
    </div>
  );
}

/* ================================================================
   VIA LEITOR — Expedição (somente leitura) — espelho da Central
   Fontes: public.via_leitor + v_via_config_painel + v_via_obs_painel
   ================================================================ */
const VIA_DATA_MINIMA = '2026-10-13'; // início da operação (igual à Central). Para desligar, use ''.
const VIA_DIAS_ATRAS = 30;
const VIA_TAM_PAGINA = 2000;
const VIA_SELECT =
  'filial,nf,pedido,cliente_codigo,transportadora,data_saida_entrada,hora_autorizacao,data_limite,volume,total_unidades';

const VIA_COLUNAS_FILTRO = [
  ['filial', 'Filial'],
  ['nf', 'NF'],
  ['pedido', 'Pedido'],
  ['cliente_codigo', 'Cliente'],
  ['transportadora', 'Transporte'],
  ['total_unidades', 'Qtd.'],
  ['volume', 'Volume'],
  ['data_saida_entrada', 'Data fat.'],
  ['data_limite', 'Data limite'],
];

const CSS_VIA_LEITOR = `
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

function viaNormLista(v) {
  const n = String(v || '')
    .trim()
    .toUpperCase();
  if (['PAC', 'SEDEX', 'CORREIOS'].includes(n)) return 'CORREIOS';
  if (n === 'LOGGI') return 'LOGGI - POA RS';
  if (n.startsWith('TROCA')) return 'TROCA';
  return n;
}

function viaNormCfg(v) {
  const n = String(v || '')
    .trim()
    .toUpperCase();
  if (['PAC', 'SEDEX', 'CORREIOS'].includes(n)) return 'CORREIOS';
  if (n === 'LOGGI - POA RS') return 'LOGGI';
  if (n.startsWith('TROCA')) return 'TROCA';
  return n;
}

function viaSemAcento(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function viaBr(s) {
  const m = String(s || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : s || '—';
}

function viaMontarCfg(linhas) {
  const cfg = { transportadoras: [], cortes: [], feriados: [], ignorados: [] };
  (Array.isArray(linhas) ? linhas : []).forEach((l) => {
    if (l.tipo === 'transportadora')
      cfg.transportadoras.push({
        id: String(l.id),
        nome: l.nome,
        ativo: l.ativo,
      });
    else if (l.tipo === 'corte') {
      cfg.cortes.push({
        transportadora_id: String(l.transportadora_id),
        filial: l.filial || null,
        hora_corte: l.hora_corte,
        tipo_regra: l.tipo_regra,
        dias_uteis: l.dias_uteis,
        ativo: l.ativo,
      });
    } else if (l.tipo === 'feriado')
      cfg.feriados.push({ data: l.data, ativo: l.ativo });
    else if (l.tipo === 'ignorado')
      cfg.ignorados.push({ codigo: l.codigo_cliente, ativo: l.ativo });
  });
  return cfg;
}

function viaCodigoCliente(v) {
  return (
    String(v === null || v === undefined ? '' : v)
      .trim()
      .replace(/\D/g, '')
      .replace(/^0+/, '') || '0'
  );
}

function viaCorteObj(cfg, nome, filial) {
  const n = viaSemAcento(viaNormCfg(nome));
  if (!n) return null;
  const candidatos = cfg.transportadoras
    .filter((x) => x.ativo)
    .map((x) => ({ item: x, cfg: viaSemAcento(viaNormCfg(x.nome)) }))
    .filter((x) => x.cfg && (n.includes(x.cfg) || x.cfg.includes(n)))
    .sort((a, b) => b.cfg.length - a.cfg.length);
  const t = candidatos[0] && candidatos[0].item;
  if (!t) return null;
  return (
    cfg.cortes.find(
      (c) => c.transportadora_id === t.id && c.ativo && c.filial === filial
    ) ||
    cfg.cortes.find(
      (c) => c.transportadora_id === t.id && c.ativo && !c.filial
    ) ||
    null
  );
}

function viaCorteTexto(cfg, nome, filial) {
  const c = viaCorteObj(cfg, nome, filial);
  if (!c) return '—';
  if (c.tipo_regra === 'HORARIO')
    return String(c.hora_corte || '').slice(0, 5) || '—';
  if (c.tipo_regra === 'DIAS_UTEIS') {
    const um = Number(c.dias_uteis) === 1;
    return `${c.dias_uteis} dia${um ? '' : 's'} ${um ? 'útil' : 'úteis'}`;
  }
  return '—';
}

function viaParseData(s) {
  const m = String(s || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? new Date(+m[1], +m[2] - 1, +m[3], 0, 0, 0) : null;
}

function viaYmd(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(d.getDate()).padStart(2, '0')}`;
}

function viaDiaUtil(cfg, d) {
  if (!d || d.getDay() === 0 || d.getDay() === 6) return false;
  const y = viaYmd(d);
  return !cfg.feriados.some(
    (f) => f.ativo !== false && String(f.data || '').slice(0, 10) === y
  );
}

function viaProximoUtil(cfg, d) {
  const x = new Date(d);
  do {
    x.setDate(x.getDate() + 1);
  } while (!viaDiaUtil(cfg, x));
  return x;
}

function viaSomaUteis(cfg, d, n) {
  let x = new Date(d);
  for (let i = 0; i < n; i += 1) x = viaProximoUtil(cfg, x);
  return x;
}

function viaDataLimiteCalc(cfg, x) {
  const c = viaCorteObj(cfg, x.transporte, x.filial);
  let d = viaParseData(x.data);
  if (!c || !d) return '';
  if (c.tipo_regra === 'DIAS_UTEIS')
    return viaYmd(viaSomaUteis(cfg, d, Math.max(0, Number(c.dias_uteis || 0))));
  if (!viaDiaUtil(cfg, d)) {
    while (!viaDiaUtil(cfg, d)) d.setDate(d.getDate() + 1);
    return viaYmd(d);
  }
  const corte = String(c.hora_corte || '00:00').slice(0, 5);
  const hora = String(x.hora || '00:00').slice(0, 5);
  if (hora && corte && hora > corte) d = viaProximoUtil(cfg, d);
  return viaYmd(d);
}

function viaTempoRestante(cfg, x, agora) {
  const c = viaCorteObj(cfg, x.transporte, x.filial);
  if (!c) return '—';
  const lim = viaParseData(x.data_limite || viaDataLimiteCalc(cfg, x));
  if (!lim) return '—';
  let hm = '18:18';
  if (c.tipo_regra === 'HORARIO')
    hm = String(c.hora_corte || '00:00').slice(0, 5);
  const [h, m] = hm.split(':').map(Number);
  lim.setHours(h, m, 0, 0);
  const ms = lim - agora;
  if (ms <= 0) return 'ATRASADO';
  const min = Math.floor(ms / 60000);
  const dias = Math.floor(min / 1440);
  const horas = Math.floor((min % 1440) / 60);
  return dias > 0 ? `${dias}d ${horas}h` : `${horas}h ${min % 60}min`;
}

// Data limite exibida: em regra de dias úteis recalcula; senão usa a do banco.
function viaDataLimiteLinha(cfg, x) {
  const obj = {
    transporte: x.transportadora,
    filial: x.filial,
    data: x.data_saida_entrada,
    hora: x.hora_saida,
    data_limite: x.data_limite,
  };
  const ct = viaCorteTexto(cfg, x.transportadora, x.filial).toLowerCase();
  const uteis =
    ct.includes('útil') || ct.includes('uteis') || ct.includes('úteis');
  const calc = viaDataLimiteCalc(cfg, obj);
  return {
    obj,
    dl: uteis ? calc || x.data_limite || '' : x.data_limite || calc || '',
  };
}

function viaValorCampo(cfg, x, campo) {
  if (campo === 'data_limite') return viaDataLimiteLinha(cfg, x).dl;
  return x && x[campo] !== null && x[campo] !== undefined ? x[campo] : '';
}

function viaComparavel(v, campo) {
  if (campo === 'data_saida_entrada' || campo === 'data_limite') {
    const t = new Date(v).getTime();
    return Number.isFinite(t) ? t : 0;
  }
  if (campo === 'volume' || campo === 'total_unidades') {
    const n = Number(
      String(v === null || v === undefined ? '' : v).replace(',', '.')
    );
    return Number.isFinite(n) ? n : 0;
  }
  return String(v === null || v === undefined ? '' : v)
    .trim()
    .toLocaleLowerCase('pt-BR');
}

// lê em fatias de até 1000 linhas (limite padrão do Supabase), até `total` linhas
async function viaLerLote(caminho, total, inicio) {
  let out = [];
  while (out.length < total) {
    const n = Math.min(1000, total - out.length);
    const lote = await lerSupabasePostagem(
      `${caminho}&limit=${n}&offset=${(inicio || 0) + out.length}`
    );
    const arr = Array.isArray(lote) ? lote : [];
    out = out.concat(arr);
    if (arr.length < n) break;
  }
  return out;
}

function viaNormalizarLinha(x) {
  return {
    ...x,
    transportadora: viaNormLista(x.transportadora),
    hora_saida: String(x.hora_autorizacao || '').slice(0, 5),
  };
}

function viaCaminhoLista() {
  const corte = VIA_DATA_MINIMA
    ? `&data_saida_entrada=gte.${encodeURIComponent(
        `${VIA_DATA_MINIMA}T00:00:00-03:00`
      )}`
    : '';
  return `via_leitor?select=${VIA_SELECT}&filial=in.(0101,0102,1020)${corte}&order=data_saida_entrada.asc,nf.asc,pedido.asc`;
}

// Regra única do Via Leitor: sem cliente ignorado e com data limite de hoje ou anterior (até VIA_DIAS_ATRAS dias).
// É usada pela tela e pelos cards do dashboard, para os números serem sempre os mesmos.
function viaFiltrarPendentes(base, cfg) {
  const ignorados = new Set(
    cfg.ignorados.filter((i) => i.ativo).map((i) => viaCodigoCliente(i.codigo))
  );
  const a = base.filter(
    (x) => !ignorados.size || !ignorados.has(viaCodigoCliente(x.cliente_codigo))
  );
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const hoje = fmt.format(new Date());
  const ini = fmt.format(new Date(Date.now() - VIA_DIAS_ATRAS * 86400000));
  return a.filter((x) => {
    const dl = String(viaDataLimiteLinha(cfg, x).dl || '').slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dl)) return true; // sem data limite reconhecível: não esconde
    return dl <= hoje && dl >= ini;
  });
}

// Totais para os cards do dashboard: pedidos a expedir por empresa (BB = 1020; Equipatech = 0101/0102).
async function viaResumoDashboard() {
  const [linhas, cfgLinhas] = await Promise.all([
    viaLerLote(viaCaminhoLista(), 10000, 0),
    lerSupabasePostagem('v_via_config_painel?select=*&limit=5000'),
  ]);
  const cfg = viaMontarCfg(cfgLinhas);
  if (!cfg.transportadoras.length)
    throw new Error('regras de corte indisponíveis (rode o bloco 11 do SQL)');
  const pend = viaFiltrarPendentes(linhas.map(viaNormalizarLinha), cfg);
  const agora = Date.now();
  const r = { bb: { total: 0, atrasados: 0 }, eq: { total: 0, atrasados: 0 } };
  pend.forEach((x) => {
    const g = String(x.filial) === '1020' ? r.bb : r.eq;
    const { obj, dl } = viaDataLimiteLinha(cfg, x);
    g.total += 1;
    if (
      viaTempoRestante(cfg, { ...obj, data_limite: dl }, agora) === 'ATRASADO'
    )
      g.atrasados += 1;
  });
  return r;
}

const VIA_FILTROS_VAZIOS = { filial: '', transp: '', busca: '' };

function TelaViaLeitor({ ativo }) {
  const [base, setBase] = useState([]);
  const [cfg, setCfg] = useState({
    transportadoras: [],
    cortes: [],
    feriados: [],
    ignorados: [],
  });
  const [obs, setObs] = useState({});
  const [pagina, setPagina] = useState(0);
  const [temProxima, setTemProxima] = useState(false);
  const [filtros, setFiltros] = useState(VIA_FILTROS_VAZIOS);
  const [coluna, setColuna] = useState('');
  const [valorColuna, setValorColuna] = useState('');
  const [ordem, setOrdem] = useState({ campo: 'data_saida_entrada', dir: 1 });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [avisoCfg, setAvisoCfg] = useState('');
  const [atualizadoEm, setAtualizadoEm] = useState('');
  const [tick, setTick] = useState(0);
  const ultimaCarga = useRef({ t: 0, pagina: -1 });
  const seq = useRef(0);

  const carregar = useCallback(async () => {
    const minha = seq.current + 1;
    seq.current = minha;
    setCarregando(true);
    setErro('');
    try {
      const caminho = viaCaminhoLista();
      const [linhas, cfgLinhas, obsLinhas] = await Promise.all([
        viaLerLote(caminho, VIA_TAM_PAGINA + 1, pagina * VIA_TAM_PAGINA),
        lerSupabasePostagem('v_via_config_painel?select=*&limit=5000').then(
          (j) => ({ ok: true, j }),
          (e) => ({ ok: false, e })
        ),
        viaLerLote(
          'v_via_obs_painel?select=filial,nf,pedido,observacao&order=filial.asc,nf.asc',
          20000,
          0
        ).catch(() => []),
      ]);
      if (minha !== seq.current) return;
      setTemProxima(linhas.length > VIA_TAM_PAGINA);
      setBase(linhas.slice(0, VIA_TAM_PAGINA).map(viaNormalizarLinha));
      if (cfgLinhas.ok) {
        setCfg(viaMontarCfg(cfgLinhas.j));
        setAvisoCfg('');
      } else {
        setAvisoCfg(
          `Não foi possível carregar as regras de corte (rode o bloco 11 do SQL no Supabase). ${
            cfgLinhas.e.message || ''
          }`
        );
      }
      const mapa = {};
      obsLinhas.forEach((o) => {
        mapa[`${o.filial}|${o.nf}|${o.pedido || ''}`] = o.observacao || '';
        mapa[`${o.filial}|${o.nf}`] = o.observacao || '';
      });
      setObs(mapa);
      setAtualizadoEm(
        new Date().toLocaleTimeString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
      ultimaCarga.current = { t: Date.now(), pagina };
    } catch (e) {
      if (minha === seq.current) {
        setBase([]);
        setErro(
          `Não foi possível carregar os dados da VIEW Via Leitor. ${
            e.message || ''
          }`
        );
      }
    } finally {
      if (minha === seq.current) setCarregando(false);
    }
  }, [pagina]);

  // só consulta com a tela aberta; reabrir em menos de 1 min na mesma página não consulta de novo
  useEffect(() => {
    if (!ativo) return;
    if (
      ultimaCarga.current.pagina === pagina &&
      Date.now() - ultimaCarga.current.t < 60000
    )
      return;
    carregar();
  }, [ativo, pagina, carregar]);

  // atualiza o "tempo restante" a cada minuto, sem consultar o banco
  useEffect(() => {
    if (!ativo) return undefined;
    const t = setInterval(() => setTick((n) => n + 1), 60000);
    return () => clearInterval(t);
  }, [ativo]);

  const nomesTransp = useMemo(
    () =>
      [...new Set(base.map((x) => x.transportadora).filter(Boolean))].sort(),
    [base]
  );

  const linhas = useMemo(() => {
    void tick; // o recálculo a cada minuto atualiza a janela de datas
    let a = viaFiltrarPendentes(base, cfg);
    if (filtros.filial)
      a = a.filter((x) => filtros.filial.split(',').includes(String(x.filial)));
    if (filtros.transp)
      a = a.filter(
        (x) => viaNormLista(x.transportadora) === viaNormLista(filtros.transp)
      );
    const q = filtros.busca.trim().toLowerCase();
    if (q)
      a = a.filter((x) =>
        `${x.nf} ${x.pedido} ${x.cliente_codigo} ${x.transportadora}`
          .toLowerCase()
          .includes(q)
      );

    if (coluna && valorColuna) {
      const busca = valorColuna.trim().toLocaleLowerCase('pt-BR');
      a = a.filter((x) =>
        String(viaValorCampo(cfg, x, coluna))
          .toLocaleLowerCase('pt-BR')
          .includes(busca)
      );
    }
    if (ordem.campo) {
      a = [...a].sort((x, y) => {
        const A = viaComparavel(
          viaValorCampo(cfg, x, ordem.campo),
          ordem.campo
        );
        const B = viaComparavel(
          viaValorCampo(cfg, y, ordem.campo),
          ordem.campo
        );
        return (A < B ? -1 : A > B ? 1 : 0) * ordem.dir;
      });
    }
    return a;
  }, [base, cfg, filtros, coluna, valorColuna, ordem, tick]);

  const agora = Date.now();
  const setF = (campo) => (e) =>
    setFiltros((cur) => ({ ...cur, [campo]: e.target.value }));
  const ordenar = (campo) =>
    setOrdem((o) =>
      o.campo === campo ? { campo, dir: -o.dir } : { campo, dir: 1 }
    );
  const limpar = () => {
    setColuna('');
    setValorColuna('');
    setOrdem({ campo: 'data_saida_entrada', dir: 1 });
  };
  const cabecalhos = [
    ['', ''],
    ['filial', 'FILIAL'],
    ['nf', 'NF'],
    ['pedido', 'PEDIDO'],
    ['cliente_codigo', 'CLIENTE'],
    ['transportadora', 'TRANSPORTE'],
    ['total_unidades', 'QTD.'],
    ['volume', 'VOLUME'],
    ['data_saida_entrada', 'DATA FAT.'],
    ['', 'HORÁRIO AUT.'],
    ['', 'CORTE'],
    ['data_limite', 'DATA LIMITE'],
    ['', 'TEMPO RESTANTE'],
    ['', 'OBSERVAÇÃO'],
  ];

  return (
    <div className="vlg">
      <style>{CSS_VIA_LEITOR}</style>
      <div className="vlg-toolbar">
        <div className="vlg-title">
          <strong>Via Leitor — Expedição</strong>
          <span>
            Somente pendentes com data limite hoje ou anterior · VIEW Supabase ·
            somente leitura
            {atualizadoEm ? ` · atualizado ${atualizadoEm}` : ''}
          </span>
        </div>
        <div className="vlg-actions">
          <label>VISUALIZAR</label>
          <select value="pendentes" onChange={() => {}}>
            <option value="pendentes">
              Pendentes de envio — últimos 10 dias
            </option>
          </select>
          <button
            type="button"
            className="vlg-btn"
            disabled={carregando}
            onClick={() => (pagina === 0 ? carregar() : setPagina(0))}
          >
            ↻ Atualizar
          </button>
        </div>
      </div>

      <div className="vlg-filtros">
        <div className="vlg-campo vlg-f-filial">
          <label>FILIAL</label>
          <select value={filtros.filial} onChange={setF('filial')}>
            <option value="">Todas</option>
            <option value="1020">BB Baterias · 1020</option>
            <option value="0101,0102">Equipatech · 0101/0102</option>
            <option value="0101">0101</option>
            <option value="0102">0102</option>
          </select>
        </div>
        <div className="vlg-campo vlg-f-transp">
          <label>TRANSPORTADORA</label>
          <select value={filtros.transp} onChange={setF('transp')}>
            <option value="">Todas</option>
            {nomesTransp.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="vlg-campo vlg-f-busca">
          <label>PESQUISAR</label>
          <input
            value={filtros.busca}
            onChange={setF('busca')}
            placeholder="NF, pedido, cliente ou transportadora"
          />
        </div>
        <div className="vlg-campo vlg-f-col">
          <label>FILTRAR COLUNA</label>
          <select value={coluna} onChange={(e) => setColuna(e.target.value)}>
            <option value="">Selecione...</option>
            {VIA_COLUNAS_FILTRO.map(([v, t]) => (
              <option key={v} value={v}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="vlg-campo vlg-f-col">
          <label>CONTÉM</label>
          <input
            value={valorColuna}
            onChange={(e) => setValorColuna(e.target.value)}
            placeholder="Digite para filtrar"
            autoComplete="off"
          />
        </div>
        <button type="button" className="vlg-btn" onClick={limpar}>
          Limpar
        </button>
        <span className="vlg-hint">
          Clique no cabeçalho para ordenar · padrão: mais antigos primeiro
        </span>
        <div className="vlg-total">
          <span>PENDENTES</span>
          <strong>{linhas.length}</strong>
        </div>
      </div>

      {erro && <div className="vlg-erro">{erro}</div>}
      {avisoCfg && <div className="vlg-aviso">{avisoCfg}</div>}

      <div className="vlg-grid">
        {linhas.length === 0 ? (
          <div className="vlg-vazio">
            {carregando
              ? 'Carregando pendentes do Via Leitor...'
              : 'Nenhum pedido pendente de envio encontrado neste filtro.'}
          </div>
        ) : (
          <table className="vlg-table">
            <thead>
              <tr>
                {cabecalhos.map(([campo, titulo], i) => (
                  <th
                    key={`${campo}-${titulo}-${i}`}
                    className={
                      campo
                        ? `vlg-ord${
                            ordem.campo === campo
                              ? ordem.dir === 1
                                ? ' vlg-asc'
                                : ' vlg-desc'
                              : ''
                          }`
                        : ''
                    }
                    onClick={campo ? () => ordenar(campo) : undefined}
                  >
                    {titulo}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {linhas.map((x) => {
                const { obj, dl } = viaDataLimiteLinha(cfg, x);
                const tempo = viaTempoRestante(
                  cfg,
                  { ...obj, data_limite: dl },
                  agora
                );
                const atrasado = String(tempo).toUpperCase() === 'ATRASADO';
                const o =
                  obs[`${x.filial}|${x.nf}|${x.pedido || ''}`] ||
                  obs[`${x.filial}|${x.nf}`] ||
                  '';
                return (
                  <tr key={`${x.filial}|${x.nf}|${x.pedido}`}>
                    <td className="vlg-st">
                      <span
                        className={`vlg-dot ${atrasado ? 'late' : 'ok'}`}
                        title={atrasado ? 'Fora do prazo' : 'Dentro do prazo'}
                      />
                    </td>
                    <td>{x.filial}</td>
                    <td className="vlg-mono">{x.nf}</td>
                    <td className="vlg-mono">{x.pedido}</td>
                    <td className="vlg-mono">{x.cliente_codigo || '—'}</td>
                    <td>{x.transportadora || '—'}</td>
                    <td className="vlg-mono">
                      {x.total_unidades === null ||
                      x.total_unidades === undefined
                        ? '—'
                        : x.total_unidades}
                    </td>
                    <td className="vlg-mono">
                      {x.volume === null || x.volume === undefined
                        ? '—'
                        : x.volume}
                    </td>
                    <td>{viaBr(x.data_saida_entrada)}</td>
                    <td className="vlg-mono">{x.hora_saida || '—'}</td>
                    <td className="vlg-mono">
                      {viaCorteTexto(cfg, x.transportadora, x.filial)}
                    </td>
                    <td className="vlg-mono">{dl ? viaBr(dl) : '—'}</td>
                    <td className="vlg-mono">{tempo}</td>
                    <td className="vlg-obs">
                      <span title={o}>{o || '—'}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="vlg-pager">
        <button
          type="button"
          disabled={pagina === 0 || carregando}
          onClick={() => setPagina((p) => Math.max(0, p - 1))}
        >
          ‹ Anterior
        </button>
        <span>Página {pagina + 1} · XMLS</span>
        <button
          type="button"
          disabled={!temProxima || carregando}
          onClick={() => setPagina((p) => p + 1)}
        >
          Próxima ›
        </button>
      </div>
      <div className="vlg-legenda">
        <span>
          <i className="vlg-dot ok" />
          Dentro do prazo
        </span>
        <span>
          <i className="vlg-dot late" />
          Fora do prazo
        </span>
      </div>
    </div>
  );
}

/* ================================================================
   CANCELAMENTOS — registro de NFs a cancelar (banco no Supabase)
   Leitura: view v_cancelamentos_painel · Gravação: funções cancelamento_* (bloco 12 do SQL)
   NF com status "Cancelado" some do Via Leitor e vira "Cancelado" nas Postagens (blocos 13 e 14).
   ================================================================ */
const CANC_FILIAIS = ['0101', '0102', '0104', '0105', '1020', '1030', '1040'];
const CANC_MOTIVOS = [
  'Bloqueado na UF',
  'Cancelado no ML',
  'ICMS',
  'Desistência',
  'Produto com Defeito',
  'Endereço Insuficiente',
  'Pedido Duplicado',
  'Cancelado no Magalu',
  'CST',
  'Alterar o Transporte',
  'Erro de Cadastro',
  'Extravio',
  'Erro no CEP',
  'Teste',
  'Faturar com outro serial',
  'Outro',
];
const CANC_ST_CNT = 'Aguardando CNT';
// Filiais com processo de CNT antes do cancelamento: o status CNT é marcado por quem vai cancelar (botão "CNT")
const CANC_FILIAIS_CNT = ['0104', '0105', '1030', '1040'];
const CANC_ST_AG = 'Aguardando Cancelamento';
const CANC_ST_BFT = 'Aguardando Pagto BFT';
const CANC_ST_OK = 'Cancelado';

const CancIco = ({ d }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {d.map((x) => (
      <path key={x} d={x} />
    ))}
  </svg>
);
const CANC_ICO_CHECK = ['M20 6 9 17l-5-5'];
const CANC_ICO_EDIT = [
  'M12 20h9',
  'M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z',
];
const CANC_ICO_TRASH = [
  'M3 6h18',
  'M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6',
  'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
];

const CSS_CANCELAMENTOS = `
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

function cancHojeBr() {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());
}

function cancIsoParaBr(iso) {
  const m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : '—';
}

function cancBrParaIso(br) {
  const m = String(br || '')
    .trim()
    .match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  return m ? `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` : '';
}

// Prazo para cancelar: 1 hora a partir da solicitação (a hora vem gravada do banco)
const CANC_PRAZO_MS = 60 * 60 * 1000;

function cancTs(v) {
  if (!v) return null;
  const t = String(v)
    .trim()
    .replace(' ', 'T')
    .replace(/(\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)([+-]\d{2})$/, '$1$2:00');
  const d = new Date(t);
  return Number.isNaN(d.getTime()) ? null : d;
}

function cancDataHora(v) {
  const d = cancTs(v);
  if (!d) return '—';
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
    .format(d)
    .replace(',', '');
}

function cancDuracao(ms) {
  const m = Math.max(0, Math.round(ms / 60000));
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return m % 60 ? `${h}h ${m % 60}min` : `${h}h`;
  return `${Math.floor(h / 24)}d ${h % 24}h`;
}

function cancPrazoFim(c) {
  const sol = cancTs(c.solicitado_em);
  if (!sol) return null;
  return cancTs(c.prazo_em) || new Date(sol.getTime() + CANC_PRAZO_MS);
}

function cancAtrasado(c, agora) {
  const fim = cancPrazoFim(c);
  return !!fim && c.status !== CANC_ST_OK && agora > fim.getTime();
}

function CancPrazo({ c, agora }) {
  const sol = cancTs(c.solicitado_em);
  const fim = cancPrazoFim(c);
  if (!sol || !fim) return <span style={{ color: '#8a97a0' }}>—</span>;
  if (c.status === CANC_ST_OK) {
    const feito = cancTs(c.cancelado_em);
    if (!feito) return <span style={{ color: '#8a97a0' }}>—</span>;
    const ok = feito.getTime() <= fim.getTime();
    return (
      <span className={`cnl-prazo ${ok ? 'ok' : 'atraso'}`}>
        {ok ? '✔' : '⏰'} {cancDuracao(feito - sol)}{' '}
        {ok ? '(no prazo)' : '(fora do prazo)'}
      </span>
    );
  }
  const resta = fim.getTime() - agora;
  if (resta >= 0)
    return (
      <span className={`cnl-prazo ${resta < 15 * 60000 ? 'aviso' : 'ok'}`}>
        faltam {cancDuracao(resta)}
      </span>
    );
  return (
    <span className="cnl-prazo atraso">⏰ atrasado {cancDuracao(-resta)}</span>
  );
}

/* ---- Texto pronto para cancelamentos BFT (copiar e colar no grupo) ---- */
const CANC_BFT_CHAVE = 'bbdi_canc_bft_v1';
const CANC_BFT_PADRAO = {
  financeiro: 'Jessica Kerber - Grupo BBDI',
  modelo:
    'Excluir NF: {nf} Pedido: {pedido} - {motivo}\nesse é BFT {financeiro}',
};

function cancBftLer() {
  try {
    const j = JSON.parse(localStorage.getItem(CANC_BFT_CHAVE) || 'null');
    if (j && typeof j === 'object') {
      return {
        financeiro:
          typeof j.financeiro === 'string'
            ? j.financeiro
            : CANC_BFT_PADRAO.financeiro,
        modelo:
          typeof j.modelo === 'string' && j.modelo.trim()
            ? j.modelo
            : CANC_BFT_PADRAO.modelo,
      };
    }
  } catch (e) {
    // sem armazenamento: usa o padrão
  }
  return { ...CANC_BFT_PADRAO };
}

function cancBftGravar(cfg) {
  try {
    localStorage.setItem(CANC_BFT_CHAVE, JSON.stringify(cfg));
  } catch (e) {
    // sem armazenamento: vale só nesta sessão
  }
}

function cancBftMontar(c, cfg) {
  const nf = String(c.nf || '').trim();
  const nfFmt = /^\d+$/.test(nf) ? nf.padStart(9, '0') : nf;
  const fin = String(cfg.financeiro || '')
    .split(/[\n,;]+/)
    .map((n) => n.trim())
    .filter(Boolean)
    .join(' ');
  return String(cfg.modelo || CANC_BFT_PADRAO.modelo)
    .split('{nf}')
    .join(nfFmt)
    .split('{pedido}')
    .join(String(c.pedido || '').trim())
    .split('{motivo}')
    .join(String(c.motivo || '').trim())
    .split('{filial}')
    .join(String(c.filial || '').trim())
    .split('{solicitante}')
    .join(String(c.solicitante || '').trim())
    .split('{financeiro}')
    .join(fin);
}

async function cancCopiar(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch (e) {
    try {
      const ta = document.createElement('textarea');
      ta.value = texto;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e2) {
      return false;
    }
  }
}

async function cancResumoDashboard() {
  const linhas = await viaLerLote(
    'v_cancelamentos_painel?select=id,status,solicitado_em,prazo_em&status=neq.Cancelado&order=id.desc',
    20000,
    0
  );
  const agora = Date.now();
  const r = {
    total: 0,
    atrasados: 0,
    cnt: 0,
    cntAtr: 0,
    ag: 0,
    agAtr: 0,
    bft: 0,
  };
  linhas.forEach((c) => {
    const atr = cancAtrasado(c, agora);
    r.total += 1;
    if (atr) r.atrasados += 1;
    if (c.status === CANC_ST_CNT) {
      r.cnt += 1;
      if (atr) r.cntAtr += 1;
    } else if (c.status === CANC_ST_BFT) {
      r.bft += 1;
    } else {
      r.ag += 1;
      if (atr) r.agAtr += 1;
    }
  });
  return r;
}

async function cancRpc(nome, corpo) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${nome}`, {
    method: 'POST',
    headers: {
      ...headersSupabasePostagem(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(corpo),
  });
  if (!r.ok) {
    let msg = `HTTP ${r.status}`;
    try {
      const j = await r.json();
      msg = j.message || msg;
      if (r.status === 404)
        msg += ' — rode os blocos 12 a 16 do SQL no Supabase.';
    } catch (e) {
      // sem detalhe
    }
    throw new Error(msg);
  }
  const txt = await r.text();
  return txt ? JSON.parse(txt) : null;
}

function CancStatus({ status }) {
  const cls =
    status === CANC_ST_OK
      ? 'ok'
      : status === CANC_ST_BFT
      ? 'bft'
      : status === CANC_ST_AG
      ? 'ag'
      : 'cnt';
  return <span className={`cnl-st ${cls}`}>{status || '—'}</span>;
}

const CANC_FORM_VAZIO = {
  data: '',
  filial: '',
  pedido: '',
  nf: '',
  solicitante: '',
  motivo: '',
};

function TelaCancelamentos({ ativo }) {
  const [itens, setItens] = useState([]);
  const [aba, setAba] = useState('lancar');
  const [form, setForm] = useState({ ...CANC_FORM_VAZIO, data: cancHojeBr() });
  const [editId, setEditId] = useState(null);
  const [fStatus, setFStatus] = useState('todos');
  const [fFilial, setFFilial] = useState('');
  const [ordNf, setOrdNf] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const [toast, setToast] = useState(null);
  const [confirmar, setConfirmar] = useState(null);
  const [analise, setAnalise] = useState(null);
  const [buscandoNf, setBuscandoNf] = useState(false);
  const [fixos, setFixos] = useState([]);
  const [outroSol, setOutroSol] = useState(false);
  const [gerSol, setGerSol] = useState(null);
  const [bft, setBft] = useState(null);
  const filialManual = useRef(false);
  const seqAnalise = useRef(0);
  const [agora, setAgora] = useState(() => Date.now());
  const ultimaCarga = useRef(0);

  const avisar = useCallback((texto, tipo) => {
    setToast({ texto, tipo: tipo || 'ok' });
    setTimeout(() => setToast(null), 3200);
  }, []);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro('');
    try {
      const lista = await viaLerLote(
        'v_cancelamentos_painel?select=*&order=id.desc',
        20000,
        0
      );
      setItens(lista);
      ultimaCarga.current = Date.now();
    } catch (e) {
      setErro(
        `Não foi possível carregar os cancelamentos. ${
          e.message || ''
        } (rode o bloco 12 do SQL no Supabase)`
      );
    } finally {
      setCarregando(false);
    }
    try {
      const f = await lerSupabasePostagem(
        'v_cancelamento_solicitantes_fixos?select=nome&order=nome'
      );
      setFixos(Array.isArray(f) ? f.map((x) => x.nome) : []);
    } catch (e) {
      setFixos([]); // sem o bloco 16 do SQL o campo continua livre para digitar
    }
  }, []);

  useEffect(() => {
    if (!ativo) return undefined;
    if (Date.now() - ultimaCarga.current >= 30000) carregar();
    const t = setInterval(carregar, 60000);
    return () => clearInterval(t);
  }, [ativo, carregar]);

  // Ao digitar NF e/ou Pedido: busca na expedição (tabela xmls), preenche a filial e avisa quando NF e Pedido não batem
  useEffect(() => {
    const nf = form.nf.trim();
    const ped = form.pedido.trim();
    if (!ativo || (!nf && !ped)) {
      setAnalise(null);
      return undefined;
    }
    const seq = ++seqAnalise.current;
    const t = setTimeout(async () => {
      setBuscandoNf(true);
      try {
        const r = await cancRpc('cancelamento_analisar', {
          p_nf: nf,
          p_pedido: ped,
        });
        if (seq !== seqAnalise.current) return;
        setAnalise(r);
        setForm((cur) => {
          const novo = { ...cur };
          if (r.filial && !filialManual.current) novo.filial = r.filial;
          if (!cur.pedido.trim() && r.pedido) novo.pedido = r.pedido;
          if (!cur.nf.trim() && r.nf)
            novo.nf = String(r.nf).replace(/^0+(?=\d)/, '');
          return novo;
        });
      } catch (e) {
        if (seq === seqAnalise.current)
          setAnalise({ erro: e.message || 'Erro' });
      } finally {
        if (seq === seqAnalise.current) setBuscandoNf(false);
      }
    }, 450);
    return () => clearTimeout(t);
  }, [ativo, form.nf, form.pedido]);

  useEffect(() => {
    if (!ativo) return undefined;
    setAgora(Date.now());
    const t = setInterval(() => setAgora(Date.now()), 30000);
    return () => clearInterval(t);
  }, [ativo]);

  const pendentes = useMemo(
    () => itens.filter((c) => c.status !== CANC_ST_OK),
    [itens]
  );
  const cancelados = useMemo(
    () => itens.filter((c) => c.status === CANC_ST_OK),
    [itens]
  );
  const qtd = (st) => itens.filter((c) => c.status === st).length;
  const qtdAtencao = pendentes.filter((c) => c.atencao).length;
  const qtdAtrasados = pendentes.filter((c) => cancAtrasado(c, agora)).length;
  const hoje = cancHojeBr();
  const paraHoje = pendentes.filter(
    (c) => cancIsoParaBr(c.data_cancelamento) === hoje
  ).length;

  const setCampo = (campo) => (e) => {
    const valor = e.target.value;
    setForm((cur) => {
      return { ...cur, [campo]: valor };
    });
  };

  function editar(c) {
    if (c.status === CANC_ST_OK) {
      avisar('Cancelamento já concluído — não pode mais ser editado.', 'err');
      return;
    }
    filialManual.current = true;
    setOutroSol(false);
    setEditId(c.id);
    setForm({
      data: cancIsoParaBr(c.data_cancelamento),
      filial: c.filial || '',
      pedido: c.pedido || '',
      nf: c.nf || '',
      solicitante: c.solicitante || '',
      motivo: c.motivo || '',
    });
    setAba('lancar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function limparForm() {
    filialManual.current = false;
    setOutroSol(false);
    setAnalise(null);
    setEditId(null);
    setForm({ ...CANC_FORM_VAZIO, data: cancHojeBr() });
  }

  async function salvar(e) {
    e.preventDefault();
    if (salvando) return;
    const iso = cancBrParaIso(form.data);
    if (!iso || !form.filial || !form.pedido.trim() || !form.nf.trim()) {
      avisar('Preencha Data (dd/mm/aaaa), Filial, Pedido e NF.', 'err');
      return;
    }
    if (!form.solicitante.trim() || form.solicitante === '__outro') {
      avisar('Preencha o Solicitante.', 'err');
      return;
    }
    if (!form.motivo) {
      avisar('Preencha o Motivo.', 'err');
      return;
    }
    setSalvando(true);
    try {
      await cancRpc('cancelamento_salvar', {
        p_id: editId,
        p_data: iso,
        p_filial: form.filial,
        p_pedido: form.pedido,
        p_nf: form.nf,
        p_solicitante: form.solicitante,
        p_responsavel: '',
        p_motivo: form.motivo,
      });
      avisar(editId ? 'Registro atualizado!' : 'Cancelamento salvo!');
      limparForm();
      await carregar();
    } catch (err) {
      avisar(err.message || 'Erro ao salvar.', 'err');
    } finally {
      setSalvando(false);
    }
  }

  async function abrirGerSol() {
    setGerSol({ lista: [], busca: '', novo: '', carregando: true });
    try {
      const l = await lerSupabasePostagem(
        'v_cancelamento_solicitantes_sugestao?select=nome,qtd,fixo&order=fixo.desc,qtd.desc'
      );
      setGerSol(
        (g) =>
          g && { ...g, lista: Array.isArray(l) ? l : [], carregando: false }
      );
    } catch (e) {
      setGerSol(null);
      avisar(
        `Não foi possível carregar os nomes: ${
          e.message || ''
        } (confira se o bloco 16 do SQL foi rodado no Supabase)`,
        'err'
      );
    }
  }

  async function alternarFixo(nome, fixo) {
    setGerSol(
      (g) =>
        g && {
          ...g,
          lista: g.lista.map((i) => (i.nome === nome ? { ...i, fixo } : i)),
        }
    );
    try {
      await cancRpc('cancelamento_solicitante_fixar', {
        p_nome: nome,
        p_fixo: fixo,
      });
      setFixos((cur) =>
        fixo
          ? cur.includes(nome)
            ? cur
            : [...cur, nome].sort((a, b) => a.localeCompare(b, 'pt-BR'))
          : cur.filter((n) => n !== nome)
      );
    } catch (err) {
      setGerSol(
        (g) =>
          g && {
            ...g,
            lista: g.lista.map((i) =>
              i.nome === nome ? { ...i, fixo: !fixo } : i
            ),
          }
      );
      avisar(err.message || 'Erro ao salvar o nome.', 'err');
    }
  }

  async function adicionarNomeFixo() {
    const nome = (gerSol.novo || '').trim().replace(/\s+/g, ' ');
    if (!nome) return;
    try {
      await cancRpc('cancelamento_solicitante_fixar', {
        p_nome: nome,
        p_fixo: true,
      });
      setGerSol(
        (g) =>
          g && {
            ...g,
            novo: '',
            lista: [
              { nome, qtd: 0, fixo: true },
              ...g.lista.filter(
                (i) => i.nome.toLowerCase() !== nome.toLowerCase()
              ),
            ],
          }
      );
      setFixos((cur) =>
        cur.some((n) => n.toLowerCase() === nome.toLowerCase())
          ? cur
          : [...cur, nome].sort((a, b) => a.localeCompare(b, 'pt-BR'))
      );
    } catch (err) {
      avisar(err.message || 'Erro ao salvar o nome.', 'err');
    }
  }

  function abrirBft(c) {
    const cfg = cancBftLer();
    setBft({ c, cfg, texto: cancBftMontar(c, cfg), config: false });
  }

  async function copiarBft() {
    const ok = await cancCopiar(bft.texto);
    avisar(
      ok
        ? 'Mensagem copiada! Cole no grupo.'
        : 'Não consegui copiar — selecione o texto e use Ctrl+C.',
      ok ? 'ok' : 'err'
    );
  }

  function mudarStatus(c, status, texto) {
    setConfirmar({
      titulo: 'Confirmar',
      texto: `${texto} — Pedido ${c.pedido} · NF ${c.nf}?`,
      botao: 'Confirmar',
      acao: async () => {
        await cancRpc('cancelamento_status', { p_id: c.id, p_status: status });
        avisar(
          status === CANC_ST_OK
            ? 'Cancelado! A NF sai do Via Leitor.'
            : `${status}!`
        );
        await carregar();
        if (status === CANC_ST_BFT) abrirBft(c);
      },
    });
  }

  function excluir(c) {
    setConfirmar({
      titulo: 'Confirmar exclusão',
      texto: `Tem certeza que deseja excluir o registro do pedido ${c.pedido}? Se estava Cancelado, a NF volta ao Via Leitor.`,
      botao: 'Excluir',
      perigo: true,
      acao: async () => {
        await cancRpc('cancelamento_excluir', { p_id: c.id });
        avisar('Excluído!');
        await carregar();
      },
    });
  }

  async function executarConfirmacao() {
    const c = confirmar;
    setConfirmar(null);
    try {
      await c.acao();
    } catch (err) {
      avisar(err.message || 'Erro.', 'err');
    }
  }

  const tabela = (lista, tipo) => {
    if (!lista.length) {
      return (
        <div className="cnl-vazio">
          {carregando
            ? 'Carregando…'
            : tipo === 'pend'
            ? 'Nenhum cancelamento pendente neste filtro.'
            : 'Nenhum registro.'}
        </div>
      );
    }
    return (
      <div className="cnl-box">
        <table className="cnl-table">
          <thead>
            <tr>
              <th>Solicitado em</th>
              <th>Filial</th>
              <th>Pedido</th>
              <th>NF</th>
              <th>Solicitante</th>
              <th>Motivo</th>
              <th>{tipo === 'canc' ? 'Cancelado em' : 'Status'}</th>
              <th>{tipo === 'canc' ? 'Tempo' : 'Prazo (1h)'}</th>
              <th style={{ textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((c) => (
              <tr
                key={c.id}
                style={tipo === 'canc' ? { opacity: 0.75 } : undefined}
              >
                <td>
                  {c.solicitado_em
                    ? cancDataHora(c.solicitado_em)
                    : cancIsoParaBr(c.data_cancelamento)}
                </td>
                <td>
                  <span className="cnl-fil">{c.filial}</span>
                </td>
                <td className="cnl-mono">
                  {c.pedido}
                  {c.atencao && tipo !== 'canc' && (
                    <span
                      className="cnl-atencao"
                      title={c.atencao_motivo || 'NF e pedido não batem'}
                    >
                      ⚠
                    </span>
                  )}
                  {c.atencao && tipo === 'pend' && c.atencao_motivo && (
                    <div className="cnl-atmot">{c.atencao_motivo}</div>
                  )}
                </td>
                <td className="cnl-mono">{c.nf}</td>
                <td>{c.solicitante || '—'}</td>
                <td>{c.motivo || '—'}</td>
                <td>
                  {tipo === 'canc' ? (
                    cancDataHora(c.cancelado_em)
                  ) : (
                    <CancStatus status={c.status} />
                  )}
                </td>
                <td>
                  <CancPrazo c={c} agora={agora} />
                </td>
                <td style={{ textAlign: 'right' }}>
                  <span className="cnl-acao">
                    {tipo === 'pend' && (
                      <>
                        <button
                          type="button"
                          className="cnl-btn sm go"
                          onClick={() =>
                            mudarStatus(c, CANC_ST_OK, 'Marcar como Cancelado')
                          }
                        >
                          <CancIco d={CANC_ICO_CHECK} />
                          Cancelar
                        </button>
                        {c.status === CANC_ST_AG &&
                          CANC_FILIAIS_CNT.includes(String(c.filial)) && (
                            <button
                              type="button"
                              className="cnl-btn sm cntb"
                              onClick={() =>
                                mudarStatus(
                                  c,
                                  CANC_ST_CNT,
                                  'Marcar como Aguardando CNT'
                                )
                              }
                              title="A NF entrou no processo do CNT"
                            >
                              CNT
                            </button>
                          )}
                        <button
                          type="button"
                          className="cnl-btn sm amb"
                          onClick={() =>
                            mudarStatus(
                              c,
                              CANC_ST_BFT,
                              'Marcar como Aguardando Pagto BFT'
                            )
                          }
                          title="Aguardando pagamento BFT"
                        >
                          BFT
                        </button>
                      </>
                    )}
                    {tipo === 'pend' && c.status === CANC_ST_BFT && (
                      <button
                        type="button"
                        className="cnl-btn sm bftmsg"
                        onClick={() => abrirBft(c)}
                        title="Texto pronto para avisar o financeiro no grupo"
                      >
                        💬 Msg BFT
                      </button>
                    )}
                    <span className="cnl-sep" />
                    {tipo !== 'canc' && (
                      <button
                        type="button"
                        className="cnl-btn sm ico"
                        onClick={() => editar(c)}
                        title="Editar"
                        aria-label="Editar"
                      >
                        <CancIco d={CANC_ICO_EDIT} />
                      </button>
                    )}
                    <button
                      type="button"
                      className="cnl-btn sm ico red"
                      onClick={() => excluir(c)}
                      title="Excluir"
                      aria-label="Excluir"
                    >
                      <CancIco d={CANC_ICO_TRASH} />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  let pendFiltrados = pendentes;
  if (fStatus === 'atencao')
    pendFiltrados = pendFiltrados.filter((c) => c.atencao);
  else if (fStatus === 'atrasados')
    pendFiltrados = pendFiltrados.filter((c) => cancAtrasado(c, agora));
  else if (fStatus !== 'todos')
    pendFiltrados = pendFiltrados.filter((c) => c.status === fStatus);
  const cancOrdem = (c) => {
    const d = cancTs(c.solicitado_em);
    return d ? d.getTime() : Infinity;
  };
  if (fFilial)
    pendFiltrados = pendFiltrados.filter((c) => String(c.filial) === fFilial);
  const cancNfNum = (c) =>
    Number(String(c.nf_norm || c.nf || '').replace(/\D/g, '')) || 0;
  pendFiltrados = [...pendFiltrados].sort((x, y) => {
    if (ordNf)
      return ordNf === 'desc'
        ? cancNfNum(y) - cancNfNum(x)
        : cancNfNum(x) - cancNfNum(y);
    return cancOrdem(x) === cancOrdem(y)
      ? 0
      : cancOrdem(x) < cancOrdem(y)
      ? -1
      : 1;
  });

  return (
    <div className="cnl">
      <style>{CSS_CANCELAMENTOS}</style>
      <div className="cnl-head">
        <h2>Cancelamentos</h2>
      </div>

      {erro && <div className="cnl-erro">{erro}</div>}

      <div className="cnl-tabs">
        <button
          type="button"
          className={`cnl-tab${aba === 'lancar' ? ' on' : ''}`}
          onClick={() => setAba('lancar')}
        >
          Lançar Cancelamento
        </button>
        <button
          type="button"
          className={`cnl-tab${aba === 'pendentes' ? ' on' : ''}`}
          onClick={() => setAba('pendentes')}
        >
          Cancelamentos Pendentes
          {pendentes.length > 0 && (
            <span className="cnl-badge">{pendentes.length}</span>
          )}
        </button>
        <button
          type="button"
          className={`cnl-tab${aba === 'cancelados' ? ' on' : ''}`}
          onClick={() => setAba('cancelados')}
        >
          Já Cancelados
          {cancelados.length > 0 && (
            <span className="cnl-badge ok">{cancelados.length}</span>
          )}
        </button>
      </div>

      {aba === 'lancar' && (
        <>
          <div className="cnl-stats">
            <div className="cnl-stat">
              <b>{itens.length}</b>
              <span>Total</span>
            </div>
            <div className="cnl-stat" style={{ '--k': 'var(--red)' }}>
              <b>{qtd(CANC_ST_OK)}</b>
              <span>Cancelados</span>
            </div>
            <div className="cnl-stat" style={{ '--k': 'var(--blue-tx)' }}>
              <b>{qtd(CANC_ST_CNT)}</b>
              <span>Aguardando CNT</span>
            </div>
            <div className="cnl-stat" style={{ '--k': 'var(--orange-tx)' }}>
              <b>{qtd(CANC_ST_AG)}</b>
              <span>Aguardando Cancelamento</span>
            </div>
            <div className="cnl-stat" style={{ '--k': 'var(--purple-tx)' }}>
              <b>{qtd(CANC_ST_BFT)}</b>
              <span>Aguardando BFT</span>
            </div>
          </div>
          <div className="cnl-card">
            <h3>{editId ? 'Editar Cancelamento' : 'Novo Cancelamento'}</h3>
            <form className="cnl-form" onSubmit={salvar}>
              <div className="cnl-campo">
                <label>Data</label>
                <input
                  value={form.data}
                  onChange={setCampo('data')}
                  placeholder="dd/mm/aaaa"
                />
              </div>
              <div className="cnl-campo">
                <label>Filial</label>
                <select
                  value={form.filial}
                  onChange={(e) => {
                    filialManual.current = true;
                    setCampo('filial')(e);
                  }}
                >
                  <option value="">Selecione...</option>
                  {CANC_FILIAIS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div className="cnl-campo">
                <label>Nº Pedido</label>
                <input
                  value={form.pedido}
                  onChange={setCampo('pedido')}
                  placeholder="12345"
                />
              </div>
              <div className="cnl-campo">
                <label>Nota Fiscal</label>
                <input
                  value={form.nf}
                  onChange={setCampo('nf')}
                  placeholder="98765"
                />
              </div>
              <div className="cnl-campo">
                <label>Solicitante *</label>
                {fixos.length > 0 &&
                !outroSol &&
                (!form.solicitante || fixos.includes(form.solicitante)) ? (
                  <select
                    value={form.solicitante}
                    onChange={(e) => {
                      if (e.target.value === '__outro') {
                        setOutroSol(true);
                        setForm((cur) => ({ ...cur, solicitante: '' }));
                      } else {
                        setCampo('solicitante')(e);
                      }
                    }}
                  >
                    <option value="">Selecione...</option>
                    {fixos.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                    <option value="__outro">Outro (digitar)…</option>
                  </select>
                ) : (
                  <input
                    value={form.solicitante}
                    onChange={setCampo('solicitante')}
                    placeholder="Nome do solicitante"
                  />
                )}
                <button
                  type="button"
                  className="cnl-link"
                  onClick={abrirGerSol}
                >
                  ⚙ Escolher nomes fixos
                </button>
                {fixos.length > 0 &&
                  (outroSol ||
                    (form.solicitante &&
                      !fixos.includes(form.solicitante))) && (
                    <button
                      type="button"
                      className="cnl-link"
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        setOutroSol(false);
                        setForm((cur) => ({ ...cur, solicitante: '' }));
                      }}
                    >
                      ↩ usar a lista
                    </button>
                  )}
              </div>
              <div className="cnl-campo">
                <label>Motivo *</label>
                <select value={form.motivo} onChange={setCampo('motivo')}>
                  <option value="">Selecione...</option>
                  {CANC_MOTIVOS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              {buscandoNf && (
                <div className="cnl-info">Buscando na expedição…</div>
              )}
              {!buscandoNf && analise && analise.erro && (
                <div className="cnl-info">
                  Não foi possível consultar a expedição ({analise.erro}). Rode
                  o bloco 16 do SQL no Supabase e escolha a filial manualmente.
                </div>
              )}
              {!buscandoNf && analise && !analise.erro && analise.atencao && (
                <div className="cnl-aviso">
                  ⚠ Atenção: {analise.motivo} Quem for cancelar vai analisar.
                </div>
              )}
              {!buscandoNf &&
                analise &&
                !analise.erro &&
                !analise.atencao &&
                analise.encontrado &&
                analise.filial && (
                  <div className="cnl-okbox">
                    ✔ Encontrado na expedição: filial {analise.filial}
                    {analise.cliente ? ` · ${analise.cliente}` : ''}
                  </div>
                )}
              {!buscandoNf &&
                analise &&
                !analise.erro &&
                !analise.atencao &&
                analise.encontrado &&
                !analise.filial && (
                  <div className="cnl-aviso">
                    Esta NF/pedido existe em mais de uma filial — informe também
                    o pedido ou escolha a filial.
                  </div>
                )}
              {!buscandoNf &&
                analise &&
                !analise.erro &&
                !analise.atencao &&
                !analise.encontrado && (
                  <div className="cnl-info">
                    Não encontrado na expedição — escolha a filial manualmente.
                  </div>
                )}
              {!buscandoNf &&
                analise &&
                !analise.erro &&
                analise.filial &&
                form.filial &&
                analise.filial !== form.filial && (
                  <div className="cnl-aviso">
                    ⚠ A filial escolhida ({form.filial}) é diferente da filial
                    da NF ({analise.filial}).
                  </div>
                )}
              <div className="cnl-dica">
                A data e a hora da solicitação são gravadas automaticamente.
                Prazo para cancelar: <b>1 hora</b>. Todo cancelamento começa
                como <b>Aguardando Cancelamento</b>. Nas filiais 0104, 0105,
                1030 e 1040, quem for cancelar marca <b>Aguardando CNT</b>{' '}
                (botão CNT) quando a NF entrar nesse processo.
              </div>
              <div className="cnl-acoes">
                <button
                  type="submit"
                  className="cnl-btn pri"
                  disabled={salvando}
                >
                  {salvando
                    ? 'Salvando…'
                    : editId
                    ? 'Salvar Alterações'
                    : 'Salvar Cancelamento'}
                </button>
                {editId && (
                  <button
                    type="button"
                    className="cnl-btn"
                    onClick={limparForm}
                  >
                    Cancelar edição
                  </button>
                )}
              </div>
            </form>
          </div>
        </>
      )}

      {aba === 'pendentes' && (
        <>
          <div className="cnl-stats">
            <div className="cnl-stat" style={{ '--k': 'var(--amber)' }}>
              <b>{pendentes.length}</b>
              <span>Pendentes</span>
            </div>
            <div className="cnl-stat" style={{ '--k': 'var(--blue-tx)' }}>
              <b>{qtd(CANC_ST_CNT)}</b>
              <span>Aguardando CNT</span>
            </div>
            <div className="cnl-stat" style={{ '--k': 'var(--orange-tx)' }}>
              <b>{qtd(CANC_ST_AG)}</b>
              <span>Aguardando Cancelamento</span>
            </div>
            <div className="cnl-stat" style={{ '--k': 'var(--purple-tx)' }}>
              <b>{qtd(CANC_ST_BFT)}</b>
              <span>Aguardando BFT</span>
            </div>
            <div className="cnl-stat" style={{ '--k': 'var(--green-tx)' }}>
              <b>{paraHoje}</b>
              <span>Para Hoje</span>
            </div>
            <div className="cnl-stat" style={{ '--k': 'var(--amber)' }}>
              <b>{qtdAtencao}</b>
              <span>⚠ Com atenção</span>
            </div>
            <div className="cnl-stat" style={{ '--k': 'var(--red)' }}>
              <b>{qtdAtrasados}</b>
              <span>⏰ Atrasados (+1h)</span>
            </div>
          </div>
          <div className="cnl-filtros">
            <small>Status</small>
            {[
              ['todos', 'Todos'],
              [CANC_ST_CNT, 'Aguardando CNT'],
              [CANC_ST_AG, 'Aguardando Cancelamento'],
              [CANC_ST_BFT, 'Aguardando Pagto BFT'],
              ['atencao', '⚠ Com atenção'],
              ['atrasados', '⏰ Atrasados'],
            ].map(([v, t]) => (
              <button
                key={v}
                type="button"
                className={`cnl-chip${fStatus === v ? ' on' : ''}`}
                onClick={() => setFStatus(v)}
              >
                {t}
              </button>
            ))}
            <span className="cnl-grp">
              <small>Filial</small>
              <select
                className="cnl-sel"
                value={fFilial}
                onChange={(e) => setFFilial(e.target.value)}
              >
                <option value="">Todas</option>
                {CANC_FILIAIS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </span>
            <span className="cnl-grp">
              <small>Ordenar NF</small>
              <select
                className="cnl-sel"
                value={ordNf}
                onChange={(e) => setOrdNf(e.target.value)}
              >
                <option value="">Padrão (mais antigos)</option>
                <option value="desc">Maior → menor</option>
                <option value="asc">Menor → maior</option>
              </select>
            </span>
          </div>
          <div className="cnl-card">
            <h3>Cancelamentos Pendentes ({pendFiltrados.length})</h3>
            {tabela(pendFiltrados, 'pend')}
          </div>
        </>
      )}

      {aba === 'cancelados' && (
        <div className="cnl-card">
          <h3>Pedidos Cancelados ({cancelados.length})</h3>
          {tabela(cancelados, 'canc')}
        </div>
      )}

      {confirmar && (
        <div
          className="cnl-modal"
          onMouseDown={(e) =>
            e.target === e.currentTarget && setConfirmar(null)
          }
        >
          <div>
            <h4>{confirmar.titulo}</h4>
            <p>{confirmar.texto}</p>
            <div className="cnl-linha">
              <button
                type="button"
                className="cnl-btn"
                onClick={() => setConfirmar(null)}
              >
                Voltar
              </button>
              <button
                type="button"
                className={`cnl-btn ${confirmar.perigo ? 'red' : 'pri'}`}
                style={confirmar.perigo ? undefined : { flex: 'none' }}
                onClick={executarConfirmacao}
              >
                {confirmar.botao}
              </button>
            </div>
          </div>
        </div>
      )}

      {bft && (
        <div
          className="cnl-modal"
          onMouseDown={(e) => e.target === e.currentTarget && setBft(null)}
        >
          <div style={{ maxWidth: 560 }}>
            <h4>
              💬 Mensagem BFT — Pedido {bft.c.pedido} · NF {bft.c.nf}
            </h4>
            <p>
              Copie e cole no grupo, respondendo (citando) a mensagem original.
              Depois marque o pessoal do financeiro.
            </p>
            <textarea
              className="cnl-bftarea"
              value={bft.texto}
              onChange={(e) => setBft({ ...bft, texto: e.target.value })}
            />
            <div
              className="cnl-linha"
              style={{
                justifyContent: 'space-between',
                marginBottom: bft.config ? 10 : 0,
              }}
            >
              <button
                type="button"
                className="cnl-btn sm"
                onClick={() => setBft({ ...bft, config: !bft.config })}
              >
                ⚙ {bft.config ? 'Fechar ajustes' : 'Ajustar texto e nomes'}
              </button>
              <span style={{ display: 'inline-flex', gap: 8 }}>
                <button
                  type="button"
                  className="cnl-btn sm"
                  onClick={() => setBft(null)}
                >
                  Fechar
                </button>
                <button
                  type="button"
                  className="cnl-btn sm ok"
                  onClick={copiarBft}
                >
                  📋 Copiar mensagem
                </button>
              </span>
            </div>
            {bft.config && (
              <div className="cnl-bftcfg">
                <label>Quem do financeiro marcar (um nome por linha)</label>
                <textarea
                  style={{ height: 64 }}
                  value={bft.cfg.financeiro}
                  onChange={(e) => {
                    const cfg = { ...bft.cfg, financeiro: e.target.value };
                    cancBftGravar(cfg);
                    setBft({ ...bft, cfg, texto: cancBftMontar(bft.c, cfg) });
                  }}
                />
                <label>
                  Modelo do texto (use {'{nf}'} {'{pedido}'} {'{motivo}'}{' '}
                  {'{filial}'} {'{solicitante}'} {'{financeiro}'})
                </label>
                <textarea
                  style={{ height: 84 }}
                  value={bft.cfg.modelo}
                  onChange={(e) => {
                    const cfg = { ...bft.cfg, modelo: e.target.value };
                    cancBftGravar(cfg);
                    setBft({ ...bft, cfg, texto: cancBftMontar(bft.c, cfg) });
                  }}
                />
                <small>
                  Fica salvo neste navegador. Obs.: o Teams só cria a marcação
                  de verdade se você digitar @ e escolher o nome — o texto
                  copiado já vem com o nome para você conferir.
                </small>
              </div>
            )}
          </div>
        </div>
      )}

      {gerSol && (
        <div
          className="cnl-modal"
          onMouseDown={(e) => e.target === e.currentTarget && setGerSol(null)}
        >
          <div>
            <h4>Nomes fixos do Solicitante</h4>
            <p>
              Marque os nomes que devem aparecer no campo Solicitante. A lista
              vem da equipe da expedição (bipador/embalador das postagens) e dos
              nomes já usados.
            </p>
            <input
              className="cnl-busca"
              value={gerSol.busca}
              onChange={(e) => setGerSol({ ...gerSol, busca: e.target.value })}
              placeholder="Buscar nome..."
            />
            <div className="cnl-lista">
              {gerSol.carregando && (
                <div className="cnl-vazio">Carregando…</div>
              )}
              {gerSol.lista
                .filter(
                  (i) =>
                    !gerSol.busca.trim() ||
                    i.nome
                      .toLowerCase()
                      .includes(gerSol.busca.trim().toLowerCase())
                )
                .map((i) => (
                  <label key={i.nome}>
                    <input
                      type="checkbox"
                      checked={!!i.fixo}
                      onChange={(e) => alternarFixo(i.nome, e.target.checked)}
                    />
                    {i.nome}
                    {i.qtd > 0 && <small>{i.qtd} registro(s)</small>}
                  </label>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <input
                className="cnl-busca"
                style={{ marginBottom: 0 }}
                value={gerSol.novo}
                onChange={(e) => setGerSol({ ...gerSol, novo: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && adicionarNomeFixo()}
                placeholder="Adicionar outro nome..."
              />
              <button
                type="button"
                className="cnl-btn"
                onClick={adicionarNomeFixo}
              >
                Adicionar
              </button>
            </div>
            <div className="cnl-linha">
              <button
                type="button"
                className="cnl-btn pri"
                style={{ flex: 'none' }}
                onClick={() => setGerSol(null)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className={`cnl-toast ${toast.tipo}`}>{toast.texto}</div>}
    </div>
  );
}

export default function App() {
  const [tema, alternarTema] = useTema();
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
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const estoqueAtivo = ['estoque', 'ajusteSaldo'].includes(tela);
  const expedicaoAtiva = ['viaLeitor', 'postagens'].includes(tela);
  const faturamentoAtivo = ['faturamento', 'cancelamentos'].includes(tela);
  const producaoAtivo = [
    'producao',
    'producaoResumo',
    'analiseTransformacoes',
    'consultaTransformacao',
  ].includes(tela);
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

  if (!logado)
    return (
      <TelaLogin
        onLogin={() => setLogado(true)}
        tema={tema}
        alternarTema={alternarTema}
      />
    );

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
              background: '#3f6df0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 18,
              color: '#fff',
              flexShrink: 0,
              boxShadow: '0 2px 10px rgba(63,109,240,0.45)',
            }}
          >
            B
          </div>
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
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
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button
            onClick={sair}
            style={{
              flex: 1,
              height: 36,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(226,232,240,0.8)',
              borderRadius: C.radius.md,
              padding: '0 10px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 12,
              fontFamily: C.font,
            }}
          >
            Sair da conta
          </button>
          <BotaoTema tema={tema} alternar={alternarTema} compacto sobreEscuro />
        </div>
        <div
          style={{
            fontSize: 10,
            color: 'rgba(226,232,240,0.45)',
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
          <div
            style={{
              borderRadius: C.radius.md,
              padding: expedicaoAtiva ? 5 : 0,
              background: expedicaoAtiva
                ? 'rgba(255,255,255,0.04)'
                : 'transparent',
              border: expedicaoAtiva
                ? '1px solid rgba(255,255,255,0.07)'
                : '1px solid transparent',
              marginTop: 2,
            }}
          >
            <MenuGrupBtn
              icon="EX"
              ativo={expedicaoAtiva}
              onClick={() => setTela('viaLeitor')}
            >
              Expedição
            </MenuGrupBtn>
            {expedicaoAtiva && (
              <div style={{ marginTop: 4, paddingTop: 2 }}>
                <SubMenuBtn
                  ativo={tela === 'viaLeitor'}
                  onClick={() => setTela('viaLeitor')}
                >
                  Via Leitor
                </SubMenuBtn>
                <SubMenuBtn
                  ativo={tela === 'postagens'}
                  onClick={() => setTela('postagens')}
                >
                  Postagens
                </SubMenuBtn>
              </div>
            )}
          </div>
          <div
            style={{
              borderRadius: C.radius.md,
              padding: faturamentoAtivo ? 5 : 0,
              background: faturamentoAtivo
                ? 'rgba(255,255,255,0.04)'
                : 'transparent',
              border: faturamentoAtivo
                ? '1px solid rgba(255,255,255,0.07)'
                : '1px solid transparent',
              marginTop: 2,
            }}
          >
            <MenuGrupBtn
              icon="F"
              ativo={faturamentoAtivo}
              onClick={() => setTela('faturamento')}
            >
              Faturamento
            </MenuGrupBtn>
            {faturamentoAtivo && (
              <div style={{ marginTop: 4, paddingTop: 2 }}>
                <SubMenuBtn
                  ativo={tela === 'faturamento'}
                  onClick={() => setTela('faturamento')}
                >
                  Painel Faturamento
                </SubMenuBtn>
                <SubMenuBtn
                  ativo={tela === 'cancelamentos'}
                  onClick={() => setTela('cancelamentos')}
                >
                  Cancelamentos
                </SubMenuBtn>
              </div>
            )}
          </div>
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
                <SubMenuBtn
                  ativo={tela === 'analiseTransformacoes'}
                  onClick={() => setTela('analiseTransformacoes')}
                >
                  Análise de Transformação
                </SubMenuBtn>
                <SubMenuBtn
                  ativo={tela === 'consultaTransformacao'}
                  onClick={() => setTela('consultaTransformacao')}
                >
                  Consulta de Transformação
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
            background: 'color-mix(in srgb, var(--surf) 92%, transparent)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${C.bdLight}`,
            borderRadius: C.radius.lg,
            padding: 10,
            marginBottom: 18,
            boxShadow: C.shadowMd,
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
              placeholder="Buscar pedido (nº do pedido)"
              style={{
                height: 38,
                width: 260,
                border: `1px solid ${C.bdMid}`,
                borderRadius: C.radius.md,
                padding: '0 12px',
                fontSize: 13,
                fontWeight: 700,
                color: C.txtPri,
                outline: 'none',
                fontFamily: C.font,
                background: C.bgCard,
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
                fontWeight: 800,
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
                  border: `1px solid ${C.bdMid}`,
                  borderRadius: C.radius.md,
                  padding: '0 12px',
                  background: C.bgCard,
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
                background: C.bgCard,
                border: `1px solid ${C.bdLight}`,
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
                <div style={{ fontSize: 13, fontWeight: 800, color: C.txtPri }}>
                  Resultado da busca: {pedidoBuscaGlobal || '—'}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
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
                      <tr style={{ background: C.bgMuted }}>
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
                              fontWeight: 800,
                              color: C.txtPri,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.origem}
                          </td>
                          <td
                            style={{
                              padding: '9px 10px',
                              fontWeight: 800,
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
                                border: `1px solid ${C.bdMid}`,
                                background: C.bgCard,
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
        <div style={{ display: tela === 'postagens' ? 'block' : 'none' }}>
          <TelaPostagens ativo={tela === 'postagens'} />
        </div>
        <div style={{ display: tela === 'viaLeitor' ? 'block' : 'none' }}>
          <TelaViaLeitor ativo={tela === 'viaLeitor'} />
        </div>
        <div style={{ display: tela === 'cancelamentos' ? 'block' : 'none' }}>
          <TelaCancelamentos ativo={tela === 'cancelamentos'} />
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
        <div
          style={{
            display: tela === 'analiseTransformacoes' ? 'block' : 'none',
          }}
        >
          <TelaAnaliseTransformacoes />
        </div>
        <div
          style={{
            display: tela === 'consultaTransformacao' ? 'block' : 'none',
          }}
        >
          <TelaConsultaTransformacao />
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
