import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import type { JournalSession } from "./schema";
import { upsertSession, getSession, listSessions } from "./store";

const app = express();
app.use(cors());
app.use(express.static("public"));pp.use(express.json({ limit: "1mb" }));

app.post("/journal/session", (req: Request, res: Response) => {
  const body = req.body as JournalSession;

  if (!body.session_id || !body.trader_id || !body.date) {
    return res.status(400).json({ error: "session_id, trader_id, date are required" });
  }

  const saved = upsertSession(body);
  res.json(saved);
});

app.get("/journal/session/:session_id", (req: Request, res: Response) => {
  const session = getSession(req.params.session_id);
  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }
  res.json(session);
});

app.get("/journal/sessions", (req: Request, res: Response) => {
  const traderId =
    typeof req.query.trader_id === "string" ? req.query.trader_id : undefined;
  const startDate =
    typeof req.query.start_date === "string" ? req.query.start_date : undefined;
  const endDate =
    typeof req.query.end_date === "string" ? req.query.end_date : undefined;

  const sessions = listSessions({
    trader_id: traderId,
    start_date: startDate,
    end_date: endDate
  });

  res.json(sessions);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Journal backend listening on http://localhost:${PORT}`);
});