import { AppFactory } from "@expressots/core";
import { IWebServerBuilder } from "@expressots/shared/lib/cjs/types";
import request from "supertest";
import { Server } from "http";
import { App } from "../src/app";

describe("BeerController", () => {
    let server: Server;
    let webServerBuilder: IWebServerBuilder;

    beforeAll(async () => {
        webServerBuilder = await AppFactory.create(App);
        const app = await webServerBuilder.listen(3001);
        server = await app.getHttpServer();
    });

    afterAll(async () => {
        await server.close();
    });

    describe("POST /v1/beer", () => {
        it("should create a new beer with valid data", async () => {
            const beerData = {
                type: "IPA",
                brand: "Test Brewery",
                volumeML: 500,
                quantity: 12,
            };

            const response = await request(server)
                .post("/v1/beer")
                .send(beerData)
                .expect(201);

            expect(response.body).toHaveProperty("id");
            expect(response.body.type).toBe(beerData.type);
            expect(response.body.brand).toBe(beerData.brand);
            expect(response.body.volumeML).toBe(beerData.volumeML);
            expect(response.body.quantity).toBe(beerData.quantity);
        });

        it("should return 400 for invalid beer data", async () => {
            const invalidBeerData = {
                type: "",
                brand: "Test Brewery",
                volumeML: -500,
                quantity: "invalid",
            };

            await request(server)
                .post("/v1/beer")
                .send(invalidBeerData)
                .expect(400);
        });
    });

    describe("GET /v1/beer", () => {
        it("should return all beers", async () => {
            const response = await request(server).get("/v1/beer").expect(200);

            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe("GET /v1/beer/:id", () => {
        it("should return a beer by ID", async () => {
            const beerData = {
                type: "Lager",
                brand: "Test Brewery 2",
                volumeML: 330,
                quantity: 24,
            };

            const createResponse = await request(server)
                .post("/v1/beer")
                .send(beerData);

            const beerId = createResponse.body.id;

            const response = await request(server)
                .get(`/v1/beer/${beerId}`)
                .expect(200);

            expect(response.body.id).toBe(beerId);
            expect(response.body.type).toBe(beerData.type);
        });

        it("should return 404 for non-existent beer", async () => {
            await request(server).get("/v1/beer/99999").expect(404);
        });
    });

    describe("DELETE /v1/beer/:id", () => {
        it("should delete a beer by ID", async () => {
            const beerData = {
                type: "Stout",
                brand: "Test Brewery 3",
                volumeML: 440,
                quantity: 6,
            };

            const createResponse = await request(server)
                .post("/v1/beer")
                .send(beerData);

            const beerId = createResponse.body.id;

            await request(server).delete(`/v1/beer/${beerId}`).expect(204);

            await request(server).get(`/v1/beer/${beerId}`).expect(404);
        });

        it("should return 404 when trying to delete non-existent beer", async () => {
            await request(server).delete("/v1/beer/99999").expect(404);
        });
    });
});
