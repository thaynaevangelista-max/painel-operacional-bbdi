// VERSAO: CONSULTA_TRANSFORMACAO_VISUAL_CORRIGIDO_2026_09_28 + MODULO_POSTAGENS_2026_10_14 + MODULO_VIA_LEITOR_2026_10_14 + EGRESS_2026_10_21
// CANCELAMENTOS_HISTORICO_2026_10_22: a tela Cancelamentos carrega só os pendentes + cancelados dos últimos 30 dias; os mais antigos vêm por busca ou por "Carregar mais antigos".
// EGRESS_2026_10_21: cards do Dashboard (Via Leitor/Cancelamentos) e a tela Cancelamentos só baixam a lista quando mudou, nunca com a aba escondida e o Dashboard só atualiza quando está na tela.
// Cole este arquivo em src/App.js
// Design "Aurora" — moderno com gradientes suaves, fonte Nunito, visual completamente renovado.
// Toda lógica, APIs e campos preservados sem alteração.

import { createPortal } from 'react-dom';
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

// Supabase da Central de Expedição — somente LEITURA (funções/views criadas por fase_c_14_view_postagens_painel.sql).
// A chave abaixo é a chave PÚBLICA (anon). Nunca coloque aqui a chave service_role / secret.
const SUPABASE_URL = 'https://njvcostescybgwbnipec.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qdmNvc3Rlc2N5Ymd3Ym5pcGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxNzkxNzMsImV4cCI6MjEwNTc1NTE3M30.ZR9V23Fs-MzYznZCIRrTf2uXwc5oHiltb8hpmgJHADI';

