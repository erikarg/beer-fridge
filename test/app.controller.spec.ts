import { AppFactory } from "../node_modules/@expressots/core";
import { IWebServerBuilder } from "../node_modules/@expressots/shared/lib/cjs/types";
import request from "supertest";
import { Server, STATUS_CODES } from "http";
import { App } from "../src/app";

describe("AppController", () => {
    let server: Server;
    let webServerBuilder: IWebServerBuilder;

    beforeAll(async () => {
        webServerBuilder = await AppFactory.create(App);
        const app = await webServerBuilder.listen(3000);
        server = await app.getHttpServer();
    });

    afterAll(async () => {
        await server.close();
    });

    it("returns a valid AppResponse", async () => {
        return request(server)
            .get("/v1")
            .expect(STATUS_CODES.OK)
            .expect("Hello from ExpressoTS!");
    });
});
