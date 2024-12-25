// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { initTcpServer } from "./api/launcher";

export default createHandler(() => {
  initTcpServer().catch(() => {
    console.log("Tcp Server failed to start");
  });
  return (
    <StartServer
      document={({ assets, children, scripts }) => (
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      )}
    />
  );
});
