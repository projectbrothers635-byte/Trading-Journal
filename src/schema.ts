export interface PsychologyRating {
  discipline_1_to_10?: number;
  emotional_volatility_1_to_10?: number;
  energy_1_to_10?: number;
}

export interface PsychologyLedger {
  mind_state_tags_before?: string[];
  before_trade_note?: string;
  mind_state_tags_after?: string[];
  after_trade_note?: string;
  summary_line?: string;
  rating?: PsychologyRating;
}

export interface TradeOutcome {
  pnl?: number;
  r_multiple?: number;
  grade_1_to_10?: number;
  tagged_errors?: string[];
}

export interface TradeSize {
  contracts?: number;
  risk_per_trade?: number;
}

export type TradeMode = "plan" | "live" | "postmortem" | undefined;

export interface Trade {
  trade_id: string;
  symbol: string;
  time_horizon?: string;
  strategy?: string[];
  instrument_type?: string;
  size?: TradeSize;
  mode?: TradeMode;
  plan_note?: string;
  live_note?: string;
  postmortem_note?: string;
  outcome?: TradeOutcome;
}

export interface TradeLedger {
  time_horizon_tags?: string[];
  strategy_tags?: string[];
  instrument_tags?: string[];
  global_plan_note?: string;
  trades?: Trade[];
  summary_line?: string;
}

export interface AISummary {
  text: string;
  source?: string;
  generated_at?: string;
}

export interface MarketPerceptionSegment {
  flags?: string[];
  note?: string;
}

export interface MarketLedger {
  ai_summaries?: { [segment: string]: AISummary };
  perception?: { [segment: string]: MarketPerceptionSegment };
  summary_line?: string;
}

export interface Metadata {
  created_at?: string;
  updated_at?: string;
  platform?: string;
}

export interface JournalSession {
  session_id: string;
  trader_id: string;
  date: string;
  session_type?: string;
  metadata?: Metadata;
  psychology_ledger?: PsychologyLedger;
  trade_ledger?: TradeLedger;
  market_ledger?: MarketLedger;
}