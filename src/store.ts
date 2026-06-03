import { JournalSession } from "./schema";

const db: Record<string, JournalSession> = {};

export function upsertSession(session: JournalSession): JournalSession {
  const now = new Date().toISOString();
  const existing = db[session.session_id];

  if (!session.metadata) {
    session.metadata = {};
  }

  if (existing && existing.metadata?.created_at) {
    session.metadata.created_at = existing.metadata.created_at;
  } else if (!session.metadata.created_at) {
    session.metadata.created_at = now;
  }

  session.metadata.updated_at = now;
  db[session.session_id] = session;
  return session;
}

export function getSession(session_id: string): JournalSession | undefined {
  return db[session_id];
}

export function listSessions(filters?: {
  trader_id?: string;
  start_date?: string;
  end_date?: string;
}): JournalSession[] {
  let sessions = Object.values(db);

  if (filters?.trader_id) {
    sessions = sessions.filter(s => s.trader_id === filters.trader_id);
  }
  if (filters?.start_date) {
    sessions = sessions.filter(s => s.date >= filters.start_date!);
  }
  if (filters?.end_date) {
    sessions = sessions.filter(s => s.date <= filters.end_date!);
  }

  sessions.sort((a, b) => (a.date < b.date ? 1 : -1));
  return sessions;
}