import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter } from "./router";
import { createAuth0 } from "@auth0/auth0-vue";
import { config } from "./config";

const app = createApp(App);

app
  .use(createRouter(app))
  .use(
    createAuth0({
      domain: config.authConfig.domain,
      clientId: config.authConfig.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: config.authConfig.audience,
      },
    })
  )
  .mount("#app");
