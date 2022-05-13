import fs from "fs";
import { writeOutputFile } from "./writeOutputFile";

describe("writeOutputFile()", () => {
  describe("when output directory does not exists", () => {
    let existsSyncSpy: jest.SpyInstance;
    let mkdirSyncSpy: jest.SpyInstance;

    beforeEach(() => {
      existsSyncSpy = jest.spyOn(fs, "existsSync").mockReturnValue(false);

      mkdirSyncSpy = jest.spyOn(fs, "mkdirSync");
    });

    afterEach(() => {
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });

    it("must create it", () => {
      writeOutputFile(
        {},
        "angularClient",
        "output",
        "custom.service",
        "custom"
      );
      expect(existsSyncSpy).toHaveBeenCalled();
      expect(mkdirSyncSpy).toHaveBeenCalled();
    });
  });

  describe("when directory exists", () => {
    let existsSyncSpy: jest.SpyInstance;
    let mkdirSyncSpy: jest.SpyInstance;

    beforeEach(() => {
      existsSyncSpy = jest.spyOn(fs, "existsSync").mockReturnValue(true);

      mkdirSyncSpy = jest.spyOn(fs, "mkdirSync");
    });

    afterEach(() => {
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });

    it("must not create it", () => {
      writeOutputFile(
        {},
        "angularClient",
        "output",
        "custom.service",
        "custom"
      );
      expect(existsSyncSpy).toHaveBeenCalled();
      expect(mkdirSyncSpy).not.toHaveBeenCalled();
    });
  });

  describe("must read template", () => {
    let readFileSyncSpy: jest.SpyInstance;

    beforeEach(() => {
      readFileSyncSpy = jest.spyOn(fs, "readFileSync");
    });

    it("for angularClient", () => {
      writeOutputFile(
        {},
        "angularClient",
        "outputDir",
        "custom.service",
        "CustomTagname"
      );
      expect(readFileSyncSpy).toHaveBeenCalledWith(
        process.cwd() + "/src/templates/angularClient.hbs",
        "utf-8"
      );
    });

    it("for client", () => {
      writeOutputFile({}, "client", "outputDir", "custom", "CustomTagname");
      expect(readFileSyncSpy).toHaveBeenCalledWith(
        process.cwd() + "/src/templates/client.hbs",
        "utf-8"
      );
    });

    it("for server", () => {
      writeOutputFile({}, "server", "outputDir", "custom", "CustomTagname");
      expect(readFileSyncSpy).toHaveBeenCalledWith(
        process.cwd() + "/src/templates/server.hbs",
        "utf-8"
      );
    });
    it("for interfaces", () => {
      writeOutputFile({}, "interfaces", "outputDir", "custom", "CustomTagname");
      expect(readFileSyncSpy).toHaveBeenCalledWith(
        process.cwd() + "/src/templates/interfaces.hbs",
        "utf-8"
      );
    });
  });

  describe("writting output files", () => {
    let writeFileSyncSpy: jest.SpyInstance;

    beforeEach(() => {
      writeFileSyncSpy = jest.spyOn(fs, "writeFileSync");
    });

    describe("using default params", () => {
      it("must write file", () => {
        writeOutputFile({}, "angularClient");
        expect(writeFileSyncSpy).toHaveBeenCalledWith(
          process.cwd() + "/output/index.ts",
          expect.stringMatching(/.*CustomService.*/),
          "utf-8"
        );
      });
    });

    describe("passing params", () => {
      it("must write file", () => {
        writeOutputFile(
          {},
          "angularClient",
          "outputDir",
          "my-custom.service",
          "my-custom"
        );
        expect(writeFileSyncSpy).toHaveBeenCalledWith(
          process.cwd() + "/outputDir/my-custom.service.ts",
          expect.stringMatching(/.*MyCustomService.*/),
          "utf-8"
        );
      });
    });
  });
});
