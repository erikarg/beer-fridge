import { AppFactory } from "@expressots/core";
import { IWebServerBuilder } from "@expressots/shared/lib/cjs/types";
import request from "supertest";
import { Server } from "http";
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
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty("status", "ok");
                expect(res.body).toHaveProperty("message");
                expect(res.body).toHaveProperty("timestamp");
                expect(res.body).toHaveProperty("version");
            });
    });
});
