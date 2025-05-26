ALTER TABLE "Beer" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE "Beer" ALTER COLUMN "id" TYPE INTEGER USING "id"::integer;
ALTER TABLE "Beer" ALTER COLUMN "id" SET DEFAULT nextval('beer_id_seq'::regclass);

ALTER TABLE "FridgeEvent" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE "FridgeEvent" ALTER COLUMN "id" TYPE INTEGER USING "id"::integer;
ALTER TABLE "FridgeEvent" ALTER COLUMN "id" SET DEFAULT nextval('fridgeevent_id_seq'::regclass);

ALTER TABLE "FridgeEvent" ALTER COLUMN "beerId" TYPE INTEGER USING "beerId"::integer;

CREATE SEQUENCE IF NOT EXISTS beer_id_seq OWNED BY "Beer"."id";
CREATE SEQUENCE IF NOT EXISTS fridgeevent_id_seq OWNED BY "FridgeEvent"."id";