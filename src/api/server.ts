import express from "express";
import { DataSource } from "typeorm";
import { Block } from "../entity/Block";
import { Transaction } from "../entity/Transaction";
import { POSTGRES_URL, API_PORT } from "../config";

async function main() {
  const ds = new DataSource({ type: "postgres", url: POSTGRES_URL, entities: [Block, Transaction], synchronize: false });
  await ds.initialize();
  const app = express();

  app.get("/blocks/latest/:n?", async (req, res) => {
    const n = parseInt(req.params.n || "10");
    const blocks = await ds.getRepository(Block).find({ order: { height: "DESC" }, take: n });
    res.json(blocks);
  });

  app.get("/block/:height", async (req, res) => {
    const h = parseInt(req.params.height);
    const block = await ds.getRepository(Block).findOneBy({ height: h });
    res.json(block);
  });

  app.get("/tx/:hash", async (req, res) => {
    const tx = await ds.getRepository(Transaction).findOneBy({ hash: req.params.hash });
    res.json(tx);
  });

  app.listen(API_PORT, () => console.log(`Indexer API listening on ${API_PORT}`));
}

main().catch(console.error);