// Perfis de acesso:
//   'geral'     = login da empresa toda: visualização, EXCETO Via Leitor, Ajuste de Saldo e Indicadores;
//                 em Cancelamentos só o histórico ("Já Cancelados"); Análise de Transformações sem "Aplicar para todos"
//   'logistica' = acesso completo (inclui Via Leitor e lançar/alterar/excluir cancelamentos)
// ATENÇÃO: este login roda no navegador; serve para organizar o que cada pessoa vê, não para proteger dados sigilosos.
const LOGINS = [
  { usuario: 'BBDI', senha: 'BBDI@2026', perfil: 'geral' },
  { usuario: 'LOGISTICA', senha: 'LOG@2026', perfil: 'logistica' },
];
const TELAS_BLOQUEADAS_GERAL = [
  'listaFaturamento',
  'separacaoLista',
  'viaLeitor',
  'producaoSolicitacoes',
  'ajusteSaldo',
  'indicadorDiario',
  'indicadorExpedicaoDiario',
  'indicadorFaturamentoMensal',
  'indicadorExpedicaoMensal',
  'indicadorAbastecimentoEstoque',
  'indicadorAbastecimentoMensal',
  'indicadorSeparacaoDiario',
  'indicadorSeparacaoMensal',
];
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
const FILTROS_SOLICITACOES_PRODUCAO_INICIAIS = {
  status: '',
  solicitante: '',
  produto: '',
  quantidade: '',
  dataHoraSolicitacao: '',
  prioridade: '',
  endereco: '',
  pedido: '',
  situacaoEntrega: '',
  prazoFaturamento: '',
  tempoRestanteCalculado: '',
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
    const acesso = LOGINS.find(
      (l) => l.usuario === usuario.trim().toUpperCase() && l.senha === senha
    );
    if (!acesso) {
      setErro('Usuário ou senha inválidos.');
      return;
    }
    localStorage.setItem(LOGIN_STORAGE_KEY, acesso.perfil);
    onLogin(acesso.perfil);
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

function TelaAnaliseTransformacoes({ somenteLeitura }) {
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

      {!somenteLeitura && (
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
      )}

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

function tipoStatusSolicitacaoProducao(status) {
  const s = normalizar(status);
  if (s.includes('proximo')) return 'laranja';
  if (s.includes('nao temos')) return 'vermelho';
  return tipoStatus(status);
}

function TelaSolicitacoesProducao() {
  const [dados, setDados] = useState([]);
  const [busca, setBusca] = useState('');
  const [pf, setPf] = useState('todos');
  const [dp, setDp] = useState('7');
  const [fc, setFc] = useState(FILTROS_SOLICITACOES_PRODUCAO_INICIAIS);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [agora, setAgora] = useState(new Date());

  const load = useCallback(async () => {
    setLoading(true);
    setErro('');
    try {
      const r = await fetch(
        `${API_BASE}?action=dados&fonte=producaoSolicitacoes`
      );
      const j = await r.json();
      if (!j.ok) throw new Error(j.erro || 'Erro ao carregar Solicitações');
      const registros = j.dados || [];
      setDados(registros);
      setCacheDadosPainel('producaoSolicitacoes', registros);
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
    const t = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const dadosComTempo = useMemo(
    () =>
      dados.map((item) => {
        let prazo = String(item.prazoFaturamento || '').trim();
        // só data (sem hora): considera o fim do dia
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(prazo)) prazo += ' 23:59:59';
        const t = calcularTempoRestante(prazo, agora);
        return {
          ...item,
          tempoRestanteCalculado: t.texto === '-' ? '' : t.texto,
          tempoRestanteTipo: tipoTempoRestante(t),
        };
      }),
    [dados, agora]
  );

  const dadosPeriodo = useMemo(
    () => filtrarPorPeriodo(dadosComTempo, 'dataHoraSolicitacao', pf, dp),
    [dadosComTempo, pf, dp]
  );

  const dadosFiltrados = useMemo(
    () =>
      filtrarDados(dadosPeriodo, busca, fc, [
        'status',
        'solicitante',
        'produto',
        'quantidade',
        'dataHoraSolicitacao',
        'prioridade',
        'endereco',
        'pedido',
        'situacaoEntrega',
        'prazoFaturamento',
        'tempoRestanteCalculado',
      ]),
    [dadosPeriodo, busca, fc]
  );

  const kpis = useMemo(
    () => ({
      total: dadosFiltrados.length,
      aguardando: dadosFiltrados.filter((i) => i.entregue !== true).length,
      atrasados: dadosFiltrados.filter((i) => i.atrasado === true).length,
      quantidade: dadosFiltrados.reduce(
        (t, i) => t + (Number(i.quantidadeNumero) || 0),
        0
      ),
    }),
    [dadosFiltrados]
  );

  const colunas = [
    {
      campo: 'status',
      titulo: 'Status',
      width: 140,
      render: (i) => (
        <Badge
          texto={i.status}
          tipo={tipoStatusSolicitacaoProducao(i.status)}
        />
      ),
    },
    { campo: 'solicitante', titulo: 'Solicitante', width: 96, wrap: true },
    { campo: 'produto', titulo: 'Produto', bold: true, width: 130, wrap: true },
    {
      campo: 'quantidade',
      titulo: 'Qtd',
      width: 52,
      render: (i) => formatarNumeroInteiro(i.quantidadeNumero),
    },
    { campo: 'dataHoraSolicitacao', titulo: 'Solicitação', width: 118 },
    { campo: 'prioridade', titulo: 'Prioridade', width: 150, wrap: true },
    { campo: 'endereco', titulo: 'Endereço', width: 82 },
    { campo: 'pedido', titulo: 'Pedido', bold: true, width: 74 },
    {
      campo: 'situacaoEntrega',
      titulo: 'Entrega',
      width: 110,
      render: (i) => (
        <Badge
          texto={i.situacaoEntrega}
          tipo={tipoStatusSolicitacaoProducao(i.situacaoEntrega)}
        />
      ),
    },
    { campo: 'prazoFaturamento', titulo: 'Prazo Fat.', width: 118 },
    {
      campo: 'tempoRestanteCalculado',
      titulo: 'Tempo Restante',
      width: 150,
      render: (i) =>
        i.tempoRestanteCalculado ? (
          <Badge texto={i.tempoRestanteCalculado} tipo={i.tempoRestanteTipo} />
        ) : (
          '—'
        ),
    },
  ];

  return (
    <>
      {erro && <div style={erroEl}>{erro}</div>}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
          gap: 12,
          marginBottom: 18,
        }}
      >
        <Kpi titulo="Solicitações" valor={kpis.total} />
        <Kpi titulo="Aguardando Entrega" valor={kpis.aguardando} />
        <Kpi titulo="Atrasadas" valor={kpis.atrasados} />
        <Kpi titulo="Quantidade Total" valor={kpis.quantidade} />
      </section>
      <FiltroTopo
        busca={busca}
        setBusca={setBusca}
        limparFiltros={() => {
          setBusca('');
          setPf('todos');
          setDp('7');
          setFc(FILTROS_SOLICITACOES_PRODUCAO_INICIAIS);
        }}
        placeholder="Busca por produto, pedido, solicitante…"
        periodoFiltro={pf}
        setPeriodoFiltro={setPf}
        diasPeriodo={dp}
        setDiasPeriodo={setDp}
      />
      <TabelaPadrao
        titulo="Solicitações de Produção"
        dadosBase={dadosComTempo}
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

function TelaDashboard({ setTela, ativo = true }) {
  // EGRESS: o Dashboard fica sempre montado (escondido) — só atualiza sozinho quando está na tela e a aba está visível.
  const ativoRef = useRef(ativo);
  ativoRef.current = ativo;
  const primeiraAtivo = useRef(true);
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
    const t = setInterval(() => {
      if (paginaVisivel() && ativoRef.current) carregarViaDash();
    }, 300000);
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
    const t = setInterval(() => {
      if (paginaVisivel() && ativoRef.current) carregarCancDash();
    }, 120000);
    return () => clearInterval(t);
  }, [carregarCancDash]);

  // EGRESS: ao voltar para o Dashboard (ou para a aba), atualiza uma vez (barato: só baixa se algo mudou).
  useEffect(() => {
    if (primeiraAtivo.current) {
      primeiraAtivo.current = false;
      return undefined;
    }
    if (ativo && paginaVisivel()) {
      carregarViaDash();
      carregarCancDash();
    }
    return undefined;
  }, [ativo, carregarViaDash, carregarCancDash]);

  useEffect(() => {
    const aoVoltar = () => {
      if (paginaVisivel() && ativoRef.current) {
        carregarViaDash();
        carregarCancDash();
      }
    };
    document.addEventListener('visibilitychange', aoVoltar);
    return () => document.removeEventListener('visibilitychange', aoVoltar);
  }, [carregarViaDash, carregarCancDash]);

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

// EGRESS: não atualiza nada com a aba do navegador escondida.
function paginaVisivel() {
  return typeof document === 'undefined' || !document.hidden;
}

// EGRESS: consulta mínima (1 linha + total no cabeçalho). Devolve uma "assinatura" da lista sem baixá-la.
// Se a assinatura não mudou, não precisa baixar a lista de novo.
async function lerSupabaseAssinatura(caminho) {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/${caminho}${caminho.includes('?') ? '&' : '?'}limit=1`,
    {
      headers: { ...headersSupabasePostagem(), Prefer: 'count=exact' },
      cache: 'no-store',
    }
  );
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const total = (r.headers.get('content-range') || '').split('/')[1] || '';
  const j = await r.json();
  return `${total}|${Array.isArray(j) && j[0] ? JSON.stringify(j[0]) : ''}`;
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

// Busca global de pedido nos dados do Supabase: Postagens, Via Leitor e Cancelamentos.
// Via Leitor e Cancelamentos usam a cópia compartilhada (cache do Apps Script); Postagens usa a consulta
// compartilhada de 5 min. Sem a URL do cache, ou se ela falhar, consulta o Supabase direto (poucas linhas).
async function buscarPedidoSupabase(termo, ehLogistica, campo = 'pedido') {
  const t = String(termo || '').trim().replace(/[,*()%]/g, '');
  const out = [];
  const falhas = [];
  if (t.length < 3) return { itens: out, falhas };
  const padrao = encodeURIComponent(`*${t}*`);
  const tn = t.toLowerCase();
  const porNf = campo === 'nf';
  const semZeros = (v) => String(v === null || v === undefined ? '' : v).trim().toLowerCase().replace(/^0+(?=.)/, '');
  const tnNf = semZeros(t);
  // true se o valor do registro bate com o que foi digitado (pedido: contém; NF: contém, ignorando zeros à esquerda)
  const bate = (obj) =>
    porNf
      ? semZeros(obj.nf_norm || obj.nf).includes(tnNf)
      : String(obj.pedido || '').toLowerCase().includes(tn);
  const dataBr = (v) => {
    const pt = partesPostagem(v);
    return pt ? pt.data : '-';
  };

  const tarefas = [];

  // Postagens
  tarefas.push(
    (async () => {
      const caminho = `v_postagens_painel?select=${POSTAGENS_COLUNAS}&busca=ilike.${encodeURIComponent(`*${tn}*`)}&order=ordem.desc,nf.desc,linha_id.asc&limit=100`;
      let lista = await lerPostagensListaCompartilhada(caminho);
      if (!lista) lista = await lerSupabasePostagem(caminho);
      (Array.isArray(lista) ? lista : [])
        .filter(bate)
        .slice(0, 50)
        .forEach((p) => {
        out.push({
          origem: 'Postagens',
          telaDestino: 'postagens',
          pedido: p.pedido || t,
          filial: p.filial || '-',
          produto: '-',
          quantidade: p.volume || '-',
          status: p.status_texto || p.situacao || '-',
          data: p.postado_em ? dataBr(p.postado_em) : '-',
          detalhe: `NF: ${p.nf || '-'} · Transportadora: ${
            p.transportadora || '-'
          } · Romaneio: ${p.romaneio || '-'}`,
        });
      });
    })().catch((e) => falhas.push(`Postagens (${e.message || 'erro'})`))
  );

  // Via Leitor (só logística)
  if (ehLogistica) {
    tarefas.push(
      (async () => {
        const comp = await lerTelaCompartilhada('via');
        let linhas;
        if (comp) {
          linhas = comp.linhas.filter(bate);
        } else {
          linhas = await lerSupabasePostagem(
            `via_leitor?select=${VIA_SELECT}&filial=in.(0101,0102,1020)&${campo}=eq.${encodeURIComponent(t)}&limit=50`
          );
        }
        (Array.isArray(linhas) ? linhas : []).slice(0, 50).forEach((x) => {
          out.push({
            origem: 'Via Leitor',
            telaDestino: 'viaLeitor',
            pedido: x.pedido || t,
            filial: x.filial || '-',
            produto: '-',
            quantidade: x.total_unidades || x.volume || '-',
            status: 'Faturado — aguardando expedição',
            data: x.data_saida_entrada ? dataBr(x.data_saida_entrada) : '-',
            detalhe: `NF: ${x.nf || '-'} · Transportadora: ${
              viaNormLista(x.transportadora) || '-'
            } · Cliente: ${x.cliente_codigo || '-'}`,
          });
        });
      })().catch((e) => falhas.push(`Via Leitor (${e.message || 'erro'})`))
    );
  }

  // Cancelamentos (a cópia compartilhada tem os pendentes + os últimos 30 dias; o login geral só vê cancelados)
  tarefas.push(
    (async () => {
      const comp = await lerTelaCompartilhada('canc');
      let lista;
      if (comp) {
        lista = comp.itens.filter(bate);
      } else {
        lista = await lerSupabasePostagem(
          `v_cancelamentos_painel?select=*&${campo}=ilike.${padrao}&order=id.desc&limit=50`
        );
      }
      (Array.isArray(lista) ? lista : [])
        .filter((c) => ehLogistica || c.status === CANC_ST_OK)
        .slice(0, 50)
        .forEach((c) => {
          out.push({
            origem: 'Cancelamentos',
            telaDestino: 'cancelamentos',
            pedido: c.pedido || t,
            filial: c.filial || '-',
            produto: '-',
            quantidade: '-',
            status: c.status || '-',
            data: c.data_cancelamento ? dataBr(c.data_cancelamento) : '-',
            detalhe: `NF: ${c.nf || '-'} · Solicitante: ${
              c.solicitante || '-'
            } · Motivo: ${c.motivo || '-'}`,
          });
        });
    })().catch((e) => falhas.push(`Cancelamentos (${e.message || 'erro'})`))
  );

  await Promise.all(tarefas);
  return { itens: out, falhas };
}

// Listas grandes de Postagens (sem texto digitado: padrão, status/filial/transportadora, páginas) usam a cópia
// compartilhada (5 min). Buscas por texto (NF, pedido, romaneio...) trazem poucas linhas e vão direto ao Supabase.
async function lerPostagensListaCompartilhada(caminho) {
  if (!CACHE_COMPARTILHADO_URL) return null;
  const ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = ctl ? setTimeout(() => ctl.abort(), 30000) : null;
  try {
    const sep = CACHE_COMPARTILHADO_URL.includes('?') ? '&' : '?';
    const resp = await fetch(
      `${CACHE_COMPARTILHADO_URL}${sep}action=postagens&q=${encodeURIComponent(caminho)}`,
      ctl ? { signal: ctl.signal } : undefined
    );
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const j = await resp.json();
    if (!j || !j.ok || !Array.isArray(j.dados)) throw new Error('resposta inválida');
    return j.dados;
  } catch (e) {
    return null; // quem chamou usa o Supabase direto
  } finally {
    if (timer) clearTimeout(timer);
  }
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
      const caminhoPg = montarConsultaPostagens(aplicados, pagina);
      const semTexto = !aplicados.rom.trim() && !aplicados.busca.trim();
      let lote = semTexto ? await lerPostagensListaCompartilhada(caminhoPg) : null;
      if (!lote) lote = await lerSupabasePostagem(caminhoPg);
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

// CACHE COMPARTILHADO (EGRESS): cole aqui a URL "/exec" da implantação do Apps Script (extensao_v2/Code.gs).
// Com a URL preenchida, os cards do Dashboard deixam de consultar o Supabase por conta própria: todos os usuários
// recebem a mesma resposta guardada no servidor, então o consumo não cresce com o número de pessoas.
// Vazio (''), ou se o servidor falhar, volta a consultar o Supabase direto (comportamento anterior).
const CACHE_COMPARTILHADO_URL = '';
const DASH_COMPARTILHADO = { versao: '', via: null, canc: null, ts: 0, pendente: null };

async function lerCacheCompartilhado() {
  if (!CACHE_COMPARTILHADO_URL) return null;
  const D = DASH_COMPARTILHADO;
  // os dois cards pedem quase juntos: reaproveita a mesma resposta por 20 s
  if (D.canc && Date.now() - D.ts < 20000) return D;
  if (D.pendente) return D.pendente;
  D.pendente = (async () => {
    const ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = ctl ? setTimeout(() => ctl.abort(), 30000) : null;
    try {
      const sep = CACHE_COMPARTILHADO_URL.includes('?') ? '&' : '?';
      const url = `${CACHE_COMPARTILHADO_URL}${sep}action=dashboardCompartilhado&v=${encodeURIComponent(
        D.versao || ''
      )}`;
      const resp = await fetch(url, ctl ? { signal: ctl.signal } : undefined);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const j = await resp.json();
      if (!j || !j.ok) throw new Error((j && j.erro) || 'resposta inválida');
      if (!Array.isArray(j.canc)) throw new Error('sem cancelamentos');
      if (j.via && Array.isArray(j.via.linhas) && Array.isArray(j.via.cfg)) {
        D.via = { linhas: j.via.linhas, cfg: j.via.cfg };
        D.versao = j.versao || '';
      } else if (!(j.igual && D.via)) {
        throw new Error('sem Via Leitor');
      }
      D.canc = j.canc;
      D.ts = Date.now();
      return D;
    } catch (e) {
      D.ts = 0;
      D.canc = null;
      return null; // quem chamou usa o Supabase direto
    } finally {
      if (timer) clearTimeout(timer);
      D.pendente = null;
    }
  })();
  return D.pendente;
}

// Telas (Via Leitor e Cancelamentos): mesma cópia compartilhada. Devolve os dados ou null (usa o Supabase direto).
// `tipo`: 'via' | 'canc'. A cópia fica em memória; se o servidor responder "igual", reaproveita sem baixar de novo.
const TELA_COMPARTILHADA = {
  via: { versao: '', dados: null, ts: 0, pendente: null },
  canc: { versao: '', dados: null, ts: 0, pendente: null },
};
async function lerTelaCompartilhada(tipo) {
  if (!CACHE_COMPARTILHADO_URL) return null;
  const T = TELA_COMPARTILHADA[tipo];
  if (T.dados && Date.now() - T.ts < 15000) return T.dados; // evita pedidos repetidos em sequência
  if (T.pendente) return T.pendente;
  T.pendente = (async () => {
    const ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = ctl ? setTimeout(() => ctl.abort(), 30000) : null;
    try {
      const sep = CACHE_COMPARTILHADO_URL.includes('?') ? '&' : '?';
      const url = `${CACHE_COMPARTILHADO_URL}${sep}action=tela&tipo=${tipo}&v=${encodeURIComponent(
        T.dados ? T.versao || '' : ''
      )}`;
      const resp = await fetch(url, ctl ? { signal: ctl.signal } : undefined);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const j = await resp.json();
      if (!j || !j.ok) throw new Error((j && j.erro) || 'resposta inválida');
      if (j.dados) {
        T.dados = j.dados;
        T.versao = j.versao || '';
      } else if (!(j.igual && T.dados)) {
        throw new Error('sem dados');
      }
      T.ts = Date.now();
      return T.dados;
    } catch (e) {
      T.ts = 0;
      return null;
    } finally {
      if (timer) clearTimeout(timer);
      T.pendente = null;
    }
  })();
  return T.pendente;
}

// Depois de salvar/alterar/excluir um cancelamento: pede ao servidor para descartar a cópia guardada, para a
// próxima leitura vir fresca (para todos). Devolve true se deu certo.
async function invalidarTelaCompartilhada(tipo) {
  if (!CACHE_COMPARTILHADO_URL) return false;
  TELA_COMPARTILHADA[tipo].ts = 0; // não reaproveitar a cópia que esta aba já tem em memória
  DASH_COMPARTILHADO.ts = 0;
  try {
    const sep = CACHE_COMPARTILHADO_URL.includes('?') ? '&' : '?';
    const resp = await fetch(`${CACHE_COMPARTILHADO_URL}${sep}action=invalidar&tipo=${tipo}`);
    if (!resp.ok) return false;
    const j = await resp.json();
    return !!(j && j.ok);
  } catch (e) {
    return false;
  }
}

// Totais para os cards do dashboard: pedidos a expedir por empresa (BB = 1020; Equipatech = 0101/0102).
const VIA_DASH_CACHE = { assin: '', ts: 0, linhas: null, cfgLinhas: null };
async function viaResumoDashboard() {
  // EGRESS: antes baixava até 10000 linhas a cada 5 min só para somar 4 números. Agora faz uma consulta mínima
  // e só baixa a lista se ela mudou (ou a cada 15 min). O "atrasado" continua sendo recalculado a cada chamada.
  const caminhoAss = viaCaminhoLista()
    .replace(`select=${VIA_SELECT}`, 'select=filial,nf,pedido')
    .replace(
      'order=data_saida_entrada.asc,nf.asc,pedido.asc',
      'order=data_saida_entrada.desc,nf.desc,pedido.desc'
    );
  const comp = await lerCacheCompartilhado();
  let assin = '';
  if (!comp) {
    try {
      assin = await lerSupabaseAssinatura(caminhoAss);
    } catch (e) {
      assin = '';
    }
  }
  let linhas;
  let cfgLinhas;
  if (comp && comp.via) {
    linhas = comp.via.linhas;
    cfgLinhas = comp.via.cfg;
  } else if (
    assin &&
    VIA_DASH_CACHE.linhas &&
    VIA_DASH_CACHE.assin === assin &&
    Date.now() - VIA_DASH_CACHE.ts < 15 * 60000
  ) {
    linhas = VIA_DASH_CACHE.linhas;
    cfgLinhas = VIA_DASH_CACHE.cfgLinhas;
  } else {
    [linhas, cfgLinhas] = await Promise.all([
      viaLerLote(viaCaminhoLista(), 10000, 0),
      lerSupabasePostagem('v_via_config_painel?select=*&limit=5000'),
    ]);
    VIA_DASH_CACHE.assin = assin;
    VIA_DASH_CACHE.ts = Date.now();
    VIA_DASH_CACHE.linhas = linhas;
    VIA_DASH_CACHE.cfgLinhas = cfgLinhas;
  }
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
      const comp = await lerTelaCompartilhada('via');
      const [linhas, cfgLinhas, obsLinhas] = comp
        ? [
            comp.linhas.slice(
              pagina * VIA_TAM_PAGINA,
              pagina * VIA_TAM_PAGINA + VIA_TAM_PAGINA + 1
            ),
            { ok: true, j: comp.cfg },
            comp.obs || [],
          ]
        : await Promise.all([
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
const CANC_JANELA_DIAS = 30; // cancelados mais antigos que isso só entram por busca / "Carregar mais antigos"
const CANC_HIST_TAM = 200;

function cancDataIsoMenosDias(dias) {
  const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' });
  return fmt.format(new Date(Date.now() - dias * 86400000));
}

// Total de registros e total de cancelados (2 consultas mínimas, só contagem) — os cards continuam mostrando o total real.
async function cancTotais() {
  const n = (a) => Number(String(a).split('|')[0]) || 0;
  const [total, canc] = await Promise.all([
    lerSupabaseAssinatura('v_cancelamentos_painel?select=id&order=id.desc'),
    lerSupabaseAssinatura(
      `v_cancelamentos_painel?select=id&status=eq.${encodeURIComponent(CANC_ST_OK)}&order=id.desc`
    ),
  ]);
  return { total: n(total), canc: n(canc) };
}

// Busca no histórico inteiro (servidor): por pedido, NF ou solicitante; ou página mais antiga que um id.
async function cancBuscarCancelados({ busca, antesDoId }) {
  const q = [`select=*`, `status=eq.${encodeURIComponent(CANC_ST_OK)}`];
  const t = String(busca || '').trim().replace(/[,*()%]/g, '');
  if (t) {
    const p = encodeURIComponent(`*${t}*`);
    q.push(`or=(pedido.ilike.${p},nf.ilike.${p},solicitante.ilike.${p})`);
  }
  if (antesDoId) q.push(`id=lt.${Number(antesDoId)}`);
  q.push('order=id.desc', `limit=${CANC_HIST_TAM}`);
  const r = await lerSupabasePostagem(`v_cancelamentos_painel?${q.join('&')}`);
  return Array.isArray(r) ? r : [];
}

// EGRESS: assinatura da lista de cancelamentos (total + mais recente + contagem por status), sem baixar a lista.
async function cancAssinatura() {
  const base = 'v_cancelamentos_painel?select=id&order=id.desc';
  const porStatus = (st) => `${base}&status=eq.${encodeURIComponent(st)}`;
  const partes = await Promise.all([
    lerSupabaseAssinatura('v_cancelamentos_painel?select=id,status&order=id.desc'),
    lerSupabaseAssinatura(porStatus(CANC_ST_OK)),
    lerSupabaseAssinatura(porStatus(CANC_ST_BFT)),
    lerSupabaseAssinatura(porStatus(CANC_ST_AG)),
  ]);
  return partes.join('#');
}

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
  const comp = await lerCacheCompartilhado();
  const linhas =
    comp && comp.canc
      ? comp.canc
      : await viaLerLote(
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

function TelaCancelamentos({ ativo, somenteLeitura }) {
  const [itens, setItens] = useState([]);
  const [aba, setAba] = useState(somenteLeitura ? 'cancelados' : 'lancar');
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
  const assinCanc = useRef('');
  const [totais, setTotais] = useState(null);
  const [histExtra, setHistExtra] = useState([]);
  const [histBusca, setHistBusca] = useState('');
  const [histRes, setHistRes] = useState(null); // null = sem busca; lista = resultado da busca no servidor
  const [histCarregando, setHistCarregando] = useState(false);
  const [histFim, setHistFim] = useState(false);

  const avisar = useCallback((texto, tipo) => {
    setToast({ texto, tipo: tipo || 'ok' });
    setTimeout(() => setToast(null), 3200);
  }, []);

  // forcar=true (depois de salvar/alterar/excluir): descarta a cópia compartilhada e busca uma nova;
  // se o servidor não responder, lê direto do Supabase. Nos outros casos usa a cópia compartilhada.
  const carregar = useCallback(async (forcar) => {
    const direto = forcar === true;
    setCarregando(true);
    setErro('');
    try {
      if (CACHE_COMPARTILHADO_URL) {
        const ok = direto ? await invalidarTelaCompartilhada('canc') : true;
        if (ok) {
          const comp = await lerTelaCompartilhada('canc');
          if (comp) {
            setItens(comp.itens);
            if (comp.totais) setTotais(comp.totais);
            setFixos(comp.fixos || []);
            ultimaCarga.current = Date.now();
            return;
          }
        }
      }
      // pendentes (sempre todos) + cancelados dos últimos CANC_JANELA_DIAS dias
      const ini = cancDataIsoMenosDias(CANC_JANELA_DIAS);
      const [lista, tot] = await Promise.all([
        viaLerLote(
          `v_cancelamentos_painel?select=*&or=(status.neq.${encodeURIComponent(
            CANC_ST_OK
          )},cancelado_em.gte.${ini},data_cancelamento.gte.${ini})&order=id.desc`,
          20000,
          0
        ),
        cancTotais().catch(() => null),
      ]);
      setItens(lista);
      if (tot) setTotais(tot);
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
    // EGRESS: antes baixava TODOS os cancelamentos (até 20000 linhas, select=*) a cada 60 s.
    // Agora confere a assinatura (poucos bytes) e só baixa se mudou ou a cada 5 min.
    const t = setInterval(async () => {
      if (!paginaVisivel()) return;
      if (CACHE_COMPARTILHADO_URL) {
        carregar(); // o servidor confere a mudança uma vez para todos; aqui só vem resposta curta
        return;
      }
      try {
        const a = await cancAssinatura();
        if (
          a &&
          a === assinCanc.current &&
          Date.now() - ultimaCarga.current < 5 * 60000
        )
          return;
        assinCanc.current = a;
      } catch (e) {
        // se a checagem falhar, segue para a carga normal
      }
      carregar();
    }, 60000);
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
  const canceladosCarregados = useMemo(() => {
    const mapa = new Map();
    [...itens.filter((c) => c.status === CANC_ST_OK), ...histExtra].forEach(
      (c) => mapa.set(c.id, c)
    );
    return [...mapa.values()].sort((a, b) => Number(b.id) - Number(a.id));
  }, [itens, histExtra]);
  const cancelados = histRes !== null ? histRes : canceladosCarregados;
  const totalCanc = totais ? totais.canc : canceladosCarregados.length;
  const totalGeral = totais ? totais.total : itens.length;

  // busca no histórico (servidor), com pausa de 500 ms ao digitar
  useEffect(() => {
    const t = histBusca.trim();
    if (t.length < 2) {
      setHistRes(null);
      return undefined;
    }
    let vivo = true;
    const timer = setTimeout(async () => {
      setHistCarregando(true);
      try {
        const r = await cancBuscarCancelados({ busca: t });
        if (vivo) setHistRes(r);
      } catch (e) {
        if (vivo) avisar(e.message || 'Falha na busca', 'err');
      } finally {
        if (vivo) setHistCarregando(false);
      }
    }, 500);
    return () => {
      vivo = false;
      clearTimeout(timer);
    };
  }, [histBusca, avisar]);

  async function carregarMaisAntigos() {
    if (histCarregando) return;
    const menor = canceladosCarregados.reduce(
      (m, c) => Math.min(m, Number(c.id)),
      Infinity
    );
    setHistCarregando(true);
    try {
      const r = await cancBuscarCancelados({
        antesDoId: Number.isFinite(menor) ? menor : 0,
      });
      setHistExtra((cur) => [...cur, ...r]);
      if (r.length < CANC_HIST_TAM) setHistFim(true);
    } catch (e) {
      avisar(e.message || 'Falha ao carregar', 'err');
    } finally {
      setHistCarregando(false);
    }
  }
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
      await carregar(true);
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
        await carregar(true);
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
        await carregar(true);
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
                  {!somenteLeitura && (
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
                  )}
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
        {!somenteLeitura && (
        <button
          type="button"
          className={`cnl-tab${aba === 'lancar' ? ' on' : ''}`}
          onClick={() => setAba('lancar')}
        >
          Lançar Cancelamento
        </button>
        )}
        {!somenteLeitura && (
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
        )}
        <button
          type="button"
          className={`cnl-tab${aba === 'cancelados' ? ' on' : ''}`}
          onClick={() => setAba('cancelados')}
        >
          Já Cancelados
          {totalCanc > 0 && (
            <span className="cnl-badge ok">{totalCanc}</span>
          )}
        </button>
      </div>

      {aba === 'lancar' && (
        <>
          <div className="cnl-stats">
            <div className="cnl-stat">
              <b>{totalGeral}</b>
              <span>Total</span>
            </div>
            <div className="cnl-stat" style={{ '--k': 'var(--red)' }}>
              <b>{totalCanc}</b>
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
          <h3>
            Pedidos Cancelados ({cancelados.length}
            {histRes === null && totalCanc > cancelados.length
              ? ` de ${totalCanc}`
              : ''}
            )
          </h3>
          <input
            className="cnl-busca"
            type="search"
            placeholder="Buscar no histórico completo: pedido, NF ou solicitante (mín. 2 caracteres)"
            value={histBusca}
            onChange={(e) => setHistBusca(e.target.value)}
          />
          <small style={{ display: 'block', marginBottom: 10, opacity: 0.7 }}>
            {histRes !== null
              ? histCarregando
                ? 'Buscando…'
                : `Resultado da busca no histórico completo (até ${CANC_HIST_TAM} registros).`
              : `Mostrando os cancelados dos últimos ${CANC_JANELA_DIAS} dias. Use a busca ou "Carregar mais antigos" para ver o restante.`}
          </small>
          {tabela(cancelados, 'canc')}
          {histRes === null && !histFim && totalCanc > cancelados.length && (
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <button
                type="button"
                className="cnl-btn sm"
                disabled={histCarregando}
                onClick={carregarMaisAntigos}
              >
                {histCarregando
                  ? 'Carregando…'
                  : `Carregar mais antigos (+${CANC_HIST_TAM})`}
              </button>
            </div>
          )}
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

// ════════ LISTA FATURAMENTO — endereços dos produtos (ENDERECOS_BASE do sistema de listas) ════════
const LF_ENDERECOS = {"B140XW02-V.1":"F-01-11","B156XTN08.1":"F-01-9","B156XW02-V.2":"F-01-6","B156XW04-V.8":"F-01-2","LP140WH1-TLA2":"F-02-9","LP156WF4-SPJ1":"F-02-7","N140BGE-E43":"F-02-4","N140HCA-EAC":"F-02-2","N156BGA-EA3":"F-03-11","N156HCA-EBA":"F-03-8","N156HGA-EAL":"F-03-5","NT140WHM-N43":"F-03-2","B101AW06-V.1":"F-04-11","B116XW02":"F-04-11","B116XW03-V.2":"F-04-11","B116XW05-V.0":"F-04-11","B133XW01":"F-04-10","B140RW01-V.0":"F-04-10","B140RW02":"F-04-10","B140XTT01.0":"F-04-10","B140XW03-V.0":"F-04-9","B156HW01":"F-04-8","B156XTN01.0":"F-04-7","B156XW03-V.1":"F-04-6","B156XW04-V.8-G":"F-04-5","B173HW01":"F-04-4","B173RTN01.1":"F-04-3","CLAA156WA01A":"F-04-2","DP-AP127":"F-05-11","DP-AP140":"F-05-11","DP-AP170":"F-05-11","DP-AP171":"F-05-11","DP-AP190":"F-05-10","DP-AP205":"F-05-10","DP-AP230":"F-05-10","DP-AP231":"F-05-10","DP-AP232":"F-05-9","DP-FM100":"F-05-9","DP-FN600":"F-05-9","DP-HF140":"F-05-9","DP-HM320":"F-05-8","DP-HM400":"F-05-8","DP-LE520":"F-05-7","DP-LF150":"F-05-7","DP-LF151":"F-05-6","DP-LF153":"F-05-6","DP-LM100":"F-05-5","DP-LM200":"F-05-5","DP-LM300":"F-05-4","DP-LM500":"F-05-4","DP-LM700":"F-05-3","DP-LP756":"F-05-3","DP-SJ300":"F-05-2","DP-SM300":"F-05-2","DP-SM400":"F-05-1","DP-SM510":"F-05-1","LP101WH2-TLB1":"F-06-11","LP101WSA":"F-06-11","LP116WH2":"F-06-11","LP133WP1-TJA1":"F-06-10","LP133WX1-TLB1":"F-06-10","LP140WF1-SPU1":"F-06-9","LP140WH1-TLD1":"F-06-9","LP141WX1":"F-06-9","LP154WX4":"F-06-8","LP156WF7-SPN3":"F-06-6","LP156WF9-SPK2":"F-06-6","LP173WD1":"F-06-4","LTN140AT21":"F-06-3","LTN141AT16":"F-06-2","LTN145AT01":"F-06-2","LTN156AT36":"F-06-1","LTN156AT40-D01":"F-07-11","N116BGE-EA2":"F-07-10","N133BGE-EAB":"F-07-10","N133HSE-EA1":"F-07-9","N140BGE-LB2":"F-07-9","N140FGE-EA2":"F-07-9","N140HCA-E5C":"F-07-8","N140HCE-EN1":"F-07-8","N140HCE-G52":"F-07-7","N140HGE-EBA":"F-07-7","N156BGA-E53":"F-07-6","N156HGE-LA1":"F-07-6","N173HCE-E31":"F-07-5","NT116WHM-N23":"F-07-4","NT140WHM-N44":"F-07-4","NT140WHM-N45":"F-07-3","NT156FHM-N43":"F-07-2","NV156FHM-N4T":"F-07-1","BB20-AC19-3":"A-01-4","BB20-AC19-B21":"A-01-3","BB20-AC19-C21":"A-01-2","BB20-AP16-L":"A-01-2","BB20-AP45-M2":"A-01-2","BB20-AP85-M2":"A-01-2","BB20-AS019-4":"A-02-4","BB20-AS019-45":"A-02-4","BB20-BC65":"A-02-4","BB20-CP6300":"A-02-3","BB20-DE19-A":"A-02-3","BB20-DE19-B":"A-02-3","BB20-DE19-T6":"A-02-2","BB20-DE19-U6":"A-03-4","BB20-HP19-4":"A-03-5","BB20-HP19-SP":"A-03-4","BB20-LE20-E":"A-03-3","BB20-LE20-F":"A-03-3","BB20-SA19-40B":"A-03-3","BB20-SA19-A":"A-03-2","BB20-SO19-B2":"A-03-2","BB20-TO19-B25":"A-03-2","BB20-19V-150W":"B-03-4","BB20-19V-180W":"B-03-4","BB20-19V-230W":"B-03-4","BB20-AC19-E21":"B-03-4","BB20-AC19-E25":"B-03-4","BB20-AC19-F21":"B-03-4","BB20-AC19-ONE":"B-03-4","BB20-AP140-M3":"B-03-4","BB20-AP18-L":"B-03-4","BB20-AP29-C":"B-03-4","BB20-AP30-C":"B-03-4","BB20-AP61-C":"B-03-4","BB20-AP65-M2":"B-03-4","BB20-AP89-C":"B-03-4","BB20-AP96-C":"B-03-4","BB20-AP96-M3":"B-03-3","BB20-AS019":"B-03-3","BB20-AS019-3":"B-03-3","BB20-AS019-5":"B-03-3","BB20-AS019-6":"B-03-3","BB20-BC45":"B-03-3","BB20-BD45":"B-03-3","BB20-BD65":"B-03-3","BB20-BD90":"B-03-3","BB20-CP19-B":"B-03-3","BB20-CP6300-120":"B-03-3","BB20-CP6300-135":"B-03-3","BB20-CP6300-H":"B-03-3","BB20-DE19-E":"B-03-3","BB20-DE19-T13":"B-03-3","BB20-DE19-U9":"B-03-2","BB20-HP19-40":"B-03-2","BB20-HP19-5":"B-03-2","BB20-IB16-C":"B-03-2","BB20-IB20-B":"B-03-2","BB20-LE20-A":"B-03-2","BB20-LE20-B":"B-03-2","BB20-LE20-C":"B-03-2","BB20-LG19-65":"B-03-2","BB20-PO05":"B-03-2","BB20-PO20":"B-03-2","BB20-SA19-40W":"B-03-2","BB20-SA19-C":"B-03-2","BB11-AC066":"C-01-4","BB11-AC074":"C-01-4","BB11-AC077":"C-01-4","BB11-AC081":"C-01-4","BB11-AC082":"C-01-3","BB11-AC085":"C-01-3","BB11-AC086":"C-01-3","BB11-AC088":"C-01-3","BB11-AS065":"C-01-3","BB11-DE080":"C-01-2","BB11-DE085":"C-01-2","BB11-DE099":"C-01-2","BB11-DE099-4C":"C-01-2","BB11-DE101":"C-01-2","BB11-DE111":"C-02-4","BB11-DE120":"C-02-4","BB11-DE125":"C-02-4","BB11-DE125-4C":"C-02-3","BB11-HP058":"C-02-3","BB11-HP081":"C-02-3","BB11-HP113":"C-02-3","BB11-LE023":"C-02-2","BB11-LE043":"C-02-2","BB11-SS015":"C-02-2","BB11-SS021":"C-02-2","BB11-AC091":"B-01-1","BB11-AC095":"B-01-1","BB11-AP024":"B-01-1","BB11-AP038":"B-01-1","BB11-AP041":"B-01-1","BB11-AP044":"B-01-1","BB11-AP047":"B-01-1","BB11-AP048":"B-01-1","BB11-AP049":"B-01-1","BB11-AS046":"B-01-1","BB11-AS092":"B-01-1","BB11-AS213":"B-01-1","BB11-AS325":"B-01-1","BB11-AS413":"B-01-1","BB11-AS435":"B-01-1","BB11-AS510":"B-01-1","BB11-AS515":"B-01-1","BB11-AS515-B":"B-01-1","BB11-AS515-C":"B-01-1","BB11-AS515-D":"B-01-1","BB11-AS531":"B-01-1","BB11-DE064":"B-02-1","BB11-DE078-6C":"B-02-1","BB11-DE082":"B-02-1","BB11-DE097":"B-02-1","BB11-DE127":"B-02-1","BB11-DE141-HH":"B-02-1","BB11-DE143":"B-02-1","BB11-DE150-H":"B-02-1","BB11-DE156":"B-02-1","BB11-DE157":"B-02-1","BB11-DE410":"B-02-1","BB11-DE9310":"B-02-1","BB11-HP025-A":"B-02-1","BB11-HP102":"B-02-1","BB11-HP109":"B-02-1","BB11-HP112":"B-02-1","BB11-HP119":"B-02-1","BB11-HP120":"B-02-1","BB11-HP360":"B-02-1","BB11-HP361":"B-02-1","BB11-LE051":"B-02-1","BB11-LE053":"B-02-1","BB11-LE058-C":"B-02-1","BB11-LE062":"B-02-1","BB11-LE066":"B-02-1","BB11-LE070":"B-03-1","BB11-LE070-2C":"B-03-1","BB11-LE540":"B-03-1","BB11-LE720":"B-03-1","BB11-SO043":"B-03-1","BB11-SO044":"B-03-1","BB11-SO049":"B-03-1","BB11-SO240":"B-03-1","BB11-SS030":"B-03-1","BB11-SS670":"B-03-1","BB11-SS940":"B-03-1","ML-HP058":"B-03-1","KB-AC111":"D-01-4","KB-AC117":"D-01-4","KB-AC117-F2":"D-01-4","KB-AC3810T-WF":"D-01-4","KB-AC3830T":"D-01-4","KB-AC431":"D-01-4","KB-AC515-54":"D-01-3","KB-AC515-F2":"D-01-3","KB-AC521":"D-01-3","KB-AC5830T":"D-01-3","KB-AP1278-US":"D-01-3","KB-AP1369-US":"D-01-3","KB-AS103-ST":"D-01-2","KB-AS104":"D-01-2","KB-ASK45":"D-01-2","KB-ATI8371":"D-01-2","KB-DE101":"D-01-2","KB-DE105":"D-01-2","KB-DE109":"D-02-4","KB-DE111":"D-02-4","KB-DE113":"D-02-4","KB-DIN14-3":"D-02-4","KB-DIN14-3SLI":"D-02-4","KB-DIN14RN":"D-02-4","KB-DIN15-3":"D-02-3","KB-DIN15-3LI":"D-02-3","KB-DIN1545":"D-02-3","KB-DIN15R":"D-02-3","KB-HP104":"D-02-3","KB-HP132":"D-02-3","KB-HP135":"D-02-2","KB-HPCQ42":"D-02-2","KB-HPCQ43":"D-02-2","KB-LE109/IMP":"D-02-2","KB-LE113":"D-02-2","KB-LE114":"D-02-2","KB-LE115":"D-03-4","KB-LE122":"D-03-4","KB-LE431":"D-03-4","KB-LG102":"D-03-4","KB-NAC-10":"D-03-4","KB-NAC-13":"D-03-4","KB-NAC-13-F4":"D-03-3","KB-NAC-13-F4A":"D-03-3","KB-NAC-13-TCB":"D-03-3","KB-NAC-14":"D-03-3","KB-NAC-40":"D-03-3","KB-SAN300-E5K":"D-03-3","KB-SAN300-E5K-WH":"D-03-2","KB-SANP270":"D-03-2","KB-SANP300":"D-03-2","KB-SANP370":"D-03-2","KB-SANP550":"D-03-2","KB-SARV411":"D-03-2","SM2-2280F9-128G":"E-01-4","SM2-2280F9-256G":"E-01-4","SM2-2280F9-512G":"E-01-4","SM2-2280NVME-128G":"E-01-4","SM2-2280NVME-256G":"E-01-4","SM2-2280NVME-512G":"E-01-4","SSD-700S3W5-120G":"E-01-4","SSD-700S3W5-240G":"E-01-4","SSD-700S3W5-480G":"E-01-4","SM2-2280NVME-512-G4":"E-01-4","SSD-700S3W5-1T":"E-01-4","SSP-NVME2500-1TB":"E-01-4","SSP-NVME2500-256G":"E-01-4","D3NB-16E-4GB":"E-01-4","D3NB-16E-8GB":"E-01-4","D3NB-16L-4GB":"E-01-4","D3NB-16L-8GB":"E-01-4","D4DS-26E-16GB":"E-01-4","D4DS-26E-8GB":"E-01-4","D4NB-32E-16GB":"E-01-4","D4NB-24E-4GB":"E-01-4","D4NB-24E-8GB":"E-01-4","D4NB-24E-16GB":"E-01-4","D4NB-32E-8GB":"E-01-4","D5DS-48E-16GB":"E-01-4","D5NB-48E-16GB":"E-01-4","D5NB-56E-16GB":"E-01-4","KB-AC101":"E-01-3","KB-AC102":"E-01-3","KB-AC111-GAT":"E-01-3","KB-AC115":"E-01-3","KB-AC117-ES":"E-01-3","KB-AC118":"E-01-3","KB-AC119":"E-01-3","KB-AC119-US":"E-01-3","KB-AC120-BT":"E-01-3","KB-AC3100":"E-01-3","KB-AC515-43":"E-01-3","KB-AC521-GAT":"E-01-3","KB-AC531-BR":"E-01-3","KB-AC5516":"E-01-3","KB-AC591-32":"E-01-3","KB-AC591G":"E-01-3","KB-AC5930":"E-01-3","KB-AC7000":"E-01-3","KB-ACONE-B":"E-01-3","KB-ACONE-WBR":"E-01-3","KB-ACONE532":"E-01-3","KB-ACONE751":"E-01-3","KB-ACS3":"E-01-3","KB-AP1278":"E-01-3","KB-AP1286":"E-01-3","KB-AP1286-US":"E-01-3","KB-AP1369":"E-01-3","KB-AP1370-US":"E-01-3","KB-AP1398-US":"E-01-3","KB-AP1425":"E-01-3","KB-AP1502-US":"E-01-3","KB-AP1534":"E-01-3","KB-AP1706":"E-01-3","KB-AP1708":"E-01-3","KB-AP1932":"E-01-3","KB-AP1989":"E-01-3","KB-AP2141":"E-01-3","KB-AS102":"E-01-3","KB-AS105":"E-01-3","KB-AS105-F":"E-01-3","KB-AS105-W":"E-01-3","KB-AS110":"E-01-3","KB-AS117":"E-01-3","KB-AS121-P":"E-01-3","KB-AS122":"E-01-3","KB-AS125":"E-01-3","KB-AS126":"E-01-3","KB-AS126-US":"E-01-3","KB-AS127":"E-01-3","KB-AS128":"E-01-3","KB-AS131":"E-01-3","KB-AS152":"E-01-3","KB-AS154":"E-01-3","KB-AS510UA":"E-01-3","KB-AS515":"E-01-2","KB-ASF80":"E-01-2","KB-ASF80-BT":"E-01-2","KB-ASK42":"E-01-2","KB-ASK42-F":"E-01-2","KB-ASK42-US":"E-01-2","KB-ASM515":"E-01-2","KB-ASN10":"E-01-2","KB-ASUL20-SF":"E-01-2","KB-ASUX21":"E-01-2","KB-ASVS200":"E-01-2","KB-ASVS400":"E-01-2","KB-CPCQ25":"E-01-2","KB-CPCQ29":"E-01-2","KB-DE102":"E-01-2","KB-DE104":"E-01-2","KB-DE106":"E-01-2","KB-DE107":"E-01-2","KB-DE108":"E-01-2","KB-DE109-BL":"E-01-2","KB-DE1090":"E-01-2","KB-DE111-LI":"E-01-2","KB-DE114":"E-01-2","KB-DE1310":"E-01-2","KB-DE3501":"E-01-2","KB-DE3501-SI":"E-01-2","KB-DE3511":"E-01-2","KB-DE3520":"E-01-2","KB-DE4310-A":"E-01-2","KB-DE500-BR":"E-01-2","KB-DE5400":"E-01-2","KB-DE5470-P":"E-01-2","KB-DE5510":"E-01-2","KB-DE5520":"E-01-2","KB-DE5570":"E-01-2","KB-DE6400-B-US":"E-01-2","KB-DE6420-B":"E-01-2","KB-DE7537":"E-01-2","KB-DIN14R":"E-01-2","KB-DIN14RN-LI":"E-01-2","KB-DIN1545-S":"E-01-2","KB-DIN16R":"E-01-2","KB-DIN3168":"E-01-2","KB-DV6000":"E-01-2","KB-DVO3300":"E-01-2","KB-EEE1000-B":"E-01-2","KB-EEE1000HE":"E-01-2","KB-EEE1005-BL":"E-01-2","KB-EEE1015":"E-01-2","KB-EEE1015-TC":"E-01-2","KB-EEE1015-WH":"E-01-2","KB-EEE900-W":"E-01-2","KB-HCQ62":"E-01-2","KB-HDM1-3":"E-01-2","KB-HDM3":"E-02-4","KB-HDM4-F":"E-02-4","KB-HDM4-WH":"E-02-4","KB-HDV2":"E-02-4","KB-HDV2000":"E-02-4","KB-HDV4-3BL":"E-02-4","KB-HDV4-BL":"E-02-4","KB-HDV5":"E-02-4","KB-HDV6-3BL":"E-02-4","KB-HDV6-6":"E-02-4","KB-HDV6-BR":"E-02-4","KB-HDV7-4-BR":"E-02-4","KB-HDV7-4-PO":"E-02-4","KB-HEL2530":"E-02-4","KB-HEL2560":"E-02-4","KB-HEL8440":"E-02-4","KB-HEL8460":"E-02-4","KB-HEL8460-F":"E-02-4","KB-HEL8460-P":"E-02-4","KB-HMI1000-BL":"E-02-4","KB-HMI110-1BL":"E-02-4","KB-HMI210":"E-02-4","KB-HMI210-F":"E-02-4","KB-HP0015":"E-02-4","KB-HP027":"E-02-4","KB-HP102":"E-02-4","KB-HP103":"E-02-4","KB-HP1030-G2":"E-02-4","KB-HP104-SF":"E-02-4","KB-HP108":"E-02-4","KB-HP109":"E-02-4","KB-HP114":"E-02-4","KB-HP114-F":"E-02-4","KB-HP115":"E-02-4","KB-HP116":"E-02-4","KB-HP117":"E-02-4","KB-HP121":"E-02-3","KB-HP124":"E-02-3","KB-HP125-BR":"E-02-3","KB-HP127":"E-02-3","KB-HP127-PO":"E-02-3","KB-HP127-PO-F":"E-02-3","KB-HP128":"E-02-3","KB-HP129":"E-02-3","KB-HP130":"E-02-3","KB-HP131":"E-02-3","KB-HP133":"E-02-3","KB-HP136":"E-02-3","KB-HP137":"E-02-3","KB-HP138":"E-02-3","KB-HP140":"E-02-3","KB-HP141":"E-02-3","KB-HP2560":"E-02-3","KB-HP320-BR":"E-02-3","KB-HP420":"E-02-3","KB-HP500":"E-02-3","KB-HP500-US":"E-02-3","KB-HP510":"E-02-3","KB-HP650-G2":"E-02-3","KB-HP6510":"E-02-3","KB-HP6530B":"E-02-3","KB-HP745-G3":"E-02-3","KB-HP745-G7":"E-02-3","KB-HP820-G1":"E-02-3","KB-HPCQ10-BR":"E-02-3","KB-HPCQ10-BR-SI":"E-02-3","KB-HPCQ45":"E-02-3","KB-HPCQ60":"E-02-3","KB-HPCQ700":"E-02-3","KB-HPG4-2-BL":"E-02-3","KB-HPG4-2-WH":"E-02-3","KB-HPR4330":"E-02-3","KB-HPR4535":"E-02-3","KB-HPR6440":"E-02-3","KB-HPV6000":"E-02-3","KB-LE10-2":"E-02-3","KB-LE105":"E-02-3","KB-LE106":"E-02-3","KB-LE107":"E-02-3","KB-LE108":"E-02-3","KB-LE108-CI":"E-02-3","KB-LE110":"E-02-3","KB-LE111":"E-02-3","KB-LE112":"E-02-3","KB-LE116":"E-02-3","KB-LE117":"E-02-3","KB-LE118":"E-02-3","KB-LE119":"E-02-3","KB-LE120":"E-02-3","KB-LE121":"E-02-3","KB-LE123":"E-02-2","KB-LE124":"E-02-2","KB-LE125":"E-02-2","KB-LE126":"E-02-2","KB-LE127":"E-02-2","KB-LE382":"E-02-2","KB-LE480S":"E-02-2","KB-LE481S":"E-02-2","KB-LEB470":"E-02-2","KB-LEB5050":"E-02-2","KB-LEF514":"E-02-2","KB-LEG50":"E-02-2","KB-LEG530":"E-02-2","KB-LEG550":"E-02-2","KB-LEIZ450":"E-02-2","KB-LEIZ450-FC":"E-02-2","KB-LEIZ450-SF":"E-02-2","KB-LES400-BL":"E-02-2","KB-LES400-BL-US":"E-02-2","KB-LES400-CI":"E-02-2","KB-LEY520":"E-02-2","KB-LEZ400":"E-02-2","KB-LEZ480":"E-02-2","KB-LG103":"E-02-2","KB-LG105":"E-02-2","KB-LG106":"E-02-2","KB-LGA510-B":"E-02-2","KB-LGC400-BR":"E-02-2","KB-LGLW60":"E-02-2","KB-LGR410-B":"E-02-2","KB-LGR510-B":"E-02-2","KB-LGU360":"E-02-2","KB-NAC-06":"E-02-2","KB-NAC-06-SF":"E-02-2","KB-NAC-08":"E-02-2","KB-NAC-12":"E-02-2","KB-NAC-13-F":"E-02-2","KB-NAC-15":"E-02-2","KB-NAC-17":"E-02-2","KB-NAC-21":"E-02-2","KB-NAC-22":"E-02-2","KB-NAC-23":"E-02-2","KB-NAC-23-F10":"E-02-2","KB-NAC-23-F4":"E-02-2","KB-NAC-24":"E-02-2","KB-NAC-25":"E-02-2","KB-NAC-26":"E-02-2","KB-NAC-27":"E-02-2","KB-NAC-29":"E-02-2","KB-NAC-30-B":"E-02-2","KB-NAC-30-S":"E-02-2","KB-NAC-31":"E-02-2","KB-NAC-37":"E-02-2","KB-NAC-38":"E-02-2","KB-NAC-41":"E-03-4","KB-NAC-42":"E-03-4","KB-PO003":"E-03-4","KB-PO3010":"E-03-4","KB-SA102-WH-US":"E-03-4","KB-SA103":"E-03-4","KB-SA103-WH":"E-03-4","KB-SA111":"E-03-4","KB-SA112":"E-03-4","KB-SA113":"E-03-4","KB-SA114":"E-03-4","KB-SA116":"E-03-4","KB-SA117":"E-03-4","KB-SA117-WH":"E-03-4","KB-SA118":"E-03-4","KB-SA119":"E-03-4","KB-SA119-US":"E-03-4","KB-SA120":"E-03-4","KB-SA122":"E-03-4","KB-SA311":"E-03-4","KB-SANP270-WH":"E-03-4","KB-SANP530":"E-03-4","KB-SANP550-WH":"E-03-4","KB-SANP670":"E-03-4","KB-SAR480":"E-03-4","KB-SARV511":"E-03-4","KB-SO104-B":"E-03-4","KB-SO104-W":"E-03-4","KB-SO105":"E-03-4","KB-SO107-B":"E-03-4","KB-SO107-W":"E-03-4","KB-SO109":"E-03-4","KB-SOCW-BL":"E-03-4","KB-SOCW-WH-F":"E-03-4","KB-SOEA-BL":"E-03-4","KB-SOEA-WH":"E-03-4","KB-SOEB-BL":"E-03-3","KB-SOEB-WH":"E-03-3","KB-SOEB-WH-CF":"E-03-3","KB-SOEE-BL":"E-03-3","KB-SOEE-WH":"E-03-3","KB-SOEG-BL":"E-03-3","KB-SOEG-WH":"E-03-3","KB-SOEH-WH":"E-03-3","KB-SOFE14":"E-03-3","KB-SOM-BL":"E-03-3","KB-SOM-SI":"E-03-3","KB-SOSD-BN":"E-03-3","KB-SOSD-SI":"E-03-3","KB-SOSVC14":"E-03-3","KB-SOSVE15":"E-03-3","KB-SOSVE15-WH-F":"E-03-3","KB-SOSVE151":"E-03-3","KB-SOSVF14-B":"E-03-3","KB-SOSVP71":"E-03-3","KB-SOSVT13":"E-03-3","KB-TM2300-BR":"E-03-3","KB-TO101":"E-03-3","KB-TO104":"E-03-3","KB-TOA200-BL":"E-03-3","KB-TOA200-SI":"E-03-3","KB-TOA660":"E-03-3","KB-TOC650":"E-03-3","KB-TOC850":"E-03-4","KB-TOL600":"E-03-5","KB-TOP750-BR":"E-03-6","KB-AC5830T-TC":"E-03-3","KB-AS103":"E-03-3","KB-SANP270-TP-BLUE":"E-03-2","KB-SANP370-TP-B":"E-03-2","KB-SANP370-TP-S":"E-03-2","KB-SARV511-TC":"E-03-2","PM-14FNB":"E-03-2","PM-15FNB":"E-03-2","PM-16FNG":"E-03-2","PM-17FNB":"E-03-2","BB11-AC058-PRO":"C-03-4","BB11-AC071":"C-03-4","BB11-AC072":"C-03-4","BB11-AC075":"C-03-4","BB11-AP028":"C-03-4","BB11-AP034":"C-03-4","BB11-AS055":"C-03-4","BB11-AS060":"C-03-4","BB11-AS083":"C-03-4","BB11-AS084":"C-03-3","BB11-AS088":"C-03-3","BB11-ASX510":"C-03-3","BB11-DE040":"C-03-3","BB11-DE061":"C-03-3","BB11-DE063":"C-03-3","BB11-DE065":"C-03-3","BB11-DE069":"C-03-3","BB11-DE084-6C":"C-03-3","BB11-DE086":"C-03-2","BB11-DE089":"C-03-2","BB11-DE091":"C-03-2","BB11-DE096":"C-03-2","BB11-DE096-H":"C-03-2","BB11-DE098":"C-03-2","BB11-DE111-4C":"C-03-2","BB11-DE119":"C-03-2","BB11-DE121":"C-03-2","BB11-DE122":"B-01-4","BB11-DE124":"B-01-4","BB11-DE133":"B-01-4","BB11-DE133-3C":"B-01-4","BB11-DE137":"B-01-4","BB11-DE137-4C":"B-01-4","BB11-DE138":"B-01-4","BB11-DE147":"B-01-4","BB11-DE155":"B-01-3","BB11-DE3410":"B-01-3","BB11-DE3500-3C":"B-01-3","BB11-DE549":"B-01-3","BB11-DE7300-3C":"B-01-3","BB11-HP031-A":"B-01-3","BB11-HP031-H":"B-01-3","BB11-HP058-H":"B-01-3","BB11-HP064":"B-01-3","BB11-HP068":"B-01-2","BB11-HP082":"B-01-2","BB11-HP085":"B-01-2","BB11-HP086":"B-01-2","BB11-HP088":"B-01-2","BB11-HP094":"B-01-2","BB11-HP097":"B-01-2","BB11-HP098":"B-01-2","BB11-HP100":"B-02-4","BB11-HP103":"B-02-4","BB11-HP104":"B-02-4","BB11-HP105":"B-02-4","BB11-HP830":"B-02-4","BB11-LE009":"B-02-4","BB11-LE014":"B-02-4","BB11-LE019":"B-02-4","BB11-LE024":"B-02-4","BB11-LE025":"B-02-3","BB11-LE031":"B-02-3","BB11-LE032":"B-02-3","BB11-LE034":"B-02-3","BB11-LE041":"B-02-3","BB11-LE052":"B-02-3","BB11-LE055":"B-02-3","BB11-LE057":"B-02-3","BB11-LG010-B":"B-02-3","BB11-NA003-11":"B-02-2","BB11-NA003-14":"B-02-2","BB11-NA005":"B-02-2","BB11-SO031":"B-02-2","BB11-SO036":"B-02-2","BB11-SS015-S":"B-02-2","BB11-SS015-WH":"B-02-2","BB11-SS017":"B-02-2","BB11-TS004-A":"B-02-2","KB-AC515-55":"D-01-1","KB-ACN515-45":"D-01-1","KB-ACN515-47":"D-01-1","KB-ACSF314":"D-01-1","KB-AP1370":"D-01-1","KB-ASX513":"D-02-1","KB-DEI5480":"D-02-1","KB-DEV3401":"D-02-1","KB-DEV3510":"D-02-1","KB-DEV3510-SI":"D-02-1","KB-LEI382MF":"D-02-1","KB-TO105":"D-02-1","BB11-AC003-11":"F-08-4","BB11-AC037-V11":"F-08-4","BB11-AC038-A":"F-08-4","BB11-AC051-A":"F-08-4","BB11-AC058-PRO-H":"F-08-3","BB11-AC060-B":"F-08-3","BB11-AC060-BW":"F-08-3","BB11-AC060-SW":"F-08-3","BB11-AC062-A":"F-08-2","BB11-AC063":"F-08-2","BB11-AC066-H":"F-08-2","BB11-AC068":"F-08-1","BB11-AC070":"F-08-1","BB11-AC073":"F-08-1","BB11-AC076":"F-09-4","BB11-AC079":"F-09-4","BB11-AC080":"F-09-4","BB11-AC084":"F-09-3","BB11-AC087":"F-09-3","BB11-AC089":"F-09-3","BB11-AC090":"F-09-2","BB11-AP021-W":"F-09-2","BB11-AP025":"F-09-2","BB11-AP026":"F-09-1","BB11-AP027":"F-09-1","BB11-AP029":"F-09-1","BB11-AP030":"F-10-4","BB11-AP031":"F-10-4","BB11-AP032":"F-10-3","BB11-AP033":"F-10-3","BB11-AP035":"F-10-2","BB11-AP036":"F-10-2","BB11-AP037":"F-10-2","BB11-AP039":"F-10-1","BB11-AP043":"F-10-1","BB11-AP045":"F-11-4","BB11-AP046":"F-11-4","BB11-AP050":"F-11-4","BB11-AS052-B":"F-11-3","BB11-AS054":"F-11-3","BB11-AS056":"F-11-3","BB11-AS057":"F-11-2","BB11-AS059":"F-11-2","BB11-AS061":"F-11-2","BB11-AS062":"F-11-2","BB11-AS063":"F-11-1","BB11-AS064":"F-11-1","BB11-AS066":"F-12-4","BB11-AS067":"F-12-4","BB11-AS068":"F-12-4","BB11-AS071":"F-12-4","BB11-AS073":"F-12-4","BB11-AS074":"F-12-3","BB11-AS075":"F-12-3","BB11-AS076":"F-12-2","BB11-AS077":"F-12-2","BB11-AS078":"F-12-2","BB11-AS079":"F-12-1","BB11-AS081":"F-12-1","BB11-AS085":"F-12-1","BB11-AS430":"F-12-1","BB11-AS433":"F-13-4","BB11-AS451":"F-13-4","BB11-AS507":"F-13-3","BB11-AS540":"F-13-3","BB11-AS550":"F-13-3","BB11-CP041-A":"F-13-2","BB11-CP045":"F-13-2","BB11-DE003-A":"F-13-2","BB11-DE025-PRO":"F-13-2","BB11-DE037":"F-13-2","BB11-DE040-H":"F-13-1","BB11-DE050-6":"F-13-1","BB11-DE051":"F-14-4","BB11-DE052":"F-14-4","BB11-DE052-H":"F-14-4","BB11-DE053-H":"F-14-3","BB11-DE055-HH":"F-14-3","BB11-DE057":"F-14-3","BB11-DE061-H":"F-14-3","BB11-DE062":"F-14-2","BB11-DE063-H":"F-14-2","BB11-DE067":"F-14-1","BB11-DE076":"F-14-1","BB11-DE080-H":"F-14-1","BB11-DE081":"F-14-1","BB11-DE081-H":"F-15-4","BB11-DE085-H":"F-15-4","BB11-DE087":"F-15-4","BB11-DE088":"F-15-3","BB11-DE091-H":"F-15-3","BB11-DE094":"F-15-3","BB11-DE095":"F-15-2","BB11-DE102":"F-15-2","BB11-DE103":"F-15-2","BB11-DE105":"F-15-2","BB11-DE105-3C":"F-15-1","BB11-DE107":"F-15-1","BB11-DE108":"F-16-4","BB11-DE110":"F-16-3","BB11-DE118":"F-16-3","BB11-DE119-3C":"F-16-3","BB11-DE123":"F-16-2","BB11-DE126":"F-16-2","BB11-DE127-3C":"F-16-2","BB11-DE128":"F-16-1","BB11-DE132":"F-16-1","BB11-DE134":"F-16-1","BB11-DE135":"F-17-4","BB11-DE138-4C":"F-17-4","BB11-DE139":"F-17-4","BB11-DE141":"F-17-3","BB11-DE145":"F-17-3","BB11-DE148":"F-17-3","BB11-DE149":"F-17-2","BB11-DE150":"F-17-2","BB11-DE151":"F-17-1","BB11-DE151-3C":"F-17-1","BB11-DE153":"F-17-1","BB11-DE154":"F-18-4","BB11-DE175":"F-18-4","BB11-DE3410-4C":"F-18-4","BB11-DE3500-4C":"F-18-3","BB11-DE3511-3C":"F-18-3","BB11-DE3511-4C":"F-18-2","BB11-DE3590":"F-18-2","BB11-DE5285":"F-18-1","BB11-DE5520-3C":"F-18-1","BB11-DE5520-4C":"F-18-1","BB11-DE5550":"F-19-4","BB11-DE7300-4C":"F-19-4","BB11-HP019-A":"F-19-4","BB11-HP020-PRO":"F-19-3","BB11-HP022-PRO":"F-19-3","BB11-HP028-H":"F-19-3","BB11-HP033-A":"F-19-3","BB11-HP034-A":"F-19-2","BB11-HP035-PRO":"F-19-2","BB11-HP040-H":"F-19-2","BB11-HP043-A":"F-19-2","BB11-HP044-A":"F-19-1","BB11-HP046":"F-19-1","BB11-HP050-H":"F-19-1","BB11-HP051":"F-19-1","BB11-HP054":"F-20-4","BB11-HP056":"F-20-4","BB11-HP066":"F-20-4","BB11-HP067":"F-20-4","BB11-HP070":"F-20-4","BB11-HP072":"F-20-3","BB11-HP073":"F-20-3","BB11-HP073-9C":"F-20-3","BB11-HP074":"F-20-2","BB11-HP077":"F-20-2","BB11-HP078":"F-20-1","BB11-HP080":"F-20-1","BB11-HP087":"F-20-1","BB11-HP088-S":"F-21-4","BB11-HP089":"F-21-4","BB11-HP090":"F-21-4","BB11-HP092":"F-21-3","BB11-HP093":"F-21-3","BB11-HP101":"F-21-3","BB11-HP1030":"F-21-3","BB11-HP108":"F-21-2","BB11-HP110":"F-21-2","BB11-HP111":"F-21-2","BB11-HP114":"F-21-1","BB11-HP115":"F-21-1","BB11-HP117":"F-21-1","BB11-HP455":"F-22-4","BB11-IB049-PRO":"F-22-4","BB11-IB055-H":"F-22-4","BB11-IT008-A":"F-22-4","BB11-LE007-A":"F-22-3","BB11-LE007-H":"F-22-3","BB11-LE010":"F-22-3","BB11-LE015":"F-22-3","BB11-LE017":"F-22-3","BB11-LE019-H":"F-22-2","BB11-LE021":"F-22-2","BB11-LE022":"F-22-2","BB11-LE027":"F-22-1","BB11-LE029":"F-22-1","BB11-LE030":"F-22-1","BB11-LE033":"F-23-4","BB11-LE040":"F-23-4","BB11-LE042":"F-23-4","BB11-LE044":"F-23-4","BB11-LE045":"F-23-3","BB11-LE046":"F-23-3","BB11-LE047":"F-23-3","BB11-LE050":"F-23-2","BB11-LE058":"F-23-2","BB11-LE063":"F-23-2","BB11-LE280":"F-23-2","BB11-LE507":"F-23-1","BB11-LE910":"F-23-1","BB11-LEL380":"F-23-1","BB11-LET490":"F-23-1","BB11-LG001-A":"F-24-4","BB11-LG009":"F-24-4","BB11-LG009-WH":"F-24-4","BB11-LG011":"F-24-3","BB11-LG012":"F-24-3","BB11-MS002":"F-24-2","BB11-NA006":"F-24-2","BB11-NA018":"F-24-2","BB11-NA021":"F-24-2","BB11-SO015-PRO":"F-24-1","BB11-SO023-A":"F-24-1","BB11-SO023-A2":"F-24-1","BB11-SO025-H":"F-25-4","BB11-SO038":"F-25-4","BB11-SO040":"F-25-4","BB11-SO041":"F-25-3","BB11-SO042":"F-25-3","BB11-SO046":"F-25-3","BB11-SO047":"F-25-3","BB11-SS005-A":"F-25-2","BB11-SS016":"F-25-2","BB11-SS019":"F-25-2","BB11-SS022":"F-25-1","BB11-SS037":"F-25-1","BB11-SS200":"F-25-1","BB11-SS530":"F-25-1","BB11-TS004-H":"F-23-5","BB11-TS029-A":"F-23-5","BB11-TS085-A":"F-24-5","BB11-TS091":"F-24-5","BB11-TS092":"F-24-5","BB11-TS096":"F-25-5","ML-AC077":"F-25-5","ML-DE080-H":"F-25-5","ML-DE120":"F-25-5","BB20-AP140-C":"A-01-1","BB24-MACB-M":"A-01-1","BB20-MI3":"A-01-1","BB24-SAMS-M":"A-01-1","BB24-HP-M":"A-01-1","BB20-HP19":"A-01-1","CA-AC315":"F-26-8","CA-AC515":"F-26-8","CA-ACVX15":"F-26-8","CA-AN515":"F-26-7","CA-DE3590":"F-26-7","CAB-AC315":"F-26-7","CAB-AC515":"F-26-6","CAB-AC533":"F-26-6","CAB-LE3156":"F-26-6","CAB-SA300":"F-26-5","CAB-SA530":"F-26-5","CC-AC531":"F-26-5","CC-DE3410":"F-26-4","CC-DE3580":"F-26-4","CC-DE5547":"F-26-4","CC-DE5558":"F-26-3","CCD-LEG50":"F-26-3","CCD-SA550":"F-26-3","CD-DE1430":"F-26-2","CD-DE3490":"F-26-2","CD-DE5110":"F-26-2","CAB-DE15R6":"F-26-1","CAB-DE17R4":"F-26-1","BB12-CA001-A":"F-27-8","BB12-CA008-A":"F-27-8","BB12-CA009-A":"F-27-8","BB12-CA010-A":"F-27-8","BB12-CA014-A":"F-27-8","BB12-CA015-A":"F-27-8","BB12-CA016":"F-27-8","BB12-CA016-D":"F-27-7","BB12-CA017":"F-27-7","BB12-CA018":"F-27-7","BB12-CA019":"F-27-7","BB12-CA020":"F-27-7","BB12-CA022":"F-27-7","BB12-CA023":"F-27-7","BB12-CA024":"F-27-6","BB12-CA025":"F-27-6","BB12-CA027":"F-27-6","BB12-CA028":"F-27-6","BB12-CS006":"F-27-6","BB12-FU004-A":"F-27-6","BB12-FU006-A":"F-27-6","BB12-GE002-A":"F-27-5","BB12-GP001":"F-27-5","BB12-GP002":"F-27-5","BB12-GP003":"F-27-5","BB12-GP004":"F-27-5","BB12-GP005":"F-27-5","BB12-GP006":"F-27-5","BB12-HP001-A":"F-27-4","BB12-NI004-A":"F-27-4","BB12-NI008-A":"F-27-4","BB12-NI009-A":"F-27-4","BB12-NI011":"F-27-4","BB12-NI012":"F-27-4","BB12-NI013":"F-27-4","BB12-NI014":"F-27-3","BB12-NI015":"F-27-3","BB12-NI016":"F-27-3","BB12-NI018":"F-27-3","BB12-NI019":"F-27-3","BB12-NI025":"F-27-3","BB12-OP006-A":"F-27-3","BB12-OP008-A":"F-27-2","BB12-PO001-A":"F-27-2","BB12-PS002-A":"F-27-2","BB12-PS005-A":"F-27-2","BB12-PS006-A":"F-27-2","BB12-PS008-A":"F-27-2","BB12-PS011-A":"F-27-2","BB12-PS014":"F-27-1","BB12-SA003-A":"F-27-1","BB12-SO006-A":"F-27-1","BB12-SO007-A":"F-27-1","BB12-SO011-A":"F-27-1","BB12-SO012":"F-27-1","BB12-SO013":"F-27-1","BB12-SO014":"F-28-8","BB12-SO015":"F-28-8","BB12-SS006-A":"F-28-8","BB12-SS007-A":"F-28-8","BB13-JV034-A":"F-28-8","BB13-PS008-H":"F-28-8","BB13-PS014-A":"F-28-8","BB13-PS016-A":"F-28-7","BB13-PS027":"F-28-7","BB13-SO001-H":"F-28-7","BB13-SO002-B":"F-28-7","BB13-SO005-A":"F-28-7","BB13-SO005-C":"F-28-7","BB13-SO013-A":"F-28-7","BB13-SO014-A":"F-28-6","BB13-SO015-A":"F-28-6","BB13-SO017-A":"F-28-6","BB13-SO017-H":"F-28-6","BB13-SO025-DIG":"F-28-6","BB13-SO026":"F-28-6","BB13-SO027":"F-28-6","BB13-SO031":"F-28-5","BB13-SO032":"F-28-5","BB13-SO033":"F-28-5","BB13-SO034":"F-28-5","BB14-BP-L100-A":"F-28-5","BB14-BP-L100-S":"F-28-5","BB14-BPU90":"F-28-5","BB14-SO016":"F-28-4","BB32-AHDBT-301":"F-28-4","BB32-AHDBT-401":"F-28-4","BB32-AHDBT-501":"F-28-4","BB32-CA13L":"F-28-4","BB32-CA1L":"F-28-4","BB32-CA4L":"F-28-4","BB32-CAE10":"F-28-3","BB32-CAE10-D":"F-28-3","BB32-CAE17":"F-28-3","BB32-CAE6":"F-28-3","BB32-CAE8":"F-28-3","BB32-FU40":"F-28-3","BB32-NIEL14":"F-28-3","BB32-NIEL19":"F-28-2","BB32-NIEL23":"F-28-2","BB32-NIEL5":"F-28-2","BB32-PABL19":"F-28-2","BB32-SO550":"F-28-2","BB32-SO570":"F-28-2","BB32-SO970":"F-28-2","BB32-SOBG1":"F-28-1","BB32-SOBN1":"F-28-1","BB32-SOFW50":"F-28-1","BB32-SOFZ100":"F-28-1","CABO-2507":"F-28-1","CABO-4530":"F-28-1","CABO-AC19-B21":"F-28-1","CABO-AP16-L":"F-29-8","CABO-AP65-M2":"F-29-8","CABO-BP":"F-29-8","CABO-C":"F-29-8","CABO-CP18-A":"F-29-8","CABO-CP6300":"F-29-8","CABO-DE19-A":"F-29-8","CABO-DE19-T6":"F-29-7","CABO-DE19-U6":"F-29-7","CABO-HP19-4":"F-29-7","CABO-HP19-40":"F-29-7","CABO-LE79":"F-29-7","CABO-LEUSB":"F-29-7","CABO-SA19-40B":"F-29-7","CABO-SA19-A":"F-29-6","CABO-SO19-B2":"F-29-6","CABO-TO19-B25":"F-29-6","CABO-TP":"F-29-6","CI-AC001":"F-29-6","CI-AC002":"F-29-6","CI-AC005":"F-29-6","CI-AC3820T":"F-29-5","CI-AC4738":"F-29-5","CI-AC4739":"F-29-5","CI-AC4750":"F-29-5","CI-AC515":"F-29-5","CI-AC5421":"F-29-5","CI-AC5571":"F-29-5","CI-AC5733":"F-29-4","CI-AC5750":"F-29-4","CI-ACE1-471":"F-29-4","CI-ACV5-571":"F-29-4","CI-AS002":"F-29-4","CI-AS004":"F-29-4","CI-AS543":"F-29-4","CI-ASA45":"F-29-3","CI-ASS400":"F-29-3","CI-CCEU25":"F-29-3","CI-DE001":"F-29-3","CI-DE002":"F-29-3","CI-DE005":"F-29-3","CI-DE006":"F-29-3","CI-DE007":"F-29-2","CI-DE008":"F-29-2","CI-DE1555":"F-29-2","CI-DE3300":"F-29-2","CI-DE3421":"F-29-2","CI-DE3460":"F-29-2","CI-DE3490":"F-29-2","CI-DE3511":"F-29-1","CI-DE3550":"F-29-1","CI-DE3560":"F-29-1","CI-DE3579":"F-29-1","CI-DE5400":"F-29-1","CI-DE5423":"F-29-1","CI-DE5450":"F-29-1","CI-DE5481":"F-30-8","CI-DE5570":"F-30-8","CI-DE7472":"F-30-8","CI-DEN4030":"F-30-8","CI-DEN4110":"F-30-8","CI-DEN5030":"F-30-8","CI-DEN5050":"F-30-8","CI-DEN5110":"F-30-7","CI-DEV3400":"F-30-7","CI-HP001":"F-30-7","CI-HP002":"F-30-7","CI-HP005":"F-30-7","CI-HP14K":"F-30-7","CI-HP256":"F-30-7","CI-HP4325":"F-30-6","CI-HP4330S":"F-30-6","CI-HP440":"F-30-6","CI-HP4530S":"F-30-6","CI-HP52000":"F-30-6","CI-HPCQ42-3PIN":"F-30-6","CI-HPCQ43":"F-30-6","CI-HPDM42":"F-30-5","CI-HPDV66":"F-30-5","CI-HPDV67":"F-30-5","CI-HPG6-2000":"F-30-5","CI-IT7520":"F-30-5","CI-LE001":"F-30-5","CI-LE002":"F-30-5","CI-LE003":"F-30-4","CI-LE400":"F-30-4","CI-LE530":"F-30-4","CI-LEB480":"F-30-4","CI-LEG460":"F-30-4","CI-LEG470":"F-30-4","CI-LES400":"F-30-4","CI-LET470":"F-30-3","CI-LG580":"F-30-3","CI-PH14M2":"F-30-3","CI-SA001":"F-30-3","CI-SA003":"F-30-3","CI-SA004":"F-30-3","CI-SA0410":"F-30-3","CI-SA300E":"F-30-2","CI-SA905S":"F-30-2","CI-SANP300":"F-30-2","CI-SANP550":"F-30-2","CI-SO001":"F-30-2","CI-SO6100":"F-30-2","CI-SOVT13":"F-30-2","B116XW03-V.0":"E-01-1","B156RW01-V.0":"E-01-1","DP-FP100":"E-01-1","DP-HF141":"E-01-1","DP-HF142":"E-01-1","DP-HF143":"E-01-1","DP-HM101":"E-01-1","DP-HM120":"E-01-1","DP-NP100":"E-01-1","DP-SJ270":"E-01-1","DP-SJ340":"E-01-1","DP-ST300":"E-01-1","LP154WX7":"E-01-1","BB20-AC19-F25":"A-21-5","BB20-AC19-ONE40":"A-21-5","BB20-AP14.5":"A-21-5","BB20-AS009":"A-21-4","BB20-CP18-A":"A-21-4","BB20-CP18-E":"A-21-3","BB20-CP19-A":"A-21-3","BB20-CP6300-180":"A-21-3","BB20-DE19-C":"A-21-2","BB20-DE19-D":"A-21-2","BB20-DE19-G":"A-21-1","BB20-DE19-N":"A-21-1","BB20-DE19-T9":"A-21-1","BB20-HP19-3":"A-22-5","BB20-HP19-6":"A-22-5","BB20-IB20-C":"A-22-4","BB20-LE20-D":"A-22-3","BB20-LE20-G":"A-22-3","BB20-LE20-H":"A-22-2","BB20-MI2":"A-22-2","BB20-MI4":"A-22-1","BB20-PH19":"A-22-1","BB20-PH19-30":"A-22-1","BB20-PO12-A":"A-22-1","BB20-PO20-B":"A-23-5","BB20-SA12-A":"A-23-4","BB20-SO10.5-30":"A-23-4","BB20-SO19-40":"A-23-3","BB20-SO19-A":"A-23-3","BB20-SO19-B":"A-23-3","BB20-SO19-E":"A-23-2","BB24-ACER-M":"A-23-2","BB24-ASUS-M":"A-23-1","BB24-DELL-M":"A-23-1","BB24-LENV-M":"A-23-1","MLF-DE19-T6":"A-23-1"};

// ════════════════════════════════════════════════════════════════════════
// LISTA FATURAMENTO — gerar listas, CSV, impressão, histórico e Picking Poluído
// Supabase do sistema de listas (projeto separado do Supabase da Central de Expedição).
// A chave abaixo é a chave PÚBLICA (publishable). Nunca coloque aqui a secret key.
// ════════════════════════════════════════════════════════════════════════
const LF_SUPABASE_URL = 'https://flvvhthiepgkgnnzrjmj.supabase.co';
const LF_SUPABASE_KEY = 'sb_publishable_T3QCEpguQ4thZhUFDex70A_Kf9lMVYD';
const LF_API = LF_SUPABASE_URL + '/rest/v1';
const LF_HEADERS = {
  apikey: LF_SUPABASE_KEY,
  Authorization: 'Bearer ' + LF_SUPABASE_KEY,
  'Content-Type': 'application/json',
};
// Quem gera/exclui/lança: o nome é escolhido na hora da ação (ordem alfabética).
const LF_OPERADORES = [
  { nome: 'Amanda Carvalho', email: 'bbdifaturamento04@gmail.com' },
  { nome: 'André Fossati', email: 'estoque@bbdi.com.br' },
  { nome: 'Camile Macedo', email: 'estoque.gbbdi6@gmail.com' },
  { nome: 'Eduarda Rodrigues', email: '' },
  { nome: 'Jorge William', email: 'faturamento2@bestbattery.com.br' },
  { nome: 'Lorenzo Silva', email: '' },
  { nome: 'Pietro Fayh', email: 'faturamento1@bestbattery.com.br' },
  { nome: 'Thayna Evangelista', email: 'thayna.evangelista@bbdi.com.br' },
].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
const LF_USUARIOS = [
  { email: 'bbbfaturamento02@gmail.com', nome: 'Andressa' },
  { email: 'estoque.gbbdi6@gmail.com', nome: 'Camile' },
  { email: 'faturamento1@bestbattery.com.br', nome: 'Pietro' },
  { email: 'faturamento2@bestbattery.com.br', nome: 'Jorge' },
  { email: 'bbdifaturamento04@gmail.com', nome: 'Amanda' },
  { email: 'logistica.bbdi8@gmail.com', nome: 'Tamiris' },
  { email: 'thayna.evangelista@bbdi.com.br', nome: 'Thayna' },
  { email: 'estoque@bbdi.com.br', nome: 'André' },
  { email: 'richard.souza@bbdi.com.br', nome: 'Richard' },
];
const LF_REQUIRED = [
  'C9 Pedido',
  'C9 Produto',
  'C9 Filial',
  'C5_DESCTRS',
  'Quantidade a Faturar',
];
// Colunas da tabela fila_lancamentos = colunas do CSV (a 2ª "Quantidade a Faturar" vira "... 2").
const LF_COLUNAS_FILA = [
  'C9 Produto ORDENCAO',
  'C9 Produto',
  'C9 Filial',
  'C9 Pedido',
  'Onda de Separacao',
  'Unidade de faturamento',
  'DataHoraFinanceiro',
  'Tipo de faturamento',
  'C5_DESCTRS',
  'Tipo de Separacao',
  'FILTRO V.1',
  'Quantidade a Faturar',
  'RANK 2',
  'RANK',
  'Quantidade a Faturar 2',
  'WMS PICKING',
  'WMS CAIXA',
  'Soma de Lead Time',
];
const LF_MOTIVO_POLUIDO = 'PICKING POLUÍDO';

// ─── Acesso ao Supabase ───────────────────────────────────────────────
async function lfApi(path, opt = {}) {
  const r = await fetch(LF_API + path, {
    ...opt,
    headers: { ...LF_HEADERS, ...(opt.headers || {}) },
  });
  const txt = await r.text();
  if (!r.ok) throw new Error(txt || 'Erro HTTP ' + r.status);
  if (!txt) return null;
  try {
    return JSON.parse(txt);
  } catch (e) {
    return txt;
  }
}

// ─── CSV ──────────────────────────────────────────────────────────────
function lfNorm(s) {
  return String(s || '').trim().replace(/^"|"$/g, '');
}
function lfParseLine(line, sep) {
  const out = [];
  let cur = '';
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (q && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else q = !q;
    } else if (c === sep && !q) {
      out.push(cur.trim());
      cur = '';
    } else cur += c;
  }
  out.push(cur.trim());
  return out;
}
function lfCsvParse(text) {
  let sep = '\t';
  const first = text.split(/\r?\n/)[0] || '';
  if (first.includes(';')) sep = ';';
  else if (first.includes(',')) sep = ',';
  return text
    .split(/\r?\n/)
    .filter((l) => l.trim())
    .map((l) => lfParseLine(l, sep));
}
// Lê o arquivo detectando a codificação: UTF-16 (texto Unicode do Excel/Tableau),
// UTF-8 (com ou sem BOM) e, se houver caracteres inválidos, Windows-1252.
async function lfLerTextoCsv(arquivo) {
  const bytes = new Uint8Array(await arquivo.arrayBuffer());
  let texto;
  if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) {
    texto = new TextDecoder('utf-16le').decode(bytes.subarray(2));
  } else if (bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff) {
    texto = new TextDecoder('utf-16be').decode(bytes.subarray(2));
  } else if (
    bytes.length >= 3 &&
    bytes[0] === 0xef &&
    bytes[1] === 0xbb &&
    bytes[2] === 0xbf
  ) {
    texto = new TextDecoder('utf-8').decode(bytes.subarray(3));
  } else {
    texto = new TextDecoder('utf-8').decode(bytes);
    if (texto.includes('�')) {
      texto = new TextDecoder('windows-1252').decode(bytes);
    }
  }
  return texto.replace(/^﻿/, '');
}
function lfLerCsv(text) {
  const data = lfCsvParse(text);
  if (!data.length) throw new Error('O arquivo está vazio.');
  const headers = data[0].map(lfNorm);
  const rows = data.slice(1).filter((r) => r.length);
  const idx = {};
  headers.forEach((h, i) => {
    idx[h] = i;
  });
  const faltando = LF_REQUIRED.filter((h) => idx[h] === undefined);
  return { headers, rows, idx, faltando };
}
function lfGet(row, idx, names) {
  for (const n of names) {
    const i = idx[n];
    if (i !== undefined) return lfNorm(row[i]);
  }
  return '';
}
function lfNum(v) {
  return Number(String(v || '0').replace(',', '.').replace(/[^0-9.-]/g, '')) || 0;
}
function lfFmtData(d) {
  try {
    const dt = new Date(d);
    return Number.isNaN(dt.getTime()) ? String(d || '') : dt.toLocaleString('pt-BR');
  } catch (e) {
    return d || '';
  }
}
function lfChunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}
function lfChaveRanking(valor) {
  let texto = lfNorm(valor).replace(/ /g, ' ').replace(/\s+/g, '').toUpperCase();
  if (/^\d+[.,]0+$/.test(texto)) texto = texto.replace(/[.,]0+$/, '');
  return texto;
}
function lfTextoRegra(v) {
  return String(v || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

// ─── Endereços ────────────────────────────────────────────────────────
function lfLocalizarEndereco(produto, row, idx) {
  const doArquivo = lfGet(row, idx, [
    'Localização',
    'Localizacao',
    'Endereço',
    'Endereco',
    'Localização Produto',
    'Localizacao Produto',
    'Endereço Produto',
    'Endereco Produto',
  ]);
  if (doArquivo) return doArquivo;
  const chave = String(produto || '').trim().toUpperCase();
  return LF_ENDERECOS[chave] || LF_ENDERECOS[String(produto || '').trim()] || '';
}
function lfLocalizacaoHistorico(produto, salva) {
  const s = String(salva || '').trim();
  if (s) return s;
  const chave = String(produto || '').trim().toUpperCase();
  return LF_ENDERECOS[chave] || LF_ENDERECOS[String(produto || '').trim()] || '';
}

// ─── Regras de envio ao estoque ───────────────────────────────────────
// Todo o pedido vai para a planilha do estoque (e não entra em lista de impressão) se:
//  1) Tipo de faturamento = PEDIDO CAIXA ou Tipo de Separação = Caixa (em qualquer linha do pedido); ou
//  2) FILTRO V.1 = Picking Insuficiente (em qualquer item do pedido).
function lfMotivoEstoque(p) {
  if (p.tipoCaixa) return 'PEDIDO_CAIXA';
  if (p.pickingInsuficiente) return 'PICKING_INSUFICIENTE';
  return '';
}
function lfRotuloMotivo(m) {
  return m === 'PEDIDO_CAIXA' ? 'PEDIDO CAIXA' : 'PICKING INSUFICIENTE';
}

function lfConsolidar(rows, idx, dataExecISO, dataExecTexto) {
  const mapa = new Map();
  let linhasInvalidas = 0;

  for (const row of rows) {
    const pedido = String(lfGet(row, idx, ['C9 Pedido']) || '').trim();
    const produto = String(lfGet(row, idx, ['C9 Produto']) || '').trim();
    if (!pedido || !produto) {
      linhasInvalidas++;
      continue;
    }
    const quantidade = lfNum(lfGet(row, idx, ['Quantidade a Faturar', 'Quantidade Faturar']));

    if (!mapa.has(pedido)) {
      mapa.set(pedido, {
        pedido,
        filial: lfGet(row, idx, ['C9 Filial']),
        transportadora: lfGet(row, idx, ['C5_DESCTRS', 'C5_DESCTRIS', 'C5 DESCTRS']),
        totalQtd: 0,
        tipoCaixa: false,
        pickingInsuficiente: false,
        linhasOriginais: [],
        itensMap: new Map(),
      });
    }
    const pedidoObj = mapa.get(pedido);
    pedidoObj.linhasOriginais.push(row);

    // Caixa (estoque automático): Tipo de faturamento = PEDIDO CAIXA ou Tipo de Separação = Caixa.
    if (
      lfTextoRegra(
        lfGet(row, idx, ['Tipo de faturamento', 'Tipo de Faturamento', 'Tipo Faturamento'])
      ).includes('CAIXA') ||
      lfTextoRegra(lfGet(row, idx, ['Tipo de Separacao', 'Tipo de Separação', 'Tipo Separacao'])).includes('CAIXA')
    ) {
      pedidoObj.tipoCaixa = true;
    }
    // Picking Insuficiente: V.1 diz "Picking Insuficiente" OU o pedido é Picking e o V.1 traz "Insuficiente" (qualquer texto).
    const filtroV1 = lfTextoRegra(lfGet(row, idx, ['FILTRO V.1', 'Filtro V.1', 'FILTRO V1']));
    const tipoSep = lfTextoRegra(lfGet(row, idx, ['Tipo de Separacao', 'Tipo de Separação', 'Tipo Separacao']));
    if (filtroV1.includes('PICKING INSUFICIENTE') || (tipoSep.includes('PICKING') && filtroV1.includes('INSUFICIENTE'))) {
      pedidoObj.pickingInsuficiente = true;
    }

    const chaveProduto = produto.toUpperCase();
    if (!pedidoObj.itensMap.has(chaveProduto)) {
      pedidoObj.itensMap.set(chaveProduto, {
        row,
        pedido,
        produto,
        qtd: 0,
        localizacao: lfLocalizarEndereco(produto, row, idx),
        filial: pedidoObj.filial,
        transportadora: pedidoObj.transportadora,
        unidade: lfGet(row, idx, ['Unidade de faturamento']),
        financeiro: lfGet(row, idx, ['DataHoraFinanceiro']),
        dataExec: dataExecTexto,
        dataExecISO,
      });
    }
    const item = pedidoObj.itensMap.get(chaveProduto);
    item.qtd += quantidade;
    pedidoObj.totalQtd += quantidade;
  }

  return {
    pedidos: [...mapa.values()].map((p) => ({
      pedido: p.pedido,
      filial: p.filial,
      transportadora: p.transportadora,
      totalQtd: p.totalQtd,
      tipoCaixa: p.tipoCaixa,
      pickingInsuficiente: p.pickingInsuficiente,
      linhasOriginais: p.linhasOriginais,
      itens: [...p.itensMap.values()],
    })),
    linhasInvalidas,
  };
}

// ─── Consultas leves (pedidos_gerados / pedidos_estoque) ──────────────
async function lfConsultarPedidos(tabela, campos, pedidos) {
  const unicos = [...new Set((pedidos || []).map((p) => String(p || '').trim()).filter(Boolean))];
  const consultas = [];
  for (let i = 0; i < unicos.length; i += 180) {
    const valores = unicos
      .slice(i, i + 180)
      .map((v) => encodeURIComponent(v))
      .join(',');
    consultas.push(lfApi('/' + tabela + '?select=' + campos + '&pedido=in.(' + valores + ')&limit=5000'));
  }
  const resultados = consultas.length ? await Promise.all(consultas) : [];
  return resultados.flat().filter(Boolean);
}
// Pedidos já gerados em lista (tabela leve, uma linha por pedido).
async function lfPedidosJaGerados(pedidos) {
  const lista = await lfConsultarPedidos('pedidos_gerados', 'pedido,lista,usuario,data_hora', pedidos);
  const mapa = new Map();
  lista.forEach((x) => {
    const pedido = String(x.pedido || '').trim();
    if (pedido && !mapa.has(pedido)) {
      mapa.set(pedido, {
        lista: x.lista || '',
        usuario: x.usuario || '',
        data_hora: x.data_hora || '',
      });
    }
  });
  return mapa;
}
// Pedidos Caixa / Picking Insuficiente já enviados ao estoque (só o número do pedido).
async function lfPedidosJaNoEstoque(pedidos) {
  const lista = await lfConsultarPedidos('pedidos_estoque', 'pedido', pedidos);
  return new Set(lista.map((x) => String(x.pedido || '').trim()));
}
async function lfRegistrarPedidosEstoque(pedidos) {
  const unicos = [...new Set((pedidos || []).map((p) => String(p || '').trim()).filter(Boolean))];
  if (!unicos.length) return;
  await lfApi('/pedidos_estoque?on_conflict=pedido', {
    method: 'POST',
    body: JSON.stringify(unicos.map((pedido) => ({ pedido }))),
    headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
  });
}
async function lfProximoNumero() {
  const hist = await lfApi('/historico_listas?select=lista&order=id.desc&limit=1');
  if (!hist || !hist.length) return 1;
  const encontrado = String(hist[0].lista || '').match(/(\d+)/);
  if (!encontrado) return 1;
  const ultimo = Number(encontrado[1]);
  if (ultimo >= 10000) return 1;
  return ultimo + 1;
}

// ─── Fila da planilha (fila_lancamentos) ──────────────────────────────
function lfMontarItemFila({ pedido, ordem, motivo, cabecalhos, linha, usuario, email }) {
  const item = {};
  LF_COLUNAS_FILA.forEach((c) => {
    item[c] = '';
  });
  const vistos = {};
  (cabecalhos || []).forEach((cab, indice) => {
    const nome = String(cab ?? '').trim();
    vistos[nome] = (vistos[nome] || 0) + 1;
    const coluna = vistos[nome] === 1 ? nome : nome + ' ' + vistos[nome];
    if (LF_COLUNAS_FILA.includes(coluna)) {
      item[coluna] = String((linha || [])[indice] ?? '');
    }
  });
  item['C9 Pedido'] = String(pedido);
  item.motivo = motivo;
  item.ordem = ordem;
  item.chave = String(pedido) + '|' + motivo + '|' + ordem;
  item.usuario = usuario;
  item.email = email;
  return item;
}
async function lfSalvarFila(itens) {
  const validos = (itens || []).filter(
    (i) => String(i?.chave || '').trim() && String(i?.['C9 Pedido'] || '').trim()
  );
  if (!validos.length) return { confirmados: 0, pedidos: [] };
  const preparados = validos.map((i) => ({
    ...i,
    status: 'PENDENTE',
    erro: null,
    enviado_em: null,
  }));
  const resposta = await lfApi('/fila_lancamentos?on_conflict=chave&select=chave,status,erro', {
    method: 'POST',
    body: JSON.stringify(preparados),
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
  });
  const registros = Array.isArray(resposta) ? resposta : [];
  const pedidos = [
    ...new Set(
      registros.map((i) => String(i.chave || '').split('|')[0].trim()).filter(Boolean)
    ),
  ];
  return { confirmados: registros.length, pedidos };
}

// ─── Prévia e geração das listas ──────────────────────────────────────
async function lfPreview(rows, idx) {
  const agora = new Date().toISOString();
  const consolidado = lfConsolidar(rows, idx, agora, lfFmtData(agora));
  const pedidosAtuais = consolidado.pedidos.map((p) => p.pedido);
  const comRegra = consolidado.pedidos
    .filter((p) => lfMotivoEstoque(p))
    .map((p) => p.pedido);

  const detalhes = await lfPedidosJaGerados(pedidosAtuais);
  let jaNoEstoque = new Set();
  let aviso = '';
  try {
    jaNoEstoque = await lfPedidosJaNoEstoque(comRegra);
  } catch (e) {
    aviso = 'Não foi possível consultar a tabela pedidos_estoque: ' + e.message;
  }

  const grupos = {};
  const repetidos = [];
  let caixa = 0;
  let insuf = 0;
  let bloqueadosEstoque = 0;

  for (const p of consolidado.pedidos) {
    const motivo = lfMotivoEstoque(p);
    if (motivo && jaNoEstoque.has(String(p.pedido).trim())) {
      bloqueadosEstoque++;
      continue;
    }
    if (motivo) {
      if (motivo === 'PEDIDO_CAIXA') caixa++;
      else insuf++;
      continue;
    }
    if (detalhes.has(p.pedido)) {
      const info = detalhes.get(p.pedido) || {};
      repetidos.push({ pedido: p.pedido, ...info });
      continue;
    }
    const chave = p.filial + '|' + p.transportadora;
    if (!grupos[chave]) {
      grupos[chave] = { filial: p.filial, transportadora: p.transportadora, pedidos: 0, unidades: 0 };
    }
    grupos[chave].pedidos++;
    grupos[chave].unidades += p.totalQtd;
  }

  return {
    grupos: Object.values(grupos),
    novosParaLista: Object.values(grupos).reduce((a, b) => a + b.pedidos, 0),
    caixa,
    insuf,
    paraEstoque: caixa + insuf,
    bloqueadosEstoque,
    repetidos,
    linhasInvalidas: consolidado.linhasInvalidas,
    aviso,
  };
}

async function lfGerarListas({ rows, headers, idx, usuario, email, origemArquivo }) {
  const dataExecISO = new Date().toISOString();
  const dataExecTexto = lfFmtData(dataExecISO);
  const consolidado = lfConsolidar(rows, idx, dataExecISO, dataExecTexto);
  const pedidosAtuais = consolidado.pedidos.map((p) => p.pedido);
  const comRegra = consolidado.pedidos.filter((p) => lfMotivoEstoque(p)).map((p) => p.pedido);

  const [done, numeroInicial, jaNoEstoque] = await Promise.all([
    lfPedidosJaGerados(pedidosAtuais),
    lfProximoNumero(),
    lfPedidosJaNoEstoque(comRegra),
  ]);

  const grupos = {};
  const filaEstoque = [];
  const pedidosParaRegistrarEstoque = new Set();
  let pedidosCaixa = 0;
  let pedidosInsuf = 0;
  let bloqueadosHistorico = 0;
  let bloqueadosEstoque = 0;

  for (const p of consolidado.pedidos) {
    const motivo = lfMotivoEstoque(p);

    if (motivo && jaNoEstoque.has(String(p.pedido).trim())) {
      bloqueadosEstoque++;
      continue;
    }

    if (motivo) {
      pedidosParaRegistrarEstoque.add(String(p.pedido).trim());
      if (motivo === 'PEDIDO_CAIXA') pedidosCaixa++;
      else pedidosInsuf++;

      // Envia TODAS as linhas originais do pedido, com todas as colunas do CSV,
      // na mesma ordem e sem alterar nenhum valor.
      p.linhasOriginais.forEach((linhaOriginal, i) => {
        filaEstoque.push(
          lfMontarItemFila({
            pedido: p.pedido,
            ordem: i + 1,
            motivo: lfRotuloMotivo(motivo),
            cabecalhos: headers,
            linha: linhaOriginal,
            usuario,
            email,
          })
        );
      });
      continue;
    }

    if (done.has(p.pedido)) {
      bloqueadosHistorico++;
      continue;
    }
    const chave = p.filial + '|' + p.transportadora;
    if (!grupos[chave]) grupos[chave] = [];
    grupos[chave].push(p);
  }

  let numeroLista = numeroInicial;
  const listasSessao = [];
  const registrosPorLista = {};
  const histListas = [];
  const histPedidos = [];

  Object.values(grupos).forEach((pedidosGrupo) => {
    lfChunk(pedidosGrupo, 15).forEach((bloco) => {
      const lista = 'Lista ' + numeroLista++;
      const totalUnidades = bloco.reduce((t, p) => t + p.totalQtd, 0);

      listasSessao.push({
        lista,
        filial: bloco[0].filial,
        transportadora: bloco[0].transportadora,
        pedidos: bloco.length,
        unidades: totalUnidades,
        data_hora: dataExecISO,
        impresso: 'NÃO',
        status: 'ATIVA',
      });
      histListas.push({
        lista,
        data_hora: dataExecISO,
        usuario,
        email,
        filial: bloco[0].filial,
        transportadora: bloco[0].transportadora,
        pedidos: bloco.length,
        unidades: totalUnidades,
        impresso: 'NÃO',
      });

      const registros = [];
      bloco.forEach((p) => {
        p.itens.forEach((item) => {
          const linhaCsv = (item.row || []).map((v) => lfNorm(v));
          headers.forEach((cab, i) => {
            const nome = lfNorm(cab).toLowerCase();
            if (nome === 'quantidade a faturar' || nome === 'quantidade faturar') {
              linhaCsv[i] = String(Number(item.qtd || 0));
            }
          });
          const reg = {
            lista,
            data_hora: dataExecISO,
            usuario,
            email,
            filial: item.filial,
            transportadora: item.transportadora,
            pedido: item.pedido,
            produto: item.produto,
            quantidade: item.qtd,
            localizacao: item.localizacao,
            unidade_faturamento: item.unidade,
            data_hora_financeiro: item.financeiro,
            origem_arquivo: origemArquivo,
            cabecalhos_csv: [...headers],
            linha_csv: linhaCsv,
          };
          registros.push(reg);
          histPedidos.push(reg);
        });
      });
      registrosPorLista[lista] = registros;
    });
  });

  const gravacoes = [];
  if (histListas.length) {
    gravacoes.push(
      lfApi('/historico_listas', {
        method: 'POST',
        body: JSON.stringify(histListas),
        headers: { Prefer: 'return=minimal' },
      })
    );
  }
  if (histPedidos.length) {
    // Uma linha por pedido (tabela leve) para a checagem de duplicidade ser rápida.
    const vistos = new Set();
    const pedidosGerados = [];
    histPedidos.forEach((x) => {
      const n = String(x.pedido || '').trim();
      if (!n || vistos.has(n)) return;
      vistos.add(n);
      pedidosGerados.push({ pedido: n, lista: x.lista, usuario: x.usuario, data_hora: x.data_hora });
    });
    gravacoes.push(
      lfApi('/pedidos_gerados?on_conflict=pedido', {
        method: 'POST',
        body: JSON.stringify(pedidosGerados),
        headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      })
    );
    gravacoes.push(
      lfApi('/historico_pedidos', {
        method: 'POST',
        body: JSON.stringify(histPedidos),
        headers: { Prefer: 'return=minimal' },
      })
    );
  }

  const filaPromise = filaEstoque.length
    ? lfSalvarFila(filaEstoque)
    : Promise.resolve({ confirmados: 0, pedidos: [] });
  const [, resultadoFila] = await Promise.all([Promise.all(gravacoes), filaPromise]);

  if (filaEstoque.length && resultadoFila.confirmados === 0) {
    throw new Error(
      'O sistema identificou pedidos para o estoque, mas o Supabase não confirmou a gravação na fila_lancamentos.'
    );
  }

  // Só depois de a fila confirmar, anota o número dos pedidos em pedidos_estoque.
  if (pedidosParaRegistrarEstoque.size) {
    const confirmados = new Set(resultadoFila.pedidos || []);
    await lfRegistrarPedidosEstoque(
      [...pedidosParaRegistrarEstoque].filter((p) => confirmados.has(p))
    );
  }

  return {
    listasSessao,
    registrosPorLista,
    resumo: {
      listas: histListas.length,
      pedidosEstoque: pedidosCaixa + pedidosInsuf,
      pedidosCaixa,
      pedidosInsuf,
      itensFila: resultadoFila.confirmados,
      bloqueadosHistorico,
      bloqueadosEstoque,
      linhasInvalidas: consolidado.linhasInvalidas,
    },
  };
}

// ─── Impressão ────────────────────────────────────────────────────────
// Valor de uma coluna do CSV original guardado no histórico.
function lfValorCsv(registro, nomes) {
  const cab = Array.isArray(registro?.cabecalhos_csv) ? registro.cabecalhos_csv : [];
  const lin = Array.isArray(registro?.linha_csv) ? registro.linha_csv : [];
  const alvo = nomes.map((n) => String(n).trim().toLowerCase());
  const i = cab.findIndex((c) => alvo.includes(String(c || '').trim().toLowerCase()));
  return i >= 0 ? String(lin[i] ?? '').trim() : '';
}
// Ranking por pedido, na ordem da primeira aparição.
function lfCalcularRanking(registros) {
  const mapa = new Map();
  let prox = 1;
  return registros.map((r, i) => {
    const chave = lfChaveRanking(r.pedido) || '__linha_' + i;
    if (!mapa.has(chave)) mapa.set(chave, prox++);
    return mapa.get(chave);
  });
}
async function lfBuscarImpressao(lista) {
  const [cabecalhos, itens] = await Promise.all([
    lfApi(
      '/historico_listas?select=lista,data_hora,filial,transportadora,pedidos,unidades,status,motivo_ajuste,ajustada_em,ajustada_por,ajustada_email,usuario&lista=eq.' +
        encodeURIComponent(lista) +
        '&limit=1'
    ),
    lfApi(
      '/historico_pedidos?select=pedido,produto,quantidade,localizacao,unidade_faturamento,data_hora_financeiro,data_hora,filial,transportadora,cabecalhos_csv,linha_csv&lista=eq.' +
        encodeURIComponent(lista) +
        '&order=id.asc&limit=5000'
    ),
  ]);
  const info = Array.isArray(cabecalhos) && cabecalhos.length ? cabecalhos[0] : {};
  return { lista, info, registros: Array.isArray(itens) ? itens : [] };
}
async function lfMarcarImpressas(listas) {
  await Promise.all(
    listas.map((lista) =>
      lfApi('/historico_listas?lista=eq.' + encodeURIComponent(lista), {
        method: 'PATCH',
        body: JSON.stringify({ impresso: 'SIM' }),
        headers: { Prefer: 'return=minimal' },
      })
    )
  );
}

// ─── Excluir lista / pedido (com liberação em pedidos_gerados) ────────
async function lfExcluir({ tipo, lista, pedido, motivo, usuario, email }) {
  if (tipo === 'LISTA') {
    await lfApi('/rpc/cancelar_lista_controlada', {
      method: 'POST',
      body: JSON.stringify({ p_lista: lista, p_motivo: motivo, p_usuario: usuario, p_email: email }),
      headers: { Prefer: 'return=representation' },
    });
  } else {
    await lfApi('/rpc/remover_pedido_controlado', {
      method: 'POST',
      body: JSON.stringify({
        p_lista: lista,
        p_pedido: pedido,
        p_motivo: motivo,
        p_usuario: usuario,
        p_email: email,
      }),
      headers: { Prefer: 'return=representation' },
    });
  }
  // Libera os pedidos para poderem ser gerados novamente.
  let aviso = '';
  try {
    if (tipo === 'LISTA') {
      await lfApi('/pedidos_gerados?lista=eq.' + encodeURIComponent(lista), {
        method: 'DELETE',
        headers: { Prefer: 'return=minimal' },
      });
    } else {
      await lfApi(
        '/pedidos_gerados?pedido=eq.' + encodeURIComponent(pedido) + '&lista=eq.' + encodeURIComponent(lista),
        { method: 'DELETE', headers: { Prefer: 'return=minimal' } }
      );
    }
  } catch (e) {
    aviso =
      'A exclusão foi registrada, mas não consegui liberar o(s) pedido(s) para gerar de novo: ' + e.message;
  }
  return aviso;
}

// ─── Picking Poluído ──────────────────────────────────────────────────
function lfNomeCab(valor) {
  return String(valor || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .toLowerCase();
}
function lfValorCab(cabecalhos, linha, nomes) {
  const procurados = (nomes || []).map(lfNomeCab);
  for (let i = 0; i < cabecalhos.length; i++) {
    if (procurados.includes(lfNomeCab(cabecalhos[i]))) return linha[i] ?? '';
  }
  return '';
}
function lfDataFinanceiroOriginal(item) {
  const linhaOriginal = Array.isArray(item?.linha_csv) ? item.linha_csv : [];
  if (linhaOriginal.length >= 7) {
    const v = linhaOriginal[6];
    return v === null || v === undefined ? '' : String(v);
  }
  const cabecalhos = Array.isArray(item?.cabecalhos_csv) ? item.cabecalhos_csv : [];
  const porCab = lfValorCab(cabecalhos, linhaOriginal, ['DataHoraFinanceiro']);
  if (porCab !== null && porCab !== undefined && String(porCab) !== '') return String(porCab);
  return String(item?.data_hora_financeiro || '');
}
function lfConsolidarItensPoluido(itens) {
  const mapa = new Map();
  (itens || []).forEach((item) => {
    const produto = String(item.produto || '').trim();
    if (!produto) return;
    const chave = produto.toUpperCase();
    if (!mapa.has(chave)) mapa.set(chave, { ...item, produto, quantidade: 0 });
    mapa.get(chave).quantidade += Number(item.quantidade) || 0;
  });
  return [...mapa.values()];
}
function lfPrepararCsvPoluido(item) {
  const dataHoraFinanceiroCsv = lfDataFinanceiroOriginal(item);
  let cabecalhos = Array.isArray(item.cabecalhos_csv) ? [...item.cabecalhos_csv] : [];
  let linha = Array.isArray(item.linha_csv) ? [...item.linha_csv] : [];

  // Pedidos antigos sem a linha completa do CSV: monta o conjunto básico de colunas.
  if (!cabecalhos.length || !linha.length) {
    cabecalhos = [
      'C9 Produto ORDENCAO',
      'C9 Produto',
      'C9 Filial',
      'C9 Pedido',
      'Onda de Separacao',
      'Unidade de faturamento',
      'DataHoraFinanceiro',
      'Tipo de faturamento',
      'C5_DESCTRS',
      'Tipo de Separacao',
      'FILTRO V.1',
      'Quantidade a Faturar',
    ];
    linha = [
      item.produto || '',
      item.produto || '',
      item.filial || '',
      item.pedido || '',
      '',
      item.unidade_faturamento || '',
      dataHoraFinanceiroCsv,
      '',
      item.transportadora || '',
      LF_MOTIVO_POLUIDO,
      LF_MOTIVO_POLUIDO,
      String(Number(item.quantidade) || 0),
    ];
  }
  while (linha.length < Math.max(cabecalhos.length, 7)) linha.push('');
  linha[6] = dataHoraFinanceiroCsv;

  cabecalhos.forEach((cab, i) => {
    const nome = lfNomeCab(cab);
    if (nome === 'c9 produto') linha[i] = String(item.produto || '');
    if (nome === 'c9 produto ordencao' || nome === 'c9 produto ordenacao') {
      linha[i] = String(linha[i] || item.produto || '');
    }
    if (nome === 'c9 filial') linha[i] = String(item.filial || '');
    if (nome === 'c9 pedido') linha[i] = String(item.pedido || '');
    if (nome === 'c5_desctrs' || nome === 'c5 desctrs' || nome === 'c5_desctris') {
      linha[i] = String(item.transportadora || '');
    }
    if (nome === 'unidade de faturamento') linha[i] = String(item.unidade_faturamento || '');
    if (nome === 'datahorafinanceiro') linha[i] = dataHoraFinanceiroCsv;
    if (nome === 'tipo de separacao') linha[i] = LF_MOTIVO_POLUIDO;
    if (nome === 'filtro v.1') linha[i] = LF_MOTIVO_POLUIDO;
    if (nome === 'quantidade a faturar' || nome === 'quantidade faturar') {
      linha[i] = String(Number(item.quantidade) || 0);
    }
  });
  return { cabecalhos, linha, data_hora_financeiro: dataHoraFinanceiroCsv };
}

// Retorna { ok, tipo: 'ok'|'warn', mensagem }.
async function lfLancarPoluido({ pedido, usuario, email }) {
  const motivo = LF_MOTIVO_POLUIDO;
  const colPedido = encodeURIComponent('C9 Pedido');

  const [filaExistente, itensHistorico] = await Promise.all([
    lfApi(
      '/fila_lancamentos?select=id,chave,status,erro&' +
        colPedido +
        '=eq.' +
        encodeURIComponent(pedido) +
        '&motivo=eq.' +
        encodeURIComponent(motivo) +
        '&limit=5000'
    ),
    lfApi(
      '/historico_pedidos?select=lista,pedido,produto,quantidade,localizacao,unidade_faturamento,data_hora_financeiro,data_hora,filial,transportadora,origem_arquivo,cabecalhos_csv,linha_csv&pedido=eq.' +
        encodeURIComponent(pedido) +
        '&order=id.asc&limit=5000'
    ),
  ]);

  const existentes = Array.isArray(filaExistente) ? filaExistente : [];
  const ativos = existentes.filter((i) =>
    ['PENDENTE', 'PROCESSANDO', 'ENVIADO'].includes(String(i.status || '').toUpperCase())
  );
  if (ativos.length) {
    throw new Error('Este pedido já está na fila ou na planilha do estoque.');
  }

  const comErro = existentes.filter((i) => String(i.status || '').toUpperCase() === 'ERRO');
  if (comErro.length) {
    await lfApi(
      '/fila_lancamentos?' + colPedido + '=eq.' + encodeURIComponent(pedido) + '&motivo=eq.' + encodeURIComponent(motivo),
      {
        method: 'PATCH',
        body: JSON.stringify({ status: 'PENDENTE', erro: null, enviado_em: null }),
        headers: { Prefer: 'return=minimal' },
      }
    );
    return { tipo: 'ok', mensagem: 'Pedido ' + pedido + ' reenviado ao estoque. Aguardando o processamento automático.' };
  }

  if (!Array.isArray(itensHistorico) || !itensHistorico.length) {
    throw new Error('Pedido não encontrado no Histórico de listas.');
  }

  const listas = [
    ...new Set(itensHistorico.map((i) => String(i.lista || '').trim()).filter(Boolean)),
  ];
  const cabecalhos = await Promise.all(
    listas.map((lista) =>
      lfApi(
        '/historico_listas?select=lista,status,data_hora,filial,transportadora&lista=eq.' +
          encodeURIComponent(lista) +
          '&limit=1'
      )
    )
  );
  const infos = cabecalhos
    .flat()
    .filter(Boolean)
    .sort((a, b) => new Date(b.data_hora || 0).getTime() - new Date(a.data_hora || 0).getTime());
  const infoAtiva =
    infos.find((i) => String(i.status || 'ATIVA').toUpperCase() !== 'CANCELADA') ||
    infos[0] || { lista: listas[0] || '' };

  if (String(infoAtiva.status || 'ATIVA').toUpperCase() === 'CANCELADA') {
    throw new Error('O pedido está somente em uma lista cancelada.');
  }

  const listaEscolhida = String(infoAtiva.lista || listas[0] || '');
  const itensDaLista = itensHistorico.filter((i) => String(i.lista || '') === listaEscolhida);
  const itens = lfConsolidarItensPoluido(itensDaLista.length ? itensDaLista : itensHistorico);
  if (!itens.length) throw new Error('Nenhum produto válido foi encontrado para este pedido.');

  const fila = itens.map((item, indice) => {
    const completo = {
      ...item,
      pedido,
      lista: listaEscolhida || item.lista || '',
      filial: String(item.filial || infoAtiva.filial || '').trim(),
      transportadora: String(item.transportadora || infoAtiva.transportadora || '').trim(),
    };
    const csv = lfPrepararCsvPoluido(completo);
    return lfMontarItemFila({
      pedido,
      ordem: indice + 1,
      motivo,
      cabecalhos: csv.cabecalhos,
      linha: csv.linha,
      usuario,
      email,
    });
  });

  const resultado = await lfSalvarFila(fila);
  if (resultado.confirmados === 0) {
    throw new Error('O Supabase não confirmou o envio do pedido para a fila da planilha (Lançamentos).');
  }
  const unidades = fila.reduce((t, i) => t + lfNum(i['Quantidade a Faturar']), 0);
  return {
    tipo: 'ok',
    mensagem:
      'Picking Poluído ' +
      pedido +
      ' confirmado na fila da planilha (Lançamentos). ' +
      resultado.confirmados +
      ' produto(s) e ' +
      unidades +
      ' unidade(s) aguardando processamento automático.',
  };
}

// ─── Interface ────────────────────────────────────────────────────────
const LF_CSS = `
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
`;

function LfBlocoImpressao({ lista, info, registros }) {
  const status = String(info?.status || 'ATIVA').toUpperCase();
  if (status === 'CANCELADA') {
    return (
      <div className="lf-bloco">
        <div className="lf-cancelada">
          <div className="lf-num">{lista}</div>
          <h1>LISTA CANCELADA</h1>
          <div className="lf-motivo">
            <b>Motivo do cancelamento:</b>
            <br />
            {info.motivo_ajuste || 'Motivo não informado'}
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.7 }}>
            <b>Filial:</b> {info.filial || ''}
            <br />
            <b>Transportadora:</b> {info.transportadora || ''}
            <br />
            <b>Cancelada por:</b> {info.ajustada_por || info.usuario || ''}
            <br />
            <b>Data do cancelamento:</b> {lfFmtData(info.ajustada_em || info.data_hora)}
          </div>
        </div>
      </div>
    );
  }
  const ranking = lfCalcularRanking(registros);
  const pedidosUnicos = new Set(
    registros.map((x) => String(x.pedido || '').trim()).filter(Boolean)
  ).size;
  return (
    <div className="lf-bloco">
      <div className="lf-print-head">
        <div>
          <h2>{lista}</h2>
          <div>
            Filial: <b>{info.filial || registros[0]?.filial || ''}</b> &nbsp; Transportadora:{' '}
            <b>{info.transportadora || registros[0]?.transportadora || ''}</b>
          </div>
        </div>
        <div>
          Total: <b>{pedidosUnicos}</b> pedidos
        </div>
      </div>
      <table className="lf-print-table">
        <thead>
          <tr>
            <th>Categoria lista</th>
            <th>Data de execução</th>
            <th>Ranking</th>
            <th>C9 Produto</th>
            <th>Quantidade Faturar</th>
            <th>Localização</th>
            <th>C9 Filial</th>
            <th>C9 Pedido</th>
            <th>Unidade de faturamento</th>
            <th>DataHoraFinanceiro</th>
            <th>C5_DESCTRS</th>
            <th>Tipo de faturamento</th>
            <th>FILTRO V.1</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((x, i) => (
            <tr key={i}>
              <td>{lista}</td>
              <td>{lfFmtData(info.data_hora || x.data_hora)}</td>
              <td>{ranking[i]}</td>
              <td>{x.produto || ''}</td>
              <td>{x.quantidade || 0}</td>
              <td>{lfLocalizacaoHistorico(x.produto, x.localizacao) || 'SEM ENDEREÇO'}</td>
              <td>{info.filial || x.filial || ''}</td>
              <td>{x.pedido || ''}</td>
              <td>{x.unidade_faturamento || ''}</td>
              <td>{x.data_hora_financeiro || ''}</td>
              <td>{info.transportadora || x.transportadora || ''}</td>
              <td>{lfValorCsv(x, ['Tipo de faturamento', 'Tipo Faturamento'])}</td>
              <td>{lfValorCsv(x, ['FILTRO V.1', 'FILTRO V1'])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Elementos visuais simples, no padrão do painel.
function LfCard({ titulo, subtitulo, children, acoes, semPadding }) {
  return (
    <div
      style={{
        background: C.bgCard,
        border: `1px solid ${C.bdLight}`,
        borderRadius: 14,
        boxShadow: C.shadowCard,
        marginBottom: 18,
        overflow: 'hidden',
      }}
    >
      {(titulo || acoes) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            padding: '14px 20px',
            borderBottom: `1px solid ${C.bdLight}`,
            background: C.bgStripe,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.txtPri, fontFamily: C.font, letterSpacing: '-0.01em' }}>
              {titulo}
            </div>
            {subtitulo && (
              <div style={{ fontSize: 12, fontWeight: 500, color: C.txtMuted, marginTop: 2, fontFamily: C.font }}>
                {subtitulo}
              </div>
            )}
          </div>
          {acoes && <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>{acoes}</div>}
        </div>
      )}
      <div style={{ padding: semPadding ? 0 : 20 }}>{children}</div>
    </div>
  );
}
function LfBtn({ children, onClick, disabled, tipo = 'neutro', title, pequeno }) {
  const cores = {
    primario: { bg: C.primaryGrad, cor: '#fff', bd: 'transparent' },
    verde: { bg: C.green, cor: '#fff', bd: 'transparent' },
    perigo: { bg: C.bgCard, cor: C.red, bd: C.redBd },
    neutro: { bg: C.bgCard, cor: C.txtPri, bd: C.bdMid },
  }[tipo];
  return (
    <button
      type="button"
      className="lf-btn"
      title={title}
      disabled={disabled}
      onClick={onClick}
      style={{
        height: pequeno ? 28 : 36,
        padding: pequeno ? '0 10px' : '0 16px',
        borderRadius: C.radius.md,
        border: `1px solid ${disabled ? C.bdLight : cores.bd}`,
        background: disabled ? C.bgMuted : cores.bg,
        color: disabled ? C.txtMuted : cores.cor,
        fontSize: pequeno ? 12 : 13,
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: C.font,
        whiteSpace: 'nowrap',
        boxShadow: disabled || tipo === 'neutro' || tipo === 'perigo' ? 'none' : C.shadowSm,
      }}
    >
      {children}
    </button>
  );
}
function LfAviso({ tipo = 'info', children }) {
  const m = {
    info: [C.blueBg, C.blueBd, C.blue, 'i'],
    ok: [C.greenBg, C.greenBd, C.green, '✓'],
    warn: [C.amberBg, C.amberBd, C.amber, '!'],
    erro: [C.redBg, C.redBd, C.red, '✕'],
  }[tipo];
  return (
    <div
      style={{
        background: m[0],
        border: `1px solid ${m[1]}`,
        color: C.txtPri,
        borderRadius: C.radius.lg,
        padding: '11px 14px',
        fontSize: 13,
        fontWeight: 500,
        lineHeight: 1.55,
        marginTop: 12,
        fontFamily: C.font,
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          flex: '0 0 auto',
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: m[2],
          color: '#fff',
          fontSize: 11,
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 1,
        }}
      >
        {m[3]}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}
function LfBadge({ tipo = 'neutro', children }) {
  const m = {
    ok: [C.greenBg, C.greenBd, C.green],
    warn: [C.amberBg, C.amberBd, C.amber],
    erro: [C.redBg, C.redBd, C.red],
    info: [C.blueBg, C.blueBd, C.blue],
    neutro: [C.bgMuted, C.bdLight, C.txtSec],
  }[tipo];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '2px 10px',
        borderRadius: C.radius.pill,
        background: m[0],
        border: `1px solid ${m[1]}`,
        color: m[2],
        fontSize: 11.5,
        fontWeight: 700,
        fontFamily: C.font,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: m[2] }} />
      {children}
    </span>
  );
}
function LfKpi({ rotulo, valor, detalhe, tipo = 'neutro' }) {
  const cor = { ok: C.green, warn: C.amber, erro: C.red, info: C.blue, neutro: C.txtMuted }[tipo];
  return (
    <div
      style={{
        flex: '1 1 150px',
        minWidth: 140,
        background: C.bgCard,
        border: `1px solid ${C.bdLight}`,
        borderTop: `3px solid ${cor}`,
        borderRadius: C.radius.lg,
        padding: '12px 14px',
        fontFamily: C.font,
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 700, color: C.txtMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {rotulo}
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: C.txtPri,
          marginTop: 4,
          lineHeight: 1.1,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.02em',
        }}
      >
        {valor}
      </div>
      {detalhe && <div style={{ fontSize: 11.5, color: C.txtSec, marginTop: 4, fontWeight: 500 }}>{detalhe}</div>}
    </div>
  );
}
function LfKpis({ children }) {
  return <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>{children}</div>;
}
function LfVazio({ children }) {
  return (
    <div
      style={{
        padding: '28px 16px',
        textAlign: 'center',
        color: C.txtMuted,
        fontSize: 13,
        fontWeight: 500,
        fontFamily: C.font,
      }}
    >
      {children}
    </div>
  );
}
const lfInputStyle = {
  height: 36,
  border: `1px solid ${C.bdMid}`,
  borderRadius: C.radius.md,
  padding: '0 12px',
  fontSize: 13,
  fontWeight: 500,
  color: C.txtPri,
  background: C.bgCard,
  fontFamily: C.font,
  outline: 'none',
};
const lfThStyle = {
  textAlign: 'left',
  padding: '10px 12px',
  fontSize: 11,
  fontWeight: 700,
  color: C.txtMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  background: C.bgStripe,
  borderBottom: `1px solid ${C.bdMid}`,
  whiteSpace: 'nowrap',
  fontFamily: C.font,
};
const lfTdStyle = {
  padding: '10px 12px',
  fontSize: 13,
  color: C.txtPri,
  borderBottom: `1px solid ${C.bdLight}`,
  whiteSpace: 'nowrap',
  fontFamily: C.font,
  fontVariantNumeric: 'tabular-nums',
};
const lfTdNum = { ...lfTdStyle, textAlign: 'right' };
function LfTabela({ colunas, children, numericas = [], altura, compacta }) {
  return (
    <div
      style={{
        overflowX: 'auto',
        overflowY: altura ? 'auto' : 'visible',
        maxHeight: altura || undefined,
        border: `1px solid ${C.bdLight}`,
        borderRadius: C.radius.lg,
      }}
    >
      <table className={`lf-table${altura ? ' lf-sticky' : ''}${compacta ? ' lf-compact' : ''}`} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {colunas.map((c, i) => (
              <th key={c + i} style={numericas.includes(c) ? { ...lfThStyle, textAlign: 'right' } : lfThStyle}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

// ─── Via Leitor (0101/0102) cruzado com as listas ─────────────────────
// Lê a view v_via_leitor_lista do Supabase (alimentada pelo agente Via Leitor a cada rodada):
// cada pedido mostra a lista em que está, "Estoque - separação" ou "Gerar Lista", e o prazo.
const LF_VL_SELECT_BASE =
  'filial,pedido,qtd_total,transportadora,produtos,lib_estoque,data_limite,tempo_pedido_horas,lista_status,tem_lista,no_estoque,atualizado_em';
// Colunas novas (separador / status da separação / faturador): existem depois de rodar criar_faturador_separacao.sql.
const LF_VL_SELECT_FAT = LF_VL_SELECT_BASE + ',separador,separacao_status,separacao_inicio,separacao_fim,separacao_id,faturador,faturador_manual';
// + andamento da separação no estoque (painel_estoque): itens do pedido, entregues e em separação.
const LF_VL_SELECT_EST = LF_VL_SELECT_FAT + ',est_itens,est_entregues,est_separando';
// + itens do pedido (produto e quantidade) para a tela "Ver pedido".
const LF_VL_SELECT = LF_VL_SELECT_EST + ',itens';
// Produto na tabela: até 2 modelos aparecem; acima disso vira o botão "Ver N itens".
const LF_VL_MAX_MODELOS = 2;
function lfVlItens(r) {
  if (Array.isArray(r.itens) && r.itens.length) return r.itens.map((i) => ({ produto: String(i.produto || ''), qtd: i.qtd == null ? null : Number(i.qtd) }));
  return String(r.produtos || '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)
    .map((produto) => ({ produto, qtd: null }));
}
// Cores do status da separação (diferentes do vermelho/azul da linha, para continuar legível).
const LF_VL_ST_NAO = '#b00000';
const LF_VL_ST_ANDA = '#f9ab00';
const LF_VL_ST_OK = '#34a853';
const LF_VL_AGENTE_PARADO_MS = 15 * 60000;
// Igual à planilha:
//  - VERMELHO: a linha inteira, quando falta 1 hora ou menos para o limite (ou já venceu);
//  - AZUL: pedido com mais de 50 unidades, quando faltam 3 horas ou menos (o vermelho tem prioridade).
const LF_VL_ALERTA_MS = 60 * 60000;
const LF_VL_GRANDE_QTD = 50;
const LF_VL_GRANDE_ALERTA_MS = 3 * 60 * 60000;
// Separador / Faturador / Status separação só valem para pedido com lista e para pedido de estoque
// ("Estoque - separação", qualquer quantidade). Em "Gerar Lista" as células ficam em branco.
const lfVlAplica = (r) => !!r.tem_lista || !!r.no_estoque;
function lfVlCor(r) {
  if (r.restante == null) return null;
  if (r.restante <= LF_VL_ALERTA_MS) return 'vermelho';
  if (Number(r.qtd_total) > LF_VL_GRANDE_QTD && r.restante <= LF_VL_GRANDE_ALERTA_MS) return 'azul';
  return null;
}
const LF_VL_VERDE = '#2f6b55'; // cabeçalho verde da planilha
const LF_VL_VERMELHO = '#e60000';
const LF_VL_AZUL = '#4285f4';
const LF_VL_LARANJA = '#ff9900';
// Contagem regressiva em tempo real: 2:25:50 (h:mm:ss). Negativo = já passou do prazo.
// 29/10 11:55:59 (sem o ano, para a tabela caber na tela com as colunas novas)
const sepQuandoSeg = (ts) =>
  !ts ? '—' : `${new Date(ts).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} ${new Date(ts).toLocaleTimeString('pt-BR')}`;
function lfRestante(ms) {
  const neg = ms < 0;
  const t = Math.floor(Math.abs(ms) / 1000);
  const p = (n) => String(n).padStart(2, '0');
  const txt = `${Math.floor(t / 3600)}:${p(Math.floor((t % 3600) / 60))}:${p(t % 60)}`;
  return neg ? `−${txt}` : txt;
}
// ─── Via Leitor: subir o relatório manualmente ─────────────────────────
// Para quando o agente (notebook) está desligado: a pessoa sobe o relatório da tela do Via Leitor (.csv ou .xlsx)
// e o site faz o mesmo que o agente (prazo, data limite, produtos) gravando em via_leitor_agente.
// As colunas são achadas pelo TÍTULO, em qualquer ordem.
const LF_VL_FERIADOS = []; // 'aaaa-mm-dd' (mesmas datas de Parâmetros!D2:D). O agente usa "feriados" do config.json.
const LF_VL_EXP_INI = [8, 30, 0];
const LF_VL_EXP_FIM = [18, 18, 0];
const LF_VL_DIA = 86400000;
const lfVlPrazoHoras = (q) => (q <= 5 ? 2 : q <= 200 ? 4 : q <= 1000 ? 5 : 12);
// Datas em "hora de parede" de Brasília guardadas como UTC (evita depender do fuso do navegador).
const lfVlNoDia = (ms, h) => {
  const d = new Date(ms);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), h[0], h[1], h[2]);
};
const lfVlDiaUtil = (ms) => {
  const w = new Date(ms).getUTCDay();
  return w !== 0 && w !== 6 && !LF_VL_FERIADOS.includes(new Date(ms).toISOString().slice(0, 10));
};
function lfVlProxInicio(ms) {
  let d = lfVlNoDia(ms + LF_VL_DIA, LF_VL_EXP_INI);
  for (let i = 0; i < 800 && !lfVlDiaUtil(d); i++) d = lfVlNoDia(d + LF_VL_DIA, LF_VL_EXP_INI);
  return d;
}
function lfVlAjustarInicio(ms) {
  let d = ms;
  for (let i = 0; i < 800; i++) {
    if (!lfVlDiaUtil(d)) {
      d = lfVlProxInicio(d);
      continue;
    }
    const ini = lfVlNoDia(d, LF_VL_EXP_INI);
    const fim = lfVlNoDia(d, LF_VL_EXP_FIM);
    if (d < ini) return ini;
    if (d >= fim) return lfVlProxInicio(d);
    return d;
  }
  return d;
}
// Mesma regra do agente / Apps Script "Performance": soma as horas só dentro do expediente (dias úteis).
function lfVlCalcLimite(ms, horas) {
  let atual = lfVlAjustarInicio(ms);
  let resta = horas * 3600000;
  for (let i = 0; i < 800; i++) {
    atual = lfVlAjustarInicio(atual);
    const disp = Math.max(0, lfVlNoDia(atual, LF_VL_EXP_FIM) - atual);
    if (disp <= 0) {
      atual = lfVlProxInicio(atual);
      continue;
    }
    if (resta <= disp) return atual + resta;
    resta -= disp;
    atual = lfVlProxInicio(atual);
  }
  return atual;
}
const lfVlIso = (ms) => new Date(ms).toISOString().slice(0, 19) + '-03:00';
const lfVlTxtData = (ms) => {
  const d = new Date(ms);
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getUTCDate())}/${p(d.getUTCMonth() + 1)}/${d.getUTCFullYear()} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`;
};
// Aceita número de série do Excel, dd/mm/aaaa (ou mm/dd/aaaa, conforme `fmt`) com hora opcional,
// aaaa-mm-dd[T ]hh:mm[:ss] e aaaammddhhmmss.
function lfVlData(v, fmt) {
  if (v == null || v === '') return null;
  if (typeof v === 'number') return v > 20000 ? Math.round(((v - 25569) * LF_VL_DIA) / 1000) * 1000 : null;
  const t = String(v).trim();
  if (!t) return null;
  let m = t.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\D+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
  let g;
  if (m) {
    const a = +m[1];
    const b = +m[2];
    g = fmt === 'mdy' ? [+m[3], a, b] : [+m[3], b, a]; // [ano, mês, dia]
    g.push(+(m[4] || 0), +(m[5] || 0), +(m[6] || 0));
  } else {
    m = t.match(/(\d{4})-(\d{2})-(\d{2})(?:[T\s]+(\d{2}):(\d{2})(?::(\d{2}))?)?/) || t.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
    if (!m) {
      if (/^\d{5}(\.\d+)?$/.test(t)) return lfVlData(Number(t));
      return null;
    }
    g = [+m[1], +m[2], +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0)];
  }
  if (g[1] < 1 || g[1] > 12 || g[2] < 1 || g[2] > 31) return null; // mês/dia impossível = formato errado
  const ms = Date.UTC(g[0], g[1] - 1, g[2], g[3], g[4], g[5]);
  return Number.isNaN(ms) ? null : ms;
}
// Hora solta ("14:04:49" ou fração do dia do Excel) em segundos.
function lfVlSegundos(v) {
  if (v == null || v === '') return null;
  if (typeof v === 'number') return v >= 0 && v < 1 ? Math.round(v * 86400) : null;
  const m = String(v).match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
  return m ? +m[1] * 3600 + +m[2] * 60 + +(m[3] || 0) : null;
}
// Data em coluna e hora em outra ("Dt. Lib. Est" + "Hr. Lib. Est") -> instante.
function lfVlDataHora(dv, hv, fmt) {
  if (dv == null || dv === '') return null;
  const seg = lfVlSegundos(hv);
  if (seg == null) return lfVlData(dv, fmt);
  const dia = typeof dv === 'number' ? lfVlData(Math.floor(dv)) : lfVlData(String(dv).trim().split(/[T\s]/)[0], fmt);
  return dia == null ? null : dia + seg * 1000;
}
function lfVlNumero(v) {
  if (typeof v === 'number') return v;
  const t = String(v == null ? '' : v).trim();
  if (!t) return 0;
  // pt-BR: "1.250" = 1250 (ponto de milhar); "1,5" = 1.5
  const s = t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : /^\d{1,3}(\.\d{3})+$/.test(t) ? t.replace(/\./g, '') : t;
  const n = parseFloat(s.replace(/[^0-9.\-]/g, ''));
  return Number.isNaN(n) ? 0 : n;
}

// Leitura de .xlsx sem biblioteca (zip + XML do próprio navegador).
async function lfVlInflar(bytes) {
  const ds = new DecompressionStream('deflate-raw');
  const w = ds.writable.getWriter();
  w.write(bytes);
  w.close();
  return new Uint8Array(await new Response(ds.readable).arrayBuffer());
}
function lfVlZip(buf) {
  const u8 = new Uint8Array(buf);
  const dv = new DataView(buf);
  let eocd = -1;
  for (let i = u8.length - 22; i >= Math.max(0, u8.length - 70000); i--) {
    if (dv.getUint32(i, true) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error('Arquivo .xlsx inválido.');
  const n = dv.getUint16(eocd + 10, true);
  let p = dv.getUint32(eocd + 16, true);
  const arqs = {};
  for (let k = 0; k < n; k++) {
    if (dv.getUint32(p, true) !== 0x02014b50) break;
    const nl = dv.getUint16(p + 28, true);
    const el = dv.getUint16(p + 30, true);
    const cl = dv.getUint16(p + 32, true);
    arqs[new TextDecoder().decode(u8.subarray(p + 46, p + 46 + nl))] = {
      metodo: dv.getUint16(p + 10, true),
      comp: dv.getUint32(p + 20, true),
      off: dv.getUint32(p + 42, true),
    };
    p += 46 + nl + el + cl;
  }
  return { u8, dv, arqs };
}
async function lfVlEntrada(z, nome) {
  const e = z.arqs[nome];
  if (!e) return null;
  const nl = z.dv.getUint16(e.off + 26, true);
  const el = z.dv.getUint16(e.off + 28, true);
  const ini = e.off + 30 + nl + el;
  const dados = z.u8.subarray(ini, ini + e.comp);
  return new TextDecoder('utf-8').decode(e.metodo === 0 ? dados : await lfVlInflar(dados));
}
async function lfVlLerXlsx(buf) {
  const z = lfVlZip(buf);
  const xml = (s) => new DOMParser().parseFromString(s, 'application/xml');
  const ss = [];
  const sst = await lfVlEntrada(z, 'xl/sharedStrings.xml');
  if (sst) {
    Array.from(xml(sst).getElementsByTagName('si')).forEach((si) => {
      ss.push(Array.from(si.getElementsByTagName('t')).map((t) => t.textContent).join(''));
    });
  }
  // primeira aba do arquivo
  let alvo = 'xl/worksheets/sheet1.xml';
  const wb = await lfVlEntrada(z, 'xl/workbook.xml');
  const rels = await lfVlEntrada(z, 'xl/_rels/workbook.xml.rels');
  if (wb && rels) {
    const sh = xml(wb).getElementsByTagName('sheet')[0];
    const rid = sh && (sh.getAttribute('r:id') || sh.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id'));
    const rel = Array.from(xml(rels).getElementsByTagName('Relationship')).find((r) => r.getAttribute('Id') === rid);
    if (rel) {
      const t = rel.getAttribute('Target') || '';
      alvo = t.startsWith('/') ? t.slice(1) : 'xl/' + t;
    }
  }
  const sx = await lfVlEntrada(z, alvo);
  if (!sx) throw new Error('Não achei a planilha dentro do arquivo .xlsx.');
  const col = (ref) => {
    let n = 0;
    String(ref || '')
      .replace(/[^A-Z]/gi, '')
      .toUpperCase()
      .split('')
      .forEach((ch) => {
        n = n * 26 + ch.charCodeAt(0) - 64;
      });
    return n - 1;
  };
  const matriz = [];
  Array.from(xml(sx).getElementsByTagName('row')).forEach((row) => {
    const linha = [];
    Array.from(row.getElementsByTagName('c')).forEach((c) => {
      const i = col(c.getAttribute('r'));
      const t = c.getAttribute('t');
      const vEl = c.getElementsByTagName('v')[0];
      const v = vEl ? vEl.textContent : '';
      let val;
      if (t === 's') val = ss[Number(v)] == null ? '' : ss[Number(v)];
      else if (t === 'inlineStr') val = Array.from(c.getElementsByTagName('t')).map((x) => x.textContent).join('');
      else if (t === 'str' || t === 'e' || t === 'b') val = v;
      else val = v === '' ? '' : Number(v);
      linha[i < 0 ? linha.length : i] = val;
    });
    for (let k = 0; k < linha.length; k++) if (linha[k] === undefined) linha[k] = '';
    matriz.push(linha);
  });
  return matriz;
}
// Leitura de .ods (LibreOffice) sem biblioteca: content.xml da primeira aba.
async function lfVlLerOds(buf) {
  const z = lfVlZip(buf);
  const xml = await lfVlEntrada(z, 'content.xml');
  if (!xml) throw new Error('Arquivo .ods inválido.');
  const NT = 'urn:oasis:names:tc:opendocument:xmlns:table:1.0';
  const NO = 'urn:oasis:names:tc:opendocument:xmlns:office:1.0';
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  const aba = doc.getElementsByTagNameNS(NT, 'table')[0];
  if (!aba) throw new Error('Não achei a planilha dentro do arquivo .ods.');
  const matriz = [];
  Array.from(aba.getElementsByTagNameNS(NT, 'table-row')).forEach((tr) => {
    const linha = [];
    Array.from(tr.children).forEach((c) => {
      if (c.localName !== 'table-cell' && c.localName !== 'covered-table-cell') return;
      const vt = c.getAttributeNS(NO, 'value-type');
      let val = '';
      if (vt === 'float' || vt === 'percentage' || vt === 'currency') val = Number(c.getAttributeNS(NO, 'value'));
      else if (vt === 'date') val = c.getAttributeNS(NO, 'date-value') || '';
      else if (vt === 'time') {
        const m = (c.getAttributeNS(NO, 'time-value') || '').match(/PT(\d+)H(\d+)M(\d+)/);
        val = m ? `${m[1].padStart(2, '0')}:${m[2]}:${m[3]}` : '';
      } else if (vt === 'boolean') val = c.getAttributeNS(NO, 'boolean-value');
      else if (vt) val = Array.from(c.children).filter((p) => p.localName === 'p').map((p) => p.textContent).join(' ');
      const rep = Math.min(Number(c.getAttributeNS(NT, 'number-columns-repeated') || 1), val === '' ? 1 : 200);
      for (let k = 0; k < rep; k++) linha.push(val);
    });
    while (linha.length && linha[linha.length - 1] === '') linha.pop();
    if (!linha.length) return;
    const vezes = Math.min(Number(tr.getAttributeNS(NT, 'number-rows-repeated') || 1), 200);
    for (let k = 0; k < vezes; k++) matriz.push(linha);
  });
  return matriz;
}
async function lfVlLerArquivo(arquivo) {
  const buf = await arquivo.arrayBuffer();
  const b = new Uint8Array(buf.slice(0, 4));
  if (b[0] === 0x50 && b[1] === 0x4b) {
    // "PK" = zip: .ods (LibreOffice, tem content.xml) ou .xlsx (Excel)
    return lfVlZip(buf).arqs['content.xml'] ? lfVlLerOds(buf) : lfVlLerXlsx(buf);
  }
  if (b[0] === 0xd0 && b[1] === 0xcf) throw new Error('Este é um .xls antigo. Abra no Excel e salve como .xlsx ou .csv.');
  const texto = await lfLerTextoCsv(arquivo);
  const linhas = texto.split(/\r?\n/).filter((l) => l.trim());
  const amostra = linhas.slice(0, 8).join('\n');
  const cont = (c) => amostra.split(c).length - 1;
  const sep = cont(';') >= cont('\t') && cont(';') >= cont(',') ? ';' : cont('\t') >= cont(',') ? '\t' : ',';
  return linhas.map((l) => lfParseLine(l, sep));
}

// Acha as colunas pelo título (sem acento, maiúscula/minúscula e símbolos não importam).
const lfVlNormCab = (h) =>
  String(h == null ? '' : h)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
// [papel, rótulo, nomes exatos (por prioridade), teste aproximado]
const lfVlTemLib = (n) => n.includes('lib') || n.includes('data') || n.includes('hora') || n.startsWith('dt') || n.startsWith('hr');
const LF_VL_PAPEIS = [
  ['pedido', 'Pedido', ['pedido', 'numeropedido', 'numpedido', 'npedido', 'nopedido', 'nrpedido', 'pedidovenda', 'order']],
  ['filial', 'Filial', ['filial', 'codfilial', 'codigofilial', 'empresa', 'unidade', 'loja']],
  ['qtdTotal', 'Qtd total do pedido', ['totalqtd', 'qtdtotal', 'quantidadetotal', 'qtdtotalpedido', 'totalquantidade', 'totalunidades']],
  ['qtd', 'Quantidade', ['qtliberada', 'qtdliberada', 'qtdlib', 'qtlib', 'quantidadeliberada', 'qtdliberado', 'qtd', 'qt', 'quantidade', 'quant', 'qtde', 'unidades']],
  [
    'libEstData',
    'Data lib. estoque',
    ['dtlibest', 'datalibest', 'dtlibestoque', 'datalibestoque', 'dataliberacaoestoque'],
    (n) => /^(dt|data)/.test(n) && n.includes('lib') && /est(oque)?$/.test(n),
  ],
  [
    'libEstHora',
    'Hora lib. estoque',
    ['hrlibest', 'horalibest', 'hrlibestoque', 'horalibestoque', 'horaliberacaoestoque'],
    (n) => /^(hr|hora)/.test(n) && n.includes('lib') && /est(oque)?$/.test(n),
  ],
  ['libEst', 'Liberação do estoque (data e hora)', ['datahoraliberacaoestoque', 'datahoralibestoque', 'dtlibestoque', 'libestoque'], (n) => n.includes('estoque') && lfVlTemLib(n)],
  [
    'libFinData',
    'Data lib. financeiro',
    ['dtlibfin', 'datalibfin', 'dtlibfinanceiro', 'datalibfinanceiro', 'dataliberacaofinanceiro'],
    (n) => /^(dt|data)/.test(n) && n.includes('lib') && /fin(anceiro)?$/.test(n),
  ],
  [
    'libFinHora',
    'Hora lib. financeiro',
    ['hrlibfin', 'horalibfin', 'hrlibfinanceiro', 'horalibfinanceiro', 'horaliberacaofinanceiro'],
    (n) => /^(hr|hora)/.test(n) && n.includes('lib') && /fin(anceiro)?$/.test(n),
  ],
  ['libFin', 'Liberação do financeiro (data e hora)', ['datahoraliberacaofinanceiro', 'datahoralibfinanceiro'], (n) => n.includes('financ') && lfVlTemLib(n)],
  ['transp', 'Transportadora', ['transportadora', 'transporte', 'transp', 'nometransportadora', 'carrier']],
  ['produto', 'Produto', ['produto', 'modelo', 'produtomodelo', 'descricaoproduto', 'descricao', 'sku', 'codigoproduto', 'codproduto']],
];
function lfVlMapear(matriz) {
  for (let r = 0; r < Math.min(matriz.length, 25); r++) {
    const cab = (matriz[r] || []).map(lfVlNormCab);
    const col = {};
    const usadas = new Set();
    // 1º os títulos exatos, na ordem de prioridade; 2º o reconhecimento aproximado.
    LF_VL_PAPEIS.forEach(([papel, , nomes]) => {
      for (const nome of nomes) {
        const i = cab.findIndex((n, k) => n === nome && !usadas.has(k));
        if (i >= 0) {
          col[papel] = i;
          usadas.add(i);
          break;
        }
      }
    });
    LF_VL_PAPEIS.forEach(([papel, , , teste]) => {
      if (col[papel] !== undefined || !teste) return;
      const i = cab.findIndex((n, k) => n && !usadas.has(k) && teste(n));
      if (i >= 0) {
        col[papel] = i;
        usadas.add(i);
      }
    });
    if (col.pedido !== undefined && Object.keys(col).length >= 2) {
      const rotulos = {};
      Object.keys(col).forEach((p) => {
        rotulos[p] = String(matriz[r][col[p]]);
      });
      return { linhaCab: r, col, rotulos };
    }
  }
  return null;
}
const lfVlFilialNorm = (v) => {
  const d = String(v == null ? '' : v).replace(/\D/g, '');
  return d ? d.padStart(4, '0') : '';
};
// Descobre se as datas escritas como 10/29/2026 são mês/dia (padrão americano) ou dia/mês, olhando a coluna inteira.
function lfVlFormatoDatas(matriz, mapa) {
  const cols = ['libEstData', 'libEst', 'libFinData', 'libFin'].map((p) => mapa.col[p]).filter((i) => i !== undefined);
  let dmy = false;
  let mdy = false;
  let visto = false;
  let pertoDmy = 0;
  let pertoMdy = 0;
  const hoje = Date.now() + 3 * 3600000 * -1;
  const perto = (ano, mes, dia) => Math.abs(Date.UTC(ano, mes - 1, dia) - hoje) < 45 * LF_VL_DIA;
  matriz.slice(mapa.linhaCab + 1).forEach((l) => {
    cols.forEach((i) => {
      const m = typeof l[i] === 'string' && l[i].match(/^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/);
      if (m) {
        visto = true;
        if (+m[1] <= 12 && +m[2] <= 12) {
          // ambíguo: vale a leitura que cai perto de hoje (relatório do Via Leitor é sempre recente)
          if (perto(+m[3], +m[2], +m[1])) pertoDmy++;
          if (perto(+m[3], +m[1], +m[2])) pertoMdy++;
        }
        if (+m[1] > 12) dmy = true;
        if (+m[2] > 12) mdy = true;
      }
    });
  });
  if (mdy && !dmy) return { fmt: 'mdy', ambiguo: false };
  if (dmy && !mdy) return { fmt: 'dmy', ambiguo: false };
  return { fmt: pertoMdy > pertoDmy ? 'mdy' : 'dmy', ambiguo: visto && pertoMdy === pertoDmy };
}
// Junta as linhas do relatório em UM registro por pedido (soma quantidades, lista os produtos), como o agente faz.
function lfVlAgrupar(matriz, mapa, filialPadrao) {
  const c = mapa.col;
  const { fmt, ambiguo } = lfVlFormatoDatas(matriz, mapa);
  const por = new Map();
  const ign = { semPedido: 0, ambiguo, fmt };
  const vazio = (v) => v === '' || v == null;
  matriz.slice(mapa.linhaCab + 1).forEach((l) => {
    let ped = c.pedido !== undefined ? l[c.pedido] : '';
    ped = typeof ped === 'number' ? String(Math.round(ped)) : String(ped == null ? '' : ped).replace(/^'/, '').replace(/\.0+$/, '').trim();
    if (!ped || !/^[A-Za-z0-9._-]+$/.test(ped)) {
      if (l.some((x) => String(x).trim())) ign.semPedido++;
      return;
    }
    const filial = (c.filial !== undefined ? lfVlFilialNorm(l[c.filial]) : '') || filialPadrao;
    const chave = filial + '|' + ped;
    let p = por.get(chave);
    if (!p) {
      p = { filial, pedido: ped, soma: 0, total: null, transp: '', est: null, fin: null, itens: [] };
      por.set(chave, p);
    }
    const q = c.qtd !== undefined ? lfVlNumero(l[c.qtd]) : 0;
    p.soma += q;
    if (c.qtdTotal !== undefined && p.total == null) p.total = lfVlNumero(l[c.qtdTotal]);
    if (c.transp !== undefined && !p.transp) p.transp = String(l[c.transp] == null ? '' : l[c.transp]).trim();
    if (p.est == null) {
      if (c.libEstData !== undefined) p.est = lfVlDataHora(l[c.libEstData], c.libEstHora !== undefined ? l[c.libEstHora] : null, fmt);
      else if (c.libEst !== undefined && !vazio(l[c.libEst])) p.est = lfVlData(l[c.libEst], fmt);
    }
    if (p.fin == null) {
      if (c.libFinData !== undefined) p.fin = lfVlDataHora(l[c.libFinData], c.libFinHora !== undefined ? l[c.libFinHora] : null, fmt);
      else if (c.libFin !== undefined && !vazio(l[c.libFin])) p.fin = lfVlData(l[c.libFin], fmt);
    }
    if (c.produto !== undefined) {
      const nome = String(l[c.produto] == null ? '' : l[c.produto]).trim();
      if (nome) {
        const ex = p.itens.find((i) => i.produto.toLowerCase() === nome.toLowerCase());
        if (ex) ex.qtd += q;
        else p.itens.push({ produto: nome, qtd: q });
      }
    }
  });
  const lista = [...por.values()].map((p) => {
    const qtd_total = p.total != null && p.total > 0 ? p.total : p.soma;
    const horas = lfVlPrazoHoras(qtd_total);
    return {
      filial: p.filial,
      pedido: p.pedido,
      qtd_total,
      transportadora: p.transp,
      lib_financeiro: p.fin == null ? null : lfVlIso(p.fin),
      lib_estoque: p.est == null ? null : lfVlIso(p.est),
      lib_financeiro_txt: p.fin == null ? '' : lfVlTxtData(p.fin),
      lib_estoque_txt: p.est == null ? '' : lfVlTxtData(p.est),
      produtos: p.itens.map((i) => i.produto).join(', '),
      itens: p.itens,
      tempo_pedido_horas: horas,
      data_limite: p.est == null ? null : lfVlIso(lfVlCalcLimite(p.est, horas)),
    };
  });
  return { lista, ign };
}

function LfViaLeitorUpload({ existentes, agenteHa, onFechar, onFeito }) {
  const [nome, setNome] = useState('');
  const [matriz, setMatriz] = useState(null);
  const [erro, setErro] = useState('');
  const [filialPadrao, setFilialPadrao] = useState('0101');
  const [importando, setImportando] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && !importando && onFechar();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onFechar, importando]);

  const escolher = async (e) => {
    const arq = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!arq) return;
    setErro('');
    setMatriz(null);
    setNome(arq.name);
    try {
      const m = await lfVlLerArquivo(arq);
      if (!m.length) throw new Error('O arquivo está vazio.');
      setMatriz(m);
    } catch (err) {
      setErro(String(err.message || err));
    }
  };
  const mapa = useMemo(() => (matriz ? lfVlMapear(matriz) : null), [matriz]);
  const res = useMemo(() => (matriz && mapa ? lfVlAgrupar(matriz, mapa, filialPadrao) : null), [matriz, mapa, filialPadrao]);
  const filiais = useMemo(() => (res ? [...new Set(res.lista.map((p) => p.filial))].sort() : []), [res]);
  const atuais = (f) => (existentes || []).filter((r) => r.filial === f).length;
  const semData = res ? res.lista.filter((p) => !p.lib_estoque).length : 0;

  const importar = async () => {
    if (!res || !res.lista.length) return;
    setImportando(true);
    setErro('');
    try {
      const ciclo = new Date().toISOString();
      const linhas = res.lista.map((p) => ({ ...p, ciclo, atualizado_em: ciclo }));
      const enviar = async (corpo) => {
        for (const lote of lfChunk(corpo, 300)) {
          await lfApi('/via_leitor_agente?on_conflict=filial,pedido', {
            method: 'POST',
            body: JSON.stringify(lote),
            headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
          });
        }
      };
      try {
        await enviar(linhas);
      } catch (e1) {
        // Banco ainda sem a coluna "itens" (SQL não rodado): grava sem ela.
        if (!/itens/i.test(String(e1.message))) throw e1;
        await enviar(linhas.map(({ itens, ...resto }) => resto));
      }
      // Tira os pedidos da filial que não estão no arquivo (já saíram do Via Leitor).
      for (const f of filiais) {
        await lfApi('/via_leitor_agente?filial=eq.' + encodeURIComponent(f) + '&ciclo=lt.' + encodeURIComponent(ciclo), {
          method: 'DELETE',
          headers: { Prefer: 'return=minimal' },
        });
      }
      try {
        await lfApi('/via_leitor_atualizacoes?on_conflict=origem', {
          method: 'POST',
          body: JSON.stringify([{ origem: 'manual', atualizado_em: ciclo, detalhe: `${nome} · ${linhas.length} pedidos` }]),
          headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        });
      } catch (e2) {
        /* tabela de horários ainda não criada: a importação já foi feita */
      }
      onFeito(`Relatório "${nome}" importado: ${linhas.length} pedidos (${filiais.join(' + ')}).`);
    } catch (e) {
      const msg = String(e.message || e);
      setErro(
        /42501|row-level|policy|permission/i.test(msg)
          ? 'O Supabase bloqueou a gravação. Rode o SQL criar_faturador_separacao.sql (libera a importação manual).'
          : 'Não foi possível importar: ' + msg.slice(0, 200)
      );
      setImportando(false);
    }
  };

  const th = { background: LF_VL_VERDE, color: '#fff', fontSize: 12, fontWeight: 800, padding: '7px 9px', textAlign: 'left', whiteSpace: 'nowrap' };
  const td = { padding: '6px 9px', fontSize: 12.5, borderBottom: `1px solid ${C.bdLight}`, color: C.txtPri, whiteSpace: 'nowrap' };
  const temEst = mapa && (mapa.col.libEst !== undefined || mapa.col.libEstData !== undefined);
  const faltam = mapa
    ? [['pedido', 'Pedido'], ['qtd', 'Quantidade'], ['transp', 'Transportadora'], ...(temEst ? [] : [['libEstData', 'Data/Hora lib. estoque']])].filter(([p]) => mapa.col[p] === undefined)
    : [];
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(2px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={() => !importando && onFechar()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: C.bgCard, borderRadius: C.radius.xl, padding: 22, width: 860, maxWidth: '95vw', maxHeight: '90vh', overflow: 'auto', boxShadow: C.shadowXl, border: `1px solid ${C.bdMid}` }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.txtPri }}>Subir relatório do Via Leitor</div>
            <div style={{ fontSize: 12.5, color: C.txtMuted, marginTop: 3 }}>
              Use quando o agente estiver desligado. Arquivo .ods, .xlsx ou .csv; as colunas são achadas pelo título, em qualquer ordem.
            </div>
          </div>
          <LfBtn pequeno onClick={onFechar} disabled={importando}>
            Fechar ✕
          </LfBtn>
        </div>
        {agenteHa != null && agenteHa < LF_VL_AGENTE_PARADO_MS && (
          <LfAviso tipo="warn">
            O agente atualizou há {sepHoras(agenteHa)}. Se ele está rodando, não precisa subir relatório: os dados do arquivo ficam no lugar dos do agente até o próximo ciclo dele.
          </LfAviso>
        )}
        <input ref={inputRef} type="file" accept=".csv,.txt,.xlsx,.ods" style={{ display: 'none' }} onChange={escolher} />
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', margin: '10px 0' }}>
          <LfBtn tipo="primario" onClick={() => inputRef.current && inputRef.current.click()} disabled={importando}>
            📂 Escolher arquivo
          </LfBtn>
          <span style={{ fontSize: 13, color: C.txtSec }}>{nome || 'Nenhum arquivo escolhido'}</span>
        </div>
        {erro && <LfAviso tipo="erro">{erro}</LfAviso>}
        {matriz && !mapa && (
          <LfAviso tipo="erro">
            Não achei a coluna do pedido. Títulos que o site reconhece: Pedido, Filial, Quantidade, Transportadora, Produto, Data/Hora Lib. Estoque, Data/Hora Lib. Financeiro.
          </LfAviso>
        )}
        {mapa && res && (
          <>
            <div style={{ fontSize: 12.5, color: C.txtSec, margin: '6px 0 8px', lineHeight: 1.7 }}>
              <b>Colunas encontradas:</b>{' '}
              {LF_VL_PAPEIS.filter(([p]) => mapa.col[p] !== undefined).map(([p, rot]) => (
                <span key={p} style={{ display: 'inline-block', background: C.bgStripe, border: `1px solid ${C.bdLight}`, borderRadius: 999, padding: '1px 9px', marginRight: 6 }}>
                  {rot} ← “{mapa.rotulos[p]}”
                </span>
              ))}
            </div>
            {faltam.length > 0 && (
              <LfAviso tipo="warn">
                Não encontrei: {faltam.map(([, rot]) => rot).join(', ')}.
                {!temEst ? ' Sem a liberação do estoque os pedidos ficam sem data limite.' : ''}
              </LfAviso>
            )}
            {mapa.col.filial === undefined && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0', fontSize: 13 }}>
                O arquivo não tem coluna Filial. Filial deste arquivo:
                <select className="lf-input" style={lfInputStyle} value={filialPadrao} onChange={(e) => setFilialPadrao(e.target.value)}>
                  <option value="0101">0101</option>
                  <option value="0102">0102</option>
                </select>
              </div>
            )}
            <LfAviso tipo="info">
              {res.lista.length} pedidos no arquivo
              {filiais.length ? ' — ' + filiais.map((f) => `filial ${f}: ${res.lista.filter((p) => p.filial === f).length} (hoje ${atuais(f)} no site)`).join(' · ') : ''}.
              {semData ? ` ${semData} sem data de liberação do estoque (ficam sem data limite).` : ''}
              {res.ign.semPedido ? ` ${res.ign.semPedido} linha(s) sem número de pedido foram ignoradas.` : ''}
              {res.ign.ambiguo ? ' Atenção às datas: todas têm dia e mês ≤ 12, então assumi dia/mês — confira na prévia abaixo.' : ''}
              <br />
              Ao importar, os pedidos atuais da(s) filial(is) acima são <b>substituídos</b> pelos do arquivo.
            </LfAviso>
            {res.lista.length > 0 && (
              <div style={{ overflow: 'auto', maxHeight: 230, border: `1px solid ${C.bdLight}`, borderRadius: C.radius.lg, margin: '8px 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: C.font }}>
                  <thead>
                    <tr>
                      {['Filial', 'Pedido', 'Quant', 'Transporte', 'Produto', 'Lib. estoque', 'Prazo', 'Data limite'].map((c) => (
                        <th key={c} style={th}>
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {res.lista.slice(0, 8).map((p) => (
                      <tr key={p.filial + p.pedido}>
                        <td style={td}>{p.filial}</td>
                        <td style={{ ...td, fontWeight: 700 }}>{p.pedido}</td>
                        <td style={td}>{p.qtd_total}</td>
                        <td style={td}>{p.transportadora || '—'}</td>
                        <td style={{ ...td, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.produtos || '—'}</td>
                        <td style={td}>{p.lib_estoque_txt || '—'}</td>
                        <td style={td}>{p.tempo_pedido_horas}h</td>
                        <td style={td}>{p.data_limite ? lfVlTxtData(lfVlData(p.data_limite.slice(0, 19))) : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 10 }}>
              <LfBtn onClick={onFechar} disabled={importando}>
                Cancelar
              </LfBtn>
              <LfBtn tipo="verde" onClick={importar} disabled={importando || !res.lista.length}>
                {importando ? 'Importando...' : `✓ Importar ${res.lista.length} pedidos`}
              </LfBtn>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Tela "Ver pedido": itens (produto e quantidade) e como cada um está no estoque (tabela painel_estoque).
function LfViaLeitorDetalhe({ r, onFechar }) {
  const [painel, setPainel] = useState(null); // linhas do painel_estoque deste pedido
  const [erro, setErro] = useState('');
  useEffect(() => {
    let vivo = true;
    setPainel(null);
    setErro('');
    lfApi('/painel_estoque?select=*&pedido=eq.' + encodeURIComponent(r.pedido) + '&order=linha_planilha.asc&limit=500')
      .then((d) => vivo && setPainel(Array.isArray(d) ? d : []))
      .catch((e) => vivo && (setErro(String(e.message || e).slice(0, 140)), setPainel([])));
    return () => {
      vivo = false;
    };
  }, [r.pedido]);
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onFechar();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onFechar]);

  const norm = (v) => sepNorm(String(v || ''));
  const itens = lfVlItens(r);
  const usados = new Set();
  // Cada item do pedido junto com a(s) linha(s) do painel do estoque do mesmo produto.
  const linhas = itens.map((it) => {
    const achadas = (painel || []).filter((x, i) => norm(x.produto) === norm(it.produto) && (usados.add(i), true));
    // Sem quantidade vinda do agente (ainda não atualizado): usa a do painel (maior valor, para não somar linha duplicada).
    const qPainel = achadas.map((x) => Number(x.quantidade)).filter((n) => !Number.isNaN(n));
    return { ...it, qtd: it.qtd != null ? it.qtd : qPainel.length ? Math.max(...qPainel) : null, est: achadas };
  });
  // Linhas do painel que não bateram com nenhum item (ou pedido sem itens do agente).
  (painel || []).forEach((x, i) => {
    if (!usados.has(i)) linhas.push({ produto: String(x.produto || ''), qtd: x.quantidade != null ? Number(x.quantidade) : null, est: [x] });
  });
  // Situação pela coluna status_original do painel_estoque: "Entregue" = entregue; vazio/EMPTY = aguardando separação.
  // Se o mesmo produto tem mais de uma linha, só é entregue quando todas estão entregues.
  const codSt = (linhasEst) => {
    const cods = linhasEst.map((x) => String(x.status_original == null ? '' : x.status_original).trim().toUpperCase());
    if (cods.every((c) => c === 'ENTREGUE')) return 'E';
    return cods.some((c) => c !== '' && c !== 'EMPTY' && c !== 'ENTREGUE') ? 'S' : 'A';
  };
  const stTxt = (c) => (c === 'E' ? 'Entregue' : c === 'S' ? 'Em separação' : 'Aguardando separação');
  const stCor = (c) => (c === 'E' ? LF_VL_ST_OK : c === 'S' ? LF_VL_ST_ANDA : LF_VL_ST_NAO);
  const th = { background: LF_VL_VERDE, color: '#fff', fontSize: 12.5, fontWeight: 800, padding: '9px 10px', textAlign: 'left', whiteSpace: 'nowrap' };
  const td = { padding: '8px 10px', fontSize: 13, borderBottom: `1px solid ${C.bdLight}`, color: C.txtPri, verticalAlign: 'top' };

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(2px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onFechar}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: C.bgCard, borderRadius: C.radius.xl, padding: 22, width: 820, maxWidth: '95vw', maxHeight: '88vh', overflow: 'auto', boxShadow: C.shadowXl, border: `1px solid ${C.bdMid}` }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 6 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.txtPri }}>Pedido {r.pedido}</div>
            <div style={{ fontSize: 12.5, color: C.txtMuted, marginTop: 3 }}>
              {[
                `Filial ${r.filial}`,
                r.transportadora,
                `${sepNum(r.qtd_total)} un`,
                r.lista_status,
                r.restante == null ? '' : r.restante < 0 ? `Atrasado ${lfRestante(-r.restante)}` : `Restam ${lfRestante(r.restante)}`,
              ]
                .filter(Boolean)
                .join(' · ')}
            </div>
            {r.faturador && (
              <div style={{ fontSize: 12.5, color: C.txtMuted, marginTop: 2 }}>Faturador: {r.faturador}</div>
            )}
          </div>
          <LfBtn pequeno onClick={onFechar}>
            Fechar ✕
          </LfBtn>
        </div>
        {erro && <LfAviso tipo="warn">Não consegui ler o painel do estoque: {erro}</LfAviso>}
        {painel === null ? (
          <LfVazio>Carregando itens...</LfVazio>
        ) : linhas.length === 0 ? (
          <LfVazio>Nenhum item encontrado para este pedido.</LfVazio>
        ) : (
          <div style={{ overflow: 'auto', border: `1px solid ${C.bdLight}`, borderRadius: C.radius.lg, marginTop: 10 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: C.font }}>
              <thead>
                <tr>
                  {['Produto', 'Qtd', 'Estoque', 'Entregue'].map((c) => (
                    <th key={c} style={{ ...th, textAlign: c === 'Qtd' || c === 'Entregue' ? 'center' : 'left' }}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {linhas.map((x, i) => {
                  const e = x.est[0];
                  const cod = e ? codSt(x.est) : '';
                  return (
                    <tr key={x.produto + i}>
                      <td style={{ ...td, fontWeight: 700 }}>{x.produto}</td>
                      <td style={{ ...td, textAlign: 'center' }}>{x.qtd == null ? '—' : x.qtd}</td>
                      <td style={td}>
                        {e ? (
                          <span style={{ background: stCor(cod), color: cod === 'S' ? '#000' : '#fff', fontWeight: 700, fontSize: 12, padding: '3px 8px', borderRadius: 999, whiteSpace: 'nowrap' }}>
                            {stTxt(cod)}
                          </span>
                        ) : (
                          <span style={{ color: C.txtMuted }}>Fora do painel</span>
                        )}
                      </td>
                      <td style={{ ...td, textAlign: 'center' }}>{e ? (e.qtd_entregue != null && e.qtd_entregue !== '' ? e.qtd_entregue : '—') : ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function LfViaLeitor({ ativo }) {
  const [rows, setRows] = useState(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [agora, setAgora] = useState(Date.now());
  const [busca, setBusca] = useState('');
  const [fFilial, setFFilial] = useState('');
  const [fLista, setFLista] = useState('');
  const [fPrazo, setFPrazo] = useState('');
  const [limiteTela, setLimiteTela] = useState(200);
  const [fSep, setFSep] = useState('');
  const [semFat, setSemFat] = useState(false); // view ainda sem as colunas de faturador
  const [gravandoFat, setGravandoFat] = useState('');
  const [atualizacoes, setAtualizacoes] = useState({}); // { agente: {atualizado_em, detalhe}, manual: {...} }
  const [subindo, setSubindo] = useState(false); // tela de subir o relatório manualmente
  const [detalhe, setDetalhe] = useState(null); // pedido aberto em "Ver pedido" (chave filial-pedido)
  const [avisoFat, setAvisoFat] = useState(null);

  const carregar = useCallback(async (silencioso) => {
    if (!silencioso) setCarregando(true);
    try {
      const ordem = '&order=data_limite.asc.nullslast,pedido.asc';
      let dados;
      // Tenta a view completa; se o SQL ainda não foi rodado/atualizado, cai para a versão anterior (sem quebrar).
      const tentativas = [
        [LF_VL_SELECT, false],
        [LF_VL_SELECT_EST, false],
        [LF_VL_SELECT_FAT, false],
        [LF_VL_SELECT_BASE, true],
      ];
      for (let k = 0; k < tentativas.length; k++) {
        try {
          dados = await sepBuscarTudo(`/v_via_leitor_lista?select=${tentativas[k][0]}${ordem}`);
          setSemFat(tentativas[k][1]);
          break;
        } catch (e1) {
          const colunaFalta = /itens|est_itens|est_entregues|est_separando|separador|separacao_status|faturador|42703|column/i.test(String(e1.message || e1));
          if (!colunaFalta || k === tentativas.length - 1) throw e1;
        }
      }
      setRows(dados);
      setErro('');
      try {
        const at = await lfApi('/via_leitor_atualizacoes?select=origem,atualizado_em,detalhe');
        const mapa = {};
        (Array.isArray(at) ? at : []).forEach((x) => {
          mapa[x.origem] = x;
        });
        setAtualizacoes(mapa);
      } catch (e2) {
        /* tabela ainda não criada: mostra só o horário geral */
      }
    } catch (e) {
      const msg = String(e.message || e);
      setErro(
        /PGRST205|does not exist|Could not find/i.test(msg)
          ? 'A view do Via Leitor ainda não existe no Supabase. Rode o SQL criar_via_leitor_agente.sql.'
          : 'Não foi possível carregar o Via Leitor: ' + msg.slice(0, 160)
      );
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    if (!ativo) return undefined;
    carregar(false);
    // Busca dados novos (pedidos que entraram/saíram, listas geradas) a cada 30 s, só com a aba visível.
    const t = setInterval(() => {
      if (!document.hidden) carregar(true);
    }, 30000);
    return () => clearInterval(t);
  }, [ativo, carregar]);
  // Relógio: o "Restante", o Prazo e o Atraso andam a cada segundo, sem precisar consultar o banco.
  useEffect(() => {
    if (!ativo) return undefined;
    setAgora(Date.now());
    const t = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(t);
  }, [ativo]);

  const lista = useMemo(
    () =>
      (rows || []).map((r) => {
        const lim = r.data_limite ? new Date(r.data_limite).getTime() : null;
        return {
          ...r,
          lim,
          restante: lim == null ? null : lim - agora,
          tipo: r.tem_lista ? 'lista' : r.no_estoque ? 'estoque' : 'gerar',
          aplica: lfVlAplica(r),
          // Status da separação: 1º o andamento no estoque (painel_estoque, com %); 2º o da tela Separação de Lista.
          // nao | andamento | concluida
          estPct: Number(r.est_itens) > 0 ? Math.round((Number(r.est_entregues || 0) / Number(r.est_itens)) * 100) : null,
          sepSt: !lfVlAplica(r)
            ? null
            : Number(r.est_itens) > 0
            ? Number(r.est_entregues || 0) >= Number(r.est_itens)
              ? 'concluida'
              : Number(r.est_entregues || 0) + Number(r.est_separando || 0) > 0
              ? 'andamento'
              : 'nao'
            : !r.tem_lista
            ? null // pedido de estoque que não está no painel_estoque: status em branco
            : r.separacao_status === 'finalizada'
            ? 'concluida'
            : r.separacao_status === 'em_separacao'
            ? 'andamento'
            : 'nao',
        };
      }),
    [rows, agora]
  );
  // Quem pode ser escolhido como faturador: a equipe + qualquer nome que já apareceu nos dados.
  const nomesFat = useMemo(() => {
    const set = new Set(SEP_SEPARADORES);
    (rows || []).forEach((r) => {
      if (r.separador) set.add(r.separador);
      if (r.faturador) set.add(r.faturador);
    });
    return [...set];
  }, [rows]);

  // Grava o faturador. Pedido em lista -> vale para a lista inteira (separacao_listas);
  // pedido de estoque (sem lista) -> só para o pedido (pedido_faturador).
  const escolherFaturador = async (r, nome) => {
    let valor = nome;
    if (valor === '__outro') {
      valor = (window.prompt('Nome de quem faturou:') || '').trim();
      if (!valor) return;
    }
    const chave = r.separacao_id ? 'l' + r.separacao_id : 'p' + r.pedido;
    setGravandoFat(chave);
    setAvisoFat(null);
    try {
      if (r.separacao_id) {
        await lfApi('/separacao_listas?id=eq.' + encodeURIComponent(r.separacao_id), {
          method: 'PATCH',
          body: JSON.stringify({ faturador: valor || null, faturou_lista: valor ? valor === r.separador : null }),
          headers: { Prefer: 'return=minimal' },
        });
      } else if (valor) {
        await lfApi('/pedido_faturador?on_conflict=pedido', {
          method: 'POST',
          body: JSON.stringify({ pedido: r.pedido, faturador: valor }),
          headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        });
      } else {
        await lfApi('/pedido_faturador?pedido=eq.' + encodeURIComponent(r.pedido), {
          method: 'DELETE',
          headers: { Prefer: 'return=minimal' },
        });
      }
      // Atualiza a tela na hora (sem esperar os 30 s).
      setRows((atual) =>
        (atual || []).map((x) =>
          (r.separacao_id ? x.separacao_id === r.separacao_id : x.pedido === r.pedido)
            ? { ...x, faturador: valor || null, faturador_manual: !r.separacao_id && !!valor }
            : x
        )
      );
      carregar(true);
    } catch (e) {
      setAvisoFat({ tipo: 'erro', texto: 'Não foi possível gravar o faturador: ' + String(e.message || e).slice(0, 160) });
    } finally {
      setGravandoFat('');
    }
  };
  const cont = useMemo(
    () => ({
      total: lista.length,
      alerta: lista.filter((r) => lfVlCor(r) === 'vermelho').length,
      azul: lista.filter((r) => lfVlCor(r) === 'azul').length,
      gerar: lista.filter((r) => r.tipo === 'gerar').length,
      estoque: lista.filter((r) => r.tipo === 'estoque').length,
      emLista: lista.filter((r) => r.tipo === 'lista').length,
      atraso: lista.filter((r) => r.restante != null && r.restante < 0).length,
      semFat: lista.filter((r) => (r.sepSt === 'concluida' || (r.tipo === 'estoque' && r.aplica)) && !r.faturador).length,
      naoIniciada: lista.filter((r) => r.sepSt === 'nao').length,
    }),
    [lista]
  );
  const filiais = useMemo(() => [...new Set(lista.map((r) => r.filial))].filter(Boolean).sort(), [lista]);
  const filtrados = useMemo(() => {
    const termo = sepNorm(busca);
    return lista.filter((r) => {
      if (fFilial && r.filial !== fFilial) return false;
      if (fLista && r.tipo !== fLista) return false;
      if (fPrazo === 'atraso' && !(r.restante != null && r.restante < 0)) return false;
      if (fPrazo === 'vermelho' && lfVlCor(r) !== 'vermelho') return false;
      if (fPrazo === 'azul' && lfVlCor(r) !== 'azul') return false;
      if (fPrazo === 'prazo' && !(r.restante != null && r.restante >= 0)) return false;
      if (fSep === 'sem_faturador') {
        if (!((r.sepSt === 'concluida' || (r.tipo === 'estoque' && r.aplica)) && !r.faturador)) return false;
      } else if (fSep && r.sepSt !== fSep) return false;
      if (
        termo &&
        !sepNorm(`${r.pedido} ${r.transportadora} ${r.produtos || ''} ${r.lista_status} ${r.separador || ''} ${r.faturador || ''}`).includes(termo)
      )
        return false;
      return true;
    });
  }, [lista, busca, fFilial, fLista, fPrazo, fSep]);
  useEffect(() => setLimiteTela(200), [busca, fFilial, fLista, fPrazo, fSep]);

  const ultimaAtualizacao = useMemo(
    () => (rows && rows.length ? Math.max(...rows.map((r) => new Date(r.atualizado_em).getTime() || 0)) : 0),
    [rows]
  );
  const tAgente = atualizacoes.agente ? new Date(atualizacoes.agente.atualizado_em).getTime() : 0;
  const tManual = atualizacoes.manual ? new Date(atualizacoes.manual.atualizado_em).getTime() : 0;
  // Parado = nem o agente nem um relatório manual atualizaram há mais de 15 min.
  const ultimoDado = Math.max(tAgente, tManual) || ultimaAtualizacao;
  const agenteParado = ultimoDado && agora - ultimoDado > LF_VL_AGENTE_PARADO_MS;

  return (
    <>
      <LfKpis>
        <LfKpi rotulo="Pedidos no Via Leitor" valor={cont.total} detalhe="Filiais 0101 e 0102" tipo="info" />
        <LfKpi rotulo="Gerar lista" valor={cont.gerar} detalhe="Sem lista e fora do estoque" tipo={cont.gerar ? 'erro' : 'ok'} />
        <LfKpi rotulo="Em lista" valor={cont.emLista} detalhe="Já têm lista gerada" tipo="ok" />
        <LfKpi rotulo="Estoque - separação" valor={cont.estoque} detalhe="Lançados para o estoque" tipo="warn" />
        <LfKpi rotulo="Em vermelho" valor={cont.alerta} detalhe="Falta 1h ou menos, ou já atrasou" tipo={cont.alerta ? 'erro' : 'ok'} />
        <LfKpi rotulo="Em azul" valor={cont.azul} detalhe="Mais de 50 un, faltam 3h ou menos" tipo="info" />
        <LfKpi rotulo="Em atraso" valor={cont.atraso} detalhe="Passou da data limite" tipo={cont.atraso ? 'erro' : 'ok'} />
        {!semFat && (
          <LfKpi rotulo="Separação não iniciada" valor={cont.naoIniciada} detalhe="Sem nenhum item iniciado" tipo={cont.naoIniciada ? 'warn' : 'ok'} />
        )}
        {!semFat && (
          <LfKpi rotulo="Sem faturador" valor={cont.semFat} detalhe="Concluída ou estoque, sem nome" tipo={cont.semFat ? 'warn' : 'ok'} />
        )}
      </LfKpis>
      <LfCard
        titulo="Via Leitor × Listas"
        subtitulo={
          ultimaAtualizacao || tAgente || tManual
            ? `Agente: ${tAgente ? sepQuandoSeg(tAgente) : ultimaAtualizacao && !tManual ? sepQuandoSeg(ultimaAtualizacao) : '—'} · Manual: ${
                tManual ? sepQuandoSeg(tManual) : '—'
              } · ${filtrados.length} de ${lista.length} pedidos`
            : 'Pedidos do Via Leitor e a lista de cada um'
        }
        acoes={
          <div style={{ display: 'flex', gap: 8 }}>
            <LfBtn onClick={() => setSubindo(true)}>📤 Subir relatório</LfBtn>
            <LfBtn onClick={() => carregar(false)} disabled={carregando}>
              {carregando ? 'Atualizando...' : '🔄 Atualizar'}
            </LfBtn>
          </div>
        }
      >
        {erro && <LfAviso tipo="erro">{erro}</LfAviso>}
        {avisoFat && <LfAviso tipo={avisoFat.tipo}>{avisoFat.texto}</LfAviso>}
        {semFat && !erro && (
          <LfAviso tipo="warn">
            As colunas Separador, Faturador e Status da separação aparecem depois de rodar o SQL criar_faturador_separacao.sql no Supabase.
          </LfAviso>
        )}
        {agenteParado && (
          <LfAviso tipo="erro">
            O Via Leitor não é atualizado há {sepHoras(agora - ultimoDado)}. Confira se o agente está rodando ou suba o relatório manualmente.
          </LfAviso>
        )}
        <div
          style={{
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
            margin: '4px 0 14px',
            padding: 12,
            background: C.bgStripe,
            border: `1px solid ${C.bdLight}`,
            borderRadius: C.radius.lg,
          }}
        >
          <input
            className="lf-input"
            style={{ ...lfInputStyle, width: 240 }}
            placeholder="🔍 Pedido, produto, transportadora, lista ou pessoa"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <select className="lf-input" style={lfInputStyle} value={fFilial} onChange={(e) => setFFilial(e.target.value)}>
            <option value="">Filial: todas</option>
            {filiais.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <select className="lf-input" style={lfInputStyle} value={fLista} onChange={(e) => setFLista(e.target.value)}>
            <option value="">Lista: todas</option>
            <option value="gerar">Gerar Lista</option>
            <option value="estoque">Estoque - separação</option>
            <option value="lista">Em lista</option>
          </select>
          <select className="lf-input" style={lfInputStyle} value={fPrazo} onChange={(e) => setFPrazo(e.target.value)}>
            <option value="">Prazo: todos</option>
            <option value="vermelho">Em vermelho (≤ 1h)</option>
            <option value="azul">Em azul (mais de 50 un, até 3h)</option>
            <option value="atraso">Em atraso</option>
            <option value="prazo">No prazo</option>
          </select>
          {!semFat && (
            <select className="lf-input" style={lfInputStyle} value={fSep} onChange={(e) => setFSep(e.target.value)}>
              <option value="">Separação: todas</option>
              <option value="nao">Não iniciada</option>
              <option value="andamento">Em separação</option>
              <option value="concluida">Concluída</option>
              <option value="sem_faturador">Sem faturador</option>
            </select>
          )}
        </div>
        {rows === null && !erro ? (
          <LfVazio>Carregando pedidos do Via Leitor...</LfVazio>
        ) : filtrados.length === 0 ? (
          <LfVazio>{lista.length ? 'Nenhum pedido encontrado neste filtro.' : 'Nenhum pedido no Via Leitor.'}</LfVazio>
        ) : (
          <>
            <div style={{ overflow: 'auto', maxHeight: '70vh', border: `1px solid ${C.bdLight}`, borderRadius: C.radius.lg }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: C.font, fontVariantNumeric: 'tabular-nums' }}>
                <thead>
                  <tr>
                    {['Filial', 'Pedido', 'Data Liberação', 'Quant', 'Transporte', 'Produto', 'Status', 'Tempo Pedido', 'Data limite', 'Tempo Restante', 'Lista']
                      .concat(semFat ? [] : ['Separador', 'Faturador', 'Status separação'])
                      .map((c) => (
                      <th
                        key={c}
                        style={{
                          position: 'sticky',
                          top: 0,
                          zIndex: 1,
                          background: LF_VL_VERDE,
                          color: '#fff',
                          fontSize: 12.5,
                          fontWeight: 800,
                          padding: '11px 8px',
                          textAlign: c === 'Transporte' || c === 'Produto' ? 'left' : 'center',
                          whiteSpace: 'nowrap',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtrados.slice(0, limiteTela).map((r) => {
                    const atrasado = r.restante != null && r.restante < 0;
                    const cor = lfVlCor(r); // 'vermelho' (1h ou menos / vencido), 'azul' (mais de 50 un e 3h ou menos) ou null
                    const vermelho = cor === 'vermelho';
                    const colorida = cor != null;
                    const td = {
                      padding: '9px 8px',
                      fontSize: 13,
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      borderBottom: `1px solid ${colorida ? 'rgba(255,255,255,0.35)' : C.bdLight}`,
                      background: vermelho ? LF_VL_VERMELHO : cor === 'azul' ? LF_VL_AZUL : 'transparent',
                      color: colorida ? '#fff' : C.txtPri,
                      fontWeight: colorida ? 700 : 500,
                    };
                    const horas = Number(r.tempo_pedido_horas);
                    return (
                      <tr key={`${r.filial}-${r.pedido}`}>
                        <td style={td}>{r.filial}</td>
                        <td style={{ ...td, fontWeight: 800 }}>
                          <span
                            onClick={() => setDetalhe(`${r.filial}-${r.pedido}`)}
                            title="Ver itens do pedido"
                            style={{ cursor: 'pointer', textDecoration: 'underline dotted', textUnderlineOffset: 3 }}
                          >
                            {r.pedido}
                          </span>
                        </td>
                        <td style={td}>{r.lib_estoque ? sepQuandoSeg(new Date(r.lib_estoque).getTime()) : '—'}</td>
                        <td style={td}>{sepNum(r.qtd_total)}</td>
                        <td style={{ ...td, textAlign: 'left' }}>{r.transportadora || '—'}</td>
                        <td style={{ ...td, textAlign: 'left', whiteSpace: 'normal', minWidth: 130, maxWidth: 240, wordBreak: 'break-word' }}>
                          {(() => {
                            const its = lfVlItens(r);
                            if (!its.length) return '';
                            if (its.length <= LF_VL_MAX_MODELOS) return its.map((i) => i.produto).join(' , ');
                            return (
                              <button
                                type="button"
                                onClick={() => setDetalhe(`${r.filial}-${r.pedido}`)}
                                style={{ fontFamily: C.font, fontSize: 12, fontWeight: 700, padding: '3px 9px', borderRadius: 999, border: '1px solid rgba(0,0,0,0.25)', background: '#fff', color: '#111', cursor: 'pointer' }}
                              >
                                🔍 Ver {its.length} itens
                              </button>
                            );
                          })()}
                        </td>
                        <td style={td}>{r.restante == null ? '—' : atrasado ? 'Atraso' : 'No Prazo'}</td>
                        <td style={td}>{horas ? `${horas}:00:00` : '—'}</td>
                        <td style={td}>{r.lim ? sepQuandoSeg(r.lim) : '—'}</td>
                        <td style={{ ...td, fontWeight: 800 }}>{r.restante == null ? '—' : lfRestante(r.restante)}</td>
                        <td
                          style={{
                            ...td,
                            ...(r.tipo === 'estoque'
                              ? { background: LF_VL_LARANJA, color: '#000', fontStyle: 'italic', fontWeight: 600 }
                              : r.tipo === 'gerar'
                              ? { background: LF_VL_VERMELHO, color: '#fff', fontStyle: 'italic', fontWeight: 700 }
                              : null),
                          }}
                        >
                          {r.lista_status}
                        </td>
                        {!semFat && (
                          <>
                            <td style={td}>{r.aplica ? r.separador || '—' : ''}</td>
                            <td style={{ ...td, padding: '5px 8px' }}>
                              {!r.aplica ? null : r.sepSt === 'concluida' || r.tipo === 'estoque' ? (
                                <select
                                  value={r.faturador || ''}
                                  disabled={gravandoFat === (r.separacao_id ? 'l' + r.separacao_id : 'p' + r.pedido)}
                                  onChange={(e) => escolherFaturador(r, e.target.value)}
                                  title={r.separacao_id ? 'Vale para a lista inteira' : 'Vale só para este pedido'}
                                  style={{
                                    fontFamily: C.font,
                                    fontSize: 12.5,
                                    fontWeight: 700,
                                    padding: '4px 6px',
                                    borderRadius: 6,
                                    border: `1px solid ${r.faturador ? C.bdMid : LF_VL_ST_ANDA}`,
                                    background: r.faturador ? '#fff' : '#fff7e0',
                                    color: '#111',
                                    maxWidth: 150,
                                  }}
                                >
                                  <option value="">Escolher...</option>
                                  {nomesFat.map((n) => (
                                    <option key={n} value={n}>
                                      {n}
                                    </option>
                                  ))}
                                  <option value="__outro">Outro...</option>
                                </select>
                              ) : (
                                r.faturador || '—'
                              )}
                            </td>
                            <td
                              style={{
                                ...td,
                                ...(r.sepSt === 'nao'
                                  ? { background: LF_VL_ST_NAO, color: '#fff', fontWeight: 700 }
                                  : r.sepSt === 'andamento'
                                  ? { background: LF_VL_ST_ANDA, color: '#000', fontWeight: 700 }
                                  : r.sepSt === 'concluida'
                                  ? { background: LF_VL_ST_OK, color: '#fff', fontWeight: 700 }
                                  : null),
                              }}
                            >
                              {r.sepSt === 'nao'
                                ? r.estPct != null
                                  ? 'Não iniciada · 0%'
                                  : 'Não iniciada'
                                : r.sepSt === 'andamento'
                                ? r.estPct != null
                                  ? `Em separação · ${r.estPct}% (${r.est_entregues || 0}/${r.est_itens})`
                                  : `Em separação · ${sepHms(agora - new Date(r.separacao_inicio).getTime())}`
                                : r.sepSt === 'concluida'
                                ? r.estPct != null
                                  ? 'Concluída · 100%'
                                  : 'Concluída'
                                : ''}
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {filtrados.length > limiteTela && (
              <div style={{ textAlign: 'center', marginTop: 12 }}>
                <LfBtn onClick={() => setLimiteTela((n) => n + 200)}>
                  Mostrar mais ({filtrados.length - limiteTela} restantes)
                </LfBtn>
              </div>
            )}
          </>
        )}
      </LfCard>
      {subindo && (
        <LfViaLeitorUpload
          existentes={rows || []}
          agenteHa={tAgente ? agora - tAgente : null}
          onFechar={() => setSubindo(false)}
          onFeito={(msg) => {
            setSubindo(false);
            setAvisoFat({ tipo: 'ok', texto: msg });
            carregar(false);
          }}
        />
      )}
      {detalhe && lista.find((x) => `${x.filial}-${x.pedido}` === detalhe) && (
        <LfViaLeitorDetalhe r={lista.find((x) => `${x.filial}-${x.pedido}` === detalhe)} onFechar={() => setDetalhe(null)} />
      )}
    </>
  );
}

function TelaListaFaturamento({ ativo }) {
  const [aba, setAba] = useState('importar');
  // Pergunta "quem está fazendo?" no momento da ação (gerar listas, excluir, lançar Picking Poluído).
  const [quem, setQuem] = useState(null); // { titulo, aoEscolher }
  const [outroNome, setOutroNome] = useState('');
  const pedirQuem = (titulo, aoEscolher) => {
    setOutroNome('');
    setQuem({ titulo, aoEscolher });
  };

  // Importação
  const [arquivo, setArquivo] = useState(null); // {nome, headers, rows, idx}
  const [msgArquivo, setMsgArquivo] = useState(null); // {tipo, texto}
  const [preview, setPreview] = useState(null);
  const [carregandoPreview, setCarregandoPreview] = useState(false);
  const [gerando, setGerando] = useState(false);
  const [msgGerar, setMsgGerar] = useState(null);
  const inputArquivoRef = useRef(null);

  // Listas da sessão
  const [sessao, setSessao] = useState({ listas: [], registros: {} });
  const [listaAberta, setListaAberta] = useState('');

  // Histórico
  const [historico, setHistorico] = useState([]);
  const [carregandoHist, setCarregandoHist] = useState(false);
  const [msgHist, setMsgHist] = useState(null);
  const [filtros, setFiltros] = useState({ busca: '', filial: '', transp: '', impresso: '', status: '' });
  const [selecionadas, setSelecionadas] = useState(() => new Set());
  const [expandida, setExpandida] = useState('');
  const [itensExpandida, setItensExpandida] = useState(null);
  const [motivoAberto, setMotivoAberto] = useState('');
  const [limiteTela, setLimiteTela] = useState(150);

  // Exclusão
  const [modal, setModal] = useState(null); // {tipo, lista, pedido}
  const [motivoExclusao, setMotivoExclusao] = useState('');
  const [excluindo, setExcluindo] = useState(false);

  // Impressão
  const [blocos, setBlocos] = useState([]);
  const [imprimindo, setImprimindo] = useState(false);

  // Picking Poluído
  const [pedidoPoluido, setPedidoPoluido] = useState('');
  const [lancandoPoluido, setLancandoPoluido] = useState(false);
  const [msgPoluido, setMsgPoluido] = useState(null);

  // ── Importar CSV ──
  const aoEscolherArquivo = async (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setPreview(null);
    setMsgGerar(null);
    setArquivo(null);
    try {
      const texto = await lfLerTextoCsv(f);
      const lido = lfLerCsv(texto);
      if (lido.faltando.length) {
        setMsgArquivo({ tipo: 'erro', texto: 'Cabeçalho inválido. Faltando: ' + lido.faltando.join(', ') });
        return;
      }
      setArquivo({ nome: f.name, ...lido });
      setMsgArquivo({ tipo: 'ok', texto: 'Arquivo carregado com sucesso. ' + lido.rows.length + ' linhas encontradas.' });
      setCarregandoPreview(true);
      try {
        setPreview(await lfPreview(lido.rows, lido.idx));
      } finally {
        setCarregandoPreview(false);
      }
    } catch (err) {
      setCarregandoPreview(false);
      setMsgArquivo({ tipo: 'erro', texto: 'Erro ao ler o arquivo: ' + err.message });
    }
  };

  const gerar = () => {
    if (!arquivo) return;
    pedirQuem('Quem está gerando as listas?', executarGerar);
  };
  const executarGerar = async (usuario) => {
    setGerando(true);
    setMsgGerar({ tipo: 'info', texto: 'Gerando listas...' });
    try {
      const r = await lfGerarListas({
        rows: arquivo.rows,
        headers: arquivo.headers,
        idx: arquivo.idx,
        usuario: usuario.nome,
        email: usuario.email,
        origemArquivo: arquivo.nome,
      });
      setSessao({ listas: r.listasSessao, registros: r.registrosPorLista });
      const s = r.resumo;
      setMsgGerar({
        tipo: 'ok',
        texto:
          `Listas salvas: ${s.listas}. ` +
          `Pedidos enviados para a fila do estoque: ${s.pedidosEstoque} (Pedido Caixa: ${s.pedidosCaixa}, Picking Insuficiente: ${s.pedidosInsuf}). ` +
          `Itens confirmados na fila da planilha (Lançamentos): ${s.itensFila}. ` +
          `Pedidos bloqueados pelo histórico: ${s.bloqueadosHistorico}. ` +
          `Pedidos já enviados antes ao estoque (bloqueados): ${s.bloqueadosEstoque}. ` +
          `Linhas inválidas: ${s.linhasInvalidas}.`,
      });
      setArquivo(null);
      setPreview(null);
      if (inputArquivoRef.current) inputArquivoRef.current.value = '';
      setAba('listas');
    } catch (err) {
      setMsgGerar({ tipo: 'erro', texto: 'Erro: ' + err.message });
    } finally {
      setGerando(false);
    }
  };

  // ── Impressão ──
  const imprimirBlocos = (lista) => {
    setBlocos(lista);
    setTimeout(() => window.print(), 350);
  };
  const imprimirSessao = async (lista) => {
    const info = sessao.listas.find((l) => l.lista === lista);
    if (!info) return;
    setImprimindo(true);
    try {
      await lfMarcarImpressas([lista]);
      setSessao((s) => ({
        ...s,
        listas: s.listas.map((l) => (l.lista === lista ? { ...l, impresso: 'SIM' } : l)),
      }));
      setHistorico((h) => h.map((x) => (x.lista === lista ? { ...x, impresso: 'SIM' } : x)));
      imprimirBlocos([{ lista, info, registros: sessao.registros[lista] || [] }]);
    } catch (err) {
      alert('Erro ao marcar ' + lista + ' como impressa: ' + err.message);
    } finally {
      setImprimindo(false);
    }
  };

  // ── Histórico ──
  const carregarHistorico = useCallback(async (busca) => {
    setCarregandoHist(true);
    setMsgHist(null);
    try {
      const filtroBusca = busca ? '&lista=ilike.' + encodeURIComponent('*' + busca + '*') : '';
      const h = await lfApi(
        '/historico_listas?select=id,lista,data_hora,usuario,filial,transportadora,pedidos,unidades,impresso,status,motivo_ajuste,ajustada_por,ajustada_em' +
          filtroBusca +
          '&order=id.desc&limit=' +
          (busca ? 500 : 1000)
      );
      setHistorico(Array.isArray(h) ? h : []);
      setLimiteTela(150);
    } catch (err) {
      setMsgHist({ tipo: 'erro', texto: 'Erro ao carregar histórico: ' + err.message });
    } finally {
      setCarregandoHist(false);
    }
  }, []);

  useEffect(() => {
    if (ativo && aba === 'historico' && historico.length === 0 && !carregandoHist) {
      carregarHistorico('');
    }
  }, [ativo, aba]);

  const filiais = useMemo(
    () => [...new Set(historico.map((x) => String(x.filial || '').trim()).filter(Boolean))].sort(),
    [historico]
  );
  const transps = useMemo(
    () => [...new Set(historico.map((x) => String(x.transportadora || '').trim()).filter(Boolean))].sort(),
    [historico]
  );
  const filtrado = useMemo(
    () =>
      historico.filter((x) => {
        const b = filtros.busca.trim().toLowerCase();
        return (
          (!b || String(x.lista || '').toLowerCase().includes(b)) &&
          (!filtros.filial || String(x.filial || '').trim() === filtros.filial) &&
          (!filtros.transp || String(x.transportadora || '').trim() === filtros.transp) &&
          (!filtros.impresso || String(x.impresso || 'NÃO').toUpperCase() === filtros.impresso) &&
          (!filtros.status || String(x.status || 'ATIVA').toUpperCase() === filtros.status)
        );
      }),
    [historico, filtros]
  );

  const alternarSelecao = (lista, marcado) =>
    setSelecionadas((s) => {
      const n = new Set(s);
      if (marcado) n.add(lista);
      else n.delete(lista);
      return n;
    });

  const imprimirListasHistorico = async (listas) => {
    if (!listas.length) return;
    setImprimindo(true);
    setMsgHist(null);
    try {
      const novos = [];
      const imprimidas = [];
      const semPedidos = [];
      for (const lista of listas) {
        const d = await lfBuscarImpressao(lista);
        const status = String(d.info.status || 'ATIVA').toUpperCase();
        if (status === 'CANCELADA') {
          novos.push(d);
          imprimidas.push(lista);
        } else if (!d.registros.length) {
          semPedidos.push(lista);
        } else {
          novos.push(d);
          imprimidas.push(lista);
        }
      }
      if (!novos.length) throw new Error('Nenhuma das listas selecionadas está disponível para impressão.');
      await lfMarcarImpressas(imprimidas);
      setHistorico((h) => h.map((x) => (imprimidas.includes(x.lista) ? { ...x, impresso: 'SIM' } : x)));
      setSelecionadas((s) => {
        const n = new Set(s);
        imprimidas.forEach((l) => n.delete(l));
        return n;
      });
      if (semPedidos.length) {
        setMsgHist({
          tipo: 'warn',
          texto: 'Não incluídas (sem pedidos e não canceladas): ' + semPedidos.join(', '),
        });
      }
      imprimirBlocos(novos);
    } catch (err) {
      setMsgHist({ tipo: 'erro', texto: 'Erro ao imprimir: ' + err.message });
    } finally {
      setImprimindo(false);
    }
  };

  const verPedidos = async (lista) => {
    if (expandida === lista) {
      setExpandida('');
      return;
    }
    setExpandida(lista);
    setItensExpandida(null);
    try {
      const itens = await lfApi(
        '/historico_pedidos?select=pedido,produto,quantidade,localizacao,unidade_faturamento&lista=eq.' +
          encodeURIComponent(lista) +
          '&order=id.asc&limit=5000'
      );
      setItensExpandida(Array.isArray(itens) ? itens : []);
    } catch (err) {
      setItensExpandida([]);
      setMsgHist({ tipo: 'erro', texto: 'Erro ao carregar pedidos: ' + err.message });
    }
  };

  const confirmarExclusao = () => {
    if (!modal) return;
    const motivo = motivoExclusao.trim();
    if (motivo.length < 5) {
      alert('Informe um motivo com pelo menos 5 caracteres.');
      return;
    }
    pedirQuem('Quem está excluindo?', (u) => executarExclusao(u, motivo));
  };
  const executarExclusao = async (usuario, motivo) => {
    setExcluindo(true);
    try {
      const aviso = await lfExcluir({ ...modal, motivo, usuario: usuario.nome, email: usuario.email });
      setModal(null);
      setMotivoExclusao('');
      setExpandida('');
      await carregarHistorico('');
      setMsgHist({
        tipo: aviso ? 'warn' : 'ok',
        texto: aviso || 'Exclusão registrada com sucesso. O motivo ficou salvo na auditoria.',
      });
    } catch (err) {
      alert('Não foi possível excluir: ' + err.message);
    } finally {
      setExcluindo(false);
    }
  };

  // ── Picking Poluído ──
  const lancarPoluido = () => {
    const pedido = pedidoPoluido.trim();
    if (!pedido) {
      setMsgPoluido({ tipo: 'warn', texto: 'Informe o número do pedido.' });
      return;
    }
    pedirQuem('Quem está lançando o pedido?', (u) => executarPoluido(u, pedido));
  };
  const executarPoluido = async (usuario, pedido) => {
    setLancandoPoluido(true);
    setMsgPoluido({ tipo: 'info', texto: 'Buscando todos os produtos e enviando ao estoque...' });
    try {
      const r = await lfLancarPoluido({ pedido, usuario: usuario.nome, email: usuario.email });
      setMsgPoluido({ tipo: r.tipo, texto: r.mensagem });
      setPedidoPoluido('');
    } catch (err) {
      setMsgPoluido({ tipo: 'erro', texto: 'Erro ao lançar: ' + err.message });
    } finally {
      setLancandoPoluido(false);
    }
  };

  const abas = [
    ['importar', 'Importar CSV'],
    ['listas', 'Listas geradas'],
    ['historico', 'Histórico de listas'],
    ['poluido', 'Picking Poluído'],
    ['vialeitor', 'Via Leitor'],
  ];
  const registrosAbertos = listaAberta ? sessao.registros[listaAberta] || [] : [];
  const rankingAberto = lfCalcularRanking(registrosAbertos);

  return (
    <div style={{ fontFamily: C.font }}>
      <style>{LF_CSS}</style>
      <PageHeader
        titulo="Lista Faturamento"
        extraInfo="Importar CSV, gerar e imprimir listas, histórico, Picking Poluído e Via Leitor"
      />

      <div
        role="tablist"
        style={{ display: 'flex', gap: 4, marginBottom: 20, flexWrap: 'wrap', borderBottom: `1px solid ${C.bdMid}` }}
      >
        {abas.map(([id, nome]) => {
          const ativa = aba === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={ativa}
              className="lf-tab"
              onClick={() => setAba(id)}
              style={{
                padding: '10px 16px',
                marginBottom: -1,
                background: 'transparent',
                border: 'none',
                borderBottom: `2px solid ${ativa ? C.primary : 'transparent'}`,
                color: ativa ? C.primary : C.txtSec,
                fontWeight: ativa ? 800 : 600,
                fontSize: 13.5,
                cursor: 'pointer',
                fontFamily: C.font,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {nome}
              {id === 'listas' && sessao.listas.length > 0 && (
                <span
                  style={{
                    background: C.primaryLight,
                    color: C.primary,
                    borderRadius: C.radius.pill,
                    padding: '1px 8px',
                    fontSize: 11.5,
                    fontWeight: 800,
                  }}
                >
                  {sessao.listas.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {aba === 'importar' && (
        <>
          <LfCard titulo="Importar CSV do Tableau" subtitulo="Exportação do Tableau com as colunas de faturamento">
            <input
              ref={inputArquivoRef}
              className="lf-file"
              type="file"
              accept=".csv,.txt,.tsv"
              onChange={aoEscolherArquivo}
            />
            {msgArquivo && <LfAviso tipo={msgArquivo.tipo}>{msgArquivo.texto}</LfAviso>}
            {!msgArquivo && <LfAviso>Selecione o CSV exportado do Tableau para ver a prévia.</LfAviso>}
          </LfCard>

          {carregandoPreview && <LfAviso>Analisando o arquivo...</LfAviso>}

          {preview && preview.novosParaLista === 0 && preview.paraEstoque === 0 && (
            <>
              <LfAviso tipo="warn">
                Atenção: não há pedidos para geração de lista neste arquivo.
                {preview.repetidos.length + preview.bloqueadosEstoque > 0 &&
                  ` (${preview.repetidos.length} já estavam em listas · ${preview.bloqueadosEstoque} já enviados ao estoque)`}
              </LfAviso>
              {preview.aviso && <LfAviso tipo="warn">{preview.aviso}</LfAviso>}
            </>
          )}

          {preview && (preview.novosParaLista > 0 || preview.paraEstoque > 0) && (
            <LfCard
              titulo="Prévia da geração"
              subtitulo="Confira antes de gerar as listas"
              acoes={
                <LfBtn tipo="primario" disabled={gerando || !arquivo} onClick={gerar}>
                  {gerando ? 'Gerando...' : 'Gerar listas automáticas'}
                </LfBtn>
              }
            >
              <LfKpis>
                <LfKpi rotulo="Novos para lista" valor={preview.novosParaLista} tipo="ok" detalhe="pedidos que entram nas listas" />
                <LfKpi
                  rotulo="Para o estoque"
                  valor={preview.paraEstoque}
                  tipo="info"
                  detalhe={`Caixa: ${preview.caixa} · Picking Insuficiente: ${preview.insuf}`}
                />
                <LfKpi
                  rotulo="Já enviados ao estoque"
                  valor={preview.bloqueadosEstoque}
                  tipo={preview.bloqueadosEstoque ? 'warn' : 'neutro'}
                  detalhe="bloqueados"
                />
                <LfKpi
                  rotulo="Já gerados"
                  valor={preview.repetidos.length}
                  tipo={preview.repetidos.length ? 'warn' : 'neutro'}
                  detalhe="bloqueados"
                />
                <LfKpi
                  rotulo="Linhas inválidas"
                  valor={preview.linhasInvalidas}
                  tipo={preview.linhasInvalidas ? 'erro' : 'neutro'}
                />
              </LfKpis>
              {preview.aviso && <LfAviso tipo="warn">{preview.aviso}</LfAviso>}
              <div style={{ marginTop: 14 }}>
                <LfTabela colunas={['Filial', 'Transportadora', 'Pedidos novos', 'Unidades']} numericas={['Pedidos novos', 'Unidades']}>
                  {preview.grupos.length ? (
                    preview.grupos.map((g, i) => (
                      <tr key={i}>
                        <td style={lfTdStyle}>{g.filial}</td>
                        <td style={lfTdStyle}>{g.transportadora}</td>
                        <td style={lfTdNum}>{g.pedidos}</td>
                        <td style={lfTdNum}>{g.unidades}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td style={lfTdStyle} colSpan={4}>
                        <LfVazio>Sem pedidos novos para lista.</LfVazio>
                      </td>
                    </tr>
                  )}
                </LfTabela>
              </div>
              {preview.repetidos.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <LfAviso tipo="warn">{preview.repetidos.length} pedido(s) já estavam em listas e não serão gerados de novo.</LfAviso>
                  <div style={{ marginTop: 8 }}>
                    <LfTabela colunas={['Pedido', 'Lista', 'Usuário', 'Data']}>
                      {preview.repetidos.slice(0, 200).map((r) => (
                        <tr key={r.pedido}>
                          <td style={lfTdStyle}>{r.pedido}</td>
                          <td style={lfTdStyle}>{r.lista}</td>
                          <td style={lfTdStyle}>{r.usuario}</td>
                          <td style={lfTdStyle}>{lfFmtData(r.data_hora)}</td>
                        </tr>
                      ))}
                    </LfTabela>
                  </div>
                </div>
              )}
            </LfCard>
          )}
          {msgGerar && <LfAviso tipo={msgGerar.tipo}>{msgGerar.texto}</LfAviso>}
        </>
      )}

      {aba === 'listas' && (
        <>
          {msgGerar && (
            <div style={{ marginBottom: 16, marginTop: -6 }}>
              <LfAviso tipo={msgGerar.tipo}>{msgGerar.texto}</LfAviso>
            </div>
          )}
          {sessao.listas.length > 0 && (
            <LfKpis>
              <LfKpi rotulo="Listas geradas" valor={sessao.listas.length} tipo="info" />
              <LfKpi
                rotulo="Pedidos"
                valor={sessao.listas.reduce((t, l) => t + (Number(l.pedidos) || 0), 0)}
                tipo="neutro"
              />
              <LfKpi
                rotulo="Unidades"
                valor={sessao.listas.reduce((t, l) => t + (Number(l.unidades) || 0), 0)}
                tipo="neutro"
              />
              <LfKpi
                rotulo="Pendentes de impressão"
                valor={sessao.listas.filter((l) => String(l.impresso).toUpperCase() !== 'SIM').length}
                tipo={sessao.listas.some((l) => String(l.impresso).toUpperCase() !== 'SIM') ? 'warn' : 'ok'}
              />
            </LfKpis>
          )}
          <LfCard titulo="Listas geradas para impressão" subtitulo="Listas criadas nesta sessão">
            {sessao.listas.length === 0 ? (
              <LfVazio>Nenhuma lista gerada nesta sessão. Use "Histórico de listas" para listas de outros dias.</LfVazio>
            ) : (
              <LfTabela
                colunas={['Lista', 'Filial', 'Transportadora', 'Pedidos', 'Unidades', 'Impresso', 'Ações']}
                numericas={['Pedidos', 'Unidades']}
              >
                {sessao.listas.map((l) => (
                  <tr key={l.lista}>
                    <td style={{ ...lfTdStyle, fontWeight: 800 }}>{l.lista}</td>
                    <td style={lfTdStyle}>{l.filial}</td>
                    <td style={lfTdStyle}>{l.transportadora}</td>
                    <td style={lfTdNum}>{l.pedidos}</td>
                    <td style={lfTdNum}>{l.unidades}</td>
                    <td style={lfTdStyle}>
                      <LfBadge tipo={String(l.impresso).toUpperCase() === 'SIM' ? 'ok' : 'neutro'}>
                        {String(l.impresso).toUpperCase() === 'SIM' ? 'Impresso' : 'Pendente'}
                      </LfBadge>
                    </td>
                    <td style={lfTdStyle}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <LfBtn pequeno onClick={() => setListaAberta(listaAberta === l.lista ? '' : l.lista)}>
                          {listaAberta === l.lista ? 'Fechar' : 'Ver'}
                        </LfBtn>
                        <LfBtn pequeno tipo="verde" disabled={imprimindo} onClick={() => imprimirSessao(l.lista)}>
                          🖨 Imprimir
                        </LfBtn>
                      </div>
                    </td>
                  </tr>
                ))}
              </LfTabela>
            )}
          </LfCard>
          {listaAberta && (
            <LfCard
              titulo={`${listaAberta} — ${registrosAbertos.length} linha(s)`}
              acoes={
                <LfBtn tipo="verde" disabled={imprimindo} onClick={() => imprimirSessao(listaAberta)}>
                  🖨 Imprimir
                </LfBtn>
              }
            >
              <LfTabela colunas={['Ranking', 'C9 Produto', 'Qtd', 'Localização', 'C9 Pedido', 'Unidade', 'Tipo de faturamento', 'FILTRO V.1']} numericas={['Qtd']}>
                {registrosAbertos.map((r, i) => (
                  <tr key={i}>
                    <td style={lfTdStyle}>{rankingAberto[i]}</td>
                    <td style={lfTdStyle}>{r.produto}</td>
                    <td style={lfTdNum}>{r.quantidade}</td>
                    <td style={lfTdStyle}>{lfLocalizacaoHistorico(r.produto, r.localizacao) || 'SEM ENDEREÇO'}</td>
                    <td style={lfTdStyle}>{r.pedido}</td>
                    <td style={lfTdStyle}>{r.unidade_faturamento}</td>
                    <td style={lfTdStyle}>{lfValorCsv(r, ['Tipo de faturamento', 'Tipo Faturamento'])}</td>
                    <td style={lfTdStyle}>{lfValorCsv(r, ['FILTRO V.1', 'FILTRO V1'])}</td>
                  </tr>
                ))}
              </LfTabela>
            </LfCard>
          )}
        </>
      )}

      {aba === 'historico' && (
        <LfCard
          titulo="Histórico de listas"
          subtitulo="Consulte, reimprima ou cancele listas já geradas"
          acoes={
            <>
              <LfBtn onClick={() => carregarHistorico('')} disabled={carregandoHist}>
                🔄 Atualizar
              </LfBtn>
              <LfBtn onClick={() => setSelecionadas(
                    new Set(
                      filtrado
                        .slice(0, limiteTela)
                        .filter((x) => String(x.status || 'ATIVA').toUpperCase() !== 'CANCELADA')
                        .map((x) => x.lista)
                    )
                  )}>
                ☑ Selecionar visíveis
              </LfBtn>
              <LfBtn onClick={() => setSelecionadas(new Set())}>Limpar seleção</LfBtn>
              <LfBtn
                tipo="verde"
                disabled={!selecionadas.size || imprimindo}
                onClick={() => imprimirListasHistorico(filtrado.map((x) => x.lista).filter((l) => selecionadas.has(l)))}
              >
                {imprimindo ? 'Preparando...' : `🖨 Imprimir selecionadas (${selecionadas.size})`}
              </LfBtn>
            </>
          }
        >
          <div
            style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              marginBottom: 4,
              padding: 12,
              background: C.bgStripe,
              border: `1px solid ${C.bdLight}`,
              borderRadius: C.radius.lg,
            }}
          >
            <input
              className="lf-input"
              style={{ ...lfInputStyle, width: 220 }}
              placeholder="🔍 Buscar lista (ex.: 240) e Enter"
              value={filtros.busca}
              onChange={(e) => setFiltros({ ...filtros, busca: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') carregarHistorico(filtros.busca.replace(/^lista\s*/i, '').trim());
              }}
            />
            <select className="lf-input" style={lfInputStyle} value={filtros.filial} onChange={(e) => setFiltros({ ...filtros, filial: e.target.value })}>
              <option value="">Filial: todas</option>
              {filiais.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
            <select className="lf-input" style={lfInputStyle} value={filtros.transp} onChange={(e) => setFiltros({ ...filtros, transp: e.target.value })}>
              <option value="">Transportadora: todas</option>
              {transps.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
            <select className="lf-input" style={lfInputStyle} value={filtros.impresso} onChange={(e) => setFiltros({ ...filtros, impresso: e.target.value })}>
              <option value="">Impresso: todos</option>
              <option value="NÃO">NÃO</option>
              <option value="SIM">SIM</option>
            </select>
            <select className="lf-input" style={lfInputStyle} value={filtros.status} onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}>
              <option value="">Status: todos</option>
              <option value="ATIVA">ATIVA</option>
              <option value="AJUSTADA">AJUSTADA</option>
              <option value="CANCELADA">CANCELADA</option>
            </select>
          </div>
          <LfAviso>
            Marque as listas e clique em imprimir. Listas canceladas ficam só para consulta.
            Mostrando as listas mais recentes; para achar uma lista antiga, digite o número e aperte Enter.
          </LfAviso>
          {msgHist && <LfAviso tipo={msgHist.tipo}>{msgHist.texto}</LfAviso>}
          <div style={{ marginTop: 12 }}>
            {carregandoHist ? (
              <LfAviso>Carregando histórico...</LfAviso>
            ) : (
              <LfTabela
                colunas={['', 'Lista', 'Data/Hora', 'Usuário', 'Filial', 'Transportadora', 'Pedidos', 'Unidades', 'Impresso', 'Status', 'Ações']}
                numericas={['Pedidos', 'Unidades']}
              >
                {filtrado.length === 0 && (
                  <tr>
                    <td style={lfTdStyle} colSpan={11}>
                      <LfVazio>Nenhuma lista encontrada.</LfVazio>
                    </td>
                  </tr>
                )}
                {filtrado.slice(0, limiteTela).map((x) => {
                  const status = String(x.status || 'ATIVA').toUpperCase();
                  const cancelada = status === 'CANCELADA';
                  return (
                    <React.Fragment key={x.lista}>
                      <tr style={{ background: cancelada ? C.redBg : selecionadas.has(x.lista) ? C.primaryLight : 'transparent' }}>
                        <td style={lfTdStyle}>
                          {!cancelada && (
                            <input
                              type="checkbox"
                              checked={selecionadas.has(x.lista)}
                              onChange={(e) => alternarSelecao(x.lista, e.target.checked)}
                            />
                          )}
                        </td>
                        <td style={{ ...lfTdStyle, fontWeight: 800 }}>{x.lista}</td>
                        <td style={lfTdStyle}>{lfFmtData(x.data_hora)}</td>
                        <td style={lfTdStyle}>{x.usuario}</td>
                        <td style={lfTdStyle}>{x.filial}</td>
                        <td style={lfTdStyle}>{x.transportadora}</td>
                        <td style={lfTdNum}>{x.pedidos || 0}</td>
                        <td style={lfTdNum}>{x.unidades || 0}</td>
                        <td style={lfTdStyle}>
                          <LfBadge tipo={String(x.impresso || 'NÃO').toUpperCase() === 'SIM' ? 'ok' : 'neutro'}>
                            {String(x.impresso || 'NÃO').toUpperCase() === 'SIM' ? 'Impresso' : 'Pendente'}
                          </LfBadge>
                        </td>
                        <td style={lfTdStyle}>
                          <LfBadge tipo={cancelada ? 'erro' : status === 'AJUSTADA' ? 'warn' : 'info'}>
                            {status.charAt(0) + status.slice(1).toLowerCase()}
                          </LfBadge>
                        </td>
                        <td style={lfTdStyle}>
                          {cancelada ? (
                            <LfBtn pequeno title="Ver motivo do cancelamento" onClick={() => setMotivoAberto(motivoAberto === x.lista ? '' : x.lista)}>
                              {motivoAberto === x.lista ? 'Fechar' : 'Motivo'}
                            </LfBtn>
                          ) : (
                            <div style={{ display: 'flex', gap: 6 }}>
                              <LfBtn pequeno title="Ver pedidos da lista" onClick={() => verPedidos(x.lista)}>
                                {expandida === x.lista ? 'Fechar' : 'Pedidos'}
                              </LfBtn>
                              <LfBtn pequeno tipo="verde" title="Imprimir" disabled={imprimindo} onClick={() => imprimirListasHistorico([x.lista])}>
                                🖨
                              </LfBtn>
                              <LfBtn pequeno tipo="perigo" onClick={() => setModal({ tipo: 'LISTA', lista: x.lista, pedido: '' })}>
                                Excluir
                              </LfBtn>
                            </div>
                          )}
                        </td>
                      </tr>
                      {cancelada && motivoAberto === x.lista && (
                        <tr style={{ background: C.redBg }}>
                          <td colSpan={11} style={{ ...lfTdStyle, whiteSpace: 'normal', padding: '12px 14px 14px 46px' }}>
                            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                              <div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: C.txtMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                  Cancelada por
                                </div>
                                <div style={{ fontWeight: 700, marginTop: 2 }}>{x.ajustada_por || x.usuario || 'não informado'}</div>
                              </div>
                              <div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: C.txtMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                  Data e horário
                                </div>
                                <div style={{ fontWeight: 700, marginTop: 2 }}>{x.ajustada_em ? lfFmtData(x.ajustada_em) : 'não informado'}</div>
                              </div>
                              <div style={{ flex: '1 1 260px', minWidth: 220 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: C.txtMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                  Motivo
                                </div>
                                <div style={{ fontWeight: 600, marginTop: 2, lineHeight: 1.5 }}>{x.motivo_ajuste || 'não informado'}</div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                      {expandida === x.lista && (
                        <tr>
                          <td colSpan={11} style={{ padding: 10, background: C.bgStripe }}>
                            {!itensExpandida || itensExpandida.length === 0 ? (
                              <span style={{ fontSize: 12.5, color: C.txtMuted }}>
                                {itensExpandida ? 'Esta lista não tem pedidos registrados.' : 'Carregando pedidos...'}
                              </span>
                            ) : (
                              <LfTabela colunas={['C9 Pedido', 'C9 Produto', 'Qtd', 'Localização', 'Unidade', '']} numericas={['Qtd']}>
                                {itensExpandida.map((it, i) => {
                                  const primeiro =
                                    itensExpandida.findIndex((z) => String(z.pedido).trim() === String(it.pedido).trim()) === i;
                                  return (
                                    <tr key={i}>
                                      <td style={lfTdStyle}>{it.pedido}</td>
                                      <td style={lfTdStyle}>{it.produto}</td>
                                      <td style={lfTdNum}>{it.quantidade}</td>
                                      <td style={lfTdStyle}>{lfLocalizacaoHistorico(it.produto, it.localizacao) || 'SEM ENDEREÇO'}</td>
                                      <td style={lfTdStyle}>{it.unidade_faturamento}</td>
                                      <td style={lfTdStyle}>
                                        {primeiro && !cancelada && (
                                          <LfBtn pequeno tipo="perigo" onClick={() => setModal({ tipo: 'PEDIDO', lista: x.lista, pedido: String(it.pedido).trim() })}>
                                            Excluir pedido
                                          </LfBtn>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </LfTabela>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </LfTabela>
            )}
            {filtrado.length > limiteTela && (
              <div style={{ marginTop: 10 }}>
                <LfBtn onClick={() => setLimiteTela((n) => n + 150)}>
                  Mostrar mais ({filtrado.length - limiteTela} restantes)
                </LfBtn>
              </div>
            )}
          </div>
        </LfCard>
      )}

      {aba === 'vialeitor' && <LfViaLeitor ativo={ativo && aba === 'vialeitor'} />}

      {aba === 'poluido' && (
        <LfCard titulo="Lançar Picking Poluído" subtitulo="Envia o pedido inteiro para a planilha do estoque (aba Lançamentos)">
          <LfAviso>
            Digite o número do pedido e clique em Lançar pedido. Todos os produtos serão enviados para a planilha do
            estoque (aba Lançamentos). O mesmo pedido não pode ser lançado mais de uma vez.
          </LfAviso>
          <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              className="lf-input"
              style={{ ...lfInputStyle, width: 240, height: 38 }}
              inputMode="numeric"
              autoComplete="off"
              placeholder="Ex.: 577120"
              value={pedidoPoluido}
              onChange={(e) => setPedidoPoluido(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') lancarPoluido();
              }}
            />
            <LfBtn tipo="verde" disabled={lancandoPoluido} onClick={lancarPoluido}>
              {lancandoPoluido ? 'Lançando...' : '📦 Lançar pedido'}
            </LfBtn>
            <LfBtn
              onClick={() => {
                setPedidoPoluido('');
                setMsgPoluido(null);
              }}
            >
              Limpar
            </LfBtn>
          </div>
          {msgPoluido && <LfAviso tipo={msgPoluido.tipo}>{msgPoluido.texto}</LfAviso>}
        </LfCard>
      )}

      {quem && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(2px)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setQuem(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: C.bgCard, borderRadius: C.radius.xl, padding: 24, width: 460, maxWidth: '92vw', boxShadow: C.shadowXl, border: `1px solid ${C.bdMid}` }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: C.txtPri, marginBottom: 4 }}>{quem.titulo}</div>
            <div style={{ fontSize: 12.5, color: C.txtMuted, marginBottom: 14 }}>Escolha o seu nome para continuar.</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {LF_OPERADORES.map((u) => (
                <LfBtn
                  key={u.nome}
                  onClick={() => {
                    const fn = quem.aoEscolher;
                    setQuem(null);
                    fn(u);
                  }}
                >
                  {u.nome}
                </LfBtn>
              ))}
            </div>
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.bdLight}` }}>
              <div style={{ fontSize: 12.5, color: C.txtSec, fontWeight: 700, marginBottom: 6 }}>Não está na lista? Informe outro nome:</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  className="lf-input"
                  style={{ ...lfInputStyle, flex: 1 }}
                  placeholder="Nome e sobrenome"
                  maxLength={60}
                  value={outroNome}
                  onChange={(e) => setOutroNome(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && outroNome.trim().length >= 2) {
                      const fn = quem.aoEscolher;
                      setQuem(null);
                      fn({ nome: outroNome.trim().replace(/\s+/g, ' '), email: '' });
                    }
                  }}
                />
                <LfBtn
                  tipo="primario"
                  disabled={outroNome.trim().length < 2}
                  onClick={() => {
                    const fn = quem.aoEscolher;
                    setQuem(null);
                    fn({ nome: outroNome.trim().replace(/\s+/g, ' '), email: '' });
                  }}
                >
                  Continuar
                </LfBtn>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <LfBtn pequeno onClick={() => setQuem(null)}>
                Cancelar
              </LfBtn>
            </div>
          </div>
        </div>
      )}

      {modal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.55)',
            backdropFilter: 'blur(2px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: C.bgCard,
              borderRadius: C.radius.xl,
              padding: 24,
              width: 480,
              maxWidth: '92vw',
              boxShadow: C.shadowXl,
              border: `1px solid ${C.bdMid}`,
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: C.txtPri, marginBottom: 8 }}>
              {modal.tipo === 'LISTA' ? 'Excluir lista' : 'Excluir pedido da lista'}
            </div>
            <div style={{ fontSize: 13, color: C.txtSec, marginBottom: 10, lineHeight: 1.5 }}>
              {modal.tipo === 'LISTA'
                ? `A lista ${modal.lista} será cancelada. Os pedidos dela poderão ser gerados novamente.`
                : `O pedido ${modal.pedido} será removido somente da lista ${modal.lista}.`}
            </div>
            <textarea
              className="lf-input"
              value={motivoExclusao}
              onChange={(e) => setMotivoExclusao(e.target.value)}
              maxLength={500}
              placeholder="Explique por que precisa ser removido (mínimo 5 caracteres)..."
              style={{ ...lfInputStyle, width: '100%', height: 90, padding: 10, boxSizing: 'border-box', resize: 'vertical' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
              <LfBtn
                onClick={() => {
                  setModal(null);
                  setMotivoExclusao('');
                }}
              >
                Cancelar
              </LfBtn>
              <LfBtn tipo="perigo" disabled={excluindo} onClick={confirmarExclusao}>
                {excluindo ? 'Excluindo...' : 'Confirmar exclusão'}
              </LfBtn>
            </div>
          </div>
        </div>
      )}

      {createPortal(
        <div className="lf-print-root">
          {blocos.map((b) => (
            <LfBlocoImpressao key={b.lista} lista={b.lista} info={b.info} registros={b.registros} />
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}

// ─── Separação de Lista ───────────────────────────────────────────────
// Liga as listas geradas (historico_listas) ao controle de separação: a lista gerada
// aparece na fila, o separador inicia, o cronômetro roda e ao terminar ele finaliza.
const SEP_META_MIN = 15;
const SEP_META_MS = SEP_META_MIN * 60000;
// Limite: no máximo 1h entre gerar e iniciar, e 1h entre iniciar e finalizar.
const SEP_LIMITE_MS = 60 * 60000;
const sepCorTempo = (ms) => (ms > SEP_LIMITE_MS ? C.red : ms > SEP_META_MS ? C.amber : C.txtPri);
const sepEspera = (r) => (r.geradaEm && r.inicio ? Math.max(0, r.inicio - r.geradaEm) : null);
const SEP_SEPARADORES = [
  'Camile Macedo',
  'Thayna Silva',
  'Pietro Fayh',
  'Jorge William',
  'Tamiris Pereira',
  'Amanda Carvalho',
  'Theo Aristimunho',
  'Eduarda',
];
const SEP_CORES = ['var(--accent)', 'var(--green)', 'var(--blue)', 'var(--amber)', 'var(--purple)', 'var(--red)'];

const sepPad = (n) => String(n).padStart(2, '0');
function sepHms(ms) {
  const t = Math.max(0, Math.floor(Number(ms || 0) / 1000));
  return `${sepPad(Math.floor(t / 3600))}:${sepPad(Math.floor((t % 3600) / 60))}:${sepPad(t % 60)}`;
}
function sepCurto(ms) {
  const t = Math.max(0, Math.floor(Number(ms || 0) / 1000));
  return t >= 3600 ? sepHms(ms) : `${sepPad(Math.floor(t / 60))}:${sepPad(t % 60)}`;
}
function sepHoras(ms) {
  const m = Math.round(Number(ms || 0) / 60000);
  return m >= 60 ? `${Math.floor(m / 60)}h${sepPad(m % 60)}` : `${m}min`;
}
const sepHm = (ts) => new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
// Data e hora completas: 28/10/2026 17:22
const sepQuando = (ts) => (!ts ? '—' : `${sepDataBr(ts)} ${sepHm(ts)}`);
const sepNum = (v) => (v == null || v === '' ? '—' : v);
const sepHora = (ts) => new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
const sepDataBr = (ts) => new Date(ts).toLocaleDateString('pt-BR');
const sepDia0 = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.getTime();
};
const sepNorm = (v) => String(v == null ? '' : v).trim().toLocaleLowerCase('pt-BR');
const sepPlural = (n, s, p) => (n === 1 ? s : p);
const sepIniciais = (n) =>
  String(n || '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join('') || '?';
function sepParse(r) {
  const inicio = r.inicio ? new Date(r.inicio).getTime() : 0;
  const fim = r.fim ? new Date(r.fim).getTime() : null;
  return {
    id: String(r.id),
    lista: String(r.lista),
    separador: String(r.separador || ''),
    inicio,
    fim,
    duracao: r.duracao_ms != null ? Number(r.duracao_ms) : fim && inicio ? fim - inicio : null,
    status: r.status || (fim ? 'finalizada' : 'em_separacao'),
    oculto: !!r.oculto,
    filial: r.filial || '',
    transportadora: r.transportadora || '',
    pedidos: r.pedidos,
    unidades: r.unidades,
    geradaEm: r.gerada_em ? new Date(r.gerada_em).getTime() : null,
  };
}
// O Supabase devolve no máximo 1000 linhas por chamada: busca em páginas.
async function sepBuscarTudo(path) {
  const out = [];
  for (let off = 0; off < 20000; off += 1000) {
    const page = await lfApi(`${path}${path.includes('?') ? '&' : '?'}limit=1000&offset=${off}`);
    if (!Array.isArray(page)) break;
    out.push(...page);
    if (page.length < 1000) break;
  }
  return out;
}

// Cronômetro: atualiza sozinho, sem redesenhar a tela inteira.
function SepTempoVivo({ inicio }) {
  const [agora, setAgora] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const dur = Math.max(0, agora - inicio);
  return (
    <span
      style={{
        fontVariantNumeric: 'tabular-nums',
        fontWeight: 800,
        fontSize: 15,
        color: sepCorTempo(dur),
      }}
    >
      {sepHms(dur)}
    </span>
  );
}

// Quanto tempo a lista gerada está esperando para ser iniciada (vermelho acima de 1h).
function SepEsperaViva({ desde }) {
  const [agora, setAgora] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const dur = Math.max(0, agora - desde);
  return (
    <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 800, color: dur > SEP_LIMITE_MS ? C.red : C.txtPri }}>
      {sepHms(dur)}
      {dur > SEP_LIMITE_MS && (
        <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 800, color: C.red }}>+1h</span>
      )}
    </span>
  );
}
// Data/hora em que a lista foi gerada + quanto esperou até iniciar.
function SepGeradaCell({ r }) {
  const esp = sepEspera(r);
  return (
    <>
      {sepQuando(r.geradaEm)}
      {esp != null && (
        <div style={{ fontSize: 11.5, fontWeight: 700, color: esp > SEP_LIMITE_MS ? C.red : C.txtMuted }}>
          espera {sepCurto(esp)}
          {esp > SEP_LIMITE_MS ? ' · acima de 1h' : ''}
        </div>
      )}
    </>
  );
}

function SepAbas({ abas, aba, setAba, contagens = {} }) {
  return (
    <div
      role="tablist"
      style={{ display: 'flex', gap: 4, marginBottom: 20, flexWrap: 'wrap', borderBottom: `1px solid ${C.bdMid}` }}
    >
      {abas.map(([id, nome]) => {
        const ativa = aba === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={ativa}
            className="lf-tab"
            onClick={() => setAba(id)}
            style={{
              padding: '10px 16px',
              marginBottom: -1,
              background: 'transparent',
              border: 'none',
              borderBottom: `2px solid ${ativa ? C.primary : 'transparent'}`,
              color: ativa ? C.primary : C.txtSec,
              fontWeight: ativa ? 800 : 600,
              fontSize: 13.5,
              cursor: 'pointer',
              fontFamily: C.font,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {nome}
            {contagens[id] > 0 && (
              <span
                style={{
                  background: C.primaryLight,
                  color: C.primary,
                  borderRadius: C.radius.pill,
                  padding: '1px 8px',
                  fontSize: 11.5,
                  fontWeight: 800,
                }}
              >
                {contagens[id]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function SepCampoRotulo({ rotulo, children }) {
  return (
    <label style={{ display: 'block', fontFamily: C.font }}>
      <div style={{ fontSize: 11.5, fontWeight: 700, color: C.txtMuted, marginBottom: 5 }}>{rotulo}</div>
      {children}
    </label>
  );
}

function TelaSeparacaoLista({ ativo }) {
  const [separador, setSeparador] = useState('');
  const [mostrarAjudante, setMostrarAjudante] = useState(false);
  const [nomeAjudante, setNomeAjudante] = useState('');
  const [aba, setAba] = useState('fila');
  const [filaDias, setFilaDias] = useState(3);
  const [rows, setRows] = useState([]);
  const [geradas, setGeradas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erroCarga, setErroCarga] = useState('');
  const [atualizadoEm, setAtualizadoEm] = useState(0);
  const [numero, setNumero] = useState('');
  const [aviso, setAviso] = useState(null);
  const [ocupado, setOcupado] = useState('');
  const [finModal, setFinModal] = useState(null); // lista que está sendo finalizada (pergunta "você faturou?")
  const [visaoTempo, setVisaoTempo] = useState('todas_ativas');
  const [sepTempo, setSepTempo] = useState('');
  const [buscaOp, setBuscaOp] = useState('');
  // dados
  const [periodo, setPeriodo] = useState('hoje');
  const [busca, setBusca] = useState('');
  const [fSep, setFSep] = useState('');
  const [fMeta, setFMeta] = useState('');
  const [fOrd, setFOrd] = useState('recente');

  const carregar = useCallback(
    async (silencioso) => {
      if (!silencioso) setCarregando(true);
      try {
        const dias = periodo === 'tudo' ? 0 : periodo === '30d' ? 31 : 8;
        const janela = dias
          ? '&inicio=gte.' + encodeURIComponent(new Date(sepDia0(Date.now()) - dias * 864e5).toISOString())
          : '';
        const desde = encodeURIComponent(new Date(sepDia0(Date.now()) - 7 * 864e5).toISOString());
        const [ativas, finalizadas, listas] = await Promise.all([
          lfApi('/separacao_listas?select=*&status=eq.em_separacao&order=inicio.asc&limit=1000'),
          sepBuscarTudo('/separacao_listas?select=*&status=eq.finalizada' + janela + '&order=id.desc'),
          lfApi(
            '/historico_listas?select=lista,data_hora,usuario,filial,transportadora,pedidos,unidades,impresso,status&data_hora=gte.' +
              desde +
              '&order=id.asc&limit=1000'
          ),
        ]);
        const mapa = new Map();
        [...(Array.isArray(finalizadas) ? finalizadas : []), ...(Array.isArray(ativas) ? ativas : [])].forEach((r) =>
          mapa.set(String(r.id), sepParse(r))
        );
        setRows([...mapa.values()]);
        setGeradas(Array.isArray(listas) ? listas : []);
        setErroCarga('');
        setAtualizadoEm(Date.now());
      } catch (err) {
        setErroCarga(err.message || 'Não foi possível carregar.');
      } finally {
        setCarregando(false);
      }
    },
    [periodo]
  );

  // Carrega ao abrir a tela e atualiza sozinho (outros PCs podem iniciar/finalizar listas).
  useEffect(() => {
    if (!ativo) return undefined;
    carregar(false);
    const t = setInterval(() => {
      if (!document.hidden) carregar(true);
    }, 15000);
    return () => clearInterval(t);
  }, [ativo, carregar]);

  // Completa cada separação com os dados da lista gerada (quando foi gerada, transportadora etc.).
  const rowsE = useMemo(() => {
    const mapa = new Map(geradas.map((g) => [sepNorm(g.lista), g]));
    return rows.map((r) => {
      const g = mapa.get(sepNorm(r.lista));
      if (!g) return r;
      return {
        ...r,
        geradaEm: r.geradaEm || (g.data_hora ? new Date(g.data_hora).getTime() : null),
        transportadora: r.transportadora || g.transportadora || '',
        filial: r.filial || g.filial || '',
        pedidos: r.pedidos != null ? r.pedidos : g.pedidos,
        unidades: r.unidades != null ? r.unidades : g.unidades,
      };
    });
  }, [rows, geradas]);
  const ativasTodas = useMemo(
    () => rowsE.filter((r) => r.status === 'em_separacao').sort((a, b) => a.inicio - b.inicio),
    [rowsE]
  );
  const hist = useMemo(
    () =>
      rowsE
        .filter((r) => r.status === 'finalizada' && !r.oculto)
        .sort((a, b) => (b.fim || b.inicio) - (a.fim || a.inicio)),
    [rowsE]
  );
  const fila = useMemo(() => {
    const usadas = new Set(rows.map((r) => sepNorm(r.lista)));
    const corte = sepDia0(Date.now()) - (filaDias - 1) * 864e5;
    return geradas
      .filter(
        (g) =>
          String(g.status || 'ATIVA').toUpperCase() !== 'CANCELADA' &&
          new Date(g.data_hora).getTime() >= corte &&
          !usadas.has(sepNorm(g.lista))
      )
      .sort((a, b) => new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime());
  }, [rows, geradas, filaDias]);
  const nomes = useMemo(
    () => [...new Set([...SEP_SEPARADORES, ...rows.map((r) => r.separador)])].filter(Boolean).sort((a, b) => a.localeCompare(b, 'pt-BR')),
    [rows]
  );

  const mensagemBloqueio = (r) =>
    r.status === 'em_separacao'
      ? `A lista ${r.lista} já está em separação por ${r.separador}.`
      : `A lista ${r.lista} já foi finalizada e não pode ser selecionada novamente.`;

  // ── Ações ──
  const escolherSeparador = (nome) => {
    const n = String(nome || '').trim();
    if (!n) return;
    setSeparador(n);
    setMostrarAjudante(false);
    setNomeAjudante('');
    setAviso(null);
    setAba('fila');
  };
  const trocarSeparador = () => {
    setSeparador('');
    setAviso(null);
    setNumero('');
  };

  const iniciar = async (alvo) => {
    if (!separador) return;
    setAviso(null);
    let info = alvo && typeof alvo === 'object' ? alvo : null;
    setOcupado(info ? 'ini:' + info.lista : 'ini');
    try {
      if (!info) {
        const t = String(alvo || numero || '').trim();
        if (!t) {
          setAviso({ tipo: 'erro', texto: 'Informe o número da lista.' });
          return;
        }
        const nome = /^\d+$/.test(t) ? 'Lista ' + t : t.replace(/^lista\s*/i, 'Lista ');
        const achadas = await lfApi(
          '/historico_listas?select=lista,data_hora,filial,transportadora,pedidos,unidades,status&lista=ilike.' +
            encodeURIComponent(nome) +
            '&limit=1'
        );
        if (!Array.isArray(achadas) || !achadas.length) {
          setAviso({ tipo: 'erro', texto: `A lista "${nome}" não foi encontrada nas listas geradas.` });
          return;
        }
        info = achadas[0];
        if (String(info.status || 'ATIVA').toUpperCase() === 'CANCELADA') {
          setAviso({ tipo: 'erro', texto: `A ${info.lista} foi cancelada e não pode ser separada.` });
          return;
        }
      }
      const corpo = {
        lista: info.lista,
        separador,
        filial: info.filial || null,
        transportadora: info.transportadora || null,
        pedidos: info.pedidos != null ? Number(info.pedidos) : null,
        unidades: info.unidades != null ? Number(info.unidades) : null,
        gerada_em: info.data_hora || null,
      };
      const gravar = (c) =>
        lfApi('/separacao_listas', {
          method: 'POST',
          body: JSON.stringify(c),
          headers: { Prefer: 'return=representation' },
        });
      try {
        try {
          await gravar(corpo);
        } catch (e1) {
          // Tabela ainda sem a coluna gerada_em: grava sem ela (a data vem de historico_listas).
          if (/gerada_em/i.test(e1.message)) {
            const { gerada_em: omitido, ...semGerada } = corpo;
            await gravar(semGerada);
          } else {
            throw e1;
          }
        }
      } catch (err) {
        if (/23505|duplicate|unique/i.test(err.message)) {
          const ex = await lfApi('/separacao_listas?select=*&lista=eq.' + encodeURIComponent(info.lista) + '&limit=1');
          setAviso({
            tipo: 'erro',
            texto: Array.isArray(ex) && ex.length ? mensagemBloqueio(sepParse(ex[0])) : `A ${info.lista} já foi iniciada.`,
          });
          await carregar(true);
          return;
        }
        throw err;
      }
      setNumero('');
      setAviso({ tipo: 'ok', texto: `${info.lista} iniciada por ${separador}.` });
      await carregar(true);
    } catch (err) {
      setAviso({ tipo: 'erro', texto: 'Não foi possível iniciar a separação: ' + err.message });
    } finally {
      setOcupado('');
    }
  };

  // Passo 1: abre a pergunta "Você faturou essa lista?"
  const finalizar = (r) => setFinModal(r);

  // Passo 2: finaliza de fato. faturou = true -> o faturador é o próprio separador;
  // false -> fica sem faturador e a escolha é feita depois na aba Via Leitor.
  const confirmarFinalizacao = async (r, faturou) => {
    setFinModal(null);
    setOcupado('fin:' + r.id);
    try {
      const url = '/separacao_listas?id=eq.' + encodeURIComponent(r.id) + '&status=eq.em_separacao';
      const enviar = (corpo) =>
        lfApi(url, { method: 'PATCH', body: JSON.stringify(corpo), headers: { Prefer: 'return=representation' } });
      let res;
      try {
        res = await enviar({ status: 'finalizada', faturou_lista: faturou, faturador: faturou ? r.separador : null });
      } catch (e1) {
        // SQL do faturador ainda não rodado: finaliza igual, só sem gravar o faturador.
        if (/faturou_lista|faturador/i.test(String(e1.message))) {
          res = await enviar({ status: 'finalizada' });
        } else {
          throw e1;
        }
      }
      if (!Array.isArray(res) || !res.length) {
        setAviso({ tipo: 'warn', texto: `A ${r.lista} já tinha sido finalizada ou cancelada em outro lugar.` });
      } else {
        const novo = sepParse(res[0]);
        setAviso({
          tipo: 'ok',
          texto:
            `${r.lista} finalizada em ${sepHms(novo.duracao != null ? novo.duracao : Date.now() - r.inicio)}. ` +
            (faturou
              ? `Faturador: ${r.separador}. `
              : 'Escolha quem faturou na aba Lista Faturamento › Via Leitor. ') +
            'Ela não poderá ser selecionada novamente.',
        });
      }
      await carregar(true);
    } catch (err) {
      setAviso({ tipo: 'erro', texto: 'Erro ao finalizar: ' + err.message });
    } finally {
      setOcupado('');
    }
  };

  const cancelar = async (r) => {
    if (
      !window.confirm(
        `Cancelar a separação da lista ${r.lista}? Como ela não foi finalizada, volta para a fila e fica disponível de novo.`
      )
    )
      return;
    setOcupado('can:' + r.id);
    try {
      await lfApi('/separacao_listas?id=eq.' + encodeURIComponent(r.id) + '&status=eq.em_separacao', {
        method: 'DELETE',
        headers: { Prefer: 'return=minimal' },
      });
      setAviso({ tipo: 'info', texto: `Separação da ${r.lista} cancelada. A lista voltou para a fila.` });
      await carregar(true);
    } catch (err) {
      setAviso({ tipo: 'erro', texto: 'Erro ao cancelar: ' + err.message });
    } finally {
      setOcupado('');
    }
  };

  const ocultar = async (r) => {
    if (
      !window.confirm(
        `Ocultar o registro da lista ${r.lista} do histórico?\n\nA lista continuará bloqueada e não poderá ser utilizada novamente.`
      )
    )
      return;
    try {
      await lfApi('/separacao_listas?id=eq.' + encodeURIComponent(r.id), {
        method: 'PATCH',
        body: JSON.stringify({ oculto: true }),
        headers: { Prefer: 'return=minimal' },
      });
      await carregar(true);
    } catch (err) {
      setAviso({ tipo: 'erro', texto: 'Erro ao ocultar: ' + err.message });
    }
  };
  const limparHistorico = async () => {
    if (!hist.length) {
      window.alert('O histórico já está vazio.');
      return;
    }
    if (
      !window.confirm(
        `Ocultar os ${hist.length} registros do histórico?\n\nAs listas continuarão bloqueadas e não poderão ser utilizadas novamente.`
      )
    )
      return;
    try {
      await lfApi('/separacao_listas?status=eq.finalizada&oculto=eq.false', {
        method: 'PATCH',
        body: JSON.stringify({ oculto: true }),
        headers: { Prefer: 'return=minimal' },
      });
      await carregar(true);
    } catch (err) {
      setAviso({ tipo: 'erro', texto: 'Erro ao limpar: ' + err.message });
    }
  };

  // ── Dados ──
  const noPeriodo = useMemo(() => {
    if (periodo === 'tudo') return hist;
    const corte =
      periodo === 'hoje' ? sepDia0(Date.now()) : periodo === '7d' ? sepDia0(Date.now()) - 6 * 864e5 : sepDia0(Date.now()) - 29 * 864e5;
    return hist.filter((r) => r.inicio >= corte);
  }, [hist, periodo]);
  const deHoje = useMemo(() => hist.filter((r) => r.inicio >= sepDia0(Date.now())), [hist]);

  const filtrados = useMemo(() => {
    const b = busca.trim().toLowerCase();
    const regs = noPeriodo.filter(
      (r) =>
        (!b || String(r.lista).toLowerCase().includes(b)) &&
        (!fSep || r.separador === fSep) &&
        (!fMeta ||
          (fMeta === 'ok'
            ? Number(r.duracao || 0) <= SEP_META_MS
            : fMeta === 'lim'
            ? Number(r.duracao || 0) > SEP_LIMITE_MS
            : Number(r.duracao || 0) > SEP_META_MS))
    );
    const ord = {
      recente: (a, b2) => b2.inicio - a.inicio,
      antiga: (a, b2) => a.inicio - b2.inicio,
      lenta: (a, b2) => Number(b2.duracao || 0) - Number(a.duracao || 0),
      rapida: (a, b2) => Number(a.duracao || 0) - Number(b2.duracao || 0),
    }[fOrd];
    return [...regs].sort(ord);
  }, [noPeriodo, busca, fSep, fMeta, fOrd]);

  const exportar = () => {
    if (!filtrados.length) {
      window.alert('Não há registros para exportar com os filtros atuais.');
      return;
    }
    const linhas = [
      ['Data', 'Lista', 'Separador', 'Transportadora', 'Gerada', 'Espera', 'Pedidos', 'Itens', 'Inicio', 'Fim', 'Tempo', 'Minutos', 'Situacao'],
      ...filtrados.map((r) => [
        sepDataBr(r.inicio),
        r.lista,
        r.separador,
        r.transportadora || '',
        r.geradaEm ? sepDataBr(r.geradaEm) + ' ' + sepHora(r.geradaEm) : '',
        sepEspera(r) != null ? sepHms(sepEspera(r)) : '',
        r.pedidos == null ? '' : r.pedidos,
        r.unidades == null ? '' : r.unidades,
        sepHora(r.inicio),
        r.fim ? sepHora(r.fim) : '',
        sepHms(r.duracao),
        (Number(r.duracao || 0) / 60000).toFixed(2).replace('.', ','),
        Number(r.duracao || 0) > SEP_LIMITE_MS ? 'Acima de 1h' : Number(r.duracao || 0) <= SEP_META_MS ? 'Na meta' : 'Acima da meta',
      ]),
    ];
    const csv = '﻿' + linhas.map((c) => c.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `separacoes_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Telas ──
  const cabecalho = (
    <PageHeader
      titulo="Separação de Lista"
      extraInfo="As listas geradas aparecem na fila; o separador inicia e finaliza cada uma"
      actions={
        separador ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 12px 4px 4px',
                borderRadius: C.radius.pill,
                border: `1px solid ${C.bdMid}`,
                background: C.bgCard,
                fontSize: 12.5,
                fontWeight: 600,
                color: C.txtSec,
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: C.primaryLight,
                  color: C.primary,
                  fontWeight: 800,
                  fontSize: 11.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {sepIniciais(separador)}
              </span>
              Separador: <b style={{ color: C.txtPri }}>{separador}</b>
            </div>
            <LfBtn onClick={trocarSeparador}>Trocar separador</LfBtn>
          </div>
        ) : null
      }
    />
  );

  if (!separador) {
    return (
      <div style={{ fontFamily: C.font }}>
        <style>{LF_CSS}</style>
        {cabecalho}
        <LfCard titulo="Quem vai separar agora?" subtitulo="Selecione seu nome. As listas iniciadas depois disso ficam registradas em seu nome.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 12 }}>
            {SEP_SEPARADORES.map((n) => (
              <button
                key={n}
                type="button"
                className="lf-btn"
                onClick={() => escolherSeparador(n)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: C.radius.lg,
                  border: `1px solid ${C.bdMid}`,
                  background: C.bgCard,
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: C.font,
                }}
              >
                <span
                  style={{
                    width: 40,
                    height: 40,
                    flex: '0 0 auto',
                    borderRadius: '50%',
                    background: C.primaryLight,
                    color: C.primary,
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {sepIniciais(n)}
                </span>
                <span>
                  <span style={{ display: 'block', fontWeight: 800, fontSize: 14, color: C.txtPri }}>{n}</span>
                  <span style={{ display: 'block', fontSize: 12, color: C.txtMuted, marginTop: 2 }}>Usar este separador</span>
                </span>
              </button>
            ))}
            <button
              type="button"
              className="lf-btn"
              onClick={() => setMostrarAjudante(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: C.radius.lg,
                border: `1.5px dashed ${C.bdMid}`,
                background: C.bgStripe,
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: C.font,
              }}
            >
              <span
                style={{
                  width: 40,
                  height: 40,
                  flex: '0 0 auto',
                  borderRadius: '50%',
                  background: C.bgMuted,
                  color: C.txtSec,
                  fontWeight: 800,
                  fontSize: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                +
              </span>
              <span>
                <span style={{ display: 'block', fontWeight: 800, fontSize: 14, color: C.txtPri }}>Ajudante de outro setor</span>
                <span style={{ display: 'block', fontSize: 12, color: C.txtMuted, marginTop: 2 }}>Digitar nome manualmente</span>
              </span>
            </button>
          </div>
          {mostrarAjudante && (
            <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <SepCampoRotulo rotulo="Nome do ajudante">
                <input
                  className="lf-input"
                  autoFocus
                  style={{ ...lfInputStyle, width: 260 }}
                  placeholder="Digite o nome da pessoa"
                  value={nomeAjudante}
                  onChange={(e) => setNomeAjudante(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') escolherSeparador(nomeAjudante);
                  }}
                />
              </SepCampoRotulo>
              <LfBtn tipo="primario" onClick={() => escolherSeparador(nomeAjudante)}>
                Usar este nome
              </LfBtn>
              <LfBtn
                onClick={() => {
                  setMostrarAjudante(false);
                  setNomeAjudante('');
                }}
              >
                Cancelar
              </LfBtn>
            </div>
          )}
        </LfCard>
      </div>
    );
  }

  const regsTempo = (() => {
    let regs = visaoTempo === 'todas_ativas' ? ativasTodas : visaoTempo === 'finalizadas' ? hist : [...ativasTodas, ...hist];
    if (sepTempo) regs = regs.filter((r) => sepNorm(r.separador) === sepNorm(sepTempo));
    return [...regs]
      .sort((a, b) => {
        if (a.status !== b.status) return a.status === 'em_separacao' ? -1 : 1;
        return (b.fim || b.inicio) - (a.fim || a.inicio);
      })
      .slice(0, 50);
  })();

  const histOp = (() => {
    const b = buscaOp.trim().toLowerCase();
    return hist.filter((r) => !b || String(r.lista).toLowerCase().includes(b) || String(r.separador).toLowerCase().includes(b));
  })();

  const somaHoje = deHoje.reduce((s, r) => s + Number(r.duracao || 0), 0);

  const avisosSep = (
    <>
      {aviso && (
        <div style={{ marginTop: -8, marginBottom: 16 }}>
          <LfAviso tipo={aviso.tipo}>{aviso.texto}</LfAviso>
        </div>
      )}
      {erroCarga && (
        <div style={{ marginTop: -8, marginBottom: 16 }}>
          <LfAviso tipo="erro">Não foi possível carregar os dados: {erroCarga}</LfAviso>
        </div>
      )}

    </>
  );

  const filaAtrasadas = fila.filter((g) => Date.now() - new Date(g.data_hora).getTime() > SEP_LIMITE_MS).length;
  const andAtrasadas = ativasTodas.filter((r) => Date.now() - r.inicio > SEP_LIMITE_MS).length;
  const cardFila = (
  <LfCard
    titulo="Fila de listas"
    subtitulo="Listas geradas em Lista Faturamento que ainda não foram separadas"
    acoes={
      <>
        <select className="lf-input" style={lfInputStyle} value={filaDias} onChange={(e) => setFilaDias(Number(e.target.value))}>
          <option value={1}>Hoje</option>
          <option value={3}>Últimos 3 dias</option>
          <option value={7}>Últimos 7 dias</option>
        </select>
        <LfBtn onClick={() => carregar(false)} disabled={carregando}>
          {carregando ? 'Atualizando...' : '🔄 Atualizar'}
        </LfBtn>
      </>
    }
  >
    <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
      <input
        className="lf-input"
        style={{ ...lfInputStyle, flex: '1 1 200px' }}
        inputMode="numeric"
        autoComplete="off"
        placeholder="Iniciar pelo número da lista (ex.: 14)"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') iniciar();
        }}
      />
      <LfBtn tipo="primario" disabled={ocupado === 'ini'} onClick={() => iniciar()}>
        ▶ Iniciar
      </LfBtn>
    </div>
    {filaAtrasadas > 0 && (
      <div style={{ marginBottom: 14, marginTop: -4 }}>
        <LfAviso tipo="erro">
          {filaAtrasadas} {sepPlural(filaAtrasadas, 'lista está esperando', 'listas estão esperando')} há mais de 1h para ser
          iniciada.
        </LfAviso>
      </div>
    )}
    {fila.length === 0 ? (
      <LfVazio>Nenhuma lista aguardando separação. Quando uma lista for gerada, ela aparece aqui.</LfVazio>
    ) : (
      <LfTabela
        altura={420}
        colunas={['Lista', 'Gerada', 'Espera', 'Filial / Transportadora', 'Pedidos', 'Itens', 'Impressa', '']}
        numericas={['Pedidos', 'Itens']}
      >
        {fila.map((g) => (
          <tr key={g.lista}>
            <td style={{ ...lfTdStyle, fontWeight: 800 }}>{g.lista}</td>
            <td style={lfTdStyle} title={lfFmtData(g.data_hora)}>
              {sepQuando(g.data_hora)}
            </td>
            <td style={lfTdStyle}>
              <SepEsperaViva desde={new Date(g.data_hora).getTime()} />
            </td>
            <td style={lfTdStyle}>
              <b>{g.filial}</b> <span style={{ color: C.txtSec }}>· {g.transportadora}</span>
            </td>
            <td style={lfTdNum}>{g.pedidos || 0}</td>
            <td style={lfTdNum}>{g.unidades || 0}</td>
            <td style={lfTdStyle}>
              <LfBadge tipo={String(g.impresso || 'NÃO').toUpperCase() === 'SIM' ? 'ok' : 'neutro'}>
                {String(g.impresso || 'NÃO').toUpperCase() === 'SIM' ? 'Sim' : 'Não'}
              </LfBadge>
            </td>
            <td style={lfTdStyle}>
              <LfBtn pequeno tipo="verde" disabled={ocupado === 'ini:' + g.lista} onClick={() => iniciar(g)}>
                ▶ Iniciar
              </LfBtn>
            </td>
          </tr>
        ))}
      </LfTabela>
    )}
  </LfCard>
  );

  const cardAndamento = (
  <LfCard titulo="Em separação agora" subtitulo="Cada lista iniciada tem seu cronômetro (meta de 15 min)">
    <LfKpis>
      <LfKpi rotulo="Em andamento" valor={ativasTodas.length} tipo="info" />
      <LfKpi
        rotulo="Acima de 1h"
        valor={andAtrasadas}
        tipo={andAtrasadas ? 'erro' : 'ok'}
        detalhe="separação passou do limite"
      />
      <LfKpi rotulo="Finalizadas hoje" valor={deHoje.length} tipo="ok" />
      <LfKpi rotulo="Tempo médio hoje" valor={deHoje.length ? sepCurto(somaHoje / deHoje.length) : '--:--'} tipo="neutro" />
      <LfKpi
        rotulo="Mais rápida hoje"
        valor={deHoje.length ? sepCurto(Math.min(...deHoje.map((r) => Number(r.duracao || 0)))) : '--:--'}
        tipo="neutro"
      />
    </LfKpis>
    {ativasTodas.length === 0 ? (
      <LfVazio>Nenhuma lista em separação.</LfVazio>
    ) : (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 12 }}>
        {ativasTodas.map((r) => (
          <div
            key={r.id}
            data-lista={r.lista}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              flexWrap: 'wrap',
              padding: '12px 14px',
              border: `1px solid ${C.bdLight}`,
              borderLeft: `4px solid ${Date.now() - r.inicio > SEP_LIMITE_MS ? C.red : C.blue}`,
              borderRadius: C.radius.lg,
              background: C.bgStripe,
            }}
          >
            <div style={{ flex: '1 1 150px', minWidth: 130 }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: C.txtPri, display: 'flex', alignItems: 'center', gap: 8 }}>
                {r.lista}
                {Date.now() - r.inicio > SEP_LIMITE_MS && <LfBadge tipo="erro">Passou de 1h</LfBadge>}
              </div>
              <div style={{ fontSize: 12, color: C.txtSec, marginTop: 2 }}>
                <b>{r.separador}</b> · início {sepQuando(r.inicio)}
              </div>
              <div style={{ fontSize: 11.5, color: C.txtMuted, marginTop: 2 }}>
                {[
                  r.filial,
                  r.transportadora,
                  r.geradaEm ? `gerada ${sepQuando(r.geradaEm)}` : '',
                  sepEspera(r) != null ? `esperou ${sepCurto(sepEspera(r))} para iniciar` : '',
                  r.pedidos != null ? `${r.pedidos} ${sepPlural(Number(r.pedidos), 'pedido', 'pedidos')}` : '',
                  r.unidades != null ? `${r.unidades} ${sepPlural(Number(r.unidades), 'item', 'itens')}` : '',
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </div>
            </div>
            <SepTempoVivo inicio={r.inicio} />
            <div style={{ display: 'flex', gap: 6 }}>
              <LfBtn pequeno tipo="verde" disabled={ocupado === 'fin:' + r.id} onClick={() => finalizar(r)}>
                ✓ Finalizar
              </LfBtn>
              <LfBtn pequeno tipo="perigo" disabled={ocupado === 'can:' + r.id} onClick={() => cancelar(r)}>
                Cancelar
              </LfBtn>
            </div>
          </div>
        ))}
      </div>
    )}
  </LfCard>
  );

  const cardTempo = (
      <LfCard
        titulo="Painel de tempo"
        subtitulo="Filtre por status e por separador. Listas finalizadas permanecem bloqueadas para novo uso."
        acoes={
          <>
            <select className="lf-input" style={lfInputStyle} value={visaoTempo} onChange={(e) => setVisaoTempo(e.target.value)}>
              <option value="todas_ativas">Em separação</option>
              <option value="finalizadas">Finalizadas</option>
              <option value="todas">Todas</option>
            </select>
            <select className="lf-input" style={lfInputStyle} value={sepTempo} onChange={(e) => setSepTempo(e.target.value)}>
              <option value="">Separador: todos</option>
              {nomes.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </>
        }
      >
        {regsTempo.length === 0 ? (
          <LfVazio>Nenhuma lista para exibir neste filtro.</LfVazio>
        ) : (
          <LfTabela
            colunas={['Lista', 'Separador', 'Transportadora', 'Gerada', 'Pedidos', 'Itens', 'Início', 'Fim', 'Status', 'Tempo']}
            compacta
            numericas={['Pedidos', 'Itens', 'Tempo']}
          >
            {regsTempo.map((r) => {
              const ativaRow = r.status === 'em_separacao';
              const dur = ativaRow ? Date.now() - r.inicio : Number(r.duracao || 0);
              return (
                <tr key={r.id}>
                  <td style={{ ...lfTdStyle, fontWeight: 800 }}>{r.lista}</td>
                  <td style={lfTdStyle}>{r.separador}</td>
                  <td style={lfTdStyle}>{r.transportadora || '—'}</td>
                  <td style={lfTdStyle}>
                    <SepGeradaCell r={r} />
                  </td>
                  <td style={lfTdNum}>{sepNum(r.pedidos)}</td>
                  <td style={lfTdNum}>{sepNum(r.unidades)}</td>
                  <td style={lfTdStyle}>{sepQuando(r.inicio)}</td>
                  <td style={lfTdStyle}>{!ativaRow && r.fim ? sepQuando(r.fim) : '—'}</td>
                  <td style={lfTdStyle}>
                    <LfBadge tipo={ativaRow ? 'info' : 'ok'}>{ativaRow ? 'Em separação' : 'Finalizada'}</LfBadge>
                  </td>
                  <td style={{ ...lfTdNum, fontWeight: 800, color: sepCorTempo(dur) }}>
                    {ativaRow ? <SepTempoVivo inicio={r.inicio} /> : sepHms(dur)}
                  </td>
                </tr>
              );
            })}
          </LfTabela>
        )}
        <div style={{ fontSize: 11.5, color: C.txtMuted, marginTop: 10 }}>
          {atualizadoEm ? `Atualizado às ${sepHora(atualizadoEm)} · atualiza sozinho a cada 15 segundos` : 'Carregando...'}
        </div>
      </LfCard>
  );

  const cardHist = (
      <LfCard
        titulo="Histórico de listas"
        subtitulo={
          deHoje.length
            ? `${deHoje.length} ${sepPlural(deHoje.length, 'lista', 'listas')} hoje · ${histOp.length} no total carregado`
            : `${histOp.length} ${sepPlural(histOp.length, 'registro', 'registros')}`
        }
        acoes={
          <input
            className="lf-input"
            style={{ ...lfInputStyle, width: 260 }}
            placeholder="🔍 Buscar lista ou separador"
            value={buscaOp}
            onChange={(e) => setBuscaOp(e.target.value)}
          />
        }
      >
        {histOp.length === 0 ? (
          <LfVazio>{buscaOp ? 'Nenhuma lista encontrada.' : 'Nenhuma separação registrada ainda.'}</LfVazio>
        ) : (
          <LfTabela
            colunas={['Lista', 'Separador', 'Transportadora', 'Gerada', 'Pedidos', 'Itens', 'Início', 'Fim', 'Tempo', 'Status']}
            numericas={['Pedidos', 'Itens', 'Tempo']}
          >
            {histOp.slice(0, 15).map((r) => {
              const atrEsp = (sepEspera(r) || 0) > SEP_LIMITE_MS;
              const atrSep = Number(r.duracao || 0) > SEP_LIMITE_MS;
              const atraso = atrEsp || atrSep;
              const motivoAtraso = atrEsp && atrSep ? 'espera e sep.' : atrEsp ? 'na espera' : 'na separação';
              return (
              <tr key={r.id}>
                <td style={{ ...lfTdStyle, fontWeight: 800 }}>{r.lista}</td>
                <td style={lfTdStyle}>{r.separador}</td>
                <td style={lfTdStyle}>{r.transportadora || '—'}</td>
                <td style={lfTdStyle}>
                    <SepGeradaCell r={r} />
                  </td>
                <td style={lfTdNum}>{sepNum(r.pedidos)}</td>
                <td style={lfTdNum}>{sepNum(r.unidades)}</td>
                <td style={lfTdStyle}>{sepQuando(r.inicio)}</td>
                <td style={lfTdStyle}>{sepQuando(r.fim)}</td>
                <td style={{ ...lfTdNum, fontWeight: 800, color: sepCorTempo(Number(r.duracao || 0)) }}>
                  {sepHms(r.duracao)}
                </td>
                <td style={lfTdStyle}>
                  <LfBadge tipo={atraso ? 'erro' : 'ok'}>{atraso ? 'Atraso' : 'No prazo'}</LfBadge>
                  {atraso && (
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.red, marginTop: 2 }}>{motivoAtraso}</div>
                  )}
                </td>
              </tr>
              );
            })}
          </LfTabela>
        )}
      </LfCard>
  );

  // ── Gestão ──
  const soma = noPeriodo.reduce((s, r) => s + Number(r.duracao || 0), 0);
  const dentro = noPeriodo.filter((r) => Number(r.duracao || 0) <= SEP_META_MS).length;
  const pessoas = new Set(noPeriodo.map((r) => r.separador));
  const diasPeriodo =
    periodo === 'hoje' ? 1 : periodo === '7d' ? 7 : periodo === '30d' ? 30 : Math.max(1, new Set(noPeriodo.map((r) => sepDia0(r.inicio))).size);
  const rank = (() => {
    const mapa = new Map();
    noPeriodo.forEach((r) => {
      const it = mapa.get(r.separador) || { nome: r.separador, qtd: 0, soma: 0 };
      it.qtd += 1;
      it.soma += Number(r.duracao || 0);
      mapa.set(r.separador, it);
    });
    return [...mapa.values()].sort((a, b) => b.qtd - a.qtd || a.soma / a.qtd - b.soma / b.qtd);
  })();
  const maiorRank = rank.length ? rank[0].qtd : 1;
  const dias7 = (() => {
    const base = sepDia0(Date.now());
    const out = [];
    for (let i = 6; i >= 0; i--) {
      const ini = base - i * 864e5;
      out.push({
        ini,
        qtd: hist.filter((r) => r.inicio >= ini && r.inicio < ini + 864e5).length,
        rot: new Date(ini).toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '').slice(0, 3),
        hoje: i === 0,
      });
    }
    return out;
  })();
  const maiorDia = Math.max(1, ...dias7.map((d) => d.qtd));
  const rotuloPeriodo = { hoje: 'Hoje', '7d': 'Últimos 7 dias', '30d': 'Últimos 30 dias', tudo: 'Todo o histórico' }[periodo];

  const blocoGestao = (
    <>
      <LfCard
        titulo="Período de análise"
        subtitulo={rotuloPeriodo}
        acoes={
          <>
            {[
              ['hoje', 'Hoje'],
              ['7d', '7 dias'],
              ['30d', '30 dias'],
              ['tudo', 'Tudo'],
            ].map(([id, nome]) => (
              <LfBtn key={id} tipo={periodo === id ? 'primario' : 'neutro'} onClick={() => setPeriodo(id)}>
                {nome}
              </LfBtn>
            ))}
          </>
        }
      >
        <LfKpis>
          <LfKpi
            rotulo="Listas finalizadas"
            valor={noPeriodo.length}
            tipo="info"
            detalhe={periodo === 'hoje' ? 'no dia de hoje' : `${(noPeriodo.length / diasPeriodo).toFixed(1).replace('.', ',')} por dia`}
          />
          <LfKpi
            rotulo="Tempo médio"
            valor={noPeriodo.length ? sepCurto(soma / noPeriodo.length) : '--:--'}
            tipo="neutro"
            detalhe={noPeriodo.length ? `mais rápida ${sepCurto(Math.min(...noPeriodo.map((r) => Number(r.duracao || 0))))}` : 'sem registros'}
          />
          <LfKpi
            rotulo="Dentro da meta"
            valor={noPeriodo.length ? Math.round((dentro / noPeriodo.length) * 100) + '%' : '—'}
            tipo={noPeriodo.length && dentro / noPeriodo.length < 0.7 ? 'warn' : 'ok'}
            detalhe={noPeriodo.length ? `${dentro} de ${noPeriodo.length} até ${SEP_META_MIN} min` : `meta de ${SEP_META_MIN} min`}
          />
          <LfKpi
            rotulo="Separação acima de 1h"
            valor={noPeriodo.filter((r) => Number(r.duracao || 0) > SEP_LIMITE_MS).length}
            tipo={noPeriodo.some((r) => Number(r.duracao || 0) > SEP_LIMITE_MS) ? 'erro' : 'ok'}
            detalhe="entre iniciar e finalizar"
          />
          <LfKpi
            rotulo="Espera acima de 1h"
            valor={noPeriodo.filter((r) => (sepEspera(r) || 0) > SEP_LIMITE_MS).length}
            tipo={noPeriodo.some((r) => (sepEspera(r) || 0) > SEP_LIMITE_MS) ? 'erro' : 'ok'}
            detalhe="entre gerar e iniciar"
          />
          <LfKpi
            rotulo="Tempo em separação"
            valor={sepHoras(soma)}
            tipo="neutro"
            detalhe={pessoas.size ? `${pessoas.size} ${sepPlural(pessoas.size, 'separador', 'separadores')}` : 'sem registros'}
          />
        </LfKpis>
      </LfCard>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 18, alignItems: 'start' }}>
        <LfCard titulo="Por separador" subtitulo="Volume e tempo médio no período">
          {rank.length === 0 ? (
            <LfVazio>Sem dados no período.</LfVazio>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {rank.map((l, i) => (
                <div key={l.nome}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 13, color: C.txtPri, marginBottom: 5 }}>
                    <b>{l.nome}</b>
                    <span style={{ color: C.txtSec, fontVariantNumeric: 'tabular-nums' }}>
                      <b>{l.qtd}</b> {sepPlural(l.qtd, 'lista', 'listas')} · média {sepCurto(l.soma / l.qtd)}
                    </span>
                  </div>
                  <div style={{ height: 8, borderRadius: 99, background: C.bgMuted, overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${Math.max(4, Math.round((l.qtd / maiorRank) * 100))}%`,
                        height: '100%',
                        borderRadius: 99,
                        background: SEP_CORES[i % SEP_CORES.length],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </LfCard>

        <LfCard titulo="Listas por dia" subtitulo="Últimos 7 dias">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 170 }}>
            {dias7.map((d, i) => (
              <div
                key={d.ini}
                title={`${sepDataBr(d.ini)}: ${d.qtd}`}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', gap: 6 }}
              >
                <span style={{ fontSize: 12, fontWeight: 800, color: C.txtPri, fontVariantNumeric: 'tabular-nums' }}>{d.qtd}</span>
                <div
                  style={{
                    width: '100%',
                    height: `${Math.max(3, Math.round((d.qtd / maiorDia) * 100))}px`,
                    maxHeight: 110,
                    borderRadius: 6,
                    background: d.hoje ? C.primaryGrad : SEP_CORES[i % SEP_CORES.length],
                    opacity: d.hoje ? 1 : 0.5,
                  }}
                />
                <span style={{ fontSize: 11.5, color: d.hoje ? C.primary : C.txtMuted, fontWeight: d.hoje ? 800 : 600, textTransform: 'capitalize' }}>
                  {d.rot}
                </span>
              </div>
            ))}
          </div>
        </LfCard>
      </div>

      <LfCard
        titulo="Histórico de separações"
        subtitulo={
          filtrados.length
            ? `${Math.min(50, filtrados.length)} de ${filtrados.length} ${sepPlural(filtrados.length, 'registro', 'registros')}`
            : 'Nenhum registro'
        }
        acoes={
          <>
            <LfBtn onClick={exportar}>Exportar CSV</LfBtn>
            <LfBtn tipo="perigo" onClick={limparHistorico}>
              Limpar histórico
            </LfBtn>
          </>
        }
      >
        <div
          style={{
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
            marginBottom: 14,
            padding: 12,
            background: C.bgStripe,
            border: `1px solid ${C.bdLight}`,
            borderRadius: C.radius.lg,
          }}
        >
          <input
            className="lf-input"
            style={{ ...lfInputStyle, width: 200 }}
            placeholder="🔍 Número da lista"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <select className="lf-input" style={lfInputStyle} value={fSep} onChange={(e) => setFSep(e.target.value)}>
            <option value="">Separador: todos</option>
            {nomes.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <select className="lf-input" style={lfInputStyle} value={fMeta} onChange={(e) => setFMeta(e.target.value)}>
            <option value="">Situação: todas</option>
            <option value="ok">Dentro da meta</option>
            <option value="late">Acima da meta (15 min)</option>
            <option value="lim">Acima de 1h</option>
          </select>
          <select className="lf-input" style={lfInputStyle} value={fOrd} onChange={(e) => setFOrd(e.target.value)}>
            <option value="recente">Mais recentes</option>
            <option value="antiga">Mais antigas</option>
            <option value="lenta">Maior tempo</option>
            <option value="rapida">Menor tempo</option>
          </select>
        </div>
        {filtrados.length === 0 ? (
          <LfVazio>Nenhum registro encontrado.</LfVazio>
        ) : (
          <LfTabela
            colunas={['Lista', 'Separador', 'Transportadora', 'Gerada', 'Pedidos', 'Itens', 'Início', 'Fim', 'Tempo', 'Situação']}
            compacta
            numericas={['Pedidos', 'Itens', 'Tempo']}
          >
            {filtrados.slice(0, 50).map((r) => {
              const dTotal = Number(r.duracao || 0);
              const late = dTotal > SEP_META_MS;
              const estourou = dTotal > SEP_LIMITE_MS;
              return (
                <tr key={r.id}>
                  <td style={{ ...lfTdStyle, fontWeight: 800 }}>{r.lista}</td>
                  <td style={lfTdStyle}>{r.separador}</td>
                  <td style={lfTdStyle}>{r.transportadora || '—'}</td>
                  <td style={lfTdStyle}>
                    <SepGeradaCell r={r} />
                  </td>
                  <td style={lfTdNum}>{sepNum(r.pedidos)}</td>
                  <td style={lfTdNum}>{sepNum(r.unidades)}</td>
                  <td style={lfTdStyle}>{sepQuando(r.inicio)}</td>
                  <td style={lfTdStyle}>{sepQuando(r.fim)}</td>
                  <td style={{ ...lfTdNum, fontWeight: 800, color: sepCorTempo(Number(r.duracao || 0)) }}>{sepHms(r.duracao)}</td>
                  <td style={lfTdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <LfBadge tipo={estourou ? 'erro' : late ? 'warn' : 'ok'}>{estourou ? '> 1h' : late ? '> 15 min' : 'Na meta'}</LfBadge>
                      <LfBtn pequeno tipo="perigo" title="Ocultar do histórico" onClick={() => ocultar(r)}>
                        ✕
                      </LfBtn>
                    </div>
                  </td>
                </tr>
              );
            })}
          </LfTabela>
        )}
        <div style={{ fontSize: 11.5, color: C.txtMuted, marginTop: 10 }}>
          Exibindo até 50 registros · o CSV exporta tudo que está filtrado
        </div>
      </LfCard>
    </>
  );

  return (
    <div style={{ fontFamily: C.font }}>
      <style>{LF_CSS}</style>
      {cabecalho}
      <SepAbas
        abas={[
          ['fila', 'Fila de listas'],
          ['andamento', 'Em separação'],
          ['tempo', 'Painel de tempo'],
          ['hist', 'Histórico'],
          ['dados', 'Dados'],
        ]}
        aba={aba}
        setAba={(a) => {
          setAba(a);
          setAviso(null);
        }}
        contagens={{ fila: fila.length, andamento: ativasTodas.length }}
      />
      {(aba === 'fila' || aba === 'andamento') && avisosSep}
      {aba === 'fila' && cardFila}
      {aba === 'andamento' && cardAndamento}
      {aba === 'tempo' && cardTempo}
      {aba === 'hist' && cardHist}
      {aba === 'dados' && blocoGestao}
      {finModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.55)',
            backdropFilter: 'blur(2px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setFinModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: C.bgCard,
              borderRadius: C.radius.xl,
              padding: 24,
              width: 440,
              maxWidth: '92vw',
              boxShadow: C.shadowXl,
              border: `1px solid ${C.bdMid}`,
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: C.txtPri, marginBottom: 6 }}>Finalizar {finModal.lista}</div>
            <div style={{ fontSize: 13, color: C.txtSec, marginBottom: 16, lineHeight: 1.5 }}>
              Separador: <b>{finModal.separador}</b>
              <br />
              Você faturou essa lista?
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <LfBtn tipo="verde" onClick={() => confirmarFinalizacao(finModal, true)}>
                ✓ Sim, eu faturei ({finModal.separador})
              </LfBtn>
              <LfBtn onClick={() => confirmarFinalizacao(finModal, false)}>
                Não, outra pessoa vai faturar
              </LfBtn>
              <LfBtn tipo="perigo" onClick={() => setFinModal(null)}>
                Voltar (não finalizar)
              </LfBtn>
            </div>
            <div style={{ fontSize: 11.5, color: C.txtMuted, marginTop: 12 }}>
              Se não foi você, quem faturou é escolhido depois na aba Via Leitor.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Indicador: Separação Diário ──────────────────────────────────────
// Um dia por linha: quantas listas foram separadas e qual % ficou no prazo (máx. 1h
// para iniciar e 1h para finalizar). Usa as mesmas separações da tela "Separação de Lista".
function TelaIndicadorSeparacao({ ativo, modo }) {
  const mensal = modo === 'mes';
  const [rows, setRows] = useState([]);
  const [geradas, setGeradas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [atualizadoEm, setAtualizadoEm] = useState('');
  const [mf, setMf] = useState('atual');
  const [pf, setPf] = useState('todos');
  const [dp, setDp] = useState('7');
  const [af, setAf] = useState('atual');
  const [fSep, setFSep] = useState('');

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const [fin, listas] = await Promise.all([
        sepBuscarTudo('/separacao_listas?select=*&status=eq.finalizada&order=id.desc'),
        sepBuscarTudo('/historico_listas?select=lista,data_hora,transportadora,pedidos,unidades&order=id.desc'),
      ]);
      setRows((Array.isArray(fin) ? fin : []).map(sepParse));
      setGeradas(Array.isArray(listas) ? listas : []);
      setErro('');
      setAtualizadoEm(new Date().toLocaleString('pt-BR'));
    } catch (e) {
      setErro(e.message || 'Não foi possível carregar.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    if (!ativo) return undefined;
    carregar();
    const t = setInterval(() => {
      if (!document.hidden) carregar();
    }, 60000);
    return () => clearInterval(t);
  }, [ativo, carregar]);

  // Completa cada separação com a data de geração (para medir a espera) e o volume.
  const base = useMemo(() => {
    const mapa = new Map(geradas.map((g) => [sepNorm(g.lista), g]));
    return rows
      .filter((r) => r.inicio)
      .map((r) => {
        const g = mapa.get(sepNorm(r.lista));
        const geradaEm = r.geradaEm || (g && g.data_hora ? new Date(g.data_hora).getTime() : null);
        const espera = geradaEm ? Math.max(0, r.inicio - geradaEm) : null;
        const dur = Number(r.duracao || 0);
        return {
          ...r,
          espera,
          dur,
          pedidos: r.pedidos != null ? r.pedidos : g ? g.pedidos : null,
          unidades: r.unidades != null ? r.unidades : g ? g.unidades : null,
          atrEsp: espera != null && espera > SEP_LIMITE_MS,
          atrSep: dur > SEP_LIMITE_MS,
          dia: sepDia0(r.inicio),
        };
      });
  }, [rows, geradas]);

  const mesDe = (ts) => `${sepPad(new Date(ts).getMonth() + 1)}/${new Date(ts).getFullYear()}`;
  const mesAtual = mesDe(Date.now());
  const meses = useMemo(
    () => [...new Set(base.map((r) => mesDe(r.dia)))].sort((a, b) => b.slice(3).localeCompare(a.slice(3)) || b.localeCompare(a)),
    [base]
  );
  const anoAtual = String(new Date().getFullYear());
  const anos = useMemo(() => [...new Set(base.map((r) => String(new Date(r.dia).getFullYear())))].sort((a, b) => b.localeCompare(a)), [base]);
  const nomes = useMemo(() => [...new Set(base.map((r) => r.separador))].filter(Boolean).sort((a, b) => a.localeCompare(b, 'pt-BR')), [base]);

  const filtradas = useMemo(() => {
    const hoje = sepDia0(Date.now());
    return base.filter((r) => {
      if (fSep && r.separador !== fSep) return false;
      if (mensal) {
        const ano = String(new Date(r.dia).getFullYear());
        return af === 'atual' ? ano === anoAtual : !af || ano === af;
      }
      if (mf === 'atual' ? mesDe(r.dia) !== mesAtual : mf && mesDe(r.dia) !== mf) return false;
      if (pf === 'hoje' && r.dia !== hoje) return false;
      if (pf === 'ontem' && r.dia !== hoje - 864e5) return false;
      if (pf === 'ultimos' && r.dia < hoje - (Math.max(1, Number(dp) || 1) - 1) * 864e5) return false;
      return true;
    });
  }, [base, mf, pf, dp, af, fSep, mensal]);

  // Resume um conjunto de listas em números do dia.
  const resumir = (lista) => {
    const comEsp = lista.filter((r) => r.espera != null);
    const noPrazo = lista.filter((r) => !r.atrEsp && !r.atrSep).length;
    const pct = (parte, total) => (total ? (parte / total) * 100 : null);
    const media = (arr) => (arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : null);
    return {
      total: lista.length,
      noPrazo,
      atraso: lista.length - noPrazo,
      pctGeral: pct(noPrazo, lista.length),
      pctEsp: pct(comEsp.filter((r) => !r.atrEsp).length, comEsp.length),
      pctSep: pct(lista.filter((r) => !r.atrSep).length, lista.length),
      pctMeta: pct(lista.filter((r) => r.dur <= SEP_META_MS).length, lista.length),
      mediaEsp: media(comEsp.map((r) => r.espera)),
      mediaSep: media(lista.map((r) => r.dur)),
      pedidos: lista.reduce((s, r) => s + (Number(r.pedidos) || 0), 0),
      unidades: lista.reduce((s, r) => s + (Number(r.unidades) || 0), 0),
    };
  };

  const dias = useMemo(() => {
    const mapa = new Map();
    filtradas.forEach((r) => {
      const k = mensal ? new Date(new Date(r.dia).getFullYear(), new Date(r.dia).getMonth(), 1).getTime() : r.dia;
      if (!mapa.has(k)) mapa.set(k, []);
      mapa.get(k).push(r);
    });
    return [...mapa.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([dia, lista]) => ({ dia, diasComLista: new Set(lista.map((r) => r.dia)).size, ...resumir(lista) }));
  }, [filtradas, mensal]);
  const geral = useMemo(() => ({ ...resumir(filtradas), diasTotal: new Set(filtradas.map((r) => r.dia)).size }), [filtradas]);
  const pior = useMemo(
    () => dias.filter((d) => d.pctGeral != null).sort((a, b) => a.pctGeral - b.pctGeral)[0] || null,
    [dias]
  );

  const th = {
    padding: '6px 8px',
    fontSize: 9,
    fontWeight: 800,
    color: C.txtSec,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    borderBottom: `1px solid ${C.bdLight}`,
  };
  const grupo = (bg, cor, extra) => ({
    background: bg,
    color: cor,
    fontSize: 9,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    textAlign: 'center',
    padding: '7px 8px',
    ...extra,
  });
  const SEPARA = '4px solid #f0f3ff';
  const tdBase = { padding: '5px 8px', textAlign: 'center', fontSize: 10, borderBottom: `1px solid ${C.bdLight}` };
  const tdPct = (valor, sep) => {
    const cor = corPct(valor);
    return (
      <td
        style={{
          ...tdBase,
          fontWeight: 800,
          fontFamily: C.fontMono,
          background: valor == null ? C.bgCard : cor.bg,
          color: valor == null ? C.txtMuted : cor.color,
          borderLeft: sep ? SEPARA : `1px dotted ${C.bdLight}`,
        }}
      >
        {valor == null ? '—' : fmtPct(valor)}
      </td>
    );
  };
  const tdNum = (v, sep, extra) => (
    <td
      style={{
        ...tdBase,
        fontFamily: C.fontMono,
        color: C.txtPri,
        borderLeft: sep ? SEPARA : `1px dotted ${C.bdLight}`,
        ...extra,
      }}
    >
      {v}
    </td>
  );

  const tempo = (ms) => (ms == null ? '—' : sepCurto(ms));

  const linha = (d, chave, rotulo, idx) => {
    const dt = d.dia != null ? new Date(d.dia) : null;
    const negrito = rotulo ? { fontWeight: 800, background: C.bgMuted } : null;
    return (
      <tr key={chave} style={{ background: idx % 2 === 0 ? C.bgCard : C.bgStripe }}>
        {mensal ? (
          <>
            <td style={{ ...tdBase, fontWeight: 800, fontFamily: C.fontMono, color: C.txtPri, ...negrito }}>
              {rotulo || mesDe(d.dia)}
            </td>
            <td style={{ ...tdBase, color: C.txtSec, ...negrito }}>{rotulo ? d.diasTotal : d.diasComLista}</td>
          </>
        ) : (
          <>
            <td style={{ ...tdBase, color: C.txtSec, ...negrito }}>{dt ? mesDe(d.dia) : ''}</td>
            <td style={{ ...tdBase, fontWeight: 800, fontFamily: C.fontMono, color: C.txtPri, ...negrito }}>
              {rotulo || dt.toLocaleDateString('pt-BR')}
            </td>
            <td style={{ ...tdBase, color: C.txtSec, ...negrito }}>
              {dt ? dt.toLocaleDateString('pt-BR', { weekday: 'long' }) : ''}
            </td>
          </>
        )}
        {tdPct(d.pctEsp, true)}
        {tdPct(d.pctSep, false)}
        {tdPct(d.pctGeral, false)}
        {tdNum(d.total, true, { fontWeight: 800 })}
        {tdNum(d.noPrazo, false, { color: C.green, fontWeight: 800 })}
        {tdNum(d.atraso, false, { color: d.atraso ? C.red : C.txtMuted, fontWeight: 800 })}
        {tdNum(tempo(d.mediaEsp), true, d.mediaEsp > SEP_LIMITE_MS ? { color: C.red, fontWeight: 800 } : null)}
        {tdNum(tempo(d.mediaSep), false, d.mediaSep > SEP_LIMITE_MS ? { color: C.red, fontWeight: 800 } : null)}
        {tdNum(d.pedidos || '—', true)}
        {tdNum(d.unidades || '—', false)}
      </tr>
    );
  };

  return (
    <>
      <PageHeader
        titulo={mensal ? 'Separação Mensal' : 'Separação Diário'}
        atualizadoEm={atualizadoEm || '—'}
        extraInfo={
          <span>
            No prazo: até <strong style={{ color: C.txtSec }}>1h</strong> para iniciar e até{' '}
            <strong style={{ color: C.txtSec }}>1h</strong> para finalizar
          </span>
        }
        actions={
          <button onClick={carregar} disabled={carregando} style={btnAtualizar(carregando)}>
            {carregando ? 'Atualizando…' : 'Atualizar'}
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
        {mensal ? (
          <select value={af} onChange={(e) => setAf(e.target.value)} style={selectEl}>
            <option value="atual">Ano atual</option>
            <option value="">Todos os anos</option>
            {anos.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        ) : (
          <>
        <select value={pf} onChange={(e) => setPf(e.target.value)} style={selectEl}>
          <option value="todos">Todos os dias</option>
          <option value="hoje">Hoje</option>
          <option value="ontem">Ontem</option>
          <option value="ultimos">Últimos X dias</option>
        </select>
        {pf === 'ultimos' && (
          <input type="number" min="1" value={dp} onChange={(e) => setDp(e.target.value)} style={{ ...selectEl, width: 64 }} />
        )}
        <select value={mf} onChange={(e) => setMf(e.target.value)} style={selectEl}>
          <option value="atual">Mês atual</option>
          <option value="">Todos os meses</option>
          {meses.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
          </>
        )}
        <select value={fSep} onChange={(e) => setFSep(e.target.value)} style={selectEl}>
          <option value="">Separador: todos</option>
          {nomes.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            setPf('todos');
            setDp('7');
            setMf('atual');
            setAf('atual');
            setFSep('');
          }}
          style={btnLimpar}
        >
          Limpar
        </button>
      </section>
      <section
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12, marginBottom: 16 }}
      >
        <ICard titulo="Listas separadas" valor={geral.total} grad={C.grad2} detalhe={mensal ? `${dias.length} ${sepPlural(dias.length, 'mês', 'meses')} no filtro` : `${dias.length} ${sepPlural(dias.length, 'dia', 'dias')} no filtro`} />
        <ICard titulo="% no prazo" valor={geral.pctGeral == null ? '—' : fmtPct(geral.pctGeral)} grad={C.grad3} detalhe={`${geral.noPrazo} de ${geral.total} listas`} />
        <ICard titulo="Em atraso" valor={geral.atraso} grad={C.grad6} detalhe="Passou de 1h para iniciar ou finalizar" />
        <ICard
          titulo={mensal ? 'Pior mês' : 'Pior dia'}
          valor={pior ? fmtPct(pior.pctGeral) : '—'}
          grad={C.grad5}
          detalhe={pior ? (mensal ? mesDe(pior.dia) : new Date(pior.dia).toLocaleDateString('pt-BR')) : 'Sem dados'}
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
          <span style={{ fontWeight: 800, color: C.txtPri, fontSize: 14, fontFamily: C.font, letterSpacing: '-0.02em' }}>
            {mensal ? 'Desempenho Mensal da Separação' : 'Desempenho Diário da Separação'}
          </span>
          <ContadorRegistros
            filtrados={dias.length}
            total={mensal ? new Set(base.map((r) => mesDe(r.dia))).size : new Set(base.map((r) => r.dia)).size}
          />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, fontFamily: C.font }}>
            <thead>
              <tr>
                <th colSpan={mensal ? 2 : 3} style={grupo('linear-gradient(135deg,#302b63,#24243e)', '#c4b5fd')}>
                  {mensal ? 'Dados do Mês' : 'Dados do Dia'}
                </th>
                <th colSpan="3" style={grupo('linear-gradient(135deg,#064e3b,#065f46)', '#a7f3d0', { borderLeft: SEPARA })}>
                  Prazo (%)
                </th>
                <th colSpan="3" style={grupo('linear-gradient(135deg,#1a1f6e,#2d3282)', '#bfdbfe', { borderLeft: SEPARA })}>
                  Listas
                </th>
                <th colSpan="2" style={grupo('linear-gradient(135deg,#374151,#1f2937)', '#d1d5db', { borderLeft: SEPARA })}>
                  Tempo médio
                </th>
                <th colSpan="2" style={grupo('linear-gradient(135deg,#7c2d12,#9a3412)', '#fed7aa', { borderLeft: SEPARA })}>
                  Volume
                </th>
              </tr>
              <tr style={{ background: C.bgMuted }}>
                {(mensal ? ['Mês', 'Dias'] : ['Mês', 'Data', 'Dia']).map((t) => (
                  <th key={t} style={th}>
                    {t}
                  </th>
                ))}
                {['Iniciar ≤1h', 'Finalizar ≤1h', 'Geral'].map((t, i) => (
                  <th key={t} style={{ ...th, borderLeft: i === 0 ? SEPARA : undefined }}>
                    {t}
                  </th>
                ))}
                {['Total', 'No prazo', 'Atraso'].map((t, i) => (
                  <th key={t} style={{ ...th, borderLeft: i === 0 ? SEPARA : undefined }}>
                    {t}
                  </th>
                ))}
                {['Espera', 'Separação'].map((t, i) => (
                  <th key={t} style={{ ...th, borderLeft: i === 0 ? SEPARA : undefined }}>
                    {t}
                  </th>
                ))}
                {['Pedidos', 'Itens'].map((t, i) => (
                  <th key={t} style={{ ...th, borderLeft: i === 0 ? SEPARA : undefined }}>
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {carregando && !dias.length && (
                <tr>
                  <td colSpan={mensal ? 12 : 13} style={{ padding: 28, textAlign: 'center', color: C.txtMuted, fontFamily: C.font }}>
                    Carregando…
                  </td>
                </tr>
              )}
              {!carregando && !dias.length && (
                <tr>
                  <td colSpan={mensal ? 12 : 13} style={{ padding: 28, textAlign: 'center', color: C.txtMuted, fontFamily: C.font }}>
                    Nenhuma lista separada neste filtro.
                  </td>
                </tr>
              )}
              {dias.map((d, i) => linha(d, d.dia, null, i))}
              {dias.length > 1 && linha(geral, 'total', 'Total / média', 1)}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const [tema, alternarTema] = useTema();
  // guardado como 'logistica' ou 'geral' ('true' = login antigo, tratado como geral)
  const [perfil, setPerfil] = useState(() => {
    const v = localStorage.getItem(LOGIN_STORAGE_KEY);
    return v === 'logistica' ? 'logistica' : v ? 'geral' : '';
  });
  const logado = !!perfil;
  const ehLogistica = perfil === 'logistica';
  const [tela, setTelaBruto] = useState('dashboard');
  const setTela = useCallback(
    (t) => {
      if (ehLogistica || !TELAS_BLOQUEADAS_GERAL.includes(t)) setTelaBruto(t);
    },
    [ehLogistica]
  );
  const [pedidoBuscaGlobal, setPedidoBuscaGlobal] = useState('');
  const [resultadosBuscaGlobal, setResultadosBuscaGlobal] = useState([]);
  const [buscandoGlobal, setBuscandoGlobal] = useState(false);
  const [erroBuscaGlobal, setErroBuscaGlobal] = useState('');
  const [tipoBuscaGlobal, setTipoBuscaGlobal] = useState('pedido'); // 'pedido' | 'nf'
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
  const faturamentoAtivo = [
    'faturamento',
    'listaFaturamento',
    'separacaoLista',
    'cancelamentos',
  ].includes(tela);
  const producaoAtivo = [
    'producao',
    'producaoResumo',
    'producaoSolicitacoes',
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
    'indicadorSeparacaoDiario',
    'indicadorSeparacaoMensal',
  ].includes(tela);

  const buscarPedidoGlobal = useCallback(async () => {
    const pedido = String(pedidoBuscaGlobal || '').trim();

    const porNf = tipoBuscaGlobal === 'nf';

    if (!pedido) {
      setBuscaGlobalFeita(true);
      setErroBuscaGlobal(
        porNf
          ? 'Digite o número da NF para pesquisar.'
          : 'Digite um número de pedido para pesquisar.'
      );
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

      // As planilhas (Faturamento, Estoque, Produção) não têm NF: pesquisa por NF só nos dados do Supabase.
      (porNf ? [] : fontes).forEach((fonte) => {
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

      // Supabase (Postagens, Via Leitor, Cancelamentos) — com o cache compartilhado
      const sup = await buscarPedidoSupabase(
        pedido,
        ehLogistica,
        porNf ? 'nf' : 'pedido'
      );
      encontrados.push(...sup.itens);
      setResultadosBuscaGlobal(encontrados);

      const totalCarregado = fontes.reduce(
        (total, fonte) => total + getCacheDadosPainel(fonte.key).length,
        0
      );

      if (sup.falhas.length) {
        setErroBuscaGlobal(
          `Não foi possível pesquisar em: ${sup.falhas.join(', ')}.`
        );
      } else if (!porNf && totalCarregado === 0 && !encontrados.length) {
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
  }, [pedidoBuscaGlobal, ehLogistica, tipoBuscaGlobal]);

  function sair() {
    localStorage.removeItem(LOGIN_STORAGE_KEY);
    setTelaBruto('dashboard');
    setPerfil('');
  }

  if (!logado)
    return (
      <TelaLogin
        onLogin={(p) => {
          setTelaBruto('dashboard');
          setPerfil(p);
        }}
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
              onClick={() => setTela(ehLogistica ? 'viaLeitor' : 'postagens')}
            >
              Expedição
            </MenuGrupBtn>
            {expedicaoAtiva && (
              <div style={{ marginTop: 4, paddingTop: 2 }}>
                {ehLogistica && (
                  <SubMenuBtn
                    ativo={tela === 'viaLeitor'}
                    onClick={() => setTela('viaLeitor')}
                  >
                    Via Leitor
                  </SubMenuBtn>
                )}
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
                {ehLogistica && (
                  <SubMenuBtn
                    ativo={tela === 'listaFaturamento'}
                    onClick={() => setTela('listaFaturamento')}
                  >
                    Lista Faturamento
                  </SubMenuBtn>
                )}
                {ehLogistica && (
                  <SubMenuBtn
                    ativo={tela === 'separacaoLista'}
                    onClick={() => setTela('separacaoLista')}
                  >
                    Separação de Lista
                  </SubMenuBtn>
                )}
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
                {ehLogistica && (
                  <SubMenuBtn
                    ativo={tela === 'ajusteSaldo'}
                    onClick={() => setTela('ajusteSaldo')}
                  >
                    Ajuste de Saldo
                  </SubMenuBtn>
                )}
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
                {ehLogistica && (
                  <SubMenuBtn
                    ativo={tela === 'producaoSolicitacoes'}
                    onClick={() => setTela('producaoSolicitacoes')}
                  >
                    Solicitações de Produção
                  </SubMenuBtn>
                )}
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
          {ehLogistica && (
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
                <SubMenuBtn
                  ativo={tela === 'indicadorSeparacaoDiario'}
                  onClick={() => setTela('indicadorSeparacaoDiario')}
                >
                  Separação Diário
                </SubMenuBtn>
                <SubMenuBtn
                  ativo={tela === 'indicadorSeparacaoMensal'}
                  onClick={() => setTela('indicadorSeparacaoMensal')}
                >
                  Separação Mensal
                </SubMenuBtn>
              </div>
            )}
          </div>
          )}
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
            <select
              value={tipoBuscaGlobal}
              onChange={(e) => setTipoBuscaGlobal(e.target.value)}
              aria-label="Pesquisar por"
              style={{
                height: 38,
                border: `1px solid ${C.bdMid}`,
                borderRadius: C.radius.md,
                padding: '0 8px',
                fontSize: 13,
                fontWeight: 800,
                color: C.txtPri,
                outline: 'none',
                fontFamily: C.font,
                background: C.bgCard,
                cursor: 'pointer',
              }}
            >
              <option value="pedido">Pedido</option>
              <option value="nf">NF</option>
            </select>
            <input
              value={pedidoBuscaGlobal}
              onChange={(e) => setPedidoBuscaGlobal(e.target.value)}
              placeholder={
                tipoBuscaGlobal === 'nf'
                  ? 'Buscar NF (nº da NF)'
                  : 'Buscar pedido (nº do pedido)'
              }
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
              {tipoBuscaGlobal === 'nf'
                ? ehLogistica
                  ? 'Pesquisa por NF: Postagens, Via Leitor e Cancelamentos'
                  : 'Pesquisa por NF: Postagens e Cancelamentos'
                : ehLogistica
                ? 'Pesquisa geral: Faturamento, Estoque, Produção, Postagens, Via Leitor e Cancelamentos'
                : 'Pesquisa geral: Faturamento, Estoque, Produção, Postagens e Cancelamentos'}
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
                  Resultado da busca ({tipoBuscaGlobal === 'nf' ? 'NF' : 'pedido'}
                  ): {pedidoBuscaGlobal || '—'}
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

              {!buscandoGlobal && (
                <div
                  style={{
                    padding: '7px 12px',
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.txtSec,
                    borderBottom: `1px solid ${C.bdLight}`,
                  }}
                >
                  {(tipoBuscaGlobal === 'nf'
                    ? ['Postagens', ehLogistica && 'Via Leitor', 'Cancelamentos']
                    : [
                        'Faturamento',
                        'Estoque',
                        'Produção',
                        'Postagens',
                        ehLogistica && 'Via Leitor',
                        'Cancelamentos',
                      ]
                  )
                    .filter(Boolean)
                    .map(
                      (nome) =>
                        `${nome}: ${
                          resultadosBuscaGlobal.filter((r) =>
                            String(r.origem).startsWith(nome)
                          ).length
                        }`
                    )
                    .join(' · ')}
                </div>
              )}

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
                  Pesquisando...
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
                  {`Nenhum registro encontrado para ${
                    tipoBuscaGlobal === 'nf' ? 'essa NF' : 'esse pedido'
                  }.`}
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
          <TelaDashboard setTela={setTela} ativo={tela === 'dashboard'} />
        </div>
        <div style={{ display: tela === 'faturamento' ? 'block' : 'none' }}>
          <TelaFaturamento />
        </div>
        {ehLogistica && (
          <div
            style={{ display: tela === 'listaFaturamento' ? 'block' : 'none' }}
          >
            <TelaListaFaturamento ativo={tela === 'listaFaturamento'} />
          </div>
        )}
        {ehLogistica && (
          <div
            style={{ display: tela === 'separacaoLista' ? 'block' : 'none' }}
          >
            <TelaSeparacaoLista ativo={tela === 'separacaoLista'} />
          </div>
        )}
        <div style={{ display: tela === 'postagens' ? 'block' : 'none' }}>
          <TelaPostagens ativo={tela === 'postagens'} />
        </div>
        {ehLogistica && (
          <div style={{ display: tela === 'viaLeitor' ? 'block' : 'none' }}>
            <TelaViaLeitor ativo={tela === 'viaLeitor'} />
          </div>
        )}
        <div style={{ display: tela === 'cancelamentos' ? 'block' : 'none' }}>
          <TelaCancelamentos
            ativo={tela === 'cancelamentos'}
            somenteLeitura={!ehLogistica}
          />
        </div>
        <div style={{ display: tela === 'estoque' ? 'block' : 'none' }}>
          <TelaEstoque />
        </div>
        {ehLogistica && (
        <div style={{ display: tela === 'ajusteSaldo' ? 'block' : 'none' }}>
          <TelaAjusteSaldo />
        </div>
        )}
        <div style={{ display: tela === 'consultaPecas' ? 'block' : 'none' }}>
          <TelaConsultaPecas />
        </div>
        <div style={{ display: tela === 'producao' ? 'block' : 'none' }}>
          <TelaProducao modo="painel" />
        </div>
        <div style={{ display: tela === 'producaoResumo' ? 'block' : 'none' }}>
          <TelaProducao modo="resumo" />
        </div>
        {ehLogistica && (
          <div
            style={{
              display: tela === 'producaoSolicitacoes' ? 'block' : 'none',
            }}
          >
            <TelaSolicitacoesProducao />
          </div>
        )}
        <div
          style={{
            display: tela === 'analiseTransformacoes' ? 'block' : 'none',
          }}
        >
          <TelaAnaliseTransformacoes somenteLeitura={!ehLogistica} />
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
        {ehLogistica && (
        <div style={{ display: tela === 'indicadorDiario' ? 'block' : 'none' }}>
          <TelaIndicadorDiario />
        </div>
        )}
        {ehLogistica && (
        <div
          style={{
            display: tela === 'indicadorExpedicaoDiario' ? 'block' : 'none',
          }}
        >
          <TelaIndicadorExpedicaoDiario />
        </div>
        )}
        {ehLogistica && (
        <div
          style={{
            display: tela === 'indicadorFaturamentoMensal' ? 'block' : 'none',
          }}
        >
          <TelaIndicadorMensal tipo="faturamento" />
        </div>
        )}
        {ehLogistica && (
        <div
          style={{
            display: tela === 'indicadorExpedicaoMensal' ? 'block' : 'none',
          }}
        >
          <TelaIndicadorMensal tipo="expedicao" />
        </div>
        )}
        {ehLogistica && (
        <div
          style={{
            display:
              tela === 'indicadorAbastecimentoEstoque' ? 'block' : 'none',
          }}
        >
          <TelaIndicadorAbastecimentoEstoque />
        </div>
        )}
        {ehLogistica && (
        <div
          style={{
            display: tela === 'indicadorAbastecimentoMensal' ? 'block' : 'none',
          }}
        >
          <TelaIndicadorAbastecimentoMensal />
        </div>
        )}
        {ehLogistica && (
        <div
          style={{
            display: tela === 'indicadorSeparacaoDiario' ? 'block' : 'none',
          }}
        >
          <TelaIndicadorSeparacao ativo={tela === 'indicadorSeparacaoDiario'} modo="dia" />
        </div>
        )}
        {ehLogistica && (
        <div
          style={{
            display: tela === 'indicadorSeparacaoMensal' ? 'block' : 'none',
          }}
        >
          <TelaIndicadorSeparacao ativo={tela === 'indicadorSeparacaoMensal'} modo="mes" />
        </div>
        )}
      </main>
    </div>
  );
}