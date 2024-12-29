import { eventHandler } from "vinxi/http";
import { getBroadcastChannel } from "./broadcastChannel";

export default eventHandler({
  handler() {},
  websocket: {
    async open(peer) {
      let broadcast_channel = getBroadcastChannel();
      broadcast_channel.onmessage = (ev) => {
        if (ev.data.type == "statusUpdate") {
          peer.send(JSON.stringify(ev.data.devices));
        }
      }
    },
    async message(peer, msg) {
    },
    async close(peer, details) {
    },
    async error(peer, error) {
    },
  },
});
