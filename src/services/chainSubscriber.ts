import { Tendermint37Client, subscribeNewBlock } from "@cosmjs/stargate";
import { DataSource } from "typeorm";
import { Block } from "../entity/Block";
import { Transaction } from "../entity/Transaction";
import { RPC_WS_URL, POSTGRES_URL } from "../config";

export async function startIndexer() {
  // Init DB
  const ds = new DataSource({
    type: "postgres",
    url: POSTGRES_URL,
    entities: [Block, Transaction],
    synchronize: true,
  });
  await ds.initialize();

  const tm = await Tendermint37Client.connect(RPC_WS_URL);
  const subscription = subscribeNewBlock(tm);

  for await (const { block } of subscription) {
    const { header, data } = block;
    // save block
    await ds.getRepository(Block).save({
      height: header.height,
      hash: header.appHash.toString("hex"),
      timestamp: new Date(header.time),
    });
    // save each tx
    for (const txBytes of data.txs || []) {
      await ds.getRepository(Transaction).save({
        hash: Buffer.from(txBytes).toString("base64"), // or your scheme
        height: header.height,
        body: txBytes, 
      });
    }
    console.log(`Indexed block #${header.height}`);
  }
}
